import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BreadcrumbState {
    breadcrumb: IBreadcrumbItem[];
}

const initialState: BreadcrumbState = {
    breadcrumb: [
        {
            href: "#",
            label: "Home",
            active: true,
        },
        {
            href: "#",
            label: "Dashboard",
            active: true,
        },
    ],
};

const breadcrumbSlice = createSlice({
    name: "breadcrumb",
    initialState,
    reducers: {
        setBreadcrumbData: (state, action: PayloadAction<any>) => {
            state.breadcrumb = action.payload;
        },
        clearBreadcrumb: (state) => {
            state.breadcrumb = [];
        }
    },
});

export const { setBreadcrumbData, clearBreadcrumb } = breadcrumbSlice.actions

export default breadcrumbSlice.reducer
