const rootUrl = "https://api.ctgshop.com";
const projectUrl = "https://www.ctgshop.com/xapp/test";
const secondaryUrl = "https://ctgshop.com/erp/API";
document.addEventListener("DOMContentLoaded", async () => {
  // Parse the query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // key generation
  const key = await generateKeyFromPassword("I_am_secret_key_generated");

  // Get the value of the parameter you want to use in the title
  const identity = await decrypt(
    JSON.parse(decodeURIComponent(urlParams.get("identity"))),
    key
  );
  const emName = urlParams.get("name");
  const bossId = await decrypt(
    JSON.parse(decodeURIComponent(urlParams.get("boss"))),
    key
  );
  const bossName = urlParams.get("bossName");
  const imei = await decrypt(
    JSON.parse(decodeURIComponent(urlParams.get("imei"))),
    key
  );

  const class_name = urlParams.get("class_name");
  const data_title = urlParams.get("data_title");

  switch (data_title) {
    case "TRADE (EXCHANGE)":
      document.getElementById("title").textContent = "TRADE (EXCHANGE)";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));

      manage_trade_exchange();
      break;
    case "TRADE (LOCATION)":
      document.getElementById("title").textContent = "TRADE (LOCATION)";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));

      await manage_trade_location();
      break;
    case "TRADE (WORKSTATION)":
      document.getElementById("title").textContent = "TRADE (WORKSTATION)";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));

      manage_trade_workstation();
      break;
    case "TRADE (WORKSTATION NEW)":
      document.getElementById("title").textContent = "TRADE (WORKSTATION NEW)";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));

      manage_trade_workstation_new();
      break;
    case "TRADE (PORTFOLIO MANAGER)":
      document.getElementById("title").textContent =
        "TRADE (PORTFOLIO MANAGER)";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));


      manage_trade_portfolio_manager();
      break;
    case "MARKET SHARE":
      document.getElementById("title").textContent = "MARKET SHARE";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));

      manage_market_share();
      break;
    case "ONLINE TRADE":
      document.getElementById("title").textContent = "ONLINE TRADE";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));
      break;
    case "INVESTMENT":
      document.getElementById("title").textContent = "INVESTMENT";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));
      break;
    case "BLACK HOLE":
      document.getElementById("title").textContent = "BLACK HOLE";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));
      break;
    case "X APP SUBMISSION":
      document.getElementById("title").textContent = "X APP SUBMISSION";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));
      break;
    case "TRADE (REAL - TIME)":
      document.getElementById("title").textContent = "TRADE (REAL - TIME)";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));
      break;
    case "COMPARE CSE DSE":
      document.getElementById("title").textContent = "COMPARE CSE DSE";

      document.getElementById("main").setAttribute("class", "berich_main");
      document.getElementById("main").setAttribute("id", "berich_main");

      shrinkToFit(document.getElementById("title"));
      break;
    default:
      console.log("no data");
  }

  const backBtn = document.getElementById("boss_back_btn");
  backBtn &&
    backBtn.addEventListener("click", async () => {
      bossRoute(
        `${projectUrl}/pages/BossMenuActivity.html`,
        "BeRichLimited_main",
        "BeRichLimited",
        encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
        emName,
        encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
        bossName,
        encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
      );
    });
});

const manage_trade_exchange = async () => {
  const conatiner = document.getElementById("berich_main");

  conatiner.innerHTML = "";

  const html = `
        
            <div class="date_range" id="date_range">
                <div class="date" id="date">
                </div>
                <button class="cl_bl_btn" id="cl_bl_btn">OK</button>
            </div>
            <div class="as_on_date" id="as_on_date">
                <p>Date As On : </p>
                <p class="start_as_on_date" id="start_as_on_date"></p>
                <p> - </p>
                <p class="end_as_on_date" id="end_as_on_date"></p>
            </div>
            <div class="content" id="content"></div>
            
       
    `;
  conatiner.insertAdjacentHTML("beforeend", html);

  const startDatePickerInput = handleDateAndTime("fromDate");
  const endDatePickerInput = handleDateAndTime("toDate");

  document.getElementById("date").appendChild(startDatePickerInput.elementName);
  document.getElementById("date").appendChild(endDatePickerInput.elementName);

  document.getElementById("start_as_on_date").textContent =
    startDatePickerInput.elementName.value;
  document.getElementById("end_as_on_date").textContent =
    endDatePickerInput.elementName.value;

  document.getElementById("cl_bl_btn").addEventListener("click",async () => {
    document.getElementById("start_as_on_date").textContent =
      startDatePickerInput.elementName.value;
    document.getElementById("end_as_on_date").textContent =
      endDatePickerInput.elementName.value;
    fetchAndRenderTradeData(
      startDatePickerInput.elementName.value,
      endDatePickerInput.elementName.value
    );

    document.getElementById('content') && await adjustContentHeight('content',['nav_div','date_range','as_on_date'],1.5)
  });

  // ✅ Run once on page load
  fetchAndRenderTradeData(
    startDatePickerInput.elementName.value,
    endDatePickerInput.elementName.value
  );

  
  // document.getElementById('content') ? document.getElementById('content').style.height = `${100 - (
  //   pxToVh(document.getElementById('nav_div').offsetHeight) + 
  //   pxToVh(document.getElementById('date_range').offsetHeight) + 
  //   pxToVh(document.getElementById('as_on_date').offsetHeight) + 
  //   1.5)}vh` :
  //  "";

 document.getElementById('content') && await adjustContentHeight('content',['nav_div','date_range','as_on_date'],1.5)

};

const manage_trade_location = async () => {
  const conatiner = document.getElementById("berich_main");

  conatiner.innerHTML = "";

  const html = `
            <div class="date_range" id="date_range">
                <div class="date" id="date">
                </div>
                <button class="cl_bl_btn" id="cl_bl_btn">OK</button>
            </div>
            <div class="as_on_date" id="as_on_date">
                <p>Date As On : </p>
                <p class="start_as_on_date" id="start_as_on_date"></p>
                <p> - </p>
                <p class="end_as_on_date" id="end_as_on_date"></p>
            </div>
            <div class="trade_category" id="trade_category">

                <span>CATEGORY</span>
                <select class="category_select" id="category_select">
                    <option value="All">All</option>
                    <option value="CSE">CSE</option>
                    <option value="DSE">DSE</option>
                </select>
            </div>
            <div class="content" id="content"></div>
            
       
    `;

  conatiner.insertAdjacentHTML("beforeend", html);

  const startDatePickerInput = handleDateAndTime("fromDate");
  const endDatePickerInput = handleDateAndTime("toDate");

  document.getElementById("date").appendChild(startDatePickerInput.elementName);
  document.getElementById("date").appendChild(endDatePickerInput.elementName);

  document.getElementById("start_as_on_date").textContent =
    startDatePickerInput.elementName.value;
  document.getElementById("end_as_on_date").textContent =
    endDatePickerInput.elementName.value;


  const selectedCategory = document.getElementById("category_select").value;

  const url = `${rootUrl}/xapi/kapi.ashx?type=trdDt&sd=${startDatePickerInput.elementName.value}&ed=${endDatePickerInput.elementName.value}&tp=All&exc=${selectedCategory}`

  fetchTradeData(url);


  document.getElementById('cl_bl_btn').addEventListener('click', async() => {
    const selectedCategory = document.getElementById("category_select").value;
    const url = `${rootUrl}/xapi/kapi.ashx?type=trdDt&sd=${startDatePickerInput.elementName.value}&ed=${endDatePickerInput.elementName.value}&tp=All&exc=${selectedCategory}`
    fetchTradeData(url);
    await adjustContentHeight('content',['nav_div','date_range','as_on_date','trade_category'],2)
  });
  
   await adjustContentHeight('content',['nav_div','date_range','as_on_date','trade_category'],2)
 
};

const manage_trade_workstation = async () => {
  const url = `https://www.condomshopbd.com/xapi/emp_com.ashx?cmd=brwstrd&dt1=13/May/2025&dt2=14/May/2025&imei=all`;


  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ! status: ${response.status}`);
    }

    const data = await response.text();
    console.log(data);


  } catch (error) {
    console.log(error)
  }

};

const manage_trade_workstation_new = async () => {
  const conatiner = document.getElementById("berich_main");

  conatiner.innerHTML = "";

  const html = `
            <div class="date_range" id="date_range">
                <div class="date" id="date">
                </div>
                <button class="cl_bl_btn" id="cl_bl_btn">OK</button>
            </div>
            <div class="as_on_date" id="as_on_date">
                <p>Date As On : </p>
                <p class="start_as_on_date" id="start_as_on_date"></p>
                <p> - </p>
                <p class="end_as_on_date" id="end_as_on_date"></p>
            </div>
            <div class="trade_category" id="trade_category">

                <span>TYPE</span>
                <select class="category_select" id="category_select">
                    <option value="All">All</option>
                    <option value="CSE">CSE</option>
                    <option value="DSE">DSE</option>
                </select>
            </div>
            <div class="content" id="content"></div>
            
       
    `;

  conatiner.insertAdjacentHTML("beforeend", html);

  const startDatePickerInput = handleDateAndTime("fromDate");
  const endDatePickerInput = handleDateAndTime("toDate");

  document.getElementById("date").appendChild(startDatePickerInput.elementName);
  document.getElementById("date").appendChild(endDatePickerInput.elementName);

  document.getElementById("start_as_on_date").textContent =
    startDatePickerInput.elementName.value;
  document.getElementById("end_as_on_date").textContent =
    endDatePickerInput.elementName.value;


  const selectedCategory = document.getElementById("category_select").value;

  const url = `${rootUrl}/xapi/kapi.ashx?type=get_ws_rep&sd=${startDatePickerInput.elementName.value}&ed=${endDatePickerInput.elementName.value}&exch=${selectedCategory}`;

  fetchTradeData(url);


  document.getElementById('cl_bl_btn').addEventListener('click', async() => {
    const selectedCategory = document.getElementById("category_select").value;
    const url = `${rootUrl}/xapi/kapi.ashx?type=get_ws_rep&sd=${startDatePickerInput.elementName.value}&ed=${endDatePickerInput.elementName.value}&exch=${selectedCategory}`;
    fetchTradeData(url);
    await adjustContentHeight('content',['nav_div','date_range','as_on_date','trade_category'],2)
  });

await adjustContentHeight('content',['nav_div','date_range','as_on_date','trade_category'],2)
};

const manage_trade_portfolio_manager = async () => {

  const conatiner = document.getElementById("berich_main");

  conatiner.innerHTML = "";

  const html = `
            <div class="date_range" id="date_range">
                <div class="date" id="date">
                </div>
                <button class="cl_bl_btn" id="cl_bl_btn">OK</button>
            </div>
            <div class="as_on_date" id="as_on_date">
                <p>Date As On : </p>
                <p class="start_as_on_date" id="start_as_on_date"></p>
                <p> - </p>
                <p class="end_as_on_date" id="end_as_on_date"></p>
            </div>
            <div class="trade_category" id="trade_category">

                <span>CATEGORY</span>
                <select class="category_select" id="category_select">
                    <option value="All">All</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Primary (IPO)">Primary(IPO)</option>
                </select>
            </div>
            <div class="trade_type" id="trade_type">

                <span>TYPE</span>
                <select class="type_select" id="type_select">
                    <option value="All">All</option>
                    <option value="CSE">CSE</option>
                    <option value="DSE">DSE</option>
                </select>
            </div>
            <div class="content" id="content"></div>
            
       
    `;

  conatiner.insertAdjacentHTML("beforeend", html);

  const startDatePickerInput = handleDateAndTime("fromDate");
  const endDatePickerInput = handleDateAndTime("toDate");

  document.getElementById("date").appendChild(startDatePickerInput.elementName);
  document.getElementById("date").appendChild(endDatePickerInput.elementName);

  document.getElementById("start_as_on_date").textContent =
    startDatePickerInput.elementName.value;
  document.getElementById("end_as_on_date").textContent =
    endDatePickerInput.elementName.value;


  const selectedCategory = document.getElementById("category_select").value;
  const selectedType = document.getElementById("type_select").value;

  const url = `https://api.ctgshop.com/xapi/kapi.ashx?type=get_port_mng_new&sd=${startDatePickerInput.elementName.value}&ed=${endDatePickerInput.elementName.value}&tp=${selectedCategory}&exc=${selectedType}`
  fetchTradeData(url)


  document.getElementById('cl_bl_btn').addEventListener('click', async() => {
    const selectedCategory = document.getElementById("category_select").value;
    const selectedType = document.getElementById("type_select").value;

    const url = `https://api.ctgshop.com/xapi/kapi.ashx?type=get_port_mng_new&sd=${startDatePickerInput.elementName.value}&ed=${endDatePickerInput.elementName.value}&tp=${selectedCategory}&exc=${selectedType}`
    fetchTradeData(url)

    await adjustContentHeight('content',['nav_div','date_range','as_on_date','trade_category','trade_type'],2.5)
  });

  await adjustContentHeight('content',['nav_div','date_range','as_on_date','trade_category','trade_type'],2.5)
  // const url = `${secondaryUrl}/kapi.ashx?type=get_port_mng_new&sd=14/05/2025&ed=14/05/2025&tp=ALL&exc=ALL`;
  // console.log(url);
  // fetch(url)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error ! status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => console.log(data))
  //   .catch((error) => console.log(error));
};

const manage_market_share = async () => {

}

function shrinkToFit(el, minFontSize = 10) {
  const maxWidth = el.offsetWidth;

  while (
    el.scrollWidth > maxWidth &&
    parseFloat(getComputedStyle(el).fontSize) > minFontSize
  ) {
    el.style.fontSize = parseFloat(getComputedStyle(el).fontSize) - 1 + "px";
  }
}

const fetchAndRenderTradeData = async (startTime, endTime) => {
  try {
    const response = await fetch(
      `${secondaryUrl}/xbill.ashx?type=get_recv_pay&sdt=${startTime}&edt=${endTime}&cid=19`
    );
    const data = await response.json();

    const content = document.getElementById("content");

    // Create a helper to generate rows
    const createRow = (title, value) => {
      return `
            <tr>
                <td style="padding: 6px 12px; text-align: left;width:40%">${title}</td>
                <td style="padding: 6px 12px; text-align: right; font-weight: bold;width:60%">${value}</td>
            </tr>
            `;
    };

    // Build separate tables for CSE and DSE
    const cseTable = `
            <h3>CSE</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            ${createRow("Buy", data.Data[0].cse_buy)}
            ${createRow("Sell", data.Data[0].cse_sell)}
            ${createRow("Net", data.Data[0].cse_net)}
            ${createRow("Total", data.Data[0].cse_tot)}
            </table>
        `;

    const dseTable = `
            <h3>DSE</h3>
            <table style="width: 100%; border-collapse: collapse;">
            ${createRow("Buy", data.Data[0].dse_buy)}
            ${createRow("Sell", data.Data[0].dse_sell)}
            ${createRow("Net", data.Data[0].dse_net)}
            ${createRow("Total", data.Data[0].dse_tot)}
            </table>
        `;
    const grandTtoal = `
            <div class="grand_total" id="grand_total">
                <span>Grand Total Trade</span>
                <p>${data.Data[0].grnd_tot}</p>
            
            </div>
        `;

    // Append the content to the page
    content.innerHTML = cseTable + dseTable + grandTtoal;
  } catch (error) {
    console.error(error);
  }
};

const fetchTradeData = async (cusUrl) => {

  fetch(cusUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => {

      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = "";

      if (data.Data && data.Data.length > 0) {


        const firstItem = data.Data[0];
        const isLocData = 'LocID' in firstItem && 'LocName' in firstItem;
        const isWsData = 'Ws' in firstItem;
        const Buy_Qty = 'Buy Qty' in firstItem;

        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        if (isLocData) {

          // Location-based data
          table.innerHTML = `
            <thead>
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">Location ID</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Location Name</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${data.Data.map(item => `
                <tr>
                  <td style="border: 1px solid #ccc; padding: 8px;">${item.LocID}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;width:40%">${item.LocName}</td>
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: right;width:40%">${item.Total}</td>
                </tr>
              `).join('')}
            </tbody>
          `;
          contentDiv.style.alignItems = 'flex-start';
        } else if (isWsData) {

          // Workstation-based data
          table.innerHTML = `
          <thead>
            <tr>
              <th style="border: 1px solid #ccc; padding: 8px;">S/N</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Workstation</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.Data.map((item, index) => `
              <tr>
               <td style="border: 1px solid #ccc; padding: 8px;">${index + 1}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${item.Ws}</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${item.Total}</td>
              </tr>
            `).join('')}
          </tbody>
        `;
        contentDiv.style.alignItems = 'flex-start';
        } else if (Buy_Qty) {

          const customizedData = data.Data.map((item) => {
            const cleanedItem = {};
            for (const key in item) {
              const newKey = key.replace(/\s|-/g, '');
              cleanedItem[newKey] = item[key];
            }
            return cleanedItem;
          });

            // Portfoli-manager-based data
            table.innerHTML = `
            <thead>
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">S/N</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Name</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Trade Value</th>
              </tr>
            </thead>
            <tbody>
              ${customizedData.map((item, index) => `
                <tr>
                 <td style="border: 1px solid #ccc; padding: 8px;">${index + 1}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">${item.PortfolioManager}</td>
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${item.TradeTaka}</td>
                </tr>
              `).join('')}
            </tbody>
          `;
          contentDiv.style.alignItems = 'flex-start';
        } else {
          // contentDiv.textContent = "❌ Unknown data format.";
          contentDiv.textContent = 'Data not found yet';
          
          contentDiv.style.display = 'flex';
          contentDiv.style.flexDirection='row';
          contentDiv.style.justifyContent ='center';
          contentDiv.style.alignItems = 'center'
          return;
        }

        contentDiv.appendChild(table);
      } else {
        contentDiv.textContent = "No data found.";
        
        contentDiv.style.display = 'flex';
        contentDiv.style.flexDirection='row';
        contentDiv.style.justifyContent ='center';
        contentDiv.style.alignItems = 'center';
      }
    })
    .catch((error) => console.error(error));
}
