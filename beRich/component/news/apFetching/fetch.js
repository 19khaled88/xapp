const baseUrl = 'https://api.ctgshop.com/xapi/'
// const baseUrl = 'https://www.condomshopbd.com/xapi/'
const cid = 19
const name = sessionStorage.getItem('name')
// console.log(name)
function customDateConverter(data, direction){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateString = data;
    if(direction === 'defaultToCustom'){
        const datePart = dateString.split(' ')[0];
        const dateObj = new Date(datePart);
        let day = dateObj.getDate();
        day = day < 10 ? '0'+day : day
        
        const monthIndex = dateObj.getMonth();
        const year = dateObj.getFullYear();

        const formattedDate = day + '/' + monthNames[monthIndex] + '/' + year;
        return formattedDate
    }
    
}
async function fetchDataByUrl(url){
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        
        if (!response.ok) {
            const error = new Error(`HTTP error! Status: ${response.status}`);
            // console.log(error)
            let apiError = {}
            apiError.status = false
            apiError.message = `Error With Status Code: ${response.status}`
            throw apiError;
        }
        
        const text = await response.text();
        const sanitizedText = text.replace(/\r?\n/g, '').replace(/[\u000A\u000D]/g, '');
        const data = JSON.parse(sanitizedText);
        return data;
        
    } catch (error) {
        console.error(error);
        // let fetchedError = error
        // console.log(fetchedError)
        // console.log(fetchedError.response.status)
        // let apiError = {}
        // apiError.status = error.status
        // console.log(apiError)
        return error
    }
}

// ================ All API ===================/
async function getNews(){
    const exchangeNewsUrl = `${baseUrl}japi.ashx?comp_id=${cid}&type=get_TodaysNews`
    const mediaNewsUrl = `${baseUrl}japi.ashx?type=get_PaperNews&comp_id=${cid}`
    const exchangeNews = await fetchDataByUrl(exchangeNewsUrl)
    const mediaNews = await fetchDataByUrl(mediaNewsUrl)
    return{ exchangeNews, mediaNews}
}