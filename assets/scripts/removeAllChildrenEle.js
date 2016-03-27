export function removeAllChildrenEle(parent) {
	while (parent.firstChild) {
	    parent.removeChild(parent.firstChild);
	}
}