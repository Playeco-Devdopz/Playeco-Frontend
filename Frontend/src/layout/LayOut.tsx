import Header from "../components/web-header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Bottomnav from "../components/mobile-navbar/Bottomnav";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";

const LayOut: React.FC = () =>{

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  return (
    <div>
      <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <Outlet />
      <Footer />
      <Bottomnav />
    </div>
  );
}

export default LayOut;
