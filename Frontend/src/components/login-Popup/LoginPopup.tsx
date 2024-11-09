import { useState, useEffect } from "react";
import Loginbutton from "../buttons/Loginbutton";

function LoginPopup() {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "/BGMI-770x433.webp",
    "/05275-16230476236273-800.avif",
    "/EGS_VALORANT_RiotGames_S1_2560x1440-d9ca2c0fbaff9d80e8dedfbd726aa438.jpeg",
  ]; // Add your image URLs here

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };

  }, []);

  return (
    <div
      id="closeLoginpopup"
      style={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(5px)" }}
      className="fixed top-0 left-0 h-svh w-screen flex items-center justify-center p-4 overflow-y-auto z-[100]"
    >
      <div
        className="bg-[#000] bg-opacity-70 rounded-lg p-4 lg:p-8 text-white relative"
      >
        <div className=" rounded-lg overflow-hidden">
          <img
            className="w-[400px] object-fill h-[210px]"
            src={images?.[imageIndex]}
            alt=""
          />
        </div>
        <div className="mt-4 ">
          <h2 className="text-3xl font-bold">Join to Playeco</h2>
          <p className="mb-6">
            Log in now and interact with your favourite streamers.
          </p>
          <div className="mb-6">
            <Loginbutton text={"continue with google"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
