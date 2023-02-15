export function rsesultsContainer(): Element {
  const rsesultsContainerEl = document.querySelector(".results-container");

  const rsesultsContainer = `
  <article class="card-box">
  <div class="card-container-top"></div>

  <div class="card-container-bottom">
    <div class="card-container-bottom__top">
      <h2 class="card-title">Limonade de Coco</h2>

      <div class="card-period">
        <span><i class="fa-regular fa-clock"></i></span>
        <div>10 min</div>
      </div>
    </div>

    <div class="card-container-bottom__bottom">
      <ul>
        <li>Lait de coco: <span>400ml</span></li>
        <li>Jus de citron: <span>2</span></li>
        <li>Créme de coco: <span>4 cuillères</span></li>
        <li>Sucre: <span>20g</span></li>
        <li>Glaçons: <span>2</span></li>
      </ul>

      <div>
        Mettre les glaçons à votre goût dans le blender, ajouter le
        lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer
        jusqu'à avoir la consistence désirée.
      </div>
    </div>
  </div>
</article>

<article class="card-box">
  <div class="card-container-top"></div>

  <div class="card-container-bottom">
    <div class="card-container-bottom__top">
      <h2 class="card-title">Limonade de Coco</h2>

      <div class="card-period">
        <span><i class="fa-regular fa-clock"></i></span>
        <div>10 min</div>
      </div>
    </div>

    <div class="card-container-bottom__bottom">
      <ul>
        <li>Lait de coco: <span>400ml</span></li>
        <li>Jus de citron: <span>2</span></li>
        <li>Créme de coco: <span>4 cuillères</span></li>
        <li>Sucre: <span>20g</span></li>
        <li>Glaçons: <span>2</span></li>
      </ul>

      <div>
        Mettre les glaçons à votre goût dans le blender, ajouter le
        lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer
        jusqu'à avoir la consistence désirée.
      </div>
    </div>
  </div>
</article>

<article class="card-box">
  <div class="card-container-top"></div>

  <div class="card-container-bottom">
    <div class="card-container-bottom__top">
      <h2 class="card-title">Limonade de Coco</h2>

      <div class="card-period">
        <span><i class="fa-regular fa-clock"></i></span>
        <div>10 min</div>
      </div>
    </div>

    <div class="card-container-bottom__bottom">
      <ul>
        <li>Lait de coco: <span>400ml</span></li>
        <li>Jus de citron: <span>2</span></li>
        <li>Créme de coco: <span>4 cuillères</span></li>
        <li>Sucre: <span>20g</span></li>
        <li>Glaçons: <span>2</span></li>
      </ul>

      <div>
        Mettre les glaçons à votre goût dans le blender, ajouter le
        lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer
        jusqu'à avoir la consistence désirée.
      </div>
    </div>
  </div>
</article>

<article class="card-box">
  <div class="card-container-top"></div>

  <div class="card-container-bottom">
    <div class="card-container-bottom__top">
      <h2 class="card-title">Limonade de Coco</h2>

      <div class="card-period">
        <span><i class="fa-regular fa-clock"></i></span>
        <div>10 min</div>
      </div>
    </div>

    <div class="card-container-bottom__bottom">
      <ul>
        <li>Lait de coco: <span>400ml</span></li>
        <li>Jus de citron: <span>2</span></li>
        <li>Créme de coco: <span>4 cuillères</span></li>
        <li>Sucre: <span>20g</span></li>
        <li>Glaçons: <span>2</span></li>
      </ul>

      <div>
        Mettre les glaçons à votre goût dans le blender, ajouter le
        lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer
        jusqu'à avoir la consistence désirée.
      </div>
    </div>
  </div>
</article>

<article class="card-box">
  <div class="card-container-top"></div>

  <div class="card-container-bottom">
    <div class="card-container-bottom__top">
      <h2 class="card-title">Limonade de Coco</h2>

      <div class="card-period">
        <span><i class="fa-regular fa-clock"></i></span>
        <div>10 min</div>
      </div>
    </div>

    <div class="card-container-bottom__bottom">
      <ul>
        <li>Lait de coco: <span>400ml</span></li>
        <li>Jus de citron: <span>2</span></li>
        <li>Créme de coco: <span>4 cuillères</span></li>
        <li>Sucre: <span>20g</span></li>
        <li>Glaçons: <span>2</span></li>
      </ul>

      <div>
        Mettre les glaçons à votre goût dans le blender, ajouter le
        lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer
        jusqu'à avoir la consistence désirée.
      </div>
    </div>
  </div>
</article>
    `;

  rsesultsContainerEl
    ? (rsesultsContainerEl.innerHTML = rsesultsContainer)
    : null;

  return rsesultsContainerEl!;
}
