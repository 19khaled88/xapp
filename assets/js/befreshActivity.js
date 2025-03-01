

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
        window.location.href = `https://ctgshop.com/xapp/test/pages/Befresh.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}`
    })
});


function clientBalance(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
            <p class="main_title" id="main_title">Client Balance</p>
            <div class="input_fields" id="input_fields">
                <input id="client_mobile" type="tel"  placeholder="ID/Mobile Number" pattern="[0-9]{10,15}" maxlength="15" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                <div class="client_bal_info" id="client_bal_info"></div>
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
   

    
    document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;


    fetchData(``)
        
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
        <div class="money_receipt_nav_button" id="money_receipt_nav_button">
            <button class="entry" id="entry">MONEY RECEIPT ENTRY</button>
            <button class="view" id="view">MONEY RECEIPT VIEW</button>
        </div>
        <div class="money_receipt_content" id="money_receipt_content"></div>
    `
    main.insertAdjacentHTML("beforeend",html);


    const buttons =  document.getElementById('money_receipt_nav_button').querySelectorAll('button')
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
        let c_name; let c_number;  let c_location; let c_service;
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
            const content = document.getElementById('money_receipt_content')
            content.innerHTML = "";

            const html = `
                <div class="client_id_mobile" id="client_id_mobile">
                    <input class="id_mobile" id="id_mobile" type="number" placeholder="Clients ID/Mobile Number" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                    <button id="fnd_bf_customer">FIND</button>
                </div>
                <div class="client_name" id="client_name">
                    <label>Clients Name</label>
                    <input style="font-weight:500; color:black" class="name" id="name" disabled/>
                </div>
                <div class="client_number" id="client_number">
                    <label>Clients Number</label>
                    <input style="font-weight:500; color:black" class="number" id="number" disabled/>
                </div>
                <div class="mr_amount" id="mr_amount">
                    <label>MR Amount</label>
                    <input style="font-weight:500; color:black" class="amount" id="amount" type="number"/>
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
                    <select id="location">
                        <option value="" selected>Select Location</option>
                        <option value="sylhet">Sylhet Office - Sylhet</option>
                        <option value="chittagong">Studio Office - Chittagong</option>
                        <option value="singapore">Singapore Office - Singapore</option>
                    </select>
                </div>
                <div class="service" id="service">
                    <label>Services</label>
                    <select id="service">
                        <option value="" selected>Select</option>
                        <option value="ticketing">Ticketing</option>
                        <option value="ticketing-hajj">Ticketing - Hajj</option>
                        <option value="ticketing-umrah">Ticketing - Umrah</option>
                    </select>
                </div>
                <button type="submit" id="submit">SUBMIT</button>
            `
            content.insertAdjacentHTML("beforeend",html);

            document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;

            document.getElementById('fnd_bf_customer') && document.getElementById('fnd_bf_customer').addEventListener('click',async ()=>{
                let inputValue = document.getElementById('id_mobile')?.value.trim();

                inputValue = inputValue.replace(/[^0-9]/g, '');


                try {
                    await fetchData(`https://www.condomshopbd.com/xapi/emp_com.ashx?cmd=bfclfind&typ=id&v=2&no=${encodeURIComponent(inputValue)}`)
                        .then((res)=>{
                            
                            if (typeof res === "string") {
                                const dataArray = res.split("|"); // Split data if it's pipe-separated
                                
                                if(dataArray.some((item)=>item.includes('Found'))){
                                    const name = document.getElementById('name');
                                    const number = document.getElementById('number');
                                    name.value = dataArray[2];
                                    number.value = dataArray[1];
                                    c_name = name.value;
                                    c_number = number.value
                                    
                                }
                                else
                                {
                                    const finalString = dataArray[0];
                                    document.getElementById('darkOverlay').style.display = 'block';
                                    document.body.classList.add('transparent');
                                    Swal.fire({
                                        icon: "warning",
                                        title: `${finalString}`,
                                        showConfirmButton: false,
                                        showCloseButton: true,
                                        customClass: {
                                            popup: 'swal2-alert-custom-smallscreen'
                                        },
                                    }).then(() => {
                                        document.getElementById('darkOverlay').style.display = 'none';
                                        document.body.classList.remove('transparent'); // Remove class to allow scrolling
                                    });
                                }
                            }
                        })
                        .catch((error)=>{
                            document.getElementById('darkOverlay').style.display = 'block';
                            document.body.classList.add('transparent');
                            Swal.fire({
                                icon: "warning",
                                title: `${error.message}`,
                                showConfirmButton: false,
                                showCloseButton: true,
                                customClass: {
                                    popup: 'swal2-alert-custom-smallscreen'
                                },
                            }).then(() => {
                                document.getElementById('darkOverlay').style.display = 'none';
                                document.body.classList.remove('transparent'); // Remove class to allow scrolling
                            });
                        })
                    
                } catch (error) {
                    document.getElementById('darkOverlay').style.display = 'block';
                    document.body.classList.add('transparent');
                    Swal.fire({
                        icon: "warning",
                        title: `${error.message}`,
                        showConfirmButton: false,
                        showCloseButton: true,
                        customClass: {
                            popup: 'swal2-alert-custom-smallscreen'
                        },
                    }).then(() => {
                        document.getElementById('darkOverlay').style.display = 'none';
                        document.body.classList.remove('transparent'); // Remove class to allow scrolling
                    });
                }
            });

            document.getElementById('location').addEventListener('change',(event)=>{
                c_location = event.target.value
            });

            document.getElementById('service').addEventListener('change',(event)=>{
                c_service = event.target.value
            });

            document.getElementById('submit').addEventListener('click',()=>{
                
                const paymentMode = document.querySelector('input[name="mode"]:checked');
                const selectedMode = paymentMode ? paymentMode.value : null;
                const amount = document.getElementById('amount').value

                console.log(c_name,c_number,amount,selectedMode,c_location,c_service)

            })
        }else if(button.id === tag && button.id === 'view'){
            const content = document.getElementById('money_receipt_content')
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
                        document.getElementById('money_receipt_nav_button').offsetHeight + 
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

function report(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
        <div class="report_nav_button" id="report_nav_button">
            <button class="entry" id="entry">ACTIVITY ENTRY</button>
            <button class="view" id="view">ACTIVITY VIEW</button>
        </div>
        <div class="report_content" id="report_content"></div>
    `
    main.insertAdjacentHTML("beforeend",html);

    const buttons =  document.getElementById('report_nav_button').querySelectorAll('button')
    if(buttons){
        buttons.forEach((button,index)=>{
            button.addEventListener('click',()=>{
                
                manageReport(button.id,buttons)
            })
        })
    }


    manageReport('entry',buttons)
}

function manageReport(tag,buttons = null){

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
            const content = document.getElementById('report_content');
            
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
            document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;

            document.getElementById('report_content').style.cssText = `
                height:${Math.floor(100 - Number(pxToVh(document.getElementById('nav_div').offsetHeight + document.getElementById('report_nav_button').offsetHeight) + 5))}vh;
                border:1px solid gray;
                border-radius:5px;
                width:95%;
                margin:auto;
                margin-top:8px;
            `

            document.getElementById('report_write').style.cssText = `
                height:${Math.floor(100 - Number(pxToVh(
                    document.getElementById('nav_div').offsetHeight + 
                    document.getElementById('report_nav_button').offsetHeight + 
                    document.getElementById('report_title').offsetHeight + 
                    document.getElementById('report_date').offsetHeight + 
                    document.getElementById('report_submit').offsetHeight
                ) + 10 ))}vh
            `

        } else if(button.id === tag && button.id === 'view'){
            const content = document.getElementById('report_content');
            
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
            document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;

            document.getElementById('report_content').style.cssText = '';

            const startDatePickerInput = handleDateAndTime('fromDate');
            const endDatePickerInput = handleDateAndTime('toDate');

            document.getElementById('date').appendChild(startDatePickerInput.elementName);
            document.getElementById('date').appendChild(endDatePickerInput.elementName);

        }
    }) : "";
}

function passengerList(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
        <div class="passenger_nav_button" id="passenger_nav_button">
            <button class="arrival" id="arrival">ARRIVAL</button>
            <button class="departure" id="departure">DEPARTURE</button>
        </div>
        <div class="passenger_content" id="passenger_content"></div>
    `
    main.insertAdjacentHTML("beforeend",html);

    const buttons =  document.getElementById('passenger_nav_button').querySelectorAll('button')
    if(buttons){
        buttons.forEach((button,index)=>{
            button.addEventListener('click',()=>{
                
                managePassengerList(button.id,buttons)
            })
        })
    }


    managePassengerList('arrival',buttons)
}

function managePassengerList(tag,buttons = null){
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

        if(button.id === tag && button.id === 'arrival'){
            const content = document.getElementById('passenger_content');
            
            content.innerHTML = "";

            const html = `
                <div class="date_range" id="date_range">
                    <label>DATE</label>
                    <div class="date" id="date">
                    </div>
                </div>
                <div class="airlines" id="airlines">
                    <label>AIRLINES</label>
                    <select>
                        <option value="biman">BIMAN</option>
                    </select>
                </div>
                 <div class="location" id="location">
                    <label>LOCATION</label>
                    <select>
                        <option value="dac-cgp">DAC - CGP</option>
                        <option value="cxb-cgp">CXB - CGP</option>
                    </select>
                </div>
                <button id="pass_arrival_submit" class="pass_arrival_submit" type="submit">SEARCH</button>
            `
            content.insertAdjacentHTML('beforeend',html);
            document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;


            const startDatePickerInput = handleDateAndTime('fromDate');
           

            document.getElementById('date').appendChild(startDatePickerInput.elementName);
            content.style.cssText=``


        }else if(button.id === tag && button.id === 'departure'){
            const content = document.getElementById('passenger_content');
            
            content.innerHTML = "";

            const html =`
                <p>Work On Progress</p>
            `
            content.insertAdjacentHTML('beforeend',html);
            document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;
            content.style.cssText = `
                display:flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
                color:rgb(247 10 194);
                height:${Math.floor(100 - Number(pxToVh(document.getElementById('nav_div').offsetHeight + document.getElementById('passenger_nav_button').offsetHeight) + 5))}vh;
            `
        }
    }): "";


}

function businessPerformance(){

}

function manageBusinessPerformance(){

}