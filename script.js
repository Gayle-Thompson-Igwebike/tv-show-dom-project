//You can edit ALL of the code here

//Making this variable global in order to use again//
const allEpisodes = getAllEpisodes();

function setup() {
  makePageForEpisodes(allEpisodes);
  episodeSelector(allEpisodes);
  searchItem();
}

//LEVEL 100 START//
function makePageForEpisodes() {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  const allEpisodesDisplay = document.getElementById("all-Episodes");
  allEpisodesDisplay.textContent = `Got ${allEpisodes.length} episode(s)`;

  //Adding a for loop to loop through all episodes//
  for (const episode of allEpisodes) {
    const section = document.createElement("section");
    rootElem.appendChild(section);

    //Adding name//
    const episodeName = episode.name;
    const episodeNameDiv = document.createElement("div");
    episodeNameDiv.textContent = episodeName;
    section.appendChild(episodeNameDiv);

    //Adding season//
    const episodeSeason = episode.season;
    const episodeNumber = episode.number;
    const codeDiv = document.createElement("div");

    //Adding the padding to the episode numbers//
    if (episodeNumber < 10) {
      codeDiv.textContent = `S0${episodeSeason}E0${episodeNumber}`;
      section.appendChild(codeDiv);
    } else if (episodeNumber >= 10) {
      codeDiv.textContent = `S0${episodeSeason}E${episodeNumber}`;
      section.appendChild(codeDiv);
    }

    //Adding medium image//
    const episodeMediumImage = episode.image.medium;
    const episodeMediumImageDiv = document.createElement("img");
    episodeMediumImageDiv.src = episodeMediumImage;
    section.appendChild(episodeMediumImageDiv);

    //Adding summary text//
    const episodeSummaryText = episode.summary;
    const episodeSummaryDiv = document.createElement("div");
    episodeSummaryDiv.innerHTML = episodeSummaryText;
    section.appendChild(episodeSummaryDiv);
  }
}

//LEVEL 200 START//
//Start a function for searching for episodes//
function searchItem() {
  const allEpisodes = getAllEpisodes();
  const liveSearch = document.getElementById("live-search");
  liveSearch.addEventListener("keyup", (event) => {
    console.log(event);
    const keyValues = event.target.value.toLowerCase();
    const episodeFilter = allEpisodes.filter((searchedEpisodes) => {
      return (
        searchedEpisodes.name.toLowerCase().includes(keyValues) ||
        searchedEpisodes.summary.toLowerCase().includes(keyValues)
      );
    });
    makePageForEpisodes(episodeFilter);
  });
}


//LEVEL 300 START//
//Start a function for selecting episodes//
function episodeSelector() {
  const episodeSelector = document.getElementById("episodes-selector");
  for (let episode of getAllEpisodes()) {
    const option = document.createElement("option");
    episodeSelector.appendChild(option);
    option.value = episode.name;
    const episodeSeason = episode.season;
    const episodeNumber = episode.number;
    const codeDiv = `S${String(episodeSeason).padStart(2, "0")}E${String(
    episodeNumber).padStart(2, "0")}`;
    option.innerText = `${codeDiv} - ${episode.name}`;
}
    //Add eventlistener//
    episodeSelector.addEventListener("change", (event) => {
    const selectAllEpisodes = event.target.value;
    const allEpisodes = getAllEpisodes();
    const showAll = allEpisodes.find(element => element.name.includes(selectAllEpisodes))
    makePageForEpisodes(showAll);
    console.log(showAll);
  })
  
}

window.onload = setup;
