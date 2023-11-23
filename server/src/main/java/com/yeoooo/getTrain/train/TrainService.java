package com.yeoooo.getTrain.train;

import com.yeoooo.getTrain.exception.ReserveFailedException;
import com.yeoooo.getTrain.util.MailUtil;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Getter
@Service
@NoArgsConstructor
@Slf4j
public class TrainService implements InitializingBean,DisposableBean {


    private ChromeOptions options = new ChromeOptions(){{
        addArguments("--headless=new");
    }};
    private WebDriver driver;
    private String email;
    private String ip;
    private MailUtil mailUtil;
    @Setter
    private LocalDateTime lastRequestTime;

    @Setter
    private boolean stop;

    @Setter
    private int bought = 0;

    private WebDriverWait webDriverWait;

    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
//    public static final String WEB_DRIVER_PATH = "chromedriver-mac-arm64/chromedriver"; // dev 환경
    public static final String WEB_DRIVER_PATH = "chromedriver-linux64"; // run 환경


    public TrainService(String ip, String email, MailUtil mailUtil){
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        this.driver = new ChromeDriver(options);
//        this.driver = new ChromeDriver(); //디버깅용 화면 출력
        this.ip = ip;
        this.email = email;
        this.lastRequestTime = LocalDateTime.now();
        this.mailUtil = mailUtil;
        this.webDriverWait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    /**
     *
     * @param from
     * @param to
     * @param range_from
     * @return ArrayList<Train> 기차 표 조회
     *
     * 크롤링을 통해 한 페이지의 기차표를 가지고 오는 함수
     */
    public ArrayList<Train> get_arrivals(String from, String to, LocalDateTime range_from, LocalDateTime range_until, TrainType trainType) throws InterruptedException, ReserveFailedException {

        ArrayList<Train> trains = new ArrayList<>();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String reserveUrl = "https://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do";
        Map<String, Integer> calendar = new HashMap<>() {{
            put("JANUARY", 1);
            put("FEBRUARY", 2);
            put("MARCH", 3);
            put("APRIL", 4);
            put("MAY", 5);
            put("JUNE", 6);
            put("JULY", 7);
            put("AUGUST", 8);
            put("SEPTEMBER", 9);
            put("OCTOBER", 10);
            put("NOVEMBER", 11);
            put("DECEMBER", 12);
        }};

        driver.get(reserveUrl);

        WebElement input_start = driver.findElement(By.id("start"));
        input_start.clear();

        WebElement input_get = driver.findElement(By.id("get"));
        input_get.clear();

        // 열차 선택 라디오버튼
        WebElement train_radioBtnWrapper = driver.findElement(By.className("box2"));
        List<WebElement> labels = train_radioBtnWrapper.findElements(By.tagName("label"));
        List<WebElement> train_radioBtns = train_radioBtnWrapper.findElements(By.tagName("input"));
        train_radioBtns.get(trainType.getIndex()).click();

        // 인접역 선택 체크박스 체크(인접역 조회 제외)
        driver.findElement(By.id("adjcCheckYn")).click();

        //year 입력
        WebElement input_sYear = driver.findElement(By.id("s_year"));
        Select sYearSelect = new Select(input_sYear);

        //month 입력
        WebElement input_sMonth = driver.findElement(By.id("s_month"));
        Select sMonthSelect = new Select(input_sMonth);


        //day 입력
        WebElement input_sDay = driver.findElement(By.id("s_day"));
        Select sDaySelect = new Select(input_sDay);

        //hour 입력
        WebElement input_sHour = driver.findElement(By.id("s_hour"));
        Select sHourSelect = new Select(input_sHour);
//        WebElement input_sWeek = driver.findElement(By.id("s_week"));
//        WebElement peop01 = driver.findElement(By.id("peop01")); // 어른 인원 수
        WebElement btnInq = driver.findElement(By.className("btn_inq"));
        WebElement aElement = driver.findElement(By.className("btn_inq")).findElement(By.tagName("a"));

        input_start.sendKeys(from);
        input_get.sendKeys(to);

        sYearSelect.selectByValue(String.valueOf(range_from.getYear()));
        sMonthSelect.selectByValue(calendar.get(String.valueOf(range_from.getMonth())).toString());
        sDaySelect.selectByIndex(range_from.getDayOfMonth() - 1);
        sHourSelect.selectByValue(String.valueOf(range_from.getHour()));


        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript(aElement.getAttribute("href"));
        try {
            WebElement korailAlert = driver.findElement(By.className("korail_alert"));
            if (korailAlert != null) {
                webDriverWait.until(ExpectedConditions.presenceOfElementLocated(By.className("korail_alert")));
                driver.findElement(By.className("korail_alert")).findElement(By.className("plainmodal-close")).click();
            }
        } catch (Exception e) {
            log.info("[TrainService] : korail_alert 요소 없음.");
        }

        //조회 결과 유효성 검증
        try {
            // 조회 결과 없음
            WebElement guideMsg = driver.findElement(By.className("guide_msg"));
            throw new ReserveFailedException("조회 결과가 없습니다.");
        } catch (TimeoutException e) {
            // 조회 정상 작동
        } catch (NoSuchElementException e) {
            // 조회 정상 작동
        }


        webDriverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("tableResult")));

        WebElement tableResult = driver.findElement(By.id("tableResult"));
        List<WebElement> tableResult_tbody = tableResult.findElements(By.tagName("tr"));

        for (WebElement td :
                tableResult_tbody) {
            List<WebElement> table_data = td.findElements(By.tagName("td"));

            if (table_data.size() == 0) {
                continue;
            }

            String division;
            String[] train_info;
            String[] departure_info;
            String[] arrival_info;
            String reserve_href;
            String[] cost;
            String[] time_cost;

            try {
                division = table_data.get(0).getText();
                train_info = table_data.get(1).getText().split("\n");
                departure_info = table_data.get(2).getText().split("\n");
                arrival_info = table_data.get(3).getText().split("\n");
                //            String reserve_specialty_href = table_data.get(4).findElement(By.tagName("a")).getAttribute("href");
                reserve_href = table_data.get(5).findElement(By.tagName("a")).getAttribute("href");
                cost = table_data.get(8).getText().split("\n");
                time_cost = table_data.get(13).getText().split("\n");
            } catch (Exception e) {
                continue;
            }

            TrainType type;
            int train_id = 0;

            if(train_info.length == 2){
                type = TrainType.KTX;
                train_id = Integer.parseInt(train_info[1]);
            }else{
                if (train_info[0].startsWith("10")) {
                    type = TrainType.ITX;
                }else{
                    type = TrainType.MUGUNGHWA;
                }
                train_id = Integer.parseInt(train_info[0]);
            }
            int[] departure_time = Arrays.stream(departure_info[1].split(":")).mapToInt(x -> Integer.parseInt(x)).toArray();
            int t_time = (departure_time[0] * 60) + departure_time[1];
            int r_from = (range_from.getHour() * 60) + range_from.getMinute();
            int r_until = (range_until.getHour() * 60) + range_until.getMinute();

            if (r_from <= t_time && t_time <= r_until){
                trains.add(
                    Train.builder()
                            .division(division)
                            .trainType(type)
                            .train_id(train_id)
                            .from(departure_info[0])
                            .to(arrival_info[0])
                            .depart_time(departure_info[1])
                            .arrival_time(arrival_info[1])
                            .cost(cost[0])
                            .time_cost(time_cost[0])
                            .reserve(reserve_href)
                            .build());
            }

        }
        return trains;
    }

    /**
     * 로그인 페이지로 접근해 로그인을 수행하는 함숙
     * @param loginType
     * @param id
     * @param pw
     * @return String
     */
    public String login(LoginType loginType, String id, String pw) {
        driver.get("https://www.letskorail.com/korail/com/login.do");
        WebElement aElement = driver.findElement(By.className("btn_login")).findElement(By.tagName("a"));

        if (loginType.equals(LoginType.MEMBERSHIP_LOGIN)) {
            WebElement memberShipRad = driver.findElement(By.id("radInputFlg1"));
            memberShipRad.click();

            WebElement input_txtMember = driver.findElement(By.id("txtMember"));
            WebElement input_txtPwd = driver.findElement(By.id("txtPwd"));

            input_txtMember.sendKeys(id);
            input_txtPwd.sendKeys(pw);

        } else if (loginType.equals(LoginType.EMAIL_LOGIN)) {
            WebElement emailRad = driver.findElement(By.id("radInputFlg0"));
            emailRad.click();

            WebElement input_txtEmailNo_1 = driver.findElement(By.id("txtEmailNo_1"));
            WebElement input_txtEmailNo_2 = driver.findElement(By.id("txtEmailNo_2"));
            WebElement input_txtPwd = driver.findElement(By.id("txtPwd2"));

            String[] input_email = id.split("@");
            input_txtEmailNo_1.sendKeys(input_email[0]);
            input_txtEmailNo_2.sendKeys(input_email[1]);
            input_txtPwd.sendKeys(pw);


        } else if (loginType.equals(LoginType.PHONE_NUMBER_LOGIN)) {
            WebElement phoneRad = driver.findElement(By.id("radInputFlg2"));
            phoneRad.click();

            WebElement input_txtCp_1 = driver.findElement(By.id("txtCpNo2"));
            WebElement input_txtCp_2 = driver.findElement(By.id("txtCpNo3"));
            WebElement input_txtPwd = driver.findElement(By.id("txtPwd1"));

            String[] input_Cp = id.split("-");
            input_txtCp_1.sendKeys(input_Cp[0]);
            input_txtCp_2.sendKeys(input_Cp[1]);
            input_txtPwd.sendKeys(pw);
        }

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript(aElement.getAttribute("href"));

        try {
            Alert alert = webDriverWait.until(ExpectedConditions.alertIsPresent());
            if (alert != null) {
                String alertMsg = alert.getText();
                alert.accept();
                return alertMsg;
            }

        } catch (TimeoutException e) {
            log.info("[TrainService] : 로그인 성공.");
        }
            return "";
    }

    public boolean reserve(Train train) throws ReserveFailedException {
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        try {
            jsExecutor.executeScript(train.getReserve());
            try {
                driver.get("https://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do");

            } catch (UnhandledAlertException e) {
                log.info("[TrainService - {}] UnhandledAlertException - {}", email, e.getAlertText());
            }

        } catch (Exception e) {
            // 디버그용
            e.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * 예약 매크로 함수
     * delay는 1초
     *
     * @param req_train
     * @return
     * @throws InterruptedException
     * @throws ReserveFailedException
     */
    public Optional<Train> reserve_pipeLine(TrainDTO req_train) throws InterruptedException, ReserveFailedException {
        setStop(true);
        setLastRequestTime(LocalDateTime.now());

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        while (stop) {
;            ArrayList<Train> arrivals = get_arrivals(req_train.getFrom(), req_train.getTo(), LocalDateTime.parse(req_train.getTime_from(), dateTimeFormatter), LocalDateTime.parse(req_train.getTime_until(), dateTimeFormatter), req_train.getTrainType());
            if (!arrivals.isEmpty()) {
                if (reserve(arrivals.get(0))) {
                    mailUtil.sendEmail(email, arrivals.get(0));
                    return Optional.ofNullable(arrivals.get(0));
                }

            }else{
                log.info("\r [TrainService] - {} 예약중..", email);
            }
            Thread.sleep(1000);
        }
        return Optional.ofNullable(null);
    }

    /**
     * 드라이버를 통해 로그아웃을 수행하는 함수
     */
    public boolean logout() {
        driver.get("https://www.letskorail.com/ebizprd/prdMain.do");
        WebElement logout_li = driver.findElement(By.className("gnb_list")).findElements(By.tagName("li")).get(3);
        WebElement aElement = logout_li.findElement(By.tagName("a"));

        try {
            //로그인이 되어있지 않은 경우
            if (aElement.getAttribute("alt").contains("로그아웃") || aElement.getAttribute("alt").toLowerCase().contains("logout")) {
                return false;
            }

        } catch (NullPointerException e) {
            //로그인이 되어있어 logout 버튼이 뜨지 않는 경우
            JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
            jsExecutor.executeScript(aElement.getAttribute("onclick"));

            try {
                webDriverWait.until(ExpectedConditions.alertIsPresent());
                driver.switchTo().alert().accept();

            } catch (TimeoutException te) {
                return true;
            }
        }
        return true;

    }

    /**
     * 로그인 여부 확인 함수
     * @return
     */
    public boolean chk_login(){
        if (driver.getTitle().equals("로그인")) {
            return false;
        }
        return true;
    }

    public int getReserved(){
        String url = "https://www.letskorail.com/ebizprd/EbizPrdTicketpr13500W_pr13510.do";
        driver.get(url);

        try {
            WebElement basket = webDriverWait.until(ExpectedConditions.presenceOfElementLocated(By.className(".tbl_h.jsClickLayer")));
            List<WebElement> tr = basket.findElements(By.tagName("tr"));
            return tr.size();
        } catch (NoSuchElementException e) {
           return 0;
        }
    }


    /**
     * 드라이버 종료 함수
     */
    public void quit() {
        driver.quit();
    }


    @Override
    public void destroy() throws Exception {

    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
