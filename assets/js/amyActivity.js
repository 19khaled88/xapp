
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
const imei = urlParams.get('imei')

document.addEventListener('DOMContentLoaded',()=>{


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

    const back_home_button_handle = document.getElementById('bf_home_btn');
    back_home_button_handle && back_home_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/index.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}`
    })
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
            <button class="entry" id="entry">ENTRY</button>
            <button class="view" id="view">VIEW</button>
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
                <p class="currency" id="currency">BDT</p>
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
                  <button class="mr_show" id="mr_show">OK</button>
                </div>


                <span class="current_date" id="current_date">
                    <label>Date: </label>
                    <p class="s_date" id="s_date"></p>
                    <p> - </p>
                    <p class="e_date" id="e_date"></p>
                </span>
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
                        <p class="t_client" id="t_client">0</p>
                    </span>
                    <p class="t_amount" id="t_amount">0</p>
                </div>
            `
            content.insertAdjacentHTML("beforeend",html);

            const startDatePickerInput = handleDateAndTime('fromDate');
            const endDatePickerInput = handleDateAndTime('toDate');

            document.getElementById('date').appendChild(startDatePickerInput.elementName);
            document.getElementById('date').appendChild(endDatePickerInput.elementName);

            document.getElementById('s_date').textContent = startDatePickerInput.elementName.value;
            document.getElementById('e_date').textContent = endDatePickerInput.elementName.value;


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
            document.getElementById('mr_show').addEventListener('click',()=>{
                try {
                    fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=BFMrRep&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}&imei=${imei}`)
                        .then((res)=>{
                            
                            const result = res.split('|');
                            const date = result[0].split('-');

                            document.getElementById('s_date').textContent = date[0];
                            document.getElementById('e_date').textContent = date[1];

                            // Get all elements except the first one
                            const remainingElements = result.slice(1);


                            
                            if(remainingElements.length === 1 && remainingElements[0] === ' = = =0=Posted'){
                                const t_client = document.getElementById('t_client');
                                const t_amount = document.getElementById('t_amount');
                                t_amount.innerHTML=0
                                t_client.innerHTML=0

                                document.getElementById('darkOverlay').style.display = 'block';
                                document.body.classList.add('transparent');
                                Swal.fire({
                                    icon: "warning",
                                    title: `No Data Found`,
                                    showConfirmButton: false,
                                    showCloseButton: true,
                                    customClass: {
                                        popup: 'swal2-alert-custom-smallscreen'
                                    },
                                }).then((result) => {
                                    // Hide the overlay when alert is closed
                                    document.getElementById('darkOverlay').style.display = 'none';
                                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                                });

                                

                            }
                            else
                            {
                                // Create a table 
                                const table = document.createElement('table');
                                const t_client = document.getElementById('t_client');
                                const t_amount = document.getElementById('t_amount');
                                t_amount.innerHTML=0;
                                t_client.innerHTML=0;
                                t_client.textContent = remainingElements.length; 
                                
                                let totalAmount = 0;

                                // Append data rows
                                remainingElements.forEach((item,index)=>{
                                    const row = document.createElement('tr');
                                    const singleItem = item.split('=');
                                    
                                    // Combine the first two elements into one column
                                    const firstColumn = document.createElement("td");
                                    firstColumn.textContent = singleItem[0] + " " + singleItem[1]; // Merge first two elements
                                    row.appendChild(firstColumn);

                                    // Append the remaining elements normally
                                    for (let i = 2; i < singleItem.length; i++) {
                                        const td = document.createElement("td");

                                        if(singleItem[i].includes("(") && singleItem[i].includes(")")){
                                            const parts = singleItem[i].split(/(\(.*?\))/);
                                            td.innerHTML = parts[0] + "<br>" + parts[1];
                                        }else{

                                            td.textContent = singleItem[i];
                                        }
                                        if (i === 4 && singleItem[i].trim().toLowerCase() === "pending") {
                                            td.style.color = "red";
                                            
                                        }
                                        row.appendChild(td);

                                        if(i === 3){
                                            const numericValue = parseFloat(singleItem[i].replace(/,/g, ''));
                                            if(!isNaN(numericValue)){
                                                totalAmount += numericValue;
                                            }
                                        }
                                    }

                                    table.appendChild(row);
                                });

                                // Set the total amount to the 't_amount' element
                                t_amount.textContent = totalAmount.toLocaleString();

                                document.getElementById('detail_info').innerHTML = "";
                                document.getElementById('detail_info').appendChild(table);
                            }
                           

                        })
                        .catch((error)=>{
                            console.log(error)
                        })

                    
                } catch (error) {
                   console.log(error) 
                }
            })
        }
    }) : "";
}

function amyReport(){
    const main = document.getElementById('amy_main');

    main.innerHTML = '';
    const html =`
        <div class="amy_report_nav_button" id="amy_report_nav_button">
            <button class="entry" id="entry">ENTRY</button>
            <button class="view" id="view">VIEW</button>
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