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

const nameInput = document.getElementById("contact-name");
nameInput.onblur = e => {
	nameInput.value = nameInput.value.trim();
	nameInput.classList.toggle("nonempty", nameInput.value !== "");
};

const emailInput = document.getElementById("contact-email");
emailInput.onblur = e => {
	emailInput.value = emailInput.value.trim();
	emailInput.classList.toggle("nonempty", emailInput.value !== "");
};

const messageInput = document.getElementById("contact-message");
messageInput.onblur = e => {
	messageInput.value = messageInput.value.trim();
	messageInput.classList.toggle("nonempty", messageInput.value !== "");
};

const contactSubmit = document.getElementById("contact-submit");
contactSubmit.onclick = e => submitContactForm();

async function submitContactForm()
{
	const contactPane = document.querySelector(".content--contact");
	contactPane.classList.add("validate");

	if (!emailInput.checkValidity() ||
		!nameInput.checkValidity() ||
		!messageInput.checkValidity())
	{
		return;
	}

	const email = emailInput.value;
	const name = nameInput.value;
	const message = messageInput.value;

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	contactSubmit.disabled = true;

	const response = (await fetch("https://jf61olseya.execute-api.us-east-1.amazonaws.com/Production/contact",
	{
		method: "POST",
		headers: headers,
		mode: "cors",
		body: JSON.stringify({
			email: email,
			name: name,
			message: message
		})
	}));

	contactSubmit.disabled = false;

	if (response.status < 200 || response.status > 299)
	{
		const errorMsg = document.querySelector(".form-submit-error");
		errorMsg.classList.add("visible");
	}
	else
	{
		contactSubmit.classList.add("complete");
		setTimeout(() => {
			contactSubmit.classList.remove("complete");
		}, 3000);
	}
}