import Homepage from "@/Components/Homepage/Homepage";
import React, { useEffect } from "react";
import axios from "../utils/axiosInstance";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserInformation } from "@/features/user/userSlice";
import Head from "next/head";

const index = () => {
  return (
    <div>
      <Head>
        <title>Reddit Automation </title>
      </Head>
      <Homepage />
    </div>
  );
};

export default index;
