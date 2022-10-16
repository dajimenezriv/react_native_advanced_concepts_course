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

const getUnique = (list, key='jobkey') => {
  const uniqueKeys = list
    .map(item => item[key])
    .filter((value, index, self) => self.indexOf(value) === index)
  return list.filter((item) => uniqueKeys.includes(item[key]))
};

// redux

const slice = createSlice({
  name: 'jobs',
  initialState: { jobs: [], liked: [] },
  reducers: {
    setJobs(state, { payload }) {
      const jobs = payload;
      return { ...state, jobs: getUnique(jobs) };
    },
    setLiked(state, { payload }) {
      const liked = payload;
      return { ...state, liked: getUnique(liked) };
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

export const { setJobs, setLiked } = slice.actions;
export default slice.reducer;
