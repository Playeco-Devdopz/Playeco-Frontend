
interface Props {
  heading: string;
  text: string;
  text2: string;
  onClose: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  func: () => void;
}

function Popup({ heading, text, onClose, text2, func }: Props) {
  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(5px)" }}
      className="fixed  top-0  left-0 h-full w-full flex items-center justify-center  px-[20px]  overflow-y-auto no-scrollbar z-[100]"
    >
      <div className="text-[#ffff] rounded-[20px] w-[100%] sm:w-[30%] xl:w-[20%] absolute top-[45%] flex flex-col p-[20px] bg-[#171717] text-[50px] justify-center items-center ">
        <div className="text-[18px]  font-[600] ">
          <p className="">{heading} </p>
          <div className="mt-7 flex items-center justify-evenly">
            {text && (
              <button
                onClick={() => onClose(false)}
                className="text-[14px] rounded-[20px] bg-[#C53C2C]  px-7 items-center py-2"
              >
                {text}
              </button>
            )}
            {text2 && (
              <button
                onClick={() => func()}
                className="text-[14px] rounded-[20px] bg-[#4095ea73]  px-7 items-center py-2"
              >
                {" "}
                {text2}{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
