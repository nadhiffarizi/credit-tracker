import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IToggle from "@/app/Interface/toggle.interface";

//Initial state of toggle button
const addFriendState: IToggle = {
    value: false
}

const addFriendToggleSlice = createSlice({
    name: "addFriendToggle",
    initialState: addFriendState,
    reducers: {
        addFriendToggle: (state: IToggle, action: PayloadAction<IToggle>) => {
            state.value = !action.payload.value
            console.log("clicked, state", state.value)
            return state
        }
    }
})

export const { addFriendToggle } = addFriendToggleSlice.actions
export default addFriendToggleSlice.reducer;

