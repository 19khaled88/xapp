let MS_tableData = []
// let MS_sortedTableData = null
let companyList =[]
let storedData
let isScriptSelected = false
let filteredList = []

async function fetchSharePriceData(){
    const fetchedMS_tableData = await getSharePrice('Name')
    storedData = fetchedMS_tableData.status === true ? fetchedMS_tableData.CurrentSharePrice : []
    const fetchedData = await getCompanyList()
    MS_tableData = fetchedMS_tableData.status === true ? fetchedMS_tableData.CurrentSharePrice : []
    if(fetchedData.status === true){
        companyList = fetchedData.Data
    }
}

function handleBtn(btnID){
    switch (btnID) {  
        case "sharePriceBtn":
            document.getElementById('sharePriceBtn').style.borderBottom = '2px solid #ff0000'
            document.getElementById('sharePriceBtn').style.color = '#ff0000'
            document.getElementById('watchListBtn').style.borderBottom = 'none'
            document.getElementById('watchListBtn').style.color = '#000'
            document.getElementById('sharePriceContent').style.display = 'flex'
            document.getElementById('watchListContent').style.display = 'none'
            break;
        case "watchListBtn":
            document.getElementById('watchListBtn').style.borderBottom = '2px solid #ff0000'
            document.getElementById('watchListBtn').style.color = '#ff0000'
            document.getElementById('sharePriceBtn').style.borderBottom = 'none'
            document.getElementById('sharePriceBtn').style.color = '#000'

            document.getElementById('sharePriceContent').style.display = 'none'
            document.getElementById('watchListContent').style.display = 'flex'
            renderWatchTable()
            break;
    
        default:
            break;
    }
}
async function renderOptions(){
    const fetchedData = await getSectorList()
    // console.log(fetchedData)
    
    const sortData = ['Name', 'Price', 'Change', 'Volume']
    const selectElement = document.getElementById('MS_selectType')
    const selectElement2 = document.getElementById('MS_selectSector')
    const selectElement3 = document.getElementById('MS_selectSort')
    if(fetchedData.status === true){
        fetchedData.Type.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item.Title;
            selectElement.appendChild(option)
        })
        fetchedData.sectorList.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item.sector;
            selectElement2.appendChild(option)
        })
        sortData.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item;
            selectElement3.appendChild(option)
        })
    }
}
async function renderMS_table(data){
    
    let dataArray = data ? data : MS_tableData
    // console.log(data)
    const tableBody = document.getElementById('MS_table')
    tableBody.innerHTML =
     `
        <table>
            <tr>
                <th>Company</th>
                <th>LTP</th>
                <th>YCP</th>
                <th>+/-</th>
            </tr>
        </table>
        
    `;
    dataArray.forEach(data => {
        const newRow = document.createElement('tr');
        newRow.classList.add('MS_sharePrice')
        newRow.innerHTML = `
            <td style='text-align: left;'>${data.symbol}</td>
            <td>${parseFloat(data.ltp).toLocaleString("en-IN")}</td>
            <td>${parseFloat(data.ycp).toLocaleString("en-IN")}</td>
            <td>${parseFloat(data.change).toLocaleString("en-IN")}</td>
        `;
        tableBody.querySelector('tbody').appendChild(newRow);
        newRow.style.backgroundColor =parseFloat(data.change) >= 0 ? (parseFloat(data.change) > 0 ? '#04A41E' : '#fff' ): '#FE0000'
        if(parseFloat(data.change) !== 0){
            const cells = newRow.getElementsByTagName("td");
            for (let i = 0; i < cells.length; i++) {
                cells[i].style.color = "#fff"; 
            }
        }
        // newRow.addEventListener('click', handleClick(data.symbol))
        });
}
async function renderWatchTable(){
    const tableBody = document.getElementById('watchListTable')
    const addedScript = JSON.parse(localStorage.getItem('companyList')) || [];
    // console.log(addedScript)
    // console.log(typeof(addedScript))
    const filteredData = storedData.filter(item => addedScript.some(script => script === item.symbol));

    // console.log(filteredData)
    tableBody.innerHTML =
     `
        <table>
            <tr>
                <th>Company</th>
                <th>LTP</th>
                <th>YCP</th>
                <th>+/-</th>
                <th>Remove</th>
            </tr>
        </table>
        
    `;
    filteredData.forEach(data => {
        const newRow = document.createElement('tr');
        newRow.classList.add('MS_sharePrice')
        newRow.innerHTML = `
            <td style='text-align: left;'>${data.symbol}</td>
            <td>${parseFloat(data.ltp).toLocaleString("en-IN")}</td>
            <td>${parseFloat(data.ycp).toLocaleString("en-IN")}</td>
            <td>${parseFloat(data.change).toLocaleString("en-IN")}</td>
            <td id='${data.symbol}' style='text-align: center;'><img style="width: 20px; height:auto" src="../../images/delete.png" alt="Remove"></td>
        `;
        tableBody.querySelector('tbody').appendChild(newRow);
        newRow.style.backgroundColor =parseFloat(data.change) >= 0 ? (parseFloat(data.change) > 0 ? '#04A41E' : '#fff' ): '#FE0000'
        if(parseFloat(data.change) !== 0){
            const cells = newRow.getElementsByTagName("td");
            for (let i = 0; i < cells.length; i++) {
                cells[i].style.color = "#fff"; 
            }
        }
        // newRow.addEventListener('click', handleClick(data.symbol))
        document.getElementById(`${data.symbol}`).addEventListener('click', async ()=>{
            
            document.getElementById('popUpOverlay').style.display = 'block'
            document.getElementById('popUpDiv').style.display = 'block'
            document.getElementById('popUpDiv').innerHTML = `
                <div class='popUpHead'>
                    <h6>Alert</h6>
                </div>
                <div class='popUpBody'>
                    <p>Are you sure to remove this script - ${data.symbol}?</p>
                </div>
                <div class='popUpFooter2'>
                    <div id='popUpCancelBtn'><p>CANCEL</p></div>
                    <div id='popUpOkBtn2'><p>OK</p></div>
                </div>
            `
            document.getElementById('popUpCancelBtn').addEventListener('click', ()=>{
                document.getElementById('popUpOverlay').style.display = 'none'
                document.getElementById('popUpDiv').style.display = 'none'
            })
            document.getElementById('popUpOkBtn2').addEventListener('click', ()=>{
                const companyList = JSON.parse(localStorage.getItem('companyList')) || [];
                const stringToRemove = data.symbol;

                const index = companyList.indexOf(stringToRemove);
                if (index !== -1) {
                    companyList.splice(index, 1);
                }
                localStorage.setItem('companyList', JSON.stringify(companyList));
                document.getElementById('popUpOverlay').style.display = 'none'
                document.getElementById('popUpDiv').style.display = 'none'
                renderWatchTable();
            })

        })
    });
}

document.getElementById('MS_selectSort').addEventListener('change', filter)
document.getElementById('MS_selectSector').addEventListener('change', filter)
document.getElementById('MS_selectType').addEventListener('change', filter)
async function filter(event){
    async function showLoader(){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('loader').style.display = 'block'

    }
    async function hideLoader(){
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('loader').style.display = 'none'
    }
    async function executeBtn(){
        let type = document.getElementById('MS_selectType').value
        let sort = document.getElementById('MS_selectSort').value
        let sector = document.getElementById('MS_selectSector').value
        let searchBox = document.getElementById('searchSharePrice').value

        const sortData = sort === 'Select Sort' ? 'Name' : sort
        const typeData = type === 'CSE Shariah Shares' ? '1' : ''
        const sectorData = sector === 'Select Sector' ? '' : sector;

        const fetchedData = await getSharePrice(sortData)
        if(fetchedData.status === true){
            filteredList = fetchedData.CurrentSharePrice
        }
        
        if(typeData !== ''){
            filteredList = filteredList.filter(function(item) {
                return item.shariah === '1';
            })
        }
        
        if(sectorData !== ''){
            filteredList = filteredList.filter(function(item) {
                return item.category === sectorData;
            })
        }
        // console.log(filteredData)
        renderMS_table(filteredList)
    }
    await showLoader()
    await executeBtn()
    await hideLoader()
    
}
function search(){
    const inputedValue = document.getElementById('searchSharePrice').value.toLowerCase()
    const tableBody = document.getElementById('MS_table')
    tempData = filteredList.length !== 0 ? filteredList : MS_tableData
    
    const existList = document.querySelectorAll('.MS_sharePrice');
    if(existList){
        existList.forEach(item => {
            item.remove();
        });
    } 

    tempData.forEach(data =>{
        const symbol = data.symbol.toLowerCase()
        if(symbol.includes(inputedValue)){
            const newRow = document.createElement('tr');
            newRow.classList.add('MS_sharePrice')
            newRow.innerHTML = `
                <td style='text-align: left;'>${data.symbol}</td>
                <td>${parseFloat(data.ltp).toLocaleString("en-IN")}</td>
                <td>${parseFloat(data.ycp).toLocaleString("en-IN")}</td>
                <td>${data.change}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
            newRow.style.backgroundColor =parseFloat(data.change) >= 0 ? (parseFloat(data.change) > 0 ? '#04A41E' : '#fff' ): '#FE0000';
            if(parseFloat(data.change) !== 0){
                const cells = newRow.getElementsByTagName("td");
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.color = "#fff"; 
                }
            }
            // newRow.addEventListener('click', handleClick(data.symbol))
        }
    })
}
document.getElementById('searchSharePrice').addEventListener('input', search )

document.getElementById('MS_Reload').addEventListener('click', async () => {
    filter()
    search()
})
document.getElementById('searchCompany').addEventListener('click', async () => {
    document.getElementById('popUpOverlay').style.display = 'block'
    const existList = document.querySelectorAll('.allCompanyListItem');
    if(existList){
        existList.forEach(item => {
            item.remove();
        });
    }
    document.getElementById('allCompanyList').style.display = 'block'
    const setWidth = document.getElementById('searchCompany').offsetWidth
    document.getElementById('allCompanyList').style.width = setWidth+'px'
    companyList.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = item.Company
        listItem.id = item.Company
        listItem.classList.add('allCompanyListItem')
        listItem.addEventListener('click', handleListItemClick);
        document.getElementById('allCompanyList').appendChild(listItem)
    });
    document.getElementById('popUpOverlay').addEventListener('click', ()=>{
        document.getElementById('allCompanyList').style.display = 'none'
        document.getElementById('popUpOverlay').style.display = 'none'
    })
})
document.getElementById('searchCompany').addEventListener('input', async () => {
    const existList = document.querySelectorAll('.allCompanyListItem');
    if(existList){
        existList.forEach(item => {
            item.remove();
        });
    } 
    document.getElementById('allCompanyList').style.display = 'block'
    const setWidth = document.getElementById('searchCompany').offsetWidth
    document.getElementById('allCompanyList').style.width = setWidth+'px'

    const inputValue = document.getElementById('searchCompany').value;
    companyList.forEach(item => {
        const companyName = item.Company.toLowerCase();
        if (companyName.includes(inputValue.toLowerCase()) && inputValue !== '') {
            const listItem = document.createElement('li');
            listItem.innerHTML = item.Company
            listItem.id = item.Company
            listItem.classList.add('allCompanyListItem')
            listItem.addEventListener('click', handleListItemClick);
            document.getElementById('allCompanyList').appendChild(listItem)
        }
        if(inputValue === ''){
            const listItem = document.createElement('li');
            listItem.innerHTML = item.Company
            listItem.id = item.Company
            listItem.classList.add('allCompanyListItem')
            listItem.addEventListener('click', handleListItemClick);
            document.getElementById('allCompanyList').appendChild(listItem)
        }
    });
});
async function handleListItemClick(event) {
    let companyName = event.target.textContent ;

    const allCompanyList = document.getElementById('allCompanyList');
    allCompanyList.innerHTML = '';
    allCompanyList.style.display = 'none'
    document.getElementById('popUpOverlay').style.display = 'none'
    document.getElementById('searchCompany').value = companyName
    isScriptSelected = true
    
}
document.getElementById('addBtn').addEventListener('click', ()=>{
    const selectedScript = document.getElementById('searchCompany').value
    let companyList = JSON.parse(localStorage.getItem('companyList')) || [];
    if(isScriptSelected){
        // Check if the value already exists in the array
        if (!companyList.includes(selectedScript)) {
            const filteredData = storedData.filter(item => selectedScript === item.symbol)
            // console.log(filteredData)
            if(filteredData.length !== 0){
                // Add the value to the array
                companyList.push(selectedScript);
                // Save the updated array back to local storage
                localStorage.setItem('companyList', JSON.stringify(companyList));
            }
            else{
                document.getElementById('popUpOverlay').style.display = 'block'
                document.getElementById('popUpDiv').style.display = 'block'
                document.getElementById('popUpDiv').innerHTML = `
                    <div class='popUpHead'>
                        <h6>Alert</h6>
                    </div>
                    <div class='popUpBody'>
                        <p>${selectedScript} is not available in Current Share Price table.</p>
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
            

            // Clear the input box
            document.getElementById('searchCompany').value = '';
        } else {
            document.getElementById('popUpOverlay').style.display = 'block'
            document.getElementById('popUpDiv').style.display = 'block'
            document.getElementById('popUpDiv').innerHTML = `
                <div class='popUpHead'>
                    <h6>Alert</h6>
                </div>
                <div class='popUpBody'>
                    <p>${selectedScript} is already added your watchlist.</p>
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
        isScriptSelected = false;
        // console.log(companyList); 
    }else{
        document.getElementById('popUpOverlay').style.display = 'block'
        document.getElementById('popUpDiv').style.display = 'block'
        document.getElementById('popUpDiv').innerHTML = `
            <div class='popUpHead'>
                <h6>Alert</h6>
            </div>
            <div class='popUpBody'>
                <p>Please slect a script please.</p>
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
    renderWatchTable()
    
})
document.getElementById('refreshBox').addEventListener('click', async()=>{
    async function showLoader(){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('loader').style.display = 'block'

    }
    async function hideLoader(){
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('loader').style.display = 'none'
    }
    async function executeBtn(){
        const fetchedMS_tableData = await getSharePrice('Name')
        storedData = fetchedMS_tableData.status === true ? fetchedMS_tableData.CurrentSharePrice : []
        renderWatchTable()
    }
    await showLoader()
    await executeBtn()
    await hideLoader()
})


