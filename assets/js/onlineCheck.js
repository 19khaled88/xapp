function handleOffline() {
    try {
      document.body.innerHTML = `
        <div style="text-align: center; margin-top: 20px;">
          <h2>No Internet Connection</h2>
          <p>It looks like you're offline. Please check your internet connection and try again.</p>
          <button 
          style="
            padding: 10px 30px; 
            background-color: #4CAF50; 
            color: white; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer;
            font-size: 16px;
            margin-top:10px;
          "
           onclick="reloadPage()">Retry</button>
        </div>
      `;
    } catch (error) {
      alert("An unexpected error occurred while processing the offline state.");
    }
  }


  function handleOnline() {
    try {
      location.reload(); // Reload the page when internet is back
    } catch (error) {
      alert("An unexpected error occurred while reloading the page.");
    }
  }


  function reloadPage() {
    try {
      if (navigator.onLine) {
        location.reload(); // Only reload if internet is available
      } else {
        alert("Still offline. Please check your connection.");
      }
    } catch (error) {
      alert("An unexpected error occurred while trying to reload the page.");
    }
  }


  // Add event listeners for online and offline events  
  window.addEventListener("offline", handleOffline);
  window.addEventListener("online", handleOnline);
   