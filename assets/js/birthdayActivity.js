// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const identity = urlParams.get("identity");
const name = urlParams.get("name");
const bossId = urlParams.get("boss");
const bossName = urlParams.get("bossName");
const bDay = urlParams.get("birthdays");

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("birthdayActivityMain").innerHTML = "";

  const html = `
        <div id="bday_content_top" class="bday_content_top">
            <img src="../assets/images/bday/birthday_top_img_2.jpg" width="100%" height="auto" alt="No Image"/>
        </div>
        <div id="bday_content" class="bday_content" style="display:flex;flex-direction:row;justify-content:center;align-items:center">
            <p style="margin:0;text-align:center">Wrok in progress</p>
        </div>
        <div id="bday_content_bottom" class="bday_content_bottom">
            <img src="../assets/images/bday/birthday_bottom_cake.jpg" width="100%" height="auto" alt="No Image"/>
        </div>
    `;

  document
    .getElementById("birthdayActivityMain")
    .insertAdjacentHTML("beforeend", html);

  document.getElementById("birthdayActivityMain").style.height = `
        ${
          100 -
          pxToVh(document.getElementById("birthdayActivityTop").offsetHeight)
        }vh
    `;

  waitForImagesToLoad(
    document.getElementById("birthdayActivityMain"),
    setBdayContentHeight
  );

  const back_btn = document.getElementById("birthday_Activity_back_btn");
  back_btn &&
    back_btn.addEventListener("click", () => {
      try {
        // const obj = JSON.parse(bDay)
        // let raw = obj[0];

        // if (typeof raw !== 'string') {
        //     console.error('raw is not a string:', raw);
        //     return;
        // }

        // // Step 1: Remove the outer curly braces
        // raw = raw.replace(/^{|}$/g, '');

        // const splited = raw.split("&")

        // let result = {};

        // splited.forEach(pair => {
        //     const [key, value] = pair.split('=');
        //     result[key] = decodeURIComponent(value)

        // })
        window.location.href = `https://ctgshop.com/xapp/test/index.html?identity=${identity}&name=${encodeURIComponent(
          name
        )}&boss=${bossId}&bossName=${bossName}`;
        // window.location.href = `https://ctgshop.com/xapp/test/index.html?identity=${identity}&name=${encodeURIComponent(result.name)}&boss=${result.boss}&bossName=${result.bossName}`
      } catch (error) {
        console.error("Error parsing bDay:", e);
      }

      // https://ctgshop.com/xapp/test/index.html?identity=BR-0277-15&name=MD.%20KHALED%20AHASAN&boss=BR-0017-08&bossName=
    });

  const parsedData = JSON.parse(bDay);

  if (parsedData.length > 0) {
    const bdayContent = document.getElementById("bday_content");
    bdayContent.innerHTML = "";

    bdayContent.style.position = "relative";

    const slides = [];

    parsedData.forEach((birthday, index) => {
      const container = document.createElement("span");
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "center";

      container.style.height = "100%";

      // Optional: Title text
      if (birthday.txtTitle) {
        const title = document.createElement("p");
        title.textContent = birthday.txtTitle;
        title.style.margin = "5px 0 0";
        title.style.fontSize = "1.2em";
        title.style.height = "40px";
        title.style.fontFamily = "'Roboto', sans-serif";
        container.appendChild(title);
      }

      // Optional: Add image if exists
      if (birthday.img) {
        const img = document.createElement("img");
        img.src = birthday.img;
        img.alt = "Birthday Image";
        img.style.display = "block";
        img.style.borderRadius = "50%";
        img.style.objectFit = "cover";
        img.style.height = "auto";
        img.style.width = "50%";
        img.classList.add("imgBtn");
        img.dataset.index = index;
        container.appendChild(img);
      }

      // Name text
      const name = document.createElement("p");
      name.textContent = birthday.txtBody || "No Name";
      name.style.margin = "10px 0 0";
      name.style.fontSize = "1.2rem";
      name.style.height = "50px";
      name.style.fontWeight = "bold";
      name.style.fontFamily = "'Roboto', sans-serif";
      container.appendChild(name);

      bdayContent.appendChild(container);
      slides.push(container);
    });

    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? "flex" : "none";
      });
    }

    showSlide(currentIndex);

    if (parsedData.length > 0) {
      // Navigation buttons
      const prevBtn = document.createElement("button");
      prevBtn.innerText = "Prev";
      prevBtn.style.position = "absolute";
      prevBtn.style.left = "10px";
      prevBtn.style.top = "50%";
      prevBtn.style.transform = "translateY(-50%)";
      prevBtn.style.padding = "10px";
      prevBtn.style.zIndex = "10";
      prevBtn.style.border = 'none';
      prevBtn.style.outline = 'none';
      prevBtn.style.backgroundColor = 'limegreen';
      prevBtn.style.color = 'white';
      prevBtn.style.fontSize = '15px';
      prevBtn.style.borderRadius = '5px';
      prevBtn.setAttribute('id','clickPrev');

      const nextBtn = document.createElement("button");
      nextBtn.innerText = "Next";
      nextBtn.style.position = "absolute";
      nextBtn.style.right = "10px";
      nextBtn.style.top = "50%";
      nextBtn.style.transform = "translateY(-50%)";
      nextBtn.style.padding = "10px";
      nextBtn.style.zIndex = "10";
      nextBtn.style.border = 'none';
      nextBtn.style.outline = 'none';
      nextBtn.style.backgroundColor = 'limegreen';
      nextBtn.style.color = 'white';
      nextBtn.style.fontSize = '15px';
      nextBtn.style.borderRadius = '5px';
      nextBtn.setAttribute('id','clickNext');

      bdayContent.appendChild(prevBtn);
      bdayContent.appendChild(nextBtn);

      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });

      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });
    }

    let isConfettiRunning = false; // global flag
    let isClickedNext = false;
    let firstImageLoaded = false;
   
    document.querySelectorAll(".imgBtn").forEach((img) => {
        const currentImgSrc = img.src;

        // Only act if the image src is valid
        if (!currentImgSrc) return;


      
        img && !firstImageLoaded ? firstImageLoaded = true : "";

        if(firstImageLoaded){
            
              
              var defaults = {
                scalar: 2,
                spread: 180,
                particleCount: 30,
                origin: { y: -0.1 },
                startVelocity: -35
              };
              
              confetti({
                ...defaults,
                shapes: [
                    {
                        path: 'M449.4 142c-5 0-10 .3-15 1a183 183 0 0 0-66.9-19.1V87.5a17.5 17.5 0 1 0-35 0v36.4a183 183 0 0 0-67 19c-4.9-.6-9.9-1-14.8-1C170.3 142 105 219.6 105 315s65.3 173 145.7 173c5 0 10-.3 14.8-1a184.7 184.7 0 0 0 169 0c4.9.7 9.9 1 14.9 1 80.3 0 145.6-77.6 145.6-173s-65.3-173-145.7-173zm-220 138 27.4-40.4a11.6 11.6 0 0 1 16.4-2.7l54.7 40.3a11.3 11.3 0 0 1-7 20.3H239a11.3 11.3 0 0 1-9.6-17.5zM444 383.8l-43.7 17.5a17.7 17.7 0 0 1-13 0l-37.3-15-37.2 15a17.8 17.8 0 0 1-13 0L256 383.8a17.5 17.5 0 0 1 13-32.6l37.3 15 37.2-15c4.2-1.6 8.8-1.6 13 0l37.3 15 37.2-15a17.5 17.5 0 0 1 13 32.6zm17-86.3h-82a11.3 11.3 0 0 1-6.9-20.4l54.7-40.3a11.6 11.6 0 0 1 16.4 2.8l27.4 40.4a11.3 11.3 0 0 1-9.6 17.5z',
                matrix: [0.020491803278688523, 0, 0, 0.020491803278688523, -7.172131147540983, -5.9016393442622945]
                    }
                ],
                colors: ['#ff9a00', '#ff7400', '#ff4d00']
              });
              confetti({
                ...defaults,
                shapes: [
                    {
                        path: 'M120 240c-41,14 -91,18 -120,1 29,-10 57,-22 81,-40 -18,2 -37,3 -55,-3 25,-14 48,-30 66,-51 -11,5 -26,8 -45,7 20,-14 40,-30 57,-49 -13,1 -26,2 -38,-1 18,-11 35,-25 51,-43 -13,3 -24,5 -35,6 21,-19 40,-41 53,-67 14,26 32,48 54,67 -11,-1 -23,-3 -35,-6 15,18 32,32 51,43 -13,3 -26,2 -38,1 17,19 36,35 56,49 -19,1 -33,-2 -45,-7 19,21 42,37 67,51 -19,6 -37,5 -56,3 25,18 53,30 82,40 -30,17 -79,13 -120,-1l0 41 -31 0 0 -41z',
                        matrix: [0.03597122302158273, 0, 0, 0.03597122302158273, -4.856115107913669, -5.071942446043165]  
                    }
                ],
                colors: ['#8d960f', '#be0f10', '#445404']
              });
              confetti({
                ...defaults,
                shapes: [{
                    path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
                matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
                }],
                colors: ['#f93963', '#a10864', '#ee0b93']
              });
        }

        
      img.addEventListener("touchstart", (event) => {
        if (isConfettiRunning) return;

        isConfettiRunning = true;

        // canvas-confetti animation (15s duration)
        const end = Date.now() + 15 * 1000;
        const colors = ["#bb0000", "#ffffff"];

        (function frame() {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          } else {
            isConfettiRunning = false;
          }
        })();
      });
    });
  } else {
    const content = document.getElementById("bday_content").querySelector("p");
    content.textContent = "No Data";
  }
});

function setBdayContentHeight() {
  const topHeight = document.getElementById("bday_content_top").offsetHeight;
  const bottomHeight = document.getElementById(
    "bday_content_bottom"
  ).offsetHeight;
  const birthdayTop =
    document.getElementById("birthdayActivityTop")?.offsetHeight || 0;

  const total = pxToVh(topHeight + bottomHeight + birthdayTop);
  document.getElementById("bday_content").style.height = `${100 - total}vh`;
}

function waitForImagesToLoad(container, callback) {
  const images = container.querySelectorAll("img");
  let loaded = 0;

  if (images.length === 0) return callback();

  images.forEach((img) => {
    if (img.complete) {
      loaded++;
      if (loaded === images.length) callback();
    } else {
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === images.length) callback();
      });
      img.addEventListener("error", () => {
        loaded++;
        if (loaded === images.length) callback();
      });
    }
  });
}

function pxToVh(px) {
  const vh = window.innerHeight / 100; // 1vh in pixels
  return px / vh; // Convert px to vh
}
