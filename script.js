// 1BMtf06omVV8DGMpKakPLxnIXBC1KGxGDZyZIkcoWjc

// https://api.unsplash.com/search/photos?page=1&query=cloud&client_id=

// https://api.unsplash.com/photos


const accessKey = "1BMtf06omVV8DGMpKakPLxnIXBC1KGxGDZyZIkcoWjc";

const formE1 = document.querySelector("form");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResults");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");

let inputData = "";
let page = 1;

const showMoreBtn = document.createElement("button");
showMoreBtn.id = "showMoreBtn";
showMoreBtn.textContent = "Show More";

// Append "Show More" button after the first set of images is displayed
function appendShowMoreButton() {
    document.body.appendChild(showMoreBtn);

    showMoreBtn.addEventListener("click", () => {
        fetchImages(inputData);
    });
}

async function fetchImages(input) {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (page === 1) {
            searchResult.innerHTML = ""; // Clear previous results
        }

        const results = data.results;
        if (results.length === 0) {
            alert("No results found.");
            return;
        }

        results.forEach((photo) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = photo.urls.small;
            image.alt = photo.alt_description;

            const saveBtn = document.createElement("button");
            saveBtn.classList.add("save-btn");
            saveBtn.textContent = "Save";
            saveBtn.addEventListener("click", () => saveImage(photo));

            const imageLink = document.createElement("a");
            imageLink.href = photo.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = photo.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(saveBtn);
            imageWrapper.appendChild(imageLink);
            searchResult.appendChild(imageWrapper);

            // Lightbox Modal on Image Click
            image.addEventListener("click", () => openLightbox(photo.urls.full));
        });

        if (page === 1) {
            appendShowMoreButton(); // Show "Show More" button after the first load
        }

        page++;
    })
    .catch((error) => console.error("Error:", error));
}

function saveImage(photo) {
    alert(`Image saved: ${photo.alt_description}`);
}

function openLightbox(imageUrl) {
    lightbox.style.display = "block";
    lightboxImage.src = imageUrl;
}

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

formE1.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    fetchImages(inputData);
});
