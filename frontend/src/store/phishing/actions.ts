import { createAsyncThunk } from "@reduxjs/toolkit";

import { TPhishingProps } from "container/Home";
import axiosInstance from "libraries/axios";

export const phishingPost = createAsyncThunk(
  "phishing/post",
  async (body: TPhishingProps, { dispatch, rejectWithValue }) => {
    try {
      const { data } = (await axiosInstance.post(
        "/phishing/send",
        body
      )) as any;

      dispatch(phishingAttempts());

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const phishingAttempts = createAsyncThunk(
  "phishing/attempts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = (await axiosInstance.get("/phishing/attempts")) as any;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
