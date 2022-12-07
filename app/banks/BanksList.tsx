import axios from "axios";
import React from "react";
import { BankType } from "../../typings";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
  banks: BankType[];
}> = async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:81/api/banks",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzA0Mjk4OTcsImxldmVsIjoxLCJ1c2VySWQiOjEsInVzZXJuYW1lIjoicHJveG9sYWIifQ.V5Z9ldeWKR75QCuMgIf8MKQSRHnTWoaolRufo66T3ZU",
    },
  })
    .then(function (response) {
      console.log(JSON.parse(response.request.response));
      return JSON.parse(response.request.response);
    })
    .catch(function (err) {
      console.log(err.message);
    });
  const banks: BankType[] = response;
  return {
    props: {
      banks: banks,
    },
  };
};

export default function BanksList({
  banks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(banks);
  return (
    <>
      {/* {banks &&
        banks.map((bank, index) => {
          return <div key={index}>{bank.bank_name}</div>;
        })} */}
    </>
  );
}
