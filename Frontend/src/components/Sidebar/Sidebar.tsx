import React, { useContext, useEffect } from "react";
import { userAuthContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { singleUserDetails }: any = useContext(userAuthContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  console.log(singleUserDetails, "")

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={closeSidebar}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] g-black shadow-lg z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
      >
        <div className="h-[100%] w-[100%]  mt-[60px] p-2 bg-black flex flex-col items-left gap-2 justify-left">
          <p className="text-gray-300 text-[16px]">Best Streamer's</p>

          {/* <a href="http://playeco.live/Profile?uid=6zJ0tXbDyzOiqNDkqss5qrhj8pf1"> */}
          <Link to={`/Profile?uid=6zJ0tXbDyzOiqNDkqss5qrhj8pf1`}>
            <div className="bg-gray-400 cursor-pointer flex items-center gap-2 flex-row p-4 bg-opacity-10  w-[280px] h-[50px]">
              <img width={35} src="/Profile.svg" alt="" />
              <p className="font-[500]">AbdulAahad S</p>
                <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(138, 0, 255)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                <p>9.8K</p>
            </div>
            {/* </a> */}
          </Link>
          {/* <a href="http://playeco.live/Profile?uid=POzy7jajS5daA0DrfbHnIkwLvnp2"> */}
          <Link to={`/Profile?uid=POzy7jajS5daA0DrfbHnIkwLvnp2`}>
            <div className="bg-gray-400 cursor-pointer flex items-center gap-2 flex-row p-4 bg-opacity-10  w-[280px] h-[50px]">
              <img
                className="rounded-full"
                width={35}
                src="/Best Players/kronic.jpg"
                alt=""
              />
              <div className="flex flex-row items-center gap-2">
                <p className="font-[500]">Kronic Says </p>
                <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(138, 0, 255)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                <p>9.8K</p>
              </div>
            </div>
          </Link>
          {/* </a> */}

          <div className="fixed bottom border-t-[0.1px] p-4 border-gray-600 bottom-0 w-[280px] h-[50px]">
            <a
              className="flex items-center text-gray-400 gap-2"
              href="https://devdopz.com/support"
            >

              FeedBack
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
