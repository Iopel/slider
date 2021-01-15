(function () {

const container = document.querySelector('#carousel');
const slides = container.querySelectorAll('.slide'); 
const indicatorsContainer = container.querySelector('#indicators-container');
const indicators = indicatorsContainer.querySelectorAll('.indicator');
const controlsContainer = container.querySelector('#controls-container');
const pauseBtn = controlsContainer.querySelector('#pause-btn');
const prevBtn = controlsContainer.querySelector('#prev-btn');
const nextBtn = controlsContainer.querySelector('#next-btn');

const CLASS_TRIGGER = 'active';
const FA_PAUSE ='<i class="far fa-pause-circle"></i>';
const FA_PLAY = '<i class="far fa-play-circle"></i>';
const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGTH_ARROW = 'ArrowRight';


let currentSlide = 0;  
let slidesCount = slides.length;
let isPlaying = true;
let timerID = null;
let interval = 2000;
let swipeStartX = null;
let swipeEndX = null;


function gotoNth(n) {
  slides[currentSlide].classList.toggle(CLASS_TRIGGER); 
  indicators[currentSlide].classList.toggle(CLASS_TRIGGER); 

  currentSlide = (n + slidesCount) % slidesCount; 

  slides[currentSlide].classList.toggle(CLASS_TRIGGER); 
  indicators[currentSlide].classList.toggle(CLASS_TRIGGER); 
}

const gotoNext = () =>   gotoNth(currentSlide + 1);

const gotoPrev = () => gotoNth(currentSlide - 1);


function pause() {
  isPlaying = false;
  clearInterval(timerID);
  pauseBtn.innerHTML = FA_PLAY;
}

function play() {
  isPlaying = true;
  timerID = setInterval(gotoNext, interval);
  pauseBtn.innerHTML = FA_PAUSE; 
}

const pausePlay = () => isPlaying  ? pause() : play();


function next() {
  pause();
  gotoNext();
}

function prev() {
  pause();
  gotoPrev();
}


function indicate (e) {
  let target = e.target;
  if(target.classList.contains('indicator')) {
    pause(); 
    gotoNth(+target.dataset.slideTo);
  }

}

function pressKey(e) {
  if (e.key === LEFT_ARROW) prev();
  if (e.key === RIGTH_ARROW) next();
  if (e.key === SPACE) pausePlay();
}


function swipeStart (e) {
  if(e.changedTouches.length === 1) swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
  if(e.changedTouches.length === 1) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX < 0) prev();
    if (swipeStartX - swipeEndX > 0) next();
    
  }
}


pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev); 
nextBtn.addEventListener('click', next); 
indicatorsContainer.addEventListener('click', indicate);
container.addEventListener('touchstart', swipeStart );
container.addEventListener('touchend', swipeEnd);
document.addEventListener('keydown', pressKey); 

timerID = setInterval(gotoNext, interval);

}())





 



 

 


 