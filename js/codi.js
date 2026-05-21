
    const el_Btn = document.querySelectorAll('.btn p');
    const el_Img = document.querySelector('.codi'); 
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal img');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.close');
    const starBtn = document.querySelector('.star-btn');

    let imgData = null;

    let currentTempGlobal = 9; // 기본값
    
    window.getSeasonByTemp = function (temp) {
      temp = Number(temp);
    
      if (temp <= 5) return "겨울";
      if (temp <= 15) return "가을";
      if (temp <= 23) return "봄";
      return "여름";
    }
    

    // JSON 불러오기
    let codiImg = async function () {
      let res = await fetch('./js/codi.json');
      imgData = await res.json();


      // 코디 스타일 5가지 클릭이벤트 
      el_Btn.forEach(function (btn) {

        btn.addEventListener('click', function () {

          el_Btn.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const tab = btn.innerText;
          const season = getSeasonByTemp(currentTempGlobal);
          

          el_Img.innerHTML = '';

          // 성별
          let gender = localStorage.getItem("gender") || "m";
          

          if (
            !imgData[gender] ||
            !imgData[gender][tab] || 
            !imgData[gender][tab][season]) return;

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
          


        });
        
      });


      const aside = document.querySelector('aside');

      // 코디 사진 클릭 이벤트 -> 팝업창
      el_Img.addEventListener('click', function (e) {

        if (e.target.tagName === 'IMG') {

          const img = e.target;

          modalImg.src = img.src;

          modalImg.dataset.id = img.dataset.id;

          // data 속성에서 바로 꺼냄 (JSON 다시 찾을 필요 없음)
          const top = img.dataset.top;
          const bottom = img.dataset.bottom;

          const modalTop = document.getElementById("modalTop");
          const modalBottom = document.getElementById("modalBottom");

          if (modalTop) modalTop.innerText = `상의: ${top}`;
          if (modalBottom) modalBottom.innerText = `하의: ${bottom}`;

          overlay.classList.add('active');
          modal.classList.add('active');

          //check scrapStaus
          let scrapList = JSON.parse(localStorage.getItem("scrapList")) || [];
          
          scrapList.forEach(function (scrapNum) {
            if (scrapNum == img.dataset.id) {
              starBtn.classList.add('active');
              starBtn.innerHTML = `<img src="./image/codi/Vector.svg" alt="star filled">`;
            }
          })

        }

      });

      // 닫기 버튼
      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', closeModal);

    }



    // ======= 코디 스크랩 ==========
      // 별 초기화 함수
    function resetStar() {
      starBtn.classList.remove('active');
      starBtn.innerHTML = `<img src="./image/codi/Vector2.svg" alt="star empty">`;
    }

    // 초기 상태 세팅
    resetStar();

    // 별 클릭이벤트 -> 스크랩

    starBtn.addEventListener('click', function () {
      let scrapList = JSON.parse(localStorage.getItem("scrapList")) || [];
      const imgId = modalImg.dataset.id;


      this.classList.toggle('active');

      if (this.classList.contains('active')) {
        // 클릭 → 채워진 별
        this.innerHTML = `<img src="./image/codi/Vector.svg" alt="star filled">`;
        if (!scrapList.includes(imgId)) {
          scrapList.push(imgId);
        }
      } else {
        // 클릭 → 빈 별
        this.innerHTML = `<img src="./image/codi/Vector2.svg" alt="star empty">`;
        scrapList = scrapList.filter((v) => v != imgId);
      }

      localStorage.setItem("scrapList", JSON.stringify(scrapList));
    });


    // 모달 닫기
    function closeModal() {
      overlay.classList.remove('active');
      modal.classList.remove('active');
      setTimeout(()=>{
        starBtn.innerHTML = `<img src="./image/codi/Vector2.svg" alt="star empty">`;
      },100)
    }


    
    

    codiImg();
  

