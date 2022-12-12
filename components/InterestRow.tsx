import React from "react";
import { BankType, InterestsType } from "../typings";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectBanks,
  setInterest,
  updateInterest,
} from "../slices/bank/bankSlice";
import { MenuItem, Select } from "@mui/material";

const InterestRow = ({ interest, index }: { interest: any; index: number }) => {
  const dispatch = useAppDispatch();
  const banks = useAppSelector(selectBanks);
  const bank = banks.find((b) => b.id === interest.bank_id);
  const otherInterests = bank?.interests.slice(0);
  otherInterests?.splice(index, 1);

  const disableCredit = (option: number) => {
    return (
      bank?.interests.filter(
        (interest2: InterestsType) => interest2.time_option === option
      ).length === 3 ||
      otherInterests?.filter(
        (otherInterests: InterestsType) =>
          otherInterests.credit_type === interest.credit_type &&
          otherInterests.time_option === option
      ).length === 1
    );
  };

  const disableTime = (option: number) => {
    return (
      bank?.interests.filter(
        (interest2: InterestsType) => interest2.credit_type === option
      ).length === 2 ||
      otherInterests?.filter(
        (otherInterest: InterestsType) =>
          otherInterest.time_option === interest.time_option &&
          otherInterest.credit_type === option
      ).length === 2
    );
  };

  const handleSave = () => {
    // dispatch(addInterest({ interest }));
  };

  return (
    <>
      <Select
        defaultValue={interest.credit_type}
        onChange={(e) =>
          dispatch(
            updateInterest(
              interest.bank_id,
              { credit_type: Number(e.target.value) },
              index
            )
          )
        }
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={1} disabled={disableCredit(1)}>
          Konut
        </MenuItem>
        <MenuItem value={2} disabled={disableCredit(2)}>
          Tüketici
        </MenuItem>
        <MenuItem value={3} disabled={disableCredit(3)}>
          Mevduat
        </MenuItem>
      </Select>

      <Select
        defaultValue={interest.credit_type}
        onChange={(e) =>
          dispatch(
            updateInterest(
              interest.bank_id,
              { credit_type: Number(e.target.value) },
              index
            )
          )
        }
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={1} disabled={disableCredit(1)}>
          Konut
        </MenuItem>
        <MenuItem value={2} disabled={disableCredit(2)}>
          Tüketici
        </MenuItem>
        <MenuItem value={3} disabled={disableCredit(3)}>
          Mevduat
        </MenuItem>
      </Select>
      <Select
        defaultValue={interest.credit_type}
        onChange={(e) =>
          dispatch(
            updateInterest(
              interest.bank_id,
              { credit_type: Number(e.target.value) },
              index
            )
          )
        }
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={1} disabled={disableCredit(1)}>
          Konut
        </MenuItem>
        <MenuItem value={2} disabled={disableCredit(2)}>
          Tüketici
        </MenuItem>
        <MenuItem value={3} disabled={disableCredit(3)}>
          Mevduat
        </MenuItem>
      </Select>
      <div className="w-full grid grid-cols-2 gap-2">
        <button
          className="w-full bg-green-500 border-2 border-green-600 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
          // disabled={!canSave}
          onClick={() => handleSave()}
        >
          Kaydet
        </button>
        <button
          className="w-full bg-red-500 border-2 border-red-600 text-white rounded-lg"
          // onClick={() => }
        >
          Sil
        </button>
      </div>
    </>
  );
};

export default InterestRow;
