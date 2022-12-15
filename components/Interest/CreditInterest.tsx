import React, { useState } from "react";
import { BankType } from "../../typings";

const CreditInterest = ({ banks }: { banks: BankType[] }) => {
  return (
    <div>
      <div className="w-full flex justify-center text-2xl font-semibold mt-5">
        Uygun Kredi Faizi Bul
      </div>
    </div>
  );
};

export default CreditInterest;
