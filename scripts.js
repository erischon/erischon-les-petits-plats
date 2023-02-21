export function createDropdownEvent() {
  const dropdown = document.querySelectorAll(".dropdown");

  dropdown.forEach((item) => {
    item.addEventListener("click", (e) => handleDropdownClick(item.id));
  });
}

export function handleDropdownClick(id) {
  console.log(id);
}

createDropdownEvent();
