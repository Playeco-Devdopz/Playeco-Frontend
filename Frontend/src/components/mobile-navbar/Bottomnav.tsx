import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { userAuthContext } from "../../context/UserContext";
import Alert from "../message-alerts/Alert";
import UploadBtn from "../video-upload/UploadBtn";
import UploadComponent from "../video-upload/UploadComponent";
import LiveBtn from "../live-stream/LiveBtn";

const Bottomnav = () => {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const { singleUserDetails, currentUser }: any = useContext(userAuthContext);
    const [uploadOpen, setUploadOpen] = useState(false);

    const toggleUploadPopup = () => {
        if (currentUser) {
            setUploadOpen(!uploadOpen);
        } else {
            setAlertMessage("Please login to upload");
            setShowAlert(true);
        }
    };

    const handleUnknownUserClick = () => {
        if (currentUser) {
            setUploadOpen(!uploadOpen);
        } else {
            setAlertMessage("Please login to see profile");
            setShowAlert(true);
        }
    };

    return (
        <div className="845:hidden block">
            {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
            {uploadOpen && (
                <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center p-4 overflow-y-auto z-[100]">
                    <UploadComponent onClose={() => setUploadOpen(false)} />
                </div>
            )}
            <div className="fixed bottom-0 bg-black w-screen h-[60px]">
                {isDesktop ? (
                    <header></header>
                ) : (
                    <header className="px-[20px] lg:px-[50px] bg-opacity-40 bg-gray-800 justify-between w-full h-[60px] bg-black flex items-center">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "text-purple-500" : "text-white")}>
                            <span className="flex items-center flex-col gap-1">
                                <svg width="20" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 14.75V6.25C16 6.09475 15.9639 5.94164 15.8944 5.80279C15.825 5.66393 15.7242 5.54315 15.6 5.45L8.6 0.2C8.4269 0.0701777 8.21637 0 8 0C7.78363 0 7.5731 0.0701777 7.4 0.2L0.4 5.45C0.275804 5.54315 0.175 5.66393 0.105573 5.80279C0.036145 5.94164 0 6.09475 0 6.25V14.75C0 15.0152 0.105357 15.2696 0.292893 15.4571C0.48043 15.6446 0.734784 15.75 1 15.75H5C5.26522 15.75 5.51957 15.6446 5.70711 15.4571C5.89464 15.2696 6 15.0152 6 14.75V11.75C6 11.4848 6.10536 11.2304 6.29289 11.0429C6.48043 10.8554 6.73478 10.75 7 10.75H9C9.26522 10.75 9.51957 10.8554 9.70711 11.0429C9.89464 11.2304 10 11.4848 10 11.75V14.75C10 15.0152 10.1054 15.2696 10.2929 15.4571C10.4804 15.6446 10.7348 15.75 11 15.75H15C15.2652 15.75 15.5196 15.6446 15.7071 15.4571C15.8946 15.2696 16 15.0152 16 14.75Z" fill="white" />
                                </svg>
                                <span className="text-[10px]">Home</span>
                            </span>
                        </NavLink>
                        <button onClick={toggleUploadPopup} className="text-white flex items-center flex-col">
                                <UploadBtn />
                                <span className="text-[10px]">Upload</span>
                        </button>
                        <button className="text-white flex items-center flex-col">
                            <LiveBtn />
                            <span className="text-[10px]">Live</span>
                        </button>
                        {currentUser ? (
                            <NavLink to="/Profile" className={({ isActive }) => (isActive ? "text-purple-500" : "text-white")}>
                                <div className="flex items-center flex-col">
                                    <div className="w-[33px] border-[#8000FF] border-2 h-[33px] overflow-hidden rounded-[50px]">
                                        <img
                                            src={
                                                singleUserDetails?.image ||
                                                currentUser?.photoURL ||
                                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                            }
                                            alt="User Profile"
                                        />
                                    </div>
                                    <span className="text-[10px]">You</span>
                                </div>
                            </NavLink>
                        ) : (
                            <div onClick={handleUnknownUserClick} className="bg-gray-600 flex items-center justify-center rounded-[50%] w-[35px] h-[35px]">
                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.5 4.5C4.5 6.981 6.519 9 9 9C11.481 9 13.5 6.981 13.5 4.5C13.5 2.019 11.481 0 9 0C6.519 0 4.5 2.019 4.5 4.5ZM17 19H18V18C18 14.141 14.859 11 11 11H7C3.14 11 0 14.141 0 18V19H17Z" fill="white" />
                                </svg>
                            </div>
                        )}
                    </header>
                )}
            </div>
        </div>
    );
};

export default Bottomnav;
