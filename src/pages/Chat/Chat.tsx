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
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Link } from "react-router-dom";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
type chatType = {
  message: string,
  photo: string
  userId: number
  userName: string
}

const Chat = () => {
  const [chat, getChat] = useState<chatType[]>([])
  const [message, setMessage] = useState<string>('')

  const sendMessage = () => {
    if(message !== ''){
      ws.send(message)
      setMessage('')
    }
  }

  useEffect(() =>{
    ws.addEventListener('message', (e) => {
      getChat((prevMessage) => [...prevMessage, ...JSON.parse(e.data)])
    })
  },[])

  return (
    <div>
      <Grid container>
        <Grid item xs={5}>
          <List className={style.messageArea}>
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
                  <Fab size='medium' color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Chat;