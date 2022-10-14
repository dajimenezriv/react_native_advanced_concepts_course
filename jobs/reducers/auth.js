// logic
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setToken(state, { payload }) {
      const token = payload;
      return { ...state, token };
    },
  },
});

export const googleLogin = (promptAsync) => async (dispatch) => {
  const res = await promptAsync();
  if (res.type === 'success') dispatch(setToken(res.authentication.accessToken));
  else if (res.type === 'dismiss') {}
};

export const logout = async (dispatch) => { dispatch(setToken(null)); }

export const { setToken } = slice.actions;
export default slice.reducer;
