let subMenu = document.getElementById("subMenu");
const apiUrl = 'https://fortnite-api.com/v2/cosmetics/br';
const container = document.querySelector('.skin-container');


function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const skins = data.data.filter(item => item.type.value === 'outfit');

    for (let index = 0; index < 85; index++) {
      const skin = skins[index];

      if (skin.name != "null" && skin.images.featured != null) {
        if (skin.rarity.displayValue == "Legendary" || skin.rarity.displayValue == "Epic" || skin.rarity.displayValue == "Rare" || skin.rarity.displayValue == "Uncommon") {
          const card = document.createElement('div');
          card.classList.add('skin-card');
          if (skin.rarity.displayValue == "Legendary") {
            card.innerHTML = 
          `<img src="${skin.images.icon}" style="background-image: linear-gradient( 90.5deg,  rgba(255,207,139,0.50) 1.1%, rgba(255,207,139,1) 81.3% );" alt="${skin.description}" data-src="${skin.images.featured}" data-name="${skin.name}">
          <h3>${skin.name}</h3>`;
          }
          else if (skin.rarity.displayValue == "Epic") {
            card.innerHTML = 
          `<img src="${skin.images.icon}" style="background-image: radial-gradient( circle farthest-corner at 83.7% 4.3%,  rgba(173,0,171,1) 0%, rgba(15,51,92,1) 90% );" alt="${skin.description}" data-src="${skin.images.featured}" data-name="${skin.name}">
          <h3>${skin.name}</h3>`;
          }
          else if (skin.rarity.displayValue == "Uncommon") {
            card.innerHTML = 
          `<img src="${skin.images.icon}" style="background-image: linear-gradient( 73.1deg,  rgba(34,126,34,1) 8%, rgba(99,162,17,1) 86.9% );" alt="${skin.description}" data-src="${skin.images.featured}" data-name="${skin.name}">
          <h3>${skin.name}</h3>`;
          } 
          else {
            card.innerHTML = 
          `<img src="${skin.images.icon}" style="background-image: linear-gradient( 96.5deg,  rgba(39,103,187,1) 10.4%, rgba(16,72,144,1) 87.7% );" alt="${skin.description}" data-src="${skin.images.featured}" data-name="${skin.name}">
          <h3>${skin.name}</h3>`;
          }
          container.appendChild(card);
      
        }
      }
    }
  })
  .catch(error => console.error(error));

container.addEventListener('click', event => {
  const skinCard = event.target.closest('.skin-card');
  if (skinCard) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">

          <button class="btn-close">&times;</button>
          
          <img src="${skinCard.querySelector('img').dataset.src}" alt="${skinCard.querySelector('img').alt}">
          <h1>${skinCard.querySelector('img').dataset.name}</h1>
          <h3>${skinCard.querySelector('img').alt}</h3>     
          
          <button id="btnstr" class="starbtn"><i class="fa fa-star" aria-hidden="true"></i></button>
          <button class="banbtn"><i class="fa fa-ban" aria-hidden="true"></i></button>

          
        </div>
      `;
    document.body.appendChild(popup);

    const closeBtn = popup.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => {
      popup.remove();
    });
  }
});