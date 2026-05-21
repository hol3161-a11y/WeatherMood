// ================맨처음 성별선택 온보딩 & 기록있으면 바로 메인===================
const onboarding = document.querySelector(".onboarding");
const main = document.querySelector(".main");

// 온보딩 완료 여부는 localStorage로 확인
const isOnboarded = localStorage.getItem("onboarding");

if (isOnboarded) {
  onboarding.style.display = "none";
  main.style.display = "block";
} else {
  onboarding.style.display = "block";
  main.style.display = "none";
}

// 성별선택값 저장 과정
const el_input = document.querySelectorAll(".genderOption input");
const el_button = document.querySelector(".onboarding button");

let selectedGender = localStorage.getItem("gender") || null;

el_input.forEach(function (ee) {
  ee.addEventListener("change", function () {
    selectedGender = this.value;
    el_button.classList.add("active");
  });
});

el_button.addEventListener("click", function () {
  if (!selectedGender) return;

  localStorage.setItem("gender", selectedGender);

  // 온보딩 완료 여부만 유지
  localStorage.setItem("onboarding", "true");

  onboarding.style.display = "none";
  main.style.display = "block";

  const waitTemp = setInterval(() => {
    const tempSky = JSON.parse(localStorage.getItem("tempSky"));

    if (tempSky) {
      clearInterval(waitTemp);
      loadCharacter();
    }
  }, 100);
});

// ============================배경색 설정시 메인배경색 바뀌게===============================
const el_mainBgc = document.querySelector(".main");

if (!localStorage.getItem("bgc")) {
  localStorage.setItem("bgc", "green");
}

let selectedBgc = localStorage.getItem("bgc") || "green";

const gradientBgc = {
  gray: "linear-gradient(to bottom, #EBEBEB 0%, #999999 100%)",
  green: "linear-gradient(to bottom, #CFFFF1 0%, #00CE93 77%, #12A77C 100%)",
  blue: "linear-gradient(to bottom, #cbe0ff 0%, #6ea3f3 77%, #458bf5 100%)",
  purple: "linear-gradient(to bottom, #dbd3ff 0%, #a08bff 77%, #8164ff 100%)",
  yellow: "linear-gradient(to bottom, #ffeab1 0%, #e4c267 77%, #dbad2c 100%)",
};

if (el_mainBgc) {
  el_mainBgc.style.background = gradientBgc[selectedBgc];
}

// ====================뒷 날씨 렌더링아이콘(비)======================
const container = document.querySelector(".rain_drop-container");

if (container) {
  for (let i = 0; i < 5; i++) {
    const drop = document.createElement("img");

    drop.setAttribute("src", "./image/index/weather/weather_rain.png");
    drop.classList.add("drop");

    drop.style.width = "20px";
    drop.style.left = i * 9 + "%";
    drop.style.animationDuration = 1.5 + Math.random() * 0.2 + "s";
    drop.style.animationDelay = Math.random() * 2 + "s";

    container.append(drop);
  }
}

// ====================뒷 날씨 렌더링아이콘(비/눈)======================
const container2 = document.querySelector(".rainSnow_drop-container");

if (container2) {
  for (let i = 0; i < 5; i++) {
    const drop2 = document.createElement("img");

    drop2.setAttribute("src", "./image/index/weather/weather_rain.png");
    drop2.classList.add("drop");

    drop2.style.width = "20px";
    drop2.style.left = i * 9 + "%";
    drop2.style.animationDuration = 1.5 + Math.random() * 0.2 + "s";
    drop2.style.animationDelay = Math.random() * 2 + "s";

    container2.append(drop2);
  }

  for (let i = 0; i < 5; i++) {
    const drop2 = document.createElement("img");

    drop2.setAttribute("src", "./image/index/weather/weather_snow.png");
    drop2.classList.add("drop");

    drop2.style.width = "20px";
    drop2.style.left = i * 9 + "%";
    drop2.style.animationDuration = 1.5 + Math.random() * 0.2 + "s";
    drop2.style.animationDelay = Math.random() * 2 + "s";

    container2.append(drop2);
  }
}

// =================세팅 아이콘 누르면 set.html로=========================
const el_mainSetting = document.querySelector(".mainSetting span");

if (el_mainSetting) {
  el_mainSetting.addEventListener("click", function () {
    location.href = "./set.html";
  });
}

// ========기온,성별에 따라 메인 캐릭터 바뀌게 /날씨에 따라 추천아이템과 멘트 바뀌게========
const el_mainCharacter = document.querySelector(".character");
const el_mainItem = document.querySelector(".item");

let loadCharacter = async function () {
  const res = await fetch("./js/index.json");
  const data = await res.json();

  let tempSky = JSON.parse(localStorage.getItem("tempSky"));

  if (!tempSky) return;

  let genderCheck =  localStorage.getItem("gender") || "m";

  let resultCodi = data.캐릭터옷.find(function (ss) {
    return tempSky.temp >= ss.min && tempSky.temp <= ss.max;
  });

  if (!resultCodi) return;

  let imgpng = resultCodi.img[genderCheck];

  if (el_mainCharacter) {
    el_mainCharacter.innerHTML = `<img src="${imgpng}" alt="">`;
  }

  let dustText = localStorage.getItem("dust");

  if (!el_mainItem) return;

  if (
    tempSky.skyText == "비" ||
    tempSky.skyText == "비/눈" ||
    tempSky.skyText == "눈" ||
    tempSky.skyText == "소나기"
  ) {
    el_mainItem.innerHTML = `
      <img src="./image/index/item/item_rain.png" alt="">
      <span>비가 옵니다.<br> 우산을 챙기세요!</span>
    `;
  } else {
    if (dustText == "나쁨" || dustText == "매우나쁨") {
      el_mainItem.innerHTML = `
        <img src="./image/index/item/item_dust.png" alt="">
        <span>미세먼지 주의!<br> 마스크를 챙기세요!</span>
      `;
    } else {
      if (tempSky.temp > 26) {
        el_mainItem.innerHTML = `
          <img src="./image/index/item/item_hot.png" alt="">
          <span>매우 덥습니다.<br> 손풍기를 챙기세요!</span>
        `;
      } else if (tempSky.temp > 10) {
        el_mainItem.innerHTML = `
          <img src="./image/index/item/item_shoes.png" alt="">
          <span>밖에서 활동하기 <br> 좋은 날씨입니다!</span>
        `;
      } else {
        el_mainItem.innerHTML = `
          <img src="./image/index/item/item_headset.png" alt="">
          <span>음악을 들으며<br> 힐링을 해보세요!</span>
        `;
      }

      if (tempSky.temp <= -5) {
        el_mainItem.innerHTML = `
          <img src="./image/index/item/item_cold.png" alt="">
          <span>매우 춥습니다.<br> 장갑을 챙기세요!</span>
        `;
      }
    }
  }

  // ==============날씨(하늘상태)에 따라 메인 날씨아이콘(3D)바뀌게================
  const el_mainWeather3D = document.querySelectorAll(".weather > div");

  el_mainWeather3D.forEach(function (item) {
    item.classList.remove("active");
  });

  switch (tempSky.skyText) {
    case "비":
      if (el_mainWeather3D[0]) el_mainWeather3D[0].classList.add("active");
      break;
    case "비/눈":
      if (el_mainWeather3D[1]) el_mainWeather3D[1].classList.add("active");
      break;
    case "눈":
      if (el_mainWeather3D[2]) el_mainWeather3D[2].classList.add("active");
      break;
    case "소나기":
      if (el_mainWeather3D[0]) el_mainWeather3D[0].classList.add("active");
      break;
    case "맑음":
      if (el_mainWeather3D[3]) el_mainWeather3D[3].classList.add("active");
      break;
    case "구름(살짝흐림)":
      if (el_mainWeather3D[4]) el_mainWeather3D[4].classList.add("active");
      break;
    case "흐림":
      if (el_mainWeather3D[5]) el_mainWeather3D[5].classList.add("active");
      break;
  }
};

window.addEventListener("load", () => {
  const loading = document.querySelector(".appLoading");

  setTimeout(() => {
    if (loading) loading.classList.add("hide");

    if (localStorage.getItem("onboarding")) {
      loadCharacter();
    }
  }, 1200);
});