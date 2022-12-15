import React, { useState } from "react";
import { BankType, InterestsType } from "../typings";
import { timeAndCredit } from "../timeAndCredit";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addInterest,
  deleteBank,
  deleteInterest,
} from "../slices/bank/bankSlice";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";

const InterestRow = ({
  rowIndex,
  control,
  watch,
  register,
  bank,
  bankRemove,
  setExpand,
}: any) => {
  const dispatch = useAppDispatch();
  const list = timeAndCredit;
  const [rend, setRend] = useState<boolean>(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `banks[${rowIndex}].interests`,
  });
  const handleAppend = () => {
    append({
      bank_id: bank.id,
      interest: 0,
      time_option: "",
      credit_type: "",
    });
  };

  const handleDelete = (bank: BankType) => {
    bankRemove(rowIndex);
    dispatch(deleteBank(bank.id));
    setExpand("");
  };

  const handleInterestDelete = (index: number, interest: any) => {
    console.log({ index, interest });
    if (interest._id) {
      dispatch(deleteInterest(interest._id, interest.bank_id));
    }
    setRend(true);
    remove(index);
    setTimeout(() => {
      setRend(false);
    }, 1);
  };

  const handleSave = (index: number) => {
    const interest = watch(`banks[${rowIndex}].interests[${index}]`);
    console.log(interest);
    dispatch(addInterest({ ...interest }));
  };
  console.log(fields);

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        <div className="w-full flex justify-center items-center">Tür</div>
        <div className="w-full flex justify-center items-center">Vade</div>
        <div className="w-full flex justify-center items-center">
          Aylık Faiz Oranı
        </div>
        <div className="w-full grid grid-cols-2 gap-1">
          <button
            disabled={fields.length === 7}
            onClick={handleAppend}
            className="cursor-pointer bg-light-purple border-2  rounded-lg w-full h-10 flex justify-center items-center text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Faiz Ekle
          </button>
          <button
            onClick={() => {
              handleDelete(bank);
            }}
            className="cursor-pointer bg-red-500 border-2 border-red-600 rounded-lg w-full h-10 flex justify-center items-center text-white text-sm"
          >
            Bankayı Sil
          </button>
        </div>
      </div>
      <hr className="mt-3 mb-2" />
      <div>
        {!rend &&
          fields.map((interest, index) => (
            <div key={index} className="grid grid-cols-4 gap-5 items-center">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  displayEmpty
                  defaultValue={watch(
                    `banks[${rowIndex}].interests[${index}].credit_type`
                  )}
                  {...register(
                    `banks[${rowIndex}].interests[${index}].credit_type`,
                    {
                      required: "Kredi Tipi Seçiniz",
                    }
                  )}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {Object.values(list).map((credit, credit_index) => {
                    return (
                      <MenuItem
                        value={credit.id}
                        key={credit_index}
                        disabled={
                          fields.filter(
                            (val: any) => val.credit_type === credit.id
                          ).length === credit.time.length
                        }
                      >
                        {credit.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  displayEmpty
                  defaultValue={watch(
                    `banks[${rowIndex}].interests[${index}].time_option`
                  )}
                  {...register(
                    `banks[${rowIndex}].interests[${index}].time_option`,
                    {
                      required: "Vade Türü Seçiniz",
                    }
                  )}
                  inputProps={{ "aria-label": "Without label" }}
                  disabled={
                    watch(
                      `banks[${rowIndex}].interests[${index}].credit_type`
                    ) === ""
                  }
                >
                  {Object.values(list)
                    .find(
                      (item) =>
                        item.id ===
                        watch(
                          `banks[${rowIndex}].interests[${index}].credit_type`
                        )
                    )
                    ?.time.map((time, time_index) => {
                      return (
                        <MenuItem
                          value={time.id}
                          key={time_index}
                          disabled={
                            fields.filter(
                              (val: any) => val.time_option === time.id
                            ).length === 1
                          }
                        >
                          {time.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                {...register(
                  `banks[${rowIndex}].interests[${index}].interest`,
                  {
                    required: "Faiz Giriniz",
                  }
                )}
              />
              <div className="w-full grid grid-cols-2 gap-1">
                <button
                  disabled={
                    bank.interests[index] ||
                    watch(
                      `banks[${rowIndex}].interests[${index}].credit_type`
                    ) === 0 ||
                    watch(
                      `banks[${rowIndex}].interests[${index}].time_option`
                    ) === 0 ||
                    watch(`banks[${rowIndex}].interests[${index}].interest`) ===
                      0
                  }
                  onClick={() => handleSave(index)}
                  className="cursor-pointer font-bold bg-smooth-green border-2 border-green-600 rounded-lg w-full h-10 flex justify-center items-center text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  KAYDET
                </button>
                <button
                  onClick={() => handleInterestDelete(index, interest)}
                  className="cursor-pointer font-bold bg-red-500 border-2 border-red-600 rounded-lg w-full h-10 flex justify-center items-center text-white text-sm"
                >
                  SİL
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default InterestRow;
