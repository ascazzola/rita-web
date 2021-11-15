package sample;

import robocode.JuniorRobot;

public class Adriano extends JuniorRobot {

    public void run() {
        setColors(4080, 268435455, 267597411, 108003327, 836412);
        while (true) {
            bearGunTo(90);
            ahead(100);
            turnGunRight(180);
            back(100);
            turnGunRight(180);
        }
    }

    public void onScannedRobot() {
        fire(1);
    }

    public void onHitByBullet() {
        back(10);
    }

    public void onHitWall() {
        back(20);
    }

    public void onHitRobot() {}
}