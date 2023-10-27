const chatReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case "ASK_BOT":
            return { ...state }
        case "FETCH_ALL_CHATS":
            return { ...state, data: action.payload }
        default:
            return state;
    }
}

export default chatReducer 