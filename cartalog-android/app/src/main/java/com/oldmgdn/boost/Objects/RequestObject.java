package com.oldmgdn.boost.Objects;

import com.google.firebase.database.IgnoreExtraProperties;

@IgnoreExtraProperties
public class RequestObject {

    public String make, model, VIN, year, description, type, userID, key;
    public Long timestamp;
    public int offersCount;


    public RequestObject() {
    }

    public RequestObject(String make, String model, String VIN, String year, String description, String type,
                         String userID, String key, Long timestamp, int offersCount) {
        this.make = make;
        this.model = model;
        this.VIN = VIN;
        this.year = year;
        this.description = description;
        this.type = type;
        this.userID = userID;
        this.key = key;
        this.timestamp = timestamp;
        this.offersCount = offersCount;
    }
}