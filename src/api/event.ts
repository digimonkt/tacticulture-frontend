import { ErrorResult, GetListWithPagination, SuccessResult } from "./types";
import axiosInstance from "./axiosInstance";
import {
  EventCategory,
  EventPayload,
  EventResponse,
  GetEventCategoryResponse,
  GetEventResponse,
} from "./types/event";
import {
  transformGetEventAPIResponse,
  transformGetEventCategoriesAPIResponse,
} from "./transform/event";
import { CreateEventType, EventDataType } from "@/types/event";

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
): Promise<SuccessResult<CreateEventType> | ErrorResult> => {
  const res = await axiosInstance.request<EventResponse>({
    url: "/events/event/",
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
  SuccessResult<GetListWithPagination<CreateEventType[]>> | ErrorResult
> => {
  const res = await axiosInstance.request<GetEventResponse>({
    url: "/events/event/",
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
