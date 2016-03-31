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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiY3VydGFpbi5qcyIsImluZGV4LmpzIiwicHJlbG9hZEltZy5qcyIsInJlbW92ZUFsbENoaWxkcmVuRWxlLmpzIiwic3RyaW5nVG9Eb20uanMiLCJzdmdMb2dvLmpzIiwidGV4dE1vZGVsLmpzIiwidnNDaXJjbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRQ0VnQjs7QUFGaEI7O0FBQ0E7O0FBQ08sU0FBUyxPQUFULEdBQW1CO0FBQ3pCLEtBQUksbUJBQW1CLEtBQW5CLENBRHFCO0FBRXpCLEtBQUksa0xBQUosQ0FGeUI7QUFTekIsS0FBSSxhQUFhLDJCQUFTLFVBQVQsQ0FBYixDQVRxQjtBQVV6QixZQUFXLHNCQUFYLENBQWtDLGNBQWxDLEVBQWtELENBQWxELEVBQXFELGdCQUFyRCxDQUFzRSxlQUF0RSxFQUF1RixZQUFXO0FBQ2pHLFVBQVEsR0FBUixDQUFZLEtBQVosRUFEaUc7QUFFakcsTUFBSSxDQUFDLGdCQUFELEVBQW1CO0FBQ3RCLHNCQUFtQixJQUFuQjs7QUFEc0IsR0FBdkI7RUFGc0YsQ0FBdkYsQ0FWeUI7QUFpQnpCLFFBQU8sVUFBUCxDQWpCeUI7Q0FBbkI7Ozs7O0FDRlA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBSSxhQUFhLFNBQVMsY0FBVCxDQUF3QixVQUF4QixDQUFiO0FBQ0osSUFBSSxPQUFPLEVBQVA7O0FBR0osU0FBUyxRQUFULEdBQW9CO0FBQ25CLEtBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBUCxDQURlO0FBRW5CLE1BQUssU0FBTCxvQkFGbUI7QUFHbkIsS0FBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFULENBSGU7QUFJbkIsUUFBTyxTQUFQLHNCQUptQjtBQUtuQixNQUFLLHNCQUFMLENBQTRCLFVBQTVC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RWpDLFFBQUcsV0FBVyxHQUFYLEVBQWdCO0FBQ2xCLFdBQUcsS0FBSCxHQURrQjtLQUFuQjtDQUZEOzs7Ozs7OztRQ1hnQjtBQUFULFNBQVMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0M7QUFDNUMsUUFBTyxPQUFPLFVBQVAsRUFBbUI7QUFDdEIsU0FBTyxXQUFQLENBQW1CLE9BQU8sVUFBUCxDQUFuQixDQURzQjtFQUExQjtDQURNOzs7Ozs7OztRQ0FTO0FBQVQsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQzVCLE1BQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVCxDQUR3QjtBQUU1QixTQUFPLFNBQVAsR0FBbUIsR0FBbkIsQ0FGNEI7QUFHNUIsTUFBSSxZQUFZLE9BQU8sUUFBUCxDQUFnQixDQUFoQixDQUFaLENBSHdCO0FBSTVCLFNBQU8sU0FBUCxDQUo0QjtDQUF2Qjs7Ozs7Ozs7QUNBQSxJQUFJLG94R0FBSjs7Ozs7Ozs7UUNBUztBQUFULFNBQVMsU0FBVCxHQUFxQjtBQUMzQixLQUFJLHdIQUFKLENBRDJCO0FBUTNCLFFBQU8sR0FBUCxDQVIyQjtDQUFyQjs7Ozs7Ozs7QUNBQSxJQUFJLGt3SEFBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge3N0clRvRG9tfSBmcm9tICcuL3N0cmluZ1RvRG9tJztcclxuaW1wb3J0IHt0ZXh0TW9kZWx9IGZyb20gJy4vdGV4dE1vZGVsJztcclxuZXhwb3J0IGZ1bmN0aW9uIGN1cnRhaW4oKSB7XHJcblx0bGV0IGFscmVhZHlUcmlnZ2VyZWQgPSBmYWxzZTtcclxuXHRsZXQgY3VydGFpblN0ciA9IGBcclxuPGRpdiBpZD1cImN1cnRhaW5cIj5cclxuXHQ8ZGl2IGNsYXNzPVwiaW1nLWJnXCI+PC9kaXY+XHJcblx0PHNwYW4gY2xhc3M9XCJoYWxmLWN1cnRhaW4gY3VydGFpbi1sZWZ0XCI+PC9zcGFuPlxyXG5cdDxzcGFuIGNsYXNzPVwiaGFsZi1jdXJ0YWluIGN1cnRhaW4tcmlnaHRcIj48L3NwYW4+XHJcbjwvZGl2PlxyXG5gO1xyXG5cdGxldCBjdXJ0YWluRG9tID0gc3RyVG9Eb20oY3VydGFpblN0cik7XHJcblx0Y3VydGFpbkRvbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoYWxmLWN1cnRhaW4nKVswXS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zb2xlLmxvZygnb29vJyk7XHJcblx0XHRpZiAoIWFscmVhZHlUcmlnZ2VyZWQpIHtcclxuXHRcdFx0YWxyZWFkeVRyaWdnZXJlZCA9IHRydWU7XHJcblx0XHRcdC8vIGN1cnRhaW5Eb20uYXBwZW5kQ2hpbGQoc3RyVG9Eb20odGV4dE1vZGVsKCkpKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRyZXR1cm4gY3VydGFpbkRvbTtcclxufSIsImltcG9ydCB7c3ZnTG9nb30gZnJvbSAnLi9zdmdMb2dvJztcclxuaW1wb3J0IHt2c0NpcmNsZX0gZnJvbSAnLi92c0NpcmNsZSc7XHJcbmltcG9ydCB7Y3VydGFpbn0gZnJvbSAnLi9jdXJ0YWluJztcclxuaW1wb3J0IHtwcmVsb2FkSW1nfSBmcm9tICcuL3ByZWxvYWRJbWcnO1xyXG5pbXBvcnQge3JlbW92ZUFsbENoaWxkcmVuRWxlfSBmcm9tICcuL3JlbW92ZUFsbENoaWxkcmVuRWxlJztcclxuaW1wb3J0IHt0ZXh0TW9kZWx9IGZyb20gJy4vdGV4dE1vZGVsJztcclxuaW1wb3J0IHtzdHJUb0RvbX0gZnJvbSAnLi9zdHJpbmdUb0RvbSc7XHJcblxyXG5sZXQgX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydCcpO1xyXG5sZXQgaW1ncyA9IFtdO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGxvYWRMb2dvKCkge1xyXG5cdGxldCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0bG9nby5pbm5lckhUTUwgPSBzdmdMb2dvO1xyXG5cdGxldCBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRjaXJjbGUuaW5uZXJIVE1MID0gdnNDaXJjbGU7XHJcblx0bG9nby5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdXBlcm1hbicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGxvZ29BbmltYUVuZCk7XHJcblx0X2NvbnRhaW5lci5hcHBlbmRDaGlsZChsb2dvKTtcclxuXHQvLyBfY29udGFpbmVyLmFwcGVuZENoaWxkKGNpcmNsZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvZ29BbmltYUVuZCgpIHtcclxuXHRyZWRpcmVjdCgpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2hvd0N1cnRhaW4oKSB7XHJcblx0bGV0IGN1cnRhaW5Eb20gPSBjdXJ0YWluKCk7XHJcblx0Y3VydGFpbkRvbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWctYmcnKVswXS5hcHBlbmRDaGlsZChpbWdzWzFdKTtcclxuXHRyZW1vdmVBbGxDaGlsZHJlbkVsZShfY29udGFpbmVyKTtcclxuXHRfY29udGFpbmVyLmFwcGVuZENoaWxkKGN1cnRhaW5Eb20pO1xyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VydGFpbicpLmNsYXNzTGlzdC5hZGQoJ29wZW5pbmcnKTtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQgY3VydGFpbkRvbS5hcHBlbmRDaGlsZChzdHJUb0RvbSh0ZXh0TW9kZWwoKSkpOyBcclxuXHRcdFx0IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdCBjdXJ0YWluRG9tLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RleHQnKVswXS5jbGFzc0xpc3QuYWRkKCdvcGVuaW5nJyk7XHJcblx0XHRcdCB9LCAxMDApO1xyXG5cdFx0fSwgMjQwMCk7XHJcblx0fSwgMCk7XHJcbn1cclxuXHJcbl9jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZhZGUpO1xyXG5mdW5jdGlvbiBmYWRlKCkge1xyXG5cdGlmIChfY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnZmFkZS1hd2F5JykpIHtcclxuXHRcdHNob3dDdXJ0YWluKCk7XHJcblx0XHRfY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGUtYXdheScpO1xyXG5cdFx0X2NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmYWRlLWluJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdF9jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZS1pbicpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVkaXJlY3QoKSB7XHJcblx0X2NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZmFkaW5nXCIpO1xyXG5cdF9jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImZhZGUtYXdheVwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlTG9hZGVyKCkge1xyXG5cdGxldCBsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGVyJyk7XHJcblx0bG9hZGVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQobG9hZGVyKTtcclxufVxyXG5cclxuXHJcbmltZ3MgPSBwcmVsb2FkSW1nKGFsbExvYWRDQixcclxuXHQnaW1hZ2VzL2J2c19iYXRmaWdodC5qcGcnLFxyXG5cdCdpbWFnZXMvYnZzX2ZhY2VvZmYuanBnJyxcclxuXHQnaW1hZ2VzL2J2c19zdXBlcmZpZ2h0LmpwZycsXHJcblx0J2ltYWdlcy9idnNfd3cuanBnJ1xyXG4pO1xyXG4gZnVuY3Rpb24gYWxsTG9hZENCKCkge1xyXG4gXHRjb25zb2xlLmxvZygnYWxsIGRvbmUuJyk7XHJcbiBcdHJlbW92ZUxvYWRlcigpO1xyXG4gXHRsb2FkTG9nbygpO1xyXG4gfSIsImxldCBpbWFnZXMgPSBbXTtcclxubGV0IGxvYWRlZCA9IDA7XHJcbmV4cG9ydCBmdW5jdGlvbiBwcmVsb2FkSW1nKGNiLCAuLi5pbWdzKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbWFnZXNbaV0gPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWFnZXNbaV0uc3JjID0gaW1nc1tpXTtcclxuICAgICAgICBpbWFnZXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGFsbExvYWRDYWxsYmFjay5iaW5kKHRoaXMsIGltZ3MubGVuZ3RoLCBjYikpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGltYWdlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWxsTG9hZENhbGxiYWNrKGxlbiwgY2IpIHtcclxuXHRsb2FkZWQgKz0gMTtcclxuXHRpZihsb2FkZWQgPT09IGxlbikge1xyXG5cdFx0Y2IuYXBwbHkoKTtcclxuXHR9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsQ2hpbGRyZW5FbGUocGFyZW50KSB7XHJcblx0d2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XHJcblx0ICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XHJcblx0fVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIHN0clRvRG9tKHN0cikge1xyXG4gIGxldCB0bXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0bXBFbGUuaW5uZXJIVE1MID0gc3RyO1xyXG4gIGxldCByZXR1cm5Eb20gPSB0bXBFbGUuY2hpbGRyZW5bMF07XHJcbiAgcmV0dXJuIHJldHVybkRvbTtcclxufSIsImV4cG9ydCBsZXQgc3ZnTG9nbyA9IGBcclxuPGRpdiBjbGFzcz1cImxvZ29cIj5cclxuICA8c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNTk4LjA0OSAyODAuNTU0XCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5OC4wNDkgMjgwLjU1NDtcIlxyXG4gICAgIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XHJcbiAgPGRlZnM+XHJcbiAgICA8ZmlsdGVyIGlkPVwiYmx1ci1maWx0ZXJcIiB4PVwiLTZcIiB5PVwiLTZcIiB3aWR0aD1cIjIwMFwiIGhlaWdodD1cIjIwMFwiPlxyXG4gICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49XCJTb3VyY2VHcmFwaGljXCIgc3RkRGV2aWF0aW9uPVwiMlwiIC8+XHJcbiAgICA8L2ZpbHRlcj5cclxuICAgIDxmaWx0ZXIgaWQ9XCJzdXBlcm1hbi1pbm5lci1zaGFkb3dcIj5cclxuICAgICAgPGZlT2Zmc2V0IGR4PVwiMFwiIGR5PVwiMFwiIC8+XHJcbiAgICAgIDxmZUdhdXNzaWFuQmx1clxyXG4gICAgICAgIHN0ZERldmlhdGlvbj1cIjFcIlxyXG4gICAgICAgIHJlc3VsdD1cIm9mZnNldC1ibHVyXCJcclxuICAgICAgLz5cclxuICAgICAgPGZlQ29tcG9zaXRlXHJcbiAgICAgICAgb3BlcmF0b3I9J291dCdcclxuICAgICAgICBpbj0nU291cmNlR3JhcGhpYydcclxuICAgICAgICBpbjI9J29mZnNldC1ibHVyJ1xyXG4gICAgICAgIHJlc3VsdD0naW52ZXJzZSdcclxuICAgICAgLz5cclxuICAgICAgPGZlRmxvb2RcclxuICAgICAgICBmbG9vZC1jb2xvcj0nZmYwMDAwJ1xyXG4gICAgICAgIGZsb29kLW9wYWNpdHk9JzEnXHJcbiAgICAgICAgcmVzdWx0PSdjb2xvcidcclxuICAgICAgLz5cclxuICAgIFxyXG4gICAgICA8IS0tIENsaXAgY29sb3IgaW5zaWRlIHNoYWRvdyAtLT5cclxuICAgICAgPGZlQ29tcG9zaXRlXHJcbiAgICAgICAgb3BlcmF0b3I9J2luJ1xyXG4gICAgICAgIGluPSdjb2xvcidcclxuICAgICAgICBpbjI9J2ludmVyc2UnXHJcbiAgICAgICAgcmVzdWx0PSdzaGFkb3cnXHJcbiAgICAgIC8+XHJcbiAgICBcclxuICAgICAgPCEtLSBQdXQgc2hhZG93IG92ZXIgb3JpZ2luYWwgb2JqZWN0IC0tPlxyXG4gICAgICA8ZmVDb21wb3NpdGVcclxuICAgICAgICBvcGVyYXRvcj0nb3ZlcidcclxuICAgICAgICBpbj0nc2hhZG93J1xyXG4gICAgICAgIGluMj0nU291cmNlR3JhcGhpYydcclxuICAgICAgLz5cclxuICAgIDwvZmlsdGVyPlxyXG4gIDwvZGVmcz5cclxuICAgIDxwYXRoIHN0eWxlPVwiZmlsbDojMDAwMDAwO1wiIGQ9XCJNMTY5LjUyNiwxOTIuMDU0bC00NC4wMDEsMy40OThsLTE2LjUsMTkuMDAybC0xNS0xNC41MDJsLTQ1Ljk5OSwxMC41Yy0zMy41MDEsOC40OTktNDgsNDAuMDAyLTQ4LDQwLjAwMlxyXG4gICAgICBjLTEuNS04Mi41LDYyLjQ5OS0xNjQuMjg1LDYyLjQ5OS0xNjQuMjg1Qzk0LjAyNSwzNS40ODMsMTU2LjQ2NSwwLDE1Ni40NjUsMGwzLjQ3NSwxOC45OTVjMCwwLDIuNTQ2LDkuMDM1LDI1LjI0OCwxNC44MjZcclxuICAgICAgbDM1LjY3NSwxMS4zNTFoMzAuNTc3VjIwLjYxNmwxMi45NzMsMTcuODM0bDY5LjIyNCwwLjAwMmwxMi45NzMtMTcuODM2VjQ1LjE3aDMwLjU3N2wzNS42NzUtMTEuMzVcclxuICAgICAgYzIyLjcwMi01Ljc5MSwyNS4yNDgtMTQuODI2LDI1LjI0OC0xNC44MjZMNDQxLjU4NCwwYzAsMCw2Mi40NCwzNS40ODMsOTMuOTQsODYuMjY3YzAsMCw2My45OTksODEuNzg3LDYyLjQ5OSwxNjQuMjg3XHJcbiAgICAgIGMwLDAtMTQuNDk5LTMxLjUwMy00OC00MC4wMDJsLTQ1Ljk5OS0xMC41bC0xNSwxNC41MDJsLTE2LjUtMTkuMDAybC00NC4wMDEtMy40OThsLTEyOS41LDg3TDE2OS41MjYsMTkyLjA1NHpcIiBjbGFzcz1cImJhdG1hbi1sb2dvXCIvPlxyXG4gICAgPHBhdGggc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLW1pdGVybGltaXQ6MTA7XCIgZD1cIk0zOTkuNzE2LDY2LjgyOFwiIC8+XHJcbiAgICA8cGF0aCBzdHlsZT1cImZpbGw6I0ZGMDAwMDtcIiBkPVwiTTI5OS4wMjUsMjgwLjU1NGMtMTM5LjUtMTAyLTE3MS41NjUtMTU0LjcxNC0xNzEuNTY1LTE1NC43MTRcclxuICAgICAgYzE2LjU3Ni0zNi40MTYsNjIuNTM0LTY5LjMxMyw2Mi41MzQtNjkuMzEzYzcwLjQ3MS0xMS41MzMsMjE4LjA2MiwwLDIxOC4wNjIsMHM0NS45NTgsMzIuODk4LDYyLjUzNCw2OS4zMTNcclxuICAgICAgYzAsMC0zMS44OSw1Mi40MjEtMTcwLjQxMSwxNTMuODdMMjk5LjAyNSwyODAuNTU0eiBNNDI5Ljc5OCwxNTQuNTFjNi45NTUtNy4yMDQsMTMuMTYzLTE0LjExMiwxOC4yNTgtMjAuNDg3XHJcbiAgICAgIGMwLDAtMzcuNTI5LTYwLjcyMi0xMTUuMjgtNjUuOTcyYzAsMC05My43NTItNy40OTgtMTAyLjc1MiwxNi4wMDFjMCwwLTYuNTAyLDIwLjc1MSw1NiwyMC4yNWMwLDAsODIuMjUxLDEuNDk3LDEwNC4wMDEsMTQuNDk5XHJcbiAgICAgIGMwLDAsMjguMjQ4LDEyLjc1LDM4LjQ5OSwzMi4wMDFMNDI5Ljc5OCwxNTQuNTF6IE00NTIuNDM5LDEyOC4yODRjMS4xMzEtMS41NTYsMi4xOC0zLjA3MywzLjE0MS00LjU0N1xyXG4gICAgICBjMCwwLTEyLjU3MS0yMC4xMTUtMzYuMjI2LTQyLjc2OWMwLDAsNC4wNCwxMy40MjgsMTQuODQyLDI1LjI4OEw0NTIuNDM5LDEyOC4yODR6IE0yMDMuNTIzLDY2LjgyOGgtOC44NDVcclxuICAgICAgYy0zMy45MzUsMjcuNjcxLTUyLjIwNyw1Ni45MDktNTIuMjA3LDU2LjkwOWM0LjUwNCw2LjkwOCwxOS40NDcsMzQuNjczLDE4LjY4NywyMy4yNDRcclxuICAgICAgQzE1Ny43OTQsOTYuNDA5LDIwMy41MjMsNjYuODI4LDIwMy41MjMsNjYuODI4eiBNMjk5LjAyNSwyMjguNDM4YzYyLjA5Mi00LjQ3NCw1Ny4zODEtMjAuMTAxLDU3LjM4MS0yMC4xMDFcclxuICAgICAgYy0xLjMyNC0yMC4zNjQtNjcuMTc1LTE2LjY2MS02Ny4xNzUtMTYuNjYxYy0zOC44NzcsMi45MDktOTguMDczLTE0Ljc1Ny05OC4wNzMtMTQuNzU3YzkuODUxLDkuMTk2LDE5LjI5OSwxOS44MDIsMjkuOTYzLDI4LjI1NFxyXG4gICAgICBjMCwwLDM1LjM5OSwyMy42NTEsNzMuOTAxLDIzLjI2NUgyOTkuMDI1eiBNMzMyLjYwNiwyMzguNzEyYy0yMC4wOTgsNC43MjMtNjkuNzM1LDAtNjkuNzM1LDBcclxuICAgICAgYzIxLjA0MSwxNy4wNjIsMzYuMTU1LDI4LjU5NCwzNi4xNTUsMjguNTk0TDMzMi42MDYsMjM4LjcxMnogTTM5Ny41MjQsNzcuMzAxYzEwLjUsMy4yNSw2Ljk5OS02LDYuOTk5LTZcclxuICAgICAgYy0zLjUwMS0xMC4yNS00My45OTgtNS43NTEtNDMuOTk4LTUuNzUxQzM3OC4yNzYsNjkuOCwzOTcuNTI0LDc3LjMwMSwzOTcuNTI0LDc3LjMwMXpcIiBjbGFzcz1cInN1cGVybWFuIGxvYWRpbmdcIi8+XHJcbiAgPC9zdmc+XHJcbjwvZGl2PlxyXG5gOyIsImV4cG9ydCBmdW5jdGlvbiB0ZXh0TW9kZWwoKSB7XHJcblx0bGV0IHN0ciA9IGBcclxuPGRpdiBjbGFzcz1cInRleHQtbW9kZWxcIj5cclxuXHRcdDxwIGNsYXNzPVwidGV4dFwiPlxyXG5cdFx0XHRsb3JlbWxvcmVtbG9yZW1sb3JlbWxvcmVtbG9yZW1cclxuXHRcdDwvcD5cclxuPC9kaXY+XHJcblx0YDtcclxuXHRyZXR1cm4gc3RyO1xyXG59IiwiZXhwb3J0IGxldCB2c0NpcmNsZSA9IGBcclxuPGRpdiBjbGFzcz1cInZzLWNpcmNsZVwiPlxyXG5cdDxzdmcgdmVyc2lvbj1cIjEuMVwiIGlkPVwiQ2FwYV8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcclxuXHRcdCB2aWV3Qm94PVwiMCAwIDQ5NC45MjMgNTc3LjAxN1wiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTQuOTIzIDU3Ny4wMTc7XCJcclxuXHRcdCB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxyXG5cdDxnPlxyXG5cdFx0PHBhdGggc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiM4RTE4MUE7c3Ryb2tlOiM4RTE4MUE7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbWl0ZXJsaW1pdDoyMi45MjU2O1wiIGQ9XCJcclxuXHRcdFx0TTc4LjU2NSw0NzQuODU2Yy0yMjYuNjk4LTI0OS42NDQsOTEuNjMtNjE5LjAxNSwyNjkuMTMtNDE2LjM3NWM2OC43MDksODkuMDYxLDU5LjIzNSwxNzIuNjcsMTUuNjU4LDE5OC4wMzhcclxuXHRcdFx0Yy04LjczMywwLjE3MS0xOC4wMDMsMC4xODItMjcuOTIsMGMxLjg2LTguMDYyLDIuMzg1LTE1LjI4MSwwLTIwLjY2MWMtMi43OTItMC4zODgtNS43NTIsMC44OTEtOC41NDQsMy4xODNcclxuXHRcdFx0Yy0xLjgzNi0zLjkyMy0zLjcwMy03LjgzOS01Ljk3NC0xMi4xMTdjNi42NDQtNTAuMDQ4LTI1LjEwMS03OC4xODctNDcuNDY0LTgzLjIwMWMyNy4xMTYsMTMuODE0LDQzLjgwMiwzMy41MzksNDQuMTE1LDYyLjU0MlxyXG5cdFx0XHRjLTkuNjUxLDQuODkyLTMxLjI4Ny0zLjEtNTguMDc0LTIuNzkyQzk0LjMyOCwxOTcuNTEyLDQzLjk1NywzNjUuNzUzLDc4LjU2NSw0NzQuODU2elwiLz5cclxuXHRcdDxwYXRoIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMDAwMDAyO3N0cm9rZTojMDAwMDAyO3N0cm9rZS13aWR0aDowLjU7c3Ryb2tlLW1pdGVybGltaXQ6MjIuOTI1NjtcIiBkPVwiXHJcblx0XHRcdE0yOTQuNDE5LDIzNC4xMTJjMC4yNDYsMC4wMTEsMy42MjgtMi43NDksMy42MDItMy45MzZjMC4yNTEtMS4xNzMsMC44MzctMy41MTksMi41OTctNC40NGM0LjI0NC00LjQzOSw2LjI4Ni0zLjk5NywxMC40Ny01LjUyN1xyXG5cdFx0XHRjMy44MjUtMS41MDgsNC44MDIsMi4wMSw3LjIwNCwzLjAxNWMxLjM1LDEuMzY3LDEuNTI2LTEzLjkzMSwwLjkyMi0xMy41NjljLTMuMzQ0LTAuODgyLTUuMDI2LTAuMjgxLTYuNTE4LTIuMDIxXHJcblx0XHRcdGMtMTAuMDQ1LDQuNjYzLTE3LjQ4MiwxMi4xNzEtMjUuMDYsMjAuMTk3YzAuNDc0LDMuMTgzLDEuMzY5LDQuOTQyLDIuNjgxLDYuMDMxQzI5MS43NCwyMzQuMjgxLDI5Mi45OTYsMjMzLjY5MywyOTQuNDE5LDIzNC4xMTJ6XCJcclxuXHRcdFx0Lz5cclxuXHRcdFxyXG5cdFx0XHQ8cG9seWdvbiBzdHlsZT1cImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzAwMDAwMjtzdHJva2U6IzAwMDAwMjtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1taXRlcmxpbWl0OjIyLjkyNTY7XCIgcG9pbnRzPVwiXHJcblx0XHRcdDMxOC4zNzgsMjMzLjk1MiAzMjQuOTEyLDI0MS41NzQgMzMzLjc5LDIzOC43MjYgMzM0LjEyNSwyNTIuNjMgMzI1LjA3OSwyNTMuNDY4IDMyMC4zMDUsMjU5LjQxNSAzMDguMTU5LDI0NC4xNzEgMzA0LjEzOCwyNDIuNzQ3IFxyXG5cdFx0XHQzMTAuODQsMjM5Ljg5OSBcdFwiLz5cclxuXHRcdDxwYXRoIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMDAwMDAyO3N0cm9rZTojMDAwMDAyO3N0cm9rZS13aWR0aDowLjU7c3Ryb2tlLW1pdGVybGltaXQ6MjIuOTI1NjtcIiBkPVwiXHJcblx0XHRcdE0zMDYuODE4LDI3OS44NTVjLTQuNTc2LTAuOTI0LTcuNTctMC43MjYtMTAuODA1LDEuOTI3Yy0xLjc1MSwzLjY5My0xLjE2Nyw1LjE1NSwwLjgzOCw4LjA4M2M0LjM1NSwxLjY4LDcuMDM2LDAuOTQ4LDEyLjEwNC0wLjQxOVxyXG5cdFx0XHRjMjguNzE2LTguNzcsNDIuMDE3LTE4Ljg0Niw1Mi4xNDItMjkuODYxYy02LjUzNC0wLjI3OS0xMy4wNjctMC41NTktMTkuNi0wLjgzOEMzMjMuOTU0LDI3MS4zOTEsMzEwLjA1NSwyODAuNjIxLDMwNi44MTgsMjc5Ljg1NXpcclxuXHRcdFx0XCIvPlxyXG5cdFx0PHBhdGggc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMwMDAwMDI7c3Ryb2tlOiMwMDAwMDI7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbWl0ZXJsaW1pdDoyMi45MjU2O1wiIGQ9XCJcclxuXHRcdFx0TTQxNi42OTEsMTM4LjY2MWMyNS45MDksMzcuOTk2LDUzLjQxMSw2NS43NTYsNzguMjMzLDc4LjgxOWMtMjAuMjU2LDMyLjI2Mi0xOC4zODYsNjguNTAzLTAuMTY3LDEwMC43NjVcclxuXHRcdFx0Yy0zNi43MzksMTYuNzMtNDkuNTk5LDQ3Ljc2Mi00OC41ODEsODUuMTAxYy01Ni45MzYsNC44OTktNzIuNjk4LDQ3LjM0OS03My43MSw3My43MWMtNjIuODIzLDMuODc1LTEwMC4yMDcsNDcuNjE2LTk0LjIzMyw5OS45NlxyXG5cdFx0XHRDMTM0Ljg0Myw1NzQuMjEyLDguNjA3LDMxMi4wMDgsMTkxLjExOSwyNDMuMzFjNS44NTYtMS45MTEsMTguNjUzLTMuODM0LDE3LjkyNS01LjU3YzAsMC02LjY1OS03LjY2NS00Ljk4NC03LjE2MlxyXG5cdFx0XHRjMS42NzUsMC41MDMsMTAuODQ3LDUuODY0LDEwLjg0Nyw1Ljg2NGMyLjc5Mi0wLjI3OSw2LjE3LTAuMjI0LDguOTYyLTAuNTAzYy0xLjczMS0yLjM0NS0yLjM3My01LjI3Ny00LjEwNC03LjYyMlxyXG5cdFx0XHRjNC4yNDQsMS44OTksNi44MTMsNC4wNDgsMTEuMDU3LDUuOTQ3YzIuMDEtMC4xMTEsNC4yNzIsMC40ODksNi4yODIsMC4zNzdjLTAuNTU4LTEuNTYzLTAuMDY5LTQuMTMyLTAuNjI4LTUuNjk2XHJcblx0XHRcdGMyLjkwNCwxLjY3NSwzLjU4NywzLjkzNiw2LjExNCw1LjYxMWMzLjg0Mi0wLjIwMyw4Ljk1Ni0wLjg1NywxMy4wMjUsMC41NDVjMS43ODcsMC45MzUsMS43NzMsNC41MDksMS4xMzEsNy45MTZcclxuXHRcdFx0Yy0xLjc3MywxLjM4Mi00LjM0MSwyLjI2Mi01Ljk4OSwxLjg4NWMtMS42Mi0xLjAwNi0zLjMyMy0xLjUwOC01LjM2MS0xLjU5MmMtMi40MTUtMS4zMjEtNy45NzEsMS4yNjYtMTYuNDE4LDcuNTM4XHJcblx0XHRcdGMtMC44NTMsMi43OTItMC44MjIsNS41ODUsMCw4LjM3N2M0LjU1NiwyLjA0MSw3LjIyNSwzLjA5Nyw4Ljg3OSwzLjY4NmMyLjIyMiwwLjUyNyw0LjIsMC40MjMsNS44NjQtMC41MDNcclxuXHRcdFx0YzAuMTExLTIuNzkyLTAuMTU0LTUuODM1LDEuMDA1LTguMzc3YzEuMjI4LDEuODk5LDEuNjE5LDQuMywyLjg0OCw2LjE5OWMwLjU0NSwxLjMxMiwxLjc5OSwwLjk3NywzLjM1LDAuMTY4XHJcblx0XHRcdGMtMC4xMTEtMS4wNjEtMC4yMjMtMi4xMjItMC4zMzUtMy4xODNjMS4zOSwxLjE4NCwyLjc0OSwyLjM4NiwzLjM1LDQuMDIxYzEuNDM3LDIuMTYsMy42OTYsMi4yNjMsNi4wMzEsMi4xNzdcclxuXHRcdFx0YzUuMzE2LDYuNDk0LDcuNjM5LDEzLjE2Myw1LjM2LDIwLjEwM2MtNi42NS0wLjgxNC0xMi40ODMsMC45MzMtMTcuMzQ3LDUuNzA0Yy0wLjg3OCwwLjAwOS0xLjIwOSwzLjE2NS0wLjc0NiwxMC44ODFcclxuXHRcdFx0YzYuNDk2LTAuMjc1LDEyLjc4Ni0wLjYzOCwxNC44OTgsMS45NzhjMi4wODQsMy41OTUsMy43MzksMTQuMDc5LDIuODIsMTQuMzE0Yy0zMi42NDYsMC4wODMtNjEuMDcyLTE3Ljk5MS02MS45NDItNDUuNzc1XHJcblx0XHRcdGMtOS42OTEsNDkuMzg1LDk3LjA2Myw3Ny40NjgsMTY2LjMzNCwyNC40OUM0MjEuODU2LDI1My41NjksNDI3LjEyNCwxOTIuNTI1LDQxNi42OTEsMTM4LjY2MXpcIi8+XHJcblx0PC9nPlxyXG5cdDwvc3ZnPlxyXG48L2Rpdj5cclxuYDsiXX0=
