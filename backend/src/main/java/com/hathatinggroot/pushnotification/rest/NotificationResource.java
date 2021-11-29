package com.hathatinggroot.pushnotification.rest;

import com.hathatinggroot.pushnotification.domain.Notification;
import com.hathatinggroot.pushnotification.store.NotificationStore;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationResource {
    private final NotificationStore notificationStore;

    @GetMapping("/list/{receiverId}")
    public List<Notification> list(@PathVariable String receiverId) {
        return notificationStore.findByReceiverId(receiverId);
    }

    @GetMapping("/list-unread/{receiverId}")
    public List<Notification> listUnread(@PathVariable String receiverId) {
        return notificationStore.findByReceiverIdAndRead(receiverId, false);
    }

    @PutMapping("/read/{notiId}")
    public String read(@PathVariable String notiId) {
        Optional<Notification> notification = notificationStore.find(notiId);
        if ((notification.isPresent())) {
            return notificationStore.modifyNotification(notiId, notification.get());
        } else {
            return "Fail";
        }
    }
}
