const appLoading = document.querySelector(".appLoading");

// Initialize Swiper
let playlistSwiper = function () {
  const swiper = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    slidesPerView: 2.7,
    centeredSlides: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
};

let dataJson = async function () {

  let res = await fetch("./js/mood-playlist.json");
  let data = await res.json();
  let dataFilter = [];

  let filterFun = function (f, n) {
    let ranNum = new Set();

    for (let i = 0; i < 100; i++) {
      let ran = Math.floor(Math.random() * f.length);

      if (ranNum.size < n) {
        ranNum.add(ran);
      }
    }

    [...ranNum].forEach(function (key) {
      dataFilter.push(f[key]);
    });
  };

  if (weatherState.innerText.match("비") || weatherState.innerText.match("소나기")) {
    let f1 = [...data[0].rain];
    let f2 = [...data[0].calm, ...data[0].hip, ...data[0].none];

    filterFun(f1, 4);
    filterFun(f2, 3);
  } else {
    let temp = Number(
      currentTemp.innerText.substring(2, currentTemp.innerText.lastIndexOf("°"))
    );

    if (temp < 9) {
      let f1 = [...data[0].winter];
      let f2 = [...data[0].calm, ...data[0].hip, ...data[0].none];
      let f3 = [...data[0].clean];

      filterFun(f1, 4);
      filterFun(f2, 2);
      if (weatherState.innerText.match("맑음")) filterFun(f3, 1);
    } else if (temp > 19) {
      let f1 = [...data[0].summer];
      let f2 = [...data[0].calm, ...data[0].hip, ...data[0].none];
      let f3 = [...data[0].clean];

      filterFun(f1, 4);
      filterFun(f2, 2);
      if (weatherState.innerText.match("맑음")) filterFun(f3, 1);
    } else {
      let f1 = [...data[0].sports, ...data[0].spring];
      let f2 = [...data[0].calm, ...data[0].hip, ...data[0].none];
      let f3 = [...data[0].clean];

      filterFun(f1, 4);
      filterFun(f2, 2);
      if (weatherState.innerText.match("맑음")) filterFun(f3, 1);
    }
  }

  // 스와이퍼 리스트 출력
  const el_list = document.querySelector(".playlist ul");
  el_list.innerHTML = "";

  dataFilter.forEach(function (v, i) {
    el_list.innerHTML += `
      <li class="list swiper-slide" data-id="${v.id}"
        style="background: url(${v.src}) 0 0 / cover no-repeat fixed;">                        
        <img class="lp" src="./image/mood/LP_bg 1.png" alt="">
        <p class="lp-txt">${v["lp-txt"]}</p>
      </li>
    `;
  });

  playlistSwiper();
  modalFun(dataFilter);

  // 야외활동 리스트
  let ac = [];

  if (weatherState.innerText.match("비") || weatherState.innerText.match("소나기")) {
    ac.push(...data[1].rain);
  } else if (weatherState.innerText.match("눈")) {
    ac.push(...data[1].snow);
  } else {
    let temp = Number(
      currentTemp.innerText.substring(2, currentTemp.innerText.lastIndexOf("°"))
    );

    if (temp < 1) {
      ac.push(...data[1].cold);
    } else if (temp < 15) {
      ac.push(...data[1].cool);
    } else if (temp < 28) {
      ac.push(...data[1].warm);
    } else {
      ac.push(...data[1].hot);
    }
  }

  const el_list2 = document.querySelector(".activity-card");
  el_list2.innerHTML = "";

  ac.forEach(function (v, i) {
    el_list2.innerHTML += `
      <li class="activity-01">
        <p>${v.P}</p>
        <div class="activity-text">
          <p>${v.text}</p>
          <p class="desc">${v.desc}</p>
        </div>
      </li>
    `;
  });

  // 리스트 다 들어오면 로딩 숨기기
  setTimeout(() => {
    if (appLoading) {
      appLoading.classList.add("hide");
    }
  }, 500);
};

let modalFun = function (dataFilter) {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modal-video");
  const overlay = document.querySelector(".overlay");
  const closeBtn = document.querySelector(".close");
  const starBtn = document.querySelector(".star-btn");

  const title = document.querySelector(".title > p");
  const modalList = document.querySelector(".modal-list");
  const button = document.querySelector(".btn-area > a");

  // 모달내용
  let plmd = function (id) {
    title.innerHTML = "";
    let tag = "";

    let content = dataFilter.filter(function (v) {
      return v.id == id;
    });

    title.innerHTML += `${content[0]["lp-txt"]}`;
    modalImg.setAttribute("data-id", content[0].id);

    if (typeof content[0]["modal-list"] != "string") {
      content[0]["modal-list"].forEach(function (v) {
        tag += `<p>${v}</p>`;
      });
    } else {
      content[0]["modal-list"].split("\n").forEach(function (v) {
        tag += `<p>${v}</p>`;
      });
    }

    modalList.innerHTML = tag;
    button.setAttribute("href", `${content[0].link}`);

    // check scrapStatus
    let scrapList = JSON.parse(localStorage.getItem("moodList")) || [];

    scrapList.forEach(function (scrapNum) {
      if (scrapNum == content[0].id) {
        starBtn.classList.add("active");
        starBtn.innerHTML = `<img src="./image/codi/Vector.svg" alt="star filled">`;
      }
    });

    modalList.scrollTo(0, 0);
  };

  // 별 초기화 함수
  function resetStar() {
    starBtn.classList.remove("active");
    starBtn.innerHTML = `<img src="./image/codi/Vector2.svg" alt="star empty">`;
  }

  resetStar();

  // 별 클릭 이벤트
  starBtn.addEventListener("click", function () {
    let scrapList = JSON.parse(localStorage.getItem("moodList")) || [];
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

    localStorage.setItem("moodList", JSON.stringify(scrapList));
  });

  // 이미지 클릭
  const playlist = document.querySelectorAll(".list");

  playlist.forEach(function (item) {
    item.addEventListener("click", function () {
      resetStar();

      overlay.classList.add("active");
      modal.classList.add("active");

      plmd(this.dataset.id);
    });
  });

  // 닫기 버튼
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  function closeModal() {
    overlay.classList.remove("active");
    modal.classList.remove("active");
    resetStar();
  }
};