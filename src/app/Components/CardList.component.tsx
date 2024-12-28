import * as React from "react";
import IFriend from "../Interface/friend.interface";
import IToggle from "../Interface/toggle.interface";
import { useAppDispatch } from "../redux/store";
import { selectToggle } from "../redux/slicer/selecttoggle.slice";
import { selectFriend } from "../redux/slicer/selectedFriend.slice";

export function CardList({
  friend,
  selectState,
}: {
  friend: IFriend;
  selectState: IToggle;
}) {
  const dispatch = useAppDispatch();

  // handle function for coloring description
  const colorHandleDescription = () => {
    if (friend.credit === true) {
      return (
        <>
          <p className="w-full h-1/2 text-green-500 text-sm">
            {" "}
            {friend.creditDesc}
          </p>
        </>
      );
    } else if (friend.credit === false) {
      return (
        <>
          <p className="w-full h-1/2 text-red-500 text-sm">
            {" "}
            {friend.creditDesc}
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="w-full h-1/2 text-slate-100 text-sm">
            {" "}
            {friend.creditDesc}
          </p>
        </>
      );
    }
  };

  return (
    <div className="w-full h-[90px] bg-transparent rounded-2xl hover:bg-[#1E293B]">
      <div className="grid grid-cols-5 w-full h-full rounded-xl ">
        <div className="flex col-span-1 w-full h-full">
          {/**Profile picture of a friend col */}
          <div className="flex justify-center items-center w-full h-full ">
            <img
              src={friend.imgUrl}
              alt="profilephoto"
              className="w-3/5  rounded-full"
            />
          </div>
        </div>
        <div className="col-span-3 ">
          {/** Name and credit explanation col*/}
          <div className="flex flex-col  w-full h-full">
            <div className="flex items-center w-full h-1/2 text-gray-700 font-semibold ">
              <p className="text-neutral-100">{friend.name}</p>
            </div>
            {colorHandleDescription()}
          </div>
        </div>
        <div className="col-span-1  ">
          {/**button col */}
          <div className="flex justify-center items-center w-full h-full">
            {!selectState.value && (
              <button
                onClick={() => {
                  dispatch(
                    selectToggle({
                      value: !selectState,
                    })
                  );

                  dispatch(selectFriend({ ...friend }));
                }}
                className="w-4/5 h-[40px] bg-transparent text-themecolor text-sm rounded-md border-themecolor border-2"
              >
                Select
              </button>
            )}
          </div>
        </div>
      </div>

      <hr className="mx-5" />
    </div>
  );
}
