import React from "react";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="w-full h-full bg-green-500 flex justify-center items-center mt-12">
        <div className="text-xl font-bold text-white py-5">Ana Sayfa</div>
      </div>
    </>
  );
};

export default Home;
