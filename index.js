'use strict';

function getRandomImages(number) {
  fetch(`https://dog.ceo/api/breeds/image/random/${number}`)
    .then(response => response.json())
    .then(jsonData => displayImage(jsonData));
}

function handleImagesRequest() {
  $('.js-numberEntrySubmit').on('click keypress', e => {
    e.preventDefault();
    $('.js-dogGallery').html('');
    const number = $('.numberOfDogs').val();
    console.log(`number of images: ${number}`);
    if (number > 50 || number < 1) {
      alert('Enter a number between 1 and 50');
    } else {
      getRandomImages(number);
    }
  });
}

function displayImage(data) {
  data.message.forEach(link => {
    console.log(link);
    $('.js-dogGallery').append(`<img src='${link}' alt='dog'></img>`);
  });
}

function main() {
  handleImagesRequest();
}

//display response to console
$(main);