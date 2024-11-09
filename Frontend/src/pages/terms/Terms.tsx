import SearchedResults from "../../components/search-result/SearchedResults";
import { Helmet } from 'react-helmet';

const Terms = () => {
  return (
    <div className="bg-[#00000] pb-[100px] py-12">
      <Helmet>
        <title>Playeco.Live - Terms</title>
        <meta name="description" content="Playeco Terms" />
        <meta name="keywords" content="Playeco Terms" />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "Playeco Terms",
              "url": "https://playeco.live"
            }
          `}
        </script>
      </Helmet>
      <SearchedResults/>
      <div className="pl-10 mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Terms and Conditions for [Playeco]</h1>

        <p>
          Welcome to Playeco! These Terms and Conditions govern your use of our platform, which allows you to upload and share gameplay videos, and for viewers to interact with those videos through features like Superchat. By using our platform, you agree to be bound by these terms.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Beta Version</h2>

        <p>
          Please note that our platform is currently in beta. This means that we are still actively developing and improving it. We may make changes to the platform at any time without notice.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>

        <p>
          To use our platform, you must be at least 13 years old and have a Google account.
        </p>

        <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>

        <p>
          You are responsible for maintaining the security of your Google account and any activity that occurs under it. You must not share your account with anyone.
        </p>

        <h2 className="text-xl font-semibold mb-2">4. Content</h2>

        <h3 className="text-lg font-semibold mb-2">4.1 Uploading Content</h3>

        <p>
          You are responsible for all content you upload to our platform, including gameplay videos and any associated descriptions, comments, or other materials. You must ensure that your content:
        </p>

        <ul>
          <li>Does not infringe on the intellectual property rights of any third party.</li>
          <li>Does not violate any laws or regulations.</li>
          <li>Does not contain any hate speech, offensive language, or other harmful content.</li>
          <li>Does not promote or glorify violence, illegal activities, or harmful behavior.</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">4.2 Superchat</h3>

        <p>
          Viewers can send you Superchat donations through your videos. You are responsible for complying with all applicable laws and regulations regarding taxes and other financial obligations related to Superchat donations.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Moderation</h2>

        <p>
          We reserve the right to remove or moderate any content that we believe violates these Terms and Conditions or is otherwise harmful or inappropriate.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Termination</h2>

        <p>
          We may terminate your account or access to our platform at any time, for any reason, without notice.
        </p>

        <h2 className="text-xl font-semibold mb-2">7. Disclaimer</h2>

        <p>
          Our platform is provided "as is" and without any warranty or guarantee. We are not responsible for any damages arising from your use of the platform.
        </p>

        <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>

        <p>
          These Terms and Conditions will be governed by and construed in accordance with the laws of India.
        </p>

        <h2 className="text-xl font-semibold mb-2">9. Changes to the Terms and Conditions</h2>

        <p>
          We may update these Terms and Conditions at any time. You are responsible for checking these terms regularly to stay informed of any changes.
        </p>

        <h2 className="text-xl font-semibold mb-2">10. Contact</h2>

        <p>
          If you have any questions about these Terms and Conditions, please contact us at playeco@support.
        </p>
      </div>
    </div>
  );
};

export default Terms;
