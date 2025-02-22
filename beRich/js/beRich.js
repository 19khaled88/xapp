
function calculateAnimationDuration(containerWidth, speed) {
    const duration = containerWidth / speed;
    return duration + 's'; 
}

function initializeMarqueeAnimation() {
    const marqueeContainer = document.getElementById('marqueeContainer');
    if (!marqueeContainer) {
        return; // Exit the function early
    }
    const containerWidth = marqueeContainer.offsetWidth; 
    const speed = 50;
    const animationDuration = calculateAnimationDuration(containerWidth, speed);

    marqueeContainer.style.animationDuration = animationDuration;
}
function navigatorComponent(url, componentName){
    // console.log(url);
    if(url){
        const urlParams= new URLSearchParams(window.location.search);
        // const inv_id = urlParams.get('inv_id')
        const name = urlParams.get('name')
        const emcode = urlParams.get('emcode')
        const extension =  '?name=' + name +'&emcode='+emcode
        
        window.location.href = url + extension   
    }else{
        document.getElementById('popUpOverlay').style.display = 'block'
        document.getElementById('popUpDiv').style.display = 'block'
        document.getElementById('popUpDiv').innerHTML = `
            <div class='popUpHead'>
                <h6>Alert</h6>
            </div>
            <div class='popUpBody'>
                <p>This segment will be available soon.</p>
            </div>
            <div id='popUpOkBtn' class='popUpFooter'>
                <p>OK</p>
            </div>
        `
        document.getElementById('popUpOkBtn').addEventListener('click', ()=>{
            document.getElementById('popUpOverlay').style.display = 'none'
            document.getElementById('popUpDiv').style.display = 'none'
        })
    }
}



initializeMarqueeAnimation()