import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { GetListWithPagination, ServerError } from "@/api/types";
import { CreateEventType } from "@/types/event";
import { createEventApi, getEventDataAPI } from "@/api/event";
import { EventPayload } from "@/api/types/event";

interface Ievent {
  eventData: CreateEventType;
  availableEventData: GetListWithPagination<CreateEventType[]>;
}

// Define the initial state using that type

const initialState: Ievent = {
  availableEventData: {
    count: 0,
    next: undefined,
    previous: undefined,
    results: [],
  },
  eventData: {
    id: "",
    name: "",
    courseCategory: [{ slugName: "dummy", eventCategories: "dummy" }],
    description: "",
    location: "",
    courseUrl: "",
    isPrivateEvent: false,
    availableSpots: 1,
    perSpotCost: 0,
    isIncludeTransactionFeeInCost: false,
    isAddSalesTax: false,
    salesTaxPercent: 0,
    eventTypeAndScheduleId: "schedule",
    eventScheduledDateTime: [
      {
        id: 1,
        eventStartDate: "",
        eventStartTime: "",
        eventEndDate: "",
        eventEndTime: "",
      },
    ],
    eventCustomAvailability: [],
    defaultAvailability: null,
    requirements: "",
    cancellationPolicies: "",
    defaultWaiverSettings: null,
    customWaiverSettings: "",
    customQuestions: [
      {
        id: 1,
        fieldType: "ShortText",
        questionPromptLabel: "",
        answerRequired: true,
      },
    ],
    eventImage: "",
    achievementBadgeImage: "",
    publishStatus: true,
    isEventLive: false,
  },
};

export const createEventData = createAsyncThunk<
  CreateEventType,
  EventPayload,
  { state: RootState; rejectValue: ServerError }
>("createEventData", async (data, { rejectWithValue }) => {
  const res = await createEventApi(data);

  if (res.remote === "success") {
    return res.data;
  } else {
    return rejectWithValue(res?.error);
  }
});

export const getEventData = createAsyncThunk<
  GetListWithPagination<CreateEventType[]>,
  void,
  { state: RootState; rejectValue: ServerError }
>("getEventData", async (_, { rejectWithValue }) => {
  const res = await getEventDataAPI();
  // console.log(res.data);
  if (res.remote === "success") {
    return res.data;
  } else {
    return rejectWithValue(res.error);
  }
});

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent: (state, action) => {
      // console.log({ action });
      state.eventData = { ...state.eventData, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    // [createEventData.fulfilled]: (state, action) => {},
    // [createEventData.pending]: (state, action) => {},
    // [createEventData.rejected]: (state, action) => {},

    builder.addCase(getEventData.fulfilled, (state, action) => {
      state.availableEventData = action.payload;
    });
    // [getEventData.fulfilled]: (state, action) => {
    //   console.log(action.payload, "event payload");
    // },
  },
});

export const { createEvent } = eventSlice.actions;

export const availableEventData = (state: RootState) =>
  state.EventReducer.availableEventData;
export const eventData = (state: RootState) => state.EventReducer.eventData;
export default eventSlice.reducer;
