import { ErrorResult, SuccessResult } from "./types";
import axiosInstance from "./axiosInstance";
import { EventCategoryResponse } from "./types/event";
import { transformGetEventCategoriesAPIResponse } from "./transform/event";
import { EventCategory } from "@/redux/reducers/event";

// fetch event categories  List
export const eventCategoriesList = async (): Promise<
  SuccessResult<EventCategory> | ErrorResult
> => {
  const response = await axiosInstance.request<EventCategoryResponse>({
    url: "/events/categories/",
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformGetEventCategoriesAPIResponse(response.data),
    };
  }
  return response;
};
