require("./main.css");
require("./images/masha-shoulder.jpg");
require("./favicon/apple-touch-icon-57x57.png");
require("./favicon/apple-touch-icon-72x72.png");
require("./favicon/apple-touch-icon-114x114.png");
require("./favicon/apple-touch-icon-120x120.png");
require("./favicon/apple-touch-icon-144x144.png");
require("./favicon/apple-touch-icon-152x152.png");
require("./favicon/favicon.ico");
require("./favicon/favicon-16x16.png");
require("./favicon/favicon-32x32.png");
require("./favicon/mstile-144x144.png");

const onPageScroll = () => {
	const title = document.querySelector(".page-title");
	const navbar = document.querySelector(".navbar");

	if (window.pageYOffset >= window.innerHeight * .35)
		title.classList.add("page-title--docked");
	else
		title.classList.remove("page-title--docked");

	if (window.pageYOffset >= window.innerHeight * .8)
		title.classList.add("page-title--small");
	else
		title.classList.remove("page-title--small");
	
	if (window.pageYOffset >= window.innerHeight)
		navbar.classList.remove("navbar--hidden");
	else
		navbar.classList.add("navbar--hidden");
};

window.onscroll = onPageScroll;

const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
const firstName = document.querySelector(".page-title--firstname");
firstName.onclick = evt => {
	if (isSmoothScrollSupported)
		window.scrollTo({
			"behavior": "smooth",
			"left": 0,
			"top": 0
		});
	else
		window.scrollTo(0, 0);
};

const navbarHeight = 36;
const watchButton = document.querySelector(".home-button--watch");
watchButton.onclick = evt => {
	const videoContent = document.querySelector(".content--video");
	const top = videoContent.getBoundingClientRect().top - navbarHeight;
	if (isSmoothScrollSupported)
		window.scrollTo({
			"behavior": "smooth",
			"left": 0,
			"top": top
		});
	else
		window.scrollTo(0, top);
};

const bookButton = document.querySelector(".home-button--book");
bookButton.onclick = evt => {
	const contactContent = document.querySelector(".content--contact");
	const top = contactContent.getBoundingClientRect().top - navbarHeight;
	if (isSmoothScrollSupported)
		window.scrollTo({
			"behavior": "smooth",
			"left": 0,
			"top": top
		});
	else
		window.scrollTo(0, top);
};