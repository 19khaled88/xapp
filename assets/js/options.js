// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");
const identity = urlParams.get('identity');


const rootUrl = 'https://api.ctgshop.com'
const rootWwwUrl = 'https://api.ctgshop.com'
// const rootUrl = 'https://condomshopbd.com'
// const rootWwwUrl = 'https://www.condomshopbd.com'

const optionsMain = document.getElementById("optionsMain");

if (pageTitle === "Profile") {
  // "BR-0293-16" 
  const url =`${rootWwwUrl}/xapi/dash_api.ashx?cmd=empcode&list=mac&imei=` + identity;
  fetchData(url)
    .then((data) => {
      if (data.status === true) {
        
        showProfileData(data);
      }
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
    });
} else if (pageTitle === "Contact Us") {
  const url = "../helpers/dbs.json";
  fetchData(url)
    .then((data) => {
      companyDetails(data, pageTitle);
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
    });
} else if(pageTitle === "Send SMS"){
    smsContainer(pageTitle)
} else if(pageTitle === 'oneTimePass'){
  const optionsTop = document.getElementById("optionsTop");
  const topTitle = `
  <button class="options_back_btn" id="options_back_btn" onclick="handleBackButton()">
        <i class="fa-solid fa-arrow-left fa-2x" style="color:white;"></i>
    </button>
    <p>OTP (One Time Password)</p>
  `
  let tBody = [];

  // const headerData = ['OTP Generate Time','OTP Module','OTP'];
  // const table = createTable('X-App OTP',headerData,tBody,'otpTable',false,null);
  // const optionsMain = document.getElementById('optionsMain');
  // optionsMain.appendChild(table);

  optionsTop.innerHTML = topTitle;

  const url = `https://www.befreshbd.com/ZaraApi.ashx?type=get_login_otp&emp=${identity}`;
  fetchData(url)
  .then((data)=>{
    // console.log(data)
    if(data && data.status === true){
      data.Data.forEach((element,index)=>{      
        let obj ={
          'OTP Generate Time':element['OTP Generate Time'],
          'OTP Module':element['OTP Module'],
           OTP:element['OTP']
        }
      
        tBody.push(obj)
      })
     
      const headerData = ['OTP Generate Time','OTP Module','OTP'];
      const table = createTable('X-App OTP',headerData,tBody,'otpTable',false,null);
      const optionsMain = document.getElementById('optionsMain');
      optionsMain.appendChild(table);
   
    }else if(data && Object.keys((data.Data)[0]).length <= 0 && data.status === false){
      const headerData = ['OTP Generate Time','OTP Module','OTP'];
      const table = createTable('X-App OTP',headerData,tBody,'otpTable',false,null);
      const optionsMain = document.getElementById('optionsMain');
      optionsMain.appendChild(table);
      
      Swal.fire({
        icon: "info",
        text: "Data not found",
        confirmButtonText: "Ok",
      });

    }
  }).catch((error)=>{
    Swal.fire({
      icon: "info",
      text: error,
      confirmButtonText: "Ok",
    });
  })

  
}

function showProfileData(data) {
  const optionsMain = document.getElementById("optionsMain");
  const optionsTop = document.getElementById("optionsTop");
  const prag = document.createElement("p");
  // const title = `
  //     <button class="options_back_btn" id="options_back_btn" onclick="routeToPage('../index.html','main','')">
  //           <i class="fa-solid fa-arrow-left fa-2x" style="color:white;"></i>
  //       </button>
  //       <p>Profile Page</p>
  // `

  const topTitle = `
  <button class="options_back_btn" id="options_back_btn" onclick="handleBackButton()">
        <i class="fa-solid fa-arrow-left fa-2x" style="color:white;"></i>
    </button>
    <p>Personal Profile</p>
  `

  prag.textContent = pageTitle + " Page";


  optionsMain.innerHTML = "";

  const res = data.data;
  res.forEach((element) => {
    // console.log(element)

    // <span><label>BirthDate</label><p>${element.emBirthdate}</p></span>

    optionsMain.innerHTML = `
        <div id="topDiv">
            <img id="employeeImage" src="${element.emImage}" alt="No Image"/>
            <h2>${element.emName}</h2>
            <h3>${element.emDesignation} (${element.emSubDept}) | ${element.emCode}</h3>
        </div>
        <div id="bottomDiv">
            <span><label>Company </label> <p>${element.emOrganization}</p></span>
            <span><label>Designation</label><p>${element.emDesignation} (${element.emSubDept})</p></span>
            <span><label>Position</label><p>${element.emPosition}</p></span>
            <span><label>Grade</label><p>${element.emGrade}</p></span>
            <span><label>Department</label><p>${element.emDepartment}</p></p></span>
            <span><label>Office</label><p>${element.emOffice}</p></span>
            <span><label>Location</label><p>${element.emLocation}</p></span>
            <span><label>Join</label><p>${element.emDateOfJoin}</p></span>
            <span><label>Mobile</label><p>${element.emPhone}</p></span>
            <span><label>Email</label><p>${element.emEmail}</p></span>
            <span><label>Blood Group</label><p>${element.emBloodGroup}</p></span>
            <span><label>Reporting Boss</label><p>${element.embossName}</p></span>
        </div>
    `;
  });

  // Create lightbox elements and append them to the body
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-content" id="lightbox-img">
  `;

  document.body.appendChild(lightbox);

  // Event listener to show lightbox
  optionsMain.addEventListener('click', function(e) {
    if (e.target.id === 'employeeImage') {
      const lightboxImg = document.getElementById('lightbox-img');
      lightboxImg.src = e.target.src;
      lightbox.style.display = 'flex';
    }
  });

  // Event listener to hide lightbox
  const lightboxClose = document.querySelector('.lightbox-close');
  lightboxClose.addEventListener('click', function() {
    lightbox.style.display = 'none';
  });

  optionsTop.innerHTML = topTitle;
}

function companyDetails(data, title) {
  const optionsMain = document.getElementById("optionsMain");
  const optionsTop = document.getElementById("optionsTop");
  const prag = document.createElement("p");
  prag.textContent = title;

  const topTitle = `
  <button class="options_back_btn" id="options_back_btn" onclick="handleBackButton()">
        <i class="fa-solid fa-arrow-left fa-2x" style="color:white;"></i>
    </button>
    <p>Company Details</p>
  `

  optionsMain.innerHTML = "";
  const res = data.companyDetails;


  res.forEach((company) => {
    const root = document.createElement("div");
    root.classList.add("company_container");
    for (const companyName in company) {
      if (Array.isArray(company[companyName])) {
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("right-div");
        const p = document.createElement("p");
        p.textContent = companyName
        infoDiv.appendChild(p)
        company[companyName].forEach((item) => {
          for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
              const value = item[key];
              const keyValueDiv = document.createElement("div");
              keyValueDiv.textContent = `${key}: ${value}`;
              infoDiv.appendChild(keyValueDiv);
            }
          }
        });
        
        root.appendChild(infoDiv);
      } else {
        const leftInfoDiv = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = company[companyName];
        imgElement.alt = "No Image"
        leftInfoDiv.classList.add("left-div");
        leftInfoDiv.appendChild(imgElement);
        root.appendChild(leftInfoDiv);
      }
    }
    optionsMain.appendChild(root)
  });

  // options_back_btn.appendChild(prag);
  optionsTop.innerHTML = topTitle;
}

function smsContainer(title){
    const optionsMain = document.getElementById("optionsMain");
    const optionsTop = document.getElementById("optionsTop");
    const prag = document.createElement("p");
    prag.textContent = title;

    const topTitle = `
    <button class="options_back_btn" id="options_back_btn" onclick="handleBackButton()">
          <i class="fa-solid fa-arrow-left fa-2x" style="color:white;"></i>
      </button>
      <p>Send SMS</p>
    `
    optionsMain.innerHTML = "";

    const useForm = handleSMSFormAndSubmit('sendSms','sendSms_class',identity);
   
    const smsContainer =`
   
        <div id="phone_number">
            <input type="number" name="phone" placeholder="Enter phone number"/>
        </div>
        <div id="company">
            <span>
                <input type="radio" name="company" value="Be Rich" id="beRichRadio" checked>
                <label>BeRich</label>
            </span>
            <span>
                <input type="radio" name="company" value="Be Fresh" id="beFreshRadio">
                <label>BeFresh</label>
            </span>
            <span>
                <input type="radio" name="company" value="Amy" id="amyRadio">
                <label>Amy</label>
            </span>
            <span>
                <input type="radio" name="company" value="Ctgshop" id="ctgshopRadio">
                <label>CtgShop</label>
            </span>
        </div>
        <div id="content_area">
            <textarea id="messageTextarea" name="message" placeholder="Write your message here"></textarea>
        </div>
        <button type="submit">Send</button>
    
`
    optionsMain.appendChild(useForm)
    useForm.innerHTML = smsContainer
    // options_back_btn.appendChild(prag);
    optionsTop.innerHTML = topTitle;
}
