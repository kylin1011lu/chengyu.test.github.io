System.register(["./application.0b586.js"], function (_export, _context) {
  "use strict";

  var Application, gameDiv, canvas, $p, bcr, realHeight, realWidth, bodyWidth, bodyHeight, w, application;

  // 是否加载执行完成
  function setLoadingDisplay() {
    console.log('Engine is initialized');
    cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
      console.log('game run over');
      setTimeout(function () {
        splash.style.display = 'none';

        if (application.timer) {
          clearInterval(application.timer);
        }
      }, 50);
    });
  }

  function topLevelImport(url) {
    return System["import"](url);
  }

  return {
    setters: [function (_application0b586Js) {
      Application = _application0b586Js.Application;
    }],
    execute: function () {
      gameDiv = document.getElementById('GameDiv');
      canvas = document.getElementById('GameCanvas');
      $p = canvas.parentElement;
      bcr = $p.getBoundingClientRect();
      console.log("size:", bcr.width, bcr.height, document.body.clientWidth, document.body.clientHeight);
      realHeight = bcr.height;
      realWidth = bcr.width;
      bodyWidth = document.body.clientWidth;
      bodyHeight = document.body.clientHeight;
      console.log("ratio:", bodyHeight / bodyWidth);

      if (bodyHeight / bodyWidth >= 1.7) {
        console.log("fit");
        gameDiv.setAttribute("cc_exact_fit_screen", "true");
        gameDiv.style.width = "100%";
        gameDiv.style.height = "100%";
        canvas.width = realWidth;
        canvas.height = realHeight;
        window.exactFitScreen = true;
      } else {
        console.log("no fit");
        w = bodyHeight / 1.78;
        gameDiv.setAttribute("cc_exact_fit_screen", "false");
        gameDiv.style.width = 100 * w / bodyWidth + "%";
        console.log(w, 100 * w / bodyWidth); // gameDiv.style.height = realHeight + "px";

        gameDiv.style.height = "100%";
        gameDiv.style.margin = "0 auto";
        gameDiv.style.position = "relative"; // gameDiv.style.border = "5px solid black";
        // gameDiv.style.borderRadius = "10px";
        // gameDiv.style.boxShadow = "0 5px 50px #333"

        canvas.width = w;
        canvas.height = bodyHeight;
        window.exactFitScreen = false;
      }

      application = new Application();
      topLevelImport('cc').then(function (engine) {
        setLoadingDisplay();
        return application.init(engine);
      }).then(function () {
        return application.start();
      })["catch"](function (err) {
        console.error(err);
      });
    }
  };
});