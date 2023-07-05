import { GetListWithPagination } from ".";

export type EventCategoryResponse = {
  id: number;
  event_categories: string;
  slug_name: string;
};
export type GetEventCategoryResponse = GetListWithPagination<
  EventCategoryResponse[]
>;

export type EventCategory = {
  id: number;
  eventCategory: string;
  slugName: string;
};

export type EventResponse = {
  id: number;
  name: string;
  course_category: { event_categories: string; slug_name: string }[];
  description: string;
  location: string;
  course_url: string;
  is_private_event: boolean;
  available_spots: number;
  cost_per_spot: number;
  is_include_transaction_fee_in_cost: boolean;
  is_add_sales_tax: boolean;

  event_type_and_schedule_id: string;
  event_scheduled_datetime: {
    event_start_date: string;
    event_start_time: string;
    event_end_date: string;
    event_end_time: string;
  }[];
  open_availability_period: number | null;
  open_availability_period_unit: string | null;
  schedule_event_period: number | null;
  schedule_event_period_unit: string | null;
  event_custom_availability: {
    weekdays: string;
    specific_hours_date: string | null;
    event_custom_availability_details: { from_time: string; to_time: string }[];
  }[];
  default_availability: number | null;
  requirements: string;
  cancellation_policies: string;
  default_waiver_settings: string;
  custom_waiver_settings: string;
  custom_questions: {
    id: number;
    fieldType: string;
    questionPromptLabel: string;
    answerRequired: boolean;
    paidUpgrade: string;
    upgradeCost: number;
    answerData: { id: number; description: string; upgradeCost: number }[];
    costPerGuest: string;
    maxGuest: number;
  }[];
  event_image: string | null;
  achievement_badge_image: string | null;
  publish_status: boolean;
  is_event_live: boolean;
  salesTaxPercent: number;
  instructor_details: {
    id: number;
    bio: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
    profile_image: string | null;
    user_roles: string;
    username: string;
  };
};

export type EventCustomeAvailabilityDetails = {
  weekDays?: string;
  event_custom_availability_details?: {
    from_time: string;
    to_time: string;
  }[];
  specific_hours_date?: string;
};

export type EventPayload = {
  name: string;
  course_category: { event_categories: string; slug_name: string }[];
  description: string;
  location: string;
  course_url: string;
  is_private_event: boolean;
  available_spots: number;
  cost_per_spot: number;
  is_include_transaction_fee_in_cost: boolean;
  is_add_sales_tax: boolean;
  event_type_and_schedule_id: string;
  event_scheduled_datetime?: {
    event_start_date: string;
    event_start_time: string;
    event_end_date: string;
    event_end_time: string;
  }[];
  schedule_event_period: number;
  schedule_event_period_unit: string;
  open_availability_period_unit: string;
  open_availability_period: number;
  event_custom_availability?: EventCustomeAvailabilityDetails[];

  default_availability: number | null;
  requirements: string;
  cancellation_policies: string;
  default_waiver_settings?: string;
  custom_waiver_settings?: string;
  custom_questions: {
    id: number;
    fieldType: string;
    questionPromptLabel?: string;
    answerRequired?: boolean;
    paidUpgrade?: string;
    upgradeCost?: number;
    answerData?: { id: number; description: string; upgradeCost: number }[];
    costPerGuest?: string;
    maxGuest?: number;
  }[];
  event_image: string | null;
  achievement_badge_image?: string;
  publish_status: boolean;
  is_event_live: boolean;
};

export type detailPayloadId = {
  id: string;
};

export type updateEventDetailPayload = {
  id: string;
  data: {
    availableSpots: number;
    courseCategory: { eventCategories: string; slugName: string }[];
    courseUrl: string;
    description: string;
    eventIds: [];
    isAddSalesTax: boolean;
    isIncludeTransactionFeeInCost: boolean;
    isPrivateEvent: boolean;
    location: string;
    name: string;
    perSpotCost: number;
  };
};

export type updateEventTypeScheduleType = {
  id: string;
  customeEvent: [];
  openSpan: {
    scheduleAvailabilityPeriod: number;
    scheduleAvailabilityPeriodUnit: string;
  };
  scheduleData: {
    eventEndDate: string;
    eventEndTime: string;
    eventStartDate: string;
    eventStartTime: string;
  }[];
  scheduleSpan: {
    scheduleAvailabilityPeriod: number;
    scheduleAvailabilityPeriodUnit: string;
  };
  scheduleType: string;
};

export type updateOwnEventQuestionAndRequirementType = {
  id: string;
  values: {
    cancellationPolicies: string;
    customWaiverSettings: string;
    requirements: string;
  };
  customQuestions: any;
};

export type updateEventTypeSchedulePayload = {
  id: string;
  data: {
    availableSpots: number;
    courseCategory: { eventCategories: string; slugName: string }[];
    courseUrl: string;
    description: string;
    eventIds: [];
    isAddSalesTax: boolean;
    isIncludeTransactionFeeInCost: boolean;
    isPrivateEvent: boolean;
    location: string;
    name: string;
    perSpotCost: number;
  };
};

export type updateEventDetailPayloadBackend = {
  name: string;
  course_category: {
    event_categories: string;
    slug_name: string;
  }[];
  description: string;
  location: string;
  course_url: string;
  is_private_event: boolean;
  available_spots: number;
  cost_per_spot: number;
  is_include_transaction_fee_in_cost: boolean;
  is_add_sales_tax: boolean;
};

export type GetEventResponse = GetListWithPagination<EventResponse[]>;
