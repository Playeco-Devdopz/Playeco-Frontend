import { NavLink } from "react-router-dom"
import { Helmet } from 'react-helmet';

const Notfoundpage = () => {
  return (
    <div className="w-full h-[100vh] flex-col bg-gray-500 bg-opacity-10 flex items-center justify-center">
      <Helmet>
        <title>Playeco.Live - Playeco 404 Page</title>
        <meta name="description" content="Playeco 404 Page" />
        <meta name="keywords" content="Playeco 404 Page" />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "Playeco Wrong URL",
              "url": "https://playeco.live"
            }
          `}
        </script>
      </Helmet>
      <h1 className="text-3xl">Page Not Found 404</h1>
      <p className="text-gray-400 mt-2 mb-2">Go back to https://playeco.live</p>
      <NavLink to='/' className="bg-blue-500 p-2 rounded-lg mt-2">
      Back to Home
      </NavLink>
    </div>
  )
}

export default Notfoundpage

