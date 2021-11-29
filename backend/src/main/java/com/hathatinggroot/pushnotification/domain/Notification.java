package com.hathatinggroot.pushnotification.domain;


import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class Notification {
    private String id;
    private long timestamp;
    private String senderId;
    private String topic;
    private String content;

    private String receiverId;
    private boolean read;

    public Notification() {
        this.id = UUID.randomUUID().toString();
        this.timestamp = System.currentTimeMillis();
    }

    public Notification(String senderId, String topic, String content) {
        this();
        this.senderId = senderId;
        this.topic = topic;
        this.content = content;
    }
}
