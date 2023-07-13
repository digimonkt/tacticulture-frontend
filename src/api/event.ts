import { ErrorResult, GetListWithPagination, SuccessResult } from "./types";
import axiosInstance from "./axiosInstance";
import {
  detailPayloadId,
  EventCategory,
  EventPayload,
  EventResponse,
  GetBookedEventResponse,
  GetEventCategoryResponse,
  GetEventResponse,
  updateEventDetailPayload,
  updateEventTypeSchedulePayload,
  updateOwnEventQuestionAndRequirementType,
} from "./types/event";
import {
  transformGetBookedEventApiResponse,
  transformGetEventAPIResponse,
  transformGetEventCategoriesAPIResponse,
  transformUpdateEventDetailPayload,
  transformUpdateEventQuestionAndRequirementPayload,
  transformUpdateEventTypeSchedulePayload,
} from "./transform/event";
import { getEventType, bookedEventType } from "@/types/event";
// import { getBookingType } from "@/types/booking";

// fetch event categories  List
export const eventCategoriesList = async (): Promise<
  SuccessResult<GetListWithPagination<EventCategory[]>> | ErrorResult
> => {
  const response = await axiosInstance.request<GetEventCategoryResponse>({
    url: "/events/categories/",
    method: "GET",
  });

  if (response.remote === "success") {
    return {
      remote: "success",
      data: {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        results: response.data.results.map((result) =>
          transformGetEventCategoriesAPIResponse(result)
        ),
      },
    };
  }
  return response;
};

export const createEventApi = async (
  data: EventPayload
): Promise<SuccessResult<getEventType> | ErrorResult> => {
  const res = await axiosInstance.request<EventResponse>({
    url: "/events/user-event/",
    method: "post",
    data,
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetEventAPIResponse(res.data),
    };
  }
  return res;
};

export const getEventDataAPI = async (): Promise<
  SuccessResult<GetListWithPagination<getEventType[]>> | ErrorResult
> => {
  const res = await axiosInstance.request<GetEventResponse>({
    url: "/events/user-event/",
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
        results: res.data.results.map((result) =>
          transformGetEventAPIResponse(result)
        ),
      },
    };
  }

  return res;
};

export const getGoogleLocation = async (query: any) => {
  const res = await axiosInstance.request({
    url: `/events/location?location=${query}/`,
    method: "GET",
  });

  if (res.remote === "success") {
    return {
      remote: "success",
    };
  }

  return res;
};

export const getAllEventAPI = async (): Promise<
  SuccessResult<GetListWithPagination<getEventType[]>> | ErrorResult
> => {
  const res = await axiosInstance.request<GetEventResponse>({
    url: "/events/all/",
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
        results: res.data.results.map((result) =>
          transformGetEventAPIResponse(result)
        ),
      },
    };
  }

  return res;
};
export const getBookedEventAPI = async (): Promise<
  SuccessResult<GetListWithPagination<bookedEventType[]>> | ErrorResult
> => {
  const res = await axiosInstance.request<GetBookedEventResponse>({
    url: "/events/booked-event-list",
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
        results: res.data.results.map((result) =>
          transformGetBookedEventApiResponse(result)
        ),
      },
    };
  }

  return res;
};

export const getEventDetailAPI = async (
  id: detailPayloadId
): Promise<SuccessResult<getEventType> | ErrorResult> => {
  const res = await axiosInstance.request<EventResponse>({
    url: `/events/details/${id.id}`,
    method: "GET",
  });

  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetEventAPIResponse(res.data),
    };
  }
  return res;
};

export const getOwnEventDetailAPI = async (
  id: detailPayloadId
): Promise<SuccessResult<getEventType> | ErrorResult> => {
  const res = await axiosInstance.request<EventResponse>({
    url: `/events/user-event/${id.id}`,
    method: "GET",
  });

  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetEventAPIResponse(res.data),
    };
  }
  return res;
};

export const updateOwnEventDetailAPI = async (
  payload: updateEventDetailPayload
): Promise<SuccessResult<getEventType> | ErrorResult> => {
  const res = await axiosInstance.request<EventResponse>({
    url: `/events/user-event/${payload.id}/`,
    method: "PATCH",
    data: transformUpdateEventDetailPayload(payload.data),
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetEventAPIResponse(res.data),
    };
  }
  return res;
};

export const updateOwnEventTypeScheduleAPI = async (
  payload: any
): Promise<SuccessResult<getEventType> | ErrorResult> => {
  const res = await axiosInstance.request<EventResponse>({
    url: `/events/user-event/${payload.id}/`,
    method: "PATCH",
    data: transformUpdateEventTypeSchedulePayload(payload),
  });

  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetEventAPIResponse(res.data),
    };
  }
  return res;
};

export const updateOwnEventRequirementAPI = async (
  payload: any
): Promise<SuccessResult<getEventType> | ErrorResult> => {
  const res = await axiosInstance.request<EventResponse>({
    url: `/events/user-event/${payload.id}/`,
    method: "PATCH",
    data: transformUpdateEventQuestionAndRequirementPayload(payload),
  });

  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetEventAPIResponse(res.data),
    };
  }
  return res;
};
