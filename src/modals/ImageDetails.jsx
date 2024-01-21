import { RxCross2 } from "react-icons/rx";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import { useState } from "react";

const ImageDetails = ({ imageDetail, setIsImageDetailOpen }) => {
  const [selectedSize, setSelectedSize] = useState(0);

  const handleSizeSelection = (index) => {
    setSelectedSize(index);
  };

  const imgData = imageDetail;
  console.log(imgData);

  const imgSizes = [
    { screen: "Small", value: "640x960" },
    { screen: "Medium", value: "1920x2660" },
    { screen: "Big", value: "2400x3600" },
    { screen: "Original", value: "3850x5640" },
  ];

  const { username, id, total_photos, total_likes, total_promoted_photos } =
    imgData.user;

  const imgId = imgData.id;

  const downloadImage = async () => {
    const selectedSizeValue = imgSizes[selectedSize].value;

    // Fetch the image data for the selected size
    const imageData = await fetchDownloadUrl(imgId, selectedSizeValue);

    if (imageData) {
      // Create a Blob from the image data with the appropriate content type
      const blob = new Blob([imageData], { type: "image/jpeg" });

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `unsplash_image_${imgId}.jpg`;

      // Append the link to the document, click it, and remove it
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const fetchDownloadUrl = async (photoId, size) => {
    try {
      // Replace 'YOUR_ACCESS_KEY' with your actual Unsplash API access key
      const accessKey = "7qwSTxmAHuH-l4KMo1yRTHxBpy-yXRm1-Q2dT08loZA";
      const apiUrl = `https://api.unsplash.com/photos/${photoId}/download?client_id=${accessKey}`;

      const response = await fetch(apiUrl);

      // Ensure the response is successful (status code 200)
      if (!response.ok) {
        throw new Error(`Failed to fetch image data: ${response.statusText}`);
      }

      // Get the response data as an ArrayBuffer
      const data = await response.arrayBuffer();

      return data;
    } catch (error) {
      console.error("Error fetching download URL:", error);
      return null;
    }
  };

  const info = [
    { name: "User", value: username },
    { name: "User ID", value: id },
    { name: "Type", value: "Photo" },
    { name: "Views", value: total_photos },
    { name: "Downloads", value: total_promoted_photos },
    { name: "Likes", value: total_likes },
  ];

  return (
    //
    <div className="bg-black/30 flex items-center justify-center fixed inset-0 z-10">
      <div className="bg-white text-black w-[80%] h-[95%] rounded-lg overflow-hidden overflow-y-auto">
        <header className="bg-[#F5F5F5] h-[9%] flex justify-between items-center py-4 px-6 sticky top-0 left-0 shadow">
          <h3 className="text-[#3B4043] font-medium max-[440px]:text-sm">
            Preview ID: {id}
          </h3>
          <RxCross2
            className="border-[1.5px] border-black rounded-[5px] p-0.5 hover:bg-gray-300 text-xl cursor-pointer"
            onClick={() => setIsImageDetailOpen(false)}
          />
        </header>
        <main className="flex justify-between gap-4 px-6 pt-7 h-[81%] max-[950px]:flex-col max-[950px]:items-center">
          <div className="max-[950px]:mb-10">
            <img
              src={imgData.urls.raw}
              alt="image"
              className="w-[95%] max-[950px]:w-full h-full rounded-md object-cover"
            />
            <div className="flex items-center gap-5 mt-3">
              <h6 className="text-[#3B4043] font-bold max-[440px]:text-sm">
                Tags:
              </h6>
              <div className="flex gap-3 max-[440px]:gap-1 items-center">
                {imgData.tags.map((tag, idx) => {
                  return (
                    <span
                      key={idx}
                      className="px-2 py-[2px] bg-[#F5F5F5] text-[#767676] text-sm rounded max-[440px]:text-[10px]"
                    >
                      {tag.title}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="max-[950px]:flex max-[950px]:w-full justify-between gap-10 max-[950px]:pb-5 max-[600px]:gap-5 max-[530px]:flex-col max-[530px]:items-center ">
            {/* Download Component */}
            <div className="max-[950px]:w-[50%] max-[530px]:w-full">
              <h4 className="text-xl text-[#3B4043] font-medium">Download</h4>
              <div className="border-[1px] border-[#dae1ea] rounded-md my-2">
                {imgSizes.map((size, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSizeSelection(idx)}
                      className={`flex gap-2 justify-between px-4 py-3 cursor-pointer max-[600px]:py-1 ${
                        selectedSize === idx && `bg-[#F5F5F5]`
                      } ${idx < 3 && "border-b-[1px] border-[#dae1ea]"} `}
                    >
                      <span className="text-[#475467] text-sm max-[600px]:text-[10px]">
                        {size.screen}
                      </span>
                      <div className="flex items-center gap-5">
                        <span className="font-bold text-[#475467] text-sm max-[600px]:text-[10px]">
                          {size.value}
                        </span>
                        <span>
                          {selectedSize === idx ? (
                            <FaRegCircleCheck className="bg-green-400 rounded-[50%] text-white" />
                          ) : (
                            <FaRegCircle />
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={downloadImage}
                className="bg-[#4BC34B] w-full rounded-[5px] py-2 text-white mt-4"
              >
                Download for free!
              </button>
            </div>
            {/* Information Component */}
            <div className="max-[950px]:w-[50%] max-[530px]:w-full">
              <h4 className="text-xl mb-2 mt-4 max-[950px]:mt-0 text-[#3B4043] font-medium">
                Information
              </h4>
              <div className="flex flex-wrap gap-5 max-[600px]:gap-x-3 justify-between">
                {info.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col w-[25%] max-[600px]:w-[32%] max-[530px]:w-[25%]"
                    >
                      <span className="text-gray-500 font-bold text-[12px] max-[600px]:text-[10px] max-[340px]:text-[7px]">
                        {item.name}
                      </span>
                      <span className="text-[#3B4043] font-bold text-[12px] max-[600px]:text-[10px]">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    //
  );
};

export default ImageDetails;
