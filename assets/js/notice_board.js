// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");

const rootUrl = 'https://api.ctgshop.com'
const rootWwwUrl = 'https://api.ctgshop.com'
// const rootUrl = 'https://condomshopbd.com'
// const rootWwwUrl = 'https://www.condomshopbd.com'

let currentScale = 1;
const minScale = 1;
const maxScale = .6;




if (pageTitle === "Notice Board") {
  const url =`${rootWwwUrl}/xapi/emp.ashx?cmd=note&list=allnew&imei=70:3a:51:90:39:05`;

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
      // Work with the fetched data
      
      showNotice(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
}

function showNotice(data) {

  const noticeMain = document.getElementById("noticeMain");
  
  data.forEach((item, index) => {
    const individualNotices = document.createElement("div");
    individualNotices.classList.add("individual-notice"); // Add a class instead of an ID

    // Decode URL-encoded text
    const decodedText = decodeURIComponent(item.body);
    const humanReadableText = decodedText
      .replace(/\+/g, " ") // Replace '+' with space
      .replace(/%26/g, "&") // Replace '%26' with '&'
      .replace(/\n/g, "<br>")
      .replace(/%2c/g, ",") // Replace '%2c' with ','
      .replace(/%3a/g, ":") // Replace '%3a' with ':'
      .replace(/%e2%80%99/g, "'"); // Replace '%e2%80%99' with apostrophe symbol
    
    if(item.img_id !== ""){

        individualNotices.innerHTML = `
        <span class="title-attachment" id="title-attachment"> 
            <p id="title">${item.title}</p>
            <button onClick="showPDF('${item.img_id}')" class="attachment-button">
                <img src="../assets/images/paper-clip.png" alt=""/>
            </button>
        </span>
        <p>${item.post_date}</p>
        <span class="info">${humanReadableText}</span>
        `;
    }else{
        individualNotices.innerHTML = `
        <p class="title" id="title">${item.title}</p>
        <p>${item.post_date}</p>
        <span class="info">${humanReadableText}</span>
        `;
    }


    noticeMain.appendChild(individualNotices);
  });
}

function showPDF(pdfUrl) {
  // var pdfContainer = document.getElementById("pdfContainer");
  var pdfOverlay = document.getElementById("pdfOverlay");
  var noticeTop = document.getElementById("noticeTop");
  
  // Clear any existing content in the container
  
  var extension = getFileExtension(pdfUrl);
  
  // pdfContainer.innerHTML = "";
  // noticeTop.style.display = 'none';

  // Check if the file is a PDF
  if (extension.toLowerCase() === 'pdf') {
    
    console.log(pdfUrl)
    Swal.fire({
      html: `
        <div id="pdfPreviewer" class="pdf-container"></div>
      `,
      showCloseButton: true,
      customClass: {
        container: 'swal2-custom-fullscreen-container',
        popup: 'swal2-alert-custom-fullscreen',
        htmlContainer: 'swal2-custom-fullscreen-html-container',
      },
      didOpen: () => {
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
    
  } else if (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg' || extension.toLowerCase() === 'png') {
      Swal.fire({
        showCloseButton: true,
        customClass: {
          container: 'swal2-custom-fullscreen-container',
          popup: 'swal2-alert-custom-fullscreen',
          htmlContainer: 'swal2-custom-fullscreen-html-container',
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

      
  }

  //show the overlay
  pdfOverlay.style.display = "flex"; // Show overlay
}

function closePDFOverlay() {
  var pdfOverlay = document.getElementById("pdfOverlay");
  var noticeTop = document.getElementById("noticeTop")
  // Hide the overlay
  pdfOverlay.style.display = "none"; // Hide overlay
  // noticeTop.style.display = 'block'
}


function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
}


function zoomPDF(direction,pdfUrl) {
  const zoomStep = 0.2;
  if (direction === 'in') {
    
    if (currentScale - zoomStep >= maxScale) {
      
      currentScale -= zoomStep;
      // Re-render the PDF with the new scale
      pdfRender(pdfUrl, 'pdfPreviewer');
    }
  } else if (direction === 'out') {
   // currentScale = Math.max(zoomStep, currentScale - zoomStep); // Prevent scale from going below zoomStep
  
    if (currentScale + zoomStep <= minScale) {
      
      currentScale += zoomStep;
      // Re-render the PDF with the new scale
      pdfRender(pdfUrl, 'pdfPreviewer');
    }
  }
}


function pdfRender(pdfUrl, containerId) {
  var container = document.getElementById(containerId);
  container.innerHTML = ''; 

  if (!container) return;
  

  pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
    var numPages = pdf.numPages;
    var currentPage = 1;

    function renderPage(pageNumber) {
      pdf.getPage(pageNumber).then(function(page) {
        var viewport = page.getViewport({ scale: currentScale });
        var scale = window.innerWidth / viewport.width;
        var scaledViewport = page.getViewport({ scale: scale });

        // Render at a higher scale for better clarity
        var renderScale = scale * 3;
        var renderViewport = page.getViewport({ scale: renderScale });

        var canvas = document.createElement('canvas');
        canvas.setAttribute('id','canvas')
        var context = canvas.getContext('2d');
        canvas.height = renderViewport.height;
        canvas.width = renderViewport.width;

        // Set CSS width and height to match the scaledViewport dimensions
        canvas.style.width = `${scaledViewport.width}px`;
        canvas.style.height = `${scaledViewport.height}px`;

        container.appendChild(canvas);

        var renderContext = {
          canvasContext: context,
          viewport: renderViewport
        };

        page.render(renderContext).promise.then(() => {
          // Additional actions after rendering (if needed)
        });

      });
    }

    // Render all pages
    for (var i = 1; i <= numPages; i++) {
      renderPage(i);
    }

  });
}

function pageRender(pdfUrl, containerId){

  var container = document.getElementById(containerId);
  container.innerHTML = '';

  if (!container) return;

  pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
    var numPages = pdf.numPages;

    // Helper function to render a page and wait for it to complete
    function renderPageSequentially(pageNumber) {
      return pdf.getPage(pageNumber).then(function (page) {
        var viewport = page.getViewport({ scale: 1.5 });
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
  });

}






