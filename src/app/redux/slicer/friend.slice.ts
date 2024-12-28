import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import IFriend from "@/app/Interface/friend.interface";
import IInputCoPayment from "@/app/Interface/inputcopayment.interface";

// Interface friendsList
interface IFriendList {
    data: IFriend[]
}

//Initial state of friends list
const friendsList: IFriendList = {
    data: [] // array of Friend
}

const friendsSlice = createSlice({

    name: "friendsList",
    initialState: friendsList,
    reducers: {
        addFriend: (state: IFriendList, action: PayloadAction<IFriend>) => {
            //default friend state
            let tempData: IFriend = action.payload;
            if (!friendsList.data.length) {
                tempData.id = 0
            } else {
                tempData.id = friendsList.data.length + 1
            }
            tempData.name = action.payload.name
            tempData.creditDesc = action.payload.name + " and I don't own each other"
            tempData.credit = undefined
            tempData.amount = 0
            tempData.imgUrl = action.payload.imgUrl

            state.data.push({ ...tempData })
            // console.log(state.data[state.data.length - 1])
            return state
        },
        updateCopaymentDetails: (state: IFriendList, action: PayloadAction<IInputCoPayment | undefined>) => {
            if (!action.payload) {
                return
            }

            // console.log("added copayment detail", current(state))

            let copyState: IFriendList = {
                data: [...state.data]
            }

            const index = copyState.data.findIndex((friend: IFriend) => friend.id === action.payload?.friend.id)

            if (index === -1) {
                console.log("cannot find friend to update copayment details",)
                return
            } else {
                let amountMoneyOwned: number = 0

                if (action.payload.paidBy.toLowerCase() === "myself") {
                    amountMoneyOwned = Number(action.payload.friendsSpending)
                } else {
                    amountMoneyOwned = -1 * Number(action.payload.yourSpending)
                }

                amountMoneyOwned = amountMoneyOwned + Number(copyState.data[index].amount)

                if (amountMoneyOwned > 0) {
                    const tempData: IFriend = {
                        id: action.payload.friend.id,
                        name: action.payload.friend.name,
                        credit: false,
                        amount: amountMoneyOwned,
                        imgUrl: action.payload.friend.imgUrl,
                        creditDesc: `${action.payload.friend.name} owned me ${amountMoneyOwned}`

                    }

                    copyState.data[index] = { ...tempData }
                    state.data = [...copyState.data]
                    return state
                } else if (amountMoneyOwned < 0) {
                    const tempData: IFriend = {
                        id: action.payload.friend.id,
                        name: action.payload.friend.name,
                        credit: true,
                        amount: Math.abs(amountMoneyOwned),
                        imgUrl: action.payload.friend.imgUrl,
                        creditDesc: `I own ${Math.abs(amountMoneyOwned)} to ${action.payload.friend.name} `

                    }

                    copyState.data[index] = { ...tempData }
                    state.data = [...copyState.data]
                    return state
                } else {
                    const tempData: IFriend = {
                        id: action.payload.friend.id,
                        name: action.payload.friend.name,
                        credit: undefined,
                        amount: amountMoneyOwned,
                        imgUrl: action.payload.friend.imgUrl,
                        creditDesc: `${action.payload.friend.name} and I don't own each other`

                    }
                    copyState.data[index] = { ...tempData }
                    state.data = [...copyState.data]
                    return state
                }
            }
        }
    }
})

export const { addFriend, updateCopaymentDetails } = friendsSlice.actions
export default friendsSlice.reducer