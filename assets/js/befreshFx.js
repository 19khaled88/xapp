document.addEventListener("DOMContentLoaded", async () => {
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

    if (parsedData && parsedData.befreshFxPage) {
        parsedData.befreshFxPage.forEach((file) => {
            const itemBtn = document.createElement("button");
            const imageElement = document.createElement("img");

            imageElement.src = file;
            imageElement.alt = "No image";
            itemBtn.type = "button";

            itemBtn.appendChild(imageElement);
            buttonContainer.appendChild(itemBtn); // Add button to the same container
        });
    }

    main.appendChild(buttonContainer); // Append the single div containing all buttons
});
