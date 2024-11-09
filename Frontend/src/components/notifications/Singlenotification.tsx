import { NavLink } from "react-router-dom";

const Singlenotification = () => {
    return (
        <div className="w-[100%] bg-gray-400 bg-opacity-10 h-[60px] p-4 flex gap-2 flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
                <img width={40} src="/playecologo.png" alt="Playeco logo" />
                <div className="flex flex-col justify-start">
                    <p>Playeco</p>
                    <h1 className="text-gray-400">Droped new video</h1>
                </div>
            </div>
            <NavLink to='/playvideo/665c3249828daf364a06d4e9'>
                open
            </NavLink>
        </div>
    )
}

export default Singlenotification
