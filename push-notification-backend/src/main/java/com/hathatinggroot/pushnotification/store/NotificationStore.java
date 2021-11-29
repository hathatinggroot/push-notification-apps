package com.hathatinggroot.pushnotification.store;

import com.hathatinggroot.pushnotification.domain.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class NotificationStore {
    private final NotificationRepository notificationRepository;

    public List<Notification> findByReceiverId(String receiverId) {
        //
        return notificationRepository.findByReceiverId(receiverId)
                .stream().map(NotificationJpo::toDomain)
                .collect(Collectors.toList());
    }

    public List<Notification> findByReceiverIdAndRead(String receiverId, boolean read) {
        //
        return notificationRepository.findByReceiverIdAndRead(receiverId, read)
                .stream().map(NotificationJpo::toDomain)
                .collect(Collectors.toList());
    }

    public Optional<Notification> find(String notificationId) {
        //
        return notificationRepository.findById(notificationId).map(NotificationJpo::toDomain);
    }

    public String modifyNotification(String notificationId, Notification notification) {
        //
        find(notificationId).orElseThrow(() -> new NoSuchElementException(notificationId));
        notificationRepository.save(new NotificationJpo(notification));
        return notificationId;
    }
}
