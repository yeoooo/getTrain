package com.yeoooo.getTrain.crawling;

import com.yeoooo.getTrain.Train;
import com.yeoooo.getTrain.exception.LoginFailedException;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

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
    public ArrayList<Train> get_arrivals(String from, String to, String time){

        ArrayList<Train> trains = new ArrayList<>();

		driver.get("https://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do");
        WebElement input_start = driver.findElement(By.id("start"));
        WebElement input_get = driver.findElement(By.id("get"));
        WebElement input_sYear = driver.findElement(By.id("s_year"));
        WebElement input_sMonth = driver.findElement(By.id("s_month"));
        WebElement input_sDay = driver.findElement(By.id("s_day"));
        WebElement input_sHour = driver.findElement(By.id("s_hour"));
//        WebElement input_sweek = driver.findElement(By.id("s_week"));
        WebElement btnInq = driver.findElement(By.className("btn_inq"));
        String source = driver.getPageSource();

//        input_start.sendKeys(from);
//        input_get.sendKeys(to);

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss.S");
        LocalDateTime target_date = LocalDateTime.parse(time, dateTimeFormatter);
        System.out.println();



//        System.out.println("source = " + source);
//        System.out.println("input_start = " + input_start.getText());
//        System.out.println("input_get = " + input_get.getText());
//        System.out.println("input_sYear = " + input_sYear.getText());
//        System.out.println("input_sMonth = " + input_sMonth.getText());
////        System.out.println("input_sweek = " + input_sweek.getText());
//        System.out.println("btnInq = " + btnInq.getText());

        //파싱 및 Train 객체 생성

        driver.quit();
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
        driver.quit();
        return true;
    }

}
