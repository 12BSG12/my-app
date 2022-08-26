import { createSlice } from '@reduxjs/toolkit'

const dialogsReducer = createSlice({
  name: 'dialogsPage',
  initialState: {
    dialogsData: [
      {id:1, name:'Vadim'},
      {id:2, name:'Andrew'},
    ],
    messagesData: [
      {id:1, message:'shhhsgh shh'},
    ],
  },
  reducers: {
    sendMessage (state, action) {
      state.messagesData.push({id: 3, message: action.payload})
    }
  }
})

export const { sendMessage } = dialogsReducer.actions
export default dialogsReducer.reducer