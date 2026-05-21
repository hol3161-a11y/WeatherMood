const el_Btn = document.querySelectorAll(".btn p");
const el_Img = document.querySelector(".codi");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal img");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close");
const starBtn = document.querySelector(".star-btn");
const appLoading = document.querySelector(".appLoading");


let imgData = null;
let currentTempGlobal = 20;

window.getSeasonByTemp = function (temp) {
  temp = Number(temp);

  if (temp <= 5) return "겨울";
  if (temp <= 15) return "가을";
  if (temp <= 23) return "봄";
  return "여름";
};

function getCurrentTemp() {
  const tempEl = document.querySelector("#currentTemp");

  if (!tempEl || !tempEl.innerText) return null;

  const temp = Number(tempEl.innerText.replace(/[^0-9-]/g, ""));
  return isNaN(temp) ? null : temp;
}

function hideLoading() {
  setTimeout(() => {
    if (appLoading) {
      appLoading.classList.add("hide");
    }
  }, 500);
}

function renderCodi(btn) {
  if (!imgData) return;

  el_Btn.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const realTemp = getCurrentTemp();

  if (realTemp !== null) {
    currentTempGlobal = realTemp;
  }

  const tab = btn.innerText;
  const season = getSeasonByTemp(currentTempGlobal);
  const gender = localStorage.getItem("gender") || "m";

  el_Img.innerHTML = "";

  if (
    !imgData[gender] ||
    !imgData[gender][tab] ||
    !imgData[gender][tab][season]
  ) {
    hideLoading();
    return;
  }

  imgData[gender][tab][season].forEach(function (item) {
    el_Img.innerHTML += `
      <p>
        <img 
          src="${item.src}"
          data-id="${item.id}" 
          data-top="${item.top}" 
          data-bottom="${item.bottom}"
        >
      </p>
    `;
  });

  hideLoading();
}

let codiImg = async function () {
  if (appLoading) {
    appLoading.classList.remove("hide");
  }

  let res = await fetch("./js/codi.json");
  imgData = await res.json();

  el_Btn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      renderCodi(btn);
    });
  });

  const waitWeather = setInterval(() => {
    const temp = getCurrentTemp();

    if (temp !== null) {
      clearInterval(waitWeather);
      currentTempGlobal = temp;

      if (el_Btn[0]) {
        renderCodi(el_Btn[0]);
      }
    }
  }, 100);

  setTimeout(() => {
    clearInterval(waitWeather);

    if (el_Img.innerHTML.trim() === "" && el_Btn[0]) {
      renderCodi(el_Btn[0]);
    }
  }, 3000);

  el_Img.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
      const img = e.target;

      modalImg.src = img.src;
      modalImg.dataset.id = img.dataset.id;

      const top = img.dataset.top;
      const bottom = img.dataset.bottom;

      const modalTop = document.getElementById("modalTop");
      const modalBottom = document.getElementById("modalBottom");

      if (modalTop) modalTop.innerText = `상의: ${top}`;
      if (modalBottom) modalBottom.innerText = `하의: ${bottom}`;

      overlay.classList.add("active");
      modal.classList.add("active");

      let scrapList = JSON.parse(localStorage.getItem("scrapList")) || [];

      resetStar();

      scrapList.forEach(function (scrapNum) {
        if (scrapNum == img.dataset.id) {
          starBtn.classList.add("active");
          starBtn.innerHTML = `<img src="./image/codi/Vector.svg" alt="star filled">`;
        }
      });
    }
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
};

function resetStar() {
  starBtn.classList.remove("active");
  starBtn.innerHTML = `<img src="./image/codi/Vector2.svg" alt="star empty">`;
}

resetStar();

starBtn.addEventListener("click", function () {
  let scrapList = JSON.parse(localStorage.getItem("scrapList")) || [];
  const imgId = modalImg.dataset.id;

  this.classList.toggle("active");

  if (this.classList.contains("active")) {
    this.innerHTML = `<img src="./image/codi/Vector.svg" alt="star filled">`;

    if (!scrapList.includes(imgId)) {
      scrapList.push(imgId);
    }
  } else {
    this.innerHTML = `<img src="./image/codi/Vector2.svg" alt="star empty">`;
    scrapList = scrapList.filter((v) => v != imgId);
  }

  localStorage.setItem("scrapList", JSON.stringify(scrapList));
});

function closeModal() {
  overlay.classList.remove("active");
  modal.classList.remove("active");

  setTimeout(() => {
    starBtn.innerHTML = `<img src="./image/codi/Vector2.svg" alt="star empty">`;
  }, 100);
}

codiImg();