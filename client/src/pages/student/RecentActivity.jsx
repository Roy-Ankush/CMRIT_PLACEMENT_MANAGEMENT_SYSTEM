import React from "react";
import Drives from "../../components/Drives";
import CommonChat from "../../components/CommonChat";
import ChatButton from "../../components/ChatButton";

function RecentActivity() {
  return (
    <div>
      <div className="  mt-5 h-[80vh] flex justify-center md:flex-row-reverse m:flex-col gap-10 ">
        <div className="w-3/12 chatroom m:w-full">

          <div className="bg-gray-300 rounded-md flex flex-col">
            <CommonChat />
          </div>
        </div>

        <div className="rounded-md bg-blue-300 w-4/6 h-[78vh] p-3 overflow-y-scroll m:w-full no-scrollbar s:w-full">
        <Drives buttons={[ChatButton]} />
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;