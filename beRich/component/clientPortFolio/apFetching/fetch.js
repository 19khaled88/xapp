const baseUrl = `https://api.ctgshop.com/xapi/`
// const baseUrl = `https://www.condomshopbd.com/xapi/`
const name = sessionStorage.getItem('name')
const cid = 19
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
// =============== Execute Loader ===============//
async function executeLoader(mainFunction){
    async function showLoader(){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('loader').style.display = 'block'

    }
    async function hideLoader(){
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('loader').style.display = 'none'
    }

    await showLoader()
    await mainFunction()
    await hideLoader()
}

// ================ All API ===================/
async function getClientPortfolio(invid){
    const url = `${baseUrl}japi.ashx?type=get_inv_bal&inv_id=${invid}&comp_id=${cid}&exch=CSE/DSE`
    return await fetchDataByUrl(url)
}
async function getInvDetails(invid){
    const url = `${baseUrl}Kapi1.ashx?type=get_inv_profile&comp_id=${cid}&inv_id=${invid}`
    return await fetchDataByUrl(url)
}
async function get_inv_pm_wise(inv_name){
    const url = `${baseUrl}kapi1.ashx?type=get_inv_pm_wise&pm=${encodeURIComponent(inv_name)}&cid=${cid}`
    return await fetchDataByUrl(url)
}