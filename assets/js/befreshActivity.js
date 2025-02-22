

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
                break;
            case "Befresh Client's Dues":
                clientDues();
                break;
            case "Befresh Money Receipt":
                moneyReceipt();
                break;
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

    main.innerHTML = '';
    const html =`
            <p class="main_title" id="main_title">Client Balance</p>
            <div class="input_fields" id="input_fields">
                <input id="client_mobile" type="tel"  placeholder="ID/Mobile Number" pattern="[0-9]{10,15}" maxlength="15" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
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

function clientDues(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
            <p class="main_title" id="main_title">Client Dues</p>
            
            <div class="date_range_dues" id="date_range_dues">
                <div class="date" id="date">
                </div>
                <button>OK</button>
            </div>
            <h4 class="current_date" id="current_date" style="color:#3689e1fa"></h4>
            
            <div class="client_info" id="client_info">
                <span class="table_title" id="table_title">
                    <p>S/N</p>
                    <p>CusID</p>
                    <p>Name</p>
                    <p>AmountDue</p>
                </span>
                <div class="content" id="content"></div>
            </div>
            <div class="total_amount" id="total_amount">
                <label>Total</label>
                <p>0</p>
            </div>
        
    `
    main.insertAdjacentHTML("beforeend",html)

    const startDatePickerInput = handleDateAndTime('fromDate');

    document.getElementById('date').appendChild(startDatePickerInput.elementName);

    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0'); // Ensure two digits
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()]; // Get three-letter month name
    const year = now.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    document.getElementById('current_date').innerHTML = `As On: ${formattedDate}`

    document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`
}

function moneyReceipt(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
        <div class="nav_button" id="nav_button">
            <button class="entry" id="entry">MONEY RECEIPT ENTRY</button>
            <button class="view" id="view">MONEY RECEIPT VIEW</button>
        </div>
        <div class="content" id="content"></div>
    `
    main.insertAdjacentHTML("beforeend",html);


    const buttons =  document.getElementById('nav_button').querySelectorAll('button')
    if(buttons){
        buttons.forEach((button,index)=>{
            button.addEventListener('click',()=>{
                
                manageMoneyReceipt(button.id,buttons)
            })
        })
    }


    manageMoneyReceipt('entry',buttons)

}

function manageMoneyReceipt(tag,buttons = null){
    buttons !== null ?  buttons.forEach((button,index)=>{
        button.style.cssText = `
            color:black;
            border-bottom:none;
        `
        if(button.id === tag){
            button.style.cssText = `
                color:#ed0f35;
                font-weight:bold;
                border-bottom: 2px solid #ed0f35;
            `

        }

        if(button.id === tag && button.id === 'entry'){
            const content = document.getElementById('content')
            content.innerHTML = "";

            const html = `
                <div class="client_id_mobile" id="client_id_mobile">
                    <input class="id_mobile" id="id_mobile" type="tel"  placeholder="Clients ID/Mobile Number" pattern="[0-9]{10,15}" maxlength="15" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                    <button>FIND</button>
                </div>
                <div class="client_name" id="client_name">
                    <label>Clients Name</label>
                    <input class="name" id="name" disabled/>
                </div>
                <div class="client_number" id="client_number">
                    <label>Clients Number</label>
                    <input class="number" id="number" disabled/>
                </div>
                <div class="mr_amount" id="mr_amount">
                    <label>MR Amount</label>
                    <input class="amount" id="amount" type="number"/>
                    <p>BDT</p>
                </div>
                <div class="pay_mode" id="pay_mode">
                    <label>Pay Mode</label>
                    <span>
                        <input type="radio" id="cash" name="mode" value="cash">
                        <label for="cash">CASH</label>

                        <input type="radio" id="cheque" name="mode" value="cheque">
                        <label for="cheque">CHEQUE</label>

                        <input type="radio" id="bank_deposit" name="mode" value="bank_deposit">
                        <label for="bank_deposit">Bank Deposit</label>
                    </span>
                </div>
                <div class="location" id="location">
                    <label>MR Location</label>
                    <select>
                        <option>Select Location</option>
                        <option>Sylhet Office - Sylhet</option>
                        <option>Studio Office - Chittagong</option>
                        <option>Singapore Office - Singapore</option>
                    </select>
                </div>
                <div class="service" id="service">
                    <label>Services</label>
                    <select>
                        <option>Select</option>
                        <option>Ticketing</option>
                        <option>Ticketing - Hajj</option>
                        <option>Ticketing - Umrah</option>
                    </select>
                </div>
                <button type="submit" id="submit">SUBMIT</button>
            `
            content.insertAdjacentHTML("beforeend",html);


            document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`
        }else if(button.id === tag && button.id === 'view'){
            const content = document.getElementById('content')
            content.innerHTML = "";

            const html = `
            
            `
        }
    }) : "";


  
}