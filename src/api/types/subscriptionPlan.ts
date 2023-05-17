import { SUBSCRIPTION_PLAN_TYPE } from "@/utils/enum";
import { GetListWithPagination } from ".";

export type Choices = {
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

type ChoicesTransfrom = {
  id: number;
  choices: string;
  otherInformation: string;
  status: boolean;
};

export type SubscriptionPlan = {
  id: number;
  monthlyOrAnnualPlan: SUBSCRIPTION_PLAN_TYPE;
  planName: string;
  planType: string;
  amount: number;
  planDuration: string;
  otherDescription: string;
  choices: ChoicesTransfrom[];
};

export type GetSubscriptionPlanResponse = GetListWithPagination<
  SubscriptionPlanResponse[]
>;
