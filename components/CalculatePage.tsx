import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectActiveTab, setActiveTab } from "../slices/main/mainSlice";
import { BankType } from "../typings";
import CreditInterest from "./Interest/CreditInterest";
import DepositInterest from "./Interest/DepositInterest";

const CalculatePage = ({ banks }: { banks: BankType[] }) => {
  const activeTab = useAppSelector(selectActiveTab);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="w-full h-full ">
        <div className="flex select-none cursor-pointer ml-3 mt-3 h-14 items-end">
          <div
            className={`border border-b-0 border-smooth-gray py-1 px-3 font-semibold flex items-center justify-center w-36 ${
              activeTab === "credit" ? "h-10 text-lg" : "h-8"
            }`}
            onClick={() => dispatch(setActiveTab("credit"))}
          >
            Kredi Faizi
          </div>
          <div
            className={`border border-b-0 border-smooth-gray py-1 px-3 font-semibold flex items-center justify-center w-36 ${
              activeTab === "deposit" ? "h-10 text-lg" : "h-8"
            }`}
            onClick={() => dispatch(setActiveTab("deposit"))}
          >
            Mevduat Faizi
          </div>
        </div>
        <hr />
        <div className="container mx-auto">
          {activeTab === "credit" ? (
            <CreditInterest banks={banks} />
          ) : (
            <DepositInterest deposit={banks} />
          )}
        </div>
      </div>
    </>
  );
};

export default CalculatePage;
