

// ===============코디 스크랩한 id값 가져와서 보관함에 넣기====================
// codi.json 전체 코디 데이터 불러옴
let loadScrap = async function (t) {/* active된 버튼의 이름 */
    const res = await fetch('./js/codi.json')
    const data = await res.json();

    let scrapId = JSON.parse(localStorage.getItem('scrapList')) || [];
    let scrapGender = localStorage.getItem('gender') || '';
    const scrapItem = document.querySelector('.scrapItem')
    const empty = document.querySelector('.empty')
    let dataFilter = [];

    console.log(scrapId)

    // 저장함수
    let saveIdFun = function () {
        scrapId.forEach(function (ss, i) {/* 스크랩해서 scrapList에 있는 옷들의 id값 전체 ss의 i개만큼 반복 */
            for (let key in data[scrapGender]) {/* 전체 데이터 안에서 스타일 */
                for (let k in data[scrapGender][key]) {/* 전체 데이터 안에서 스타일 안에서 계절 */
                    data[scrapGender][key][k].forEach(function (v, i) {/* 전체 데이터 안에서 스타일 안에서 계절까지 들어와서 그 안에있는 여러 배열조합 v를 i개만큼 반복 */
                        ss == v.id ? dataFilter.push(v) : '';/* 위에서 누른 스크랩된 id값과 배열조합 v의 id값이 같다면 그 v를 dataFilter에 넣기 */
                    })

                    // console.log(data[key][k])/* 5개 스타일중 각각의 계절을 하나의 배열묶음으로 */
                    // console.log(data[key])/* 사계절 X 5개 스타일 X 네번반복 */
                    // console.log(k)/* 사계절 X 5개 스타일 */
                }
                // console.log(key)/* 5개 스타일 */
            }
            // console.log(ss)/* 스크랩한 사진 id값 */
        })
    }
    saveIdFun();


    // 출력함수
    let printImgFun = function (a) {/* active된 버튼의 이름 -> a */

        // dataFilter안에 있는 obj들의 src들 중에 a를 포함하면 배출해서 찾아라->dataFilter안에 들어온 값들중 active된 버튼의 이름과 같은 스타일값(창) 뽑기
        let find = dataFilter.find(function (obj) { /* 분류가 5개면 5번 다 실행 */
            return obj.src.includes(a) /* --> ex) 캐주얼 */
        });
        // let find =  dataFilter.find(obj=> obj.src.includes(a)); 위랑 같음

        scrapItem.innerHTML = '';/* 누를때마다 추가되지 않게 */
        if (find) {/* find를 통해 값이 나온 스타일창이면(분류 5개중 3개의 스타일만 나왔으면 3번만 실행) */
            dataFilter.forEach(function (v, i) {/* dataFilter안에 있는 스타일들의 스타일창들만 실행 */
                if (v.src.includes(a)) {/*이걸 넣어야 하나하나 분류 A(a,b),B(a,b),C --> A(a),B(b),C */
                    // 돌린 값들 중에서 src안에 active된 버튼의 이름이 포함되있으면 그 active된 스타일창에 출력하고 empty는 숨기게
                    scrapItem.style.display = '';
                    empty.style.display = 'none'
                    scrapItem.innerHTML += `<img src="${v.src}" alt="" data-id="${v.id}"
                                      data-top="${v.top}" 
                                    data-bottom="${v.bottom}"
                  >`
                }
            })
        } else {/* 스타일값 뽑힌게 없는 스타일창이면 */
            scrapItem.style.display = 'none';
            empty.style.display = 'block';
            empty.innerHTML = `<span>선택한 스타일에 맞는 코디가 없어요!</span>`
        }

    }
    printImgFun(t);/* active된 버튼의 이름 -> a */
    
}
const activeBtn = document.querySelector('.styleBtn .active')
loadScrap(activeBtn.textContent);/* active된 버튼의 이름 -> t */



// ===========================코디 스타일 버튼===========================
const el_styleBtn = document.querySelectorAll('.styleBtn p');

el_styleBtn.forEach(function (btn, k) {
    btn.addEventListener('click', function () {
        el_styleBtn.forEach(function (ee, i) {
            ee.classList.remove('active')
        })
        btn.classList.add('active')
        loadScrap(btn.textContent.trim())/* innerText와 유사,trim은 앞뒤 빈 공간 잘라줌 */
    });
});

// ========================코디 사진 클릭 이벤트 -> 팝업창=========================

const el_Img = document.querySelector('.scrapItem');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal img');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close');
const starBtn = document.querySelector('.star-btn');

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

        //스크랩 되있는 것들이므로(scrapList.includes(img.dataset.id)) 바로 active넣어줘서 별 채워주기
        let scrapList = JSON.parse(localStorage.getItem("scrapList")) || [];


        starBtn.classList.add('active');
        starBtn.innerHTML = `<img src="./image/codi/Vector.svg" alt="star filled">`;

    }

});

// 닫기 버튼
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// ================별 누르면 지워지게===================
// // 초기 상태: 채워진 별
starBtn.innerHTML = `<img src="./image/codi/Vector.svg" alt="star filled">`;


// 별 클릭이벤트 -> 스크랩

starBtn.addEventListener('click', function () {

    const imgId = modalImg.dataset.id;
    if (!imgId) return;
    let scrapList = JSON.parse(localStorage.getItem("scrapList")) || [];

    // 별상태 바꾸기
    this.classList.toggle('active');
    this.innerHTML = this.classList.contains("active")
        ? `<img src="./image/codi/Vector.svg" alt="star filled">`
        : `<img src="./image/codi/Vector2.svg" alt="star empty">`;

    // 빈 별로 바뀌면 localStorage에서 제거
    if (!this.classList.contains("active")) {
        scrapList = scrapList.filter(v => String(v) !== String(imgId));
       
    } else {
        if (!scrapList.includes(imgId)) {
            scrapList.push(imgId);
        }
    }
     localStorage.setItem("scrapList", JSON.stringify(scrapList));
});


// 모달 닫기
function closeModal() {
    overlay.classList.remove('active');
    modal.classList.remove('active');
    setTimeout(() => {
        starBtn.innerHTML = `<img src="./image/codi/Vector2.svg" alt="star empty">`;
        const activeBtn = document.querySelector('.styleBtn .active')
        loadScrap(activeBtn.textContent);
    }, 100)
}