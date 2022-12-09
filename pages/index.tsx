import React from "react";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import { selectLoggedInUser } from "../slices/login/loginSlice";

const Home = () => {
  const user = useAppSelector(selectLoggedInUser);
  console.log(user);
  return (
    <>
      <Header />
    </>
  );
};

export default Home;
