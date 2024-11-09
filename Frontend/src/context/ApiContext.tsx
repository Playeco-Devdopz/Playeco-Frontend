import { createContext, useContext, useState } from "react";
import { BASE_URL } from "../constants/APIURL";
import { userAuthContext } from "./UserContext";
import axios from "axios";
import Alert from "../components/message-alerts/Alert";
import { useNavigate } from "react-router-dom";

import {
  AddComment,
  FILTERVIDEO,
  PostVideoParams,
  deleteVideoPara,
  getUserVideoPara,
} from "../types/Types";

export const ApiContext = createContext({});

export function ApiContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticatedRequest, setLoading }: any = useContext(userAuthContext);
  const [userVideos, setUserVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
  const [showAlert, setShowAlert] = useState(false); //
  const navigate = useNavigate();
  const postVideo = async ({ videoDetails }: PostVideoParams) => {
    setLoading(true);
    try {
      const response = await authenticatedRequest({
        url: `${BASE_URL}/video/create`,
        method: "post",
        data: videoDetails,
      });
      if (response?.status === 200) {
        setAlertMessage("Video Uploaded Successfully");
        setShowAlert(true);
        navigate("/");
        getAllVideos();
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setAlertMessage("video upload error");
      setShowAlert(true);
    }
  };

  const getUserVideos = async ({ userId }: getUserVideoPara) => {
    try {
      const response = await authenticatedRequest({
        url: `${BASE_URL}/videos/${userId}`,
        method: "get",
      });
      if (response?.status === 200) {
        setUserVideos(response?.data);
      }
    } catch (err) {
      console.log(err, "Error from get user details");
    }
  };

  const deleteVideo = async ({ userId, videoId }: deleteVideoPara) => {
    try {
      const response = await authenticatedRequest({
        url: `${BASE_URL}/videos/delete/${userId}/${videoId}`,
        method: "delete",
      });
      if (response?.status === 200) {
        const filterVideo = userVideos?.filter(
          (video: FILTERVIDEO) => video?._id !== videoId
        );
        setUserVideos(filterVideo);
        // setAlertMessage("Video deleted SuccessFully");
        // setShowAlert(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err, "video upload error");
    }
  };

  const getAllVideos = async () => {
    setLoading(true);
    try {
      let config = {
        method: "get",
        url: `${BASE_URL}/videos`,
      };
      const response = await axios(config);
      setAllVideos(response?.data);
      setLoading(false);
    } catch (err) {
      console.log(err, "Error from get user details");
    }
  };

  const addCommentToVideo = async ({ videoId, text, userId }: AddComment) => {
    setLoading(true);
    let data = {
      text: text,
      userId: userId,
    };
    try {
      const response = await authenticatedRequest({
        url: `${BASE_URL}/video/${videoId}`,
        method: "post",
        data: data,
      });
      console.log(response);
      // console.log(response, "res");
      // if (response?.status === 200) {

      // }
      setLoading(false);
    } catch (err) {
      console.log(err, "Error from add comment");
    }
  };

  const addLikeVideo = async ({ videoId, userId }: AddComment) => {
    let data = {
      userId: userId,
    };
    try {
      await authenticatedRequest({
        url: `${BASE_URL}/video/like/${videoId}`,
        method: "post",
        data: data,
      });
    } catch (err) {
      console.log(err, "Error from like ");
    }
  };

  const toggleFollow = async ({ videoUserId, userId }: AddComment) => {
    let data = {
      userId: userId,
    };
    try {
      await authenticatedRequest({
        url: `${BASE_URL}/user/follow/${videoUserId}`,
        method: "post",
        data: data,
      });
    } catch (err) {
      console.log(err, "Error from follow");
    }
  };

  const searchFunction = async ({ search }: string) => {
    setLoading(true);
    try {
      const response = await authenticatedRequest({
        url: `${BASE_URL}/video/search?query=${search}`,
        method: "get",
      });
      if (response.status === 200) {
        setSearchResults(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err, "Error from Seacrh");
    }
  };
  const recCommenedUsers = async () => {
    try {
      const response = await authenticatedRequest({
        url: `${BASE_URL}/user`,
        method: "get",
      });
      console.log(response, "");
      setLoading(false);
    } catch (err) {
      console.log(err, "Error from getUser");
    }
  };

  return (
    <ApiContext.Provider
      value={{
        postVideo,
        getUserVideos,
        userVideos,
        addLikeVideo,
        getAllVideos,
        allVideos,
        setAllVideos,
        deleteVideo,
        addCommentToVideo,
        toggleFollow,
        searchFunction,
        showAlert,
        setAlertMessage,
        setShowAlert,
        searchResults,
        search,
        setSearch,
        recCommenedUsers,
      }}
    >
      {children}
      {showAlert && (
        <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
    </ApiContext.Provider>
  );
}
