const items = document.querySelectorAll(".tab-item");
const contentItems = document.querySelectorAll(".tab-content-item");

const select = function () { 
    removeBorder();
    removeShow();
    this.classList.add("tab-border");
    const contentItem = document.querySelector(`#${this.id}-content`);
    contentItem.classList.add("show");
}

const removeBorder = () => {
    items.forEach(item => item.classList.remove("tab-border"));
}

const removeShow = () => {
    contentItems.forEach(item => item.classList.remove("show"));
}

items.forEach(item => item.addEventListener("click", select));
