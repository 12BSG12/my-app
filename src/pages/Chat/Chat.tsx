import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import style from './Chat.module.scss'
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
  
type chatType = {
  message: string,
  photo: string
  userId: number
  userName: string
}

const Chat = memo(() => {
  const [chat, getChat] = useState<chatType[]>([])
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'reject'>('pending')
  const [ws, setWs] = useState<WebSocket | null>(null)

  const sendMessage = () => {
    if(message !== ''){
      ws?.send(message)
      setMessage('')
    }
  }

  useEffect(() => {
    let socket: WebSocket;
    const closeHandler = () => {
      console.log('close ws');
      setTimeout(() => {
        createWS();
      }, 3000);
    }
    function createWS() {
      socket?.removeEventListener('close', closeHandler)
      socket?.close()
      socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
      socket.addEventListener('close', closeHandler)
      setWs(socket)
    } 
    createWS();
    return () =>{
      socket.removeEventListener('close', closeHandler)
      socket.close();
    }
  }, [])

  useEffect(() =>{
    let messageHandler = (e: MessageEvent) => {
      getChat((prevMessage) => [...prevMessage, ...JSON.parse(e.data)])
      if(isAutoScroll){
        messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
    ws?.addEventListener('message', messageHandler)
    return () => {
      ws?.removeEventListener('message', messageHandler)
    }
  },[ws])

  useEffect(() => {
    let openHandler = () => {
      setStatus('fulfilled')
    }
    ws?.addEventListener('open', openHandler)
    return () => {
      ws?.removeEventListener('close', openHandler)
    }
  }, [ws])

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const scrollHandler = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const element = e.currentTarget;
    if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true)
    } else{
      isAutoScroll && setIsAutoScroll(false)
    }
  }
  return (
    <div>
      <Grid container>
        <Grid item xs={5}>
          <List className={style.messageArea} onScroll={scrollHandler}>
            {chat.map((item, index) =>
              <ListItem key={index}>
                <Grid container>
                  <List>
                    <ListItem button key={item.userName} sx={{padding: '0', borderRadius: '50px'}}>
                      <Link to={"/profile/" + item.userId} style = {{display:'flex', color: 'black'}}>
                        <ListItemIcon>
                          <Avatar alt={item.userName} src={item.photo} />
                        </ListItemIcon>
                        <ListItemText primary={item.userName}></ListItemText>
                      </Link>
                    </ListItem>
                  </List>
                  <Grid item xs={12}>
                      <ListItemText sx={{display:'flex', justifyContent:'flex-start'}} primary={item.message}></ListItemText>
                      <div ref={messagesEndRef}/>
                  </Grid>
                </Grid>
              </ListItem>
            )}
          </List>
          <Divider />
          <Grid container style={{padding: '20px'}} sx={{display:'flex', alignItems: 'center'}}>
              <Grid item xs={10}>
                  <TextField id="outlined-basic-email" label="Type Something" fullWidth value={message} onChange={(e) => setMessage(e.target.value)}/>
              </Grid>
              <Grid item xs={1.2} sx={{display:'flex', justifyContent:'flex-end'}}>
                  <Fab size='medium' color="primary" aria-label="add" onClick={sendMessage} disabled={ws === null || status !== 'fulfilled'}><SendIcon /></Fab>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
})

export default Chat;