import {strToDom} from './stringToDom';
export function curtain() {
	let curtainStr = `
<div id="curtain">
	<div class="img-bg"></div>
	<span class="half-curtain curtain-left"></span>
	<span class="half-curtain curtain-right"></span>
</div>
`;
	let curtainDom = strToDom(curtainStr);
	curtainDom.getElementsByClassName('half-curtain')[0].addEventListener('transitionend', function() {
		console.log('end');
	});
	return curtainDom;
}