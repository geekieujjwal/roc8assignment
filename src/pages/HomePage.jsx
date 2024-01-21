import React, { useContext, useState } from "react";
import BackgroundImage from "../utils/BackgroundImage";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ImageList from "../components/ImageList";
import { ImageContext } from "../Context/Context";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../lib/helper/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const HomePage = () => {
  // const customTheme = {
  //   evenDarker: {
  //     colors: {
  //       brandButtonText: "white",
  //       defaultButtonBackground: "#1e1e1e",
  //       defaultButtonBackgroundHover: "#2e2e2e",
  //       //..
  //     },
  //   },
  // };

  const LoginFlow = () => (
    <Auth
      supabaseClient={supabase}
      providers={["github"]}
      theme="default"
      appearance={{
        theme: ThemeSupa,
        style: {
          button: { color: "black", border: "1px solid gray" },
          anchor: { color: "#5ebbfb" },
          //..
        },
      }}
    />
  );

  const { imageData, resultTerm } = useContext(ImageContext);
  const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   const session = supabase.auth.session();
  //   console.log(session);
  // });

  console.log(supabase);

  return (
    <div className="text-white flex flex-col items-center pt-10 max-[300px]:pt-6 min-h-screen">
      <Header setIsLogin={setIsLogin} />
      {!imageData.length && (
        <h1 className="font-bold text-6xl max-[750px]:text-5xl max-[500px]:text-4xl px-8 text-center pt-16 max-[500px]:pt-12">
          Discover over 2,000,000
          <br /> free Stock Images
        </h1>
      )}
      <SearchBar />
      {!imageData.length && (
        <div className="font-normal bg-[#d9d9d91d] py-2 max-[500px]:py-1 px-4 rounded custom mt-4 backdrop-blur-lg text-sm max-[500px]:text-[12px] max-[300px]:text-[8px]">
          <span className="font-medium">Trending</span>: flowers, love, forest,
          river
        </div>
      )}
      {imageData.length ? (
        <h2 className="capitalize text-[42px] font-bold my-12 text-center max-[500px]:text-3xl">
          Results: {resultTerm}
        </h2>
      ) : (
        ""
      )}
      {imageData.length ? <ImageList imageData={imageData} /> : ""}
      {isLogin && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-white text-black px-5 w-[40%] py-10 rounded-lg">
            <LoginFlow />
          </div>
        </div>
      )}
      <BackgroundImage />
    </div>
  );
};

export default HomePage;
