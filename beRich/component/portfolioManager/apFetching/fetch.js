const baseUrl = 'https://api.ctgshop.com/xapi/'
// const baseUrl = 'https://www.condomshopbd.com/xapi/'
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
async function getAllTrade_portfolioManagerWise(dateFrom, dateTo, exch, typ){
    const url = `${baseUrl}emp_com.ashx?cmd=brpmwtrd1&dt1=${dateFrom}&dt2=${dateTo}&name=${encodeURIComponent(name)}&exch=${exch}&typ=${typ}`
    return await fetchDataByUrl(url)
}
async function getAllInvestors_portfolioManagerWiseView(){
    const url = `${baseUrl}emp_com.ashx?cmd=brpmwviw1&name=${encodeURIComponent(name)}`
    return await fetchDataByUrl(url)
}