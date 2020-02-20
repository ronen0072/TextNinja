const initialState = {
    msg: {},
    status: null
};
const messagesReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'SEND_MESSAGE_SUCCESS':
            console.log('succeeded to send the message', action.project);
            return{
                msg:action.payload.msg,
                status: action.payload.status,
            };
        case 'SEND_MESSAGE_FAIL':
            console.log('failed to send the message', action.project);
            return state;
        default:
            return state;
    }
};
export default messagesReducer;