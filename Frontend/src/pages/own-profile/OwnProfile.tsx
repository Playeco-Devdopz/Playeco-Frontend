import React, { useContext, useState } from "react";
import { userAuthContext } from "../../context/UserContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebaseConfig/FirebaseConfig";
import { ApiContext } from "../../context/ApiContext";
import { Helmet } from 'react-helmet';

function OwnProfile() {
  const {
    currentUser,
    setLoading,
    setSingleUserDetails,
    singleUserDetails,
    editUser,
  }: any = useContext(userAuthContext);

  
  const [image, setImage] = useState<File | undefined>();
  const { userVideos }: any = useContext(ApiContext);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSingleUserDetails((prev: {}) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (image) {
        const res = await imageUpload();
        const updatedUserDetails = { ...singleUserDetails, image: res };
        await setSingleUserDetails(updatedUserDetails);
        await editUser(updatedUserDetails, updatedUserDetails?._id);
      } else {
        await editUser(singleUserDetails, singleUserDetails?._id);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  let randomId = Math.floor(Date.now() * Math.random());
  const imageUpload = async () => {
    try {
      if (!image) return;
      const imageRef = ref(storage, `/${randomId}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (err) {
      throw err;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <Helmet>
        <title>{`Playeco | ${singleUserDetails?.name}`} </title>
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
      <div className="justify-start flex gap-10 items-center mt-[10px]">
        <label htmlFor="myfile">
          <div className="relative w-[50px] mx-auto shrink-0 h-[50px] rounded-full">
            <img
              className="w-full h-full rounded-[200px] object-cover"
              src={
                image
                  ? URL.createObjectURL(image)
                  : singleUserDetails?.image
                  ? singleUserDetails?.image
                  : currentUser?.photoURL
                  ? currentUser?.photoURL
                  : "https://firebasestorage.googleapis.com/v0/b/ecodatastorage.appspot.com/o/unknown.webp?alt=media&token=77321571-025d-4a18-9502-53d1a9032b10"
              }
            />
            <button className="absolute z-10 bottom-0 items-center justify-center rounded-[50px] flex bg-[#31734D]">
              <input
                className="hidden"
                onChange={handleImageChange}
                type="file"
                id="myfile"
                name="myfile"
              />
            </button>
          </div>
        </label>
        <div className="flex gap-5 lg:text-[19px]">
          <div className="font-semibold flex items-center justify-center flex-col">
            <p className="font-[100]">Videos</p>
            <p>{userVideos?.length}</p>
          </div>
          <p className="font-semibold flex items-center justify-center flex-col">
            <p className="font-[100]">Followers</p>
            <p>{singleUserDetails?.followers?.length}</p>
          </p>
        </div>
      </div>
      <div className="mt-6">
        <p>Username</p>
        <div className="flex items-center">
          <input
            className="bg-[#6C6969] bg-opacity-30 w-[100%] h-[40px] mt-2 rounded-md outline-0 p-4"
            type="text"
            onChange={handleChange}
            value={singleUserDetails?.name}
            name="name"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <p>Bio</p>
        <input
          className="bg-[#6C6969] bg-opacity-30 w-[100%] h-[40px] mt-2 rounded-md outline-0 p-4"
          type="text"
          name="bio"
          onChange={handleChange}
          value={singleUserDetails?.bio}
          placeholder="Express your passion towards games"
        />
      </div>
      <div>
        <p>Game ID</p>
        <input
          className="bg-[#6C6969] bg-opacity-30 w-[100%] h-[40px] mt-2 rounded-md outline-0 p-4"
          type="text"
          name="bgmiId"
          onChange={handleChange}
          value={singleUserDetails?.bgmiId}
          placeholder="Enter your BGMI ID"
        />
      </div>
      <div>
        <p>Linked Email address (not editable)</p>
        <input
          className="bg-[#6C6969] cursor-not-allowed bg-opacity-30 w-[100%] h-[40px] mt-2 rounded-md outline-0 p-4"
          type="text"
          readOnly
          value={singleUserDetails?.email}
        />
      </div>
      <div>
        <p className="text-green-500">Set UPI ID</p>
        <input
          onChange={handleChange}
          value={singleUserDetails?.upiId}
          className="bg-[#6C6969] bg-opacity-30 w-[100%] h-[40px] mt-2 rounded-md outline-0 p-4"
          type="text"
          name="upiId"
          placeholder="Set your UPI id For receive Super Chat"
        />
      </div>
      <button className="bg-[#8000FF] mt-4 w-full bg-opacity-80 p-2 rounded-md">
        Save Changes
      </button>
    </form>
  );
}

export default OwnProfile;
