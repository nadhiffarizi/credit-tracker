"use client";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addFriend } from "../redux/slicer/friend.slice";
import { useState } from "react";

export function AddFriend() {
  const [input, setInput] = useState<string>("");
  const [urlImg, setUrlImg] = useState<string>(`https://i.pravatar.cc/300`);
  const dispatch = useAppDispatch();

  //pre-process adding friend
  const addFriendCallback = () => {
    if (!input) {
      return;
    }
    dispatch(
      addFriend({
        name: input,
        imgUrl: urlImg,
      })
    );

    setInput("");
  };

  return (
    <div className="w-full h-[170px] pt-5 ">
      <div className="grid grid-rows-3 px-4 gap-1 w-full h-full ">
        <div className="row-span-1 w-full h-full ">
          <div className="grid grid-cols-3 w-full h-full">
            <div className="flex col-span-1 items-center">
              <h1 className="">Name</h1>
            </div>
            <div className="flex col-span-2 items-center w-full h-full">
              <input
                className=" w-full text-slate-900 rounded-md"
                type="text"
                name=""
                id=""
                value={input}
                onChange={(val) => {
                  setInput(val.currentTarget.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row-span-1 w-full h-full ">
          <div className="grid grid-cols-3 w-full h-full">
            <div className="flex col-span-1 items-center">
              <h1 className="">Avatar</h1>
            </div>
            <div className="flex col-span-2 items-center w-full h-full">
              <input
                readOnly
                className=" w-full text-slate-900 rounded-md bg-slate-400"
                type="text"
                name=""
                id=""
                value={urlImg}
              />
            </div>
          </div>
        </div>
        <div className="row-span-1 w-full h-full ">
          <div className="flex justify-end w-full">
            <button
              onClick={addFriendCallback}
              className="w-[100px] h-[40px] border-foreground border-2 rounded-md text-foreground text-base"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
