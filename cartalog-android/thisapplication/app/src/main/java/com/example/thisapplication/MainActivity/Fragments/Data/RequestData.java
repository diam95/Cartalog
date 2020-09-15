package com.oldmgdn.thisapplication.MainActivity.Fragments.Data;

public class RequestData {

    public String VIN, description, device_token, key, marka, model, user, year, image, type;
    public Long offers_count;

    public RequestData() {

    }

    public RequestData(String VIN, String type, Long offers_count, String image, String description, String device_token, String key, String marka, String model, String user, String year) {
        this.VIN = VIN;
        this.description = description;
        this.device_token = device_token;
        this.key = key;
        this.marka = marka;
        this.model = model;
        this.user = user;
        this.image = image;
        this.year = year;
        this.offers_count = offers_count;
        this.type = type;
    }

}
