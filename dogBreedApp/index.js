'use strict';

function getBreedImages(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(jsonData => validateBreed(jsonData));
}

function handleImagesRequest() {
  $('.js-breedSubmit').on('click keypress', e => {
    e.preventDefault();
    $('.js-dogGallery').html('');
    const breed = $('.breedOfDog').val();
    console.log(`Type of Breed: ${breed}`);
    getBreedImages(breed);
  });
}

function validateBreed(data){
  if (data.status === "error"){
    alert('Breed cannot be found.');
  }
  else{
    displayImage(data);
  }
}

function displayImage(data) {
  $('.js-dogGallery').html(`<img src='${data.message}' alt='Dog'></img>`);
}

function main() {
  handleImagesRequest();
}

//display response to console
$(main);