import React, {useEffect, useState} from "react";
import {Box, Button, Grid, TextField} from "@material-ui/core";
import {broadcast, wsClient} from "../../api/ApiStub";
import Subscription from "../../domain/Subscription";
import Notification from "../../domain/Notification";
import {CompatClient} from "@stomp/stompjs";

interface SenderProps {
    senderId: string
    topic: string;
}


export const Sender = (props: SenderProps) => {
    const { topic, senderId } = props;
    const [stompClient, setStompClient] = useState(undefined as unknown as CompatClient);
    const [content, setContent] = useState('');

    useEffect(() => {
        setStompClient(
            wsClient([
                new Subscription(topic)
            ])
        )
    },[topic])


    const send = async () => {
        const timestamp = new Date().getMilliseconds();
        broadcast(
            stompClient,
            topic,
            JSON.stringify(new Notification(
                `${topic}_${timestamp}`,
                timestamp,
                senderId,
                topic,
                content,
                '',
                false
            ))
        )
    }

    return (
        <Grid container>
            <Grid item>
                <Box m={3} flex>
                    <TextField
                        label={'id'}
                        onChange={e => setContent(e.target.value)}
                        value={content}
                    />
                    <Button onClick={send}>
                        Send
                    </Button>
                </Box>
            </Grid>
        </Grid>

    );
};