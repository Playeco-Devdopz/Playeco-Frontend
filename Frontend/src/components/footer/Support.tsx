import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';

const Support = ({ onClose }: { onClose: () => void }) => {
    const upiId = '7306932563375@paytm';
    const [qrCodeValue, setQrCodeValue] = useState('');
    useEffect(() => {
        const upiUrl = `upi://pay?pa=${upiId}`;
        setQrCodeValue(upiUrl);
    }, [upiId]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };

    }, []);

    return (
        <div>
            <div
                style={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(10px)" }}
                className="fixed top-0 left-0 w-full h-full flex  justify-center items-center z-50">
                <div className="bg-white w-[400px] flex flex-col items-center justify-center p-6 rounded-lg  shadow-lg">
                    <div className='flex flex-row items-center justify-between w-[100%]'>
                    <h2 className="text-lg text-black font-semibold mb-4">Support Us to run this Platform <span className="text-sm"><br/>(Scan & Pay)</span></h2>
                        <button onClick={onClose} className="mt-[-15px] text-2xl p-2 bg-gray-600 bg-opacity-40 rounded-[50%] top-0 right-0">
                            <img src="/Icons/sidebarclose.svg" alt="" />
                        </button>
                    </div>
                    <div className="flex flex-col mt-4">
                        {qrCodeValue && <QRCode value={qrCodeValue} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support
