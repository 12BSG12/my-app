import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type dialogs = {
  id: number
  name: string
}

export type message = {
  id: number
  message: string
}

export type state = {
  dialogsData: dialogs[] 
  messagesData: message[]
}

const initialState: state = {
  dialogsData: [
    {id:1, name:'Vadim'},
    {id:2, name:'Andrew'},
  ],
  messagesData: [
    {id:1, message:'shhhsgh shh'},
  ]
}

const dialogsReducer = createSlice({
  name: 'dialogsPage',
  initialState,
  reducers: {
    sendMessage (state, action: PayloadAction<string>) {
      state.messagesData.push({id: 3, message: action.payload})
    }
  }
})

export const { sendMessage } = dialogsReducer.actions
export default dialogsReducer.reducer