import React from "react";
import SearchedResults from "../../components/search-result/SearchedResults";
import { Helmet } from 'react-helmet';

const Aboutus: React.FC = () => {
  return (
    <div className="bg-[#0000]  min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Playeco.Live - About Page</title>
        <meta name="description" content="Playeco About Page" />
        <meta name="keywords" content="Playeco About" />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "Playeco About",
              "url": "https://playeco.live"
            }
          `}
        </script>
      </Helmet>

      <SearchedResults/>
      <div className="max-w-4xl p-8 bg-black shadow-lg rounded-lg">
        <div className="flex gap-5 items-center justify-center mb-6">
           <img width={50} src="/Icons/gamepad.svg" alt="" />
          <h1 className="text-3xl font-bold">About Us</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center">
            <img
              width={400}
              draggable="false"
              src="/aboutus.png"
              alt="About Us"
              className="rounded-lg shadow-md mb-4"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg mb-4">
              Welcome to our gameplay uploading platform! We are passionate
              about providing gamers with a space to share their gaming
              experiences with the world.
            </p>
            <p className="text-lg mb-4">
              Our platform aims to make it easy for gamers to upload and
              showcase their gameplay videos, connect with other gamers, and
              discover new and exciting content.
            </p>
            <p className="text-lg">
              Whether you're a casual gamer, a professional streamer, or
              somewhere in between, we invite you to join our community and
              start sharing your gameplay today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
