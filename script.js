const vedioCardContainer = document.querySelector('.vedio-container');

let api_key = "AIzaSyAtrBK-iWqX2oQe9EPAl_-i4MPKNPewO9M";
let vedio_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(vedio_http + new URLSearchParams({
    key : api_key,
    part :'snippet',
    chart : 'mostPopular',
    maxResults : 75,
    regionCode : 'IN'
}))

.then(res => res.json())
.then(data => {
   console.log(data);
      data.items.forEach(item => {
        getChannelIcon(item);
      })
})
.catch(err => console.log(err));

const getChannelIcon = (vedio_data) => {
      fetch(channel_http + new URLSearchParams({
        key : api_key,
        part :'snippet',
        id : vedio_data.snippet.channelId
      }))
      .then(res => res.json())
      .then(data => {
        console.log(data);
        vedio_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVedioCard(vedio_data);
      })
}

const makeVedioCard = (data) => {
    vedioCardContainer.innerHTML += `
    <div class="vedio" onclick ="location.href = 'https://youtube.com/watch?v=${data.id}'">
         <img src="${data.snippet.thumbnails.high.url}" heigth = 300px width = 300px class="thumbnail" alt="channel thumbnail">
           <div class="content">
              <img src="${data.channelThumbnail}" class="channel-icon" alt="channel icon">
                  <div class="info">
                     <h4 class="title">${data.snippet.title}</h4>
                     <p class="channel-name">${data.snippet.channelTitle}</p>
                  </div> 
                 </div>
                </div>
                `;
            }

  const searchInput = document.querySelector('.search-bar');
  const searchBtn = document.querySelector('.search-btn');
  let searchLink ="https://www.youtube.com/results?search_query=";    
  
  searchBtn.addEventListener('click' , () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
  })