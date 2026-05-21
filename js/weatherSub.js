const appLoading = document.querySelector(".appLoading");

const loadingState = {
  riseSet: false,
  air: false,
  weather: false,
  moon: false,
};

function checkAllLoaded() {
  if (
    loadingState.riseSet &&
    loadingState.air &&
    loadingState.weather &&
    loadingState.moon
  ) {
    setTimeout(() => {
      if (appLoading) appLoading.classList.add("hide");
    }, 500);
  }
}

if (appLoading) {
  appLoading.classList.remove("hide");
}

// ============================================
// 🔆 일출·일몰 반원
// ============================================

function formatTime(timeStr) {
  if (!timeStr || timeStr.trim() === "----") return "--:--";
  return `${timeStr.substring(0, 2)}:${timeStr.substring(2, 4)}`;
}

function getTodayStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function timeStrToDate(timeStr) {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(timeStr.substring(0, 2)),
    parseInt(timeStr.substring(2, 4)),
    0
  );
}

function getProgress(start, end, now) {
  const total = end - start;
  const elapsed = now - start;
  let p = elapsed / total;
  return Math.max(0, Math.min(1, p));
}

const circle = document.querySelector(".progress");
let radius = 0;
let circumference = 0;

if (circle) {
  radius = circle.r.baseVal.value;
  circumference = Math.PI * radius;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;
}

function setProgress(percent) {
  if (!circle) return;
  const offset = circumference - percent * circumference;
  circle.style.strokeDashoffset = offset;
}

function setSunPosition(percent) {
  const sun = document.querySelector(".sun");
  if (!sun) return;

  const angle = percent * 180;
  sun.style.transform = `rotate(${angle}deg) translateX(80px)`;
}

let sunriseDate = null;
let sunsetDate = null;

function fetchRiseSet() {
  const todayStr = getTodayStr();

  const riseSetApiUrl =
    `https://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo` +
    `?location=의정부` +
    `&locdate=${todayStr}` +
    `&ServiceKey=0123891d17b0e073ff763a40afc5aed555b9b50358d33ebf729a71244c77c4e0` +
    `&_type=json`;

  fetch(riseSetApiUrl)
    .then((res) => res.json())
    .then((data) => {
      const items = data.response.body.items.item;
      const item = Array.isArray(items) ? items[0] : items;

      const sunriseStr = item.sunrise.trim();
      const sunsetStr = item.sunset.trim();

      document.querySelector(".sunrise h3").textContent = formatTime(sunriseStr);
      document.querySelector(".sunset h3").textContent = formatTime(sunsetStr);

      sunriseDate = timeStrToDate(sunriseStr);
      sunsetDate = timeStrToDate(sunsetStr);

      loadingState.riseSet = true;
      checkAllLoaded();
    })
    .catch((err) => {
      console.error("일출·일몰 API 오류:", err);
      loadingState.riseSet = true;
      checkAllLoaded();
    });
}

function animateSun() {
  if (!sunriseDate || !sunsetDate) {
    requestAnimationFrame(animateSun);
    return;
  }

  const now = new Date();
  const progress = getProgress(sunriseDate, sunsetDate, now);

  setProgress(progress);
  setSunPosition(progress);

  requestAnimationFrame(animateSun);
}

function scheduleMidnightUpdate() {
  const now = new Date();

  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    1
  );

  const timeUntilMidnight = midnight - now;

  setTimeout(() => {
    loadingState.riseSet = false;

    fetchRiseSet();

    if (circle) circle.style.strokeDashoffset = circumference;
    setSunPosition(0);

    scheduleMidnightUpdate();
  }, timeUntilMidnight);
}

fetchRiseSet();
animateSun();
scheduleMidnightUpdate();

// =====================================================
// 🔒 설정
// =====================================================

const serviceKey =
  "0123891d17b0e073ff763a40afc5aed555b9b50358d33ebf729a71244c77c4e0";

const stationName = "의정부동";

let lastFetchTime = 0;
let isFetching = false;
const MIN_INTERVAL = 10 * 60 * 1000;

// =====================================================
// 🌫 대기질 호출 함수
// =====================================================

async function getAirQualitySafe() {
  const now = Date.now();

  if (now - lastFetchTime < MIN_INTERVAL) {
    loadingState.air = true;
    checkAllLoaded();
    return;
  }

  if (isFetching) return;

  isFetching = true;
  lastFetchTime = now;

  const url =
    `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?` +
    `serviceKey=${encodeURIComponent(serviceKey)}` +
    `&returnType=json&numOfRows=1&pageNo=1` +
    `&stationName=${encodeURIComponent(stationName)}` +
    `&dataTerm=DAILY&ver=1.3`;

  try {
    const res = await fetch(url);

    if (res.status === 429) {
      console.warn("요청 제한 초과 → 15분 후 재시도");
      setTimeout(() => getAirQualitySafe(), 15 * 60 * 1000);

      loadingState.air = true;
      checkAllLoaded();
      return;
    }

    if (!res.ok) throw new Error(res.status);

    const data = await res.json();
    const item = data.response?.body?.items?.[0];

    if (!item) {
      loadingState.air = true;
      checkAllLoaded();
      return;
    }

    applyDust(".pm10", item.pm10Grade1h);
    applyDust(".pm25", item.pm25Grade1h);

    const timeEl = document.querySelector(".dust-time");

    if (timeEl) {
      timeEl.textContent = `업데이트: ${item.dataTime}`;
    }

    loadingState.air = true;
    checkAllLoaded();
  } catch (err) {
    console.error("미세먼지 로드 실패:", err);

    loadingState.air = true;
    checkAllLoaded();
  } finally {
    isFetching = false;
  }
}

function applyDust(selector, gradeValue) {
  const box = document.querySelector(selector);
  if (!box) return;

  const textEl = box.querySelector("b");
  const iconEl = box.querySelector(".icon");

  const grade = Number(gradeValue);

  const gradeMap = {
    1: {
      text: "좋음",
      icon: "sentiment_very_satisfied",
      className: "grade-1",
    },
    2: {
      text: "보통",
      icon: "sentiment_satisfied",
      className: "grade-2",
    },
    3: {
      text: "나쁨",
      icon: "sentiment_dissatisfied",
      className: "grade-3",
    },
    4: {
      text: "매우나쁨",
      icon: "sentiment_very_dissatisfied",
      className: "grade-4",
    },
  };

  textEl.classList.remove("grade-1", "grade-2", "grade-3", "grade-4");
  iconEl.classList.remove("grade-1", "grade-2", "grade-3", "grade-4");

  if (gradeMap[grade]) {
    const current = gradeMap[grade];

    textEl.textContent = current.text;
    iconEl.textContent = current.icon;

    textEl.classList.add(current.className);
    iconEl.classList.add(current.className);
  } else {
    textEl.textContent = "--";
    iconEl.textContent = "help";
  }

  localStorage.setItem("dust", textEl.textContent);
}

// =====================================================
// 🕒 base_time 계산
// =====================================================

function getBaseTime(now, minuteStandard) {
  const date = new Date(now);

  if (date.getMinutes() < minuteStandard) {
    date.setHours(date.getHours() - 1);
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");

  return {
    date: `${yyyy}${mm}${dd}`,
    time: `${hh}30`,
  };
}

// =====================================================
// 🌤 날씨 호출
// =====================================================

async function getWeatherData() {
  const now = new Date();
  const baseInfo = getBaseTime(now, 45);
  const ncstInfo = getBaseTime(now, 40);

  const fcstUrl =
    `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?` +
    `serviceKey=${encodeURIComponent(serviceKey)}` +
    `&pageNo=1&numOfRows=1000&dataType=JSON` +
    `&base_date=${baseInfo.date}` +
    `&base_time=${baseInfo.time}` +
    `&nx=61&ny=131`;

  const ncstUrl =
    `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?` +
    `serviceKey=${encodeURIComponent(serviceKey)}` +
    `&pageNo=1&numOfRows=1000&dataType=JSON` +
    `&base_date=${ncstInfo.date}` +
    `&base_time=${ncstInfo.time}` +
    `&nx=61&ny=131`;

  try {
    const [fcstRes, ncstRes] = await Promise.all([
      fetch(fcstUrl),
      fetch(ncstUrl),
    ]);

    if (!fcstRes.ok) throw new Error("예보 HTTP 오류: " + fcstRes.status);
    if (!ncstRes.ok) throw new Error("실황 HTTP 오류: " + ncstRes.status);

    const fcstData = await fcstRes.json();
    const ncstData = await ncstRes.json();

    const ncstWeather = extractNcst(ncstData);
    const fcstWeather = extractFcst(fcstData);

    const finalWeather = { ...fcstWeather, ...ncstWeather };

    applyWeather(finalWeather);

    loadingState.weather = true;
    checkAllLoaded();
  } catch (err) {
    console.error("❌ 날씨 로드 실패:", err);

    loadingState.weather = true;
    checkAllLoaded();
  }
}

function extractNcst(data) {
  const items = data.response?.body?.items?.item;
  if (!items) return {};

  const weather = {};
  items.forEach((i) => (weather[i.category] = i.obsrValue));

  return {
    T1H: weather.T1H,
    REH: weather.REH,
    WSD: weather.WSD,
    PTY: weather.PTY,
    RN1: weather.RN1,
  };
}

function extractFcst(data) {
  const items = data.response?.body?.items?.item;
  if (!items) return {};

  const times = [...new Set(items.map((i) => i.fcstTime))].sort();
  const targetTime = times[0];

  const weather = {};

  items.forEach((i) => {
    if (i.fcstTime === targetTime) {
      weather[i.category] = i.fcstValue;
    }
  });

  return weather;
}

function applyWeather(weather) {
  document.getElementById("temp").innerHTML = `${
    weather.T1H ?? "--"
  }<small>℃</small>`;

  document.getElementById("humidity").innerHTML = `${
    weather.REH ?? "--"
  }<small>%</small>`;

  document.getElementById("wind").innerHTML = `${
    weather.WSD ?? "--"
  }<small>m/s</small>`;

  let rainValue = Number(weather?.RN1);

  if (isNaN(rainValue) || rainValue <= 0) {
    rainValue = 0;
  } else if (rainValue < 1) {
    rainValue = 1;
  }

  document.getElementById("rain").innerHTML = `${rainValue}<small>mm</small>`;

  const skyText = document.getElementById("sky");
  const skyIcon = document.getElementById("skyIcon");

  const skyMap = {
    1: { text: "맑음", icon: "wb_sunny" },
    3: { text: "구름많음", icon: "partly_cloudy_day" },
    4: { text: "흐림", icon: "cloud" },
  };

  const ptyMap = {
    1: { text: "비", icon: "rainy" },
    2: { text: "비/눈", icon: "weather_mix" },
    3: { text: "눈", icon: "mode_cool" },
    4: { text: "소나기", icon: "thunderstorm" },
  };

  if (weather.PTY && weather.PTY !== "0") {
    const pty = ptyMap[weather.PTY];

    skyText.textContent = pty?.text || "-";
    skyIcon.textContent = pty?.icon || "help";
  } else {
    const sky = skyMap[weather.SKY];

    skyText.textContent = sky?.text || "-";
    skyIcon.textContent = sky?.icon || "help";
  }
}

// =====================================================
// 🌙 달 위상
// =====================================================

function getTodayParts() {
  const d = new Date();

  return {
    year: d.getFullYear(),
    month: String(d.getMonth() + 1).padStart(2, "0"),
    day: String(d.getDate()).padStart(2, "0"),
  };
}

async function fetchMoonPhase() {
  const { year, month, day } = getTodayParts();

  const url =
    `https://apis.data.go.kr/B090041/openapi/service/LunPhInfoService/getLunPhInfo?` +
    `solYear=${year}` +
    `&solMonth=${month}` +
    `&solDay=${day}` +
    `&ServiceKey=${serviceKey}` +
    `&_type=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP 오류: " + res.status);

    const text = await res.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("달 JSON 파싱 실패:", text);

      loadingState.moon = true;
      checkAllLoaded();
      return;
    }

    const item = data.response?.body?.items?.item;

    if (!item) {
      loadingState.moon = true;
      checkAllLoaded();
      return;
    }

    applyMoonData(item);

    loadingState.moon = true;
    checkAllLoaded();
  } catch (err) {
    console.error("달 API 오류:", err);

    loadingState.moon = true;
    checkAllLoaded();
  }
}

function getIllumination(lunAge) {
  const cycle = 29.530588;
  const phase = (lunAge % cycle) / cycle;
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;

  return Math.round(illumination * 100);
}

function getPhaseByAge(lunAge) {
  const cycle = 29.530588;
  lunAge = lunAge % cycle;

  if (lunAge < 1.845) return { eng: "new moon", kor: "신월" };
  if (lunAge < 5.536) return { eng: "waxing crescent", kor: "초승달" };
  if (lunAge < 9.228) return { eng: "first quarter", kor: "상현달" };
  if (lunAge < 12.919) return { eng: "waxing gibbous", kor: "차오르는 달" };
  if (lunAge < 16.61) return { eng: "full moon", kor: "보름달" };
  if (lunAge < 20.302) return { eng: "waning gibbous", kor: "기우는 달" };
  if (lunAge < 23.993) return { eng: "last quarter", kor: "하현달" };
  if (lunAge < 27.684) return { eng: "waning crescent", kor: "그믐달" };

  return { eng: "new moon", kor: "신월" };
}

function applyMoonData(item) {
  const moonName = document.getElementById("moon-name");
  const moonSvg = document.getElementById("moon-svg");

  const lunAge = Number(item.lunAge);
  const phaseName = getPhaseByAge(lunAge);
  const illumination = getIllumination(lunAge);

  const moon = document.createElement("moon-phase");
  moon.setAttribute("phase", phaseName.eng);
  moon.setAttribute("illumination", illumination);

  moonSvg.innerHTML = "";
  moonSvg.appendChild(moon);

  moonName.innerHTML = `
    <span class="phase-text">${phaseName.kor}</span>
  `;
}

function scheduleMoonUpdate() {
  const now = new Date();

  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    5
  );

  setTimeout(() => {
    loadingState.moon = false;

    fetchMoonPhase();
    scheduleMoonUpdate();
  }, tomorrow - now);
}

// =====================================================
// 🚀 실행
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  getAirQualitySafe();

  getWeatherData();
  setInterval(getWeatherData, 30 * 60 * 1000);

  fetchMoonPhase();
  scheduleMoonUpdate();
});

// ============================배경색 설정===============================
const el_appBgc = document.querySelector(".app");
let selectedBgc = localStorage.getItem("bgc");

const gradientBgc = {
  gray: "linear-gradient(to bottom, #EBEBEB 0%, #999999 100%)",
  green: "linear-gradient(to bottom, #CFFFF1 0%, #00CE93 77%, #12A77C 100%)",
  blue: "linear-gradient(to bottom, #cbe0ff 0%, #6ea3f3 77%, #458bf5 100%)",
  purple: "linear-gradient(to bottom, #dbd3ff 0%, #a08bff 77%, #8164ff 100%)",
  yellow: "linear-gradient(to bottom, #ffeab1 0%, #e4c267 77%, #dbad2c 100%)",
};

if (el_appBgc) {
  el_appBgc.style.background = gradientBgc[selectedBgc];
}