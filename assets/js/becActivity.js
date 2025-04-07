
const rootUrl = 'https://api.ctgshop.com';

// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
let page_title = urlParams.get("pageTitle")
const identity = urlParams.get("identity");
const emName = urlParams.get("name");
const bossId = urlParams.get("bossId");
const bossName = urlParams.get("bossName");
const imei = urlParams.get('imei');



document.addEventListener('DOMContentLoaded',()=>{ 


    // Remove double quotes from page_title if present
    if (page_title) {
        page_title = page_title.replace(/"/g, ""); // Removes all double quotes
    }

    // change page title
    document.getElementById('title').textContent = page_title

    if(page_title){
        switch(page_title){
            case "Be Fresh Education & Jobs Limited":
                bef_jobs_limited();
                break;
            case "Be Fresh Education Limited Entry":
                bef_edu_entry();
                break; 
            default: 
                bef_edu_view();

         } 

    }

    const back_button_handle = document.getElementById('bf_btn')
    back_button_handle && back_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/pages/Bec.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}&imei=${imei}`
    });


    const back_home_button_handle = document.getElementById('bf_home_btn');
    back_home_button_handle && back_home_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/index.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}`
    });


})

function bef_jobs_limited(){
    const main = document.getElementById('main');

    main.innerHTML = '';
    const html =`
        <p class="main_title" id="main_title">STUDENT UNDER PROCESS</p> 
        <div class="date_range" id="date_range">
            <div class="date" id="date">
            </div>
            <button class="bfe_btn" id="bfe_btn">OK</button>
        </div>
        <span id="as_on_date" class="as_on_date"></span>
        <div class="bfe_content" id="bfe_content">
           
        </div>
    `
    main.insertAdjacentHTML("beforeend",html);


    const startDatePickerInput = handleDateAndTime('fromDate');

    document.getElementById('date').appendChild(startDatePickerInput.elementName);

    document.getElementById('main').style.height = `${Math.floor(Number(100 - (pxToVh(document.getElementById('nav_div').offsetHeight) + 1)))}vh`;
    
    stu_under_proc(`${rootUrl}/xapi/emp_com.ashx?cmd=underprocess&dt1=&imei=all`);
    document.getElementById('bfe_btn').addEventListener('click',()=>{
        stu_under_proc(`${rootUrl}/xapi/emp_com.ashx?cmd=underprocess&dt1=&imei=all`)
    });
}


function bef_edu_entry(){

}

function bef_edu_view(){
   
}

function stu_under_proc(url){
    try {
        fetchData(url)
            .then((res)=>{
                const bf_view_data = res.split("|")
                
                // Extract the date
                const date = bf_view_data[0];
                if(date){
                    document.getElementById('as_on_date').textContent = `As on : ${date}`
                }

                // Get the rest of the entries
                const entries = bf_view_data.slice(1);

                
                // Create table HTML
                let tableHTML = `<table border="1" cellspacing="0" cellpadding="5">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>University</th>
                    </tr>
                </thead>
                <tbody>`;

                entries.forEach(entry => {
                    const parts = entry.split('=');
                    const name = parts[0] || '';
                    const country = parts[1] || '';
                    const university = parts[2] || '';
                    const sn = parts[3] || '';
            
                    tableHTML += `
                        <tr>
                            <td>${sn}</td>
                            <td>${name}</td>
                            <td>${country}</td>
                            <td>${university}</td>
                        </tr>`;
                });
            
                tableHTML += `</tbody></table>`;

                // Insert table into the bf_content div
                document.getElementById('bfe_content').innerHTML = tableHTML;

                document.getElementById('bfe_content').style.cssText = `
                     height: ${Math.floor(Number(100 - (pxToVh(
                        document.getElementById('nav_div').offsetHeight +
                        document.getElementById('main_title').offsetHeight +
                        document.getElementById('date_range').offsetHeight  +
                        document.getElementById('as_on_date').offsetHeight
                        
                        ) + 4)))}vh;
                `
                
                
            })
            .catch((error)=>{
                console.log(error)
            })
    } catch (error) {
        console.log(error) 
    }
}