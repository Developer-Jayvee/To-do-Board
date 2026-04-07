import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { boardApi } from "services/modules/boardApi";
import type { RootState } from "store";
import { setLoading } from "store/module/ModuleSlice";
import type {
  TicketFormTypes,
  TicketForm,
  TicketFormPartial,
  ProgressFormData,
  CategoryForm,
  CategoryReturnForm,
} from "types/globalTypes";

interface TicketSliceState {
  list: CategoryReturnForm[];
  loading: boolean;
}
const initialState: TicketSliceState = {
  list: [],
  loading: false,
};
export const fetchTickets = createAsyncThunk("ticket/getTickets", async () => {
  const response = await boardApi.fetch();
  return response ?? [];
});
export const updateTicket = createAsyncThunk<
  TicketForm,
  { id: number; data: TicketFormPartial }
>("tickets/updateTicket", async ({ id, data },{dispatch }) => {
  try {
    
    dispatch(setLoading(true))
    const response = await boardApi.update(id, data)
    dispatch(setLoading(false))
    
    return response ?? [];
    
  } catch (error) {
    dispatch(setLoading(false))
  }
});

export const createTicket = createAsyncThunk<TicketForm, TicketFormTypes>(
  "tickets/createTicket",
  async (formData) => {
    const response = await boardApi.create(formData);
    return response ?? "";
  },
);
export const updateTicketProgress = createAsyncThunk(
  "ticket/updateTicketProgress",
  async ({ id, formData }: ProgressFormData) => {
    const response = await boardApi.progress({ id: id, formData: formData });

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
      .addCase(fetchTickets.pending,(state,action) => {
        state.loading = true
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false
        
        state.list = action.payload;
      })
      .addCase(updateTicket.pending,(state) => {
        state.loading = true
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.loading = false
        const id = action.payload.id;

        const categoriesWithoutTicket = state.list.map( (item : CategoryReturnForm) => ({
          ...item,
          tickets: item.tickets.filter( ticket => ticket.id !== id)
        }));
        
        state.list = categoriesWithoutTicket.map( (item : CategoryReturnForm) => {
            if(item.id === action.payload.category_id){
                return {
                  ...item,
                  tickets:[
                    ...item.tickets,
                    action.payload
                  ]
                }
            }
            return item;
        })
      })
      .addCase(createTicket.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        const categoryID = action.payload.category_id;
        state.list = state.list.map((val: CategoryReturnForm) => {
          if (val.id === categoryID) {
            return {
              ...val,
              tickets: [...val.tickets, action.payload],
            };
          }
          return val;
        });
      })
      .addCase(updateTicketProgress.pending,(state,action) => {
        state.loading = true
      })
      .addCase(updateTicketProgress.fulfilled, (state, action) => {
        state.loading = false
        const ticketID = action.payload.id;
        state.list = state.list.map((val: CategoryReturnForm) => {
          return {
            ...val,
            tickets: val.tickets.map((data: TicketForm) => {
              return data.id === ticketID ? action.payload : data;
            }),
          };
        });
      });
  },
});

export const getAllTickets = (state: RootState) => state.ticket.list;
export default ticketSlice.reducer;
