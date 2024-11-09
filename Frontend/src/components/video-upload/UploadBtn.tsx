import { useState } from 'react';
const UploadBtn = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="bg-purple-600 p-2 rounded-full w-[33px] h-[33px] flex items-center justify-center">
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Upload Video</title>
        <path d="M15 0C15.2652 0 15.5196 0.105357 15.7071 0.292893C15.8946 0.48043 16 0.734784 16 1V5.2L21.213 1.55C21.288 1.49746 21.3759 1.4665 21.4672 1.4605C21.5586 1.4545 21.6498 1.4737 21.731 1.51599C21.8122 1.55829 21.8802 1.62206 21.9276 1.70035C21.9751 1.77865 22.0001 1.86846 22 1.96V14.04C22.0001 14.1315 21.9751 14.2214 21.9276 14.2996C21.8802 14.3779 21.8122 14.4417 21.731 14.484C21.6498 14.5263 21.5586 14.5455 21.4672 14.5395C21.3759 14.5335 21.288 14.5025 21.213 14.45L16 10.8V15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H15ZM14 2H2V14H14V2ZM7 4H9V7H12V9H8.999L9 12H7L6.999 9H4V7H7V4ZM20 4.841L16 7.641V8.359L20 11.159V4.841Z" fill="white" />
      </svg>
      {showTooltip && (
        <div className="absolute mt-2 w-[100px] mb-[-60px] ml-[-30px] bg-gray-700 text-white text-xs rounded px-2 py-1">
          Upload Video
        </div>
      )}
    </div>
  );
};

export default UploadBtn;
