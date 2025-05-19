

// const rootUrl = 'https://api.ctgshop.com'
// const rootWwwUrl = 'https://api.ctgshop.com'
// const rootUrl = 'https://condomshopbd.com'
// const rootWwwUrl = 'https://www.condomshopbd.com'



async function fetchHrData(heading) {
  try {
    const response = await fetch("../helpers/dbs.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const parsedData = await JSON.parse(data);
    return parsedData[heading];
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function fetchData( url = null, heading = null ) {
  try {
    let data;
    if(url){
      const response = await fetch(url);
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Get Content-Type header
      const contentType = response.headers.get("Content-Type");
      if(contentType && contentType.includes("application/json")){
        // Parse the JSON response
        data = await response.json();
      }else{
        data = await response.text();
      }
      
    } else if (heading){
      const response = await fetch("../helpers/dbs.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const textData = await response.text();
      data =  JSON.parse(textData)[heading];
    } else {
      throw new Error("Invalid paramters: Provide either  URL or a heading");
    }
    
    return data;
  } catch (error) {
    if(error instanceof TypeError){
      if(error.message === 'Failed to fetch'){
        console.error('Network error: Failed to fetch');
      } else if (error.message.includes('ERR_INTERNET_DISCONNECTED')) {
        console.error('Network error: ERR_INTERNET_DISCONNECTED');
      } else {
        console.error('Network error:', error.message);
      }
    } else{
      // console.error('An error occurred:', error.message);
      Swal.fire({
        icon: "error",
          // title: "Oops...",
          title: 'Something wrong unknown',
          showConfirmButton: true,
          // timer: 4000,
          confirmButtonText: 'OK'
      });
    }
   
      // Handle any errors
      // console.error("There was a problem with the fetch operation:", error);
      // throw error; // rethrow the error to be caught by the caller
    
      
  }
}


// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     // Parse the JSON response
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     if(error instanceof TypeError){
//       if(error.message === 'Failed to fetch'){
//         console.error('Network error: Failed to fetch');
//       } else if (error.message.includes('ERR_INTERNET_DISCONNECTED')) {
//         console.error('Network error: ERR_INTERNET_DISCONNECTED');
//       } else {
//         console.error('Network error:', error.message);
//       }
//     } else{
//       // console.error('An error occurred:', error.message);
//       Swal.fire({
//         icon: "error",
//           // title: "Oops...",
//           title: 'Something wrong unknown',
//           showConfirmButton: true,
//           // timer: 4000,
//           confirmButtonText: 'OK'
//       });
//     }
   
//       // Handle any errors
//       // console.error("There was a problem with the fetch operation:", error);
//       // throw error; // rethrow the error to be caught by the caller
    
      
//   }
// }


async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST', // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
       
      }, 
      data:JSON.stringify(data) // Convert the data to a JSON string
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    

    return response.json()
  } catch (error) {
    // console.log(error)
  }
  
  // return response.json(); // Parse and return the JSON from the response
}

function createNavigationButton(elements, activeElement, callback) {
  const buttonContainer = document.createElement("div");

  for (let element in elements) {
    const button = document.createElement("button");
    button.setAttribute('class','button-items')
    button.textContent = element;

    button.addEventListener("click", function () {
      // Remove active class from all buttons
      buttonContainer.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to the clicked button
      button.classList.add("active");

      callback(elements[element], element);
    });

    if (element === activeElement) {
      button.click();
    }
    buttonContainer.appendChild(button);
  }

  return buttonContainer;
}

function handleDateAndTime(elementName) {
  // const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();
  // const hours = currentDate.getHours();
  // const minutes = currentDate.getMinutes();
  // const formattedHours = String(hours).padStart(2, "0");
  // const formattedMinutes = String(minutes).padStart(2, "0");
  // const currentTime = formattedHours + ":" + formattedMinutes;
  // const monthName = currentDate.toLocaleString("default", { month: "short" });
  // const currentDay = String(currentDate.getDate()).padStart(2, "0");
  // const formattedCurrentDate = `${currentDay}/${monthName}/${currentYear}`;

  // let id_name = elementName;

  // elementName = document.createElement("input");
  // elementName.type = "text";
  // elementName.id = id_name;
  // elementName.name = id_name;
  // elementName.value = formattedCurrentDate;
  // $(elementName).datepicker({
  //   dateFormat: "dd/mm/yy",
  //   onSelect: function (selectedDate) {
  //     const dateObject = $.datepicker.parseDate("dd/mm/yy", selectedDate);
  //     const shortMonthName = $.datepicker.formatDate("dd/M/yy", dateObject);
  //     elementName.value = shortMonthName;
  //   },
  // });

  // return { elementName };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const month = currentDate.toLocaleString('default', { month: 'short' }); // Get short month name
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const formattedCurrentDate = `${currentDay}/${month}/${currentYear}`; // Initial display format dd/Mon/yyyy

  let id_name = elementName;

  elementName = document.createElement("input");
  elementName.type = "text"; // Use text input for custom display format
  elementName.id = id_name;
  elementName.name = id_name;
  elementName.value = formattedCurrentDate; // Initial value in dd/Mon/yyyy format
  elementName.readOnly = true; // Make it readonly to prevent manual edits

  let selectedDateValue = `${currentDay}/${month}/${currentYear}`; // dd/Mon/yyyy format

  
  // Function to set the selected date in the desired format
  function setSelectedDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    selectedDateValue = `${day}/${month}/${year}`;
    elementName.value = selectedDateValue; // Update the input field value
  }

  // Event listener for date selection
  elementName.addEventListener('click', function() {
    const datePicker = document.getElementsByClassName('datepicker datepicker-dropdown');
    while (datePicker.length > 0) {
      datePicker[0].parentNode.removeChild(datePicker[0]);
    }
      
    const datepicker = new Datepicker(elementName, {
      autohide: true,
      format: 'dd/M/yyyy', // Format for datepicker display
      onSelect: function(dateText) {
        const date = new Date(dateText);
        setSelectedDate(date);
      }
    });
    
    datepicker.show();
  });

  return { elementName,getSelectedDate: () => selectedDateValue };
  
}

function create_Input_TextArea(info,fieldType,inputType){
  let name = info
  let id = info
  info = document.createElement(fieldType);
  info.type = inputType;
  info.id = id;
  info.name = name;
  info.rows = 4; // Set the number of rows
  info.value = "";

  return info
}

function handleFormAndSubmit(name, class_name) {
  const form = document.createElement("form");
  form.setAttribute("id", class_name);
  form.setAttribute("class", class_name);
  form.setAttribute("method", "POST");
  form.setAttribute("enctype", "multipart/form-data");

  // Create file input element for selecting files
  const fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("name", "files[]"); // Use the same name as in your previous FormData handling
  fileInput.setAttribute("multiple", ""); // Allow multiple file selection

  // form.appendChild(fileInput);

  // Add event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);    
    const newFormData = {};
   
    // Iterate over form data entries
    for (const pair of formData.entries()) {
      const key = pair[0];
      const value = pair[1];

      // If the value is a file, append it to newFormData
      if (value instanceof File) {
          // If the key is already present in newFormData,
          // append the file to an array under that key
          if (newFormData.hasOwnProperty(key)) {
              if (Array.isArray(newFormData[key])) {
                  newFormData[key].push(value);
              } else {
                  newFormData[key] = [newFormData[key], value];
              }
          } else {
              newFormData[key] = value;
          }
      } else {
          // If the value is not a file, simply add it to newFormData
          newFormData[key] = value;
      }
    }

    for (const key in newFormData) {
      if ((Array.isArray(newFormData[key]))) {
         for(let i = 0; i < newFormData[key].length; i++){
          if(newFormData[key][i].name === ''){
            // console.log(newFormData[key][i])
            newFormData[key].splice(i, 1)
          }
         }
      }
  }

  



    // console.log(newFormData)
    // form.remove();
  
  });

  return form;
}

function handleSMSFormAndSubmit(name, class_name,identity) {

  const form = document.createElement("form");
  form.setAttribute("id", class_name);
  form.setAttribute("class", class_name);
  form.setAttribute("method", "POST");
  form.setAttribute("enctype", "multipart/form-data");

  // Create file input element for selecting files
  const fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("name", "files[]"); // Use the same name as in your previous FormData handling
  fileInput.setAttribute("multiple", ""); // Allow multiple file selection
  form.appendChild(fileInput);

  
 
  // Add event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);    
    let newFormData = {};
    // for (var pair of formData.entries()) {
    //   newFormData[pair[0]] = pair[1];
    // }

    // Iterate over form data entries
    for (const pair of formData.entries()) {
      const key = pair[0];
      const value = pair[1];

      newFormData[key] = value;
    }

    for (const key in newFormData) {
      if ((Array.isArray(newFormData[key]))) {
         for(let i = 0; i < newFormData[key].length; i++){
          if(newFormData[key][i].name === ''){
            // console.log(newFormData[key][i])
            newFormData[key].splice(i, 1)
          }
         }
      }
    }
    
    for(let key in newFormData){
      if(newFormData[key] === ""){
        Swal.fire({
          title:"Error!!",
          text:key === 'phone' ? ('Phone number must not empty') : ('Message body must not empty'),
          icon:"error",
          timer: 3000
        })
        return
      }
    }
    var comp = '';
    
    if(newFormData.company === 'Be Rich'){
      comp='send_sms_berich'
    }else if(newFormData.company === 'Be Fresh'){
      comp='send_sms_befresh'
    }else if(newFormData.company === 'Amy'){
      comp='send_sms_amy'
    } else if(newFormData.company === 'Ctgshop'){
      comp='send_sms_ctgshop'
    }

    let url = `${rootWwwUrl}/xapi/Sapi.ashx?type=${comp}&investorPhone=${newFormData.phone}&ipAddress=&messageFromApp=${newFormData.message}&senderName=${identity}`
    fetch(url)
        .then((response) => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Parse the JSON response
          return response.json();
        })
        .then((data) => {
          if(data.status === true){
            const modifiedMessage = data.message.replace(/send/g, 'sent');
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: modifiedMessage,
              showConfirmButton: "Ok",
            })
          }else if(data.status === false){
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: (data.message),
              showConfirmButton: "Ok",
            })
          }
          
        })
        .catch((error) => {
          // Handle any errors
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error,
            showConfirmButton: "Oppps! Ok",
          })
        });
      // form.remove();
    form.reset();
    
    });
  
  return form;
}

function showPDF(pdfUrl,classInfo) {
  var pdfContainer = document.getElementById("pdfContainer");
  var pdfOverlay = document.getElementById("pdfOverlay");
  var classInfo = document.getElementById(classInfo)
  // Clear any existing content in the container
 
  var extension = getFileExtension(pdfUrl);
  
  pdfContainer.innerHTML = "";
  // classInfo.style.display = 'none'

  // Check if the file is a PDF
  if (extension.toLowerCase() === 'pdf') {
    try {
      Swal.fire({
        // title: '<strong>PDF Viewer</strong>',
        html: `
          <div id="pdfPreviewer" class="pdf-container">
            <div id="loadingIcon">Loading...</div>
          </div>
        `,
        showCloseButton: true,
        customClass: {
          popup: 'swal2-alert-custom-fullscreen'
        },
        didOpen: () => {
          // const loadingIcon = document.getElementById('loadingIcon');
          // loadingIcon.style.display = 'block';
          // iframeElement.onload = () => {
          //   loadingIcon.style.display = 'none';
          // };
          
          pageRender(pdfUrl, 'pdfPreviewer');
      
          // Add event listener for the close button
          const closeButton = Swal.getCloseButton();
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              var container = document.getElementById('pdfPreviewer');
              container.innerHTML = '';
            });
          }

        }
      });
    } catch (error) {
      
        window.open(pdfUrl, '_blank');
        
    }
  
  } else if (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg' || extension.toLowerCase() === 'png') {
    try {
      Swal.fire({
     
        // imageUrl: pdfUrl, // Replace with your image URL
        // imageWidth: 400, // Set the width of the image
        // imageHeight: 600, // Set the height of the image
        // imageAlt: 'PDF Preview',
        showCloseButton: true,
        customClass: {
          popup: 'swal2-alert-custom-fullscreen',
        },
        didOpen: () => {
          // Create a container for pinch-zoom
          var pinchZoomContainer = document.createElement("div");
          pinchZoomContainer.style.width = "100%";
          pinchZoomContainer.style.height = "100%";
    
          // Create an <img> element
          var imgElement = document.createElement("img");
          imgElement.setAttribute("src", pdfUrl);
          imgElement.setAttribute("alt", "Image");
          imgElement.style.width = "100%"; // Adjust as needed
          imgElement.style.height = "auto"; // Maintain aspect ratio
          imgElement.style.touchAction = "none"; // Disable default touch actions
    
          // Append the imgElement to the pinchZoomContainer
          pinchZoomContainer.appendChild(imgElement);
    
          // Append the pinchZoomContainer to the SweetAlert2 content
          Swal.getHtmlContainer().appendChild(pinchZoomContainer);
    
          // Initialize pinch-zoom on the container
          new PinchZoom.default(pinchZoomContainer, {
            draggableUnzoomed: false,
          });
        }
      });
    } catch (error) {
      
      window.open(pdfUrl,'_blank')
    }
  }

  //show the overlay
   pdfOverlay.style.display = "flex"; // Show overlay

}

function closePDFOverlay(classInfo) {
  var pdfOverlay = document.getElementById("pdfOverlay");
  var classInfo = document.getElementById(classInfo)
  // Hide the overlay
  pdfOverlay.style.display = "none"; // Hide overlay
  if(classInfo){
    classInfo.style.display = ''
  }
  // classInfo.style.display = 'block'
}

function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
}

function selectOptions(options, id, defaultValue){
  const dropdown = document.createElement("select"); // Create select element
  dropdown.setAttribute("id", id); // Set id attribute
  dropdown.name = id
  // Create and append option elements for each dropdown item
  options.forEach((option) => {
    const optionElement = document.createElement("option"); // Create option element
    // optionElement.value = option; // Set value attribute
    optionElement.textContent = option; // Set text content
    
    // Set the name attribute if provided and not a default option
    if (option !== '-SELECT TYPE-' && option !== '-SELECT PURPOSE-' && option !== 'ALL TYPE' && option !== 'ALL STATUS' && option !== 'ALL COMPANY') {
      // optionElement.setAttribute('value', id);
      optionElement.value = option;
    }else{
      // optionElement.setAttribute('value', " ");
      optionElement.value = " ";
    }

    // Check if the current option matches the default value
    if (option === defaultValue.toString()) {
      optionElement.selected = true; // Set selected attribute if it matches
    }
    dropdown.appendChild(optionElement); // Append option element to dropdown
  });

  return dropdown; // Return the created dropdown
}

async function createSelectElement(data, selectId,name,selectedValue) {

  let idElement = `${selectId}`
  // Wait for data if it's a promise
  const resolvedData = await data;

  // Create a select element
  const select = document.createElement('select');
  select.setAttribute('id', name);
  select.setAttribute('name',name)

 
  // Iterate over the array data to create options
  resolvedData.forEach(item => {
      const option = document.createElement('option');
      if(item[selectId]=== '--Select Company--'){
        option.value = 'ALL COMPANY';
        option.textContent = 'ALL COMPANY';
      }else if(item[selectId] === '--SELECT TYPE--'){
        option.value = 'ALL TYPE';
        option.textContent = 'ALL TYPE';
      }else if(item[selectId] === 'ALL'){
        option.value = 'ALL STATUS';
        option.textContent = 'ALL STATUS';
      }else{
        option.value = item[selectId];
        option.textContent = item[selectId];
      }

      if(selectedValue && option.value === selectedValue){
        option.selected = true;
      }
      
      select.appendChild(option);
  });
  return select;
}

function truncateFileName(fileName, maxLength) {
  if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength) + "..."; // Truncate the name and add ellipsis
  }
  return fileName; // Return the original name if it's within the limit
}

async function renderPDF(pdfUrl, containerId) {
  var container = document.getElementById(containerId);

  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

  // Get the screen width to calculate the scale factor
  const screenWidth = window.innerWidth;

  // Loop through each page
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    
    // Calculate the appropriate scale factor to fit the screen width
    const viewport = page.getViewport({ scale: .6 });
    const scale = screenWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale: scale });

    // Create a canvas element to render the PDF page
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match the scaled PDF page
    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;

    // Append canvas to the container
    container.appendChild(canvas);

    // Render the page into the canvas context
    const renderContext = {
      canvasContext: context,
      viewport: scaledViewport
    };
    await page.render(renderContext).promise;

    // Convert canvas to an image
    const img = new Image();
    img.src = canvas.toDataURL();

    // Append the image to the container
    container.appendChild(img);

    // Optionally, you can remove the canvas if you don't need it anymore
    canvas.remove();
  }
}

function pageRender(pdfUrl, containerId){
  var container = document.getElementById(containerId);
  
  container.innerHTML = '';
  if (!container) return;

  
  if (!window.pdfjsLib) {
    container.innerHTML = '<p>Your device does not support PDF rendering. <a href="' + pdfUrl + '" target="_blank">Click here to open the PDF.</a></p>';
    return;
  }


  pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
    var numPages = pdf.numPages;

    // Helper function to render a page and wait for it to complete
    function renderPageSequentially(pageNumber) {
      return pdf.getPage(pageNumber).then(function (page) {
        var viewport = page.getViewport({ scale: 1.7 });
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        return page.render(renderContext).promise.then(() => {
          var img = new Image();
          img.src = canvas.toDataURL();
          img.style.width = '100%';
          img.style.height = 'auto';
          img.classList.add('pdf-page');

          var pinchZoomContainer = document.createElement("div");
          pinchZoomContainer.style.width = "100%";
          pinchZoomContainer.style.height = "100%";
          pinchZoomContainer.appendChild(img);
          container.appendChild(pinchZoomContainer);

          new PinchZoom.default(pinchZoomContainer, {
            draggableUnzoomed: false,
          });
        });
      });
    }

    // Function to sequentially render all pages
    function renderAllPages(pageNumber) {
      if (pageNumber > numPages) {
        return; // All pages have been rendered
      }

      renderPageSequentially(pageNumber).then(() => {
        // Once the current page is rendered, render the next page
        renderAllPages(pageNumber + 1);
      });
    }

    // Start rendering from the first page
    renderAllPages(1);
  }).catch(()=>{
    container.innerHTML = '<p>Failed to load PDF. <a href="' + pdfUrl + '" target="_blank">Click here to open it directly.</a></p>';
    
  });

}

function handleForm(name, class_name) {
  const form = document.createElement("form");
  form.setAttribute("id", class_name);
  form.setAttribute("class", class_name);
  form.setAttribute("method", "POST");
  form.setAttribute("enctype", "multipart/form-data");

  // Create file input element for selecting files
  // const fileInput = document.createElement("input");
  // fileInput.setAttribute("type", "file");
  // fileInput.setAttribute("name", "files[]"); // Use the same name as in your previous FormData handling
  // fileInput.setAttribute("multiple", ""); // Allow multiple file selection

  // form.appendChild(fileInput); // Ensure the input is appended to the form

  // Add event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);    
    const newFormData = {};
   
    // Iterate over form data entries
    for (const pair of formData.entries()) {
      const key = pair[0];
      const value = pair[1];

      // If the value is a file, append it to newFormData
      if (value instanceof File) {
        //  console.log(value)
          // If the key is already present in newFormData,
          // append the file to an array under that key
          if (newFormData.hasOwnProperty(key)) {
              if (Array.isArray(newFormData[key])) {
                  newFormData[key].push(value);
              } else {
                  newFormData[key] = [newFormData[key], value];
              }
          } else {
              newFormData[key] = value;
          }
      } else {
          // If the value is not a file, simply add it to newFormData
          newFormData[key] = value;
      }
    }

    for (const key in newFormData) {
      if ((Array.isArray(newFormData[key]))) {
         for(let i = 0; i < newFormData[key].length; i++){
          if(newFormData[key][i].name === ''){
            newFormData[key].splice(i, 1);
            i--; // Adjust the index after removing an element
          }
         }
      }
    }

    // Dispatch custom event with form data
    const eventDetail = { formData: newFormData };

    // const eventDetail = formData.append('postData',formData)
    const formSubmitEvent = new CustomEvent('formSubmitted', { detail: eventDetail });
    form.dispatchEvent(formSubmitEvent);

    // Listen for a custom success event to reset the form
    // form.addEventListener('formSubmitSuccess', function () {
    //   form.reset();
    // });


    // Optionally remove the form
    // form.remove();
  });

  return form;
}

function vhToPx(vh) {
  return (vh * window.innerHeight) / 100;
}

function pxToVh(px) {
  const vh = window.innerHeight / 100; // 1vh in pixels
  return px / vh; // Convert px to vh
}

function communicationBtn(phone,email){
  return (
      `
          <button onclick='handleConnect(${JSON.stringify(phone)}, "phone")'><img src="../assets/images/telephone.png" alt="No Image"/></button>
          <button onclick='handleConnect(${JSON.stringify(phone)}, "msg")'><img src="../assets/images/sms.png" alt="No Image"/></button>
          <button onclick='handleConnect(${JSON.stringify(email)}, "email")'> <img src="../assets/images/email.png" alt="No Image"/></button>
       `
  )
      
}

function handleConnect(info,type){
  if(type === 'phone'){
      window.location.href = "tel:" + info
  }else if(type === 'email'){
      window.location.href = "mailto:" + info
  }else if(type === 'msg'){
      window.location.href = "sms:" + info
  }
}

function CurrStrView(Tk) {
  let TkS = Tk.toFixed();
  TkS = TkS.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return TkS;
}

function createTable(tableTitle, headerData, bodyData,tableAttrib,sn,footerData = null) {
  // Create a new table element
  const table = document.createElement("table");
  table.setAttribute('id',tableAttrib)
  table.setAttribute('class',tableAttrib)
  // Create the table title
  const titleRow = table.createTHead().insertRow();
  const titleCell = titleRow.insertCell();
  titleCell.textContent = tableTitle;
  titleCell.colSpan = headerData.length; // Set colspan to span the entire header

  // Create the table header
  const headerRow = table.createTHead().insertRow();
  headerData.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  
  // Create the table body
  const tbody = table.createTBody();
  
  
  bodyData.forEach((rowData,rowIndex) => {
    const row = tbody.insertRow();

    // Apply background color based on odd/even row index
    if (rowIndex % 2 === 0) {
      row.style.backgroundColor = '#f0f0f0'; // Light gray for even rows
    } else {
      row.style.backgroundColor = '#ffffff'; // White for odd rows
    }
    
   
    if( sn === true){
      // Insert serial number as the first cell
      const serialCell = row.insertCell();
      serialCell.textContent = rowIndex + 1;
    }  

    if(Array.isArray(rowData)){
      rowData.forEach((cellData) => {
        const cell = row.insertCell();
        cell.textContent = cellData;
      });
    }else if (typeof rowData === 'object' && rowData !== null) {
      Object.values(rowData).forEach(cellData => {
          const cell = row.insertCell();
          cell.textContent = cellData;
      });
    
    }
  });


  if(footerData){
    const tfoot = table.createTFoot();
    const footerRow = tfoot.insertRow();
    footerData.forEach((footerText)=>{
      const footerCell = footerRow.insertCell();
      footerCell.textContent = footerText;
    })
  }

  // Append the table to a parent container in the HTML document
  // document.body.appendChild(table);
  return table;
}

async function handle_bill_btn(input,type){
  
  const url = `https://ctgshop.com/erp/api/xbill.ashx?type=get_bill_det&bno=${input}`
  await fetchData(url)
    .then(data=>{
      console.log(data)
      if(type === 'details'){
          let content = '';
          if (data.status === true) {
            data.entry.forEach((item,index) => {
              content += '<div class="show_bill_single" style="margin-bottom: 10px; padding: 10px;">';
              content += `<p style="margin:0; padding-bottom:5px;border-bottom:1px solid gray">Table: ${index + 1}</p>`;
              for (let key in item) {
                content += '<div>';
                content += `<label>${key === 'bill_no' ? 'Bill No' : key === 'bill_pur' ? 'Bill Type' : key === 'bill_note' ? 'Bill Note' : key === 'bill_amo' ? 'Bill Amount' : 'Employee ID'}:</label>`;
                content += `<p> ${item[key]}</p>`;
                content += '</div>';
              }
              content += '</div>';
            });
          }

        Swal.fire({
          // height: 100,
          html: ` ${content}`,
          showCloseButton: true,
          customClass:{
            htmlContainer: 'fullscreen_show',
            popup:'fullscreen_popup_show'
          },
          showConfirmButton:false,  
          focusConfirm: false,
        });
      }
      if(type === 'supporting'){
        let content = '';
        if(data.status === true){
          const show_overlay = document.getElementById('overlay')
          show_overlay.style.visibility= "visible";
          show_overlay.style.opacity = '1.0';

          data.support.forEach((element,index) => {
           
            content += `<div class="bill_image_view" onclick="showZoom('${element.fname}')">`;           
            content += `<p>${element.bill_no}</p>`
            content += `<p>${element.entry_date}</p>`
            content += `<div id="supporting_view">
              <img src=${element.fname} alt="No Image" style="width:100%;"/>
            </div>`;
            content += `</div>`
          });
        }

        // Store the scroll position
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Add class to body to prevent scrolling
        document.body.classList.add('no-scroll');


        const overlayImageContainer = document.getElementById('overlayImageContainer')
        overlayImageContainer.innerHTML = content
        
        // Swal.fire({
        //   // height: 100,
        //   html: ` ${content}`,
        //   showCloseButton: true,
        //   customClass:{
        //     htmlContainer: 'fullscreen_show',
        //     popup:'fullscreen_popup_show',
        //   },   
        //   showConfirmButton:false,
        //   focusConfirm: false,
        // });

        const overlay_cancel = document.getElementById('overlay_cancel')
        overlay_cancel.addEventListener('click',function(){
          const show_overlay = document.getElementById('overlay')
          show_overlay.style.visibility= "hidden";
          show_overlay.style.opacity = '0';
          overlayImageContainer.innerHTML = "";

          // Remove class from body to allow scrolling
          document.body.classList.remove('no-scroll');
          // Restore the scroll position
          window.scrollTo(0, scrollPosition);
        })
      }
      
    })
    .catch(error=>{
        // console.log(error)
        }
    )
  
}

async function handle_bill_execute(type,ref,code,taka){
  if(type === 'approve'){
    let cut_half=false;
    function handle_amount(amount) {
      const inputElement = document.getElementById('swal-input');

      if(cut_half === false && Number(amount) > 0){
        let tempValue = Number(amount) * Number(inputElement.value)
        inputElement.value = tempValue;
        cut_half = true;
      }
    }

    // Show dark overlay when the SweetAlert dialog is displayed
    document.getElementById('darkOverlay').style.display = 'block';
    document.body.classList.add('transparent');
  
    const { value: amount } = await Swal.fire({
      title: "Approved Confirmed?",
      html: `
        <div style="display: flex; align-items: center;width:100%;flex-direction:row ;justify-content:space-between">
          <label style="width:40%">Approve Amount</label>
          <input style="width:40%; type="number" padding:0 0 0 2px; height:40px" id="swal-input" class="swal2-input" placeholder="" aria-label="Type your message here"  value="${taka}">
          <button id="custom-button" class="swal2-styled" style="padding:5px;height:40px">50%</button>
        </div>
      `,
      showDenyButton: true,
      showCancelButton: false,
      denyButtonText: `No`,
      confirmButtonText:'Yes',
      customClass:{
        htmlContainer: 'approve_screen',
        popup:'approve_popup_show'
      },
      didRender: () => {
        document.getElementById('custom-button').addEventListener('click', () => handle_amount('.5'));
      },
      preConfirm: () => {
        const input = document.getElementById('swal-input').value;
        if (!input) {
          Swal.showValidationMessage('You need to write something!');
        }
        return { amount: input };
      }
    })

    // Hide the overlay when the alert is closed
    document.getElementById('darkOverlay').style.display = 'none';
    document.body.classList.remove('transparent');
  
    if (amount) {
      if(amount.amount && amount.amount > 0){
        const url = `https://ctgshop.com/erp/api/xbill.ashx?type=get_bill_update&bno=${ref}&bemp=${code}&bst=CHECKED&bamo=${amount.amount}&note=`
        fetchData(url)
          .then(data=>{
            if(data.status === true){
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "success",
                title: data.message,
                showConfirmButton: true,
                timer: 3000,
                confirmButtonText: 'OK'
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
              removeSingleCard(ref);
            }else if(data.status === false){
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "error",
                  // title: "Oops...",
                  title: data.message,
                  showConfirmButton: true,
                  timer: 3000,
                  confirmButtonText: 'OK'
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            }
          })
          .catch(error=>
            {
              // console.log(error)
            }
          )
      }
    }

  }else if(type ==='cancel'){

    document.getElementById('darkOverlay').style.display = 'block';
    document.body.classList.add('transparent');

    const { value: text } = await Swal.fire({
      title: "Cancelled Confirmed?",
      input: "text",
      inputLabel: "Cancel Note :",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      customClass:{
        htmlContainer: 'cancel_screen',
        popup:'cancel_popup_show'
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write a note!";
        }
      }
    });

    // Hide the overlay when the alert is closed
    document.getElementById('darkOverlay').style.display = 'none';
    document.body.classList.remove('transparent');

    if (text) {
      const url =`https://ctgshop.com/erp/api/xbill.ashx?type=get_bill_update&bno=${ref}&bemp=${code}&bst=CANCELLED&bamo=10&note=${text}`
      fetchData(url)
        .then(data=>{
          if(data.status === true){
          
            // const all_cards = document.getElementById('all_cards')
            // let single_cards = document.getElementsByClassName('single_card')
            // single_cards = Array.from(single_cards);

            // let remaining_cards = [];

            // single_cards.forEach(function(single_card){
            //     {
            //       // Select the first p tag within the single_card div
            //       const first_p_tag = single_card.querySelector('p');
            //       if (first_p_tag && first_p_tag.textContent === ref) {
            //           // Remove the single_card div if the content matches the ref
            //           all_cards.remove(single_card)
            //       } else {
            //           // Collect the remaining single_card divs
            //           remaining_cards.push(single_card);
            //       }
            //     }
            // });

            // // Clear all_cards content
            // all_cards.innerHTML = '';

            // // Append remaining single_card divs back to all_cards
            // remaining_cards.forEach((card) => {
            //     all_cards.appendChild(card);
            // });

            // console.log(ref,remaining_cards,all_cards)
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "success",
              title: data.message,
              showConfirmButton: true,
              timer: 3000,
              confirmButtonText: 'OK'
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            removeSingleCard(ref);

          }else if(data.status === false){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "error",
                // title: "Oops...",
                title: data.message,
                showConfirmButton: true,
                timer: 3000,
                confirmButtonText: 'OK'
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          }
         
        })
        .catch(error=>
          {
            // console.log(error)
          }
        )
    }
    
  }else if(type ==='paid'){
    document.getElementById('darkOverlay').style.display = 'block';
    document.body.classList.add('transparent');
    Swal.fire({
      title: "Paid Confirmed?",
      showDenyButton: true,
      
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      customClass:{
        htmlContainer: 'paid_screen',
        popup:'paid_popup_show'
      }
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const url=`https://ctgshop.com/erp/api/xbill.ashx?type=get_bill_update&bno=${ref}&bemp=${code}&bst=PAID&bamo=10&note=`
        fetchData(url)
          .then(data=>{
            if(data.status === true){
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "success",
                title: data.message,
                showConfirmButton: true,
                timer: 3000,
                confirmButtonText: 'OK'
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
              removeSingleCard(ref);
            }else if(data.status === false){
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "error",
                // title: "Oops...",
                title: data.message,
                showConfirmButton: true,
                timer: 3000,
                confirmButtonText: 'OK'
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            }
          })
          .catch(error=>
            {
              // console.log(error)
            }
          )
        // Swal.fire("You confirmed", "", "success");
      } else if (result.isDenied) {
        document.getElementById('darkOverlay').style.display = 'block';
        document.body.classList.add('transparent');
        Swal.fire("You did not confirmed", "", "info").then((result) => {
          // Hide the overlay when alert is closed
          document.getElementById('darkOverlay').style.display = 'none';
          document.body.classList.remove('transparent'); // Remove class to allow scrolling
        });
      }
      // Hide the overlay when alert is closed
      document.getElementById('darkOverlay').style.display = 'none';
      document.body.classList.remove('transparent'); // Remove class to allow scrolling

    });
  }

}

function removeSingleCard(ref) {
  const all_cards = document.getElementById('all_cards');
  const single_cards = document.getElementsByClassName('single_card');
  Array.from(single_cards).forEach(single_card => {
    // Select the first p tag within the single_card div
  
    const first_p_tag = single_card.querySelector('.bill_ref');
 
    if (first_p_tag && first_p_tag.textContent === ref) {
      all_cards.removeChild(single_card);
     
   
    }
   
  });
}

function showZoom(fname){
    document.getElementById('darkOverlay').style.display = 'block';
    document.body.classList.add('transparent');
   Swal.fire({
    // html: `<img src="${fname}" alt="PDF Preview" style="width: 100%; height: auto;">`,
    
    showCloseButton: true,
    showConfirmButton:false,
    customClass: {
      container: 'swal2-custom-fullscreen-container',
      popup: 'swal2-alert-custom-fullscreen',
      htmlContainer: 'swal2-custom-fullscreen-html-containers',
      title: 'custom-swal-bill-view-title'
    },
    didOpen: () => {
      // Create a container for pinch-zoom
      var pinchZoomContainer = document.createElement("div");
      pinchZoomContainer.style.width = "100%";
      pinchZoomContainer.style.height = "100%";
      pinchZoomContainer.style.overflow = "hidden";

      // Create an <img> element
      var imgElement = document.createElement("img");
      imgElement.setAttribute("src", fname);
      imgElement.setAttribute("alt", "Image");
      imgElement.style.width = "100%"; // Adjust as needed
      imgElement.style.height = "auto"; // Maintain aspect ratio
      imgElement.style.touchAction = "none"; // Disable default touch actions

      // Append the imgElement to the pinchZoomContainer
      pinchZoomContainer.appendChild(imgElement);

      // Append the pinchZoomContainer to the SweetAlert2 content
      Swal.getHtmlContainer().appendChild(pinchZoomContainer);

      // Initialize pinch-zoom on the container
      new PinchZoom.default(pinchZoomContainer, {
        draggableUnzoomed: false,
      });
    }
  }).then((result) => {
    // Hide the overlay when alert is closed
    document.getElementById('darkOverlay').style.display = 'none';
    document.body.classList.remove('transparent'); // Remove class to allow scrolling
  });
}

function humanReadableDate(dateStr) {
  // Parse the date string
  const dateObj = new Date(dateStr);
  
  // Define month names
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Get components of the date
  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  
  // Get hours and minutes
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  
  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  // Format minutes to always be two digits
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  // Construct the human-readable date string
  const humanReadableDate = `${day}/${month}/${year} at ${hours}:${minutesStr} ${ampm}`;
  
  return humanReadableDate;
}

// Function to add styles
function setStyles(element, styles) {
  for (const property in styles) {
      if (styles.hasOwnProperty(property)) {
          element.style[property] = styles[property];
      }
  }
}

// Function to remove styles
function removeStyles(element, styleProperties) {
  styleProperties.forEach(property => {
      element.style.removeProperty(property);
  });
}

async function removeQuotes(str) {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.substring(1, str.length - 1).trim();
  } else if (str.startsWith("'") && str.endsWith("'")) {
    return str.substring(1, str.length - 1).trim();
  } else {
    return str.trim();
  }
}

// Function to get the date three or more months back
function getMonthsBackDate(months, type = 'back') {
  const currentDate = new Date();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  if(typeof months === 'string'){
    const targetMonthIndex = monthNames.indexOf(months)
   
    if(targetMonthIndex !== -1 && targetMonthIndex <= currentDate.getMonth()){
       currentDate.setMonth(targetMonthIndex)
    }
  } else if(typeof months === 'number'){

    if(type === 'forward'){
      currentDate.setMonth(currentDate.getMonth() + months);
    }else{
      currentDate.setMonth(currentDate.getMonth() - months);
    }
  }


  const day = String(currentDate.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
  const month = monthNames[currentDate.getMonth()]; // Get month abbreviation
  const year = currentDate.getFullYear(); // Get full year

  return `${day}/${month}/${year}`; // Format as 'DD/MMM/YYYY'
}

async function encryptFunc(clearText) {
  const encryptionKey = 'xkoushikmohajanx';
  const iv = new Uint8Array([0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30]);

  // Encode the encryption key and plaintext
  const enc = new TextEncoder();
  const keyData = enc.encode(encryptionKey);
  const clearBytes = enc.encode(clearText);

  // Import the key
  const key = await window.crypto.subtle.importKey(
      'raw', 
      keyData, 
      { name: 'AES-CBC' }, 
      false, 
      ['encrypt']
  );

  // Encrypt the plaintext
  const encryptedBytes = await window.crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: iv }, 
      key, 
      clearBytes
  );

  // Convert the encrypted bytes to a base64 string
  const encryptedArray = new Uint8Array(encryptedBytes);
  let base64String = btoa(String.fromCharCode(...encryptedArray));

  // Apply the same replacements as the VB.NET version
  base64String = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return base64String;
}

function getDeviceType(){
  // var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //   var platform = navigator.platform;

  //   // Detect Android
  //   if (/android/i.test(userAgent)) {
  //       return "Android";
  //   }

  //   // Detect iOS
  //   if (/iPad|iPhone|iPod/.test(userAgent) || /iPad|iPhone|iPod/.test(platform)) {
  //       return "iOS";
  //   }

  //   // Detect other platforms
  //   return "Other";




    // var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // var platform = navigator.platform;

    // // Detect Android WebView
    // if (/android/i.test(userAgent)) {
    //     if (/wv|\.0\.0\.0/.test(userAgent)) {
    //         return "Android WebView";
    //     }
    //     return "Android Browser";
    // }

    // // Detect iOS WebView
    // if (/iPad|iPhone|iPod/.test(userAgent) || /iPad|iPhone|iPod/.test(platform)) {
    //     // WebView on iOS typically includes the pattern "AppleWebKit" without "Safari"
    //     if (userAgent.includes("AppleWebKit") && !userAgent.includes("Safari")) {
    //         return "iOS WebView";
    //     }
    //     return "iOS Browser";
    // }

    // // Detect other platforms (Laptop/Desktop)
    // if (/Mac|Win|Linux/.test(platform)) {
    //     if (/wv|\.0\.0\.0/.test(userAgent)) {
    //         return "Desktop WebView";
    //     }
    //     return "Desktop Browser";
    // }

    // return "Other";


    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var platform = navigator.platform || '';
  
    // Detect Android
    if (/android/i.test(userAgent)) {
        return "Android";
    }
  
    // Detect iOS (iPhone, iPad, iPod)
    if (/iPad|iPhone|iPod/.test(userAgent) || /iPad|iPhone|iPod/.test(platform)) {
        return "iOS";
    }
  
    // Detect Windows
    if (/Win/.test(platform)) {
        return "Windows";
    }
  
    // Detect macOS
    if (/Mac/.test(platform) && !/iPhone|iPod|iPad/.test(userAgent)) {
        return "macOS";
    }
  
    // Detect Linux
    if (/Linux/.test(platform)) {
        return "Linux";
    }
  
    return "Unknown";



    // var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    // if (isIOS) {
    //     return "iOS";
    // }

    // var isAndroid = /android/i.test(navigator.userAgent);
    
    // if (isAndroid) {
    //     return "Android";
    // }

    // return "Other";
}

function isWebView() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Detect WebView on Android
  var isAndroidWebView = /wv/.test(userAgent);

  // Detect WebView on iOS
  var isIosWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent);

  return isAndroidWebView || isIosWebView;
}

function updateHrmButtonOnclickParamenter(identity) {
  // Get the button element by class name
  let backButton = document.getElementsByClassName('hrm_Activity_back_btn')[0];

  // Modify the onclick attribute to include the identity variable
  if (backButton) {
      backButton.setAttribute('onclick', `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`);
  }
}

function updateOnclickBackButtonWithArrayParams(paramsArray) {
  // Destructure the array to get the button class and the function call string
  let [buttonClass, functionCall] = paramsArray;

  
  // Get the button element by class name
  let button = document.getElementsByClassName(buttonClass)[0];
  
  // Modify the onclick attribute to include the function call
  if (button) {
      button.setAttribute('onclick', functionCall);
  }
}

// Function to convert date and time to a single Date object
function parseDateTime(dateString, timeString) {
  const [day, month, year] = dateString.split('/').map(Number);
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return new Date(year, month - 1, day, hours, minutes);
}

// Function to show the loading overlay
async function showLoading(givenId) {
  document.getElementById(givenId).style.display = 'flex';
}

// Function to hide the loading overlay
async function hideLoading(givenId) {
  document.getElementById(givenId).style.display = 'none';
}


async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );

  const publicKeyJwk = await window.crypto.subtle.exportKey(
    "jwk",
    keyPair.publicKey
  );

  const privateKeyJwk = await window.crypto.subtle.exportKey(
    "jwk",
    keyPair.privateKey
  );

  return { publicKeyJwk, privateKeyJwk };
}

function createHash(data1,data2,data3,data4,data5,data6,data7,data8) {
  // Concatenate data into a single string with a delimiter
  const combinedString = `${data1}|${data2}|${data3}|${data4}|${data5}|${data6}|${data7}|${data8}|`;
  
  
  // Encode to Base64
  const encodedString = btoa(combinedString);



  return encodedString;
}


const parseDate = (dateString) => {
  const months = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
  };

  // Split the date into components (assumes the format is "DD/MMM/YYYY")
  const [day, monthStr, year] = dateString.split('/');
  const month = months[monthStr];

  // Return the date in "YYYY-MM-DD" format
  return `${year}-${month}-${day.padStart(2, '0')}`;
};


function getLatestDivEndDate(array) {
  return array.reduce((latest, current) => {
      const currentDate = new Date(current.divEndDate.replace(/(\d{2})\/([A-Za-z]{3})\/(\d{4})/, '$2 $1, $3'));
      const latestDate = new Date(latest.divEndDate.replace(/(\d{2})\/([A-Za-z]{3})\/(\d{4})/, '$2 $1, $3'));

      return currentDate > latestDate ? current : latest;
  });
}


function insertAssets({
  cssLink:cssLink,
  scriptLink:scriptLink
}) {
  // Insert a CSS file
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssLink; // Replace with your actual CSS file path
  document.head.appendChild(link);

  // Insert a JS file
  const script = document.createElement('script');
  script.src = scriptLink; // Replace with your actual JS file path
  script.async = true; // Optional: loads script asynchronously
  document.body.appendChild(script);
}


// This code block used for contact,
function handleFilterItem(item){
  const overlay = document.getElementById('contact_overlay');
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
  })

  // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    document.getElementById('hrmActivityTop').style.zIndex = '998';

    overlay.style.zIndex = '999';
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

   // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    document.getElementById('hrmActivityTop').style.zIndex = '998';

    overlay.style.zIndex = '999';
    overlay.querySelector('button').addEventListener('click',()=>{
        document.getElementById('contactTop').style.zIndex = `1`;
        document.getElementById('single_emp_overlay').style.display = `none`;
        document.getElementById('single_emp_overlay').style.zIndex = `1000`;
    });
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

   // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    document.getElementById('hrmActivityTop').style.zIndex = '998';

    overlay.style.zIndex = '999';
    overlay.querySelector('button').addEventListener('click',()=>{
        document.getElementById('contactTop').style.zIndex = `1`;
        document.getElementById('single_emp_overlay').style.display = `none`;
        document.getElementById('single_emp_overlay').style.zIndex = `1000`;
    });

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

   // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    document.getElementById('hrmActivityTop').style.zIndex = '998';

    overlay.style.zIndex = '999';
    overlay.querySelector('button').addEventListener('click',()=>{
        document.getElementById('contactTop').style.zIndex = `1`;
        document.getElementById('single_emp_overlay').style.display = `none`;
        document.getElementById('single_emp_overlay').style.zIndex = `1000`;
    });

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

   // document.getElementById('contactTop').style.zIndex = `999`;
    document.getElementById('single_emp_overlay').style.display = `flex`;
    document.getElementById('single_emp_overlay').style.zIndex = `998`;

    document.getElementById('hrmActivityTop').style.zIndex = '998';

    overlay.style.zIndex = '999';
    overlay.querySelector('button').addEventListener('click',()=>{
        document.getElementById('contactTop').style.zIndex = `1`;
        document.getElementById('single_emp_overlay').style.display = `none`;
        document.getElementById('single_emp_overlay').style.zIndex = `1000`;
    });

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


 lazyLoadImages()
}


function manageEmployeeDataShow(filterData,classHint){

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
                      onclick='handleSingleEmpShow(${JSON.stringify({code:element.emCode,emReportingBoss:element.emReportingBoss})})'
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
          <div class="rightView" onclick='handleSingleEmpShow(${JSON.stringify({code:element.emCode,emReportingBoss:element.emReportingBoss})})'>
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
  
  empDetails = filterData.map((element,index)=>{
   
    return `
          <div class="topDetails">    
              <div class="em_image" id="em_image">
                  <span>${element.emName}</span>
                  <img 
                      id="employeeImage"  
                      data-src="${element.emImage}
                      src="../../assets/images/751.gif" 
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
              ${element.emReportingBoss ? `
                <span>
                  <label>Reporting Boss</label>
                  <p>${element.emReportingBoss}</p>
                </span>
                ` :''}
              
          </div>
      `
  }
   
  );

  // <button class="contact_back_btn" onclick="routeToPage('../index.html','','')">
  // <button class="contact_back_btn" onclick="routeToPage('HRM.html','hrmMain','hrmIcon','')">
  contactTop.innerHTML =`
      
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
                <div id="filter_overlay" class="filter_overlay"></div>
            </div>
      </div>
      <div class="filter-container">
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


        const overlay = document.getElementById("contact_overlay");
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
  

  document.getElementById('single_emp') ? document.getElementById('single_emp').style.cssText =`
    top:${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('contactTop').offsetHeight + 5}px
  ` : document.getElementById('single_column') ? document.getElementById('single_column').style.cssText =`
    top:${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('contactTop').offsetHeight + 5}px
  ` : document.getElementById('double_column') ? document.getElementById('double_column').style.cssText = `
    top:${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('contactTop').offsetHeight + 5}px
  `:""
  

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
          top: `${document.getElementById('hrmActivityTop').offsetHeight + 1}px`,
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          display:'block',
          flexDirection: 'column',
          zIndex:'999',
      });

      // Adjust dynamic top offset based on hrmActivityTop's height
      const dynamicTop = document.getElementById('hrmActivityTop').offsetHeight + 1;
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

  const titleContent = document.createElement('p');
  titleContent.textContent = button.innerText;
  
  // Create a list to hold checkboxes
  const closebtn_checkbox_container = document.createElement("div");
  closeBtnSpan.appendChild(titleContent);
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


  button.onclick =async function(event) {
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

        console.log(button.innerText)
      
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
  
  return { button, contentDiv };

}

function closeFunction(content,value){
  content ? content.classList.remove('active') : '';
  // document.body.style.overflow = 'auto';
  setTimeout(() => {
    content ? content.style.top = `-${document.getElementById('hrmActivityTop').offsetHeight + Number(value)}px` : null;
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

function handleSingleEmpShow(param){
  let code, emReportingBoss;
  if(typeof param === 'object'){
    code = param.code;
    emReportingBoss = param.emReportingBoss
  }else {
    code = param;
    emReportingBoss = null;
  }
  const result =  fetchedData.filter((emp)=>emp.emCode === code)
  const res =  fetchedData.filter((element)=>element.emCode === emReportingBoss)

  
  // Destructure res to get the first matching boss (if exists)
  const [boss] = res; // This will be undefined if res is empty
  
 
  // Check if boss exists and access emName
  if (boss) {
    
    result.forEach(emp=>{
     
      emp.emReportingBoss = boss.emName
    })
  } else {
    result.forEach(emp=>{
      emp.emReportingBoss = ""
    })
  }

  const overlay = document.getElementById('contact_overlay');
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

// This code block used for contact,
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

// This code block used for contact,
function closeButton(overlay) {
  const closeButton = document.createElement('button');
  
  closeButton.style.position = 'fixed'; // Optional: to position it at the top

  // closeButton.style.top = `${document.getElementById('contactTop').offsetHeight}px`; 

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

function getMonthStartEndDates(date=null) {
  const currentDate = new Date();

  // Get the current month and year
  const currentMonth = currentDate.toLocaleString("default", { month: "short" });
  const currentYear = currentDate.getFullYear();

  // Start date of the month
  const startOfMonth = `01/${currentMonth}/${currentYear}`;

  // End date of the month
  const endOfMonthDate = new Date(currentYear, currentDate.getMonth() + 1, 0);
  const endOfMonth = `${endOfMonthDate.getDate()}/${currentMonth}/${currentYear}`;


  let humanReadableDate;

  if(date !== null){
    const timestamp = date.replace("/Date(", "").replace(")/", "");
    const dateObj = new Date(parseInt(timestamp));
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    // Convert hours to 12-hour format and determine AM/PM
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 (midnight) to 12

    humanReadableDate = `${year}-${month}-${day} ${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  }

  return { startOfMonth, endOfMonth, humanReadableDate };
}


function returnFilterDataAndUniqueItemArray(data, identity) {
  let suborinatesData = [];
  let selfData = [];

  const hrmAccess_groupedItems ={};
  // Filter data based on em_boss and identity
  suborinatesData = data.Data.filter(element => element.em_boss === identity);
  selfData = data.Data.filter(element=>element.em_code === identity);

   data.Data.forEach(item =>{
    const {em_code, ...rest} = item;

    if(!hrmAccess_groupedItems[em_code]){
      hrmAccess_groupedItems[em_code] = []
    }

    hrmAccess_groupedItems[em_code].push(rest)

    return hrmAccess_groupedItems;
  })
  

  // Initialize filterItems with the 'self' entry
  const filterItems = [{ em_name: 'SELF', em_code: identity }];

  // If no data matches, just return res (no further processing)
  if (suborinatesData.length > 0) {
    // Loop through filtered results to add unique employees to filterItems
    suborinatesData.forEach(element => {
      // Check if the em_name is already in filterItems (case-insensitive, trim spaces)
      const hasPair = filterItems.some(item => item.em_name.toLowerCase().trim() === element.em_name.toLowerCase().trim());
      
      // If the em_name is not already in filterItems, add it
      if (!hasPair) {
        filterItems.push({ em_name: element.em_name, em_code: element.em_code });
      }
    });

  }

  
  // Return the updated filterItems
  return {selfData,suborinatesData,filterItems,hrmAccess_groupedItems};
  
}

function populateSelectOptions(containerId,selectId , filterItems) {

  
  // Get the element where the select dropdown will be added
  const containerDiv = document.getElementById(containerId);

  // Get the currently selected value before resetting the select options
  const selectElement = document.getElementById(selectId);
  const selectedValue = selectElement ? selectElement.value : null;


  // Clear any existing content (optional, if you want to replace content)
  containerDiv.innerHTML = `<select id="${selectId}"></select>`; 

  // Get the select element to insert options into
  const newSelectElement = document.getElementById(selectId);

  
  // Loop through the filterItems and create an option for each em_name
  if(Array.isArray(filterItems) && filterItems.every(item => item.em_name && item.em_code)){
    filterItems.forEach(item => {
    
      // Create a new option element
      const option = document.createElement('option');
      
      // Set the text and value of the option (using em_name for text and em_code for value)
      option.textContent = item.em_name;
      option.value = item.em_code;  // Use em_code as the value (if needed)

      if (option.value === selectedValue) {
        option.selected = true;
      }
  
      // Append the option to the select element
      newSelectElement.appendChild(option);
    });
  }else{
    // [{em_name:'SELF',em_code:identity}]
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'SELF';  // The label shown for the default option
    defaultOption.value = identity;   // The value associated with the default option
    newSelectElement.appendChild(defaultOption);

    for(const[em_code, items] of Object.entries(filterItems)){
      if(items.length > 0 && em_code !== identity){
        const firstItem = items[0]
        const option = document.createElement('option');
        
        option.textContent = firstItem.em_name;
        option.value = em_code;


        if (option.value === selectedValue) {
          option.selected = true;
        }

        newSelectElement.appendChild(option)
      }
      
    }

  }
}

function populateCheckInList(data, targetElementId) {
  // Ensure the target element exists
  const checkInList = document.getElementById(targetElementId);
  if (!checkInList || data.length === 0) return;

  // Loop through each item in selfData and create an entry
  data.forEach((element, index) => {
    const { startOfMonth, endOfMonth, humanReadableDate } = getMonthStartEndDates(element.dt);

    // Create the container for this entry
    const entry = document.createElement('span');
    entry.innerHTML = `
      <p>${index + 1}</p>
      <p>
        <img src="../assets/images/g_map_4.png" alt="empty" style="width:30px; height:30px; background-color:transparent;" />
        <a href="https://www.google.com/maps?q=${element.lat},${element.long}" target="_blank">${humanReadableDate}</a>
      </p>
      <p>${element.note}</p>
    `;

    // Apply alternating background color based on even/odd index
    if (index % 2 === 0) {
      entry.style.cssText = `
        background-color: #C5C5C5;
        color: white;
      `;
    }

    // Append the entry to the target list
    checkInList.appendChild(entry);
  });
}

function getBangladeshTime(date) {
  return new Date(
      date.toLocaleString("en-US", { 
        timeZone: "Asia/Dhaka",
        hourCycle:'h23'
       })
  );
}

function loadingOverlay(isShow=true,elementId) {
  const attachmentElement = document.getElementById(elementId)

  const styleId = 'dynamicOverlayStyles';
  if(attachmentElement){
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
      }
      .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
      }
      @keyframes spin {
          0% {
              transform: rotate(0deg);
          }
          100% {
              transform: rotate(360deg);
          }
      }
    `;
    document.head.appendChild(style);
  }
  
  if(isShow === true){

  // Create the overlay div
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'loadingOverlay';

  // Create the spinner
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';

  // Append the spinner to the overlay
  overlay.appendChild(spinner);
    attachmentElement.appendChild(overlay);
  }else if(isShow === false){
    const overlay = document.getElementById('loadingOverlay');
    attachmentElement.removeChild(overlay)
  }
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

function removeEdgeSymbols(str) {
  // Replace unwanted symbols at the start and end of the string
  return str.replace(/^[#$\-:.,;!?]+|[#$\-:.,;!?]+$/g, '');
}

function formatNumberWithThousandPositionComma(value) {
  return Number(value).toLocaleString();
}

function showAlert(message,overlay = 'block') {
  document.getElementById('darkOverlay').style.display = overlay;
  document.body.classList.add('transparent');

  Swal.fire({
      icon: "warning",
      title: message,
      showConfirmButton: false,
      showCloseButton: true,
      customClass: { popup: 'swal2-alert-custom-smallscreen' }
  }).then(() => {
      document.getElementById('darkOverlay').style.display = 'none';
      document.body.classList.remove('transparent');
  });
}


async function adjustContentHeight(primaryElement, dependantElement,value) {
  // const content = document.getElementById('content');
  const content = document.getElementById(primaryElement);
  
  
  if (!content) return;

  // const elements = ['nav_div', 'date_range', 'as_on_date'];
  const elements = dependantElement;

  let totalVh = 0;
  elements.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      totalVh += pxToVh(el.offsetHeight);
    }
  });

  totalVh += value; // extra margin or spacing
  const remainingVh = 100 - totalVh;

  
  content.style.height = `${remainingVh}vh`;
}





















