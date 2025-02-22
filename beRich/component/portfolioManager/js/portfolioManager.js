function handleBtn(btnID){
    switch (btnID) {  
        case "tradePortfolioManagrWiseBtn":
            document.getElementById('tradePortfolioManagrWiseBtn').style.borderBottom = '2px solid #ff0000'
            document.getElementById('tradePortfolioManagrWiseBtn').style.color = '#ff0000'
            document.getElementById('tradePortfolioManagrWiseViewBtn').style.borderBottom = 'none'
            document.getElementById('tradePortfolioManagrWiseViewBtn').style.color = '#000'
            document.getElementById('tradePortfolioManagrWiseContent').style.display = 'flex'
            document.getElementById('tradePortfolioManagrWiseViewContent').style.display = 'none'
            break;
        case "tradePortfolioManagrWiseViewBtn":
            document.getElementById('tradePortfolioManagrWiseViewBtn').style.borderBottom = '2px solid #ff0000'
            document.getElementById('tradePortfolioManagrWiseViewBtn').style.color = '#ff0000'
            document.getElementById('tradePortfolioManagrWiseBtn').style.borderBottom = 'none'
            document.getElementById('tradePortfolioManagrWiseBtn').style.color = '#000'

            document.getElementById('tradePortfolioManagrWiseContent').style.display = 'none'
            document.getElementById('tradePortfolioManagrWiseViewContent').style.display = 'flex'

            break;
    
        default:
            break;
    }
}
function executeTradeTable(data){
    const tableData = data ? data : []
    // const dateFrom = document.getElementById('dateFrom').value
    // const dateTo = document.getElementById('dateTo').value
    const tableBody = document.getElementById('portfolioManagerTable')
    let totalTaka = 0
    tableBody.innerHTML = `
            <table>
                <tr>
                    <th>S/N</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Trade Value</th>
                </tr>
            </table>
            <div class='tableFooter'></div>
        `;
        tableData.forEach((data, index) => {
            const newRow = document.createElement('tr');
            const newP = document.createElement('tr')
            newP.classList.add('balanceRow')
    
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${data.invid}</td>
                <td style='text-align: left;'>${data.invname}</td>
                <td style='text-align: right;'>${data.trdTaka}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
            totalTaka = totalTaka + Math.round(Number(data.trdTaka.replace(/,/g, '')))
        })
        document.getElementById('portfolioManagerTableTotalTaka').innerText = `Total: ${ totalTaka.toLocaleString("en-IN")}`
}
function executeAllInvestorTable(data){
    const tableData = data ? data : []
    // console.log(tableData)
    const tableBody = document.getElementById('allInvestorTable')

    tableBody.innerHTML = `
            <table>
                <tr>
                    <th>S/N</th>
                    <th>ID</th>
                    <th style='width: 10%;'>Name</th>
                    <th>Mobile</th>
                    <th>Mail</th>
                </tr>
            </table>
            <div class='tableFooter'></div>
        `;
        tableData.forEach((data, index) => {
            const newRow = document.createElement('tr');
            const newP = document.createElement('tr')
            newP.classList.add('balanceRow')
    
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${data.invid}</td>
                <td style='text-align: left;width: 10%; overflow-wrap: break-word;'>${data.invname}</td>
                <td style='text-align: right; overflow-wrap: anywhere;'>${data.phone}</td>
                <td style='text-align: right;'>${data.email}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
        })
}
document.getElementById('okBtn').addEventListener('click', async ()=>{
    async function showLoader(){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('loader').style.display = 'block'

    }
    async function hideLoader(){
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('loader').style.display = 'none'
    }
    async function executeBtn(){
        const dateFrom = document.getElementById('dateFrom').value
        const dateTo = document.getElementById('dateTo').value 
        const exch = document.getElementById('exchange').value 
        const typ = 'All' 
        
        const fetchData = await getAllTrade_portfolioManagerWise(dateFrom, dateTo, exch, typ)
        // console.log(fetchData)
        if(fetchData.success === true){
            executeTradeTable(fetchData.data)
            portfolioManagerTable.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        else{
            document.getElementById('popUpOverlay').style.display = 'block'
            document.getElementById('popUpDiv').style.display = 'block'
            document.getElementById('popUpDiv').innerHTML = `
                <div class='popUpHead'>
                    <h6>Failed</h6>
                </div>
                <div class='popUpBody'>
                    <p>${fetchData.message}</p>
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
    await executeBtn()
    await hideLoader()
    
})