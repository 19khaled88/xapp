
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
    const url = `https://www.condomshopbd.com/xapi/emp_com.ashx?cmd=bfclbn&typ=id&no=" + strcusID + "&dt1=" + strDate1 + "&dt2=" + strDate2 + ""`
    const main = document.getElementById('amy_main');

    main.innerHTML = '';
    const html =`
        <div class="date_range" id="date_range">
        </div>
        <div class="search" id="search">
            <input id="client_mobile" type="tel"  placeholder="ENTER ID/Number" pattern="[0-9]{10,15}" maxlength="15" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
            <button id="amy_cl_leg" class="amy_cl_leg">SEARCH</button>
        </div>
                
    `
    main.insertAdjacentHTML("beforeend",html)


    const startDatePickerInput = handleDateAndTime('fromDate');
    const endDatePickerInput = handleDateAndTime('toDate');

    

    document.getElementById('date_range').appendChild(startDatePickerInput.elementName)
    document.getElementById('date_range').appendChild(endDatePickerInput.elementName)
   

    
    // document.getElementById('amy_main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`

    document.getElementById('amy_cl_leg').addEventListener("click",()=>{
        const cusID = document.getElementById('client_mobile').value
        
        if(!cusID && cusID.length === 0){
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
           
            fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=bfclbn&typ=id&no=${cusID}&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}`)
                .then((res)=>{
                    console.log(res)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
        
    })
}

function clientBalance(){
    const url  = `https://www.condomshopbd.com/xapi/emp_com.ashx?cmd=bfcdues&dt1=&imei=1662203027792`
    const main = document.getElementById('amy_main');

    main.innerHTML = '';
    const html =`
        <div class="balance_date_range" id="balance_date_range">
          <div class="date" id="date"></div>
          <button id="amy_cl_bal" class="amy_cl_bal">OK</button>
        </div>
        <span class="current_date" id="current_date"></span>
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
            <p class="dues_amt" id="dues_amt">0</p>
        </span>
                
    `
    main.insertAdjacentHTML("beforeend",html)


    const startDatePickerInput = handleDateAndTime('fromDate');
    

    document.getElementById('date').appendChild(startDatePickerInput.elementName)
   
    if(startDatePickerInput.elementName.value){
        document.getElementById('current_date').textContent = `As On : ${startDatePickerInput.elementName.value}`
    }
    

    document.getElementById('amy_cl_bal').addEventListener('click',()=>{
        document.getElementById('current_date').textContent = `As On : ${startDatePickerInput.elementName.value}`

        fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=bfcdues&dt1=${startDatePickerInput.elementName.value}&imei=${imei}`)
            .then((res)=>{
                if (typeof res === "string") return res; // Handle string response
                if (res.text) return res.text(); // Handle fetch() response
                throw new Error("Unexpected response format");
            }) // Read response as text
            .then((text)=>{
                if(!text.includes('Invalid Account Manager')){
                    const parts = text.split('|');
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

                    document.getElementById('current_date').innerHTML = `As On : ${date}`;

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
                
            })
            .catch((error)=>{
                console.log(error)
            })
    });
    
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
        let c_name; let c_number;  let c_location; let c_currency;


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
                <button class="amy_cl_fnd" id="amy_cl_fnd">FIND</button>
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
                <div id="amy_dropdown" class="amy_dropdown">Select Location</div>
                <div id="amy_dropdownList" class="amy_dropdownList">
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

            <div class="pay_type" id="pay_type">
                <label>Pay Type</label>
                <div>
                    <span>
                        <input type="radio" id="regular" name="type" value="regular" checked>
                        <label for="regular">Regular</label>   
                    </span>     
                    <span>
                        <input type="radio" id="partial" name="type" value="partial">
                        <label for="partial">Partial</label>
                    </span>
                </div>
            </div>
            <button type="submit" id="submit">SUBMIT</button>
            `
            content.insertAdjacentHTML("beforeend",html);


            // document.getElementById('amy_main').style.height = `${Math.floor(Number(100 - pxToVh(document.getElementById('nav_div').offsetHeight)))}vh`;


            // location code
            document.getElementById('amy_dropdown').addEventListener('click',()=>{
                amy_dropdownList.style.display = amy_dropdownList.style.display === 'block' ? 'none' : 'block';
            });
            document.getElementById('amy_dropdownList').addEventListener('click',(event)=>{
                if(event.target.dataset.value){
                    amy_dropdown.textContent = event.target.textContent;
                    c_location = event.target.dataset.value;
                    amy_dropdownList.style.display = 'none';
                }
            });

            // manage display/hide if click outside scroll area
            document.addEventListener("click", (event) => {
                if (document.getElementById('amy_dropdown') && document.getElementById('amy_dropdownList') && !amy_dropdown.contains(event.target) && !amy_dropdownList.contains(event.target)) {
                    amy_dropdownList.style.display = "none";
                }
            });

            document.getElementById('amy_cl_fnd') && document.getElementById('amy_cl_fnd').addEventListener('click',async()=>{
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
            })

            document.getElementById('submit').addEventListener('click',()=>{
                const paymentMode = document.querySelector('input[name="mode"]:checked');
                const selectedMode = paymentMode ? paymentMode.value : null;
                const paymentType = document.querySelector('input[name="type"]:checked');
                const selectedType = paymentType ? paymentType.value : null;
                let amount = document.getElementById('amount').value;

                 // Validate and convert amount to an integer
                 if (!/^\d+$/.test(amount)) {
                    Swal.fire("Please enter a valid amount!");
                    return;
                }

                amount = parseInt(amount, 10); // Convert to integer

                const fields = {
                    "User Name Missing!":       !c_name,
                    "User ID Missing!":         !c_number ,
                    "Please Enter Amount!":     !amount,
                    "Please Select Currency!":  !c_currency,
                    "Please Select Pay Mode!":  !selectedMode,
                    "Please Select Location!":  !c_location,
                    "Please Select Pay Type!":  !selectedType
                };

                if(!validateFields(fields)) return

                const url = `${rootUrl}/xapi/emp_com.ashx?cmd=savebfmrnew&imei=${imei}&cusid=${c_number}&mramnt=${amount}&mrmode=${selectedMode}&mrcurr=${c_currency}&mrcoord=&mrloca=${c_location}&serv=${selectedType}`
                try {
                    fetchData(url)
                        .then((res)=>{
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

                        })
                } catch (error) {
                    
                }
            })

        }
        else if(button.id === tag && button.id === 'view')
        {
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
                flex:1
                    
            `;

            // document.getElementById('view_total').style.cssText = `
            //     position:fixed;
            //     bottom:0;
            //     left:0;
            //     right:0;

            // `
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

                                // sort based on date
                                remainingElements.sort((a,b)=>{
                                    const dateA = new Date(a.split('=')[0]);
                                    const dateB = new Date(b.split('=')[0]);

                                    return dateA - dateB;
                                })

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

function validateFields(fields) {
    for (const [message, condition] of Object.entries(fields)) {
        if (condition) return showAlert(message);
    }

    return true;
}