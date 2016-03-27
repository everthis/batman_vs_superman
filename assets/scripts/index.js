import {svgLogo} from './svgLogo';
import {vsCircle} from './vsCircle';
import {curtain} from './curtain';
import {preloadImg} from './preloadImg';
import {removeAllChildrenEle} from './removeAllChildrenEle';

let _container = document.getElementById('viewport');
let imgs = [];


function loadLogo() {
	let logo = document.createElement('div');
	logo.innerHTML = svgLogo;
	let circle = document.createElement('div');
	circle.innerHTML = vsCircle;
	logo.getElementsByClassName('superman')[0].addEventListener('animationend', logoAnimaEnd);
	_container.appendChild(logo);
	_container.appendChild(circle);
}

function logoAnimaEnd() {
	redirect();
}


function showCurtain() {
	let curtainDom = curtain();
	curtainDom.getElementsByClassName('img-bg')[0].appendChild(imgs[1]);
	removeAllChildrenEle(_container);
	_container.appendChild(curtainDom);
	setTimeout(function() {
		document.getElementById('curtain').classList.add('opening');
	}, 0)
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
	'images/bvs_batfight.jpg',
	'images/bvs_faceoff.jpg',
	'images/bvs_superfight.jpg',
	'images/bvs_ww.jpg'
);
 function allLoadCB() {
 	console.log('all done.');
 	removeLoader();
 	loadLogo();
 }