
// async function getVersion(version) {
//     // const getVersionUrl = 'http://119.18.148.10:8090/xapi/dash_api.ashx?cmd=xwebversion&getset=get&version=0';

//     const url = `http://119.18.148.10:8090/xapi/dash_api.ashx?cmd=xwebversion&getset=get&version=${version}`;
  
//     try {
//       // Await the response of the fetch request
//       const response = await fetch(url);
  
//       // Check if the response is successful (status code 200)
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       // Await the response body as JSON
//       const data = await response.json();
  
//       // Process the received version data
//       console.log('GET version:', data);
//     } catch (error) {
//       // Handle any errors that occurred during the fetch
//       console.error('Error fetching version:', error);
//     }
//   }




// async function setVersion(version) {
//     // const setVersionUrl = 'http://119.18.148.10:8090/xapi/dash_api.ashx?cmd=xwebversion&getset=set&version=101';
//     const url = `http://119.18.148.10:8090/xapi/dash_api.ashx?cmd=xwebversion&getset=set&version=${version}`;
  
//     try {
//       // Await the response of the fetch request to set the version
//       const response = await fetch(url, {
//         method: 'GET',  // GET method to match the example provided
//       });
  
//       // Check if the response is successful (status code 200)
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       // Await the response body as JSON
//       const data = await response.json();
  
//       // Process the response after setting the version
//       console.log('SET version response:', data);
//     } catch (error) {
//       // Handle any errors that occurred during the fetch
//       console.error('Error setting version:', error);
//     }
//   }



// Define a combined async function to either get or set the version
async function handleVersion(version, operation) {
    // Construct the URL based on the operation (get or set)
    const url = `http://119.18.148.10:8090/xapi/dash_api.ashx?cmd=xwebversion&getset=${operation}&version=${version}`;
    
    try {
      // Await the response of the fetch request
      const response = await fetch(url);
      
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Await the response body as JSON
      const data = await response.json();
  
      // Process the response based on the operation
      if (operation === 'get') {
        console.log('GET version:', data);  // Handle GET version response
      } else if (operation === 'set') {
        console.log('SET version response:', data);  // Handle SET version response
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error(`Error ${operation === 'get' ? 'fetching' : 'setting'} version:`, error);
    }
  }
  
//   Example usage:
//   handleVersion(0, 'get');
//   handleVersion(101, 'set');
  