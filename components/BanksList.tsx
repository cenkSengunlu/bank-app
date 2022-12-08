import axios from "axios";
import React from "react";
import { BankType } from "../typings";

const BankList = ({ banks }: { banks: BankType[] }) => {
  // const banks = await getBanks();
  console.log(banks);
  return (
    <>
      {banks &&
        banks.map((bank: BankType, index: number) => {
          return <div key={index}>{bank.bank_name}</div>;
        })}
    </>
  );
};

export default BankList;
