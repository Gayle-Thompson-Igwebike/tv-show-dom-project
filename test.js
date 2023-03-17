let allShows = [];
let allSeasons = [];
let allEpisodes = [];

let showSelected = undefined;
let seasonSelected = undefined;
let episodeSelected = undefined;

async function fetchShowsFromApi() {
  const response = await fetch(`https://api.tvmaze.com/shows`);
  const data = await response.json();
  return data;
}

async function fetchSeasonsFromApi(showId) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/seasons`
  );
  const data = await response.json();
  return data;
}

async function fetchEpisodesFromApi(showId) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/episodes`
  );
  const data = await response.json();
  return data;
}

function populateShowSelectOptions() {
  const showSelectElement = document.querySelector("#show-select");
  allShows.forEach((show) => {
    const showOptionElement = document.createElement("option");
    showOptionElement.textContent = show.name;
    showOptionElement.value = show.id;
    showOptionElement.dataset.showId = show.id;
    showSelectElement.appendChild(showOptionElement);
  });
}

document.querySelector("#show-select").addEventListener("change", async (event) => {
  console.log(event.target.value);
  const showId = event.target.value;
  allSeasons = await fetchSeasonsFromApi();
  console.log(allSeasons);
  populateSeasonSelectOptions();
});

function populateSeasonSelectOptions() {
  const seasonSelectElement = document.querySelector("#season-select");
  allSeasons.forEach((season) => {
    const seasonOptionElement = document.createElement("option");
    seasonOptionElement.textContent = `Season ${season.number}`;
    seasonOptionElement.value = season.id;
    seasonOptionElement.dataset.seasonNumber = season.number;
    seasonSelectElement.appendChild(seasonOptionElement);
  });
}

document.querySelector("#season-select").addEventListener("change", async (event) => {
  console.log(event.target.value);
//   const showId = event.target.value;
//   const seasonNumber = event.target.value;
//   seasonSelected = event.target.dataset.seasonNumber;
//   console.log(`seasonSelected : ${seasonSelected}`);
  allEpisodes = await fetchEpisodesFromApi();
  console.log(allEpisodes);
  populateEpisodeSelectOptions(seasonNumber);
});

function populateEpisodeSelectOptions(seasonNumber) {
  const episodeSelectElement = document.querySelector("#episode-select");
  allEpisodes
    .filter((episode) => episode.season === seasonNumber)
    .forEach((episode) => {
    const episodeOptionElement = document.createElement("option");
    episodeOptionElement.textContent = `Season ${episode.season.toString().padStart(2, '0')} Episode ${episode.number.toString().padStart(2, '0')}`;
    episodeOptionElement.value = episode.id;
    episodeOptionElement.dataset.episodenumber = episode.number;
    episodeSelectElement.appendChild(episodeOptionElement);
  });
}

async function setup() {
  allShows = await fetchShowsFromApi();
  populateShowSelectOptions();
}

window.onload = setup;
