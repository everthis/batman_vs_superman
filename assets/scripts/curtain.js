import {strToDom} from './stringToDom';
import {textModel} from './textModel';
export function curtain() {
	let alreadyTriggered = false;
	let curtainStr = `
<div id="curtain">
	<div class="img-bg"></div>
	<span class="half-curtain curtain-left"></span>
	<span class="half-curtain curtain-right"></span>
</div>
`;
	let curtainDom = strToDom(curtainStr);
	curtainDom.getElementsByClassName('half-curtain')[0].addEventListener('transitionend', function() {
		console.log('ooo');
		if (!alreadyTriggered) {
			alreadyTriggered = true;
			// curtainDom.appendChild(strToDom(textModel()));
		}
	});
	return curtainDom;
}