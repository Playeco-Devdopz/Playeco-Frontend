import PlayVideo from "./PlayVideo";
import Homevideo from "../home-page/Homevideo";
// import { useParams } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { useContext, useEffect } from "react";
const Playandreco = () => {
  // const { index } = useParams();
  // const index = new URLSearchParams(window.location.search).get("index");
  const { getAllVideos, allVideos }: any = useContext(ApiContext);

  useEffect(() => {
    if (allVideos?.length === 0) {
      getAllVideos();
    }
  }, [allVideos?.length === 0]);

  return (
    <div className="min-h-[100vh]">
      <PlayVideo />
      <h1 className="lg:px-[20px] lg:mt-5 px-[10px] mt-[2px] text-[18px] text-gray-300">
        RECOMENDED VIDEOS
      </h1>
      <Homevideo />
    </div>
  );
};

export default Playandreco;
