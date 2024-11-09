import { useContext, FormEvent } from "react";
import "./Header.css";
import { ApiContext } from "../../../context/ApiContext";
import { userAuthContext } from "../../../context/UserContext";

const Searchbar = () => {
  const { currentUser, setLoginOpen }: any = useContext(userAuthContext);
  const { searchFunction, search, setSearch }: any = useContext(ApiContext);
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentUser) {
      if (!search) return;
      searchFunction({ search: search });
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex relative items-center justify-center"
      >
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="w-[100%] lg:w-[600px] placeholder-gray-300 border-r-[40px] border-black rounded-md text-white p-4 h-[35px] bg-gray-500 bg-opacity-20 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-opacity-80 focus:ring-purple-600"
          type="text"
          placeholder="Search Players or games"
        />
        <button type="submit" className="justify-center items-center flex">
          <img
            className="absolute right-3 "
            width={17}
            src="/Search.svg"
            alt=""
          />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
