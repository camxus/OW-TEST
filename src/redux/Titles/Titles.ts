import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTitleData } from "@src/orbitalwitness/api/titles";
import { Title } from "@src/utility/types";
import { handleSort } from "@src/orbitalwitness/components/DataTable/sort";

type IState = {
  titles: Title[];
  sortedTitles: Title[];
  selectedTitle: Title;
};
const initialState = {
  titles: [],
  sortedTitles: [],
  selectedTitle: {},
};

export const LabelingPageSlice = createSlice({
  name: "labeling_page",
  initialState,
  reducers: {
    setSelectedTitle: (state: IState, action) => {
      state.selectedTitle = action.payload;
    },
    setTitles: (state: IState, action) => {
      state.titles = action.payload;
    },
    setSortedTitles: (state: IState, action) => {
      state.sortedTitles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTitles.fulfilled, (state: any, action: any) => {
      // Add documents to the state knowledgebases.
      state.titles = action.payload;
    });
  },
});

export const { setSelectedTitle, setTitles, setSortedTitles } = LabelingPageSlice.actions;

export default LabelingPageSlice.reducer;

// async thunk -- side effects
export const getTitles = createAsyncThunk("titles", async (arg: any) => {
  const { params, dispatch, setSearchParams } = arg;
  const { data } = await getTitleData();

  return params && dispatch && setSearchParams
    ? handleSort("init", data, params, dispatch, setSearchParams)
    : data;
});
