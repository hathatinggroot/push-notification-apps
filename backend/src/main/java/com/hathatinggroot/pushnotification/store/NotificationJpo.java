package com.hathatinggroot.pushnotification.store;


import com.hathatinggroot.pushnotification.domain.Notification;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "NOTIFICATION")
public class NotificationJpo {
    @Id
    private String id;
    private String timestamp;

    private String senderId;
    private String topic;
    private String content;

    private String receiverId;
    private boolean read;

    public NotificationJpo(Notification notification) {
        BeanUtils.copyProperties(notification, this);
    }

    public Notification toDomain() {
        Notification notification = new Notification();
        BeanUtils.copyProperties(this, notification);
        return notification;
    }
}
