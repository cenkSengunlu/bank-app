import axios from "../configs/axiosConfig";
import React from "react";
import { BankType } from "../typings";
import AccordionComp from "../components/AccordionComp";

export async function getServerSideProps() {
  return await axios
    .get("banks")
    .then((res) => {
      return {
        props: {
          banks: res.data,
        },
      };
    })
    .catch((err) => {
      return {
        redirect: {
          destination: "/login",
        },
      };
    });
}

const banks = ({ banks }: any) => {
  console.log(banks);
  return (
    <div>
      <h1>Bank List</h1>
      <AccordionComp banks={banks.data} />
    </div>
  );
};

export default banks;
