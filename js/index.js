// ================맨처음 성별선택 온보딩 & 기록있으면 바로 메인===================
        const onboarding=document.querySelector('.onboarding');
        const main=document.querySelector('.main')
        
        // 로컬스토리지안에 gender값을 가져와라
        const savedGender=localStorage.getItem('gender')
        
        if(savedGender){/* 가져올수있다면->한번 선택한적 있음->바로 메인으로 */
          onboarding.style.display='none'
          main.style.display='block'
        }else{/* 가져올수없다면->null->처음 방문->온보딩 */
          onboarding.style.display='block'
          main.style.display='none'
        }
        
        // 로컬스토리지안에 성별선택값 저장 과정
        const el_input=document.querySelectorAll('.genderOption input')
        const el_button=document.querySelector('.onboarding button')

        let selectedGender=null;/* 나중에 남/녀 고르면 값이 들어가는 자리 */
              
        el_input.forEach(function(ee,i){
          ee.addEventListener('change',function(){
              selectedGender=this.value;/* 둘중 선택한 버튼(this)의 값(value)를 selectedGender에 저장 */
              el_button.classList.add('active') 
              });
            });
          
        el_button.addEventListener('click',function(){
          if(!selectedGender) return;/* 확인버튼 눌렀을때 selectedGender값이 없으면 이벤트를 끝내서 넘어가지 못하게 */
          
          // localStorage의 gender(key)를 생성하면서 거기에 남,녀값이 담긴 selectedGender을 저장
          localStorage.setItem('gender',selectedGender)
          
          onboarding.style.display='none'
          main.style.display='block';
        });

// ============================배경색 설정시 메인배경색 바뀌게===============================
    const el_mainBgc=document.querySelector('.main')
    let selectedBgc=localStorage.getItem('bgc')/* set.js에서 배경색 설정 후 저장된 색이름 */

    const gradientBgc={
        gray: 'linear-gradient(to bottom, #EBEBEB 0%, #999999 100%)',
        green: 'linear-gradient(to bottom, #CFFFF1 0%, #00CE93 77%, #12A77C 100%)',
        blue: 'linear-gradient(to bottom, #cbe0ff 0%, #6ea3f3 77%, #458bf5 100%)',
        purple: 'linear-gradient(to bottom, #dbd3ff 0%, #a08bff 77%, #8164ff 100%)',
        yellow: 'linear-gradient(to bottom, #ffeab1 0%, #e4c267 77%, #dbad2c 100%)'
    }

    el_mainBgc.style.background=gradientBgc[selectedBgc]


// ====================뒷 날씨 렌더링아이콘(비)======================
        const container=document.querySelector('.rain_drop-container')

        for(let i=0; i<5; i++){/* 9번 반복 */
        const drop=document.createElement('img');/* img태그 생성하는걸 drop으로 정의 */
            drop.setAttribute('src','./image/index/weather/weather_rain.png')/* drop으로 생성한 img태그의 src값 삽입 */
            drop.classList.add('drop');/* drop으로 생성한 img태그에 class='drop'추가 */

            drop.style.width='20px'
            drop.style.left=(i*9)+'%';
            drop.style.animationDuration = 1.5 + Math.random()*0.2 + 's';
            drop.style.animationDelay = Math.random()*2 + 's';

            container.append(drop)/* '.rain_drop-container'의 맨앞에 img태그 생성 */
            };

// ====================뒷 날씨 렌더링아이콘(비/눈)======================
        const container2=document.querySelector('.rainSnow_drop-container')

        for(let i=0; i<5; i++){/* 9번 반복 */
        const drop2=document.createElement('img');/* img태그 생성하는걸 drop으로 정의 */
            drop2.setAttribute('src','./image/index/weather/weather_rain.png')/* drop으로 생성한 img태그의 src값 삽입 */
            drop2.classList.add('drop');/* drop으로 생성한 img태그에 class='drop'추가 */

            drop2.style.width='20px'
            drop2.style.left=(i*9)+'%';
            drop2.style.animationDuration = 1.5 + Math.random()*0.2 + 's';
            drop2.style.animationDelay = Math.random()*2 + 's';

            container2.append(drop2)/* '.rain_drop-container'의 맨앞에 img태그 생성 */
            };
        for(let i=0; i<5; i++){/* 9번 반복 */
        const drop2=document.createElement('img');/* img태그 생성하는걸 drop으로 정의 */
            drop2.setAttribute('src','./image/index/weather/weather_snow.png')/* drop으로 생성한 img태그의 src값 삽입 */
            drop2.classList.add('drop');/* drop으로 생성한 img태그에 class='drop'추가 */

            drop2.style.width='20px'
            drop2.style.left=(i*9)+'%';
            drop2.style.animationDuration = 1.5 + Math.random()*0.2 + 's';
            drop2.style.animationDelay = Math.random()*2 + 's';

            container2.append(drop2)/* '.rain_drop-container'의 맨앞에 img태그 생성 */
            };

//  =================세팅 아이콘 누르면 set.html로=========================
        const el_mainSetting=document.querySelector('.mainSetting span')

        el_mainSetting.addEventListener('click',function(){
          location.href='./set.html'
        });

// ========기온,성별에 따라 메인 캐릭터 바뀌게 /날씨에 따라 추천아이템과 멘트 바뀌게========
    const el_mainCharacter=document.querySelector('.character')
    const el_mainItem=document.querySelector('.item')

    let loadCharacter=async function(){
      const res=await fetch('./js/index.json')
      const data=await res.json();
  
      let tempSky=JSON.parse(localStorage.getItem('tempSky'))/* 현재기온 가져오기 */
      let genderCheck = localStorage.getItem('gender')

      let resultCodi=data.캐릭터옷.find(function(ss){
        return tempSky.temp >= ss.min && tempSky.temp <=ss.max;
      })

      let imgpng=resultCodi.img[genderCheck]/* 나온 배열의 img[가져온 성별값] -> 해당 옷의 경로값 */

      el_mainCharacter.innerHTML=`<img src="${imgpng}" alt="">`/* 해당 옷의 경로값 삽입 */
      
    // =====================날씨에 따라 추천아이템과 멘트 바뀌게=====================
    
      let dustText=localStorage.getItem('dust')

        if(tempSky.skyText == "비" || 
           tempSky.skyText == "비/눈" ||
           tempSky.skyText == "눈" ||
           tempSky.skyText == "소나기"
        ){el_mainItem.innerHTML=`<img src="./image/index/item/item_rain.png" alt="">
                    <span>비가 옵니다.<br> 우산을 챙기세요!</span>`
        }
        else{
          if(dustText == '나쁨' || dustText == "매우나쁨"){
            el_mainItem.innerHTML=`<img src="./image/index/item/item_dust.png" alt="">
                    <span>미세먼지 주의!<br> 마스크를 챙기세요!</span>`
          }else{
            if(tempSky.temp > 26){ 
            el_mainItem.innerHTML=`<img src="./image/index/item/item_hot.png" alt="">
                    <span>매우 덥습니다.<br> 손풍기를 챙기세요!</span>`
             }else if(tempSky.temp > 10){
              el_mainItem.innerHTML=`<img src="./image/index/item/item_shoes.png" alt="">
                    <span>밖에서 활동하기 <br> 좋은 날씨입니다!</span>`}
             else{el_mainItem.innerHTML=`<img src="./image/index/item/item_headset.png" alt="">
                    <span>음악을 들으며<br> 힐링을 해보세요!</span>`
             }
            if(tempSky.temp <= -5){ 
            el_mainItem.innerHTML=`<img src="./image/index/item/item_cold.png" alt="">
                    <span>매우 춥습니다.<br> 장갑을 챙기세요!</span>`
             };
          };
        };

    // ==============날씨(하늘상태)에 따라 메인 날씨아이콘(3D)바뀌게================
    const el_mainWeather3D=document.querySelectorAll('.weather > div')
     
      switch(tempSky.skyText){
        case "비" :el_mainWeather3D[0].classList.add('active') ; break;
        case "비/눈" :el_mainWeather3D[1].classList.add('active') ; break;
        case "눈" :el_mainWeather3D[2].classList.add('active') ; break;
        case "소나기" :el_mainWeather3D[0].classList.add('active') ; break;
        case "맑음" :el_mainWeather3D[3].classList.add('active') ; break;
        case "구름(살짝흐림)" :el_mainWeather3D[4].classList.add('active') ; break;
        case "흐림" :el_mainWeather3D[5].classList.add('active') ; break;
      }
    };
    loadCharacter();

