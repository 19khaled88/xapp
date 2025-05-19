const rootUrl = "https://api.ctgshop.com";
const rootWwwUrl = "https://api.ctgshop.com";
const projectUrl = "https://ctgshop.com/xapp/test";

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

  //   console.log(identity, emName, bossId, bossName, imei, class_name, data_title);

  switch (data_title) {
    case "X Limited": {
      document.getElementById("title").textContent = "X Limited";

      document.getElementById("main").setAttribute("class", "x_limited_main");
      document.getElementById("main").setAttribute("id", "x_limited_main");

      xLimited();
      break;
    }
    case "BeRichLimited": {
      document.getElementById("title").textContent = "Be Rich Limited";

      document.getElementById("main").setAttribute("class", "beRich_main");
      document.getElementById("main").setAttribute("id", "beRich_main");

      document.getElementById("beRich_main").style.maxHeight = `${100 -
        ((document.getElementById("nav_div").offsetHeight /
          window.innerHeight) *
          100 +
          1)
        }vh`;

      const { bf_btn, bf_home_btn } = getButtons();

      bf_btn &&
        bf_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/pages/BossMenu.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${encodeURIComponent(bossId)}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${encodeURIComponent(imei)}`;
        });

      bf_home_btn &&
        bf_home_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/index.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${bossId}&bossName=`;
        });

      document.getElementById('loader').style.height = `${100 - ((document.getElementById('nav_div').offsetHeight / window.innerHeight) * 100)}vh`;
      document.getElementById('loader').style.display = 'flex';

      beRich(identity,emName,bossId,bossName,imei);
      break;
    }
    case "BeFreshLimited": {
      document.getElementById("title").textContent = "Be Fresh Limited";

      document.getElementById("main").setAttribute("class", "beFresh_main");
      document.getElementById("main").setAttribute("id", "beFresh_main");

      document.getElementById("beFresh_main").style.maxHeight = `${100 -
        ((document.getElementById("nav_div").offsetHeight /
          window.innerHeight) *
          100 +
          1)
        }vh`;

      const { bf_btn, bf_home_btn } = getButtons();

      bf_btn &&
        bf_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/pages/BossMenu.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${encodeURIComponent(bossId)}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${encodeURIComponent(imei)}`;
        });

      bf_home_btn &&
        bf_home_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/index.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${bossId}&bossName=`;
        });

      document.getElementById('loader').style.height = `${100 - ((document.getElementById('nav_div').offsetHeight / window.innerHeight) * 100)}vh`;
      document.getElementById('loader').style.display = 'flex';

      beFresh();
      break;
    }
    case "AmyTravelTech": {
      document.getElementById("title").textContent = "AMY";

      document.getElementById("main").setAttribute("class", "amy_main");
      document.getElementById("main").setAttribute("id", "amy_main");

      document.getElementById("amy_main").style.maxHeight = `${100 -
        ((document.getElementById("nav_div").offsetHeight /
          window.innerHeight) *
          100 +
          1)
        }vh`;

      const { bf_btn, bf_home_btn } = getButtons();

      bf_btn &&
        bf_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/pages/BossMenu.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${encodeURIComponent(bossId)}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${encodeURIComponent(imei)}`;
        });

      bf_home_btn &&
        bf_home_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/index.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${bossId}&bossName=`;
        });

      document.getElementById('loader').style.height = `${100 - ((document.getElementById('nav_div').offsetHeight / window.innerHeight) * 100)}vh`;
      document.getElementById('loader').style.display = 'flex';

      amy();
      break;
    }
    case "BeFreshFX": {

      document.getElementById("title").textContent =
        "South East Money Exchange Limited";

      document.getElementById("main").setAttribute("class", "beFreshFx_main");
      document.getElementById("main").setAttribute("id", "beFreshFx_main");

      document.getElementById("beFreshFx_main").style.maxHeight = `${100 -
        ((document.getElementById("nav_div").offsetHeight /
          window.innerHeight) *
          100 +
          1)
        }vh`;

      const { bf_btn, bf_home_btn } = getButtons();

      bf_btn &&
        bf_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/pages/BossMenu.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${encodeURIComponent(bossId)}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${encodeURIComponent(imei)}`;
        });

      bf_home_btn &&
        bf_home_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/index.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${bossId}&bossName=`;
        });

      document.getElementById('loader').style.height = `${100 - ((document.getElementById('nav_div').offsetHeight / window.innerHeight) * 100)}vh`;
      document.getElementById('loader').style.display = 'flex';

      bfFx();
      break;
    }
    case "BEC": {

      document.getElementById("title").textContent =
        "Be Fresh Education & Jobs Limited";

      document.getElementById("main").setAttribute("class", "beEdu_main");
      document.getElementById("main").setAttribute("id", "beEdu_main");

      document.getElementById("beEdu_main").style.maxHeight = `${100 -
        ((document.getElementById("nav_div").offsetHeight /
          window.innerHeight) *
          100 +
          1)
        }vh`;

      const { bf_btn, bf_home_btn } = getButtons();

      bf_btn &&
        bf_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/pages/BossMenu.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${encodeURIComponent(bossId)}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${encodeURIComponent(imei)}`;
        });

      bf_home_btn &&
        bf_home_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/index.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${bossId}&bossName=`;
        });

      document.getElementById('loader').style.height = `${100 - ((document.getElementById('nav_div').offsetHeight / window.innerHeight) * 100)}vh`;
      document.getElementById('loader').style.display = 'flex';

      bfEdu();
      break;
    }
    case "CtgShop": {
      document.getElementById("title").textContent = "CtgShop Limited";

      document.getElementById("main").setAttribute("class", "ctgShop_main");
      document.getElementById("main").setAttribute("id", "ctgShop_main");

      const { bf_btn, bf_home_btn } = getButtons();

      bf_btn &&
        bf_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/pages/BossMenu.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${encodeURIComponent(bossId)}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${encodeURIComponent(imei)}`;
        });

      bf_home_btn &&
        bf_home_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/index.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${bossId}&bossName=`;
        });

      document.getElementById('loader').style.height = `${100 - ((document.getElementById('nav_div').offsetHeight / window.innerHeight) * 100)}vh`;
      document.getElementById('loader').style.display = 'flex';

      ctgshop();
      break;
    }

    case "BeRichMfg": {

      document.getElementById("title").textContent = "Be Rich Mfg.";

      document.getElementById("main").setAttribute("class", "beRichMfg_main");
      document.getElementById("main").setAttribute("id", "beRichMfg_main");

      const { bf_btn, bf_home_btn } = getButtons();

      bf_btn &&
        bf_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/pages/BossMenu.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${encodeURIComponent(bossId)}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${encodeURIComponent(imei)}`;
        });

      bf_home_btn &&
        bf_home_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/index.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${bossId}&bossName=`;
        });

      document.getElementById('loader').style.height = `${100 - ((document.getElementById('nav_div').offsetHeight / window.innerHeight) * 100)}vh`;
      document.getElementById('loader').style.display = 'flex';

      beRichMfg();
      break;
    }
    case "Admin": {

      document.getElementById("title").textContent = "HR and Admin";

      document.getElementById("main").setAttribute("class", "admin_main");
      document.getElementById("main").setAttribute("id", "admin_main");

      const { bf_btn, bf_home_btn } = getButtons();

      bf_btn &&
        bf_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/pages/BossMenu.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${encodeURIComponent(bossId)}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${encodeURIComponent(imei)}`;
        });

      bf_home_btn &&
        bf_home_btn.addEventListener("click", () => {
          window.location.href = `${projectUrl}/index.html?identity=${identity}&name=${encodeURIComponent(
            emName
          )}&boss=${bossId}&bossName=`;
        });

      document.getElementById('loader').style.height = `${100 - ((document.getElementById('nav_div').offsetHeight / window.innerHeight) * 100)}vh`;
      document.getElementById('loader').style.display = 'flex';

      admin();
      break;
    }
    default:
      console.log("close page");
  }


});



function xLimited() {
  console.log("clicked x limited");
}

function beRich(identity,emName,bossId,bossName,imei) {
  const be_rich_main = document.getElementById("beRich_main");

  const button_list = [
    { name: "TRADE (EXCHANGE)", image: "currency_exchange" },
    { name: "TRADE (LOCATION)", image: "location_on" },
    { name: "TRADE (WORKSTATION)", image: "computer" },
    { name: "TRADE (WORKSTATION NEW)", image: "install_desktop" },
    { name: "TRADE (PORTFOLIO MANAGER)", image: "business_center" },
    { name: "MARKET SHARE", image: "monitoring" },
    { name: "ONLINE TRADE", image: "finance_mode" },
    { name: "INVESTMENT", image: "payments" },
    { name: "BLACK HOLE", image: "cyclone" },
    { name: "X APP SUBMISSION", image: "task" },
    { name: "TRADE (REAL - TIME)", image: "swap_horizontal_circle" },
    { name: "COMPARE CSE DSE", image: "balance" },
  ];

  button_list.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "be-rich-button"; // Add your own styling class
    btn.setAttribute("data-name", item.name); // Set unique identifier

    // You can use Material Icons or inline image depending on your design
    btn.innerHTML = `
      <span class="material-symbols-outlined">${item.image}</span>
      <span class="icon_text">${item.name}</span>
    `;


    // Add click event
    btn.addEventListener("click", async(e) => {
      const buttonName = e.currentTarget.getAttribute("data-name");

     await handleBossButtonClick(buttonName,identity,emName,bossId,bossName,imei);

    });


    be_rich_main.appendChild(btn);
  });

  document.fonts.ready.then(() => {

    document.getElementById('loader').style.display = 'none';
    be_rich_main.style.visibility = "visible";

  });



}

function beFresh() {
  const be_fresh_main = document.getElementById("beFresh_main");

  const button_list = [
    { name: "SALES (OFFICE)", image: "home_work" },
    { name: "SALES (ACCOUNT MANAGER)", image: "person_play" },
    { name: "PROFITABILITY REPORT", image: "analytics" },
    { name: "ACTIVITY REPORT", image: "text_snippet" },
    { name: "MR REPORT (BDT)", image: "business_center" },
    { name: "MR REPORT (INR)", image: "currency_rupee" },
    { name: "DOMESTIC SALES (AIRLINES)", image: "airlines" },
    { name: "INTERNATIONAL SALES (AIRLINES)", image: "flight" },
    { name: "OUTSTANDING", image: "calendar_clock" },
  ];

  button_list.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "be-fresh-button"; // Add your own styling class

    // You can use Material Icons or inline image depending on your design
    btn.innerHTML = `
      <span class="material-symbols-outlined">${item.image}</span>
      <span class="icon_text">${item.name}</span>
    `;

    be_fresh_main.appendChild(btn);
  });

  document.fonts.ready.then(() => {
    document.getElementById('loader').style.display = 'none';
    be_fresh_main.style.visibility = "visible";
  });
}

function amy() {
  const amy_main = document.getElementById("amy_main");

  const button_list = [
    { name: "CLIENT TYPE-WISE", image: "patient_list" },
    { name: "BANK DEPOSIT", image: "account_balance" },
    { name: "BIZDEV PERFORMANCE", image: "speed" },
    { name: "BIZDEV CLIENT VISIT", image: "identity_platform" },
    { name: "BIZDEV PERFORMANCE(NEW)", image: "avg_pace" },
    { name: "ROUTE-WISE SALES", image: "alt_route" },
    { name: "AIRLINE-WISE (DOM)", image: "airlines" },
    { name: "AIRLINE-WISE (INT)", image: "flight" },
    { name: "SECTOR-WISE", image: "split_scene" },
    { name: "ONLINE-SALES", image: "captive_portal" },
    { name: "APP SALES", image: "grid_view" },
    { name: "NEW USER", image: "how_to_reg" },
    { name: "SALES (GUEST-OFF)", image: "bubble_chart" },
    { name: "SALES STATUS (IN)", image: "bar_chart" },
    { name: "CUSTOMER OUSTANDING (IN)", image: "calendar_clock" },
    { name: "AMY SALES (DEVICE)", image: "phonelink_setup" },
    { name: "CLIENT-WISE SALES", image: "person_search" },
    { name: "ACTIVITY REPORT", image: "fact_check" },
    { name: "COMPLAINT BOX", image: "view_in_ar" },
  ];

  button_list.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "amy-button"; // Add your own styling class

    // You can use Material Icons or inline image depending on your design
    btn.innerHTML = `
      <span class="material-symbols-outlined">${item.image}</span>
      <span class="icon_text">${item.name}</span>
    `;

    amy_main.appendChild(btn);
  });

  document.fonts.ready.then(() => {
    document.getElementById('loader').style.display = 'none';
    amy_main.style.visibility = "visible";
  });
}

function bfFx() {
  const beFreshFx_main = document.getElementById("beFreshFx_main");

  const button_list = [
    { name: "STOCK", image: "inventory_2" },
    { name: "INCOME", image: "money_bag" },
    { name: "ACTIVITIES", image: "local_activity" },
    { name: "DEPOSIT", image: "account_balance" },
  ];

  button_list.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "beFreshFx-button"; // Add your own styling class

    // You can use Material Icons or inline image depending on your design
    btn.innerHTML = `
      <span class="material-symbols-outlined">${item.image}</span>
      <span class="icon_text">${item.name}</span>
    `;

    beFreshFx_main.appendChild(btn);
  });

  document.fonts.ready.then(() => {
    document.getElementById('loader').style.display = 'none';
    beFreshFx_main.style.visibility = "visible";
  });
}

function bfEdu() {
  const beEdu_main = document.getElementById("beEdu_main");

  const button_list = [
    { name: "VISITOR", image: "nest_doorbell_visitor" },
    { name: "PAYMENTS", image: "payments" },
    { name: "STUDENT UNDER PROCESS", image: "cycle" },
    { name: "ACIVITY REPORT", image: "fact_check" },
  ];

  button_list.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "beEdu-button"; // Add your own styling class

    // You can use Material Icons or inline image depending on your design
    btn.innerHTML = `
      <span class="material-symbols-outlined">${item.image}</span>
      <span class="icon_text">${item.name}</span>
    `;

    beEdu_main.appendChild(btn);
  });

  document.fonts.ready.then(() => {
    document.getElementById('loader').style.display = 'none';
    beEdu_main.style.visibility = "visible";
  });
}

function ctgshop() {

}

function beRichMfg() {
  const beRichMfg_main = document.getElementById("beRichMfg_main");

  const button_list = [
    { name: "SALES (CUSTOMER-WISE)", image: "contacts_product" },
    { name: "SALES (DATE_WISE)", image: "calendar_month" },
    { name: "PRODUCTION", image: "precision_manufacturing" },
    { name: "STOCK", image: "inventory_2" },
    { name: "OUTSTANDING", image: "today" },
    { name: "ACTIVITY REPORT", image: "fact_check" },
  ];

  button_list.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "beRichMfg-button"; // Add your own styling class

    // You can use Material Icons or inline image depending on your design
    btn.innerHTML = `
      <span class="material-symbols-outlined">${item.image}</span>
      <span class="icon_text">${item.name}</span>
    `;

    beRichMfg_main.appendChild(btn);
  });

  document.fonts.ready.then(() => {
    document.getElementById('loader').style.display = 'none';
    beRichMfg_main.style.visibility = "visible";
  });
}

function admin() {
  const admin_main = document.getElementById("admin_main");

  const button_list = [
    { name: "LEAVE STATUS", image: "contacts_product" },
    { name: "PROVIDENT FUND", image: "calendar_month" },
    { name: "TAX", image: "category" },
    { name: "LOAN", image: "real_estate_agent" },
    { name: "MANDATORY SAVING SCHEME", image: "energy_program_saving" },
    { name: "PAYSLIP", image: "receipt" },
    { name: "BANK DETAILS", image: "wallet" },
  ];

  button_list.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "admin-button"; // Add your own styling class

    // You can use Material Icons or inline image depending on your design
    btn.innerHTML = `
      <span class="material-symbols-outlined">${item.image}</span>
      <span class="icon_text">${item.name}</span>
    `;

    admin_main.appendChild(btn);
  });

  document.fonts.ready.then(() => {
    document.getElementById('loader').style.display = 'none';
    admin_main.style.visibility = "visible";
  });
}

function getButtons() {
  const bf_btn = document.getElementById("bf_btn");
  const bf_home_btn = document.getElementById("bf_home_btn");
  return { bf_btn, bf_home_btn };
}

function createLoader() {
  const loader = document.createElement("div");
  loader.id = "loader";
  Object.assign(loader.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
  });

  loader.innerHTML = `<p style="font-size: 18px;">Loading...</p>`;
  return loader;
}


// ✨ Central function to handle different button actions
const handleBossButtonClick=async(name,identity,emName,bossId,bossName,imei)=> {
  const key = await generateKeyFromPassword("I_am_secret_key_generated");
  switch (name) {
    case "TRADE (EXCHANGE)":
      
      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "TRADE (EXCHANGE)",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "TRADE (LOCATION)":
      
      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "TRADE (LOCATION)",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "TRADE (WORKSTATION)":
      
      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "TRADE (WORKSTATION)",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "TRADE (WORKSTATION NEW)":
       (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "TRADE (WORKSTATION NEW)",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "TRADE (PORTFOLIO MANAGER)":
      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "TRADE (PORTFOLIO MANAGER)",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "MARKET SHARE":
      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "MARKET SHARE",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "ONLINE TRADE":
      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "ONLINE TRADE",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "INVESTMENT":
      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "INVESTMENT",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();

      break;
    case "BLACK HOLE":
       (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "BLACK HOLE",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "X APP SUBMISSION":
      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "X APP SUBMISSION",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "TRADE (REAL - TIME)":

      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "TRADE (REAL - TIME)",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    case "COMPARE CSE DSE":
      (
        async () => {
          bossRoute(
            `${projectUrl}/pages/BossMenuActivityDetails.html`,
            "BeRichLimited_main",
            "COMPARE CSE DSE",
            encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
            emName,
            encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
            bossName,
            encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
          )
        }
      )();
      break;
    default:
      console.log("No specific action for:", name);
  }
}


function berich_Trade_Exchange() {
  window.location.href = `${projectUrl}/pages/BossMenuActivityDetails.html`;

}

function berich_Trade_Location() {
  console.log("TRADE (LOCATION)");
}

function berich_trade_workstation() {
  console.log("TRADE (WORKSTATION)");
}

function berich_trade_workstation_new() {
  console.log("TRADE (WORKSTATION NEW)");
}

function berich_trade_portfolio_manager() {
  console.log("TRADE (PORTFOLIO MANAGER)");
}

function berich_market_share() {
  console.log("MARKET SHARE");
}

function berich_online_trade() {
  console.log("ONLINE TRADE");
}

function berich_investment() {
  console.log("INVESTMENT");
}

function berich_blackhole() {
  console.log("BLACK HOLE");
}

function berich_x_app_submission() {
  console.log("X APP SUBMISSION");
}

function berich_trade_real_time() {
  console.log("TRADE (REAL - TIME)");
}

function berich_compare_dse_cse() {
  console.log("COMPARE CSE DSE");
}