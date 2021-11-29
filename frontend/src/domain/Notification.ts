export default class Notification {
    id: string;
    timestamp: number;
    senderId: string;
    topic: string;
    content: string;

    receiverId: string;
    read: boolean;

    constructor(id: string, timestamp: number, senderId: string, topic: string, content: string, receiverId: string, read: boolean) {
        this.id = id;
        this.timestamp = timestamp;
        this.senderId = senderId;
        this.topic = topic;
        this.content = content;
        this.receiverId = receiverId;
        this.read = read;
    }

    static fromBody(body: any) {
        console.log('from body', body);
        return new Notification(
            body.id,
            body.timestamp,
            body.senderId,
            body.topic,
            body.content,
            body.receiverId,
            body.read
        )
    }
}