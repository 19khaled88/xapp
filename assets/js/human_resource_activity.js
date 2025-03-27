if (!navigator.onLine) {
  handleOffline();
}

document.addEventListener("DOMContentLoaded",async()=>{

  const getData = await localStorageManager('get','xAppUserInfo');
  if(getData === null){
    window.location.href = `https://ctgshop.com/xapp/test/login.html`
  }

  // handleVersion(0, 'get');

})

// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");
const identity = urlParams.get("identity");
const emName = urlParams.get("name");
const applyReportingBoss = urlParams.get("boss");
const reportingBossName = urlParams.get("bossName");

const hrmActivityTop = document.getElementById("hrmActivityTop");
const btn = hrmActivityTop.querySelector("button");
// const title = btn.querySelector("p");
const title = hrmActivityTop.querySelector("p");


var deviceType = getDeviceType();
var webView = isWebView();


window.addEventListener('popstate', function(event) {
  if (event.state && event.state.scrollPosition !== undefined) {
    // Restore the saved scroll position
    window.scrollTo(0, event.state.scrollPosition);
  }
});


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

let newFilterData;
let fetchedData;
let newEmployeeHTML;


// Check if the parameter is present
if (pageTitle) {
  // Set the title of the HTML page
  //   document.title = pageTitle;
  title.textContent = pageTitle;
  
  
  switch (pageTitle) {
    case "HR policy":
      title.textContent = "HR Policies";
      const url = `${rootUrl}/xapi/emp_com.ashx?cmd=hrpolicy`;
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
          hrPolicy(data)
          //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
            // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
        })
        .catch((error) => {
          // Handle any errors
          console.error("There was a problem with the fetch operation:", error);
        });

      break;
    case "holidays":
      title.textContent = "Annual Holiday List";
      const link = `${rootWwwUrl}/xapi/emp_com.ashx?cmd=holiday`;
      fetch(link)
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the JSON response
        return response.json();
      })
      .then((data) => {
        if(data.success === true){
          holidays(data.holidata);

          //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
            // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
      break;
    case "attendance":
      title.textContent = "My Attendance Status";
      fetchHrData("dateTimeInfo")
        .then((result) => {
          showAttendance(result);

          //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
            // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    case "payslip":
      title.textContent = "My Payslip Status";
      fetchHrData("dateTimeInfo")
        .then((result) => {
          // paySlipStatus(result);
          payslipManage(result);

          //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
            // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
        })
        .catch((error) => {});

      break;
    case "late application":
      title.textContent = "Late Application";
      fetchHrData("lateReasonTitle")
        .then((result) => {
          lateApplication(result);

          //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
           // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
        })
        .catch((error) => {});

      break;
    case "leave application":
      title.textContent = "Leave Application";
      fetchHrData("leaveApplicationTitle")
        .then((result)=>{
          leaveApplication(result)

          //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
            // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
        })
        .catch((error)=>{

        })
      break;
    case "Income tax":
      title.textContent = "Income Tax";
        taxFunc()

        //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
            // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
      break;
    case "leave status":
      title.textContent = "Leave Status";
      leaveStatus()

      //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
            // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
      break;
    case "work from home application":
      title.textContent = "Work From Home application";
      fetchHrData("workFromHome")
        .then((result)=>{
          workFromHome(result);
          
          
          //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
            // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
        })
        .catch((error)=>{

        })
      break;
    case "work from home status":
      title.textContent = "Work From Home Status";
      workFromHomeStatus();

      //update parameter of back button to hrm page
      // updateHrmButtonOnclickParamenter(identity);
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );
      break;
    case "provident fund":
      title.textContent = "Provident Fund";
      showProvident()

      //update parameter of back button to hrm page
      // updateHrmButtonOnclickParamenter(identity);
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );
      break;
    case "mandatory saving scheme":
      title.textContent = "Mandatory Saving Scheme";
      mandatoryScheme()

      
      //update parameter of back button to hrm page
      // updateHrmButtonOnclickParamenter(identity);
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );
      break;
    case "loan application":
      title.textContent = "Loan Application";

      applyForLoan()
    

      //update parameter of back button to hrm page
      // updateHrmButtonOnclickParamenter(identity);
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );
      
      // Call temporarilyClosed when the window has fully loaded
      // window.onload = function() {
      //   temporarilyClosed(identity,emName,applyReportingBoss,reportingBossName);
      // };

      break;
    case "loan status":
      title.textContent = "Loan Status";
      loanStatus();

      
      
      //update parameter of back button to hrm page
      // updateHrmButtonOnclickParamenter(identity);
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );
      break;
    case "accounts":
      title.textContent ="Accounts";
      accountsCall();
      break;
    case "notice":
      title.textContent = "Notice Board";
      noticeBoard();

      const d_value = urlParams.get("d");
      
      if(d_value && d_value === "1"){
        const hrm_Activity_back_btn = document.getElementById('hrm_Activity_back_btn')
        if (hrm_Activity_back_btn) {
          hrm_Activity_back_btn.remove();  // This removes the element from the DOM
        }

        document.getElementById('hrm_Activity_home_btn').setAttribute(
          "onclick",
          "handleBackButton()"
        );
       
      }else{
        updateOnclickBackButtonWithArrayParams([
          'hrm_Activity_back_btn', 
          // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
          `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
        ]);
  
        document.getElementById('hrm_Activity_home_btn').setAttribute(
          "onclick",
          `handleBackButton('notice', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
        );

      }
      

      break;
    case "work from other location":
      title.textContent = "Work From Other Location";
      

      fetchHrData("workFromOtherLocation")
        .then((result)=>{
          workFromOtherLocation(result);

          //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          updateOnclickBackButtonWithArrayParams([
            'hrm_Activity_back_btn', 
            // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('hrm_Activity_home_btn').setAttribute(
            "onclick",
            `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
        })
        .catch((error)=>{

        })
      break;
    case "work from other location status":
      title.textContent = "Work From Other Location Status";
      workFromOtherLocationStatus();
      //update parameter of back button to hrm page
      // updateHrmButtonOnclickParamenter(identity);
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );
      break;
    case "contacts":
    
      title.textContent = "Contacts";
      //  'contactMain' is classInfo
      //  'Contacts' is title
      //  manageContacts('./Contacts.html','contactMain','Contacts');
      manageContact()
      
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('notice', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );

      break;
    case "OTP":
      title.textContent = 'OTP';
      otpManageFunc();
      // updateOnclickBackButtonWithArrayParams([
      //   'hrm_Activity_back_btn', 
      //   // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
      //   `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`

      // ]);

      document.getElementById('hrm_Activity_back_btn').setAttribute(
        "onclick",
        `handleBackButton('notice', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );


      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('notice', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );

      const homeButton = document.getElementById("hrm_Activity_home_btn");
      if(homeButton) homeButton.remove();

      break;
    case 'Check In':
      title.textContent = 'Check In'; 
       
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('notice', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );
      
      document.addEventListener("DOMContentLoaded",()=>{

        
        
        // let url = `https://ctgshop.com/erp/API/xbill.ashx?type=bfr_act_list&sdt=01/Nov/2024&edt=06/Nov/2024`
        // fetch(url)
        //   .then(response => {
        //     if (!response.ok) {
        //       throw new Error(`HTTP error! Status: ${response.status}`);
        //     }
        //     return response.json(); // Parse the response as JSON
        //   })
        //   .then(data => {
        //     checkIn(data,(month,year)=>{
        //       setMonth = month;
        //       setYear = year
        //       console.log(month,year,data)
        //     },isOnlyData = true);
        //     loadMapInfo();

        //     // For example, if you want to display the data or manipulate it:
        //     // document.getElementById('dataContainer').textContent = JSON.stringify(data);
        //   })
        //   .catch(error => {
        //     // Handle any errors here
        //     console.error("Error fetching data:", error);
        //   });
        
        
        const monthAbbreviations = {
          January: "Jan",
          February: "Feb",
          March: "Mar",
          April: "Apr",
          May: "May",
          June: "Jun",
          July: "Jul",
          August: "Aug",
          September: "Sep",
          October: "Oct",
          November: "Nov",
          December: "Dec"
        };

        const { startOfMonth, endOfMonth } = getMonthStartEndDates();
       
        let url = `https://ctgshop.com/erp/API/xbill.ashx?type=bfr_act_list&sdt=${startOfMonth}&edt=${endOfMonth}`
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
          })
          .then(data => {
            // const filterableData = data
            // filterableData.Data = filterableData.Data.filter((element)=>element.em_code === identity)
            checkIn(data);
            loadMapInfo();
            const container = document.getElementById('check_in_container')
            if(container){
              loadingOverlay(true, 'check_in_container');
            }
            // For example, if you want to display the data or manipulate it:
            // document.getElementById('dataContainer').textContent = JSON.stringify(data);
          })
          .catch(error => {
            // Handle any errors here
            console.error("Error fetching data:", error);
          });   
        



      //   async function getResult() {
      //     let res
      //     res = await fetchData(`https://ctgshop.com/erp/API/xbill.ashx?type=bfr_act_list&sdt=01/Nov/2024&edt=06/Nov/2024`);
         
      //     checkIn(res);
      //     loadMapInfo();
      //   }

      //  getResult()

            
           
        
      });

      
      
// async function fetchData(month, year) {
//   const url = `https://ctgshop.com/erp/API/xbill.ashx?type=bfr_act_list&sdt=01/${month}/${year}&edt=06/${month}/${year}`;
  
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }

// async function getResult(month = "Nov", year = "2024") {
//   const res = await fetchData(month, year);
  
//   if (res) {
//     checkIn(
//       res,
//       (newMonth, newYear) => {
//         if (newMonth !== month || newYear !== year) {
//           // If month or year changes, fetch data again with new values
//           getResult(newMonth, newYear);
//         }
//       },
//       true // isOnlyData parameter
//     );

//     loadMapInfo(); // Load map info after checkIn is called
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   getResult(); // Start the initial fetch with default month and year
// });

    
      
      break;
    case 'incentive':
      title.textContent = 'Incentive';

      incentiveFunc();
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('notice', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );

      break;
    default:
      title.textContent = "Live Roster Duty";
      liveRosterDuty();
      //update parameter of back button to hrm page
      // updateHrmButtonOnclickParamenter(identity);
      updateOnclickBackButtonWithArrayParams([
        'hrm_Activity_back_btn', 
        // `routeToPage('HRM.html', 'hrmMain', 'hrmIcon', '${identity}')`
        `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
      ]);

      document.getElementById('hrm_Activity_home_btn').setAttribute(
        "onclick",
        `handleBackButton('hrm', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
      );
  }
}

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

function handleDateAndTime(elementName, specificDate = null) {

  const currentDate = specificDate ? new Date(specificDate) : new Date();
  const currentYear = currentDate.getFullYear();

  // const month = currentDate.toLocaleString('default', { month: 'short' }); // Get short month name

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const monthIndex = currentDate.getMonth(); // Get month index (0-11)
  const month = monthNames[monthIndex]; // Get short month name from array

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

function hrPolicy(data){
  const container = document.getElementById("hrmActivityMain"); // Get the image element by its id
  container.innerHTML = "";

  container.innerHTML =`
    <div id="policy_container" class="policy-container">
    </div>
    <section id="pdfOverlay" class="overlay">
      <!-- Modal content -->
      <div class="modal">
          <!-- Close button -->
          <button class="close-button" onclick='closePDFOverlay("hrmActivityTop")'>
          
          Back
          </button>
          <!-- PDF container -->
          <div id="pdfContainer"></div>
      </div>
    </section>
  `;

  const policy_container = document.getElementById("policy_container");

  data.map((policy)=>{
    const policyHTML = `
      <button class="policy" onclick='showPDF(${JSON.stringify(policy.link)}, "hrmActivityTop")'>
        <p>${policy.title}</p>
        <img src="../assets/images/paper-clip.png" alt="" />
      </button>
    `;
    policy_container.innerHTML += policyHTML;
  });

  // Get the policy container element
  const policyContainer = document.getElementById('policy_container');

  // Get all buttons inside the policy container
  const buttons = policyContainer.querySelectorAll('.policy');

  // Loop through each button
  buttons.forEach((button, index) => {
      // // Access properties of each button
      // console.log(`Button ${index + 1}:`, button);

      // // Example: Access the button's text content (policy name)
      // const policyName = button.querySelector('p').textContent;
      // console.log(`Policy Name: ${policyName}`);

      // // Example: Access the onclick attribute or link in each button
      // const onClickAttr = button.getAttribute('onclick');
      // console.log(`OnClick function: ${onClickAttr}`);

      button.addEventListener('click',()=>{
        document.querySelector('.swal2-container').style.cssText =`
          padding:0 !important;
        `
        document.querySelector('.swal2-popup').style.cssText =`
          padding:0 !important;
          justify-content: space-between !important;
        `
        document.querySelector('.swal2-html-container').style.cssText=`
          width: 100%;
          margin-top:${document.querySelector('.swal2-close').offsetHeight + 15}px;
        `
        document.querySelector('.swal2-close').style.cssText =`
          height:45px !important;
          width:45px !important;
          position:fixed !important;
          right:10px !important;
          top:10px !important;
          color:#000;
        `
        document.querySelector('.pdf-page') ? document.querySelector('.pdf-page').style.cssText =`
          max-height:100% !important;
        ` :""
      })
  });
}

function holidays(data){

 
  const container = document.getElementById("hrmActivityMain"); // Get the image element by its id
  container.innerHTML = "";

  const table = document.createElement("table");
  const tableHeaderRow = document.createElement("tr");
  tableHeaderRow.setAttribute("id","table_header_title")
  const tableHeaderColumns = ["SL", "Date", "Purpose"];
  tableHeaderColumns.forEach(columnText => {
    const th = document.createElement("th");
    th.textContent = columnText;
    tableHeaderRow.appendChild(th);
  });

  table.appendChild(tableHeaderRow);

  container.innerHTML =`
    <div id="holiday_head_title"><p>${data.headline}</p></div>
    <div id="holiday_table">
    </div>
    <div id="holiday_footer"><p>${data.footer}</p></div
  `
  const holiday_table = document.getElementById("holiday_table");
  
  data.holidays.forEach(element=>{
    const tableRow = document.createElement("tr");
    const tableData = [element.serial, element.date, element.purpose];
    tableData.forEach(cellText => {
        const td = document.createElement("td");
        td.textContent = cellText;
        tableRow.appendChild(td);
    });
    tableRow.style.backgroundColor = element.cellcolor;
    table.appendChild(tableRow);
  });
  
 holiday_table.appendChild(table)
}

function showAttendance(item){
  const url = `${rootWwwUrl}/xapi/emp_per.ashx?cmd=per&key=attn&imei=70:3a:51:90:39:05&mon=5&year=2024`

  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";

  const attendance_container = document.createElement("div");
  

  attendance_container.setAttribute("id", "attendanceContainer");
  attendance_container.setAttribute("class", "attendanceContainer");

  
  // Create a new Date object
  const currentDate = new Date();
  let currentMonthValue = currentDate.getMonth();
  let currentMonth = currentDate.toLocaleString("default", { month: "long" });
  let currentYear = currentDate.getFullYear();


  fetch(`${rootWwwUrl}/xapi/emp_per.ashx?cmd=per&key=attn&imei=${identity}&mon=${currentDate.getMonth() + 1}&year=${currentYear}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Read the response as text
    })
    .then(data => {
      const rows = data.split('|');
      const result = rows[0].split(',');

      let newResult = [];
      let [present,absent, leave,holidays, dutyOff,late] = result.length > 0 && result.length <= 6 ? [result[0],result[1], result[2],result[3], result[4], result[5]] : [undefined, undefined,undefined, undefined,undefined,undefined];
      newResult.push({present,dutyOff},{holidays,absent},{leave,late});
      
     
      const bottomSpan = attendance_container.querySelector('#bottomSpan');
      const status_full_view = attendance_container.querySelector('#status_full_view');

      const elementsExceptFirst = rows.slice(1);
      
      elementsExceptFirst.forEach((element,index)=>{
        const splitedItem = element.split(',');

        let array_main =[];

        let [dateElement,entryTimeElement, exitTimeElement,forthElement, dayElement] = splitedItem.length > 0 && splitedItem.length <= 6 ? [splitedItem[0],splitedItem[1], splitedItem[2],splitedItem[3], splitedItem[5]] : [undefined, undefined,undefined, undefined,undefined];
      
        let object_one ={dateElement,dayElement}
        let object_two ={entryTimeElement,exitTimeElement}
        let object_three ={forthElement}

        
        splitedItem.forEach((element)=>{
          if (element.includes('\r\n')) {
            const res = element.split('\r\n');
            let [first, last] = res.length > 0 ? [res[0], res[1]] : [undefined, undefined];
            object_three.fifthElement = first;
            object_three.sixthElement = last;
          }
        })
        
        array_main.push(object_one,object_two,object_three)

        const div = document.createElement('div');
       
        array_main.forEach((element,index)=>{
          const span = document.createElement('span');
          for(let key in element){
            const p = document.createElement('p')
            p.textContent = element[key];
            

            if (p.textContent.includes('EarlyExit')) {
              p.style.color = 'red';
            }
            if(p.textContent.includes('Late')) {
              p.style.color = 'red';
            }

            span.appendChild(p);
          }
          
          div.appendChild(span);
        })
        
        status_full_view.appendChild(div);
      });

      // Loop through the array and create a new div for each string
      newResult.forEach((obj,index)=>{
        const div = document.createElement('div')

        for(let key in obj){
          const p = document.createElement('p')

          p.textContent = obj[key]
          div.appendChild(p)
        }
        bottomSpan.appendChild(div)
      });

  })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

  const btn = document.createElement("button");
  btn.setAttribute("id", "atndOkBtn");
  btn.setAttribute("class", "atndOkBtn");
  btn.textContent = "OK";

  const attendance = `
    <div id="attendanceTopDiv" class="attendanceTopDiv">
      <span id="topSpan" class="topSpan"> </span>
      <span id="bottomSpan" class="bottomSpan"></span>
    </div>
    <div id="attendanceBottomDiv" class="attendanceBottomDiv">
      <div id="status_full_view" class="status_full_view"></div>
    </div>  
  `
  attendance_container.innerHTML = attendance;

  const topSpan = attendance_container.querySelector('#topSpan');

  topSpan.appendChild(createDropdown(item[0].months, "monthList", currentMonth))
  topSpan.appendChild(createDropdown(item[1].years, "yearList", currentYear))
  topSpan.appendChild(btn);

  container.appendChild(attendance_container);

  const atndOkBtn = document.getElementById('atndOkBtn')

  atndOkBtn.addEventListener('click',function(){
    const status_full_view = document.getElementById("status_full_view")
    const bottomSpan = document.getElementById('bottomSpan')
    status_full_view.innerHTML = "";
    bottomSpan.innerHTML = "";
    const monthList = document.getElementById("monthList");
    const yearList = document.getElementById("yearList");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const monthValue = months.findIndex((element) => element === monthList.value);
    
    fetch(`${rootWwwUrl}/xapi/emp_per.ashx?cmd=per&key=attn&imei=${identity}&mon=${monthValue + 1}&year=${yearList.value}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Read the response as text
    })
    .then(data => {
        const rows = data.split('|');
        const result = rows[0].split(',');

        let newResult = [];
        let [present,absent, leave,holidays, dutyOff,late] = result.length > 0 && result.length <= 6 ? [result[0],result[1], result[2],result[3], result[4], result[5]] : [undefined, undefined,undefined, undefined,undefined,undefined];
        newResult.push({present,dutyOff},{holidays,absent},{leave,late});
        
       
        const bottomSpan = attendance_container.querySelector('#bottomSpan');
        const status_full_view = attendance_container.querySelector('#status_full_view');

        const elementsExceptFirst = rows.slice(1);
        
        elementsExceptFirst.forEach((element,index)=>{
          const splitedItem = element.split(',');

          let array_main =[];

          let [dateElement,entryTimeElement, exitTimeElement,forthElement, dayElement] = splitedItem.length > 0 && splitedItem.length <= 6 ? [splitedItem[0],splitedItem[1], splitedItem[2],splitedItem[3], splitedItem[5]] : [undefined, undefined,undefined, undefined,undefined];
        
          let object_one ={dateElement,dayElement}
          let object_two ={entryTimeElement,exitTimeElement}
          let object_three ={forthElement}

          
          splitedItem.forEach((element)=>{
            if (element.includes('\r\n')) {
              const res = element.split('\r\n');
              let [first, last] = res.length > 0 ? [res[0], res[1]] : [undefined, undefined];
              object_three.fifthElement = first;
              object_three.sixthElement = last;
            }
          })
          
          array_main.push(object_one,object_two,object_three);

          const div = document.createElement('div');
         
          array_main.forEach((element,index)=>{
            const span = document.createElement('span');
            for(let key in element){
              const p = document.createElement('p')
              p.textContent = element[key];
              
              if (p.textContent.includes('EarlyExit')) {
                p.style.color = 'red';
              }
              if(p.textContent.includes('Late')) {
                p.style.color = 'red';
              }

              span.appendChild(p);
            }
            
            div.appendChild(span);
          })
          
          status_full_view.appendChild(div);
        });

        // Loop through the array and create a new div for each string
        newResult.forEach((obj,index)=>{
          const div = document.createElement('div')

          for(let key in obj){
            const p = document.createElement('p')

            p.textContent = obj[key]
            div.appendChild(p)
          }
          bottomSpan.appendChild(div)
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


  })

 
  
}

function payslipManage(item){
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";

  // Create a new Date object
  const currentDate = new Date();
  let currentMonthValue = currentDate.getMonth();
  let currentMonth = currentDate.toLocaleString("default", { month: "long" });
  let currentYear = currentDate.getFullYear();

  const monthAbbreviations = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec"
  };

  const paySlipContainer = document.createElement("div");
  paySlipContainer.setAttribute("id","paySlipContainer");
  paySlipContainer.setAttribute("class","paySlipContainer");

  const root_container =`
      <div id="payslipTopDiv" class="payslipTopDiv"></div>
      <div id="payslipBottomDiv" class="payslipBottomDiv"></div>
    `;

  const payslip_details =`
    <div id="payslip_title" class="payslip_title">
      <p id="date_time"></p>
      <p id="candidate_name"></p>
    </div>
    <div id="current_payable_details" class="current_payable_details">
        
    </div>
    
  `

  const current_payable_details_static = `
    <span id="gross">
      <label>Gross Salary</label>
      <p>26,000</p>
    </span>
    <span id="basic">
      <label>Basic Salary</label>
      <p>13,000</p>
    </span>
    <span id="total">
      <label>Total Payment</label>
      <p>25,567</p>
    </span>
  `
  paySlipContainer.innerHTML = root_container;

   
  container.appendChild(paySlipContainer);

  const payslipTopDiv = document.getElementById('payslipTopDiv');
  const payslipBottomDiv = document.getElementById('payslipBottomDiv');

  const months = createDropdown(item[0].months, 'monthList', currentMonth);
  const years = createDropdown(item[1].years, "yearList", currentYear)

  const btn = document.createElement("button");
  btn.setAttribute("id", "paySlicShowBtn");
  btn.setAttribute("class", "paySlicShowBtn");
  btn.textContent = "SHOW";
  
  payslipTopDiv.appendChild(months);
  payslipTopDiv.appendChild(years);
  payslipTopDiv.appendChild(btn)

  btn.addEventListener('click',async function(){
    
    const monthList = document.getElementById("monthList");
    const yearList = document.getElementById("yearList");
    const selectedMonthNumber = monthList.selectedIndex;

    try {
      const encryptedIdentity = await encryptFunc(identity);
    
      const fullMonthName = monthList.value;
      const abbreviatedMonthName = monthAbbreviations[fullMonthName];


      // Get selected year and month
      const selectedYear = parseInt(yearList.value, 10);
      const selectedMonthIndex = selectedMonthNumber; // Since `selectedIndex` is 0-based (Jan = 0, Feb = 1, ...)
      
      // Get last date of the selected month
      const lastDate = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate();


      const url = `https://ctgshop.com/erp/Reports/Broker/pay_slip.aspx?dt=${lastDate}/${abbreviatedMonthName}/${yearList.value}&emp=${encryptedIdentity}&cid=19`

      // const response = await fetch(url);
      // if(!response.ok){
      //   throw new Error('Network response was not ok' + response.statusText)
      // }

      // const htmlContent = await response.text();
      
      // payslipBottomDiv.innerHTML = htmlContent;



        // Create an iframe element
        const iframe = document.createElement('iframe');
        const windowHeight = window.innerHeight;
        // Set attributes for the iframe
        iframe.src = url;
        iframe.width = '100%'; // Set width to 100% of the parent div
        iframe.height = `${ windowHeight - (document.getElementById('hrmActivityTop').offsetHeight + 25)}px`; // Set height as needed
        // iframe.height = `'600px'`; // Set height as needed
        iframe.frameBorder = '0'; // Remove the border (optional)
        iframe.allowFullscreen = true; // Allow fullscreen (optional)

        const payslipBottomDiv = document.getElementById('payslipBottomDiv');

        // Optionally, clear any existing content in the div
        payslipBottomDiv.innerHTML = '';

        // Append the iframe to the payslipBottomDiv div
        payslipBottomDiv.appendChild(iframe);


    } catch (error) {
      console.error('There has been a problem with your fetch operation')
    }

    // if((selectedMonthNumber < currentMonthValue) && (parseInt(yearList.value) <= currentYear)){
    //   try {
    //     const encryptedIdentity = await encryptFunc(identity);
      
    //     const fullMonthName = monthList.value;
    //     const abbreviatedMonthName = monthAbbreviations[fullMonthName];
    //     const url = `https://ctgshop.com/erp/Reports/Broker/pay_slip.aspx?dt=30/${abbreviatedMonthName}/${yearList.value}&emp=${encryptedIdentity}&cid=19`

    //     // const response = await fetch(url);
    //     // if(!response.ok){
    //     //   throw new Error('Network response was not ok' + response.statusText)
    //     // }

    //     // const htmlContent = await response.text();
        
    //     // payslipBottomDiv.innerHTML = htmlContent;



    //      // Create an iframe element
    //       const iframe = document.createElement('iframe');
    //       const windowHeight = window.innerHeight;
    //       // Set attributes for the iframe
    //       iframe.src = url;
    //       iframe.width = '100%'; // Set width to 100% of the parent div
    //       iframe.height = `${ windowHeight - (document.getElementById('hrmActivityTop').offsetHeight + 25)}px`; // Set height as needed
    //       // iframe.height = `'600px'`; // Set height as needed
    //       iframe.frameBorder = '0'; // Remove the border (optional)
    //       iframe.allowFullscreen = true; // Allow fullscreen (optional)

    //       const payslipBottomDiv = document.getElementById('payslipBottomDiv');

    //       // Optionally, clear any existing content in the div
    //       payslipBottomDiv.innerHTML = '';

    //       // Append the iframe to the payslipBottomDiv div
    //       payslipBottomDiv.appendChild(iframe);


    //   } catch (error) {
    //     console.error('There has been a problem with your fetch operation')
    //   }
    // }else{
      
    //   payslipBottomDiv.innerHTML = "";
    // }

    document.getElementById('hrmActivityTop').style.height = '50px'

    const divElement = document.getElementById('payslipBottomDiv');


    // Check if the div exists
    if (divElement) {
      // Step 2: Access the iframe within the div
      const iframe = divElement.querySelector('iframe'); // or use divElement.getElementsByTagName('iframe')[0];
      const viewportHeight = window.innerHeight;
      
      const headerHeight = document.getElementById('hrmActivityTop').offsetHeight;
      const payslipTopDivHeight = document.getElementById('payslipTopDiv').offsetHeight;
      const contentHeight = viewportHeight - (headerHeight + payslipTopDivHeight + 25);
      iframe.style.width = '98vw !important'
      iframe.style.margin = 'auto'

      iframe.style.height = (contentHeight) + 'px';
      if (iframe) {
          
          iframe.onload = () => {
              const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

              const iframeBody = iframeDocument.body;
              
              const form = iframeBody.querySelector('form');
              if (form) {
                form.style.width = '100%';
                form.style.margin = '0 auto';
                
                
                const divs = form.querySelectorAll('div');
                if (divs.length >= 4) {
                  const fourthDiv = divs[3]; // Access the fourth <div> (index 3)
                  // console.log('Fourth div found:', fourthDiv);
          
                  // You can manipulate or log the fourth div as needed
                  // console.log('Content of the fourth div:', fourthDiv.innerHTML);
              }
                
              }
          };
      } else {
          console.log('Iframe not found in the div');
      }
    } 
   

  })



}

async function lateApplication(items) {
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";

  const lateApplicationContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const reason_status_container = document.createElement("div");

  // Create buttons and attach event listener
  const buttons = createNavigationButton(items, 'apply',async function (data, key) {
    reason_status_container.innerHTML = "";
    // Create a new div to display the clicked data
    const lateAppData = document.createElement("div");

    const viewportHeight = window.innerHeight;

    if (key === "apply") {
      const useForm = handleForm('','late_app_form');
      const startDate = handleDateAndTime('applyDateFrom');
      const endDate = handleDateAndTime('applyDateTo');

      const late_application_html = `
        <div id="late_date" class="late_date">         
          <div id="date_range" class="date_range">
            <span id="fromDateSpan">
              <label>From</label>
            </span>
            <span id="toDateSpan">
              <label>To</label>
            </span>
          </div>
        </div>
        <div id="late_reason" class="late_reason">
          <p>Late Reason</p>
          <div>
            <span><input type="radio" name="applyReason" value="Family issue" id="familyIssue" /><label for="familyIssue">Family Issue</label></span>
            <span><input type="radio" name="applyReason" value="sickness" id="sickness"/><label for="sickness">Sickness</label></span>
            <span><input type="radio" name="applyReason" value="Official issue" id="officialIssue"/><label for="officialIssue">Official Issue</label></span>
            <span><input type="radio" name="applyReason" value="Weather issue" id="weatherIssue"/><label for="weatherIssue">Weather Issue</label></span>
            <span><input type="radio" name="applyReason" value="Political issue" id="politicalIssue"/><label for="politicalIssue">Political Issue</label></span>
          </div>
        </div>
        <div id="late_note" class="late_note">
          <label>Note </label>
          <input type="text" name="applyNote"/>
        </div>
        <button id="late-submit" type="submit">Submit</button>
      `
      
      lateAppData.setAttribute("id", "applyReason");
      lateAppData.setAttribute("class", "applyReason");

      useForm.innerHTML = late_application_html;

      lateAppData.appendChild(useForm);

      
      const fromDateSpan = lateAppData.querySelector("#fromDateSpan");
      const toDateSpan = lateAppData.querySelector("#toDateSpan");
   
      
      fromDateSpan.appendChild(startDate.elementName);
      toDateSpan.appendChild(endDate.elementName);

      useForm.addEventListener('formSubmitted', (event) => {
        const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=lateapply`
        const formData = event.detail.formData;
        formData.applyReportingBoss = applyReportingBoss;
        formData.emName = emName;
        formData.emCode = identity;
        formData.applyType = "Late";

        if(applyReportingBoss == "" || applyReportingBoss === null){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Reporting boss info empty!',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen'
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return null
        }else if(emName == "" || emName === null){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Employee info empty!',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen'
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
        });
          return null
        } else if(identity == "" || identity === null){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Employee info empty!',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen'
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
        });
          return null
        }

        // Initialize an empty object
        let formObject = {};

        // Iterate through the formData object and add key-value pairs to formObject
        for (let key in formData) {
          if (formData.hasOwnProperty(key)) {
            formObject[key] = formData[key].toString();
          }
        }


         // check if date is valid
        // Convert date strings to the format "yyyy-MM-dd" for parsing
        const fromFormatted = formObject.applyDateFrom.replace(/(\d{2})\/(\w{3})\/(\d{4})/, (match, day, month, year) => {
          return `${year}-${new Date(`${month} 1`).getMonth() + 1}-${day}`;
        });
        const toFormatted = formObject.applyDateTo.replace(/(\d{2})\/(\w{3})\/(\d{4})/, (match, day, month, year) => {
          return `${year}-${new Date(`${month} 1`).getMonth() + 1}-${day}`;
        });

        // Check if applyReason is undefined or null
        if (!formObject.applyReason) {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
              icon: "warning",
              title: 'Apply reason is required!',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCloseButton: true,
              customClass: {
                  popup: 'swal2-alert-custom-smallscreen',
                  confirmButton: 'swal2-confirm-custom',
              },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return; // Stop further execution to prevent the POST request
        }


         // ensure valid date range 
         const fromDate = new Date(fromFormatted);
         const toDate = new Date(toFormatted);
         if (fromDate > toDate) {
           document.getElementById('darkOverlay').style.display = 'block';
           document.body.classList.add('transparent');
           Swal.fire({
             icon: "warning",
             title: 'Invalid! Date range',
             showConfirmButton: true,
             confirmButtonText: 'OK',
             showCloseButton: true,
             customClass: {
                 popup: 'swal2-alert-custom-smallscreen',
                 confirmButton: 'swal2-confirm-custom',
             },
           }).then((result) => {
             // Hide the overlay when alert is closed
             document.getElementById('darkOverlay').style.display = 'none';
             document.body.classList.remove('transparent'); // Remove class to allow scrolling
           });
           return false; // Prevent further execution
         }

        const isValidDate = isFutureOrTodayDate(fromFormatted, toFormatted,'late');
        if (!isValidDate) {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Date must be the within today <span style="color:red">10AM</span> or the future day!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            showCloseButton: true,
            customClass: {
                popup: 'swal2-alert-custom-smallscreen',
                confirmButton: 'swal2-confirm-custom',
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return;
        } 


        // Convert formObject to a JSON string
        var jsonString = JSON.stringify(formObject);

        // Create a new FormData object
        var form = new FormData();

        // Append the JSON string to the FormData object
        form.append("postData", jsonString);
      
       
        fetch(postUrl, {
          method: 'POST',
          body: form
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === true) {
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                    title: data.message,
                    icon: "success",
                    showCloseButton: true,
                    confirmButtonColor: "#3085d6",
                    showConfirmButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then(()=>{
                  const radios = document.querySelectorAll('input[name="applyReason"]');
                  if(radios && radios.length > 0){
                    radios.forEach(radio => {
                      radio.checked = false;
                    });
                    radios[0].checked = true;
                  }
                  document.querySelector('input[name="applyNote"]').value = "";

                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
            } else {
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                    icon: "warning",
                    title: "Not posted",
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                }); 
            }
        })
        .catch(error => {
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                customClass: {
                  popup: 'swal2-alert-custom-smallscreen'
                },
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
        });

      
        // Process form data as needed
        // For example, you can send it to a server or manipulate it further
      });

      
      // Append the data div to the lateApplicationContainer
      reason_status_container.appendChild(lateAppData);


    } else if (key === "view") {

      const startDatePickerInput = handleDateAndTime("viewStartDate")
      const endDatePickerInput = handleDateAndTime('viewEndDate')
      // console.log(startDate.elementName,startDate.value,endDate.elementName,endDate.value)
      let tBody = [''];
      const table = createTable('',['Date/Time','Status','Reason','Note'],tBody,'late_app_attrib',false)

      const late_status_view_Html= `
        <div id="date_time_range">
          <div class="date_time_btn" id="date_time_btn">
            
          </div>
        
          <div id="selected_date" class="selected_date">
          </div>
        </div>

        <div id="late_reason" class="late_reason">
          <span>
            <label>Employee</label>
            <input type="text" id="name" class="name" disabled />
          </span>
        <div id="late_table" class="late_table"></div>
        </div>
      `

      // Get the current date
      // const currentDate = new Date();
      // const currentYear = currentDate.getFullYear();
      // const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
      // const monthName = currentDate.toLocaleString("default", { month: "short", });
      // const currentDay = String(currentDate.getDate()).padStart(2, "0");
      // const formattedCurrentDate = `${currentDay}/${monthName}/${currentYear}`;

      // const startDatePickerInput = document.createElement("input");
      // startDatePickerInput.type = "text";
      // startDatePickerInput.id = "viewStartDate";
      // startDatePickerInput.name = "viewStartDate";
      // startDatePickerInput.value = formattedCurrentDate;
      
      // $(startDatePickerInput).datepicker({ 
      //   dateFormat: "dd/mm/yy",
      //   onSelect: function(selectedDate) {
      //     const dateObject = $.datepicker.parseDate("dd/mm/yy", selectedDate);
      //     const shortMonthName = $.datepicker.formatDate("dd/M/yy", dateObject);
      //     startDatePickerInput.value = shortMonthName;
      // } 
      //  });

      // const endDatePickerInput = document.createElement("input");
      // endDatePickerInput.type = "text";
      // endDatePickerInput.id = "viewEndDate";
      // endDatePickerInput.name = "viewEndDate";
      // endDatePickerInput.value = formattedCurrentDate;
      // $(endDatePickerInput).datepicker({ 
      //   dateFormat: "dd/mm/yy",
      //     onSelect: function(selectedDate) {
      //       const dateObject = $.datepicker.parseDate("dd/mm/yy", selectedDate);
      //       const shortMonthName = $.datepicker.formatDate("dd/M/yy", dateObject);
      //       endDatePickerInput.value = shortMonthName;
      //   } 
      // });

      
      const viewBtn = document.createElement("button");
      viewBtn.setAttribute("id", "viewBtn");
      viewBtn.setAttribute("class", "viewBtn");
      viewBtn.textContent = "OK";

      lateAppData.setAttribute('id',"viewStatus");
      lateAppData.setAttribute('class',"viewStatus");
      lateAppData.innerHTML = late_status_view_Html;

      // Find the target element
      const dateTimeBtnDiv = lateAppData.querySelector("#date_time_btn");

      // Append the startDate.elementName to the target element
      if (dateTimeBtnDiv && startDatePickerInput && startDatePickerInput.elementName) {
        dateTimeBtnDiv.appendChild(startDatePickerInput.elementName);
      }

      // Append the endDate.elementName to the target element
      if (dateTimeBtnDiv && endDatePickerInput && endDatePickerInput.elementName) {
        dateTimeBtnDiv.appendChild(endDatePickerInput.elementName);
      }

      dateTimeBtnDiv.appendChild(viewBtn);

      const selected_date = lateAppData.querySelector("#selected_date");
      const late_table = lateAppData.querySelector("#late_table");


      viewBtn.addEventListener('click',async function(){
        const url = `${rootUrl}/xapi/dash_api.ashx`
        updateLateTable(url,late_table,startDatePickerInput.elementName.value,endDatePickerInput.elementName.value,identity)

      
      });

      startDatePickerInput.elementName.value = getMonthsBackDate("Jan")
      // const url = `${rootUrl}/xapi/dash_api.ashx?cmd=latelist&dt1=${startDatePickerInput.value}&dt2=${endDatePickerInput.value}&emc=${identity}`
      const url = `${rootUrl}/xapi/dash_api.ashx`
      updateLateTable(url,late_table,startDatePickerInput.elementName.value,endDatePickerInput.elementName.value,identity)

      // const late_table = lateAppData.querySelector("#late_table");

      // late_table.appendChild(table)

      selected_date.textContent = `${"Date:  " + startDatePickerInput.elementName.value + " - " + endDatePickerInput.elementName.value}`


      async function updateLateTable(url, tableElement, startDate, endDate, identity) {
        const fullUrl = `${url}?cmd=latelist&dt1=${startDate}&dt2=${endDate}&emc=${identity}`;
        const res = await fetchData(fullUrl);
        const selected_date = document.getElementById('selected_date');
        selected_date.textContent = `Date: ${startDate} - ${endDate}`;
    
        // Update the table data
        const tBody = res.data.map(item => [item.divDate, item.divStatus, item.divReason, item.divNote]);
    
        // Remove the old table
        while (tableElement.firstChild) {
            tableElement.removeChild(tableElement.firstChild);
        }
    
        // Create and append the new table
        const newTable = createTable('', ['Date/Time', 'Status', 'Reason', 'Note'], tBody, 'late_app_attrib', false);
        tableElement.appendChild(newTable);
      }

      // Append the data div to the lateApplicationContainer
      reason_status_container.appendChild(lateAppData);


      const date_time_range = document.getElementById('date_time_range')
      const late_reason = document.getElementById('late_reason')
      // late_reason.style.paddingTop = `${date_time_range.offsetHeight}px`; 

      selected_date.style.cssText = `
        display:flex;flex-direction:row;justify-content:center;align-items:center;
      `
  
    } else if(key === 'approval'){

      const startDatePickerInput = handleDateAndTime("viewStartDate");
      const endDatePickerInput = handleDateAndTime('viewEndDate');

      const selectStatus = `
        <label for="status">Status:</label>
        <i class="material-symbols-outlined" id="status_arrow_icon">
          arrow_drop_down
        </i>
        <select id="select_late_status">
          <option value="Pending" selected>Pending</option>
          <option value="Not Approved">Not Approved</option>
          <option value="Approved">Approved</option>
        </select>
      `
      let selectedValue = "Pending"
      
      const late_application_approve_Html= `
      <div id="date_time_range">
        <div class="date_time_btn" id="date_time_btn">
          
        </div>
      
        <div id="selected_date" class="selected_date">
          <div>
            <label> Date :</label>
            <span id="selected_date_status"></span>
          </div>
        </div>
      </div>

      <div id="late_application_approval" class="late_application_approval">
        
      </div>
      `

      const select_status_div = document.createElement('div');
      select_status_div.setAttribute('id','select_status_div');
      select_status_div.innerHTML = selectStatus;
      

      const viewBtn = document.createElement("button");
      viewBtn.setAttribute("id", "viewBtn");
      viewBtn.setAttribute("class", "viewBtn");
      viewBtn.textContent = "OK";

      lateAppData.setAttribute('id',"viewStatus");
      lateAppData.setAttribute('class',"viewStatus");
      lateAppData.innerHTML = late_application_approve_Html;

      // Find the target element
      const dateTimeBtnDiv = lateAppData.querySelector("#date_time_btn");

      // Append the startDate.elementName to the target element
      if (dateTimeBtnDiv && startDatePickerInput && startDatePickerInput.elementName) {
        dateTimeBtnDiv.appendChild(startDatePickerInput.elementName);
      }

      // Append the endDate.elementName to the target element
      if (dateTimeBtnDiv && endDatePickerInput && endDatePickerInput.elementName) {
        dateTimeBtnDiv.appendChild(endDatePickerInput.elementName);
      }

      dateTimeBtnDiv.appendChild(viewBtn);
      const selected_date_view = lateAppData.querySelector("#selected_date_status");


      startDatePickerInput.elementName.value = getMonthsBackDate(1)

      const selected_date_status_html = `<p>${startDatePickerInput.elementName.value}</p> <p>-</p> <p>${endDatePickerInput.elementName.value}</p>`

      // selected_date_view.textContent = `${startDatePickerInput.elementName.value + "-" + endDatePickerInput.elementName.value}`
      selected_date_view.innerHTML = selected_date_status_html;

      // Append the data div to the lateApplicationContainer
      reason_status_container.appendChild(lateAppData);
      
      selected_date.appendChild(select_status_div);

      viewBtn.addEventListener('click',async ()=>{
        const url = `${rootUrl}/xapi/dash_api.ashx?cmd=latelistRepBoss&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}&emc=${identity}`
        await fetchData(url)
          .then((data)=>{
            if(data && data.status === true){
              late_application_approval.innerHTML = '';
              let found = false;
              // Iterate over the data and create cards
              data.data.forEach((late,index) => {
                if(late.divStatus === selectedValue){
                  
                  found = true;
                  const card = document.createElement('div');
                  card.setAttribute('class','card');
                  card.setAttribute('id',"card");
                  let temp = {};
    
                  let atn = late.atn;
                  let divCode = late.divCode;
                  let em_code = identity;
                  let divBoss = late.divboss;
    
                  temp.Name = late.divName;
                  temp['Applied On'] = late.divDate;
                  
                  temp.Reason = late.divReason;
                  temp.Note = late.divNote;
                  temp.Status = late.divStatus;
                  
    
                  for(let key in temp){
                    const span = document.createElement('span');
                    const bossSpan = document.createElement('span');
                    bossSpan.setAttribute('id','bossSpan');
                    const bossApprove = document.createElement('button');
                    bossApprove.setAttribute('id','approveLate');
                    bossApprove.textContent = 'Approve';
                    const bossNoApprove = document.createElement('button');
                    bossNoApprove.setAttribute('id','notApproveLate')
                    bossNoApprove.textContent = 'Not approve';
    
    
                    if(key === 'Status'){
                      span.setAttribute('id','late_status')
                    }
    
                    bossApprove.onclick = function(){
                     
                        actionFunc(atn,divCode,em_code,'Approved')
                    }
    
                    bossNoApprove.onclick = function(){
                      actionFunc(atn,divCode,em_code,'Not Approved')
    
                    }
    
                    const label = document.createElement('label');
                    const p = document.createElement('p');
                    
                    label.textContent = key;
                    p.textContent = temp[key];
                    span.appendChild(label);
                    span.appendChild(p);
                    
                    // temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""
                    bossSpan.appendChild(bossApprove);
                    bossSpan.appendChild(bossNoApprove);
    
                    card.appendChild(span);
                    (key === 'Status' && temp[key] === 'Pending' ) ? card.appendChild(bossSpan): "";
                    
      
                  }
    
    
                  // Append card to the container
                late_application_approval.appendChild(card);
                
                }
              });
            }else{
              late_application_approval.innerHTML = "";
              if(typeof Swal !== undefined){
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  // title: "Oops...",
                  text: "No data found!",
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              }else{
                alert('No data found!')
              }
            }

            const cardElements =(late_application_approval.querySelectorAll('#card'))
            cardElements.forEach(item =>{
              const targetSpan = item.querySelector('span#late_status');
  
              if (targetSpan) {
                targetSpan.style.cssText = `
                  display:flex;flex-direction:row;gap:0
                `
                const targetSpan_p_tag = targetSpan.querySelector('p');
                if(targetSpan_p_tag.textContent === 'Pending'){
                  targetSpan_p_tag.style.cssText =`
                    background-color:yellow;
                    width:fit-content;               
                    padding:2px 10px;
                    text-align:left;               
                    border-radius:25px;
                  `
                } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                  targetSpan_p_tag.style.cssText = `
                    background-color:red;
                    width:fit-content;               
                    padding:2px 10px;               
                    border-radius:25px;
                    text-align:left;
                    color:white;
                  `
                } else if(targetSpan_p_tag.textContent === 'Approved'){
                  targetSpan_p_tag.style.cssText = `
                    background-color:green;
                    width:fit-content;               
                    padding:2px 10px;               
                    border-radius:25px;
                    text-align:left;
                    color:white;
                  `
                }else if(targetSpan_p_tag.textContent === 'Not Approved'){
                  targetSpan_p_tag.style.cssText = `
                    background-color:gray;
                    width:fit-content;               
                    padding:2px 10px;               
                    border-radius:25px;
                    text-align:left;
                    color:white;
                  `
                }
              }
            });
          })
          .catch((error)=>{
            // console.log(error)
            if(typeof Swal !== undefined){
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "Something went wrong!",
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            }else{
              alert('Something went wrong!')
            }
          })
      })

      const late_application_approval = document.getElementById('late_application_approval')


      select_late_status.addEventListener('change',(event)=>{
        selectedValue = event.target.value;
      });


      
      const url = `${rootUrl}/xapi/dash_api.ashx?cmd=latelistRepBoss&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}&emc=${identity}`
      await fetchData(url)
        .then((data)=>{
          
          if(data && data.status === true){
            late_application_approval.innerHTML = '';
            let found = false;
            // Iterate over the data and create cards
            data.data.forEach((late,index) => {
              if(late.divStatus === 'Pending' || late.divStatus === 'Checked'){
                
                found = true;
                const card = document.createElement('div');
                card.setAttribute('class','card');
                card.setAttribute('id',"card");
                let temp = {};
  
                let atn = late.atn;
                let divCode = late.divCode;
                let em_code = identity;
                let divBoss = late.divboss;
  
                temp.Name = late.divName;
                temp['Applied On'] = late.divDate;
                
                temp.Reason = late.divReason;
                temp.Note = late.divNote;
                temp.Status = late.divStatus;
                
  
                for(let key in temp){
                  const span = document.createElement('span');
                  const bossSpan = document.createElement('span');
                  bossSpan.setAttribute('id','bossSpan');
                  const bossApprove = document.createElement('button');
                  bossApprove.setAttribute('id','approveLate');
                  bossApprove.textContent = 'Approve';
                  const bossNoApprove = document.createElement('button');
                  bossNoApprove.setAttribute('id','notApproveLate')
                  bossNoApprove.textContent = 'Not approve';
  
  
                  if(key === 'Status'){
                    span.setAttribute('id','late_status')
                  }
  
                  bossApprove.onclick = function(){
                   
                      actionFunc(atn,divCode,em_code,'Approved')
                  }
  
                  bossNoApprove.onclick = function(){
                    actionFunc(atn,divCode,em_code,'Not Approved')
  
                  }
  
                  const label = document.createElement('label');
                  const p = document.createElement('p');
                  
                  label.textContent = key;
                  p.textContent = temp[key];
                  span.appendChild(label);
                  span.appendChild(p);
                  
                  // temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""
                  bossSpan.appendChild(bossApprove);
                  bossSpan.appendChild(bossNoApprove);
  
                  card.appendChild(span);
                  (key === 'Status' && temp[key] === 'Pending' ) ? card.appendChild(bossSpan): "";
                  
    
                }
  
  
                // Append card to the container
              late_application_approval.appendChild(card);
              
              }
            });
          }else{
            late_application_approval.innerHTML = "";
            if(typeof Swal !== undefined){
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "No data found!",
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            }else{
              alert('No data found!')
            }
          }
          const cardElements =(late_application_approval.querySelectorAll('#card'))
          cardElements.forEach(item =>{
            const targetSpan = item.querySelector('span#late_status');

            if (targetSpan) {
              targetSpan.style.cssText = `
                display:flex;flex-direction:row;gap:0
              `
              const targetSpan_p_tag = targetSpan.querySelector('p');
              if(targetSpan_p_tag.textContent === 'Pending'){
                targetSpan_p_tag.style.cssText =`
                  background-color:yellow;
                  width:fit-content;               
                  padding:2px 10px;   
                  text-align:left;            
                  border-radius:25px;
                `
              } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                targetSpan_p_tag.style.cssText = `
                  background-color:red;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  text-align:left;
                  color:white;
                `
              } else if(targetSpan_p_tag.textContent === 'Approved'){
                targetSpan_p_tag.style.cssText = `
                  background-color:green;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  text-align:left;
                  color:white;
                `
              }else if(targetSpan_p_tag.textContent === 'Not Approved'){
                targetSpan_p_tag.style.cssText = `
                  background-color:gray;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  text-align:left;
                  color:white;
                `
              }
            }
          });
          
        })
        .catch((error)=>{
          // console.log(error)
          if(typeof Swal !== undefined){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "Something went wrong!",
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          }else{
            alert('Something went wrong!')
          }
        })
        

      async function actionFunc(atn,divCode,em_code,status){
        const url = `${rootUrl}/xapi/dash_api.ashx?cmd=latestatus&atn=${atn}&code=${divCode}&status=${status}`
        await fetchData(url)
            .then((data)=>{
              
              if(data && data.status === true){
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  title: data.message,
                  icon: "success",
                  showCloseButton: true,
                  confirmButtonColor: "#3085d6",
                  showConfirmButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
                }).then(async (result)=>{
                  if(result.isConfirmed){
                    await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=latelistRepBoss&dt1=${startDatePickerInput.elementName.value}&dt2=${endDatePickerInput.elementName.value}&emc=${identity}`)
                      .then((data)=>{
                        const late_application_approval = document.getElementById("late_application_approval")
                        if(data && data.status === true){
                        
                          late_application_approval.innerHTML = "";
                          let found = false;

                            // Iterate over the data and create cards
                          data.data.forEach((late,index) => {
                            if(late.divStatus === 'Pending' || late.divStatus === 'Checked'){
                              
                              found = true;
                              const card = document.createElement('div');
                              card.setAttribute('class','card');
                              card.setAttribute('id',"card");
                              let temp = {};
                
                              let atn = late.atn;
                              let divCode = late.divCode;
                              let em_code = identity;
                              let divBoss = late.divboss;
                
                              temp.Name = late.divName;
                              temp['Applied On'] = late.divDate;
                              
                              temp.Reason = late.divReason;
                              temp.Note = late.divNote;
                              temp.Status = late.divStatus;
                              
                
                              for(let key in temp){
                                const span = document.createElement('span');
                                const bossSpan = document.createElement('span');
                                bossSpan.setAttribute('id','bossSpan');
                                const bossApprove = document.createElement('button');
                                bossApprove.setAttribute('id','approveLate');
                                bossApprove.textContent = 'Approve';
                                const bossNoApprove = document.createElement('button');
                                bossNoApprove.setAttribute('id','notApproveLate')
                                bossNoApprove.textContent = 'Not approve';
                
                
                                if(key === 'Status'){
                                  span.setAttribute('id','late_status')
                                }
                
                                bossApprove.onclick = function(){
                                
                                    actionFunc(atn,divCode,em_code,'Approved')
                                }
                
                                bossNoApprove.onclick = function(){
                                  actionFunc(atn,divCode,em_code,'Not Approved')
                
                                }
                
                                const label = document.createElement('label');
                                const p = document.createElement('p');
                                
                                label.textContent = key;
                                p.textContent = temp[key];
                                span.appendChild(label);
                                span.appendChild(p);
                                
                                // temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""
                                bossSpan.appendChild(bossApprove);
                                bossSpan.appendChild(bossNoApprove);
                
                                card.appendChild(span);
                                (key === 'Status' && temp[key] === 'Pending' ) ? card.appendChild(bossSpan): "";
                                
                  
                              }
                
                
                              // Append card to the container
                            late_application_approval.appendChild(card);
                            
                            }
                          });
    
                        }else if(data && data.status === false){
                          
                          late_application_approval.innerHTML = "";
                          if(typeof Swal !== undefined){
                            document.getElementById('darkOverlay').style.display = 'block';
                            document.body.classList.add('transparent');
                            Swal.fire({
                              icon: "warning",
                              // title: "Oops...",
                              text: "No data found!",
                            }).then((result) => {
                              // Hide the overlay when alert is closed
                              document.getElementById('darkOverlay').style.display = 'none';
                              document.body.classList.remove('transparent'); // Remove class to allow scrolling
                            });
                          }else{
                            alert('No data found!')
                          }
                        }
                      })
                      .catch(error=>{
                        // console.log(error)
                        if(typeof Swal !== undefined){
                          document.getElementById('darkOverlay').style.display = 'block';
                          document.body.classList.add('transparent');
                          Swal.fire({
                            icon: "warning",
                            // title: "Oops...",
                            text: "Something went wrong!",
                          }).then((result) => {
                            // Hide the overlay when alert is closed
                            document.getElementById('darkOverlay').style.display = 'none';
                            document.body.classList.remove('transparent'); // Remove class to allow scrolling
                          });
                        }else{
                          alert('Something went wrong!')
                        }
                      });
                  }

                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                })
              }

              const cardElements =(late_application_approval.querySelectorAll('#card'))
              cardElements.forEach(item =>{
                const targetSpan = item.querySelector('span#late_status');
    
                if (targetSpan) {
                  targetSpan.style.cssText = `
                    display:flex;flex-direction:row;
                  `
                  const targetSpan_p_tag = targetSpan.querySelector('p');
                  if(targetSpan_p_tag.textContent === 'Pending'){
                    targetSpan_p_tag.style.cssText =`
                      background-color:yellow;
                      width:fit-content;               
                      padding:2px 10px;  
                      text-align:left;             
                      border-radius:25px;
                    `
                  } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                    targetSpan_p_tag.style.cssText = `
                      background-color:red;
                      width:fit-content;               
                      padding:2px 10px;               
                      border-radius:25px;
                      text-align:left;
                      color:white;
                    `
                  } else if(targetSpan_p_tag.textContent === 'Approved'){
                    targetSpan_p_tag.style.cssText = `
                      background-color:green;
                      width:fit-content;               
                      padding:2px 10px;               
                      border-radius:25px;
                      text-align:left;
                      color:white;
                    `
                  }else if(targetSpan_p_tag.textContent === 'Not Approved'){
                    targetSpan_p_tag.style.cssText = `
                      background-color:gray;
                      width:fit-content;               
                      padding:2px 10px;               
                      border-radius:25px;
                      text-align:left;
                      color:white;
                    `
                  }
                }
              });


            })
            .catch(error=>{
              // console.log(error)
              if(typeof Swal !== undefined){
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  // title: "Oops...",
                  text: "Something went wrong!",
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              }else{
                alert('Something went wrong!')
              }
            });
      }


      late_application_approval.style.cssText = `
        margin-top: ${ document.getElementById('date_time_range').offsetHeight}px;
        height: ${viewportHeight - (document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('buttonContainer').offsetHeight + document.getElementById('date_time_range').offsetHeight + 20)}px;
      `

      const selected_date_id = document.getElementById('selected_date')
  
      selected_date_id.style.cssText = `display:flex;flex-direction:row-reverse;justify-content:space-between;align-items:center;`

    }

  });
  

  lateApplicationContainer.setAttribute("id", "lateApplicatonContainer");
  lateApplicationContainer.setAttribute("class", "lateApplicatonContainer");
  buttonContainer.setAttribute("id", "buttonContainer");
  buttonContainer.setAttribute("class", "buttonContainer");
  reason_status_container.setAttribute("id", "reason_status_container");
  reason_status_container.setAttribute("class", "reason_status_container");

  buttonContainer.appendChild(buttons);

  lateApplicationContainer.appendChild(buttonContainer);
  lateApplicationContainer.appendChild(reason_status_container);

  container.appendChild(lateApplicationContainer);

}

async function leaveApplication(items){
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";


  
  const leaveApplicationContainer = document.createElement("div");
  leaveApplicationContainer.setAttribute("id","leave_application_container");
  leaveApplicationContainer.setAttribute("class","leave_application_container");
  const leave_apply_view_container = document.createElement("div");

  const buttons = createNavigationButton(items, 'apply',async function (data, key) {
    leave_apply_view_container.innerHTML = "";
    leave_apply_view_container.setAttribute('id','leave_application_details_rootDiv')
    
    if(key === 'apply'){
      const useForm = handleForm('','leave_application_form');
      const allLeave = [{"Alloted":0}, {"Taken":0}, {"Balance":0}];
      const rootDiv = applyButton('leave_application_reasons','Leave Reason',data);
      const leave_execution_container = document.createElement("div");
      leave_execution_container.setAttribute('id','current_leave');
      const dateTimeContainer = document.createElement("div");
      dateTimeContainer.setAttribute("id","date_time_container");
      dateTimeContainer.setAttribute("class","date_time_container");
      const startDatePickerInput = handleDateAndTime('applyDateFrom');
      const endDatePickerInput = handleDateAndTime('applyDateTo');

      const url =`${rootUrl}/xapi/dash_api.ashx?cmd=leavebalance&code=${identity}`
      
      const applyDateHtml = `
      <span id="fromDateSpan"><label>From</label></span>
      <span id="toDateSpan"><label>To</label></span>
    `
    
      allLeave.forEach((item) => {
        // Create a new HTML element for each item
        const span = document.createElement("span");
        const listItem = document.createElement("label");
        const parag = document.createElement("p");
       
        // Set content or attributes for the HTML element
        listItem.textContent = `Leave ${Object.keys(item)}`;
        parag.textContent =  Object.values(item)
        parag.setAttribute('id',`mleave`+`${Object.keys(item)}`)
        // Append the HTML element to the container
        span.appendChild(listItem)
        span.appendChild(parag)
        leave_execution_container.appendChild(span);
      });

      dateTimeContainer.innerHTML = applyDateHtml;
      
      // Append input elements to their respective spans
      dateTimeContainer.querySelector('#fromDateSpan').appendChild(startDatePickerInput.elementName);
      dateTimeContainer.querySelector('#toDateSpan').appendChild(endDatePickerInput.elementName);
      
      
      leave_apply_view_container.appendChild(leave_execution_container);
      
      // leave_apply_view_container.appendChild(dateTimeContainer);
      // leave_apply_view_container.appendChild(rootDiv);

      useForm.appendChild(dateTimeContainer);
     
      useForm.appendChild(rootDiv);

      leave_apply_view_container.appendChild(useForm);

      useForm.addEventListener('formSubmitted', (event) => {
        const postUrl =`${rootUrl}/xapi/dash_api.ashx?cmd=leaveapply`
        const formData = event.detail.formData;
        formData.applyType = "Leave";
        formData.emCode = identity;
        formData.emName = emName;
        formData.applyReportingBoss = applyReportingBoss;
        
        
        if(applyReportingBoss == "" || applyReportingBoss === null){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Reporting boss info empty!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen',
              confirmButton: 'swal2-confirm-custom',
            },
          }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return null
        }else if(emName == "" || emName === null){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Employee info empty!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen',
              confirmButton: 'swal2-confirm-custom',
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return null
        } else if(identity == "" || identity === null){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Employee info empty!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen',
              confirmButton: 'swal2-confirm-custom',
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return null
        }

        // Initialize an empty object
        let formObject = {};

        // Iterate through the formData object and add key-value pairs to formObject
        for (let key in formData) {
          if (formData.hasOwnProperty(key)) {
            formObject[key] = formData[key].toString();
          }
        }


        // check if date is valid
        // Convert date strings to the format "yyyy-MM-dd" for parsing
        const fromFormatted = formObject.applyDateFrom.replace(/(\d{2})\/(\w{3})\/(\d{4})/, (match, day, month, year) => {
          return `${year}-${new Date(`${month} 1`).getMonth() + 1}-${day}`;
        });
        const toFormatted = formObject.applyDateTo.replace(/(\d{2})\/(\w{3})\/(\d{4})/, (match, day, month, year) => {
          return `${year}-${new Date(`${month} 1`).getMonth() + 1}-${day}`;
        });

        // Check if applyReason is undefined or null
        if (!formObject.applyReason) {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
              icon: "warning",
              title: `Failed! apply reason is required!`,
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCloseButton: true,
              customClass: {
                  popup: 'swal2-alert-custom-smallscreen',
                  confirmButton: 'swal2-confirm-custom',
              },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          document.getElementById('swal2-title') ? document.getElementById('swal2-title').style.cssText =`color:red !important;` :""
          return; // Stop further execution to prevent the POST request
        }

        // ensure valid date range 
        const isValidRange =  validateDateRange(fromFormatted,toFormatted)
        if(!isValidRange.isValid){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: `${isValidRange.title}, ${isValidRange.message}.`,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            showCloseButton: true,
            customClass: {
                popup: 'swal2-alert-custom-smallscreen',
                confirmButton: 'swal2-confirm-custom',
            },
          }).then((result) => {
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return;
        }

        // allowed time and date policy
        const isValidDate = isFutureOrTodayDate(fromFormatted, toFormatted,'leave');
        if (!isValidDate) {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Date must be the within today <span style="color:red">10AM</span> or the future day!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            showCloseButton: true,
            customClass: {
                popup: 'swal2-alert-custom-smallscreen',
                confirmButton: 'swal2-confirm-custom',
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return;
        } 

        // Convert formObject to a JSON string
        var jsonString = JSON.stringify(formObject);

        // Create a new FormData object
        var form = new FormData();

        // Append the JSON string to the FormData object
        form.append("postData", jsonString);
        

        // Show loading overlay
        document.getElementById('darkOverlay').style.display = 'block';
        document.body.classList.add('transparent');

        fetch(postUrl, {
          method: 'POST',
          body: form
        })
        .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data=>{
          if (data.status === true) {
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                // title: `${data.message}, It must be approved befor <span style="color: red;">${formData.applyDateFrom}, 10 AM</span>`,
                title: `${data.message}`,
                icon: "success",
                showCloseButton: true,
                confirmButtonColor: "#3085d6",
                showConfirmButton: true,
                customClass: {
                  popup: 'swal2-alert-custom-smallscreen'
                },
            }).then(()=>{
                  const radios = document.querySelectorAll('input[name="applyReason"]');
                  if(radios && radios.length > 0){
                    radios.forEach(radio => {
                      radio.checked = false;
                    });
                    radios[0].checked = true;
                  }
                  document.querySelector('input[name="applyNote"]').value = "";

                  uncheckRadioButtons('applyReason');

                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                  
            });
         
          } else {
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                  icon: "warning",
                  title: "Not posted",
                  showConfirmButton: true,
                  showCloseButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
              }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });  
          }
        })
        .catch(error => {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
              title: 'Error!',
              text: 'An error occurred: ' + error.message,
              icon: 'error',
              confirmButtonText: 'Try Again',
              customClass: {
                popup: 'swal2-alert-custom-smallscreen'
              },
          }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
        });
        
      });


      // leave balance, alloted, taken url fetch
      await fetchData(url)
        .then((data)=>{
          if(data.status === true){
            
            const current_leave = document.getElementById('current_leave');
            const selectors = current_leave.querySelectorAll('span,p');
            selectors.forEach(p => {
              const elementId = p.id;
              if (data.data.hasOwnProperty(elementId)) {
                p.textContent = data.data[elementId]
              }
            });
            
          }
        })
      
    }else if(key === 'view'){
      const dateRange = viewByDate();
      
      leave_apply_view_container.appendChild(dateRange);
      const leaveAppBtn = document.getElementById("leaveAppBtn");

      const startDate = document.getElementById("startDate");
      const endDate = document.getElementById("endDate");


      // onclick button events
      leaveAppBtn.addEventListener('click',async function(){
        
        const selected_date = document.getElementById("selected_date");
        const paragraphs = selected_date.querySelectorAll('p');
        paragraphs.forEach((element,index)=>{
          if(index === 0){
            element.textContent = startDate.value
          }
          if(index === 2){
            element.textContent = endDate.value
          }
        });


        
        await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=Leave&dt1=${startDate.value}&dt2=${endDate.value}&emc=${identity}`)
          .then((data)=>{
           
            const leave_application_status_view = document.getElementById("leave_application_status_view")
            if(data && data.status === true){
              const lastDate = getLatestDivEndDate(data.data)
              leave_application_status_view.innerHTML = "";
              
              // Filter the array based on the divCode
              const filteredData = data.data.filter(leave => leave.divCode === identity && new Date(parseDate(leave.divStartDate)) >= new Date(parseDate(startDate.value)) && new Date(parseDate(leave.divStartDate)) <= new Date(parseDate(lastDate.divEndDate)));
              
              filteredData.forEach((leave,index)=>{
                  const singleDiv = document.createElement("div");
                  singleDiv.setAttribute('id','single_status');
                  let temp = {};

                  let atn = leave.divAtn;
                  let divCode = leave.divCode;
                  let em_code = identity;
                  let divBoss = leave.divBoss;

                  temp.Name = leave.divName;
                  temp['Applied On'] = leave.divLADate;
                  temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
                  temp['Total Days'] = leave.divLDays;
                  temp.Reason = leave.divReason;
                  temp.Note = leave.divNote;
                  temp.Status = leave.divStatus;

                  if(temp.Status === 'Pending'){
                    temp['Notice'] = `Leave must be approved before ${leave.divStartDate}, 10 AM`
                  }

                  for(let key in temp){
                    const span = document.createElement('span');

                    const label = document.createElement('label');
                    const cancelBtn = document.createElement('button');

                    cancelBtn.setAttribute('id','cancelAction');
                    cancelBtn.onclick = function(){
                      actionFunc(atn,divCode,em_code,'Cancel');
                    }
                    cancelBtn.textContent = 'Cancel';

                    const p = document.createElement('p');
                    key === 'Status' && temp[key] === 'Approved' ? (
                      p.style.backgroundColor ='green', 
                      p.style.paddingLeft='8px',
                      p.style.borderRadius='15px',
                      p.style.paddingRight='8px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.width='fit-content',
                      p.style.color='white'
                    ) : key === 'Status' && temp[key] === 'Cancelled' ? (
                      p.style.backgroundColor ='red', 
                      p.style.paddingLeft='8px',
                      p.style.borderRadius='15px',
                      p.style.paddingRight='8px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.width='fit-content',
                      p.style.color='white'
                    ) :key === 'Status' && temp[key] === 'Pending' ? (
                      p.style.backgroundColor ='orange', 
                      p.style.paddingLeft='8px',
                      p.style.borderRadius='15px',
                      p.style.paddingRight='8px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.width='fit-content',
                      p.style.color='white'
                    ) :key === "Status" && temp[key] === 'Not Approved'?(
                      p.style.backgroundColor ='gray', 
                      // p.style.marginLeft='5px',
                      p.style.borderRadius='15px',
                      p.style.marginRight='5px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.textAlign='center',
                  
                      p.style.color='white'
                    ) :"";

                    label.textContent = key;
                    if(key === 'Notice' && temp[key]){
                      p.innerHTML = `Leave must be approved before <span style="color:red;">${leave.divStartDate}, 10 AM</span>`;
                    }else{
                      p.textContent = temp[key];
                    }

                    span.appendChild(label);
                    span.appendChild(p);

                    temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""

                    singleDiv.appendChild(span);
                  }

                  leave_application_status_view.appendChild(singleDiv);
                

              });

              // filteredData.forEach((leave,index)=>{
                
              //   const singleDiv = document.createElement("div");
              //   singleDiv.setAttribute('id','single_status');
              //   let temp = {};

              //   let atn = leave.divAtn;
              //   let divCode = leave.divCode;
              //   let em_code = identity;
              //   let divBoss = leave.divBoss;

              //   temp.Name = leave.divName;
              //   temp['Applied On'] = leave.divLADate;
              //   temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
              //   temp['Total Days'] = leave.divLDays;
              //   temp.Reason = leave.divReason;
              //   temp.Note = leave.divNote;
              //   temp.Status = leave.divStatus;
              //   divBoss === identity ? temp.Boss = leave.divBoss: "";
              //   // divBoss === identity ? temp.Boss = leave.divBoss: temp.Boss = leave.divBoss;
              //   for(let key in temp){
                 
              //     const span = document.createElement('span');
              //     const bossSpan = document.createElement('span');
              //     bossSpan.setAttribute('id','bossSpan');
              //     const bossApprove = document.createElement('button');
              //     bossApprove.setAttribute('id','approveLeave');
              //     bossApprove.textContent = 'Approve';
              //     const bossNoApprove = document.createElement('button');
              //     bossNoApprove.setAttribute('id','notApproveLeave')
              //     bossNoApprove.textContent = 'Not approve';
                  
              //     bossApprove.onclick = function(){
              //         actionFunc(atn,divCode,em_code,'true')
              //     }

              //     bossNoApprove.onclick = function(){
              //       actionFunc(atn,divCode,em_code,'false')

              //     }
              //     const label = document.createElement('label');
              //     const cancelBtn = document.createElement('button');

              //     cancelBtn.setAttribute('id','cancelAction');
              //     cancelBtn.onclick = function(){
              //       actionFunc(atn,divCode,em_code,'Cancel');
              //     }
              //     cancelBtn.textContent = 'Cancel';


              //     const p = document.createElement('p');
              //     key === 'Status' && temp[key] === 'Approved' ? (
              //       p.style.backgroundColor ='green', 
              //       p.style.paddingLeft='8px',
              //       p.style.borderRadius='15px',
              //       p.style.paddingRight='8px',
              //       p.style.paddingTop='2px',
              //       p.style.paddingBottom='2px',
              //       p.style.width='fit-content',
              //       p.style.color='white'
              //     ) : key === 'Status' && temp[key] === 'Cancelled' ? (
              //       p.style.backgroundColor ='red', 
              //       p.style.paddingLeft='8px',
              //       p.style.borderRadius='15px',
              //       p.style.paddingRight='8px',
              //       p.style.paddingTop='2px',
              //       p.style.paddingBottom='2px',
              //       p.style.width='fit-content',
              //       p.style.color='white'
              //     ) :key === 'Status' && temp[key] === 'Pending' ? (
              //       p.style.backgroundColor ='orange', 
              //       p.style.paddingLeft='8px',
              //       p.style.borderRadius='15px',
              //       p.style.paddingRight='8px',
              //       p.style.paddingTop='2px',
              //       p.style.paddingBottom='2px',
              //       p.style.width='fit-content',
              //       p.style.color='white'
              //     ) :key === "Status" && temp[key] === 'Not Approved'?(
              //       p.style.backgroundColor ='gray', 
              //       // p.style.marginLeft='5px',
              //       p.style.borderRadius='15px',
              //       p.style.marginRight='5px',
              //       p.style.paddingTop='2px',
              //       p.style.paddingBottom='2px',
              //       p.style.textAlign='center',
                
              //       p.style.color='white'
              //     ) :"";
              //     label.textContent = key;
              //     p.textContent = temp[key];

              //     key != 'Boss' ? span.appendChild(label) : "";
              //     key != 'Boss' ? span.appendChild(p) : "";
                  
              //     temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""

              //     // key === 'Boss' ? bossSpan.appendChild(bossApprove) : "";
              //     // key === 'Boss' ? bossSpan.appendChild(bossNoApprove): "";

              //     singleDiv.appendChild(span);
              //     // key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
              //   }

              //   leave_application_status_view.appendChild(singleDiv);
                
              // });
            
            }else if(data && data.status === false){
              
              leave_application_status_view.innerHTML = "";
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "No data found!",
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            }
          })
          .catch(error=>{
            // console.log(error)
          });
        
      });

            
      const div = document.createElement("div");
      div.setAttribute('id','leave_application_status_view');

      leave_apply_view_container.appendChild(div);

      startDate.value = getMonthsBackDate('Jan');
      const selected_date = document.getElementById("selected_date");
      const paragraphs = selected_date.querySelectorAll('p');
      paragraphs.forEach((element,index)=>{
        if(index === 0){
          element.textContent = startDate.value
        }
        if(index === 2){
          element.textContent = endDate.value
        }
      });

    
      // on load page events
      await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=Leave&dt1=${startDate.value}&dt2=${endDate.value}&emc=${identity}`)
        .then((data)=>{
         
          const leave_application_status_view = document.getElementById("leave_application_status_view");
         
        
          if(data && data.status === true){
            const lastDate = getLatestDivEndDate(data.data)
            leave_application_status_view.innerHTML = "";

            // Filter the array based on the divCode
            const filteredData = data.data.filter(leave => leave.divCode === identity && new Date(parseDate(leave.divStartDate)) >= new Date(parseDate(startDate.value)) && new Date(parseDate(leave.divStartDate)) <= new Date(parseDate(lastDate.divEndDate)));

            
            filteredData.forEach((leave,index)=>{
                const singleDiv = document.createElement("div");
                singleDiv.setAttribute('id','single_status');
                let temp = {};
                let atn = leave.divAtn;
                let divCode = leave.divCode;
                let em_code = identity;
                let divBoss = leave.divBoss;

                temp.Name = leave.divName;
                temp['Applied On'] = leave.divLADate;
                temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
                temp['Total Days'] = leave.divLDays;
                temp.Reason = leave.divReason;
                temp.Note = leave.divNote;
                temp.Status = leave.divStatus;

                if(temp.Status === 'Pending'){
                  temp['Notice'] = `Leave must be approved before ${leave.divStartDate}, 10 AM`
                }


                for(let key in temp){
                  const span = document.createElement('span');

                  const label = document.createElement('label');
                  const cancelBtn = document.createElement('button');
                  cancelBtn.setAttribute('id','cancelAction');
                  cancelBtn.onclick = function(){
                    actionFunc(atn,divCode,em_code,'Cancel');
                  }
                  cancelBtn.textContent = 'Cancel';
                  const p = document.createElement('p');
                  key === 'Status' && temp[key] === 'Approved' ? (
                    p.style.backgroundColor ='green', 
                    p.style.paddingLeft='8px',
                    p.style.borderRadius='15px',
                    p.style.paddingRight='8px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.width='fit-content',
                    p.style.color='white'
                  ) : key === 'Status' && temp[key] === 'Cancelled' ? (
                    p.style.backgroundColor ='red', 
                    p.style.paddingLeft='8px',
                    p.style.borderRadius='15px',
                    p.style.paddingRight='8px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.width='fit-content',
                    p.style.color='white'
                  ) :key === 'Status' && temp[key] === 'Pending' ? (
                    p.style.backgroundColor ='orange', 
                    p.style.paddingLeft='8px',
                    p.style.borderRadius='15px',
                    p.style.paddingRight='8px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.width='fit-content',
                    p.style.color='white'
                  ) :key === "Status" && temp[key] === 'Not Approved'?(
                    p.style.backgroundColor ='gray', 
                    // p.style.marginLeft='5px',
                    p.style.borderRadius='15px',
                    p.style.marginRight='5px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.textAlign='center',
                
                    p.style.color='white'
                  ) :"";

                  label.textContent = key;
                  if(key === 'Notice' && temp[key]){
                    p.innerHTML = `Leave must be approved before <span style="color:red;">${leave.divStartDate}, 10 AM</span>`;
                  }else{
                    p.textContent = temp[key];
                  }

                  span.appendChild(label);
                  span.appendChild(p);

                  temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""

                  singleDiv.appendChild(span);
                  
                }

                leave_application_status_view.appendChild(singleDiv);

            });

            // data.data.forEach((leave,index)=>{
              
            //   const singleDiv = document.createElement("div");
            //   singleDiv.setAttribute('id','single_status');
            //   let temp = {};

            //   let atn = leave.divAtn;
            //   let divCode = leave.divCode;
            //   let em_code = identity;
            //   let divBoss = leave.divBoss;

            //   temp.Name = leave.divName;
            //   temp['Applied On'] = leave.divLADate;
            //   temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
            //   temp['Total Days'] = leave.divLDays;
            //   temp.Reason = leave.divReason;
            //   temp.Note = leave.divNote;
            //   temp.Status = leave.divStatus;
            //   divBoss === identity ? temp.Boss = leave.divBoss: "";
            //   // divBoss === identity ? temp.Boss = leave.divBoss: temp.Boss = leave.divBoss;
            //   for(let key in temp){
            //     const span = document.createElement('span');
            //     const bossSpan = document.createElement('span');
            //     bossSpan.setAttribute('id','bossSpan');
            //     const bossApprove = document.createElement('button');
            //     bossApprove.setAttribute('id','approveLeave');
            //     bossApprove.textContent = 'Approve';
            //     const bossNoApprove = document.createElement('button');
            //     bossNoApprove.setAttribute('id','notApproveLeave')
            //     bossNoApprove.textContent = 'Not approve';
                
            //     bossApprove.onclick = function(){
            //         actionFunc(atn,divCode,em_code,'true')
            //     }

            //     bossNoApprove.onclick = function(){
            //       actionFunc(atn,divCode,em_code,'false')

            //     }
                
            //     const cancelBtn = document.createElement('button');
            //     cancelBtn.setAttribute('id','cancelAction');
            //     cancelBtn.onclick = function(){
            //       actionFunc(atn,divCode,em_code,'Cancel');
            //     }
            //     cancelBtn.textContent = 'Cancel';

            //     const label = document.createElement('label');
            //     const p = document.createElement('p');
            //     key === 'Status' && temp[key] === 'Approved' ? (
            //       p.style.backgroundColor ='green', 
            //       // p.style.marginLeft='5px',
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',

            //       p.style.textAlign='center',
                 
            //       p.style.color='white'
            //     ) : key === 'Status' && temp[key] === 'Cancelled' ? (
            //       p.style.backgroundColor ='red', 
            //       // p.style.marginLeft='5px',
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
                 
            //       p.style.color='white'
            //     ) :key === 'Status' && temp[key] === 'Pending' ? (
            //       p.style.backgroundColor ='orange', 
            //       // p.style.marginLeft='5px',
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
              
            //       p.style.color='white'
            //     ):key === "Status" && temp[key] === 'Not Approved'?(
            //       p.style.backgroundColor ='gray', 
            //       // p.style.marginLeft='5px',
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
              
            //       p.style.color='white'
            //     ):"";
                
            //     label.textContent = key;
            //     p.textContent = temp[key];
            //     key != 'Boss' ? span.appendChild(label) : "";
            //     key != 'Boss' ? span.appendChild(p) : "";
                
            //     (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
            //     key === 'Boss' ? bossSpan.appendChild(bossApprove) : "";
            //     key === 'Boss' ? bossSpan.appendChild(bossNoApprove): "";

            //     singleDiv.appendChild(span);
            //     // key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
            //   }

            //   leave_application_status_view.appendChild(singleDiv);
              
            // });
            
          
          }else if(data && data.status === false){
            
            leave_application_status_view.innerHTML = "";

            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          }

        })
        .catch(error=>{
          // console.log(error)
        });


      // after actions happend
      async function actionFunc(atn,divCode,em_code,status){
          const url = `${rootWwwUrl}/xapi/dash_api.ashx?cmd=leavestatus&atn=${atn}&code=${divCode}&em_code=${em_code}&status=${status}`
          await fetchData(url)
              .then((data)=>{
                if(data && data.status === true){
                  document.getElementById('darkOverlay').style.display = 'block';
                  document.body.classList.add('transparent');
                  Swal.fire({
                    title: data.message,
                    icon: "success",
                    showCloseButton: true,
                    confirmButtonColor: "#3085d6",
                    showConfirmButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                  }).then(async (result)=>{
                    if(result.isConfirmed){
                      await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=Leave&dt1=${startDate.value}&dt2=${endDate.value}&emc=${identity}`)
                      .then((data)=>{
                        const leave_application_status_view = document.getElementById("leave_application_status_view")
                        if(data && data.status === true){
                        
                          leave_application_status_view.innerHTML = "";

                          // Filter the array based on the divCode
                          const filteredData = data.data.filter(leave => leave.divCode === identity && new Date(parseDate(leave.divStartDate)) >= new Date(parseDate(startDate.value)) && new Date(parseDate(leave.divStartDate)) <= new Date(parseDate(endDate.value)));

                          filteredData.forEach((leave,index)=>{
                              const singleDiv = document.createElement("div");
                              singleDiv.setAttribute('id','single_status');
                              let temp = {};

                              let atn = leave.divAtn;
                              let divCode = leave.divCode;
                              let em_code = identity;
                              let divBoss = leave.divBoss;

                              temp.Name = leave.divName;
                              temp['Applied On'] = leave.divLADate;
                              temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
                              temp['Total Days'] = leave.divLDays;
                              temp.Reason = leave.divReason;
                              temp.Note = leave.divNote;
                              temp.Status = leave.divStatus;

                              if(temp.Status === 'Pending'){
                                temp['Notice'] = `Leave must be approved before ${leave.divStartDate}, 10 AM`
                              }

                              for(let key in temp){
                                const span = document.createElement('span');

                                const label = document.createElement('label');
                                const cancelBtn = document.createElement('button');
                                cancelBtn.textContent = 'Cancel';
                                const p = document.createElement('p');

                                key === 'Status' && temp[key] === 'Approved' ? (
                                  p.style.backgroundColor ='green', 
                                  p.style.paddingLeft='8px',
                                  p.style.borderRadius='15px',
                                  p.style.paddingRight='8px',
                                  p.style.paddingTop='2px',
                                  p.style.paddingBottom='2px',
                                  p.style.width='fit-content',
                                  p.style.color='white'
                                ) : key === 'Status' && temp[key] === 'Cancelled' ? (
                                  p.style.backgroundColor ='red', 
                                  p.style.paddingLeft='8px',
                                  p.style.borderRadius='15px',
                                  p.style.paddingRight='8px',
                                  p.style.paddingTop='2px',
                                  p.style.paddingBottom='2px',
                                  p.style.width='fit-content',
                                  p.style.color='white'
                                ) :key === 'Status' && temp[key] === 'Pending' ? (
                                  p.style.backgroundColor ='orange', 
                                  p.style.paddingLeft='8px',
                                  p.style.borderRadius='15px',
                                  p.style.paddingRight='8px',
                                  p.style.paddingTop='2px',
                                  p.style.paddingBottom='2px',
                                  p.style.width='fit-content',
                                  p.style.color='white'
                                ) :key === "Status" && temp[key] === 'Not Approved'?(
                                  p.style.backgroundColor ='gray', 
                                  // p.style.marginLeft='5px',
                                  p.style.borderRadius='15px',
                                  p.style.marginRight='5px',
                                  p.style.paddingTop='2px',
                                  p.style.paddingBottom='2px',
                                  p.style.textAlign='center',
                              
                                  p.style.color='white'
                                ) :"";

                                label.textContent = key;
                                if(key === 'Notice' && temp[key]){
                                  p.innerHTML = `Leave must be approved before <span style="color:red;">${leave.divStartDate}, 10 AM</span>`;
                                }else{
                                  p.textContent = temp[key];
                                }


                                span.appendChild(label);
                                span.appendChild(p);

                                temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""

                                singleDiv.appendChild(span);
                              }

                              leave_application_status_view.appendChild(singleDiv);
                              

                          });

                          // data.data.forEach((leave,index)=>{
                          //   console.log(leave)
                          //   const singleDiv = document.createElement("div");
                          //   singleDiv.setAttribute('id','single_status');
                          //   let temp = {};

                          //   let atn = leave.divAtn;
                          //   let divCode = leave.divCode;
                          //   let em_code = identity;
                          //   let divBoss = leave.divBoss;

                          //   temp.Name = leave.divName;
                          //   temp['Applied On'] = leave.divLADate;
                          //   temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
                          //   temp['Total Days'] = leave.divLDays;
                          //   temp.Reason = leave.divReason;
                          //   temp.Note = leave.divNote;
                          //   temp.Status = leave.divStatus;
                          //   divBoss === identity ? temp.Boss = leave.divBoss: "";
                          //   // divBoss === identity ? temp.Boss = leave.divBoss: temp.Boss = leave.divBoss;
                          //   for(let key in temp){
                          //     const span = document.createElement('span');
                          //     const bossSpan = document.createElement('span');
                          //     bossSpan.setAttribute('id','bossSpan');
                          //     const bossApprove = document.createElement('button');
                          //     bossApprove.setAttribute('id','approveLeave');
                          //     bossApprove.textContent = 'Approve';
                          //     const bossNoApprove = document.createElement('button');
                          //     bossNoApprove.setAttribute('id','notApproveLeave')
                          //     bossNoApprove.textContent = 'Not approve';
                              
                          //     bossApprove.onclick = function(){
                          //         actionFunc(atn,divCode,em_code,'true')
                          //     }

                          //     bossNoApprove.onclick = function(){
                          //       actionFunc(atn,divCode,em_code,'false')

                          //     }
                          //     const label = document.createElement('label');
                          //     const cancelBtn = document.createElement('button');

                          //     cancelBtn.setAttribute('id','cancelAction');
                          //     cancelBtn.onclick = function(){
                          //       actionFunc(atn,divCode,em_code,'Cancel');
                          //     }
                          //     cancelBtn.textContent = 'Cancel';


                          //     const p = document.createElement('p');
                          //     key === 'Status' && temp[key] === 'Approved' ? (
                          //       p.style.backgroundColor ='green', 
                          //       p.style.paddingLeft='8px',
                          //       p.style.borderRadius='15px',
                          //       p.style.paddingRight='8px',
                          //       p.style.paddingTop='2px',
                          //       p.style.paddingBottom='2px',
                          //       p.style.width='fit-content',
                          //       p.style.color='white'
                          //     ) : key === 'Status' && temp[key] === 'Cancelled' ? (
                          //       p.style.backgroundColor ='red', 
                          //       p.style.paddingLeft='8px',
                          //       p.style.borderRadius='15px',
                          //       p.style.paddingRight='8px',
                          //       p.style.paddingTop='2px',
                          //       p.style.paddingBottom='2px',
                          //       p.style.width='fit-content',
                          //       p.style.color='white'
                          //     ) :key === 'Status' && temp[key] === 'Pending' ? (
                          //       p.style.backgroundColor ='orange', 
                          //       p.style.paddingLeft='8px',
                          //       p.style.borderRadius='15px',
                          //       p.style.paddingRight='8px',
                          //       p.style.paddingTop='2px',
                          //       p.style.paddingBottom='2px',
                          //       p.style.width='fit-content',
                          //       p.style.color='white'
                          //     ):key === "Status" && temp[key] === 'Not Approved'?(
                          //       p.style.backgroundColor ='gray', 
                          //       // p.style.marginLeft='5px',
                          //       p.style.borderRadius='15px',
                          //       p.style.marginRight='5px',
                          //       p.style.paddingTop='2px',
                          //       p.style.paddingBottom='2px',
                          //       p.style.textAlign='center',
                            
                          //       p.style.color='white'
                          //     ):"";
                          //     label.textContent = key;
                          //     p.textContent = temp[key];
                          //     key != 'Boss' ? span.appendChild(label) : "";
                          //     key != 'Boss' ? span.appendChild(p) : "";
                              
                          //     temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""
                          //     key === 'Boss' ? bossSpan.appendChild(bossApprove) : "";
                          //     key === 'Boss' ? bossSpan.appendChild(bossNoApprove): "";

                          //     singleDiv.appendChild(span);
                          //     key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
                          //   }

                          //   leave_application_status_view.appendChild(singleDiv);
                            
                          // });
                        
                        }else if(data && data.status === false){
                          
                          leave_application_status_view.innerHTML = "";
                        }

                        
                      })
                      .catch(error=>{
                        // console.log(error)
                      });
                    }

                    document.getElementById('darkOverlay').style.display = 'none';
                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                  })
                }
              })
              .catch(error=>{
                // console.log(error)
              });
        }

      

    }else if(key ==='approval'){
  
      const dateRange = viewByDate();
      
      const selectStatus = `
        <label for="status">Status:</label>
        <i class="material-symbols-outlined" id="status_arrow_icon">
          arrow_drop_down
        </i>
        <select id="select_leave_status">
          <option value="Pending" selected>Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
        </select>
      `
      let selectedValue = "Pending"
      const select_status_div = document.createElement('div');
      select_status_div.setAttribute('id','select_status_div')
      select_status_div.innerHTML = selectStatus
      leave_apply_view_container.appendChild(dateRange);
      const leaveAppBtn = document.getElementById("leaveAppBtn");

      const startDate = document.getElementById("startDate");
      const endDate = document.getElementById("endDate");


      startDate.value = getMonthsBackDate(1);
      endDate.value = getMonthsBackDate(1,'forward');


      leaveAppBtn.addEventListener('click',async function(){
        const selected_date = document.getElementById("selected_date");
        const paragraphs = selected_date.querySelectorAll('p');
        paragraphs.forEach((element,index)=>{
          if(index === 0){
            element.textContent = startDate.value
          }
          if(index === 2){
            element.textContent = endDate.value
          }
        });

        await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=Leave&dt1=${startDate.value}&dt2=${endDate.value}&emc=${identity}`)
          .then((data)=>{
            
            const leave_application_status_view = document.getElementById("leave_application_status_view")
            if(data && data.status === true){

              leave_application_status_view.innerHTML = "";
              let found = false;
              data.data.forEach((leave,index)=>{
                if(leave.divBoss === identity && (leave.divStatus === selectedValue || leave.divStatus === 'Checked') && new Date(parseDate(leave.divStartDate)) >= new Date(parseDate(startDate.value)) && new Date(parseDate(leave.divStartDate)) <= new Date(parseDate(endDate.value))){
                  found = true;
                  const singleDiv = document.createElement("div");
                  singleDiv.setAttribute('id','single_status');
                  let temp = {};

                  let atn = leave.divAtn;
                  let divCode = leave.divCode;
                  let em_code = identity;
                  let divBoss = leave.divBoss;

                  temp.Name = leave.divName;
                  temp['Applied On'] = leave.divLADate;
                  temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
                  temp['Total Days'] = leave.divLDays;
                  temp.Reason = leave.divReason;
                  temp.Note = leave.divNote;
                  temp.Status = leave.divStatus;
                  divBoss === identity ? temp.Boss = leave.divBoss: "";
                  // divBoss === identity ? temp.Boss = leave.divBoss: temp.Boss = leave.divBoss;
                  for(let key in temp){
                   
                    const span = document.createElement('span');
                    const bossSpan = document.createElement('span');
                    bossSpan.setAttribute('id','bossSpan');
                    const bossApprove = document.createElement('button');
                    bossApprove.setAttribute('id','approveLeave');
                    bossApprove.textContent = 'Approve';
                    const bossNoApprove = document.createElement('button');
                    bossNoApprove.setAttribute('id','notApproveLeave')
                    bossNoApprove.textContent = 'Not approve';
                    
                    if(key === 'Status'){
                      span.setAttribute('id','leave_status')
                    }
                    bossApprove.onclick = function(){
                        actionFunc(atn,divCode,em_code,'true')
                    }

                    bossNoApprove.onclick = function(){
                      actionFunc(atn,divCode,em_code,'false')

                    }
            
                    const label = document.createElement('label');
                    const p = document.createElement('p');
                    
                    label.textContent = key;
                    p.textContent = temp[key];
                    span.appendChild(label);
                    span.appendChild(p);
                    
                    // temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""
                    
                      bossSpan.appendChild(bossApprove);
                      bossSpan.appendChild(bossNoApprove);

                    singleDiv.appendChild(span);
                    key === 'Boss' && selectedValue === 'Pending' ? singleDiv.appendChild(bossSpan) : "";
                  }

                  leave_application_status_view.appendChild(singleDiv);
                }
                
              });
              
              if (!found) {
                if(typeof Swal !== undefined){
                  document.getElementById('darkOverlay').style.display = 'block';
                  document.body.classList.add('transparent');
                  Swal.fire({
                    icon: "warning",
                    // title: "Oops...",
                    text: "No leave data found!",
                  }).then((result) => {
                    // Hide the overlay when alert is closed
                    document.getElementById('darkOverlay').style.display = 'none';
                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                  });
                } else {
                  alert('not found')
                }
                
              }
            }else if(data && data.status === false){
              
              leave_application_status_view.innerHTML = "";
              if(typeof Swal !== undefined){
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  // title: "Oops...",
                  text: "No data found!",
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              }else{
                alert('No data found!')
              }
             
            }

            const singleStatusElements =(leave_application_status_view.querySelectorAll('#single_status'))
            singleStatusElements.forEach(singleStatus =>{
              const targetSpan = singleStatus.querySelector('span#leave_status');
              if (targetSpan) {
                targetSpan.style.cssText = `
                  display:flex;flex-direction:row;gap:0
                `
                const targetSpan_p_tag = targetSpan.querySelector('p');
                if(targetSpan_p_tag.textContent === 'Pending'){
                  targetSpan_p_tag.style.cssText =`
                    background-color:yellow;
                    width:fit-content;               
                    padding:2px 10px;               
                    border-radius:25px;
                  `
                } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                  targetSpan_p_tag.style.cssText = `
                    background-color:red;
                    width:fit-content;               
                    padding:2px 10px;               
                    border-radius:25px;
                    color:white;
                  `
                } else if(targetSpan_p_tag.textContent === 'Approved'){
                  targetSpan_p_tag.style.cssText = `
                    background-color:green;
                    width:fit-content;               
                    padding:2px 10px;               
                    border-radius:25px;
                    color:white;
                  `
                }else if(targetSpan_p_tag.textContent === 'Not Approved'){
                  targetSpan_p_tag.style.cssText = `
                  background-color:gray;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
                }
              }
            })

          })
          .catch(error=>{
            // console.log(error)
          });
        
      });

      const div = document.createElement("div");
      div.setAttribute('id','leave_application_status_view')

      leave_apply_view_container.appendChild(div);

      
      const selected_date = document.getElementById("selected_date");
      const paragraphs = selected_date.querySelectorAll('p');
      paragraphs.forEach((element,index)=>{
        if(index === 0){
          element.textContent = startDate.value
        }
        if(index === 2){
          element.textContent = endDate.value
        }
      });

      document.getElementById('selected_date').appendChild(select_status_div)
   
      if(selected_date){
        selected_date.style.cssText = `
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
          align-items: center;
        `
      }

      div.style.cssText = `
        padding-top:120px;
      `
      
      select_leave_status.addEventListener('change',(event)=>{
        selectedValue = event.target.value;
      });

      // When the dropdown is focused (clicked), show the 'up' icon
      select_leave_status.addEventListener('focus', () => {
        
      });

      // When the dropdown loses focus (selection made or clicked outside), show the 'down' icon
      select_leave_status.addEventListener('blur', () => {
        
      });

      const url = `${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=Leave&dt1=${startDate.value}&dt2=${endDate.value}&emc=${identity}`
      await fetchData(url)
        .then((data)=>{
        
          const leave_application_status_view = document.getElementById("leave_application_status_view");
         
          const permissibleList = ["BR-0001-08","BR-0002-08","BR-0017-08","BR-0371-17"];

          if(data && data.status === true){
            leave_application_status_view.innerHTML = "";
            let found = false;
            const lastDate = getLatestDivEndDate(data.data)
            data.data.forEach((leave,index)=>{
          
              if(leave.divBoss === identity && 
                (leave.divStatus === 'Pending' || leave.divStatus === 'Checked') && 
                new Date(parseDate(leave.divStartDate)) >= new Date(parseDate(startDate.value)) && 
                new Date(parseDate(leave.divStartDate)) <= new Date(parseDate(endDate.value))){

                found = true;
                const singleDiv = document.createElement("div");
                singleDiv.setAttribute('id','single_status');
                let temp = {};

                
                let atn = leave.divAtn;
                let divCode = leave.divCode;
                let em_code = identity;
                let divBoss = leave.divBoss;


                temp.Name = leave.divName;
                temp['Applied On'] = leave.divLADate;
                temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
                temp['Total Days'] = leave.divLDays;
                temp.Reason = leave.divReason;
                temp.Note = leave.divNote;
                temp.Status = leave.divStatus;
                divBoss === identity ? temp.Boss = leave.divBoss: "";

                // if(temp.Status === 'Pending' && !permissibleList.includes(identity)){
                //   temp['Notice'] = `Leave must be approved before ${leave.divStartDate}, 10 AM`
                // }

                // divBoss === identity ? temp.Boss = leave.divBoss: temp.Boss = leave.divBoss;

                for(let key in temp){
                  // console.log(temp,temp[key],key,leave.divStartDate)
                  const span = document.createElement('span');
                  const bossSpan = document.createElement('span');
                  bossSpan.setAttribute('id','bossSpan');


                  // Today at 10 AM in Bangladesh
                  const todayAt10AM = getBangladeshTime(new Date());
                  todayAt10AM.setHours(10, 0, 0, 0);

                  // Leave start date in Bangladesh timezone
                  
                  const leaveApproveDateTime = getBangladeshTime(new Date())

                  
                  
                  const bossApprove = document.createElement('button');
                  // if(leaveApproveDateTime > todayAt10AM){
                  //   bossApprove.setAttribute('id','ineligibleApproveLeave');
                  // }else{
                  //   bossApprove.setAttribute('id','approveLeave');
                  // }
                  bossApprove.setAttribute('id','approveLeave');
                  bossApprove.textContent = 'Approve';

                  const bossNoApprove = document.createElement('button');
                  bossNoApprove.setAttribute('id','notApproveLeave');
                  bossNoApprove.textContent = 'Not approve';
                  
                  if(key === 'Status'){
                    span.setAttribute('id','leave_status')
                  }

                  bossApprove.onclick = function(){
                    actionFunc(atn,divCode,em_code,'true',leave.divStartDate)
                  }

                  bossNoApprove.onclick = function(){
                    actionFunc(atn,divCode,em_code,'false')
                  }
          
                  const label = document.createElement('label');
                  const p = document.createElement('p');
                  
                  label.textContent = key;
                  // if(key === 'Notice' && temp[key]){
                  //   p.innerHTML = `Leave must be approved before <span style="color:red;">${leave.divStartDate}, 10 AM</span>`;
                  // }else{
                  //   p.textContent = temp[key];
                  // }
                  p.textContent = temp[key];

                  span.appendChild(label);
                  span.appendChild(p);
                  
                  // temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""
                  bossSpan.appendChild(bossApprove);
                  bossSpan.appendChild(bossNoApprove);

                  singleDiv.appendChild(span);
                  key === 'Boss' ? singleDiv.appendChild(bossSpan): "";
                }

                leave_application_status_view.appendChild(singleDiv);

              }              
            });
            if (!found) {
              if(typeof Swal !== undefined){
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  // title: "Oops...",
                  text: "No leave data found!",
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              }else{
                alert('no leave data found')
              }
            }
          }else if(data && data.status === false){
            
            leave_application_status_view.innerHTML = "";
            if(typeof Swal !== undefined){
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "No data found!",
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            }else {
              alert('No data found!')
            }
            
          }
         
          const singleStatusElements =(leave_application_status_view.querySelectorAll('#single_status'))
          singleStatusElements.forEach(singleStatus =>{
            const targetSpan = singleStatus.querySelector('span#leave_status');

            if (targetSpan) {
              targetSpan.style.cssText = `
                display:flex;flex-direction:row;gap:0
              `
              const targetSpan_p_tag = targetSpan.querySelector('p');
              if(targetSpan_p_tag.textContent === 'Pending'){
                targetSpan_p_tag.style.cssText =`
                  background-color:yellow;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                `
              } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                targetSpan_p_tag.style.cssText = `
                  background-color:red;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              } else if(targetSpan_p_tag.textContent === 'Approved'){
                targetSpan_p_tag.style.cssText = `
                  background-color:green;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              }else if(targetSpan_p_tag.textContent === 'Not Approved'){
                targetSpan_p_tag.style.cssText = `
                background-color:gray;
                width:fit-content;               
                padding:2px 10px;               
                border-radius:25px;
                color:white;
              `
              }
            }
          })
          
        })
        .catch(error=>{
          alert('Error:unknown')
        });

      
      async function actionFunc(atn,divCode,em_code,status,startingDate=null){

        // const permissibleList = ["BR-0001-08","BR-0002-08","BR-0017-08","BR-0371-17"];
        // if(status === 'true' && document.getElementById('ineligibleApproveLeave') && !permissibleList.includes(identity)){
        //   document.getElementById('darkOverlay').style.display = 'block';
        //     document.body.classList.add('transparent');
        //     Swal.fire({
        //       icon: "warning",
        //       title: `Failed! approval must happen befor ${startDate}, 10 AM`,
        //       showConfirmButton: true,
        //       confirmButtonText: 'OK',
        //       showCloseButton: true,
        //       customClass: {
        //         popup: 'swal2-alert-custom-smallscreen',
        //         confirmButton: 'swal2-confirm-custom',
        //       },
        //     }).then((result) => {
        //         // Hide the overlay when alert is closed
        //         document.getElementById('darkOverlay').style.display = 'none';
        //         document.body.classList.remove('transparent'); // Remove class to allow scrolling
        //     });
          
        // }else {
        //   const url = `${rootWwwUrl}/xapi/dash_api.ashx?cmd=leavestatus&atn=${atn}&code=${divCode}&em_code=${em_code}&status=${status}`
        //   await fetchData(url)
        //     .then((data)=>{
        //       if(data && data.status === true){

        //             document.getElementById('darkOverlay').style.display = 'block';
        //             document.body.classList.add('transparent');

        //             Swal.fire({
        //               title: data.message,
        //               icon: "success",
        //               showCloseButton: true,
        //               confirmButtonColor: "#3085d6",
        //               showConfirmButton: true,
        //               customClass: {
        //                 popup: 'swal2-alert-custom-smallscreen'
        //               },
        //             }).then(async (result)=>{
                    
        //               if(result.isConfirmed){
        //                 await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=Leave&dt1=${startDate.value}&dt2=${endDate.value}&emc=${identity}`)
        //                 .then((data)=>{
        //                   const leave_application_status_view = document.getElementById("leave_application_status_view")
        //                   if(data && data.status === true){
                          
        //                     leave_application_status_view.innerHTML = "";
        //                     let found = false;
        //                     data.data.forEach((leave,index)=>{
        //                       if(leave.divBoss === identity && (leave.divStatus === 'Pending' || leave.divStatus === 'Checked') && new Date(parseDate(leave.divStartDate)) >= new Date(parseDate(startDate.value)) && new Date(parseDate(leave.divStartDate)) <= new Date(parseDate(endDate.value))){
        //                         found = true;
        //                         const singleDiv = document.createElement("div");
        //                         singleDiv.setAttribute('id','single_status');
        //                         let temp = {};
                
        //                         let atn = leave.divAtn;
        //                         let divCode = leave.divCode;
        //                         let em_code = identity;
        //                         let divBoss = leave.divBoss;
                
        //                         temp.Name = leave.divName;
        //                         temp['Applied On'] = leave.divLADate;
        //                         temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
        //                         temp['Total Days'] = leave.divLDays;
        //                         temp.Reason = leave.divReason;
        //                         temp.Note = leave.divNote;
        //                         temp.Status = leave.divStatus;
        //                         divBoss === identity ? temp.Boss = leave.divBoss: "";
        //                         // divBoss === identity ? temp.Boss = leave.divBoss: temp.Boss = leave.divBoss;
        //                         for(let key in temp){
                                
        //                           const span = document.createElement('span');
        //                           const bossSpan = document.createElement('span');
        //                           bossSpan.setAttribute('id','bossSpan');
        //                           const bossApprove = document.createElement('button');
        //                           bossApprove.setAttribute('id','approveLeave');
        //                           bossApprove.textContent = 'Approve';
        //                           const bossNoApprove = document.createElement('button');
        //                           bossNoApprove.setAttribute('id','notApproveLeave')
        //                           bossNoApprove.textContent = 'Not approve';
                                  
        //                           if(key === 'Status'){
        //                             span.setAttribute('id','leave_status')
        //                           }
        //                           bossApprove.onclick = function(){
        //                               actionFunc(atn,divCode,em_code,'true')
        //                           }
                
        //                           bossNoApprove.onclick = function(){
        //                             actionFunc(atn,divCode,em_code,'false')
                
        //                           }
                          
        //                           const label = document.createElement('label');
        //                           const p = document.createElement('p');
                                  
        //                           label.textContent = key;
        //                           p.textContent = temp[key];
        //                           span.appendChild(label);
        //                           span.appendChild(p);
                                  
        //                           // temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""
        //                           bossSpan.appendChild(bossApprove);
        //                           bossSpan.appendChild(bossNoApprove);
                
        //                           singleDiv.appendChild(span);
        //                           key === 'Boss' ? singleDiv.appendChild(bossSpan): "";
        //                         }
                
        //                         leave_application_status_view.appendChild(singleDiv);
        //                       }              
        //                     });

        //                   }else if(data && data.status === false){
                            
        //                     leave_application_status_view.innerHTML = "";
        //                   }


        //                 })
        //                 .catch(error=>{
        //                   alert('Error:unknown')
        //                 });
        //               }

        //               // Hide the overlay when alert is closed
        //               document.getElementById('darkOverlay').style.display = 'none';
        //               document.body.classList.remove('transparent'); // Remove class to allow scrolling
        //             })
        //       }

        //       const singleStatusElements =(leave_application_status_view.querySelectorAll('#single_status'))
        //       singleStatusElements.forEach(singleStatus =>{
        //         const targetSpan = singleStatus.querySelector('span#leave_status');
    
        //         if (targetSpan) {
        //           targetSpan.style.cssText = `
        //             display:flex;flex-direction:row;gap:0
        //           `
        //           const targetSpan_p_tag = targetSpan.querySelector('p');
        //           if(targetSpan_p_tag.textContent === 'Pending'){
        //             targetSpan_p_tag.style.cssText =`
        //               background-color:yellow;
        //               width:fit-content;               
        //               padding:2px 10px;               
        //               border-radius:25px;
        //             `
        //           } else if(targetSpan_p_tag.textContent === 'Cancelled'){
        //             targetSpan_p_tag.style.cssText = `
        //               background-color:red;
        //               width:fit-content;               
        //               padding:2px 10px;               
        //               border-radius:25px;
        //               color:white;
        //             `
        //           } else if(targetSpan_p_tag.textContent === 'Approved'){
        //             targetSpan_p_tag.style.cssText = `
        //               background-color:green;
        //               width:fit-content;               
        //               padding:2px 10px;               
        //               border-radius:25px;
        //               color:white;
        //             `
        //           }
        //         }
        //       })
        //     })
        //     .catch(error=>{
        //       alert('Error:unknown')
        //     });
        // }
        

        const url = `${rootWwwUrl}/xapi/dash_api.ashx?cmd=leavestatus&atn=${atn}&code=${divCode}&em_code=${em_code}&status=${status}`
        await fetchData(url)
          .then((data)=>{
            if(data && data.status === true){

                  document.getElementById('darkOverlay').style.display = 'block';
                  document.body.classList.add('transparent');

                  Swal.fire({
                    title: data.message,
                    icon: "success",
                    showCloseButton: true,
                    confirmButtonColor: "#3085d6",
                    showConfirmButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                  }).then(async (result)=>{
                  
                    if(result.isConfirmed){
                      await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=Leave&dt1=${startDate.value}&dt2=${endDate.value}&emc=${identity}`)
                      .then((data)=>{
                        const leave_application_status_view = document.getElementById("leave_application_status_view")
                       
                        if(data && data.status === true){
                        
                          leave_application_status_view.innerHTML = "";
                          let found = false;
                          data.data.forEach((leave,index)=>{
                            if(leave.divBoss === identity && (leave.divStatus === 'Pending' || leave.divStatus === 'Checked') && new Date(parseDate(leave.divStartDate)) >= new Date(parseDate(startDate.value)) && new Date(parseDate(leave.divStartDate)) <= new Date(parseDate(endDate.value))){
                              found = true;
                              const singleDiv = document.createElement("div");
                              singleDiv.setAttribute('id','single_status');
                              let temp = {};
              
                              let atn = leave.divAtn;
                              let divCode = leave.divCode;
                              let em_code = identity;
                              let divBoss = leave.divBoss;
              
                              temp.Name = leave.divName;
                              temp['Applied On'] = leave.divLADate;
                              temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
                              temp['Total Days'] = leave.divLDays;
                              temp.Reason = leave.divReason;
                              temp.Note = leave.divNote;
                              temp.Status = leave.divStatus;
                              divBoss === identity ? temp.Boss = leave.divBoss: "";
                              // divBoss === identity ? temp.Boss = leave.divBoss: temp.Boss = leave.divBoss;
                              for(let key in temp){
                              
                                const span = document.createElement('span');
                                const bossSpan = document.createElement('span');
                                bossSpan.setAttribute('id','bossSpan');
                                const bossApprove = document.createElement('button');
                                bossApprove.setAttribute('id','approveLeave');
                                bossApprove.textContent = 'Approve';
                                const bossNoApprove = document.createElement('button');
                                bossNoApprove.setAttribute('id','notApproveLeave')
                                bossNoApprove.textContent = 'Not approve';
                                
                                if(key === 'Status'){
                                  span.setAttribute('id','leave_status')
                                }
                                bossApprove.onclick = function(){
                                    actionFunc(atn,divCode,em_code,'true')
                                }
              
                                bossNoApprove.onclick = function(){
                                  actionFunc(atn,divCode,em_code,'false')
              
                                }
                        
                                const label = document.createElement('label');
                                const p = document.createElement('p');
                                
                                label.textContent = key;
                                p.textContent = temp[key];
                                span.appendChild(label);
                                span.appendChild(p);
                                
                                // temp[key] === 'Pending' && divCode === identity ? span.appendChild(cancelBtn) : ""
                                bossSpan.appendChild(bossApprove);
                                bossSpan.appendChild(bossNoApprove);
              
                                singleDiv.appendChild(span);
                                key === 'Boss' ? singleDiv.appendChild(bossSpan): "";
                              }
              
                              leave_application_status_view.appendChild(singleDiv);
                            }              
                          });

                        }else if(data && data.status === false){
                          
                          leave_application_status_view.innerHTML = "";
                        }

                      })
                      .catch(error=>{
                        alert('Error:unknown')
                      });
                    }

                    // Hide the overlay when alert is closed
                    document.getElementById('darkOverlay').style.display = 'none';
                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                  })
            }

            const singleStatusElements =(leave_application_status_view.querySelectorAll('#single_status'))
            singleStatusElements.forEach(singleStatus =>{
              const targetSpan = singleStatus.querySelector('span#leave_status');
  
              if (targetSpan) {
                targetSpan.style.cssText = `
                  display:flex;flex-direction:row;gap:0
                `
                const targetSpan_p_tag = targetSpan.querySelector('p');
                if(targetSpan_p_tag.textContent === 'Pending'){
                  targetSpan_p_tag.style.cssText =`
                    background-color:yellow;
                    width:fit-content;               
                    padding:2px 10px;               
                    border-radius:25px;
                  `
                } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                  targetSpan_p_tag.style.cssText = `
                    background-color:red;
                    width:fit-content;               
                    padding:2px 10px;               
                    border-radius:25px;
                    color:white;
                  `
                } else if(targetSpan_p_tag.textContent === 'Approved'){
                  targetSpan_p_tag.style.cssText = `
                    background-color:green;
                    width:fit-content;               
                    padding:2px 10px;               
                    border-radius:25px;
                    color:white;
                  `
                }
              }
            })
          })
          .catch(error=>{
            alert('Error:unknown')
          });
      }

     
    }

  });

 
  buttons.setAttribute('id','button_container')
  buttons.setAttribute('class','button_container')
  leaveApplicationContainer.appendChild(buttons)
  leaveApplicationContainer.appendChild(leave_apply_view_container)
  container.appendChild(leaveApplicationContainer)

  
}

function createDropdown(options, id, defaultValue) {
  const dropdown = document.createElement("select"); // Create select element
  dropdown.setAttribute("id", id); // Set id attribute

  // Create and append option elements for each dropdown item
  options.forEach((option) => {
    const optionElement = document.createElement("option"); // Create option element
    optionElement.value = option; // Set value attribute
    optionElement.textContent = option; // Set text content

    // Check if the current option matches the default value
    if (option === defaultValue.toString()) {
      optionElement.selected = true; // Set selected attribute if it matches
    }
    dropdown.appendChild(optionElement); // Append option element to dropdown
  });

  return dropdown; // Return the created dropdown
}

function getDatesOfMonth(year, month) {
  const dates = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Octr",
    "Nov",
    "Dec",
  ];

  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Loop through each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    // Create a Date object for the current day
    const date = new Date(year, month, day);

    // Extract the day, month, and year from the Date object
    const dayOfWeek = weekdayNames[date.getDay()];
    const dayOfMonth = date.getDate();
    // const monthOfYear = date.getMonth() + 1; // Months are zero-based, so add 1
    const monthName = monthNames[date.getMonth()];
    const yearOfDate = date.getFullYear();

    // Add the day, month, and year to the dates array
    dates.push(`${dayOfMonth}/${monthName}/${yearOfDate}/${dayOfWeek}`);
  }

  return dates;
}

function createTable(tableTitle, headerData, bodyData,tableAttrib,sn) {
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

  // Append the table to a parent container in the HTML document
  // document.body.appendChild(table);
  return table;
}

function applyButton(rootClass,title,data){
  const rootDiv = document.createElement("div");
  rootDiv.setAttribute("id", rootClass);
  rootDiv.setAttribute("class", rootClass);

  
  const container = document.createElement("div");
  const reasonDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const paragraph = document.createElement("p");
  const noteDiv = document.createElement("div");

  paragraph.textContent = title;

  data.forEach((option, index) => {
    const span = document.createElement("span");
    const radioButton = document.createElement("input"); // Create radio button element
    radioButton.type = "radio"; // Set type attribute
    radioButton.name = "applyReason"; // Set name attribute (all radio buttons should have the same name to form a group)
    radioButton.value = option; // Set value attribute
    radioButton.id = `option${index + 1}`; // Set id attribute

    const label = document.createElement("label"); // Create label element for the radio button
    label.textContent = option; // Set label text
    label.setAttribute("for", `option${index + 1}`); // Set "for" attribute to match radio button id

    // Append radio button and label to the span
    span.appendChild(radioButton);
    span.appendChild(label);

    reasonDiv.appendChild(span);

    // Check the first radio button by default
    if (title !== 'Leave Reason' && index === 0) {
      radioButton.checked = true;
    }
  });

  
  const noteInput = document.createElement("input");
  noteInput.setAttribute('id','note_input')
  noteInput.setAttribute('class','note_input')
  noteInput.setAttribute('name','applyNote')
  const noteLabel = document.createElement("p");
  noteLabel.textContent = "Note";
  noteDiv.appendChild(noteLabel);
  noteDiv.appendChild(noteInput);
  // reasonLabel.textContent = title;
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute('id','leave_apply_btn')
  submitBtn.textContent = "SUBMIT";



  titleDiv.appendChild(paragraph)
  container.appendChild(titleDiv);
  container.appendChild(reasonDiv)
  rootDiv.appendChild(container)
  rootDiv.appendChild(noteDiv)
  rootDiv.appendChild(submitBtn)

  return rootDiv
}

function viewByDate(){
  const leave_application_details_rootDiv = document.getElementById("leave_application_details_rootDiv")
  leave_application_details_rootDiv.innerHTML = "";

  const root = document.createElement('div');
  root.setAttribute('id',"date_time_range");
  const dateRange = document.createElement('div');
  const selected = document.createElement('div');
  dateRange.setAttribute('id','dateRange')
  selected.setAttribute('id',"selected_date");
  const startDates = handleDateAndTime('startDate');
  const endDates = handleDateAndTime('endDate');
  
  const selected_view =`
    <div>
      <label>Date : </label>
      <span>
        <p>${startDates.elementName.value}</p>
        <p> - </p>
        <p>${endDates.elementName.value}</p>
      </span>
    </div>
  `
  selected.innerHTML = selected_view
  
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute('id','leaveAppBtn')
  submitBtn.textContent = "OK";


  dateRange.appendChild(startDates.elementName);
  dateRange.appendChild(endDates.elementName);
  dateRange.appendChild(submitBtn);

    
  root.appendChild(dateRange);

  root.appendChild(selected);

  return root
}

async function taxFunc(){
  const url = `${rootWwwUrl}/xapi/Sapi.ashx?type=get_tax_data&id=${identity}`
  const container = document.getElementById("hrmActivityMain");

  // Calculate the previous year's July 1
  const today = new Date();
  const previousYear = today.getFullYear() - 1;
  const previousYearJulyFirst = `${previousYear}-07-01`;
  const currentYearJuneLast = `${today.getFullYear()}-06-30`


  const tax_start_date = handleDateAndTime('tax_start_date',previousYearJulyFirst);
  const tax_end_date = handleDateAndTime('tax_end_date',currentYearJuneLast);

  const taxBtn = document.createElement('button');
  taxBtn.setAttribute('id','taxBtn')
  taxBtn.textContent = 'Ok'
  container.innerHTML = "";

  let tBody = [];
  let subTotal = 0;
  let grandTotal = 0;
  container.innerHTML = `
    <div id="taxContainer" class="taxContainer">
      <div id="tax_title">
        <h4>Total Tax Paid: <span id="grandT"> 0</span> </h4>
      </div>
      <div id="tax_date_range" class="tax_date_range">
        <span id="date_range_label">
          <label>From</label>
          <label>To</label>
        </span>
        <span id="date_range_input"></span>
      </div>
      <div id="tax_details">
        <div id="taxTable">
          
        </div>
      </div>
      <div id="tax_footer">
        <span>
          <label>Total</label>
          <p id="grandST">0</p>
        </span>
      </div>

    </div>
  `
  const taxTable = document.getElementById("taxTable");
  const taxContainer = document.getElementById("taxContainer");

  const topHrmHeight = hrmActivityTop.offsetHeight; 
  const viewportHeightPx = window.innerHeight;
  const topChildHeightVh = (topHrmHeight / viewportHeightPx) * 100; // convert height px to vh;

  taxContainer.style.height = `calc(100vh - ${topChildHeightVh}vh)`;
  taxContainer.style.top = `${document.getElementById('hrmActivityTop').offsetHeight}px`
  
  await fetchData(url)
  .then(data=>{
    
    if(data && data.status === false){

    }else if(data && data.status === true){
      data.Data.forEach((element,index)=>{
        const keys = Object.keys(element);
        grandTotal += element.tax_taka;
        if(keys.length >= 2){
          const newElement ={
            [keys[1]]:element[keys[1]],
            [keys[0]]:CurrStrView(element[keys[0]])
          };
          tBody.push(newElement);
        }
        
      });
      const grandT = document.getElementById("grandT");
      grandT.textContent = CurrStrView(grandTotal);
    }
  })
  .catch(error=>{
    // console.log(error)
  });
  

 
  const filteredTax = tBody.filter(element=>{
    const taxDate = new Date(element.tax_date);
    const startDate = new Date(tax_start_date.elementName.value);
    const endDate = new Date(tax_end_date.elementName.value)
    return taxDate >= startDate && taxDate<=endDate
  })
  
  
  filteredTax.forEach(async(element)=>{
    subTotal = 0;
    const temp =await removeQuotes(element.tax_taka)
    const sanitizedTemp = temp.replace(/,/g, '').trim();
    const val = Number(sanitizedTemp);
    if (!isNaN(val)) {
      subTotal += val;
    }
    const webViewValue = CurrStrView(subTotal)
    document.getElementById('grandST').textContent = webViewValue;
  })

  

  const table = createTable('',["SN","Date","Taka"],filteredTax,'tax_table_attrib',true);
  taxTable.append(table);

  const tax_date_range = document.getElementById('tax_date_range');
  const date_range_input = document.getElementById('date_range_input')
  
  date_range_input.appendChild(tax_start_date.elementName);
  date_range_input.appendChild(tax_end_date.elementName);
  date_range_input.appendChild(taxBtn);


  taxBtn.addEventListener('click',function(){
    const taxTable = document.getElementById('taxTable');
    taxTable.innerHTML = '';

    const filteredTax = tBody.filter(element=>{
      const taxDate = new Date(element.tax_date);
      const startDate = new Date(tax_start_date.elementName.value);
      const endDate = new Date(tax_end_date.elementName.value)
      return taxDate >= startDate && taxDate<=endDate
    })

    filteredTax.forEach(async(element)=>{
      subTotal = 0;
      const temp =await removeQuotes(element.tax_taka)
      const sanitizedTemp = temp.replace(/,/g, '').trim();
      const val = Number(sanitizedTemp);
      if (!isNaN(val)) {
        subTotal += val;
      }
      const webViewValue = CurrStrView(subTotal)
      document.getElementById('grandST').textContent = webViewValue;
    })

    const table = createTable('',["SN","Date","Taka"],filteredTax,'tax_table_attrib',true);
    taxTable.append(table);



    const tax_title_height = tax_title.offsetHeight
    tax_date_range.style.top = `${tax_title_height + document.getElementById('hrmActivityTop').offsetHeight + 1}px`;
    tax_table_attrib.style.top = `${tax_title_height + tax_date_range.offsetHeight + document.getElementById('hrmActivityTop').offsetHeight }px`;
    tax_table_attrib.style.height =`${taxContainer.offsetHeight -(tax_title.offsetHeight + tax_date_range.offsetHeight + tax_footer.offsetHeight)}px`;
    const heightVh = vhToPx(100)
    tax_details.style.height = `${heightVh - (document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('tax_title').offsetHeight + document.getElementById('tax_date_range').offsetHeight + document.getElementById('tax_footer').offsetHeight)}px`;
   
    tax_table_attrib.querySelector('tbody').style.height = `${tax_table_attrib.offsetHeight -(tax_table_attrib.querySelector('thead').offsetHeight + 20) }px`;
    tax_table_attrib.querySelector('tbody').style.top = `${tax_table_attrib.querySelector('thead').offsetHeight + 4}px`;
    tax_details.style.top = `${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('tax_title').offsetHeight + document.getElementById('tax_date_range').offsetHeight }px`
    tax_details.style.bottom =`${document.getElementById('tax_footer').offsetHeight}px`
  });
  

  const tax_title_height = tax_title.offsetHeight
  tax_date_range.style.top = `${tax_title_height + document.getElementById('hrmActivityTop').offsetHeight + 1}px`;
  tax_table_attrib.style.top = `${tax_title_height + tax_date_range.offsetHeight + document.getElementById('hrmActivityTop').offsetHeight }px`;
  tax_table_attrib.style.height =`${taxContainer.offsetHeight -(tax_title.offsetHeight + tax_date_range.offsetHeight + tax_footer.offsetHeight)}px`;
  const heightVh = vhToPx(100)
  tax_details.style.height = `${heightVh - (document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('tax_title').offsetHeight + document.getElementById('tax_date_range').offsetHeight + document.getElementById('tax_footer').offsetHeight)}px`;
 
  tax_table_attrib.querySelector('tbody').style.height = `${tax_table_attrib.offsetHeight -(tax_table_attrib.querySelector('thead').offsetHeight + 20) }px`;
  tax_table_attrib.querySelector('tbody').style.top = `${tax_table_attrib.querySelector('thead').offsetHeight + 4}px`;
  tax_details.style.top = `${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('tax_title').offsetHeight + document.getElementById('tax_date_range').offsetHeight }px`
  tax_details.style.bottom =`${document.getElementById('tax_footer').offsetHeight}px`


}

async function leaveStatus(){
  const date_time = handleDateAndTime('leave_status_date');

  const hrmActivityMain = document.getElementById("hrmActivityMain")
  hrmActivityMain.innerHTML = ''

  const leave_status =`
    <div id="date_container">
      <button id="leaveStatusBtn">OK</button>
    </div>
    <div id="lv_status">
    </div>
  `
  const leave_status_container = document.createElement("div");
 
  leave_status_container.setAttribute("id","leave_status")
  leave_status_container.setAttribute("class","leave_status")
  leave_status_container.innerHTML = leave_status;

  hrmActivityMain.appendChild(leave_status_container);

  const date_byId = document.getElementById("date_container");
  date_byId.appendChild(date_time.elementName);


  const leave_status_date = document.getElementById("leave_status_date");

  const leaveStatusBtn = document.getElementById("leaveStatusBtn");

  const lv_status = document.getElementById("lv_status");

  leaveStatusBtn.addEventListener('click',async function(){

    await fetchData(`${rootWwwUrl}/xapi/kapi.ashx?type=get_leave_rng&dt=${leave_status_date.value}`)
    .then((data)=>{
     
      lv_status.innerHTML = "";
    
      data.status === true && Object.keys(data.Data[0]).length > 0 && data.Data.forEach((element,index)=>{
        const root_div = document.createElement("div");
        root_div.setAttribute('id','single_div');

        const connect_div = document.createElement('div');
        connect_div.setAttribute('id','connect_div');

        const left_span = document.createElement("span");
        const right_span = document.createElement("span");

        const img = document.createElement('img');
        img.setAttribute('class','lazy');
        img.setAttribute('data-src',element.em_img);
        img.setAttribute('src','../assets/images/default.png');
        img.setAttribute('width',"100px");
        img.setAttribute('height',"100px");
        
        const com = communicationBtn(element.phn,element.email);
        connect_div.innerHTML = com;
        
        let string = [];
        string.push(element.em_name,element.em_desi,element.em_org,element.em_dep,{'Leave From':`${element.f_dt} - ${element.t_dt}`},{'Total Day' : element.l_days},{"Status" : element.em_status},{'Purpose' :element.l_purpose})


        root_div.appendChild(left_span);
        root_div.appendChild(right_span);
        

        string.forEach((element,index)=>{
          const p = document.createElement('p');
          
          if(typeof element === 'string'){
            p.textContent = element;
            right_span.appendChild(p)
          }else if(typeof element === 'object'){
            
            p.textContent = `${Object.keys(element)} : ${element[Object.keys(element)]}`

            if('Status' in element && element['Status'].toLowerCase() === 'pending'){
              p.style.color = 'white';
              p.style.backgroundColor = 'red';
              p.style.width = 'fit-content'
              p.style.padding = '5px 15px';
              p.style.borderRadius = '50px'
            }else if('status' in element && element['status'].toLowerCase() === 'pending'){
              p.style.color = 'white';
              p.style.backgroundColor = 'red';
              p.style.width = 'fit-content'
              p.style.padding = '5px 15px';
              p.style.borderRadius = '50px'
              
            }
            
            right_span.appendChild(p)
          }
        })

        left_span.appendChild(img);
        left_span.appendChild(connect_div);
        lv_status.appendChild(root_div);
      });
      // After appending all elements, initialize lazy loading
      lazyLoadImages();
    })
    .catch(error=>{
      alert('Unknown error')
    });

  }) 
  
  await fetchData(`${rootWwwUrl}/xapi/kapi.ashx?type=get_leave_rng&dt=${leave_status_date.value}`)
    .then((data)=>{
      
      lv_status.innerHTML = "";
      
      data.status === true && Object.keys(data.Data[0]).length > 0 && data.Data.forEach((element,index)=>{
        const root_div = document.createElement("div");
        root_div.setAttribute('id','single_div');

        const connect_div = document.createElement('div');
        connect_div.setAttribute('id','connect_div');

        const left_span = document.createElement("span");
        const right_span = document.createElement("span");

        const img = document.createElement('img');
        img.setAttribute('class','lazy');
        img.setAttribute('data-src',element.em_img);
        img.setAttribute('src','../assets/images/default.png');
        img.setAttribute('width',"100px");
        img.setAttribute('height',"100px");
        
        const com = communicationBtn(element.phn,element.email);
        connect_div.innerHTML = com;
        
        let string = [];
        string.push(
          element.em_name,
          element.em_desi,
          element.em_org,
          element.em_dep,
          {'Leave From':`${element.f_dt} - ${element.t_dt}`},
          {'Total Day' : element.l_days},
          {"Status" : element.em_status},
          {'Purpose' :element.l_purpose}
        );

        root_div.appendChild(left_span);
        root_div.appendChild(right_span);
        

        string.forEach((element,index)=>{
          const p = document.createElement('p');
          if(typeof element === 'string'){
            
            p.textContent = element;
            right_span.appendChild(p)
          }else if(typeof element === 'object'){
            p.textContent = `${Object.keys(element)} : ${element[Object.keys(element)]}`

            if('Status' in element && element['Status'].toLowerCase() === 'pending'){
              p.style.color = 'white';
              p.style.backgroundColor = '#ff7f7f';
              p.style.width = 'fit-content'
              p.style.padding = '5px 15px';
              p.style.borderRadius = '50px'
            }else if('status' in element && element['status'].toLowerCase() === 'pending'){
              p.style.color = 'white';
              p.style.backgroundColor = '#ff7f7f';
              p.style.width = 'fit-content'
              p.style.padding = '5px 15px';
              p.style.borderRadius = '50px'
              
            }
           
            right_span.appendChild(p)
          }
        });

        left_span.appendChild(img);
        left_span.appendChild(connect_div);
        lv_status.appendChild(root_div);


      });

      // After appending all elements, initialize lazy loading
      lazyLoadImages();
    })
    .catch(error=>{
      alert('Unknown Error')
    });

}

async function workFromHome(items){
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";

  container.innerHTML =`
    <div id="work_from_home_container">
      <div id="button_container"></div>
      <div id="workHome_apply_view_container">
      
      </div>
    </div>
  `
  const buttonContainer = document.getElementById("button_container");
  const buttons = createNavigationButton(items, 'apply',async function (data, key) {
    if(key === 'apply'){
        const workHome_apply_view_container = document.getElementById("workHome_apply_view_container");
        workHome_apply_view_container.innerHTML = "";
        
        const useForm = handleForm('workHomeApply','workHome_apply_class');
  
        const startDatePickerInput = handleDateAndTime('applyDateFrom');
        const endDatePickerInput = handleDateAndTime('applyDateTo');
  
        let radioButtonsHTML = '';
  
        data.forEach((item,index)=>{
          // const checkedAttribute = index === 0 ? 'checked' : '';
          const checkedAttribute = ''
          radioButtonsHTML += `
            <span>
              <input type="radio" id="${index}" name="applyReason" value="${item}" ${checkedAttribute}>
              <label for="${index}">${item}</label>
            </span>
          `;
        });      

        const formContentHTML = `
          <div id="select_workHome_date">
            <span id="workHome_startDate"><label>From</lable></span>
            <span id="workHome_endDate"><label>To</label></span>
          </div>
          <div id="select_workHome_reason">
            <p>Reason</p>
            <div>
              ${radioButtonsHTML}
            </div>
          </div>
          <div id="workHome_note">
            <p>Note</p>
            <input type="text" name="applyNote"/>
          </div>
          <button id="work-from-home-btn" type="submit">Submit</button>
          `;
  
        
        workHome_apply_view_container.appendChild(useForm);
        useForm.innerHTML = formContentHTML;
  
        const workHome_startDate = document.getElementById("workHome_startDate");
        const workHome_endDate = document.getElementById("workHome_endDate");
  
        workHome_startDate.appendChild(startDatePickerInput.elementName);
        workHome_endDate.appendChild(endDatePickerInput.elementName);
  
        

        useForm.addEventListener("formSubmitted",(event)=>{
          const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=leaveapply`
          const formData = event.detail.formData;
          formData.applyType = "WFH";
          formData.emCode = identity;
          formData.emName = emName;
          formData.applyReportingBoss = applyReportingBoss;
        

  
          if(applyReportingBoss == "" || applyReportingBoss === null){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              title: 'Reporting boss info empty!',
              showConfirmButton: false,
              showCloseButton: true,
              customClass: {
                popup: 'swal2-alert-custom-smallscreen'
              },
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            return null
          }else if(emName == "" || emName === null){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              title: 'Employee info empty!',
              showConfirmButton: false,
              showCloseButton: true,
              customClass: {
                popup: 'swal2-alert-custom-smallscreen'
              },
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            return null
          } else if(identity == "" || identity === null){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              title: 'Employee info empty!',
              showConfirmButton: false,
              showCloseButton: true,
              customClass: {
                popup: 'swal2-alert-custom-smallscreen'
              },
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            return null
          }
  
         
          // Initialize an empty object
          let formObject = {};
  
          // Iterate through the formData object and add key-value pairs to formObject
          for (let key in formData) {
             if (formData.hasOwnProperty(key)) {
               formObject[key] = formData[key].toString();
             }
          }
   

          // check if date is valid
          // Convert date strings to the format "yyyy-MM-dd" for parsing
          const fromFormatted = formObject.applyDateFrom.replace(/(\d{2})\/(\w{3})\/(\d{4})/, (match, day, month, year) => {
            return `${year}-${new Date(`${month} 1`).getMonth() + 1}-${day}`;
          });
          const toFormatted = formObject.applyDateTo.replace(/(\d{2})\/(\w{3})\/(\d{4})/, (match, day, month, year) => {
            return `${year}-${new Date(`${month} 1`).getMonth() + 1}-${day}`;
          });


          // Check if applyReason is undefined or null
          if (!formObject.applyReason) {
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                icon: "warning",
                title: 'Apply reason is required!',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                showCloseButton: true,
                customClass: {
                    popup: 'swal2-alert-custom-smallscreen',
                    confirmButton: 'swal2-confirm-custom',
                },
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            return; // Stop further execution to prevent the POST request
          }

          if(formObject.applyNote){
            const unwantedSymbolsAtEdges = /^[#$\-:.,;!?]+|[#$\-:.,;!?]+$/;

            // Check if any unwanted symbol exists at the start or end of applyNote
            if (unwantedSymbolsAtEdges.test(formObject.applyNote)) {
              Swal.fire({
                  icon: "warning",
                  title: 'Invalid symbols found like, $, -, # etc',
                  showConfirmButton: true,
                  confirmButtonText: 'OK',
                  showCloseButton: true,
                  customClass: {
                      popup: 'swal2-alert-custom-smallscreen',
                      confirmButton: 'swal2-confirm-custom',
                  },
              }).then(() => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Allow scrolling
              });
              return; // Stop further execution
            }
            
          }


           // ensure valid date range 
           const fromDate = new Date(fromFormatted);
           const toDate = new Date(toFormatted);
           if (fromDate > toDate) {
             document.getElementById('darkOverlay').style.display = 'block';
             document.body.classList.add('transparent');
             Swal.fire({
               icon: "warning",
               title: 'Invalid! Date range',
               showConfirmButton: true,
               confirmButtonText: 'OK',
               showCloseButton: true,
               customClass: {
                   popup: 'swal2-alert-custom-smallscreen',
                   confirmButton: 'swal2-confirm-custom',
               },
             }).then((result) => {
               // Hide the overlay when alert is closed
               document.getElementById('darkOverlay').style.display = 'none';
               document.body.classList.remove('transparent'); // Remove class to allow scrolling
             });
             return false; // Prevent further execution
           }
 
           const isValidDate = isFutureOrTodayDate(fromFormatted, toFormatted,'work_from_home');
           if (!isValidDate) {
             document.getElementById('darkOverlay').style.display = 'block';
             document.body.classList.add('transparent');
             Swal.fire({
               icon: "warning",
               title: 'Date must be the within today <span style="color:red">10AM</span> or the future day!',
               showConfirmButton: true,
               confirmButtonText: 'OK',
               showCloseButton: true,
               customClass: {
                   popup: 'swal2-alert-custom-smallscreen',
                   confirmButton: 'swal2-confirm-custom',
               },
             }).then((result) => {
               // Hide the overlay when alert is closed
               document.getElementById('darkOverlay').style.display = 'none';
               document.body.classList.remove('transparent'); // Remove class to allow scrolling
             });
             return;
           }

           // Convert formObject to a JSON string
           var jsonString = JSON.stringify(formObject);
   
           // Create a new FormData object
           var form = new FormData();
          //  console.log(formData,formObject,jsonString)
           // Append the JSON string to the FormData object
           form.append("postData", jsonString);
  
  
          fetch(postUrl, {
            method: 'POST',
            body: form
          })
          .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data=>{
            if (data.status === true) {
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                  title: data.message,
                  icon: "success",
                  showCloseButton: true,
                  confirmButtonColor: "#3085d6",
                  showConfirmButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
              }).then(()=>{
                const radios = document.querySelectorAll('input[name="applyReason"]');
                if(radios && radios.length > 0){
                  radios.forEach(radio => {
                    radio.checked = false;
                  });
                  radios[0].checked = true;
                }
                document.querySelector('input[name="applyNote"]').value = "";


                uncheckRadioButtons('applyReason')
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling

              });
            } else {
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                    icon: "warning",
                    title: "Not posted",
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });  
            }
          })
          .catch(error => {
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                customClass: {
                  popup: 'swal2-alert-custom-smallscreen'
                },
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            }); 
          });
  
        })
      
     
    }else if(key === 'view'){
      const workHome_apply_view_container = document.getElementById("workHome_apply_view_container");
      workHome_apply_view_container.innerHTML = "";

      const startDatePickerInput = handleDateAndTime('startDatePickerInput');
      const endDatePickerInput = handleDateAndTime('endDatePickerInput');

      const dateRange = `
        <div id="dateContainer">
          <div id="date_range">
            <span id="workHome_startDate"></span>
            <span id="workHome_endDate"></span>
            <span id="smbt"><button id="work-from-home-view-btn">OK</button></span>
          </div>
          <div id="selected_date">
            <label>Date :</label>
            <span>
              <p>${startDatePickerInput.elementName.value}</p>
              <p> - </p>
              <p>${endDatePickerInput.elementName.value}</p>
            </span>
          </div>
        </div>
      `;

      workHome_apply_view_container.innerHTML = dateRange;
  
      const workHome_startDate = document.getElementById("workHome_startDate");
      const workHome_endDate = document.getElementById("workHome_endDate"); 
      
      workHome_startDate.appendChild(startDatePickerInput.elementName);
      workHome_endDate.appendChild(endDatePickerInput.elementName);

      const startDate_Input = document.getElementById("startDatePickerInput");
      const endDate_Input = document.getElementById("endDatePickerInput");


      smbt.addEventListener('click',async function(){
        const selected_date = document.getElementById("selected_date");
        const paragraphs = selected_date.querySelectorAll('p');
        
        paragraphs.forEach((element,index)=>{
          if(index === 0){
            element.textContent = startDate_Input.value
          }
          if(index === 2){
            element.textContent = endDate_Input.value
          }
        });


       await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFH&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
        .then(data=>{
          console.log(data)
          workHome_apply_view_container.appendChild(div);
          const work_home_status_view = document.getElementById('work_home_status_view');
          if(data && data.status === true){
            
            work_home_status_view.innerHTML = "";

            // Filter the array based on the divCode
            const filteredData = data.data.filter(workHome => workHome.divCode === identity && new Date(parseDate(workHome.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(workHome.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
            filteredData.forEach((workHome,index)=>{
              const singleDiv = document.createElement("div");
              singleDiv.setAttribute('id','single_status')
              let temp = {};

              let atn = workHome.divAtn;
              let divCode = workHome.divCode;
              let em_code = identity;
              let divBoss = workHome.divBoss;


              temp.Name = workHome.divName;
              temp['Applied On'] = workHome.divLADate;
              temp.From = `${workHome.divStartDate} - ${workHome.divEndDate}`;
              temp['Total Days'] = workHome.divLDays;
              temp.Reason = workHome.divReason;
              temp.Note = workHome.divNote;
              temp.Status = workHome.divStatus;


              for(let key in temp){
                const span = document.createElement('span');
                const label = document.createElement('label');
                const cancelBtn = document.createElement('button');
                cancelBtn.setAttribute('id','cancelAction');
                cancelBtn.onclick = function(){
                  actionFunc(atn,divCode,em_code,'Cancel');
                }
                cancelBtn.textContent = 'Cancel';

                const p = document.createElement('p');

                key === "Status" && temp[key] === 'Cancelled'?(
                  p.style.backgroundColor ='red', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Not Approved'?(
                  p.style.backgroundColor ='gray', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17x',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Checked'?(
                  p.style.backgroundColor ='green', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Approved'?(
                  p.style.backgroundColor ='green', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):"";

                label.textContent = key;
                p.textContent = temp[key];

                span.appendChild(label);
                span.appendChild(p);

                (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : "";

                singleDiv.appendChild(span);
              }

              work_home_status_view.appendChild(singleDiv);
            })

            // filteredData.forEach((element,index)=>{
             
            //   const singleDiv = document.createElement("div");
            //   singleDiv.setAttribute('id','single_status')
            //   let temp = {};

            //   let atn = element.divAtn;
            //   let divCode = element.divCode;
            //   let em_code = identity;
            //   let divBoss = element.divBoss;


            //   temp.Name = element.divName;
            //   temp['Applied On'] = element.divLADate;
            //   temp.From = `${element.divStartDate} - ${element.divEndDate}`;
            //   temp['Total Days'] = element.divLDays;
            //   temp.Reason = element.divReason;
            //   temp.Note = element.divNote;
            //   temp.Status = element.divStatus;
            //   divBoss === identity ? temp.Boss = element.divBoss: "";
            //   // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;

            //   for(let key in temp){
            //     const span = document.createElement('span');
            //     const bossSpan = document.createElement('span');
            //     bossSpan.setAttribute('id','bossSpan');
            //     const bossApprove = document.createElement('button');
            //     bossApprove.textContent = 'Approve';
            //     const bossNoApprove = document.createElement('button');
            //     bossNoApprove.textContent = 'Not approve';

            //     bossApprove.onclick = function(){
            //       actionFunc(atn,divCode,em_code,'true');
            //     }

            //     bossNoApprove.onclick = function(){
            //       actionFunc(atn,divCode,em_code,'false');

            //     }

            //     const label = document.createElement('label');
            //     const cancelBtn = document.createElement('button');
            //     cancelBtn.setAttribute('id','cancelAction');
            //     cancelBtn.onclick = function(){
            //       actionFunc(atn,divCode,em_code,'Cancel');
            //     }
            //     cancelBtn.textContent = 'Cancel';

            //     const p = document.createElement('p');
                
            //     key === "Status" && temp[key] === 'Cancelled'?(
            //       p.style.backgroundColor ='red', 
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
            //       p.style.fontSize='17px',
            //       p.style.color='white'
            //     ):key === "Status" && temp[key] === 'Not Approved'?(
            //       p.style.backgroundColor ='gray', 
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
            //       p.style.fontSize='17x',
            //       p.style.color='white'
            //     ):key === "Status" && temp[key] === 'Checked'?(
            //       p.style.backgroundColor ='green', 
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
            //       p.style.fontSize='17px',
            //       p.style.color='white'
            //     ):key === "Status" && temp[key] === 'Approved'?(
            //       p.style.backgroundColor ='rgba(16, 230, 112, 0.925)', 
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
            //       p.style.fontSize='17px',
            //       p.style.color='white'
            //     ):"";
            //     label.textContent = key;
            //     p.textContent = temp[key];
            //     key != 'Boss' ? span.appendChild(label) : "";
            //     key != 'Boss' ? span.appendChild(p) : "";

            //     (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
            //     key === 'Boss' ? bossSpan.appendChild(bossApprove) : "";
            //     key === 'Boss' ? bossSpan.appendChild(bossNoApprove): "";

                
            //     singleDiv.appendChild(span);
            //     // key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
            //   }
             
            //   work_home_status_view.appendChild(singleDiv)
            // });
        
          }else if(data && data.status === false){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
              
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            work_home_status_view.innerHTML = "";
          }
        })
        .catch(error=>{
          // console.log(error)
        });
        
      });


      const div = document.createElement("div");
      div.setAttribute("id","work_home_status_view");
      workHome_apply_view_container.appendChild(div);

      startDate_Input.value = getMonthsBackDate('Jan');
      const selected_date = document.getElementById("selected_date");
      const paragraphs = selected_date.querySelectorAll('p');
      paragraphs.forEach((element,index)=>{
        if(index === 0){
          element.textContent = startDate_Input.value
        }
        if(index === 2){
          element.textContent = endDate_Input.value
        }
      });

      await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFH&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
        .then(data=>{
        
          const work_home_status_view = document.getElementById('work_home_status_view');
          if(data && data.status === true){
          
            work_home_status_view.innerHTML = "";

            // Filter the array based on the divCode
            // const filteredData = data.data.filter(workHome => workHome.divCode === identity && new Date(workHome.divStartDate) >= new Date(startDate_Input.value) && new Date(workHome.divStartDate) <= new Date(endDate_Input.value));
            const filteredData = data.data.filter(workHome => workHome.divCode === identity && new Date(parseDate(workHome.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(workHome.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
           
            
            filteredData.forEach((workHome,index)=>{
              const singleDiv = document.createElement("div");
              singleDiv.setAttribute('id','single_status')
              let temp = {};

              let atn = workHome.divAtn;
              let divCode = workHome.divCode;
              let em_code = identity;
              let divBoss = workHome.divBoss;


              temp.Name = workHome.divName;
              temp['Applied On'] = workHome.divLADate;
              temp.From = `${workHome.divStartDate} - ${workHome.divEndDate}`;
              temp['Total Days'] = workHome.divLDays;
              temp.Reason = workHome.divReason;
              temp.Note = workHome.divNote;
              temp.Status = workHome.divStatus;


              for(let key in temp){
                const span = document.createElement('span');
                const label = document.createElement('label');
                const cancelBtn = document.createElement('button');
                cancelBtn.setAttribute('id','cancelAction');
                cancelBtn.onclick = function(){
                  actionFunc(atn,divCode,em_code,'Cancel');
                }
                cancelBtn.textContent = 'Cancel';

                const p = document.createElement('p');

                key === "Status" && temp[key] === 'Cancelled'?(
                  p.style.backgroundColor ='red', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Not Approved'?(
                  p.style.backgroundColor ='gray', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17x',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Checked'?(
                  p.style.backgroundColor ='green', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Approved'?(
                  p.style.backgroundColor ='green', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):"";

                label.textContent = key;
                p.textContent = temp[key];

                span.appendChild(label);
                span.appendChild(p);

                (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : "";

                singleDiv.appendChild(span);
              }

              work_home_status_view.appendChild(singleDiv);
            })

            // data.data.forEach((element,index)=>{
            //   const singleDiv = document.createElement("div");
            //   singleDiv.setAttribute('id','single_status')
            //   let temp = {};

            //   let atn = element.divAtn;
            //   let divCode = element.divCode;
            //   let em_code = identity;
            //   let divBoss = element.divBoss;


            //   temp.Name = element.divName;
            //   temp['Applied On'] = element.divLADate;
            //   temp.From = `${element.divStartDate} - ${element.divEndDate}`;
            //   temp['Total Days'] = element.divLDays;
            //   temp.Reason = element.divReason;
            //   temp.Note = element.divNote;
            //   temp.Status = element.divStatus;
            //   divBoss === identity ? temp.Boss = element.divBoss: "";
            //   // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;

            //   for(let key in temp){
            //     const span = document.createElement('span');
            //     const bossSpan = document.createElement('span');
            //     bossSpan.setAttribute('id','bossSpan');
            //     const bossApprove = document.createElement('button');
            //     bossApprove.textContent = 'Approve';
            //     const bossNoApprove = document.createElement('button');
            //     bossNoApprove.textContent = 'Not approve';

            //     bossApprove.onclick = function(){
            //       actionFunc(atn,divCode,em_code,'true');
            //     }

            //     bossNoApprove.onclick = function(){
            //       actionFunc(atn,divCode,em_code,'false');

            //     }

            //     const label = document.createElement('label');
            //     const cancelBtn = document.createElement('button');
            //     cancelBtn.setAttribute('id','cancelAction');
            //     cancelBtn.onclick = function(){
            //       actionFunc(atn,divCode,em_code,'Cancel');
            //     }
            //     cancelBtn.textContent = 'Cancel';

            //     const p = document.createElement('p');
            //     key === "Status" && temp[key] === 'Cancelled'?(
            //       p.style.backgroundColor ='red', 
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
            //       p.style.color='white'
            //     ):key === "Status" && temp[key] === 'Not Approved'?(
            //       p.style.backgroundColor ='gray', 
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
            //       p.style.color='white'
            //     ):key === "Status" && temp[key] === 'Checked'?(
            //       p.style.backgroundColor ='green', 
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
            //       p.style.color='white'
            //     ):key === "Status" && temp[key] === 'Approved'?(
            //       p.style.backgroundColor ='rgba(16, 230, 112, 0.925)', 
            //       p.style.borderRadius='15px',
            //       p.style.marginRight='5px',
            //       p.style.paddingTop='2px',
            //       p.style.paddingBottom='2px',
            //       p.style.textAlign='center',
            //       p.style.color='white'
            //     ):"";
            //     label.textContent = key;
            //     p.textContent = temp[key];
            //     key != 'Boss' ? span.appendChild(label) : "";
            //     key != 'Boss' ? span.appendChild(p) : "";

            //     (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
            //     key === 'Boss' ? bossSpan.appendChild(bossApprove) : "";
            //     key === 'Boss' ? bossSpan.appendChild(bossNoApprove): "";

                
            //     singleDiv.appendChild(span);
            //     // key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
            //   }
             
            //   work_home_status_view.appendChild(singleDiv)
            // });
          }else if(data && data.status === false){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
              
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            work_home_status_view.innerHTML = "";
          }
        })
        .catch(error=>{
          // console.log(error)
        });


        async function actionFunc(atn,divCode,em_code,status){
          const url = `${rootWwwUrl}/xapi/dash_api.ashx?cmd=leavestatus&atn=${atn}&code=${divCode}&em_code=${em_code}&status=${status}`
          await fetchData(url)
              .then((data)=>{
                if(data && data.status === true){
                  document.getElementById('darkOverlay').style.display = 'block';
                  document.body.classList.add('transparent');
                  Swal.fire({
                    title: data.message,
                    icon: "success",
                    showCloseButton: true,
                    confirmButtonColor: "#3085d6",
                    showConfirmButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then(async (result)=>{
                  if(result.isConfirmed){
                    // const work_home_status_view = document.getElementById("work_home_status_view")
                    // work_home_status_view.innerHTML = "";
                    await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFH&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
                    .then((data)=>{
                      const work_home_status_view = document.getElementById("work_home_status_view");
                      if(data && data.status === true){
                        work_home_status_view.innerHTML = "";

                        // Filter the array based on the divCode
                        const filteredData = data.data.filter(workHome => workHome.divCode === identity && new Date(parseDate(workHome.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(workHome.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
                        filteredData.forEach((workHome,index)=>{
                          const singleDiv = document.createElement("div");
                          singleDiv.setAttribute('id','single_status')
                          let temp = {};

                          let atn = workHome.divAtn;
                          let divCode = workHome.divCode;
                          let em_code = identity;
                          let divBoss = workHome.divBoss;


                          temp.Name = workHome.divName;
                          temp['Applied On'] = workHome.divLADate;
                          temp.From = `${workHome.divStartDate} - ${workHome.divEndDate}`;
                          temp['Total Days'] = workHome.divLDays;
                          temp.Reason = workHome.divReason;
                          temp.Note = workHome.divNote;
                          temp.Status = workHome.divStatus;


                          for(let key in temp){
                            const span = document.createElement('span');
                            const label = document.createElement('label');
                            const cancelBtn = document.createElement('button');
                            cancelBtn.setAttribute('id','cancelAction');
                            cancelBtn.onclick = function(){
                              actionFunc(atn,divCode,em_code,'Cancel');
                            }
                            cancelBtn.textContent = 'Cancel';

                            const p = document.createElement('p');

                            key === "Status" && temp[key] === 'Cancelled'?(
                              p.style.backgroundColor ='red', 
                              p.style.borderRadius='15px',
                              p.style.marginRight='5px',
                              p.style.paddingTop='2px',
                              p.style.paddingBottom='2px',
                              p.style.textAlign='center',
                              p.style.fontSize='17px',
                              p.style.color='white'
                            ):key === "Status" && temp[key] === 'Not Approved'?(
                              p.style.backgroundColor ='gray', 
                              p.style.borderRadius='15px',
                              p.style.marginRight='5px',
                              p.style.paddingTop='2px',
                              p.style.paddingBottom='2px',
                              p.style.textAlign='center',
                              p.style.fontSize='17x',
                              p.style.color='white'
                            ):key === "Status" && temp[key] === 'Checked'?(
                              p.style.backgroundColor ='green', 
                              p.style.borderRadius='15px',
                              p.style.marginRight='5px',
                              p.style.paddingTop='2px',
                              p.style.paddingBottom='2px',
                              p.style.textAlign='center',
                              p.style.fontSize='17px',
                              p.style.color='white'
                            ):key === "Status" && temp[key] === 'Approved'?(
                              p.style.backgroundColor ='green', 
                              p.style.borderRadius='15px',
                              p.style.marginRight='5px',
                              p.style.paddingTop='2px',
                              p.style.paddingBottom='2px',
                              p.style.textAlign='center',
                              p.style.fontSize='17px',
                              p.style.color='white'
                            ):"";

                            label.textContent = key;
                            p.textContent = temp[key];

                            span.appendChild(label);
                            span.appendChild(p);

                            (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : "";

                            singleDiv.appendChild(span);
                          }

                          work_home_status_view.appendChild(singleDiv);
                        })

                        // data.data.forEach((leave,index)=>{
                        //   const singleDiv = document.createElement("div");
                        //   singleDiv.setAttribute('id','single_status');
                        //   let temp = {};
  
                        //   let atn = leave.divAtn;
                        //   let divCode = leave.divCode;
                        //   let em_code = identity;
                        //   let divBoss = leave.divBoss;
  
                        //   temp.Name = leave.divName;
                        //   temp['Applied On'] = leave.divLADate;
                        //   temp.From = `${leave.divStartDate} - ${leave.divEndDate}`;
                        //   temp['Total Days'] = leave.divLDays;
                        //   temp.Reason = leave.divReason;
                        //   temp.Note = leave.divNote;
                        //   temp.Status = leave.divStatus;
                        //   divBoss === identity ? temp.Boss = leave.divBoss: "";
                        //   // divBoss === identity ? temp.Boss = leave.divBoss: temp.Boss = leave.divBoss;

                        //   for(let key in temp){
                        //     const span = document.createElement('span');
                        //     const bossSpan = document.createElement('span');
                        //     bossSpan.setAttribute('id','bossSpan');
                        //     const bossApprove = document.createElement('button');
                        //     bossApprove.textContent = 'Approve';
                        //     const bossNoApprove = document.createElement('button');
                        //     bossNoApprove.textContent = 'Not approve';
            
                        //     bossApprove.onclick = function(){
                        //       actionFunc(atn,divCode,em_code,'true');
                        //     }
            
                        //     bossNoApprove.onclick = function(){
                        //       actionFunc(atn,divCode,em_code,'false');
            
                        //     }
            
                        //     const label = document.createElement('label');
                        //     const cancelBtn = document.createElement('button');
                        //     cancelBtn.setAttribute('id','cancelAction');
                        //     cancelBtn.onclick = function(){
                        //       actionFunc(atn,divCode,em_code,'Cancel');
                        //     }
                        //     cancelBtn.textContent = 'Cancel';
            
                        //     const p = document.createElement('p');
                        //     key === "Status" && temp[key] === 'Cancelled'?(
                        //       p.style.backgroundColor ='red', 
                        //       p.style.borderRadius='15px',
                        //       p.style.marginRight='5px',
                        //       p.style.paddingTop='2px',
                        //       p.style.paddingBottom='2px',
                        //       p.style.textAlign='center',
                        //       p.style.color='white'
                        //     ):key === "Status" && temp[key] === 'Not Approved'?(
                        //       p.style.backgroundColor ='gray', 
                        //       p.style.borderRadius='15px',
                        //       p.style.marginRight='5px',
                        //       p.style.paddingTop='2px',
                        //       p.style.paddingBottom='2px',
                        //       p.style.textAlign='center',
                        //       p.style.color='white'
                        //     ):key === "Status" && temp[key] === 'Checked'?(
                        //       p.style.backgroundColor ='green', 
                        //       p.style.borderRadius='15px',
                        //       p.style.marginRight='5px',
                        //       p.style.paddingTop='2px',
                        //       p.style.paddingBottom='2px',
                        //       p.style.textAlign='center',
                        //       p.style.color='white'
                        //     ):"";
                        //     label.textContent = key;
                        //     p.textContent = temp[key];
                        //     key != 'Boss' ? span.appendChild(label) : "";
                        //     key != 'Boss' ? span.appendChild(p) : "";
            
                        //     (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
                        //     key === 'Boss' ? bossSpan.appendChild(bossApprove) : "";
                        //     key === 'Boss' ? bossSpan.appendChild(bossNoApprove): "";
            
                            
                        //     singleDiv.appendChild(span);
                        //     key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
                        //   }
  
                        //   console.log(work_home_status_view,singleDiv)
                        //   work_home_status_view.appendChild(singleDiv);
                          
                        // });
                      }else if(data && data.status === false){
                        document.getElementById('darkOverlay').style.display = 'block';
                        document.body.classList.add('transparent');
                        Swal.fire({
                          icon: "warning",
                          // title: "Oops...",
                          text: "No data found!",
                          
                        }).then((result) => {
                          // Hide the overlay when alert is closed
                          document.getElementById('darkOverlay').style.display = 'none';
                          document.body.classList.remove('transparent'); // Remove class to allow scrolling
                        });
                        work_home_status_view.innerHTML = "";
                      }
                    })
                    .catch(error=>{
                      // console.log(error)
                    });
                  }

                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling

                })
                }
              })
              .catch(error=>{
                // console.log(error);
              });
        }

    }else if(key === 'approval'){
      const workHome_apply_view_container = document.getElementById("workHome_apply_view_container");
      workHome_apply_view_container.innerHTML = "";

      const selectStatus = `
        <label for="status">Status:</label>
        <i class="material-symbols-outlined" id="status_arrow_icon">
          arrow_drop_down
        </i>
        <select id="select_leave_status">
          <option value="Pending" selected>Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
        </select>
      `
      let selectedValue = "Pending"
      const select_status_div = document.createElement('div');
      select_status_div.setAttribute('id','select_status_div')
      select_status_div.innerHTML = selectStatus
      const startDatePickerInput = handleDateAndTime('startDatePickerInput');
      const endDatePickerInput = handleDateAndTime('endDatePickerInput');

      const dateRange = `
        <div id="dateContainer">
          <div id="date_range">
            <span id="workHome_startDate"></span>
            <span id="workHome_endDate"></span>
            <span id="smbt"><button id="work-from-home-view-btn">OK</button></span>
          </div>
          <div id="selected_date">
            <div>
              <label>Date :</label>
              <span>
                <p>${startDatePickerInput.elementName.value}</p>
                <p> - </p>
                <p>${endDatePickerInput.elementName.value}</p>
              </span>
            </div>
          </div>
        </div>
      `;

      
      workHome_apply_view_container.innerHTML = dateRange;
  
      const workHome_startDate = document.getElementById("workHome_startDate");
      const workHome_endDate = document.getElementById("workHome_endDate"); 
      
      workHome_startDate.appendChild(startDatePickerInput.elementName);
      workHome_endDate.appendChild(endDatePickerInput.elementName);

      const startDate_Input = document.getElementById("startDatePickerInput");
      const endDate_Input = document.getElementById("endDatePickerInput");


  


      const div = document.createElement("div");
      div.setAttribute("id","work_home_status_view");
      workHome_apply_view_container.appendChild(div);

      startDate_Input.value = getMonthsBackDate(1);
      endDate_Input.value = getMonthsBackDate(1,'forward');
      const selected_date = document.getElementById("selected_date");
        const paragraphs = selected_date.querySelectorAll('p');
        paragraphs.forEach((element,index)=>{
          if(index === 0){
            element.textContent = startDate_Input.value
          }
          if(index === 2){
            element.textContent = endDate_Input.value
          }
        });
      selected_date.appendChild(select_status_div)
      selected_date.style.cssText =`display:flex;flex-direction:row-reverse;justify-content:space-between;align-items:center`;
    
      select_leave_status.addEventListener('change',(event)=>{
        selectedValue = event.target.value;
      });

      smbt.addEventListener('click',async function(){
        const selected_date = document.getElementById("selected_date");
        const paragraphs = selected_date.querySelectorAll('p');
        
        paragraphs.forEach((element,index)=>{
          if(index === 0){
            element.textContent = startDate_Input.value
          }
          if(index === 2){
            element.textContent = endDate_Input.value
          }
        });

       
       await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFH&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
        .then(data=>{
         
          workHome_apply_view_container.appendChild(div);
          const work_home_status_view = document.getElementById('work_home_status_view');
          
         
          if(data && data.status === true){
            work_home_status_view.innerHTML = "";

            
            // Filter the array based on divStatus
            const filteredData = data.data.filter(element =>element.divBoss === identity && (element.divStatus === selectedValue || element.divStatus === 'Checked') && new Date(parseDate(element.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(element.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
           
            if(filteredData.length > 0){
              filteredData.forEach((element,index)=>{
                const singleDiv = document.createElement("div");
                singleDiv.setAttribute('id','single_status')
                let temp = {};

                let atn = element.divAtn;
                let divCode = element.divCode;
                let em_code = identity;
                let divBoss = element.divBoss;


                temp.Name = element.divName;
                temp['Applied On'] = element.divLADate;
                temp.From = `${element.divStartDate} - ${element.divEndDate}`;
                temp['Total Days'] = element.divLDays;
                temp.Reason = element.divReason;
                temp.Note = element.divNote;
                temp.Status = element.divStatus;
                divBoss === identity ? temp.Boss = element.divBoss: "";
                // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;

                for(let key in temp){
                  
                  const span = document.createElement('span');
                  const bossSpan = document.createElement('span');
                  bossSpan.setAttribute('id','bossSpan');
                  const bossApprove = document.createElement('button');
                  bossApprove.textContent = 'Approve';
                  const bossNoApprove = document.createElement('button');
                  bossNoApprove.textContent = 'Not approve';

                  if(key === 'Status'){
                    span.setAttribute('id','work_home_status')
                  }
                  bossApprove.onclick = function(){
                    actionFunc(atn,divCode,em_code,'true');
                  }

                  bossNoApprove.onclick = function(){
                    actionFunc(atn,divCode,em_code,'false');
                  }

                  const label = document.createElement('label');
                  const p = document.createElement('p');
                  key === "Status" && temp[key] === 'Cancelled'?(
                    p.style.backgroundColor ='red', 
                    p.style.borderRadius='15px',
                    p.style.marginRight='5px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.textAlign='center',
                    p.style.color='white'
                  ):key === "Status" && temp[key] === 'Not Approved'?(
                    p.style.backgroundColor ='gray', 
                    p.style.borderRadius='15px',
                    p.style.marginRight='5px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.textAlign='center',
                    p.style.color='white'
                  ):key === "Status" && temp[key] === 'Checked'?(
                    p.style.backgroundColor ='green', 
                    p.style.borderRadius='15px',
                    p.style.marginRight='5px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.textAlign='center',
                    p.style.color='white'
                  ):key === "Status" && temp[key] === 'Pending'?(
                    p.style.backgroundColor ='green', 
                    p.style.borderRadius='15px',
                    p.style.marginRight='5px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.textAlign='center',
                    p.style.color='white'
                  ):"";
                  label.textContent = key;
                  p.textContent = temp[key];
                  span.appendChild(label)
                  span.appendChild(p)

                  // (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
                  bossSpan.appendChild(bossApprove)
                  bossSpan.appendChild(bossNoApprove)

                  
                  singleDiv.appendChild(span);
                  key === 'Boss'  && selectedValue === 'Pending' ? singleDiv.appendChild(bossSpan) : "";
                }
              
                // divBoss === identity ? work_home_status_view.appendChild(singleDiv) : '';
                work_home_status_view.appendChild(singleDiv);
              })
            }else {
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "No data found!",
                
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            }

            // data.data.forEach((element,index)=>{
              
            //   if(element.divBoss === identity && (element.divStatus === 'Pending' || element.divStatus === 'Checked')){
            //     const singleDiv = document.createElement("div");
            //     singleDiv.setAttribute('id','single_status')
            //     let temp = {};

            //     let atn = element.divAtn;
            //     let divCode = element.divCode;
            //     let em_code = identity;
            //     let divBoss = element.divBoss;


            //     temp.Name = element.divName;
            //     temp['Applied On'] = element.divLADate;
            //     temp.From = `${element.divStartDate} - ${element.divEndDate}`;
            //     temp['Total Days'] = element.divLDays;
            //     temp.Reason = element.divReason;
            //     temp.Note = element.divNote;
            //     temp.Status = element.divStatus;
            //     divBoss === identity ? temp.Boss = element.divBoss: "";
            //     // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;

            //     for(let key in temp){
                  
            //       const span = document.createElement('span');
            //       const bossSpan = document.createElement('span');
            //       bossSpan.setAttribute('id','bossSpan');
            //       const bossApprove = document.createElement('button');
            //       bossApprove.textContent = 'Approve';
            //       const bossNoApprove = document.createElement('button');
            //       bossNoApprove.textContent = 'Not approve';

            //       bossApprove.onclick = function(){
            //         actionFunc(atn,divCode,em_code,'true');
            //       }

            //       bossNoApprove.onclick = function(){
            //         actionFunc(atn,divCode,em_code,'false');
            //       }

                  
            //       // const cancelBtn = document.createElement('button');
            //       // cancelBtn.setAttribute('id','cancelAction');
            //       // cancelBtn.onclick = function(){
            //       //   actionFunc(atn,divCode,em_code,'Cancel');
            //       // }
            //       // cancelBtn.textContent = 'Cancel';

            //       const label = document.createElement('label');
            //       const p = document.createElement('p');
            //       key === "Status" && temp[key] === 'Cancelled'?(
            //         p.style.backgroundColor ='red', 
            //         p.style.borderRadius='15px',
            //         p.style.marginRight='5px',
            //         p.style.paddingTop='2px',
            //         p.style.paddingBottom='2px',
            //         p.style.textAlign='center',
            //         p.style.color='white'
            //       ):key === "Status" && temp[key] === 'Not Approved'?(
            //         p.style.backgroundColor ='gray', 
            //         p.style.borderRadius='15px',
            //         p.style.marginRight='5px',
            //         p.style.paddingTop='2px',
            //         p.style.paddingBottom='2px',
            //         p.style.textAlign='center',
            //         p.style.color='white'
            //       ):key === "Status" && temp[key] === 'Checked'?(
            //         p.style.backgroundColor ='green', 
            //         p.style.borderRadius='15px',
            //         p.style.marginRight='5px',
            //         p.style.paddingTop='2px',
            //         p.style.paddingBottom='2px',
            //         p.style.textAlign='center',
            //         p.style.color='white'
            //       ):"";
            //       label.textContent = key;
            //       p.textContent = temp[key];
            //       span.appendChild(label)
            //       span.appendChild(p)

            //       // (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
            //       bossSpan.appendChild(bossApprove)
            //       bossSpan.appendChild(bossNoApprove)

                  
            //       singleDiv.appendChild(span);
            //       key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
            //     }
              
            //     // divBoss === identity ? work_home_status_view.appendChild(singleDiv) : '';
            //     work_home_status_view.appendChild(singleDiv);
            //   }else {
            //     Swal.fire({
            //       icon: "warning",
            //       title: "Oops...",
            //       text: "No data found!",
                  
            //     });
            //   }

            // });
          }else if(data && data.status === false){
            
            work_home_status_view.innerHTML = "";
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          }

          const singleStatusElements =(work_home_status_view.querySelectorAll('#single_status'))
          singleStatusElements.forEach(singleStatus =>{
            const targetSpan = singleStatus.querySelector('span#work_home_status');
            if (targetSpan) {
              targetSpan.style.cssText = `
                display:flex;flex-direction:row;gap:0
              `
              const targetSpan_p_tag = targetSpan.querySelector('p');
              if(targetSpan_p_tag.textContent === 'Pending'){
                targetSpan_p_tag.style.cssText =`
                  background-color:yellow;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                `
              } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                targetSpan_p_tag.style.cssText = `
                  background-color:red;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              } else if(targetSpan_p_tag.textContent === 'Approved'){
                targetSpan_p_tag.style.cssText = `
                  background-color:green;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              }
            }
          })

        })
        .catch(error=>{
          // console.log(error)
        });
        
      });

      const work_home_status_view = document.getElementById('work_home_status_view');
      work_home_status_view.style.cssText = `padding-top:110px`

      await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFH&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
        .then(data=>{
          
          const work_home_status_view = document.getElementById('work_home_status_view');
          if(data && data.status === true){
            work_home_status_view.innerHTML = "";

             // Filter the array based on divStatus
             const filteredData = data.data.filter(element =>element.divBoss === identity && (element.divStatus === 'Pending' || element.divStatus === 'Checked') && new Date(parseDate(element.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(element.divStartDate)) <= new Date(parseDate(endDate_Input.value)) );
             
             if(filteredData.length > 0){
                filteredData.forEach((element,index)=>{
                  const singleDiv = document.createElement("div");
                  singleDiv.setAttribute('id','single_status')
                  let temp = {};
    
                  let atn = element.divAtn;
                  let divCode = element.divCode;
                  let em_code = identity;
                  let divBoss = element.divBoss;
    
    
                  temp.Name = element.divName;
                  temp['Applied On'] = element.divLADate;
                  temp.From = `${element.divStartDate} - ${element.divEndDate}`;
                  temp['Total Days'] = element.divLDays;
                  temp.Reason = element.divReason;
                  temp.Note = element.divNote;
                  temp.Status = element.divStatus;
                  divBoss === identity ? temp.Boss = element.divBoss: "";
                  // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;
    
                  for(let key in temp){
                    
                    const span = document.createElement('span');
                    const bossSpan = document.createElement('span');
                    bossSpan.setAttribute('id','bossSpan');
                    const bossApprove = document.createElement('button');
                    bossApprove.textContent = 'Approve';
                    const bossNoApprove = document.createElement('button');
                    bossNoApprove.textContent = 'Not approve';
    
                    if(key === 'Status'){
                      span.setAttribute('id','work_home_status')
                    }
                    bossApprove.onclick = function(){
                      actionFunc(atn,divCode,em_code,'true');
                    }
    
                    bossNoApprove.onclick = function(){
                      actionFunc(atn,divCode,em_code,'false');
                    }
    
                    const label = document.createElement('label');
                    const p = document.createElement('p');
                    key === "Status" && temp[key] === 'Cancelled'?(
                      p.style.backgroundColor ='red', 
                      p.style.borderRadius='15px',
                      p.style.marginRight='5px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.textAlign='center',
                      p.style.color='white'
                    ):key === "Status" && temp[key] === 'Not Approved'?(
                      p.style.backgroundColor ='gray', 
                      p.style.borderRadius='15px',
                      p.style.marginRight='5px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.textAlign='center',
                      p.style.color='white'
                    ):key === "Status" && temp[key] === 'Checked'?(
                      p.style.backgroundColor ='green', 
                      p.style.borderRadius='15px',
                      p.style.marginRight='5px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.textAlign='center',
                      p.style.color='white'
                    ):key === "Status" && temp[key] === 'Pending'?(
                      p.style.backgroundColor ='green', 
                      p.style.borderRadius='15px',
                      p.style.marginRight='5px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.textAlign='center',
                      p.style.color='white'
                    ):"";

                    label.textContent = key;
                    p.textContent = temp[key];
                    span.appendChild(label)
                    span.appendChild(p)
    
                    // (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
                    bossSpan.appendChild(bossApprove)
                    bossSpan.appendChild(bossNoApprove)
    
                    
                    singleDiv.appendChild(span);
                    key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
                  }
                
                  // divBoss === identity ? work_home_status_view.appendChild(singleDiv) : '';
                  work_home_status_view.appendChild(singleDiv);
                })
             }else{
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "No data found!",
                
              }).then((result) => {
                    // Hide the overlay when alert is closed
                    document.getElementById('darkOverlay').style.display = 'none';
                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
             }
            // data.data.forEach((element,index)=>{
              
            //   if(element.divBoss === identity && (element.divStatus === 'Pending' || element.divStatus === 'Checked')){
            //     const singleDiv = document.createElement("div");
            //     singleDiv.setAttribute('id','single_status')
            //     let temp = {};

            //     let atn = element.divAtn;
            //     let divCode = element.divCode;
            //     let em_code = identity;
            //     let divBoss = element.divBoss;


            //     temp.Name = element.divName;
            //     temp['Applied On'] = element.divLADate;
            //     temp.From = `${element.divStartDate} - ${element.divEndDate}`;
            //     temp['Total Days'] = element.divLDays;
            //     temp.Reason = element.divReason;
            //     temp.Note = element.divNote;
            //     temp.Status = element.divStatus;
            //     divBoss === identity ? temp.Boss = element.divBoss: "";
            //     // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;

            //     for(let key in temp){
                  
            //       const span = document.createElement('span');
            //       const bossSpan = document.createElement('span');
            //       bossSpan.setAttribute('id','bossSpan');
            //       const bossApprove = document.createElement('button');
            //       bossApprove.textContent = 'Approve';
            //       const bossNoApprove = document.createElement('button');
            //       bossNoApprove.textContent = 'Not approve';

            //       bossApprove.onclick = function(){
            //         actionFunc(atn,divCode,em_code,'true');
            //       }

            //       bossNoApprove.onclick = function(){
            //         actionFunc(atn,divCode,em_code,'false');
            //       }

                  
            //       // const cancelBtn = document.createElement('button');
            //       // cancelBtn.setAttribute('id','cancelAction');
            //       // cancelBtn.onclick = function(){
            //       //   actionFunc(atn,divCode,em_code,'Cancel');
            //       // }
            //       // cancelBtn.textContent = 'Cancel';

            //       const label = document.createElement('label');
            //       const p = document.createElement('p');
            //       key === "Status" && temp[key] === 'Cancelled'?(
            //         p.style.backgroundColor ='red', 
            //         p.style.borderRadius='15px',
            //         p.style.marginRight='5px',
            //         p.style.paddingTop='2px',
            //         p.style.paddingBottom='2px',
            //         p.style.textAlign='center',
            //         p.style.color='white'
            //       ):key === "Status" && temp[key] === 'Not Approved'?(
            //         p.style.backgroundColor ='gray', 
            //         p.style.borderRadius='15px',
            //         p.style.marginRight='5px',
            //         p.style.paddingTop='2px',
            //         p.style.paddingBottom='2px',
            //         p.style.textAlign='center',
            //         p.style.color='white'
            //       ):key === "Status" && temp[key] === 'Checked'?(
            //         p.style.backgroundColor ='green', 
            //         p.style.borderRadius='15px',
            //         p.style.marginRight='5px',
            //         p.style.paddingTop='2px',
            //         p.style.paddingBottom='2px',
            //         p.style.textAlign='center',
            //         p.style.color='white'
            //       ):"";
            //       label.textContent = key;
            //       p.textContent = temp[key];
            //       span.appendChild(label)
            //       span.appendChild(p)

            //       // (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
            //       bossSpan.appendChild(bossApprove)
            //       bossSpan.appendChild(bossNoApprove)

                  
            //       singleDiv.appendChild(span);
            //       key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
            //     }
              
            //     // divBoss === identity ? work_home_status_view.appendChild(singleDiv) : '';
            //     work_home_status_view.appendChild(singleDiv);
            //   }else{
            //     Swal.fire({
            //       icon: "warning",
            //       title: "Oops...",
            //       text: "No data found!",
                  
            //     });
            //   }

            // });
          }else if(data && data.status === false){
            
            work_home_status_view.innerHTML = "";
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          }

          const singleStatusElements =(work_home_status_view.querySelectorAll('#single_status'))
          singleStatusElements.forEach(singleStatus =>{
            const targetSpan = singleStatus.querySelector('span#work_home_status');
            if (targetSpan) {
              targetSpan.style.cssText = `
                display:flex;flex-direction:row;gap:0
              `
              const targetSpan_p_tag = targetSpan.querySelector('p');
              if(targetSpan_p_tag.textContent === 'Pending'){
                targetSpan_p_tag.style.cssText =`
                  background-color:yellow;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                `
              } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                targetSpan_p_tag.style.cssText = `
                  background-color:red;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              } else if(targetSpan_p_tag.textContent === 'Approved'){
                targetSpan_p_tag.style.cssText = `
                  background-color:green;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              }
            }
          })
        })
        .catch(error=>{
          // console.log(error)
        });


      async function actionFunc(atn,divCode,em_code,status){
        const url = `${rootWwwUrl}/xapi/dash_api.ashx?cmd=leavestatus&atn=${atn}&code=${divCode}&em_code=${em_code}&status=${status}`
        await fetchData(url)
            .then((data)=>{
              if(data && data.status === true){
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  title: data.message,
                  icon: "success",
                  showCloseButton: true,
                  confirmButtonColor: "#3085d6",
                  showConfirmButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
                }).then(async (result)=>{
                  if(result.isConfirmed){
                    // const work_home_status_view = document.getElementById("work_home_status_view")
                    // work_home_status_view.innerHTML = "";
                    await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFH&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
                    .then((data)=>{
                      const work_home_status_view = document.getElementById("work_home_status_view");
                      if(data && data.status === true){
                        work_home_status_view.innerHTML = "";

                        // Filter the array based on divStatus
                        const filteredData = data.data.filter(element =>element.divBoss === identity && (element.divStatus === 'Pending' || element.divStatus === 'Checked') && new Date(parseDate(element.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(element.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
            
                        if(filteredData.length > 0){
                          filteredData.forEach((element,index)=>{
                            const singleDiv = document.createElement("div");
                            singleDiv.setAttribute('id','single_status')
                            let temp = {};
            
                            let atn = element.divAtn;
                            let divCode = element.divCode;
                            let em_code = identity;
                            let divBoss = element.divBoss;
            
            
                            temp.Name = element.divName;
                            temp['Applied On'] = element.divLADate;
                            temp.From = `${element.divStartDate} - ${element.divEndDate}`;
                            temp['Total Days'] = element.divLDays;
                            temp.Reason = element.divReason;
                            temp.Note = element.divNote;
                            temp.Status = element.divStatus;
                            divBoss === identity ? temp.Boss = element.divBoss: "";
                            // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;
            
                            for(let key in temp){
                              
                              const span = document.createElement('span');
                              const bossSpan = document.createElement('span');
                              bossSpan.setAttribute('id','bossSpan');
                              const bossApprove = document.createElement('button');
                              bossApprove.textContent = 'Approve';
                              const bossNoApprove = document.createElement('button');
                              bossNoApprove.textContent = 'Not approve';
            
                              if(key === 'Status'){
                                span.setAttribute('id','work_home_status')
                              }
                              bossApprove.onclick = function(){
                                actionFunc(atn,divCode,em_code,'true');
                              }
            
                              bossNoApprove.onclick = function(){
                                actionFunc(atn,divCode,em_code,'false');
                              }    
            
                              const label = document.createElement('label');
                              const p = document.createElement('p');
                              key === "Status" && temp[key] === 'Cancelled'?(
                                p.style.backgroundColor ='red', 
                                p.style.borderRadius='15px',
                                p.style.marginRight='5px',
                                p.style.paddingTop='2px',
                                p.style.paddingBottom='2px',
                                p.style.textAlign='center',
                                p.style.color='white'
                              ):key === "Status" && temp[key] === 'Not Approved'?(
                                p.style.backgroundColor ='gray', 
                                p.style.borderRadius='15px',
                                p.style.marginRight='5px',
                                p.style.paddingTop='2px',
                                p.style.paddingBottom='2px',
                                p.style.textAlign='center',
                                p.style.color='white'
                              ):key === "Status" && temp[key] === 'Checked'?(
                                p.style.backgroundColor ='green', 
                                p.style.borderRadius='15px',
                                p.style.marginRight='5px',
                                p.style.paddingTop='2px',
                                p.style.paddingBottom='2px',
                                p.style.textAlign='center',
                                p.style.color='white'
                              ):"";
                              label.textContent = key;
                              p.textContent = temp[key];
                              span.appendChild(label)
                              span.appendChild(p)
            
                              // (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
                              bossSpan.appendChild(bossApprove)
                              bossSpan.appendChild(bossNoApprove)
            
                              
                              singleDiv.appendChild(span);
                              key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
                            }
                          
                            // divBoss === identity ? work_home_status_view.appendChild(singleDiv) : '';
                            work_home_status_view.appendChild(singleDiv);
                          })
                        }

                        // data.data.forEach((element,index)=>{
              
                        //   if(element.divBoss === identity && (element.divStatus === 'Pending' || element.divStatus === 'Checked')){
                        //     const singleDiv = document.createElement("div");
                        //     singleDiv.setAttribute('id','single_status')
                        //     let temp = {};
            
                        //     let atn = element.divAtn;
                        //     let divCode = element.divCode;
                        //     let em_code = identity;
                        //     let divBoss = element.divBoss;
            
            
                        //     temp.Name = element.divName;
                        //     temp['Applied On'] = element.divLADate;
                        //     temp.From = `${element.divStartDate} - ${element.divEndDate}`;
                        //     temp['Total Days'] = element.divLDays;
                        //     temp.Reason = element.divReason;
                        //     temp.Note = element.divNote;
                        //     temp.Status = element.divStatus;
                        //     divBoss === identity ? temp.Boss = element.divBoss: "";
                        //     // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;
            
                        //     for(let key in temp){
                              
                        //       const span = document.createElement('span');
                        //       const bossSpan = document.createElement('span');
                        //       bossSpan.setAttribute('id','bossSpan');
                        //       const bossApprove = document.createElement('button');
                        //       bossApprove.textContent = 'Approve';
                        //       const bossNoApprove = document.createElement('button');
                        //       bossNoApprove.textContent = 'Not approve';
            
                        //       bossApprove.onclick = function(){
                        //         actionFunc(atn,divCode,em_code,'true');
                        //       }
            
                        //       bossNoApprove.onclick = function(){
                        //         actionFunc(atn,divCode,em_code,'false');
                        //       }
            
                              
                        //       // const cancelBtn = document.createElement('button');
                        //       // cancelBtn.setAttribute('id','cancelAction');
                        //       // cancelBtn.onclick = function(){
                        //       //   actionFunc(atn,divCode,em_code,'Cancel');
                        //       // }
                        //       // cancelBtn.textContent = 'Cancel';
            
                        //       const label = document.createElement('label');
                        //       const p = document.createElement('p');
                        //       key === "Status" && temp[key] === 'Cancelled'?(
                        //         p.style.backgroundColor ='red', 
                        //         p.style.borderRadius='15px',
                        //         p.style.marginRight='5px',
                        //         p.style.paddingTop='2px',
                        //         p.style.paddingBottom='2px',
                        //         p.style.textAlign='center',
                        //         p.style.color='white'
                        //       ):key === "Status" && temp[key] === 'Not Approved'?(
                        //         p.style.backgroundColor ='gray', 
                        //         p.style.borderRadius='15px',
                        //         p.style.marginRight='5px',
                        //         p.style.paddingTop='2px',
                        //         p.style.paddingBottom='2px',
                        //         p.style.textAlign='center',
                        //         p.style.color='white'
                        //       ):key === "Status" && temp[key] === 'Checked'?(
                        //         p.style.backgroundColor ='green', 
                        //         p.style.borderRadius='15px',
                        //         p.style.marginRight='5px',
                        //         p.style.paddingTop='2px',
                        //         p.style.paddingBottom='2px',
                        //         p.style.textAlign='center',
                        //         p.style.color='white'
                        //       ):"";
                        //       label.textContent = key;
                        //       p.textContent = temp[key];
                        //       span.appendChild(label)
                        //       span.appendChild(p)
            
                        //       // (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
                        //       bossSpan.appendChild(bossApprove)
                        //       bossSpan.appendChild(bossNoApprove)
            
                              
                        //       singleDiv.appendChild(span);
                        //       key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
                        //     }
                          
                        //     // divBoss === identity ? work_home_status_view.appendChild(singleDiv) : '';
                        //     work_home_status_view.appendChild(singleDiv);
                        //   }
            
                        // });

                      }else if(data && data.status === false){
                        
                        work_home_status_view.innerHTML = "";
                      }
                    })
                    .catch(error=>{
                      // console.log(error)
                    });
                  }
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling

                })
              }else if(data && data.status === false){
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  // title: "Oops...",
                  text: "No data found!",
                  
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              }

              const singleStatusElements =(work_home_status_view.querySelectorAll('#single_status'))
              singleStatusElements.forEach(singleStatus =>{
                const targetSpan = singleStatus.querySelector('span#work_home_status');
                if (targetSpan) {
                  targetSpan.style.cssText = `
                    display:flex;flex-direction:row;gap:0
                  `
                  const targetSpan_p_tag = targetSpan.querySelector('p');
                  if(targetSpan_p_tag.textContent === 'Pending'){
                    targetSpan_p_tag.style.cssText =`
                      background-color:yellow;
                      width:fit-content;               
                      padding:2px 10px;               
                      border-radius:25px;
                    `
                  } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                    targetSpan_p_tag.style.cssText = `
                      background-color:red;
                      width:fit-content;               
                      padding:2px 10px;               
                      border-radius:25px;
                      color:white;
                    `
                  } else if(targetSpan_p_tag.textContent === 'Approved'){
                    targetSpan_p_tag.style.cssText = `
                      background-color:green;
                      width:fit-content;               
                      padding:2px 10px;               
                      border-radius:25px;
                      color:white;
                    `
                  }
                }
              })
            })
            .catch(error=>{
              // console.log(error);
            });
      }

    }

  });
  buttonContainer.appendChild(buttons);
}

async function workFromOtherLocation(items){
  const hrmActivityMain = document.getElementById('hrmActivityMain');


  // Example usage
  var deviceType = getDeviceType();
  var webView = isWebView();
  hrmActivityMain.innerHTML = (deviceType + webView);



  hrmActivityMain.innerHTML =`
    <div id="work_from_other_location_container">
      <div id="button_container"></div>
      <div id="workLocation_apply_view_container">
      
      </div>
    </div>
  `

  const buttonContainer = document.getElementById("button_container");

  const buttons = createNavigationButton(items, 'apply',async function (data, key) {

    if(key === 'apply'){
      const workLocation_apply_view_container = document.getElementById("workLocation_apply_view_container");
      workLocation_apply_view_container.innerHTML = "";

      const useForm = handleForm('workLocationApply','workLocation_apply_class');
  
      const startDatePickerInput = handleDateAndTime('applyDateFrom');
      const endDatePickerInput = handleDateAndTime('applyDateTo');

      let radioButtonsHTML = '';

      data.forEach((item,index)=>{
        // const checkedAttribute = index === 0 ? 'checked' : '';
        const checkedAttribute = index === 0 ? '' : '';
        radioButtonsHTML += `
          <span>
            <input type="radio" id="${index}" name="applyReason" value="${item}" ${checkedAttribute}>
            <label for="${index}">${item}</label>
          </span>
        `;
      }); 

      const formContentHTML = `
          <div id="select_workLocation_date">
            <span id="workLocation_startDate"><label>From</lable></span>
            <span id="workLocation_endDate"><label>To</label></span>
          </div>
          <div id="select_workLocation_reason">
            <p>Location</p>
            <div id="other_location_radio">
              ${radioButtonsHTML}
            </div>
          </div>
          <div id="workLocation_note">
            <p>Note</p>
            <input type="text" name="applyNote"/>
          </div>
          <button id="work-from-location-btn" type="submit">Submit</button>
          `;

      workLocation_apply_view_container.appendChild(useForm);
      useForm.innerHTML = formContentHTML;

      const workLocation_startDate = document.getElementById("workLocation_startDate");
      const workLocation_endDate = document.getElementById("workLocation_endDate");

      workLocation_startDate.appendChild(startDatePickerInput.elementName);
      workLocation_endDate.appendChild(endDatePickerInput.elementName); 

      useForm.addEventListener("formSubmitted",(event)=>{
        const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=leaveapply`
        const formData = event.detail.formData;
        formData.applyType = "WFOL";
        formData.emCode = identity;
        formData.emName = emName;
        formData.applyReportingBoss = applyReportingBoss; 
      
      
        
      
        if(applyReportingBoss == "" || applyReportingBoss === null){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Reporting boss must not be empty!',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen'
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return null
        }else if(emName == "" || emName === null){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Employee must not be empty!',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen'
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return null
        } else if(identity == "" || identity === null){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Employee must not be empty!',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen'
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return null
        }
      
      
        // Initialize an empty object
        let formObject = {};
  
        // Iterate through the formData object and add key-value pairs to formObject
        for (let key in formData) {
         
          if (formData.hasOwnProperty(key)) {
            // formObject[key] = formData[key].toString();

            if (key === 'applyReason') { 
              // If the key is 'applyReason', concatenate 'applyNote' value to it
              formObject[key] = formData[key].toString() + '-' + formData.applyNote.toString();
            } else {
              formObject[key] = formData[key].toString();
            }
          }
        }


        // check if date is valid
        // Convert date strings to the format "yyyy-MM-dd" for parsing
        const fromFormatted = formObject.applyDateFrom.replace(/(\d{2})\/(\w{3})\/(\d{4})/, (match, day, month, year) => {
          return `${year}-${new Date(`${month} 1`).getMonth() + 1}-${day}`;
        });
        const toFormatted = formObject.applyDateTo.replace(/(\d{2})\/(\w{3})\/(\d{4})/, (match, day, month, year) => {
          return `${year}-${new Date(`${month} 1`).getMonth() + 1}-${day}`;
        });


        // Check if applyReason is undefined or null
        if (!formObject.applyReason) {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
              icon: "warning",
              title: 'Apply reason is required!',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              showCloseButton: true,
              customClass: {
                  popup: 'swal2-alert-custom-smallscreen',
                  confirmButton: 'swal2-confirm-custom',
              },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return; // Stop further execution to prevent the POST request
        }


        // ensure valid date range 
        const fromDate = new Date(fromFormatted);
        const toDate = new Date(toFormatted);
        if (fromDate > toDate) {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Invalid! Date range',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            showCloseButton: true,
            customClass: {
                popup: 'swal2-alert-custom-smallscreen',
                confirmButton: 'swal2-confirm-custom',
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return false; // Prevent further execution
        }


        const isValidDate = isFutureOrTodayDate(fromFormatted, toFormatted,'work_from_other_location');
        if (!isValidDate) {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: 'Date must be the within today <span style="color:red">10AM</span> or the future day!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            showCloseButton: true,
            customClass: {
                popup: 'swal2-alert-custom-smallscreen',
                confirmButton: 'swal2-confirm-custom',
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
          return;
        } 

        
        // Convert formObject to a JSON string
        var jsonString = JSON.stringify(formObject);

        // Create a new FormData object
        var form = new FormData();

        // Append the JSON string to the FormData object
        form.append("postData", jsonString);

       

        fetch(postUrl, {
          method: 'POST',
          body: form
          })
          .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data=>{
          
            if (data.status === true) {
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                  title: data.message,
                  icon: "success",
                  showCloseButton: true,
                  confirmButtonColor: "#3085d6",
                  showConfirmButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
              }).then(()=>{
                const radios = document.querySelectorAll('input[name="applyReason"]');
                  if(radios && radios.length > 0){
                    radios.forEach(radio => {
                      radio.checked = false;
                    });
                    radios[0].checked = true;
                  }
                  document.querySelector('input[name="applyNote"]').value = "";

                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            } else {
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
                Swal.fire({
                    icon: "warning",
                    title: "Not posted",
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });  
            }
          })
          .catch(error => {
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                customClass: {
                  popup: 'swal2-alert-custom-smallscreen'
                },
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          });

      })

    }else if(key === 'view'){
      const workLocation_apply_view_container = document.getElementById("workLocation_apply_view_container");
      workLocation_apply_view_container.innerHTML = "";

      const startDatePickerInput = handleDateAndTime('startDatePickerInput');
      const endDatePickerInput = handleDateAndTime('endDatePickerInput');


      const dateRange = `
        <div id="dateContainer">
          <div id="date_range">
            <span id="workLocation_startDate"></span>
            <span id="workLocation_endDate"></span>
            <span id="smbt"><button id="work-from-location-view-btn">OK</button></span>
          </div>
          <div id="selected_date">
            <label>Date :</label>
            <span>
              <p>${startDatePickerInput.elementName.value}</p>
              <p> - </p>
              <p>${endDatePickerInput.elementName.value}</p>
            </span>
          </div>
        </div>
      `;

      workLocation_apply_view_container.innerHTML = dateRange;
  
      const workLocation_startDate = document.getElementById("workLocation_startDate");
      const workLocation_endDate = document.getElementById("workLocation_endDate"); 
      
      workLocation_startDate.appendChild(startDatePickerInput.elementName);
      workLocation_endDate.appendChild(endDatePickerInput.elementName);

      const startDate_Input = document.getElementById("startDatePickerInput");
      const endDate_Input = document.getElementById("endDatePickerInput");

      smbt.addEventListener('click',async function(){
        const selected_date = document.getElementById("selected_date");
        const paragraphs = selected_date.querySelectorAll('p');
        
        paragraphs.forEach((element,index)=>{
          if(index === 0){
            element.textContent = startDate_Input.value
          }
          if(index === 2){
            element.textContent = endDate_Input.value
          }
        });


       await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFOL&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
        .then(data=>{
          workLocation_apply_view_container.appendChild(div);
          const work_location_status_view = document.getElementById('work_location_status_view');
          if(data && data.status === true){
            
            work_location_status_view.innerHTML = "";

            // Filter the array based on the divCode
            const filteredData = data.data.filter(workLocation => workLocation.divCode === identity && new Date(parseDate(workLocation.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(workLocation.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
            filteredData.forEach((workLocation,index)=>{
              const singleDiv = document.createElement("div");
              singleDiv.setAttribute('id','single_status')
              let temp = {};

              let atn = workLocation.divAtn;
              let divCode = workLocation.divCode;
              let em_code = identity;
              let divBoss = workLocation.divBoss;


              temp.Name = workLocation.divName;
              temp['Applied On'] = workLocation.divLADate;
              temp.From = `${workLocation.divStartDate} - ${workLocation.divEndDate}`;
              temp['Total Days'] = workLocation.divLDays;
              temp.Reason = workLocation.divReason;
              temp.Note = workLocation.divNote;
              temp.Status = workLocation.divStatus;


              for(let key in temp){
                const span = document.createElement('span');
                const label = document.createElement('label');
                const cancelBtn = document.createElement('button');
                cancelBtn.setAttribute('id','cancelAction');
                cancelBtn.onclick = function(){
                  actionFunc(atn,divCode,em_code,'Cancel');
                }
                cancelBtn.textContent = 'Cancel';

                const p = document.createElement('p');

                key === "Status" && temp[key] === 'Cancelled'?(
                  p.style.backgroundColor ='red', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Not Approved'?(
                  p.style.backgroundColor ='gray', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17x',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Checked'?(
                  p.style.backgroundColor ='green', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Approved'?(
                  p.style.backgroundColor ='green', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):"";

                label.textContent = key;
                p.textContent = temp[key];

                span.appendChild(label);
                span.appendChild(p);

                (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : "";

                singleDiv.appendChild(span);
              }

              work_location_status_view.appendChild(singleDiv);
            })
          }else if(data && data.status === false){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
              
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            work_location_status_view.innerHTML = "";
          }
        })
        .catch(error=>{
          // console.log(error)
        });
        
      });

      const div = document.createElement("div");
      div.setAttribute("id","work_location_status_view");
      workLocation_apply_view_container.appendChild(div);

      startDate_Input.value = getMonthsBackDate('Jan');
      const selected_date = document.getElementById("selected_date");
      const paragraphs = selected_date.querySelectorAll('p');

      paragraphs.forEach((element,index)=>{
        if(index === 0){
          element.textContent = startDate_Input.value
        }
        if(index === 2){
          element.textContent = endDate_Input.value
        }
      });

      await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFOL&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
        .then(data=>{
          
          const work_location_status_view = document.getElementById('work_location_status_view');
          if(data && data.status === true){
            work_location_status_view.innerHTML = "";

            // Filter the array based on the divCode
            const filteredData = data.data.filter(workLocation => workLocation.divCode === identity && new Date(parseDate(workLocation.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(workLocation.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
            filteredData.forEach((workLocation,index)=>{
              const singleDiv = document.createElement("div");
              singleDiv.setAttribute('id','single_status')
              let temp = {};

              let atn = workLocation.divAtn;
              let divCode = workLocation.divCode;
              let em_code = identity;
              let divBoss = workLocation.divBoss;


              temp.Name = workLocation.divName;
              temp['Applied On'] = workLocation.divLADate;
              temp.From = `${workLocation.divStartDate} - ${workLocation.divEndDate}`;
              temp['Total Days'] = workLocation.divLDays;
              temp.Reason = workLocation.divReason;
              temp.Note = workLocation.divNote;
              temp.Status = workLocation.divStatus;


              for(let key in temp){
                const span = document.createElement('span');
                const label = document.createElement('label');
                const cancelBtn = document.createElement('button');
                cancelBtn.setAttribute('id','cancelAction');
                cancelBtn.onclick = function(){
                  actionFunc(atn,divCode,em_code,'Cancel');
                }
                cancelBtn.textContent = 'Cancel';

                const p = document.createElement('p');

                key === "Status" && temp[key] === 'Cancelled'?(
                  p.style.backgroundColor ='red', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Not Approved'?(
                  p.style.backgroundColor ='gray', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17x',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Checked'?(
                  p.style.backgroundColor ='green', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):key === "Status" && temp[key] === 'Approved'?(
                  p.style.backgroundColor ='green', 
                  p.style.borderRadius='15px',
                  p.style.marginRight='5px',
                  p.style.paddingTop='2px',
                  p.style.paddingBottom='2px',
                  p.style.textAlign='center',
                  p.style.fontSize='17px',
                  p.style.color='white'
                ):"";

                label.textContent = key;
                p.textContent = temp[key];

                span.appendChild(label);
                span.appendChild(p);

                (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : "";

                singleDiv.appendChild(span);
              }

              work_location_status_view.appendChild(singleDiv);
            })
          
          }else if(data && data.status === false){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
              
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            work_location_status_view.innerHTML = "";
          }
        })
        .catch(error=>{
          // console.log(error)
        });

        async function actionFunc(atn,divCode,em_code,status){
          const url = `${rootWwwUrl}/xapi/dash_api.ashx?cmd=leavestatus&atn=${atn}&code=${divCode}&em_code=${em_code}&status=${status}`
          await fetchData(url)
              .then((data)=>{
                if(data && data.status === true){
                  document.getElementById('darkOverlay').style.display = 'block';
                  document.body.classList.add('transparent');
                  Swal.fire({
                    title: data.message,
                    icon: "success",
                    showCloseButton: true,
                    confirmButtonColor: "#3085d6",
                    showConfirmButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then(async (result)=>{
                  if(result.isConfirmed){
                    // const work_home_status_view = document.getElementById("work_home_status_view")
                    // work_home_status_view.innerHTML = "";
                    await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFOL&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
                    .then((data)=>{
                      const work_location_status_view = document.getElementById("work_location_status_view");
                      if(data && data.status === true){
                        work_location_status_view.innerHTML = "";

                        // Filter the array based on the divCode
                        const filteredData = data.data.filter(workLocation => workLocation.divCode === identity && new Date(parseDate(workLocation.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(workLocation.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
                        filteredData.forEach((workLocation,index)=>{
                          const singleDiv = document.createElement("div");
                          singleDiv.setAttribute('id','single_status')
                          let temp = {};

                          let atn = workLocation.divAtn;
                          let divCode = workLocation.divCode;
                          let em_code = identity;
                          let divBoss = workLocation.divBoss;


                          temp.Name = workLocation.divName;
                          temp['Applied On'] = workLocation.divLADate;
                          temp.From = `${workLocation.divStartDate} - ${workLocation.divEndDate}`;
                          temp['Total Days'] = workLocation.divLDays;
                          temp.Reason = workLocation.divReason;
                          temp.Note = workLocation.divNote;
                          temp.Status = workLocation.divStatus;


                          for(let key in temp){
                            const span = document.createElement('span');
                            const label = document.createElement('label');
                            const cancelBtn = document.createElement('button');
                            cancelBtn.setAttribute('id','cancelAction');
                            cancelBtn.onclick = function(){
                              actionFunc(atn,divCode,em_code,'Cancel');
                            }
                            cancelBtn.textContent = 'Cancel';

                            const p = document.createElement('p');

                            key === "Status" && temp[key] === 'Cancelled'?(
                              p.style.backgroundColor ='red', 
                              p.style.borderRadius='15px',
                              p.style.marginRight='5px',
                              p.style.paddingTop='2px',
                              p.style.paddingBottom='2px',
                              p.style.textAlign='center',
                              p.style.fontSize='17px',
                              p.style.color='white'
                            ):key === "Status" && temp[key] === 'Not Approved'?(
                              p.style.backgroundColor ='gray', 
                              p.style.borderRadius='15px',
                              p.style.marginRight='5px',
                              p.style.paddingTop='2px',
                              p.style.paddingBottom='2px',
                              p.style.textAlign='center',
                              p.style.fontSize='17x',
                              p.style.color='white'
                            ):key === "Status" && temp[key] === 'Checked'?(
                              p.style.backgroundColor ='green', 
                              p.style.borderRadius='15px',
                              p.style.marginRight='5px',
                              p.style.paddingTop='2px',
                              p.style.paddingBottom='2px',
                              p.style.textAlign='center',
                              p.style.fontSize='17px',
                              p.style.color='white'
                            ):key === "Status" && temp[key] === 'Approved'?(
                              p.style.backgroundColor ='green', 
                              p.style.borderRadius='15px',
                              p.style.marginRight='5px',
                              p.style.paddingTop='2px',
                              p.style.paddingBottom='2px',
                              p.style.textAlign='center',
                              p.style.fontSize='17px',
                              p.style.color='white'
                            ):"";

                            label.textContent = key;
                            p.textContent = temp[key];

                            span.appendChild(label);
                            span.appendChild(p);

                            (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : "";

                            singleDiv.appendChild(span);
                          }

                          work_location_status_view.appendChild(singleDiv);
                        })

                
                      }else if(data && data.status === false){
                        document.getElementById('darkOverlay').style.display = 'block';
                        document.body.classList.add('transparent');
                        Swal.fire({
                          icon: "warning",
                          // title: "Oops...",
                          text: "No data found!",
                          
                        }).then((result) => {
                          // Hide the overlay when alert is closed
                          document.getElementById('darkOverlay').style.display = 'none';
                          document.body.classList.remove('transparent'); // Remove class to allow scrolling
                        });
                        work_location_status_view.innerHTML = "";
                      }
                    })
                    .catch(error=>{
                      // console.log(error)
                    });
                  }
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                })
                }
              })
              .catch(error=>{
                // console.log(error);
              });
        }

    }else if(key === 'approval'){
      const workLocation_apply_view_container = document.getElementById("workLocation_apply_view_container");
      workLocation_apply_view_container.innerHTML = "";

      const selectStatus = `
        <label for="status">Status:</label>
        <i class="material-symbols-outlined" id="status_arrow_icon">
          arrow_drop_down
        </i>
        <select id="select_leave_status">
          <option value="Pending" selected>Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
        </select>
      `

      let selectedValue = "Pending"
      const select_status_div = document.createElement('div');
      select_status_div.setAttribute('id','select_status_div')
      select_status_div.innerHTML = selectStatus
      const startDatePickerInput = handleDateAndTime('startDatePickerInput');
      const endDatePickerInput = handleDateAndTime('endDatePickerInput');

      const dateRange = `
        <div id="dateContainer">
          <div id="date_range">
            <span id="workLocation_startDate"></span>
            <span id="workLocation_endDate"></span>
            <span id="smbt"><button id="work-from-location-view-btn">OK</button></span>
          </div>
          <div id="selected_date">
            <div>
              <label>Date :</label>
              <span>
                <p>${startDatePickerInput.elementName.value}</p>
                <p> - </p>
                <p>${endDatePickerInput.elementName.value}</p>
              </span>
            </div>
          </div>
        </div>
      `;


      workLocation_apply_view_container.innerHTML = dateRange;
  
      const workLocation_startDate = document.getElementById("workLocation_startDate");
      const workLocation_endDate = document.getElementById("workLocation_endDate"); 
      
      workLocation_startDate.appendChild(startDatePickerInput.elementName);
      workLocation_endDate.appendChild(endDatePickerInput.elementName);

      const startDate_Input = document.getElementById("startDatePickerInput");
      const endDate_Input = document.getElementById("endDatePickerInput");


      smbt.addEventListener('click',async function(){
        const selected_date = document.getElementById("selected_date");
        const paragraphs = selected_date.querySelectorAll('p');
        
        paragraphs.forEach((element,index)=>{
          if(index === 0){
            element.textContent = startDate_Input.value
          }
          if(index === 2){
            element.textContent = endDate_Input.value
          }
        });

       
       await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFOL&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
        .then(data=>{
         
          workLocation_apply_view_container.appendChild(div);
          const work_location_status_view = document.getElementById('work_location_status_view');
          
          if(data && data.status === true){
            work_location_status_view.innerHTML = "";

            
            // Filter the array based on divStatus
            const filteredData = data.data.filter(element =>element.divBoss === identity && (element.divStatus === selectedValue || element.divStatus === 'Checked') && new Date(parseDate(element.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(element.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
           
            if(filteredData.length > 0){
              filteredData.forEach((element,index)=>{
                const singleDiv = document.createElement("div");
                singleDiv.setAttribute('id','single_status')
                let temp = {};

                let atn = element.divAtn;
                let divCode = element.divCode;
                let em_code = identity;
                let divBoss = element.divBoss;


                temp.Name = element.divName;
                temp['Applied On'] = element.divLADate;
                temp.From = `${element.divStartDate} - ${element.divEndDate}`;
                temp['Total Days'] = element.divLDays;
                temp.Reason = element.divReason;
                temp.Note = element.divNote;
                temp.Status = element.divStatus;
                divBoss === identity ? temp.Boss = element.divBoss: "";
                // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;

                for(let key in temp){
                  
                  const span = document.createElement('span');
                  const bossSpan = document.createElement('span');
                  bossSpan.setAttribute('id','bossSpan');
                  const bossApprove = document.createElement('button');
                  bossApprove.textContent = 'Approve';
                  const bossNoApprove = document.createElement('button');
                  bossNoApprove.textContent = 'Not approve';

                  if(key === 'Status'){
                    span.setAttribute('id','work_location_status')
                  }
                  bossApprove.onclick = function(){
                    actionFunc(atn,divCode,em_code,'true');
                  }

                  bossNoApprove.onclick = function(){
                    actionFunc(atn,divCode,em_code,'false');
                  }

                  const label = document.createElement('label');
                  const p = document.createElement('p');
                  key === "Status" && temp[key] === 'Cancelled'?(
                    p.style.backgroundColor ='red', 
                    p.style.borderRadius='15px',
                    p.style.marginRight='5px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.textAlign='center',
                    p.style.color='white'
                  ):key === "Status" && temp[key] === 'Not Approved'?(
                    p.style.backgroundColor ='gray', 
                    p.style.borderRadius='15px',
                    p.style.marginRight='5px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.textAlign='center',
                    p.style.color='white'
                  ):key === "Status" && temp[key] === 'Checked'?(
                    p.style.backgroundColor ='green', 
                    p.style.borderRadius='15px',
                    p.style.marginRight='5px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.textAlign='center',
                    p.style.color='white'
                  ):key === "Status" && temp[key] === 'Pending'?(
                    p.style.backgroundColor ='green', 
                    p.style.borderRadius='15px',
                    p.style.marginRight='5px',
                    p.style.paddingTop='2px',
                    p.style.paddingBottom='2px',
                    p.style.textAlign='center',
                    p.style.color='white'
                  ):"";
                  label.textContent = key;
                  p.textContent = temp[key];
                  span.appendChild(label)
                  span.appendChild(p)

                  // (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
                  bossSpan.appendChild(bossApprove)
                  bossSpan.appendChild(bossNoApprove)

                  
                  singleDiv.appendChild(span);
                  key === 'Boss'  && selectedValue === 'Pending' ? singleDiv.appendChild(bossSpan) : "";
                }
              
                // divBoss === identity ? work_location_status_view.appendChild(singleDiv) : '';
                work_location_status_view.appendChild(singleDiv);
              })
            }else {
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({

                icon: "warning",
                // title: "Oops...",
                text: "No data found!",
                
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            }

         
          }else if(data && data.status === false){
            
            work_location_status_view.innerHTML = "";
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          }

          const singleStatusElements =(work_location_status_view.querySelectorAll('#single_status'))
          singleStatusElements.forEach(singleStatus =>{
            const targetSpan = singleStatus.querySelector('span#work_location_status');
            if (targetSpan) {
              targetSpan.style.cssText = `
                display:flex;flex-direction:row;gap:0
              `
              const targetSpan_p_tag = targetSpan.querySelector('p');
              if(targetSpan_p_tag.textContent === 'Pending'){
                targetSpan_p_tag.style.cssText =`
                  background-color:yellow;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                `
              } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                targetSpan_p_tag.style.cssText = `
                  background-color:red;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              } else if(targetSpan_p_tag.textContent === 'Approved'){
                targetSpan_p_tag.style.cssText = `
                  background-color:green;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              }else if(targetSpan_p_tag.textContent === 'Not Approved'){
                targetSpan_p_tag.style.cssText = `
                  background-color:gray;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              }
            }
          })

        })
        .catch(error=>{
          // console.log(error)
        });
      });

      const div = document.createElement("div");
      div.setAttribute("id","work_location_status_view");
      workLocation_apply_view_container.appendChild(div);

      startDate_Input.value = getMonthsBackDate(1)
      endDate_Input.value = getMonthsBackDate(1,'forward')
      const selected_date = document.getElementById("selected_date");
      const paragraphs = selected_date.querySelectorAll('p');
      paragraphs.forEach((element,index)=>{
        if(index === 0){
          element.textContent = startDate_Input.value
        }
        if(index === 2){
          element.textContent = endDate_Input.value
        }
      });
      selected_date.appendChild(select_status_div)
      selected_date.style.cssText =`display:flex;flex-direction:row-reverse;justify-content:space-between;align-items:center`;
    
      select_leave_status.addEventListener('change',(event)=>{
        selectedValue = event.target.value;
      });

      const work_location_status_view = document.getElementById('work_location_status_view');
      work_location_status_view.style.cssText = `padding-top:110px`;


      await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFOL&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
        .then(data=>{
          // console.log(data)
          const work_location_status_view = document.getElementById('work_location_status_view');
          if(data && data.status === true){
            work_location_status_view.innerHTML = "";

             // Filter the array based on divStatus
             const filteredData = data.data.filter(element =>element.divBoss === identity && (element.divStatus === 'Pending' || element.divStatus === 'Checked') && new Date(parseDate(element.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(element.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
             
             if(filteredData.length > 0){
                filteredData.forEach((element,index)=>{
                  const singleDiv = document.createElement("div");
                  singleDiv.setAttribute('id','single_status')
                  let temp = {};
    
                  let atn = element.divAtn;
                  let divCode = element.divCode;
                  let em_code = identity;
                  let divBoss = element.divBoss;
    
    
                  temp.Name = element.divName;
                  temp['Applied On'] = element.divLADate;
                  temp.From = `${element.divStartDate} - ${element.divEndDate}`;
                  temp['Total Days'] = element.divLDays;
                  temp.Reason = element.divReason;
                  temp.Note = element.divNote;
                  temp.Status = element.divStatus;
                  divBoss === identity ? temp.Boss = element.divBoss: "";
                  // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;
    
                  for(let key in temp){
                    
                    const span = document.createElement('span');
                    const bossSpan = document.createElement('span');
                    bossSpan.setAttribute('id','bossSpan');
                    const bossApprove = document.createElement('button');
                    bossApprove.textContent = 'Approve';
                    const bossNoApprove = document.createElement('button');
                    bossNoApprove.textContent = 'Not approve';
    
                    if(key === 'Status'){
                      span.setAttribute('id','work_location_status')
                    }
                    bossApprove.onclick = function(){
                      actionFunc(atn,divCode,em_code,'true');
                    }
    
                    bossNoApprove.onclick = function(){
                      actionFunc(atn,divCode,em_code,'false');
                    }
    
                    const label = document.createElement('label');
                    const p = document.createElement('p');
                    key === "Status" && temp[key] === 'Cancelled'?(
                      p.style.backgroundColor ='red', 
                      p.style.borderRadius='15px',
                      p.style.marginRight='5px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.textAlign='center',
                      p.style.color='white'
                    ):key === "Status" && temp[key] === 'Not Approved'?(
                      p.style.backgroundColor ='gray', 
                      p.style.borderRadius='15px',
                      p.style.marginRight='5px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.textAlign='center',
                      p.style.color='white'
                    ):key === "Status" && temp[key] === 'Checked'?(
                      p.style.backgroundColor ='green', 
                      p.style.borderRadius='15px',
                      p.style.marginRight='5px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.textAlign='center',
                      p.style.color='white'
                    ):key === "Status" && temp[key] === 'Pending'?(
                      p.style.backgroundColor ='green', 
                      p.style.borderRadius='15px',
                      p.style.marginRight='5px',
                      p.style.paddingTop='2px',
                      p.style.paddingBottom='2px',
                      p.style.textAlign='center',
                      p.style.color='white'
                    ):"";
                    label.textContent = key;
                    p.textContent = temp[key];
                    span.appendChild(label)
                    span.appendChild(p)
    
                    // (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
                    bossSpan.appendChild(bossApprove)
                    bossSpan.appendChild(bossNoApprove)
    
                    
                    singleDiv.appendChild(span);
                    key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
                  }
                
                  // divBoss === identity ? work_location_status_view.appendChild(singleDiv) : '';
                  work_location_status_view.appendChild(singleDiv);
                })
             }else{
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "No data found!",
                
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
             }
           
          }else if(data && data.status === false){
            
            work_location_status_view.innerHTML = "";
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          }

          const singleStatusElements =(work_location_status_view.querySelectorAll('#single_status'))
          singleStatusElements.forEach(singleStatus =>{
            const targetSpan = singleStatus.querySelector('span#work_location_status');
            if (targetSpan) {
              targetSpan.style.cssText = `
                display:flex;flex-direction:row;gap:0
              `
              const targetSpan_p_tag = targetSpan.querySelector('p');
              if(targetSpan_p_tag.textContent === 'Pending'){
                targetSpan_p_tag.style.cssText =`
                  background-color:yellow;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                `
              } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                targetSpan_p_tag.style.cssText = `
                  background-color:red;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              } else if(targetSpan_p_tag.textContent === 'Approved'){
                targetSpan_p_tag.style.cssText = `
                  background-color:green;
                  width:fit-content;               
                  padding:2px 10px;               
                  border-radius:25px;
                  color:white;
                `
              }
            }
          })
        })
        .catch(error=>{
          // console.log(error)
        });

     
        async function actionFunc(atn,divCode,em_code,status){
          const url = `${rootWwwUrl}/xapi/dash_api.ashx?cmd=leavestatus&atn=${atn}&code=${divCode}&em_code=${em_code}&status=${status}`
          await fetchData(url)
              .then((data)=>{
                if(data && data.status === true){
                  document.getElementById('darkOverlay').style.display = 'block';
                  document.body.classList.add('transparent');
                  Swal.fire({
                    title: data.message,
                    icon: "success",
                    showCloseButton: true,
                    confirmButtonColor: "#3085d6",
                    showConfirmButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then(async (result)=>{
                  if(result.isConfirmed){
                    // const work_location_status_view = document.getElementById("work_location_status_view")
                    // work_location_status_view.innerHTML = "";
                    await fetchData(`${rootUrl}/xapi/dash_api.ashx?cmd=leavelistNew&tp=WFH&dt1=${startDate_Input.value}&dt2=${endDate_Input.value}&emc=${identity}`)
                    .then((data)=>{
                      const work_location_status_view = document.getElementById("work_location_status_view");
                      if(data && data.status === true){
                        work_location_status_view.innerHTML = "";

                        // Filter the array based on divStatus
                        const filteredData = data.data.filter(element =>element.divBoss === identity && (element.divStatus === 'Pending' || element.divStatus === 'Checked') && new Date(parseDate(element.divStartDate)) >= new Date(parseDate(startDate_Input.value)) && new Date(parseDate(element.divStartDate)) <= new Date(parseDate(endDate_Input.value)));
            
                        if(filteredData.length > 0){
                          filteredData.forEach((element,index)=>{
                            const singleDiv = document.createElement("div");
                            singleDiv.setAttribute('id','single_status')
                            let temp = {};
            
                            let atn = element.divAtn;
                            let divCode = element.divCode;
                            let em_code = identity;
                            let divBoss = element.divBoss;
            
            
                            temp.Name = element.divName;
                            temp['Applied On'] = element.divLADate;
                            temp.From = `${element.divStartDate} - ${element.divEndDate}`;
                            temp['Total Days'] = element.divLDays;
                            temp.Reason = element.divReason;
                            temp.Note = element.divNote;
                            temp.Status = element.divStatus;
                            divBoss === identity ? temp.Boss = element.divBoss: "";
                            // divBoss === identity ? temp.Boss = element.divBoss:temp.Boss = element.divBoss;
            
                            for(let key in temp){
                              const span = document.createElement('span');
                              const bossSpan = document.createElement('span');
                              bossSpan.setAttribute('id','bossSpan');
                              const bossApprove = document.createElement('button');
                              bossApprove.textContent = 'Approve';
                              const bossNoApprove = document.createElement('button');
                              bossNoApprove.textContent = 'Not approve';
            
                              if(key === 'Status'){
                                span.setAttribute('id','work_location_status')
                              }
                              bossApprove.onclick = function(){
                                actionFunc(atn,divCode,em_code,'true');
                              }
            
                              bossNoApprove.onclick = function(){
                                actionFunc(atn,divCode,em_code,'false');
                              }    
                              const label = document.createElement('label');
                              const p = document.createElement('p');
                              key === "Status" && temp[key] === 'Cancelled'?(
                                p.style.backgroundColor ='red', 
                                p.style.borderRadius='15px',
                                p.style.marginRight='5px',
                                p.style.paddingTop='2px',
                                p.style.paddingBottom='2px',
                                p.style.textAlign='center',
                                p.style.color='white'
                              ):key === "Status" && temp[key] === 'Not Approved'?(
                                p.style.backgroundColor ='gray', 
                                p.style.borderRadius='15px',
                                p.style.marginRight='5px',
                                p.style.paddingTop='2px',
                                p.style.paddingBottom='2px',
                                p.style.textAlign='center',
                                p.style.color='white'
                              ):key === "Status" && temp[key] === 'Checked'?(
                                p.style.backgroundColor ='green', 
                                p.style.borderRadius='15px',
                                p.style.marginRight='5px',
                                p.style.paddingTop='2px',
                                p.style.paddingBottom='2px',
                                p.style.textAlign='center',
                                p.style.color='white'
                              ):"";
                              label.textContent = key;
                              p.textContent = temp[key];
                              span.appendChild(label)
                              span.appendChild(p)
            
                              // (temp[key] === 'Pending' || temp[key] === 'Checked') && divCode === identity ? span.appendChild(cancelBtn) : ""
                              bossSpan.appendChild(bossApprove)
                              bossSpan.appendChild(bossNoApprove)
            
                              
                              singleDiv.appendChild(span);
                              key === 'Boss' ? singleDiv.appendChild(bossSpan) : "";
                            }
                          
                            // divBoss === identity ? work_location_status_view.appendChild(singleDiv) : '';
                            work_location_status_view.appendChild(singleDiv);
                          })
                        }

                       

                      }else if(data && data.status === false){
                        
                        work_location_status_view.innerHTML = "";
                      }
                    })
                    .catch(error=>{
                      // console.log(error)
                    });
                  }
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                })
                }else if(data && data.status === false){
                  document.getElementById('darkOverlay').style.display = 'block';
                  document.body.classList.add('transparent');
                  Swal.fire({
                    icon: "warning",
                    // title: "Oops...",
                    text: "No data found!",
                    
                  }).then((result) => {
                    // Hide the overlay when alert is closed
                    document.getElementById('darkOverlay').style.display = 'none';
                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                  });
                }

                const singleStatusElements =(work_location_status_view.querySelectorAll('#single_status'))
                singleStatusElements.forEach(singleStatus =>{
                  const targetSpan = singleStatus.querySelector('span#work_location_status');
                  if (targetSpan) {
                    targetSpan.style.cssText = `
                      display:flex;flex-direction:row;gap:0
                    `
                    const targetSpan_p_tag = targetSpan.querySelector('p');
                    if(targetSpan_p_tag.textContent === 'Pending'){
                      targetSpan_p_tag.style.cssText =`
                        background-color:yellow;
                        width:fit-content;               
                        padding:2px 10px;               
                        border-radius:25px;
                      `
                    } else if(targetSpan_p_tag.textContent === 'Cancelled'){
                      targetSpan_p_tag.style.cssText = `
                        background-color:red;
                        width:fit-content;               
                        padding:2px 10px;               
                        border-radius:25px;
                        color:white;
                      `
                    } else if(targetSpan_p_tag.textContent === 'Approved'){
                      targetSpan_p_tag.style.cssText = `
                        background-color:green;
                        width:fit-content;               
                        padding:2px 10px;               
                        border-radius:25px;
                        color:white;
                      `
                    }
                  }
                })
              })
              .catch(error=>{
                // console.log(error);
              });
        }

    }

  });

  buttonContainer.appendChild(buttons);

  // hrmActivityMain.style.paddingTop = '100px'
  // hrmActivityMain.style.marginTop = '200px'
}

async function workFromHomeStatus(){
  let date;
  
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";

  container.innerHTML = `
   <div id="work_from_home_status" class="work_from_home_status">
    <div id="workHome_date_btn">
    <button id="work_home_btn">OK</button>
    </div>
    <div id="workHome_status">
    </div>
   </div>
  `;
  const currentTime = handleDateAndTime("startDatePickerInput");
  const time = document.getElementById('workHome_date_btn');
  time.appendChild(currentTime.elementName);

  const startDatePickerInput = document.getElementById('startDatePickerInput');

  date = startDatePickerInput.value;
  
  const workHome_status = document.getElementById("workHome_status");

  await fetchData(`${rootWwwUrl}/xapi/kapi.ashx?type=get_wfh_rng&dt=${date}`)
    .then((data)=>{
      workHome_status.innerHTML ="";
      
      data.status === true && Object.keys(data.Data[0]).length > 0 && data.Data.forEach((element,index)=>{
          const root_div = document.createElement("div");
          root_div.setAttribute('id',"ind_div")
          const connect_div = document.createElement('div');
          const left_span = document.createElement("span");
          const right_span = document.createElement("span");
          const img = document.createElement('img');

          
          const com = communicationBtn(element.phn,element.email);
          connect_div.innerHTML = com;
          
          let string = [];
        
          string.push(element.em_name,element.em_desi,element.em_org,element.em_dep,{'From':`${element.f_dt} - ${element.t_dt}`},{'Total Day' : element.l_days},{"Status" : element.em_status},{'Purpose' :element.l_purpose})
          

          root_div.appendChild(left_span);
          root_div.appendChild(right_span);
          
          img.setAttribute('src',element.em_img);
          img.setAttribute('width',"100px");
          img.setAttribute('height',"100px");

          string.forEach((element,index)=>{
            const p = document.createElement('p');
            
            if(typeof element === 'string'){
              p.textContent = element;
              right_span.appendChild(p)
            }else if(typeof element === 'object'){
              
              p.textContent = `${Object.keys(element)} : ${element[Object.keys(element)]}`
              
              right_span.appendChild(p)
            }
          })

          left_span.appendChild(img);
          left_span.appendChild(connect_div);
          workHome_status.appendChild(root_div);
      })
    })
    .catch(error=>{
      // console.log(error)
    });


  // "work_home_btn" button click event handler
  work_home_btn.addEventListener("click",async function(){
    date = startDatePickerInput.value;

    await fetchData(`${rootWwwUrl}/xapi/kapi.ashx?type=get_wfh_rng&dt=${date}`)
    .then((data)=>{
      workHome_status.innerHTML ="";
      data.status === true && Object.keys(data.Data[0]).length > 0 &&  data.Data.forEach((element,index)=>{
        const root_div = document.createElement("div");
        root_div.setAttribute('id',"ind_div")
        const connect_div = document.createElement('div');
        const left_span = document.createElement("span");
        const right_span = document.createElement("span");
        const img = document.createElement('img');

        
        const com = communicationBtn(element.phn,element.email);
        connect_div.innerHTML = com;
        
        let string = [];
        string.push(element.em_name,element.em_desi,element.em_org,element.em_dep,{'From':`${element.f_dt} - ${element.t_dt}`},{'Total Day' : element.l_days},{"Status" : element.em_status},{'Purpose' :element.l_purpose})


        root_div.appendChild(left_span);
        root_div.appendChild(right_span);
        
        img.setAttribute('src',element.em_img);
        img.setAttribute('width',"100px");
        img.setAttribute('height',"100px");

        string.forEach((element,index)=>{
          const p = document.createElement('p');
          
          if(typeof element === 'string'){
            p.textContent = element;
            right_span.appendChild(p)
          }else if(typeof element === 'object'){
            
            p.textContent = `${Object.keys(element)} : ${element[Object.keys(element)]}`
            
            right_span.appendChild(p)
          }
        })

        left_span.appendChild(img);
        left_span.appendChild(connect_div);
        workHome_status.appendChild(root_div);
      })
    })
    .catch(error=>{
      // console.log(error)
    });
  });

 
  
}

async function workFromOtherLocationStatus() {
  let date;
  
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";

  container.innerHTML = `
   <div id="work_from_location_status" class="work_from_location_status">
    <div id="workLocation_date_btn">
    <button id="work_location_btn">OK</button>
    </div>
    <div id="workLocation_status">
    </div>
   </div>
  `;

  const currentTime = handleDateAndTime("startDatePickerInput");
  const time = document.getElementById('workLocation_date_btn');
  time.appendChild(currentTime.elementName);

  const startDatePickerInput = document.getElementById('startDatePickerInput');

 
  
  const workLocation_status = document.getElementById("workLocation_status");

 
  await fetchData(`${rootWwwUrl}/xapi/kapi.ashx?type=get_wfol_rng&dt=${startDatePickerInput.value}`)
    .then((data)=>{
      workLocation_status.innerHTML = "";
      data.status === true && Object.keys(data.Data[0]).length > 0 && data.Data.forEach((element,index)=>{
          const root_div = document.createElement("div");
          root_div.setAttribute('id',"ind_div")
          const connect_div = document.createElement('div');
          const left_span = document.createElement("span");
          const right_span = document.createElement("span");
          const img = document.createElement('img');

          
          const com = communicationBtn(element.phn,element.email);
          connect_div.innerHTML = com;
          
          let string = [];

          string.push(element.em_name,element.em_desi,element.em_org,element.em_dep,{'From':`${element.f_dt} - ${element.t_dt}`},{'Total Day' : element.l_days},{"Status" : element.em_status},{'Purpose' :element.l_purpose})
          

          root_div.appendChild(left_span);
          root_div.appendChild(right_span);
          
          img.setAttribute('src',element.em_img);
          img.setAttribute('width',"100px");
          img.setAttribute('height',"100px");

          string.forEach((element,index)=>{
            const p = document.createElement('p');
            
            if(typeof element === 'string'){
              p.textContent = element;
              right_span.appendChild(p)
            }else if(typeof element === 'object'){
              
              p.textContent = `${Object.keys(element)} : ${element[Object.keys(element)]}`
              
              right_span.appendChild(p)
            }
          })

          left_span.appendChild(img);
          left_span.appendChild(connect_div);
          workLocation_status.appendChild(root_div);
      })
    })
    .catch((error)=>{
      // console.log(error)
    })

  
    work_location_btn.addEventListener("click",async function(){
      await fetchData(`${rootWwwUrl}/xapi/kapi.ashx?type=get_wfol_rng&dt=${startDatePickerInput.value}`)
      .then((data)=>{
        workLocation_status.innerHTML = "";
        data.status === true && Object.keys(data.Data[0]).length > 0 && data.Data.forEach((element,index)=>{
            const root_div = document.createElement("div");
            root_div.setAttribute('id',"ind_div")
            const connect_div = document.createElement('div');
            const left_span = document.createElement("span");
            const right_span = document.createElement("span");
            const img = document.createElement('img');

            
            const com = communicationBtn(element.phn,element.email);
            connect_div.innerHTML = com;
            
            let string = [];

            string.push(element.em_name,element.em_desi,element.em_org,element.em_dep,{'From':`${element.f_dt} - ${element.t_dt}`},{'Total Day' : element.l_days},{"Status" : element.em_status},{'Purpose' :element.l_purpose})
            

            root_div.appendChild(left_span);
            root_div.appendChild(right_span);
            
            img.setAttribute('src',element.em_img);
            img.setAttribute('width',"100px");
            img.setAttribute('height',"100px");

            string.forEach((element,index)=>{
              const p = document.createElement('p');
              
              if(typeof element === 'string'){
                p.textContent = element;
                right_span.appendChild(p)
              }else if(typeof element === 'object'){
                
                p.textContent = `${Object.keys(element)} : ${element[Object.keys(element)]}`
                
                right_span.appendChild(p)
              }
            })

            left_span.appendChild(img);
            left_span.appendChild(connect_div);
            workLocation_status.appendChild(root_div);
        })
      })
      .catch((error)=>{
        // console.log(error)
      })
  
    });
}

async function showProvident(){
  const url = `${rootWwwUrl}/xapi/Sapi.ashx?type=get_pf_data&id=${identity}`

  let tBody = [];
  const hrmActivityTop = document.getElementById("hrmActivityTop");
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = ""; 

  
  container.innerHTML =`
    <div id="provident_container">
      <div id="provident_status">
        <span>
          <label>Own Contribution : </label>
          <p id="self">0</p>
        </span>
        <span>
          <label>Company Contribution : </label>
          <p id="comp">0</p>
        </span>
        <span>
          <label>Total Amount: </label>
          <p id="gTotal">0</p>
        </span>
      </div>

      <div id="prodivent_detalis">
         
        <div id="provident_table"></div>
      </div>
      <div id="provident_footer">
        <span>
          <label>Total</label>
          <p id="footer_total">0</p>
        </span>
      </div>
    </div>
  `

  const provident_table = document.getElementById("provident_table");
  const provident_container = document.getElementById("provident_container");
  const topHrmHeight = hrmActivityTop.offsetHeight; 
  const viewportHeightPx = window.innerHeight;
  const topChildHeightVh = (topHrmHeight / viewportHeightPx) * 100; // convert height px to vh;

  provident_container.style.height = `calc(100vh - ${topChildHeightVh}vh)`;


  await fetchData(url)
  .then((data)=>{
    if(data && data.status === false ){
      
    }else if(data && data.status === true ){
      
      data.Data.map((element,index)=>{
        
        const self = document.getElementById("self");
        const comp = document.getElementById('comp');
        const gTotal = document.getElementById('gTotal');
        const footer_total = document.getElementById("footer_total");
        
        self.textContent = CurrStrView(Number(element.Total_Self));
        comp.textContent = CurrStrView(Number(element.Total_Com));
        gTotal.textContent = CurrStrView(Number(element.Total_Self) + Number(element.Total_Com));
        footer_total.textContent = CurrStrView(Number(element.Total_Self) + Number(element.Total_Com));

        element.list.forEach((listElement,index)=>{
          listElement.Taka = CurrStrView(listElement.Taka)
          tBody.push(listElement);
        })
      })
    }
  })
  .catch(error=>{
    // console.log(error)
  });

  const table = createTable('',["SN","Date","Taka"],tBody,'pf_table',true);
  provident_table.append(table);

  const theadHeightPx = table.querySelector('thead').offsetHeight;
  const provident_container_height = provident_container.offsetHeight;
  const provident_status_height = provident_status.offsetHeight;
  const provident_footer_height = provident_footer.offsetHeight
  
  table.querySelector('tbody').style.height = `${provident_container_height - (provident_status_height + provident_footer_height + theadHeightPx + 10)}px`;
  table.querySelector('tbody').style.top = `${30}px`
  
}

function makeTable(array){
  const table = document.createElement("table");
  const tableHeaderRow = document.createElement("tr");
  tableHeaderRow.setAttribute("id","table_header_title");
  const tableHeaderColumns = array;

  tableHeaderColumns.forEach(columnText => {
    const th = document.createElement("th");
    th.textContent = columnText;
    tableHeaderRow.appendChild(th);
  });

  table.appendChild(tableHeaderRow);
  return table
}

async function mandatoryScheme(){
  let tBody = [];
  let installTotal = 0;
  const table = makeTable(["SN","Date","Taka"]);
  
  const hrmActivityTop = document.getElementById("hrmActivityTop");
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = ""; 
 
  container.innerHTML =`
    <div id="scheme_container">
      <div id="scheme_status">
        <span>
          <label >Own Contribution : </label>
          <p id="self">0</p>
        </span>
        <span>
          <label >Company Contribution : </label>
          <p id="comp">0</p>
        </span>
        <span>
          <label >Total Amount: </label>
          <p id="grandTotal">0</p>
        </span>
      </div>

      <div id="scheme_detalis">
        <div id="scheme_table"></div>
      </div>
      <div id="scheme_footer">
        <span>
          <label>Total</label>
          <p id="installmentTotal">0</p>
        </span>
      </div>
    </div>
  `
  const scheme_table = document.getElementById("scheme_table");
  const scheme_container = document.getElementById("scheme_container");
  const topHrmHeight = hrmActivityTop.offsetHeight; 
  const viewportHeightPx = window.innerHeight;
  const topChildHeightVh = (topHrmHeight / viewportHeightPx) * 100; // convert height px to vh;

  scheme_container.style.height = `calc(100vh - ${topChildHeightVh}vh)`;
  

 await fetch(`${rootWwwUrl}/xapi/Sapi.ashx?type=get_mss_data&id=${identity}`)
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.json();
  })
  .then(data => {
   
    if(data.status === false || data.message == "No Data" || data.Data.length <= 0){
      
    } else if(data.status === true || data.Data.length > 0){
      data.Data.map((element,index)=>{
        const self = document.getElementById("self");
        const comp = document.getElementById("comp");
        const installmentTotal = document.getElementById('installmentTotal');
        const grandTotal = document.getElementById('grandTotal');

        self.textContent = CurrStrView(Number(element.Total_Self));
        comp.textContent = CurrStrView(Number(element.Total_Com));
       
        grandTotal.textContent = CurrStrView(Number(element.Total_Self) + Number(element.Total_Com));
      
        element.list.map((listElement,index)=>{
         
          tBody.push(listElement);
          
          installTotal += listElement.Taka;
        })
        installmentTotal.textContent = CurrStrView(Number(installTotal));
      })
    }
       
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
 
  const mssTable = createTable('',["SN","Date","Taka"],tBody,'m_scheme_attrib',true);
  scheme_table.append(mssTable);

  const theadHeightPx = mssTable.querySelector('thead').offsetHeight;
  const scheme_container_height = scheme_container.offsetHeight;
  const scheme_status_height = scheme_status.offsetHeight;
  const scheme_footer_height = scheme_footer.offsetHeight
  
  
  mssTable.querySelector('tbody').style.height = `${scheme_container_height - (scheme_status_height + scheme_footer_height + theadHeightPx + 10)}px`;

  mssTable.querySelector('tbody').style.top = `${30}px`
}

function loanApplication(){
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";

  container.innerHTML =`
    <div id="loan_container">
      <div id="button_container">
        <button class="active">apply</button>
        <button>status</button>
      </div>
      <div id="loan_apply_status_container"></div>
    </div>
  `
  const buttonContainer = document.getElementById('button_container');
  const buttons = buttonContainer.querySelectorAll('button');

  const apply_btn =`<button id="apply_new_loan_btn">+ Apply For New Loan</button>`
  const loan_apply_content =`
      <button id="backBtn">< Back</button>
      <div id="current_status"></div>
      <div id="new_loan"></div>
      <div id="loan_purpose"></div>
      <div id="loan_terms_conditions"></div>
      <div id="loan_agreement"></div>
      <button type="submit" id="submit">Apply</button>
    `  
    // Define function to handle the "apply" button click event
    
    function handleApplyButtonClick() {
      const loan_apply_status_container = document.getElementById("loan_apply_status_container");
      loan_apply_status_container.innerHTML = ""; // Clear container

      // Populate container with apply button content
      loan_apply_status_container.innerHTML = apply_btn;

      // Add event listener for apply new loan button
      const apply_new_loan_btn = document.getElementById("apply_new_loan_btn");
      apply_new_loan_btn.addEventListener('click', handleApplyNewLoanButtonClick);
    }
 
    // Define function to handle the "apply new loan" button click event
    function handleApplyNewLoanButtonClick() {
      const loan_apply_status_container = document.getElementById("loan_apply_status_container");
      loan_apply_status_container.innerHTML = loan_apply_content; // Show loan apply content

      // Add event listener for back button
      const backBtn = document.getElementById('backBtn');
      
      backBtn.addEventListener('click', handleBackButtonClick);
    }

    function handleBackButtonClick() {
      const loan_apply_status_container = document.getElementById("loan_apply_status_container");
      loan_apply_status_container.innerHTML = apply_btn; // Show apply button content

      // Add event listener for apply new loan button
      const apply_new_loan_btn = document.getElementById("apply_new_loan_btn");
      apply_new_loan_btn.addEventListener('click', handleApplyNewLoanButtonClick);

      // Remove event listener for back button
      const backBtn = document.getElementById('backBtn');
      // backBtn.removeEventListener('click',handleBackButtonClick)

    }

    buttons.forEach(button => {  
      button.addEventListener('click', function () {
          // Remove 'active' class from all buttons
          buttons.forEach(btn => btn.classList.remove('active'));
          // Add 'active' class to the clicked button
          this.classList.add('active');

          // Check if the clicked button is the "apply" button
          if (this.textContent === 'apply') {
              handleApplyButtonClick();
          } else if (this.textContent === 'status') {
              const loan_apply_status_container = document.getElementById("loan_apply_status_container");
              loan_apply_status_container.innerHTML = ""; // Clear container
          }
      });
    });

    handleApplyButtonClick();
}

function loanApply(){
  const container = document.getElementById("hrmActivityMain");
  container.innerHTML = "";

  const apply_btn =`<button id="apply_new_loan_btn" onclick="new_loan_btn()" class="active">+ Apply For New Loan</button>`
  container.innerHTML =`
    <div id="loan_container">
      <div id="button_container">
        <button class="active">apply</button>
        <button>status</button>
      </div>
      <div id="loan_apply_status_container"></div>
    </div>
  `

  const buttonContainer = document.getElementById('button_container');
  const buttons = buttonContainer.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click',function(){
      // Remove 'active' class from all buttons
      buttons.forEach(btn => btn.classList.remove('active'));
      // Add 'active' class to the clicked button
      this.classList.add('active');
      
      // Check which button is active
      if (this.classList.contains('active') && this.textContent === 'apply') {
        back_btn()
      } else if ( this.classList.contains('active') && this.textContent === 'status') { 
        const loan_apply_status_container = document.getElementById('loan_apply_status_container')
        loan_apply_status_container.innerHTML = '';
      }
    })
  })
    back_btn()
}

function applyForLoan(){
  // window.location.href = `https://ctgshop.com/erp/webview/loanapp.html?id=${identity}`

  
  const url = `https://ctgshop.com/erp/webview/loanapp.html?id=${identity}`;
  const hrmActivityMain = document.getElementById('hrmActivityMain');

    // Create an iframe element
    const iframe = document.createElement('iframe');
    const windowHeight = window.innerHeight;
    // Set attributes for the iframe
    iframe.src = url;
    iframe.width = '100%'; // Set width to 100% of the parent div
    iframe.height = `${ windowHeight - (document.getElementById('hrmActivityTop').offsetHeight + 25)}px`; // Set height as needed
    // iframe.height = `'600px'`; // Set height as needed
    iframe.frameBorder = '0'; // Remove the border (optional)
    iframe.allowFullscreen = true; // Allow fullscreen (optional)
    
    // Optionally, clear any existing content in the div
    hrmActivityMain.innerHTML = '';

    // Append the iframe to the hrmActivityMain div
    hrmActivityMain.appendChild(iframe);

    
    
}

function new_loan_btn(){
    const useForm = handleForm('','loan_apply_form');

    const loan_apply_status_container = document.getElementById('loan_apply_status_container')
    loan_apply_status_container.innerHTML = '';
    const apply_container = document.createElement('div')
    apply_container.setAttribute('id',"apply_contanier")
    const back_btn = `
    <button id="back_btn" onclick="back_btn()">< Back</button>
    <div id="current_status">
    <p class="title">Current status:</p>
      <span><label>Present Salary</label> <p>26000</p></span>
      <span><label>Present PF Balancd</label> <p>38700</p></span>
      <span><label>Present Loan balance</label> <p>0</p></span>
      
      <span><label>Last Loan Date</label> <p>01/Aug/2018</p></span>
      <span><label>Last Loan Amount</label> <p>20000</p></span>
      <span><label>Last Loan Installment</label> <p></p></span>
    </div>
    <div id="new_loan">
    <p class="title">New Loan:</p>
      <span>
        <label>Loan Request</label>
        <input name="request" type="number"/>
      </span>
      <span>
        <label>Monthly Installment</label>
        <input name="installment" type="number"/>
      </span>
      <span>
        <label>Purpose of Loan</label>
        <textarea type="text" name="purpose"></textarea>
      </span>
    </div>
    <div id="terms">
      <h3 class="title">Terms & Conditions:</h3>
      <div id="terms-details">
        <span>
        <label>1.</label>
        <p>The lender will lend and The Borrower acknowledges that he/she have received, the sum
          borrowed under this Loan, that is the Total Amount of Loan by the repayment set out in the
          Loan Detail above
        </p>
        </span>
        <span>
          <label>2.</label>
          <p>The borrower has the right to settle this Agreement early, at any time.
        </p>
        </span>
        <span>
            <label>3.</label>
            <p>The Borrower should acknowledge that his/her employment be terminated for any reason. In
            that case he/she will repay the balance amount at that time in full before he/she will 
            release from the company
          </p>
        </span>
        <span>
            <label>4.</label>
            <p>
            The Lender may take necessary legal action if he/she fails to repay the Total Amount of Loan.
          </p>
        </span>
        <span>
          <label>5.</label>
          <p>
            The Borrower should submit a security cheque to The Lender consists the amount equal to the
            Total amount of loan under this loan agreement.
          </p>
        </span>
      </div>
    </div>
    <span id="term_agree">
    <input type="checkbox" name="agree" id="myCheckbox"> 
    <p>I agree with the Terms & Conditions</p>
    </span>
    <button id="submit_btn" type="submit">Apply</button>
    `
    apply_container.innerHTML = back_btn 
    const new_loan = apply_container.querySelector('#new_loan')
    const terms = apply_container.querySelector('#terms')
    const term_agree = apply_container.querySelector('#term_agree')
    const submit_btn = apply_container.querySelector('#submit_btn')

    useForm.appendChild(new_loan)
    useForm.appendChild(terms)
    useForm.appendChild(term_agree)
    useForm.appendChild(submit_btn)
    apply_container.appendChild(useForm)
    loan_apply_status_container.appendChild(apply_container)


    useForm.addEventListener('formSubmitted', (event) => {
      const formData = event.detail.formData;
     
      // Process form data as needed
      // For example, you can send it to a server or manipulate it further
    });
}

function back_btn(){
  const loan_apply_status_container = document.getElementById('loan_apply_status_container')
    loan_apply_status_container.innerHTML = '';
    const apply_btn =`
    <button id="apply_new_loan_btn" onclick="new_loan_btn()" class="active">+ Apply For New Loan</button>`
    const btn_container = document.createElement('div')
    btn_container.setAttribute('id',"btn_container")
    btn_container.innerHTML = apply_btn
    loan_apply_status_container.appendChild(btn_container)
}

async function loanStatus(){
  // BR-0199-14
  // "BR-0052-10" - razon shaha
  const container = document.getElementById("hrmActivityMain");
  
  container.innerHTML = "";

  let tBody = [];
  container.innerHTML =`
  <div id="loan_container" class="loan_container">
    <div id="button_container" class="button_container">
      <button class="active">Loan Status</button>
      <button>Installments</button>
    </div>
    <div id="loan_current_status_container" class="loan_current_status_container"></div>
  </div>
`

  
  const buttonContainer = document.getElementById('button_container');
  const loan_current_status_container = document.getElementById("loan_current_status_container");
  
  //on button click events
  buttonContainer.addEventListener('click', async function(event) {
    const clickedButton = event.target;
    const isActive = clickedButton.classList.contains('active');

    // Update button classes
    if (!isActive) {
        // Remove 'active' class from all buttons
        buttonContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        clickedButton.classList.add('active');
    }

     if(clickedButton.classList[0] == 'active' && clickedButton.textContent === 'Loan Status'){
      loan_current_status_container.innerHTML = ""; 
      loan_current_status_container.appendChild(createLoanStatusElement());

      const approved_loan_table = document.getElementById("approved_loan_table");
      await fetchData(`${rootWwwUrl}/xapi/Sapi.ashx?type=get_loan_data&id=${identity}`)
        .then((data)=>{
          // const approved_loan_table = document.getElementById("approved_loan_table");
          
          if(data && data.status === true){
            // approved_loan_status_tables.innerHTML = "";
            
              data.Data.forEach((element,index)=>{
              const tLoan = document.getElementById("tLoan").querySelector('p');
              const rLoan = document.getElementById("rLoan").querySelector('p');
              const aLoan = document.getElementById("aLoan").querySelector('p');
              const bLoan = document.getElementById("bLoan").querySelector('p');
              
              tLoan.textContent = CurrStrView(Number(element.Balance));
              rLoan.textContent = CurrStrView(Number(element.Recovery));
              aLoan.textContent = CurrStrView(Number(element.Adjustment));
              bLoan.textContent = CurrStrView(Number(element.Balance) - ( Number(element.Recovery) + Number(element.Adjustment)));
              tBody = [];
              element.OldData.forEach((oldElement,index)=>{

                // Find the positions of the parentheses
                const startIndex = oldElement.ln_date.indexOf('(') + 1;
                const endIndex = oldElement.ln_date.indexOf(')');

                // Extract the substring between the parentheses
                const timestamp = oldElement.ln_date.substring(startIndex, endIndex);
                
                // Convert the timestamp to a Date object
                const date = new Date(Number(timestamp));

                // Extract date and time components
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Months are zero-based, so add 1
                const day = date.getDate();
              // Format the date and time
                const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;

                oldElement.ln_date = formattedDate
                
                // console.log(oldElement,formattedDate,oldElement.ln_date,match);
                oldElement.ln_amount = CurrStrView(oldElement.ln_amount);
                tBody.push(oldElement)
              });
            });
             
          }else if(data && data.status === false){
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
              
            });
          }
          
        })
        .catch(error=>{
          // console.log(error)
        })

      approved_loan_table.appendChild(createTable('',["SN","Date","Money"],tBody,'approved_loan_status_tables',true));


      const loan_container_height = loan_container.offsetHeight;
      const button_container_height = button_container.offsetHeight;
      const loan_status_height = loan_status.offsetHeight;

      loan_current_status_container.style.position = `fixed`;
      loan_current_status_container.style.top = `${button_container_height + hrmActivityTop.offsetHeight + 5}px`;

      approved_loan_status_tables.style.height = `${loan_container_height - (button_container_height + loan_status_height + 50)}px`;
      approved_loan_status_tables.querySelector('tbody').style.height = `${approved_loan_status_tables.offsetHeight - (approved_loan_status_tables.querySelector('thead').offsetHeight + 20)}px`;
      approved_loan_status_tables.querySelector('tbody').style.top = `${ document.getElementById('loan_status').offsetHeight + document.getElementById('button_container').offsetHeight + approved_loan_status_tables.querySelector('thead').offsetHeight}px`

     } else if(clickedButton.classList[0] == 'active' && clickedButton.textContent === 'Installments'){
        const start_date = handleDateAndTime('startDates','2008-01-01'); // '2008-01-01' ==> year-month-day
        const end_date = handleDateAndTime('endDates');
        let tBody =[];
        loan_current_status_container.innerHTML = "";

        loan_current_status_container.appendChild(installments());

       

        date_range.appendChild(start_date.elementName);
        date_range.appendChild(end_date.elementName);

        const date_range_btn = document.createElement('button');
        date_range_btn.setAttribute('id','loan_install_btn');
        date_range_btn.textContent = 'OK';
        date_range.appendChild(date_range_btn);
        


        const installment_table = document.getElementById("installment_table");

        // installment_table.appendChild(makeTable(["Sn","Payment Date","Amount Paid"]));
        installment_table.appendChild(createTable('',["Sn","Payment Date","Amount Paid"],tBody,'loan_installmens_view',true));
        const loan_install_btn = document.getElementById("loan_install_btn");

        const startDates = document.getElementById("startDates");
        const endDates = document.getElementById("endDates");

        loan_install_btn.addEventListener('click',async function(e){
          await fetchData(`${rootWwwUrl}/xapi/Sapi.ashx?type=get_loan_installments_list&id=${identity}&sd=${startDates.value}&ed=${endDates.value}`)
          .then((data)=>{
          
            tBody = [];
            if(data && data.status === true){
              data.Data.forEach((installment,index)=>{
                const dateString = installment.em_date;

                // Find the positions of the parentheses
                const startIndex = dateString.indexOf('(') + 1;
                const endIndex = dateString.indexOf(')');

                // Extract the substring between the parentheses
                const timestamp = dateString.substring(startIndex, endIndex);

                
                // Convert the timestamp to a Date object
                const date = new Date(Number(timestamp));
                
                // Extract date and time components
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Months are zero-based, so add 1
                const day = date.getDate();

                // Format the date and time
                const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;


                installment.em_date = formattedDate;
              
                installment.em_dedLo = CurrStrView(installment.em_dedLo);
                tBody.push(installment)
              })
            }else if(data && data.status === false){
              Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "No data found!",
                
              });
            }
            installment_table.innerHTML = "";
            installment_table.appendChild(createTable('',["Sn","Payment Date","Amount Paid"],tBody,'loan_installmens_view',true));
          })
          .catch(error=>{
            // console.log(error)
          });

          const loan_container_height = loan_container.offsetHeight;
          const button_container_height = button_container.offsetHeight;
          const date_range_height = date_range.offsetHeight;
          loan_installmens_view.style.height = `${loan_container_height - (button_container_height + date_range_height + 40) }px`;
          loan_installmens_view.style.top = `${button_container_height + date_range_height + document.getElementById('hrmActivityTop').offsetHeight + 21}px`
          
          
          
          const tbodyElement = loan_installmens_view.querySelector('tbody');
          if (tbodyElement) {
              const table_height = loan_installmens_view.offsetHeight;
              const table_header_height = loan_installmens_view.querySelector('thead').offsetHeight

              tbodyElement.style.display = 'block'; // Set display to block to allow height change
              tbodyElement.style.height = `${table_height - (table_header_height + 50)}px`
          }
        });



        await fetchData(`${rootWwwUrl}/xapi/Sapi.ashx?type=get_loan_installments_list&id=${identity}&sd=${startDates.value}&ed=${endDates.value}`)
        .then((data)=>{
          tBody = [];
          if(data && data.status === true){
            data.Data.forEach((installment,index)=>{
              const dateString = installment.em_date;

              // Find the positions of the parentheses
              const startIndex = dateString.indexOf('(') + 1;
              const endIndex = dateString.indexOf(')');

              // Extract the substring between the parentheses
              const timestamp = dateString.substring(startIndex, endIndex);

              
              // Convert the timestamp to a Date object
              const date = new Date(Number(timestamp));
              
              // Extract date and time components
              const year = date.getFullYear();
              const month = date.getMonth() + 1; // Months are zero-based, so add 1
              const day = date.getDate();

              // Format the date and time
              const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;


              installment.em_date = formattedDate;
            
              installment.em_dedLo = CurrStrView(installment.em_dedLo);
              tBody.push(installment)
            })
          }else if(data && data.status === false){
            Swal.fire({
              icon: "warning",
              // title: "Oops...",
              text: "No data found!",
              
            });
          }
          installment_table.innerHTML = "";
          installment_table.appendChild(createTable('',["Sn","Payment Date","Amount Paid"],tBody,'loan_installmens_view',true));
         
        })
        .catch(error=>{
          // console.log(error)
        });


        const loan_container_height = loan_container.offsetHeight;
        const button_container_height = button_container.offsetHeight;
        const date_range_height = date_range.offsetHeight;
        loan_installmens_view.style.height = `${loan_container_height - (button_container_height + date_range_height + 40) }px`;
        loan_installmens_view.style.top = `${button_container_height + date_range_height  + document.getElementById('hrmActivityTop').offsetHeight + 21}px`
        
        
        
        const tbodyElement = loan_installmens_view.querySelector('tbody');
        console.log(tbodyElement)
        if (tbodyElement) {
          
            const table_height = loan_installmens_view.offsetHeight;
            const table_header_height = loan_installmens_view.querySelector('thead').offsetHeight

            tbodyElement.style.display = 'block'; // Set display to block to allow height change
            tbodyElement.style.height = `${table_height - (table_header_height + 50)}px`

            const heightVh = vhToPx(100);

            tbodyElement.style.height = `${(heightVh - (document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('button_container').offsetHeight + document.getElementById('date_range').offsetHeight + table_header_height + document.getElementById('loan_installments').querySelector('p').offsetHeight + 22))}px`
    

        }

     } 
  });


  
  // on page load events
  const activeButton =buttonContainer.querySelector('button.active');
  if (activeButton !== null && activeButton.classList[0] === 'active' && activeButton.textContent === 'Loan Status') {
    loan_current_status_container.innerHTML = ""; 
    loan_current_status_container.appendChild(createLoanStatusElement());
  } 

  const approved_loan_table = document.getElementById("approved_loan_table");

  await fetchData(`${rootWwwUrl}/xapi/Sapi.ashx?type=get_loan_data&id=${identity}`)
    .then((data,index)=>{
      // const approved_loan_table = document.getElementById("approved_loan_table");
      
      if(data && data.status === true){
        // approved_loan_status_tables.innerHTML = "";
          
          data.Data.forEach((element,index)=>{
          const tLoan = document.getElementById("tLoan").querySelector('p');
          const rLoan = document.getElementById("rLoan").querySelector('p');
          const aLoan = document.getElementById("aLoan").querySelector('p');
          const bLoan = document.getElementById("bLoan").querySelector('p');

          tLoan.textContent = CurrStrView(Number(element.Balance));
          rLoan.textContent = CurrStrView(Number(element.Recovery));
          aLoan.textContent = CurrStrView(Number(element.Adjustment));
          bLoan.textContent = CurrStrView(Number(element.Balance) - ( Number(element.Recovery) + Number(element.Adjustment * -1)));
          tBody = [];
          element.OldData.forEach((oldElement,index)=>{

            // Find the positions of the parentheses
            const startIndex = oldElement.ln_date.indexOf('(') + 1;
            const endIndex = oldElement.ln_date.indexOf(')');

            // Extract the substring between the parentheses
            const timestamp = oldElement.ln_date.substring(startIndex, endIndex);
            
            // Convert the timestamp to a Date object
            const date = new Date(Number(timestamp));

            // Extract date and time components
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are zero-based, so add 1
            const day = date.getDate();
           // Format the date and time
           const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;

            oldElement.ln_date = formattedDate;
            // console.log(oldElement,formattedDate,oldElement.ln_date,match);
            oldElement.ln_amount = CurrStrView(oldElement.ln_amount);
            tBody.push(oldElement);
          });
        });         
      }else if(data && data.status === false){
        Swal.fire({
          icon: "warning",
          // title: "Oops...",
          text: "No data found!",
          
        });
      }
      
    })
    .catch(error=>{
      // console.log(error)
    });

    approved_loan_table.appendChild(createTable('',["SN","Date","Money"],tBody,'approved_loan_status_tables',true));
    
    


    const loan_container_height = loan_container.offsetHeight;
    const button_container_height = button_container.offsetHeight;
    const loan_status_height = loan_status.offsetHeight;

    loan_current_status_container.style.position = `fixed`;
    loan_current_status_container.style.top = `${button_container_height + hrmActivityTop.offsetHeight + 5}px`;

    approved_loan_status_tables.style.height = `${loan_container_height - (button_container_height + loan_status_height + 50)}px`;
    const heightVh = vhToPx(100)
    approved_loan_status_tables.querySelector('tbody').style.height = `${heightVh - (document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('button_container').offsetHeight + document.getElementById('loan_status').offsetHeight + approved_loan_status_tables.querySelector('thead').offsetHeight + document.getElementById('approved_loan').querySelector('p').offsetHeight + 20)}px`;
    approved_loan_status_tables.querySelector('tbody').style.top = `${ document.getElementById('loan_status').offsetHeight + document.getElementById('button_container').offsetHeight + approved_loan_status_tables.querySelector('thead').offsetHeight}px`
    buttonContainer.style.top = `${document.getElementById('hrmActivityTop').offsetHeight}px`

    
}

function createLoanStatusElement() {
  const loanStatusElement = document.createElement('div');
  loanStatusElement.setAttribute("id","loan_status_approved")
  loanStatusElement.innerHTML = `
      <div id="loan_status">
          <span id="tLoan"><label>Total Loan Taken</label> <p>0</p></span>
          <span id="rLoan"><label>Recovered</label> <p>0</p></span>
          <span id="aLoan"><label>Adjustment</label> <p>0</p></span>
          <span id="bLoan"><label>Loan Balance</label> <p>0</p></span>
      </div>
      <div id="approved_loan">
          <p>Approved Loan: </p> 
          <div id="approved_loan_table">

          </div>
      </div>
  `;
  return loanStatusElement;
}

function installments(){
  const loanInstallmentsElement = document.createElement('div');
  loanInstallmentsElement.setAttribute("id","loan_installments")
 
  loanInstallmentsElement.innerHTML=`
    <p>Loan Installments</p>
    <div id="date_range">
      
    </div>
    <div id="installment_table"></div>
  `;

  return loanInstallmentsElement
}

function liveRosterDuty(){
        const container = document.getElementById("hrmActivityMain");
        container.innerHTML = "";

        // Create and configure the iframe element
        const iframe = document.createElement("iframe");
        iframe.id = "webview";
        iframe.src = `https://ctgshop.com/erp/webview/roster.html?id=${identity}`;


        // Create a new div element for error message
        const errorDiv = document.createElement("div");
        errorDiv.id = "error-message";
        errorDiv.textContent = "Webpage not available";

        // Append the iframe to the container
        container.appendChild(iframe);



        // Handle iframe loading errors
        iframe.onerror = function() {
            showErrorMessage();
        };

        window.addEventListener('error', function(event) {
            if (event.target.tagName === 'IFRAME') {
                showErrorMessage();
            }
        }, true);

        function showErrorMessage() {
            container.innerHTML = ""; // Clear the existing content
            container.appendChild(errorDiv); // Append the error message
        }

        iframe.onload = function() {
          try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
          
            if (iframeDocument) {
              // Start lazy loading images inside the iframe
              lazyLoadImages(iframeDocument);

              // Try using MutationObserver to check for content dynamically added to #empList
              const observer = new MutationObserver(() => {
                const empList = iframeDocument.querySelector("#empList");
                if (empList && empList.querySelectorAll('img').length > 0) {
                  // Content is loaded, now we can apply the lazy loading logic
                  const imgTags = empList.querySelectorAll('img');
                  
                  imgTags.forEach(img => {
                    const src = img.getAttribute('src');
                   
                    img.classList.add('lazy');
                    img.setAttribute('data-src', src);
                    img.setAttribute('src','https://ctgshop.com/xapp/assets/images/default.png')
                    
                  });
  
                  // Trigger lazy loading for images
                  lazyLoadImages(iframeDocument);

                  // Stop observing once images are processed
                  observer.disconnect();
                }
              });
          
              // Start observing the changes in the #empList element
              observer.observe(iframeDocument.body, {
                childList: true, // Watch for added or removed children
                subtree: true,   // Watch for changes in all descendants
              });
          
              
            }
          } catch (error) {
            console.error("Error accessing iframe content: ", error);
            showErrorMessage(); // In case of an error, display the error message
          }
         

          
        };
        

        
       
}


function noticeBoard(){ 
      //  window.location.href = `https://ctgshop.com/xapp/pages/Notice.html?class_name=noticeMain&data_title=Notice%20Board`;
      const url = `https://ctgshop.com/xapp/pages/Notice.html?class_name=noticeMain&data_title=Notice%20Board`;
      // Create an iframe element
      const iframe = document.createElement('iframe');
      const windowHeight = window.innerHeight;
      // Set attributes for the iframe
      iframe.src = url;
      iframe.width = '100%'; // Set width to 100% of the parent div
      iframe.height = `${ windowHeight - (document.getElementById('hrmActivityTop').offsetHeight + 25)}px`; // Set height as needed
      // iframe.height = `'600px'`; // Set height as needed
      iframe.frameBorder = '0'; // Remove the border (optional)
      iframe.allowFullscreen = true; // Allow fullscreen (optional)

      const hrmActivityMain = document.getElementById('hrmActivityMain');

      // Optionally, clear any existing content in the div
      hrmActivityMain.innerHTML = '';

      // Append the iframe to the hrmActivityMain div
      hrmActivityMain.appendChild(iframe);

      
      // Wait for the iframe to load
      iframe.onload = function() {
        // Access the iframe's content
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        // Find the element with id noticeTop
        const noticeTopElement = iframeDocument.getElementById('noticeTop');
        if (noticeTopElement) {
            // Get the height of noticeTopElement before hiding it
            const noticeTopHeight = noticeTopElement.offsetHeight;

            // Hide the noticeTopElement
            noticeTopElement.remove();

            // Find the element with id noticeMain and adjust its margin
            const noticeMainElement = iframeDocument.getElementById('noticeMain');
            if (noticeMainElement) {
                // Set margin-top to noticeTopHeight and other margins as needed
                noticeMainElement.style.cssText = `margin: ${noticeTopElement.offsetHeight}px auto 2px;`;
            }
        }

      };
}


function accountsCall(){

  // window.location.href = `https://ctgshop.com/xapp/pages/Accounts.html?class_name=accountsMain&data_title=accounts&identity=${identity}`;
  
}

function manageContacts(path, classInfo, dataTitle) {
  let loading = false
  window.showLoadingOverlay = function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex'; // Show the loading overlay
    }
    document.body.style.pointerEvents = 'none';
};
  
  function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none'; // Hide the loading overlay
    }
  
    // Enable interaction with the main page
    document.body.style.pointerEvents = 'auto';
    loading = false; // Reset the loading state
  }


  const url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}&identity=${encodeURIComponent(identity)}&name=${encodeURIComponent(emName)}&boss=${encodeURIComponent(applyReportingBoss)}&bossName=${encodeURIComponent(reportingBossName)}`;

  const hrmActivityMain = document.getElementById('hrmActivityMain');
  
  // Check if an iframe already exists, if so, remove it
  const existingIframe = hrmActivityMain.querySelector('iframe');
  if (existingIframe) {
    hrmActivityMain.removeChild(existingIframe);
  }


  // Create a new iframe element
  const iframe = document.createElement('iframe');
  const windowHeight = window.innerHeight;

  // Set attributes for the iframe
  iframe.src = url;
  iframe.width = '100%';
  iframe.height = `${windowHeight - (document.getElementById('hrmActivityTop').offsetHeight + 25)}px`; 
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;
  
  // Clear any existing content in hrmActivityMain
  hrmActivityMain.innerHTML = '';

  // Append the new iframe
  hrmActivityMain.appendChild(iframe);

  // Create the loading overlay div
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'loadingOverlay';
  loadingOverlay.style.display = 'none';  // Initially hidden
  loadingOverlay.innerHTML = `
    <div class="loader"></div>
  `;


  // Append the loading overlay to hrmActivityMain
  hrmActivityMain.appendChild(loadingOverlay);

  // Create a style tag for the CSS
  const style = document.createElement('style');
  style.innerHTML = `
    #loadingOverlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .loader {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  // Append the style tag to the document head
  document.head.appendChild(style);


  // Wait for the iframe to load
  iframe.onload = function() {
    hideLoadingOverlay();

    const hrmTop = document.getElementById('hrmActivityTop');
    const hrmMain = document.getElementById('hrmActivityMain');

    if (hrmTop) hrmTop.remove();

    hrmMain.style.cssText = 'padding-top: 0px; margin-top: 0px';
    iframe.style.height = '100vh'; // Ensure the iframe takes up 100% of viewport height

    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    if(iframeDocument){
      iframeDocument.body.style.cssText = `
        color: black;
        margin: 0;
        padding: 0;
        height:100vh;
        width:100vw;
      `

      const sectionContainer = iframeDocument.querySelector('.section-container');
      if(sectionContainer){
        sectionContainer.style.cssText = `
          display: flex;
          flex-direction: column;
          
          height: 100vh;
          width: 99vw;
          margin: auto;
          padding:0;
        `

        const contactTop = sectionContainer.querySelectorAll('.contactTop')
        if(contactTop){
          contactTop.forEach((contact)=>{
            const contacts = contact.querySelectorAll('.filter-container')
            console.log(contact)
          })
        }
      }



      const overlay = iframeDocument.querySelector('#overlay')
      console.log(overlay)
    }



    // Function to set up the back button and filter button event listeners
    const setupButtons = () => {
        // Set up back button
        let button = iframeDocument.getElementsByClassName('contact_back_btn')[0];
        if (button) {
            button.removeAttribute('onclick');
            button.setAttribute('onclick', `redirectToHrm()`);
        }

        // Set up filter buttons
        let newButtons = [...iframeDocument.getElementsByClassName('filterBtn')];
        newButtons.forEach((button) => {
            button.removeEventListener('click', handleFilterButtonClick); // Remove existing listener to avoid duplicates
            button.addEventListener('click', handleFilterButtonClick);
        });
    };

    // Filter button click handler
    const handleFilterButtonClick = () => {
       
        setupButtons(); // Re-setup buttons for subsequent clicks
    };

    // Set up MutationObserver to watch for changes
    const observer = new MutationObserver(() => {
        setupButtons(); // Call setupButtons whenever a mutation is observed
    });

    // Start observing the document for changes
    observer.observe(iframeDocument, { childList: true, subtree: true });

    // Initial setup of buttons
    setupButtons();

    // Define the redirectToHrm function inside the iframe
    const script = iframeDocument.createElement('script');
    script.textContent = `
        function redirectToHrm() {
            parent.loading = true;  // Set loading to true in the parent
           

            if (typeof parent.showLoadingOverlay === 'function') {
                parent.showLoadingOverlay();  // Call the loading overlay function
            } else {
                console.error('showLoadingOverlay is not a function in parent'); // Error log
            }
            parent.hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}', '${emName}', '${applyReportingBoss}', '${reportingBossName}');
        }
    `;
    iframeDocument.body.appendChild(script);
  };


  iframe.addEventListener("load", function() {
    setTimeout(() => {
      
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  
      if (iframeDocument) {
        
        const filterContainer = iframeDocument.querySelector(".filter-container");
        if (filterContainer) {
          const filterButtons = filterContainer.querySelectorAll(".filterBtn button");
  
          filterButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
             
              const onclickValue = event.target.closest("button").getAttribute("onclick");
              // Remove onclick and parse the type manually if needed
             
              // Use regex to extract the argument inside handleFilterItem("...").
              const filterTypeMatch = onclickValue.match(/handleFilterItem\("([^"]+)"\)/);
              const filterType = filterTypeMatch ? filterTypeMatch[1] : null;

              if (filterType) {
                
                handleFilterItem(filterType); 
              } else {
                console.error("Failed to parse filter type");
              }
            });
          });
  
          // console.log("Filter buttons ready:", filterButtons);
        }
      }
    }, 100); // Adjust the delay as needed
  });

 
  function handleFilterItem(filterType) {
    console.log("Filter type clicked:", filterType);
    // Perform your filtering logic here based on filterType
  }


  document.getElementsByClassName('section-container')[0].style.cssText = `
    display: flex;
    flex-direction: column;
    margin:0 auto;
    height: 100vh !important;
    padding:0;

    position:fixed;
    left:0;
    right:0;
    top:0;
  `

}


function manageContact(){
  const contact_url = `${rootWwwUrl}/xapi/dash_api.ashx?cmd=emp&list=all&imei=70:3a:51:90:39:05`;
  
  fetch(contact_url)
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
         
          
          manageShowContact(data.data,'')
      }
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
}

function manageShowContact(filterData,classHint){
  const hrmActivityMain = document.getElementById("hrmActivityMain");
  const hrmActivityTop = document.getElementById('hrmActivityTop');

  hrmActivityMain.innerHTML = ""
  hrmActivityMain.innerHTML = `
    <section id="contactTop" class="contactTop">
      <div class="search-container">
            <div id="inputSpace">
                <input type="text" id="searchInput" placeholder="Search by Name or Mobile">
            </div>
            <div id="searchBtn">
                <button id="empSearchButton">
                    <i class="fa fa-search" style="font-size:26px"></i>
                </button>
            </div>
            
            
        </div>
        <div class="filter-container">
           ${filterTitle.map((item) =>`
                <div id="filterBtn" class="filterBtn">
                    <button  onclick='handleFilterItem(${JSON.stringify(Object.values(item)[0]).trim()})'>
                        <h1>${Object.keys(item)}</h1>
                        <label>${Object.values(item)}</label>
                    </button>
                </div>
            `).join('')}
            <div id="filterBtn" class="filterBtn">
                <button  onclick='handleFilterItem("single-column")'>
                    <i class="fa-solid fa-list" aria-hidden="true" style="font-size: 30px; color: black;"></i>
                </button>
            </div>
            <div id="filterBtn" class="filterBtn">
                <button  onclick='handleFilterItem("double-column")'>
                    <i class="fa-solid fa-bars" aria-hidden="true" style="font-size: 30px; color: black;"></i>
                </button>
            </div>
        </div>
    </section>
    <section id="contactsMain" class="contactsMain">
    </section>
  `
 

  document.getElementById('contactTop').style.cssText = `
    top:${hrmActivityTop.offsetHeight}px !important;
  `

  document.getElementById('contact_overlay').style.cssText =`
    padding-top:15px;
    background-color: rgb(19, 86, 195);;
    display:none;
    flex-direction:column;

    position: fixed;
    left: 0;
    right: 0;
    top: ${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('contactTop').offsetHeight}px;
  `


  document.getElementById('contact_overlay').querySelector('#contact_overlay_id').style.cssText =`
    top:${hrmActivityTop.offsetHeight + document.getElementById('contactTop').offsetHeight}px!important;
  `
  manageEmployeeDataShow(filterData,classHint)
  lazyLoadImages();
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

async function otpManageFunc() {
  // let tBody = [];
  // const url = `https://www.befreshbd.com/ZaraApi.ashx?type=get_login_otp&emp=${identity}`;
  // fetchData(url)
  // .then((data)=>{
  //   if(data && data.status === true){
  //     data.Data.forEach((element,index)=>{      
  //       let obj ={
  //         'OTP Generate Time':element['OTP Generate Time'],
  //         'OTP Module':element['OTP Module'],
  //          OTP:element['OTP']
  //       }
  //       tBody.push(obj)
  //     })
  //     createOtpTable(tBody,true);
  //     document.getElementById('refreshBtn') ? document.getElementById('refreshBtn').addEventListener('click',()=>{
  //         console.log('button refreshed')
  //     }) : ""
  //     document.getElementById('copyBtn') ? document.getElementById('copyBtn').addEventListener('click',()=>{
  //       console.log('copied')
  //     }) : ""
  //   }else if(data && Object.keys((data.Data)[0]).length <= 0 && data.status === false){

   // const headerData = ['OTP Generate Time','OTP Module','OTP'];
      // const table = createTable('X-App OTP',headerData,tBody,'otpTable',false,null);
      // const hrmActivityMain = document.getElementById('hrmActivityMain');
      // const topSpan = document.createElement('span');
      // topSpan.setAttribute('id','otpTop');
      // topSpan.classList.add('otpTop');
      // topSpan.innerHTML = `
      //   <button class="refreshBtn" id="refreshBtn">Refresh</button>
      //   <button class="copyBtn" id="copyBtn">Copy</button>
      // `
      // hrmActivityMain.appendChild(topSpan)
      // hrmActivityMain.appendChild(table);


  //     createOtpTable(tBody,false);
  //     document.getElementById('refreshBtn') ? document.getElementById('refreshBtn').addEventListener('click',()=>{
  //       console.log('button refreshed')
  //     }) : ""
  //     Swal.fire({
  //       icon: "info",
  //       text: "Data not found",
  //       confirmButtonText: "Ok",
  //     });

  //   }
  // }).catch((error)=>{
  //   Swal.fire({
  //     icon: "info",
  //     text: error,
  //     confirmButtonText: "Ok",
  //   });
  // });


  try {
    let tBody = [];
    let copy_btn_status = false;

    // Fetch OTP data function
    async function loadOtpData() {
        const fetch_otp = await fetchOtp(identity);
        if (fetch_otp && fetch_otp.status === true) {
            tBody = fetch_otp.Data.map((element) => ({
                'OTP Generate Time': element['OTP Generate Time'],
                'OTP Module': element['OTP Module'],
                'OTP': element['OTP']
            }));
            copy_btn_status = true;
        } else if(fetch_otp && Object.keys((fetch_otp.Data)[0]).length <= 0 && fetch_otp.status === false) {
            tBody = [];
            copy_btn_status = false;
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                icon: "info",
                text: "Data not found",
                confirmButtonText: "Ok",
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
        }
        createOtpTable(tBody, copy_btn_status);
    }

    // Create table and set up buttons
    function createOtpTable(tBody, copy_btn_status) {
        // Clear previous content
        const hrmActivityMain = document.getElementById('hrmActivityMain');
        hrmActivityMain.innerHTML = "";

        // Create table and top span with buttons
        const table = createTable('X-App OTP', ['OTP Generate Time', 'OTP Module', 'OTP'], tBody, 'otpTable', false, null);
        const topSpan = document.createElement('span');
        topSpan.setAttribute('id', 'otpTop');
        topSpan.classList.add('otpTop');
        topSpan.innerHTML = `
            <button class="refreshBtn" id="refreshBtn">Refresh</button>
            <button class="copyBtn" id="copyBtn">Copy OTP</button>
        `;

        // Append elements to the main container
        hrmActivityMain.appendChild(topSpan);
        hrmActivityMain.appendChild(table);

        // Set up event listeners for new buttons
        document.getElementById('refreshBtn').addEventListener('click', async () => {
            await loadOtpData(); // Reload data and refresh table
            
        });

        if (copy_btn_status) {
            document.getElementById('copyBtn').addEventListener('click', () => {
              const otpValues = tBody.map(row => row.OTP).join('\n');
                
              navigator.clipboard.writeText(otpValues).then(()=>{
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "success",
                  text: "OTP(s) copied to clipboard!",
                  confirmButtonText: "Ok",
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
              }).catch(err=>{
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                    icon: "error",
                    text: "Failed to copy OTP(s) to clipboard",
                    confirmButtonText: "Ok",
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              })
            });
        }
    }

    // Initial load of OTP data
    await loadOtpData();

  } catch (error) {
      document.getElementById('darkOverlay').style.display = 'block';
      document.body.classList.add('transparent');
      Swal.fire({
          icon: "info",
          text: error.message || "An error occurred",
          confirmButtonText: "Ok",
      }).then((result) => {
        // Hide the overlay when alert is closed
        document.getElementById('darkOverlay').style.display = 'none';
        document.body.classList.remove('transparent'); // Remove class to allow scrolling
      });
  }



  // try {
  //   let tBody = [];
  //   let copy_btn_status = false
    

  //   const fetch_otp = await fetchOtp(identity)
  //   if(fetch_otp && fetch_otp.status === true){
  //     fetch_otp.Data.forEach((element,index)=>{
  //       let obj ={
  //         'OTP Generate Time':element['OTP Generate Time'],
  //         'OTP Module':element['OTP Module'],
  //          OTP:element['OTP']
  //       }
  //       tBody.push(obj)
  //     });
  //     copy_btn_status = true
  //     createOtpTable(tBody,copy_btn_status);
  //   }else if(fetch_otp && Object.keys((fetch_otp.Data)[0]).length <= 0 && fetch_otp.status === false){
  //     copy_btn_status = false
  //     createOtpTable(tBody,copy_btn_status);
  //     Swal.fire({
  //       icon: "info",
  //       text: "Data not found",
  //       confirmButtonText: "Ok",
  //     });
  //   }

  //   document.getElementById('refreshBtn') ? document.getElementById('refreshBtn').addEventListener('click',()=>{
  //     document.getElementById('hrmActivityMain').innerHTML = ""
  //     tBody = []
  //     copy_btn_status = false
  //     if(fetch_otp && fetch_otp.status === true){
  //       fetch_otp.Data.forEach((element,index)=>{
  //         let obj ={
  //           'OTP Generate Time':element['OTP Generate Time'],
  //           'OTP Module':element['OTP Module'],
  //            OTP:element['OTP']
  //         }
  //         tBody.push(obj)
  //       });
  //       copy_btn_status = true
  //       createOtpTable(tBody,copy_btn_status);
  //     }else if(fetch_otp && Object.keys((fetch_otp.Data)[0]).length <= 0 && fetch_otp.status === false){
  //       copy_btn_status = false
  //       createOtpTable(tBody,copy_btn_status);
  //       Swal.fire({
  //         icon: "info",
  //         text: "Data not found",
  //         confirmButtonText: "Ok",
  //       });
  //     }

  //     console.log(tBody,copy_btn_status)
  //   }) : ""
  //   document.getElementById('copyBtn') && copy_btn_status === true ? document.getElementById('copyBtn').addEventListener('click',()=>{
  //     console.log('copied')
  //   }) : ""


  // } catch (error) {
  //   Swal.fire({
  //     icon: "info",
  //     text: error,
  //     confirmButtonText: "Ok",
  //   });
  // }



}

function createOtpTable(tBody,boolVal) {
  const headerData = ['OTP Generate Time', 'OTP Module', 'OTP'];
  
  const table = createTable('X-App OTP', headerData, tBody, 'otpTable', false, null);
  
  const hrmActivityMain = document.getElementById('hrmActivityMain');
  
  const topSpan = document.createElement('span');
  topSpan.setAttribute('id', 'otpTop');
  topSpan.classList.add('otpTop');
  boolVal === true ? topSpan.innerHTML = `
      <button class="refreshBtn" id="refreshBtn">Refresh</button>
      <button class="copyBtn" id="copyBtn">Copy</button>
  ` : topSpan.innerHTML = `
    <button class="refreshBtn" id="refreshBtn">Refresh</button>
  `
  
  hrmActivityMain.appendChild(topSpan);
  hrmActivityMain.appendChild(table);

  return { topSpan, table };
}


async function fetchOtp(identity) {
  const url = `https://www.befreshbd.com/ZaraApi.ashx?type=get_login_otp&emp=${identity}`;
  try {
      const response = await fetch(url);

      // Check if the response is successful
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse and return the JSON data
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching OTP:', error);
      return null; // Return null or handle the error as needed
  }
}


function noticeBoardHomeButon() {
  if(typeof Android !== 'undefined' && Android.goToMainActivity) {
    Android.goToMainActivity();
  } 
}


// check if application date today or furture day, previous day is invalid!
function isFutureOrTodayDate(applyDateFrom, applyDateTo,service) {
  // // Parse the input dates
  // const fromDate = new Date(applyDateFrom);
  // fromDate.setHours(0,0,0,0)
  // const toDate = new Date(applyDateTo);

  // // Get the current date without time (00:00:00)
  // const today = new Date();
  // today.setHours(0, 0, 0, 0);

  // const before10AM = getBangladeshTime(new Date());
  // before10AM.setHours(10,0,0,0);



  // const currentTime = getBangladeshTime(new Date());

  // const currentTimeHours = currentTime.getHours();
  // const currentTimeMinutes = currentTime.getMinutes();
  // const currentTimeSeconds = currentTime.getSeconds();

  // const before10AMHours = before10AM.getHours();
  // const before10AMMinutes = before10AM.getMinutes();
  // const before10AMSeconds = before10AM.getSeconds();


  // switch(service){
  //   case 'late':
  //     return fromDate > today || ((fromDate.toDateString === today.toDateString) && (
  //       (currentTimeHours < before10AMHours) || 
  //       (currentTimeHours === before10AMHours && currentTimeMinutes < before10AMMinutes) || 
  //       (currentTimeHours === before10AMHours && currentTimeMinutes === before10AMMinutes && currentTimeSeconds < before10AMSeconds)
  //     ));
  //   case 'work_from_home':
  //   case 'work_from_other_location': 
  //   case 'leave':
  //     if (fromDate > today) {
        
  //       return true;
  //     }else if (
              
  //             fromDate.toDateString === today.toDateString && 
  //             (
  //               (currentTimeHours < before10AMHours) || 
  //               (currentTimeHours === before10AMHours && currentTimeMinutes < before10AMMinutes) || 
  //               (currentTimeHours === before10AMHours && currentTimeMinutes === before10AMMinutes && currentTimeSeconds > before10AMSeconds)
  //             )
  //             )
  //         {
        
       
  //       return true;
  //     }
      
     
  //     return false;

  //   default:
     
  //     return false;   
  // }




  

 // Ensure the input date strings are in ISO format (YYYY-MM-DD)
  const fromDate = new Date(applyDateFrom.replace(/-/g, '/')); // Handles Safari format
  fromDate.setHours(0, 0, 0, 0);

  const toDate = new Date(applyDateTo.replace(/-/g, '/'));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const before10AM = getBangladeshTime(new Date());
  before10AM.setHours(10, 0, 0, 0);

  const currentTime = getBangladeshTime(new Date());
  const currentTimeHours = currentTime.getHours();
  const currentTimeMinutes = currentTime.getMinutes();
  const currentTimeSeconds = currentTime.getSeconds();

  const before10AMHours = before10AM.getHours();
  const before10AMMinutes = before10AM.getMinutes();
  const before10AMSeconds = before10AM.getSeconds();

  switch (service) {
    case 'late':
      return (
        fromDate > today ||
        (fromDate.toDateString() === today.toDateString() &&
          ((currentTimeHours < before10AMHours) ||
            (currentTimeHours === before10AMHours &&
              currentTimeMinutes < before10AMMinutes) ||
            (currentTimeHours === before10AMHours &&
              currentTimeMinutes === before10AMMinutes &&
              currentTimeSeconds < before10AMSeconds)))
      );

    case 'work_from_home':
    case 'work_from_other_location':
    case 'leave':
      if (fromDate > today) {
        return true;
      } else if (
        fromDate.toDateString() === today.toDateString() &&
        ((currentTimeHours < before10AMHours) ||
          (currentTimeHours === before10AMHours &&
            currentTimeMinutes < before10AMMinutes) ||
          (currentTimeHours === before10AMHours &&
            currentTimeMinutes === before10AMMinutes &&
            currentTimeSeconds < before10AMSeconds))
      ) {
        return true;
      }
      return false;

    default:
      return false;
  }

}

// check if date range is valid
function validateDateRange(fromFormatted, toFormatted) {
  // Normalize date format for Safari compatibility
  const fromDate = new Date(fromFormatted.replace(/-/g, '/'));
  const toDate = new Date(toFormatted.replace(/-/g, '/'));

  // Check for invalid dates
  if (isNaN(fromDate) || isNaN(toDate)) {
    return {
      isValid: false,
      title: 'Invalid date format!',
      message: 'Please ensure the date format is correct.',
    };
  }

  // Check if the start date is greater than the end date
  if (fromDate > toDate) {
    return {
      isValid: false,
      title: 'Invalid! Date range',
      message: 'Start date cannot be later than end date.',
    };
  }

  return {
    isValid: true, // Dates are valid
  };
}

// uncheck radio button
function uncheckRadioButtons(name) {
  const radios = document.querySelectorAll(`input[name="${name}"]`);
  radios.forEach(radio => {
      radio.checked = false;
  });
}

function checkIn(data){
  
  const mainContainer = document.getElementById("hrmActivityMain");
  mainContainer.innerHTML = "";
  
  let status_in;
  const innerContainer = `
    <div id="check_in_container" class="check_in_container">
      <div id="navigationBtn" class="navigationBtn">
        <button id="checkIn" class="checkIn" active="true">Apply</button>
        <button id="viewPage" class="viewPage">View</button>
      </div>
      <div id="check_details" class="check_details">
        <div id="map" class="map"></div>
        <div id="position_point" class="position_point">
          <span id="lat" class="lat">
            <label id="lat_lab" class="lat_lab">Latitude</label>
            <p id="lat_data" class="lat_data">data</p>
          </span>
          <span id="lon" class="lon">
            <label id="lon_lab" class="lon_lab">longitude</label>
            <p id="lon_data" class="lon_data">data</p>
          </span>
        </div>
        <div id="map_link" class="map_link">
          <label>Map link</label>
          <p>
            <a href="https://www.google.com/maps?q=40.748817,-73.985428" target="_blank">Open Map</a>
          </p>
        </div>
        <div id="location-name" class="location-name">
          <span class="location_title" id="location_title">
            <img src='../assets/images/map_icon.png' alt='image' width="20px" height="20px"/>
            <p>Current Location</p>
          </span>
          <span id="location" class="location"></span>
        </div>
        <div id="check_in_form" class="check_in_form">
          
        </div>
      </div>
    </div>
  `

  const activeButtonText = getActiveButtonText('navigationBtn')
  if(activeButtonText){
    status_in = activeButtonText
  }

  
  mainContainer.innerHTML = innerContainer;
  

  const checkInButton = document.getElementById("checkIn");
  const viewPageButton = document.getElementById("viewPage");
  
 
  
  // check btn
  checkInButton.addEventListener("click", () => {
    
    loadingOverlay(true, 'check_in_container');
    const activeButtonText = getActiveButtonText('navigationBtn');
    
    if(activeButtonText){
      status_in = activeButtonText
    }
    if(status_in != 'Apply'){
      toggleActive('checkIn',checkInButton,viewPageButton)
    }

   
    if(status_in === 'Apply' && activeButtonText === 'Apply'){
      
      const loadingOverlay = document.getElementById('loadingOverlay')
      if (loadingOverlay) {
        loadingOverlay.remove(); // This will remove the div with id loadingOverlay
      }
    }
  });

  
    // view btn
  viewPageButton.addEventListener("click", () => {
  
    const activeButtonText = getActiveButtonText('navigationBtn')
    if(activeButtonText){
      status_in = activeButtonText
    }
    
    
    if(status_in != 'View'){
      toggleActive('viewPage',checkInButton,viewPageButton,data)

    }

  });



  const navigationBtn = document.getElementById('navigationBtn');
  const check_details = document.getElementById('check_details');

  check_details.style.marginTop = `${ navigationBtn.offsetHeight}px`

  const check_in_form = document.getElementById('check_in_form')

  const useForm = handleForm('checkIn','check_in_class');

  check_in_form.appendChild(useForm)

  const form_elements = `
    <span>
      <label>Note : </label>
      <input type="text" name="note" placeholder="Please put note here"/>
    </span>
    <button type="submit" id="check_in_btn" class="check_in_btn">Submit</button>
  `

  useForm.innerHTML = form_elements;

  useForm.addEventListener("formSubmitted",(event)=>{ 
    try {
      const lon = document.getElementById('lon_data').textContent
      const lat = document.getElementById('lat_data').textContent
      const formData = event.detail.formData;
      
      const url = `https://ctgshop.com/erp/API/xbill.ashx?type=bfr_act&emcode=${identity}&emname=${encodeURIComponent(emName)}&lat=${lat}&long=${lon}&note=${encodeURIComponent(formData.note)}&addr=${encodeURIComponent(document.getElementById('location').textContent)}`

      if(formData.note === ""){
        document.getElementById('darkOverlay').style.display = 'block';
        document.body.classList.add('transparent');
        Swal.fire({
            title: "Note must not be empty!",
            icon: "warning",
            showCloseButton: true,
            confirmButtonColor: "#3085d6",
            showConfirmButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen'
            },
        }).then(()=>{
          // Hide the overlay when alert is closed
          document.getElementById('darkOverlay').style.display = 'none';
          document.body.classList.remove('transparent'); // Remove class to allow scrolling
        });
      } else{
        fetch(url)
        .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data=>{
          
          if (data.status === true) {
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                title: data.message,
                icon: "success",
                showCloseButton: true,
                confirmButtonColor: "#3085d6",
                showConfirmButton: true,
                customClass: {
                  popup: 'swal2-alert-custom-smallscreen'
                },
            }).then(()=>{
               
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling

              const noteInput = document.querySelector('input[name="note"]');
              if (noteInput) {
                noteInput.value = ""; // Clear the input
              }

            });
          } else {
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                  icon: "warning",
                  title: "Not posted",
                  showConfirmButton: false,
                  showCloseButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });  
          }
        })
        .catch(error => {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
              title: 'Error!',
              text: 'An error occurred: ' + error.message,
              icon: 'error',
              confirmButtonText: 'Try Again',
              customClass: {
                popup: 'swal2-alert-custom-smallscreen'
              },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          }); 
        });
      }
    } catch (error) {
        document.getElementById('darkOverlay').style.display = 'block';
        document.body.classList.add('transparent');
        Swal.fire({
            title: error.message,
            icon: "warning",
            showCloseButton: true,
            confirmButtonColor: "#3085d6",
            showConfirmButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen'
            },
        }).then(()=>{
          document.querySelector('input[name="note"]').value = ""; 
          // Hide the overlay when alert is closed
          document.getElementById('darkOverlay').style.display = 'none';
          document.body.classList.remove('transparent'); // Remove class to allow scrolling
  
        });
    }
  });

  check_details.style.cssText =`
        min-height:${window.innerHeight - (document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('navigationBtn').offsetHeight + 20)}px!important;
        margin-top:${document.getElementById('navigationBtn').offsetHeight}px;
      `
}


function getActiveButtonText(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
      const buttons  = container.querySelectorAll('button')
      let activeButtonText = null;

      buttons.forEach((button)=>{
        const isActive = button.getAttribute('active');
        
        if(isActive){
          activeButtonText = button.textContent
        }
        
      });
      return activeButtonText
  }

  return null;
}

async function toggleActive(buttonId, checkInButton, viewPageButton, data=null) {
  switch (buttonId) {
    case "checkIn":
      checkInButton.setAttribute("active", "true");
      viewPageButton.removeAttribute("active");

      const check_details = document.getElementById('check_details');
      check_details.innerHTML = "";
      const mapDiv = Object.assign(document.createElement('div'), { id: 'map', className: 'map'});
      const position_pointDiv = Object.assign(document.createElement('div'), { id: 'position_point', className: 'position_point' });
      position_pointDiv.innerHTML =`
          <span id="lat" class="lat">
            <label id="lat_lab" class="lat_lab">Latitude</label>
            <p id="lat_data" class="lat_data">data</p>
          </span>
          <span id="lon" class="lon">
            <label id="lon_lab" class="lon_lab">longitude</label>
            <p id="lon_data" class="lon_data">data</p>
          </span>
      `
      const map_linkDiv = Object.assign(document.createElement('div'), { id: 'map_link', className: 'map_link' });
      map_linkDiv.innerHTML = `
          <label>Map link</label>
          <p>
            <a href="https://www.google.com/maps?q=40.748817,-73.985428" target="_blank">Open Map</a>
          </p>
      `
      const location_nameDiv = Object.assign(document.createElement('div'), { id: 'location-name', className: 'location-name' });
      location_nameDiv.innerHTML =`
          <span class="location_title" id="location_title">
            <img src='../assets/images/map_icon.png' alt='image' width="20px" height="20px"/>
            <p>Current Location</p>
          </span>
          <span id="location" class="location"></span>
      `
      const check_in_formDiv = Object.assign(document.createElement('div'), { id: 'check_in_form', className: 'check_in_form' });

      check_details.appendChild(mapDiv)
      check_details.appendChild(position_pointDiv)
      check_details.appendChild(map_linkDiv)
      check_details.appendChild(location_nameDiv)
      check_details.appendChild(check_in_formDiv)
      
      const check_in_form = document.getElementById('check_in_form')

      const useForm = handleForm('checkIn','check_in_class');
      check_in_form.appendChild(useForm)

      const form_elements = `
        <span>
          <label>Note : </label>
          <input type="text" name="note" placeholder="Please put note here"/>
        </span>
        <button type="submit" id="check_in_btn" class="check_in_btn">Submit</button>
      `

      useForm.innerHTML = form_elements;

      useForm.addEventListener("formSubmitted",(event)=>{ 
        try {
          const lon = document.getElementById('lon_data').textContent
          const lat = document.getElementById('lat_data').textContent
          const formData = event.detail.formData;
          const url = `https://ctgshop.com/erp/API/xbill.ashx?type=bfr_act&emcode=${identity}&emname=${encodeURIComponent(emName)}&lat=${lat}&long=${lon}&note=${encodeURIComponent(formData.note)}&addr=${encodeURIComponent(document.getElementById('location').textContent)}`
      
          if(formData.note === ""){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                title: "Note must not be empty",
                icon: "warning",
                showCloseButton: true,
                confirmButtonColor: "#3085d6",
                showConfirmButton: true,
                customClass: {
                  popup: 'swal2-alert-custom-smallscreen'
                },
            }).then(()=>{
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          } else{
            fetch(url)
            .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
            })
            .then(data=>{
              
              if (data.status === true) {
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                    title: data.message,
                    icon: "success",
                    showCloseButton: true,
                    confirmButtonColor: "#3085d6",
                    showConfirmButton: true,
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then(()=>{
                  
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling

                  const noteInput = document.querySelector('input[name="note"]');
                  if (noteInput) {
                    noteInput.value = ""; // Clear the input
                  }

                });
              } else {
                  document.getElementById('darkOverlay').style.display = 'block';
                  document.body.classList.add('transparent');
                  Swal.fire({
                      icon: "warning",
                      title: "Not posted",
                      showConfirmButton: false,
                      showCloseButton: true,
                      customClass: {
                        popup: 'swal2-alert-custom-smallscreen'
                      },
                  }).then((result) => {
                    // Hide the overlay when alert is closed
                    document.getElementById('darkOverlay').style.display = 'none';
                    document.body.classList.remove('transparent'); // Remove class to allow scrolling
                  });  
              }
            })
            .catch(error => {
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                  title: 'Error!',
                  text: 'An error occurred: ' + error.message,
                  icon: 'error',
                  confirmButtonText: 'Try Again',
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              }); 
            });
          }
        } catch (error) {
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
                title: error.message,
                icon: "warning",
                showCloseButton: true,
                confirmButtonColor: "#3085d6",
                showConfirmButton: true,
                customClass: {
                  popup: 'swal2-alert-custom-smallscreen'
                },
            }).then(()=>{
              document.querySelector('input[name="note"]').value = ""; 
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
      
            });
        }
      
        
      });
      loadMapInfo();
      break;
    case "viewPage":
      viewPageButton.setAttribute("active", "true");
      checkInButton.removeAttribute("active");

      const monthAbbreviations = {
        January: "Jan",
        February: "Feb",
        March: "Mar",
        April: "Apr",
        May: "May",
        June: "Jun",
        July: "Jul",
        August: "Aug",
        September: "Sep",
        October: "Oct",
        November: "Nov",
        December: "Dec"
      };

      

      let checkInViewResponse;
      checkInViewResponse = returnFilterDataAndUniqueItemArray(data,identity)

      

      // fetch date time info from json file
      fetchHrData("dateTimeInfo")
        .then((result) => {
          const currentDate = new Date();
          let currentMonth = currentDate.toLocaleString("default", { month: "long" });
          let currentYear = currentDate.getFullYear();

          const startDatePickerInput = handleDateAndTime('checkInDateFrom');
          const endDatePickerInput = handleDateAndTime('checkInDateTo');

          const check_detail = document.getElementById('check_details');
          check_detail.innerHTML =""

          check_detail.innerHTML =`
            <div id="filter_id" class="filter_id"> 
              <select id="employeeSelect">
                
              </select>
            </div>
            <div id="select_check_in_view_date">
            </div>
            <div id="view_check_in" class="view_check_in"> 
              <span id="title" class="title">
                <p>Date/Time</p>

                <p>Note</p>
              </span>
              <div id="check_in_list" class="check_in_list"></div>
            </div>
          `

          // check_detail.innerHTML =`
          //   <div id="filter_id" class="filter_id"> 
          //     <select>
          //       <option>employee 1</option>
          //       <option>employee 2</option>
          //     </select>
          //   </div>
          //   <div id="select_check_in_view_date">
          //       <span id="checkIn_startDate">
                
          //       </span>
          //       <span id="checkIn_endDate">
                  
          //       </span>
                
          //   </div>
          //   <div id="view_check_in" class="view_check_in"> 
          //     <span>span 1</span>
          //     <span>span 2</span>
          //   </div>
          // `

          const btn = document.createElement("button");
          btn.setAttribute("id", "atndOkBtn");
          btn.setAttribute("class", "atndOkBtn");
          btn.textContent = "OK";
          
          // populateSelectOptions('filter_id','employeeSelect',checkInViewResponse.filterItems)
   
          const arrayOfhrEmp =["BR-0418-17","BR-0371-17"];
          // sribas : "BR-0418-17"
          if(arrayOfhrEmp.includes(identity)){
            populateSelectOptions('filter_id','employeeSelect',checkInViewResponse.hrmAccess_groupedItems)
            if(checkInViewResponse.selfData.length > 0){
              populateCheckInList(checkInViewResponse.selfData,'check_in_list')

            }else{
              check_in_list.innerHTML = ""
              
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
  
              Swal.fire({
                title: "No data found!",
                icon: "warning",
                showCloseButton: true,
                confirmButtonColor: "#3085d6",
                showConfirmButton: true,
                customClass: {
                  popup: 'swal2-alert-custom-smallscreen'
                },
              }).then(()=>{
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            }

          }else{
            populateSelectOptions('filter_id','employeeSelect',checkInViewResponse.filterItems)

            if(checkInViewResponse.selfData.length > 0){

              populateCheckInList(checkInViewResponse.selfData,'check_in_list')
  
            }else{
              check_in_list.innerHTML = ""
              
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
  
              Swal.fire({
                title: "No data found!",
                icon: "warning",
                showCloseButton: true,
                confirmButtonColor: "#3085d6",
                showConfirmButton: true,
                customClass: {
                  popup: 'swal2-alert-custom-smallscreen'
                },
              }).then(()=>{
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
  
            }
          }

          
        
          btn.addEventListener('click',async()=>{
            const selectedMonth = document.getElementById("monthList").value;
            const selectedYear = document.getElementById("yearList").value;
            const employeeSelect = document.getElementById('employeeSelect')
            // const selectedText = employeeSelect.options[employeeSelect.selectedIndex].textContent;
            // const check_in_list = document.getElementById('check_in_list')
            
            // Convert the full month name to its three-letter abbreviation
            const abbreviatedMonth = monthAbbreviations[selectedMonth];

            // Get the start and end date for the selected month
            const { startDate, endDate } = getStartAndEndOfMonth(selectedYear, Object.keys(monthAbbreviations).indexOf(selectedMonth));
            const url = `https://ctgshop.com/erp/API/xbill.ashx?type=bfr_act_list&sdt=${startDate}/${abbreviatedMonth}/${selectedYear}&edt=${endDate}/${abbreviatedMonth}/${selectedYear}`;
  
            const res = await fetchData(url)
            
            checkInViewResponse =  returnFilterDataAndUniqueItemArray(res,identity)
            
           
            if(arrayOfhrEmp.includes(identity)){
              populateSelectOptions('filter_id','employeeSelect',checkInViewResponse.hrmAccess_groupedItems)
            }else{
              populateSelectOptions('filter_id','employeeSelect',checkInViewResponse.filterItems)
            }


            if(employeeSelect && employeeSelect.options.length > 0){
              const selectedValue = employeeSelect.value;
              const selectedIndex = employeeSelect.selectedIndex;
              
              
              if(selectedIndex >= 0){
                const selectedText = employeeSelect.options[selectedIndex].textContent;
            
                if(selectedText.toLowerCase() === 'self'){
                 
                  if(checkInViewResponse.selfData.length > 0){
                    document.getElementById('check_in_list').innerHTML = ""

                    populateCheckInList(checkInViewResponse.selfData,'check_in_list')

                  }else{
                    document.getElementById('check_in_list').innerHTML = ""
                  } 

                }else{

                  if(arrayOfhrEmp.includes(identity)){
                   
                    if(Object.keys(checkInViewResponse.hrmAccess_groupedItems).length > 0){
                      document.getElementById('check_in_list').innerHTML = ""
                      
                      if(Object.keys(checkInViewResponse.hrmAccess_groupedItems).includes(selectedValue)){
                        const tempData = checkInViewResponse.hrmAccess_groupedItems[selectedValue]
                        populateCheckInList(tempData,'check_in_list')
                      }
                    }else{
                      document.getElementById('check_in_list').innerHTML = ""
                    }
                  }else {
                    if(checkInViewResponse.suborinatesData.length > 0){
                      document.getElementById('check_in_list').innerHTML = ""
                      const individualSubortinate = checkInViewResponse.suborinatesData.filter((element)=>element.em_code === selectedValue)
  
                      populateCheckInList(individualSubortinate,'check_in_list')
  
                    }else{
                      document.getElementById('check_in_list').innerHTML = ""
                    }
                  }
                  
                }
              }
            }


          })

          const select_check_in_view_date = check_detail.querySelector('#select_check_in_view_date');
          select_check_in_view_date.appendChild(createDropdown(result[0].months, "monthList", currentMonth))
          select_check_in_view_date.appendChild(createDropdown(result[1].years, "yearList", currentYear))
          select_check_in_view_date.appendChild(btn);

          document.getElementById("checkIn_startDate") && document.getElementById("checkIn_startDate").appendChild(startDatePickerInput.elementName);
          document.getElementById("checkIn_endDate") && document.getElementById("checkIn_endDate").appendChild(endDatePickerInput.elementName);


          document.getElementById('filter_id') ? document.getElementById('filter_id').style.cssText = `
            position:fixed;
            top:${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('navigationBtn').offsetHeight + 3}px;
            left:0;
            right:0;
          ` : "";

          document.getElementById('select_check_in_view_date') && document.getElementById('filter_id') ? document.getElementById('select_check_in_view_date').style.cssText = `
            position:fixed;
            top:${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('navigationBtn').offsetHeight + document.getElementById('filter_id').offsetHeight + 5}px;
            left:0;
            right:0;
          `: document.getElementById('select_check_in_view_date') && !document.getElementById('filter_id') ? document.getElementById('select_check_in_view_date').style.cssText =`
              position:fixed;
              top:${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('navigationBtn').offsetHeight + 5}px;
              left:0;
              right:0;
          ` : "";

          document.getElementById('view_check_in') && document.getElementById('filter_id') && document.getElementById('select_check_in_view_date') ? document.getElementById('view_check_in').style.cssText = `
            position:fixed;
            top:${document.getElementById('hrmActivityTop').offsetHeight + document.getElementById('navigationBtn').offsetHeight + document.getElementById('filter_id').offsetHeight + document.getElementById('select_check_in_view_date').offsetHeight + 5}px;
            left:0;
            right:0;
            height: ${window.innerHeight - 
            (document.getElementById('hrmActivityTop').offsetHeight + 
             document.getElementById('navigationBtn').offsetHeight + 
             document.getElementById('filter_id').offsetHeight + 
             document.getElementById('select_check_in_view_date').offsetHeight + 19)}px;
          ` : ""
 
  
        })
        .catch((error) => {
          console.error(error);
        });

       
      break;
    default:
      console.log("Invalid button ID");
  }
}


function loadMapInfo() {
  // Initialize the map and set its view to a default location (e.g., London)
  const DEFAULT_LAT = 51.505;
  const DEFAULT_LON = -0.09;
  const map = L.map('map').setView([DEFAULT_LAT, DEFAULT_LON], 13);

 
  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Be Rich Map'
  }).addTo(map);

  // Marker variable to hold current marker
  let currentMarker;
  
  // Show user location on map
  function showPosition(position) {
    
    loadingOverlay(false, 'check_in_container');
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    
    document.getElementById('lat_data').innerText = lat;
    document.getElementById('lon_data').innerText = lon;

    // Set the map view to the user's location
    map.setView([lat, lon], 13);

    // Add a marker for the user's location
    currentMarker = L.marker([lat, lon]).addTo(map)
        .bindPopup("You are here!")
        .openPopup();

    
    const mapLink = document.querySelector('#map_link a');
    mapLink.href = `https://www.google.com/maps?q=${lat},${lon}`;

    // Get the location name using reverse geocoding
    getLocationName(lat, lon);
    
  }


  // Get the user's location when the page loads
  getLocation(showPosition);
  
   
}


// Function to get user location
function getLocation(showPosition) {

  if (navigator.geolocation) {
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000, // 10 seconds
      maximumAge: 0,
    };

    try {
      navigator.geolocation.getCurrentPosition(showPosition, showError,geoOptions);
    } catch (error) {
      console.error("Unexpected error:", err);
      swal.fire({
          icon: "error",
          text: "An unexpected error occurred. Please try again later.",
          confirmButtonText: "OK",
      });
    }
  } else {
    swal.fire({
      icon: "error",
      text: "Geolocation is not supported by your browser.",
      confirmButtonText: "OK",
    });
  }
}

// Handle errors
function showError(error) {
  loadingOverlay(true, 'check_in_container');
  let errorMessage = 'Unknown error'
  switch (error.code) {
      case error.PERMISSION_DENIED:
          // swal.fire({
          //   icon: "warning",
          //   text: "Geolocation denied, Please turn on mobile GPS! Try again!",
          //   confirmButtonText: "Go back!"
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', identity, emName, applyReportingBoss, reportingBossName)
          //   }
          // });
          errorMessage ='Geolocation denied, Please turn on mobile GPS!'
          break;
      case error.POSITION_UNAVAILABLE:
          // swal.fire({
          //   icon: "warning",
          //   text: "Location information unavailable.! Check mobile GPS! Try again!",
          //   confirmButtonText: "Go back!"
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', identity, emName, applyReportingBoss, reportingBossName)
          //   }
          // });
          errorMessage = 'Location information unavailable.! Check mobile GPS!'
          break;
      case error.TIMEOUT:
          // swal.fire({
          //   icon: "warning",
          //   text: "Request time out.! Check mobile GPS! Try again!",
          //   confirmButtonText: "Go back!"
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', identity, emName, applyReportingBoss, reportingBossName)
          //   }
          // });
          errorMessage = 'Request time out.! Check mobile GPS!'
          break;
      case error.UNKNOWN_ERROR:
          // swal.fire({
          //   icon: "warning",
          //   text: "Unknow Error.! Check mobile GPS! Try again!",
          //   confirmButtonText: "Go back!"
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', identity, emName, applyReportingBoss, reportingBossName)
          //   }
          // });
          errorMessage ='Unknow Error.! Check mobile GPS!'
          break;
  }

    // Show an alert if geolocation fails
    swal.fire({
    icon: "warning",
    text: `${errorMessage} Please try again!`,
    confirmButtonText: "Go Back"
  }).then((result) => {
    if (result.isConfirmed) {
      // loadMapInfo(); // Retry loading map info
      hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', identity, emName, applyReportingBoss, reportingBossName)
    }
  });

  map.setView([DEFAULT_LAT, DEFAULT_LON], 13);

  let currentMarker;
  // Clear existing marker if present
  if (currentMarker) {
      map.removeLayer(currentMarker);
  }

  currentMarker = L.marker([DEFAULT_LAT, DEFAULT_LON]).addTo(map)
      .bindPopup("Location could not be detected. Showing default location.");

}

// Set default location on the map
function setDefaultLocation() {
  map.setView([DEFAULT_LAT, DEFAULT_LON], 13);
  
  let currentMarker;
  // Clear existing marker if present
  if (currentMarker) {
      map.removeLayer(currentMarker);
  }

  currentMarker = L.marker([DEFAULT_LAT, DEFAULT_LON]).addTo(map)
      .bindPopup("Location could not be detected. Showing default location.");
}

 // Function to get the location name
 function getLocationName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  fetch(url)
      .then(response => {
        if(!response.ok) throw new Error('wating')
        return response.json()
      })
      .then(data => {
          
          const locationName = data.display_name; // Get the location name
          document.getElementById('location').innerText = locationName; // Display location name
      })
      .catch(() => {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
          fetch(url)
          .then(response => {
            if (!response.ok) throw new Error("LocationIQ failed");
            return response.json();
          })
          .then(data => {
            
            const locationName = data.display_name;
            document.getElementById('location').innerText = locationName;
          })
          .catch(error => {
            
            if(document.getElementById('location')){

              document.getElementById('location').innerText = "Location name not available.";
            }
          });

      });
}

function getApproximateLocation(){
  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      const lat = data.latitude;
      const lon = data.longitude;
      
      // Display approximate location
      document.getElementById('lat_data').innerText = lat;
      document.getElementById('lon_data').innerText = lon;
      
      // Use approximate coordinates to center the map
      map.setView([lat, lon], 13);
      const marker = L.marker([lat, lon]).addTo(map)
          .bindPopup("Approximate Location")
          .openPopup();
          
      // Update map link
      const mapLink = document.querySelector('#map_link a');
      mapLink.href = `https://www.google.com/maps?q=${lat},${lon}`;

      // Get the location name using reverse geocoding
      getLocationName(lat, lon);
    })
    .catch(error => console.error('Error fetching approximate location:', error));
}

async function getIPAddress() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
  }
}

function getStartAndEndOfMonth(year, month) {
  // Get the first day of the month
  const startDate = new Date(year, month, 1);
  
  // Get the last day of the month
  const endDate = new Date(year, month + 1, 0); // +1 because months are 0-indexed
  
  return {
    startDate: startDate.getDate(),
    endDate: endDate.getDate()
  };
}

function temporarilyClosed(identity,emName,applyReportingBoss,reportingBossName) {
  
  try {
    document.getElementById('darkOverlay').style.display = 'block';
    document.body.classList.add('transparent');
    
      Swal.fire({
        icon: "warning",
        text: "Temporarily Closed!",
      }).then((result) => {
        // Hide the overlay when alert is closed
        document.getElementById('darkOverlay').style.display = 'none';
        document.body.classList.remove('transparent'); // Remove class to allow scrolling

        // Call the passed function with its parameters
        hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', identity,emName,applyReportingBoss,'')
      
        
      });
  } catch (error) {
    alert(error)
  }
 
  
 
}

async function incentiveFunc(){
  const hrmActivityMain = document.getElementById('hrmActivityMain');

  let em_Name;
 
  let plan = [];


  const html = `
    <form class="incentiveContainer" id="incentiveContainer">
      <select class="empDropDown" id="empDropDown">
      
      </select>
      <select class="compDropDown" id="compDropDown">
        
      </select>
      <div style="display:none" class="dateRange" id="dateRange"> 
        <div class="fromDate" id="fromDate"></div>
        <div class="toDate" id="toDate"></div>
      </div>
      <div class="month_year" id="month_year">
        <span class="month">
          <label for="monthSelect">Month:</label>
          <select id="monthSelect" class="monthSelect">
            <!-- Months will be dynamically inserted -->
          </select>
        </span>

        <span class="year">
          <label for="yearSelect">Year:</label>
          <select id="yearSelect" class="yearSelect">
            <!-- Years will be dynamically inserted -->
          </select>
        </span>
      </div>
      <select class="billTypeDropDown" id="billTypeDropDown">
        <option>Select bill type</option>
        <option value="all">All Bill</option>
        <option value="clear">Clear bill</option>
        <option value="notClear">Not Clear bill</option>
      </select>
      <button type="submit" class="submit" id="submit">SUBMIT</button>
      <div class="contentArea" id="contentArea">
      
        
      </div>
      <span class="incentive_overlay" id="incentive_overlay">
        <div class="incentive_overlay_loading-spinner"></div>
      </span>
    </form>
  `

  hrmActivityMain.innerHTML = html;
  
  await fetchData(`https://ctgshop.com/erp/API/xbill.ashx?type=get_emp`,"")
    .then((res)=>{
      
      const empDropDown = document.getElementById('empDropDown');

      // empDropDown.innerHTML = '<option value="">Select Employee</option>';
      
      if(res.status === true){
        
        // check permissible employee list from list.js
        if(incentiveEmCodes.includes(identity)){
          
          res.Data.forEach(emp => {
            

            if(!emp.pay_plan || emp.pay_plan.trim() === ""){
              return;
            }
            
            const option = document.createElement('option');
            option.value = emp.em_code; // Set option value as employee ID
            option.textContent = emp.em_name; // Display employee name
            
            if(emp.em_code === identity){
              console.log(emp)
              option.selected = true;
              em_Name = emp.em_name;
              
              document.getElementById('contentArea') ? document.getElementById('contentArea').innerHTML = "" : "" 

              const payPlanArray = emp.pay_plan ? emp.pay_plan.split('|') : [];
              plan = [];
              plan.push(...payPlanArray);

              
              const companyNames = payPlanArray.flatMap((item) => {
                
                // check if 'gross pay' is in the item or if 'C' is a separate part
                if( item.trim().replace(/\s+/g, ' ').toUpperCase().includes('GROSS-PAY') ||
                    item.trim().split('-').map(part=>part.trim()).includes('C')){
                    return null; // Exclude this item
                }

                // Split by space as well to handle multiple codes inside one item
                const itemCodes = item.split(' '); 
  
                return itemCodes.map((code) => {
                    const itemArray = code.split('-');
                    
                    if (itemArray[0] === 'BR') {
                        return 'BE RICH LIMITED';
                    } else if (itemArray[0] === 'BF') {
                        return 'BE FRESH LIMITED';
                    } else if (itemArray[0] === 'SE') {
                        return 'SOUTH EAST MONEY EXCHANGE LIMITED';
                    } else if (itemArray[0] === 'ED') {
                        return 'BE FRESH EDUCATION & JOBS LIMITED';
                    }
                    return null;
                });

              }).filter(Boolean); // Removes null values
            
              if(companyNames && companyNames.length > 0){
                const compDropDown = document.getElementById('compDropDown');
    
                compDropDown.innerHTML = "";
                // Add a default option
                const defaultOption = document.createElement("option");
                defaultOption.text = "Select Company";
                defaultOption.value = "";
                compDropDown.appendChild(defaultOption);
    
                let selectedIndex = 1;
    
                // Add options from companyNames array
                companyNames.forEach((company,index) => {
                  const option = document.createElement("option");
                  option.value = company; // Set value as company name
                  option.textContent = company; // Display company name
                  compDropDown.appendChild(option);
    
                  if (compDropDown.options.length - 1 === selectedIndex) {
                    option.selected = true;
                  }
                  
                });
    
                
                if(compDropDown.options.length === 2){
                  compDropDown.disabled = true;
                }
                
  
                // check all bill or bill clean, this is for befresh users
                const billTypeDropDown = document.getElementById('billTypeDropDown');
                if(compDropDown.value !== 'BE FRESH LIMITED'){
                  billTypeDropDown.style.display = `none`;
    
                }
  
                // check all bill or bill clean, this is for befresh users
                compDropDown.addEventListener('change',()=>{
                  document.getElementById('contentArea') ? document.getElementById('contentArea').innerHTML = "" : ""
                  if(compDropDown.value !== 'BE FRESH LIMITED'){
                    billTypeDropDown.style.display = `none`;
                  }else{
                    billTypeDropDown.style.display = `flex`;
                  }
                })

              }
            
            }


            empDropDown.appendChild(option);

            
          });
          

          empDropDown.addEventListener('change',()=>{
            em_Name = '';
            
            res.Data.forEach(emp =>{
              
              if(!emp.pay_plan || emp.pay_plan.trim() === ""){
                return;
              }

              if(emp.em_code === empDropDown.value){
                console.log(emp)
                em_Name = emp.em_name;
                document.getElementById('contentArea') ? document.getElementById('contentArea').innerHTML = "" : ""
                const payPlanArray = emp.pay_plan ? emp.pay_plan.split('|') : [];
                plan = [];
                plan.push(...payPlanArray)

                
                const compDropDown = document.getElementById('compDropDown');
                

                const companyNames = payPlanArray.flatMap((item) => {
                  console.log(item)
                  // check if 'gross pay' is in the item or if 'C' is a separate part
                  if(  item.trim().replace(/\s+/g, ' ').toUpperCase().includes('GROSS-PAY') || item.trim().split('-').map(part=>part.trim()).includes('C')){
                      return null; // Exclude this item
                  }
                  
                  // Split by space as well to handle multiple codes inside one item
                  const itemCodes = item.split(' '); 
    
                  return itemCodes.map((code) => {
                      const itemArray = code.split('-');
                      
                      if (itemArray[0] === 'BR') {
                          return 'BE RICH LIMITED';
                      } 
                      else if (itemArray[0] === 'BF') 
                      {
                          return 'BE FRESH LIMITED';
                      } 
                      else if (itemArray[0] === 'SE') 
                      {
                          return 'SOUTH EAST MONEY EXCHANGE LIMITED';
                      } 
                      else if (itemArray[0] === 'ED')
                      {
                          return 'BE FRESH EDUCATION & JOBS LIMITED';
                      } 
                      // else if(itemArray[0] === 'GROSS-PAY')
                      // {
                      //    return 'GROSS-PAY'
                      // }
                      return null;
                  });
                }).filter(Boolean); // Removes null values
              

                if(companyNames && companyNames.length > 0){
                  compDropDown.innerHTML = "";
                  // Add a default option
                  const defaultOption = document.createElement("option");
                  defaultOption.text = "Select Company";
                  defaultOption.value = "";
                  compDropDown.appendChild(defaultOption);
      
                  let selectedIndex = 1;
      
                  // Add options from companyNames array
                  companyNames.forEach((company,index) => {
                    const option = document.createElement("option");
                    option.value = company; // Set value as company name
                    option.textContent = company; // Display company name
                    compDropDown.appendChild(option);
      
                    if (compDropDown.options.length - 1 === selectedIndex) {
                      option.selected = true;
                    }
                    
                  });
      
                  if(compDropDown.options.length === 2){
                    compDropDown.disabled = true;
                  }
                  
    
                  // check all bill or bill clean, this is for befresh users
                  const billTypeDropDown = document.getElementById('billTypeDropDown');
                  if(compDropDown.value !== 'BE FRESH LIMITED'){
                    billTypeDropDown.style.display = `none`;
      
                  }
                  else
                  {
                    billTypeDropDown.style.display = `flex`;
                  }
    
                  // check all bill or bill clean, this is for befresh users
                  compDropDown.addEventListener('change',()=>{
                    
                    if(compDropDown.value !== 'BE FRESH LIMITED'){
                      billTypeDropDown.style.display = `none`;
                    }else{
                      billTypeDropDown.style.display = `flex`;
                    }
                  })
  
                }


                if(companyNames && companyNames.length > 1){
                  compDropDown.disabled = false
                  
                }
              }
            });

          });
          
        }
        else
        {
          const matchEmp = res.Data.find(emp=> emp.em_code === identity && emp.pay_plan && emp.pay_plan.trim() !== "") || null;
          
          if(matchEmp){
            em_Name = matchEmp.em_name;
            document.getElementById('contentArea') ? document.getElementById('contentArea').innerHTML = "" : ""
            const option = document.createElement('option');
            option.value = matchEmp.em_code; // Set option value as employee ID
            option.textContent = matchEmp.em_name; // Display employee name
            empDropDown.appendChild(option);

            empDropDown.disabled = true;


            const payPlanArray = matchEmp.pay_plan ? matchEmp.pay_plan.split('|') : [];
            plan = [];
            plan.push(...payPlanArray)
            const companyNames = payPlanArray.flatMap((item) => {
                // check if 'gross pay' is in the item or if 'C' is a separate part
                if( item.trim().replace(/\s+/g, ' ').toUpperCase().includes('GROSS-PAY') ||
                    item.trim().split('-').map(part=>part.trim()).includes('C')){
                    return null; // Exclude this item
                }
                // Split by space as well to handle multiple codes inside one item
                const itemCodes = item.split(' '); 
  
                return itemCodes.map((code) => {
                    const itemArray = code.split('-');
                    
                    if (itemArray[0] === 'BR') {
                        return 'BE RICH LIMITED';
                    } else if (itemArray[0] === 'BF') {
                        return 'BE FRESH LIMITED';
                    } else if (itemArray[0] === 'SE') {
                        return 'SOUTH EAST MONEY EXCHANGE LIMITED';
                    } else if (itemArray[0] === 'ED') {
                        return 'BE FRESH EDUCATION & JOBS LIMITED';
                    }
                    return null;
                });
            }).filter(Boolean); // Removes null values
  
  
            if(companyNames && companyNames.length > 0){
              const compDropDown = document.getElementById('compDropDown');
  
              compDropDown.innerHTML = "";
              // Add a default option
              const defaultOption = document.createElement("option");
              defaultOption.text = "Select Company";
              defaultOption.value = "";
              compDropDown.appendChild(defaultOption);
  
              let selectedIndex = 1;
  
              // Add options from companyNames array
              companyNames.forEach((company,index) => {
                const option = document.createElement("option");
                option.value = company; // Set value as company name
                option.textContent = company; // Display company name
                compDropDown.appendChild(option);
  
                if (compDropDown.options.length - 1 === selectedIndex) {
                  option.selected = true;
                }
                
              });
  
              if(compDropDown.options.length === 2){
                compDropDown.disabled = true;
              }
              

              // check all bill or bill clean, this is for befresh users
              const billTypeDropDown = document.getElementById('billTypeDropDown');
              if(compDropDown.value !== 'BE FRESH LIMITED'){
                billTypeDropDown.style.display = `none`;
  
              }

              // check all bill or bill clean, this is for befresh users
              compDropDown.addEventListener('change',()=>{
                document.getElementById('contentArea') ? document.getElementById('contentArea').innerHTML = "" : ""
                if(compDropDown.value !== 'BE FRESH LIMITED'){
                  billTypeDropDown.style.display = `none`;
                }else{
                  billTypeDropDown.style.display = `flex`;
                }
              })
            }

          }else{
            const incentiveContainer = document.getElementById('incentiveContainer')

            incentiveContainer.innerHTML = ""

            const hrmActivityMain = document.getElementById('hrmActivityMain');

            hrmActivityMain.style.height = `${(100 - Math.floor(pxToVh(document.getElementById('hrmActivityTop').offsetHeight) + 2))}vh`
            
          }

        } 
      }

    })
    .catch((err)=>{
      console.log(err)
    })
 
  


  const startDatePickerInput = handleDateAndTime('fromDate');
  const endDatePickerInput = handleDateAndTime('toDate');

  // Check if `elementName` exists and is a valid node
  if (startDatePickerInput && startDatePickerInput.elementName instanceof Element) {
    const fromDateDiv = document.getElementById('fromDate');
    if(fromDateDiv){
      fromDateDiv.appendChild(startDatePickerInput.elementName);
    }
  }
 

  if (endDatePickerInput && endDatePickerInput.elementName instanceof Element) {
    const toDateDiv = document.getElementById('toDate');
    if(toDateDiv){
      toDateDiv.appendChild(endDatePickerInput.elementName);
    }
  }
  

  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");

  // Month Names
  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  // Populate Month Dropdown
  if(monthSelect){
    months.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = index + 1; // Month values 1-12
        option.textContent = month;
        monthSelect.appendChild(option);
    });
  }

  // Populate Year Dropdown (Range: 2000 to Current Year + 5)
  const currentYear = new Date().getFullYear();
  if(yearSelect){
    for (let year = 2010; year <= currentYear + 10; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    
  }

  // Set Default Selection to Current Month & Year
  monthSelect && (monthSelect.value = new Date().getMonth() + 1); // Current month (1-12)
  yearSelect && (yearSelect.value = currentYear);



  hrmActivityMain.style.cssText = `position:fixed;top:50px;left:0;right:0;padding-top:0`
  hrmActivityMain.style.height =`${100 - Math.ceil((pxToVh(document.getElementById('hrmActivityTop').offsetHeight)))}vh`
  
  hrmActivityMain.style.width = `99%`

  document.getElementById('incentiveContainer').style.height =`${100 - Math.ceil((pxToVh(document.getElementById('hrmActivityTop').offsetHeight)))}vh`

  
  
  
  document.getElementById('incentiveContainer').addEventListener('submit', (event) => {
    event.preventDefault();

    const incentive_overlay = document.getElementById('incentive_overlay');
    incentive_overlay.style.display = 'flex'

    // conditional Name change
    let formattedName = em_Name === "MD. RASHEDUL ALAM" ? "RASHEDUL ALAM" : em_Name === "MOHAMMAD HANIF" ? "MD. HANIF": em_Name === "MD. MAHMUDUL HASSAN" ? "MD MAHMUDUL HASSAN": em_Name === "MD SOFIQUR RAHAMAN" ? "SOFIQUR RAHMAN" : em_Name;

    const form = event.target.closest('form')
    
    const empCode = document.getElementById('empDropDown').value;
    const company = document.getElementById('compDropDown').value;
    const billType = document.getElementById('billTypeDropDown').value;

    const fromDate = form.querySelector('.fromDate input')?.value || '';
    const toDate = form.querySelector('.toDate input')?.value || '';

    const month = monthSelect.value;
    const year = yearSelect.value;
    
  

    if(company === 'BE RICH LIMITED'){
      fetchData(`https://ctgshop.com/erp/API/xbill.ashx?type=get_berich&emp=${encodeURIComponent(em_Name)}&m=${Number(month)}&y=${Number(year)}`)
        .then((res)=>{
          
          if(res.status === true){
            incentive_overlay.style.display = 'none'
            const contentArea = document.getElementById('contentArea');

            contentArea.innerHTML = ""
            res.Data.forEach((item,index)=>{
              const html = `
                <div class=card>
                  <span class="cse">
                    <label>CSE PROFIT : </label>
                    <p class="cse_profit" id="cse_profit">${Number(item.Cse_profit).toLocaleString()}</p>
                  </span>
                  <span class="dse">
                    <label>DSE PROFIT : </label>
                    <p class="dse_profit" id="dse_profit">${Number(item.Dse_profit).toLocaleString()}</p>
                  </span>
                  <span class="total">
                    <label>TOTAL PROFIT : </label>
                    <p class="total_profit" id="total_profit">${Number(item.Tot_profit).toLocaleString()}</p>
                  </span>
                </div>
              `
              contentArea.insertAdjacentHTML('beforeend',html)
            })
          }else if(res.status === false){
            incentive_overlay.style.display = 'none'
            const contentArea = document.getElementById('contentArea');

            contentArea.innerHTML = ""
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              icon: "warning",
              title: `${res.message}`,
              showConfirmButton: false,
              showCloseButton: true,
              customClass: {
                popup: 'swal2-alert-custom-smallscreen'
              },
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
          }
        })
        .catch((error)=>console.log(error))
    }
    else if(company === 'BE FRESH LIMITED')
    {
      
      plan && plan.map((item)=>{
        const parts = item.split('-').map(part=>part.trim());

        if(parts.length > 1 && parts[0] === 'BF' && parts[parts.length - 1] === 'Bb' ){
          fetchData(`https://www.befreshbd.com/ZaraApi.ashx?type=get_data&rel_mng=${encodeURIComponent(formattedName)}&led_mo=${Number(month)}&led_yr=${Number(year)}`)
            .then((res)=>{
              
              if(res.status === true){
                incentive_overlay.style.display = 'none'
                const contentArea = document.getElementById('contentArea');
                contentArea.innerHTML = ""

                res.Data.forEach((item,index)=>{
                  const html =`
                    <div class="card" id="card">
                      <span>
                        <label>Domestic Ticket</label>
                        <p>${formatNumberWithThousandPositionComma(item.dom_cnt * 8)}</p>
                      </span>
                      <span>
                        <label>Domestic Ticket(Cor)</label>
                        <p>${formatNumberWithThousandPositionComma(item.domcor_cnt * 15)}</p>
                      </span>
                      <span>
                        <label>Indian Domestic</label>
                        <p>${formatNumberWithThousandPositionComma(item.indom_cnt * 12)}</p>
                      </span>
                      <span>
                        <label>Indian Domestic(Cor)</label>
                        <p>${formatNumberWithThousandPositionComma(item.indomcor_cnt * 25)}</p>
                      </span>
                      <span>
                        <label>International</label>
                        <p>${formatNumberWithThousandPositionComma(item.int_cnt * 20)}</p>
                      </span>
                      <span>
                        <label>International(Cor)</label>
                        <p>${formatNumberWithThousandPositionComma(item.intcor_cnt * 40)}</p>
                      </span>
                      <span>
                        <label>Umrah Ticket</label>
                        <p>${formatNumberWithThousandPositionComma(item.umrah_cnt * 50)}</p>
                      </span>
                      <span>
                        <label>Umrah Package</label>
                        <p>${formatNumberWithThousandPositionComma(item.umrah_pack_cnt * 1000)}</p>
                      </span>
                      <span>
                        <label>Total Visa</label>
                        <p>${formatNumberWithThousandPositionComma(item.visa_cnt * 50)}</p>
                      </span>
                      <span>
                        <label>Total Night(Hotel)</label>
                        <p>${formatNumberWithThousandPositionComma(item.nights_cnt * 50)}</p>
                      </span>
                      <span>
                        <label>Total Incentive Amount</label>
                        <p>${formatNumberWithThousandPositionComma(
                          (item.dom_cnt * 8) + 
                          (item.domcor_cnt * 15) + 
                          (item.indom_cnt * 12) +
                          (item.indomcor_cnt * 25) + 
                          (item.int_cnt * 20) + 
                          (item.intcor_cnt * 40) + 
                          (item.umrah_cnt * 50) +
                          (item.umrah_pack_cnt * 1000) +
                          (item.visa_cnt * 50) +
                          (item.nights_cnt * 50)
                        )}</p>
                      </span>
                    </div>
                  `
                  contentArea.insertAdjacentHTML('beforeend',html)
                })
              }else if(res.status === false){
                incentive_overlay.style.display = 'none'
                const contentArea = document.getElementById('contentArea');

                contentArea.innerHTML = ""
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  title: `${res.message}`,
                  showConfirmButton: false,
                  showCloseButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              }
            })
            .catch((error)=>console.log(error))
        } 
        else if(parts.length > 1 && parts[0] === 'BF' && parts[parts.length - 1] === 'A')
        {
          fetchData(`https://www.befreshbd.com/ZaraApi.ashx?type=get_accmang&acc_mng=${encodeURIComponent(formattedName)}&led_mo=${Number(month)}&led_yr=${Number(year)}`)
            .then((res)=>{
              console.log(res.Data)
              if(res.status === true){
                incentive_overlay.style.display = 'none'
                const contentArea = document.getElementById('contentArea');

                contentArea.innerHTML = ""
                res.Data.forEach((item,index)=>{
                  
                  const html =`
                    <div class="card" id="card">
                      <span>
                        <label>B2C_Incentive</label>
                        <p>${formatNumberWithThousandPositionComma(item.b2c_tot_p)}</p>
                      </span>
                      <span>
                        <label>B2B_None_Group_Incentive</label>
                        <p>${formatNumberWithThousandPositionComma(item.b2b_nongrp_tot_p)}</p>
                      </span>
                      <span>
                        <label>B2B_Grp_Incentive</label>
                        <p>${formatNumberWithThousandPositionComma(item.b2b_grp_tot_p)}</p>
                      </span>
                      <span>
                        <label>Total Incentive Amount</label>
                        <p>${formatNumberWithThousandPositionComma(item.tot_profit)}</p>
                      </span>
                    </div>
                  `
                  contentArea.insertAdjacentHTML('beforeend',html)

                })
              }else if(res.status === false){
                incentive_overlay.style.display = 'none'
                const contentArea = document.getElementById('contentArea');

                contentArea.innerHTML = ""
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  title: `${res.message}`,
                  showConfirmButton: false,
                  showCloseButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              }
            })
            .catch((error)=>console.log(error))
        } 
        else if(parts.length > 1 && parts[0] === 'BF' && parts[parts.length - 1] === 'Ba')
        {
          fetchData(`https://www.befreshbd.com/ZaraApi.ashx?type=get_data&rel_mng=${encodeURIComponent(formattedName)}&led_mo=${Number(month)}&led_yr=${Number(year)}`)
            .then((res)=>{
              if(res.status === true){
                incentive_overlay.style.display = 'none'
                const contentArea = document.getElementById('contentArea');

                contentArea.innerHTML = ""
                res.Data.forEach((item,index)=>{
                  const html =`
                  <div class="card" id="card">
                    <span>
                      <label>Domestic Ticket</label>
                      <p>${formatNumberWithThousandPositionComma(item.dom_cnt * 10)}</p>
                    </span>
                    <span>
                      <label>Domestic Ticket(Cor)</label>
                      <p>${formatNumberWithThousandPositionComma(item.domcor_cnt * 20)}</p>
                    </span>
                    <span>
                      <label>Indian Domestic</label>
                      <p>${formatNumberWithThousandPositionComma(item.indom_cnt * 15)}</p>
                    </span>
                    <span>
                      <label>Indian Domestic(Cor)</label>
                      <p>${formatNumberWithThousandPositionComma(item.indomcor_cnt * 30)}</p>
                    </span>
                    <span>
                      <label>International</label>
                      <p>${formatNumberWithThousandPositionComma(item.int_cnt * 25)}</p>
                    </span>
                    <span>
                      <label>International(Cor)</label>
                      <p>${formatNumberWithThousandPositionComma(item.intcor_cnt * 50)}</p>
                    </span>
                    <span>
                      <label>Umrah Ticket</label>
                      <p>${formatNumberWithThousandPositionComma(item.umrah_cnt * 50)}</p>
                    </span>
                    <span>
                      <label>Umrah Package</label>
                      <p>${formatNumberWithThousandPositionComma(item.umrah_pack_cnt * 1000)}</p>
                    </span>
                    <span>
                      <label>Total Visa</label>
                      <p>${formatNumberWithThousandPositionComma(item.visa_cnt * 50)}</p>
                    </span>
                    <span>
                      <label>Total Night(Hotel)</label>
                      <p>${formatNumberWithThousandPositionComma(item.nights_cnt * 50)}</p>
                    </span>
                    <span>
                      <label>Total Incentive Amount</label>
                      <p>${formatNumberWithThousandPositionComma(
                        (item.dom_cnt * 8) + 
                        (item.domcor_cnt * 15) + 
                        (item.indom_cnt * 12) +
                        (item.indomcor_cnt * 25) + 
                        (item.int_cnt * 20) + 
                        (item.intcor_cnt * 40) + 
                        (item.umrah_cnt * 50) +
                        (item.umrah_pack_cnt * 1000) +
                        (item.visa_cnt * 50) +
                        (item.nights_cnt * 50)
                      )}</p>
                    </span>
                  </div>
                `
                contentArea.insertAdjacentHTML('beforeend',html)
                })
              }else if(res.status === false){
                incentive_overlay.style.display = 'none'
                const contentArea = document.getElementById('contentArea');

                contentArea.innerHTML = ""
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  title: `${res.message}`,
                  showConfirmButton: false,
                  showCloseButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              }
            })
            .catch((error)=>console.log(error))
        } 
        else if(parts.length > 1 && parts[0] === 'BF' && parts[parts.length - 1] === 'Bb.')
        {
          fetchData(`https://www.befreshbd.com/ZaraApi.ashx?type=get_data&rel_mng=${encodeURIComponent(formattedName)}&led_mo=${Number(month)}&led_yr=${Number(year)}`)
          .then((res)=>{
            if(res.status === true){
              incentive_overlay.style.display = 'none'
              const contentArea = document.getElementById('contentArea');
                contentArea.innerHTML = ""

                res.Data.forEach((item,index)=>{
                  const html =`
                    <div class="card" id="card">
                      <span>
                        <label>Domestic Ticket</label>
                        <p>${formatNumberWithThousandPositionComma(item.dom_cnt * 8)}</p>
                      </span>
                      <span>
                        <label>Domestic Ticket(Cor)</label>
                        <p>${formatNumberWithThousandPositionComma(item.domcor_cnt * 15)}</p>
                      </span>
                      <span>
                        <label>Indian Domestic</label>
                        <p>${formatNumberWithThousandPositionComma(item.indom_cnt * 12)}</p>
                      </span>
                      <span>
                        <label>Indian Domestic(Cor)</label>
                        <p>${formatNumberWithThousandPositionComma(item.indomcor_cnt * 25)}</p>
                      </span>
                      <span>
                        <label>International</label>
                        <p>${formatNumberWithThousandPositionComma(item.int_cnt * 20)}</p>
                      </span>
                      <span>
                        <label>International(Cor)</label>
                        <p>${formatNumberWithThousandPositionComma(item.intcor_cnt * 40)}</p>
                      </span>
                      <span>
                        <label>Umrah Ticket</label>
                        <p>${formatNumberWithThousandPositionComma(item.umrah_cnt * 50)}</p>
                      </span>
                      <span>
                        <label>Umrah Package</label>
                        <p>${formatNumberWithThousandPositionComma(item.umrah_pack_cnt * 1000)}</p>
                      </span>
                      <span>
                        <label>Total Visa</label>
                        <p>${formatNumberWithThousandPositionComma(item.visa_cnt * 50)}</p>
                      </span>
                      <span>
                        <label>Total Night(Hotel)</label>
                        <p>${formatNumberWithThousandPositionComma(item.nights_cnt * 50)}</p>
                      </span>
                      <span>
                        <label>Total Incentive Amount</label>
                        <p>${formatNumberWithThousandPositionComma(
                          (item.dom_cnt * 8) + 
                          (item.domcor_cnt * 15) + 
                          (item.indom_cnt * 12) +
                          (item.indomcor_cnt * 25) + 
                          (item.int_cnt * 20) + 
                          (item.intcor_cnt * 40) + 
                          (item.umrah_cnt * 50) +
                          (item.umrah_pack_cnt * 1000) +
                          (item.visa_cnt * 50) +
                          (item.nights_cnt * 50)
                        )}</p>
                      </span>
                    </div>
                  `
                  contentArea.insertAdjacentHTML('beforeend',html)
                })
            }else if(res.status === false){
              incentive_overlay.style.display = 'none'
              const contentArea = document.getElementById('contentArea');

                contentArea.innerHTML = ""
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  title: `${res.message}`,
                  showConfirmButton: false,
                  showCloseButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
            }
          })
          .catch((error)=>console.log(error))
        } 
        else if(parts.length > 1 && parts[0] === 'BF' && parts[parts.length - 1] === 'Ba1')
        {
          fetchData(`https://www.befreshbd.com/ZaraApi.ashx?type=get_data&rel_mng=${encodeURIComponent(formattedName)}&led_mo=${Number(month)}&led_yr=${Number(year)}`)
            .then((res)=>{
              if(res.status === true){
                incentive_overlay.style.display = 'none'
                const contentArea = document.getElementById('contentArea');

                contentArea.innerHTML = ""
                res.Data.forEach((item,index)=>{
                  const html =`
                  <div class="card" id="card">
                    <span>
                      <label>Domestic Ticket</label>
                      <p>${formatNumberWithThousandPositionComma(item.dom_cnt * 10)}</p>
                    </span>
                    <span>
                      <label>Domestic Ticket(Cor)</label>
                      <p>${formatNumberWithThousandPositionComma(item.domcor_cnt * 20)}</p>
                    </span>
                    <span>
                      <label>Indian Domestic</label>
                      <p>${formatNumberWithThousandPositionComma(item.indom_cnt * 15)}</p>
                    </span>
                    <span>
                      <label>Indian Domestic(Cor)</label>
                      <p>${formatNumberWithThousandPositionComma(item.indomcor_cnt * 30)}</p>
                    </span>
                    <span>
                      <label>International</label>
                      <p>${formatNumberWithThousandPositionComma(item.int_cnt * 25)}</p>
                    </span>
                    <span>
                      <label>International(Cor)</label>
                      <p>${formatNumberWithThousandPositionComma(item.intcor_cnt * 50)}</p>
                    </span>
                    <span>
                      <label>Umrah Ticket</label>
                      <p>${formatNumberWithThousandPositionComma(item.umrah_cnt * 50)}</p>
                    </span>
                    <span>
                      <label>Umrah Package</label>
                      <p>${formatNumberWithThousandPositionComma(item.umrah_pack_cnt * 1000)}</p>
                    </span>
                    <span>
                      <label>Total Visa</label>
                      <p>${formatNumberWithThousandPositionComma(item.visa_cnt * 50)}</p>
                    </span>
                    <span>
                      <label>Total Night(Hotel)</label>
                      <p>${formatNumberWithThousandPositionComma(item.nights_cnt * 50)}</p>
                    </span>
                    <span>
                      <label>Total Incentive Amount</label>
                      <p>${formatNumberWithThousandPositionComma(
                        (item.dom_cnt * 8) + 
                        (item.domcor_cnt * 15) + 
                        (item.indom_cnt * 12) +
                        (item.indomcor_cnt * 25) + 
                        (item.int_cnt * 20) + 
                        (item.intcor_cnt * 40) + 
                        (item.umrah_cnt * 50) +
                        (item.umrah_pack_cnt * 1000) +
                        (item.visa_cnt * 50) +
                        (item.nights_cnt * 50)
                      )}</p>
                    </span>
                  </div>
                `
                contentArea.insertAdjacentHTML('beforeend',html)
                })
              }else if(res.status === false){
                incentive_overlay.style.display = 'none'
                const contentArea = document.getElementById('contentArea');

                contentArea.innerHTML = ""
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                  icon: "warning",
                  title: `${res.message}`,
                  showConfirmButton: false,
                  showCloseButton: true,
                  customClass: {
                    popup: 'swal2-alert-custom-smallscreen'
                  },
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });
              }
            })
            .catch((error)=>console.log(error))
        } 
        else 
        {
          incentive_overlay.style.display = 'none'
          const contentArea = document.getElementById('contentArea');
          contentArea.innerHTML = ""
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            title: `No Data`,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
              popup: 'swal2-alert-custom-smallscreen'
            },
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
        }
      });
      // const befresh_plan= plan.split 
    }
    else if(company === 'SOUTH EAST MONEY EXCHANGE LIMITED') 
    {
      console.log('clicked for SEME')
    }
    else if(company === 'BE FRESH EDUCATION & JOBS LIMITED') 
    {
      console.log('clicked for BFEJ')
    }

  });


}







// emCode: "BR-0293-16"
// emName: "MD. THANBIR AZIZ"
// emReportingBoss: "BR-0230-15"


// emCode: "BR-0465-18"
// emName : "SNEHAMAY NANDI"
// emReportingBoss: "BR-0324-16"

