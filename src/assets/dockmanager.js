// FOR REFERENCE ONLY!
const dock = document.querySelector(".dock");
const dockIcons = dock.querySelectorAll("img");

window.addEventListener("DOMContentLoaded", () => {
	loadDockOrder();
});

dockIcons.forEach((icon) => {
	icon.setAttribute("draggable", true);

	icon.addEventListener("dragstart", (e) => {
		e.target.classList.add("dragging");
		e.dataTransfer.setData("text/plain", e.target.src);
	});

	icon.addEventListener("dragend", (e) => {
		e.target.classList.remove("dragging");
		saveDockOrder();
	});
});

dock.addEventListener("dragover", (e) => {
	e.preventDefault();
	const afterElement = getDragAfterElement(dock, e.clientY);
	const dragging = document.querySelector(".dragging");
	if (afterElement == null) {
		dock.appendChild(dragging);
	} else {
		dock.insertBefore(dragging, afterElement);
	}
});

function getDragAfterElement(container, y) {
	const draggableElements = [...container.querySelectorAll("img:not(.dragging)")];

	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY },
	).element;
}

function saveDockOrder() {
	const dockOrder = [];
	dock.querySelectorAll("img").forEach((icon) => {
		dockOrder.push(icon.src);
	});
	localStorage.setItem("dockOrder", JSON.stringify(dockOrder));
}

function loadDockOrder() {
	const dockOrder = JSON.parse(localStorage.getItem("dockOrder"));
	if (dockOrder) {
		dockOrder.forEach((src) => {
			const icon = [...dockIcons].find((icon) => icon.src === src);
			if (icon) {
				dock.appendChild(icon);
			}
		});
	}
}
// FOR REFERENCE ONLY!
