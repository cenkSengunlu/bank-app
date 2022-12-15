import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { watch } from "fs";
import React, { useState } from "react";
import { timeAndCredit } from "../../timeAndCredit";
import { BankType } from "../../typings";
import DepositAccordion from "../DepositAccordion";

const DepositInterest = ({ deposit }: { deposit: BankType[] }) => {
  const [time, setTime] = useState<number>();
  const [amount, setAmount] = useState<string>();
  const [interest, setInterest] = useState<any>({
    time: 0,
    amount: 0,
  });
  const list = timeAndCredit;

  // filter all banks with interest equal to time
  const filteredBanks = deposit.filter((bank) => {
    return bank.interests.find((interest) => interest.time_option === time);
  });
  console.log(filteredBanks);

  const canSave = [time, amount].every((item) => item !== undefined);
  return (
    <div className="flex justify-center flex-col w-4/6 mx-auto">
      <div className="w-full flex justify-center text-2xl font-semibold my-5 text-dark-purple">
        Mevduat Faizi Bul
      </div>
      <div className="w-4/5 mx-auto grid grid-cols-3 gap-5">
        <FormControl fullWidth>
          <InputLabel id="time-option-label">Vade</InputLabel>

          <Select
            displayEmpty
            id="time_option"
            inputProps={{ "aria-label": "Without label" }}
            className="w-full"
            label="Vade"
            value={time}
            onChange={(e) => {
              setInterest((interest: any) => ({ ...interest, time: 0 }));
              setTime(Number(e.target.value));
            }}
          >
            {Object.values(list)
              .find((item) => item.id === 3)
              ?.time.map((time, time_index) => {
                return (
                  <MenuItem value={time.id} key={time_index}>
                    {time.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <div className="w-full flex items-center">
          <TextField
            id="deposit"
            label="Yatırılacak Para"
            variant="outlined"
            className="w-full"
            value={amount}
            onChange={(e) => {
              setInterest((interest: any) => ({ ...interest, amount: 0 }));
              setAmount(e.target.value);
            }}
          />
        </div>
        <button
          disabled={!canSave}
          onClick={() =>
            setInterest((interest: any) => ({ ...interest, time, amount }))
          }
          className="w-full flex items-center justify-center font-semibold rounded text-white bg-light-purple hover:bg-dark-purple disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Bul
        </button>
      </div>
      <div className="mx-auto mt-10 w-full">
        {interest.time !== 0 &&
          interest.amount !== 0 &&
          filteredBanks &&
          filteredBanks.map((bank, index) => {
            return (
              <div key={index}>
                <DepositAccordion
                  bank={bank}
                  amount={Number(interest.amount)}
                  time={interest.time}
                  timeName={
                    list.deposit.time.find((item) => item.id === interest.time)
                      ?.name
                  }
                />
              </div>
            );
          })}
        {interest.time !== 0 &&
          interest.amount !== 0 &&
          filteredBanks.length === 0 && (
            <div className="text-center font-semibold text-xl text-dark-purple">
              Bu vade için banka bulunamadı!
            </div>
          )}
      </div>
    </div>
  );
};

export default DepositInterest;
