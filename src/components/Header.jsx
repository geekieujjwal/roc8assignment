import React, { useEffect, useState } from "react";

const Header = ({ setIsLogin }) => {
  const [authToken, setAuthToken] = useState(() =>
    JSON.parse(localStorage.getItem("sb-zdyunzovdenqqlqlwxpp-auth-token"))
  );
  const [userName, setUserName] = useState(
    authToken?.user?.user_metadata?.user_name
  );

  useEffect(() => {
    const user_name = authToken?.user?.user_metadata?.user_name;
    setUserName(user_name);
  }, [authToken]);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuthToken(null);
  };

  return (
    <div className="flex justify-between items-center gap-2 bg-[#d9d9d91d] custom py-4 max-[300px]:py-3 px-8 max-[500px]:px-4 max-[340px]:text-sm font-medium w-[90%] rounded backdrop-blur-lg">
      <span>Homepage</span>
      {!authToken ? (
        <div className="flex items-center gap-6 max-[500px]:gap-4 max-[300px]:gap-2 max-[300px]:text-[10px]">
          <span className="cursor-pointer" onClick={handleLogin}>
            Login
          </span>
          <div className="flex gap-6">
            <span className="border-2 border-white rounded px-1">
              Create Account
            </span>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 max-[310px]:gap-2 items-center">
          <span className="max-[390px]:hidden">{userName}</span>
          <span
            className="cursor-pointer border-2 border-white rounded px-1"
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
