//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeListepisodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  const allEpisodesDisplay = document.getElementById("all-Episodes");
  allEpisodesDisplay.textContent = `Got ${episodeList.length} episode(s)`;

  //Adding a for loop to loop through all episodes//
  for (const episode of episodeList) {
    const section = document.createElement("section");
    section.setAttribute("id", `episode-${episode.id}`);
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

// LEVEL 200 START//
// Start a function for searching for episodes//

function searchItem() {
  getAllEpisodes();
  const liveSearch = document.getElementById("live-search");
  liveSearch.addEventListener("keyup", (event) => {
    console.log(event);
    const keyValues = event.target.value.toLowerCase();
    const episodeFilter = getAllEpisodes().filter((searchedItems) => {
      return (
        searchedItems.name.toLowerCase().includes(keyValues) ||
        searchedItems.summary.toLowerCase().includes(keyValues)
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
    option.value = episode.id;
    const episodeSeason = episode.season;
    const episodeNumber = episode.number;
    const codeDiv = `S${String(episodeSeason).padStart(2, "0")}E${String(
      episodeNumber
    ).padStart(2, "0")}`;
    option.innerText = `${codeDiv} - ${episode.name}`;
  }
  //Add eventlistener//
  // episodeSelector.addEventListener("change", (event) => {
  //   const searchedEpisodeValue = event.target.value;
  //   const displayId = document.querySelector(
  //     `#episode-${searchedEpisodeValue}`
  //   );
  //   displayId.scrollIntoView();
  // });
  episodeSelector.addEventListener
}

window.onload = setup;
