import { useContext, useEffect } from "react";
import { ApiContext } from "../../context/ApiContext";
import { userAuthContext } from "../../context/UserContext";
import SearchResults from "./SearchResults";
import { User } from "../../types/Types";

const SearchedResults = () => {
  
  const { getAllVideos, searchResults, recCommenedUsers, search }: any =
    useContext(ApiContext);
  const { currentUser, singleUser }: any = useContext(userAuthContext);
  useEffect(() => {
    getAllVideos();
  }, []);
  useEffect(() => {
    if (currentUser) {
      singleUser();
      recCommenedUsers();
    }
  }, [currentUser]);

  return (
    <div>
      {searchResults?.length > 0 && search && (
        <div className="m-auto border-[0.1px] overflow-y-scroll h-[auto] lg:min-h-[200px] overflow-hidden border-white border-opacity-20 fixed mt-[130px] lg:mt-20 rounded-md top-0 bg-black flex-col justify-start z-[100] px-[20px] gap-2 left-0 right-0 py-[20px] w-[90%] lg:w-[600px] flex">
          {searchResults?.map((item: User) => (
            <SearchResults data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchedResults;
