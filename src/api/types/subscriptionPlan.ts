import { SUBSCRIPTION_PLAN_TYPE } from "@/utils/enum";
import { GetListWithPagination } from ".";

type Choices = {
  id: number;
  choices: string;
  other_information: string;
  status: boolean;
};

export type SubscriptionPlanResponse = {
  id: number;
  monthly_or_annual_plan: SUBSCRIPTION_PLAN_TYPE;
  plan_name: string;
  plan_type: string;
  amount: number;
  plan_duration: string;
  other_description: string;
  choices: Choices[];
};
export type GetSubscriptionPlanResponse = GetListWithPagination<
  SubscriptionPlanResponse[]
>;
