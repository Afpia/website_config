document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("burger").addEventListener("click", function () {
		document.querySelector("header").classList.toggle("open");
		document.querySelector("body").classList.toggle("close");
	});
});
document.querySelector("nav").addEventListener("click", (event) => {
	event._isClickWithInNav = true;
});
document.getElementById("burger").addEventListener("click", (event) => {
	event._isClickWithInNav = true;
});
document.body.addEventListener("click", (event) => {
	if (event._isClickWithInNav) return;
	document.querySelector("header").classList.remove("open");
	document.querySelector("body").classList.remove("close");
});
