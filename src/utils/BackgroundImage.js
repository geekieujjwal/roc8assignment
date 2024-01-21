import React, { useEffect, useState } from "react";
import axios from "axios";

const BackgroundImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            headers: {
              Authorization:
                "Client-ID RxROvSr26wDeAXYbr2OIyjnKF018ymLtsO-CQykb6sU",
            },
          }
        );
        console.log(response);
        const randomImage = response.data.urls.regular;
        setImageUrl(randomImage);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  }, [imageUrl]);

  return null; // This component doesn't render anything in the DOM
};

export default BackgroundImage;
