import { SubscriptionPlan } from "@/redux/reducers/subscriptionPlan";
import { SubscriptionPlanResponse } from "../types/subscriptionPlan";

export const transformGetSubscriptionPlanListAPIResponse = (
  data: SubscriptionPlanResponse
): SubscriptionPlan => {
  return {
    id: data.id,
    monthlyOrAnnualPlan: data.monthly_or_annual_plan,
    planName: data.plan_name,
    planType: data.plan_type,
    amount: data.amount,
    planDuration: data.plan_duration,
    otherDescription: data.other_description,
    choices: data.choices.map((choice) => ({
      id: choice.id,
      choices: choice.choices,
      otherInformation: choice.other_information,
      status: choice.status,
    })),
  };
};
