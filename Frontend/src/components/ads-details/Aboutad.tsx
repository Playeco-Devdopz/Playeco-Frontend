const Aboutad = () => {
  return (
    <div className="bg-black pb-20 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4 text-white">Promote Your Game or Service Here!</h1>
        <p className="mb-8 text-lg text-white">Reach Thousands of Gamers Daily</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-white">Key Features:</h2>
          <ul className="list-disc list-inside">
            <li><span className="font-bold">Highly Visible:</span> Place your ad in prime spots on our platform.</li>
            <li><span className="font-bold">Targeted Audience:</span> Reach dedicated gamers who are passionate about your product.</li>
            <li><span className="font-bold">Flexible Duration:</span> Choose the ad duration that fits your needs.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-white">How It Works:</h2>
          <ol className="list-decimal list-inside">
            <li><span className="font-bold">Create Your Ad:</span> Design a custom banner ad that represents your game or service.</li>
            <li><span className="font-bold">Submit & Pay:</span> Upload your ad and select your preferred ad package.</li>
            <li><span className="font-bold">Go Live:</span> Your ad will be displayed to our community of gamers.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-white">Why Advertise with Us?</h2>
          <ul className="list-disc list-inside">
            <li><span className="font-bold">Engaged Community:</span> Our users spend hours gaming and are always on the lookout for new products.</li>
            <li><span className="font-bold">Analytics:</span> Get detailed insights on ad performance to maximize your ROI.</li>
            <li><span className="font-bold">Support:</span> Our team is here to help you create the perfect ad campaign.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-white">Get Started Today!</h2>
          <p className="text-lg mb-4 text-white">
            Contact us at <a href="mailto:ads@example.com" aria-label="Contact us" className="text-blue-500 underline">ads@Playeco.com</a> for more details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-white">Example Ad Packages:</h2>
          <ul className="list-disc list-inside">
            <li><span className="font-bold">1 Week:</span> $50</li>
            <li><span className="font-bold">1 Month:</span> $180</li>
            <li><span className="font-bold">3 Months:</span> $500</li>
          </ul>
        </section>

        <p className="text-lg font-semibold mb-4 text-white">Showcase Your Game or Service Now!</p>
        <p className="text-lg text-white">
          Don't miss the opportunity to connect with our passionate gaming community. Advertise with us and watch your reach grow!
        </p>
      </div>
    </div>
  );
}

export default Aboutad;
