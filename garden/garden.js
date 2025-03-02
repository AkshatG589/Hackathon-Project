const plants = [

  { name: "Aloe Vera", image: "/Images/aleovera.jpg", originalName: "Aloe Barbadensis", botanicalName: "Aloe Vera", remedies: "Burns, Skin Care, Digestive issues", description: "Aloe Vera is known for its soothing properties and healing effects.", fullDescription: "Aloe Vera is used for burns, cuts, and digestive health. Its gel is applied to skin for soothing effects." },

  { name: "Basil", image: "/Images/tulsi.webp", originalName: "Holy Basil", botanicalName: "Ocimum Sanctum", remedies: "Stress Relief, Immunity Booster", description: "Basil is a popular herb used in cooking.", fullDescription: "Basil has medicinal properties, particularly as an anti-stress herb. It also boosts immunity and improves skin health." },
  { name: "Mint", image: "/Images/mint.jpg", originalName: "Mint", botanicalName: "Mentha", remedies: "Indigestion, Nausea", description: "Mint is known for its refreshing aroma.", fullDescription: "Mint is widely used for its cooling effect and for aiding digestion. It helps to relieve nausea and indigestion." },
  { name: "Lavender", image: "/Images/Lavender.jpg", originalName: "Lavandula", botanicalName: "Lavandula angustifolia", remedies: "Stress Relief, Sleep Aid", description: "Lavender is known for its calming fragrance.", fullDescription: "Lavender is often used for stress relief, insomnia, and relaxation. It has calming effects on the body and mind." },
  { name: "Rosemary", image: "/Images/Rosemary.jpg", originalName: "Rosmarinus", botanicalName: "Rosmarinus officinalis", remedies: "Memory Aid, Hair Health", description: "Rosemary is used both in cooking and for medicinal purposes.", fullDescription: "Rosemary is great for boosting memory, improving concentration, and aiding in hair growth." },
  { name: "Thyme", image: "/Images/Thyme.jpeg", originalName: "Thyme", botanicalName: "Thymus vulgaris", remedies: "Cough, Digestive Health", description: "Thyme is a fragrant herb used in cooking.", fullDescription: "Thyme has multiple health benefits, including treating coughs, improving digestion, and relieving respiratory issues." },
  { name: "Chamomile", image: "/Images/Chamomile.jpg", originalName: "Chamomile", botanicalName: "Matricaria chamomilla", remedies: "Sleep Aid, Digestive Health", description: "Chamomile is known for its calming tea.", fullDescription: "Chamomile is widely used to help with sleep disorders and digestive health. It has anti-inflammatory properties." },
  { name: "Ginger", image: "/Images/Ginger.webp", originalName: "Zingiber officinale", botanicalName: "Zingiber officinale", remedies: "Nausea, Inflammation", description: "Ginger is a root used in cooking and medicine.", fullDescription: "Ginger is widely used for relieving nausea, improving digestion, and reducing inflammation. It also helps with joint pain." },
  { name: "Echinacea", image: "/Images/Echinacea.jpeg", originalName: "Purple Coneflower", botanicalName: "Echinacea purpurea", remedies: "Immune System, Cold Relief", description: "Echinacea is often used to boost the immune system.", fullDescription: "Echinacea is commonly used for fighting colds and flu, boosting immunity, and reducing inflammation." },
  { name: "Peppermint", image: "/Images/Peppermint.webp", originalName: "Peppermint", botanicalName: "Mentha × piperita", remedies: "Headaches, Digestive Health", description: "Peppermint is used in teas, candy, and essential oils.", fullDescription: "Peppermint is commonly used for digestive issues and as a headache reliever. Its essential oil is also effective in treating muscle pain." },
];


const plantCardsContainer = document.getElementById("plantCards");
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

// Render plant cards dynamically
plants.forEach((plant, index) => {
  const card = document.createElement("div");
  card.className = "col-lg-4 col-md-6 col-sm-12 my-4";
  card.innerHTML = `
      <div class="card">
          <img src="${plant.image}" class="card-img-top" alt="${plant.name}">
          <div class="card-body">
              <h5 class="card-title">${plant.name}</h5>
              <p class="card-text">${plant.description}</p>
          </div>
          <div class="card-footer text-end pe-2">
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#learnMoreModal" onclick="openLearnMore(${index})">Learn More</button>
              <button id="bookmarkBtn-${index}" class="btn ${isBookmarked(plant.name) ? 'btn-danger' : 'btn-secondary'}" onclick="toggleBookmark(${index})">
                  ${isBookmarked(plant.name) ? 'Remove' : 'Bookmark'}
              </button>
          </div>
      </div>
  `;
  plantCardsContainer.appendChild(card);
});

// Open "Learn More" modal
function openLearnMore(index) {
  const plant = plants[index];
  document.getElementById("learnMoreModalLabel").innerText = plant.name;
  document.getElementById("modalImage").src = plant.image;
  document.getElementById("modalOriginalName").innerText = `Original Name: ${plant.originalName}`;
  document.getElementById("modalBotanicalName").innerText = plant.botanicalName;
  document.getElementById("modalRemedies").innerText = plant.remedies;
  document.getElementById("modalDescription").innerText = plant.fullDescription;
}

// Toggle bookmark state
function toggleBookmark(index) {
  const plant = plants[index];
  const bookmarkBtn = document.getElementById(`bookmarkBtn-${index}`);

  // Check if already bookmarked
  const existingIndex = bookmarks.findIndex((item) => item.name === plant.name);

  if (existingIndex !== -1) {
    bookmarks.splice(existingIndex, 1);
    bookmarkBtn.classList.replace("btn-danger", "btn-secondary");
    bookmarkBtn.innerText = "Bookmark";
    alert(`${plant.name} removed from collection.`);
  } else {
    bookmarks.push(plant);
    bookmarkBtn.classList.replace("btn-secondary", "btn-danger");
    bookmarkBtn.innerText = "Remove";
    alert(`${plant.name} added to collection.`);
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  updateCollectionLink();
}

// Check if a plant is already bookmarked
function isBookmarked(name) {
  return bookmarks.some((plant) => plant.name === name);
}

// Update collection link with count
function updateCollectionLink() {
  const collectionLink = document.getElementById("collectionLink");
  if (collectionLink) {
    collectionLink.innerText = `My Collection (${bookmarks.length})`;
  }
}

// Load bookmarks count on page load
document.addEventListener("DOMContentLoaded", updateCollectionLink);