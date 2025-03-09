"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import IInputCoPayment from "../Interface/inputcopayment.interface";
import IFriend from "../Interface/friend.interface";
import { useAppDispatch } from "../redux/store";
import { updateCopaymentDetails } from "../redux/slicer/friend.slice";
import { selectToggle } from "../redux/slicer/selectToggle.slice";
import IToggle from "../Interface/toggle.interface";

export function AddCreditDetails({
  friend,
  selectState,
}: {
  friend: IFriend;
  selectState: IToggle;
}) {
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputMySpending, setInputMySpending] = useState<string>("");
  const [inputFriendSpending, setInputFriendSpending] = useState<string>("");
  const [inputPaidBy, setInputPaidBy] = useState<string>("Myself");
  const dispatch = useAppDispatch();

  // calculate friends spending
  useEffect(() => {
    //recalculate
    try {
      if (!Number(inputAmount) || !Number(inputMySpending)) {
        setInputFriendSpending("");
        return;
      }
      const totalAmount: number = Number(inputAmount);
      const mySpending: number = Number(inputMySpending);

      const friendsSpending: number = totalAmount - mySpending;
      setInputFriendSpending(friendsSpending.toString());
    } catch (error) {
      console.log("Error in casting string to number", error);
    }
  }, [inputAmount, inputMySpending]);

  //Submitform Data
  const submitCopayment = () => {
    //set to friend data type state

    const copaymentDetail: IInputCoPayment = {
      friend: friend,
      totalAmount: inputAmount,
      yourSpending: inputMySpending,
      friendsSpending: inputFriendSpending,
      paidBy: inputPaidBy,
    };

    setInputAmount("");
    setInputFriendSpending("");
    setInputMySpending("");
    setInputPaidBy("Myself");

    dispatch(updateCopaymentDetails(copaymentDetail));
  };

  return (
    <div className="w-full h-full  py-4 px-10 border-themecolor border-l-2">
      <div className=" w-full h-full ">
        <div className="flex flex-col justify-center items-start h-[80px] ">
          <h1 className="text-themecolor font-semibold text-xl">
            Co-Payment with {friend.name}
          </h1>
        </div>
        <div className="w-full h-[270px] max-h-[270px] ">
          <div className="grid grid-rows-5 w-full h-full  ">
            <div className="w-full h-full ">
              <div className="w-full h-full grid grid-cols-2">
                <div className="col-span-1 w-full h-full">
                  <div className="flex items-center w-full h-full">
                    <h1>Total Amount</h1>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <div className="flex justify-center items-center w-full h-full ">
                    <input
                      className="w-2/3 h-2/3 rounded-md text-black text-end px-2"
                      type="text"
                      name=""
                      id=""
                      value={inputAmount}
                      onChange={(val) =>
                        setInputAmount(val.currentTarget.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full ">
              <div className="w-full h-full grid grid-cols-2">
                <div className="col-span-1 w-full h-full">
                  <div className="flex items-center w-full h-full">
                    <h1>Your Spending</h1>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <div className="flex justify-center items-center w-full h-full ">
                    <input
                      className="w-2/3 h-2/3 rounded-md text-black text-end px-2"
                      type="text"
                      name=""
                      id=""
                      value={inputMySpending}
                      onChange={(val) =>
                        setInputMySpending(val.currentTarget.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full ">
              <div className="w-full h-full grid grid-cols-2">
                <div className="col-span-1 w-full h-full">
                  <div className="flex items-center w-full h-full">
                    <h1>Friend's Spending</h1>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <div className="flex justify-center items-center w-full h-full ">
                    <input
                      readOnly
                      className="w-2/3 h-2/3  rounded-md bg-slate-300 text-black text-end px-2"
                      type="text"
                      name=""
                      id=""
                      value={inputFriendSpending}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full ">
              <div className="w-full h-full grid grid-cols-2">
                <div className="col-span-1 w-full h-full">
                  <div className="flex items-center w-full h-full">
                    <h1>Paid By</h1>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <div className="flex justify-center items-center w-full h-full ">
                    <select
                      className="w-2/3 h-2/3 rounded-md text-black"
                      name="paidoptions"
                      id="paidbydropdown"
                      onChange={(val) => {
                        setInputPaidBy(val.currentTarget.value);
                      }}
                    >
                      <option value={"MySelf"}>MySelf</option>
                      <option value={friend.name}>{friend.name}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full ">
              <div className="w-full h-full grid grid-cols-2">
                <div className="col-span-1">
                  <div className="flex justify-start items-center w-full h-full ">
                    <button
                      onClick={() => {
                        dispatch(
                          selectToggle({
                            value: selectState.value,
                          })
                        );
                      }}
                      className="w-2/3 h-2/3 border-2 rounded-md"
                    >
                      {" "}
                      Done{" "}
                    </button>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <div className="flex justify-center items-center w-full h-full ">
                    <button
                      onClick={submitCopayment}
                      className="w-2/3 h-2/3 border-2 rounded-md"
                    >
                      {" "}
                      Add{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
