

function executeMainInfo(fetchedData){
    document.getElementById('mainInfo').innerHTML = `
        <p>ID: ${inv_id}</p>
        <p>Name: ${fetchedData.Portfolio[0].name}</p>
        <p>Mobile: ${fetchedData.Portfolio[0].mob}</p>
        <p>Email: ${fetchedData.Portfolio[0].email}</p>
    ` 
}
function executeTable1(fetchedData){
    document.getElementById('table1').innerHTML = `
        <div class="dataRow">
            <div class="left">
                <p>Ledger Balance</p>
            </div>
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].Ledger}</p>
            </div>
        </div>
        <div class="dataRow">
            <div class="left">
                <p>Available Balance</p>
            </div> 
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].pur_lim}</p>
            </div>
        </div>
        <div class="dataRow">
            <div class="left">
                <p>IPO Balance</p>
            </div>
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].ipo_bal}</p>
            </div>
        </div>
        <div class="dataRow">
            <div class="left">
                <p>Total Stock Value</p>
            </div>
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].stk_val}</p>
            </div>
        </div>
    `
}
function executeTable2(fetchedData){
    document.getElementById('table2').innerHTML = `
        <div class="dataRow">
            <div class="left">
                <p>Total Investment</p>
            </div>
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].Investment}</p>
            </div>
        </div>
        <div class="dataRow">
            <div class="left">
                <p>Total Withdrawan</p>
            </div>
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].Withdrawn}</p>
            </div>
        </div>
        <hr>
        <div class="dataRow">
            <div class="left">
                <p>Net Investment</p>
            </div>
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].NetInvestment}</p>
            </div>
        </div>
    `
}
function executeTable3(fetchedData){
    document.getElementById('table3').innerHTML = `
        <div class="dataRow">
            <div class="left">
                <p>Realized Profit/Loss</p>
            </div>
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].Realized}</p>
            </div>
        </div>
        <div class="dataRow">
            <div class="left">
                <p>Unrealized Profit/Loss</p>
            </div>
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].UnRealized}</p>
            </div>
        </div>
        <div class="dataRow">
            <div class="left">
                <p>Total Cash Dividend</p>
            </div>
            <div class="right">
                <p>:</p>
                <p>Tk ${fetchedData.Portfolio[0].cash_dividend}</p>
            </div>
        </div>
    `
}
function executeTable4(data){
    const tableData = data ? data : []
    
    const tableBody = document.getElementById('table4')
    let totalTaka = 0
    tableBody.innerHTML = `
            <table style="height: 100%;">
                <tr>
                    <th>Company</th>
                    <th>Stock<br>Qty</th>
                    <th>Mature<br>Qty</th>
                    <th>Avg<br>Cost</th>
                    <th>Last<br>Price</th>
                    <th>Total<br>Tk</th>
                </tr>
            </table>
            
        `;
        tableData.forEach((data, index) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td style='text-align: left;'>${data.company}</td>
                <td style='text-align: right;'>${data.Stock}</td>
                <td style='text-align: right;'>${data.Mature}</td>
                <td style='text-align: right;'>${data.FIFO}</td>
                <td style='text-align: right;'>${data.LTP}</td>
                <td style='text-align: right;'>${data.Total_Taka}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
            totalTaka = totalTaka + Math.round(Number(data.Total_Taka.replace(/,/g, '')))
        })
        document.getElementById('tableFooter').innerHTML = `<p style="
    text-align: right;padding: 5px;">Total: ${ totalTaka.toLocaleString("en-IN")}</p>`
}