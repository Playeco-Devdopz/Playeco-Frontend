import { Link } from "react-router-dom";
import VideoThumbnail from "./VideoThumbnail";
import AdThumbnail from "./Adthumbnail";
import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../context/ApiContext";
import Splashscreen from "../../pages/splash-screen/Splashscreen";
import { userAuthContext } from "../../context/UserContext";
import { VideoProps } from "../../types/Types";
import { Videoads } from "../../constants/Constants";

const Homevideo = () => {
  const [, setIsLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);
    handleStart();
    setTimeout(handleStop, 3000);
    return () => {
      handleStop();
    };
  }, []);

  const { allVideos }: any = useContext(ApiContext);
  const { loading }: any = useContext(userAuthContext);

  // Sort videos by upload date in descending order (newest first)
  const sortedVideos = allVideos.sort((a: VideoProps, b: VideoProps) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Function to randomly insert ads into the videos array
  const insertAdsIntoVideos = (videos: VideoProps[], ads: any[], adFrequency: number = 5) => {
    let videoCount = videos.length;
    let mergedContent = [];
    let adIndex = 0;

    for (let i = 0; i < videoCount; i++) {
      mergedContent.push(videos[i]);
      if ((i + 1) % adFrequency === 0 && adIndex < ads.length) {
        mergedContent.push(ads[adIndex]);
        adIndex++;
      }
    }

    return mergedContent;
  };

  const mergedContent = insertAdsIntoVideos(sortedVideos, Videoads);

  return (
    <>
      {loading && <Splashscreen />}
      <div className="grid py-[60px] h-[auto] mx-auto px-2 lg:px-10 sm:gap-5
       2010:grid-cols-10
        gap-5 1920:grid-cols-7
         2018:grid-cols-2
          2020:grid-cols-3
          1950:grid-cols-4
           1980:grid-cols-6 
           grid-cols-2
            1039:grid-cols-4
            1245:grid-cols-5
          ">
        {mergedContent?.length > 0 &&
          mergedContent.map((item: any, index: number) => (
            item._id ? (
              <Link key={index} to={`/playvideo/${item._id}`}>
                <VideoThumbnail data={item} />
              </Link>
            ) : (
              <AdThumbnail key={index} brandImage={item.brandImage} adImage={item.adImage} adName={item.adName} adLink={item.adLink} />
            )
          ))}
      </div>
    </>
  );
};

export default Homevideo;
