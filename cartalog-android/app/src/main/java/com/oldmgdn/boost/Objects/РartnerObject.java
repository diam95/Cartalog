package com.oldmgdn.boost.Objects;

public class РartnerObject {

    public String address, coord1, coord2, fri, mon, name, sat, sun, tel, thu, tue, uid, wed;

    public РartnerObject() {
    }

    public РartnerObject(String address, String coord1, String coord2, String fri, String mon, String name, String sat, String sun, String tel, String thu, String tue, String uid, String wed) {
        this.uid = uid;
        this.mon = mon;
        this.tue = tue;
        this.wed = wed;
        this.thu = thu;
        this.fri = fri;
        this.sat = sat;
        this.sun = sun;
        this.coord1 = coord1;
        this.coord2 = coord2;
        this.tel = tel;
        this.name = name;
        this.address = address;
    }
}