export function createSlider(images) {
  const slider = document.createElement('div');
  slider.className = 'slider';

  const track = document.createElement('div');
  track.className = 'slider-track';

  images.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'slide';

    const picture = document.createElement('picture');

    const mobile = document.createElement('source');
    mobile.srcset = src.mobile;
    mobile.media = "(max-width: 768px)";

    const img = document.createElement('img');
    img.src = src.desktop;

    picture.append(mobile, img);
    slide.appendChild(picture);
    track.appendChild(slide);
  });

  const prev = document.createElement('button');
  prev.className = 'slider-btn nav-btn prev';
  prev.textContent = '‹';

  const next = document.createElement('button');
  next.className = 'slider-btn nav-btn next';
  next.textContent = '›';

  slider.append(track, prev, next);

  initSliderLogic(slider);

  return slider;
}

function initSliderLogic(slider) {
  const track = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });

  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });
}
