import { transformGetSubscriptionPlanListAPIResponse } from "./transform/subscriptionPlan";
import axiosInstance from "./axiosInstance";
import { ErrorResult, GetListWithPagination, SuccessResult } from "./types";
import {
  GetSubscriptionPlanResponse,
  SubscriptionPlan,
} from "./types/subscriptionPlan";

// fetch Subscription Plans List
export const subscriptionPlansList = async (): Promise<
  SuccessResult<GetListWithPagination<SubscriptionPlan[]>> | ErrorResult
> => {
  const res = await axiosInstance.request<GetSubscriptionPlanResponse>({
    url: "/subscription-plans/",
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
          transformGetSubscriptionPlanListAPIResponse(result)
        ),
      },
    };
  }
  return res;
};
