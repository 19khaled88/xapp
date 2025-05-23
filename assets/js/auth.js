const rootUrl = "https://api.ctgshop.com";
const rootWwwUrl = "https://api.ctgshop.com";

document.addEventListener("DOMContentLoaded", async function () {
  let testMode = true;

  let type = String(platformDesObj.type);
  let webView = String(platformDesObj.isWebView);
  let platform = String(platformDesObj.platform);
  let browser = String(platformDesObj.browser);
  let sHeight = String(platformDesObj.sHeight);
  let sWidth = String(platformDesObj.sWidth);
  let dpi = String(platformDesObj.dpi);

  const secretkey = createHash(
    type,
    webView,
    platform,
    browser,
    sHeight,
    sWidth,
    dpi
  );
  // const staticHash = createHash("Android","true","Linux aarch64","Chrome","851","393","2.75",)
  // const dynamicHash = createHash(type,webView,platform,browser,sHeight,sWidth,dpi,);

  const getData = await localStorageManager("get", "xAppUserInfo");

  if (getData && getData.emPhone.length > 0 && getData.authid.length > 0) {
    const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=xloginauth`;

    let formData = {}; // This initializes formData as an empty object

    formData.emPhone = getData.emPhone;
    formData.authid = getData.authid;

    formData.otp = "";
    // formData.secretkey = getData.emPhone === '01730444535' ? staticHash : dynamicHash
    formData.secretkey = secretkey;

    let formObject = {};

    // Iterate through the formData object and add key-value pairs to formObject
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        formObject[key] = formData[key].toString();
      }
    }

    var jsonString = JSON.stringify(formObject); // Convert formObject to a JSON string

    var form = new FormData(); // Create a new FormData object

    form.append("postData", jsonString); // Append the JSON string to the FormData object

    let imeiNumber = "";

    fetch(postUrl, {
      method: "POST",
      body: form,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(async (data) => {
        const baseUrl = "https://ctgshop.com/xapp/test/index.html";
        const url = new URL(baseUrl);

        imeiNumber = data.data.imei;

        if (
          data.message === "Session Not" ||
          data.status === false ||
          Object.keys(data.data).length === 0
        ) {
          await localStorageManager("remove", "xAppUserInfo");
          window.location.href = `https://ctgshop.com/xapp/test/login.html`;
          return;
        }
        // url.searchParams.set('identity', encodeURIComponent(data.data.emCode || ""));
        // url.searchParams.set('name', encodeURIComponent(data.data.emName || ""));
        // url.searchParams.set('boss', encodeURIComponent(data.data.bossID || ""));
        // url.searchParams.set('bossName', encodeURIComponent(data.data.bossName || ""));

        // window.history.replaceState(null, '', url.toString());

        // Set query parameters
        url.searchParams.set("identity", data.data.emCode || "");
        url.searchParams.set("name", data.data.emName || "");
        url.searchParams.set("boss", data.data.bossID || "");
        url.searchParams.set("bossName", data.data.bossName || "");

        // Convert URL to string and replace "+" with "%20"
        const formattedUrl = url.toString().replace(/\+/g, "%20");

        // Update the browser's address bar without reloading
        window.history.replaceState(null, "", formattedUrl);

        await hideLoading("loading");

        let birthdays = [];
        let birthDayEvents = [];

        // https://api.ctgshop.com/xapi/dash_api.ashx?cmd=emp&list=mac&imei=70:3a:51:90:39:05`

        fetch(
          `https://api.ctgshop.com/xapi/dash_api.ashx?cmd=empcode&list=mac&imei=` +
            data.data.emCode
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status === false) {
              const welcome = document.getElementById("welcome");

              const imgTag = welcome.getElementsByTagName("img")[0];
              imgTag.src = "./assets/images/avatar.png";
              imgTag.alt = "Welcome Image";
              imgTag.width = "100";
              imgTag.height = "100";
              imgTag.style.borderRadius = "50px";

              const spanTag = welcome.getElementsByTagName("span")[0];
            } else if (data.status === true) {
              const emInfo = data.data[0];

             

              const welcome = document.getElementById("welcome");
              const imgTag = welcome.getElementsByTagName("img")[0];
              imgTag.src = emInfo.emImage;
              imgTag.alt = "Welcome Image";
              imgTag.width = "100";
              imgTag.height = "100";
              imgTag.style.borderRadius = "50px";

              document.getElementById("short_info_name").innerHTML = "";
              document.getElementById("short_info_name").textContent =
                emInfo.emName;

              document.getElementById("short_info_degi").innerHTML = "";
              document.getElementById("short_info_degi").textContent =
                emInfo.emPosition;

              document.getElementById("short_info_comp").innerHTML = "";
              document.getElementById("short_info_comp").textContent =
                emInfo.emOrganization;

              // if(window.Android){
              //   window.Android.setWebViewState(false)
              // }

              // if (window.isInWebView) {
              //   alert("Currently in WebView page");
              // } else {
              //   alert("Not in WebView page");
              // }

              // if (Android.isInWebView()) {
              //   alert("Currently in WebView");
              // } else {
              //   alert("Not in WebView");
              // }

              (function () {
                if (window.Android) {
                  // Safe way to check if `Android.isInWebView` exists before calling it
                  if (typeof window.Android.isInWebView === "function") {
                    if (window.Android.isInWebView()) {

                      // console.log("Currently in WebView page.");

                    } else {
                      // console.log("Not in WebView.");
                    }
                  } else {
                    // console.log(
                    //   "Android object exists but isInWebView() is not a function."
                    // );
                  }
                }
                // else
                // {
                //   alert("Android object is not available. Likely running in a regular browser.");
                // }

                // if (typeof Android !== "undefined" && Android.isWebViewPage) {
                //     alert("Currently inside WebView.");
                // } else {
                //     alert("On native Android page.");
                // }
              })();

              // Retrieve existing xAppUserInfo or initialize an empty object
              const userInfo = getData || {};

              // check if popup should show
              if (userInfo.popupShown !== "1") {
                const result = [];

                if (
                  emInfo.homePopBirthday &&
                  emInfo.homePopBirthday.isAvailable === true
                ) {
                  if (Array.isArray(emInfo.homePopBirthday)) {
                    result.push(
                      ...emInfo.homePopBirthday.map((value) => ({
                        txtBody: value.txtBody,
                        txtTitle: value.txtTitle || value,
                      }))
                    );
                  } else {
                    result.push({
                      txtBody: emInfo.homePopBirthday.txtBody,
                      txtTitle: emInfo.homePopBirthday.txtTitle,
                    });
                  }
                }

                if (
                  emInfo.homePopOtp &&
                  emInfo.homePopOtp.isAvailable === true
                ) {
                  result.push({ otp: emInfo.homePopOtp.txtBody });
                }

                if (result && result.length > 0) {
                  modal.style.display = "flex";
                  modal.style.flexDirection = "column";
                  modal.style.alignItems = "center";

                  const modalContent = document.querySelector(".modal-content");

                  // Clear any previous content except the close button
                  modalContent.innerHTML = '<span class="close">&times;</span>';

                  let html = `<div class="popup_message">`;

                  // If names exist, add them dynamically
                  const nameEntries = result.filter(
                    (entry) => entry.txtTitle || entry.txtBody
                  );

                  if (nameEntries.length > 0) {
                    html += `<div class="birthday_list" id="birthday_list">`;
                    if (nameEntries[0].txtTitle) {
                      html += `<h3>${nameEntries[0].txtTitle}</h3>`;
                    }
                    nameEntries.forEach((entry) => {
                      if (entry.txtBody) {
                        html += `<p> ${entry.txtBody.replace(
                          /\n/g,
                          "<br>"
                        )}</p>`;
                      }
                    });
                    html += `</div>`;
                  }

                  // If OTP exists, add it dynamically
                  const otpEntry = result.find((entry) => entry.otp);
                  if (otpEntry && otpEntry.otp) {
                    html += `
                                <button id="otpButton" class="otpButton">
                                  <p style="padding-right:10px">Your OTP Yet to redeem : </p>
                                  <h3>${otpEntry.otp}</h3>
                                </button>
                              `;
                  }

                  html += `</div>`; // Close popup_message div

                  modalContent.innerHTML += html;

                  userInfo.popupShown = "1";
                  localStorage.setItem(
                    "xAppUserInfo",
                    JSON.stringify(userInfo)
                  );

                  // Close button event listener
                  document
                    .querySelector(".close")
                    .addEventListener("click", function (event) {
                      modal.style.display = "none";
                      modalContent.innerHTML = "";
                    });
                }
              }

              // ensure to show photo and namd of employee having birthday event
              if (
                emInfo &&
                emInfo.homePopBirthday.isAvailable === true &&
                emInfo.birthdays.status === true
              ) {
                const bData = emInfo.birthdays.bData;

                if (
                  Array.isArray(emInfo.homePopBirthday) &&
                  Array.isArray(bData)
                ) {
                  birthdays.push(
                    ...emInfo.homePopBirthday
                      .filter((value) =>
                        bData.some((b) => b.emName === value.txtBody)
                      )
                      .map((value) => {
                        const imageLink = bData.find(
                          (b) => b.emName === value.txtBody
                        );
                        return {
                          txtBody: value.txtBody,
                          txtTitle: value.txtTitle || value,
                          img: imageLink?.emImage || "",
                        };
                      })
                  );
                } else if (Array.isArray(bData)) {
                  bData.forEach((person) => {
                    birthdays.push({
                      txtBody: `${person.emName}`,
                      txtTitle: emInfo.homePopBirthday.txtTitle,
                      img: `${person.emImage}`,
                    });
                  });
                } else {
                  let photo = bData[0];

                  birthdays.push({
                    txtBody: emInfo.homePopBirthday.txtBody,
                    txtTitle: emInfo.homePopBirthday.txtTitle,
                    img:
                      emInfo.homePopBirthday.txtBody === photo.emName
                        ? photo.emImage
                        : "",
                  });
                }
              }

              if (emInfo && emInfo.accessibleMenus) {
                fetchHomePageData(
                  emInfo.emCode,
                  emInfo.emName,
                  emInfo.emReportingBoss,
                  emInfo.embossName,
                  imeiNumber,
                  emInfo.accessibleMenus
                );
              }
            }
          })
          .catch((error) => {
            // console.log(error);
          });

        const main = document.getElementById("main");

        main.style.height = `${
          100 -
          (pxToVh(
            document.getElementById("top-section").offsetHeight +
              document.getElementById("bottom-section").offsetHeight
          ) +
            3)
        }vh`;
        main.style.top = `${
          document.getElementById("top-section").offsetHeight + 25
        }px`;

        // manage navigation button's url
        const bottom_section = document.getElementById("bottom-section");
        const buttons = bottom_section.querySelectorAll("button");
        const modal = document.getElementById("myModal");

        buttons.forEach((button, index) => {
          switch (button.id) {
            case "hrmButton":
              button.onclick = function () {
                hrmRoute(
                  "./pages/HRM.html",
                  "hrmMain",
                  "hrmIcon",
                  `${data.data.emCode}`,
                  `${data.data.emName}`,
                  `${data.data.bossID}`,
                  `${data.data.bossName}`
                );
              };
              break;
            case "notification_nav":
              // button.onclick = function() {
              //     routeToPage("./pages/Notice.html", "noticeMain", "Notice Board",`${data.data.emCode}`);
              // };

              button.onclick = function () {
                modal.style.display = "flex";
                modal.style.flexDirection = "center";
                modal.style.alignItems = "center";
                const modalContent = document.querySelector(".modal-content");

                // Clear any previous content except the close button
                modalContent.innerHTML = '<span class="close">&times;</span>';

                const html = ` 
                            <div class="content">
                              <p>Notifications</p>
                              <div>
                                <button id="otpButton">
                                  <img src="assets/icons/otp.png" alt="no_img" width=40px height=40px />
                                  OTP
                                </button>
                                <button id="noticeButton">
                                  <img src="assets/icons/notice.png" alt="no_img" width=40px height=40px />
                                  Notice
                                </button>
                                <button id="birthdayButton">
                                  <img src="assets/icons/confetti.png" alt="no_img" width="40px" height="40px" />
                                  Birthday
                                </button>
                              </div>
                            </div>
                          `;

                modalContent.innerHTML += html;

                document
                  .getElementById("noticeButton")
                  .addEventListener("click", () =>
                    routeToPage(
                      "./pages/Notice.html",
                      "noticeMain",
                      "Notice Board",
                      data.data.emCode
                    )
                  );

                // Example: Add similar event listeners for other buttons
                document
                  .getElementById("otpButton")
                  .addEventListener("click", () =>
                    routeToPage(
                      "./pages/HumanResourceActivity.html",
                      "",
                      "OTP",
                      data.data.emCode
                    )
                  );

                document
                  .getElementById("birthdayButton")
                  .addEventListener("click", () => {
                    //  birthdays.push(`{name=${encodeURIComponent(data.data.emName)}&boss=${data.data.bossID}&bossName=${encodeURIComponent(data.data.bossName)}}`)
                    let bdEncoded = encodeURIComponent(
                      JSON.stringify(birthdays)
                    );

                    if (bdEncoded.length > 0) {
                      routeToBirthdayPage(
                        `./pages/Birthday.html`,
                        "birthdayMain",
                        "Happy Birthday",
                        data.data.emCode,
                        data.data.emName,
                        data.data.bossID,
                        data.data.bossName,
                        bdEncoded
                      );
                    } else {
                      routeToBirthdayPage(
                        `./pages/Birthday.html`,
                        "birthdayMain",
                        "Happy Birthday",
                        data.data.emCode
                      );
                    }
                  });

                document
                  .querySelector(".close")
                  .addEventListener("click", function (event) {
                    modal.style.display = "none";
                    modalContent.innerHTML = "";
                  });
              };

              break;
            case "contact_nav":
              // button.onclick = function() {
              //     routeToPage("./pages/Contacts.html", "contactMain", "Contacts",`${data.data.emCode}`);
              // };

              button.onclick = function () {
                modal.style.display = "flex";
                modal.style.flexDirection = "center";
                modal.style.alignItems = "center";
                const modalContent = document.querySelector(".modal-content");

                // Clear any previous content except the close button
                modalContent.innerHTML = '<span class="close">&times;</span>';

                const html = ` 
                          <div class="content">
                            <p>Contacts</p>
                            <div>
                              <button id="companyBtn">
                                <img src="assets/icons/company_contacts.png" alt="no_img" width="40px" height="40px" />
                                Company
                              </button>
                              <button id="empBtn">
                                <img src="assets/icons/contacts.png" alt="no_img" width="40px" height="40px" />
                                Employees
                              </button>
                              
                            </div>
                          </div>
                          `;

                modalContent.innerHTML += html;

                document
                  .getElementById("companyBtn")
                  .addEventListener("click", () =>
                    routeToPage(
                      "./pages/Options.html",
                      "optionsMain",
                      "Contact Us",
                      data.data.emCode
                    )
                  );

                // Example: Add similar event listeners for other buttons
                document
                  .getElementById("empBtn")
                  .addEventListener("click", () =>
                    routeToPage(
                      "./pages/Contacts.html",
                      "contactsMain",
                      "Contacts",
                      data.data.emCode
                    )
                  );

                document
                  .querySelector(".close")
                  .addEventListener("click", function (event) {
                    modal.style.display = "none";
                    modalContent.innerHTML = "";
                  });
              };

              break;
            case "options_nav":
              // button.onclick = function() {
              //     routeToPage("./pages/Options.html", "optionsMain", "Options");
              // };
              button.onclick = function () {
                modal.style.display = "flex";
                modal.style.flexDirection = "center";
                modal.style.alignItems = "center";
                const modalContent = document.querySelector(".modal-content");

                // Clear any previous content except the close button
                modalContent.innerHTML = '<span class="close">&times;</span>';

                const html = ` 
                            <div class="content">
                              <p>Version: 2.2.5</p>
                              <div>
                                <button id="ownProfile">
                                  <img src="assets/icons/profile.png" alt="no_img" width="40px" height="40px" />
                                  My Profile
                                </button>
                                <button id="updateEvent">
                                  <img src="assets/icons/update.png" alt="no_img" width="40px" height="40px" />
                                  Update App
                                </button>
                                <button id="exitApp">
                                  <img src="assets/icons/app.png" alt="no_img" width="40px" height="40px" />
                                  Exit App
                                </button>
                              </div>
                            </div>
                          `;

                modalContent.innerHTML += html;

                document
                  .getElementById("ownProfile")
                  .addEventListener("click", () =>
                    routeToPage(
                      "./pages/Options.html",
                      "optionsMain",
                      "Profile",
                      data.data.emCode
                    )
                  );

                // Example: Add similar event listeners for other buttons
                document
                  .getElementById("updateEvent")
                  .addEventListener("click", () => {
                    return null;
                  });

                document
                  .getElementById("exitApp")
                  .addEventListener("click", () => {
                    return null;
                  });
                document
                  .querySelector(".close")
                  .addEventListener("click", function (event) {
                    modal.style.display = "none";
                    modalContent.innerHTML = "";
                  });
              };

              break;
            default:
              // console.log("Unknown button clicked");
          }
        });

        // fetchHomePageData(data.data.emCode,data.data.emName,data.data.bossID,data.data.bossName,data.data.imei);
      })
      .catch((error) => {
        // console.log(error);
      });
  } else {
    window.location.href = "https://ctgshop.com/xapp/test/login.html";
  }
});

async function fetchHomePageData(
  code,
  name,
  bossId,
  bossName,
  imei,
  permission
) {
  try {
    let permissionList = [];
    permission.split(",").forEach((per) => {
      permissionList.push(per.trim());
    });

    // "XLimited, BeRichLimited, BeFreshLimited, AmyTravelTech, BeFreshFX, BEC, CtgShop, BeRichMfg, ChittagongTravel, BestErp"

    const response = await fetch("./helpers/dbs.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const parsedData = JSON.parse(data);
    const container = document.getElementById("main"); // Get the image element by its id
    const top_section = document.getElementById("top-section");
    const bottom_section = document.getElementById("bottom-section");
    container.innerHTML = "";

    const allowedObj = parsedData.Image.filter((obj) =>
      permissionList.includes(obj.name)
    );

    allowedObj.map((file, index) => {
      const div = document.createElement("div"); // Create a div element
      const itemBtn = document.createElement("button");
      const imageElement = document.createElement("img"); // Create an img element for each file
      imageElement.src = file.img; // Set the src attribute to the URL of the image file
      imageElement.alt = "No image"; // Set the alt attribute
      // imageElement.width = 120;
      // imageElement.height = 60;
      itemBtn.type = "button";
      itemBtn.classList.add("item-add-btn");

      if (file === "./assets/images/Be Rich Logo.png") {
        itemBtn.addEventListener("click", () => {
          window.location.href = `./beRich/index.html?name=${name}`;
        });
      }

      if ((index + 1) % 2 === 0) {
        div.classList.add("even-div");
      } else {
        div.classList.add("odd-div");
      }

      div.appendChild(itemBtn);
      itemBtn.appendChild(imageElement);
      container.appendChild(div);

      itemBtn.onclick = function () {
        if (file.img === "./assets/images/x-limited.png") {
          window.location.href = `./pages/BossMenu.html?identity=${code}&name=${encodeURIComponent(
            name
          )}&boss=${bossId}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${imei}`;
        } else if (file.img === "./assets/images/amybd.png") {
          window.location.href = `./pages/Amy.html?identity=${code}&name=${encodeURIComponent(
            name
          )}&boss=${bossId}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${imei}`;
        } else if (
          file.img === "./assets/images/South East Money Exchange Logo.png"
        ) {
          window.location.href = `./pages/BefreshFx.html?identity=${code}&name=${encodeURIComponent(
            name
          )}&boss=${bossId}&bossName=${encodeURIComponent(bossName)}`;
        } else if (file.img === "./assets/images/BeFreshEdu Logo.png") {
          window.location.href = `./pages/Bec.html?identity=${code}&name=${encodeURIComponent(
            name
          )}&boss=${bossId}&bossName=${encodeURIComponent(bossName)}`;
        } else if (
          file.img === "./assets/images/CtgShop.com_Logo,_2018.svg.png"
        ) {
          window.location.href = `./pages/Ctgshop.html?identity=${code}&name=${encodeURIComponent(
            name
          )}&boss=${bossId}&bossName=${encodeURIComponent(bossName)}`;
        } else if (
          file.img === "./assets/images/Be Rich Manufacturing Logo.png"
        ) {
          window.location.href = `./pages/BerichMfg.html?identity=${code}&name=${encodeURIComponent(
            name
          )}&boss=${bossId}&bossName=${encodeURIComponent(bossName)}`;
        } else if (file.img === "./assets/images/Chittagong travel.png") {
          window.location.href = `./pages/CtgTravel.html?identity=${code}&name=${encodeURIComponent(
            name
          )}&boss=${bossId}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${imei}`;
        } else if (file.img === "./assets/images/best_erp.png") {
          window.location.href = `./pages/BestErp.html?identity=${code}&name=${encodeURIComponent(
            name
          )}&boss=${bossId}&bossName=${encodeURIComponent(bossName)}`;
        } else if (file.img === "./assets/images/BeFresh Logo.png") {
          window.location.href = `./pages/Befresh.html?identity=${code}&name=${encodeURIComponent(
            name
          )}&boss=${bossId}&bossName=${encodeURIComponent(
            bossName
          )}&imei=${imei}`;
        } else if ((file.img = "./assets/images/Be Rich Logo.png")) {
          window.location.href = `./beRich/index.html?name=${name}`;
        }
      };
    });

    if (top_section) {
      const height = top_section.offsetHeight;
      container.style.paddingTop = height + "px";
    }
    if (bottom_section) {
      const height = bottom_section.offsetHeight;
      container.style.paddingBottom = height + "px";
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Get the modal element
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("options_nav");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function pxToVh(px) {
  const vh = window.innerHeight / 100; // 1vh in pixels
  return px / vh; // Convert px to vh
}
