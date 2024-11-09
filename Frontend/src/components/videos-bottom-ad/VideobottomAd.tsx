import { NavLink } from "react-router-dom"

const VideobottomAd = () => {
    return (
        <div className="md:block p-3 flex flex-col hidden mt-5 rounded-[25px] bg-gray-800 bg-opacity-40 border-[0.1px] border-gray-600 w-[100%] h-[290px]">
            <div className="w-[100%] h-[auto] flex item-center justify-ceneter">
                <img className="rounded-lg" src="/Blue Black Sneakers Realistic Product Promotion Banner.png" alt="" />
            </div>
            <div className="flex flex-row mt-5 mb-5 items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden">
                    <img src="/playecologo.png" alt="Playeco logo" />
                </div>
                <div className="flex flex-col">
                    <p>Playeco</p>
                    <p className="text-[14px]">Sponsored • Devdopz LLP</p>
                </div>
            </div>
            <NavLink to="/about-ads-showing" aria-label="Learn more about our ads system" className="bg-[#8000FF] mt-5 text-[15px] p-2 text-white font-[500] rounded-full">
                Learn more
            </NavLink>
        </div>
    )
}

export default VideobottomAd
