//You can edit ALL of the code here

//Making this variable global in order to use again//
// const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
const showAllShows = getAllShows();

async function setup() {
  const showAllShows = await fetchAllTVShows();
  console.log(showAllShows);
  selectShows(showAllShows);
}

async function fetchAllTVShows() {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//LEVEL 350 ADDING FETCH FUNCTION FOR THE API//
async function tvShowFetch() {
  selectShows(showAllShows);
  try {
    let url = EpisodesFromURLid(523);
    const result = await fetch(url);
    const fetchedData = await result.json();
    makePageForEpisodes(fetchedData);
    episodeSelector(fetchedData);
    searchItem(fetchedData);
  } catch (error) {
    console.log(error);
  }
}

//LEVEL 100 START//
function makePageForEpisodes(episodes) {
  rootElem.innerHTML = "";
  const allEpisodesDisplay = document.getElementById("all-Episodes");
  allEpisodesDisplay.textContent = `Displaying ${episodes.length} of ${episodes.length} episodes`;

  //Adding a for loop to loop through all episodes//
  for (const episode of episodes) {
    const section = document.createElement("section");
    rootElem.appendChild(section);

    //Adding name//
    const episodeName = episode.name;
    const episodeNameDiv = document.createElement("div");
    episodeNameDiv.classList.add("titles")
    episodeNameDiv.textContent = episodeName;
    section.appendChild(episodeNameDiv);

    //Adding season//
    const episodeSeason = episode.season;
    const episodeNumber = episode.number;
    const codeDiv = document.createElement("div");
    codeDiv.classList.add("titles");
    //Adding the padding to the episode numbers//
    if (episodeNumber < 10) {
      codeDiv.textContent = `S0${episodeSeason}E0${episodeNumber}`;
      section.appendChild(codeDiv);
    } else if (episodeNumber >= 10) {
      codeDiv.textContent = `S0${episodeSeason}E${episodeNumber}`;
      section.appendChild(codeDiv);
    }

    //Adding medium image//
    const episodeMediumImageDiv = document.createElement("img");
    episodeMediumImageDiv.classList.add("pictures")
    episodeMediumImageDiv.src = episode.image ? episode.image.medium : "";
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
function searchItem(keywords) {
  // const allEpisodes = getAllEpisodes();
  const liveSearch = document.getElementById("live-search");
  liveSearch.oninput = (event) => {
    // console.log(event);
    const keyValues = event.target.value.toLowerCase();
    const episodeFilter = keywords.filter((searchedEpisodes) => {
      return (
        searchedEpisodes.name.toLowerCase().includes(keyValues) ||
        searchedEpisodes.summary.toLowerCase().includes(keyValues)
      );
    });
    makePageForEpisodes(episodeFilter);
  };
}

// //LEVEL 300 START//
function episodeSelector(episodeList) {
  const episodSelect = document.getElementById("episodes-selector");
  episodSelect.innerHTML = "";
  for (let episode of episodeList) {
    const episodeOption = document.createElement("option");
    episodeOption.innerText = `S${String(episode.season).padStart(
      2,
      "0"
    )}E${String(episode.number).padStart(2, "0")} ${episode.name}`;
    episodSelect.appendChild(episodeOption);
  }
  //adding event listener//
  episodSelect.addEventListener("change", (event) => {
    const keyValues = event.target.value;
    const myTitle = keyValues.slice(7);
    rootElem.innerHTML = "";

    //START LEVEL 350//
    //CREATE AN ALL EPISODE OPTION THAT RETURNS ALL EPISODES TO THE SCREEN.//
    if (keyValues === "Show All Episodes") {
      makePageForEpisodes(episodeList);
    } else {
      const episodeFilter = episodeList.filter((searchedEpisodes) => {
        return searchedEpisodes.name.includes(myTitle);
      });
      makePageForEpisodes(episodeFilter);
    }
  });
}
//START LEVEL 400
function selectShows(displayAllShows) {
  displayAllShows.sort((a, b) => (a.name > b.name ? 1 : -1));
  const allShows = document.getElementById("show-selector");
  displayAllShows.forEach((element) => {
    const eachShow = document.createElement("option");
    allShows.appendChild(eachShow);
    eachShow.innerText = element.name;
    eachShow.value = element.id;
    // console.log(eachShow);
  });
  //EVENT LISTENER//
  allShows.addEventListener("change", async (event) => {
    const optionValues = Number(event.target.value);
    const linkToUrlFunction = EpisodesFromURLid(optionValues);
    // console.log(linkToUrlFunction);
    try {
      const result = await fetch(linkToUrlFunction);
      const fetchedData = await result.json();
      makePageForEpisodes(fetchedData);
      episodeSelector(fetchedData);
      searchItem(fetchedData);
    } catch (error) {
      console.log(error);
    }
  });
}

function EpisodesFromURLid(id) {
  return `https://api.tvmaze.com/shows/${id}/episodes`;
}

window.onload = tvShowFetch();

// Create a div and append all:label, select, input, button
// let headingTags = document.getElementsByClassName("headers");

// async function setup() {
//   // for (let { id: idNum } of allShows) {
//   try {
//     const response = await fetch(`https://api.tvmaze.com/shows/82/episodes`);
//     const objectResponse = await response.json();
//     selectShow(allShows);
//     displayEpisodes(objectResponse);
//     search(objectResponse);
//     select(objectResponse);
//   } catch (error) {
//     console.log(error);
//   }
//   // }
// }

// function setup() {
//   makePageForEpisodes(allEpisodes);
//   episodeSelector(allEpisodes);
//   searchItem();
// }
