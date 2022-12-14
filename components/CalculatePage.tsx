import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectActiveTab, setActiveTab } from "../slices/main/mainSlice";
import CreditInterest from "./Interest/CreditInterest";
import DepositInterest from "./Interest/DepositInterest";

const CalculatePage = () => {
  const activeTab = useAppSelector(selectActiveTab);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="w-5/6 h-5/6 m-12 mb-12 pb-12 border-2 border-black rounded-lg">
        <div className="w-full flex items-center space-x-5 h-14 bg-blue-500 rounded-t-lg pl-5">
          <div
            className="hover:bg-light-white rounded-lg select-none cursor-pointer p-2 w-32 text-center text-white font-bold"
            onClick={() => dispatch(setActiveTab("credit"))}
          >
            Kredi Faizi
          </div>
          <div
            className="hover:bg-light-white rounded-lg select-none cursor-pointer p-2 w-32 text-center text-white font-bold"
            onClick={() => dispatch(setActiveTab("deposit"))}
          >
            Mevduat Faizi
          </div>
        </div>
        <div>
          {activeTab === "credit" ? (
            <CreditInterest />
          ) : activeTab === "deposit" ? (
            <DepositInterest />
          ) : (
            <div>Seçim yapmadınız</div>
          )}
        </div>
      </div>
    </>
  );
};

export default CalculatePage;
