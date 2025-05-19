if (!navigator.onLine) {
    handleOffline();
  }
  
// Parse the query string
const queryStrings = window.location.search;
const urlParams = new URLSearchParams(queryStrings);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");

const filterTitle = [
    {"C":"Company"},
    {"L":"Location"},
    {"D":"Department"},
    {"P":"Position"},
    {"O":"Office"}
]

const rootUrl = 'https://api.ctgshop.com'
const rootWwwUrl = 'https://api.ctgshop.com'
// const rootUrl = 'https://condomshopbd.com'
// const rootWwwUrl = 'https://www.condomshopbd.com'
// https://api.ctgshop.com/*

let newFilterData;
let fetchedData;
let newEmployeeHTML;

if (pageTitle === "Contacts") {
    // URL to fetch data from
  const url =`${rootWwwUrl}/xapi/dash_api.ashx?cmd=emp&list=all&imei=70:3a:51:90:39:05`;

// Fetch data from the URL
fetch(url)
  .then((response) => {
   
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the JSON response
    return response.json();
  })
  .then((data) => {
    if(data.status === true){
        // Work with the fetched data   
        fetchedData = data.data 
            
        showContact(data);
      
    }
  })
  .catch((error) => {
    // Handle errors
    console.error("There was a problem with the fetch operation:", error);
  });
}



function showContact(data){
    const filterData = data.data;
    manageEmployeeDataShow(filterData,'')
}

function handleFilterItem(item){
    const overlay = document.getElementById('overlay');
    overlay.innerHTML = '';
   let uniqueNames;

   if(item === 'Company'){
    uniqueNames = getUniqueValues(fetchedData, 'emOrganization');
    document.body.style.overflow = 'hidden';

    closeButton(overlay); 

    uniqueNames.forEach(company=>{
        const label = document.createElement('label');
            label.textContent = company;
            overlay.appendChild(label)
            // Add onclick event listener to the label element
            label.addEventListener('click', function() {
               const filteredCompany = fetchedData.filter(employee=>employee.emOrganization === company)
               newFilterData = filteredCompany
               manageEmployeeDataShow(filteredCompany,'')
               document.body.style.overflow = 'auto';
               overlay.style.display = "none";

               document.getElementById('single_emp_overlay').style.zIndex = `1000`;
               document.getElementById('single_emp_overlay').style.display = 'none';
               

            });
            overlay.style.display = "flex";
    });

    overlay.querySelector('button').style.top = `
        ${document.getElementById('contactTop').offsetHeight}px
    `
    // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    overlay.querySelector('button').addEventListener('click',()=>{
        document.getElementById('contactTop').style.zIndex = `1`;
        document.getElementById('single_emp_overlay').style.display = `none`;
        document.getElementById('single_emp_overlay').style.zIndex = `1000`;
    })

   } else if(item === 'Location'){
    uniqueNames = getUniqueValues(fetchedData, 'emLocation');
    document.body.style.overflow = 'hidden';

    closeButton(overlay);

    uniqueNames.forEach(location=>{
        const label = document.createElement('label');
            label.textContent = location;            
            overlay.appendChild(label)
             // Add onclick event listener to the label element
             label.addEventListener('click', function() {
                const filteredLocation = fetchedData.filter(employee=>employee.emLocation === location)
                newFilterData = filteredLocation
                manageEmployeeDataShow(filteredLocation,'');
                document.body.style.overflow = 'auto';
                overlay.style.display = "none";

                document.getElementById('single_emp_overlay').style.zIndex = `1000`;
                document.getElementById('single_emp_overlay').style.display = 'none';
               
            });
            overlay.style.display = "flex";
    });

    overlay.querySelector('button').style.top = `
        ${document.getElementById('contactTop').offsetHeight}px
    `

    // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    overlay.querySelector('button').addEventListener('click',()=>{
        document.getElementById('contactTop').style.zIndex = `1`;
        document.getElementById('single_emp_overlay').style.display = `none`;
        document.getElementById('single_emp_overlay').style.zIndex = `1000`;
    })

   } else if(item === 'Department'){
    uniqueNames = getUniqueValues(fetchedData, 'emDepartment');
    document.body.style.overflow = 'hidden';

    closeButton(overlay);

    uniqueNames.forEach(department=>{
        const label = document.createElement('label');
            label.textContent = department;
            overlay.appendChild(label)
              // Add onclick event listener to the label element
              label.addEventListener('click', function() {
                const filteredDepartment = fetchedData.filter(employee=>employee.emDepartment === department)
                newFilterData = filteredDepartment
                manageEmployeeDataShow(filteredDepartment,'')
                document.body.style.overflow = 'auto';
                overlay.style.display = "none";

                document.getElementById('single_emp_overlay').style.zIndex = `1000`;
                document.getElementById('single_emp_overlay').style.display = 'none';
               
            });
            overlay.style.display = "flex";
    });

    overlay.querySelector('button').style.top = `
        ${document.getElementById('contactTop').offsetHeight}px
    `

    // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    overlay.querySelector('button').addEventListener('click',()=>{
        document.getElementById('contactTop').style.zIndex = `1`;
        document.getElementById('single_emp_overlay').style.display = `none`;
        document.getElementById('single_emp_overlay').style.zIndex = `1000`;
    })
   } else if(item === 'Position'){
    uniqueNames = getUniqueValues(fetchedData, 'emPosition');
    document.body.style.overflow = 'hidden';

    closeButton(overlay);


    uniqueNames.forEach(position=>{
        const label = document.createElement('label');
            label.textContent = position;
            overlay.appendChild(label)
             // Add onclick event listener to the label element
             label.addEventListener('click', function() {
                const filteredPosition = fetchedData.filter(employee=>employee.emPosition === position)
                newFilterData = filteredPosition
                manageEmployeeDataShow(filteredPosition,'')
                document.body.style.overflow = 'auto';
                overlay.style.display = "none";

                document.getElementById('single_emp_overlay').style.zIndex = `1000`;
                document.getElementById('single_emp_overlay').style.display = 'none';
                
            });
            overlay.style.display = "flex";
    });

    overlay.querySelector('button').style.top = `
        ${document.getElementById('contactTop').offsetHeight}px
    `

    // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    overlay.querySelector('button').addEventListener('click',()=>{
        document.getElementById('contactTop').style.zIndex = `1`;
        document.getElementById('single_emp_overlay').style.display = `none`;
        document.getElementById('single_emp_overlay').style.zIndex = `1000`;
    })
   } else if(item === 'Office'){
    uniqueNames = getUniqueValues(fetchedData, 'emOffice');
    document.body.style.overflow = 'hidden';

    closeButton(overlay);


    uniqueNames.forEach(office=>{
        const label = document.createElement('label');
            label.textContent = office;
            overlay.appendChild(label)

            // Add onclick event listener to the label element
            label.addEventListener('click', function() {
                const filteredOffice = fetchedData.filter(employee=>employee.emOffice === office)
                newFilterData = filteredOffice
                manageEmployeeDataShow(filteredOffice,'')
                document.body.style.overflow = 'auto';
                overlay.style.display = "none";

                document.getElementById('single_emp_overlay').style.zIndex = `1000`;
                document.getElementById('single_emp_overlay').style.display = 'none';
                
            });
            overlay.style.display = "flex";
    });

    overlay.querySelector('button').style.top = `
        ${document.getElementById('contactTop').offsetHeight}px
    `

    // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    overlay.querySelector('button').addEventListener('click',()=>{
        document.getElementById('contactTop').style.zIndex = `1`;
        document.getElementById('single_emp_overlay').style.display = `none`;
        document.getElementById('single_emp_overlay').style.zIndex = `1000`;
    })
   } else if(item === 'single-column'){
    if(newFilterData != undefined){
        manageEmployeeDataShow(newFilterData, 'single-column')
        
    } else if(newFilterData === undefined && fetchedData != undefined){
        manageEmployeeDataShow(fetchedData, 'single-column')
        
    }
    
    overlay.style.display = "none";
    document.body.style.overflow = 'auto';
   } else if(item ==='double-column'){
    
    if(newFilterData != undefined){
        manageEmployeeDataShow(newFilterData, 'double-column')
    } else if(newFilterData === undefined && fetchedData != undefined){
        manageEmployeeDataShow(fetchedData, 'double-column')
    }
    
    overlay.style.display = "none";
    document.body.style.overflow = 'auto';
   } 

   
}

function getUniqueValues(arrayOfObjects, key) {
    // Use Set to store unique values
    const uniqueValues = new Set();

    // Iterate over the array of objects
    arrayOfObjects.forEach(obj => {
        // Add the value of the specified key to the Set
        uniqueValues.add(obj[key]);
    });

    // Convert the Set back to an array
    return Array.from(uniqueValues);
}

function handleSingleEmpShow(emCode){
   const result =  fetchedData.filter((emp)=>emp.emCode === emCode)
   const overlay = document.getElementById('overlay');
   if(result){
       manageEmployeeDataShow(result,'emp-details')
   }
   
   overlay.style.display = "none"


   document.getElementById('goBack').addEventListener('click',(event)=>{
    const single_emp_overlay = document.getElementById('single_emp_overlay');
    // Hide the element
    single_emp_overlay.style.display = 'none';

    // Clear the content inside the element
    single_emp_overlay.innerHTML = '';

    // Set body overflow to auto (this will restore scrolling)
    document.body.style.overflow = 'auto';
   })

}

function handleConnect(info,type){
    if(type === 'phone'){
        window.location.href = "tel:" + info;
    }else if(type === 'email'){
        window.location.href = "mailto:" + info;
    }else if(type === 'msg'){
        window.location.href = "sms:" + info;
    }
}


function manageEmployeeDataShow(filterData,classHint){
    let contact_top = true
    
    const contactsMain = document.getElementById("contactsMain");
    const contactTop = document.getElementById('contactTop');
   
    
    newEmployeeHTML = filterData.map((element, index) => `
        <div class="employee" >
        ${
            classHint === 'double-column' ? 
            `
            <div class="topView" onclick='handleSingleEmpShow(${JSON.stringify(element.emCode)})'>
                <p class="emName">${index + 1}. ${element.emName}</p>
            </div>
            <div class="buttomView">
                <div id="imgDiv" class="loading">
                    <span style="width:100%;height:100%" class="spin">
                        <i class="fas fa-circle-notch fa-spin fa-3x spin" style="width:100%;color:blue"></i>
                    </span>

                    <img 
                        data-src="${element.emImage}" 
                        src="../assets/images/default.png"
                        class="lazy"
                        alt="Employee Image" 
                        onclick='handleSingleEmpShow(${JSON.stringify(element.emCode)})'
                        onload="handleImageLoad(this)"
                        onerror="handleImageError(this)"
                        style="display: none;" 
                    >
                    
                </div>
                <div id="connect">
                        <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "phone")'><img src="../assets/images/telephone.png" alt="empty"/></button>
                        <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "msg")'><img src="../assets/images/sms.png" alt="empty"/></button>
                        <button onclick='handleConnect(${JSON.stringify(element.emEmail)}, "email")'> <img src="../assets/images/email.png" alt="empty"/></button>
                </div>
            </div>
            ` : 
            classHint === 'single-column' ? 
            `
            <div class="leftView">
                <span class="index">${index + 1}</span>
                <div id="image_icon" class="loading">
                    <span style="width:100%;height:100%;display:flex" class="spin">
                        <i class="fas fa-circle-notch fa-spin fa-3x spin" style="width:100%;color:blue;display:flex"></i>
                    </span>
                    <img 
                        data-src="${element.emImage}" 
                        src="../assets/images/default.png"
                       
                        class="lazy"
                        alt="Employee Image" 
                        onclick='handleSingleEmpShow(${JSON.stringify(element.emCode)})'
                        onload="handleImageLoad(this)"
                        onerror="handleImageError(this)"
                        style="display: none;" 
                    >
                    <div id="connect">
                        <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "phone")'><img src="../assets/images/telephone.png" alt="empty"/></button>
                        <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "msg")'><img src="../assets/images/sms.png" alt="empty"/></button>
                        <button onclick='handleConnect(${JSON.stringify(element.emEmail)}, "email")'> <img src="../assets/images/email.png" alt="empty"/></button>
                    </div>
                </div>
            </div>
            <div class="rightView" onclick='handleSingleEmpShow(${JSON.stringify(element.emCode)})'>
                <p class="emName">${element.emName}</p>
                <p class="emDegi">${element.emDesignation}</p>
                <p class="emDegi">${element.emOrganization}</p>
                <p class="emDegi">${element.emPhone}</p>
                <p class="emDegi">${element.emEmail}</p>
            </div>
            ` :
            `
            <div class="leftView">
                <span class="index">${index + 1}</span>
                <div id="image_icon" class="loading">
                   
                    <span style="width:100%;height:100%" class="spin">
                        <i class="fas fa-circle-notch fa-spin fa-3x spin" style="width:100%;color:blue"></i>
                    </span>
                    <img 
                        data-src="${element.emImage}" 
                        src="../assets/images/default.png"
                       
                        class="lazy"
                        alt="Employee Image" 
                        onclick='handleSingleEmpShow(${JSON.stringify(element.emCode)})'
                        onload="handleImageLoad(this)"
                        onerror="handleImageError(this)"
                        style="display: none;" 
                    >
                    <div id="connect">
                        <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "phone")'><img src="../assets/images/telephone.png" alt="empty"/></button>
                        <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "msg")'><img src="../assets/images/sms.png" alt="empty"/></button>
                        <button onclick='handleConnect(${JSON.stringify(element.emEmail)}, "email")'> <img src="../assets/images/email.png" alt="empty"/></button>
                    </div>
                </div>
            </div>
            <div class="rightView" onclick='handleSingleEmpShow(${JSON.stringify(element.emCode)})'>
                <p class="emName">${element.emName}</p>
                <p class="emDegi">${element.emDesignation}</p>
                <p class="emDegi">${element.emOrganization}</p>
                <p class="emDegi">${element.emPhone}</p>
                <p class="emDegi">${element.emEmail}</p>
            </div>
            `
        }   
        </div>
        `).join('');
    
    empDetails = filterData.map((element,index)=>`
            <div class="topDetails">    
                <div class="em_image" id="em_image">
                    <span>${element.emName}</span>
                    <img 
                        id="employeeImage"  
                        data-src="${element.emImage}" 
                        src="../assets/images/default.png" 
                       
                        alt="empty" 
                        class="lazy"
                    />
                </div>
                <div id="connect">
                    <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "phone")'><img src="../assets/images/telephone.png" alt="empty"/></button>
                    <button onclick='handleConnect(${JSON.stringify(element.emPhone)}, "msg")'><img src="../assets/images/sms.png" alt="empty"/></button>
                    <button onclick='handleConnect(${JSON.stringify(element.emEmail)}, "email")'> <img src="../assets/images/email.png" alt="empty"/></button>
                </div>
            </div>
            <div class="bottomDetils">
                <span>
                    <label>Company</label>
                    <p>${element.emOrganization}</p>
                </span>
                <span>
                    <label>Designation</label>
                    <p>${element.emDesignation}</p>
                </span>
                <span>
                    <label>Office</label>
                    <p>${element.emOffice}</p>
                </span>
                <span>
                    <label>Location</label>
                    <p>${element.emLocation}</p>
                </span>
                <span>
                    <label>Department</label>
                    <p>${element.emDepartment}</p>
                </span>
                <span>
                    <label>Join</label>
                    <p>${element.emDateOfJoin}</p>
                </span>
                <span>
                    <label>Birthdate</label>
                    <p>${element.emBirthdate}</p>
                </span>
                <span>
                    <label>Cell Number</label>
                    <p>${element.emPhone}</p>
                </span>
                <span>
                    <label>Email</label>
                    <p>${element.emEmail}</p>
                </span>
                <span>
                    <label>PABX</label>
                    <p>${element.emPabx}</p>
                </span>
               
                <span>
                    <label>Position</label>
                    <p>${element.emPosition}</p>
                </span>
            </div>
    `);

    // <button class="contact_back_btn" onclick="routeToPage('../index.html','','')">
    // <button class="contact_back_btn" onclick="routeToPage('HRM.html','hrmMain','hrmIcon','')">
    contactTop.innerHTML =`
        <div class="backBtn" id="contactBackBtn">
            <button class="contact_back_btn" onclick="handleBackButton()">
                <i class="fa-solid fa-arrow-left fa-2x" style="color:white;"></i>
            </button>
            <p>Contacts</p>
        </div>
        <div class="search-container">
            <div id="inputSpace">
                <input type="text" id="searchInput" placeholder="Search by Name or Mobile">
            </div>
            <div id="searchBtn">
                <button id="empSearchButton" >
                    <i class="fa fa-search" style="font-size:26px"></i>
                </button>
            </div>
            <div id="filter" class="filter">
                <button class="material-symbols-outlined" id="filterBtn" onclick="toggleFilterContent()">
                    tune
                </button>
                <div id="extendedFilterContent" class="extended-filter-content">
                    
                </div>
            </div>
        </div>
        <div class="filter-container" id="filter-container">
            ${filterTitle.map((item) =>`
                <div id="filterBtn" class="filterBtn">
                    <button onclick='handleFilterItem(${JSON.stringify(Object.values(item)[0]).trim()})'>
                        <h1>${Object.keys(item)}</h1>
                        <label>${Object.values(item)}</label>
                    </button>
                </div>
            `).join('')}
            <div id="filterBtn" class="filterBtn">
                <button onclick='handleFilterItem("single-column")'>
                    <i class="fa-solid fa-list" aria-hidden="true" style="font-size: 30px; color: black;"></i>
                </button>
            </div>
            <div id="filterBtn" class="filterBtn">
                <button onclick='handleFilterItem("double-column")'>
                    <i class="fa-solid fa-bars" aria-hidden="true" style="font-size: 30px; color: black;"></i>
                </button>
            </div>
        </div>
    `

    if(classHint ==='emp-details'){
        const single_emp_overlay = document.getElementById('single_emp_overlay');
        single_emp_overlay.innerHTML = `
        <button class="goBack" id="goBack">
           <i class="fa-solid fa-arrow-left" aria-hidden="true" style="font-size:25px;padding-left:10px" ></i>
            <p>Detailed Information</p>
        </button>
        <div class="individual-employee-container" id="individual_employee_container">
            <div id="emp-details"> 
                ${empDetails}
            </div> 
        </div>`;
        
      
        single_emp_overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';


        const goBack_height = single_emp_overlay.querySelector('.goBack').offsetHeight;
        const emp_details = single_emp_overlay.querySelector('.individual-employee-container').querySelector('#emp-details')
        
        const toDetails_height = emp_details.querySelector('.topDetails').offsetHeight
        emp_details.querySelector('.bottomDetils').style.height = `${window.innerHeight - (goBack_height + toDetails_height)}px`

        

    }else if(classHint === 'single-column'){
        contactsMain.innerHTML =` 
        <div class="individual-employee-container">
        <div id="contentContainer"></div>
            ${
                classHint === 'double-column' ? 
                `<div id="double_column">
                    ${newEmployeeHTML}
                </div>`:
                classHint === 'single-column' ? 
                `<div id="single_column">
                    ${newEmployeeHTML}
                </div>`:
                classHint === 'emp-details' ? 
                `<div id="emp-details"> 
                   ${empDetails}
                </div>`:
                `<div id="single_emp">
                    ${newEmployeeHTML}
                </div>`
            }
        </div>`;
        document.body.style.overflow = 'auto';
        
    }else{
        contactsMain.innerHTML =` 
        <div class="individual-employee-container">
        <div id="contentContainer"></div>
            ${
                classHint === 'double-column' ? 
                `<div id="double_column">
                    ${newEmployeeHTML}
                </div>`:
                classHint === 'single-column' ? 
                `<div id="single_column">
                    ${newEmployeeHTML}
                </div>`:
                classHint === 'emp-details' ? 
                `<div id="emp-details"> 
                   ${empDetails}
                </div>`:
                `<div id="single_emp">
                    ${newEmployeeHTML}
                </div>`
            }
        </div>`;
        document.body.style.overflow = 'auto';
    }
    
    if(contactTop){
        const height = contactTop.offsetHeight;
        contactsMain.style.paddingTop = height + 'px';
    }else{
        contactsMain.style.paddingTop = '0';
    }

    const empSearchButton = document.getElementById('empSearchButton');
    
    // Add click event listener to the button
    empSearchButton && empSearchButton.addEventListener('click', function() {

        // Select the input element by its id
        const searchInput = document.getElementById('searchInput');

        // Get the text entered in the input field
        const searchText = searchInput.value;

        if(searchText.length > 0){
            // All fetchData
            const searchAbleData = fetchedData
                
            findBestMatches( searchAbleData ,searchText);


            const overlay = document.getElementById("overlay");
            let labels = overlay.getElementsByTagName('label');


            // Check if overlay has display: flex
            const overlayStyle = window.getComputedStyle(overlay);
            if (overlayStyle.display === 'flex') {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }

            // Convert HTMLCollection to an array to safely remove elements
            labels = Array.from(labels);
            labels.forEach((label)=>{
                overlay.removeChild(label)
            });
        }
               
    }); 


    // manage no image
    const image_icon = document.querySelectorAll('#image_icon');
    
    image_icon.forEach((element,index)=>{
        const imgElement = element.querySelector('img');
        const connect = document.getElementById('connect');
    
        element.querySelectorAll('img').forEach(img=>{
            // console.log('Image element:', img);
            // console.log('Image src:', img.src);

            // Check if the image src is valid
            const image = new Image();
            image.src = img.src;
            image.onload = () => {
                
            };
            image.onerror = () => {
                img.src = "../assets/images/default.png";
            };
        })

    })

   
    // manage no image
    const images = document.querySelectorAll('img');
   

    // Create lightbox elements and append them to the body
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
    `;

    // document.body.appendChild(lightbox);

    
    const em_image = document.getElementById('em_image')
    

    // Event listener to show lightbox
    em_image && em_image.addEventListener('click', function(e) {
        // Remove existing lightbox if present
        const existingLightbox = document.getElementById('lightbox');
        if (existingLightbox) {
            existingLightbox.remove();
        }

        // Create new lightbox
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-content" id="lightbox-img">
        `;
        
        document.body.appendChild(lightbox);

        if (e.target.id === 'employeeImage') {  
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = e.target.src;
            lightbox.style.display = 'flex';
        }

        const lightboxClose = document.querySelector('.lightbox-close');
        lightboxClose && lightboxClose.addEventListener('click', function() {
            lightbox.style.display = 'none';
            lightbox.remove(); // Remove lightbox from the DOM when closed
        });
    });
    
    
    const contactTop_height =contactTop.offsetHeight 
    lazyLoadImages()

}

function toggleFilterContent() {
    const extendedFilterContent = document.getElementById('extendedFilterContent');
  const filter_overlay = document.getElementById('filter_overlay');
    
  // Toggle active class for slide-in/out effect
  extendedFilterContent.classList.toggle('active');

  // If the sidebar is being shown, fetch data and populate it
  if (extendedFilterContent.classList.contains('active')) {
     
      if(document.querySelectorAll('.individual-employee-container')){
        const container = document.querySelectorAll('.individual-employee-container');
        const secondNestedDiv = container[0].querySelectorAll('div')[1]; // Second nested div
        if(secondNestedDiv){
        
          
        }
      }

      Object.assign(extendedFilterContent.style, {
          backgroundColor: '#FFFFFF',
          color: 'white',
          padding: '10px 15px',
          // margin: '2px 0',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'fixed',
          top: `${document.getElementById('contactBackBtn').offsetHeight + 1}px`,
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          display:'block',
          flexDirection: 'column',
          zIndex:'999',
      });

      // Adjust dynamic top offset based on hrmActivityTop's height
      const dynamicTop = document.getElementById('contactBackBtn').offsetHeight;
      extendedFilterContent.style.top = `${dynamicTop}px`;
      
      const url = `${rootUrl}/xapi/dash_api.ashx?cmd=emp&list=all&imei=70:3a:51:90:39:05`;
      
      fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (data.status === true) {
              const fetchedData = data.data;
              
              const names =[];
              const uniqueOrganizations = [...new Set(fetchedData.map(item => item.emOrganization))];
              const uniqueOffices = [...new Set(fetchedData.map(item => item.emOffice))];
              const uniqueLocations = [...new Set(fetchedData.map(item => item.emLocation))];
              const uniqueDepartments = [...new Set(fetchedData.map(item => item.emDepartment))];
              const uniqueDesignations = [...new Set(fetchedData.map(item => item.emDesignation))];
              const uniqueReportingBosses = [...new Set(fetchedData.map(item => item.emReportingBoss))];
              const uniqueBloodGroups = [...new Set(fetchedData.map(item => item.emBloodGroup))];

              uniqueReportingBosses.map(boss => {
                fetchedData.forEach(item => {
                  // Check if the reporting boss matches
                  if (item.emCode === boss) {
                      // Check if the name is not already in the names array
                      if (!names.includes(item.emName) && item.emName) { // Check for existence and ensure emName is defined
                          names.push(item.emName); // Push the name into the array
                      }
                  }
                });
              });
              
              const sections = [
                  { title: 'All Companies', items: uniqueOrganizations },
                  { title: 'All Locations', items: uniqueLocations },
                  { title: 'All Offices', items: uniqueOffices },
                  { title: 'All Departments', items: uniqueDepartments },
                  { title: 'All Designations', items: uniqueDesignations },
                  { title: 'All Reporting Bosses', items: names },
                  { title: 'All Blood Groups', items: uniqueBloodGroups }
              ];

              extendedFilterContent.innerHTML = ''; 

              const ConventDiv = document.getElementById('extendedFilterContent');
              const operationDiv = createNewElement('div','operationDiv','operationDiv');
              const confirmButton = createNewElement('button','confirmButton','confirmButton','OK');
              
              const closeButton = document.createElement('button');
              closeButton.className = 'material-symbols-outlined close-title';
              closeButton.style = `font-size:36px;color:black`;
              closeButton.textContent = 'close';


              closeButton.onclick = function(){
                
                const extendedFilterContent = document.getElementById('extendedFilterContent');
                const value = `${ extendedFilterContent.offsetHeight}`;
                closeFunction(extendedFilterContent,value);

                setTimeout(()=>{
                  filter_overlay ? Object.assign(filter_overlay.style,{
                    display:'none',
                  }) : '';
                },300);
                document.body.style.overflow = 'auto';
                
              }

              operationDiv.appendChild(closeButton);
              // operationDiv.appendChild(confirmButton)
              ConventDiv.appendChild(operationDiv)

              const checkBoxes = [];
              sections.forEach(section => {
                const { button, contentDiv } = createCollapsibleSection(section.title, section.items, handleCheckboxChange);
                extendedFilterContent.appendChild(button);
                extendedFilterContent.appendChild(contentDiv);

              });

              ConventDiv.appendChild(confirmButton)

              function handleCheckboxChange(selectedCheckboxes){
                selectedCheckboxes.forEach((checkbox)=>{
                  const exist = checkBoxes.some(cb => cb.label === checkbox.label && cb.item === checkbox.item)
                  if(!exist){
                    checkBoxes.push(checkbox)
                  }
                });
              }

              confirmButton.onclick = function(){
                

                const individual_employee_container = document.querySelector('.individual-employee-container');
                
                if(individual_employee_container){
                  const employeeElements = individual_employee_container.querySelectorAll('#single_emp, #single_column, #double_column');
                  
                  employeeElements.length > 0 && checkBoxes.length > 0 ? employeeElements.forEach(element => {
                    element.innerHTML = '';
                  const query = extractUniqueItems(checkBoxes,fetchedData)
                  }) : "";
                }

                const extendedFilterContent = document.getElementById('extendedFilterContent');
                const value = `${ extendedFilterContent.offsetHeight}`;
                closeFunction(extendedFilterContent,value);

                setTimeout(()=>{
                  filter_overlay ? Object.assign(filter_overlay.style,{
                    display:'none',
                  }) : '';
                },300);
                document.body.style.overflow = 'auto';
              }
            }
        })
        .catch(() => {});
        document.body.style.overflow = 'hidden';
        // document.body.style.pointerEvents = 'none';

      filter_overlay ? Object.assign(filter_overlay.style,{
        display:'flex',
      }) : '';
      
  } else {
      extendedFilterContent.innerHTML = '';
  }
}

function findBestMatches(array,searchText ) {
    // Filter the array to find objects whose names start with the search text
    const searchLower = searchText.toLowerCase();
   
    const matches = array.filter(obj => 
        obj.emName.toLowerCase().includes(searchLower) || 
        obj.emPhone.includes(searchLower)
    );
   
    
    if(matches && matches.length){
        newFilterData = matches
        manageEmployeeDataShow(matches,'')
    }else{
        Swal.fire({
            icon: "info",
            // title: "Oops...",
            text: "No Matches found!",
            footer: 'Try with new data'
          });
    }
}

// Function to create and prepend the close button
function closeButton(overlay) {
    const closeButton = document.createElement('button');
    
    closeButton.style.position = 'fixed'; // Optional: to position it at the top
    closeButton.style.top = `${document.getElementById('contactBackBtn').offsetHeight}px`; // Adjust as needed
    closeButton.style.right = '10px'; // Adjust as needed
    closeButton.style.border = 'none'; // Remove default button border
    closeButton.style.backgroundColor = 'transparent'; // Make button background transparent
    closeButton.style.cursor = 'pointer'; // Change cursor to pointer

 
    const closeIcon = document.createElement('i');
    closeIcon.className = 'fa-solid fa-xmark'; // Use Font Awesome class for the icon
    closeIcon.setAttribute('aria-hidden', 'true');

    // Apply inline styles to change the appearance of the icon
    closeIcon.style.color = 'white'; // Change the font color
    closeIcon.style.fontSize = '30px'; // Change the size of the icon
    closeIcon.style.backgroundColor = 'transparent'; // Change the background color
    closeIcon.style.padding = '5px'; // Add padding to the icon (optional)
    
    closeButton.appendChild(closeIcon);

    closeButton.addEventListener('click', function() {
        document.body.style.overflow = 'auto';
        overlay.style.display = 'none';
    });

    overlay.appendChild(closeButton);

    
}


async function handleImageLoad(imgElement) {
    const imgContainer = imgElement.parentElement;

    // Remove 'loading' class and add 'loaded' class
    imgContainer.classList.remove('loading');
    imgContainer.classList.add('loaded');

    // Hide the spinner
    const spin = imgContainer.querySelector('.spin');
    if (spin) {
        // spin.style.display = 'none'; // Hide spin
        spin.style.display = 'none'; // Hide spin
    }

    // Make sure the image is visible
    // imgElement.style.visibility = "visible";
    imgElement.style.display = "block";
    
}

async function handleImageError(imgElement) {
    const imgContainer = imgElement.parentElement;

    // Remove 'loading' class and add 'loaded' class
    imgContainer.classList.remove('loading');
    imgContainer.classList.add('loaded');

     // Hide the spin
     const spin = imgContainer.querySelector('.spin');
     if (spin) {
         spin.style.display = 'none'; // Hide spin
     }

    // Optionally, set a fallback image
    // imgElement.src = "path/to/fallback-image.jpg";
    imgElement.style.display = "block";
}


// Function to create collapsible sections
function createCollapsibleSection(title, items, callBackFunc) {

    const button = createButton(title,'collapsible');
    const closeContent = createButton('close','close-content');
    closeContent.className = 'material-symbols-outlined';
    const closeBtnSpan = document.createElement('span');
    closeBtnSpan.className ='cls_btn_span'
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    
    const content_overlay = document.createElement("div");
    content_overlay.setAttribute('id','content_overlay');
    content_overlay.setAttribute('class','content_overlay');
  
    
    // Create a list to hold checkboxes
    const closebtn_checkbox_container = document.createElement("div");
    closeBtnSpan.appendChild(closeContent);
    
  
    const checkbox_container = document.createElement("div");
    checkbox_container.setAttribute('id','checkbox_container');
    checkbox_container.className = 'checkbox_container';
    closebtn_checkbox_container.appendChild(closeBtnSpan);
    closebtn_checkbox_container.appendChild(checkbox_container);
  
    const checkboxes = [];
  
  
    items.forEach(item => {
        // Create a container for each checkbox and label
        
        const span = document.createElement('span')
        // Create the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = item; // Set id for the checkbox
        checkbox.value = item; // Set value for the checkbox
  
        // Create a label for the checkbox
        const label = document.createElement("label");
        label.htmlFor = item; // Associate label with checkbox
        label.textContent = item; // Set label text
  
        // Append the checkbox and label to the container
        span.appendChild(checkbox);
        span.appendChild(label);
  
        // Append the container to the list
        checkbox_container.appendChild(span);
  
        // Add an event listener to handle checkbox clicks
        checkbox.addEventListener('change', function() {
          if (this.checked) {
              checkboxes.push({label:button.textContent,item:this.value}) 
          } else { 
            const index = checkboxes.findIndex(cb => cb.item === this.value);
            if (index > -1) {
                checkboxes.splice(index, 1); // Remove unchecked item
            }
          }
  
          callBackFunc(checkboxes);
        });
    });
  
  
    contentDiv.appendChild(closebtn_checkbox_container);
    contentDiv.appendChild(content_overlay);
  
  
    contentDiv.style.top =`-100px`
  
  
    button.onclick = function(event) {
        // const rect = button.getBoundingClientRect(); // Button's position relative to the viewport
        // const positionFromTop = rect.top + window.scrollY; // Add scroll position for absolute position
        // console.log('Button position from top of the page:', positionFromTop, 'px');
  
  
        // this.classList.toggle("active");
  
        // // contentDiv.style.display = contentDiv.style.display === "block" ? "none" : "block";
   
        // contentDiv.style.top = `${positionFromTop + button.offsetHeight}px`;
        // // contentDiv.style.top = `${document.getElementById('hrmActivityTop').offsetHeight}px`;
        // contentDiv.style.display = 'flex';
        // contentDiv.classList.add("active"); 
  
  
  
        // const activeContentElements = document.querySelectorAll('.content.active');
        // activeContentElements.forEach((element) => {
        //   // element.style.height = `${vhToPx(100) - document.getElementById('hrmActivityTop').offsetHeight}px`;
  
        //   // element.style.height = `${100 - (pxToVh(document.getElementById('hrmActivityTop').offsetHeight) + 5)}vh`;
        //   element.style.display = 'block';
  
        //   // element.querySelector('div').style.height = `90vh`;
        //   // element.querySelector('div').style.overflow = 'auto'
  
        //   if(element.querySelector('div')){
        //     // element.querySelector('div').style.height = `${100 - (pxToVh(document.getElementById('hrmActivityTop').offsetHeight) + 20)}vh`;
        //     // element.querySelector('div').style.height = `${100 - parseInt(positionFromTop + button.offsetHeight)}vh`;
  
        //     // element.querySelector('div').style.overflow = 'auto';
        //     // element.querySelector('div').style.justifyContent ='flex-start';
  
            
        //   }
  
        // });
        
        // content_overlay.style = `z-index:1000;display:flex;height:100vh;top:0`;
       
        // if (contentDiv.classList.contains("active")) {
        //   const nestedDiv = contentDiv.querySelector("div");
        //   nestedDiv.style =`
        //     z-index:1001;
        //     position:fixed;
        //     background-color:white;
        //     left:0;
        //     right:0;
        //     padding:10px;
            
        //     justify-content:flex-start;
        //     height:${100 - (pxToVh(parseInt(positionFromTop)  + parseInt(button.offsetHeight)) + 2)}vh;
        //   `
        // }












        this.classList.toggle("active");
        const rect = button.getBoundingClientRect(); // Button's position relative to the viewport
        const positionFromTop = rect.top + window.scrollY; // Add scroll position for absolute position
        if (button.classList.contains('active')) {
            contentDiv.style.top = `${rect.top + button.offsetHeight}px`;
    
            contentDiv.style.display = 'flex';
            contentDiv.classList.add("active"); 
    
            content_overlay.style = `z-index:1000;display:flex;height:100vh;top:0`;
            
            if (contentDiv.classList.contains("active")) {
                const nestedDiv = contentDiv.querySelector("div");
                
                nestedDiv.style =`
                z-index:1001;
                position:fixed;
                background-color:white;
                left:0;
                right:0;
                padding:10px;
                justify-content:flex-start;
                height:${100 - (pxToVh(parseInt(rect.top)  + parseInt(button.offsetHeight)) + 2)}vh;
                `
            }

            const activeContentElements = document.querySelectorAll('.content.active');
            activeContentElements.forEach((element) => {
            
            element.style.display = 'block';
            });
  
        }
  
    };
  
    closeContent.onclick = function(){
     
      const activeContentDiv = document.querySelector('div.content.active');
      
      
      
      if(activeContentDiv){
        closeFunction(activeContentDiv,activeContentDiv.offsetHeight);
  
        activeContentDiv.style =`top:-${activeContentDiv.offsetHeight}px`
  
        const collapsibles = document.querySelectorAll('.collapsible.active');
        if(collapsibles){
        
          collapsibles.forEach((collapsible)=>{
            collapsible.classList.remove('active');
          })
  
          const div = activeContentDiv.querySelector('div');
          div.removeAttribute('style');
        }
      }
  
      const contentOverlayElements = document.querySelectorAll('#content_overlay');
      contentOverlayElements.forEach((element) => {
        const displayStyle = window.getComputedStyle(element).display;
        if (displayStyle === 'flex') {
          element.style.display = 'none';
         
        } 
      });
      
    }
  
    const extendedFilterContent = document.getElementById('extendedFilterContent');
    // extendedFilterContent.style.height = `${vhToPx(100) - document.getElementById('hrmActivityTop').offsetHeight}px`;
  
  
    // extendedFilterContent.style.height = `${100 - (pxToVh(document.getElementById('hrmActivityTop').offsetHeight) + 5)}vh`;
    return { button, contentDiv };

  }
  
function closeFunction(content,value){
    content ? content.classList.remove('active') : '';
    // document.body.style.overflow = 'auto';
    setTimeout(() => {
      content ? content.style.top = `-${document.getElementById('contactBackBtn').offsetHeight + Number(value)}px` : null;
      // content.innerHTML = ''
    }, 300);
}

function extractUniqueItems(query,fetchedData) {
      // Create an object to hold unique items grouped by label
  const groupedItems = {};

  query.forEach(entry => {
      const { label, item } = entry;

      // Initialize the label in the groupedItems object if it doesn't exist
      if (!groupedItems[label]) {
          groupedItems[label] = new Set(); // Use a Set to store unique items
      }

      // Add the item to the corresponding label's Set
      groupedItems[label].add(item);
  });

  // Convert the grouped items back into an array format
  const result = Object.keys(groupedItems).map(label => {
      return {
          label: label,
          items: Array.from(groupedItems[label]) // Convert Set back to Array
      };
      // return {[label]:Array.from(groupedItems[label])}
  });

  if(result.length > 0){
    const filtedEmployees = [];
    filtedEmployees.push(...fetchedData);
    result.map((el)=>{
      if(el.label === 'All Companies'){
        const matchingEmployees = filtedEmployees.filter((employee) => 
          el.items.includes(employee.emOrganization)
        );
        filtedEmployees.splice(0, filtedEmployees.length, ...matchingEmployees);
      }else if(el.label === 'All Locations'){
        const matchingEmployees = filtedEmployees.filter((employee) => 
          el.items.includes(employee.emLocation)
        );
        filtedEmployees.splice(0, filtedEmployees.length, ...matchingEmployees);
      }else if(el.label === 'All Offices'){
        const matchingEmployees = filtedEmployees.filter((employee) => 
          el.items.includes(employee.emOffice)
        );
        filtedEmployees.splice(0, filtedEmployees.length, ...matchingEmployees);
      }else if(el.label === 'All Departments'){
        const matchingEmployees = filtedEmployees.filter((employee) => 
          el.items.includes(employee.emDepartment)
        );
        filtedEmployees.splice(0, filtedEmployees.length, ...matchingEmployees);
      }else if(el.label === 'All Designations'){
        const matchingEmployees = filtedEmployees.filter((employee) => 
          el.items.includes(employee.emDesignation)
        );
        filtedEmployees.splice(0, filtedEmployees.length, ...matchingEmployees);
      }else if(el.label === 'All Reporting Bosses'){

        const emCodes = fetchedData.filter((employee) => 
          el.items.includes(employee.emName)
        ).map((employee)=>employee.emCode);
      
        
        const matchingEmployees = filtedEmployees.filter((employee) => 
          emCodes.includes(employee.emReportingBoss)
        );

        filtedEmployees.splice(0, filtedEmployees.length, ...matchingEmployees);


      }else if(el.label === 'All Blood Groups'){
        const matchingEmployees = filtedEmployees.filter((employee) => 
          el.items.includes(employee.emBloodGroup)
        );
        filtedEmployees.splice(0, filtedEmployees.length, ...matchingEmployees);
      }

    });

    filtedEmployees.length > 0 ? manageEmployeeDataShow(filtedEmployees,'single_emp'): "";
    
  }
  return result;
}

function createButton(title = null,selectorClass = null,selectorId = null) {
    const button = document.createElement("button");
    button.className = selectorClass;
    button.textContent = title;
    return button;
  }
  
function createNewElement(tagName, classSelector = null,idSelector = null,title=null){
    const element = document.createElement(tagName);
    element.setAttribute('class',classSelector)
    element.setAttribute('id',idSelector);
    element.textContent = title
    return element;
}

function vhToPx(vh) {
    return (vh * window.innerHeight) / 100;
}

function pxToVh(px) {
    const vh = window.innerHeight / 100; // 1vh in pixels
    return px / vh; // Convert px to vh
  }








