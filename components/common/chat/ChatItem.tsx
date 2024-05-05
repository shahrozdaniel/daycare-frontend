import Image from "next/image";

const ChatItem = ({
  keySearch,
  searchData,
  dataArr,
  handleSelect,
  handleChatRoom,
  type,
}: {
  keySearch: string;
  searchData: any;
  dataArr: any;
  handleSelect: any;
  handleChatRoom: any;
  type: string;
}) => {
  return (
    <div className=" ">
      {(keySearch !== "" ? (searchData.length > 0 ? searchData : []) : dataArr)
        .length > 0 ? (
        (keySearch !== "" ? searchData : dataArr).map((item: any) => {
          return type === "Parent" ? (
            <div
              key={item.uid}
              className="my-3 px-3 "
              onClick={() => handleSelect(item)}
            >
              <div
                className="flex justify-items-center items-center cursor-pointer relative"
                onClick={handleChatRoom}
              >
                <div className="relative w-14 h-14">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                      src={item?.photo ? item.photo : "/svgs/no-image.svg"}
                      width={48}
                      height={48}
                      alt={"profile"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>

                  {/* <div
                    className={`absolute top-8 right-0 w-4 h-4 rounded-full border-2 border-[white] ${
                      item?.isOnline
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div> */}
                </div>

                <div className="w-full flex justify-between items-end ml-3">
                  <div className="flex flex-col items-start">
                    <div className=" text-[14px] text-[#231F20] font-medium  leading-4  ">
                      {item?.parentName}({item?.childName})
                      {item?.classroomName &&
                        -(<span>{item?.classroomName.trim()}</span>)}
                    </div>

                    <div className="text-[12px] leading-5">
                      <div
                        className={`${
                          item?.unreadMessage
                            ? "text-[#00858e]"
                            : "text-zinc-500"
                        }  font-medium `}
                      >
                        {item?.lastMessage?.text &&
                        item?.lastMessage.text.length > 35
                          ? item?.lastMessage.text.slice(0, 35) + "..."
                          : item?.lastMessage?.text}
                      </div>
                    </div>
                  </div>
                  {item?.unreadMessage > 0 && (
                    <div className="w-4 h-4 bg-[#00858e] rounded-full text-white text-[10px] flex justify-center items-center">
                      {item.unreadMessage}
                    </div>
                  )}
                </div>

                {/* for date */}
                <div className="absolute">
                  <div className="text-[10px] font-normal relative left-[18rem] bottom-7">
                    {item?.lastMessage?.date?.toDate().toLocaleDateString()}
                  </div>
                </div>
              </div>

              <hr className="mt-3" />
            </div>
          ) : (
            <div
              key={item.uid}
              className="my-3 px-3 "
              onClick={() => handleSelect(item)}
            >
              <div
                className="flex justify-items-center items-center cursor-pointer relative"
                onClick={handleChatRoom}
              >
                <div className="relative w-14 h-14">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                      src={
                        item?.photoURL ? item.photoURL : "/svgs/no-image.svg"
                      }
                      width={48}
                      height={48}
                      alt={"profile"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>

                  {/* <div
                    className={`absolute top-8 right-0 w-4 h-4 rounded-full border-2 border-[white] ${
                      item?.isOnline
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div> */}
                </div>

                <div className="w-full flex justify-between items-end ml-3">
                  <div className="flex flex-col items-start">
                    <div className=" text-[14px] text-[#231F20] font-medium  leading-4  ">
                      {item?.firstName}
                    </div>

                    <div className="text-[12px] leading-5">
                      <div
                        className={`${
                          item?.unreadMessage
                            ? "text-[#00858e]"
                            : "text-zinc-500"
                        }  font-medium `}
                      >
                        {item?.lastMessage?.text &&
                        item?.lastMessage.text.length > 35
                          ? item?.lastMessage.text.slice(0, 35) + "..."
                          : item?.lastMessage?.text}
                      </div>
                    </div>
                  </div>
                  {item?.unreadMessage > 0 && (
                    <div className="w-4 h-4 bg-[#00858e] rounded-full text-white text-[10px] flex justify-center items-center">
                      {item.unreadMessage}
                    </div>
                  )}
                </div>

                {/* for date */}
                <div className="absolute">
                  <div className="text-[10px] font-normal relative left-[18rem] bottom-7">
                    {item?.lastMessage?.date?.toDate().toLocaleDateString()}
                  </div>
                </div>
              </div>

              <hr className="mt-3" />
            </div>
          );
        })
      ) : (
        <div className="text-center">No result</div>
      )}
    </div>
  );
};

export default ChatItem;