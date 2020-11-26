import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchApi} from "../request";
import {getEndpointName} from "../endpoints";

export const getProjects = createAsyncThunk("projects/getProjects", () => {
  return fetchApi(getEndpointName('projects'));
});
