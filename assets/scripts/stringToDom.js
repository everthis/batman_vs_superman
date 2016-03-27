export function strToDom(str) {
  let tmpEle = document.createElement('div');
  tmpEle.innerHTML = str;
  let returnDom = tmpEle.children[0];
  return returnDom;
}