// ====================온보딩때 선택한 성별 세팅 처음 기본값으로========================
const genderInputM=document.querySelector('input[value="m"]')
const genderInputW=document.querySelector('input[value="w"]')

if(localStorage.getItem('gender')=='m'){
    genderInputM.checked=true;
}else{genderInputW.checked=true;}

// ======================로컬스토리지안에 성별선택값 저장 과정===================
const el_genderInput=document.querySelectorAll('.genderOption input')
const el_tempInput=document.querySelectorAll('.temperatureOption input')
const el_langInput=document.querySelectorAll('.languageOption input')
const el_bgcInput=document.querySelectorAll('.bgcOption input')

const el_setBtn=document.querySelector('.setBtn button')

// --------localStorage안에 값을 중간 저장소에 옮겨놓음----------
let selectedGender=localStorage.getItem('gender');/* 성별 설정 */
let selectedTemp=localStorage.getItem('temp'); /* 온도 설정 */
let selectedLang=localStorage.getItem('lang');/* 언어 설정 */
let selectedBgc=localStorage.getItem('bgc');/* 배경색 설정 */

// 성별선택 버튼 바뀔때
el_genderInput.forEach(function(ss,i){
   ss.addEventListener('change',function(){
    selectedGender=this.value;
    if(localStorage.getItem('temp')==null || localStorage.getItem('lang')==null || localStorage.getItem('bgc')==null){
        selectedTemp="c"/* 성별만 바꾸고 나머지 안바꾸고 저장눌렀을때 나머지 null안나오게 */
        selectedLang='ko'
        selectedBgc='green'
    }
    el_setBtn.classList.add('active')
   })
});  

// 온도 단위 선택 버튼 바뀔때
el_tempInput.forEach(function(ss,i){
    ss.addEventListener('change',function(){
        selectedTemp=this.value;
        if(localStorage.getItem('lang')==null || localStorage.getItem('bgc')==null){
            selectedLang='ko'/* 온도 단위만 바꾸고 나머지 안바꾸고 저장눌렀을때 나머지 null안나오게 */
            selectedBgc='green'
        }
        el_setBtn.classList.add('active')
    })
});

// 언어 선택 버튼 바뀔때
el_langInput.forEach(function(ss,i){
    ss.addEventListener('change',function(){
        selectedLang=this.value;
        if(localStorage.getItem('temp')==null || localStorage.getItem('bgc')==null){
            selectedTemp="c"/* 언어만 바꾸고 나머지 안바꾸고 저장눌렀을때 나머지 null안나오게 */
            selectedBgc='green'
        }
        el_setBtn.classList.add('active')
    })
});

// 배경색 선택 버튼 바뀔때
el_bgcInput.forEach(function(ss,i){
    ss.addEventListener('change',function(){
        selectedBgc=this.value;
        if(localStorage.getItem('temp')==null || localStorage.getItem('lang')==null){
            selectedTemp="c"/* 배경색만 바꾸고 나머지 안바꾸고 저장눌렀을때 나머지 null안나오게 */
            selectedLang='ko'
        }
        el_setBtn.classList.add('active')
    })
});

// 저장버튼 클릭
el_setBtn.addEventListener('click',function(){
    if(!el_setBtn.classList.contains('active')) return;/* 저장버튼에 active가 없으면 실행X */
    const prevGender=localStorage.getItem('gender')/* 이전 gender값 가져옴 */
    localStorage.setItem('gender',selectedGender)
    localStorage.setItem('temp',selectedTemp)
    localStorage.setItem('lang',selectedLang)
    localStorage.setItem('bgc',selectedBgc)
    location.href="./index.html"
    if(prevGender!==selectedGender){/* 이전값과 비교했을때 달라졌을때만 */
        localStorage.removeItem('scrapList')/* scrapList 아예 제거 */
    }
});



// 로컬스토리지 값에 따라 온도 단위 버튼 checked(저장버튼 누르면 값 저장)
const el_tempInputC=document.querySelector('.temperatureOption input[value="c"]')
const el_tempInputF=document.querySelector('.temperatureOption input[value="f"]')

if(localStorage.getItem('temp')=='c' ){
    el_tempInputC.checked=true;
}if(localStorage.getItem('temp')=='f'){
    el_tempInputF.checked=true;
}

// 로컬스토리지 값에 따라 언어 버튼 checked(저장버튼 누르면 값 저장)
const el_langInputKO=document.querySelector('.languageOption input[value="ko"]')
const el_langInputEN=document.querySelector('.languageOption input[value="en"]')

if(localStorage.getItem('lang')=='ko' ){
    el_langInputKO.checked=true;
}if(localStorage.getItem('lang')=='en'){
    el_langInputEN.checked=true;
}

// 로컬스토리지 값에 따라 배경색 버튼 checked(저장버튼 누르면 값 저장)
const el_bgcInputGray=document.querySelector('.bgcOption input[value="gray"]')
const el_bgcInputGreen=document.querySelector('.bgcOption input[value="green"]')
const el_bgcInputBlue=document.querySelector('.bgcOption input[value="blue"]')
const el_bgcInputPurple=document.querySelector('.bgcOption input[value="purple"]')
const el_bgcInputYellow=document.querySelector('.bgcOption input[value="yellow"]')

if(localStorage.getItem('bgc')=='gray' ){
    el_bgcInputGray.checked=true;
}if(localStorage.getItem('bgc')=='green'){
    el_bgcInputGreen.checked=true;
}if(localStorage.getItem('bgc')=='blue'){
    el_bgcInputBlue.checked=true;
}if(localStorage.getItem('bgc')=='purple'){
    el_bgcInputPurple.checked=true;
}if(localStorage.getItem('bgc')=='yellow'){
    el_bgcInputYellow.checked=true;
}



