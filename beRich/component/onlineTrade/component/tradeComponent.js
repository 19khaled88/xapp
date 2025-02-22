
async function executeTrade(data){
    let selectedScriptData = data
    let companyList =[]
    let stock_ticker_dataCSE = []
    let stock_ticker_dataDSE = []
    let tradeHour = {}
    let cse_buySellData = []
    let fetchedCse_buySellData = {}
    let fetchedDse_buySellData = {}
    let dse_buySellData = []
    let scriptInfo = {}
    let activeBuy = false
    let activeSell = false
    let fetchedClientDetails = {}
    let availableShare = 0
    let availableFund
    let openOrderData = []
    // let exchange = user.exch
    let exchange = 'CSE' // temp

    const tradePageLogin = await Post_LOGIN_({
        CMND: "_LOGIN_",
        tid: exchange === 'DSE' ? 137: 447,
        // inv_id: user.inv_id, 
        inv_id: 28, //temp
        // inv_pass: user.ngts_pass2, 
        inv_pass: 'dfgdfgerheagdfgaeryqeygabavWGAWGARWEG', 
        force: "0",
        cid : device === 'android' ? 100 : 101
    })
    // console.log(tradePageLogin)
    if(tradePageLogin.success === true){
        tradeHour = await get_THOUR_()
    }
    

    async function handleListItemClick(event, tickerValue) {
        async function showLoader(){
            document.getElementById('overlay').style.animation = 'none'
            document.getElementById('overlay').style.display = 'block'
            document.getElementById('popupDiv').style.display = 'block'
            document.getElementById('popupDiv').style.backgroundColor = 'unset'
            document.getElementById('popupDiv').innerHTML = `
                <img style='width: 75px; heigt: auto;' src='../../../images/Cube@1x-1.0s-200px-200px.gif' alt='Loading'>
            `
        }
        async function executeSscriptData(){
        let companyName
        if(event){
            companyName = event.target.textContent;
            selectedScriptData = event.target.textContent;
        }
        if(tickerValue){
            companyName = tickerValue;
            selectedScriptData = tickerValue;
        }
        selectedScriptData = companyName || selectedScriptData;
        const allCompanyList = document.getElementById('allCompanyList');
        allCompanyList.innerHTML = '';
        allCompanyList.style.display = 'none'
        document.getElementById('searchCompany').value = selectedScriptData

        if(selectedScriptData !== undefined){
            fetchedCse_buySellData = await get_OFFER_(selectedScriptData)
            if(fetchedCse_buySellData.success === true){
                cse_buySellData = fetchedCse_buySellData.Offers
            }
            fetchedDse_buySellData = await get_OFFERD_(selectedScriptData)
            if(fetchedDse_buySellData.success === true){
                dse_buySellData = fetchedDse_buySellData.Offers
            }
            scriptInfo = await get_SCRIPINFO_(selectedScriptData)
            
            if(cse_buySellData !== null){
                renderCseContent()
            }
            if(dse_buySellData !== null){
                renderDseContent()
            }
            renderBuyContent()
            renderSellContent()
            document.getElementById('showScriptInfo').style.display = 'block'
            renderSelectedStockBox()
            if(fetchedClientDetails.success === true){
                renderOperOrder()
            }
        }
        }
        async function hideLoader(){
            document.getElementById('popupDiv').style.backgroundColor = '#e9ecef'
            document.getElementById('overlay').style.display = 'none'
            document.getElementById('popupDiv').style.display = 'none'
            document.getElementById('popupDiv').innerHTML = ''
        }
        await showLoader()
        await executeSscriptData(event)
        await hideLoader()
        
    }
    function handlePopUpMessage(heading, errorMessage, case_name){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('popupDiv').style.display = 'block'
        document.getElementById('popupDiv').innerHTML= `
            <h5>${heading}</h5>
            <p>${errorMessage}</p>
            <div><p id='invalidLoginCancel'>OK</p></div> 
        `
        document.getElementById('invalidLoginCancel').addEventListener('click', hidepopupDiv)
        document.getElementById('overlay').addEventListener('click', hidepopupDiv)
        function hidepopupDiv(){
            document.getElementById('overlay').style.display = 'none'
            document.getElementById('popupDiv').style.display = 'none'
            if (case_name){
                window.location.href = window.location.origin
                // updateFooterBtnState('case_name');
                // route(`../component/${case_name}Component.js`,`../css/${case_name}Component.css`,`${case_name}`)
            }
        }
    }
    function handleTradeBtn(case_name){
        return function(event){
            if(selectedScriptData || case_name === 'TP_halted' || case_name === 'TP_stockStatus' || case_name === 'TP_todayTrade' || case_name === 'TP_marketMover'){
                route(`../component/${case_name}Component.js`, `../css/${case_name}Component.css`, case_name, selectedScriptData);
            }else{
                const heading = 'Information'
                const errorMessage = 'Please Select a Company'
                handlePopUpMessage(heading, errorMessage)
            } 
        }   
    }

    function trade(){
        document.getElementById('mainContentSection').innerHTML = `
            <div id='popupDiv' style='display:none;'></div>
            <div id='confirmBuy' style='display:none;'></div>
            <div id='confirmSell' style='display:none;'></div>
            <div id='confirmModify' style='display:none;'></div>
            <div id='modifyOrder' style='display:none;'></div>
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Trade</h1>
                </div>
            </div>

            <div class="stock_ticker_box">
                <div class="scrolling-content" id="scrolling-content">
                    <div id="tradeMarqueeContainer"></div>
                </div>
            </div>

            <!-- <div class="marketScheduale" id="marketScheduale"></div>-->

            <div class='container'>
                <div class="tradeSearchBox" id="tradeSearchBox"></div>
            </div>

            <div class="container">
                <div class="box">
                    <div class="tradeAllBtnBox" id="tradeAllBtnBox">
                        <div id='TP_companyInfo' class="singleBtn">COMP INFO</div>
                        <div id='TP_news' class="singleBtn">NEWS</div>
                        <div style='background-color: #73737366; color: #ffffff87;' id='TP_priceAlert' class="singleBtn">PRICE ALERT</div>
                        <div id='TP_lastTrade' class="singleBtn">LAST TRADES</div>
                        <div id='TP_dividend' class="singleBtn">DIVIDEND</div>
                        <div id='TP_rateHistory' class="singleBtn">RATE HISTORY</div>
                        <div id='TP_todayTrade' class="singleBtn">ALL TRADES</div>
                        <div id='TP_fundStatus' class="singleBtn">FUND STATUS</div> 
                        <div id='TP_marketMover' class="singleBtn">MKT MOVER</div>                     
                        <div id='TP_stockStatus' class="singleBtn">STK STATUS</div>                      
                        <div id='TP_halted' class="singleBtn">HALTED COMP</div>
                        <div style='background-color: #73737366; color: #ffffff87;' id='TP_favourit' class="singleBtn">FAVOURITES</div>
                    </div>
                </div>
            </div>
            <div class="selectedStockSection">
                <div class= "container">
                    <div style='display:none;' id='showScriptInfo' class= "box">
                        <div class="selectedStockBox" id="selectedStockBox"></div>
                    </div>
                </div>
            </div>

            <div class="mainTradeSection">
                <div class= "container">
                    <div class= "box">
                        <div class="btnGroup" id="btnGroup">
                            <div onclick="show('cseContent')" class="Btn active" id="cse">CSE</div>
                            <div onclick="show('dseContent')" class="Btn" id="dse">DSE</div>
                        </div>
                        <div class="buyerSeller">
                            <h3>Buyer</h3>
                            <h3>Seller</h3>
                        </div>
                        <div class="buySellData">
                            <div style='display: flex; flex-direction: column; min-height:390px;' class="ipoContent" id="cseContent">cse</div>
                            <div style='display: none; flex-direction: column; min-height:390px;' class="ipoContent" id="dseContent">dse</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="buySellSection">
                <div class= "container">
                    <div class= "box">
                        <div class="btnGroup" id="btnGroup">
                            <div  class="Btn" id="buy">BUY</div>
                            <div  class="Btn" id="sell">SELL</div>
                        </div>
                        <div class="buySellOrder">
                            <div style='display: block;' class="ipoContent" id="buyContent"></div>
                            <div style='display: none;' class="ipoContent" id="sellContent"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="openOrderSection" style='flex: 1 auto'>
                <div class= "container">
                    <div class= "box">
                        <div id='openOrderContent'></div>
                    </div>
                </div>
            </div>

            <div style='display: none;' class="fundStatusBox" id="fundStatusBox"></div>
        `
        
        document.getElementById('TP_companyInfo').addEventListener('click', handleTradeBtn('companyInfo'))
        document.getElementById('TP_dividend').addEventListener('click', handleTradeBtn('TP_dividend'))
        document.getElementById('TP_halted').addEventListener('click', handleTradeBtn('TP_halted'))
        document.getElementById('TP_lastTrade').addEventListener('click', handleTradeBtn('TP_lastTrade'))
        document.getElementById('TP_marketMover').addEventListener('click', handleTradeBtn('TP_marketMover'))
        document.getElementById('TP_news').addEventListener('click', handleTradeBtn('TP_news'))
        document.getElementById('TP_rateHistory').addEventListener('click', handleTradeBtn('TP_rateHistory'))
        document.getElementById('TP_stockStatus').addEventListener('click', handleTradeBtn('TP_stockStatus'))
        document.getElementById('TP_todayTrade').addEventListener('click', handleTradeBtn('TP_todayTrade'))
        document.getElementById('TP_fundStatus').addEventListener('click', ()=>{
            document.getElementById('fundStatusBox').style.display = 'block'
            document.getElementById('overlay').style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
        // document.getElementById('TP_priceAlert').addEventListener('click', handleTradeBtn('TP_priceAlert'))
        // document.getElementById('TP_favourit').addEventListener('click', handleTradeBtn('TP_favourit'))

        document.getElementById('buy').addEventListener('click', render('buyContent'))
        document.getElementById('sell').addEventListener('click', render('sellContent'))

        function render(content){
            return function(event){
                document.getElementById('buyContent').style.display = 'none'
                document.getElementById('sellContent').style.display = 'none'
    
                document.getElementById(content).style.display = 'block'
    
                updateButton(content)
            }
        }
        function updateButton(activeButton) {
            activeBuy = false
            activeSell = false
            if(activeButton === 'buyContent'){
                document.getElementById('buy').style.backgroundColor = '#4CB050'
                document.getElementById('buy').style.color = '#fff'
                document.getElementById('buyOrderSubmit').style.backgroundColor = '#4CB050'
                document.getElementById('buyOrderSubmit').style.color = '#fff'
                document.getElementById('sell').style.backgroundColor = '#868686'
                document.getElementById('sell').style.color = '#000'
                activeBuy = true
            }
            if(activeButton === 'sellContent'){
                document.getElementById('sell').style.backgroundColor = '#FE0000'
                document.getElementById('sell').style.color = '#fff'
                document.getElementById('sellOrderSubmit').style.color = '#fff'
                document.getElementById('sellOrderSubmit').style.backgroundColor = '#FE0000'
                document.getElementById('buy').style.backgroundColor = '#868686'
                document.getElementById('buy').style.color = '#000'
                activeSell = true
            }
        }

    }







    function renderStockTicker(){
        const stockTickerBody = document.getElementById('tradeMarqueeContainer')
        stockTickerBody.innerHTML = `
        <div class="w3-container  w3-border" style="margin: 5 5px;  padding: 1px; background-color:rgb(0, 0, 0);">
        <div class="d-flex">
          <div class="marqP" id="dvMarq"
            style="display: none; background-color: black; overflow: hidden; padding-top: 1px"></div>
          <div style="display:none; margin:auto"><img src="../../images/cse_logo.jpg" class="logolg" style="height: 30px;width: 30px;border-width: 0;border-radius: 2px;" /></div>
        </div>
        <div class="d-flex">
          <div class="marqPD" id="dvMarqD"
            style="display: none; background-color: black; overflow: hidden; padding-top: 1px"></div>
          <div style="display:none; margin:auto"><img src="../../images/dse_logo.jpg" class="logolg" style="height: 30px;width: 30px;border-width: 0;border-radius: 2px;"/></div>
        </div>
        <table id="ifmTick" cellspacing="0" style="color: White; width: 100%">
          <tr>
            <td style="width:10%;" id="s1"></td>
            <td style="width:10%;" id="s2"></td>
            <td style="width:10%;" id="s3"></td>
            <td style="width:10%;" id="s4"></td>
           
            <td style="width:1%; text-align:right"><img style="width:30px" src="../../images/cse_logo.jpg" class="logolg" style="height: 30px;width: 30px;border-width: 0;border-radius: 2px;"/></td>
          </tr>
        </table>
        <table id="ifmTickD" cellspacing="0" style="color: White; width: 100%">
          <tr>
            <td style="width:10%;" id="ds1"></td>
            <td style="width:10%;" id="ds2"></td>
            <td style="width:10%;" id="ds3"></td>
            <td style="width:10%;" id="ds4"></td>
           
            <td style="width:1%; text-align:right"><img style="width:30px" src="../../images/dse_logo.jpg" class="logolg" style="height: 30px;width: 30px;border-width: 0;border-radius: 2px;"/></td>
          </tr>
        </table>

      </div>
        `
    }
    function renderMarketScheduale(){
        document.getElementById('marketScheduale').innerHTML=`
            <div class='container'>
                <div class='box'>
                    <div class='marketScheduleBox'>
                        <div class="marketStatus">
                            <p>Market Status</p>
                            <p id="remaining_trade_time">Remaining Trade Time</p>
                        </div>
                        <div class="remaining_time">
                            <h4 id="trade_status"></h4>
                            <h4 id="countdown"></h4>
                        </div>
                    </div>
                </div>
            </div>
        `
        // tradeTimeIntervalId = setInterval(()=>{
        //     updateCountdown();
        // }, 1000); 
    }
    async function updateCountdown() {
        // if(tradeHour.trade === 1 || tradeHour.trade === 0){
        //     stock_ticker_data = await get_TICKER_()
            
        //     renderStockTicker()
        // }
        const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});
        const currentTime = new Date(now);
    
        const dayOfWeek = currentTime.getDay();
        if (dayOfWeek === 5 || dayOfWeek === 6){
            document.getElementById('countdown').innerHTML = 'No trading on Friday and Saturday.';
            document.getElementById('trade_status').innerHTML = `Closed`
            document.getElementById('trade_status').style.color = `red`
            document.getElementById('countdown').style.fontSize = `12px`

            return;
        }
        const targetTime = new Date(currentTime);
        targetTime.setHours(10, 0, 0, 0);
        const targetTime2 = new Date(currentTime);
        targetTime2.setHours(14, 30, 0, 0);
        if (currentTime.getTime() === targetTime.getTime() || currentTime.getTime() === targetTime2.getTime()) {
            tradeHour = await get_THOUR_()
        }

        const tradeStartTime = tradeHour.trade === 0 ? new Date(tradeHour.cntm) : ''
        const tradeEndTime = tradeHour.trade === 1 ? new Date(tradeHour.cntm) : ''
        
        let timeDifference = tradeEndTime - currentTime;
        let beforeTimeDifference = tradeStartTime - currentTime
        // console.log(tradeHour)
        if (new Date(tradeHour.cntm).toISOString().split('T')[0] !== currentTime.toISOString().split('T')[0] && timeDifference < 0) {
            document.getElementById('countdown').innerHTML = 'Trading hours have ended for today.';
            document.getElementById('trade_status').innerHTML = `Closed`
            document.getElementById('trade_status').style.color = `red`
            document.getElementById('countdown').style.fontSize = `12px`

            return;
        }
        if(beforeTimeDifference <= 60 * 60000 && beforeTimeDifference >= 0){

            const hours = Math.floor(beforeTimeDifference / (1000 * 60 * 60));
            beforeTimeDifference %= (1000 * 60 * 60);
        
            const minutes = Math.floor(beforeTimeDifference / (1000 * 60));
            beforeTimeDifference %= (1000 * 60);
        
            const seconds = Math.floor(beforeTimeDifference / 1000);
        
            const countdownText = `${hours}h ${minutes < 10 ? '0' + minutes : minutes}m ${seconds < 10 ? '0' + seconds : seconds}s`;
            document.getElementById('remaining_trade_time').innerHTML = `Trade will be Start in`
            document.getElementById('countdown').innerHTML = countdownText;
            document.getElementById('trade_status').innerHTML = `Closed`
            document.getElementById('trade_status').style.color = `red`

            return
        }
        
        if(beforeTimeDifference > 0){
            document.getElementById('countdown').innerHTML = 'Trading hours will be opened at 10:00am.';
            document.getElementById('trade_status').innerHTML = `Closed`
            document.getElementById('trade_status').style.color = `red`
            document.getElementById('countdown').style.fontSize = `12px`

            return
        }
    
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        timeDifference %= (1000 * 60 * 60);
    
        const minutes = Math.floor(timeDifference / (1000 * 60));
        timeDifference %= (1000 * 60);
       
        const seconds = Math.floor(timeDifference / 1000);
        const countdownText = `${hours}h ${minutes < 10 ? '0' + minutes : minutes}m ${seconds < 10 ? '0' + seconds : seconds}s`;
        document.getElementById('countdown').innerHTML = countdownText;
        document.getElementById('trade_status').innerHTML = `Open`
        document.getElementById('trade_status').style.color = `#0aeb0a`
        document.getElementById('remaining_trade_time').innerHTML = `Remaining Trade Time`
    }
    function renderTradeSearchBox(){
        document.getElementById('tradeSearchBox').innerHTML = `
        <div class="search">
            <input id='searchCompany' type="text" name="searchBox" placeholder="Select Company" value='${selectedScriptData !== undefined ? selectedScriptData : ''}'>
            <ul style='display: none' class='allCompanyList' id='allCompanyList'></ul>
        </div>
        <div class="relaod" id='reloadSearchBox'>
            <img src="../../images/reload.png" alt="reload" style="width: 30px;">
        </div>
        `
        document.getElementById('searchCompany').addEventListener('click', async () => {
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
            
        })
        document.getElementById('searchCompany').addEventListener('input', async () => {
        selectedScriptData = undefined
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
        document.getElementById('reloadSearchBox').addEventListener('click', ()=>{
            if(selectedScriptData !== undefined){
                handleListItemClick()
            }else{
                route('../component/tradeComponent.js', '../css/tradeComponent.css', 'trade')
            }
       })
    });
    }
    function renderSelectedStockBox(){
        document.getElementById('selectedStockBox').innerHTML = `
            <div class="innerCol">
                <h4 id="selectedStockID">${scriptInfo.ID} (${scriptInfo.sCat})</h4>
                <p id="selectedStockName">${scriptInfo.sNam}</p>
            </div>
            <div class="innerCol">
                <h4 id="selectedStockPrice">${scriptInfo.sLTP}</h4>
                <p id="selectedStockChange">TK ${scriptInfo.sChng} (${scriptInfo.sChngP}%)</p>
            </div>
        `
        
        document.getElementById('selectedStockPrice').style.color = `${scriptInfo.sChng >= 0 ? (scriptInfo.sChng > 0 ? '#04A41E' : '#fff') : '#FE0000' }`
        document.getElementById('selectedStockChange').style.color = `${scriptInfo.sChng >= 0 ? (scriptInfo.sChng > 0 ? '#04A41E' : '#fff') : '#FE0000' }`
    }
    function renderCseContent() {
        const tableBody = document.getElementById('cseContent');
        tableBody.innerHTML =
         `
            <div style='flex: 1 auto'>
                <table>
                    <tr>
                        <th>No of<br>Buyer</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>No of<br>Seller</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                </table>
            </div>
            <div id="cseFooter" class="cseFooter"></div>
        `;
    
        cse_buySellData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.BO}</td>
                <td>${data.BQ}</td>
                <td>${data.BP}</td>
                <td>${data.SO}</td>
                <td>${data.SQ}</td>
                <td>${data.SP}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('cseFooter');
       
        tableFooter.innerHTML = `
            <div>
                <div class= "item">
                    <div class="left">
                        <p>Last Trade Price</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.LTP.toLocaleString("en-IN") : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Total Volume</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.TotVolume.toLocaleString("en-IN") : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Day's Low</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.dyLow.toLocaleString("en-IN") : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>YCP</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.YCP.toLocaleString("en-IN") : ''}</p>
                    </div>     
                </div>
            </div>
            <div>
                <div class= "item">
                <div class="left">
                    <p>Last Trade Qty</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.LastQt.toLocaleString("en-IN") : ''}</p>
                </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Total Value</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.TotValue.toLocaleString("en-IN") : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Day's High</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.dyHigh.toLocaleString("en-IN") : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Circuit</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.lowLimit+' - '+fetchedCse_buySellData.upLimit : ''}</p>
                    </div>     
                </div>
            </div>
        `;
    }
    function renderDseContent() {
        const tableBody = document.getElementById('dseContent');
        tableBody.innerHTML =
         `
            <div style='flex: 1 auto'>
                <table>
                    <tr>
                        <th>No of<br>Buyer</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>No of<br>Seller</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                </table>
            </div>
            <div id="dseFooter" class="cseFooter"></div>
        `;
    
        dse_buySellData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.BO}</td>
                <td>${data.BQ}</td>
                <td>${data.BP}</td>
                <td>${data.SO}</td>
                <td>${data.SQ}</td>
                <td>${data.SP}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('dseFooter');
    
        tableFooter.innerHTML = `
        <div>
            <div class= "item">
                <div class="left">
                    <p>Last Trade Price</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.LTP : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Volume</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.TotVolume : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Day's Low</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.dyLow : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>YCP</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.YCP : ''}</p>
                </div>     
            </div>
        </div>
        <div>
            <div class= "item">
            <div class="left">
                <p>Last Trade Qty</p>
                <p>:</p>
            </div>
            <div class="right">
                <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.LastQt : ''}</p>
            </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Value</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.TotValue : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Day's High</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.dyHigh : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Circuit</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.lowLimit+' - '+fetchedDse_buySellData.upLimit : ''}</p>
                </div>     
            </div>
        </div>
        `;
    }
    function renderBuyContent() {
        availableFund = fetchedClientDetails.success === true ? fetchedClientDetails.freeCash : 'invalid'
        document.getElementById('buyContent').innerHTML=`
        <div class="availableFund">
            <p>Available Fund</p>
            <p>Tk ${parseFloat(availableFund).toLocaleString("en-IN")}</p>
        </div>
        <div class="buySellFormContent">
            <form id='buyFormSubmit'>
                <div class="rowForm rowForm-1">
                    <div class="rowItem">
                        <input id="b_marketPrice" type="checkbox" name="marketPrice" >
                        <label for="marketPrice">Market Price</label>
                    </div>
                </div>
                <div class="rowForm">
                    <label for="b_quantity">Quantity</label>
                    <input type="number" id="b_quantity" name="b_quantity" placeholder="Enter Qty" required>
                </div>
                <div class="rowForm">
                    <label for="b_rate">Rate</label>
                    <input type="number" id="b_rate" name="b_rate" placeholder="Enter Rate" step="0.1"  required>
                </div>
                <div class="rowForm">
                    <label for="estimatedTotal">Estimated Taka, You Need</label>
                    <input style='background-color: #98989A !important' type="text" id="estimatedTotal" name="" placeholder="Tk0" required readonly>
                </div>
                <div class="rowForm">   
                    <label for="exchange">Exchange</label>
                    <div class='exchangeBox'>
                        <div class='excahngeItem'>
                            <input type="radio" id="b_cse" name="exchange" value="CSE">
                            <label id="b_cseLabel" for="b_cse">CSE</label>
                        </div>
                        <div class='excahngeItem'>
                            <input type="radio" id="b_dse" name="exchange" value="DSE">
                            <label id="b_dseLabel" for="b_dse">DSE</label>
                        </div>
                    <!-- <div class='excahngeItem'>
                        <input type="radio" id="b_auto" name="exchange" value="Auto">
                        <label id="b_autoLabel" for="b_auto">Auto</label>
                        </div> -->
                    </div>
                </div>
                <div class="orderSubmit">
                    <input type="submit" id="buyOrderSubmit" value="ORDER SUBMIT">
                </div>
            </form>
        </div>
        `
        if(exchange === 'CSE'){
            document.getElementById('b_cse').checked = true;
            document.getElementById('b_dse').disabled = true;
            document.getElementById('b_dseLabel').style.opacity = 0.5;
            // document.getElementById('s_auto').disabled = true;
        }else{
            document.getElementById('b_dse').checked = true;
            document.getElementById('b_cse').disabled = true;
            document.getElementById('b_cseLabel').style.opacity = 0.5;

            // document.getElementById('s_auto').disabled = true;
        }
        function goConfirmBuy(){
            document.getElementById('overlay').style.display = 'block'
            document.getElementById('confirmBuy').style.display = 'block'
            document.getElementById('confirmBuy').innerHTML= `
                <h5>BUY CONFIRMATION</h5>
                <p>
                    <span>Are you sure to BUY ${selectedScriptData}?</span>
                    <br>
                    Quantity: ${document.getElementById('b_quantity').value} @ Rate: ${document.getElementById('b_marketPrice').checked ? 'Market Price' : document.getElementById('b_rate').value }
                </p>
                <div>
                    <p style='background-color: red;' id='cancelBtn'>CLOSE</p>
                    <p style='background-color: #4CB050;' id='buyConfirmBtn'>CONFIRM</p>
                </div> 
            `
            function cancelConfirmBuy(){
                document.getElementById('overlay').style.display = 'none'
                document.getElementById('confirmBuy').style.display = 'none'
            }
            document.getElementById('cancelBtn').addEventListener('click', cancelConfirmBuy)
            document.getElementById('overlay').addEventListener('click', cancelConfirmBuy)
            document.getElementById('buyConfirmBtn').addEventListener('click', async ()=>{
                const buyOrder = await Post_BUYSELL_({
                    CMND: "_BUYSELL_",
                    LMT: "",
                    Scrip: selectedScriptData,
                    Qt: document.getElementById('b_quantity').value,
                    Prc: document.getElementById('b_marketPrice').checked ? '' : document.getElementById('b_rate').value ,
                    BS: "BUY",
                    mktPrc: document.getElementById('b_marketPrice').checked ? 1 : 0,
                    Exch: exchange,
                    GTC: ""
                })
                document.getElementById('confirmBuy').style.display = 'none'
                document.getElementById('overlay').style.display = 'none'
                if(buyOrder.success === true){
                    const heading = 'Success'
                    const errorMessage = 'Order Placed Successfully'
                    const case_name = 'trade'
                    handlePopUpMessage(heading, errorMessage, case_name)
                }else{
                    const heading = 'Failed'
                    const errorMessage = buyOrder.message
                    const case_name = 'trade'
                    handlePopUpMessage(heading, errorMessage, case_name)
                }
            })
        }
        function handleCalcQuantityAndRate(){
            if(document.getElementById('b_quantity').value !== '' && document.getElementById('b_rate').value !== ''){
                document.getElementById('estimatedTotal').value = (Number(document.getElementById('b_quantity').value) * Number(document.getElementById('b_rate').value)).toLocaleString("en-IN")
            }
        }
        document.getElementById('b_quantity').addEventListener('input', handleCalcQuantityAndRate)
        document.getElementById('b_rate').addEventListener('input', handleCalcQuantityAndRate)
        document.getElementById('b_marketPrice').addEventListener('change', function() {
            if(this.checked){
                document.getElementById('b_rate').setAttribute('readonly' , 'true')
                document.getElementById('b_rate').style.backgroundColor = '#98989A'
                document.getElementById('b_rate').value = ''
                document.getElementById('estimatedTotal').setAttribute('readonly' , 'true')
                document.getElementById('estimatedTotal').style.backgroundColor = '#98989A'
                document.getElementById('estimatedTotal').value = ''

            }else{
                document.getElementById('b_rate').removeAttribute('readonly' , 'false')
                document.getElementById('b_rate').style.backgroundColor = 'unset'
                
                // document.getElementById('estimatedTotal').removeAttribute('readonly' , 'false')
                // document.getElementById('estimatedTotal').style.backgroundColor = 'unset'
            }
        })
        document.getElementById('buyFormSubmit').addEventListener('submit', async (event) => {
            event.preventDefault();
            if(activeBuy){
                if(selectedScriptData !== undefined){
                    goConfirmBuy()
                }else{
                    const heading = 'Information'
                    const errorMessage = 'Please Select a Script'
                    handlePopUpMessage(heading, errorMessage)
                }
            }else{
                const heading = 'Informtion'
                const errorMessage = 'Please Select Buy or Sell'
                handlePopUpMessage(heading, errorMessage,)
            }
        })
    }
    function renderSellContent() {
        let isValidToGoConfirmSell = false
        if(fetchedClientDetails.success === true){
            const objData = fetchedClientDetails.Stocks.find(obj => obj.Scrip === selectedScriptData)
            if(objData){
                availableShare = objData.Qt
                isValidToGoConfirmSell = true
            }
        }
        // console.log(typeof(availableShare))
        document.getElementById('sellContent').innerHTML=`
        <div class="availableFund">
            <p>Available Shares</p>
            <p>${availableShare.toLocaleString("en-IN")}</p>
        </div>
        <div class="buySellFormContent">
            <form id="sellFormSubmit">
                <div class="rowForm rowForm-1">
                    <div class="rowItem">
                        <input id="s_marketPrice" type="checkbox" name="s_marketPrice" >
                        <label for="s_marketPrice">Market Price</label>
                    </div>
                    <div class="box">
                        <div>
                            <input id="halfSell" type="radio" name="sellType" value="half">
                            <label for="halfSell">Half</label>
                        </div>
                        <div>
                            <input id="fullSell" type="radio" name="sellType" value="full" >
                            <label for="fullSell">Full</label>
                        </div>
                    </div>
                </div> 
                <div class="rowForm">
                    <label for="s_quantity">Quantity</label>
                    <input type="number" id="s_quantity" name="s_quantity" placeholder="Enter Qty" required>
                </div>
                <div class="rowForm">
                    <label for="s_rate">Rate</label>
                    <input type="number" id="s_rate" name="s_rate" placeholder="Enter Rate" step="0.1"  required>
                </div>
                <div class="rowForm">
                    <label for="sellTotal">Total Taka, You Received</label>
                    <input style='background-color: #98989A !important;' type="text" id="sellTotal" name="sellTotal" placeholder="Tk0" required readonly>
                </div>
                <div class="rowForm">
                    <label for="exchange">Exchange</label>
                    <div class='exchangeBox'>
                        <div class='excahngeItem'>
                            <input type="radio" id="s_cse" name="exchange" value="CSE">
                            <label for="s_cse">CSE</label>
                        </div>
                        <div class='excahngeItem'>
                            <input type="radio" id="s_dse" name="exchange" value="DSE">
                            <label for="s_dse">DSE</label>
                        </div>
                    <!-- <div class='excahngeItem'>
                        <input type="radio" id="s_auto" name="exchange" value="Auto">
                        <label for="s_auto">Auto</label>
                        </div> -->
                    </div>
                </div>
                <div class="orderSubmit">
                    <input type="submit" id="sellOrderSubmit" value="ORDER SUBMIT">
                </div>
            </form>
        </div>
        `
        // console.log(exchange)
        if(exchange === 'CSE'){
            document.getElementById('s_cse').checked = true;
            document.getElementById('s_dse').disabled = true;
            // document.getElementById('s_auto').disabled = true;
        }else{
            document.getElementById('s_dse').checked = true;
            document.getElementById('s_cse').disabled = true;
            // document.getElementById('s_auto').disabled = true;
        }
        function goConfirmSell(){
            document.getElementById('overlay').style.display = 'block'
            document.getElementById('confirmSell').style.display = 'block'
            document.getElementById('confirmSell').innerHTML= `
                <h5>Sell CONFIRMATION</h5>
                <p>
                    <span>Are you sure to Sell ${selectedScriptData}?</span>
                    <br>
                    Quantity: ${document.getElementById('s_quantity').value} @ Rate: ${document.getElementById('s_marketPrice').checked ? 'Market Price' : document.getElementById('s_rate').value }
                </p>
                <div>
                    <p style='background-color: red;' id='cancelBtn'>CLOSE</p>
                    <p style='background-color: #4CB050;' id='sellConfirmBtn'>CONFIRM</p>
                </div> 
            `
            function cancelConfirmSell(){
                document.getElementById('overlay').style.display = 'none'
                document.getElementById('confirmSell').style.display = 'none'
            }
            document.getElementById('cancelBtn').addEventListener('click', cancelConfirmSell)
            document.getElementById('overlay').addEventListener('click', cancelConfirmSell)
            document.getElementById('sellConfirmBtn').addEventListener('click', async ()=>{
                const sellOrder = await Post_BUYSELL_({
                    CMND: "_BUYSELL_",
                    LMT: "",
                    Scrip: selectedScriptData,
                    Qt: document.getElementById('s_quantity').value,
                    Prc: document.getElementById('s_marketPrice').checked ? '' : document.getElementById('s_rate').value ,
                    BS: "SELL",
                    mktPrc: document.getElementById('s_marketPrice').checked ? 1 : 0,
                    Exch: exchange,
                    GTC: "",
                    cid : device === 'android' ? 100 : 101
                })
                console.log(sellOrder)
                document.getElementById('confirmSell').style.display = 'none'
                if(sellOrder.success === true){
                    const heading = 'Success'
                    const errorMessage = 'Order Placed Successfully'
                    const case_name = 'trade'
                    handlePopUpMessage(heading, errorMessage, case_name)
                }else{
                    const heading = 'Failed'
                    const errorMessage = sellOrder.message
                    const case_name = 'trade'
                    handlePopUpMessage(heading, errorMessage, case_name)
                }
            })
        }
        document.querySelectorAll('input[name="sellType"]').forEach(radio => {
            let stockQuantity = availableShare;
            radio.addEventListener('change', function() {
                if (this.value === 'half') {
                    const halfStockQuantity = stockQuantity/2
                    document.getElementById('s_quantity').value = Math.floor(halfStockQuantity)
                    handleCalcQuantityAndRate()
                } else {
                    document.getElementById('s_quantity').value = Math.floor(stockQuantity)
                    handleCalcQuantityAndRate()
                }
            });
        });
        function handleCalcQuantityAndRate(){
            let stockQuantity = availableShare;
            if(stockQuantity !== 0 && (Number(document.getElementById('s_quantity').value) === Math.floor(stockQuantity/2))){
                document.getElementById('halfSell').checked = true;
            }
            else if(stockQuantity !== 0 && (Number(document.getElementById('s_quantity').value) === stockQuantity)){
                document.getElementById('fullSell').checked = true;
            }else{
                document.getElementById('halfSell').checked = false;
                document.getElementById('fullSell').checked = false;
            }
            
            if(document.getElementById('s_quantity').value !== '' && document.getElementById('s_rate').value !== ''){
                document.getElementById('sellTotal').value = (Number(document.getElementById('s_quantity').value) * Number(document.getElementById('s_rate').value)).toLocaleString("en-IN")
            }
        }
        document.getElementById('s_quantity').addEventListener('input', handleCalcQuantityAndRate)
        document.getElementById('s_rate').addEventListener('input', handleCalcQuantityAndRate)
        document.getElementById('s_marketPrice').addEventListener('change', function() {
            if(this.checked){
                document.getElementById('s_rate').setAttribute('readonly' , 'true')
                document.getElementById('s_rate').style.backgroundColor = '#98989A'
                document.getElementById('s_rate').value  = 'Market Price'
                document.getElementById('sellTotal').setAttribute('readonly' , 'true')
                document.getElementById('sellTotal').style.backgroundColor = '#98989A'
                document.getElementById('sellTotal').value = ''
            }else{
                document.getElementById('s_rate').removeAttribute('readonly' , 'false')
                document.getElementById('s_rate').style.backgroundColor = 'unset'
                // document.getElementById('sellTotal').removeAttribute('readonly' , 'false')
                // document.getElementById('sellTotal').style.backgroundColor = 'unset'
            }
        })
        document.getElementById('sellFormSubmit').addEventListener('submit', async (event) => {
            event.preventDefault();
      
            if(selectedScriptData !== undefined){
                if(isValidToGoConfirmSell){
                    goConfirmSell()
                }else{
                    const heading = 'Information'
                    const errorMessage = 'Insufficient Stock'
                    handlePopUpMessage(heading, errorMessage)
                }
            }else{
                const heading = 'Information'
                const errorMessage = 'Please Select a Script'
                handlePopUpMessage(heading, errorMessage)
            }
            
        })
    }
    function renderModifyOrder(selectedOrder){
        // console.log(selectedOrder)
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('modifyOrder').style.display = 'block'
        document.getElementById('modifyOrder').innerHTML= `
            <h5>MODIFY CONFIRMATION</h5>
            <div class='orderModifyBody'>
                <div class='orderModifyRow'>
                    <p>Order</p>
                    <p>${selectedOrder.BS}: ${selectedOrder.Scrip}</p>
                </div>
                <div class='orderModifyRow'>
                    <p>Available Fund</p>
                    <input type='number' name='availableFund_MF' id='availableFund_MF' value=${fetchedClientDetails.freeCash} readonly>
                </div>
                <div class='orderModifyRow'>
                    <p>Quantity</p>
                    <input type='number' name='quantity_MF' id='quantity_MF' value=${selectedOrder.Qt}>
                </div>
                <div class='orderModifyRow'>
                    <p>Rate</p>
                    <input type='number' name='rate_MF' id='rate_MF' value=${selectedOrder.Prc}>
                </div>
                <div class='orderModifyRow'>
                    <p>Total Value</p>
                    <input type='number' name='totalValue_MF' id='totalValue_MF' value=${selectedOrder.Prc * selectedOrder.Qt} readonly>
                </div>
            </div>
            <div>
                <p style='background-color: red;' id='cancelBtn'>CLOSE</p>
                <p style='background-color: #4CB050;' id='modifyConfirmBtn'>CONFIRM</p>
            </div> 
        `
        function handleTotalTaka(){
            if(document.getElementById('quantity_MF').value !== '' && document.getElementById('rate_MF').value !== ''){
                document.getElementById('totalValue_MF').value = Number(document.getElementById('quantity_MF').value) * Number(document.getElementById('rate_MF').value)
            }
        }
        document.getElementById('quantity_MF').addEventListener('input', handleTotalTaka)
        document.getElementById('rate_MF').addEventListener('input', handleTotalTaka)
        document.getElementById('modifyConfirmBtn').addEventListener('click', async ()=>{
            document.getElementById('overlay').style.display = 'none'
            document.getElementById('modifyOrder').style.display = 'none'
            const orderModify = await Post_MODIFY_({
                LMT: "",
                Ref: selectedOrder.Ref,
                Qt: document.getElementById('quantity_MF').value,
                Prc: document.getElementById('rate_MF').value,
                Exch:exchange,
                CMND:"_MODIFY_",
                cid : device === 'android' ? 100 : 101
            })
            // console.log(orderModify)
            if(orderModify.success === true){
                const heading = 'Success'
                const errorMessage = exchange === 'CSE'? 'Order has been successfully modified ' : 'Order has been successfully modified.<br><span style="font-size : 12px"> Please wait a while if you experience any inconvenience</span>';
                handlePopUpMessage(heading, errorMessage, 'trade')
            }else{
                const heading = 'Failed'
                const errorMessage = orderModify.message === ''? 'Modifiaction Failed. Please Try Again' : orderModify.message;
                handlePopUpMessage(heading, errorMessage)
            }
        })
        function cancelModifyBuy(){
            document.getElementById('overlay').style.display = 'none'
            document.getElementById('modifyOrder').style.display = 'none'
        }
        document.getElementById('cancelBtn').addEventListener('click', cancelModifyBuy)
        document.getElementById('overlay').addEventListener('click', cancelModifyBuy)
        
    }
    function renderOperOrder(){
        document.getElementById('openOrderContent').innerHTML=`
            <div class='openOrderHeading'>
                <h3>Open Orders</h3>
            </div>
            <div id='openOrderList'></div>    
        `
        const contentBody = document.getElementById('openOrderList')
        openOrderData.forEach((data, index)=> {
            // console.log(data)
            const newDiv = document.createElement('div');
            newDiv.classList.add('openOrderItem');
            newDiv.innerHTML = `
                <div id='heading${index}' class='openOrderHeading'>
                    <h5>${data.BS}</h5>
                    <div class='script_status'>
                        <h5>${data.Scrip}</h5>
                        <h5>${data.Stat}</h5>
                    </div>
                </div>
                <div class='body'>
                    <div class='openOrderDetails'>
                        <div class='openOrderColumn'>
                            <p>Qty</p>
                            <p>${data.Qt}</p>
                        </div>
                        <div class='openOrderColumn'>
                            <p>Rate</p>
                            <p>${data.Prc}</p>
                        </div>
                    </div>
                    <hr>
                    <div class='openOrderDetails'>
                        <div class='openOrderColumn'>        
                            <p>Exec Qty</p>
                            <p>${data.eQt}</p>
                        </div>
                        <div class='openOrderColumn'>
                            <p>Taka</p>
                            <p>${data.eRt}</p>
                        </div>
                    </div>
                </div>
                <div class='footerBtn'>
                    <div class='openOrderDate'>
                        <p>${data.Dt}</p>
                    </div>
                    <div class='openOrderBtn'>
                        <p class='openOrderCancele' id='openOrderCancele${index}'>CANCEL</p>
                        <p class='openOrderModify' id='openOrderModify${index}'>MODIFY</p>
                    </div>
                </div>
            `
            contentBody.appendChild(newDiv)
            document.getElementById(`openOrderModify${index}`).addEventListener('click', async ()=>{
                renderModifyOrder(data)
            })
            document.getElementById(`openOrderCancele${index}`).addEventListener('click', async ()=>{
                document.getElementById('overlay').style.display = 'block'
                document.getElementById('confirmModify').style.display = 'block'
                document.getElementById('confirmModify').innerHTML= `
                    <h5>CONFIRMATION</h5>
                    <p>
                        <span>Are you sure to cancel the order of ${data.Scrip}?</span>
                    </p>
                    <div>
                        <p style='background-color: red;' id='cancelBtn'>CLOSE</p>
                        <p style='background-color: #4CB050;' id='cancelConfirmBtn'>CONFIRM</p>
                    </div>
                `
                function cancelOrder(){
                    document.getElementById('overlay').style.display = 'none'
                    document.getElementById('confirmModify').style.display = 'none'
                }
                document.getElementById('cancelBtn').addEventListener('click', cancelOrder)
                document.getElementById('overlay').addEventListener('click', cancelOrder)

                document.getElementById('cancelConfirmBtn').addEventListener('click', async ()=>{
                    document.getElementById('overlay').style.display = 'none'
                    document.getElementById('confirmModify').style.display = 'none'
                    const postCancelOrdere = await postOrder_CANCEL_({
                        LMT: "",
                        Ref: data.Ref,
                        Exch: exchange,
                        CMND: "_CANCEL_",
                        cid : device === 'android' ? 100 : 101
                    })
                    // console.log(postCancelOrdere)

                    if(postCancelOrdere.success === true){
                        const heading = 'Success'
                        const errorMessage = exchange === 'CSE'? 'Order has been successfully cancelled' : 'Order has been successfully cancelled.<br><span style="font-size : 12px"> Please wait a while if you experience any inconvenience</span>';
                        handlePopUpMessage(heading, errorMessage, 'trade')
                        // document.getElementById('overlay').style.display = 'none'
                        // document.getElementById('confirmModify').style.display = 'none'
                        // route('../component/tradeComponent.js','../css/tradeComponent.css','trade')
                    }else{
                        const heading = 'Failed'
                        const errorMessage = postCancelOrdere.message === ''? 'Cancelation Failed. Please Try Again' : postCancelOrdere.message;
                        handlePopUpMessage(heading, errorMessage)
                    }
                })

            })
            if(data.Stat === 'CANCELLED'){
                document.getElementById(`heading${index}`).style.backgroundColor = '#120181'
                document.getElementById(`heading${index}`).style.color = '#fff'
                document.getElementById(`openOrderCancele${index}`).style.display = 'none'
                document.getElementById(`openOrderModify${index}`).style.display = 'none'
            }
            if(data.Stat === 'REJECTED'){
                document.getElementById(`heading${index}`).style.backgroundColor = '#120181'
                document.getElementById(`heading${index}`).style.color = '#fff'
                document.getElementById(`openOrderCancele${index}`).style.display = 'none'
                document.getElementById(`openOrderModify${index}`).style.display = 'none'
            }
            if(data.Stat === 'BOUGHT'){
                document.getElementById(`heading${index}`).style.backgroundColor = 'rgb(76, 176, 80)'
                document.getElementById(`heading${index}`).style.color = '#fff'
                document.getElementById(`openOrderCancele${index}`).style.display = 'none'
                document.getElementById(`openOrderModify${index}`).style.display = 'none'
            }
            if(data.Stat === 'SOLD'){
                document.getElementById(`heading${index}`).style.backgroundColor = 'rgb(76, 176, 80)'
                document.getElementById(`heading${index}`).style.color = '#fff'
                document.getElementById(`openOrderCancele${index}`).style.display = 'none'
                document.getElementById(`openOrderModify${index}`).style.display = 'none'
            }
            if(data.Stat === 'SUBMITTED'){
                document.getElementById(`heading${index}`).style.backgroundColor = '#DFE1DC'
                document.getElementById(`heading${index}`).style.color = '#4CB050'
            }
        })
        if(openOrderData.length === 0){
            document.getElementById('openOrderList').innerHTML = `
                <p style='text-align: center;'>No Order Available Now</p>
            `
        }
    }
    function renderFundStatus(){
        document.getElementById('fundStatusBox').innerHTML= `
            <div class="container">
                <div class="box">
                    <div class="head">FUND STATUS</div>
                    <div class="body">
                        <div class="item">
                            <p>Opening Balance</p>
                            <p>${fetchedClientDetails.success === true ? parseInt(fetchedClientDetails.curBalance).toLocaleString("en-IN") : '0'}</p>
                        </div>
                        <div class="item">
                            <p>Net Blocked</p>
                            <p>${fetchedClientDetails.success === true ? parseInt(fetchedClientDetails.blockCash).toLocaleString("en-IN") : '0'}</p>
                        </div>
                        <div class="item">
                            <p>Purchase Limit</p>
                            <p>${fetchedClientDetails.success === true ? parseInt(fetchedClientDetails.freeCash).toLocaleString("en-IN") : '0'}</p>
                        </div>
                    </div>
                    <div id='fundStatusCancel' class="footer">CLOSE</div>
                </div>
            </div>
        `
        document.getElementById('fundStatusCancel').addEventListener('click', ()=>{
            document.getElementById('fundStatusBox').style.display = 'none'
            document.getElementById('overlay').style.display = 'none';
            document.body.style.overflow = 'scroll';
        })
        document.getElementById('overlay').addEventListener('click', ()=>{
            document.getElementById('fundStatusBox').style.display = 'none'
            document.getElementById('overlay').style.display = 'none';
            document.body.style.overflow = 'scroll';
        })
    }

    trade()
    renderStockTicker()
    getTradeTime()
    // renderMarketScheduale()
    // updateCountdown()
    renderTradeSearchBox()
    renderSelectedStockBox()
    renderCseContent()
    renderDseContent()
    renderBuyContent()
    renderSellContent() 
    renderOperOrder()
    renderFundStatus()
    document.getElementById('overlay').style.display = 'none';

    // if(tradePageLogin.success === true){
        sessionStorage.setItem('userData', JSON.stringify(tradePageLogin));

        const fetchedData = await getCompanyList()
        if(fetchedData.status === true){
            companyList = fetchedData.Data
        }
        tradeHour = await get_THOUR_()
        if(tradeHour.trade === 0){
            stock_ticker_dataCSE = await get_TICKER_CSE(data)
            stock_ticker_dataDSE = await get_TICKER_DSE(data)
        }
        fetchedClientDetails = await get_CLIENTDET_()
        // console.log('fetch client details:',fetchedClientDetails)
        if(fetchedClientDetails.success === true){
            openOrderData = fetchedClientDetails.OrderBook
            renderFundStatus()
            renderBuyContent()
            renderOperOrder()
        }
        else{
            const heading = 'Failed'
            const errorMessage = 'This is Under Maintence.' + fetchedClientDetails.message
            handlePopUpMessage(heading, errorMessage, );
        }
    // }else{
    //     const heading = 'Unauthorized Access'
    //     const errorMessage = 'Invalid Password or User ID for Trade Page'
    //     const case_name = 'home'
    //     handlePopUpMessage(heading, errorMessage, case_name)
    // }
         
    if(selectedScriptData !== undefined){
        handleListItemClick()
    }
    // ============ Ticker Function=============//
    // if (tradeHour.trade === 1) {
    // function fillRTTicker(jsnG) {
    //     var jsn = JSON.parse(jsnG);
    //     $.each(jsn, function (i, item) {
    //         if (item.Exch == 'DSE') {
    //             try {
    //                     var Fn = '<tr><td>' + item.CNam + '</td></tr><tr><td>' + item.CVol + ' @ ' + item.CLTP.toFixed(1) + " (" + item.Chng.toFixed(1) + ")</td></tr>";
    //                     var bkcol = "url('../images/icons/BlueBar.png')";
    //                     if (Number(item.Chng) < 0) {
    //                         bkcol = "url('../images/icons/RedBar.png')";
    //                     } else if (Number(item.Chng) > 0) {
    //                         bkcol = "url('../images/icons/GreenBar.png')";
    //                     }
    //                     $('#ds1').html($('#ds2').html());
    //                     $('#ds2').html($('#ds3').html());
    //                     $('#ds3').html($('#ds4').html());
    //                     // $('#ds4').html($('#ds5').html());
    //                     // $('#ds5').html($('#ds6').html());
    //                     // $('#ds6').html($('#ds7').html());
    //                     // $('#ds7').html($('#ds8').html());
    //                     // $('#ds8').html($('#ds9').html());
    //                     // $('#ds9').html($('#ds10').html());
    //                     var Ht = '<table class="tktbl" style="text-align:center; width:100%; font-size:9px; padding:0px 3px; background-image:' + bkcol + '; background-size:cover; cursor:pointer;" onclick="selscrip(\'' + item.CNam + '\');">' + Fn + '</table>';
    //                     $('#ds4').html(Ht);


    //                 } catch (err) {
    //                     console.error("Error in try block:", err);
    //                 }
    //         } else {
    //             try {
    //                     var Fn = '<tr><td>' + item.CNam + '</td></tr><tr><td>' + item.CVol + ' @ ' + item.CLTP.toFixed(1) + " (" + item.Chng.toFixed(1) + ")</td></tr>";
    //                     var bkcol = "url('../images/icons/BlueBar.png')";
    //                     if (Number(item.Chng) < 0) {
    //                         bkcol = "url('../images/icons/RedBar.png')";
    //                     } else if (Number(item.Chng) > 0) {
    //                         bkcol = "url('../images/icons/GreenBar.png')";
    //                     }
    //                     $('#s1').html($('#s2').html());
    //                     $('#s2').html($('#s3').html());
    //                     $('#s3').html($('#s4').html());
    //                     // $('#s4').html($('#s5').html());
    //                     // $('#s5').html($('#s6').html());
    //                     // $('#s6').html($('#s7').html());
    //                     // $('#s7').html($('#s8').html());
    //                     // $('#s8').html($('#s9').html());
    //                     // $('#s9').html($('#s10').html());
    //                     var Ht = '<table class="tktbl" style="text-align:center; width:100%; font-size:9px; padding:0px 3px; background-image:' + bkcol + '; background-size:cover; cursor:pointer;" onclick="selscrip(\'' + item.CNam + '\');">' + Fn + '</table>';
    //                     $('#s4').html(Ht);
    //                 } catch (err) {
    //                     console.error("Error in try block:", err);
    //                 }
                    
    //         }
            
    //     });
        
    // }
    
    // var sgUrl = "https://ticker.berichbd.com:8088/signalr";
    // if (window.location.hostname == 'localhost') {
    //     sgUrl = "http://localhost:8088/signalr";
    // }

    // $.getScript(sgUrl + "/hubs", function () {
    //     $.connection.hub.url = sgUrl;
    //     simpleHubProxy = $.connection.simpleHub;
    //     simpleHubProxy.client.addMessage = function (name, jsnF) {
    //         fillRTTicker(jsnF);
    //     };
    //     $.connection.hub.start().done(function () {
    //         simpleHubProxy.server.setUserName($('#hdus').val());
    //     });
    // });
    // }
    // else{
    //     document.getElementById('ifmTick').style.display = 'none'
    //     document.getElementById('ifmTickD').style.display = 'none'

    //     const offHourTickerCSE = document.getElementById('offHourTickerCSE')
    //     stock_ticker_dataCSE.forEach(item =>{
    //         const newDiv = document.createElement('div')
    //         newDiv.innerHTML = `
    //             <h6>${item.scrip}</h6>
    //             <p>${item.LTP}(${item.Chng})</p>
    //         `
    //         offHourTickerCSE.appendChild(newDiv)
    //         newDiv.style.backgroundImage = "url('../images/icons/BlueBar.png')";
    //         newDiv.style.color = '#fff'
    //         newDiv.style.padding = '0px 3px'
    //         if(item.Chng > 0){
    //             newDiv.style.backgroundImage = "url('../images/icons/GreenBar.png')";
    //         }
    //         if(item.Chng < 0){
    //             newDiv.style.backgroundImage = "url('../images/icons/RedBar.png')";
    //         }
    //     })
    //     const offHourTickerDSE = document.getElementById('offHourTickerDSE')
    //     stock_ticker_dataDSE.forEach(item =>{
    //         const newDiv = document.createElement('div')
    //         newDiv.innerHTML = `
    //             <h6>${item.scrip}</h6>
    //             <p>${item.LTP}(${item.Chng})</p>
    //         `
    //         offHourTickerDSE.appendChild(newDiv)
    //         newDiv.style.backgroundImage = "url('../images/icons/BlueBar.png')";
    //         newDiv.style.color = '#fff'
    //         newDiv.style.padding = '0px 3px'
    //         if(item.Chng > 0){
    //             newDiv.style.backgroundImage = "url('../images/icons/GreenBar.png')";
    //         }
    //         if(item.Chng < 0){
    //             newDiv.style.backgroundImage = "url('../images/icons/RedBar.png')";
    //         }
    //     })
        
    //     function calculateAnimationDuration(containerWidth, speed) {
    //         const duration = containerWidth / speed;
    //         return duration + 's'; 
    //     }
    
    //     function initializeMarqueeAnimationCSE() {
    //         const marqueeContainer = document.getElementById('offHourTickerCSE');
    //         const containerWidth = marqueeContainer.offsetWidth; 
    //         const speed = 50;
    //         const animationDuration = calculateAnimationDuration(containerWidth, speed);
    
    //         marqueeContainer.style.animationDuration = animationDuration;
    //     }
    //     function initializeMarqueeAnimationDSE() {
    //         const marqueeContainer = document.getElementById('offHourTickerDSE');
    //         const containerWidth = marqueeContainer.offsetWidth; 
    //         const speed = 50;
    //         const animationDuration = calculateAnimationDuration(containerWidth, speed);
    
    //         marqueeContainer.style.animationDuration = animationDuration;
    //     }
    
    //     initializeMarqueeAnimationCSE()
    //     initializeMarqueeAnimationDSE()
    // }
 return handleListItemClick
}
function selscrip(value){
    storedTrade(undefined,value)        
}
document.getElementById('overlay').style.display = 'none';

function show(content){
    document.getElementById('cseContent').style.display = 'none'
    document.getElementById('dseContent').style.display = 'none'

    document.getElementById(content).style.display = 'flex'

    updateButtonState(content)
}
function updateButtonState(activeButton) {
    let buttons = document.querySelectorAll('.btnGroup .Btn');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });

    let activeButtonElement = document.querySelector('.btnGroup .Btn[onclick*="' + activeButton + '"]');
    if (activeButtonElement) {
        activeButtonElement.classList.add('active');
    }
} 

var APIURL = 'https://www.berichbd.com/matrix/matrix.aspx';
 // Ticker
 function getTicker() {
    $.get(APIURL + '?CMND=_TICKER_&exch=CSE', function (data) {
      var mrq1 = '<tr>';
      var mrq2 = '<tr>';
      $.each(data, function (i, item) {
        var cls = 'mqsm';
        if (item.Chng > 0) {
          cls = 'mqup';
        }
        else if (item.Chng < 0) {
          cls = 'mqdn';
        }
        mrq1 += '<td class="' + cls + '" style="cursor:pointer;" onclick="selscrip(\'' + item.scrip + '\');">' + item.scrip + '</td>';
        mrq2 += '<td class="' + cls + '">' + item.LTP + '&nbsp;(' + item.Chng.toFixed(1) + ')</td>';
      });
      mrq1 += '</tr>';
      mrq2 += '</tr>';
      var fins = '<table style="text-align: center; color: white; border-collapse: separate; border-spacing: 1px 0px; font-size: xx-small;">' + mrq1 + mrq2 + '</table>';
      $("#dvMarq").html(fins);
      $('.marqP').marquee({ speed: 100, direction: 'left', pauseOnHover: true });
    }, "json").fail(function () {
    });

    $.get(APIURL + '?CMND=_TICKER_&exch=DSE', function (data) {
      var mrq1 = '<tr>';
      var mrq2 = '<tr>';
      $.each(data, function (i, item) {
        var cls = 'mqsm';
        if (item.Chng > 0) {
          cls = 'mqup';
        }
        else if (item.Chng < 0) {
          cls = 'mqdn';
        }
        mrq1 += '<td class="' + cls + '" style="cursor:pointer;" onclick="selscrip(\'' + item.scrip + '\');">' + item.scrip + '</td>';
        mrq2 += '<td class="' + cls + '">' + item.LTP + '&nbsp;(' + item.Chng.toFixed(1) + ')</td>';
      });
      mrq1 += '</tr>';
      mrq2 += '</tr>';
      var fins = '<table style="text-align: center; color: white; border-collapse: separate; border-spacing: 1px 0px; font-size: xx-small;">' + mrq1 + mrq2 + '</table>';
      $("#dvMarqD").html(fins);
      $('.marqPD').marquee({ speed: 100, direction: 'left', pauseOnHover: true });
    }, "json").fail(function () {
    });
  }

  function fillRTTicker(jsnG) {
    var jsn = JSON.parse(jsnG);
    $.each(jsn, function (i, item) {
      if (item.Exch == 'DSE') {
        try {
          var Fn = '<tr><td>' + item.CNam + '</td></tr><tr><td>' + item.CVol + ' @ ' + item.CLTP.toFixed(1) + " (" + item.Chng.toFixed(1) + ")</td></tr>";
          var bkcol = "url('../../../images/BlueBar.png')";
          if (Number(item.Chng) < 0) {
            bkcol = "url('../../../images/RedBar.png')";
          }
          else if (Number(item.Chng) > 0) {
            bkcol = "url('../../../images/GreenBar.png')";
          }
          $('#ds1').html($('#ds2').html());
          $('#ds2').html($('#ds3').html());
          $('#ds3').html($('#ds4').html());
          // $('#ds4').html($('#ds5').html());
          //$('#ds5').html($('#ds6').html());
          // $('#ds6').html($('#ds7').html());
          // $('#ds7').html($('#ds8').html());
          // $('#ds8').html($('#ds9').html());
          // $('#ds9').html($('#ds10').html());
          var Ht = '<table class="tktbl" style="text-align:center; width:100%; font-size:8px; padding:0px; background-image:' + bkcol + '; background-size:cover; cursor:pointer;" onclick="selscrip(\'' + item.CNam + '\');">' + Fn + '</table>';
          $('#ds4').html(Ht);

        }
        catch (err) { }
      } else {
        try {
          var Fn = '<tr><td>' + item.CNam + '</td></tr><tr><td>' + item.CVol + ' @ ' + item.CLTP.toFixed(1) + " (" + item.Chng.toFixed(1) + ")</td></tr>";
          var bkcol = "url('../../../images/BlueBar.png')";
          if (Number(item.Chng) < 0) {
            bkcol = "url('../../../images/RedBar.png')";
          }
          else if (Number(item.Chng) > 0) {
            bkcol = "url('../../../images/GreenBar.png')";
          }
          $('#s1').html($('#s2').html());
          $('#s2').html($('#s3').html());
          $('#s3').html($('#s4').html());
          // $('#s4').html($('#s5').html());
          // $('#s5').html($('#s6').html());
          //$('#s6').html($('#s7').html());
          // $('#s7').html($('#s8').html());
          // $('#s8').html($('#s9').html());
          // $('#s9').html($('#s10').html());
          var Ht = '<table class="tktbl" style="text-align:center; width:100%; font-size:8px; padding:0px; background-image:' + bkcol + '; background-size:cover; cursor:pointer;" onclick="selscrip(\'' + item.CNam + '\');">' + Fn + '</table>';
          $('#s4').html(Ht);

        }
        catch (err) { }
      }


    });
  }
  //
  // TRade Time Check

  var tikonce = 0;
  var cntdn;
  function getTradeTime() {
    clearInterval(cntdn);
    $.get(APIURL + '?CMND=_THOUR_', function (data) {
      if (data.trade == '1') {

        // For Ticker+News Marquee
        var sgUrl = "https://ticker.berichbd.com:8088/signalr";
        if (window.location.hostname == 'localhost') {
          sgUrl = "http://localhost:8088/signalr";
        }

        $.getScript(sgUrl + "/hubs", function () {
          $.connection.hub.url = sgUrl;
          simpleHubProxy = $.connection.simpleHub;
          simpleHubProxy.client.addMessage = function (name, jsnF) {
            fillRTTicker(jsnF);
          };
          $.connection.hub.start().done(function () {
            simpleHubProxy.server.setUserName($('#hdus').val());
          });
        });


        $("#ifmTick").show();
        $("#ifmTickD").show();
        $("#dvMarq").hide();
        $("#dvMarqD").hide();
        $("#dvMarq").next().hide();
        $("#dvMarqD").next().hide();
        // $('#mktOpen').html("OPEN");
        // $('#mktOpen').css('color', 'green');
        // $("#trdtmcap").html('Remaining Trade Time');
        tikonce = 0;
      }
      else {
        if (tikonce == 0) {
          getTicker();
          tikonce = 1;
          // $('#mktOpen').html("CLOSED");
          // $('#mktOpen').css('color', '#ff0000');
          // $("#trdtmcap").html('Trade Will Start');
        }
        $("#ifmTick").hide();
        $("#dvMarq").show();
        $("#ifmTickD").hide();
        $("#dvMarqD").show();
        $("#dvMarq").next().show();
        $("#dvMarqD").next().show();
      }
      var countDownDate = new Date(data.cntm).getTime();
      cntdn = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var hours = Math.floor(distance / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        $("#trdtmval").html(NmPad(hours, 2) + ":" + NmPad(minutes, 2) + ":" + NmPad(seconds, 2));
        if (distance < 0) {
          clearInterval(cntdn);
          $("#trdtmval").html('');
        }
      }, 1000);
    }, "json").fail(function () {
    });
    /* setTimeout(function () { getTradeTime(); }, 90000);*/
  }
  function NmPad(num, size) {
    var s = "000000000" + num; return s.substr(s.length - size);
  }
