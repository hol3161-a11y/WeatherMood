// ==================== 기본 선택값 세팅 ====================
const genderInputM = document.querySelector('input[value="m"]');
const genderInputW = document.querySelector('input[value="w"]');

const savedGender = sessionStorage.getItem("gender") || "m";

if (savedGender === "m") {
  if (genderInputM) genderInputM.checked = true;
} else {
  if (genderInputW) genderInputW.checked = true;
}

// ====================== input / button ====================
const el_genderInput = document.querySelectorAll(".genderOption input");
const el_tempInput = document.querySelectorAll(".temperatureOption input");
const el_langInput = document.querySelectorAll(".languageOption input");
const el_bgcInput = document.querySelectorAll(".bgcOption input");

const el_setBtn = document.querySelector(".setBtn button");

// ====================== 저장될 값 ====================
let selectedGender = sessionStorage.getItem("gender") || "m";
let selectedTemp = localStorage.getItem("temp") || "c";
let selectedLang = localStorage.getItem("lang") || "ko";
let selectedBgc = localStorage.getItem("bgc") || "green";

// ====================== checked 공통 함수 ====================
function checkedInput(selector, value) {
  const input = document.querySelector(`${selector} input[value="${value}"]`);

  if (input) {
    input.checked = true;
  }
}

checkedInput(".temperatureOption", selectedTemp);
checkedInput(".languageOption", selectedLang);
checkedInput(".bgcOption", selectedBgc);

// ====================== active 함수 ====================
function activeSaveBtn() {
  if (el_setBtn) {
    el_setBtn.classList.add("active");
  }
}

// ====================== 성별 선택 ====================
el_genderInput.forEach(function (input) {
  input.addEventListener("change", function () {
    selectedGender = this.value;
    activeSaveBtn();
  });
});

// ====================== 온도 선택 ====================
el_tempInput.forEach(function (input) {
  input.addEventListener("change", function () {
    selectedTemp = this.value;
    activeSaveBtn();
  });
});

// ====================== 언어 선택 ====================
el_langInput.forEach(function (input) {
  input.addEventListener("change", function () {
    selectedLang = this.value;
    activeSaveBtn();
  });
});

// ====================== 배경색 선택 ====================
el_bgcInput.forEach(function (input) {
  input.addEventListener("change", function () {
    selectedBgc = this.value;
    activeSaveBtn();
  });
});

// ====================== 저장 버튼 클릭 ====================
if (el_setBtn) {
  el_setBtn.addEventListener("click", function () {
    const prevGender = sessionStorage.getItem("gender") || "m";

    sessionStorage.setItem("gender", selectedGender);

    localStorage.setItem("temp", selectedTemp);
    localStorage.setItem("lang", selectedLang);
    localStorage.setItem("bgc", selectedBgc);

    if (prevGender !== selectedGender) {
      localStorage.removeItem("scrapList");
    }

    location.href = "./index.html";
  });
}