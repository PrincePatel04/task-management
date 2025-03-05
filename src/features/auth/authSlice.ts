import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
    clearLocalStorage,
    getLocalStorage,
    setLocalStorage,
} from "../../shared/util/utility";
import { AuthData } from "./auth.interface";

const initialState: AuthData = getLocalStorage("authData") || {};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (_, action: PayloadAction<AuthData>) => {
            setLocalStorage("authData", action.payload);
            return action.payload;
        },
        clearAuthData: () => {
            clearLocalStorage();
            return {} as AuthData;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
