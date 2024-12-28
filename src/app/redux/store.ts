import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, UseDispatch, useSelector, UseSelector } from "react-redux";
import addFriendToggleSlice from "./slicer/addfriendtoggle.slice";
import friendsSlice from "./slicer/friend.slice"
import selectSlice from "./slicer/selecttoggle.slice"
import selectFriendSlice from "./slicer/selectedFriend.slice"

const reducersCombined = combineReducers({
    addFriendToggle: addFriendToggleSlice,
    friendsList: friendsSlice,
    selectToggle: selectSlice,
    selectFriend: selectFriendSlice

})

export const myStore = configureStore({
    reducer: reducersCombined
})

export type RootState = ReturnType<typeof myStore.getState>
export type AddDispatch = typeof myStore.dispatch

export const useAppDispatch: () => AddDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector