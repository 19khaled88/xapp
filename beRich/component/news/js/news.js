let fetchNews
async function fetchData(){
    async function showLoader(){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('loader').style.display = 'block'

    }
    async function hideLoader(){
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('loader').style.display = 'none'
    }
    async function execute(){
        fetchNews = await getNews()
        // console.log(fetchNews)
    }

    await showLoader()
    await execute()
    await hideLoader()
}

async function executePaperNews(){
    const mediaNews = fetchNews.mediaNews
    // console.log(mediaNews)
    if(mediaNews.status === true){
        let meadiaNewsDiv = document.getElementById('paperNewsContent');
        meadiaNewsDiv.innerHTML=''
        mediaNews.Data.forEach(function (newsItem) {
            const newsElement = document.createElement('div');
            newsElement.classList.add('news-item');
    
            newsElement.innerHTML = `
                <div class="newsImage">
                    <img src="${newsItem.NewsImage}" alt='NewsImage'}>
                </div>
                <div class="newsContent">
                    <div class="date-source">
                        <div class="date">${newsItem.NewsDate}</div>
                        <div class="source">${newsItem.NewsSource}</div>
                    </div>
                    <div class="headline"><h4>${newsItem.Head}</h4></div>
                    <button class="btn btn-primary btn-details">Details</button>
                </div>
            `;
            meadiaNewsDiv.appendChild(newsElement);
            newsElement.addEventListener('click', showNewsDetails(newsItem))
        }); 
    }else{

    }
}

function executeExchangeNews() {
    const exchangeNews = fetchNews.exchangeNews
    // console.log(mediaNews)
    let exchangeNewsDiv = document.getElementById('exchangeNewsContent');

    exchangeNews.TodaysNews.forEach(function (newsItem) {
        var newsElement = document.createElement('div');
        newsElement.classList.add('exchange-news-item');

        newsElement.innerHTML = `
            <div class="exchangeHeading">
                <h4>${newsItem.Head}</h4>
            </div>
            <div style='padding: 5px;' >
                <p>News Date: ${newsItem.NewsDate}</p>
            </div>
            
            <div class="exchangeContent"><p>${newsItem.News}</p></div>
           
        `;

        exchangeNewsDiv.appendChild(newsElement);

    });
}

function showNewsDetails(newsItem){
    // console.log(newsItem)
    return function(event){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('showMediaNewsDetails').style.display = 'flex'
        document.getElementById('showMediaNewsDetails').innerHTML = `
            
            <div class='selectedNewsBody' id='selectedNewsBody'>
                <div style='flex: 0 auto;' class="heading">
                    <h1>News Details</h1>
                </div>
                <div style='flex: 1 auto;height: 100%;overflow-y: auto;' class='container'>
                    <div style="margin-top: 10px;" class='imgBox'>
                        <img style='width: 100%; height: auto;' src=${newsItem.NewsImage} alt='news details picture'>
                    </div>
                    <div class='newsSourceDate'>
                        <p>Date: ${customDateConverter(newsItem.NewsDate, 'defaultToCustom')}</p>
                        <p>Source: ${newsItem.NewsSource}</p>
                    </div>
                    <div style="margin: 10px 0px;" class='selectedNewsHeading'>
                        <h3 style="text-align: center; margin: 10px 0px; font-weight: 600;font-size: 16px;"> ${newsItem.Head} </h3>
                    </div>
                    <div class='selectedNewsBodyDetails'>
                        <p style='text-align: justify;font-size:14px'>${newsItem.News}</p>
                    </div>
                </div>
                <div id='closeNewsDetails'>
                    <p>CLOSE</p>
                </div>
            </div>
        `
        document.getElementById('closeNewsDetails').addEventListener('click', ()=>{
            document.getElementById('showMediaNewsDetails').style.display = 'none'
            document.getElementById('overlay').style.display = 'none'
        })
        document.getElementById('overlay').addEventListener('click', ()=>{
            document.getElementById('showMediaNewsDetails').style.display = 'none'
            document.getElementById('overlay').style.display = 'none'
        })
    }
}

function handleBtn(btnID){
    switch (btnID) {  
        case "paperNews":
            document.getElementById('paperNews').style.borderBottom = '2px solid #ff0000'
            document.getElementById('paperNews').style.color = '#ff0000'
            document.getElementById('exchangeNews').style.borderBottom = 'none'
            document.getElementById('exchangeNews').style.color = '#000'
            document.getElementById('paperNewsContent').style.display = 'flex'
            document.getElementById('exchangeNewsContent').style.display = 'none'
            detailsBody.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            break;
        case "exchangeNews":
            document.getElementById('exchangeNews').style.borderBottom = '2px solid #ff0000'
            document.getElementById('exchangeNews').style.color = '#ff0000'
            document.getElementById('paperNews').style.borderBottom = 'none'
            document.getElementById('paperNews').style.color = '#000'

            document.getElementById('paperNewsContent').style.display = 'none'
            document.getElementById('exchangeNewsContent').style.display = 'flex'
            
            detailsBody.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            break;
    
        default:
            break;
    }
}


