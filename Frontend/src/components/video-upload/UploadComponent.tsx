import React, { useContext, useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebaseConfig/FirebaseConfig";
import { userAuthContext } from "../../context/UserContext";
import { ApiContext } from "../../context/ApiContext";
import ReactGA from 'react-ga';

const UploadComponent = ({ onClose }: { onClose: () => void }) => {



  
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    hashtag: "",
    video: "",
    thumbnail: "",
    userId: "",
  });

  const [uploadProgress, setUploadProgress] = useState<number | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const [quality, setQuality] = useState("medium");

  const { singleUser, singleUserDetails, currentUser, setLoading }: any = useContext(userAuthContext);
  const { postVideo }: any = useContext(ApiContext);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [video, setVideo] = useState<File | undefined>();
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (currentUser && !initialized) {
      singleUser();
      setInitialized(true);
    }
  }, [currentUser, initialized]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVideoDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleThumbnailDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { "video/*": [] },
  });

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } = useDropzone({
    onDrop: handleThumbnailDrop,
    accept: { "image/*": [] },
  });

  const randomId = Math.floor(Date.now() * Math.random());

  const videoUpload = useCallback(async () => {
    try {
      if (!video) return null;

      const qualityPath = `/video/${quality}/${randomId}`;
      const videoRef = ref(storage, qualityPath);
      const uploadTask = uploadBytesResumable(videoRef, video);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading video:", error);
        }
      );

      await uploadTask;
      const downloadURL = await getDownloadURL(videoRef);
      return downloadURL;
    } catch (err) {
      console.error("Error uploading video:", err);
    }
  }, [video, randomId, quality]);

  const videoThumbnailUpload = useCallback(async () => {
    try {
      if (!thumbnail) return null;

      const videoThumbnailRef = ref(storage, `/videoThumbnail/${randomId}`);
      const uploadTask = uploadBytesResumable(videoThumbnailRef, thumbnail);

      await uploadTask;
      const downloadURL = await getDownloadURL(videoThumbnailRef);
      return downloadURL;
    } catch (err) {
      console.error("Error uploading thumbnail:", err);
    }
  }, [thumbnail, randomId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    ReactGA.event({
      category: 'User',
      action: 'Uploaded Video'
    });

    e.preventDefault();

    if (!videoDetails.title || !video || !thumbnail) {
      alert("Please fill mandatory fields");
      return;
    }
    

    setIsUploading(true);

    try {
      const videoURL = await videoUpload();
      const thumbnailURL = await videoThumbnailUpload();

      if (videoURL && thumbnailURL && singleUserDetails?._id) {
        const videoData = {
          ...videoDetails,
          video: videoURL,
          thumbnail: thumbnailURL,
          userId: singleUserDetails?._id,
        };

        await postVideo({ videoDetails: videoData });

        setVideoDetails({
          title: "",
          description: "",
          hashtag: "",
          video: "",
          thumbnail: "",
          userId: "",
        });
        setVideo(undefined);
        setVideoPreview("");
        setThumbnail(undefined);
        setThumbnailPreview("");
        setLoading(false);
        onClose();
      }
    } catch (error) {
      console.error("Error during video upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(10px)" }}
      className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto z-50"
    >
      <div className="bg-gray-800 bg-opacity-90 rounded-lg p-6 w-full max-w-3xl text-white relative shadow-lg">
        <button
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full p-2 focus:outline-none"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">Upload Video</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Thumbnail Image <span className="text-red-500">*</span>
              </label>
              <div
                {...getThumbnailRootProps()}
                className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer text-center bg-gray-700 hover:bg-gray-600"
              >
                <input {...getThumbnailInputProps()} />
                <p className="text-sm text-gray-400">Drag 'n' drop thumbnail image here, or click to select file</p>
              </div>
              {thumbnailPreview && (
                <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-4 w-full h-40 object-cover rounded-lg" />
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Video File <span className="text-red-500">*</span>
              </label>
              <div
                {...getVideoRootProps()}
                className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer text-center bg-gray-700 hover:bg-gray-600"
              >
                <input {...getVideoInputProps()} />
                <p className="text-sm text-gray-400">Drag 'n' drop video file here, or click to select file</p>
              </div>
              {videoPreview && (
                <video controls className="mt-4 w-[100px] rounded-lg">
                  <source src={videoPreview} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter video title"
                name="title"
                value={videoDetails.title}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                #HashTag <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter video #hashtag"
                name="hashtag"
                value={videoDetails.hashtag}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                placeholder="Enter video description"
                name="description"
                value={videoDetails.description}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            {isUploading && (
              <div>
                <label className="block text-sm font-medium mb-2">Upload Progress</label>
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                {uploadProgress !== undefined && (
                  <p className="text-sm text-gray-400 mt-2">{Math.round(uploadProgress)}%</p>
                )}
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadComponent;
