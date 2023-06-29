package com.yeoooo.getTrain.crawling;

import com.yeoooo.getTrain.Train;
import com.yeoooo.getTrain.exception.LoginFailedException;
import com.yeoooo.getTrain.exception.ReserveFailedException;
import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Service
public class TrainService {

    private ChromeOptions options;
    /**
     * WebDriver를 Thread Local Variable로 관리해서 각 사용자마다 각자의 driver를 사용하게 해야함
     */
    private WebDriver driver;

    public TrainService(){
        this.options = new ChromeOptions();
        this.options.addArguments("--headless"); // 브라우저 창을 표시하지 않고 실행
        this.driver = new ChromeDriver(options);
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
    public ArrayList<Train> get_arrivals(String from, String to, LocalDateTime range_from, LocalDateTime range_until) throws InterruptedException {

        ArrayList<Train> trains = new ArrayList<>();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

		driver.get("https://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do");

        WebElement input_start = driver.findElement(By.id("start"));
        input_start.clear();

        WebElement input_get = driver.findElement(By.id("get"));
        input_get.clear();

        WebElement input_sYear = driver.findElement(By.id("s_year"));

        WebElement input_sMonth = driver.findElement(By.id("s_month"));

        WebElement input_sDay = driver.findElement(By.id("s_day"));

        WebElement input_sHour = driver.findElement(By.id("s_hour"));

//        WebElement input_sWeek = driver.findElement(By.id("s_week"));
//        WebElement peop01 = driver.findElement(By.id("peop01")); // 어른 인원 수
        WebElement btnInq = driver.findElement(By.className("btn_inq"));
        WebElement aElement = driver.findElement(By.className("btn_inq")).findElement(By.tagName("a"));

        input_start.sendKeys(from);
        input_get.sendKeys(to);

        input_sYear.sendKeys(String.valueOf(range_from.getYear()));
        input_sMonth.sendKeys(String.valueOf(range_from.getMonth()));
        input_sDay.sendKeys(String.valueOf(range_from.getDayOfMonth()));
        input_sHour.sendKeys(String.valueOf(range_from.getHour()));

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript(aElement.getAttribute("href"));

        WebDriverWait webDriverWait = new WebDriverWait(driver, Duration.ofSeconds(5));
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

            TrainType type = null;
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
     * @return
     */
    public boolean login(LoginType loginType, String id, String pw) {
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

//        if (driver.getTitle().equals("로그인")) {
//            throw new LoginFailedException();
//        }
        return true;
    }

    public boolean reserve(Train train) throws ReserveFailedException {
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        try {
            jsExecutor.executeScript(train.getReserve());
            driver.get("https://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do");
        } catch (Exception e) {
            // 디버그용
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean chk_login(){
        if (driver.getTitle().equals("로그인")) {
            return false;
        }
        return true;
    }

    /**
     * 드라이버에 접근해 드라이버를 끄는 함수
     * 이 또한 로컬 스레드 변수의 드라이버를 꺼야함
     */
    public void quit() {
        driver.quit();
        System.out.println("드라이버 종료.");
    }

}
