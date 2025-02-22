const urlParams = new URLSearchParams(window.location.search);
const platformDetailsObject = Object.fromEntries(urlParams.entries());


const rootUrl = 'https://api.ctgshop.com'
const rootWwwUrl = 'https://api.ctgshop.com'
// const rootUrl = 'https://condomshopbd.com'
// const rootWwwUrl = 'https://www.condomshopbd.com'

// verifyOTP.js
document.addEventListener('DOMContentLoaded', () => {
    const verifyOTPForm = document.getElementById('verifyOTPForm');

    document.getElementById('otp').focus();

    // // Check if platformDetailsObject is empty
    // if (!platformDetailsObject || Object.keys(platformDetailsObject).length === 0) {
    //     // Redirect to the index page if platformDetailsObject is empty
    //     window.location.href = 'https://ctgshop.com/xapp';  // Replace with the actual path to your index page
    //     return;  // Stop further execution
    // }
    
    if (verifyOTPForm) {
        verifyOTPForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=xlogin`
            const otp = verifyOTPForm.elements.otp.value;

            let newFormData ={}

            const hash = createHash(
                platformDetailsObject.type,
                platformDetailsObject.isWebView,
                platformDetailsObject.platform,
                platformDetailsObject.browser,
                platformDetailsObject.sHeight,
                platformDetailsObject.sWidth,
                platformDetailsObject.dpi
            )

            newFormData.emPhone = platformDetailsObject.emPhone;
            newFormData.otp = otp;
            newFormData.authid = "";
            newFormData.secretkey = hash

            let formObject = {};
    
            // Iterate through the formData object and add key-value pairs to formObject
            for (let key in newFormData) {
                if (newFormData.hasOwnProperty(key)) {
                formObject[key] = newFormData[key].toString();
                }
            }

            var jsonString = JSON.stringify(formObject); // Convert formObject to a JSON string
 
            var form = new FormData(); // Create a new FormData object

            form.append("postData", jsonString); // Append the JSON string to the FormData object
            

            fetch(postUrl,{
                method:'POST',
                body:form
            })
            .then(response=>{
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data=>{
                if (data.status === true && data.data && data.data.authid && data.data.authid.length > 0) {
                    // Create the user info object
                    const x_App_User_Info = {
                        emPhone: platformDetailsObject.emPhone,
                        authid: data.data.authid,
                    };
                
                    // Store the user info in localStorage as a JSON string
                    localStorage.setItem('xAppUserInfo', JSON.stringify(x_App_User_Info));
                
                    // Store session info in sessionStorage as a JSON string
                    sessionStorage.setItem('xAppUsersession', JSON.stringify({
                        bossId: data.data.bossID,
                        emCode: data.data.emCode,
                        emName: data.data.emName
                    }));
                
                    // Retrieve the stored user info from localStorage
                    const storedXAppUserInfo = localStorage.getItem('xAppUserInfo');                  
                
                    // Parse the stored JSON string back into an object
                    const parsedXAppUserInfo = JSON.parse(storedXAppUserInfo);
                
                    // Compare the parsed object with the original object
                    if (parsedXAppUserInfo.authid === x_App_User_Info.authid && parsedXAppUserInfo.emPhone === x_App_User_Info.emPhone) {
                        
                        // Redirect to the desired page if the stored data is correct
                        window.location.href = 'https://ctgshop.com/xapp/';
                    } else {
                        // Log an error if the data doesn't match
                        Swal.fire({
                            text: "State not created",
                            icon: "warning",
                            timer: 20000, // Time in milliseconds (5 seconds)
                            timerProgressBar: true, // Show progress bar for the timer
                            willClose: () => {
                                // Redirect when the dialog closes after the timer
                                window.location.href = 'https://www.google.com/';
                            }
                          });
                    }
                } else {
                    // console.log('authid does not exist or is empty.');
                    Swal.fire({
                        text: "Auth Id not exist",
                        icon: "warning",
                        timer: 20000, // Time in milliseconds (5 seconds)
                        timerProgressBar: true, // Show progress bar for the timer
                        willClose: () => {
                            // Redirect when the dialog closes after the timer
                            window.location.href = 'https://www.google.com/';
                        }
                      });
                }
            })
            .catch(error=>{
                Swal.fire({
                    text: "Connection error!",
                    icon: "warning",
                    timer: 20000, // Time in milliseconds (5 seconds)
                    timerProgressBar: true, // Show progress bar for the timer
                    willClose: () => {
                        // Redirect when the dialog closes after the timer
                        window.location.href = 'https://www.google.com/';
                    }
                  });
            });

            
            // console.log(newFormData,formObject)
            
        });
    }
});

function createHash(data1, data2, data3, data4,data5,data6,data7,data8) {
    // Concatenate data into a single string with a delimiter
    const combinedString = `${data1}|${data2}|${data3}|${data4}|${data5}|${data6}|${data7}|${data8}|`;
    
    // Encode to Base64
    const encodedString = btoa(combinedString);
  
    return encodedString;
}


