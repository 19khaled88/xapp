// const lazyImages = document.querySelectorAll("img.lazy");

// const options = {
//   root: null, // Use the viewport as the root
//   rootMargin: "0px",
//   threshold: 0.1 // Specify the threshold for intersection
// };

// const handleIntersection = (entries, observer) => {
//   entries.forEach((entry) => {
    
//     if (entry.isIntersecting) {
//       const img = entry.target;
//       const src = img.getAttribute("data-src");
     
//       // Replace the placeholder with the actual image source
//       img.src = src;

//       // Once the image is loaded, display it
//       img.onload = () => {
//         img.style.display = 'block'; // Show the loaded image
//         img.previousElementSibling.style.display = 'none'; // Hide the spinner
//       };

//       // Stop observing the image
//       observer.unobserve(img);
//     }
//   });
// };

// const observer = new IntersectionObserver(handleIntersection, options);

// document.addEventListener("DOMContentLoaded", () => {
//   lazyImages.forEach((image) => {
//     observer.observe(image);
//   });
// });


function lazyLoadImages(iframeDocument = null) {
  if(iframeDocument !== null){
    const lazyElements = iframeDocument.querySelectorAll('img.lazy');
    
    // Create an IntersectionObserver to check when images enter the viewport
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    if (element.tagName === 'IMG' && element.dataset.src) {
                        // Set the src attribute to the actual image URL
                        element.src = element.dataset.src.trim().replace(/\s+/g, '').replace(/\.jpg.*$/, '.jpg');
                        element.style.display = 'block';  // Ensure the image is displayed
                        element.onload = () => element.classList.add('loaded');  // Add 'loaded' class when the image loads

                        // Stop observing once the image is loaded
                        observer.unobserve(element);
                    }
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px'  // Load images a bit before they come into view
        });

        // Observe each lazy image inside the iframe
        lazyElements.forEach(element => observer.observe(element));
  }else{
    const lazyElements = document.querySelectorAll('img.lazy, .filterBtn button'); // Select all lazyElements with the 'lazy' class

    // Create an intersection observer
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {  
          
          const element = entry.target;
  
          if(element.tagName === 'IMG' && element.dataset.src){
            // console.log(element,element.getAttribute('data-src').trim().replace(/\s+/g, '').replace(/\.jpg.*$/, '.jpg'))
            element.src = element.getAttribute('data-src').trim().replace(/\s+/g, '').replace(/\.jpg.*$/, '.jpg'); 
            element.style.display = 'block';            
            element.onload = () => element.classList.add('loaded'); 
          }
  
          if (element.tagName === 'BUTTON' && element.dataset.onclick) {
            element.onclick = new Function('return ' + element.dataset.onclick)(); // Evaluate the `onclick` content
            console.log(element)
          }
           
  
          observer.unobserve(element); 
  
        }
      });
    }, { rootMargin: '0px 0px 200px 0px' }); // Optionally adjust rootMargin to load lazyElements just before they enter view
  
    lazyElements.forEach(element => observer.observe(element)); // Observe each lazy image
  }
  
  

  
}