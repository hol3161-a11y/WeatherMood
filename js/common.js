if(sessionStorage.ani){
  document.body.className='complete';
}else{
  document.body.className='ani';
  sessionStorage.ani=1
}


// ====================하단 네비바 클릭하여 이동==============================
        const el_navBarP=document.querySelectorAll('.navBar p')
        const currentPath=location.pathname;

        el_navBarP.forEach(function(ss,i){
            ss.addEventListener('click',function(){
                location.href = this.dataset.url;
               el_navBarP.forEach(function(aa,i){
                aa.classList.remove('active')
               })
               ss.classList.add('active')
            });
            if(ss.dataset.url == currentPath){
                ss.classList.add('active')
            }
        });

// ===========================뒤로가기 버튼================================
    let backBtn=function(){
        const el_backBtn=document.querySelector('.txt span')

        el_backBtn.addEventListener('click',function(){
           history.back();
        });
    }
    if(!(location.pathname == '/' || location.href.match('index'))){
        backBtn();
    }
    

// <!-------------------------- 날씨 api -------------------------->
let weatherBarFun=function(){
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

        // localstorage에 현재기온,하늘상태 찍어주기
        localStorage.setItem('tempSky',JSON.stringify({temp,skyText}))
    
        // 요소가 존재하면 업데이트
        const currentTempEl = document.getElementById("currentTemp");
        if (currentTempEl) currentTempEl.innerText = `현재 ${temp}°`;

        const currentTempIndexEl = document.getElementById("currentTempIndex");
        if (currentTempIndexEl) currentTempIndexEl.innerText = `${temp}°`;
    
        const minMaxTempEl = document.getElementById("minMaxTemp");
        if (minMaxTempEl) minMaxTempEl.innerText = `최저 ${minTemp}° / 최고 ${maxTemp}°`;

        const minMaxTempIndexEl = document.getElementById("minMaxTempIndex");
        if (minMaxTempIndexEl) minMaxTempIndexEl.innerText = `${minTemp}° / ${maxTemp}°`;
    
        const weatherStateEl = document.getElementById("weatherState");
        if (weatherStateEl) weatherStateEl.innerText = skyText;
    
        const weatherIconEl = document.getElementById("weatherIcon");
        if (weatherIconEl) weatherIconEl.innerText = iconText;
    
        const updateEl = document.getElementById("updateTime");
        if (updateEl) updateEl.innerText = `업데이트: ${new Date().toLocaleTimeString()}`;

        dataJson();

      } catch (err) {
        // console.error("날씨 불러오기 실패:", err);
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
    
    
    
    
    
    startWeatherAutoUpdate();

}

let pathname = location.pathname;


if(!(location.pathname == "/" || location.href.match("weather") || location.href.match("set"))){
    weatherBarFun();
  }; 