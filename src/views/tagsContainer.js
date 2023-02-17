export function tagsContainer() {
  const tagsContainerEl = document.querySelector(".tags-container");

  const tagsContainer = `
  <div class="tags-group">
    <div class="tag bg-blue">
      <span>Tag 1</span>
      <i class="fa-regular fa-circle-xmark"></i>
    </div>

    <div class="tag bg-red">
      <span>Tag 2</span>
      <i class="fa-regular fa-circle-xmark"></i>
    </div>
  </div>

  <div class="dropdown-group">
    <div class="dropdown bg-blue">
      <span>Ingredients</span>
      <i class="fa fa-chevron-down"></i>
    </div>

    <div class="dropdown bg-green">
      <span>Appareils</span>
      <i class="fa fa-chevron-down"></i>
    </div>

    <div class="dropdown bg-red">
      <span>Ustensiles</span>
      <i class="fa fa-chevron-down"></i>
    </div>
  </div>
    `;

  return tagsContainerEl;
}
