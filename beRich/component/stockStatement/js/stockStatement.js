let tempData
let isloaded = false
function handleBtn(btnID){
    switch (btnID) {   
        case "individualStockBtn":
            document.getElementById('individualStockBtn').style.borderBottom = '2px solid #ff0000'
            document.getElementById('individualStockBtn').style.color = '#ff0000'
            document.getElementById('scriptWiseListBtn').style.borderBottom = 'none'
            document.getElementById('scriptWiseListBtn').style.color = '#000'
            document.getElementById('individualStockContent').style.display = 'flex'
            document.getElementById('scriptWiseListContent').style.display = 'none'
            break;
        case "scriptWiseListBtn":
            document.getElementById('scriptWiseListBtn').style.borderBottom = '2px solid #ff0000'
            document.getElementById('scriptWiseListBtn').style.color = '#ff0000'
            document.getElementById('individualStockBtn').style.borderBottom = 'none'
            document.getElementById('individualStockBtn').style.color = '#000'

            document.getElementById('individualStockContent').style.display = 'none'
            document.getElementById('scriptWiseListContent').style.display = 'flex'
            if(!isloaded){
                showInvestorsScriptWise()
                isloaded = true
            }
            
            // if(tempData && tempData.status === false){
            //     executeInvestorsTable()
            //     document.getElementById('popUpOverlay').style.display = 'block'
            //     document.getElementById('popUpDiv').style.display = 'block'
            //     document.getElementById('popUpDiv').innerHTML = `
            //         <div class='popUpHead'>
            //             <h6>Failed</h6>
            //         </div>
            //         <div class='popUpBody'>
            //             <p>${tempData.message}</p>
            //         </div>
            //         <div id='popUpOkBtn' class='popUpFooter'>
            //             <p>OK</p>
            //         </div>
            //     `
            //     document.getElementById('popUpOkBtn').addEventListener('click', ()=>{
            //         document.getElementById('popUpOverlay').style.display = 'none'
            //         document.getElementById('popUpDiv').style.display = 'none'
            //     })
            // }
            break;
    
        default:
            break;
    }
}
function executeindIvidualStockTable(data){
    // console.log(data)
    const tableData = data ? data : []
   
    // const dateFrom = document.getElementById('dateFrom').value
    // const dateTo = document.getElementById('dateTo').value
    const tableBody = document.getElementById('individualStockTable')
    // tableBody.innerHTML = ''
    tableBody.innerHTML = `
            <table>
                <tr>
                    <th>S/N</th>
                    <th>Scrip</th>
                    <th>Stock</th>
                    <th>AvgCost</th>
                    <th>LTP</th>
                    <th>Total</th>
                </tr>
            </table>
        `;
        tableData.forEach((data, index) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${data.Scrip}</td>
                <td style='text-align: right;'>${data.Stock}</td>
                <td style='text-align: right;'>${data.AvgCost}</td>
                <td style='text-align: right;'>${data.LTP}</td>
                <td style='text-align: right;'>${data.Total}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
        })
        
}
function executeInvestorsTable(data){
    // console.log(data)
    const tableData = data ? data : []
    
   
    // const dateFrom = document.getElementById('dateFrom').value
    // const dateTo = document.getElementById('dateTo').value
    const tableBody = document.getElementById('scriptWiseInvestorTable')
    // tableBody.innerHTML = ''
    tableBody.innerHTML = `
            <table>
                <tr>
                    <th>S/N</th>
                    <th>ID/Name</th>
                    <th>Stock</th>
                    <th>Mature</th>
                </tr>
            </table>
        `;
        tableData.forEach((data, index) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${data.ID} ${data['Investor Name']}</td>
                <td style='text-align: right;'>${data.Stock}</td>
                <td style='text-align: right;'>${data.Mature}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
        })
        
}
async function showStockDetails(){
    async function showLoader(){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('loader').style.display = 'block'

    }
    async function hideLoader(){
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('loader').style.display = 'none'
    }
    async function execute(){
        const fetchIndividualyStocks = await get_stk_inv(document.getElementById('selectedClientID').innerText)
    // console.log(fetchIndividualyStocks)
    if(fetchIndividualyStocks.status === true){
        executeindIvidualStockTable(fetchIndividualyStocks.Data)
        // portfolioManagerTable.scrollTo({
        //     top: 0,
        //     behavior: 'smooth'
        // });
    }
    else{
        executeindIvidualStockTable()
        document.getElementById('popUpOverlay').style.display = 'block'
        document.getElementById('popUpDiv').style.display = 'block'
        document.getElementById('popUpDiv').innerHTML = `
            <div class='popUpHead'>
                <h6>Failed</h6>
            </div>
            <div class='popUpBody'>
                <p>${fetchIndividualyStocks.message}</p>
            </div>
            <div id='popUpOkBtn' class='popUpFooter'>
                <p>OK</p>
            </div>
        `
        document.getElementById('popUpOkBtn').addEventListener('click', ()=>{
            document.getElementById('popUpOverlay').style.display = 'none'
            document.getElementById('popUpDiv').style.display = 'none'
        })
        
    }
    }

    await showLoader()
    await execute()
    await hideLoader()
}
async function showInvestorsScriptWise(){
    async function showLoader(){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('loader').style.display = 'block'

    }
    async function hideLoader(){
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('loader').style.display = 'none'
    }
    async function execute(){
        const fetchInvestorsStockWise = await get_scripwise_list(sessionStorage.getItem('name'), document.getElementById('scriptName').value, document.getElementById('asOnDate').value)
        // console.log(fetchInvestorsStockWise)
        if(fetchInvestorsStockWise.status === true){
            executeInvestorsTable(fetchInvestorsStockWise.Data)
        }
        else{
            tempData = fetchInvestorsStockWise
            executeInvestorsTable()
            document.getElementById('popUpOverlay').style.display = 'block'
            document.getElementById('popUpDiv').style.display = 'block'
            document.getElementById('popUpDiv').innerHTML = `
                <div class='popUpHead'>
                    <h6>Failed</h6>
                </div>
                <div class='popUpBody'>
                    <p>${tempData.message}</p>
                </div>
                <div id='popUpOkBtn' class='popUpFooter'>
                    <p>OK</p>
                </div>
            `
            document.getElementById('popUpOkBtn').addEventListener('click', ()=>{
                document.getElementById('popUpOverlay').style.display = 'none'
                document.getElementById('popUpDiv').style.display = 'none'
            })
        }
    }

    await showLoader()
    await execute()
    await hideLoader()
}