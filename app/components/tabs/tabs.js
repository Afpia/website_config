const tabItem = document.querySelectorAll(".tab__btn-item");
const tabContent = document.querySelectorAll(".tab__content");

tabItem.forEach(function (element) {
	element.addEventListener("click", open);
});

function open(evt) {
	const tabTarget = evt.currentTarget;
	const button = tabTarget.dataset.button;

	tabItem.forEach(function (item) {
		item.classList.remove("tab__btn--active");
	});

	tabContent.forEach(function (item) {
		item.classList.remove("tab__content--active");
	});
	tabTarget.classList.add("tab__btn--active");
	document.querySelector(`#${button}`).classList.add("tab__content--active");
}
