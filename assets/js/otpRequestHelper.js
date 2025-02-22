// const urlParams = new URLSearchParams(window.location.search);
// const platformDetailsObject = Object.fromEntries(urlParams.entries());

// try {
//     // Retrieve the stored object from localStorage
//     const x_App_User_Info = JSON.parse(localStorage.getItem('x-App_User-Info'));

//     if (x_App_User_Info) {
//         // Check if mobile and authid are not empty
//         if (x_App_User_Info.mobile && x_App_User_Info.authid) {
//             console.log('User Info:', x_App_User_Info);
//             console.log('Mobile:', x_App_User_Info.mobile);
//             console.log('AuthID:', x_App_User_Info.authid);
//         } else {
//             console.log('Mobile or AuthID is empty.');
//             // You can handle the case where mobile or authid is empty here
//         }
//     } else {
//         const sendOTPForm = document.getElementById('sendOTPForm');
//         if (sendOTPForm) {
//             sendOTPForm.addEventListener('submit', async (e) => {
//                 e.preventDefault();
                
//                 const postUrl = `https://condomshopbd.com/xapi/dash_api.ashx?cmd=xlogin`;
                
//                 let formData = createFormData(sendOTPForm.elements.mobile.value, '');  // Create form data
                
//                 try {
//                     const data = await sendFormRequest(postUrl, formData);// Send the initial request
//                     console.log(data)
//                     if (data.status === true) {
//                         const verifyOTPForm = document.getElementById('sendOTPForm');
//                         // const mobile = sendOTPForm.elements.mobile.value;
                       
//                         let store_mobile = sendOTPForm.elements.mobile.value
//                         updateFormForOTP();// Update the form UI for OTP input
    
//                         verifyOTPForm.addEventListener('submit', async(e)=>{
//                             e.preventDefault();

//                             formData = createFormData(store_mobile,verifyOTPForm.elements.otp.value);// Update formData with the OTP value from the input field
                           
//                             console.log(formData)
//                             const otpData = await sendFormRequest(postUrl, formData);// Send the OTP verification request
                           
//                             const dataObject = {
//                                 mobile_number: mobile,
//                                 authid: otpData.authid,
                                
//                             };
//                             localStorage.setItem('x-App_User-Info', JSON.stringify(dataObject));
//                             console.log('Initialized x-App_User-Info in localStorage.');

//                             handleOTPResponse(otpData);// Handle OTP verification response
//                         },{once:true});
    
    
//                     }else if(data.status === false && data.message === 'User already has a device registered'){
//                         console.log(data)
//                     }
//                 } catch (error) {
//                     console.error('Error:', error);
//                 }
//             });
//         }
        
//     }
// } catch (error) {
//     console.error('Error:', error);
// }


function verifyOtpAndGetAuthId(mobile,otp){
    // console.log(mobile,otp)
}


function createFormData(mobile,otp) {
    return {
        emPhone: mobile,
        otp: otp,
        browsertype: platformDetailsObject.type,
        iswebview: platformDetailsObject.isWebView,
        platform: platformDetailsObject.platform,
        browser: platformDetailsObject.browser,
        useragent: platformDetailsObject.userAgent,
        authid:''
    };
}


async function sendFormRequest(url, formData) {

    const formObject = {};

    // Convert formData object to a string format
    for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
            formObject[key] = formData[key].toString();
        }
    }

    const jsonString = JSON.stringify(formObject);

    const form = new FormData();
    form.append("postData", jsonString);

    const response = await fetch(url, {
        method: 'POST',
        body: form
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    return response.json();
}


function updateFormForOTP() {
    const heading = sendOTPForm.querySelector('h1');
    const label = sendOTPForm.querySelector('label');
    const input = sendOTPForm.querySelector('input');
    const button = sendOTPForm.querySelector('button');

    heading.textContent = 'Enter the OTP sent to your mobile';
    label.textContent = 'OTP:';
    input.type = 'text';
    input.name = 'otp';
    input.id = 'otp';
    input.value = "";
    input.placeholder = 'Enter OTP';
    button.textContent = 'Verify OTP';
}


// Function to handle OTP verification response
function handleOTPResponse(otpData) {
    if (otpData.status === true) {
        // Handle successful OTP verification
        // console.log('OTP verified successfully!');
    } else {
        // Handle failed OTP verification
        // console.log('OTP verification failed:', otpData.message);
    }
}
