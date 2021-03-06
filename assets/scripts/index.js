import {svgLogo} from './svgLogo';
import {vsCircle} from './vsCircle';
import {curtain} from './curtain';
import {preloadImg} from './preloadImg';
import {removeAllChildrenEle} from './removeAllChildrenEle';
import {textModel} from './textModel';
import {strToDom} from './stringToDom';

let _container = document.getElementById('viewport');
let imgs = [];


function loadLogo() {
	let logo = document.createElement('div');
	logo.innerHTML = svgLogo;
	let circle = document.createElement('div');
	circle.innerHTML = vsCircle;
	logo.getElementsByClassName('superman')[0].addEventListener('animationend', logoAnimaEnd);
	_container.appendChild(logo);
	// _container.appendChild(circle);
}

function logoAnimaEnd() {
	redirect();
}


function showCurtain() {
	let curtainDom = curtain();
	curtainDom.getElementsByClassName('img-bg')[0].appendChild(imgs[0]);
	removeAllChildrenEle(_container);
	_container.appendChild(curtainDom);
	setTimeout(function() {
		document.getElementById('curtain').classList.add('opening');
		setTimeout(function () {
			var ele = document.createElement('div');
			ele.classList.add('text-model');
			 curtainDom.appendChild(ele); 
			 
		}, 2400);
		setTimeout(function() {
				 document.getElementsByClassName('text-model')[0].innerHTML = '<div class="text"><div>Hi, 周六的安排是：</div><div>地点：UME华星，</div><div>午饭：重八牛府，</div><div>电影开始时间是下午2:30</div></div>';
			 
		}, 2500);
		 setTimeout(function () {
			 (document.getElementsByClassName('text-model')[0]).getElementsByClassName('text')[0].classList.add('opening');
		 }, 2600);
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
	let loader = document.getElementById('loader');
	loader.parentElement.removeChild(loader);
}


imgs = preloadImg(allLoadCB,
	'images/bvs_faceoff.jpg'
);
 function allLoadCB() {
 	console.log('all done.');
 	removeLoader();
 	loadLogo();
 }