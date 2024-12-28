import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IFriend from "@/app/Interface/friend.interface";

const selectedFriend: IFriend = {
    name: "",
    imgUrl: ''
}

const selectFriendSlice = createSlice({
    name: "selectFriend",
    initialState: selectedFriend,
    reducers: {
        selectFriend: (state: IFriend, action: PayloadAction<IFriend>) => {
            state = { ...action.payload }
            return state
        }
    }
})

export const { selectFriend } = selectFriendSlice.actions
export default selectFriendSlice.reducer;

