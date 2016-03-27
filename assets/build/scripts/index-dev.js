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
	_container.appendChild(circle);
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
		}, 2500);
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
var svgLogo = exports.svgLogo = "\n<div class=\"logo\">\n  <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n      viewBox=\"0 0 598.049 280.554\" style=\"enable-background:new 0 0 598.049 280.554;\"\n     xml:space=\"preserve\">\n  <defs>\n    <filter id=\"blur-filter\" x=\"-6\" y=\"-6\" width=\"200\" height=\"200\">\n      <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"2\" />\n    </filter>\n    <filter id=\"superman-inner-shadow\">\n      <feOffset dx=\"0\" dy=\"0\" />\n      <feGaussianBlur\n        stdDeviation=\"8\"\n        result=\"offset-blur\"\n      />\n      <feComposite\n        operator='out'\n        in='SourceGraphic'\n        in2='offset-blur'\n        result='inverse'\n      />\n      <feFlood\n        flood-color='ff0000'\n        flood-opacity='1'\n        result='color'\n      />\n    \n      <!-- Clip color inside shadow -->\n      <feComposite\n        operator='in'\n        in='color'\n        in2='inverse'\n        result='shadow'\n      />\n    \n      <!-- Put shadow over original object -->\n      <feComposite\n        operator='over'\n        in='shadow'\n        in2='SourceGraphic'\n      />\n    </filter>\n  </defs>\n    <path style=\"fill:#000000;\" d=\"M169.526,192.054l-44.001,3.498l-16.5,19.002l-15-14.502l-45.999,10.5c-33.501,8.499-48,40.002-48,40.002\n      c-1.5-82.5,62.499-164.285,62.499-164.285C94.025,35.483,156.465,0,156.465,0l3.475,18.995c0,0,2.546,9.035,25.248,14.826\n      l35.675,11.351h30.577V20.616l12.973,17.834l69.224,0.002l12.973-17.836V45.17h30.577l35.675-11.35\n      c22.702-5.791,25.248-14.826,25.248-14.826L441.584,0c0,0,62.44,35.483,93.94,86.267c0,0,63.999,81.787,62.499,164.287\n      c0,0-14.499-31.503-48-40.002l-45.999-10.5l-15,14.502l-16.5-19.002l-44.001-3.498l-129.5,87L169.526,192.054z\" class=\"batman-logo\"/>\n    <path style=\"fill:none;stroke:#FFFFFF;stroke-width:3;stroke-miterlimit:10;\" d=\"M399.716,66.828\" />\n    <path style=\"fill:#FF0000;\" d=\"M299.025,280.554c-139.5-102-171.565-154.714-171.565-154.714\n      c16.576-36.416,62.534-69.313,62.534-69.313c70.471-11.533,218.062,0,218.062,0s45.958,32.898,62.534,69.313\n      c0,0-31.89,52.421-170.411,153.87L299.025,280.554z M429.798,154.51c6.955-7.204,13.163-14.112,18.258-20.487\n      c0,0-37.529-60.722-115.28-65.972c0,0-93.752-7.498-102.752,16.001c0,0-6.502,20.751,56,20.25c0,0,82.251,1.497,104.001,14.499\n      c0,0,28.248,12.75,38.499,32.001L429.798,154.51z M452.439,128.284c1.131-1.556,2.18-3.073,3.141-4.547\n      c0,0-12.571-20.115-36.226-42.769c0,0,4.04,13.428,14.842,25.288L452.439,128.284z M203.523,66.828h-8.845\n      c-33.935,27.671-52.207,56.909-52.207,56.909c4.504,6.908,19.447,34.673,18.687,23.244\n      C157.794,96.409,203.523,66.828,203.523,66.828z M299.025,228.438c62.092-4.474,57.381-20.101,57.381-20.101\n      c-1.324-20.364-67.175-16.661-67.175-16.661c-38.877,2.909-98.073-14.757-98.073-14.757c9.851,9.196,19.299,19.802,29.963,28.254\n      c0,0,35.399,23.651,73.901,23.265H299.025z M332.606,238.712c-20.098,4.723-69.735,0-69.735,0\n      c21.041,17.062,36.155,28.594,36.155,28.594L332.606,238.712z M397.524,77.301c10.5,3.25,6.999-6,6.999-6\n      c-3.501-10.25-43.998-5.751-43.998-5.751C378.276,69.8,397.524,77.301,397.524,77.301z\" class=\"superman loading\"/>\n  </svg>\n</div>\n";

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.textModel = textModel;
function textModel() {
	var str = "\n<div class=\"text-model\">\n\t\t<p>\n\t\t\tloremloremloremloremloremlorem\n\t\t</p>\n</div>\n\t";
	return str;
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var vsCircle = exports.vsCircle = "\n<div class=\"vs-circle\">\n\t<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t\t viewBox=\"0 0 494.923 577.017\" style=\"enable-background:new 0 0 494.923 577.017;\"\n\t\t xml:space=\"preserve\">\n\t<g>\n\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#8E181A;stroke:#8E181A;stroke-width:0.5;stroke-miterlimit:22.9256;\" d=\"\n\t\t\tM78.565,474.856c-226.698-249.644,91.63-619.015,269.13-416.375c68.709,89.061,59.235,172.67,15.658,198.038\n\t\t\tc-8.733,0.171-18.003,0.182-27.92,0c1.86-8.062,2.385-15.281,0-20.661c-2.792-0.388-5.752,0.891-8.544,3.183\n\t\t\tc-1.836-3.923-3.703-7.839-5.974-12.117c6.644-50.048-25.101-78.187-47.464-83.201c27.116,13.814,43.802,33.539,44.115,62.542\n\t\t\tc-9.651,4.892-31.287-3.1-58.074-2.792C94.328,197.512,43.957,365.753,78.565,474.856z\"/>\n\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#000002;stroke:#000002;stroke-width:0.5;stroke-miterlimit:22.9256;\" d=\"\n\t\t\tM294.419,234.112c0.246,0.011,3.628-2.749,3.602-3.936c0.251-1.173,0.837-3.519,2.597-4.44c4.244-4.439,6.286-3.997,10.47-5.527\n\t\t\tc3.825-1.508,4.802,2.01,7.204,3.015c1.35,1.367,1.526-13.931,0.922-13.569c-3.344-0.882-5.026-0.281-6.518-2.021\n\t\t\tc-10.045,4.663-17.482,12.171-25.06,20.197c0.474,3.183,1.369,4.942,2.681,6.031C291.74,234.281,292.996,233.693,294.419,234.112z\"\n\t\t\t/>\n\t\t\n\t\t\t<polygon style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#000002;stroke:#000002;stroke-width:0.5;stroke-miterlimit:22.9256;\" points=\"\n\t\t\t318.378,233.952 324.912,241.574 333.79,238.726 334.125,252.63 325.079,253.468 320.305,259.415 308.159,244.171 304.138,242.747 \n\t\t\t310.84,239.899 \t\"/>\n\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#000002;stroke:#000002;stroke-width:0.5;stroke-miterlimit:22.9256;\" d=\"\n\t\t\tM306.818,279.855c-4.576-0.924-7.57-0.726-10.805,1.927c-1.751,3.693-1.167,5.155,0.838,8.083c4.355,1.68,7.036,0.948,12.104-0.419\n\t\t\tc28.716-8.77,42.017-18.846,52.142-29.861c-6.534-0.279-13.067-0.559-19.6-0.838C323.954,271.391,310.055,280.621,306.818,279.855z\n\t\t\t\"/>\n\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#000002;stroke:#000002;stroke-width:0.5;stroke-miterlimit:22.9256;\" d=\"\n\t\t\tM416.691,138.661c25.909,37.996,53.411,65.756,78.233,78.819c-20.256,32.262-18.386,68.503-0.167,100.765\n\t\t\tc-36.739,16.73-49.599,47.762-48.581,85.101c-56.936,4.899-72.698,47.349-73.71,73.71c-62.823,3.875-100.207,47.616-94.233,99.96\n\t\t\tC134.843,574.212,8.607,312.008,191.119,243.31c5.856-1.911,18.653-3.834,17.925-5.57c0,0-6.659-7.665-4.984-7.162\n\t\t\tc1.675,0.503,10.847,5.864,10.847,5.864c2.792-0.279,6.17-0.224,8.962-0.503c-1.731-2.345-2.373-5.277-4.104-7.622\n\t\t\tc4.244,1.899,6.813,4.048,11.057,5.947c2.01-0.111,4.272,0.489,6.282,0.377c-0.558-1.563-0.069-4.132-0.628-5.696\n\t\t\tc2.904,1.675,3.587,3.936,6.114,5.611c3.842-0.203,8.956-0.857,13.025,0.545c1.787,0.935,1.773,4.509,1.131,7.916\n\t\t\tc-1.773,1.382-4.341,2.262-5.989,1.885c-1.62-1.006-3.323-1.508-5.361-1.592c-2.415-1.321-7.971,1.266-16.418,7.538\n\t\t\tc-0.853,2.792-0.822,5.585,0,8.377c4.556,2.041,7.225,3.097,8.879,3.686c2.222,0.527,4.2,0.423,5.864-0.503\n\t\t\tc0.111-2.792-0.154-5.835,1.005-8.377c1.228,1.899,1.619,4.3,2.848,6.199c0.545,1.312,1.799,0.977,3.35,0.168\n\t\t\tc-0.111-1.061-0.223-2.122-0.335-3.183c1.39,1.184,2.749,2.386,3.35,4.021c1.437,2.16,3.696,2.263,6.031,2.177\n\t\t\tc5.316,6.494,7.639,13.163,5.36,20.103c-6.65-0.814-12.483,0.933-17.347,5.704c-0.878,0.009-1.209,3.165-0.746,10.881\n\t\t\tc6.496-0.275,12.786-0.638,14.898,1.978c2.084,3.595,3.739,14.079,2.82,14.314c-32.646,0.083-61.072-17.991-61.942-45.775\n\t\t\tc-9.691,49.385,97.063,77.468,166.334,24.49C421.856,253.569,427.124,192.525,416.691,138.661z\"/>\n\t</g>\n\t</svg>\n</div>\n";

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjdXJ0YWluLmpzIiwiaW5kZXguanMiLCJwcmVsb2FkSW1nLmpzIiwicmVtb3ZlQWxsQ2hpbGRyZW5FbGUuanMiLCJzdHJpbmdUb0RvbS5qcyIsInN2Z0xvZ28uanMiLCJ0ZXh0TW9kZWwuanMiLCJ2c0NpcmNsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDRWdCOztBQUZoQjs7QUFDQTs7QUFDTyxTQUFTLE9BQVQsR0FBbUI7QUFDekIsS0FBSSxtQkFBbUIsS0FBbkIsQ0FEcUI7QUFFekIsS0FBSSxrTEFBSixDQUZ5QjtBQVN6QixLQUFJLGFBQWEsMkJBQVMsVUFBVCxDQUFiLENBVHFCO0FBVXpCLFlBQVcsc0JBQVgsQ0FBa0MsY0FBbEMsRUFBa0QsQ0FBbEQsRUFBcUQsZ0JBQXJELENBQXNFLGVBQXRFLEVBQXVGLFlBQVc7QUFDakcsVUFBUSxHQUFSLENBQVksS0FBWixFQURpRztBQUVqRyxNQUFJLENBQUMsZ0JBQUQsRUFBbUI7QUFDdEIsc0JBQW1CLElBQW5COztBQURzQixHQUF2QjtFQUZzRixDQUF2RixDQVZ5QjtBQWlCekIsUUFBTyxVQUFQLENBakJ5QjtDQUFuQjs7Ozs7QUNGUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFJLGFBQWEsU0FBUyxjQUFULENBQXdCLFVBQXhCLENBQWI7QUFDSixJQUFJLE9BQU8sRUFBUDs7QUFHSixTQUFTLFFBQVQsR0FBb0I7QUFDbkIsS0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFQLENBRGU7QUFFbkIsTUFBSyxTQUFMLG9CQUZtQjtBQUduQixLQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVQsQ0FIZTtBQUluQixRQUFPLFNBQVAsc0JBSm1CO0FBS25CLE1BQUssc0JBQUwsQ0FBNEIsVUFBNUIsRUFB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LE1BQTlCLEVBQXNDO0FBQzVDLFFBQU8sT0FBTyxVQUFQLEVBQW1CO0FBQ3RCLFNBQU8sV0FBUCxDQUFtQixPQUFPLFVBQVAsQ0FBbkIsQ0FEc0I7RUFBMUI7Q0FETTs7Ozs7Ozs7UUNBUztBQUFULFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QjtBQUM1QixNQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVQsQ0FEd0I7QUFFNUIsU0FBTyxTQUFQLEdBQW1CLEdBQW5CLENBRjRCO0FBRzVCLE1BQUksWUFBWSxPQUFPLFFBQVAsQ0FBZ0IsQ0FBaEIsQ0FBWixDQUh3QjtBQUk1QixTQUFPLFNBQVAsQ0FKNEI7Q0FBdkI7Ozs7Ozs7O0FDQUEsSUFBSSxveEdBQUo7Ozs7Ozs7O1FDQVM7QUFBVCxTQUFTLFNBQVQsR0FBcUI7QUFDM0IsS0FBSSx5R0FBSixDQUQyQjtBQVEzQixRQUFPLEdBQVAsQ0FSMkI7Q0FBckI7Ozs7Ozs7O0FDQUEsSUFBSSxrd0hBQUoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtzdHJUb0RvbX0gZnJvbSAnLi9zdHJpbmdUb0RvbSc7XG5pbXBvcnQge3RleHRNb2RlbH0gZnJvbSAnLi90ZXh0TW9kZWwnO1xuZXhwb3J0IGZ1bmN0aW9uIGN1cnRhaW4oKSB7XG5cdGxldCBhbHJlYWR5VHJpZ2dlcmVkID0gZmFsc2U7XG5cdGxldCBjdXJ0YWluU3RyID0gYFxuPGRpdiBpZD1cImN1cnRhaW5cIj5cblx0PGRpdiBjbGFzcz1cImltZy1iZ1wiPjwvZGl2PlxuXHQ8c3BhbiBjbGFzcz1cImhhbGYtY3VydGFpbiBjdXJ0YWluLWxlZnRcIj48L3NwYW4+XG5cdDxzcGFuIGNsYXNzPVwiaGFsZi1jdXJ0YWluIGN1cnRhaW4tcmlnaHRcIj48L3NwYW4+XG48L2Rpdj5cbmA7XG5cdGxldCBjdXJ0YWluRG9tID0gc3RyVG9Eb20oY3VydGFpblN0cik7XG5cdGN1cnRhaW5Eb20uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGFsZi1jdXJ0YWluJylbMF0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKCdvb28nKTtcblx0XHRpZiAoIWFscmVhZHlUcmlnZ2VyZWQpIHtcblx0XHRcdGFscmVhZHlUcmlnZ2VyZWQgPSB0cnVlO1xuXHRcdFx0Ly8gY3VydGFpbkRvbS5hcHBlbmRDaGlsZChzdHJUb0RvbSh0ZXh0TW9kZWwoKSkpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBjdXJ0YWluRG9tO1xufSIsImltcG9ydCB7c3ZnTG9nb30gZnJvbSAnLi9zdmdMb2dvJztcbmltcG9ydCB7dnNDaXJjbGV9IGZyb20gJy4vdnNDaXJjbGUnO1xuaW1wb3J0IHtjdXJ0YWlufSBmcm9tICcuL2N1cnRhaW4nO1xuaW1wb3J0IHtwcmVsb2FkSW1nfSBmcm9tICcuL3ByZWxvYWRJbWcnO1xuaW1wb3J0IHtyZW1vdmVBbGxDaGlsZHJlbkVsZX0gZnJvbSAnLi9yZW1vdmVBbGxDaGlsZHJlbkVsZSc7XG5pbXBvcnQge3RleHRNb2RlbH0gZnJvbSAnLi90ZXh0TW9kZWwnO1xuaW1wb3J0IHtzdHJUb0RvbX0gZnJvbSAnLi9zdHJpbmdUb0RvbSc7XG5cbmxldCBfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdwb3J0Jyk7XG5sZXQgaW1ncyA9IFtdO1xuXG5cbmZ1bmN0aW9uIGxvYWRMb2dvKCkge1xuXHRsZXQgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRsb2dvLmlubmVySFRNTCA9IHN2Z0xvZ287XG5cdGxldCBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y2lyY2xlLmlubmVySFRNTCA9IHZzQ2lyY2xlO1xuXHRsb2dvLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N1cGVybWFuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgbG9nb0FuaW1hRW5kKTtcblx0X2NvbnRhaW5lci5hcHBlbmRDaGlsZChsb2dvKTtcblx0X2NvbnRhaW5lci5hcHBlbmRDaGlsZChjaXJjbGUpO1xufVxuXG5mdW5jdGlvbiBsb2dvQW5pbWFFbmQoKSB7XG5cdHJlZGlyZWN0KCk7XG59XG5cblxuZnVuY3Rpb24gc2hvd0N1cnRhaW4oKSB7XG5cdGxldCBjdXJ0YWluRG9tID0gY3VydGFpbigpO1xuXHRjdXJ0YWluRG9tLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltZy1iZycpWzBdLmFwcGVuZENoaWxkKGltZ3NbMV0pO1xuXHRyZW1vdmVBbGxDaGlsZHJlbkVsZShfY29udGFpbmVyKTtcblx0X2NvbnRhaW5lci5hcHBlbmRDaGlsZChjdXJ0YWluRG9tKTtcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VydGFpbicpLmNsYXNzTGlzdC5hZGQoJ29wZW5pbmcnKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdCBjdXJ0YWluRG9tLmFwcGVuZENoaWxkKHN0clRvRG9tKHRleHRNb2RlbCgpKSk7IFxuXHRcdH0sIDI1MDApXG5cdH0sIDApXG59XG5cbl9jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZhZGUpO1xuZnVuY3Rpb24gZmFkZSgpIHtcblx0aWYgKF9jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWRlLWF3YXknKSkge1xuXHRcdHNob3dDdXJ0YWluKCk7XG5cdFx0X2NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlLWF3YXknKTtcblx0XHRfY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZhZGUtaW4nKTtcblx0fSBlbHNlIHtcblx0XHRfY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGUtaW4nKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZWRpcmVjdCgpIHtcblx0X2NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZmFkaW5nXCIpO1xuXHRfY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmYWRlLWF3YXlcIik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxvYWRlcigpIHtcblx0bGV0IGxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkZXInKTtcblx0bG9hZGVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQobG9hZGVyKTtcbn1cblxuXG5pbWdzID0gcHJlbG9hZEltZyhhbGxMb2FkQ0IsXG5cdCdpbWFnZXMvYnZzX2JhdGZpZ2h0LmpwZycsXG5cdCdpbWFnZXMvYnZzX2ZhY2VvZmYuanBnJyxcblx0J2ltYWdlcy9idnNfc3VwZXJmaWdodC5qcGcnLFxuXHQnaW1hZ2VzL2J2c193dy5qcGcnXG4pO1xuIGZ1bmN0aW9uIGFsbExvYWRDQigpIHtcbiBcdGNvbnNvbGUubG9nKCdhbGwgZG9uZS4nKTtcbiBcdHJlbW92ZUxvYWRlcigpO1xuIFx0bG9hZExvZ28oKTtcbiB9IiwibGV0IGltYWdlcyA9IFtdO1xubGV0IGxvYWRlZCA9IDA7XG5leHBvcnQgZnVuY3Rpb24gcHJlbG9hZEltZyhjYiwgLi4uaW1ncykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpbWFnZXNbaV0gPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2VzW2ldLnNyYyA9IGltZ3NbaV07XG4gICAgICAgIGltYWdlc1tpXS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYWxsTG9hZENhbGxiYWNrLmJpbmQodGhpcywgaW1ncy5sZW5ndGgsIGNiKSk7XG4gICAgfVxuICAgIHJldHVybiBpbWFnZXM7XG59XG5cbmZ1bmN0aW9uIGFsbExvYWRDYWxsYmFjayhsZW4sIGNiKSB7XG5cdGxvYWRlZCArPSAxO1xuXHRpZihsb2FkZWQgPT09IGxlbikge1xuXHRcdGNiLmFwcGx5KCk7XG5cdH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsQ2hpbGRyZW5FbGUocGFyZW50KSB7XG5cdHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuXHQgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcblx0fVxufSIsImV4cG9ydCBmdW5jdGlvbiBzdHJUb0RvbShzdHIpIHtcbiAgbGV0IHRtcEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0bXBFbGUuaW5uZXJIVE1MID0gc3RyO1xuICBsZXQgcmV0dXJuRG9tID0gdG1wRWxlLmNoaWxkcmVuWzBdO1xuICByZXR1cm4gcmV0dXJuRG9tO1xufSIsImV4cG9ydCBsZXQgc3ZnTG9nbyA9IGBcbjxkaXYgY2xhc3M9XCJsb2dvXCI+XG4gIDxzdmcgdmVyc2lvbj1cIjEuMVwiIGlkPVwiQ2FwYV8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNTk4LjA0OSAyODAuNTU0XCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5OC4wNDkgMjgwLjU1NDtcIlxuICAgICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICA8ZGVmcz5cbiAgICA8ZmlsdGVyIGlkPVwiYmx1ci1maWx0ZXJcIiB4PVwiLTZcIiB5PVwiLTZcIiB3aWR0aD1cIjIwMFwiIGhlaWdodD1cIjIwMFwiPlxuICAgICAgPGZlR2F1c3NpYW5CbHVyIGluPVwiU291cmNlR3JhcGhpY1wiIHN0ZERldmlhdGlvbj1cIjJcIiAvPlxuICAgIDwvZmlsdGVyPlxuICAgIDxmaWx0ZXIgaWQ9XCJzdXBlcm1hbi1pbm5lci1zaGFkb3dcIj5cbiAgICAgIDxmZU9mZnNldCBkeD1cIjBcIiBkeT1cIjBcIiAvPlxuICAgICAgPGZlR2F1c3NpYW5CbHVyXG4gICAgICAgIHN0ZERldmlhdGlvbj1cIjhcIlxuICAgICAgICByZXN1bHQ9XCJvZmZzZXQtYmx1clwiXG4gICAgICAvPlxuICAgICAgPGZlQ29tcG9zaXRlXG4gICAgICAgIG9wZXJhdG9yPSdvdXQnXG4gICAgICAgIGluPSdTb3VyY2VHcmFwaGljJ1xuICAgICAgICBpbjI9J29mZnNldC1ibHVyJ1xuICAgICAgICByZXN1bHQ9J2ludmVyc2UnXG4gICAgICAvPlxuICAgICAgPGZlRmxvb2RcbiAgICAgICAgZmxvb2QtY29sb3I9J2ZmMDAwMCdcbiAgICAgICAgZmxvb2Qtb3BhY2l0eT0nMSdcbiAgICAgICAgcmVzdWx0PSdjb2xvcidcbiAgICAgIC8+XG4gICAgXG4gICAgICA8IS0tIENsaXAgY29sb3IgaW5zaWRlIHNoYWRvdyAtLT5cbiAgICAgIDxmZUNvbXBvc2l0ZVxuICAgICAgICBvcGVyYXRvcj0naW4nXG4gICAgICAgIGluPSdjb2xvcidcbiAgICAgICAgaW4yPSdpbnZlcnNlJ1xuICAgICAgICByZXN1bHQ9J3NoYWRvdydcbiAgICAgIC8+XG4gICAgXG4gICAgICA8IS0tIFB1dCBzaGFkb3cgb3ZlciBvcmlnaW5hbCBvYmplY3QgLS0+XG4gICAgICA8ZmVDb21wb3NpdGVcbiAgICAgICAgb3BlcmF0b3I9J292ZXInXG4gICAgICAgIGluPSdzaGFkb3cnXG4gICAgICAgIGluMj0nU291cmNlR3JhcGhpYydcbiAgICAgIC8+XG4gICAgPC9maWx0ZXI+XG4gIDwvZGVmcz5cbiAgICA8cGF0aCBzdHlsZT1cImZpbGw6IzAwMDAwMDtcIiBkPVwiTTE2OS41MjYsMTkyLjA1NGwtNDQuMDAxLDMuNDk4bC0xNi41LDE5LjAwMmwtMTUtMTQuNTAybC00NS45OTksMTAuNWMtMzMuNTAxLDguNDk5LTQ4LDQwLjAwMi00OCw0MC4wMDJcbiAgICAgIGMtMS41LTgyLjUsNjIuNDk5LTE2NC4yODUsNjIuNDk5LTE2NC4yODVDOTQuMDI1LDM1LjQ4MywxNTYuNDY1LDAsMTU2LjQ2NSwwbDMuNDc1LDE4Ljk5NWMwLDAsMi41NDYsOS4wMzUsMjUuMjQ4LDE0LjgyNlxuICAgICAgbDM1LjY3NSwxMS4zNTFoMzAuNTc3VjIwLjYxNmwxMi45NzMsMTcuODM0bDY5LjIyNCwwLjAwMmwxMi45NzMtMTcuODM2VjQ1LjE3aDMwLjU3N2wzNS42NzUtMTEuMzVcbiAgICAgIGMyMi43MDItNS43OTEsMjUuMjQ4LTE0LjgyNiwyNS4yNDgtMTQuODI2TDQ0MS41ODQsMGMwLDAsNjIuNDQsMzUuNDgzLDkzLjk0LDg2LjI2N2MwLDAsNjMuOTk5LDgxLjc4Nyw2Mi40OTksMTY0LjI4N1xuICAgICAgYzAsMC0xNC40OTktMzEuNTAzLTQ4LTQwLjAwMmwtNDUuOTk5LTEwLjVsLTE1LDE0LjUwMmwtMTYuNS0xOS4wMDJsLTQ0LjAwMS0zLjQ5OGwtMTI5LjUsODdMMTY5LjUyNiwxOTIuMDU0elwiIGNsYXNzPVwiYmF0bWFuLWxvZ29cIi8+XG4gICAgPHBhdGggc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLW1pdGVybGltaXQ6MTA7XCIgZD1cIk0zOTkuNzE2LDY2LjgyOFwiIC8+XG4gICAgPHBhdGggc3R5bGU9XCJmaWxsOiNGRjAwMDA7XCIgZD1cIk0yOTkuMDI1LDI4MC41NTRjLTEzOS41LTEwMi0xNzEuNTY1LTE1NC43MTQtMTcxLjU2NS0xNTQuNzE0XG4gICAgICBjMTYuNTc2LTM2LjQxNiw2Mi41MzQtNjkuMzEzLDYyLjUzNC02OS4zMTNjNzAuNDcxLTExLjUzMywyMTguMDYyLDAsMjE4LjA2MiwwczQ1Ljk1OCwzMi44OTgsNjIuNTM0LDY5LjMxM1xuICAgICAgYzAsMC0zMS44OSw1Mi40MjEtMTcwLjQxMSwxNTMuODdMMjk5LjAyNSwyODAuNTU0eiBNNDI5Ljc5OCwxNTQuNTFjNi45NTUtNy4yMDQsMTMuMTYzLTE0LjExMiwxOC4yNTgtMjAuNDg3XG4gICAgICBjMCwwLTM3LjUyOS02MC43MjItMTE1LjI4LTY1Ljk3MmMwLDAtOTMuNzUyLTcuNDk4LTEwMi43NTIsMTYuMDAxYzAsMC02LjUwMiwyMC43NTEsNTYsMjAuMjVjMCwwLDgyLjI1MSwxLjQ5NywxMDQuMDAxLDE0LjQ5OVxuICAgICAgYzAsMCwyOC4yNDgsMTIuNzUsMzguNDk5LDMyLjAwMUw0MjkuNzk4LDE1NC41MXogTTQ1Mi40MzksMTI4LjI4NGMxLjEzMS0xLjU1NiwyLjE4LTMuMDczLDMuMTQxLTQuNTQ3XG4gICAgICBjMCwwLTEyLjU3MS0yMC4xMTUtMzYuMjI2LTQyLjc2OWMwLDAsNC4wNCwxMy40MjgsMTQuODQyLDI1LjI4OEw0NTIuNDM5LDEyOC4yODR6IE0yMDMuNTIzLDY2LjgyOGgtOC44NDVcbiAgICAgIGMtMzMuOTM1LDI3LjY3MS01Mi4yMDcsNTYuOTA5LTUyLjIwNyw1Ni45MDljNC41MDQsNi45MDgsMTkuNDQ3LDM0LjY3MywxOC42ODcsMjMuMjQ0XG4gICAgICBDMTU3Ljc5NCw5Ni40MDksMjAzLjUyMyw2Ni44MjgsMjAzLjUyMyw2Ni44Mjh6IE0yOTkuMDI1LDIyOC40MzhjNjIuMDkyLTQuNDc0LDU3LjM4MS0yMC4xMDEsNTcuMzgxLTIwLjEwMVxuICAgICAgYy0xLjMyNC0yMC4zNjQtNjcuMTc1LTE2LjY2MS02Ny4xNzUtMTYuNjYxYy0zOC44NzcsMi45MDktOTguMDczLTE0Ljc1Ny05OC4wNzMtMTQuNzU3YzkuODUxLDkuMTk2LDE5LjI5OSwxOS44MDIsMjkuOTYzLDI4LjI1NFxuICAgICAgYzAsMCwzNS4zOTksMjMuNjUxLDczLjkwMSwyMy4yNjVIMjk5LjAyNXogTTMzMi42MDYsMjM4LjcxMmMtMjAuMDk4LDQuNzIzLTY5LjczNSwwLTY5LjczNSwwXG4gICAgICBjMjEuMDQxLDE3LjA2MiwzNi4xNTUsMjguNTk0LDM2LjE1NSwyOC41OTRMMzMyLjYwNiwyMzguNzEyeiBNMzk3LjUyNCw3Ny4zMDFjMTAuNSwzLjI1LDYuOTk5LTYsNi45OTktNlxuICAgICAgYy0zLjUwMS0xMC4yNS00My45OTgtNS43NTEtNDMuOTk4LTUuNzUxQzM3OC4yNzYsNjkuOCwzOTcuNTI0LDc3LjMwMSwzOTcuNTI0LDc3LjMwMXpcIiBjbGFzcz1cInN1cGVybWFuIGxvYWRpbmdcIi8+XG4gIDwvc3ZnPlxuPC9kaXY+XG5gOyIsImV4cG9ydCBmdW5jdGlvbiB0ZXh0TW9kZWwoKSB7XG5cdGxldCBzdHIgPSBgXG48ZGl2IGNsYXNzPVwidGV4dC1tb2RlbFwiPlxuXHRcdDxwPlxuXHRcdFx0bG9yZW1sb3JlbWxvcmVtbG9yZW1sb3JlbWxvcmVtXG5cdFx0PC9wPlxuPC9kaXY+XG5cdGA7XG5cdHJldHVybiBzdHI7XG59IiwiZXhwb3J0IGxldCB2c0NpcmNsZSA9IGBcbjxkaXYgY2xhc3M9XCJ2cy1jaXJjbGVcIj5cblx0PHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuXHRcdCB2aWV3Qm94PVwiMCAwIDQ5NC45MjMgNTc3LjAxN1wiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTQuOTIzIDU3Ny4wMTc7XCJcblx0XHQgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cblx0PGc+XG5cdFx0PHBhdGggc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiM4RTE4MUE7c3Ryb2tlOiM4RTE4MUE7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbWl0ZXJsaW1pdDoyMi45MjU2O1wiIGQ9XCJcblx0XHRcdE03OC41NjUsNDc0Ljg1NmMtMjI2LjY5OC0yNDkuNjQ0LDkxLjYzLTYxOS4wMTUsMjY5LjEzLTQxNi4zNzVjNjguNzA5LDg5LjA2MSw1OS4yMzUsMTcyLjY3LDE1LjY1OCwxOTguMDM4XG5cdFx0XHRjLTguNzMzLDAuMTcxLTE4LjAwMywwLjE4Mi0yNy45MiwwYzEuODYtOC4wNjIsMi4zODUtMTUuMjgxLDAtMjAuNjYxYy0yLjc5Mi0wLjM4OC01Ljc1MiwwLjg5MS04LjU0NCwzLjE4M1xuXHRcdFx0Yy0xLjgzNi0zLjkyMy0zLjcwMy03LjgzOS01Ljk3NC0xMi4xMTdjNi42NDQtNTAuMDQ4LTI1LjEwMS03OC4xODctNDcuNDY0LTgzLjIwMWMyNy4xMTYsMTMuODE0LDQzLjgwMiwzMy41MzksNDQuMTE1LDYyLjU0MlxuXHRcdFx0Yy05LjY1MSw0Ljg5Mi0zMS4yODctMy4xLTU4LjA3NC0yLjc5MkM5NC4zMjgsMTk3LjUxMiw0My45NTcsMzY1Ljc1Myw3OC41NjUsNDc0Ljg1NnpcIi8+XG5cdFx0PHBhdGggc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMwMDAwMDI7c3Ryb2tlOiMwMDAwMDI7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbWl0ZXJsaW1pdDoyMi45MjU2O1wiIGQ9XCJcblx0XHRcdE0yOTQuNDE5LDIzNC4xMTJjMC4yNDYsMC4wMTEsMy42MjgtMi43NDksMy42MDItMy45MzZjMC4yNTEtMS4xNzMsMC44MzctMy41MTksMi41OTctNC40NGM0LjI0NC00LjQzOSw2LjI4Ni0zLjk5NywxMC40Ny01LjUyN1xuXHRcdFx0YzMuODI1LTEuNTA4LDQuODAyLDIuMDEsNy4yMDQsMy4wMTVjMS4zNSwxLjM2NywxLjUyNi0xMy45MzEsMC45MjItMTMuNTY5Yy0zLjM0NC0wLjg4Mi01LjAyNi0wLjI4MS02LjUxOC0yLjAyMVxuXHRcdFx0Yy0xMC4wNDUsNC42NjMtMTcuNDgyLDEyLjE3MS0yNS4wNiwyMC4xOTdjMC40NzQsMy4xODMsMS4zNjksNC45NDIsMi42ODEsNi4wMzFDMjkxLjc0LDIzNC4yODEsMjkyLjk5NiwyMzMuNjkzLDI5NC40MTksMjM0LjExMnpcIlxuXHRcdFx0Lz5cblx0XHRcblx0XHRcdDxwb2x5Z29uIHN0eWxlPVwiZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMDAwMDAyO3N0cm9rZTojMDAwMDAyO3N0cm9rZS13aWR0aDowLjU7c3Ryb2tlLW1pdGVybGltaXQ6MjIuOTI1NjtcIiBwb2ludHM9XCJcblx0XHRcdDMxOC4zNzgsMjMzLjk1MiAzMjQuOTEyLDI0MS41NzQgMzMzLjc5LDIzOC43MjYgMzM0LjEyNSwyNTIuNjMgMzI1LjA3OSwyNTMuNDY4IDMyMC4zMDUsMjU5LjQxNSAzMDguMTU5LDI0NC4xNzEgMzA0LjEzOCwyNDIuNzQ3IFxuXHRcdFx0MzEwLjg0LDIzOS44OTkgXHRcIi8+XG5cdFx0PHBhdGggc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMwMDAwMDI7c3Ryb2tlOiMwMDAwMDI7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbWl0ZXJsaW1pdDoyMi45MjU2O1wiIGQ9XCJcblx0XHRcdE0zMDYuODE4LDI3OS44NTVjLTQuNTc2LTAuOTI0LTcuNTctMC43MjYtMTAuODA1LDEuOTI3Yy0xLjc1MSwzLjY5My0xLjE2Nyw1LjE1NSwwLjgzOCw4LjA4M2M0LjM1NSwxLjY4LDcuMDM2LDAuOTQ4LDEyLjEwNC0wLjQxOVxuXHRcdFx0YzI4LjcxNi04Ljc3LDQyLjAxNy0xOC44NDYsNTIuMTQyLTI5Ljg2MWMtNi41MzQtMC4yNzktMTMuMDY3LTAuNTU5LTE5LjYtMC44MzhDMzIzLjk1NCwyNzEuMzkxLDMxMC4wNTUsMjgwLjYyMSwzMDYuODE4LDI3OS44NTV6XG5cdFx0XHRcIi8+XG5cdFx0PHBhdGggc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMwMDAwMDI7c3Ryb2tlOiMwMDAwMDI7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbWl0ZXJsaW1pdDoyMi45MjU2O1wiIGQ9XCJcblx0XHRcdE00MTYuNjkxLDEzOC42NjFjMjUuOTA5LDM3Ljk5Niw1My40MTEsNjUuNzU2LDc4LjIzMyw3OC44MTljLTIwLjI1NiwzMi4yNjItMTguMzg2LDY4LjUwMy0wLjE2NywxMDAuNzY1XG5cdFx0XHRjLTM2LjczOSwxNi43My00OS41OTksNDcuNzYyLTQ4LjU4MSw4NS4xMDFjLTU2LjkzNiw0Ljg5OS03Mi42OTgsNDcuMzQ5LTczLjcxLDczLjcxYy02Mi44MjMsMy44NzUtMTAwLjIwNyw0Ny42MTYtOTQuMjMzLDk5Ljk2XG5cdFx0XHRDMTM0Ljg0Myw1NzQuMjEyLDguNjA3LDMxMi4wMDgsMTkxLjExOSwyNDMuMzFjNS44NTYtMS45MTEsMTguNjUzLTMuODM0LDE3LjkyNS01LjU3YzAsMC02LjY1OS03LjY2NS00Ljk4NC03LjE2MlxuXHRcdFx0YzEuNjc1LDAuNTAzLDEwLjg0Nyw1Ljg2NCwxMC44NDcsNS44NjRjMi43OTItMC4yNzksNi4xNy0wLjIyNCw4Ljk2Mi0wLjUwM2MtMS43MzEtMi4zNDUtMi4zNzMtNS4yNzctNC4xMDQtNy42MjJcblx0XHRcdGM0LjI0NCwxLjg5OSw2LjgxMyw0LjA0OCwxMS4wNTcsNS45NDdjMi4wMS0wLjExMSw0LjI3MiwwLjQ4OSw2LjI4MiwwLjM3N2MtMC41NTgtMS41NjMtMC4wNjktNC4xMzItMC42MjgtNS42OTZcblx0XHRcdGMyLjkwNCwxLjY3NSwzLjU4NywzLjkzNiw2LjExNCw1LjYxMWMzLjg0Mi0wLjIwMyw4Ljk1Ni0wLjg1NywxMy4wMjUsMC41NDVjMS43ODcsMC45MzUsMS43NzMsNC41MDksMS4xMzEsNy45MTZcblx0XHRcdGMtMS43NzMsMS4zODItNC4zNDEsMi4yNjItNS45ODksMS44ODVjLTEuNjItMS4wMDYtMy4zMjMtMS41MDgtNS4zNjEtMS41OTJjLTIuNDE1LTEuMzIxLTcuOTcxLDEuMjY2LTE2LjQxOCw3LjUzOFxuXHRcdFx0Yy0wLjg1MywyLjc5Mi0wLjgyMiw1LjU4NSwwLDguMzc3YzQuNTU2LDIuMDQxLDcuMjI1LDMuMDk3LDguODc5LDMuNjg2YzIuMjIyLDAuNTI3LDQuMiwwLjQyMyw1Ljg2NC0wLjUwM1xuXHRcdFx0YzAuMTExLTIuNzkyLTAuMTU0LTUuODM1LDEuMDA1LTguMzc3YzEuMjI4LDEuODk5LDEuNjE5LDQuMywyLjg0OCw2LjE5OWMwLjU0NSwxLjMxMiwxLjc5OSwwLjk3NywzLjM1LDAuMTY4XG5cdFx0XHRjLTAuMTExLTEuMDYxLTAuMjIzLTIuMTIyLTAuMzM1LTMuMTgzYzEuMzksMS4xODQsMi43NDksMi4zODYsMy4zNSw0LjAyMWMxLjQzNywyLjE2LDMuNjk2LDIuMjYzLDYuMDMxLDIuMTc3XG5cdFx0XHRjNS4zMTYsNi40OTQsNy42MzksMTMuMTYzLDUuMzYsMjAuMTAzYy02LjY1LTAuODE0LTEyLjQ4MywwLjkzMy0xNy4zNDcsNS43MDRjLTAuODc4LDAuMDA5LTEuMjA5LDMuMTY1LTAuNzQ2LDEwLjg4MVxuXHRcdFx0YzYuNDk2LTAuMjc1LDEyLjc4Ni0wLjYzOCwxNC44OTgsMS45NzhjMi4wODQsMy41OTUsMy43MzksMTQuMDc5LDIuODIsMTQuMzE0Yy0zMi42NDYsMC4wODMtNjEuMDcyLTE3Ljk5MS02MS45NDItNDUuNzc1XG5cdFx0XHRjLTkuNjkxLDQ5LjM4NSw5Ny4wNjMsNzcuNDY4LDE2Ni4zMzQsMjQuNDlDNDIxLjg1NiwyNTMuNTY5LDQyNy4xMjQsMTkyLjUyNSw0MTYuNjkxLDEzOC42NjF6XCIvPlxuXHQ8L2c+XG5cdDwvc3ZnPlxuPC9kaXY+XG5gOyJdfQ==
