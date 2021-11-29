import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid} from "@material-ui/core";
import {Receiver} from "./components/Receiver/Receiver";
import {Sender} from "./components/Sender/Sender";
import {Topic} from "./domain/Topic";
import Notification from "./domain/Notification";

function App() {
    const [newNoti, setNewNoti] = useState(undefined as unknown as Notification);
    const onNotified = (noti: Notification) => {
        console.log('onnoti');
        setNewNoti(noti);
    }
  return (
    <div className="App">
      <Grid container>
          <Grid item xs={12}>
              <Receiver
                newNotification={newNoti}
                onNotified={onNotified}
              />
          </Grid>
          <Grid item xs={12}>
              <Sender senderId={'ksyoo'} topic={Topic[0]}/>
          </Grid>
      </Grid>
    </div>
  );
}

export default App;
