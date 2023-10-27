import * as api from '../api'

export const askBot = (chatData) =>async (dispatch)=> {
  try {
    const {userId} = chatData
    const {data } = await api.AskBot(chatData)
    console.log(data)
    dispatch({type: "ASK_BOT", payload: data})
    dispatch(fetchAllChats({userId}))
  } catch (error) {
    console.log(error)  
  }
}

export const fetchAllChats = (chatId)=> async (dispatch) =>{
  try {
    const {data} = await api.fetchAllChats(chatId);
    dispatch({type:"FETCH_ALL_CHATS", payload: {data}})
  } catch (error) {
    console.log(error); 
  }
}