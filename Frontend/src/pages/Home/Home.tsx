import Homevideo from "../../components/home-page/Homevideo";
import Ads from "../../components/Ads/Ads";
import SearchedResults from "../../components/search-result/SearchedResults";
import { Helmet } from 'react-helmet';
import Tags from "../../components/web-header/Items/Tags";

function Home() {
  return (
    <div className="bg-black min-h-[100vh]">

      <Helmet>
        <title>Playeco.Live - Home</title>
        <meta name="description" content="Welcome to Playeco Kerala's First Game Streaming Platfrom" />
        <meta name="keywords" content="South Indian Game Streaming Platfrom" />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "Playeco Home Page",
              "url": "https://playeco.live"
            }
          `}
        </script>
      </Helmet>
      <SearchedResults />
      <Tags/>
      <Homevideo />
      <Ads />
    </div>
  );
}

export default Home;
