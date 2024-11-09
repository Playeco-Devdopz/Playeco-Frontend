import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../context/UserContext";
import { ApiContext } from "../../context/ApiContext";
import { Helmet } from 'react-helmet';

const Othersprofileedetails = () => {
  const {
    vistedUserDetails,
    singleUserDetails,
    setLoginOpen,
    currentUser,
    setVistedUserDetails,
  }: any = useContext(userAuthContext);
  const { toggleFollow }: any = useContext(ApiContext);
  const [followByUser, setFollowByUser] = useState(false);

  const handleFollow = async () => {
    if (currentUser) {
      if (Object.keys(singleUserDetails)?.length === 0) return;
      toggleFollow({
        videoUserId: vistedUserDetails?._id,
        userId: singleUserDetails?._id,
      });
      setVistedUserDetails((prev: any) => {
        if (!prev) return prev;

        const isFollow = prev?.followers.includes(singleUserDetails?._id);

        const updateUser = isFollow
          ? prev?.followers?.filter(
            (id: string) => id !== singleUserDetails?._id
          )
          : [...prev?.followers, singleUserDetails?._id];

        return {
          ...prev,
          followers: updateUser,
        };
      });
    } else {
      setLoginOpen(true);
    }
  };
  // const purpletick = <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(138, 0, 255)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
  useEffect(() => {
    const followSet = new Set(vistedUserDetails?.followers || []);
    setFollowByUser(followSet.has(singleUserDetails?._id));
  }, [vistedUserDetails]);

  return (
    <div className="w-[100%] rounded-lg flex flex-col gap-3 p-5 bg-opacity-10 bg-gray-600">
      <Helmet>
        <title>{`Playeco | ${vistedUserDetails?.name}`} </title>
        <meta name="description" content="Playeco Profile" />
        <meta name="keywords" content="Playeco Profile Page" />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "Playeco User Profile",
              "url": "https://playeco.live"
            }
          `}
        </script>
      </Helmet>
        <div className="flex text-[17px] flex-row items-center justify-around w-[100%] h-[50px]">
          <img
            className="w-[50px] h-[50px] rounded-[50%] object-cover"
            src={
              vistedUserDetails?.image ||
              "https://firebasestorage.googleapis.com/v0/b/ecodatastorage.appspot.com/o/unknown.webp?alt=media&token=77321571-025d-4a18-9502-53d1a9032b10"
            }
            alt=""
          />
          <div className="text-center text-gray-300">
            <p>Followers</p>
            <p>{vistedUserDetails?.followers?.length}</p>
          </div>
          <div className="text-center text-gray-300">
            <p>Videos</p>
            <p>{vistedUserDetails?.videos?.length}</p>
          </div>
        </div>
      <button
        onClick={handleFollow}
        className={`${followByUser
            ? "bg-gray-700 bg-opacity-80"
            : "bg-[#8000FF] bg-opacity-80 "
          } p-2 rounded-[10px]`}
      >
        {followByUser ? "Following" : "Follow"}
      </button>
      <p className="bg-gray-600 bg-opacity-10 gap-3 flex flex-row items-center outline-0 p-2 w-[100%] h-[40px]">
        Name : {vistedUserDetails?.name}
        {/* if i added account email manualy to a array then only show this tick for them {purpletick} */}
      </p>
      <p className="bg-gray-600 bg-opacity-10 outline-0 p-2 w-[100%] h-[70px]">
        Bio : {vistedUserDetails?.bio || "Not provided"}
      </p>
      <p className="bg-gray-600 bg-opacity-10 outline-0 p-2 w-[100%] h-[40px]">
        in Game ID : {vistedUserDetails?.bgmiId || "Not provided"}
      </p>
      <p className="bg-gray-600 bg-opacity-10 outline-0 p-2 w-[100%] h-[40px]">
        Upi ID : {vistedUserDetails?.upiId || "Not provided"}
      </p>
    </div>
  );
};

export default Othersprofileedetails;
