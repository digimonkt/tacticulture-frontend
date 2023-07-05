import { ErrorResult, GetListWithPagination, SuccessResult } from "./types";
import axiosInstance from "./axiosInstance";
import {
  detailPayloadId,
  EventCategory,
  EventPayload,
  EventResponse,
  GetEventCategoryResponse,
  GetEventResponse,
  updateEventDetailPayload,
  updateEventTypeSchedulePayload,
  updateOwnEventQuestionAndRequirementType,
} from "./types/event";
import {
  transformGetEventAPIResponse,
  transformGetEventCategoriesAPIResponse,
  transformUpdateEventDetailPayload,
  transformUpdateEventQuestionAndRequirementPayload,
  transformUpdateEventTypeSchedulePayload,
} from "./transform/event";
import { getEventType } from "@/types/event";

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
  // console.log(query, "quer");
  const res = await axiosInstance.request({
    url: `/events/location?location=${query}/`,
    method: "GET",
  });
  console.log(res, "location adsf");
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
  console.log(payload, "payload");
  console.log(JSON.stringify(transformUpdateEventTypeSchedulePayload(payload)));
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
  console.log(res, "ye hai response");
  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetEventAPIResponse(res.data),
    };
  }
  return res;
};
