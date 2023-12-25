const title = document.querySelectorAll(".accordion__title");
const content = document.querySelectorAll(".accordion__content");
title.forEach((item) =>
	item.addEventListener("click", () => {
		const activeContent = document.querySelector("#" + item.dataset.tab);

		if (activeContent.classList.contains("active")) {
			activeContent.classList.remove("active");
			item.classList.remove("active");
			activeContent.style.maxHeight = 0;
		} else {
			content.forEach((element) => {
				element.classList.remove("active");
				element.style.maxHeight = 0;
			});

			title.forEach((element) => element.classList.remove("active"));

			item.classList.add("active");
			activeContent.classList.add("active");
			activeContent.style.maxHeight = activeContent.scrollHeight + "em";
		}
	})
);
