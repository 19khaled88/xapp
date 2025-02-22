
const c_Id = 25;
// const baseUrl = 'http://119.18.148.10/01api/'
const baseUrl = 'https://api.ctgshop.com/01apitestios/'
// const baseUrl = 'https://www.condomshopbd.com/01apitestios/'

let isAndriod;
const device = sessionStorage.getItem("osType");
isAndriod = device === 'android' ? true : false

 
// =================Get User Ip==================//
async function getUserIP(){
    const response = await fetch('https://api.ipify.org?format=json');
    userIp = await response.json();
    return userIp
}
// ===================Encription ====================//
async function encrypt(clearText) {
    const encryptionKey = 'MAKV2SPBNI99212';
    const salt = new Uint8Array([0x49, 0x76, 0x61, 0x6E, 0x20, 0x4D, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76]);

    // Derive key
    const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(encryptionKey),
        { name: 'PBKDF2' },
        false,
        ['deriveKey', 'deriveBits']
    );

    const key = await window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 1000,
            hash: 'SHA-1'
        },
        keyMaterial,
        { name: 'AES-CBC', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );

    // Derive IV (Initialization Vector)
    const iv = new Uint8Array(await window.crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 1000,
            hash: 'SHA-1'
        },
        keyMaterial,
        128
    ));

    // Encrypt
    const encryptedContent = await window.crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: iv },
        key,
        new TextEncoder().encode(clearText)
    );

    return btoa(String.fromCharCode(...new Uint8Array(encryptedContent)));
}
// =================Date Converter==================//
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

// ================= show Api Error ==============//
function showApiError(message1, message2){
    const div = document.getElementById('popUpLogoutDiv')
    if(div){
        document.getElementById('popUpLogoutDiv').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('overlay').style.zIndex = '1050';
        document.getElementById('popUpLogoutDiv').innerHTML = `
            <h5>Alert</h5>
            <p>${message1} <br>${message2}</p>
            <div id='popUpOk'>
                <p>OK</p>
            </div>
        `
        document.getElementById('popUpOk').addEventListener('click', ()=>{
            document.getElementById('popUpLogoutDiv').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            route('../component/homeComponent.js', '../css/homeComponent.css', 'home')
        })
    }
}
// =================Login API==================//
async function investorLogin(investorId, investorPassword) {
    const url = `${baseUrl}kapi1.ashx?type=InvestorLoginV1&investorid=${investorId}&investorpassword=${investorPassword}`;
    await fetch(url, {
        method: 'GET'
    })
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
}
// =================Get Data With URL and Form Data==================//
async function fetchDataByUrlAndFormData(url,formData){
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
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
        const sanitizedText = text.replace(/\r?\n/g, '');
        const data = JSON.parse(sanitizedText);
        return data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
}
// =================Get Data With Mwthod, URL, Body and Header==================//
async function fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData, timeout = 60000){
    const controller = new AbortController();
    const signal = controller.signal;
    
    // Set a timeout to abort the request
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: bodyData,
            signal: signal,
        });
        
        // console.log(response)
        if (!response.ok) {
            const error = new Error(`HTTP error! Status: ${response.status}`);
            // console.log(error)
            let apiError = {}
            apiError.status = false
            apiError.message = `Error With Status Code: ${response.status}`
            throw apiError;
        }
        
        const text = await response.text();
        const sanitizedText = text.replace(/\r?\n/g, '');
        const data = JSON.parse(sanitizedText);
        // console.log(data)
        return data;
        
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Error: Request timed out');
            showApiError('Request timed out', 'Please Try Again')
            return { status: false, message: 'Request timed out' };
        } else {
            console.error('Error fetching data:', error);
            return error;
        }
    } finally {
        clearTimeout(timeoutId);
    }
}
// =================Get Data With URL==================//
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
// =================Save Log==================//
async function saveLog(inv_Id, pageName){
    const userIp = await getUserIP()
    const deviceType = isAndriod === true ? 1 : 0
    const url = `${baseUrl}japi.ashx?type=post_SaveLog&comp_id=${c_Id}&isMobile=True&isAndroid=${deviceType}&pageName=${pageName}&desc=New App: ${userIp.ip}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
// =================Get Before Company Data==================//
async function getCmsHome (){
    const url = `${baseUrl}Kapi1.ashx?type=get_cms_home&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
//==================All Api===============//
async function getRecoverPass(id, phone){
    const userIp = await getUserIP()
    const url = `${baseUrl}japi.ashx?type=post_PassRecovery&comp_id=${c_Id}&inv_id=${id}&inv_phn=${phone}&ip_addr=${userIp.ip}`
    return await fetchDataByUrl(url)
}

async function getNews(){
    const exchangeNewsUrl = `${baseUrl}japi.ashx?comp_id=${c_Id}&type=get_TodaysNews`
    const mediaNewsUrl = `${baseUrl}japi.ashx?type=get_PaperNews&comp_id=${c_Id}`
    const exchangeNews = await fetchDataByUrl(exchangeNewsUrl)
    const mediaNews = await fetchDataByUrl(mediaNewsUrl)
    return{ exchangeNews, mediaNews}
}
async function getSelectedCompanyNews(selectedCompany){
    const mediaNewsUrl = `${baseUrl}japi.ashx?type=get_PaperNews&ins_id=${selectedCompany}&comp_id=${c_Id}`
    const mediaNews = await fetchDataByUrl(mediaNewsUrl)
    return mediaNews
}
async function getDashBoardData(inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_inv_bal&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getUserDetailsData(inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_inv_profile&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getAllExecuteTrades(dateFrom, dateTo, inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_trade_report&inv_id=${inv_Id}&comp_id=${c_Id}&sd=${dateFrom}&ed=${dateTo}`
    return await fetchDataByUrl(url)
}











async function getCompanyList(){
    const url = `${baseUrl}japi.ashx?type=get_CompanyList&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getCompanyInfo(companyName){
    const url = `${baseUrl}japi.ashx?type=get_Company_info&ins_id=${companyName}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}

















async function getInvInfo (inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_inv_info&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}



































async function Post_LOGIN_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?`
    const method = 'POST'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_TICKPRICE_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_TICKPRICE_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_THOUR_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_THOUR_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_SCRIPNEWS_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_SCRIPNEWS_&scrip=${data}`
    return await fetchDataByUrl(url)
}
async function get_HALTED_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_HALTED_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_SCRIPDIV_(script,data){
    const url = `https://berichbd.com/matrix/matrix.aspx?scrip=${script}&CMND=_SCRIPDIV_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_OFFER_(script,data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_OFFER_&scrip=${script}`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_OFFERD_(script,data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_OFFERD_&scrip=${script}`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_SCRIPINFO_(script,data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_SCRIPINFO_&scrip=${script}`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_CLIENTDET_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_CLIENTDET_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_TOPLIST_(data){
    const url = `https://www.berichbd.com/matrix/matrix.aspx?CMND=_TOPLIST_&exch=CSE/DSE`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_TICKER_CSE(data){
    const url = `https://www.berichbd.com/matrix/matrix.aspx?CMND=_TICKER_&exch=CSE`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_TICKER_DSE(data){
    const url = `https://www.berichbd.com/matrix/matrix.aspx?CMND=_TICKER_&exch=CSE`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function Post_BUYSELL_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx`
    const method = 'POST'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function postOrder_CANCEL_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx`
    const method = 'POST'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function Post_MODIFY_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx`
    const method = 'POST'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}