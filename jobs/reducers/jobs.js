// logic
import { createSlice } from '@reduxjs/toolkit';
import * as googleMaps from '../services/googleMaps';
import * as indeed from '../services/indeed';
import _ from 'lodash';

// gui
import { Alert } from 'react-native';

// helpers

const handleError = (err) => {
  console.log(err);
};

// redux

const slice = createSlice({
  name: 'jobs',
  initialState: { jobs: [], liked: [] },
  reducers: {
    setJobs(state, { payload }) {
      const jobs = payload;
      return { ...state, jobs: _.uniqBy(jobs, 'jobkey') };
    },
    setLiked(state, { payload }) {
      const liked = payload;
      return { ...state, liked: _.uniqBy(liked, 'jobkey') };
    }
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

export const likeJob = (job) => async (dispatch, getState) => {
  const { liked } = getState().jobs;
  dispatch(setLiked([...liked, job]));
}

export const clearLikedJobs = () => async (dispatch) => {
  dispatch(setLiked([]));
}

export const { setJobs, setLiked } = slice.actions;
export default slice.reducer;
