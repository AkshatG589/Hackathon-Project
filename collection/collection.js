document.addEventListener("DOMContentLoaded", function () {
            displayBookmarkedPlants();
        });
    function displayBookmarkedPlants() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const bookmarkedCards = document.getElementById("plantCards");

    console.log("Bookmarked Cards Element:", bookmarkedCards); // Debugging

    if (!bookmarkedCards) {
        console.error("Error: #bookmarkedCards element not found!");
        return; // Stop execution if null
    }

    bookmarkedCards.innerHTML = bookmarks.length === 0 ? "<p class='text-center'>No plants bookmarked yet.</p>" : "";

    bookmarks.forEach((plant, index) => {
        const card = document.createElement("div");
        card.className = "col-lg-4 col-md-6 col-sm-12 mb-4";
        card.innerHTML = `
            <div class="card shadow-sm">
                <img src="${plant.image}" class="card-img-top" alt="${plant.name}">
                <div class="card-body">
                    <h5 class="card-title">${plant.name}</h5>
                    <p class="card-text">${plant.fullDescription.substring(0, 50)}...</p>
                </div>
                <div class="card-footer text-end pe-2">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#learnMoreModal" onclick="openLearnMore(${index})">Learn More</button>
                    <button class="btn btn-danger" onclick="removeBookmark(${index})">Remove</button>
                </div>
            </div>
        `;
        bookmarkedCards.appendChild(card);
    });
}
        function openLearnMore(index) {
            const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
            const plant = bookmarks[index];

            if (!plant) {
                console.error("Plant details not found!");
                return;
            }

            document.getElementById('learnMoreModalLabel').innerText = plant.name;
            document.getElementById('modalImage').src = plant.image;
            document.getElementById('modalOriginalName').innerText = `Original Name: ${plant.originalName}`;
            document.getElementById('modalBotanicalName').innerText = plant.botanicalName;
            document.getElementById('modalRemedies').innerText = plant.remedies;
            document.getElementById('modalDescription').innerText = plant.fullDescription;
        }

        function removeBookmark(index) {
            let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
            bookmarks.splice(index, 1);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            displayBookmarkedPlants();
        }

        function bookmarkPlant(plantName) {
            let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
            const plant = plants.find(p => p.name === plantName);
            if (plant && !bookmarks.some(p => p.name === plantName)) {
                bookmarks.push(plant);
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            }
        }