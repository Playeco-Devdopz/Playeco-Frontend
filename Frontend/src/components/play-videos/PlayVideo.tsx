import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../video-comment/Comment";
import { ApiContext } from "../../context/ApiContext";
import { userAuthContext } from "../../context/UserContext";
import { VideoProps } from "../../types/Types";
import VideobottomAd from "../videos-bottom-ad/VideobottomAd";
import Superchatbtn from "./Superchatbtn";
import Superchat from "./Superchat";
import { Helmet } from 'react-helmet';
import Customevideoplayer from "./Customevideoplayer";
// import Recomended from "../Recomended/Recomended";
const PlayVideo = () => {
  const [superchatOpen, setSuperchatOpen] = useState(false);
  const SuperchatOpen = () => {
    setSuperchatOpen(!superchatOpen);
  };


  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        console.log('copies')
      })
      .catch(() => {
        console.log('failed copied')
      });
  };

  const { videoId } = useParams();
  // const [isSupportPopupOpen, setIsSupportPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { allVideos, addCommentToVideo, addLikeVideo, toggleFollow }: any =
    useContext(ApiContext);
  const {
    currentUser,
    setLoginOpen,
    singleUser,
    singleUserDetails,
  }: any = useContext(userAuthContext);
  // localStorage.setItem("log", JSON.stringify(setSingleUserDetails));
  const [findVideo, setFindVideo] = useState<VideoProps>();
  const [expanded, setExpanded] = useState(false);
  const [likedByUser, setLikedByUser] = useState(false);
  const [followByUser, setFollowByUser] = useState(false);
  const [text, setText] = useState("");

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleScrollToTop();
  }, [videoId]);
  useEffect(() => {
    if (currentUser) {
      singleUser();
    }
  }, [currentUser, Object.keys(singleUserDetails)?.length === 0]);

  useEffect(() => {
    if (videoId) {
      const videoMap = new Map(
        allVideos.map((video: VideoProps) => [video._id, video])
      );
      const findOneVideo = videoMap.get(videoId) as VideoProps | undefined;
      setFindVideo(findOneVideo);
    }
  }, [videoId, allVideos]);

  const handleNavigate = () => {
    if (currentUser && videoId) {
      if (currentUser?.uid === findVideo?.userId?.uid) {
        navigate(`/Profile`);
      } else {
        navigate(`/Profile?uid=${findVideo?.userId?.uid}`);
      }
    } else {
      setLoginOpen(true);
    }
  };
  ("");

  const handleComment = async () => {
    if (currentUser) {
      if (text === "") return;
      if (!findVideo || !singleUserDetails) return;
      await addCommentToVideo({
        videoId: findVideo?._id,
        text: text,
        userId: singleUserDetails?._id,
      });

      const newComment = {
        text: text,
        updatedAt: new Date().toISOString(),
        userId: singleUserDetails,
      };

      setFindVideo((prevVideo: any) => {
        if (!prevVideo) return prevVideo;

        const updatedComments = [...prevVideo.comments, newComment];

        return {
          ...prevVideo,
          comments: updatedComments,
        };
      });

      setText("");
    } else {
      setLoginOpen(true);
    }
  };

  const handleLikeVideo = async () => {
    if (currentUser) {
      if (!findVideo) return;
      const userId = singleUserDetails?._id;
      if (!userId) return;
      addLikeVideo({
        videoId: findVideo?._id,
        text: text,
        userId: userId,
      });
      setFindVideo((prevVideo: VideoProps | undefined) => {
        if (!prevVideo) return prevVideo;

        const isLiked = prevVideo.likes.includes(userId);

        const updatedLikes = isLiked
          ? prevVideo?.likes?.filter((id) => id !== userId)
          : [...prevVideo?.likes, userId];

        return {
          ...prevVideo,
          likes: updatedLikes,
        };
      });
    } else {
      setLoginOpen(true);
    }
  };

  const handleFollow = async () => {
    if (currentUser) {
      if (Object.keys(singleUserDetails)?.length === 0) return;
      toggleFollow({
        videoUserId: findVideo?.userId?._id,
        userId: singleUserDetails?._id,
      });
      setFindVideo((prev: any) => {
        if (!prev) return prev;

        const isFollow = prev.userId.followers.includes(singleUserDetails?._id);

        const updateUser = isFollow
          ? prev?.userId?.followers?.filter(
            (id: string) => id !== singleUserDetails?._id
          )
          : [...prev?.userId?.followers, singleUserDetails?._id];
        return {
          ...prev,
          userId: {
            ...prev?.userId,
            followers: updateUser,
          },
        };
      });
    } else {
      setLoginOpen(true);
    }
  };

  useEffect(() => {
    const likesSet = new Set(findVideo?.likes || []);
    setLikedByUser(likesSet.has(singleUserDetails?._id));
    const followSet = new Set(findVideo?.userId?.followers || []);
    setFollowByUser(followSet.has(singleUserDetails?._id));
  }, [findVideo, singleUserDetails]);




  const timeAgo = (createdAt: string): string => {
    const currentTime = new Date();
    const uploadTime = new Date(createdAt);
    const timeDifference = currentTime.getTime() - uploadTime.getTime();

    // Calculate time units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} year${years === 1 ? "" : "s"} ago`;
    } else if (months > 0) {
      return `${months} month${months === 1 ? "" : "s"} ago`;
    } else if (days > 0) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else {
      return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    }
  };






  return (
    <>
      <Helmet>
        <meta name="description" content="Playeco Video Player" />
        <meta name="keywords" content="Playeco Video Player" />
        <title>{`Playeco | ${findVideo?.userId?.name} | ${findVideo?.userId?.followers.length} Followers`}</title>
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "url": "https://playeco.live"
            }
          `}
        </script>
      </Helmet>
      <div className="justify-between lg:justify-between p-2 gap-5 items-start grid lg:flex">
        <div className="w-[100%]">
          <div className="bg-black h-[100%] lg:h-[670px] text-gray-300 rounded-lg relative overflow-hidden">
            <div className="video-wrapper  h-[100%] lg:h-[670px]">
             <Customevideoplayer/>
            </div>
          </div>
          <div className="px-[20px] mt-[5px]">
            <p className="text-[15px] flex flex-row items-center md:text-[20px] font-[700]">
              {findVideo?.title} &nbsp;
              <span className="text-blue-500 cursor-pointer">{findVideo?.hashtag}</span>
            </p>
          </div>
          <div>
            <div className="lg:px-[20px] p-2 mt-[5px] lg:mt-[10px] flex lg:flex gap-[10px] lg:gap-20  lg:justify-between justify-start md:flex-row flex-col">
              <div className="flex cursor-pointer gap-4 items-center ">
                <div
                  className="flex items-center justify-between"
                  onClick={() => handleNavigate()}
                >
                  <div className="overflow-hidden lg:w-[50px] lg:h-[50px] rounded-full w-10 h-10 mr-2">
                    <img
                      className="rounded-full w-full h-full object-cover"
                      src={
                        findVideo?.userId?.image
                          ? findVideo?.userId?.image
                          : findVideo?.userId?.image
                            ? findVideo?.userId?.image
                            : "https://firebasestorage.googleapis.com/v0/b/ecodatastorage.appspot.com/o/unknown.webp?alt=media&token=77321571-025d-4a18-9502-53d1a9032b10"
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex items-left flex-col">
                    <p className="text-sm flex flex-row items-center gap-3 md:text-base ml-2 lg:text-[18px] font-[] text-white">
                      {findVideo?.userId?.name}
                    </p>
                    <p className="text-[14px] text-gray-400 hidden md:block ml-2">
                      {findVideo?.userId?.followers.length} Followers
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex py-[10px] gap-2 justifiy-between ">
                  <button onClick={SuperchatOpen}>
                    <Superchatbtn />
                  </button>
                  {superchatOpen && (
                    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center p-4 overflow-y-auto z-[100]">
                      <Superchat onClose={() => setSuperchatOpen(false)} />
                    </div>
                  )}

                  <div onClick={handleLikeVideo} className="bg-gray-500 bg-opacity-30 pl-4 flex flex-row items-center hover:cursor-pointer rounded-full gap-2 p-2">
                    <p className={`mr-2 ${likedByUser ? "bg-none" : "bg-none"} text-lg md:text-xl`}>
                      <svg width="18" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <title>Like</title>
                        <path d="M22 9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7H13.68L14.64 2.43C14.66 2.33 14.67 2.22 14.67 2.11C14.67 1.7 14.5 1.32 14.23 1.05L13.17 0L6.59 6.58C6.22 6.95 6 7.45 6 8V18C6 18.5304 6.21071 19.0391 6.58579 19.4142C6.96086 19.7893 7.46957 20 8 20H17C17.83 20 18.54 19.5 18.84 18.78L21.86 11.73C21.95 11.5 22 11.26 22 11V9ZM0 20H4V8H0V20Z" fill={likedByUser ? "#7300FF" : "white"} />
                      </svg>
                    </p>
                    <p className="mr-5 text-sm md:text-base">
                      {findVideo?.likes?.length}
                    </p>
                  </div>

                  <div
                    onClick={handleCopyUrl}
                    className="p-2 hover:cursor-pointer bg-gray-500 bg-opacity-30 flex flex-row items-center rounded-full gap-2"
                  >
                    <button>
                      <svg width="15" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <title>Share</title>
                        <path d="M15 20C14.1667 20 13.4583 19.7083 12.875 19.125C12.2917 18.5417 12 17.8333 12 17C12 16.8833 12.0083 16.7623 12.025 16.637C12.0417 16.5117 12.0667 16.3993 12.1 16.3L5.05 12.2C4.76667 12.45 4.45 12.646 4.1 12.788C3.75 12.93 3.38333 13.0007 3 13C2.16667 13 1.45833 12.7083 0.875 12.125C0.291667 11.5417 0 10.8333 0 10C0 9.16667 0.291667 8.45833 0.875 7.875C1.45833 7.29167 2.16667 7 3 7C3.38333 7 3.75 7.071 4.1 7.213C4.45 7.355 4.76667 7.55067 5.05 7.8L12.1 3.7C12.0667 3.6 12.0417 3.48767 12.025 3.363C12.0083 3.23833 12 3.11733 12 3C12 2.16667 12.2917 1.45833 12.875 0.875C13.4583 0.291667 14.1667 0 15 0C15.8333 0 16.5417 0.291667 17.125 0.875C17.7083 1.45833 18 2.16667 18 3C18 3.83333 17.7083 4.54167 17.125 5.125C16.5417 5.70833 15.8333 6 15 6C14.6167 6 14.25 5.92933 13.9 5.788C13.55 5.64667 13.2333 5.45067 12.95 5.2L5.9 9.3C5.93333 9.4 5.95833 9.51267 5.975 9.638C5.99167 9.76333 6 9.884 6 10C6 10.116 5.99167 10.237 5.975 10.363C5.95833 10.489 5.93333 10.6013 5.9 10.7L12.95 14.8C13.2333 14.55 13.55 14.3543 13.9 14.213C14.25 14.0717 14.6167 14.0007 15 14C15.8333 14 16.5417 14.2917 17.125 14.875C17.7083 15.4583 18 16.1667 18 17C18 17.8333 17.7083 18.5417 17.125 19.125C16.5417 19.7083 15.8333 20 15 20Z" fill="white" />
                      </svg>
                    </button>
                    <p>Share</p>
                  </div>
                  {findVideo?.userId?._id !== singleUserDetails?._id && (
                    <button
                      onClick={handleFollow}
                      className={`items-center text-xs md:text-base w-[100px] h-[40px] lg:w-[100px] lg:h-[40px]  ml-2 md:ml-5 rounded-lg ${followByUser
                        ? " bg-gray-400 bg-opacity-40 text-white hover:bg-gray-500 hover:bg-opacity-20"
                        : "text-white bg-purple-600"
                        }`}
                    >
                      {followByUser ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            </div>{" "}
          </div>
          <div
            onClick={toggleExpand}
            className={`cursor-pointer z-50 mt-[20px] flex lg:flex-row justify-between bg-gray-500 bg-opacity-20 border-gray-200  rounded-md p-4 gap-5 flex-row `}
            style={{ height: expanded ? "auto" : "60px" }}
          >
            <div>
              <h1 className="text-[15px] font-[500]">{findVideo ? timeAgo(findVideo.createdAt) : ""}</h1>
              {expanded && (
                <div className="mb-10 mt-5">
                  <p>{findVideo?.description}</p>
                </div>
              )}
            </div>
            <h1>Description</h1>
          </div>
        </div>

        <div className="bg-[#0000] border-[0.1px] border-gray-600 h-[600px] rounded-lg lg:w-[25%]">
          <div className="border-b-[0.5px] border-white border-opacity-40 w-[100%] flex justify-center items-center h-[40px]">
            <h1 className="text-gray-300 text-[15px] text-center">
              VIDEO CHAT
            </h1>
          </div>
          <div className="p-2">
            <div className="bg-[#0000] h-[480px] Comments-section overflow-y-scroll">
              {findVideo?.comments?.map((item) => (
                <Comment data={item} />
              ))}
            </div>
          </div>
          <div className="h-[70px] w-[100%]">
            <div className="p-2 flex flex-row items-center">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-[100%] p-4 h-[35px] outline-0 bg-[#202020] rounded-md"
                placeholder="Type your comment here"
              />
              <button
                onClick={handleComment}
                className="bg-purple-600 ml-2 w-[70px] h-[35px] rounded-md"
              >
                Send
              </button>
            </div>
          </div>

          <VideobottomAd />
        </div>
      </div>
    </>
  );
};

export default PlayVideo;
