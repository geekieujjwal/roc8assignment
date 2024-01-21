import React, { useContext, useState } from "react";
import { ImageContext } from "../Context/Context";
import ImageDetails from "../modals/ImageDetails";
import { Spinner } from "@chakra-ui/react";

const ImageList = ({ imageData }) => {
  const { handleSearch, isLoading } = useContext(ImageContext);
  const [isImageDetailOpen, setIsImageDetailOpen] = useState(false);
  const [imageDetail, setImageDetail] = useState();

  const renderedRelatedTags = imageData.map((data) => {
    return (
      <span
        key={data.id}
        onClick={() => handleSearch(data?.tags[1]?.title)}
        className="flex text-center justify-center items-center py-3 max-[850px]:py-2 max-[350px]:py-1 min-w-40 max-[850px]:min-w-36 max-[500px]:min-w-32 max-[500px]:text-sm max-[350px]:min-w-28 px-2 border rounded border-gray-300 capitalize cursor-pointer hover:bg-white hover:scale-90"
      >
        {data?.tags[1]?.title}
      </span>
    );
  });

  const renderedImages = imageData.map((data) => {
    return (
      <div
        key={data.id}
        className="flex flex-col gap-2 w-[30%] max-[710px]:w-[45%] max-[360px]:w-[100%]"
      >
        <img
          src={data.urls.regular}
          alt={data.alt_description}
          className="w-full h-[250px] rounded object-cover cursor-pointer"
          onClick={() => {
            setIsImageDetailOpen(true);
            setImageDetail(data);
          }}
        />
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, idx) => {
            return (
              <span
                key={idx}
                className="px-2 py-[2px] bg-[#e9e7e7] text-[#767676] text-sm max-[950px]:text-[12px] max-[450px]:text-[10px] rounded-sm"
              >
                {tag.title}
              </span>
            );
          })}
        </div>
      </div>
    );
  });

  console.log(imageData);

  return (
    <>
      {isLoading ? (
        <div className="bg-white w-full flex justify-center pt-16 flex-grow">
          <Spinner
            color="blue.500"
            size="xl"
            emptyColor="gray.200"
            thickness="5px"
          />
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-between gap-2 p-6 bg-[#F5F5F5] text-[#767676] overflow-scroll overflow-x-auto max-[850px]:p-4 max-[500px]:p-3">
            {renderedRelatedTags}
          </div>
          <div className="flex justify-center flex-wrap gap-12 p-12 max-[1055px]:p-8 max-[1025px]:gap-8 max-[500px]:gap-6 max-[500px]:p-6 bg-white">
            {renderedImages}
          </div>
          {isImageDetailOpen && (
            <ImageDetails
              imageDetail={imageDetail}
              setIsImageDetailOpen={setIsImageDetailOpen}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ImageList;
