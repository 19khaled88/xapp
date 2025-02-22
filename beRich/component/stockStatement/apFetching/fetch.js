// const baseUrl = 'https://www.condomshopbd.com/xapi/'
const baseUrl = 'https://api.ctgshop.com/xapi/'
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

// ================ All API ===================/
async function get_inv_pm_wise(inv_name){
    const url = `${baseUrl}kapi1.ashx?type=get_inv_pm_wise&pm=${encodeURIComponent(inv_name)}&cid=${cid}`
    return await fetchDataByUrl(url)
}
async function get_stk_inv(inv_id){
    const url = `${baseUrl}kapi.ashx?type=get_stk_inv&inv_id=${inv_id}`
    return await fetchDataByUrl(url)
}
async function getCompanyList(){
    const url =  `${baseUrl}japi.ashx?type=get_CompanyList&comp_id=${cid}`
    return await fetchDataByUrl(url)
}
async function get_scripwise_list(name, script, date){
    // console.log(name, script, date)
    const url =  `${baseUrl}Sapi.ashx?type=get_scripwise_list&portmanname=${name}&scripname=${script}&sd=${date}`
    return await fetchDataByUrl(url)
}