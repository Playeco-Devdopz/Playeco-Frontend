import { useEffect, useRef } from "react";
import Singlenotification from "./Singlenotification";


const Notification = ({ onClose }: { onClose: () => void }) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={ref}
            className="lg:w-[350px] bg-gray-900 fixed top-0 w-[100%] lg:mr-[130px] mt-[60px] lg:mt-[70px] right-0 h-[100%] lg:h-[400px] rounded-lg">
            <div className="bg-gray-500 bg-opacity-30 p-2 flex items-center justify-between w-[100%]">
                <h1>Notifications</h1>
                <button onClick={onClose} className="text-2xl p-2 bg-gray-600 bg-opacity-10 rounded-[50%] top-0 right-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.88242 10.0044L13.1854 15.3074C13.4668 15.5888 13.8485 15.7469 14.2464 15.7469C14.6444 15.7469 15.026 15.5888 15.3074 15.3074C15.5888 15.026 15.7469 14.6444 15.7469 14.2464C15.7469 13.8485 15.5888 13.4668 15.3074 13.1854L10.0024 7.88243L15.3064 2.57943C15.4457 2.4401 15.5561 2.2747 15.6315 2.09268C15.7068 1.91066 15.7456 1.71558 15.7455 1.51858C15.7455 1.32158 15.7067 1.12652 15.6312 0.944534C15.5558 0.762548 15.4452 0.597201 15.3059 0.457934C15.1666 0.318668 15.0012 0.208208 14.8192 0.132863C14.6371 0.057517 14.4421 0.0187609 14.2451 0.0188074C14.0481 0.0188538 13.853 0.0577016 13.671 0.133133C13.489 0.208564 13.3237 0.319102 13.1844 0.458435L7.88242 5.76143L2.57942 0.458435C2.44111 0.315105 2.27565 0.200756 2.09268 0.122057C1.90971 0.0433583 1.7129 0.00188689 1.51374 6.29038e-05C1.31457 -0.00176108 1.11703 0.0360986 0.932653 0.111433C0.748274 0.186767 0.580745 0.298068 0.43984 0.43884C0.298935 0.579612 0.187477 0.747037 0.111969 0.931345C0.0364604 1.11565 -0.00158556 1.31315 5.06168e-05 1.51232C0.00168679 1.71149 0.0429722 1.90834 0.121498 2.09138C0.200024 2.27443 0.314218 2.44 0.457417 2.57843L5.76242 7.88243L0.458417 13.1864C0.315218 13.3249 0.201025 13.4904 0.122499 13.6735C0.0439726 13.8565 0.00268672 14.0534 0.00105054 14.2525C-0.000585633 14.4517 0.0374603 14.6492 0.112969 14.8335C0.188477 15.0178 0.299935 15.1853 0.44084 15.326C0.581745 15.4668 0.749274 15.5781 0.933653 15.6534C1.11803 15.7288 1.31557 15.7666 1.51474 15.7648C1.7139 15.763 1.91071 15.7215 2.09368 15.6428C2.27665 15.5641 2.44211 15.4498 2.58042 15.3064L7.88242 10.0044Z" fill="white" />
                    </svg>
                </button>
            </div>
            <div className="h-[345px] p-2 overflow-y-scroll w-[100%] flex flex-col gap-2 items-center justify-start">
                <Singlenotification />
                <Singlenotification />
                <Singlenotification />
                <Singlenotification />
                <Singlenotification />
            </div>
        </div>
    );
};

export default Notification;