import { ErrorResult, GetListWithPagination, SuccessResult } from "./types";
import axiosInstance from "./axiosInstance";
import { EventCategory, GetEventCategoryResponse } from "./types/event";
import { transformGetEventCategoriesAPIResponse } from "./transform/event";

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
