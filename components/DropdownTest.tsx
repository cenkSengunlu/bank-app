import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";
import { timeAndCredit } from "../timeAndCredit";

const DropdownTest = () => {
  const [credit, setCredit] = useState<number>();
  const [time, setTime] = useState<number>();
  const list = timeAndCredit;
  return (
    <>
      <Select
        placeholder="Seçiniz..."
        onChange={(e) => setCredit(Number(e.target.value))}
      >
        {Object.values(list).map((item, index) => {
          return (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          );
        })}
      </Select>

      <Select placeholder="Seçiniz..." disabled={!credit}>
        {Object.values(list).map((item, index) => {
          return (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          );
        })}
      </Select>
    </>
  );
};

export default DropdownTest;
