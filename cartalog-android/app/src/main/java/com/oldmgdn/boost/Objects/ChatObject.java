package com.oldmgdn.boost.Objects;

public class ChatObject {

    public String message, key, vendorID, userID,time;
    public int viewType, newWebMessage, newAppMessage, messageSnackIsShown;
    public long timestamp;

    public ChatObject() {
    }

    public ChatObject(String message, String time,  int viewType, String key, String vendorID, int newWebMessage, int newAppMessage, int messageSnackIsShown, String userID, long timestamp) {
        this.message = message;
        this.time = time;
        this.viewType = viewType;
        this.key = key;
        this.vendorID = vendorID;
        this.newWebMessage = newWebMessage;
        this.newAppMessage = newAppMessage;
        this.messageSnackIsShown = messageSnackIsShown;
        this.userID = userID;
        this.timestamp = timestamp;
    }
}
