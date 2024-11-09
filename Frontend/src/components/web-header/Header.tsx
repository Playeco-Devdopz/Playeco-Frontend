import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { userAuthContext } from "../../context/UserContext";
import "./Items/Header.css";
import Loginbtn from "./Items/Loginbtn";
import Logo from "./Items/Logo";
import Searchbar from "./Items/Searchbar";
import LoginPopup from "../login-Popup/LoginPopup";
import UploadBtn from "../video-upload/UploadBtn";
import UploadComponent from "../video-upload/UploadComponent";
import Alert from "../message-alerts/Alert";
import LiveBtn from "../live-stream/LiveBtn";
import Notification from "../notifications/Notification";
import Notificationbtn from "../notifications/Notificationbtn";

interface HeaderProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isOpen }) => {

  const isDesktop = useMediaQuery("(min-width: 844px)");
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { loginOpen, setLoginOpen, singleUserDetails, currentUser }: any =
    useContext(userAuthContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [NotificationOpen, setNotificationOpen] = useState(false);

  const toggleUploadPopup = () => {
    if (currentUser) {
      setUploadOpen(!uploadOpen);
    } else {
      setAlertMessage("Please login to upload");
      setShowAlert(true);
    }
  };
  const toggleNotificationPopup = () => {
    if (currentUser) {
      setNotificationOpen(!NotificationOpen);
    } else {
      setAlertMessage("Please login to see notification");
      setShowAlert(true);
    }
  };


  return (
    <div className="sticky z-[100] top-0 w-full bg-black">
      <>
        {showAlert && (
          <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
        )}
        {loginOpen && <LoginPopup />}
        {NotificationOpen && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center p-4 overflow-y-auto z-[100]">
            <Notification onClose={() => setNotificationOpen(false)} />
          </div>
        )}
        {uploadOpen && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center p-4 overflow-y-auto z-[100]">
            <UploadComponent onClose={() => setUploadOpen(false)} />
          </div>
        )}
        {isDesktop ? (
          <header className=" px-[10px] lg:px-[50px] justify-between h-[60px] bg-black flex items-center">
            <div className="flex flex-row items-center ml-[-40px] jusitfy-center gap-2">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded transition-transform duration-300 "
              >
                {isOpen ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.88242 10.0044L13.1854 15.3074C13.4668 15.5888 13.8485 15.7469 14.2464 15.7469C14.6444 15.7469 15.026 15.5888 15.3074 15.3074C15.5888 15.026 15.7469 14.6444 15.7469 14.2464C15.7469 13.8485 15.5888 13.4668 15.3074 13.1854L10.0024 7.88243L15.3064 2.57943C15.4457 2.4401 15.5561 2.2747 15.6315 2.09268C15.7068 1.91066 15.7456 1.71558 15.7455 1.51858C15.7455 1.32158 15.7067 1.12652 15.6312 0.944534C15.5558 0.762548 15.4452 0.597201 15.3059 0.457934C15.1666 0.318668 15.0012 0.208208 14.8192 0.132863C14.6371 0.057517 14.4421 0.0187609 14.2451 0.0188074C14.0481 0.0188538 13.853 0.0577016 13.671 0.133133C13.489 0.208564 13.3237 0.319102 13.1844 0.458435L7.88242 5.76143L2.57942 0.458435C2.44111 0.315105 2.27565 0.200756 2.09268 0.122057C1.90971 0.0433583 1.7129 0.00188689 1.51374 6.29038e-05C1.31457 -0.00176108 1.11703 0.0360986 0.932653 0.111433C0.748274 0.186767 0.580745 0.298068 0.43984 0.43884C0.298935 0.579612 0.187477 0.747037 0.111969 0.931345C0.0364604 1.11565 -0.00158556 1.31315 5.06168e-05 1.51232C0.00168679 1.71149 0.0429722 1.90834 0.121498 2.09138C0.200024 2.27443 0.314218 2.44 0.457417 2.57843L5.76242 7.88243L0.458417 13.1864C0.315218 13.3249 0.201025 13.4904 0.122499 13.6735C0.0439726 13.8565 0.00268672 14.0534 0.00105054 14.2525C-0.000585633 14.4517 0.0374603 14.6492 0.112969 14.8335C0.188477 15.0178 0.299935 15.1853 0.44084 15.326C0.581745 15.4668 0.749274 15.5781 0.933653 15.6534C1.11803 15.7288 1.31557 15.7666 1.51474 15.7648C1.7139 15.763 1.91071 15.7215 2.09368 15.6428C2.27665 15.5641 2.44211 15.4498 2.58042 15.3064L7.88242 10.0044Z" fill="white" />
                </svg>
                  : <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 14C17.8852 14.0002 18.2556 14.1486 18.5344 14.4144C18.8132 14.6802 18.979 15.0431 18.9975 15.4279C19.016 15.8127 18.8858 16.1898 18.6338 16.4812C18.3818 16.7726 18.0274 16.9558 17.644 16.993L17.5 17H1.5C1.11478 16.9998 0.744405 16.8514 0.465613 16.5856C0.186821 16.3198 0.020988 15.9569 0.00247574 15.5721C-0.0160365 15.1873 0.114192 14.8102 0.366175 14.5188C0.618159 14.2274 0.972581 14.0442 1.356 14.007L1.5 14H17.5ZM17.5 7C17.8978 7 18.2794 7.15804 18.5607 7.43934C18.842 7.72064 19 8.10218 19 8.5C19 8.89782 18.842 9.27936 18.5607 9.56066C18.2794 9.84196 17.8978 10 17.5 10H1.5C1.10218 10 0.720644 9.84196 0.43934 9.56066C0.158035 9.27936 0 8.89782 0 8.5C0 8.10218 0.158035 7.72064 0.43934 7.43934C0.720644 7.15804 1.10218 7 1.5 7H17.5ZM17.5 0C17.8978 0 18.2794 0.158035 18.5607 0.43934C18.842 0.720644 19 1.10218 19 1.5C19 1.89782 18.842 2.27936 18.5607 2.56066C18.2794 2.84196 17.8978 3 17.5 3H1.5C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0H17.5Z" fill="white" />
                  </svg>
                }
              </button>
              <Logo />
            </div>
            <div className="px-[20px] flex gap-5 flex-row items-center py-[10px]">
              <Searchbar />
            </div>
            <div className="items-center flex flex-row gap-4 py-[10px]">
              <button onClick={toggleUploadPopup} className="text-white">
                <UploadBtn />
              </button>
              <LiveBtn />
              <button onClick={toggleNotificationPopup} className="text-white">
                <Notificationbtn />
              </button>
            </div>
            {currentUser ? (
              <div className="flex gap-10">
                <Link
                  to="/Profile"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <div className="w-[35px] hover:outline outline-[1.6px] outline-[#8000FF] h-[35px] overflow-hidden rounded-[50px]">
                    <img
                      src={
                        singleUserDetails?.image ||
                        currentUser?.photoURL ||
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                      }
                      alt="User Profile"
                    />
                  </div>
                  {showTooltip && (
                    <div className="absolute mt-2 w-[50px] mb-[-60px] bg-gray-700 text-white text-xs rounded px-2 py-1">
                      Profile
                    </div>
                  )}
                </Link>
              </div>
            ) : (
              <Loginbtn loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
            )}
          </header>
        ) : (
          <>
            <header className="px-[10px] lg:px-[50px] justify-between w-full h-[60px] bg-black flex items-center">
              <div className="flex flex-row items-center jusitfy-center gap-2">
                <Logo />
              </div>
              {currentUser ? (
                <button onClick={toggleNotificationPopup} className="text-white">
                  <Notificationbtn />
                </button>
              ) : (
                <Loginbtn loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
              )}
            </header>
            {location?.pathname === "/" && (
              <div className="px-[20px] py-[10px]">
                <Searchbar />
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Header;
