// variables for apikey
const apiKey = 'IyqkvBz4VyYdRgXvT1KJ5rXYJ6i7QzgkhJo515sd';
const searchUrl = 'https://api.nps.gov/api/v1/parks';

// get request from NPS API
function getNationalParks(query, maxResults = 10) {
  // create query parameters
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults,
    fields: 'addresses'
  };

  const queryString = formatQueryParams(params);
  const newUrl = searchUrl + '?' + queryString;

  fetch(newUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('.js-Results').html(error);
    });
}

function userInputForm() {
  $('form').on('submit', event => {
    event.preventDefault();
    let searchState = $('.stateInput').val();
    let maxResults = $('.numberInput').val();
    maxResults = maxResults ? maxResults : 1;
    getNationalParks(searchState, maxResults);
  });
}

function formatQueryParams(params) {
  const allKeys = Object.keys(params);
  const newArr = allKeys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return newArr.join('&');
}

function displayResults(json) {
  $('.js-Results').empty();
  const jData = json.data;
  for (let i = 0; i < jData.length; i++) {
    let address = jData[i].addresses[0];
    $('.js-Results').html(`
      <h2>${jData[i].fullName}</h2>
      <p>${jData[i].description}</p>
      <a href="${jData[i].url}>Park's Website</a><br>
      <p>${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}</p>
    `);
  }
}


$(userInputForm());