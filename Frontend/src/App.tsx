import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga";
import LayOut from "./layout/LayOut";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import ProfilePage from "./pages/main-profile-page/ProfilePage";
import Aboutus from "./pages/about/Aboutus";
import FAQs from "./pages/faq/FAQs";
import Playandreco from "./components/play-videos/Playandreco";
import Notfoundpage from "./pages/page-not-found/Notfound";
import Aboutad from "./components/ads-details/Aboutad";
import Terms from "./pages/terms/Terms";
import NetworkStatus from "./components/networkStatus/NetworkStatus";
import useNetworkStatus from "./components/networkStatus/UseNetworkStatus";

const TRACKING_ID = "G-5YLML63887";
ReactGA.initialize(TRACKING_ID);
const App = () => {

  const isOnline = useNetworkStatus();

  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <div className="bg-black   text-white w-screen h-svh">
      <NetworkStatus isOnline={isOnline} />
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/Terms-Of-Use" element={<Terms />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/playvideo/:videoId" element={<Playandreco />} />
          <Route path="*" element={<Notfoundpage />} />
          <Route path="/about-ads-showing" element={<Aboutad />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route
            path="/Profile"
            element={<ProtectedRoute Component={ProfilePage} />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
