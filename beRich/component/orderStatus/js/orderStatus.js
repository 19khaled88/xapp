let tempData
let isloaded = false
function handleBtn(btnID){
    switch (btnID) {   
        case "realTime":
            document.getElementById('realTime').style.borderBottom = '2px solid #ff0000'
            document.getElementById('realTime').style.color = '#ff0000'
            document.getElementById('oldStatus').style.borderBottom = 'none'
            document.getElementById('oldStatus').style.color = '#000'
            document.getElementById('realTimeContent').style.display = 'flex'
            document.getElementById('oldStatusContent').style.display = 'none'
            break;
        case "oldStatus":
            document.getElementById('oldStatus').style.borderBottom = '2px solid #ff0000'
            document.getElementById('oldStatus').style.color = '#ff0000'
            document.getElementById('realTime').style.borderBottom = 'none'
            document.getElementById('realTime').style.color = '#000'

            document.getElementById('realTimeContent').style.display = 'none'
            document.getElementById('oldStatusContent').style.display = 'flex'
            // if(!isloaded){
            //     showInvestorsScriptWise()
            //     isloaded = true
            // }
            
            // if(tempData && tempData.status === false){
            //     executeInvestorsTable()
            //     document.getElementById('popUpOverlay').style.display = 'block'
            //     document.getElementById('popUpDiv').style.display = 'block'
            //     document.getElementById('popUpDiv').innerHTML = `
            //         <div class='popUpHead'>
            //             <h6>Failed</h6>
            //         </div>
            //         <div class='popUpBody'>
            //             <p>${tempData.message}</p>
            //         </div>
            //         <div id='popUpOkBtn' class='popUpFooter'>
            //             <p>OK</p>
            //         </div>
            //     `
            //     document.getElementById('popUpOkBtn').addEventListener('click', ()=>{
            //         document.getElementById('popUpOverlay').style.display = 'none'
            //         document.getElementById('popUpDiv').style.display = 'none'
            //     })
            // }
            break;
    
        default:
            break;
    }
}
