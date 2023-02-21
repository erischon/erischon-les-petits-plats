export function createDropdownEvent() {
  const dropdown = document.querySelectorAll(".dropdown");

  dropdown.forEach((item) => {
    item.addEventListener("click", (e) => handleDropdownClick(item.id));
  });
}

export function handleDropdownClick(id) {
  const dropdownEl = document.querySelector(`#${id}`);
  const isActive = dropdownEl.className.split(" ").indexOf("active") > -1;

  !isActive
    ? dropdownEl.classList.add("active")
    : dropdownEl.classList.remove("active");
}

createDropdownEvent();
