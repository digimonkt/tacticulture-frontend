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

// @desc Event Form types
type Categories = {
  event_categories: string;
  slug_name: string;
};

type EventScheduledDateTime = {
  event_start_datetime: string;
  event_end_datetime: string;
};

type EventCustomAvailabilityDetails = {
  from_time: string;
  to_time: string;
};
type EventCustomAvailability = {
  weekdays_id: number;
  event_custom_availability_details: EventCustomAvailabilityDetails[];
  specific_hours_date: string;
};

type CustomQuestions = {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
};

export type EventResponse = {
  name: string;
  course_category: Categories[];
  description: string;
  location: string;
  course_url: string;
  is_private_event: boolean;
  available_spots: number;
  cost_per_spot: number;
  is_include_transaction_fee_in_cost: boolean;
  is_add_sales_tax: boolean;
  event_type_and_schedule_id: number;
  event_scheduled_datetime: EventScheduledDateTime[];
  event_custom_availability: EventCustomAvailability[];
  default_availability: number;
  requirements: string;
  cancellation_policies: string;
  default_waiver_settings: number;
  custom_waiver_settings: string;
  custom_questions: CustomQuestions;
  event_image: string;
  achievement_badge_image: string;
  publish_status: boolean;
  is_event_live: boolean;
};

export type GetEventResponse = GetListWithPagination<EventResponse[]>;
