import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { GetListWithPagination, ServerError } from "@/api/types";
import { CreateEventType, getEventType } from "@/types/event";
import {
  createEventApi,
  getAllEventAPI,
  getEventDataAPI,
  getEventDetailAPI,
  getOwnEventDetailAPI,
  updateOwnEventDetailAPI,
  updateOwnEventRequirementAPI,
  updateOwnEventTypeScheduleAPI,
} from "@/api/event";
import {
  detailPayloadId,
  EventPayload,
  updateEventDetailPayload,
  updateEventTypeScheduleType,
  updateOwnEventQuestionAndRequirementType,
} from "@/api/types/event";

interface Ievent {
  eventId: string;
  eventData: CreateEventType;
  availableEventData: GetListWithPagination<CreateEventType[]>;
  allEventData: GetListWithPagination<CreateEventType[]>;
  eventDetail: getEventType;
  eventCreated: string;
  eventCreatedError?: object;
  ownEventDetail: getEventType;
}
export const initialEventDetail: getEventType = {
  achievementBadgeImage: null,
  availableSpots: 0,
  cancellationPolicies: "",
  openAvailabilityPeriod: null,
  openAvailabilityPeriodUnit: null,
  scheduleEventPeriod: null,
  scheduleEventPeriodUnit: null,
  courseCategory: [{ event_categories: "", slug_name: "" }],
  courseUrl: "",
  customQuestions: [
    {
      answerData: [
        { value: "", label: "", id: 0, upgradeCost: 0, description: "" },
      ],
      answerRequired: false,
      fieldType: "",
      id: 0,
      paidUpgrade: "",
      questionPromptLabel: "",
      upgradeCost: 0,
      costPerGuest: "",
      maxGuest: 0,
    },
  ],
  customWaiverSettings: "",
  defaultAvailability: null,
  defaultWaiverSettings: "",
  description: "",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  eventCustomAvailability: [{}],
  eventImage: null,
  eventScheduledDateTime: [
    {
      eventEndDate: "",
      eventEndTime: "",
      eventStartDate: "",
      eventStartTime: "",
    },
  ],
  eventTypeAndScheduleId: "",
  id: 0,
  instructorDetails: {
    bio: "",
    email: "",
    first_name: "",
    id: 0,
    last_name: "",
    phone_number: null,
    profile_image: null,
    user_roles: "",
    username: "",
  },
  isAddSalesTax: false,
  isEventLive: false,
  location: "",
  name: "",
  perSpotCost: 0,
  publishStatus: false,
  requirements: "",
  salesTaxPercent: 0,
};

// Define the initial state using that type
const initialEventData = {
  id: "",
  name: "",
  courseCategory: [],
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
  // eventScheduleSpan: {
  //   scheduleAvailabilityPeriod: 1,
  //   scheduleAvailabilityPeriodUnit: "hours",
  // },
  eventOpenSpan: {
    openAvailabilityPeriodUnit: "hours",
    openAvailabilityPeriod: 1,
  },

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
  instructorDetails: {
    bio: "",
    email: "",
    firstName: "",
    id: 0,
    lastName: "",
    phoneNumber: null,
    profileImage: null,
    userRoles: "",
    username: "",
  },
};

const initialState: Ievent = {
  eventCreated: "",
  eventId: "0",
  ownEventDetail: initialEventDetail,
  eventCreatedError: {},
  eventDetail: initialEventDetail,
  allEventData: { count: 0, next: undefined, previous: undefined, results: [] },
  availableEventData: {
    count: 0,
    next: undefined,
    previous: undefined,
    results: [],
  },
  eventData: initialEventData,
};

export const createEventData = createAsyncThunk<
  getEventType,
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
  GetListWithPagination<getEventType[]>,
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
  GetListWithPagination<getEventType[]>,
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
  getEventType,
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

export const getOwnEventDetail = createAsyncThunk<
  getEventType,
  detailPayloadId,
  { state: RootState; rejectValue: ServerError }
>("getOwnEventDetail", async (id, { rejectWithValue }) => {
  const res = await getOwnEventDetailAPI(id);
  if (res.remote === "success") {
    // console.log(res.data, "update response");
    return res.data;
  } else {
    // console.log(res.error);
    return rejectWithValue(res.error);
  }
});

// export const updateOwnEventDetail = createAsyncThunk<
//   getEventType,
//   updateEventDetailPayload,
//   { state: RootState; rejectValue: ServerError }
// >("updateOwnEventDetail", async (payload, { rejectWithValue }) => {
//   const res = await updateOwnEventDetailAPI(payload);
//   if (res.remote === "success") {
//     return res.data;
//   } else {
//     return rejectWithValue(res.error);
//   }
// });

export const updateOwnEventTypeSchedule = createAsyncThunk<
  getEventType,
  updateEventTypeScheduleType,
  { state: RootState; rejectValue: ServerError }
>("updateOwnEventTypeSchedule", async (payload, { rejectWithValue }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res = await updateOwnEventTypeScheduleAPI(payload);
  if (res.remote === "success") {
    return res.data;
  } else {
    return rejectWithValue(res.error);
  }
});

// export const updateOwnEventQuestionAndRequirement = createAsyncThunk<
//   getEventType,
//   updateOwnEventQuestionAndRequirementType,
//   { state: RootState; rejectValue: ServerError }
// >(
//   "updateOwnEventQuestionAndRequirement",
//   async (payload, { rejectWithValue }) => {
//     console.log(payload, "my payload");
//     const res = await updateOwnEventRequirementAPI(payload);
//     if (res.remote === "success") {
//       return res.data;
//     } else {
//       return rejectWithValue(res.error);
//     }
//   }
// );

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    resetEventData: (state) => {
      state.eventData = { ...initialEventData };
    },
    resetEventError: (state) => {
      state.eventCreatedError = {};
      state.eventCreated = "";
    },
    createEvent: (state, action) => {
      state.eventData = { ...state.eventData, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getEventData.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.availableEventData = action.payload;
    });

    builder.addCase(getAllEventData.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.allEventData = action.payload;
    });

    builder.addCase(getEventDetail.fulfilled, (state, action) => {
      state.eventDetail = action.payload;
    });

    builder.addCase(createEventData.fulfilled, (state, action) => {
      state.eventCreated = "success";
    });
    builder.addCase(createEventData.pending, (state, action) => {
      state.eventCreated = "pending";
    });
    builder.addCase(createEventData.rejected, (state, action) => {
      state.eventCreated = "rejected";
      state.eventCreatedError = action.payload;
    });

    builder.addCase(getOwnEventDetail.fulfilled, (state, action) => {
      state.ownEventDetail = action.payload;
    });
    builder.addCase(getOwnEventDetail.rejected, (state, action) => {
      state.eventCreated = "rejected";
    });
  },
});

export const { createEvent, resetEventError, resetEventData } =
  eventSlice.actions;

export const availableEventData = (state: RootState) =>
  state.EventReducer.availableEventData;
export const eventData = (state: RootState) => state.EventReducer.eventData;
export default eventSlice.reducer;
