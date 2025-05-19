

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
        window.location.href = `https://ctgshop.com/xapp/test/pages/Befresh.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}&imei=${imei}`
    });


    const back_home_button_handle = document.getElementById('bf_home_btn');
    back_home_button_handle && back_home_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/index.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}`
    })

});

function clientBalance(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
        <p class="main_title" id="main_title">Client Balance</p>
        <div class="input_fields" id="input_fields">
            <input id="id_mobile" class="id_mobile" type="tel"  placeholder="ID/Mobile Number" pattern="[0-9]{10,15}" maxlength="15" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
            <div class="client_bal_info" id="client_bal_info"></div>
            <div class="date_range" id="date_range">
                <div class="date" id="date">
                </div>
                <button class="cl_bl_btn" id="cl_bl_btn">OK</button>
            </div>
        </div>
        <div class="balance" id="balance">
            <span>
                <label>Opening Balance : </label>
                <p class="op_bl" id="op_bl"></p>
            </span>
            <span>
            <label>Closing Balance : </label>
            <p class="cl_bl" id="cl_bl"></p>
        </span>
        </div>
    `
    main.insertAdjacentHTML("beforeend",html)


    const startDatePickerInput = handleDateAndTime('fromDate');
    const endDatePickerInput = handleDateAndTime('toDate');
    

    document.getElementById('date').appendChild(startDatePickerInput.elementName)
    document.getElementById('date').appendChild(endDatePickerInput.elementName)
   
    document.getElementById('fromDate').addEventListener('click',()=>{
        const datepicker = document.querySelector('.datepicker-dropdown');
        
        if(datepicker){
            // datepicker.style.cssText = `
            //     position:'fixed';
            //     left:0;
            //     top:${document.getElementById('fromDate').getBoundingClientRect().bottom + window.scrollY}px
            // `
        }
    })
    document.getElementById('toDate').addEventListener('click',()=>{
        const datepicker = document.querySelector('.datepicker-dropdown');
        
        if(datepicker){
            // datepicker.style.cssText = `
            //     position:'fixed';
            //     right:0;
            //     top:${document.getElementById('fromDate').getBoundingClientRect().bottom + window.scrollY}px
            // `
        }
    })
    
    

    document.getElementById('main').style.height = `${Math.floor(Number(100 - (pxToVh(document.getElementById('nav_div').offsetHeight) + 1)))}vh`;


    document.getElementById('cl_bl_btn').addEventListener('click',()=>{
        const id_mobile = document.getElementById('id_mobile').value;
        
        
        if(!id_mobile || id_mobile.length ===0){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                icon: "warning",
                title: 'Customer ID Empty!',
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
        }else{
            
            fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=bfclbn&typ=id&no=${id_mobile}&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}`)
                .then((res)=>{
                    const result = res.split('|');
                    
                    if(result[0] === 'Found'){
                        
                        document.getElementById('op_bl').textContent = result[4];
                        document.getElementById('cl_bl').textContent = result[5];

                        const client_bal_info =  document.getElementById('client_bal_info');
                        client_bal_info.innerHTML = "";

                        // Function to create a span with label and p tag
                        function createSpan(labelText, pText) {
                            const span = document.createElement('span');
                            const label = document.createElement('label');
                            const p = document.createElement('p');

                            label.textContent = labelText;
                            p.textContent = pText;

                            span.appendChild(label);
                            span.appendChild(p);

                            return span;
                        }

                        // Append two spans
                        client_bal_info.appendChild(createSpan('ID:', `${result[1]}`));
                        client_bal_info.appendChild(createSpan('Name:', `${result[2]}`));
                        
                    }else if(res.includes('Invalid Date Range')){
                        const result = res.split('|');

                        document.getElementById('darkOverlay').style.display = 'block';
                        document.body.classList.add('transparent');
                        Swal.fire({
                            icon: "warning",
                            title: result[1],
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
                    }else{
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
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })
        
}

function clientDues(){
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

    document.getElementById('main').style.height = `${Math.floor(Number(100 - (pxToVh(
        document.getElementById('nav_div').offsetHeight
    ) + 1)))}vh`;

    document.getElementById('client_info').style.cssText = `
        height:${Math.floor(Number(100 - (pxToVh(
            document.getElementById('nav_div').offsetHeight +
            document.getElementById('main_title').offsetHeight +
            document.getElementById('date_range_dues').offsetHeight +
            document.getElementById('current_date').offsetHeight +
            document.getElementById('total_amount').offsetHeight
        ) + 4)))}vh
    `

    document.getElementById('total_amount').style.cssText = `
        position:fixed;
        bottom:0;
        left:0;
        right:0;
    `

    document.getElementById('cl_due_btn').addEventListener('click',()=>{
        
        fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=bfcdues&dt1=${startDatePickerInput.elementName.value}&imei=${imei}`)
            .then((res) =>{
                if (typeof res === "string") return res; // Handle string response
                if (res.text) return res.text(); // Handle fetch() response
                throw new Error("Unexpected response format");
            }) // Read response as text
            .then((text) => {
                
                if(!text.includes("Invalid Account Manager")){
                    const parts = text.split("|"); // Split records by `|`
                    const date = parts.shift().trim(); // Extract the date (first element)
    
                    const data = parts.map((record) => {
                        const fields = record.split("=");
                        return {
                            id: fields[0].trim(),
                            name: fields[1].trim(),
                            amount: parseFloat(fields[2].replace(/,/g, '')), // Convert to number
                            rank: parseInt(fields[3], 10) // Convert to number
                        };
                    });
    
                    document.getElementById('current_date').innerHTML = `As On: ${date}`
                    
    
                    const tableContainer = document.getElementById("content");
                    tableContainer.innerHTML = "";
    
    
                    // Create a table element
                    const table = document.createElement("table");
                    table.style.width = "100%"; // Optional: Adjust styles
                    table.style.borderCollapse = "collapse"; // Optional: For better styling
    
                    let totalAmount = 0;
    
    
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
                    })
    
                    // Append the table to the container
                    tableContainer.appendChild(table);
                }else{
                    const response = text.split("|")
                    document.getElementById('darkOverlay').style.display = 'block';
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
                        document.getElementById('darkOverlay').style.display = 'none';
                        document.body.classList.remove('transparent'); // Remove class to allow scrolling
                    });
                }
                
                

                document.getElementById('client_info').style.cssText = `
                    height:${Math.floor(Number(100 - (pxToVh(
                        document.getElementById('nav_div').offsetHeight +
                        document.getElementById('main_title').offsetHeight +
                        document.getElementById('date_range_dues').offsetHeight +
                        document.getElementById('current_date').offsetHeight +
                        document.getElementById('total_amount').offsetHeight
                    ) + 2)))}vh
                `
                document.getElementById('content').style.cssText = `
                    height:${Math.floor(Number(100 - (pxToVh(
                        document.getElementById('nav_div').offsetHeight +
                        document.getElementById('main_title').offsetHeight +
                        document.getElementById('date_range_dues').offsetHeight +
                        document.getElementById('current_date').offsetHeight +
                        document.getElementById('total_amount').offsetHeight
                    ) + 4)))}vh;
                    overflow-y:auto;
                `
                document.getElementById('total_amount').style.cssText = `
                    position:fixed;
                    bottom:0;
                    left:0;
                    right:0;
                `
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
        
    })
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

    document.getElementById('main').style.height = `${Math.floor(Number(100 - (pxToVh(document.getElementById('nav_div').offsetHeight) + 1)))}vh`;

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
                    <div>
                        <input style="font-weight:500; color:black" class="amount" id="amount" type="number"/>
                        <p class="currency" id="currency">BDT</p>
                    </div>
                </div>
                <div class="pay_mode" id="pay_mode">
                    <label>Pay Mode</label>
                    <div>
                        <span>
                            <input type="radio" id="cash" name="mode" value="CASH" checked>
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
                <div class="location" id="location">
                    <label>MR Location</label>
                    <div id="dropdown" class="custom-dropdown">Select Location</div>
                    <div id="dropdownList" class="dropdown-list">
                        <div data-value="Airport Office - Chittagong">Airport Office - Chittagong</div>
                        <div data-value="Central Office - Chittagong">Central Office - Chittagong</div>
                        <div data-value="Chatkhil Office - Noakhali">Chatkhil Office - Noakhali</div>
                        <div data-value="Chawkbazar Office - Chittagong">Chawkbazar Office - Chittagong</div>
                        <div data-value="Dhaka Office - Dhaka">Dhaka Office - Dhaka</div>
                        <div data-value="EPZ Office - Chittagong">EPZ Office - Chittagong</div>
                        <div data-value="GEC Office - Chittagong">GEC Office - Chittagong</div>
                        <div data-value="Khulshi Office - Chittagong">Khulshi Office - Chittagong</div>
                        <div data-value="Saidpur Office - Saidpur">Saidpur Office - Saidpur</div>
                        <div data-value="Sandwip Office - Chittagong">Sandwip Office - Chittagong</div>
                        <div data-value="Seabeach Office - Coxs Bazar">Seabeach Office - Coxs Bazar</div>
                        <div data-value="Singapore Office - Singapore">Singapore Office - Singapore</div>
                        <div data-value="Studio Office - Chittagong">Studio Office - Chittagong</div>
                        <div data-value="Sylhet Office - Sylhet">Sylhet Office - Sylhet</div>
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


            document.getElementById('fnd_bf_customer') && document.getElementById('fnd_bf_customer').addEventListener('click',async ()=>{
                let inputValue = document.getElementById('id_mobile')?.value.trim();

                inputValue = inputValue.replace(/[^0-9]/g, '');


                try {
                    await fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=bfclfind&typ=id&v=2&no=${encodeURIComponent(inputValue)}`)
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



            // location code
            document.getElementById("dropdown").addEventListener("click", () => {
                console.log('clicked')
                dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
            });
            document.getElementById("dropdownList").addEventListener("click", (event) => {
                if (event.target.dataset.value) {
                    dropdown.textContent = event.target.textContent;
                    c_location = event.target.dataset.value;                    
                    dropdownList.style.display = "none";
                }
            });
            

            // service code
            document.getElementById('service_dropdown').addEventListener('click',()=>{
                service_dropdownList.style.display = service_dropdownList.style.display === 'block' ? 'none' : 'block';
            })
            document.getElementById('service_dropdownList').addEventListener('click',(event)=>{
                if(event.target.dataset.value){
                    service_dropdown.textContent = event.target.textContent;
                    c_service = event.target.dataset.value;
                    service_dropdownList.style.display = 'none';
                }
            })

            // manage display/hide if click outside scroll area
            document.addEventListener("click", (event) => {

                if (document.getElementById('dropdown') && document.getElementById('dropdownList') && !dropdown.contains(event.target) && !dropdownList.contains(event.target)) {
                    dropdownList.style.display = "none";
                }


                if (document.getElementById('service_dropdown') && document.getElementById('service_dropdownList') && !service_dropdown.contains(event.target) && !service_dropdownList.contains(event.target)) {
                    service_dropdownList.style.display = "none";
                }
            });


            document.getElementById('service').addEventListener('change',(event)=>{
                c_service = event.target.value
            });

            document.getElementById('submit').addEventListener('click',()=>{
                const paymentMode = document.querySelector('input[name="mode"]:checked');
                const selectedMode = paymentMode ? paymentMode.value : null;
                let amount = document.getElementById('amount').value

                // Validate and convert amount to an integer
                if (!/^\d+$/.test(amount)) {
                    Swal.fire("Please enter a valid amount!");
                    return;
                }

                amount = parseInt(amount, 10); // Convert to integer
                
                const fields = {
                    "User Name missing!":       !c_name,
                    "User ID missing!":         !c_number ,
                    "Please Enter Amount!":     !amount,
                    "Please Select Currency!":  !c_currency,
                    "Please Select Mode!":      !selectedMode,
                    "Please Select Location!":  !c_location,
                    
                    "Please Select Service!":   !c_service
                };

                if(!validateFields(fields)) return


                const url = `${rootUrl}/xapi/emp_com.ashx?cmd=savebfmrnew&imei=${imei}&cusid=${c_number}&mramnt=${amount}&mrmode=${selectedMode}&mrcurr=${c_currency}&mrcoord=&mrloca=${c_location}&serv=${c_service}`
                
                try {
                    fetchData(url)
                        .then((res)=>{
                            // "Success | MR Posted|khaled277|"
                            
                            const result = res.split("|").map(item => item.trim().replace(/^"|"$/g, "")); // Trim whitespace from all parts
                            
                            if (result[0] === "Success") {
                                document.getElementById('darkOverlay').style.display = 'block';
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
                                    document.getElementById('darkOverlay').style.display = 'none';
                                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                                });
                            } 
                            else
                            {
                                document.getElementById('darkOverlay').style.display = 'block';
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
                                    document.getElementById('darkOverlay').style.display = 'none';
                                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                                });
                            }
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                } catch (error) {
                    
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
                left:10px;
                right:10px;
                display:flex;
                align-items:center;
                height:40px;
                flex-direction:row;

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

function report(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
        <div class="report_nav_button" id="report_nav_button">
            <button class="entry" id="entry">ENTRY</button>
            <button class="view" id="view">VIEW</button>
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
        <div id="pass_table" class="pass_table"></div>
    `
    main.insertAdjacentHTML("beforeend",html);

    document.getElementById('main').style.height = `${Math.floor(Number(100 - (pxToVh(document.getElementById('nav_div').offsetHeight) + 1)))}vh`;

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
    // get_pass_arr_time", airlinesName, locationName, btnDate1
    // const api = `${rootUrl}/xapi/emp_com.ashx?cmd=get_pass_arr_time&fl_nm=&rt=${}&dt=${endDatePickerInput.elementName.value}`

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
                        <option value="BIMAN">BIMAN</option>
                    </select>
                </div>
                 <div class="location" id="location">
                    <label>LOCATION</label>
                    <select>
                        <option value="DAC - CGP">DAC - CGP</option>
                        <option value="CXB - CGP">CXB - CGP</option>
                    </select>
                </div>
                <button id="pass_arrival_submit" class="pass_arrival_submit" type="submit">SEARCH</button>
            `
            content.insertAdjacentHTML('beforeend',html);
        

            const startDatePickerInput = handleDateAndTime('fromDate');
           

            document.getElementById('date').appendChild(startDatePickerInput.elementName);
            content.style.cssText=``;


            document.getElementById('pass_arrival_submit').addEventListener('click',()=>{
                const airlineSelect = document.querySelector('#airlines select'); 
                const locationSelect = document.querySelector('#location select');

                const selectedAirline = airlineSelect.value;
                const selectedLocation = locationSelect.value;
                const selectedDate = startDatePickerInput.elementName.value 
               

                fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=get_pass_arr_time&fl_nm=${selectedAirline}&rt=${selectedLocation}&dt=${selectedDate}`)
                    .then((res)=>{
                        return typeof res === 'string' ? JSON.parse(res) : res;
                    })
                    .then((data)=>{
                       
                        if (data.status) {
                            const result = data.Data;
                            const tableContainer = document.getElementById("pass_table");
                        
                            // Clear previous content before appending new data
                            tableContainer.innerHTML = "";
                        
                            // Create the table structure once
                            let tableHTML = `
                                <table border="1" style="width: 99%; border-collapse: collapse;margin:auto;margin-top:5px">
                                    <thead style="height:30px">
                                        <tr style="height:30px">
                                            <th>Flight</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                            `;
                        
                            // Append rows dynamically
                            result.forEach((flight) => {
                                const tm = flight.Arrival_Time.split(',');
                                tableHTML += `
                                    <tr style="height:30px">
                                        <td style="padding-left:5px">${flight.Airlines} ${flight.FlightNo}</td>
                                        <td style="text-align:center">${tm[1] || "N/A"}</td>
                                    </tr>
                                `;
                            });
                        
                            // Close the table tag
                            tableHTML += `
                                    </tbody>
                                </table>
                            `;
                        
                            // Append final tableHTML to pass_table
                            tableContainer.innerHTML = tableHTML;
                        }
                        
                    })
                    .catch((error)=>{
                        console.log(error)
                    })

            });

        }else if(button.id === tag && button.id === 'departure'){
            const content = document.getElementById('passenger_content');
            const table = document.getElementById('pass_table')
            content.innerHTML = "";
            table.innerHTML = "";
            const html =`
                <p>Work On Progress</p>
            `
            content.insertAdjacentHTML('beforeend',html);
            
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
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
        <div class="performance_nav_button" id="performance_nav_button">
            <button class="performance" id="performance">PERFORMANCE</button>
            <button class="dues" id="dues">DUES</button>
        </div>
        <div class="performance_content" id="performance_content"></div>
    `
    main.insertAdjacentHTML("beforeend",html); 
    
    document.getElementById('main').style.height = `${Math.floor(Number(100 - (pxToVh(
        document.getElementById('nav_div').offsetHeight
    ) + 1)))}vh`;

    document.getElementById('performance_content').style.cssText = `
        height:${Math.floor(Number(100 - (pxToVh(
            document.getElementById('nav_div').offsetHeight + 
            document.getElementById('performance_nav_button').offsetHeight 
        ) + 2)))}vh;
        display:flex;
        flex-direction:column;
    `


    const buttons =  document.getElementById('performance_nav_button').querySelectorAll('button')
    if(buttons){
        buttons.forEach((button,index)=>{
            button.addEventListener('click',()=>{
                
                manageBusinessPerformance(button.id,buttons)
            })
        })
    }
    manageBusinessPerformance('performance',buttons);


    
}

function manageBusinessPerformance(tag,buttons = null){
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

        
        if(button.id === tag && button.id === 'performance'){
            const performance_content = document.getElementById('performance_content')
            performance_content.innerHTML = ""

            const html = `
                <div id="date_search" class="date_search">
                    <span id="date" class="date"></span>
                    <button id="src_btn" class="src_btn">SEARCH</button>  
                </div>
                <div id="content" class="content">
                    <span id="table" class="table"></span>
                    <span id="total" class="total">
                     <label>Total : </label>
                     <p>0</p>
                    </span>
                </div>
            `

            performance_content.insertAdjacentHTML('beforeend',html)

            

            const startDatePickerInput = handleDateAndTime('fromDate');
            const endDatePickerInput = handleDateAndTime('toDate');
            

            document.getElementById('date').appendChild(startDatePickerInput.elementName);
            document.getElementById('date').appendChild(endDatePickerInput.elementName);


            document.getElementById('content').style.cssText = `
                flex:1;
                display:flex;
                flex-direction:column;
            `
            document.getElementById('total').style.cssText =`
                height:40px;
            `
            
   
        }else if(button.id === tag && button.id === 'dues'){
            const performance_content = document.getElementById('performance_content')
            performance_content.innerHTML = ""

            const html = `
                <div id="acc_type" class="acc_type">
                    <label>ACCOUNT TYPE</label>
                    <div id="acc_type_dropdown" class="acc_type_dropdown">Select</div>
                    <div id="acc_type_dropdownList" class="acc_type_dropdownList">
                        <div data-value="All">ALL</div>
                        <div data-value="Broker">Broker</div>
                        <div data-value="Corporate">Corporate</div>
                        <div data-value="Individual">Individual</div>
                        <div data-value="Travel Agent">Travel Agent</div>
                    </div>
                </div>
                <div id="date_search" class="date_search">
                    <span id="date" class="date"></span>
                    <button>SEARCH</button>
                </div>
                <div id="table" class="table">
                    <table border="1" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>ID/Name</th>
                                <th>Credit Limit</th>
                                <th>Dues</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody> 
                    </table>
                </div>
                <div id="footer" class="footer">
                    <label>Total</label>
                    <p id="total_amt" class="total_amt">0</p>
                </div>

            `
            performance_content.insertAdjacentHTML('beforeend',html)

            
           
            const startDatePickerInput = handleDateAndTime('fromDate');
            document.getElementById('date').appendChild(startDatePickerInput.elementName);



            // account type dropdown code
            document.getElementById("acc_type_dropdown").addEventListener("click", () => {
                acc_type_dropdownList.style.display = acc_type_dropdownList.style.display === "block" ? "none" : "block";
            });
            document.getElementById("acc_type_dropdownList").addEventListener("click", (event) => {
                if (event.target.dataset.value) {
                    acc_type_dropdown.textContent = event.target.textContent;
                    c_location = event.target.dataset.value;                    
                    acc_type_dropdownList.style.display = "none";
                }
            });
            // manage display/hide if click outside scroll area
            document.addEventListener("click", (event) => {

                if (document.getElementById('acc_type_dropdown') && document.getElementById('acc_type_dropdownList') && !acc_type_dropdown.contains(event.target) && !acc_type_dropdownList.contains(event.target)) {
                    acc_type_dropdownList.style.display = "none";
                }
            });
            document.getElementById('acc_type_dropdownList').style.cssText = `
                top:${Number(document.getElementById('nav_div').offsetHeight + document.getElementById('performance_nav_button').offsetHeight)}px
            `
        
            
            document.getElementById('table').style.cssText = `
                flex:1;
                display:flex;
                flex-direction:row;
                align-items:flex-start
            `
        }
    }) :"";


}

function validateFields(fields) {
    for (const [message, condition] of Object.entries(fields)) {
        if (condition) return showAlert(message);
    }

    return true;
}




// https://api.ctgshop.com/xapi/emp_com.ashx?cmd=savebfmrnew&imei=70:3A:51:90:39:05&cusid=28850&mramnt=1"&mrmode=cash&mrcurr=BDT&mrcoord=""&mrloca=gec office&serv=amusement


// https://api.ctgshop.com/xapi/emp_com.ashx?cmd=savebfmrnew&imei=70:3A:51:90:39:05&cusid=28850&mramnt=1&mrmode=cash&mrcurr=BDT&mrcoord=&mrloca=gec office&serv=amusement