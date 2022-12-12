import axios from "../configs/axiosConfig";
// import axios from "axios";
import React from "react";
import AccordionComp from "../components/AccordionComp";
import BankAdd from "../components/BankAdd";
import { BankType } from "../typings";
import Cookies from "js-cookie";
import AlertDialog from "../components/AlertDialog";

export async function getServerSideProps(test: any) {
  const token = test.req.cookies.token;
  return await axios
    .get("banks", {
      withCredentials: true,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return {
        props: {
          banks: res.data,
          error: null,
        },
      };
    })
    .catch((err) => {
      return {
        props: {
          banks: [],
          error: "hata",
        },
      };
    });
}

const banks = ({
  banks,
  error,
}: {
  banks: { data: BankType[] };
  error: string;
}) => {
  if (error) {
    return <AlertDialog />;
  }
  return (
    <div>
      <BankAdd />
      <AccordionComp banks={banks.data} />
    </div>
  );
};

export default banks;
