import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dialogsType } from '../../models/dialogsType'

const initialState: dialogsType = {
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