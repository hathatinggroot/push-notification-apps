import Notification from "./Notification";

export default class Subscription {
    topic: string;
    onNotified: ((message: Notification) => void) | undefined;

    constructor(topic: string, onNotified?: (message: Notification) => void) {
        this.topic = topic;
        this.onNotified = onNotified;
    }
}