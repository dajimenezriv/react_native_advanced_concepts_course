// logic
import { createSlice } from '@reduxjs/toolkit';
import * as googleMaps from '../services/googleMaps';
import * as indeed from '../services/indeed';

// gui
import { Alert } from 'react-native';

// helpers

const handleError = (err) => {
  console.log(err);
};

// redux

const slice = createSlice({
  name: 'jobs',
  initialState: { jobs: [] },
  reducers: {
    setJobs(state, { payload }) {
      const jobs = payload;
      return { ...state, jobs };
    },
  },
});

export const getJobs = (region, onComplete) => async (dispatch) => {
  try {
    const zipcode = await googleMaps.getZipcode(region);
    const { data } = await indeed.getJobs(zipcode);

    if (data.error) return Alert.alert(data.error);

    dispatch(setJobs(data));
    onComplete();
  } catch (err) { handleError(err); }
};

export const { setJobs } = slice.actions;
export default slice.reducer;
