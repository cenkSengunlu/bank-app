import Link from "next/link";
import React from "react";
import { useAppDispatch } from "../app/hooks";
import { logoutUser } from "../slices/login/loginSlice";
import Router from "next/router";

const Header = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    Router.push("/login");
  };
  return (
    <header className="bg-blue-500 py-3 px-3 text-white flex justify-between items-center space-x-5">
      <div className="flex items-center space-x-5">
        <div className="select-none text-xl font-bold">Bank-App</div>

        <Link href="/hesaplama">
          <div className="px-2 py-2 select-none hover:bg-light-white rounded-lg cursor-pointer text-center text-lg">
            Hesaplama
          </div>
        </Link>
        <Link href="/banks">
          <div className="px-2 py-2 select-none hover:bg-light-white rounded-lg cursor-pointer text-center text-lg">
            Banka Ekle
          </div>
        </Link>
      </div>

      <div>
        <div
          className="select-none mr-5 text-lg cursor-pointer px-2 py-2 select-none hover:bg-light-white rounded-lg"
          onClick={() => handleLogout()}
        >
          Çıkış Yap
        </div>
      </div>

      {/* <div className="w-2/6 flex justify-evenly">
        <Link href="/hesaplama">
          <div className="px-2 py-2 select-none hover:bg-light-white rounded-lg cursor-pointer text-center text-lg">
            Hesaplama
          </div>
        </Link>
        <Link href="/banks">
          <div className="px-2 py-2 select-none hover:bg-light-white rounded-lg cursor-pointer text-center text-lg">
            Banka Ekle
          </div>
        </Link>
      </div>

      <div
        className="select-none mr-5 text-lg cursor-pointer px-2 py-2 select-none hover:bg-light-white rounded-lg"
        onClick={() => handleLogout()}
      >
        Çıkış Yap
      </div> */}
    </header>
  );
};

export default Header;
