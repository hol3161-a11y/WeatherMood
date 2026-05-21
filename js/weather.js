// ===============================
// 🌤 날씨 통합 (시간 + 단기1~4일 + 중기5~7일)
// ===============================

const serviceKey = encodeURIComponent("0123891d17b0e073ff763a40afc5aed555b9b50358d33ebf729a71244c77c4e0");

// ===============================
// 1️⃣ 날짜 배열 (오늘~7일)
// ===============================
function getDateArr() {
    let arr = [];
    
    for (let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(d.getDate() + i);
        
        arr.push({
            txt: d.getFullYear() +
                String(d.getMonth() + 1).padStart(2, "0") +
                String(d.getDate()).padStart(2, "0"),
            day: ['일','월','화','수','목','금','토'][d.getDay()],
            monthDay:
                String(d.getMonth() + 1).padStart(2, "0") +
                "." +
                String(d.getDate()).padStart(2, "0")
        });
    }
    return arr;
}

// ===============================
// 2️⃣ 단기 base_time 계산
// ===============================
function getShortBaseTime() {
    const hour = new Date().getHours();
    const baseTimes = ["0200","0500","0800","1100","1400","1700","2000","2300"];
    let selected = "0200";
    baseTimes.forEach(t => {
        if (hour >= Number(t.substring(0,2))) selected = t;
    });
    return selected;
}

// ===============================
// 3️⃣ 중기 tmFc 계산
// ===============================
function getMidTmFc() {
    const now = new Date();
    const hour = now.getHours();
    let baseHour;

    if (hour < 6) {
        now.setDate(now.getDate() - 1);
        baseHour = "1800";
    } else if (hour < 18) {
        baseHour = "0600";
    } else {
        baseHour = "1800";
    }

    return now.getFullYear() +
        String(now.getMonth()+1).padStart(2,"0") +
        String(now.getDate()).padStart(2,"0") +
        baseHour;
}

// ===============================
// 4️⃣ 아이콘 변환
// ===============================
function getWeatherIcon({ sky, pty, text }) {

    if (pty && pty !== "0") {
        if (pty === "1") return "rainy";
        if (pty === "2") return "weather_mix";
        if (pty === "3") return "mode_cool";
        if (pty === "4") return "thunderstorm";
    }

    if (sky) {
        if (sky === "1") return "clear_day";
        if (sky === "3") return "partly_cloudy_day";
        if (sky === "4") return "cloud";
    }

    if (text) {
        if (text.includes("비/눈")) return "weather_mix";
        if (text.includes("눈")) return "mode_cool";
        if (text.includes("비")) return "rainy";
        if (text.includes("맑음")) return "clear_day";
        if (text.includes("구름많음")) return "partly_cloudy_day";
        if (text.includes("흐림")) return "cloud";
    }

    return "help";
}

// ===============================
// 5️⃣ 메인 함수
// ===============================
async function dataFun() {

    try {

        const dateArr = getDateArr();
        const baseTime = getShortBaseTime();
        const tmFc = getMidTmFc();

        // ===============================
        // 🔹 단기 API
        // ===============================
        const shortRes = await fetch(
            `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?` +
            `serviceKey=${serviceKey}&numOfRows=1000&pageNo=1&dataType=JSON` +
            `&base_date=${dateArr[0].txt}&base_time=${baseTime}&nx=61&ny=131`
        );
        

        const shortData = await shortRes.json();
        const items = shortData.response.body.items.item;

        console.log(items);
        

        let shortFilter = {};
        for (let i = 1; i <= 4; i++) shortFilter[i] = {};

        dateArr.slice(0,4).forEach((date, idx) => {
            items.forEach(item => {
                if (item.fcstDate === date.txt) {
                    if (!shortFilter[idx+1][item.fcstTime])
                        shortFilter[idx+1][item.fcstTime] = {};
                    shortFilter[idx+1][item.fcstTime][item.category] = item.fcstValue;
                }
            });
        });

        // ===============================
        // 🔹 시간 예보
        // ===============================
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = "";

        const nowHour = new Date().getHours();
        let today = Object.entries(shortFilter[1] || {});
        let tomorrow = Object.entries(shortFilter[2] || {});

        today.sort((a,b)=>Number(a[0])-Number(b[0]));
        tomorrow.sort((a,b)=>Number(a[0])-Number(b[0]));

        let filteredToday = today.filter(([t]) =>
            Number(t.substring(0,2)) >= nowHour
        );

        let combined = [...filteredToday, ...tomorrow].slice(0,24);

        combined.forEach(([time, val])=>{
            const hour = Number(time.substring(0,2));
            const ampm = hour < 12 ? "오전" : "오후";
            const displayHour = hour % 12 === 0 ? 12 : hour % 12;

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <span class="material-symbols-outlined">
                        ${getWeatherIcon({sky:val.SKY, pty:val.PTY})}
                    </span>
                    <b>${val.TMP ?? "-"}°</b>
                    <div>${val.POP ?? "-"}%</div>
                    <div>${ampm} ${displayHour}시</div>
                </div>
            `;
        });

        if (window.mySwiper) window.mySwiper.destroy();
        window.mySwiper = new Swiper('.swiper', {
            slidesPerView: 5,
            freeMode: true
        });

        // ===============================
        // 🔹 단기 1~4일 (요일 표시)
        // ===============================
        for (let i = 0; i < 4; i++) {

            const ul = document.querySelectorAll('.weather-week ul')[i];

            ul.querySelector('li.week-info b').textContent =
                i === 0 ? "오늘" : dateArr[i].day;

            ul.querySelector('li.week-info small').textContent =
                dateArr[i].monthDay;

            const temps = Object.values(shortFilter[i+1])
                .map(v=>Number(v.TMP))
                .filter(v=>!isNaN(v));

            ul.querySelector('.min').textContent =
                temps.length ? Math.min(...temps)+"°" : "-";

            ul.querySelector('.max').textContent =
                temps.length ? Math.max(...temps)+"°" : "-";

            const entries = Object.entries(shortFilter[i+1])
                .sort((a,b)=>Number(a[0])-Number(b[0]));

            let morning = entries.find(([t])=>Number(t)<1200);
            let afternoon = entries.find(([t])=>Number(t)>=1200);

            if(!morning) morning = entries[0];
            if(!afternoon) afternoon = entries[entries.length-1];

            const icons = ul.querySelectorAll('.material-symbols-outlined');

            icons[0].textContent =
                morning ? getWeatherIcon({sky:morning[1].SKY,pty:morning[1].PTY}) : "help";

            icons[1].textContent =
                afternoon ? getWeatherIcon({sky:afternoon[1].SKY,pty:afternoon[1].PTY}) : "help";
        }

        // ===============================
        // 🔹 중기 5~7일 (요일 표시)
        // ===============================
        const midLandRes = await fetch(
            `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?` +
            `serviceKey=${serviceKey}&numOfRows=10&pageNo=1&dataType=JSON` +
            `&regId=11B00000&tmFc=${tmFc}`
        );
        const landItem = (await midLandRes.json()).response.body.items.item[0];

        const midTaRes = await fetch(
            `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?` +
            `serviceKey=${serviceKey}&numOfRows=10&pageNo=1&dataType=JSON` +
            `&regId=11B10101&tmFc=${tmFc}`
        );
        const taItem = (await midTaRes.json()).response.body.items.item[0];

        for (let i = 4; i <= 6; i++) {

            const ul = document.querySelectorAll('.weather-week ul')[i];

            ul.querySelector('li.week-info b').textContent =
                dateArr[i].day;

            ul.querySelector('li.week-info small').textContent =
                dateArr[i].monthDay;

            ul.querySelector('.min').textContent =
                taItem["taMin"+(i+1)]+"°";

            ul.querySelector('.max').textContent =
                taItem["taMax"+(i+1)]+"°";

            const am = landItem["wf"+(i+1)+"Am"];
            const pm = landItem["wf"+(i+1)+"Pm"];

            const icons = ul.querySelectorAll('.material-symbols-outlined');

            icons[0].textContent = getWeatherIcon({text:am});
            icons[1].textContent = getWeatherIcon({text:pm});
        }

    } catch(e){
        console.error("날씨 오류:", e);
    }
}

// 실행 + 10분 갱신
dataFun();
setInterval(dataFun, 10 * 60 * 1000);

// ============================배경색 설정시 메인배경색 바뀌게===============================
    const el_appBgc=document.querySelector('.app')
    let selectedBgc=localStorage.getItem('bgc')/* set.js에서 배경색 설정 후 저장된 색이름 */

    const gradientBgc={
        gray: 'linear-gradient(to bottom, #EBEBEB 0%, #999999 100%)',
        green: 'linear-gradient(to bottom, #CFFFF1 0%, #00CE93 77%, #12A77C 100%)',
        blue: 'linear-gradient(to bottom, #cbe0ff 0%, #6ea3f3 77%, #458bf5 100%)',
        purple: 'linear-gradient(to bottom, #dbd3ff 0%, #a08bff 77%, #8164ff 100%)',
        yellow: 'linear-gradient(to bottom, #ffeab1 0%, #e4c267 77%, #dbad2c 100%)'
    }

    el_appBgc.style.background=gradientBgc[selectedBgc]
