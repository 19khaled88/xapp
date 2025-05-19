
document.addEventListener("DOMContentLoaded", async () => {
  const getData = await localStorageManager("get", "xAppUserInfo");
  const projectUrl = "https://www.ctgshop.com/xapp/test";

  if (!getData) {
    window.location.href = `${projectUrl}/login.html`;
  }

  // Parse the query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Get the value of the parameter you want to use in the title
  const identity = urlParams.get("identity");
  const emName = urlParams.get("name");
  const bossId = urlParams.get("boss");
  const bossName = urlParams.get("bossName");
  const imei = urlParams.get("imei");

  const bossMenuActivityTop = document.getElementById("bossMenuActivityTop");
  const bossMenuActivityMain = document.getElementById("bossMenuActivityMain");

  bossMenuActivityMain.style.height = `${
    100 - pxToVh(bossMenuActivityTop.offsetHeight)
  }vh`;
  bossMenuActivityMain.style.overflowY = "auto";

  const response = await fetch("../helpers/dbs.json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.text();
  const parsedData = JSON.parse(data);

  bossMenuActivityMain.innerHTML = ""; // Clear previous content

  // Create a wrapper div
  const wrapper = document.createElement("div");
  wrapper.className = "button-wrapper"; // optional class for styling
  wrapper.setAttribute("id", "button-wrapper");

  parsedData.Boss.forEach((element, index) => {
    const item = document.createElement("button");

    // Set dataset name for later access
    item.dataset.name = element.name;

    item.innerHTML = `
            <img src="${encodeURI(
              element.img
            )}" alt="No Image" style="width:100%; height:auto;"/>
        `;

    wrapper.appendChild(item);

    item.addEventListener("click", async (event) => {
      let clickedItem = "";
      clickedItem = event.currentTarget.dataset.name;
      const key = await generateKeyFromPassword("I_am_secret_key_generated");
      switch (clickedItem) {
        case "XLimited":
          (async () => {
            bossRoute(
              `${projectUrl}/pages/BossMenuActivity.html`,
              "x_limited_main",
              "X Limited",
              encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
              emName,
              encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
              bossName,
              encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
            );
          })();

          break;
        case "BeRichLimited":
          (async () => {
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
          })();
          break;
        case "BeFreshLimited":
          (async () => {
            bossRoute(
              `${projectUrl}/pages/BossMenuActivity.html`,
              "BeFreshLimited_main",
              "BeFreshLimited",
              encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
              emName,
              encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
              bossName,
              encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
            );
          })();
          break;
        case "AmyTravelTech":
          (async () => {
            bossRoute(
              `${projectUrl}/pages/BossMenuActivity.html`,
              "AmyTravelTech_main",
              "AmyTravelTech",
              encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
              emName,
              encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
              bossName,
              encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
            );
          })();
          break;
        case "BeFreshFX":
          (async () => {
            bossRoute(
              `${projectUrl}/pages/BossMenuActivity.html`,
              "BeFreshFX_main",
              "BeFreshFX",
              encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
              emName,
              encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
              bossName,
              encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
            );
          })();
          break;
        case "BEC":
          (async () => {
            bossRoute(
              `${projectUrl}/pages/BossMenuActivity.html`,
              "BEC_main",
              "BEC",
              encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
              emName,
              encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
              bossName,
              encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
            );
          })();
          break;
        case "CtgShop":
          (async () => {
            bossRoute(
              `${projectUrl}/pages/BossMenuActivity.html`,
              "CtgShop_main",
              "CtgShop",
              encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
              emName,
              encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
              bossName,
              encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
            );
          })();
          break;
        case "BeRichMfg":
          (async () => {
            bossRoute(
              `${projectUrl}/pages/BossMenuActivity.html`,
              "BeRichMfg_main",
              "BeRichMfg",
              encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
              emName,
              encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
              bossName,
              encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
            );
          })();
          break;
        case "Admin":
          (async () => {
            bossRoute(
              `${projectUrl}/pages/BossMenuActivity.html`,
              "Admin_main",
              "Admin",
              encodeURIComponent(JSON.stringify(await encrypt(identity, key))), // identity
              emName,
              encodeURIComponent(JSON.stringify(await encrypt(bossId, key))), // bossId
              bossName,
              encodeURIComponent(JSON.stringify(await encrypt(imei, key))) // imei
            );
          })();
          break;
        default:
          console.log("Admin");
          break;
      }
    });
  });

  bossMenuActivityMain.appendChild(wrapper);

  document
    .getElementById("boss_Menu_Activity_back_btn")
    .addEventListener("click", () => {
      window.location.href = `${projectUrl}/index.html?identity=${identity}&name=${encodeURIComponent(
        emName
      )}&boss=${encodeURIComponent(bossId)}&bossName="" `;
    });
});
