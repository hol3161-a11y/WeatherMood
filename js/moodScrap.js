// ===============음악 스크랩한 id값 가져와서 보관함에 넣기====================

// mood-playlist.json 전체 코디 데이터 불러옴
let dataFilter = [];
let loadScrap = async function () {
    const res = await fetch('./js/mood-playlist.json')
    const data = await res.json();
    
    let scrapIdMood = JSON.parse(localStorage.getItem('moodList')) || [];
    const scrapItem = document.querySelector('.moodScrapContainer2')
    
    
    dataFilter = [];
    // 저장함수
    let saveIdFun=function(){
        scrapIdMood.forEach(function (ss, i) {/* 스크랩해서 scrapList에 있는 옷들의 id값 전체 ss의 i개만큼 반복 */
                for (let mood in data[0]) {/* 전체 데이터 안에서 스타일 */
                     {data[0][mood].forEach(function (v, i) {/* 전체 데이터 안에서 스타일 안에서 계절까지 들어와서 그 안에있는 여러 배열조합 v를 i개만큼 반복 */
                            ss == v.id ? dataFilter.push(v) : '';/* 위에서 누른 스크랩된 id값과 배열조합 v의 id값이 같다면 그 v를 dataFilter에 넣기 */
                            })
                     }  
                }
            })
        }
    saveIdFun();

    // 출력함수
    let printImgFun = function () {
        console.log('sdf')
        scrapItem.innerHTML = '';/* 누를때마다 추가되지 않게 */
        if(dataFilter.length){
            dataFilter.forEach(function (v, i) {     
                console.log(i)
            scrapItem.innerHTML += `<div class="list"
                            style="background: url(${v.src}) 0 0 / cover no-repeat fixed;" data-id="${v.id}">                        
                            <img src="./image/mood/LP_bg 1.png" alt="">
                            <p >${v['lp-txt']}</p></div>`   
            })
        }else{
            scrapItem.innerHTML = `<span>아직 저장한 음악이 없어요!</span>`
        }
        popupFun();
    }
    printImgFun();
}

loadScrap();

// =====================눌렀을때 팝업창==========================
function popupFun(){
    const el_Img = document.querySelectorAll('.moodScrapContainer2 .list'); 
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-video');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.close');
    const starBtn = document.querySelector('.star-btn');
    const aside = document.querySelector('aside');
    
    const title = document.querySelector('.title > p');
    const modalList = document.querySelector('.modal-list');
    const button = document.querySelector(".btn-area > a");

    
// 코디 사진 클릭 이벤트 -> 팝업창
    let plmd = function (id) {
        title.innerHTML = '';
        let tag = '';

        let content = dataFilter.filter(function(v){
            return v.id == id
        });
        title.innerHTML += `${content[0]['lp-txt']}`;
        modalImg.setAttribute('data-id',content[0].id)

        if(typeof content[0]['modal-list'] != 'string'){
            content[0]['modal-list'].forEach(function(v){
                tag += `<p>${v}</p>`;
            })
        }else{
            content[0]['modal-list'].split('\n').forEach(function(v){
                tag += `<p>${v}</p>`;
            })
        }
        modalList.innerHTML = tag;
        
        button.setAttribute("href", `${content[0].link}`);


        //check scrapStaus
        let scrapList = JSON.parse(localStorage.getItem("moodList")) || [];
        
        scrapList.forEach(function (scrapNum) {
            if (scrapNum == content[0].id) {
            starBtn.classList.add('active');
            starBtn.innerHTML = `<img src="./image/codi/Vector.svg" alt="star filled">`;
            }
        })

            modalList.scrollTo(0,0);
    };


     el_Img.forEach(function (list) {
      list.addEventListener('click', function (e) {

         overlay.classList.add('active');
            modal.classList.add('active');
            plmd(this.dataset.id);

      });
    });

      // 닫기 버튼
      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', closeModal);

// ================별 누르면 지워지게===================
        // // 초기 상태: 채워진 별
        starBtn.innerHTML = `<img src="./image/codi/Vector.svg" alt="star filled">`;


        // 별 클릭이벤트 -> 스크랩

        starBtn.onclick = function () {
        
        const imgId = modalImg.dataset.id;
        if (!imgId) return;
        let scrapList = JSON.parse(localStorage.getItem("moodList")) || [];

            // 별상태 바꾸기
            this.classList.toggle('active');
            this.innerHTML = this.classList.contains("active") 
            ? `<img src="./image/codi/Vector.svg" alt="star filled">` 
            : `<img src="./image/codi/Vector2.svg" alt="star empty">`;

            // 빈 별로 바뀌면 localStorage에서 제거
           if (!this.classList.contains("active")) {
                scrapList = scrapList.filter(v => String(v) !== String(imgId));
            }else {
                if (!scrapList.includes(imgId)) {
                    scrapList.push(imgId);
                }
            }
            localStorage.setItem("moodList", JSON.stringify(scrapList));
        };


        
        // 모달 닫기
        function closeModal() {
            overlay.classList.remove('active');
            modal.classList.remove('active');
            setTimeout(()=>{
                starBtn.innerHTML = `<img src="./image/codi/Vector2.svg" alt="star empty">`;
                loadScrap();
            },100)
        }
    }