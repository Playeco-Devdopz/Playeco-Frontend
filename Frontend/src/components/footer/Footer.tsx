import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Supportbtn from "./Supportbtn";
import Support from "./Support";
import { useState } from "react";

const Footer = () => {
  const [supportOpen, setSupportPopupOpen] = useState(false);
  
  const SupportOpen = () => {
    setSupportPopupOpen(!supportOpen);
  };

  const location = useLocation();
  const pathsWithFooter = ['/', '/FAQs', '/Aboutus']
  const showFooter = pathsWithFooter.includes(location.pathname);

  return showFooter ? (
    <div>
      <div className="w-full md:block hidden h-[100px] border-t-[0.6px] border-gray-200 border-opacity-30 p-4 lg:p-10 bg-[#000000]">
        <div className="container mx-auto flex lg:flex-row justify-between items-center">

          <div className="flex flex-row items-center">
            <img src="/playecologo.png" alt="Playeco logo" className="mr-4" width={40} />
            <h1 className="text-[14px] text-center text-purple-500">WATCH . PLAY . EARN . REPEAT</h1>
          </div>

          <div className="flex flex-col  mb-2 sm:mb-0 items-center lg:items-start lg:mb-0">
            <div className='flex flex-row text-[25px] gap-5'>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/playeco.live/">
                <img src="/Icons/instagram.svg" alt="" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://t.me/ecoofficials">
                <img width={21} src="/Icons/telegram.svg" alt="" />
              </a>
            </div>
          </div>
          <div className='font-light text-gray-300 flex flex-col lg:flex-row gap-2 lg:gap-5 items-center lg:items-start lg:mb-0'>
            <NavLink className={`hover:border-b-2 border-blue-400`} aria-label="more details About us" to='/Aboutus'>About Us</NavLink>
            <NavLink className={`hover:border-b-2 border-blue-400`} aria-label="Frequently Asked Questions)" to='/FAQs'>FAQs</NavLink>
            <NavLink className={`hover:border-b-2 border-blue-400`}  aria-label="Terms and Conditions" to='/Terms-Of-Use'>Terms Of Use</NavLink>
          </div>
          <div className="text-[14px] sm:mt-0 sm:text-[18px] flex flex-col items-center lg:items-start">


            <button onClick={SupportOpen}>
              <Supportbtn />
            </button>

            {supportOpen && (
              <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center p-4 overflow-y-auto z-[100]">
                <Support onClose={() => setSupportPopupOpen(false)} />
              </div>
            )}

          </div>
        </div>
      </div>

      {/* mobile footer start */}

      <div className="bg-black md:hidden block h-[200px]  flex justify-center flex-col items-center text-[15px] text-white w-full h-[100px]">
        <div className="flex mb-2 items-center flex-row">
          <img src="/playecologo.png" alt="Playeco logo" className="mr-2" width={25} />
          <p className="text-purple-500">WATCH . PLAY . EARN . REPEAT</p>
        </div>
        <div className="flex gap-4 text-[17px] items-center flex-row">
          <NavLink to='/Aboutus'>About us &nbsp; | </NavLink>
          <NavLink to='/faqs'>FAQ &nbsp; | </NavLink>
          <NavLink to='/Terms-Of-Use'>Terms Of Use</NavLink>
        </div>
      </div>

    </div>
  ) : null;
};

export default Footer;
