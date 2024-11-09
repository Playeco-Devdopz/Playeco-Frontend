import React, { useEffect } from 'react';
import './noscroll.css'; // Make sure to import the CSS file

interface NetworkStatusProps {
  isOnline: boolean;
}


const NetworkStatus: React.FC<NetworkStatusProps> = ({ isOnline }) => {
  const retry = () =>{
    location.reload()
  }
  useEffect(() => {
    if (!isOnline) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOnline]);

  return (
    !isOnline ? (
      <div
        className='bg-gray-600 gap-5 bg-opacity-20 flex justify-center items-center flex-col h-[120vh] w-[100%]'
      >
        <img draggable='false' width={130} src="/playecologo.png" alt="" />
        <h1 className='flex items-center text-[20px]'>You're offline</h1>
        <button onClick={retry} className='bg-gray-600 w-[100px] p-2 rounded-md'>Retry</button>
      </div>
    ) : null
  );
};

export default NetworkStatus;
