import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IToggle from "@/app/Interface/toggle.interface";

//Initial state of toggle button
const selectState: IToggle = {
    value: false
}

const selectSlice = createSlice({
    name: "selectToggle",
    initialState: selectState,
    reducers: {
        selectToggle: (state: IToggle, action: PayloadAction<IToggle>) => {
            state.value = !action.payload.value
            return state
        }
    }
})

export const { selectToggle } = selectSlice.actions
export default selectSlice.reducer;

