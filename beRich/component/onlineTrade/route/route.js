const historyStack = [];
let otpCountDownInterval;
let intervalClosere
let tradeTimeIntervalId;
let currentSection = null;
let page_name = null;
let selectedScript =  null;
let storedTrade
const urlParams = new URLSearchParams(window.location.search);
document.addEventListener('DOMContentLoaded', function () {
    currentSection = localStorage.getItem('currentSection');
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    // closeSupportTeam();
    // closeSendMessage();
    // closeVideoChat();
    // if(currentSection === null){
    //     route('../component/homeComponent.js', '../css/homeComponent.css', 'home');
    // }else{
    //     if(currentSection === 'moneyDeposit'){
    //         removeFooterBtnState();
    //     }
    //     route(`../component/${currentSection}Component.js`, `../css/${currentSection}Component.css`, `${currentSection}`);
    //     if( localStorage.getItem('currentSection')){
    //         localStorage.removeItem('currentSection')
    //     }
    // }
    route('./component/tradeComponent.js', './css/tradeComponent.css', 'trade');
  });
  
  
  
  async function route(js, css, case_name, data) {
    
    if(case_name && case_name === 'trade'){
        if(selectedScript !== null){
            data = selectedScript
        }
    }
    async function executeRoute(data){
        if (currentSection !== null) {
           await clearMemory();
        }
        
        try{
            const styleElement = document.createElement('link');
            styleElement.id = `style-${case_name}`;
            styleElement.rel = 'stylesheet';
            styleElement.href = css;
            document.head.appendChild(styleElement);
            
            const response = await fetch(js);
            if (!response.ok) {
                throw new Error(`Error loading ${case_name}.js`);
            }
            const scriptCode = await response.text();
    
            const scriptElement = document.createElement('script');
            scriptElement.id = case_name;
            scriptElement.textContent = scriptCode;
            document.head.appendChild(scriptElement);
    
            const prev_case = historyStack[historyStack.length - 1];
            if (!prev_case || prev_case.case_name !== case_name) {
                historyStack.push({ case_name });
            }
    
            currentSection = case_name;
    
            const newUrl = window.location.origin + window.location.pathname + `#${case_name}`;
            history.pushState({ case_name : case_name }, null, newUrl);
            
            if(case_name !== 'moneyWithdrawal' && otpCountDownInterval !== undefined){
                clearInterval(otpCountDownInterval)
            }
            if(case_name !== 'openBoForm' && intervalClosere !== undefined){
                clearInterval(intervalClosere)
            }
            // if (case_name !== 'trade' && tradeTimeIntervalId !== undefined) {
            //     clearInterval(tradeTimeIntervalId);
                
            // }
            if(case_name && typeof case_name === 'string' && case_name.startsWith('TP_')){
                selectedScript = data;
            }
            if(case_name && typeof case_name === 'string' && case_name === 'companyInfo' && data){
                // console.log(data)
                selectedScript = data;
            }
            
            if(case_name !== 'trade' && !case_name.startsWith('TP_')){
                sessionStorage.removeItem('userData');
            }
            if(case_name){
                // const log = await saveLog(user.LoggedInInvestorId, case_name);
                // console.log(log,'===========', case_name, user.LoggedInInvestorId)
            }

            await isVerifiedCacse(case_name, data);
            scrollToTop()
            
            
        } catch (error) {
            console.error(error);
            // if(error){
            //     console.log('dfdjfjdj')
            //     await displayFlex()
            // }
            return error
            
        }
    }
    async function displayNone(){
        document.getElementById('loadingApi').style.display = 'block'
        document.getElementById('mainContentSection').innerHTML = ''
    }
    async function displayFlex(){
        document.getElementById('mainContentSection').style.display = 'flex'
        document.getElementById('mainContentSection').style.flexDirection = 'column'
    }

    await displayNone() 
    await executeRoute(data)
    await displayFlex()
}

async function clearMemory() {
    async function clearScript(){
        const script = document.head.getElementsByTagName('script');
        const scriptTagsArray = Array.from(script);
        scriptTagsArray.forEach( (scriptTag) => {
            if (scriptTag.id !== 'boots' && scriptTag.id !== 'routes' && scriptTag.id !== 'fetch' && scriptTag.id !== 'main' && scriptTag.id !== 'tradeGraph' && scriptTag.id !== 'ticker' && scriptTag.id !== 'jQuery' && scriptTag.id !== 'jQueryUi' && scriptTag.id !== 'pdfJs1' && scriptTag.id !== 'pdfJs2') {
                scriptTag.parentNode.removeChild(scriptTag);
            }
        });
    }
    async function clearStyle(){
        const styleSheet = document.head.getElementsByTagName('link');
        const styleTagsArray = Array.from(styleSheet);
        styleTagsArray.forEach(style => {
          if (style.id !== 'boots' && style.id !== 'main-page' && style.id !== 'jQueryStyle'  && style.id !== 'pdfStyle') {
            style.parentNode.removeChild(style);
          }
        });
    }  
    clearScript()
    clearStyle()  
}

function goBack() {
    document.getElementById('overlay').style.display = 'none'
    if (historyStack.length > 1) {
        historyStack.pop(); 
        const prevState = historyStack.pop(); 
        const case_name = prevState.case_name;
        if(case_name && case_name === 'trade' && selectedScript !== null){
            route(`../component/${case_name}Component.js`, `../css/${case_name}Component.css`, case_name, selectedScript);
        }else{
            if(!case_name.startsWith('TP_')){
                route(`../component/${case_name}Component.js`, `../css/${case_name}Component.css`, case_name);
            }
        }
        if(case_name && typeof case_name === 'string' && case_name.startsWith('TP_')){
            
            route(`../component/tradeComponent.js`, `../css/tradeComponent.css`, 'trade', selectedScript);
            updateFooterBtnState('trade');
        }else{
            updateFooterBtnState(case_name);
        }
    }
}

function scrollToTop() {
    mainContentSection.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('popstate', function (event) {
        if (event.state) {
            goBack();
        }
    });
});


page_name = urlParams.get('case');
if(page_name ==='moneyDeposit'){
    route(`../component/${page_name}Component.js`, `../css/${page_name}Component.css`, `${page_name}`);
    page_name = null
}

async function isVerifiedCacse(case_name, data){
    switch (case_name) {
       
        
        case 'trade':
            storedTrade = await executeTrade(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_companyInfo':
            await executeTP_CompanyInfo(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_news':
            await executeTP_News(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_todayTrade':
            await executeTP_todayTrade(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_lastTrade':
            await executeTP_lastTrade(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_marketMover':
            await executeTP_marketMover();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_dividend':
            await executeTP_dividend(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        
        case 'TP_stockStatus':
            await executeTP_StockStatus();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_rateHistory':
            await executeTP_rateHistory(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_halted':
            await executeTP_halted();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        
    }
}