import { transformGetSubscriptionPlanListAPIResponse } from "./transform/subscriptionPlan";
import axiosInstance from "./axiosInstance";
import { ErrorResult, SuccessResult } from "./types";
import { GetSubscriptionPlanResponse } from "./types/subscriptionPlan";
import { subscriptionPlan } from "@/redux/reducers/subscriptionPlan";

// fetch Subscription Plans List
export const subscriptionPlansList = async (): Promise<
  SuccessResult<subscriptionPlan> | ErrorResult
> => {
  const res = await axiosInstance.request<GetSubscriptionPlanResponse>({
    url: "/subscription-plans/",
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetSubscriptionPlanListAPIResponse(res.data),
    };
  }
  return res;
};
