System.register([], function (_export, _context) {
  "use strict";

  var cc, percentJd, timer, Application;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function onProgress(percent) {
    if (percent > percentJd) {
      percentJd = percent;
    }

    var progressBar = splash.querySelector('.progress-bar span'); // var percent = 100 * finish / total;

    if (progressBar) {
      progressBar.style.width = percent + '%';
    }
  } //------------end-----------------


  return {
    setters: [],
    execute: function () {
      //---------------自动 updata Progress--------------
      percentJd = 0;
      timer = setInterval(function () {
        var now = new Date(); //console.log(now.toString());

        if (percentJd < 90) {
          percentJd = percentJd + 1;
          onProgress(percentJd);
        } else {
          clearInterval(timer);
        }
      }, 1000);

      _export("Application", Application = /*#__PURE__*/function () {
        function Application() {
          _classCallCheck(this, Application);

          this.settingsPath = 'src/settings.4d8ad.json';
          this.showFPS = false;
        }

        _createClass(Application, [{
          key: "init",
          value: function init(engine) {
            cc = engine;
            cc.game.onPostBaseInitDelegate.add(this.onPostInitBase.bind(this));
            cc.game.onPostSubsystemInitDelegate.add(this.onPostSystemInit.bind(this));
          }
        }, {
          key: "onPostInitBase",
          value: function onPostInitBase() {// cc.settings.overrideSettings('assets', 'server', '');
            // do custom logic
          }
        }, {
          key: "onPostSystemInit",
          value: function onPostSystemInit() {// do custom logic
          }
        }, {
          key: "start",
          value: function start() {
            onProgress(50);
            return cc.game.init({
              debugMode: false ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
              settingsPath: this.settingsPath,
              overrideSettings: {
                // assets: {
                //      preloadBundles: [{ bundle: 'main', version: 'xxx' }],
                // }
                profiling: {
                  showFPS: this.showFPS
                },
                screen: {
                  "exactFitScreen": window.exactFitScreen
                }
              }
            }).then(function () {
              return cc.game.run();
            });
          }
        }]);

        return Application;
      }());
    }
  };
});