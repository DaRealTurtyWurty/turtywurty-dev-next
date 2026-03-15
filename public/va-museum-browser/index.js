const searchUrl = "https://api.vam.ac.uk/v2/objects/search?q_object_title=\"%s\"";

const searchField = document.querySelector('#search-field');
const form = document.querySelector('#search-form');
const resultsSection = document.querySelector('#results');
const resultsList = document.querySelector('#results-list');
const dialog = document.querySelector('#details-dialog');
const detailsHeading = document.querySelector('#details-heading');
const detailsImage = document.querySelector('#details-image');
const detailsContent = document.querySelector('#details-content');
const linkButton = document.querySelector('#details-link');
const closeButton = document.querySelector('#details-close');
const loadMoreButton = document.querySelector('#load-more');
const requireImages = document.querySelector('#require-images-checkbox');

closeButton.addEventListener('click', () => {
    dialog.close();
});

linkButton.addEventListener('click', () => {
    if(currentData && currentData.id) {
        window.open("https://collections.vam.ac.uk/item/" + currentData.currentId, "_blank");
    }
});

loadMoreButton.addEventListener('click', function () {
    console.log(currentData)
    if(currentData && currentData.info) {
        console.log("Loading more")
        let info = currentData.info;
        let searchTerm = searchField.value;
        let url = searchUrl.replace('%s', searchTerm) + "&page=" + (info.page + 1);
        makeRequest(url, false);
    }
});

let currentData = {};

function addResult(record) {
    let title = record._primaryTitle;
    if(!title || title === "") return;

    let images = record._images;

    if(requireImages.checked && (!images || !images._primary_thumbnail)) return;

    let result = document.createElement('div');
    result.classList.add('result');

    let titleElement = document.createElement('h3');
    titleElement.textContent = title;
    result.appendChild(titleElement);

    let imageElement = document.createElement('img');
    imageElement.src = images._primary_thumbnail ? images._primary_thumbnail.replace("100,100", "250,250") : "https://placehold.co/250?text=No+Image+Available";
    result.appendChild(imageElement);

    result.addEventListener('click', function () {
        dialog.showModal();
        detailsHeading.textContent = title;

        detailsImage.src = images._primary_thumbnail ? images._primary_thumbnail.replace("100,100", "300,300") : "https://placehold.co/300?text=No+Image+Available";

        detailsContent.replaceChildren();

        let detailsSubheading = document.createElement('h4');
        detailsSubheading.setAttribute('id', 'details-subheading');
        detailsSubheading.textContent = "Details";
        detailsContent.appendChild(detailsSubheading);

        let detailsList = document.createElement('ul');
        detailsContent.appendChild(detailsList);

        let objectType = record.objectType;
        if(objectType) {
            let objectTypeItem = document.createElement('li');
            objectTypeItem.textContent = "Object Type: " + objectType;
            detailsList.appendChild(objectTypeItem);
        }

        let place = record._primaryPlace;
        if(place) {
            let placeItem = document.createElement('li');
            placeItem.textContent = "Place: " + place;
            detailsList.appendChild(placeItem);
        }

        let date = record._primaryDate;
        if(date) {
            let dateItem = document.createElement('li');
            dateItem.textContent = "Date: " + date;
            detailsList.appendChild(dateItem);
        }

        let maker = record._primaryMaker;
        if(maker && maker.name && maker.name !== "") {
            let makerItem = document.createElement('li');
            makerItem.textContent = "Maker: " + maker.name;
            detailsList.appendChild(makerItem);
        }

        currentData.currentId = record.systemNumber;
    });

    resultsList.appendChild(result);
}

function makeRequest(url, replace = true) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            currentData = {};

            const info = data.info;
            console.log(info);
            const records = data.records;

            console.log("Found " + info.record_count + " records");

            if(replace) {
                if(resultsSection.classList.contains("invisible")) {
                    resultsSection.classList.remove("invisible");
                }

                if(info.record_count === 0) {
                    let noResults = document.createElement('p');
                    noResults.textContent = "No results found";
                    noResults.setAttribute('id', 'no-results');
                    resultsSection.appendChild(noResults);
                    if(!resultsList.classList.contains("invisible")) {
                        resultsList.classList.add("invisible");
                        resultsList.replaceChildren();
                    }

                    return;
                }

                let noResults = document.querySelector('#no-results');
                if(noResults) {
                    resultsSection.removeChild(noResults);
                }

                if(resultsList.classList.contains("invisible")) {
                    resultsList.classList.remove("invisible");
                }

                resultsList.replaceChildren();
            }

            currentData.info = info;

            records.forEach(addResult);

            if(info.page < info.pages) {
                loadMoreButton.classList.remove("invisible");
            } else if (!loadMoreButton.classList.contains("invisible")) {
                loadMoreButton.classList.add("invisible");
            }
        });
}

function handleSubmit(event) {
    event.preventDefault();

    const searchTerm = searchField.value;
    console.log('Searching for: \'', searchTerm, '\'');

    const url = searchUrl.replace('%s', searchTerm);
    makeRequest(url);
}

form.addEventListener('submit', handleSubmit);