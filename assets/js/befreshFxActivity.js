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


    // switch statement
    if(page_title){
        switch(page_title){
            case "BeFreshFX View":
                transactionView();
                break;
            default:
               transactionEntry(); 
        }
    }
    
    const back_button_handle = document.getElementById('bfx_btn')
    back_button_handle && back_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/pages/BefreshFx.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}&imei=${imei}`
    });


    const back_home_button_handle = document.getElementById('bfx_home_btn');
    back_home_button_handle && back_home_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/index.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}`
    })
})

function transactionEntry(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
        <div id="traDate" class="traDate">
            <label>Transaction Date</label>
            <div id="date" class="date"></div>
        </div>
        <div id="traType" class="traType">
            <label>Transaction Type</label>
            <div id="type_dropdown" class="type_dropdown">Select Type</div>
            <div id="type_dropdownList" class="type_dropdownList">
                <div data-value="BUY">BUY</div>
                <div data-value="SELL">SELL</div>
                <div data-value="ENDORSEMENT">ENDORSEMENT</div>
                <div data-value="PROFIT WIDTHDRAWN">PROFIT WIDTHDRAWN</div>
                <div data-value="DEPOSIT">DEPOSIT</div>
                <div data-value="WIDTHDRAWN">WIDTHDRAWN</div>
                <div data-value="CAPITAL INVESTMENT">CAPITAL INVESTMENT</div>
                <div data-value="CAPITAL WIDTHDRAWN">CAPITAL WIDTHDRAWN</div>
                <div data-value="Fx Service Charge">Fx Service Charge</div>
            </div>
        </div>
        <div id="curName" class="curName">
            <label>Currency Name</label>
            <div id="cur_dropdown" class="cur_dropdown">Choose Currency</div>
            <div id="cur_dropdownList" class="cur_dropdownList">
                
            </div>
        </div>
        <div id="cusId" class="cusId">
            <label>Customer ID</label>
            <div>
                <input id="id_mobile" class="id_mobile" type="tel"  placeholder="CustomerID" pattern="[0-9]{10,15}"  oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                <button id="fx_fnd_cus" class="fx_fnd_cus">FIND</button>
            </div>
        </div>
        <div id="cusName" class="cusName">
            <label>Customer Name</label>
            <input type="text" id="c_name" placeholder="Customer name"/>
        </div>
        <div id="curQuantity" class="curQuantity">
            <label>Currency Quantity</label>
            <input id="c_qunatity" class="c_qunatity" type="tel"  placeholder="Currency quantity" pattern="[0-9]{10,15}"  oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
        </div>
          <div id="curRate" class="curRate">
            <label>Currency Rate</label>
            <input id="c_rate" class="c_rate" type="tel"  placeholder="Currency rate" pattern="[0-9]{10,15}"  oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
        </div>
        <div id="note" class="note">
            <label>Note (If Applicable)</label>
            <input type="text" id="c_note" placeholder="Note"/>
        </div>
        <button id="fx_entry_submit" class="fx_entry_submit">SUBMIT</button>
    `
    main.insertAdjacentHTML("beforeend",html)


    const startDatePickerInput = handleDateAndTime('fromDate');
   
    // Transaction type select option 
    document.getElementById("type_dropdown").addEventListener("click", () => {
        type_dropdownList.style.display = type_dropdownList.style.display === "block" ? "none" : "block";
        type_dropdownList.style.top = type_dropdownList.style.display === "block" ? 
        `${(
            document.getElementById('nav_div').offsetHeight + 
            document.getElementById('traDate').offsetHeight +
            document.getElementById('traType').offsetHeight +
            10
        )}px` : "";
    });
    document.getElementById("type_dropdownList").addEventListener("click", (event) => {
        if (event.target.dataset.value) {
            type_dropdown.textContent = event.target.textContent;
            // c_location = event.target.dataset.value;                    
            type_dropdownList.style.display = "none";
            
        }
        const selectedValue = event.target.dataset.value;


        manageTraTypeDropdown(selectedValue)
    });

    // Currency select option 
    document.getElementById("cur_dropdown").addEventListener("click", () => {
        cur_dropdownList.style.display = cur_dropdownList.style.display === "block" ? "none" : "block";
        cur_dropdownList.style.top = cur_dropdownList.style.display === "block" ? 
        `${(
            document.getElementById('nav_div').offsetHeight + 
            document.getElementById('traDate').offsetHeight +
            document.getElementById('traType').offsetHeight +
            document.getElementById('curName').offsetHeight +
            15
        )}px` : "";
    });
    document.getElementById("cur_dropdownList").addEventListener("click", (event) => {
        if (event.target.dataset.value) {
            cur_dropdown.textContent = event.target.textContent;
            // c_location = event.target.dataset.value;                    
            cur_dropdownList.style.display = "none";
            
        }
        
    });

    // manage display/hide if click outside scroll area
    document.addEventListener("click", (event) => {

        if (document.getElementById('type_dropdown') && document.getElementById('type_dropdownList') && !type_dropdown.contains(event.target) && !type_dropdownList.contains(event.target)) {
            type_dropdownList.style.display = "none";
        }

        if (document.getElementById('cur_dropdown') && document.getElementById('cur_dropdownList') && !cur_dropdown.contains(event.target) && !cur_dropdownList.contains(event.target)) {
            cur_dropdownList.style.display = "none";
        }

    });

    document.getElementById('date').appendChild(startDatePickerInput.elementName);


    document.getElementById('cur_dropdown').addEventListener('click',()=>{
        fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=befreshFxCurlist`)
        .then((res)=>{
            const cur_data = JSON.parse(res);

            const dropdownList = document.getElementById('cur_dropdownList');
            dropdownList.innerHTML = ''; // Clear old entries

            if(cur_data.success === true && cur_data.befreshfx.length > 0){
                cur_data.befreshfx.forEach((cur,index)=>{
                    const option = document.createElement('div');
                    option.setAttribute('data-value', cur.name); // Set value as currency name
                    option.setAttribute('data-code', cur.code);   // Optional: store the currency code too
                    option.textContent = cur.name;
                    dropdownList.appendChild(option);
                })
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    });
    
    document.getElementById('fx_fnd_cus').addEventListener('click',()=>{
        let mobileInputValue = document.getElementById('id_mobile').value;

       
        if(mobileInputValue){
            fetchData(`${rootUrl}/xapi/emp_com.ashx?cmd=semeJsCf&key=${mobileInputValue}`)
                .then((res)=>{
                    if(res.success === true){
                        
                        // res.befreshfx.forEach((cus)=>{
                            
                            
                        //     if(cus.id !== mobileInputValue){
                        //         document.getElementById('darkOverlay').style.display = 'block';
                        //         document.body.classList.add('transparent');
                        //         Swal.fire({
                        //             icon: "warning",
                        //             title: `ID not found!`,
                        //             showConfirmButton: false,
                        //             showCloseButton: true,
                        //             customClass: {
                        //                 popup: 'swal2-alert-custom-smallscreen'
                        //             },
                        //         })
                        //         .then(() => {
                        //             document.getElementById('darkOverlay').style.display = 'none';
                        //             document.body.classList.remove('transparent'); // Remove class to allow scrolling
                        //         });
                        //     }else{
                        //         console.log(cus.name,cus.id)
                        //     }
                        // })
                        const exists = res.befreshfx.some(cus => Number(cus.id) === mobileInputValue)
                        console.log(exists)
                    }else{
                        document.body.classList.add('transparent');
                        Swal.fire({
                            icon: "warning",
                            title: `Data not found!`,
                            showConfirmButton: false,
                            showCloseButton: true,
                            customClass: {
                                popup: 'swal2-alert-custom-smallscreen'
                            },
                        })
                        .then(() => {
                            document.getElementById('darkOverlay').style.display = 'none';
                            document.body.classList.remove('transparent'); // Remove class to allow scrolling
                        });
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })


        }else{
            // document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                icon: "warning",
                title: `ID is empty!`,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                },
            })
            .then(() => {
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
        }
        
    });

    const defaultOption = document.querySelector('#type_dropdownList [data-value="BUY"]');
    if(defaultOption){
        document.getElementById('type_dropdown').textContent = defaultOption.textContent
    }

   
    
}

function transactionView(){
    const main = document.getElementById('main');

    main.innerHTML = '';

    const html = `
                <div class="date_range" id="date_range">
                    <div class="date" id="date">
                    </div>
                  <button id="bf_view_btn" class="bf_view_btn">OK</button>
                </div>
                <span id="as_on" class="as_on"> </span>
                <div id="content" class="content"></div>
            `
    main.insertAdjacentHTML("beforeend",html)


    const startDatePickerInput = handleDateAndTime('fromDate');
    const endDatePickerInput = handleDateAndTime('toDate');

    
    document.getElementById('date').appendChild(startDatePickerInput.elementName);
    document.getElementById('date').appendChild(endDatePickerInput.elementName);

    document.getElementById('as_on').textContent = `Date :${startDatePickerInput.elementName.value} - ${endDatePickerInput.elementName.value}`
    document.getElementById('main').style.cssText = `
        flex:1;
        display:flex;
        flex-direction:column;

    `
    document.getElementById('content').style.cssText = `
        flex:1;
        max-height:${Math.floor(Number(100 - (pxToVh(
            document.getElementById('nav_div').offsetHeight + 
            document.getElementById('date_range').offsetHeight +
            document.getElementById('as_on').offsetHeight 
        ) + 4)))}vh;
    `

    document.getElementById('bf_view_btn').addEventListener('click',()=>{
        manageTransactionView(`${rootUrl}/xapi/emp_com.ashx?cmd=TranAll&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}`);
        document.getElementById('as_on').textContent = `Date :${startDatePickerInput.elementName.value} - ${endDatePickerInput.elementName.value}`
    })

    manageTransactionView(`${rootUrl}/xapi/emp_com.ashx?cmd=TranAll&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}`);
}

function manageTransactionView(url){ 
    const loading = document.getElementById('darkOverlay')
    loading.style.display = 'flex';
    fetchData(url)
        .then((res)=>{
            // Parse JSON
            let transactions = JSON.parse(res);

            
            if(transactions.length === 0){
                // document.getElementById('darkOverlay').style.display = 'block';
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.add('transparent');
                Swal.fire({
                    icon: "warning",
                    title: `No Data Found!`,
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: {
                        popup: 'swal2-alert-custom-smallscreen'
                    },
                })
                .then(() => {
                    // document.getElementById('darkOverlay').style.display = 'none';
                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
            }
            else if(transactions.length > 0){
                loading.style.display = 'none';
                let contentDiv = document.getElementById("content");
            
                contentDiv.innerHTML = "";
    
                transactions.map((transaction,index)=>{
                    let transactionDiv = document.createElement("div");
                    transactionDiv.style.cssText = `
                        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
                    `
                    transactionDiv.classList.add("transaction-item"); // Optional styling class
                    transactionDiv.innerHTML = `
                        <span><label>SL:</label> <p>${index + 1}</p></span>
                        <span><label>Transaction No:</label> <p>${transaction.TransactionNo}</p></span>
                        <span><label>Date:</label> <p>${transaction.DailyTransactionDate}</p></span>
                        <span><label>Type:</label> <p>${transaction.TransactionType}</p></span>
                        <span><label>Currency:</label> <p>${transaction.CurrencyName}</p></span>
                        <span><label>Amount:</label> <p>${transaction.CurrencyAmount}</p></span>
                        <span><label>Rate:</label> <p>${transaction.Currencyrate}</p></span> 
                    `;
                    contentDiv.appendChild(transactionDiv);

                })
            }

            
        })
        .catch((error)=>{
            console.log(error)
        })

}

function safeGetComputedStyle(element) {
    if (element instanceof Element) {
        return window.getComputedStyle(element);
    } else {
        console.warn("Invalid element passed to getComputedStyle:", element);
        return null; // Return null instead of throwing an error
    }
}

function manageTraTypeDropdown(type){

    // remove   = ['element id name']
    // add      = [{'element id name'}:[label,element name,id,type,placeholder]]

    switch(type){
        case "BUY":
            adjustDynamicField(
                remove = ['costRateBdt','EndrsFee','VisCntr','PassprtQnt'],
                add =[]
            )
            break;
        case "SELL":
            adjustDynamicField(
                remove = ['EndrsFee','VisCntr','PassprtQnt'],
                add =[{'costRateBdt':['Cost Rate in BDT','input','costRateBdt','tel','Enter Cost rate in BDT']}]
            )            
            break;
        case "ENDORSEMENT":
            adjustDynamicField(
                remove = ['costRateBdt'],
                add =[
                    {'EndrsFee':['Endorsement Fee','input','EndrsFee','text','Enter endorsement fee']},
                    {'VisCntr':['Visiting Country','input','VisCntr','text','Enter visiting country ']},
                    {'PassprtQnt':['Passport Qty','input','PassprtQnt','text','Enter Passport Quantity']}
                ]
            )
            break;
        case "PROFIT WIDTHDRAWN":
            adjustDynamicField(
                remove = ['costRateBdt','EndrsFee','VisCntr','PassprtQnt'],
                add =[]
            )
            break;
        case "DEPOSIT":
            adjustDynamicField(
                remove = ['costRateBdt','EndrsFee','VisCntr','PassprtQnt'],
                add =[]
            )
            break;
        case "WIDTHDRAWN":
            adjustDynamicField(
                remove = ['costRateBdt','EndrsFee','VisCntr','PassprtQnt'],
                add =[]
            )
            break;
        case "CAPITAL INVESTMENT":
            adjustDynamicField(
                remove = ['costRateBdt','EndrsFee','VisCntr','PassprtQnt'],
                add =[]
            )
            break;
        case "CAPITAL WIDTHDRAWN":
            adjustDynamicField(
                remove = ['costRateBdt','EndrsFee','VisCntr','PassprtQnt'],
                add =[]
            )
            break;
        default: 
            adjustDynamicField(
                remove = ['costRateBdt','EndrsFee','VisCntr','PassprtQnt'],
                add =[]
            )
    }
}


function adjustDynamicField(remove=[],add=[]) {
    
    // 1. Remove specified divs
    remove.forEach(id=>{
        const elem = document.getElementById(id);
        if(elem){
            elem.remove();
        }
    });

    // 2. Add new fields 
    add.forEach(fieldObj=>{
        for(const key in fieldObj){
            const [labelText, elemType, id, inputType, placeholder] = fieldObj[key];

            // skip if already exists 
            if(document.getElementById(id)) return;

            // create wrapper div 
            const wrapper = document.createElement('div');
            wrapper.id = id;
            wrapper.className = id; 

            // create label 
            const label = document.createElement('label');
            label.textContent = labelText; 

            // create input or any other element type 
            const input = document.createElement(elemType);
            input.id = id;
            input.className = id;
            input.placeholder = placeholder;
            input.type = inputType; 

            // Optional: input pattern if tel
            if (inputType === 'tel') {
                input.pattern = '[0-9]{10,15}';
                input.setAttribute('oninput', "this.value = this.value.replace(/[^0-9]/g, '')");
            }

            // append to wrapper 
            wrapper.appendChild(label);
            wrapper.appendChild(input);

            // Append at a specific position
            const noteDiv = document.getElementById('note');
            if (noteDiv && noteDiv.parentNode) {
                noteDiv.parentNode.insertBefore(wrapper, noteDiv);
            } 
        }
    });
    
}
