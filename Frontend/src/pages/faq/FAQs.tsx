import React from 'react';
import SearchedResults from '../../components/search-result/SearchedResults';
import { Helmet } from 'react-helmet';

const FAQs: React.FC = () => {
  return (
    <div className="bg-[#0000] h-[1200px] py-12">
      <Helmet>
        <title>Playeco.Live - FAQ</title>
        <meta name="description" content="Playeco Frequently asked questions Page" />
        <meta name="keywords" content="Playeco FAQ" />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "Playeco FAQ",
              "url": "https://playeco.live"
            }
          `}
        </script>
      </Helmet>
      <SearchedResults/>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl  font-semibold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-6 text-white">
          {/* <Question question="what is our benifits when use your platfrom " answer="You get more support than other platfroms from our platfrom and our side and you can earn money" /> */}
          <Question question="How can I upload my gameplay videos?" answer="You can easily upload your gameplay videos by creating an account on our platform and following the simple upload instructions." />
          <Question question="Is it free to use?" answer="Yes, our platform is completely free to use for both uploading and viewing gameplay videos." />
          <Question question="Can I monetize my videos?" answer="Yes, we offer monetization options for creators who meet certain criteria. Contact our support team for more information." />
          <Question question="How can I contact support?" answer="You can contact our support team by emailing support@example.com or using the contact form on our website." />
        </div>
      </div>
    </div>
  );
};

interface QuestionProps {
  question: string;
  answer: string;
}

const Question: React.FC<QuestionProps> = ({ question, answer }) => {
  return (
    <div className="bg-[#202020] rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
};

export default FAQs;
