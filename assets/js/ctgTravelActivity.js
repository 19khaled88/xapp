

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
            case "CTG Travel Client Ledger":
                clientLedger();
                break;
            case "CTG Travel Client Dues":
                clientDues();
                break;
            case "CTG Travel Money Receipt":
                moneyReceipt();
                break;
            case "CTG Travel Activity Report":
                report();
                break;
            case "CTG Travel Sales":
                sales();
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

function clientLedger(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html = `
        
        <div id="date" class="date"></div>
        <div id="search_div" class="search_div">
            <input id="id_mobile" class="id_mobile" type="tel"  placeholder="Enter ID/Number" pattern="[0-9]{10,15}" maxlength="15" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
            <button id="client_search_btn" class="client_search_btn">SEARCH</button>
            </div>
        <div id="content" class="content"></div>
    `
    main.insertAdjacentHTML("beforeend",html);

    const startDatePickerInput = handleDateAndTime('fromDate');
    const endDatePickerInput = handleDateAndTime('toDate');

    document.getElementById('date').appendChild(startDatePickerInput.elementName)
    document.getElementById('date').appendChild(endDatePickerInput.elementName)

    document.getElementById('main').style.height = `${Math.floor(Number(100 - (pxToVh(document.getElementById('nav_div').offsetHeight) + 1)))}vh`;

    document.getElementById('client_search_btn').addEventListener('click',()=>{
        // fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=amycusfindia&id=${identity}&dt1=&dt2=`)
            //     .then((res)=>{

            //     })
            //     .catch((error)=>{
            //         console.log(error)
            //     })
    })
}

function clientDues(){
    const url = `https://www.condomshopbd.com/xapi/emp_com.ashx?cmd=bfcduesindia&dt1=" + strSelDt1 + "&imei=" + strEmpIMEI`

    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
            <p class="main_title" id="main_title">Client Dues</p>
            
            <div class="date_range_dues" id="date_range_dues">
                <div class="date" id="date">
                </div>
                <button id="cl_due_btn" class="cl_due_btn">OK</button>
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
                <p id="dues_amt">0</p>
            </div>
        
    `
    main.insertAdjacentHTML("beforeend",html)

    const startDatePickerInput = handleDateAndTime('fromDate');

    document.getElementById('date').appendChild(startDatePickerInput.elementName);

    

    // document.getElementById('client_info').style.cssText = `
    //     height:${Math.floor(Number(100 - (pxToVh(
    //         document.getElementById('nav_div').offsetHeight +
    //         document.getElementById('main_title').offsetHeight +
    //         document.getElementById('date_range_dues').offsetHeight +
    //         document.getElementById('current_date').offsetHeight +
    //         document.getElementById('total_amount').offsetHeight
    //     ) + 2 )))}vh
    // `

    
    document.getElementById('cl_due_btn').addEventListener('click',()=>{
        allDues(`${rootUrl}/xapi/emp_com.ashx?cmd=bfcduesindia&dt1=${startDatePickerInput.elementName.value}&imei=${imei}`)

        // document.getElementById('client_info').style.cssText = `
        //     height:${Math.floor(Number(100 - (pxToVh(
        //         document.getElementById('nav_div').offsetHeight +
        //         document.getElementById('main_title').offsetHeight +
        //         document.getElementById('date_range_dues').offsetHeight +
        //         document.getElementById('current_date').offsetHeight +
        //         document.getElementById('total_amount').offsetHeight
        //     ) + 2 )))}vh
        // `
        // document.getElementById('content').style.cssText = `
        //     height:${Math.floor(Number(100 - (pxToVh(
        //         document.getElementById('nav_div').offsetHeight +
        //         document.getElementById('main_title').offsetHeight +
        //         document.getElementById('date_range_dues').offsetHeight +
        //         document.getElementById('current_date').offsetHeight +
        //         document.getElementById('total_amount').offsetHeight
        //     ) + 5)))}vh;
        //     overflow-y:auto;
        // `
    })

    allDues(`${rootUrl}/xapi/emp_com.ashx?cmd=bfcduesindia&dt1=${startDatePickerInput.elementName.value}&imei=${imei}`)
}

function moneyReceipt(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
        <div class="money_receipt_nav_button" id="money_receipt_nav_button">
            <button class="entry" id="entry">ENTRY</button>
            <button class="view" id="view">VIEW</button>
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
    const getUrl = `https://www.condomshopbd.com/xapi/emp_com.ashx?cmd=bfclfind&typ=id&no=" + strcusID + ""`
    const mrPost = `https://www.condomshopbd.com/xapi/emp_com.ashx?cmd=" + outCmd + "&imei=" + strEMPIMEI + "&cusid=" + outCusID + "&mramnt=" + outMRAmnt + "&mrmode=" + outMRMode + "&mrcurr=" + outMRCurr + "&mrcoord=" + outMRCoord + "&mrloca=" + outMRLoca + "&serv=" + strService + ""`
    const example = `?cmd=savebfmr&imei=c8:f2:30:26:6c:c9&cusid=9992&mramnt=10&mrmode=CASH&mrcurr=BDT&mrcoord=%200,0&mrloca=%20loc`

    buttons !== null ?  buttons.forEach((button,index)=>{ 
        let c_name; let c_number;  let c_location; let c_service; let c_currency;
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
                    <input class="id_mobile" id="id_mobile" type="number" placeholder="Clients ID/Mobile" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
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
                    <div>
                        <input style="font-weight:500; color:black" class="amount" id="amount" type="number"/>
                        <p class="currency" id="currency">BDT</p>
                    </div>
                </div>
                <div class="pay_mode" id="pay_mode">
                    <label>Pay Mode</label>
                    <div>
                        <span>
                            <input type="radio" id="cash" name="mode" value="Cash - FC" checked>
                            <label for="cash">CASH</label>
                        </span>
                        <span>
                            <input type="radio" id="cheque" name="mode" value="CHEQUE">
                            <label for="cheque">CHEQUE</label>
                        </span>
                        <span>
                            <input type="radio" id="bank_deposit" name="mode" value="Bank Deposit">
                            <label for="bank_deposit">Bank Deposit</label>
                        </span>
                        

                    </div>
                </div>
               
                <div class="service" id="service">
                    <label>Services</label>
                    <div id="service_dropdown" class="service_dropdown">Select</div>
                    <div id="service_dropdownList" class="service_dropdownList">
                        <div data-value="Amusement">Amusement</div>
                        <div data-value="Dining">Dining</div>
                        <div data-value="Living">Living</div>
                        <div data-value="Others">Others</div>
                        <div data-value="Passport & Visa">Passport & Visa</div>
                        <div data-value="Passport Endorsement">Passport Endorsement</div>
                        <div data-value="Ticketing">Ticketing</div>
                        <div data-value="Ticketing - Hajj">Ticketing - Hajj</div>
                        <div data-value="Ticketing - Hajj & Umrah">Ticketing - Hajj & Umrah</div>
                        <div data-value="Ticketing - Umrah">Ticketing - Umrah</div>
                        <div data-value="Transportation">Transportation</div>
                    </div>
                </div>
                <button type="submit" id="submit">SUBMIT</button>
            `
            content.insertAdjacentHTML("beforeend",html);

            document.getElementById('money_receipt_content').style.removeProperty('height');

            // service code
            document.getElementById('service_dropdown').addEventListener('click',()=>{
                service_dropdownList.style.display = service_dropdownList.style.display === 'block' ? 'none' : 'block';
            });
            document.getElementById('service_dropdownList').addEventListener('click',(event)=>{
                if(event.target.dataset.value){
                    service_dropdown.textContent = event.target.textContent;
                    c_service = event.target.dataset.value;
                    service_dropdownList.style.display = 'none';
                }
            });

            //find customer based on ID
            document.getElementById('fnd_bf_customer').addEventListener('click',async()=>{
                let inputValue = document.getElementById('id_mobile')?.value.trim();

                inputValue = inputValue.replace(/[^0-9]/g, '');
                try {
                    await fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=bfclfind&typ=id&no=${encodeURIComponent(inputValue)}`)
                        .then((res)=>{
                            if (typeof res === "string") {
                                const dataArray = res.split("|"); // Split data if it's pipe-separated
                                if(dataArray){
                                    const currency = document.getElementById('currency')
                                    currency.textContent = dataArray[4]
                                    c_currency = dataArray[4]
                                }
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
                                    document.getElementById('darkOverlay').style.display = '';
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
                    
                }
            })

            // manage display/hide if click outside scroll area
            document.addEventListener("click", (event) => {
                if (document.getElementById('service_dropdown') && document.getElementById('service_dropdownList') && !service_dropdown.contains(event.target) && !service_dropdownList.contains(event.target)) {
                    service_dropdownList.style.display = "none";
                }
            });

            document.getElementById('submit').addEventListener('click',()=>{
                const paymentMode = document.querySelector('input[name="mode"]:checked');
                const selectedMode = paymentMode ? paymentMode.value : null;
                let amount = document.getElementById('amount').value;

                // Validate and convert amount to an integer
                if (!/^\d+$/.test(amount)) {
                    Swal.fire("Please enter a valid amount!");
                    return;
                }

                amount = parseInt(amount, 10); // Convert to integer
                
                const fields = {
                    "User Name missing!":       !c_name,
                    "User ID missing!":         !c_number,
                    "Please Enter Amount!":     !amount,
                    "Please Select Currency!":  !c_currency,
                    "Please Select Mode!":      !selectedMode,
                    "Please Select Service!":   !c_service
                };

           
                if(!validateFields(fields)) return

                const url = `${rootUrl}/xapi/emp_com.ashx?cmd=savebfmrnew&imei=${imei}&cusid=${c_number}&mramnt=${amount}&mrmode=${encodeURIComponent(selectedMode)}&mrcurr=INR&mrcoord=&mrloca=${encodeURIComponent('Central Office - Chittagong')}&serv=${encodeURIComponent(c_service)}`
                
                try {
                    const loading = document.getElementById('darkOverlay')
                    loading.style.display = 'flex'
                    fetchData(url)
                        .then((res)=>{
                            
                            const result = res.split("|").map(item => item.trim().replace(/^"|"$/g, "")); // Trim whitespace from all parts

                            if (result[0] === "Success") {
                                // document.getElementById('darkOverlay').style.display = 'block';
                                loading.style.display = 'none'
                                document.body.classList.add('transparent');
                                Swal.fire({
                                    icon: "success",
                                    title: `${result[2]}, Your MR posted successfully!`,
                                    showConfirmButton: false,
                                    showCloseButton: true,
                                    customClass: {
                                        popup: 'swal2-alert-custom-smallscreen'
                                    },
                                }).then((result) => {
                                    // Hide the overlay when alert is closed
                                    // document.getElementById('darkOverlay').style.display = 'none';
                                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                                });
                            } 
                            else
                            {
                                loading.style.display = 'none'
                                // document.getElementById('darkOverlay').style.display = 'block';
                                document.body.classList.add('transparent');
                                Swal.fire({
                                    icon: "error",
                                    title: `MR not posted successfully!`,
                                    showConfirmButton: false,
                                    showCloseButton: true,
                                    customClass: {
                                        popup: 'swal2-alert-custom-smallscreen'
                                    },
                                }).then((result) => {
                                    // Hide the overlay when alert is closed
                                    // document.getElementById('darkOverlay').style.display = 'none';
                                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                                });
                            }
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                } catch (error) {
                    console.log(error)
                }

            })

        }else if(button.id === tag && button.id === 'view'){
            const content = document.getElementById('money_receipt_content')
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

        
            document.getElementById('view_content').style.cssText = `
                height:${Math.floor(Number(100 - pxToVh(
                    document.getElementById('nav_div').offsetHeight +
                    document.getElementById('money_receipt_nav_button').offsetHeight +
                    document.getElementById('date_range').offsetHeight +
                    document.getElementById('current_date').offsetHeight +
                    40
                )))}vh;
            `

            document.getElementById('money_receipt_content').style.cssText = `
                height:${100 - (pxToVh(
                    document.getElementById('nav_div').offsetHeight +
                    document.getElementById('money_receipt_nav_button').offsetHeight
                    
                ) + 1)}vh;
            `

            document.getElementById('detail_info').style.cssText = `
                height:${100 - (pxToVh(
                    document.getElementById('nav_div').offsetHeight +
                    document.getElementById('money_receipt_nav_button').offsetHeight + 
                    document.getElementById('date_range').offsetHeight +
                    document.getElementById('current_date').offsetHeight + 
                    document.getElementById('label').offsetHeight + 
                    40
                ) + 1)}vh;
            `
            
            


            document.getElementById('mr_show').addEventListener('click',()=>{
                const loading = document.getElementById('darkOverlay');
                loading.style.display = 'flex'
                try {
                    fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=BFMrRepJson&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}&imei=${imei}&loc=india`)
                        .then((res)=>{
                            if(res.Success === true && res.data.length > 0){
                                loading.style.display = 'none'
                                const table = document.createElement('table');
                                table.style.cssText = `border-collapse:collapse`
                                

                                const t_client = document.getElementById('t_client');
                                const t_amount = document.getElementById('t_amount');
                                t_amount.innerHTML=0;
                                t_client.innerHTML=0;
                                t_client.textContent = res.data.length; 
                                
                                let totalAmount = 0;

                                res.data.forEach((dt)=>{
                                    const row = document.createElement('tr');

                                    const firstColumn = document.createElement("td");
                                    firstColumn.textContent = dt.led_dt + " " + dt.cus_name; // Merge first two elements
                                    
                                    row.appendChild(firstColumn);

                                    const secondColumn = document.createElement("td");
                                    secondColumn.textContent = dt.cus_phn + " (" + dt.cus_id + ") "; // Merge first two elements
                                    
                                    row.appendChild(secondColumn);

                                    const thirdColumn = document.createElement("td");
                                    thirdColumn.textContent = dt.mr_amnt; // Merge first two elements
                                    
                                    row.appendChild(thirdColumn);

                                    const forthColumn = document.createElement("td");
                                    forthColumn.textContent = dt.mr_status; // Merge first two elements
                                    
                                    row.appendChild(forthColumn);

                                    if(dt.mr_amnt && dt.mr_amnt > 0 ){
                                       
                                       // Remove commas and parse as a float
                                        const numericValue = typeof(dt.mr_amnt) === String  ?  parseFloat(dt.mr_amnt.replace(/,/g, '').trim()) : dt.mr_amnt;

                                        if (!isNaN(numericValue)) {
                                            totalAmount += numericValue;
                                        }
                                    }

                                    table.appendChild(row);
                                    
                                });

                                // Set the total amount to the 't_amount' element
                                t_amount.textContent = totalAmount.toLocaleString();

                                document.getElementById('detail_info').innerHTML = "";
                                document.getElementById('detail_info').appendChild(table);

                            }else if(res.Success === false){
                                loading.style.display = 'none'
                                // document.getElementById('darkOverlay').style.display = 'block';
                                document.body.classList.add('transparent');
                                Swal.fire({
                                    icon: "warning",
                                    title: `${res.message}`,
                                    showConfirmButton: false,
                                    showCloseButton: true,
                                    customClass: {
                                        popup: 'swal2-alert-custom-smallscreen'
                                    },
                                }).then((result) => {
                                    // Hide the overlay when alert is closed
                                    // document.getElementById('darkOverlay').style.display = 'none';
                                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                                });
                            }
                        })
                        .catch((error)=>{
                                loading.style.display = 'none';
                                // document.getElementById('darkOverlay').style.display = 'block';
                                document.body.classList.add('transparent');
                                Swal.fire({
                                    icon: "warning",
                                    title: error.message,
                                    showConfirmButton: false,
                                    showCloseButton: true,
                                    customClass: {
                                        popup: 'swal2-alert-custom-smallscreen'
                                    },
                                }).then((result) => {
                                    // Hide the overlay when alert is closed
                                    // document.getElementById('darkOverlay').style.display = 'none';
                                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                                });
                        })
                } catch (error) {
                    
                }
            })
        }

    }) : "";

}

function report(){
    console.log('report')
}

function sales(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    
    const html = `
        <div id="sales" class="sales">
            <div class="date_range_sales" id="date_range_sales">
                <div class="date" id="date">
                </div>
                <button id="cl_due_btn" class="cl_due_btn">OK</button>
            </div>
            <span id="as_on_date" class="as_on_date"></span>
        
            <span class="sales_label" id="sales_label">
                <label>ID/Phone/Name</label>
                <label>Sales</label>
                <label>MR</label>
            </span>
            <div id="content" class="content"></div>   
            <div class="sales_footer" id="sales_footer">
                <label>Total</label>
                <p id="sl_total" class="sl_total"></p>
                <p id="mr_total" class="mr_total"></p>
            </div>     
        </div>
    `
    main.insertAdjacentHTML("beforeend",html);
    const startDatePickerInput = handleDateAndTime('fromDate');
    const endDatePickerInput = handleDateAndTime('to');

    document.getElementById('date').appendChild(startDatePickerInput.elementName);
    document.getElementById('date').appendChild(endDatePickerInput.elementName);

    document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;

    document.getElementById('cl_due_btn').addEventListener('click',()=>{
        allSales(`${rootUrl}/xapi/boss_api.ashx?cmd=amy_ind_sale&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}`)
        document.getElementById('as_on_date').textContent = `Date : ${startDatePickerInput.elementName.value} - ${endDatePickerInput.elementName.value}`;
    });
    allSales(`${rootUrl}/xapi/boss_api.ashx?cmd=amy_ind_sale&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}`)



    document.getElementById('as_on_date').textContent = `Date : ${startDatePickerInput.elementName.value} - ${endDatePickerInput.elementName.value}`;

    document.getElementById('content').style.cssText = `
        height:${Math.floor(Number(100 - pxToVh(
            document.getElementById('nav_div').offsetHeight + 
            document.getElementById('date_range_sales').offsetHeight +
            document.getElementById('as_on_date').offsetHeight +
            document.getElementById('sales_label').offsetHeight +
            document.getElementById('sales_footer').offsetHeight 
        )))}vh
    `;
}

function allDues(url){
    const loading = document.getElementById('darkOverlay');
    loading.style.display = 'flex'
    try {
        fetchData(url)
        .then((res) =>{
            if (typeof res === "string") return res; // Handle string response
            if (res.text) return res.text(); // Handle fetch() response
            throw new Error("Unexpected response format");
        }) // Read response as text
        .then((text) => {
            
            if(!text.includes("Invalid Account Manager")){
                const parts = text.split("|"); // Split records by `|`
                const date = parts.shift().trim(); // Extract the date (first element)

                document.getElementById('current_date').innerHTML = `As On: ${date}`


                const data = parts.map((record) => {
                    const fields = record.split("=");
                    return {
                        id: fields[0].trim(),
                        name: fields[1].trim(),
                        amount: parseFloat(fields[2].replace(/,/g, '')), // Convert to number
                        rank: parseInt(fields[3], 10) // Convert to number
                    };
                });

                if(data.length > 0){
                    loading.style.display = 'none'
                    const tableContainer = document.getElementById("content");
                    tableContainer.innerHTML = "";

                    // Create a table element
                    const table = document.createElement("table");
                    table.style.width = "100%"; // Optional: Adjust styles
                    table.style.borderCollapse = "collapse"; // Optional: For better styling

                    let totalAmount = 0;
                    let totalCustomer = 0;

                    data && data.forEach((due)=>{
                        const row = document.createElement("tr");

                        // Add Rank column (first)
                        const rankCell = document.createElement("td");
                        rankCell.textContent = due.rank;
                        rankCell.style.textAlign = "center"; // Optional: Center the rank
                        rankCell.style.backgroundColor = "#f2f2f2"; // Optional: Light gray background for rank
                        rankCell.style.padding = "8px"; // Optional: Add spacing
                        rankCell.style.border = "1px solid #ddd"; // Optional: Add border
                        row.appendChild(rankCell);

                        // Add ID column (second)
                        const idCell = document.createElement("td");
                        idCell.textContent = due.id;
                        idCell.style.fontWeight = "bold";
                        idCell.style.color = "blue";
                        idCell.style.padding = "8px"; // Optional: Add spacing
                        idCell.style.border = "1px solid #ddd"; // Optional: Add border
                        row.appendChild(idCell);

                        // Add Name column (third)
                        const nameCell = document.createElement("td");
                        nameCell.textContent = due.name;
                        nameCell.style.textTransform = "uppercase"; // Optional: Uppercase for name
                        nameCell.style.padding = "8px"; // Optional: Add spacing
                        nameCell.style.border = "1px solid #ddd"; // Optional: Add border
                        row.appendChild(nameCell);

                        // Add Amount column (last)
                        const amountCell = document.createElement("td");
                        amountCell.textContent = due.amount.toLocaleString(); // Format the amount with commas
                        amountCell.style.fontWeight = "bold";
                        amountCell.style.textAlign = 'right';
                        amountCell.style.color = due.amount < 0 ? "red" : "green"; // Negative in red, positive in green
                        amountCell.style.padding = "8px"; // Optional: Add spacing
                        amountCell.style.border = "1px solid #ddd"; // Optional: Add border
                        row.appendChild(amountCell);

                        // Append the row to the table
                        table.appendChild(row); 

                        // Update the total amount
                        totalAmount += due.amount;
                        const dues_amt = document.getElementById('dues_amt')
                        dues_amt.textContent = totalAmount
                        totalCustomer += 1
                    })

                    // Append the table to the container
                    tableContainer.appendChild(table);
                    const total_Cus = document.getElementById('total_amount')
                    const label = total_Cus.querySelector('label');
                    
                    label.textContent = totalCustomer > 0 ?  `Total (${totalCustomer})` : `Total`;


                    document.getElementById('main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;

                    document.getElementById('content').style.cssText = `
                        height:${Math.floor(Number(100 - (pxToVh(
                            document.getElementById('nav_div').offsetHeight +
                            document.getElementById('main_title').offsetHeight +
                            document.getElementById('date_range_dues').offsetHeight +
                            document.getElementById('current_date').offsetHeight +
                            document.getElementById('table_title').offsetHeight +
                            40
                        ) + 2 )))}vh;
                        overflow-y:auto;
                    `
                }
                else
                {
                    const tableContainer = document.getElementById("content");
                    tableContainer.innerHTML = "";


                    loading.style.display = 'none';
                    document.body.classList.add('transparent');
                    Swal.fire({
                        icon: "warning",
                        title: 'No Data Found!',
                        showConfirmButton: false,
                        showCloseButton: true,
                        customClass: {
                            popup: 'swal2-alert-custom-smallscreen'
                        },
                    }).then((result) => {
                        // Hide the overlay when alert is closed
                        // document.getElementById('darkOverlay').style.display = 'none';
                        document.body.classList.remove('transparent'); // Remove class to allow scrolling
                    });

                }

             
                
            }
            else
            {
                const response = text.split("|")
                // document.getElementById('darkOverlay').style.display = 'block';
                loading.style.display = 'none';
                document.body.classList.add('transparent');
                Swal.fire({
                    icon: "warning",
                    title: response[1],
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: {
                        popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then((result) => {
                    // Hide the overlay when alert is closed
                    // document.getElementById('darkOverlay').style.display = 'none';
                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
            }
            
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
    } catch (error) {
        
    }
}

function validateFields(fields) {
    
    for (const [message, condition] of Object.entries(fields)) {
        
        if (condition) return showAlert(message,'none');
    }

    return true;
}

function allSales(url){
    document.getElementById('darkOverlay').style.cssText = `display:flex`
    try {
        fetchData(url)
            .then((res)=>{
                if(res.success === true){
                    
                    const tableContainer = document.getElementById("content");
                    tableContainer.innerHTML = "";
                    let totalSales = 0;
                    let totalMR = 0;

                    // Create a table element
                    const table = document.createElement("table");
                    table.style.cssText = `border:1px solid black;border-collapse:collapse;width:99%;margin:0 auto`

                    res.data.forEach((sl)=>{
                        const row = document.createElement("tr");

                        const firstCell = document.createElement("td");
                        firstCell.textContent = `(${sl.divID})\n${sl.divPhn}\n${sl.divName}`; 
                        firstCell.style.cssText = `border:1px solid black;padding:5px`;
                        row.appendChild(firstCell);

                        const secondCell = document.createElement("td");
                        secondCell.textContent = sl.divSales;
                        secondCell.style.cssText = `border:1px solid black;padding:5px`;
                        row.appendChild(secondCell);

                        const thirdCell = document.createElement("td");
                        thirdCell.textContent = sl.divMR;
                        thirdCell.style.cssText = `border:1px solid black;padding:5px`;
                        row.appendChild(thirdCell);

                        table.appendChild(row);

                        // Update the total amount
                        Number( sl.divSales.replace(/,/g, "") ) > 0 ? totalSales += Number(sl.divSales.replace(/,/g, "")) : "";
                        Number(sl.divMR.replace(/,/g, "")) > 0 ? totalMR += Number(sl.divMR.replace(/,/g, "")) : "";
                    })

                    document.getElementById('sales_footer').querySelector('label').textContent =res.data.length > 0 ? `Total (${res.data.length})` : `Total`
                    document.getElementById('sl_total').textContent = formatNumberWithThousandPositionComma(totalSales);
                    document.getElementById('mr_total').textContent = formatNumberWithThousandPositionComma(totalMR);
                    document.getElementById('content').innerHTML = "";
                    document.getElementById('content').appendChild(table);
                    document.getElementById('darkOverlay').style.cssText = `display:none`
                }else{

                }
            })
            .catch((error)=>{
                console.log(error)
            })
    } catch (error) {
       console.log(error) 
    }
}