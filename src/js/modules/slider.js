import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Controller, Parallax } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/parallax";
import "swiper/css/navigation";
import "swiper/css/pagination";


const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
let videoPrev = null;
let videoActive = null;

const bannerSliderText = new Swiper(".banner-slider-text", {
	modules: [Navigation, Pagination, Autoplay, Controller, Parallax],
    loop: true,
    speed: 2000,
    parallax: {
        enabled: true
    },
    autoplay: {
        disableOnInteraction: false,
    },
	pagination: {
		el: ".banner-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".banner-button-next",
		prevEl: ".banner-button-prev",
	},
    on: {
        autoplayTimeLeft(s, time, progress) {
          progressCircle.style.setProperty("--progress", 1 - progress);
          progressContent.textContent = `${Math.ceil(time / 1000)}с.`;
        },
        slideChange(s){
            const prevIdx = (bannerSliderImg.activeIndex - 1) < 0 ? 0 : bannerSliderImg.activeIndex - 1;
            videoPrev = bannerSliderImg.slides[prevIdx].querySelector('video');
            if(videoPrev){
                videoPrev.pause();
            }
            videoActive = bannerSliderImg.slides[bannerSliderImg.activeIndex].querySelector('video');
            if(videoActive){
                bannerSliderText.params.autoplay.delay = Math.ceil(videoActive.duration) * 1000;
            }
            progressCircle.closest('.autoplay-progress').style.display = 'none'; 
        },
        slideChangeTransitionEnd(s){
            if(videoPrev){
                videoPrev.currentTime = 0;
            }
            if(videoActive){
                videoActive.play();
            }
            progressCircle.closest('.autoplay-progress').style.display = 'flex'; 
        }
      }
});

const bannerSliderImg = new Swiper(".banner-slider-img", {
	lazy: true,
    loop: true,
});

bannerSliderText.controller.control = bannerSliderImg;