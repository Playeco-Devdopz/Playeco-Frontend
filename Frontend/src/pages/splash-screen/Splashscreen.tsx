// Splashscreen.js
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Splashscreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (true) {
      let interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval);
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 200);
    }
  }, []);

  return (
    <div
      id="closeLoginpopup"
      style={{ fontFamily: 'sans-serif' }}
      className="fixed bg-black top-0 left-0 h-svh w-screen flex items-center flex-col p-4 overflow-y-auto z-[100]"
    >
      <Helmet>
        <title>Playeco.Live - Splash Screen</title>
        <meta name="description" content="Playeco Splash Screen" />
        <meta name="keywords" content="Playeco Splash Screen" />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "Playeco Splash Screen",
              "url": "https://playeco.live"
            }
          `}
        </script>
      </Helmet>
      
      {/* loader  */}
      <div className="fixed top-0 left-0 w-full z-[200]">
        <div
          style={{ width: `${progress}%` }}
          className="h-1 bg-purple-600 transition-width duration-1000"
        ></div>
      </div>
      {/* loader  */}

      <img
        width={70}
        src="/playecologo.png"
        alt="Playeco logo"
        draggable="false"
        className="mt-[350px]"
      />

      <div className="flex fixed mb-[50px] bottom-0 flex-col items-center">
        <p className="text-gray-400">from</p>
        <h1 className="text-[#8000FF] text-white">Devdopz</h1>
      </div>
    </div>
  );
};

export default Splashscreen;
