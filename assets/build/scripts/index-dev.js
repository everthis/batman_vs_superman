(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.curtain = curtain;

var _stringToDom = require('./stringToDom');

var _textModel = require('./textModel');

function curtain() {
	var alreadyTriggered = false;
	var curtainStr = '\n<div id="curtain">\n\t<div class="img-bg"></div>\n\t<span class="half-curtain curtain-left"></span>\n\t<span class="half-curtain curtain-right"></span>\n</div>\n';
	var curtainDom = (0, _stringToDom.strToDom)(curtainStr);
	curtainDom.getElementsByClassName('half-curtain')[0].addEventListener('transitionend', function () {
		console.log('ooo');
		if (!alreadyTriggered) {
			alreadyTriggered = true;
			// curtainDom.appendChild(strToDom(textModel()));
		}
	});
	return curtainDom;
}

},{"./stringToDom":5,"./textModel":7}],2:[function(require,module,exports){
'use strict';

var _svgLogo = require('./svgLogo');

var _vsCircle = require('./vsCircle');

var _curtain = require('./curtain');

var _preloadImg = require('./preloadImg');

var _removeAllChildrenEle = require('./removeAllChildrenEle');

var _textModel = require('./textModel');

var _stringToDom = require('./stringToDom');

var _container = document.getElementById('viewport');
var imgs = [];

function loadLogo() {
	var logo = document.createElement('div');
	logo.innerHTML = _svgLogo.svgLogo;
	var circle = document.createElement('div');
	circle.innerHTML = _vsCircle.vsCircle;
	logo.getElementsByClassName('superman')[0].addEventListener('animationend', logoAnimaEnd);
	_container.appendChild(logo);
	// _container.appendChild(circle);
}

function logoAnimaEnd() {
	redirect();
}

function showCurtain() {
	var curtainDom = (0, _curtain.curtain)();
	curtainDom.getElementsByClassName('img-bg')[0].appendChild(imgs[1]);
	(0, _removeAllChildrenEle.removeAllChildrenEle)(_container);
	_container.appendChild(curtainDom);
	setTimeout(function () {
		document.getElementById('curtain').classList.add('opening');
		setTimeout(function () {
			curtainDom.appendChild((0, _stringToDom.strToDom)((0, _textModel.textModel)()));
			setTimeout(function () {
				curtainDom.getElementsByClassName('text')[0].classList.add('opening');
			}, 100);
		}, 2400);
	}, 0);
}

_container.addEventListener('transitionend', fade);
function fade() {
	if (_container.classList.contains('fade-away')) {
		showCurtain();
		_container.classList.remove('fade-away');
		_container.classList.add('fade-in');
	} else {
		_container.classList.remove('fade-in');
	}
}

function redirect() {
	_container.classList.add("fading");
	_container.classList.add("fade-away");
}

function removeLoader() {
	var loader = document.getElementById('loader');
	loader.parentElement.removeChild(loader);
}

imgs = (0, _preloadImg.preloadImg)(allLoadCB, 'images/bvs_batfight.jpg', 'images/bvs_faceoff.jpg', 'images/bvs_superfight.jpg', 'images/bvs_ww.jpg');
function allLoadCB() {
	console.log('all done.');
	removeLoader();
	loadLogo();
}

},{"./curtain":1,"./preloadImg":3,"./removeAllChildrenEle":4,"./stringToDom":5,"./svgLogo":6,"./textModel":7,"./vsCircle":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.preloadImg = preloadImg;
var images = [];
var loaded = 0;
function preloadImg(cb) {
    for (var _len = arguments.length, imgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        imgs[_key - 1] = arguments[_key];
    }

    for (var i = 0; i < imgs.length; i++) {
        images[i] = new Image();
        images[i].src = imgs[i];
        images[i].addEventListener('load', allLoadCallback.bind(this, imgs.length, cb));
    }
    return images;
}

function allLoadCallback(len, cb) {
    loaded += 1;
    if (loaded === len) {
        cb.apply();
    }
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeAllChildrenEle = removeAllChildrenEle;
function removeAllChildrenEle(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strToDom = strToDom;
function strToDom(str) {
  var tmpEle = document.createElement('div');
  tmpEle.innerHTML = str;
  var returnDom = tmpEle.children[0];
  return returnDom;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var svgLogo = exports.svgLogo = "\n<div class=\"logo\">\n  <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n      viewBox=\"0 0 598.049 280.554\" style=\"enable-background:new 0 0 598.049 280.554;\"\n     xml:space=\"preserve\">\n  <defs>\n    <filter id=\"blur-filter\" x=\"-6\" y=\"-6\" width=\"200\" height=\"200\">\n      <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"2\" />\n    </filter>\n    <filter id=\"superman-inner-shadow\">\n      <feOffset dx=\"0\" dy=\"0\" />\n      <feGaussianBlur\n        stdDeviation=\"1\"\n        result=\"offset-blur\"\n      />\n      <feComposite\n        operator='out'\n        in='SourceGraphic'\n        in2='offset-blur'\n        result='inverse'\n      />\n      <feFlood\n        flood-color='ff0000'\n        flood-opacity='1'\n        result='color'\n      />\n    \n      <!-- Clip color inside shadow -->\n      <feComposite\n        operator='in'\n        in='color'\n        in2='inverse'\n        result='shadow'\n      />\n    \n      <!-- Put shadow over original object -->\n      <feComposite\n        operator='over'\n        in='shadow'\n        in2='SourceGraphic'\n      />\n    </filter>\n  </defs>\n    <path style=\"fill:#000000;\" d=\"M169.526,192.054l-44.001,3.498l-16.5,19.002l-15-14.502l-45.999,10.5c-33.501,8.499-48,40.002-48,40.002\n      c-1.5-82.5,62.499-164.285,62.499-164.285C94.025,35.483,156.465,0,156.465,0l3.475,18.995c0,0,2.546,9.035,25.248,14.826\n      l35.675,11.351h30.577V20.616l12.973,17.834l69.224,0.002l12.973-17.836V45.17h30.577l35.675-11.35\n      c22.702-5.791,25.248-14.826,25.248-14.826L441.584,0c0,0,62.44,35.483,93.94,86.267c0,0,63.999,81.787,62.499,164.287\n      c0,0-14.499-31.503-48-40.002l-45.999-10.5l-15,14.502l-16.5-19.002l-44.001-3.498l-129.5,87L169.526,192.054z\" class=\"batman-logo\"/>\n    <path style=\"fill:none;stroke:#FFFFFF;stroke-width:3;stroke-miterlimit:10;\" d=\"M399.716,66.828\" />\n    <path style=\"fill:#FF0000;\" d=\"M299.025,280.554c-139.5-102-171.565-154.714-171.565-154.714\n      c16.576-36.416,62.534-69.313,62.534-69.313c70.471-11.533,218.062,0,218.062,0s45.958,32.898,62.534,69.313\n      c0,0-31.89,52.421-170.411,153.87L299.025,280.554z M429.798,154.51c6.955-7.204,13.163-14.112,18.258-20.487\n      c0,0-37.529-60.722-115.28-65.972c0,0-93.752-7.498-102.752,16.001c0,0-6.502,20.751,56,20.25c0,0,82.251,1.497,104.001,14.499\n      c0,0,28.248,12.75,38.499,32.001L429.798,154.51z M452.439,128.284c1.131-1.556,2.18-3.073,3.141-4.547\n      c0,0-12.571-20.115-36.226-42.769c0,0,4.04,13.428,14.842,25.288L452.439,128.284z M203.523,66.828h-8.845\n      c-33.935,27.671-52.207,56.909-52.207,56.909c4.504,6.908,19.447,34.673,18.687,23.244\n      C157.794,96.409,203.523,66.828,203.523,66.828z M299.025,228.438c62.092-4.474,57.381-20.101,57.381-20.101\n      c-1.324-20.364-67.175-16.661-67.175-16.661c-38.877,2.909-98.073-14.757-98.073-14.757c9.851,9.196,19.299,19.802,29.963,28.254\n      c0,0,35.399,23.651,73.901,23.265H299.025z M332.606,238.712c-20.098,4.723-69.735,0-69.735,0\n      c21.041,17.062,36.155,28.594,36.155,28.594L332.606,238.712z M397.524,77.301c10.5,3.25,6.999-6,6.999-6\n      c-3.501-10.25-43.998-5.751-43.998-5.751C378.276,69.8,397.524,77.301,397.524,77.301z\" class=\"superman loading\"/>\n  </svg>\n</div>\n";

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.textModel = textModel;
function textModel() {
	var str = "\n<div class=\"text-model\">\n\t\t<p class=\"text\">\n\t\t\tloremloremloremloremloremlorem\n\t\t</p>\n</div>\n\t";
	return str;
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var vsCircle = exports.vsCircle = "\n<div class=\"vs-circle\">\n\t<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t\t viewBox=\"0 0 494.923 577.017\" style=\"enable-background:new 0 0 494.923 577.017;\"\n\t\t xml:space=\"preserve\">\n\t<g>\n\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#8E181A;stroke:#8E181A;stroke-width:0.5;stroke-miterlimit:22.9256;\" d=\"\n\t\t\tM78.565,474.856c-226.698-249.644,91.63-619.015,269.13-416.375c68.709,89.061,59.235,172.67,15.658,198.038\n\t\t\tc-8.733,0.171-18.003,0.182-27.92,0c1.86-8.062,2.385-15.281,0-20.661c-2.792-0.388-5.752,0.891-8.544,3.183\n\t\t\tc-1.836-3.923-3.703-7.839-5.974-12.117c6.644-50.048-25.101-78.187-47.464-83.201c27.116,13.814,43.802,33.539,44.115,62.542\n\t\t\tc-9.651,4.892-31.287-3.1-58.074-2.792C94.328,197.512,43.957,365.753,78.565,474.856z\"/>\n\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#000002;stroke:#000002;stroke-width:0.5;stroke-miterlimit:22.9256;\" d=\"\n\t\t\tM294.419,234.112c0.246,0.011,3.628-2.749,3.602-3.936c0.251-1.173,0.837-3.519,2.597-4.44c4.244-4.439,6.286-3.997,10.47-5.527\n\t\t\tc3.825-1.508,4.802,2.01,7.204,3.015c1.35,1.367,1.526-13.931,0.922-13.569c-3.344-0.882-5.026-0.281-6.518-2.021\n\t\t\tc-10.045,4.663-17.482,12.171-25.06,20.197c0.474,3.183,1.369,4.942,2.681,6.031C291.74,234.281,292.996,233.693,294.419,234.112z\"\n\t\t\t/>\n\t\t\n\t\t\t<polygon style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#000002;stroke:#000002;stroke-width:0.5;stroke-miterlimit:22.9256;\" points=\"\n\t\t\t318.378,233.952 324.912,241.574 333.79,238.726 334.125,252.63 325.079,253.468 320.305,259.415 308.159,244.171 304.138,242.747 \n\t\t\t310.84,239.899 \t\"/>\n\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#000002;stroke:#000002;stroke-width:0.5;stroke-miterlimit:22.9256;\" d=\"\n\t\t\tM306.818,279.855c-4.576-0.924-7.57-0.726-10.805,1.927c-1.751,3.693-1.167,5.155,0.838,8.083c4.355,1.68,7.036,0.948,12.104-0.419\n\t\t\tc28.716-8.77,42.017-18.846,52.142-29.861c-6.534-0.279-13.067-0.559-19.6-0.838C323.954,271.391,310.055,280.621,306.818,279.855z\n\t\t\t\"/>\n\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#000002;stroke:#000002;stroke-width:0.5;stroke-miterlimit:22.9256;\" d=\"\n\t\t\tM416.691,138.661c25.909,37.996,53.411,65.756,78.233,78.819c-20.256,32.262-18.386,68.503-0.167,100.765\n\t\t\tc-36.739,16.73-49.599,47.762-48.581,85.101c-56.936,4.899-72.698,47.349-73.71,73.71c-62.823,3.875-100.207,47.616-94.233,99.96\n\t\t\tC134.843,574.212,8.607,312.008,191.119,243.31c5.856-1.911,18.653-3.834,17.925-5.57c0,0-6.659-7.665-4.984-7.162\n\t\t\tc1.675,0.503,10.847,5.864,10.847,5.864c2.792-0.279,6.17-0.224,8.962-0.503c-1.731-2.345-2.373-5.277-4.104-7.622\n\t\t\tc4.244,1.899,6.813,4.048,11.057,5.947c2.01-0.111,4.272,0.489,6.282,0.377c-0.558-1.563-0.069-4.132-0.628-5.696\n\t\t\tc2.904,1.675,3.587,3.936,6.114,5.611c3.842-0.203,8.956-0.857,13.025,0.545c1.787,0.935,1.773,4.509,1.131,7.916\n\t\t\tc-1.773,1.382-4.341,2.262-5.989,1.885c-1.62-1.006-3.323-1.508-5.361-1.592c-2.415-1.321-7.971,1.266-16.418,7.538\n\t\t\tc-0.853,2.792-0.822,5.585,0,8.377c4.556,2.041,7.225,3.097,8.879,3.686c2.222,0.527,4.2,0.423,5.864-0.503\n\t\t\tc0.111-2.792-0.154-5.835,1.005-8.377c1.228,1.899,1.619,4.3,2.848,6.199c0.545,1.312,1.799,0.977,3.35,0.168\n\t\t\tc-0.111-1.061-0.223-2.122-0.335-3.183c1.39,1.184,2.749,2.386,3.35,4.021c1.437,2.16,3.696,2.263,6.031,2.177\n\t\t\tc5.316,6.494,7.639,13.163,5.36,20.103c-6.65-0.814-12.483,0.933-17.347,5.704c-0.878,0.009-1.209,3.165-0.746,10.881\n\t\t\tc6.496-0.275,12.786-0.638,14.898,1.978c2.084,3.595,3.739,14.079,2.82,14.314c-32.646,0.083-61.072-17.991-61.942-45.775\n\t\t\tc-9.691,49.385,97.063,77.468,166.334,24.49C421.856,253.569,427.124,192.525,416.691,138.661z\"/>\n\t</g>\n\t</svg>\n</div>\n";

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjdXJ0YWluLmpzIiwiaW5kZXguanMiLCJwcmVsb2FkSW1nLmpzIiwicmVtb3ZlQWxsQ2hpbGRyZW5FbGUuanMiLCJzdHJpbmdUb0RvbS5qcyIsInN2Z0xvZ28uanMiLCJ0ZXh0TW9kZWwuanMiLCJ2c0NpcmNsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDRWdCOztBQUZoQjs7QUFDQTs7QUFDTyxTQUFTLE9BQVQsR0FBbUI7QUFDekIsS0FBSSxtQkFBbUIsS0FBbkIsQ0FEcUI7QUFFekIsS0FBSSxrTEFBSixDQUZ5QjtBQVN6QixLQUFJLGFBQWEsMkJBQVMsVUFBVCxDQUFiLENBVHFCO0FBVXpCLFlBQVcsc0JBQVgsQ0FBa0MsY0FBbEMsRUFBa0QsQ0FBbEQsRUFBcUQsZ0JBQXJELENBQXNFLGVBQXRFLEVBQXVGLFlBQVc7QUFDakcsVUFBUSxHQUFSLENBQVksS0FBWixFQURpRztBQUVqRyxNQUFJLENBQUMsZ0JBQUQsRUFBbUI7QUFDdEIsc0JBQW1CLElBQW5COztBQURzQixHQUF2QjtFQUZzRixDQUF2RixDQVZ5QjtBQWlCekIsUUFBTyxVQUFQLENBakJ5QjtDQUFuQjs7Ozs7QUNGUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFJLGFBQWEsU0FBUyxjQUFULENBQXdCLFVBQXhCLENBQWI7QUFDSixJQUFJLE9BQU8sRUFBUDs7QUFHSixTQUFTLFFBQVQsR0FBb0I7QUFDbkIsS0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFQLENBRGU7QUFFbkIsTUFBSyxTQUFMLG9CQUZtQjtBQUduQixLQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVQsQ0FIZTtBQUluQixRQUFPLFNBQVAsc0JBSm1CO0FBS25CLE1BQUssc0JBQUwsQ0FBNEIsVUFBNUIsRUFB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UUFBRyxXQUFXLEdBQVgsRUFBZ0I7QUFDbEIsV0FBRyxLQUFILEdBRGtCO0tBQW5CO0NBRkQ7Ozs7Ozs7O1FDWGdCO0FBQVQsU0FBUyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQztBQUM1QyxRQUFPLE9BQU8sVUFBUCxFQUFtQjtBQUN0QixTQUFPLFdBQVAsQ0FBbUIsT0FBTyxVQUFQLENBQW5CLENBRHNCO0VBQTFCO0NBRE07Ozs7Ozs7O1FDQVM7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDNUIsTUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFULENBRHdCO0FBRTVCLFNBQU8sU0FBUCxHQUFtQixHQUFuQixDQUY0QjtBQUc1QixNQUFJLFlBQVksT0FBTyxRQUFQLENBQWdCLENBQWhCLENBQVosQ0FId0I7QUFJNUIsU0FBTyxTQUFQLENBSjRCO0NBQXZCOzs7Ozs7OztBQ0FBLElBQUksb3hHQUFKOzs7Ozs7OztRQ0FTO0FBQVQsU0FBUyxTQUFULEdBQXFCO0FBQzNCLEtBQUksd0hBQUosQ0FEMkI7QUFRM0IsUUFBTyxHQUFQLENBUjJCO0NBQXJCOzs7Ozs7OztBQ0FBLElBQUksa3dIQUFKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7c3RyVG9Eb219IGZyb20gJy4vc3RyaW5nVG9Eb20nO1xuaW1wb3J0IHt0ZXh0TW9kZWx9IGZyb20gJy4vdGV4dE1vZGVsJztcbmV4cG9ydCBmdW5jdGlvbiBjdXJ0YWluKCkge1xuXHRsZXQgYWxyZWFkeVRyaWdnZXJlZCA9IGZhbHNlO1xuXHRsZXQgY3VydGFpblN0ciA9IGBcbjxkaXYgaWQ9XCJjdXJ0YWluXCI+XG5cdDxkaXYgY2xhc3M9XCJpbWctYmdcIj48L2Rpdj5cblx0PHNwYW4gY2xhc3M9XCJoYWxmLWN1cnRhaW4gY3VydGFpbi1sZWZ0XCI+PC9zcGFuPlxuXHQ8c3BhbiBjbGFzcz1cImhhbGYtY3VydGFpbiBjdXJ0YWluLXJpZ2h0XCI+PC9zcGFuPlxuPC9kaXY+XG5gO1xuXHRsZXQgY3VydGFpbkRvbSA9IHN0clRvRG9tKGN1cnRhaW5TdHIpO1xuXHRjdXJ0YWluRG9tLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hhbGYtY3VydGFpbicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygnb29vJyk7XG5cdFx0aWYgKCFhbHJlYWR5VHJpZ2dlcmVkKSB7XG5cdFx0XHRhbHJlYWR5VHJpZ2dlcmVkID0gdHJ1ZTtcblx0XHRcdC8vIGN1cnRhaW5Eb20uYXBwZW5kQ2hpbGQoc3RyVG9Eb20odGV4dE1vZGVsKCkpKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gY3VydGFpbkRvbTtcbn0iLCJpbXBvcnQge3N2Z0xvZ299IGZyb20gJy4vc3ZnTG9nbyc7XG5pbXBvcnQge3ZzQ2lyY2xlfSBmcm9tICcuL3ZzQ2lyY2xlJztcbmltcG9ydCB7Y3VydGFpbn0gZnJvbSAnLi9jdXJ0YWluJztcbmltcG9ydCB7cHJlbG9hZEltZ30gZnJvbSAnLi9wcmVsb2FkSW1nJztcbmltcG9ydCB7cmVtb3ZlQWxsQ2hpbGRyZW5FbGV9IGZyb20gJy4vcmVtb3ZlQWxsQ2hpbGRyZW5FbGUnO1xuaW1wb3J0IHt0ZXh0TW9kZWx9IGZyb20gJy4vdGV4dE1vZGVsJztcbmltcG9ydCB7c3RyVG9Eb219IGZyb20gJy4vc3RyaW5nVG9Eb20nO1xuXG5sZXQgX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydCcpO1xubGV0IGltZ3MgPSBbXTtcblxuXG5mdW5jdGlvbiBsb2FkTG9nbygpIHtcblx0bGV0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bG9nby5pbm5lckhUTUwgPSBzdmdMb2dvO1xuXHRsZXQgY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNpcmNsZS5pbm5lckhUTUwgPSB2c0NpcmNsZTtcblx0bG9nby5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdXBlcm1hbicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGxvZ29BbmltYUVuZCk7XG5cdF9jb250YWluZXIuYXBwZW5kQ2hpbGQobG9nbyk7XG5cdC8vIF9jb250YWluZXIuYXBwZW5kQ2hpbGQoY2lyY2xlKTtcbn1cblxuZnVuY3Rpb24gbG9nb0FuaW1hRW5kKCkge1xuXHRyZWRpcmVjdCgpO1xufVxuXG5cbmZ1bmN0aW9uIHNob3dDdXJ0YWluKCkge1xuXHRsZXQgY3VydGFpbkRvbSA9IGN1cnRhaW4oKTtcblx0Y3VydGFpbkRvbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWctYmcnKVswXS5hcHBlbmRDaGlsZChpbWdzWzFdKTtcblx0cmVtb3ZlQWxsQ2hpbGRyZW5FbGUoX2NvbnRhaW5lcik7XG5cdF9jb250YWluZXIuYXBwZW5kQ2hpbGQoY3VydGFpbkRvbSk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnRhaW4nKS5jbGFzc0xpc3QuYWRkKCdvcGVuaW5nJyk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHQgY3VydGFpbkRvbS5hcHBlbmRDaGlsZChzdHJUb0RvbSh0ZXh0TW9kZWwoKSkpOyBcblx0XHRcdCBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0IGN1cnRhaW5Eb20uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGV4dCcpWzBdLmNsYXNzTGlzdC5hZGQoJ29wZW5pbmcnKTtcblx0XHRcdCB9LCAxMDApO1xuXHRcdH0sIDI0MDApO1xuXHR9LCAwKTtcbn1cblxuX2NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZmFkZSk7XG5mdW5jdGlvbiBmYWRlKCkge1xuXHRpZiAoX2NvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhZGUtYXdheScpKSB7XG5cdFx0c2hvd0N1cnRhaW4oKTtcblx0XHRfY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGUtYXdheScpO1xuXHRcdF9jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZmFkZS1pbicpO1xuXHR9IGVsc2Uge1xuXHRcdF9jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZS1pbicpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlZGlyZWN0KCkge1xuXHRfY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmYWRpbmdcIik7XG5cdF9jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImZhZGUtYXdheVwiKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTG9hZGVyKCkge1xuXHRsZXQgbG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRlcicpO1xuXHRsb2FkZXIucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChsb2FkZXIpO1xufVxuXG5cbmltZ3MgPSBwcmVsb2FkSW1nKGFsbExvYWRDQixcblx0J2ltYWdlcy9idnNfYmF0ZmlnaHQuanBnJyxcblx0J2ltYWdlcy9idnNfZmFjZW9mZi5qcGcnLFxuXHQnaW1hZ2VzL2J2c19zdXBlcmZpZ2h0LmpwZycsXG5cdCdpbWFnZXMvYnZzX3d3LmpwZydcbik7XG4gZnVuY3Rpb24gYWxsTG9hZENCKCkge1xuIFx0Y29uc29sZS5sb2coJ2FsbCBkb25lLicpO1xuIFx0cmVtb3ZlTG9hZGVyKCk7XG4gXHRsb2FkTG9nbygpO1xuIH0iLCJsZXQgaW1hZ2VzID0gW107XG5sZXQgbG9hZGVkID0gMDtcbmV4cG9ydCBmdW5jdGlvbiBwcmVsb2FkSW1nKGNiLCAuLi5pbWdzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGltYWdlc1tpXSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZXNbaV0uc3JjID0gaW1nc1tpXTtcbiAgICAgICAgaW1hZ2VzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBhbGxMb2FkQ2FsbGJhY2suYmluZCh0aGlzLCBpbWdzLmxlbmd0aCwgY2IpKTtcbiAgICB9XG4gICAgcmV0dXJuIGltYWdlcztcbn1cblxuZnVuY3Rpb24gYWxsTG9hZENhbGxiYWNrKGxlbiwgY2IpIHtcblx0bG9hZGVkICs9IDE7XG5cdGlmKGxvYWRlZCA9PT0gbGVuKSB7XG5cdFx0Y2IuYXBwbHkoKTtcblx0fVxufSIsImV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGxDaGlsZHJlbkVsZShwYXJlbnQpIHtcblx0d2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG5cdCAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmZpcnN0Q2hpbGQpO1xuXHR9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHN0clRvRG9tKHN0cikge1xuICBsZXQgdG1wRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRtcEVsZS5pbm5lckhUTUwgPSBzdHI7XG4gIGxldCByZXR1cm5Eb20gPSB0bXBFbGUuY2hpbGRyZW5bMF07XG4gIHJldHVybiByZXR1cm5Eb207XG59IiwiZXhwb3J0IGxldCBzdmdMb2dvID0gYFxuPGRpdiBjbGFzcz1cImxvZ29cIj5cbiAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgICAgdmlld0JveD1cIjAgMCA1OTguMDQ5IDI4MC41NTRcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTk4LjA0OSAyODAuNTU0O1wiXG4gICAgIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gIDxkZWZzPlxuICAgIDxmaWx0ZXIgaWQ9XCJibHVyLWZpbHRlclwiIHg9XCItNlwiIHk9XCItNlwiIHdpZHRoPVwiMjAwXCIgaGVpZ2h0PVwiMjAwXCI+XG4gICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49XCJTb3VyY2VHcmFwaGljXCIgc3RkRGV2aWF0aW9uPVwiMlwiIC8+XG4gICAgPC9maWx0ZXI+XG4gICAgPGZpbHRlciBpZD1cInN1cGVybWFuLWlubmVyLXNoYWRvd1wiPlxuICAgICAgPGZlT2Zmc2V0IGR4PVwiMFwiIGR5PVwiMFwiIC8+XG4gICAgICA8ZmVHYXVzc2lhbkJsdXJcbiAgICAgICAgc3RkRGV2aWF0aW9uPVwiMVwiXG4gICAgICAgIHJlc3VsdD1cIm9mZnNldC1ibHVyXCJcbiAgICAgIC8+XG4gICAgICA8ZmVDb21wb3NpdGVcbiAgICAgICAgb3BlcmF0b3I9J291dCdcbiAgICAgICAgaW49J1NvdXJjZUdyYXBoaWMnXG4gICAgICAgIGluMj0nb2Zmc2V0LWJsdXInXG4gICAgICAgIHJlc3VsdD0naW52ZXJzZSdcbiAgICAgIC8+XG4gICAgICA8ZmVGbG9vZFxuICAgICAgICBmbG9vZC1jb2xvcj0nZmYwMDAwJ1xuICAgICAgICBmbG9vZC1vcGFjaXR5PScxJ1xuICAgICAgICByZXN1bHQ9J2NvbG9yJ1xuICAgICAgLz5cbiAgICBcbiAgICAgIDwhLS0gQ2xpcCBjb2xvciBpbnNpZGUgc2hhZG93IC0tPlxuICAgICAgPGZlQ29tcG9zaXRlXG4gICAgICAgIG9wZXJhdG9yPSdpbidcbiAgICAgICAgaW49J2NvbG9yJ1xuICAgICAgICBpbjI9J2ludmVyc2UnXG4gICAgICAgIHJlc3VsdD0nc2hhZG93J1xuICAgICAgLz5cbiAgICBcbiAgICAgIDwhLS0gUHV0IHNoYWRvdyBvdmVyIG9yaWdpbmFsIG9iamVjdCAtLT5cbiAgICAgIDxmZUNvbXBvc2l0ZVxuICAgICAgICBvcGVyYXRvcj0nb3ZlcidcbiAgICAgICAgaW49J3NoYWRvdydcbiAgICAgICAgaW4yPSdTb3VyY2VHcmFwaGljJ1xuICAgICAgLz5cbiAgICA8L2ZpbHRlcj5cbiAgPC9kZWZzPlxuICAgIDxwYXRoIHN0eWxlPVwiZmlsbDojMDAwMDAwO1wiIGQ9XCJNMTY5LjUyNiwxOTIuMDU0bC00NC4wMDEsMy40OThsLTE2LjUsMTkuMDAybC0xNS0xNC41MDJsLTQ1Ljk5OSwxMC41Yy0zMy41MDEsOC40OTktNDgsNDAuMDAyLTQ4LDQwLjAwMlxuICAgICAgYy0xLjUtODIuNSw2Mi40OTktMTY0LjI4NSw2Mi40OTktMTY0LjI4NUM5NC4wMjUsMzUuNDgzLDE1Ni40NjUsMCwxNTYuNDY1LDBsMy40NzUsMTguOTk1YzAsMCwyLjU0Niw5LjAzNSwyNS4yNDgsMTQuODI2XG4gICAgICBsMzUuNjc1LDExLjM1MWgzMC41NzdWMjAuNjE2bDEyLjk3MywxNy44MzRsNjkuMjI0LDAuMDAybDEyLjk3My0xNy44MzZWNDUuMTdoMzAuNTc3bDM1LjY3NS0xMS4zNVxuICAgICAgYzIyLjcwMi01Ljc5MSwyNS4yNDgtMTQuODI2LDI1LjI0OC0xNC44MjZMNDQxLjU4NCwwYzAsMCw2Mi40NCwzNS40ODMsOTMuOTQsODYuMjY3YzAsMCw2My45OTksODEuNzg3LDYyLjQ5OSwxNjQuMjg3XG4gICAgICBjMCwwLTE0LjQ5OS0zMS41MDMtNDgtNDAuMDAybC00NS45OTktMTAuNWwtMTUsMTQuNTAybC0xNi41LTE5LjAwMmwtNDQuMDAxLTMuNDk4bC0xMjkuNSw4N0wxNjkuNTI2LDE5Mi4wNTR6XCIgY2xhc3M9XCJiYXRtYW4tbG9nb1wiLz5cbiAgICA8cGF0aCBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MztzdHJva2UtbWl0ZXJsaW1pdDoxMDtcIiBkPVwiTTM5OS43MTYsNjYuODI4XCIgLz5cbiAgICA8cGF0aCBzdHlsZT1cImZpbGw6I0ZGMDAwMDtcIiBkPVwiTTI5OS4wMjUsMjgwLjU1NGMtMTM5LjUtMTAyLTE3MS41NjUtMTU0LjcxNC0xNzEuNTY1LTE1NC43MTRcbiAgICAgIGMxNi41NzYtMzYuNDE2LDYyLjUzNC02OS4zMTMsNjIuNTM0LTY5LjMxM2M3MC40NzEtMTEuNTMzLDIxOC4wNjIsMCwyMTguMDYyLDBzNDUuOTU4LDMyLjg5OCw2Mi41MzQsNjkuMzEzXG4gICAgICBjMCwwLTMxLjg5LDUyLjQyMS0xNzAuNDExLDE1My44N0wyOTkuMDI1LDI4MC41NTR6IE00MjkuNzk4LDE1NC41MWM2Ljk1NS03LjIwNCwxMy4xNjMtMTQuMTEyLDE4LjI1OC0yMC40ODdcbiAgICAgIGMwLDAtMzcuNTI5LTYwLjcyMi0xMTUuMjgtNjUuOTcyYzAsMC05My43NTItNy40OTgtMTAyLjc1MiwxNi4wMDFjMCwwLTYuNTAyLDIwLjc1MSw1NiwyMC4yNWMwLDAsODIuMjUxLDEuNDk3LDEwNC4wMDEsMTQuNDk5XG4gICAgICBjMCwwLDI4LjI0OCwxMi43NSwzOC40OTksMzIuMDAxTDQyOS43OTgsMTU0LjUxeiBNNDUyLjQzOSwxMjguMjg0YzEuMTMxLTEuNTU2LDIuMTgtMy4wNzMsMy4xNDEtNC41NDdcbiAgICAgIGMwLDAtMTIuNTcxLTIwLjExNS0zNi4yMjYtNDIuNzY5YzAsMCw0LjA0LDEzLjQyOCwxNC44NDIsMjUuMjg4TDQ1Mi40MzksMTI4LjI4NHogTTIwMy41MjMsNjYuODI4aC04Ljg0NVxuICAgICAgYy0zMy45MzUsMjcuNjcxLTUyLjIwNyw1Ni45MDktNTIuMjA3LDU2LjkwOWM0LjUwNCw2LjkwOCwxOS40NDcsMzQuNjczLDE4LjY4NywyMy4yNDRcbiAgICAgIEMxNTcuNzk0LDk2LjQwOSwyMDMuNTIzLDY2LjgyOCwyMDMuNTIzLDY2LjgyOHogTTI5OS4wMjUsMjI4LjQzOGM2Mi4wOTItNC40NzQsNTcuMzgxLTIwLjEwMSw1Ny4zODEtMjAuMTAxXG4gICAgICBjLTEuMzI0LTIwLjM2NC02Ny4xNzUtMTYuNjYxLTY3LjE3NS0xNi42NjFjLTM4Ljg3NywyLjkwOS05OC4wNzMtMTQuNzU3LTk4LjA3My0xNC43NTdjOS44NTEsOS4xOTYsMTkuMjk5LDE5LjgwMiwyOS45NjMsMjguMjU0XG4gICAgICBjMCwwLDM1LjM5OSwyMy42NTEsNzMuOTAxLDIzLjI2NUgyOTkuMDI1eiBNMzMyLjYwNiwyMzguNzEyYy0yMC4wOTgsNC43MjMtNjkuNzM1LDAtNjkuNzM1LDBcbiAgICAgIGMyMS4wNDEsMTcuMDYyLDM2LjE1NSwyOC41OTQsMzYuMTU1LDI4LjU5NEwzMzIuNjA2LDIzOC43MTJ6IE0zOTcuNTI0LDc3LjMwMWMxMC41LDMuMjUsNi45OTktNiw2Ljk5OS02XG4gICAgICBjLTMuNTAxLTEwLjI1LTQzLjk5OC01Ljc1MS00My45OTgtNS43NTFDMzc4LjI3Niw2OS44LDM5Ny41MjQsNzcuMzAxLDM5Ny41MjQsNzcuMzAxelwiIGNsYXNzPVwic3VwZXJtYW4gbG9hZGluZ1wiLz5cbiAgPC9zdmc+XG48L2Rpdj5cbmA7IiwiZXhwb3J0IGZ1bmN0aW9uIHRleHRNb2RlbCgpIHtcblx0bGV0IHN0ciA9IGBcbjxkaXYgY2xhc3M9XCJ0ZXh0LW1vZGVsXCI+XG5cdFx0PHAgY2xhc3M9XCJ0ZXh0XCI+XG5cdFx0XHRsb3JlbWxvcmVtbG9yZW1sb3JlbWxvcmVtbG9yZW1cblx0XHQ8L3A+XG48L2Rpdj5cblx0YDtcblx0cmV0dXJuIHN0cjtcbn0iLCJleHBvcnQgbGV0IHZzQ2lyY2xlID0gYFxuPGRpdiBjbGFzcz1cInZzLWNpcmNsZVwiPlxuXHQ8c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG5cdFx0IHZpZXdCb3g9XCIwIDAgNDk0LjkyMyA1NzcuMDE3XCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5NC45MjMgNTc3LjAxNztcIlxuXHRcdCB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuXHQ8Zz5cblx0XHQ8cGF0aCBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzhFMTgxQTtzdHJva2U6IzhFMTgxQTtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1taXRlcmxpbWl0OjIyLjkyNTY7XCIgZD1cIlxuXHRcdFx0TTc4LjU2NSw0NzQuODU2Yy0yMjYuNjk4LTI0OS42NDQsOTEuNjMtNjE5LjAxNSwyNjkuMTMtNDE2LjM3NWM2OC43MDksODkuMDYxLDU5LjIzNSwxNzIuNjcsMTUuNjU4LDE5OC4wMzhcblx0XHRcdGMtOC43MzMsMC4xNzEtMTguMDAzLDAuMTgyLTI3LjkyLDBjMS44Ni04LjA2MiwyLjM4NS0xNS4yODEsMC0yMC42NjFjLTIuNzkyLTAuMzg4LTUuNzUyLDAuODkxLTguNTQ0LDMuMTgzXG5cdFx0XHRjLTEuODM2LTMuOTIzLTMuNzAzLTcuODM5LTUuOTc0LTEyLjExN2M2LjY0NC01MC4wNDgtMjUuMTAxLTc4LjE4Ny00Ny40NjQtODMuMjAxYzI3LjExNiwxMy44MTQsNDMuODAyLDMzLjUzOSw0NC4xMTUsNjIuNTQyXG5cdFx0XHRjLTkuNjUxLDQuODkyLTMxLjI4Ny0zLjEtNTguMDc0LTIuNzkyQzk0LjMyOCwxOTcuNTEyLDQzLjk1NywzNjUuNzUzLDc4LjU2NSw0NzQuODU2elwiLz5cblx0XHQ8cGF0aCBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzAwMDAwMjtzdHJva2U6IzAwMDAwMjtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1taXRlcmxpbWl0OjIyLjkyNTY7XCIgZD1cIlxuXHRcdFx0TTI5NC40MTksMjM0LjExMmMwLjI0NiwwLjAxMSwzLjYyOC0yLjc0OSwzLjYwMi0zLjkzNmMwLjI1MS0xLjE3MywwLjgzNy0zLjUxOSwyLjU5Ny00LjQ0YzQuMjQ0LTQuNDM5LDYuMjg2LTMuOTk3LDEwLjQ3LTUuNTI3XG5cdFx0XHRjMy44MjUtMS41MDgsNC44MDIsMi4wMSw3LjIwNCwzLjAxNWMxLjM1LDEuMzY3LDEuNTI2LTEzLjkzMSwwLjkyMi0xMy41NjljLTMuMzQ0LTAuODgyLTUuMDI2LTAuMjgxLTYuNTE4LTIuMDIxXG5cdFx0XHRjLTEwLjA0NSw0LjY2My0xNy40ODIsMTIuMTcxLTI1LjA2LDIwLjE5N2MwLjQ3NCwzLjE4MywxLjM2OSw0Ljk0MiwyLjY4MSw2LjAzMUMyOTEuNzQsMjM0LjI4MSwyOTIuOTk2LDIzMy42OTMsMjk0LjQxOSwyMzQuMTEyelwiXG5cdFx0XHQvPlxuXHRcdFxuXHRcdFx0PHBvbHlnb24gc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMwMDAwMDI7c3Ryb2tlOiMwMDAwMDI7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbWl0ZXJsaW1pdDoyMi45MjU2O1wiIHBvaW50cz1cIlxuXHRcdFx0MzE4LjM3OCwyMzMuOTUyIDMyNC45MTIsMjQxLjU3NCAzMzMuNzksMjM4LjcyNiAzMzQuMTI1LDI1Mi42MyAzMjUuMDc5LDI1My40NjggMzIwLjMwNSwyNTkuNDE1IDMwOC4xNTksMjQ0LjE3MSAzMDQuMTM4LDI0Mi43NDcgXG5cdFx0XHQzMTAuODQsMjM5Ljg5OSBcdFwiLz5cblx0XHQ8cGF0aCBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzAwMDAwMjtzdHJva2U6IzAwMDAwMjtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1taXRlcmxpbWl0OjIyLjkyNTY7XCIgZD1cIlxuXHRcdFx0TTMwNi44MTgsMjc5Ljg1NWMtNC41NzYtMC45MjQtNy41Ny0wLjcyNi0xMC44MDUsMS45MjdjLTEuNzUxLDMuNjkzLTEuMTY3LDUuMTU1LDAuODM4LDguMDgzYzQuMzU1LDEuNjgsNy4wMzYsMC45NDgsMTIuMTA0LTAuNDE5XG5cdFx0XHRjMjguNzE2LTguNzcsNDIuMDE3LTE4Ljg0Niw1Mi4xNDItMjkuODYxYy02LjUzNC0wLjI3OS0xMy4wNjctMC41NTktMTkuNi0wLjgzOEMzMjMuOTU0LDI3MS4zOTEsMzEwLjA1NSwyODAuNjIxLDMwNi44MTgsMjc5Ljg1NXpcblx0XHRcdFwiLz5cblx0XHQ8cGF0aCBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzAwMDAwMjtzdHJva2U6IzAwMDAwMjtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1taXRlcmxpbWl0OjIyLjkyNTY7XCIgZD1cIlxuXHRcdFx0TTQxNi42OTEsMTM4LjY2MWMyNS45MDksMzcuOTk2LDUzLjQxMSw2NS43NTYsNzguMjMzLDc4LjgxOWMtMjAuMjU2LDMyLjI2Mi0xOC4zODYsNjguNTAzLTAuMTY3LDEwMC43NjVcblx0XHRcdGMtMzYuNzM5LDE2LjczLTQ5LjU5OSw0Ny43NjItNDguNTgxLDg1LjEwMWMtNTYuOTM2LDQuODk5LTcyLjY5OCw0Ny4zNDktNzMuNzEsNzMuNzFjLTYyLjgyMywzLjg3NS0xMDAuMjA3LDQ3LjYxNi05NC4yMzMsOTkuOTZcblx0XHRcdEMxMzQuODQzLDU3NC4yMTIsOC42MDcsMzEyLjAwOCwxOTEuMTE5LDI0My4zMWM1Ljg1Ni0xLjkxMSwxOC42NTMtMy44MzQsMTcuOTI1LTUuNTdjMCwwLTYuNjU5LTcuNjY1LTQuOTg0LTcuMTYyXG5cdFx0XHRjMS42NzUsMC41MDMsMTAuODQ3LDUuODY0LDEwLjg0Nyw1Ljg2NGMyLjc5Mi0wLjI3OSw2LjE3LTAuMjI0LDguOTYyLTAuNTAzYy0xLjczMS0yLjM0NS0yLjM3My01LjI3Ny00LjEwNC03LjYyMlxuXHRcdFx0YzQuMjQ0LDEuODk5LDYuODEzLDQuMDQ4LDExLjA1Nyw1Ljk0N2MyLjAxLTAuMTExLDQuMjcyLDAuNDg5LDYuMjgyLDAuMzc3Yy0wLjU1OC0xLjU2My0wLjA2OS00LjEzMi0wLjYyOC01LjY5NlxuXHRcdFx0YzIuOTA0LDEuNjc1LDMuNTg3LDMuOTM2LDYuMTE0LDUuNjExYzMuODQyLTAuMjAzLDguOTU2LTAuODU3LDEzLjAyNSwwLjU0NWMxLjc4NywwLjkzNSwxLjc3Myw0LjUwOSwxLjEzMSw3LjkxNlxuXHRcdFx0Yy0xLjc3MywxLjM4Mi00LjM0MSwyLjI2Mi01Ljk4OSwxLjg4NWMtMS42Mi0xLjAwNi0zLjMyMy0xLjUwOC01LjM2MS0xLjU5MmMtMi40MTUtMS4zMjEtNy45NzEsMS4yNjYtMTYuNDE4LDcuNTM4XG5cdFx0XHRjLTAuODUzLDIuNzkyLTAuODIyLDUuNTg1LDAsOC4zNzdjNC41NTYsMi4wNDEsNy4yMjUsMy4wOTcsOC44NzksMy42ODZjMi4yMjIsMC41MjcsNC4yLDAuNDIzLDUuODY0LTAuNTAzXG5cdFx0XHRjMC4xMTEtMi43OTItMC4xNTQtNS44MzUsMS4wMDUtOC4zNzdjMS4yMjgsMS44OTksMS42MTksNC4zLDIuODQ4LDYuMTk5YzAuNTQ1LDEuMzEyLDEuNzk5LDAuOTc3LDMuMzUsMC4xNjhcblx0XHRcdGMtMC4xMTEtMS4wNjEtMC4yMjMtMi4xMjItMC4zMzUtMy4xODNjMS4zOSwxLjE4NCwyLjc0OSwyLjM4NiwzLjM1LDQuMDIxYzEuNDM3LDIuMTYsMy42OTYsMi4yNjMsNi4wMzEsMi4xNzdcblx0XHRcdGM1LjMxNiw2LjQ5NCw3LjYzOSwxMy4xNjMsNS4zNiwyMC4xMDNjLTYuNjUtMC44MTQtMTIuNDgzLDAuOTMzLTE3LjM0Nyw1LjcwNGMtMC44NzgsMC4wMDktMS4yMDksMy4xNjUtMC43NDYsMTAuODgxXG5cdFx0XHRjNi40OTYtMC4yNzUsMTIuNzg2LTAuNjM4LDE0Ljg5OCwxLjk3OGMyLjA4NCwzLjU5NSwzLjczOSwxNC4wNzksMi44MiwxNC4zMTRjLTMyLjY0NiwwLjA4My02MS4wNzItMTcuOTkxLTYxLjk0Mi00NS43NzVcblx0XHRcdGMtOS42OTEsNDkuMzg1LDk3LjA2Myw3Ny40NjgsMTY2LjMzNCwyNC40OUM0MjEuODU2LDI1My41NjksNDI3LjEyNCwxOTIuNTI1LDQxNi42OTEsMTM4LjY2MXpcIi8+XG5cdDwvZz5cblx0PC9zdmc+XG48L2Rpdj5cbmA7Il19
