


document.addEventListener("DOMContentLoaded", async () => {
    // Parse the query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Get the value of the parameter you want to use in the title
    const identity = urlParams.get("identity");
    const emName = urlParams.get("name");
    const bossId = urlParams.get("boss");
    const bossName = urlParams.get("bossName");



    const nav_div = document.getElementById('nav_div');
    const main = document.getElementById('main');

    main.style.height = `${(100 - pxToVh(nav_div.offsetHeight))}vh`;

    const response = await fetch("../helpers/dbs.json");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const parsedData = JSON.parse(data);

    main.innerHTML = ""; // Clear previous content

    // Create a single div to hold all buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container"); // Optional: Add a class for styling

    if (parsedData && parsedData.befreshPage) {
        parsedData.befreshPage.forEach((file) => {
            const itemBtn = document.createElement("button");
            const imageElement = document.createElement("img");

            imageElement.src = file;
            imageElement.alt = "No image";
            itemBtn.type = "button";

            itemBtn.appendChild(imageElement);
            buttonContainer.appendChild(itemBtn); // Add button to the same container


            itemBtn.addEventListener('click',()=>{
                const imgSrc = itemBtn.querySelector("img").src; // Get image source
                
                if(imgSrc === 'https://ctgshop.com/xapp/test/assets/buttons/befresh/bf_client_balance_icon.png'){
                    window.location.href = `https://ctgshop.com/xapp/test/pages/BefreshActivity.html?pageTitle="Befresh Client's Balance"&idenity=${identity}&name=${emName}&bossId=${bossId}&bossName=${bossName}`
                }else if(imgSrc === 'https://ctgshop.com/xapp/test/assets/buttons/befresh/bf_client_dues_icon.png'){
                    window.location.href = `https://ctgshop.com/xapp/test/pages/BefreshActivity.html?pageTitle="Befresh Client's Dues"&idenity=${identity}&name=${emName}&bossId=${bossId}&bossName=${bossName}`
                }else if(imgSrc === 'https://ctgshop.com/xapp/test/assets/buttons/befresh/bf_mr_icon.png'){
                    window.location.href = `https://ctgshop.com/xapp/test/pages/BefreshActivity.html?pageTitle="Befresh Money Receipt"&idenity=${identity}&name=${emName}&bossId=${bossId}&bossName=${bossName}`
                }else if(imgSrc === 'https://ctgshop.com/xapp/test/assets/buttons/befresh/bf_activity_report_log.png'){
                    window.location.href = `https://ctgshop.com/xapp/test/pages/BefreshActivity.html?pageTitle="Befresh Activity Report"&idenity=${identity}&name=${emName}&bossId=${bossId}&bossName=${bossName}`
                }else if(imgSrc === 'https://ctgshop.com/xapp/test/assets/buttons/befresh/bf_passenger_list_icon.png'){
                    window.location.href = `https://ctgshop.com/xapp/test/pages/BefreshActivity.html?pageTitle="Befresh Passenger List"&idenity=${identity}&name=${emName}&bossId=${bossId}&bossName=${bossName}`
                }else if(imgSrc === 'https://ctgshop.com/xapp/test/assets/buttons/befresh/bf_business_performance.png'){
                     window.location.href = `https://ctgshop.com/xapp/test/pages/BefreshActivity.html?pageTitle="Befresh Business Performance"&idenity=${identity}&name=${emName}&bossId=${bossId}&bossName=${bossName}`
                }
            })
        });
    }

    main.appendChild(buttonContainer); // Append the single div containing all buttons

    const back_button_handle = document.getElementById('bf_btn');
    back_button_handle && back_button_handle.addEventListener('click',()=>{
        window.location.href = `https://ctgshop.com/xapp/test/index.html?identity=${identity}&name=${encodeURIComponent(emName)}&boss=${bossId}&bossName=${bossName}`
    });
});
