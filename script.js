//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

for(const episode of episodeList){
  const episodeName = episode.name;
  const episodeNameDiv = document.createElement("div");
  episodeNameDiv.textContent = episodeName;
  rootElem.appendChild(episodeNameDiv);

  const episodeSeason = episode.season;

  const episodeNumber = episode.number;
  

  const codeDiv = document.createElement("div");
 
if (episodeNumber < 10) {
  codeDiv.textContent = `S0${episodeSeason}E0${episodeNumber}`;
  rootElem.appendChild(codeDiv);
} else if (episodeNumber >= 10) {
  codeDiv.textContent = `S0${episodeSeason}E${episodeNumber}`;
  rootElem.appendChild(codeDiv);
}

  const episodeMediumImage = episode.image.medium;
  const episodeMediumImageDiv = document.createElement("img");
  episodeMediumImageDiv.src = episodeMediumImage;
  rootElem.appendChild(episodeMediumImageDiv);

  const episodeSummaryText = episode.summary;
  const episodeSummaryDiv = document.createElement("div");
  episodeSummaryDiv.innerHTML = episodeSummaryText;
  rootElem.appendChild(episodeSummaryDiv);
}
 const bodyElement = document.getElementsByTagName("body");
 const footerElement = document.createElement("footer");
 const pElement  = document.createElement("P")
 pElement.textContent = "The data has (originally) come from TVMaze.com";
 footerElement.appendChild(pElement);
 bodyElement.appendChild(footerElement);
}


window.onload = setup;





//   const codeDiv = document.createElement("div");
//   codeDiv.textContent = `S0${episodeSeasonNumber}E0${episodeNumber}`;
//   rootElem.appendChild(codeDiv);

// You should combine season number and episode number into an episode code:
// Each part should be zero-padded to two digits.
// Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be incorrect.