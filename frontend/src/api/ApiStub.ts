import SockJS from "sockjs-client";
import {CompatClient, IMessage, Stomp} from '@stomp/stompjs';
import Notification from "../domain/Notification";
import Subscription from "../domain/Subscription";

export function wsClient(subscriptions: Subscription[], url: string = 'http://localhost:8080/push-noti-websocket') {
    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);
    const prefix = '/topic';

    stompClient.connect({}, function (frame: string) {
        console.log('Connected: ' + frame);
        subscriptions.forEach(subscription => {
            stompClient.subscribe(`${prefix}/${subscription.topic}`, function(message: IMessage) {
                console.log('received...')
                if (subscription.onNotified) {
                    subscription.onNotified(Notification.fromBody(JSON.parse(message.body)))
                }
            })
        })
    });

    return stompClient;
}

export function broadcast(stompClient: CompatClient, topic:string, json: string) {
    const prefix = '/notify/broadcast'
    stompClient.send(`${prefix}/${topic}`, {}, json)
}

