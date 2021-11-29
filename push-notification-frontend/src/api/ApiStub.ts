import SockJS from "sockjs-client";

export function useWsClient(url: string = 'http://localhost:8080/push-noti-websocket') {
    const socket = new SockJS(url);
}