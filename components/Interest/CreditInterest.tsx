import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { time } from "console";
import React, { useState } from "react";
import { timeAndCredit } from "../../timeAndCredit";
import { BankType } from "../../typings";
import CreditAccordion from "../CreditAccordion";

const CreditInterest = ({ banks }: { banks: BankType[] }) => {
  const list = timeAndCredit;
  const [credit, setCredit] = useState<number>();
  const [time, setTime] = useState<number>();
  const [amount, setAmount] = useState<string>();
  const [interest, setInterest] = useState<any>({
    credit: 0,
    time: 0,
    amount: 0,
  });

  const filteredBanks = banks.filter((bank) => {
    return bank.interests.find(
      (interest) =>
        interest.credit_type === credit && interest.time_option === time
    );
  });

  const canSave = [credit, time, amount?.trim()].every((item) => item);
  return (
    <div className="flex justify-center flex-col w-4/6 mx-auto">
      <div className="w-full flex justify-center text-2xl font-semibold my-5 text-dark-purple">
        Uygun Kredi Faizi Bul
      </div>
      <div className="w-4/5 mx-auto grid grid-cols-4 gap-5">
        <FormControl fullWidth>
          <InputLabel id="time-option-label">Kredi Türü</InputLabel>
          <Select
            displayEmpty
            id="credit_type"
            inputProps={{ "aria-label": "Without label" }}
            className="w-full"
            label="Kredi Türü"
            value={credit}
            onChange={(e) => {
              setInterest((interest: any) => ({ ...interest, credit: 0 }));
              setCredit(Number(e.target.value));
            }}
          >
            <MenuItem value={1}>Konut Kredisi</MenuItem>
            <MenuItem value={2}>Tüketici Kredisi</MenuItem>
          </Select>
        </FormControl>

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
            disabled={!credit}
          >
            {Object.values(list)
              .find((item) => item.id === credit)
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
            label="Kredi Miktarı"
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
            setInterest((interest: any) => ({
              ...interest,
              credit,
              time,
              amount,
            }))
          }
          className="w-full flex items-center justify-center font-semibold rounded text-white bg-light-purple hover:bg-dark-purple disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Bul
        </button>
      </div>
      <div className="mx-auto mt-10 w-full">
        {interest.credit !== 0 &&
          interest.time !== 0 &&
          interest.amount !== 0 &&
          filteredBanks &&
          filteredBanks.map((bank, index) => {
            return (
              <div key={index}>
                <CreditAccordion
                  bank={bank}
                  amount={Number(interest.amount)}
                  time={interest.time}
                  timeName={
                    list[
                      Object.keys(list).find(
                        (key) =>
                          list[key as keyof typeof list].id === interest.credit
                      ) as keyof typeof list
                    ].time.find((item) => item.id === interest.time)?.name
                  }
                  credit={interest.credit}
                  creditName={
                    list[
                      Object.keys(list).find(
                        (key) =>
                          list[key as keyof typeof list].id === interest.credit
                      ) as keyof typeof list
                    ].name
                  }
                />
              </div>
            );
          })}
        {interest.time !== 0 &&
          interest.amount !== 0 &&
          filteredBanks.length === 0 && (
            <div className="text-center font-semibold text-xl text-dark-purple">
              Aradığınız şartlara uygun kredi veren banka bulunamadı.
            </div>
          )}
      </div>
    </div>
  );
};

export default CreditInterest;
