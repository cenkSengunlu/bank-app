import axios from "axios";
import React from "react";
import BanksList from "../components/BanksList";
import { BankType } from "../typings";

export async function getServerSideProps() {
  const res = await axios({
    method: "get",
    url: "http://localhost:81/api/banks",
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzA0OTI5NzUsImxldmVsIjoxLCJ1c2VySWQiOjEsInVzZXJuYW1lIjoicHJveG9sYWIifQ.pZuiPWWNlDxGqFHytdSuM9utGAwuW8PZXOmGsfw3NBg",
    },
  }).catch((err) => {
    // logine yolla redirection
    return {
      data: {
        data: [],
      },
    };
  });
  console.log(res.data);
  return {
    props: {
      banks: res.data,
    },
  };
}

const banks = ({ banks }: any) => {
  console.log(banks);
  return (
    <div>
      <h1>Bank List</h1>
      <BanksList banks={banks.data} />
    </div>
  );
};

export default banks;
