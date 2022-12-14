import React from "react";
import AlertDialog from "../components/AlertDialog";
import CalculatePage from "../components/CalculatePage";
import axios from "../configs/axiosConfig";
import { BankType } from "../typings";

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

const Home = ({
  banks,
  error,
}: {
  banks: { data: BankType[] };
  error: string;
}) => {
  if (error) {
    return <AlertDialog />;
  }
  console.log(banks.data);
  return (
    <div className="w-full h-full bg-white flex justify-center items-center">
      <CalculatePage banks={banks.data} />
    </div>
  );
};

export default Home;
