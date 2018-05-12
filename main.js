window.onscroll = (evt) => {
	const title = document.querySelector(".page-title");
	const navbar = document.querySelector(".navbar");

	if (window.pageYOffset >= window.innerHeight * .4)
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
}

const firstName = document.querySelector(".page-title--firstname");
firstName.onclick = evt => {
	const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

	if (isSmoothScrollSupported)
		window.scrollTo({
			"behavior": "smooth",
			"left": 0,
			"top": 0
		});
	else
		window.scrollTo(0, 0);
};