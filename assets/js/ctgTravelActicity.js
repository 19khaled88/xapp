

const rootUrl = 'https://api.ctgshop.com';

// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
let page_title = urlParams.get("pageTitle")
const identity = urlParams.get("identity");
const emName = urlParams.get("name");
const bossId = urlParams.get("bossId");
const bossName = urlParams.get("bossName");
const imei = urlParams.get('imei');

document.addEventListener('DOMContentLoaded',()=>{
    

    // Remove double quotes from page_title if present
    if (page_title) {
        page_title = page_title.replace(/"/g, ""); // Removes all double quotes
    }

    // change page title
    document.getElementById('title').textContent = page_title
    
    if(page_title){

        switch(page_title){
            case "Befresh Client's Balance":
                clientBalance();
                break;
            case "Befresh Client's Dues":
                clientDues();
                break;
            case "Befresh Money Receipt":
                moneyReceipt();
                break;
            case "Befresh Activity Report":
                report();
                break;
            case "Befresh Passenger List":
                passengerList();
                break;
            case "Befresh Business Performance":
                businessPerformance();
                break;
            default:
                // window.location.href =``

        }
    }

    const back_button_handle = document.getElementById('bf_btn')
    back_button_handle && back_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/pages/CtgTravel.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}&imei=${imei}`
    });


    const back_home_button_handle = document.getElementById('bf_home_btn');
    back_home_button_handle && back_home_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/index.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}`
    })

});