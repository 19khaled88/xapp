async function localStorageManager(action, key, value = null) {
    //action: e.g set, get, remove etc.
    return new Promise((resolve, reject) => {
        try {
            switch (action) {
                case 'set':
                    localStorage.setItem(key, JSON.stringify(value));
                    resolve(); // Resolving the promise after setting the item
                    break;
                case 'get':
                    const storedValue = localStorage.getItem(key);
                   
                    resolve(storedValue ? JSON.parse(storedValue) : null); // Resolving the promise with the retrieved value
                    break;
                case 'remove':
                    localStorage.removeItem(key);
                    resolve(); // Resolving the promise after removing the item
                    break;
                default:
                    reject(new Error('Invalid action. Use "set", "get", or "remove".')); // Rejecting the promise in case of an invalid action
            }
        } catch (error) {
            reject(error); // Rejecting the promise in case of any errors
        }
    });
}