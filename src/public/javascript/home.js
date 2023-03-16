// Slideshow
var slides = $('#slide').children('div'),
    slength = slides.length-1,
    index = 0;


// Slideshow effect prev-next button
var prevBtn = $('#wall-prev'),
    nextBtn = $('#wall-next');

prevBtn.click(function() {
    ringSwitchOut();
    slides[index].style.animation = 'prev-out 0.5s forwards';
    if (index == 0) {index = slength+1;};
    slides[index-1].style.animation = 'prev-in 0.5s forwards';
    index--;
    ringSwitchIn();
});

nextBtn.click(function() {
    ringSwitchOut();
    slides[index].style.animation = 'next-out 0.5s forwards';
    if (index == slength) {index = -1;};
    slides[index+1].style.animation = 'next-in 0.5s forwards';
    index++;
    ringSwitchIn();
});


// Slideshow effect rings
var ringHtml = '';
for (let i=0; i<slides.length; i++) {
    ringHtml += `<span id="ring-${i}">&#8728;</span>`;
};
$('#rings').html(ringHtml);
var rings= $('#rings span');

function ringSwitchOut() {
    document.styleSheets[0].addRule(`#ring-${index}::after`, 'background-color: unset');
};
function ringSwitchIn() {
    document.styleSheets[0].addRule(`#ring-${index}::after`, 'background-color: white');
};
ringSwitchIn();

for (let i=0; i<slides.length; i++) {
    rings[i].onclick = function() {
        ringSwitchOut();
        if (i < index && !(index == slength && i == 0) || (index == 0 && i == slength)) {
            slides[index].style.animation = 'prev-out 0.5s forwards';
            slides[i].style.animation = 'prev-in 0.5s forwards';
        } else if (i > index || (index == slength && i == 0)) {
            slides[index].style.animation = 'next-out 0.5s forwards';
            slides[i].style.animation = 'next-in 0.5s forwards';
        }
        index = i;
        ringSwitchIn();
    };
};

// Dish Images
var dishImage = document.querySelectorAll('#intro-image > div');
for (let i = 0; i < dishImage.length; i++) {
    dishImage[i].onmouseover = function() {
        dishImage[i].firstElementChild.style.animation = 'zoom-in 0.75s forwards';
    };
    dishImage[i].onmouseout = function() {
        dishImage[i].firstElementChild.style.animation = 'zoom-out 0.75s forwards';
    };
};

// // News
// function newsOpen(id) {
//     $('section > *, #illustrative-image-more').css('filter', 'blur(10px)')
//     $('.news-detail').css('filter', 'blur(0px)')
//     $(`#${id}`).show()  
// }
// function newsClose(id) {
//     $('section > *, #illustrative-image-more').css('filter', 'blur(0px)')
//     $(`#${id}`).hide()
// }

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