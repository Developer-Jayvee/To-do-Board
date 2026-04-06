import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "store";

interface ModuleState {
    isLoading : boolean;
}

const initialState : ModuleState = {
    isLoading : false
}

const moduleSlice = createSlice({
    name:"module",
    initialState,
    reducers: {
        setLoading : (state,action) => {
            state.isLoading = action.payload;
        }
    }
})

export const isLoading = (state: RootState) => state.module;
export const { setLoading } = moduleSlice.actions

export default moduleSlice.reducer;