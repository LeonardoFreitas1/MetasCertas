function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('@uppy/core'),
    Plugin = _require.Plugin;

var _require2 = require('@uppy/companion-client'),
    Provider = _require2.Provider;

var ProviderViews = require('@uppy/provider-views');

var _require3 = require('preact'),
    h = _require3.h;

module.exports = function (_Plugin) {
  _inherits(Dropbox, _Plugin);

  function Dropbox(uppy, opts) {
    _classCallCheck(this, Dropbox);

    var _this = _possibleConstructorReturn(this, _Plugin.call(this, uppy, opts));

    _this.id = _this.opts.id || 'Dropbox';
    Provider.initPlugin(_this, opts);
    _this.title = _this.opts.title || 'Dropbox';
    _this.icon = function () {
      return h(
        'svg',
        { 'aria-hidden': 'true', width: '128', height: '128', viewBox: '0 0 128 128' },
        h('path', { d: 'M31.997 11L64 31.825 31.997 52.651 0 31.825 31.997 11zM96 11l32 20.825-32 20.826-32-20.826L96 11zM0 73.476l31.997-20.825L64 73.476 31.997 94.302 0 73.476zm96-20.825l32 20.825-32 20.826-32-20.826 32-20.825zm-64.508 48.254l32.003-20.826 31.997 20.826-31.997 20.825-32.003-20.825z', fill: '#0260FF', 'fill-rule': 'nonzero' })
      );
    };

    _this.provider = new Provider(uppy, {
      companionUrl: _this.opts.companionUrl,
      serverHeaders: _this.opts.serverHeaders,
      storage: _this.opts.storage,
      provider: 'dropbox',
      pluginId: _this.id
    });

    _this.onFirstRender = _this.onFirstRender.bind(_this);
    _this.render = _this.render.bind(_this);
    return _this;
  }

  Dropbox.prototype.install = function install() {
    this.view = new ProviderViews(this, {
      provider: this.provider
    });
    // Set default state for Dropbox
    this.setPluginState({
      authenticated: false,
      files: [],
      folders: [],
      directories: [],
      activeRow: -1,
      filterInput: '',
      isSearchVisible: false
    });

    var target = this.opts.target;
    if (target) {
      this.mount(target, this);
    }
  };

  Dropbox.prototype.uninstall = function uninstall() {
    this.view.tearDown();
    this.unmount();
  };

  Dropbox.prototype.onFirstRender = function onFirstRender() {
    return this.view.getFolder();
  };

  Dropbox.prototype.render = function render(state) {
    return this.view.render(state);
  };

  return Dropbox;
}(Plugin);