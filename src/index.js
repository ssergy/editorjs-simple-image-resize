
/**
 * Build styles
 */
require('./index.css').toString();
/**
 * SimpleImage Tool for the Editor.js
 * Works only with pasted image URLs and requires no server-side uploader.
 *
 * @typedef {object} SimpleImageData
 * @description Tool's input and output data format
 * @property {string} url — image URL
 * @property {string} caption — image caption
 * @property {boolean} withBorder - should image be rendered with border
 * @property {boolean} withBackground - should image be rendered with background
 * @property {boolean} stretched - should image be stretched to full width of container
 * @property {string} width - render image with a given width,
 * @property {string} height - render image with a given height
 */

let startX;
let startWidth;

class SimpleImage {
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: SimpleImageData, config: object, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */

  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  constructor({data, config, api}) {
    /**
     * Editor.js API
     */
    this.api = api;
    this.wrapper = undefined;
    /**
     * When block is only constructing,
     * current block points to previous block.
     * So real block index will be +1 after rendering
     * @todo place it at the `rendered` event hook to get real block index without +1;
     * @type {number}
     */
    this.blockIndex = this.api.blocks.getCurrentBlockIndex() + 1;

    /**
     * Styles
     */
    this.CSS = {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive,

      /**
       * Tool's classes
       */
      wrapper: 'cdx-simple-image',
      imageHolder: 'cdx-simple-image__picture',
      caption: 'cdx-simple-image__caption',
      resizeEnabled: 'cdx-simple-image__resize',
      resizePoint: 'resize-point'
    };
    this.minAspectRatioWidthHeight = 25;
    /**
     * Nodes cache
     */
    this.nodes = {
      wrapper: null,
      imageHolder: null,
      image: null,
      caption: null,
      width: null,
      height: null,
      resizeElementPointer: null,
    };

    /**
     * Tool's initial data
     */
    this.data = {
      url: data.url || '',
      caption: data.caption || '',
      withBorder: data.withBorder !== undefined ? data.withBorder : false,
      withBackground: data.withBackground !== undefined ? data.withBackground : false,
      stretched: data.stretched !== undefined ? data.stretched : false,
      width: data.width !== undefined ? data.width : '100%',
      height: data.height !== undefined ? data.height : '100%'
    };

    /**
     * Available Image settings
     */
    this.settings = [
      {
        name: 'withBorder',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`,
        label: 'With border',
      },
      {
        name: 'stretched',
        icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`,
        label: 'Stretched'
      },
      {
        name: 'withBackground',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`,
        label: 'With Background'
      }
    ];
  }

  /**
   * Creates a Block:
   *  1) Show preloader
   *  2) Start to load an image
   *  3) After loading, append image and caption input
   * @public
   */
  render() {
    this.wrapper = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
    if(this.data && this.data.url.length) {
      this._createImage();
    } else {
      this.createFileButton();
    }
    return this.wrapper;
  }

  createFileButton() {
    const uploadButton = this._make('div');
    const uploadFile = this._make('input');
    uploadFile.setAttribute('type', 'file');
    uploadFile.setAttribute('id', 'uploadedFile');
    uploadButton.appendChild(uploadFile);
    uploadFile.addEventListener('change', this.onSelectFile);
    this.wrapper.appendChild(uploadButton);
    const hiddenEl = document.createElement('input');
    hiddenEl.classList.add('hidden-element');
    hiddenEl.setAttribute('tabindex', 0);
    this.wrapper.appendChild(hiddenEl);
  }
  
  onSelectFile = () => {
   const selectedFile = document.getElementById('uploadedFile');
  const file = selectedFile.files[0];
  if(selectedFile.files[0].type === ('image/jpeg') || selectedFile.files[0].type === ('image/png')) {
    this.onDropHandler(file).then(data => {
      this.data = data;
    });
    this._createImage();
  }
  else {
    console.log('Failed to upload image');
  }
  }
  _createImage() {
      this.wrapper.innerHTML = ''
      loader = this._make('div', this.CSS.loading),
      imageHolder = this._make('div', [this.CSS.imageHolder,this.CSS.resizeEnabled],{width:this.data.width, height: this.data.height}),
      image = this._make('img', '',{width:this.data.width, height: this.data.height}),
      resizeElementPointer = this._make('div', this.CSS.resizePoint),
      caption = this._make('div', [this.CSS.input, this.CSS.caption], {
        contentEditable: 'true',
        innerHTML: this.data.caption || ''
      });
    caption.dataset.placeholder = 'Enter a caption';
    image.setAttribute('crossorigin', 'anonymous');
    this.wrapper.appendChild(loader);

    if (this.data.url) {
      image.src = this.data.url;
    }

    image.onload = () => {
      this.wrapper.classList.remove(this.CSS.loading);
      imageHolder.appendChild(image);
      imageHolder.appendChild(resizeElementPointer);
      this.wrapper.appendChild(imageHolder);
      this.wrapper.appendChild(caption);
      loader.remove();
      this._acceptTuneView();
    };

    image.onerror = (e) => {
      // @todo use api.Notifies.show() to show error notification
      console.log('Failed to load an image', e);
    };
   
    this.nodes.imageHolder = imageHolder;
    this.nodes.wrapper = this.wrapper;
    this.nodes.image = image;
    this.nodes.caption = caption;
    this.nodes.resizeElementPointer = resizeElementPointer;
    this.nodes.resizeElementPointer.addEventListener('mousedown', this.initializeImageResize)
  }
  initializeImageResize = (event) => {
    this.disableImageSettingsTools();
    startX = event.clientX;
    startWidth = parseInt(document.defaultView.getComputedStyle(this.nodes.imageHolder).width, 10);
    this.triggerImageResizeEvents();
    event.preventDefault();
  }

  disableImageSettingsTools() {
    Object.keys(this.data).forEach(key => {
      if(this.data[key]){
        this._toggleTune(key);
      } 
    })
  }
  /**
   * @public
   * Saving method
   * @param {Element} blockContent - Tool's wrapper
   * @return {SimpleImageData}
   */
  save(blockContent) {
    let image = blockContent.querySelector('img'),
      caption = blockContent.querySelector('.' + this.CSS.input);
    if (!image) {
      return this.data;
    }
    const dataURL = this.convertImageURLToBase64(image);
    return Object.assign(this.data, {
      url: dataURL,
      caption: caption.innerHTML,
      width: `${image.width}px`,
      height: `${image.height}px`
    });
  }

  convertImageURLToBase64(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/jpeg');
    return dataURL;
  }
  /**
   * Sanitizer rules
   */
  static get sanitize() {
    return {
      url: {},
      withBorder: {},
      withBackground: {},
      stretched: {},
      caption: {
        br: true,
      },
    };
  }

  /**
   * Read pasted image and convert it to base64
   *
   * @static
   * @param {File} file
   * @returns {Promise<SimpleImageData>}
   */
  onDropHandler(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    return new Promise(resolve => {
      reader.onload = (event) => {
        resolve({
          url: event.target.result,
          caption: file.name
        });
      };
    });
  }

  /**
   * On paste callback that is fired from Editor.
   *
   * @param {PasteEvent} event - event with pasted config
   */
  onPaste(event) {
    switch (event.type) {
      case 'tag':
        const img = event.detail.data;

        this.data = {
          url: img.src,
        };
        this._createImage();
        break;

      case 'pattern':
        const {data: text} = event.detail;

        this.data = {
          url: text,
        };
        this._createImage();
        break;

      case 'file':
        const {file} = event.detail;

        this.onDropHandler(file)
          .then(data => {
            this.data = data;
          });
          this._createImage();
        break;
    }
  }

  /**
   * Returns image data
   * @return {SimpleImageData}
   */
  get data() {
    return this._data;
  }

  /**
   * Set image data and update the view
   *
   * @param {SimpleImageData} data
   */
  set data(data) {
    this._data = Object.assign({}, this.data, data);

    if (this.nodes.image) {
      this.nodes.image.src = this.data.url;
    }

    if (this.nodes.caption) {
      this.nodes.caption.innerHTML = this.data.caption;
    }
  }

  /**
   * Specify paste substitutes
   * @see {@link ../../../docs/tools.md#paste-handling}
   * @public
   */
  static get pasteConfig() {
    return {
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i
      },
      tags: [ 'img' ],
      files: {
        mimeTypes: [ 'image/*' ]
      },
    };
  }

  /**
   * Makes buttons with tunes: add background, add border, stretch image
   * @return {HTMLDivElement}
   */
  renderSettings() {
    let wrapper = document.createElement('div');

    this.settings.forEach( tune => {
      let el = document.createElement('div');
      const title = this.api.i18n.t(tune.label);
      el.classList.add(this.CSS.settingsButton);
      el.innerHTML = tune.icon;
      this.api.tooltip.onHover(el, title, {placement: 'top'});
      el.addEventListener('click', () => {
        this._toggleTune(tune.name);
        el.classList.toggle(this.CSS.settingsButtonActive);
      });

      el.classList.toggle(this.CSS.settingsButtonActive, this.data[tune.name]);

      wrapper.appendChild(el);
    });
    return wrapper;
  };

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {array|string} classNames  - list or name of CSS classname(s)
   * @param  {Object} attributes        - any attributes
   * @return {Element}
   */
  _make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if ( Array.isArray(classNames) ) {
      el.classList.add(...classNames);
    } else if( classNames ) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
      if(attrName === 'width'){
        if(el.tagName === 'IMG') {
          el.setAttribute('width', attributes.width);
        }
        else {
          el.style.width = attributes.width;
        }
        
      }
      if(attrName === 'height') {
        if(el.tagName === 'IMG') {
          el.setAttribute('height', attributes.height);
        } else {
          el.style.height = attributes.height;
        }
      }
    }

    return el;
  }

  /**
   * Click on the Settings Button
   * @private
   */
  _toggleTune(tune) {
    this.data[tune] = !this.data[tune];
    this._acceptTuneView();
  }

  triggerImageResizeEvents() {
    window.document.addEventListener('mousemove', this.startResize,  false);
    window.document.addEventListener('mouseup', this.stopResize, false);
  }

  startResize = (event)  => {
    const imgNaturalWidth = this.nodes.image.naturalWidth;
    const imgNaturalHeight = this.nodes.image.naturalHeight;
    const computedResizeWidth = (startWidth + event.clientX - startX);
    let ratio = (imgNaturalHeight/imgNaturalWidth);
    const resizedWidth = `${computedResizeWidth}px`;
    const resizedHeight = `${Math.round(computedResizeWidth * ratio)}px`;
    const maxBlockWidth = parseInt(document.defaultView.getComputedStyle(this.nodes.wrapper).width, 10);
    if((parseInt(resizedWidth) < this.minAspectRatioWidthHeight) || (parseInt(resizedHeight) < this.minAspectRatioWidthHeight)  || parseInt(resizedWidth) > maxBlockWidth) { 
      this.stopResize();
    } else {
      this.nodes.imageHolder.style.width = resizedWidth;
      this.nodes.imageHolder.style.height = resizedHeight;
      this.nodes.image.setAttribute('width', resizedWidth);
      this.nodes.image.setAttribute('height', resizedHeight);
    }
    
    
  };
  
  stopResize =() => { 
    window.document.removeEventListener('mousemove', this.startResize, false);
  }
  /**
   * Add specified class corresponds with activated tunes
   * @private
   */
  _acceptTuneView() {
    this.settings.forEach( tune => {
      this.nodes.imageHolder.classList.toggle(this.CSS.imageHolder + '--' + tune.name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`), !!this.data[tune.name]);
      if (tune.name === 'stretched') {
        this.api.blocks.stretchBlock(this.blockIndex, !!this.data.stretched);
      }
    });
  }
}

module.exports = SimpleImage;
