window.onscroll = (evt) => {
	const title = document.querySelector(".page-title");

	if (window.pageYOffset >= window.innerHeight * .4)
		title.classList.add("page-title--docked");
	else
		title.classList.remove("page-title--docked");

	if (window.pageYOffset >= window.innerHeight * .8)
		title.classList.add("page-title--small");
	else
		title.classList.remove("page-title--small");
}