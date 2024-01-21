import { createContext, useState } from "react";
import axios from "axios";

export const ImageContext = createContext();

export default function Context({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageData, setImageData] = useState([]);
  const [resultTerm, setResultTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          headers: {
            Authorization:
              "Client-ID 7qwSTxmAHuH-l4KMo1yRTHxBpy-yXRm1-Q2dT08loZA",
          },
          params: {
            query: term,
          },
        }
      );
      console.log(response);
      setImageData(response.data.results);
      setResultTerm(term);
      setSearchTerm("");
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        imageData,
        setImageData,
        handleSearch,
        resultTerm,
        isLoading,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
