import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { ImageContext } from "../Context/Context";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, imageData, setImageData, handleSearch } =
    useContext(ImageContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 max-[300px]:gap-2 p-3 max-[500px]:p-2 rounded custom w-[500px] max-[750px]:w-[400px] max-[500px]:w-[300px] max-[380px]:w-[250px] max-[300px]:w-[200px] bg-[#d9d9d91d] backdrop-blur-lg mt-20 max-[750px]:mt-12 max-[500px]:mt-10"
    >
      <CiSearch className="text-lg" />
      <div className="bg-white h-6 w-[1px]"></div>
      <input
        type="text"
        placeholder={imageData.length ? `Start new Search` : `Search`}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className="bg-transparent outline-none flex-grow max-[380px]:w-[50%] max-[380px]:text-sm"
      />
      <button
        className="border-2 border-white rounded px-2 max-[380px]:text-sm max-[300px]:text-[12px]"
        type="submit"
      >
        GO!
      </button>
    </form>
  );
};

export default SearchBar;
