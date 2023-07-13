import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/css/parallax";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
let videoPrev = null;
let videoActive = null;

const bannerSlider = new Swiper(".banner-slider", {
	modules: [Navigation, Pagination, Autoplay, Parallax],
	loop: true,
	speed: 2400,
	parallax: {
		enabled: true,
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
		slideChange(s) {
			const prevIdx = this.activeIndex - 1 < 0 ? 0 : this.activeIndex - 1;
			videoPrev = this.slides[prevIdx].querySelector("video");
			if (videoPrev) {
				videoPrev.pause();
			}
			videoActive = this.slides[this.activeIndex].querySelector("video");
			if (videoActive) {
				this.params.autoplay.delay = Math.ceil(videoActive.duration) * 1000;
			}
			progressCircle.closest(".autoplay-progress").style.display = "none";
		},
		slideChangeTransitionEnd(s) {
			if (videoPrev) {
				videoPrev.currentTime = 0;
			}
			if (videoActive) {
				videoActive.play();
			}
			progressCircle.closest(".autoplay-progress").style.display = "flex";
		},
	},
});
