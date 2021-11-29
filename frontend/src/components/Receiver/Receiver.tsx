import React, {useEffect, useState} from "react";
import {Badge, Box, Button, Grid, MenuItem, TextField} from "@material-ui/core";
import {wsClient} from "../../api/ApiStub";
import Subscription from "../../domain/Subscription";
import Notification from "../../domain/Notification";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Topic} from "../../domain/Topic";

interface ReceiverProps {
    newNotification: Notification;
    onNotified: (message: Notification) => void;
}


export const Receiver = (props: ReceiverProps) => {
    const { newNotification, onNotified } = props;
    const [topic, setTopic] = useState('');
    const [unread, setUnread] = useState(newNotification ? [newNotification.id] : []);
    const [notifications, setNotifications] = useState(newNotification ? [newNotification]: []);
    const [on, setOn] = useState(false);

    const subscribe = () => {
        wsClient([
            new Subscription(topic, onNotified)
        ])
        setOn(true);
    }

    useEffect(() => {
        newNotification && setNotifications([...notifications, newNotification])
        newNotification && setUnread([...unread, newNotification.id])
    }, [newNotification])

    const addNotification = (notification: Notification) => {
        console.log("state.func.nofi", notifications);
        console.log(notification);
        setNotifications([...notifications, notification]);
    }

    const renderActionButton = () => {
        if(on) {
            return (
                <Button onClick={subscribe}>
                    Stop
                </Button>
            )
        } else {
            return (
                <Button onClick={subscribe}>
                    Subscribe
                </Button>
            )
        }
    }

    const renderNotification = () => {
        return (
            <>
                {
                    notifications.map(notification => (
                        <Grid item container>
                            <Grid item xs={2}>
                                {notification.senderId}
                            </Grid>
                            <Grid item xs={2}>
                                {notification.topic}
                            </Grid>
                            <Grid item xs={4}>
                                {notification.content}
                            </Grid>
                            <Grid item xs={2}>
                                {notification.timestamp}
                            </Grid>
                            <Grid item xs={1} onClick={() => setUnread(unread.filter(id => id !== notification.id))}>
                                {unread.find(id => id === notification.id) ? <CancelIcon/> : <CheckCircleIcon/>}
                            </Grid>
                        </Grid>
                    ))
                }
            </>
        )
    }

    return (
        <Grid container>
            <Grid item style={{marginTop: '10px'}} xs={12}>
                {
                    unread.length > 0 ?
                        <Badge badgeContent={unread.length} color="primary">
                            <NotificationsIcon color="action" />
                        </Badge>
                        :
                        <NotificationsIcon color="action" />
                }

            </Grid>
            <Grid item xs={12}>
                    <TextField
                        select
                        label={'topic'}
                        onChange={e => setTopic(e.target.value)}
                        value={topic}
                        style={{width:'100px'}}
                    >
                        {Topic.map(t=> <MenuItem value={t}>{t.toUpperCase()}</MenuItem> )}
                    </TextField>
                    {renderActionButton()}
            </Grid>
            <Grid item container>
                {renderNotification()}
            </Grid>
        </Grid>

    );
};