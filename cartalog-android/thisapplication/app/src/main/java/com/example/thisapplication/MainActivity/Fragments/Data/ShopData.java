package com.oldmgdn.thisapplication.MainActivity.Fragments.Data;

public class ShopData {

    public String name, SN, monFri, sat, sun, tel,type, adress;
    public Double lat,lng;

    public ShopData() {

    }

    public ShopData(String adress, String name, Double lat, Double lng, String SN, String monFri, String sat, String sun, String tel, String type) {

        this.adress = adress;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.SN = SN;
        this.monFri = monFri;
        this.sat = sat;
        this.sun = sun;
        this.tel = tel;
        this.type = type;
    }

}
