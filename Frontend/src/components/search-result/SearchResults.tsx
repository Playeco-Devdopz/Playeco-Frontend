import { useNavigate } from "react-router-dom";
import { User } from "../../types/Types";
import { useContext } from "react";
import { userAuthContext } from "../../context/UserContext";

type PROPDATA = {
  data: User;
};

function SearchResults({ data }: PROPDATA) {
  const navigate = useNavigate();
  const { currentUser, setLoginOpen }: any = useContext(userAuthContext);

  const handleNavigate = ({ id }: { id: string }) => {
    if (currentUser && data) {
      if (currentUser?.uid === id) {
        navigate(`/Profile`);
      } else {
        navigate(`/Profile?uid=${id}`);
      }
    } else {
      setLoginOpen(true);
    }
  };



  return (
    <div  className="flex justify-between mt-2">
      <div onClick={() => handleNavigate({ id: data?.uid || "" })} className="flex cursor-pointer rounded-md bg-gray-500 bg-opacity-30 p-2 flex-row w-[100%] justify-between items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden">
            <img
              width={"100%"}
              src={
                data?.image
                  ? data?.image
                  : "https://firebasestorage.googleapis.com/v0/b/ecodatastorage.appspot.com/o/unknown.webp?alt=media&token=77321571-025d-4a18-9502-53d1a9032b10"
              }
            />
        </div>
        <div className="flex justify-between w-[100%] flex-row items-center">
          <div>
            <p className="text-[14px] font-[500]"> {data?.name} </p>
            <p className="text-gray-300 text-[14px]">
              {data?.followers?.length} followers
            </p>
          </div>
          <div>
            <button
              onClick={() => handleNavigate({ id: data?.uid || "" })}
              className={
                "bg-blue-500 text-[14px] px-[15px] py-[5px] rounded-md ml-5"
              }
            >
              view
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
