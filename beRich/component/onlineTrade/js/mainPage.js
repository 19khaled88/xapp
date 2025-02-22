let user = null;
    // const storedData = sessionStorage.getItem('loginData');
    // if (storedData) {
    //     const loginData = JSON.parse(storedData);
    //     user = loginData[0]
    // }else{
    //     window.location.href = '../index.html';
    // } 

    // let dashBoardData = null;
    // const storedDashBoardData = sessionStorage.getItem('dashBoard');
   
    // if (storedDashBoardData) {
    //     dashBoardData = JSON.parse(storedDashBoardData); 
    // }
// console.log(user)
// console.log(dashBoardData)











function showSettings(){
    document.getElementById('settings').style.display = 'block'
    document.getElementById('overlay').style.display = 'block';
    
}
function closeSettings(){
    document.getElementById('settings').style.display = 'none'
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('overlay').style.zIndex = '1001';
    document.body.style.overflow = 'scroll';
}





// async function isBoAccountOpened(){
//     const fetchedData = await getBoStatus(user.LoggedInInvestorId)
//     if (fetchedData.status === true) {
//         boData = fetchedData.Data
//     }
//     if (boData[0].bo_id !== '') {
//         const item =  document.getElementById('boAccountOpenListItem')
//         if(item){
//             item.style.display = 'none'
//         }
        
//     }
// }
// isBoAccountOpened()
