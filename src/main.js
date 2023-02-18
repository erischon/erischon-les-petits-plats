import homePage from "./views/homePage.js";

const global = {
  currentPage: window.location.pathname,
};

// Init App
export function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      homePage();
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);

export function displayTarget() {
  console.log("toto");
}
