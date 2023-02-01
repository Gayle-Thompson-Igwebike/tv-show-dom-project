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

}


window.onload = setup;


  const footer = document.createElement("footer");
  const footerText = document.createTextNode("The data has (originally) come from TVMaze.com  https://www.tvmaze.com/shows/82/game-of-thrones");
  
  footer.appendChild(footerText);
  document.body.appendChild(footerText);







