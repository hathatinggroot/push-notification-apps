package com.hathatinggroot.pushnotification.topic;

import com.hathatinggroot.pushnotification.domain.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class TopicController {
	@MessageMapping("/broadcast/{topic}")
	@SendTo("/topic/{topic}")
	public Notification broadcast(@DestinationVariable String topic, Notification notification) {
		log.info("broadcast topic of {}", topic);
		return notification;
	}

	@MessageMapping("/personal/{receiverId}")
	@SendTo("/topic/{receiverId}")
	public Notification personal(@DestinationVariable String receiverId, Notification notification) {
		return notification;
	}
}
