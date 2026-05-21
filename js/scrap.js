//  Initialize Swiper
let playlistSwiper = function () {

        const swiper = new Swiper(".mySwiper2", {
            spaceBetween: 10,
            slidesPerView: 2.5,
            centeredSlides: false,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            }
        });
    
}



// =============코디 보관함 옆 화살표 누르면 codiScrap.html로 이동=============
const el_codiMore = document.querySelector('.codiScrapSelect h3')

el_codiMore.addEventListener('click', function () {
    location.href = './codiScrap.html'
})

// ===============코디 스크랩한 id값 가져와서 보관함에 넣기====================
// codi.json 전체 코디 데이터 불러옴
let loadScrap = async function () {
    const res = await fetch('./js/codi.json')
    const data = await res.json();
    // console.log(data)/* json 모든 데이터 */


    const scrapId = JSON.parse(localStorage.getItem('scrapList')) || [];
    const codiScrapContainer = document.querySelector('.codiScrapContainer');
    const codiScrapContainerEmpty = document.querySelector('.codiScrapContainerEmpty');
    // console.log(scrapId)/* 스크랩한 사진 id값을 배열형식으로 */


    let dataFilter = [];/* localStorage에 있는 id값의 데이터를 옮겨올 곳 */
    let gen=localStorage.getItem('gender')
    // 저장함수
    let saveIdFun=function(){
        scrapId.forEach(function (ss, i) {/* 스크랩해서 scrapList에 있는 옷들의 id값 전체 ss의 i개만큼 반복 */
                for (let key in data[gen]) {/* 전체 데이터 안에서 스타일 */
                    for (let k in data[gen][key]) {/* 전체 데이터 안에서 스타일 안에서 계절 */
                            data[gen][key][k].forEach(function (v, i) {/* 전체 데이터 안에서 스타일 안에서 계절까지 들어와서 그 안에있는 여러 배열조합 v를 i개만큼 반복 */
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
    console.log(dataFilter)
    
    // 출력함수
    let printImgFun=function(){
        if(dataFilter.length == 0){/* 코디 보관함 빈공간일때 */
            codiScrapContainer.style.display='none'
            codiScrapContainerEmpty.innerHTML = `
                        <p></p>
                        <p></p>
                        <p></p>
                        <span>아직 저장한 코디가 없어요 <br>원하는 스타일의 코디를 스크랩해보세요!</span>
                        <a href="./codi.html">코디 둘러보기</a>
                        </div>`
        }else{
                codiScrapContainerEmpty.style.display='none'
                codiScrapContainer.innerHTML =
                `<div class="swiper mySwiper2">
                        <div class="swiper-wrapper">
                            
                        </div>
                </div>`;
                const el_list = document.querySelector('.swiper-wrapper');
                el_list.innerHTML = '';
                dataFilter.reverse().forEach(function(v,i){/* 코디 보관함 스크랩되있을때 */
                    if(i<10){
                        el_list.innerHTML+=
                        `<p class="list swiper-slide"><img src='${v.src}'></p>`;
                    }
            })
            playlistSwiper();
        }
    }
    printImgFun();
    
}
loadScrap();




// =============음악 보관함 옆 화살표 누르면 moodScrap.html로 이동==============
const el_moodMore = document.querySelector('.moodScrapSelect h3')

el_moodMore.addEventListener('click', function () {
    location.href = './moodScrap.html'
})

// ===============음악 스크랩한 id값 가져와서 보관함에 넣기====================
let loadScrapMood=async function(){
    const res=await fetch('./js/mood-playlist.json')
    const data=await res.json()

    const scrapIdMood = JSON.parse(localStorage.getItem('moodList')) || [];
    const moodScrapContainer = document.querySelector('.moodScrapContainer');
    const moodScrapContainerEmpty = document.querySelector('.moodScrapContainerEmpty');

    let dataFilter = [];

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

    let printImgFun=function(){
        if(dataFilter.length == 0){
            moodScrapContainer.style.display='none'
            moodScrapContainerEmpty.innerHTML=`
                        <p></p>
                        <p></p>
                        <p></p>
                        <span>아직 저장한 음악이 없어요 <br>마음에 드는 음악을 스크랩해보세요!</span>
                        <a href="./mood.html">음악 둘러보기</a>
                        </div>`
        }else{
            moodScrapContainerEmpty.style.display='none'
            moodScrapContainer.innerHTML = 
               `<div class="swiper mySwiper2 a">
                        <div class="swiper-wrapper">
                            
                        </div>
                </div>`;
            const el_list2 = document.querySelector('.a .swiper-wrapper');
            el_list2.innerHTML = '';
            dataFilter.reverse().forEach(function(v,i){
                if(i<10){
                    el_list2.innerHTML+=
                    `<div class="list swiper-slide"
                            style="background: url(${v.src}) 0 0 / cover no-repeat fixed;">                        
                            <img src="./image/mood/LP_bg 1.png" alt="">
                            <p >${v['lp-txt']}</p></div>`
                }

            })
            playlistSwiper();
        }
    }
    printImgFun();

}
loadScrapMood();

// else안에 들어갈것
// dataFilter.forEach(function(v){
//                 moodScrapContainerEmpty.style.display='none'
//                 moodScrapContainer.innerHTML+=`<div class="list"
//                             style="background: url(${v.src}) 0 0 / cover no-repeat fixed;">                        
//                             <img src="./image/mood/LP_bg 1.png" alt="">
//                             <p >${v['lp-txt']}</p></div>`

//             })








// <!-- 날씨 api -->
const serviceKey = "wdHUMVHHQP8PTCqieskq57%2Fq1PuW0Mw5VDJu1NscK56NMphWzBjzgYA6ow8DcmR5zs0pyITnyXqMWfUKyBdSCg%3D%3D";
const nx = 61;
const ny = 131;

let weatherInterval = null;
let isLoading = false;

async function getWeatherAll() {
    if (isLoading) return; // 중복 실행 방지
    isLoading = true;

    try {
        const now = new Date();
        const ncstTime = new Date();
        ncstTime.setMinutes(ncstTime.getMinutes() - 40);

        const yyyy = ncstTime.getFullYear();
        const mm = String(ncstTime.getMonth() + 1).padStart(2, '0');
        const dd = String(ncstTime.getDate()).padStart(2, '0');
        const hh = String(ncstTime.getHours()).padStart(2, '0') + "00";

        const base_date = `${yyyy}${mm}${dd}`;
        const base_time_ncst = hh;
        const base_time_fcst = "0500";

        const ncstUrl =
            `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${base_date}&base_time=${base_time_ncst}&nx=${nx}&ny=${ny}`;

        const fcstUrl =
            `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${base_date}&base_time=${base_time_fcst}&nx=${nx}&ny=${ny}`;

        const [ncstRes, fcstRes] = await Promise.all([
            fetch(ncstUrl),
            fetch(fcstUrl)
        ]);



        const ncstData = await ncstRes.json();
        const fcstData = await fcstRes.json();

        const ncstItems = ncstData.response.body.items.item;
        const fcstItems = fcstData.response.body.items.item;

        const temp = Math.round(
            Number(ncstItems.find(i => i.category === "T1H")?.obsrValue)
        );
        currentTempGlobal = parseInt(temp);

        const pty = ncstItems.find(i => i.category === "PTY")?.obsrValue;

        // 현재 시간 구하기 (예: 1400 형태)
        const nowHour = String(new Date().getHours()).padStart(2, '0') + "00";

        // 현재 시간과 같은 SKY 데이터 찾기
        const skyItem = fcstItems.find(i =>
            i.category === "SKY" && i.fcstTime === nowHour
        );

        const sky = skyItem?.fcstValue;

        const minTemp = Math.round(
            Number(fcstItems.find(i => i.category === "TMN")?.fcstValue)
        );
        const maxTemp = Math.round(
            Number(fcstItems.find(i => i.category === "TMX")?.fcstValue)
        );

        let skyText = "맑음";
        let iconText = "clear_day";

        if (pty == 1) { skyText = "비"; iconText = "rainy"; }
        else if (pty == 2) { skyText = "비/눈"; iconText = "weather_mix"; }
        else if (pty == 3) { skyText = "눈"; iconText = "mode_cool"; }
        else if (pty == 4) { skyText = "소나기"; iconText = "thunderstorm"; }
        else {
            if (sky == 1) { skyText = "맑음"; iconText = "clear_day"; }
            else if (sky == 3) { skyText = "흐림"; iconText = "cloudy"; }
            else if (sky == 4) { skyText = "구름(살짝흐림)"; iconText = "partly_cloudy_day"; }
        }

        // 요소가 존재하면 업데이트
        const currentTempEl = document.getElementById("currentTemp");
        if (currentTempEl) currentTempEl.innerText = `현재 ${temp}°`;

        const minMaxTempEl = document.getElementById("minMaxTemp");
        if (minMaxTempEl) minMaxTempEl.innerText = `최저 ${minTemp}° / 최고 ${maxTemp}°`;

        const weatherStateEl = document.getElementById("weatherState");
        if (weatherStateEl) weatherStateEl.innerText = skyText;

        const weatherIconEl = document.getElementById("weatherIcon");
        if (weatherIconEl) weatherIconEl.innerText = iconText;

        const updateEl = document.getElementById("updateTime");
        if (updateEl) updateEl.innerText = `업데이트: ${new Date().toLocaleTimeString()}`;

    } catch (err) {
        console.error("날씨 불러오기 실패:", err);
    }

    isLoading = false;

    // 날씨 받은 후 코디 다시 로드
    const activeTab = document.querySelector('.btn p.active');
    if (activeTab) activeTab.click();
}

// 10분 자동 갱신
function startWeatherAutoUpdate() {
    getWeatherAll(); // 최초 실행
    weatherInterval = setInterval(() => getWeatherAll(), 600000);
}


// 탭 비활성 시 정지
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(weatherInterval);
    } else {
        startWeatherAutoUpdate();
    }
});


let currentTempGlobal = '9'; // 기본값

function getSeasonByTemp(temp) {
    temp = Number(temp);

    if (temp <= 9) return "겨울";
    if (temp <= 14) return "가을";
    if (temp <= 20) return "봄";
    return "여름";
}

startWeatherAutoUpdate();
