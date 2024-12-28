import IFriend from "./friend.interface"

export interface IInputCoPayment {
    friend: IFriend,
    totalAmount: string,
    yourSpending: string,
    friendsSpending: string,
    paidBy: string
}

export default IInputCoPayment