![Image](https://github.com/user-attachments/assets/5d476bef-5d39-4be1-804c-9f028c1cc93e)

## ✨ 소개
소소한 일상을 채워주는 디자인 문구와 아이템을 소개하는 SPA 웹사이트, <b>"Ripo"</b> 입니다.

자신만의 일상과 감정을 감성적으로 기록하고 꾸밀 수 있는 공간을 제공하여, <br>
소소한 순간들을 소중하게 남길 수 있도록 합니다. <br>
또한, 일상을 기록하는 습관이 주는 즐거움과 그 의미를 널리 알리고자 기획하였습니다. <br>

480px(모바일) 해상도에 최적화된 디자인을 적용하여, <br>
언제 어디서나 편리하게 사용할 수 있도록 구현하였습니다.

## 🔗 배포 URL
https://ripo-tau.vercel.app

## 📑 프로젝트 요약

### 1. 주제

* 매일 기록하는 습관과 소소한 취향을 반영해, 자연스럽게 소비로 이어지는 감성적이고 귀여운 쇼핑 공간 제공

### 2. 목표

* 타겟층의 취향을 고려한 제품 구성
* 검색, 장바구니 기능 등 쇼핑 경험 개선을 통해 사용자 만족도 향상

### 3. 핵심 기능

* 카테고리별 상품 리스트 및 상세 정보 제공
* 사용자 맞춤 검색 기능
* 장바구니를 통한 상품 보관 및 선택 결제 기능
* 자주 묻는 질문 페이지 제공
* 회원가입 및 로그인 기능
* 마이페이지 주문 내역 관리
* 모바일 480px

### 4. 주요 기술 스택

* Front-End : React, React Router
* Back-End : Node.js, PHP, XAMPP
* Data-Base : MySQL

## 📆 기간 및 인원

  * 2025.05.08-2025.05.27 평일 기준 총 14일
    * 기초 데이터 수집 및 화면 설계 기간 : 4일
    * 개발 및 테스트 기간 : 10일
   
  * 팀원 : 2명

## 👩🏻‍🤝‍🧑🏻 팀원 소개

| 이름 | 주요 페이지 컴포넌트 | 해당 |
| :---:| :---: | :---: |
| 천지호 | Home.jsx, 검색(search 폴더), 카테고리(category 폴더), 상품 정보(product 폴더), Faq.jsx |  |
| 소연희 | Splash.jsx, 장바구니(cart 폴더), 결제(pay 폴더), 마이페이지(mypage 폴더), 로그인 및 회원가입(login 폴더) | ✔ |

## 💡 주요 기능

### 1. 회원가입 및 로그인
* 기본 정보 입력을 통한 회원가입 기능
* 로그인 후 마이페이지, 장바구니 등 개인화 기능 이용 가능

### 2. 검색
* 키워드 기반 상품 검색 기능
* 검색 결과 페이지에서 상품 리스트 확인 가능
* 관련 키워드 기반 추천 키워드 기능으로 쉽게 검색 가능

### 3. 상품 정보
* 카테고리별로 상품을 구분하여 리스트 형태로 출력
* 각 상품 클릭 시 상세페이지에서 상품 정보 확인 가능
* 서버에서 연동된 상품 데이터를 기반으로 실시간 정보 반영

### 4. 장바구니
* 원하는 상품을 장바구니에 담아두고 한 번에 결제 가능
* 선택한 상품만 결제할 수 있도록 체크박스 기능 제공
* 선택 삭제 및 개별 삭제 기능 지원
* 총 주문 금액 자동 계산

### 5. 마이페이지
* 주문 내역 확인 기능
* 사용자들이 자주 찾는 질문 정리 후 FAQ 탭 구성

## 🗂️ 폴더 구조

```
📂Ripo-Project
┣ 📂ripo                      # 리포 ( Front-End_React 프로젝트 )
┃ ┣ 📂public
┃ ┃ ┣ 📂imgs
┃ ┃ ┃ ┗ 📂_icons
┃ ┣ 📂src
┃ ┃ ┣ 📂component             # 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂_common             # 공통 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂00-login            # 로그인 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂01-home             # 홈 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂02-search           # 검색 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂03-category         # 카테고리 컴포넌트 폴더               
┃ ┃ ┃ ┣ 📂04-product          # 상품 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂05-cart             # 장바구니 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂06-pay              # 결제 컴포넌트 폴더
┃ ┃ ┃ ┗ 📂icons
┃ ┃ ┣ 📂pages                 # 각 페이지 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂00-login
┃ ┃ ┃ ┣ 📂01-home
┃ ┃ ┃ ┣ 📂02-search
┃ ┃ ┃ ┣ 📂03-category
┃ ┃ ┃ ┣ 📂04-product 
┃ ┃ ┃ ┣ 📂05-cart
┃ ┃ ┃ ┣ 📂06-pay
┃ ┃ ┃ ┣ 📂07-mypage
┃ ┃ ┃ ┗ 📜Splash.jsx          # 온보딩 페이지
┃ ┃ ┗ 📂styles                # scss
┃ ┃ ┗ 📜App.js                # 프로젝트의 전체 라우팅 및 최상위 컴포넌트
┃ ┣ ⚙️.env
┃ ┗ README.md
┣ 📂admin                     # 리포 ( Back-End_PHP 프로젝트 )
┃ ┣ 📂api                     # 데이터 가공 및 반환을 담당하는 API 파일들이 위치한 폴더
┃ ┣ 📂member                  # 회원가입, 탈퇴 등 회원 관련 데이터를 저장하고 관리하는 폴더
┃ ┣ 📂product                 # 카테고리 및 상품을 생성, 수정, 삭제하는 기능 폴더
┃ ┣ 📜auth.php                # 관리자 페이지에 일반 사용자가 접근 시 접근 제한 처리
┃ ┣ 📜common.php              # 관리자 페이지 공통: 카테고리 관련 함수 정의
┃ ┣ 📜config.php              # 데이터베이스 연결 및 사이트 기본 설정 파일
┃ ┣ 📜header.php              # 관리자 페이지 공통 헤더 파일
┃ ┣ 📜index.php               # 관리자 페이지 메인 페이지 진입
┃ ┣ 📜login.php               # 관리자 로그인 처리
┃ ┣ 📜logout.php              # 관리자 로그아웃 처리
┃ ┣ 📜table.php               # 데이터베이스 테이블 생성 파일
┗ ┗ 📜style.css
```

## 💻 개발 환경

### 1. Frond-End

| 사용기술 | 설명 |Badge |
| :---:| :---: | :---: |
| **React** | **SPA기반 프레임워크** |![react](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)|
|**React Router Dom** | **페이지 라우팅 관리** |![reactrouter](https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white)|
| **React Hook Form** | **폼 상태 및 데이터 관리** |![reacthookform](https://img.shields.io/badge/ReactHookForm-F24E1E?style=flat-square&logo=reacthookform&logoColor=white)|
| **Axios** | **클라이언트에서 서버로 API 요청 처리** |![axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)|

### 2. UI/UX 라이브러리

| 사용기술 | 설명 | Badge |
| :---:| :---: | :---: |
| **MUI** | **UI 프레임워크** |![mui](https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white) |
| **Swiper** | **슬라이더** |![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=axios&logoColor=white)|
| **react-swipeable** | **스와이프 제스처** |![npm](https://img.shields.io/badge/react--swipeable-00e6a4?style=flat-square&logo=npm&logoColor=white)|
| **motion** | **애니메이션** |![motion](https://img.shields.io/badge/motion-fff312?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjQgOSI+CiAgPHBhdGggZD0iTSA5LjA2MiAwIEwgNC4zMiA4Ljk5MiBMIDAgOC45OTIgTCAzLjcwMyAxLjk3MSBDIDQuMjc3IDAuODgyIDUuNzA5IDAgNi45MDIgMCBaIE0gMTkuNjU2IDIuMjQ4IEMgMTkuNjU2IDEuMDA2IDIwLjYyMyAwIDIxLjgxNiAwIEMgMjMuMDA5IDAgMjMuOTc2IDEuMDA2IDIzLjk3NiAyLjI0OCBDIDIzLjk3NiAzLjQ5IDIzLjAwOSA0LjQ5NiAyMS44MTYgNC40OTYgQyAyMC42MjMgNC40OTYgMTkuNjU2IDMuNDkgMTkuNjU2IDIuMjQ4IFogTSA5Ljg3MiAwIEwgMTQuMTkyIDAgTCA5LjQ1IDguOTkyIEwgNS4xMyA4Ljk5MiBaIE0gMTQuOTc0IDAgTCAxOS4yOTQgMCBMIDE1LjU5MiA3LjAyMSBDIDE1LjAxOCA4LjExIDEzLjU4NSA4Ljk5MiAxMi4zOTIgOC45OTIgTCAxMC4yMzIgOC45OTIgWiIgZmlsbD0icmdiKDAsIDAsIDApIj48L3BhdGg+Cjwvc3ZnPgo=&logoColor=white)|
| **Sass** | **스타일링**|![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white)|
| **sweetalert2** | **커스텀 팝업 알림 UI** |![sweetalert2](https://img.shields.io/badge/sweetalert2-F27474?style=flat-square&logo=datefns&logoColor=white)|

### 3. Back-End

| 사용기술 | 설명 | Badge |
| :---:| :---: | :---: |
| **Node.js** | **JavaScript 런타임 환경** |![nodedotjs](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)|
| **PHP** | **회원 및 상품 관리, 관리자 페이지 구현 등 서버 측 로직 처리** |![PHP](https://img.shields.io/badge/PHP-8892BE?style=flat-square&logo=npm&logoColor=white)|
| **MySQL** | **데이터베이스 관리**  |![MySQL](https://img.shields.io/badge/MySQL-00758F?style=flat-square&logo=JSON&logoColor=white)|
| **XAMPP** | **Apache, MySQL, PHP를 통합 제공하는 로컬 서버 개발 도구** |![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=flat-square&logo=nodemon&logoColor=white)|
| **Axios** | **서버에서 API 요청 처리** |![axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)|

### 4. 개발 도구

|사용기술 | 설명 | Badge | 
| :---:| :---: | :---: |
| **Visual Studio Code (VS Code)** | **코드 편집기( 에디터 )** |![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjAwMyAyTDEyIDEzLjMwM0w0Ljg0IDhMMiAxMEw4Ljc3MiAxNkwyIDIyTDQuODQgMjRMMTIgMTguNzAyTDI0LjAwMyAzMEwzMCAyNy4wODdWNC45MTNMMjQuMDAzIDJaTTI0IDkuNDM0VjIyLjU2NkwxNS4yODkgMTZMMjQgOS40MzRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K&logoColor=white) |
|**GitHub** | **버전 관리** |![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)| 
| **Vercel** | **서버리스 플랫폼** |![vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)|
| **Figma** | **디자인 & UI/UX**|![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white) |


## 📚 프로젝트 문서 자료

| 문서종류 | 파일명 | 설명 |
| :---:| :---: | :---: |
| 화면설계 | [화면설계.pdf](https://github.com/yeonhee001/ripo/blob/main/work/semi%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_B%ED%8C%80_01%EA%B8%B0%ED%9A%8D%2C%ED%99%94%EB%A9%B4%EC%84%A4%EA%B3%84.pdf) | 주요 페이지의 화면 구성, 사용자 흐름 등 와이어프레임 기반 설계 자료 |
| 디자인 | [디자인.pdf](https://github.com/yeonhee001/ripo/blob/main/work/semi%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_B%ED%8C%80_02%EB%94%94%EC%9E%90%EC%9D%B8.pdf) | Figma로 작업한 디자인 시안. 색상, 폰트, UI 요소 등 자료 |
| 발표자료 | [발표자료.pdf](https://github.com/yeonhee001/ripo/blob/main/work/semi%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_B%ED%8C%80_%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pdf) | 팀 프로젝트 발표용 슬라이드 자료 |
| 완료 보고서 | [완료보고서.pdf](https://github.com/yeonhee001/ripo/blob/main/work/semi%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_B%ED%8C%80_%EC%99%84%EB%A3%8C%EB%B3%B4%EA%B3%A0%EC%84%9C.pdf) | 프로젝트 진행 결과 요약 등 최종 보고 |


## 💾 프로젝트 저장소
프론트엔드와 서버 소스 코드는 별도의 저장소로 분리되어있습니다.
* [서버 저장소 바로가기](https://github.com/yeonhee001/php-ripoServer.git)


# 소연희의 개발 상세

## 📑 요약
* 담당
  * 스플래시 화면 구현
  * 로그인/로그아웃 기능 구현
  * 회원가입 기능 구현
  * 마이페이지 구성 및 주문 내역 표시
  * 장바구니 기능 구현(선택/전체 삭제, 금액 계산 등)
  * 결제 및 결제 완료 페이지 구현
* 담당 컴포넌트 상세
  * Splash.jsx <br/>
    → 첫 방문 시 로고와 로딩 애니메이션을 보여주는 스플래시 화면 구현
  * Login.jsx <br/>
    → 사용자 로그인 기능 구현 및 로그인 성공 시 세션 유지 처리 <br/>
    → Axios를 통해 로그인 상태를 확인
  * Signup.jsx <br/>
    → 기본 정보 입력을 통한 회원가입 처리 <br/>
    → 회원가입 폼 제출 시 Axios로 서버에 데이터 전송 (PHP로 MySQL DB에 저장)
  * CartList.jsx <br/>
    → 장바구니에 담긴 상품 데이터를 PHP에서 불러와 렌더링 <br/>
    → 체크박스를 통한 선택 상품만 결제 가능하며, 선택/삭제 요청 시 서버로 삭제 요청 전송 <br/>
    → 총 금액 계산은 프론트에서 자동 처리
  * Pay.jsx <br/>
    → 선택한 상품 결제 진행 화면으로 주문 정보 입력 및 확인 처리 <br/>
    → PHP 서버에서 주문 정보 저장 처리
  * PayDone.jsx <br/>
    → 결제 완료 후 안내 메시지를 표시하는 화면 구현
  * My.jsx <br/>
    → 로그인된 사용자 정보를 서버에서 불러와 사용자 이름, 아이디를 마이페이지 상단에 렌더링 <br/>
    → 주문 내역 확인, 자주 묻는 질문 등을 제공하는 마이페이지 구현
  * OrderList.jsx <br/>
    → 사용자의 주문 내역을 PHP서버에서 불러와 화면에 표시
 
## 🧩 공통 컴포넌트 제작
* 📜AgreeCheck.jsx - 약관 동의나 상품 선택 시 사용하는 체크박스 컴포넌트
* 📜AlertBtn1.jsx - 버튼이 1개인 팝업창으로, 사용자 확인이 필요한 상황에 사용되는 컴포넌트
* 📜AlertBtn2.jsx - 버튼이 2개인 팝업창으로, 확인/취소 등 선택이 필요한 경우에 사용되는 컴포넌트
* 📜BtnLong.jsx - 페이지 하단 또는 주요 작업에 사용하는 긴 버튼 형태의 컴포넌트
* 📜BtnShort.jsx - 두 가지 선택지에서 사용되는 짧은 버튼 형태의 컴포넌트
* 📜DataLoading.jsx - 데이터 로딩 중 표시되는 공통 로딩 컴포넌트
* 📜InfoMessage.jsx - 안내 문구 또는 데이터가 없을 때 표시되는 메시지 컴포넌트
* 📜PayDoneBar.jsx - 결제 완료 등의 페이지 상단에 부제목 형태로 사용되는 컴포넌트
* 📜PayProductItem.jsx - 결제 및 주문내역 화면에서 상품 정보를 보여주는 카드형태의 아이템 컴포넌트
* 📜ProductPrice.jsx - 장바구니 및 결제페이지에서 상품 가격 정보를 표시하는 컴포넌트

  
## 💥 트러블 슈팅

### 📌 CartList.jsx

 1. 장바구니에서 개별 상품을 삭제할 경우에는 화면에서 바로 반영되었으나, 여러 상품을 선택한 후 "선택 삭제" 버튼을 클릭하면 화면에 삭제된 결과가 즉시 반영되지 않는 이슈 발생
  
    *선택 삭제 후 checkItems 상태를 cartList 기준으로 초기화했지만 즉각 반영되지 않음
       
    ⇒ **해결방법**: 해당 문제를 해결하기 위해 삭제 요청이 완료된 후 서버에서 장바구니 데이터를 다시 받아와 cartList와 checkItems 상태를 갱신하도록 처리 <br/>

 2. 사용자가 장바구니에서 "결제하기" 버튼을 클릭하지 않고 결제 페이지에서 브라우저의 뒤로가기를 누르면, 장바구니에서 상품이 사라지는 이슈 발생
  
    *결제 페이지 진입 시점에 장바구니 상태가 비워지는 로직이었음
       
    ⇒ **해결방법**: 이를 방지하기 위해 "결제하기" 버튼을 클릭한 시점에만 결제 페이지로 이동되도록 처리하여, 뒤로가기로 인한 장바구니 유실 방지 <br/>

### 📌 Pay.jsx

 1. 상품 디테일 페이지에서 "구매하기" 버튼을 클릭하면, 결제 페이지에서 총 상품 금액이 실제보다 높게 표시되는 이슈 발생
  
    *p_price 값이 이미 수량(ea)이 곱해진 상태였는데, 결제 페이지에서 다시 한 번 * ea를 해버려 중복 계산 발생
       
    ⇒ **해결방법**: 이 문제를 해결하기 위해 총 금액 계산 시 * ea를 제거하였고, 금액 정보는 let product = [] 형태로 전달하지 않고 상태값으로 관리하도록 수정, Number()를 사용해 전달된 값들이 정확히 숫자형으로 인식되도록 하여 금액 계산에 오류가 없도록 보완 <br/>

### 📌 OrderList.jsx

 1. 주문내역 페이지에서 특정 상품을 클릭하면 해당 상품의 상세 페이지로 이동하도록 구현했지만, 이때 type 값이 전달되지 않아 상세 페이지에서 해당 상품 정보가 정확히 매칭되지 않는 이슈 발생
  
    *orders 테이블에 상품의 cat_id(카테고리 ID)를 저장하지 않아 어떤 타입인지 알 수 없었음
       
    ⇒ **해결방법**: 이를 해결하기 위해 orders.php에 cat_id 컬럼을 추가하고, postData 함수에서 해당 값을 함께 저장하도록 수정, 이후 type을 정상적으로 전달받아 상세 페이지 이동 시 상품이 제대로 로드되도록 처리 <br/>

### 📌 PayProductItem.jsx

 1. 결제 페이지와 주문내역 페이지에서 동일한 상품 컴포넌트를 사용하고 있는데, 결제 페이지에서는 상품을 클릭해도 상세 페이지로 이동하면 안 되며, 주문내역에서는 이동이 되어야 하는 이슈 발생
  
    *클릭 동작이 공통 컴포넌트에 항상 활성화되어 있어 모든 페이지에서 작동하고 있었음
       
    ⇒ **해결방법**: 이를 해결하기 위해 컴포넌트에 click prop을 추가하고 기본값을 false로 설정, 주문내역 페이지에서는 click={true}로 전달하여 해당 페이지에서만 상품 클릭 시 상세 페이지로 이동하도록 분기 처리 <br/>
