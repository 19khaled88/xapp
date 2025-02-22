

const urlParams = new URLSearchParams(window.location.search);
const platformDetailsObject = Object.fromEntries(urlParams.entries());


const rootUrl = 'https://api.ctgshop.com'
const rootWwwUrl = 'https://api.ctgshop.com'
// const rootUrl = 'https://condomshopbd.com'
// const rootWwwUrl = 'https://www.condomshopbd.com'


// sendOTP.js
document.addEventListener('DOMContentLoaded', () => {
    try {
        const sendOTPForm = document.getElementById('sendOTPForm');

        document.getElementById('mobile').focus();
        if (sendOTPForm) {
            sendOTPForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=xlogin`
                
                let formData = {};  // This initializes formData as an empty object

                const hash = createHash(
                    platformDetailsObject.type,
                    platformDetailsObject.isWebView,
                    platformDetailsObject.platform,
                    platformDetailsObject.browser,
                    platformDetailsObject.sHeight,
                    platformDetailsObject.sWidth,
                    platformDetailsObject.dpi,
                )

               
                const mobile = sendOTPForm.elements.mobile.value;               

                formData.emPhone        = mobile;
                formData.otp            = "";
                formData.authid         = "";
                formData.secretkey      = hash;
                

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
                .then(async data=>{
                   
                    if(data.status === true){
                        const res = data.data; 
                        if(res.authid && res.authid.length > 0){
                           await localStorageManager('set','xAppUserInfo',{emPhone:mobile,authid:res.authid});
                           const getData = await localStorageManager('get','xAppUserInfo')
                           
                           if(getData.authid.length > 0 && getData.emPhone.length >0){
                            window.location.href = 'https://ctgshop.com/xapp/';
                           } else {
                            window.location.href = 'https://www.google.com/';
                           }

                        }else{
                            const obj = {};
                            obj.type        =  platformDetailsObject.type;
                            obj.isWebView   =  platformDetailsObject.isWebView;
                            obj.platform    =  platformDetailsObject.platform;
                            obj.browser     =  platformDetailsObject.browser;
                            obj.sHeight     =  platformDetailsObject.sHeight;
                            obj.sWidth      =  platformDetailsObject.sWidth;
                            obj.dpi         =  platformDetailsObject.dpi;
                            obj.emPhone     =  mobile;
    
                            const queryString           = new URLSearchParams(obj).toString();
                            window.location.href        = `https://ctgshop.com/xapp/pages/verifyOTP.html?${queryString}`;
                        }
                    } 
                    else if(data.status === false && data.message === 'User already has a device registered. Please contact with HR to unregister old device.'){
                        Swal.fire({
                            icon: "error",
                            text: data.message,
                            
                            });    
                        
                    } 
                    else if(data.status === false){
                        Swal.fire({
                            icon: "error",
                            text: data.message,
                            
                            });
                    }
                })
                .catch(error=>{
                    window.location.href = 'https://www.google.com/';
                    
                })   



                // const obj = {};
                // obj.type        =  platformDetailsObject.type;
                // obj.isWebView   =  platformDetailsObject.isWebView;
                // obj.platform    =  platformDetailsObject.platform;
                // obj.browser     =  platformDetailsObject.browser;
                // obj.userAgent   =  platformDetailsObject.userAgent;
                // obj.sHeight     =  platformDetailsObject.sHeight;
                // obj.sWidth      =  platformDetailsObject.sWidth;
                // obj.dpi         =  platformDetailsObject.dpi;
                // obj.emPhone     =  mobile;

                // const queryString           = new URLSearchParams(obj).toString();
                // window.location.href        = `https://ctgshop.com/xapp/pages/verifyOTP.html?${queryString}`;

            });
        }
    } catch (error) {
        window.location.href = 'https://www.google.com/';
       
    }

        



    // if (sendOTPForm) {
    //     sendOTPForm.addEventListener('submit', async (e) => {
    //         e.preventDefault();
            
    //         const mobile = sendOTPForm.elements.mobile.value;
           
    //         const response = await fetch(`/api/sendOTP?mobile=${mobile}`);
    //         const result = await response.json();
    //         // console.log(result);
    //         alert(result.message);
    //         if (result.success) {
    //             window.location.href = 'verifyOTP.html';
    //         }
    //     });
    // }

    

    // // Single event listener function to handle changes in both fields
    // function handleInputChange(event) {
    //     const emailValue = emailInput.value;
    //     const mobileValue = mobileInput.value;

    //     if (emailValue) {
    //     mobileInput.removeAttribute('required');
    //     } else {
    //     mobileInput.setAttribute('required', 'required');
    //     }

    //     if (mobileValue) {
    //     emailInput.removeAttribute('required');
    //     } else {
    //     emailInput.setAttribute('required', 'required');
    //     }

    //     console.log(`Field Changed: ${event.target.id}, Value: ${event.target.value}`);
    // }

    // // Attach the same event listener to both fields
    // // emailInput.addEventListener('input', handleInputChange);
    // mobileInput.addEventListener('input', handleInputChange);


    // Function to update the form for OTP input



    // Function to send a POST request
    
    

    // Function to create the initial form data
    

});

function createHash(data1, data2, data3, data4,data5,data6,data7,data8) {
    // Concatenate data into a single string with a delimiter
    const combinedString = `${data1}|${data2}|${data3}|${data4}|${data5}|${data6}|${data7}|${data8}|`;
    
    // Encode to Base64
    const encodedString = btoa(combinedString);
  
    return encodedString;
}






