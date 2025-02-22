// networkStatusHandler.js

function handleOffline() {
    alert("You are now offline.");
    // Additional actions here
}

function handleOnline() {
    alert("You are back online.");
    // Additional actions here
}

function addNetworkListeners() {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
}

// Expose functions globally
window.handleOffline = handleOffline;
window.handleOnline = handleOnline;
window.addNetworkListeners = addNetworkListeners;




// how to use this 

{
    /* <script src="../assets/js/networkStatusHandler.js"></script>
<script>
    // Manually call the functions defined in networkStatusHandler.js
    addNetworkListeners();
</script> */
}
