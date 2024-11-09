import { useState } from 'react';

const Pitcoin: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex flex-row items-center gap-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <h1 className="font-[500]">10000</h1>
      <img width={25} src="/playcoin.svg" alt="" />
      {showTooltip && (
        <div className="absolute w-[100px] mb-[-60px] ml-[-30px] bg-gray-700 text-white text-xs rounded px-2 py-1">
          Coming Soon
        </div>
      )}
    </div>
  );
};

export default Pitcoin;
