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
  id: string;
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
  event_custom_availability?: {
    weekdays_id: number;
    event_custom_availability_details: { from_time: string; to_time: string }[];
    specific_hours_date: string;
  }[];
  default_availability: number | null;
  requirements: string;
  cancellation_policies: string;
  default_waiver_settings: number | null;
  custom_waiver_settings: string;
  custom_questions: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  }[];
  event_image?: string;
  achievement_badge_image?: string;
  publish_status: boolean;
  is_event_live: boolean;
  salesTaxPercent: number;
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
  event_custom_availability?: EventCustomeAvailabilityDetails[];

  default_availability?: number | null;
  requirements: string;
  cancellation_policies: string;
  default_waiver_settings?: number | null;
  custom_waiver_settings?: string;
  custom_questions: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  }[];
  event_image?: string;
  achievement_badge_image?: string;
  publish_status: boolean;
  is_event_live: boolean;
};

export type GetEventResponse = GetListWithPagination<EventResponse[]>;
