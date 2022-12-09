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
    <header className="bg-blue-500 py-3 px-3 text-white flex justify-between">
      <div className="w-2/6 flex justify-evenly">
        <Link
          className="px-2 py-2 select-none hover:bg-light-white rounded-lg text-center"
          href="/hesaplama"
        >
          Hesaplama
        </Link>
        <Link
          className="px-2 py-2 select-none hover:bg-light-white rounded-lg text-center"
          href="/banka-ekle"
        >
          Banka Ekle
        </Link>
      </div>

      <div
        className="select-none mr-5 text-lg cursor-pointer"
        onClick={() => handleLogout()}
      >
        Çıkış Yap
      </div>
    </header>
  );
};

export default Header;
