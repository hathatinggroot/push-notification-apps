package com.hathatinggroot.pushnotification.store;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NotificationRepository extends CrudRepository<NotificationJpo, String> {
    List<NotificationJpo> findByReceiverId(String receiverId);
    List<NotificationJpo> findByReceiverIdAndRead(String receiverId, boolean read);
}
