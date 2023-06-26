package com.yeoooo.getTrain.crawling;

import com.yeoooo.getTrain.Train;
import com.yeoooo.getTrain.exception.LoginFailedException;
import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Timer;

@Getter
public class CrawlUtil {

    private ChromeOptions options;
    private WebDriver driver;

    public CrawlUtil(){
        this.options = new ChromeOptions();
        this.options.addArguments("--headless"); // 브라우저 창을 표시하지 않고 실행
        this.driver = new ChromeDriver(options);
    }

    /**
     *
     * @param from
     * @param to
     * @param time
     * @return ArrayList<Train> 기차 표 조회
     */
    public ArrayList<Train> get_arrivals(String from, String to, LocalDateTime time, int amount) throws InterruptedException {

        ArrayList<Train> trains = new ArrayList<>();

		driver.get("https://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do");

        WebElement input_start = driver.findElement(By.id("start"));
        input_start.clear();

        WebElement input_get = driver.findElement(By.id("get"));
        input_get.clear();

        WebElement input_sYear = driver.findElement(By.id("s_year"));

        WebElement input_sMonth = driver.findElement(By.id("s_month"));

        WebElement input_sDay = driver.findElement(By.id("s_day"));

        WebElement input_sHour = driver.findElement(By.id("s_hour"));

//        WebElement input_sweek = driver.findElement(By.id("s_week"));
        WebElement btnInq = driver.findElement(By.className("btn_inq"));
//        WebElement peop01 = driver.findElement(By.id("peop01")); // 어른 인원 수
        WebElement aElement = driver.findElement(By.className("btn_inq")).findElement(By.tagName("a"));

        input_start.sendKeys(from);
        input_get.sendKeys(to);

        input_sYear.sendKeys(String.valueOf(time.getYear()));
        input_sMonth.sendKeys(String.valueOf(time.getMonth()));
        input_sDay.sendKeys(String.valueOf(time.getDayOfMonth()));
        input_sHour.sendKeys(String.valueOf(time.getHour()));

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

            String division = table_data.get(0).getText();
            String[] train_info = table_data.get(1).getText().split("\n");
            String[] departure_info = table_data.get(2).getText().split("\n");
            String[] arrival_info = table_data.get(3).getText().split("\n");
            String[] cost = table_data.get(8).getText().split("\n");
            String[] time_cost = table_data.get(13).getText().split("\n");

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
                        .build());
        }
        return trains;
    }
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

        if (driver.getTitle().equals("로그인")) {
            throw new LoginFailedException();
        }
        return true;
    }

}
