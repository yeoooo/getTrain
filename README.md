# GetYourTrain APISever & Client
개인 예매 용도로 제작한 매크로 API 서버와 클라이언트 입니다. 
불법적 사용을 엄금합니다.

## 클라이언트
### 로그인 화면
![스크린샷 2023-11-21 오후 9 22 12](https://github.com/yeoooo/getTrain/assets/71688432/f48d45d4-136f-44b7-b028-7e23d7d4eeb8)  
### 열차 검색 화면
![스크린샷 2023-11-21 오후 9 22 45](https://github.com/yeoooo/getTrain/assets/71688432/04d79f2e-f175-491f-b0ab-36ba9b13f31c)
### 열차 조건 선택 완료 화면
![스크린샷 2023-11-21 오후 9 26 13](https://github.com/yeoooo/getTrain/assets/71688432/2b6cd7e6-6744-4d30-a14f-035661f28bfc)  
### 열차 조회중 화면  
![스크린샷 2023-11-21 오후 9 26 57](https://github.com/yeoooo/getTrain/assets/71688432/ca4a103a-a918-4b0b-9af9-95088fcc9ce5)

### 검색화면
  ㅡ

## ☎️ Endpoint 호출 방법  
### 로그인 (GET):  
- 엔드포인트: /api/v1/login
- HTTP 메서드: GET
- 요청 본문: JSON 형식의 유저 데이터 (@RequestBody Map req)
- 필요한 데이터: 로그인 타입, 아이디, 비밀번호, 알림 받을 이메일
- 응답: 로그인 성공시 200 OK 응답

### 기차 예매 (POST):
- 엔드포인트: /api/v1/reserve
- HTTP 메서드: GET
- 요청 본문: JSON 형식의 요청 데이터 (req 매개변수)
- 필요한 데이터: 열차 종류, 출발역, 도착역, 출발 시간, 도착 시간
- 응답: 기차 예매 성공시 200 OK 응답과 함께 이메일로 알림 발송

### 기차 조회 취소 (GET):
- 엔드포인트: /api/v1/quit
- HTTP 메서드: GET
- 요청 파라미터: email
- 응답: 취소 성공시 200 OK 응답

### 로그아웃 (GET):
- 엔드포인트: /api/v1/logout
- HTTP 메서드: GET
- 요청 파라미터: email
- 응답: 로그아웃 성공시 200 OK 응답


## 💭 버전 0.1

- 로그인, 조건 별 열차 예매 기능과 이메일 알림 기능을 제공합니다. 
  
- 현재 급박한 상황에서의 열차 예매 성공 여부 확인 로직이 간단하게 짜여져있으나 업데이트 예정입니다.

- 특실은 선택할 수 없습니다.

- 인원 수를 포함한 기차예매는 고려중에 있습니다.
  

## 💭 배포  
- ### 시스템 구성
  
  <img src = https://github.com/yeoooo/getTrain/assets/71688432/caaf3129-7aa2-4a89-a189-633d5701dfa8 style = "height : 1000px; width : 600px;" align = "center"/>










