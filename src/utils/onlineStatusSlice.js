import { createSlice } from "@reduxjs/toolkit";

const onlineStatusSlice = createSlice({
    name : 'onlineStatus',
    initialState : {},
    reducers:{
        setUserOnline: (state,action) => {
            const { userId, isOnline } = action.payload;
            state[userId] = isOnline;
        },
        setUserOffline:(state,action) => {
            const { userId } = action.payload;
            state[userId] = false;
        }
    }
})

export const {setUserOnline,setUserOffline} = onlineStatusSlice.actions;
export default onlineStatusSlice.reducer;