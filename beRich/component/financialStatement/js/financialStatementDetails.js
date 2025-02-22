function executeFinancialStatementTable(data, openingBalance){
    let balance = Number(openingBalance)
    
    const tableData = data ? data : []
    
    // console.log(tableData)
    const tableBody = document.getElementById('finacialStatementDetailsTable')

    tableBody.innerHTML = `
            <table>
                <tr>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
            </table>
        `;
        tableData.forEach((data) => {
            const newRow = document.createElement('tr');
            const newP = document.createElement('tr')
            newP.classList.add('balanceRow')
            newRow.innerHTML = `
                <td>${data.date}</td>
                <td>${data.note}</td>
                <td style='text-align: right;'>${parseFloat(Number(data.debit).toFixed(2)).toLocaleString("en-In") }</td>
                <td style='text-align: right;'>${parseFloat(Number(data.credit).toFixed(2)).toLocaleString("en-In") }</td>
            `;
            balance = balance + Math.round(Number(data.credit)) - Math.round(Number(data.debit))
            newP.innerHTML = `<td style='text-align:right;' colspan='4'>Balance: ${balance.toLocaleString("en-IN")} </td>`
            tableBody.querySelector('tbody').appendChild(newRow);
            newRow.style.backgroundColor = data.color
            if(data.color !== ''){
                const cells = newRow.getElementsByTagName("td");
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.color = "#fff"; 
                }
            }
            tableBody.querySelector('tbody').appendChild(newP);
        })
}
document.getElementById('okBtn').addEventListener('click', async()=>{
    async function executeFunc(){
        const dateFrom = document.getElementById('dateFrom').value
        const dateTo = document.getElementById('dateTo').value
        const fetchedFinasTable = await get_financialStatement(sessionStorage.getItem('invID'), dateFrom, dateTo)
        // console.log(fetchedFinasTable)
        if(fetchedFinasTable.status === true){
            document.getElementById('selectedDateRange').innerText = `: ${dateFrom} To ${dateTo}`
            document.getElementById('selectedOpeningBalance').innerText = `: ${(Number(fetchedFinasTable.OpeningBalance)).toLocaleString('en-IN')}`
            document.getElementById('selectedClosingBlance').innerText = `: ${(Number(fetchedFinasTable.CloBalance)).toLocaleString('en-IN')}`
            executeFinancialStatementTable(fetchedFinasTable.FinancialStatement, fetchedFinasTable.OpeningBalance)
            // portfolioManagerTable.scrollTo({
            //     top: 0,
            //     behavior: 'smooth'
            // });
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
    await executeLoader(executeFunc)
})