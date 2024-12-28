"use client";
import { CardList } from "./Components/CardList.component";
import { AddFriend } from "./Components/AddFriend.component";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { addFriendToggle } from "./redux/slicer/addfriendtoggle.slice";
import IFriend from "./Interface/friend.interface";
import { AddCreditDetails } from "./Components/AddCreditDetails.component";

export default function Home() {
  const toggleAddFriendState = useAppSelector((state) => state.addFriendToggle);
  const selectState = useAppSelector((state) => state.selectToggle);
  const friendsList = useAppSelector((state) => state.friendsList.data);
  const selectedFriend = useAppSelector((state) => state.selectFriend);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="w-[1000px] h-[700px]">
        {" "}
        {/** Main Container full */}
        <div className="grid grid-cols-2 w-full border-2 rounded-2xl ">
          <div className=" col-span-1 rounded-2xl mx-3 py-5">
            {" "}
            {/** first col, list and input friend */}
            <div className="grid grid-rows-2 gap-5 w-full h-full rounded-2xl  ">
              {" "}
              {/** upper row for list, below for input friend */}
              <div className="flex flex-col justify-between row-span-1 h-[320px] py-2 rounded-2xl">
                {/**Lists credit col*/}
                <div className=" w-full h-full overflow-scroll no-scrollbar">
                  {!friendsList.length ? (
                    <div className="w-full h-full flex justify-center items-center text-2xl rounded-2xl text-themecolor ">
                      <p>Please add friend to start tracking credits</p>
                    </div>
                  ) : (
                    <>
                      {friendsList
                        .toReversed()
                        .map((friend: IFriend, index: number) => {
                          return (
                            <CardList
                              key={index}
                              friend={friend}
                              selectState={selectState}
                            />
                          );
                        })}
                    </>
                  )}
                </div>
              </div>
              <div className="row-span-1 flex flex-row-reverse relative py-5 w-full h-full rounded-2xl ">
                {!toggleAddFriendState.value && (
                  <button
                    onClick={() => {
                      dispatch(
                        addFriendToggle({
                          value: toggleAddFriendState.value,
                        })
                      );
                    }}
                    className="w-[120px] h-[40px] max-h-[100px] border-themecolor text-themecolor border-2 rounded-md text-base "
                  >
                    Add Friend
                  </button>
                )}

                {toggleAddFriendState.value && (
                  <div className="flex flex-col justify-center gap-4 w-full h-[300px] absolute rounded-2xl bg-[#243A5E]">
                    <AddFriend />
                    <div className="w-full ps-4 ">
                      <button
                        onClick={() => {
                          dispatch(
                            addFriendToggle({
                              value: toggleAddFriendState.value,
                            })
                          );
                        }}
                        className="w-[100px] h-[40px] max-h-[100px] border-foreground text-foreground border-2 rounded-md text-base"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {selectState.value && (
            <div className="col-span-1 rounded-2xl ">
              <AddCreditDetails
                friend={selectedFriend}
                selectState={selectState}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
