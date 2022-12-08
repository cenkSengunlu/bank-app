import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 py-3 px-3 text-white">
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
    </header>
  );
};

export default Header;
