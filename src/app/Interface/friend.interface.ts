
// Interface Friend State 
export default interface IFriend {
    id?: number,
    name: string,
    creditDesc?: string,
    credit?: boolean | undefined, // if I own to this person, then true. False if that person owns me. undefined if no one owns each other
    amount?: number,
    imgUrl: string
}