package com.oldmgdn.boost.Objects;

public class FeedbackObject {

    public String message, userID;
    public long timestamp;

    public FeedbackObject() {
    }

    public FeedbackObject(String message, String userID, long timestamp) {
        this.message = message;
        this.userID = userID;
        this.timestamp = timestamp;
    }
}
