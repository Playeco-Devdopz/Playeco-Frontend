import { VideoProps } from "../../types/Types";
import { useLocation } from "react-router-dom";

type Props = {
  data: VideoProps;
};

function VideoThumbnail({ data }: Props) {
  const truncateTitle = (title: string) => {
    return title.length > 20 ? `${title.substring(0, 20)}...` : title;
  };

  const location = useLocation();

  // Function to check if the video is uploaded within the last 24 hours
  const isLatestVideo = (uploadDate: string) => {
    const uploadTime = new Date(uploadDate).getTime();
    const currentTime = new Date().getTime();
    const oneDayInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    return currentTime - uploadTime <= oneDayInMillis;
  };

  return (
    <div className="relative justify-center md:w-[100%] rounded-md items-center flex flex-col
    md:w-[100%] 
    lg:h-[220px] 
    1950:h-[220px] 
    1980:h-[220px] 
    2020:h-[440px]
    2050:h-[480px]
    ">
      <div className="overflow-hidden h-[100%] w-full object-cover relative">
        {isLatestVideo(data.createdAt) && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold">
            Latest
          </div>
        )}
        <img
          src={
            data?.thumbnail ||
            "https://firebasestorage.googleapis.com/v0/b/ecodatastorage.appspot.com/o/group-pubg-thumbnail-battleground-76evvmmmpxt31l4g.jpg?alt=media&token=c2a49918-04aa-4ed5-bcb8-89eb1b7fc339"
          }
          alt=""
          className="w-full h-full object-fill"
        />
      </div>
      <div className="w-full flex gap-3 items-center sm:py-3 p-[6px]">
        {location?.pathname === "/Profile" ? (
          ""
        ) : (
          <div className="sm:w-[35px] w-[30px] h-[30px] flex-shrink-0 sm:h-[35px] ">
            <img
              className="w-full h-full rounded-[50%] object-cover"
              src={
                data?.userId?.image ||
                "https://firebasestorage.googleapis.com/v0/b/ecodatastorage.appspot.com/o/unknown.webp?alt=media&token=77321571-025d-4a18-9502-53d1a9032b10"
              }
              alt="Profile photo"
            />
          </div>
        )}
        <div>
          <p className="text-[13px] font-[700] text-gray-200">
            {data?.userId?.name}
          </p>
          <p
            style={{ fontWeight: "400" }}
            className="font-[400] text-[12px] text-gray-200"
          >
            {truncateTitle(data.title)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoThumbnail;
