import { useState, useRef } from 'react';

const initialGameNames = [
    "All", "Bgmi", "Cs2", "Valorant", "Free Fire", "Flight", "PUBG PC",
    "Brawlhalla", "CSGO", "Minecraft", "Fortnite", "Apex Legends", "League of Legends",
    "Dota 2", "Overwatch", "Call of Duty", "Rainbow Six Siege", "Warframe",
    "Rocket League", "GTA V", "Among Us"
];

const Tags = () => {
    const [gameNames, setGameNames] = useState(initialGameNames);
    const [selectedTag, setSelectedTag] = useState("All");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    const handleTagClick = (tag: string) => {
        setSelectedTag(tag);
        // Move the clicked tag to the first position
        setGameNames(prevNames => {
            const filteredNames = prevNames.filter(name => name !== tag);
            return [tag, ...filteredNames];
        });
    };

    return (
        <div className="fixed z-[39] bg-black w-full h-[50px] flex items-center overflow-hidden">
            <button
                onClick={scrollLeft}
                className="p-2 text-white md:block hidden rounded-l-lg"
            >
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.438646 6.07858C0.157745 6.35983 -3.43323e-05 6.74108 -3.43323e-05 7.13858C-3.43323e-05 7.53608 0.157745 7.91733 0.438646 8.19858L6.09465 13.8566C6.37604 14.1378 6.75764 14.2958 7.1555 14.2957C7.55336 14.2956 7.93488 14.1375 8.21615 13.8561C8.49741 13.5747 8.65537 13.1931 8.65527 12.7952C8.65518 12.3974 8.49704 12.0158 8.21565 11.7346L3.61965 7.13858L8.21565 2.54258C8.48902 2.25981 8.64039 1.88098 8.63716 1.48768C8.63393 1.09438 8.47635 0.718084 8.19837 0.43984C7.92039 0.161595 7.54424 0.00366479 7.15095 6.29798e-05C6.75765 -0.00353884 6.37868 0.147477 6.09565 0.420583L0.437645 6.07758L0.438646 6.07858Z" fill="white" />
                </svg>
            </button>
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap flex items-center p-4 gap-4"
            >
                {gameNames.map((game, index) => (
                    <button
                        key={index}
                        onClick={() => handleTagClick(game)}
                        className={`pl-2 pr-2 pt-[3px] text-[15px] pb-[3px] font-[500] ${selectedTag === game ? "text-white bg-purple-600" : "hover:bg-opacity-30 hover:bg-purple-600 bg-opacity-60 border-[0.1px] border-purple-600"
                            } rounded-lg`}
                    >
                        {game}
                    </button>
                ))}
            </div>
            <button
                onClick={scrollRight}
                className="p-2 text-white md:block hidden rounded-r-lg"
            >
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.21663 6.07858C8.49753 6.35983 8.65531 6.74108 8.65531 7.13858C8.65531 7.53608 8.49753 7.91733 8.21663 8.19858L2.56063 13.8566C2.27923 14.1378 1.89763 14.2958 1.49977 14.2957C1.10192 14.2956 0.72039 14.1375 0.439127 13.8561C0.157865 13.5747 -9.37265e-05 13.1931 4.17234e-08 12.7952C9.38099e-05 12.3974 0.158233 12.0158 0.439627 11.7346L5.03563 7.13858L0.439627 2.54258C0.166254 2.25981 0.0148813 1.88098 0.0181122 1.48768C0.0213432 1.09438 0.178919 0.718084 0.456901 0.43984C0.734883 0.161595 1.11103 0.00366479 1.50432 6.29798e-05C1.89762 -0.00353884 2.2766 0.147477 2.55963 0.420583L8.21763 6.07758L8.21663 6.07858Z" fill="white" />
                </svg>
            </button>
        </div>
    );
}

export default Tags;
