export function createDropdownEvent() {
  const dropdown = document.querySelectorAll(".dropdown");

  dropdown.forEach((item) => {
    item.addEventListener("click", (e) => new TagsBox(item.id));
  });
}

class TagsBox {
  constructor(id) {
    this.dropdownEl = document.querySelector(`#${id}`);
    this.toggleActive();
    console.log(this.isActive());
  }

  view() {}

  isActive() {
    return this.dropdownEl.className.split(" ").indexOf("active") > -1;
  }

  toggleActive() {
    !this.isActive()
      ? this.dropdownEl.classList.add("active")
      : this.dropdownEl.classList.remove("active");
  }
}

createDropdownEvent();
