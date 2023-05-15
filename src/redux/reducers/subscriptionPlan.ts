import { SUBSCRIPTION_PLAN_TYPE } from "@/utils/enum";

type Choices = {
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
  choices: Choices[];
};
