


async function localStorageManager(action, key, value = null) {
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



// function localStorageManager(action, key, value = null) {
//     switch (action) {
//         case 'set':
//             localStorage.setItem(key, JSON.stringify(value));
//             break;
//         case 'get':
//             const storedValue = localStorage.getItem(key);
//             return storedValue ? JSON.parse(storedValue) : null;
//         case 'remove':
//             localStorage.removeItem(key);
//             break;
//         default:
//             console.error('Invalid action. Use "set", "get", or "remove".');
//     }
// }

const sessionStorageManagerSync = {
    setItem(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
  
    getItem(key) {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
  
    removeItem(key) {
      sessionStorage.removeItem(key);
    }
  };

  const sessionStorageManagerAsync = {
    async setItem(key, value) {
      return new Promise((resolve) => {
        setTimeout(() => {
          sessionStorage.setItem(key, JSON.stringify(value));
          resolve(true);
        }, 0);
      });
    },
  
    async getItem(key) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const value = sessionStorage.getItem(key);
          resolve(value ? JSON.parse(value) : null);
        }, 0);
      });
    },
  
    async removeItem(key) {
      return new Promise((resolve) => {
        setTimeout(() => {
          sessionStorage.removeItem(key);
          resolve(true);
        }, 0);
      });
    }
  };