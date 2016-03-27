let images = [];
let loaded = 0;
export function preloadImg(cb, ...imgs) {
    for (let i = 0; i < imgs.length; i++) {
        images[i] = new Image();
        images[i].src = imgs[i];
        images[i].addEventListener('load', allLoadCallback.bind(this, imgs.length, cb));
    }
    return images;
}

function allLoadCallback(len, cb) {
	loaded += 1;
	if(loaded === len) {
		cb.apply();
	}
}