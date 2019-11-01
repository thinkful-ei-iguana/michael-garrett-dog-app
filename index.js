'use strict';

//take input for number of pictures to fetch

const submitInput = function(){
  ('form').on('submit', event =>{
    event.preventDefault();
    const userInput = ('#numberOfDogs').val();
    input = userInput;
  });
};

//need to fetch form the api.
fetch('https://dog.ceo/api/breeds/image/random/3')
  .then(response => response.json())
  .then(jsonData => console.log(jsonData));

//display response to console
// $('main').html()