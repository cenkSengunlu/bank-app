import Link from "next/link";
import React from "react";
import Router from "next/router";
import Cookies from "js-cookie";

const Header = () => {
  const user = Cookies.get("token");
  const handleLogout = () => {
    Cookies.remove("token");
    Router.push("/login");
  };
  return (
    <>
      {user && (
        <header className="bg-primary-purple py-3 px-3 text-white flex justify-between items-center space-x-5 font-semibold">
          <div className="flex items-center space-x-5">
            <Link href="/">
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
              className="select-none mr-5 text-lg cursor-pointer px-2 py-2 hover:bg-light-white rounded-lg"
              onClick={() => handleLogout()}
            >
              Çıkış Yap
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
