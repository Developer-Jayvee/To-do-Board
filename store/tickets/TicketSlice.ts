import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { boardApi } from "services/modules/boardApi";
import type { RootState } from "store";
import type {
  TicketFormTypes,
  TicketForm,
  TicketFormPartial,
} from "types/globalTypes";

interface TicketSliceState {
  list: TicketForm[];
  loading:boolean;
}
const initialState: TicketSliceState = {
  list: [],
  loading:false
};
export const fetchTickets = createAsyncThunk("ticket/getTickets", async () => {
  const response = await boardApi.fetch();
  return response ?? [];
});
export const updateTicket = createAsyncThunk<
  TicketForm,
  { id: number; data: TicketFormPartial }
>("tickets/updateTicket", async ({ id, data }) => {
  const response = await boardApi.update(id, data);
  return response ?? [];
});
export const createTicket = createAsyncThunk<TicketForm, TicketFormTypes>(
  "tickets/createTicket",
  async (formData) => {
    const response = await boardApi.create(formData);
    return response ?? "";
  },
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    //
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const id = action.payload.id;
        const ticketID = state.list.findIndex((val: any) => val.id === id);
        state.list = {
          ...state.list,
          [ticketID]: action.payload,
        };
      })
      .addCase(createTicket.pending,(state,action) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload)
      });
  },
});

export const getAllTickets = (state: RootState) => state.ticket.list;

export default ticketSlice.reducer;
