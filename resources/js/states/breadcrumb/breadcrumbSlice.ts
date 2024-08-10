import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BreadcrumbState {
  breadcrumb: any;
  error: string | null;
  isLoading: boolean;
  isDataFetched: boolean;
}

const initialState: BreadcrumbState = {
  breadcrumb: [],
  error: null,
  isLoading: false,
  isDataFetched: false,
};

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    resetDataFetched: (state) => {
      state.isDataFetched = false;
    },
    setBreadcrumb: (state, action: PayloadAction<any>) => {
      state.breadcrumb = action.payload;
    },
    clearBreadcrumb: (state) => {
      state.breadcrumb = [];
    }
  },
});

export const { resetDataFetched, setBreadcrumb, clearBreadcrumb } = breadcrumbSlice.actions

export default breadcrumbSlice.reducer
