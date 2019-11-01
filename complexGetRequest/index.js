// variables for apikey
const apiKey = 'IyqkvBz4VyYdRgXvT1KJ5rXYJ6i7QzgkhJo515sd';
const searchUrl = 'https://api.nps.gov/api/v1/parks';

// get request from NPS API
function getNationalParks(query, maxResults) {
  // create query parameters
  const params = {
    key: apiKey,
    q: query,
    limit: maxResults,
    fields: 'addresses'
  };

  const queryString = formatQueryParams(params);
  console.log(queryString);
  const newUrl = searchUrl + '?' + queryString;
  console.log(newUrl);

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
    console.log(searchState);
    let maxResults = $('.numberInput').val();
    maxResults = maxResults ? maxResults : 10;
    getNationalParks(searchState, maxResults);
  });
}

function formatQueryParams(params) {
  const allKeys = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return allKeys.join('&');
}

function displayResults(json) {
  $('.js-Results').empty();
  const jData = json.data;
  console.log(jData);
  for (let i = 0; i < jData.length; i++) {
    let address = jData[i].addresses[0];
    $('.js-Results').append(`
      <h2>${jData[i].fullName}</h2>
      <p>${jData[i].description}</p>
      <a href="${jData[i].url}">Park's Website</a><br>
      <p>${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}</p>
    `);
  }
}


$(userInputForm());