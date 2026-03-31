import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { boardApi } from "services/modules/boardApi";
import type { RootState } from "store";
import type { TicketForm } from "types/globalTypes";


interface TicketSliceState {
  list : TicketForm[]
}
const initialState : TicketSliceState = {
  list : [],
}
export const fetchTickets = createAsyncThunk("ticket/getTickets", async () => {
  const response = await boardApi.fetch();
  return response ?? [];
});

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    // 
  },
  extraReducers(builder) {
    builder
          .addCase(fetchTickets.fulfilled, (state,action) => {
              state.list =action.payload
          })
  }
});

export const getAllTickets = (state: RootState) => state.ticket.list;

export default ticketSlice.reducer;
