

document.addEventListener('DOMContentLoaded',()=>{
    // Parse the query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Get the value of the parameter you want to use in the title
    let page_title = urlParams.get("pageTitle")
    const identity = urlParams.get("identity");
    const emName = urlParams.get("name");
    const bossId = urlParams.get("boss");
    const bossName = urlParams.get("bossName");

    
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
                
            case "Befresh Client's Dues":
            
            case "Befresh Money Receipt":

            case "Befresh Activity Report":

            case "Befresh Passenger List":

            case "Befresh Business Performance":

            default:
                // window.location.href =``

        }
    }
});


function clientBalance(){
    const main = document.getElementById('main');

    const html =`
            <p class="main_title" id="main_title">Client Balance</p>
            <div class="input_fields" id="input_fields">
                <input id="client_mobile"  placeholder="ID/Mobile Number"/>
                <div class="date_range" id="date_range">
                    <div class="date" id="date">
                    </div>
                    <button>OK</button>
                </div>
            </div>
            <div class="balance" id="balance">
                <span>
                    <label>Opening Balance</label>
                    <p></p>
                </span>
                <span>
                <label>Closing Balance</label>
                <p></p>
            </span>
            </div>
            
        
    `
    main.insertAdjacentHTML("beforeend",html)


    const startDatePickerInput = handleDateAndTime('fromDate');
    const endDatePickerInput = handleDateAndTime('toDate');

    

    document.getElementById('date').appendChild(startDatePickerInput.elementName)
    document.getElementById('date').appendChild(endDatePickerInput.elementName)
   

    
    document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`

}