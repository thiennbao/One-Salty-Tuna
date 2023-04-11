// Image
var outroImages = $('#outro-image div');
for (let i = 0; i < outroImages.length; i++) {
    outroImages[i].onmouseover = function() {
        outroImages[i].style.animation = 'img-in 0.5s forwards';
    };
    outroImages[i].onmouseout = function() {
        outroImages[i].style.animation = 'img-out 0.5s forwards';
    };
};