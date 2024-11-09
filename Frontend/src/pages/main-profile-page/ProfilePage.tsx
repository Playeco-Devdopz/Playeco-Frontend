import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../context/UserContext";
import Popup from "../../components/popups/Popup";
import Loading from "../../components/web-loader/Loading";
import { ApiContext } from "../../context/ApiContext";
import { Link } from "react-router-dom";
import VideoThumbnail from "../../components/home-page/VideoThumbnail";
import { DeleteVideo, VideoProps } from "../../types/Types";
import SearchedResults from "../../components/search-result/SearchedResults";
import Othersprofileedetails from "../others-profile/Othersprofileedetails";
import OwnProfile from "../own-profile/OwnProfile";
import Alert from "../../components/message-alerts/Alert";

const ProfilePage = () => {
  // const navigate = useNavigate();
  const {
    logOut,

    singleUser,
    loading,

    singleUserDetails,

    findUser,
    vistedUserDetails,
  }: any = useContext(userAuthContext);

  const { getUserVideos, userVideos, deleteVideo }: any =
    useContext(ApiContext);

  const [open, setOpen] = useState(false);
  const [openDeletePopUp, setDeletePopUp] = useState(false);
  const [videoDeleteInfo, setVideoDeleteInfo] = useState({
    id: "",
    videoId: "",
  });
  const uid = new URLSearchParams(window.location.search).get("uid");

  useEffect(() => {
    if (Object.keys(singleUserDetails)?.length > 0) {
      getUserVideos({ userId: singleUserDetails?._id });
    }
    singleUser();
  }, [Object.keys(singleUserDetails)?.length === 0]);

  useEffect(() => {
    if (uid) {
      findUser({ uid: uid });
    }
  }, [uid]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleScrollToTop();
  }, []);

  const handleDelete = () => {
    if (videoDeleteInfo?.id && videoDeleteInfo?.videoId) {
      deleteVideo({
        userId: videoDeleteInfo?.id,
        videoId: videoDeleteInfo?.videoId,
      });
    }

    setDeletePopUp(false);
    setVideoDeleteInfo({ id: "", videoId: "" });
  };
  const handleDeleteClosePopUp = () => {
    setDeletePopUp(false);
    setVideoDeleteInfo({ id: "", videoId: "" });
  };
  const handleDeleteOpenPopUp = ({ id, videoId }: DeleteVideo) => {
    setDeletePopUp(true);
    setVideoDeleteInfo({ id: id, videoId: videoId });
  };

  return (
    <div className="h-[140vh]">
      <SearchedResults />
      {loading && <Loading />}
      {open && (
        <Popup
          func={logOut}
          text={"No"}
          text2={"Yes"}
          onClose={setOpen}
          heading={"Are You Sure to LogOut"}
        />
      )}
      <div className="bg-black w-full p-4 lg:py-10 lg:px-20 gap-[50px] min-h-[100vh] lg:gap-28 lg:flex lg:flex-row justify-between">
        <div className=" flex flex-col   text-sm md:text-base">
          {vistedUserDetails && uid ? (
            <>
              <Othersprofileedetails />
            </>
          ) : (
            <div className=" rounded-lg h-auto  flex flex-col gap-3 p-5 bg-opacity-10 bg-gray-600">
              <OwnProfile />
              <div className="flex flex-row items-center w-[100%] justify-between">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-gray-500  text-red-400 flex flex-row items-center p-2 w-[100px] bg-opacity-30 gap-2 rounded-md"
                >
                  <img width={15} className="text-red" src="/Icons/logout.svg" alt="" />
                Logout
                </button>
              </div>
            </div>
          )}
        </div>
        {/* </div> */}

        <div className="lg:mt-0 pb-20 w-[100%] mt-4 flex-1">
          <p className="pb-2 text-[20px] font-[600]">Recent Videos</p>
          <div className="w-[100%] grid  xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[10px] ">
            {vistedUserDetails && uid ? (
              vistedUserDetails?.videos?.length > 0 ? (
                vistedUserDetails?.videos?.map(
                  (item: VideoProps, index: number) => (
                    <Link key={index} to={`/playvideo/${item?._id}`}>
                      <VideoThumbnail data={item} />
                    </Link>
                  )
                )
              ) : (
                <div className="text-center  ">
                  <p className="mt-4 ml-4 "> No Videos Uploaded</p>
                </div>
              )
            ) : userVideos?.length > 0 ? (
              userVideos?.map((item: VideoProps, index: number) => (
                <div className="relative">
                  <Link key={index} to={`/playvideo/${item?._id}`}>
                    <VideoThumbnail data={item} />
                  </Link>
                  <div
                    onClick={() =>
                      handleDeleteOpenPopUp({
                        id: singleUserDetails?._id,
                        videoId: item?._id,
                      })
                    }
                    className="absolute bg-gray-100 flex items-center justify-center cursor-pointer bg-opacity-20 rounded-full w-[25px] h-[25px] right-0 bottom-2"
                  >
                   <img width={3} src="/Icons/morevertical.svg" alt="" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center  ">
                <p className="mt-4 ml-4 "> No Videos Uploaded</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-center">
        {openDeletePopUp && (
          <Alert
            message={
              "Are you sure you want to delete this video? Once deleted, it cannot be recovered"
            }
            handleFunction={handleDelete}
            onClose={() => handleDeleteClosePopUp()}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
