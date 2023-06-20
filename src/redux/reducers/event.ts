/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { GetListWithPagination, ServerError } from "@/api/types";
import { CreateEventType } from "@/types/event";
import {
  createEventApi,
  getAllEventAPI,
  getEventDataAPI,
  getEventDetailAPI,
} from "@/api/event";
import { detailPayloadId, EventPayload } from "@/api/types/event";

interface Ievent {
  eventData: CreateEventType;
  availableEventData: GetListWithPagination<CreateEventType[]>;
  allEventData: GetListWithPagination<CreateEventType[]>;
  eventDetail: CreateEventType;
}

// Define the initial state using that type

const initialState: Ievent = {
  // @ts-ignore
  eventDetail: {},
  allEventData: { count: 0, next: undefined, previous: undefined, results: [] },
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
    defaultAvailability: 0,
    requirements: "",
    cancellationPolicies: "",
    defaultWaiverSettings: "default",
    customWaiverSettings: "",
    customQuestions: [
      {
        id: 1,
        fieldType: "ShortText",
        questionPromptLabel: "",
        answerRequired: true,
        paidUpgrade: "yes",
        upgradeCost: 0,
        answerData: [{ id: 1, description: "", upgradeCost: 0 }],
      },
    ],
    eventImage: "",
    achievementBadgeImage: "",
    publishStatus: true,
    isEventLive: false,
    instructorDetails: { id: 0 },
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

export const getAllEventData = createAsyncThunk<
  GetListWithPagination<CreateEventType[]>,
  void,
  { state: RootState; rejectValue: ServerError }
>("getAllEventData", async (_, { rejectWithValue }) => {
  const res = await getAllEventAPI();
  if (res.remote === "success") {
    return res.data;
  } else {
    return rejectWithValue(res.error);
  }
});

export const getEventDetail = createAsyncThunk<
  CreateEventType,
  detailPayloadId,
  { state: RootState; rejectValue: ServerError }
>("getEventDetail", async (id, { rejectWithValue }) => {
  const res = await getEventDetailAPI(id);
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
      state.eventData = { ...state.eventData, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getEventData.fulfilled, (state, action) => {
      state.availableEventData = action.payload;
    });

    builder.addCase(getAllEventData.fulfilled, (state, action) => {
      state.allEventData = action.payload;
    });

    builder.addCase(getEventDetail.fulfilled, (state, action) => {
      state.eventDetail = action.payload;
    });
  },
});

export const { createEvent } = eventSlice.actions;

export const availableEventData = (state: RootState) =>
  state.EventReducer.availableEventData;
export const eventData = (state: RootState) => state.EventReducer.eventData;
export default eventSlice.reducer;
