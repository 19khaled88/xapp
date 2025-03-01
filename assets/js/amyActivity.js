

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
            case "Client Ledger":
                clientLedger();
                break;
            case "Client Balance":
                clientBalance();
                break;
            case "Amy Money Receipt":
                amyMoneyReciept();
                break;
            case "Amy Activity Report":
                amyReport();
                break;
            case "Business Performance":
                businessPerformance();
                break;
            case "Client Visit":
                clientVisit();
                break;
            case "Client Visit Track":
                visitTrack();
                break;
            default:
                // window.location.href =``

        }
    }


    const back_button_handle = document.getElementById('bf_btn');
    back_button_handle && back_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/pages/Amy.html?identity=${identity}&name=${emName}&boss=${bossId}&bossName=${bossName}`
    });
});

function clientLedger(){
    const main = document.getElementById('amy_main');

    main.innerHTML = '';
    const html =`
        <div class="date_range" id="date_range">
        </div>
        <div class="search" id="search">
            <input id="client_mobile" type="tel"  placeholder="ENTER ID/Number" pattern="[0-9]{10,15}" maxlength="15" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
            <button>SEARCH</button>
        </div>
                
    `
    main.insertAdjacentHTML("beforeend",html)


    const startDatePickerInput = handleDateAndTime('fromDate');
    const endDatePickerInput = handleDateAndTime('toDate');

    

    document.getElementById('date_range').appendChild(startDatePickerInput.elementName)
    document.getElementById('date_range').appendChild(endDatePickerInput.elementName)
   

    
    document.getElementById('amy_main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`
}

function clientBalance(){
    const main = document.getElementById('amy_main');

    main.innerHTML = '';
    const html =`
        <div class="balance_date_range" id="balance_date_range">
          <div class="date" id="date"></div>
          <button>OK</button>
        </div>
        <span class="current_date" id="current_date">As On : </span>
        <div class="balance" id="balance">
            <span class="balance_label" id="balance_label">
                <label>S/N</label>
                <label>CusID</label>
                <label>Name</label>
                <label>AmountDue</label>
            </span>
            <div class="content" id="content"></div>
        </div>
        <span class="total" id="total">
            <p>Total</p>
            <p>0</p>
        </span>
                
    `
    main.insertAdjacentHTML("beforeend",html)


    const startDatePickerInput = handleDateAndTime('fromDate');
    

    document.getElementById('date').appendChild(startDatePickerInput.elementName)
   
    document.getElementById('amy_main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;
    document.getElementById('content').style.height = `
        ${Math.floor(100 - Number(pxToVh(
            document.getElementById('nav_div').offsetHeight + 
            document.getElementById('balance_date_range').offsetHeight +
            document.getElementById('balance_label').offsetHeight + 
            document.getElementById('total').offsetHeight
        ) + 5))}vh
    `
    
}

function amyMoneyReciept(){
    const main = document.getElementById('amy_main');

    main.innerHTML = '';
    const html =`
        <div class="amy_money_receipt_nav_button" id="amy_money_receipt_nav_button">
            <button class="entry" id="entry">MONEY RECEIPT ENTRY</button>
            <button class="view" id="view">MONEY RECEIPT VIEW</button>
        </div>
        <div class="amy_money_receipt_content" id="amy_money_receipt_content"></div>
    `
    main.insertAdjacentHTML("beforeend",html);


    const buttons =  document.getElementById('amy_money_receipt_nav_button').querySelectorAll('button')
    if(buttons){
        buttons.forEach((button,index)=>{
            button.addEventListener('click',()=>{
                
                manageAmyMoneyReceipt(button.id,buttons)
            })
        })
    }


    manageAmyMoneyReceipt('entry',buttons)
}

function manageAmyMoneyReceipt(tag,buttons = null){
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
            const content = document.getElementById('amy_money_receipt_content')
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
                <div>
                    <span>
                        <input type="radio" id="cash" name="mode" value="cash" checked>
                        <label for="cash">CASH</label>
                        </span>
                    <span>
                        <input type="radio" id="cheque" name="mode" value="cheque">
                        <label for="cheque">CHEQUE</label>
                        </span>
                    <span>
                        <input type="radio" id="bank_deposit" name="mode" value="bank_deposit">
                        <label for="bank_deposit">Bank Deposit</label>
                    </span>
                </div>
                
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
            <div class="pay_type" id="pay_type">
                <label>Pay Type</label>
                <div>
                    <span>
                        <input type="radio" id="regular" name="mode" value="regular" checked>
                        <label for="regular">Regular</label>   
                    </span>     
                    <span>
                        <input type="radio" id="partial" name="mode" value="partial">
                        <label for="partial">Partial</label>
                    </span>
                </div>
            </div>
            <button type="submit" id="submit">SUBMIT</button>
            `
            content.insertAdjacentHTML("beforeend",html);


            document.getElementById('amy_main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`
        }else if(button.id === tag && button.id === 'view'){
            const content = document.getElementById('amy_money_receipt_content')
            content.innerHTML = "";

            const html = `
                <div class="date_range" id="date_range">
                    <div class="date" id="date">
                    </div>
                  <button>OK</button>
                </div>
                <span>Date: </span>
                <div class="view_content" id="view_content">
                    <span class="label" id="label">
                        <label>Date/Name</label>
                        <label>ID/Phone</label>
                        <label>Amount</label>
                        <label>Status</label>
                    </span>
                    <span class="detail_info" id="detail_info"></span>
                </div>
                <div class="view_total" id="view_total">
                    <span>
                        <label>Total Client : </label>
                        <p>0</p>
                    </span>
                    <p>0</p>
                </div>
            `
            content.insertAdjacentHTML("beforeend",html);

            const startDatePickerInput = handleDateAndTime('fromDate');
            const endDatePickerInput = handleDateAndTime('toDate');

            document.getElementById('date').appendChild(startDatePickerInput.elementName);
            document.getElementById('date').appendChild(endDatePickerInput.elementName);

            document.getElementById('detail_info').style.cssText=`
                    display:flex;
                    height:${Math.floor(100 - Number(pxToVh(
                        document.getElementById('nav_div').offsetHeight + 
                        document.getElementById('amy_money_receipt_nav_button').offsetHeight + 
                        document.getElementById('date_range').offsetHeight + 
                        document.getElementById('label').offsetHeight ) + 10))}vh;
                    
            `;

            document.getElementById('view_total').style.cssText = `
                position:fixed;
                bottom:0;
                left:0;
                right:0;

            `
        }
    }) : "";
}

function amyReport(){
    const main = document.getElementById('amy_main');

    main.innerHTML = '';
    const html =`
        <div class="amy_report_nav_button" id="amy_report_nav_button">
            <button class="entry" id="entry">ACTIVITY ENTRY</button>
            <button class="view" id="view">ACTIVITY VIEW</button>
        </div>
        <div class="amy_report_content" id="amy_report_content"></div>
    `
    main.insertAdjacentHTML("beforeend",html);

    const buttons =  document.getElementById('amy_report_nav_button').querySelectorAll('button')
    if(buttons){
        buttons.forEach((button,index)=>{
            button.addEventListener('click',()=>{
                
                manageAmyReport(button.id,buttons)
            })
        })
    }


    manageAmyReport('entry',buttons)
}

function manageAmyReport(tag,buttons = null){
    buttons !== null ? buttons.forEach((button,index)=>{

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
            const content = document.getElementById('amy_report_content');
            
            content.innerHTML = "";

            const html = `
                <p class="report_title" id="report_title">Report Entry</p>
                <p class="report_date" id="report_date">Date : </p>
                <div class="report_write" id="report_write">
                    <textarea id="report_textarea" class="report_textarea" placeholder="Write your report here..."></textarea>
                </div>
                <button class="report_submit" id="report_submit">SUBMIT</button>

            `
            content.insertAdjacentHTML('beforeend',html);
            document.getElementById('amy_main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;

            document.getElementById('amy_report_content').style.cssText = `
                height:${Math.floor(100 - Number(pxToVh(document.getElementById('nav_div').offsetHeight + document.getElementById('amy_report_nav_button').offsetHeight) + 5))}vh;
                border:1px solid gray;
                border-radius:5px;
                width:95%;
                margin:auto;
                margin-top:8px;
            `

            document.getElementById('report_write').style.cssText = `
                height:${Math.floor(100 - Number(pxToVh(
                    document.getElementById('nav_div').offsetHeight + 
                    document.getElementById('amy_report_nav_button').offsetHeight + 
                    document.getElementById('report_title').offsetHeight + 
                    document.getElementById('report_date').offsetHeight + 
                    document.getElementById('report_submit').offsetHeight
                ) + 10 ))}vh
            `

        } else if(button.id === tag && button.id === 'view'){
            const content = document.getElementById('amy_report_content');
            
            content.innerHTML = "";

            const html = `
                <div class="date_range" id="date_range">
                    <div class="date" id="date">
                    </div>
                  <button>OK</button>
                </div>
                <span>Date : </span>

            `
            content.insertAdjacentHTML('beforeend',html);
            document.getElementById('amy_main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;

            document.getElementById('amy_report_content').style.cssText = '';

            const startDatePickerInput = handleDateAndTime('fromDate');
            const endDatePickerInput = handleDateAndTime('toDate');

            document.getElementById('date').appendChild(startDatePickerInput.elementName);
            document.getElementById('date').appendChild(endDatePickerInput.elementName);

        }
    }) : "";
}

function businessPerformance(){

}

function clientVisit(){

}

function visitTrack(){

}