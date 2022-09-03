import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chatType, dialogsType } from '../../models/dialogsType'

const initialState: dialogsType = {
  dialogsData: [
    {id:1, name:'Vadim'},
    {id:2, name:'Andrew'},
  ],
  messagesData: [
    {id:1, message:'shhhsgh shh'},
  ],
  chat: []
}

const dialogsReducer = createSlice({
  name: 'dialogsPage',
  initialState,
  reducers: {
    sendMessage (state, action: PayloadAction<string>) {
      state.messagesData.push({id: 3, message: action.payload})
    },
    getChat (state, action: PayloadAction<chatType[]>) {
      state.chat = action.payload
    }
  }
})

export const { sendMessage, getChat } = dialogsReducer.actions
export default dialogsReducer.reducer