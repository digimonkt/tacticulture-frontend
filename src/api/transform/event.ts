import { CreateEventType } from "@/types/event";
import {
  EventCategoryResponse,
  EventCategory,
  EventResponse,
} from "../types/event";

export const transformGetEventCategoriesAPIResponse = (
  data: EventCategoryResponse
): EventCategory => {
  return {
    id: data.id,
    eventCategory: data.event_categories,
    slugName: data.slug_name,
  };
};

export const transformGetEventAPIResponse = (
  data: EventResponse
): CreateEventType => {
  return {
    id: data.id,
    name: data.name,
    courseCategory: data.course_category.map((course) => ({
      eventCategories: course.event_categories,
      slugName: course.slug_name,
    })),
    description: data.description,
    location: data.location,
    courseUrl: data.course_url,
    isPrivateEvent: data.is_private_event,
    availableSpots: data.available_spots,
    perSpotCost: data.cost_per_spot,
    salesTaxPercent: data.salesTaxPercent,
    isIncludeTransactionFeeInCost: data.is_include_transaction_fee_in_cost,
    isAddSalesTax: data.is_add_sales_tax,
    eventTypeAndScheduleId: data.event_type_and_schedule_id,
    eventScheduledDateTime: data.event_scheduled_datetime.map((item) => ({
      eventStartDate: item.event_start_date,
      eventStartTime: item.event_start_time,
      eventEndDate: item.event_end_date,
      eventEndTime: item.event_end_time,
    })),
    eventCustomAvailability: data.event_custom_availability?.map((item) => ({
      weekdaysId: item.weekdays_id,
      eventCustomAvailabilityDetails:
        item.event_custom_availability_details.map((i) => ({
          fromTime: i.from_time,
          toTime: i.to_time,
        })),
      specificHoursDate: item.specific_hours_date,
    })),
    defaultAvailability: data?.default_availability,
    requirements: data.requirements,
    cancellationPolicies: data.cancellation_policies,
    defaultWaiverSettings: data.default_waiver_settings,
    customWaiverSettings: data.custom_waiver_settings,
    customQuestions: data.custom_questions,
    eventImage: data.event_image,
    achievementBadgeImage: data.achievement_badge_image,
    publishStatus: data.publish_status,
    isEventLive: data.is_event_live,
    instructorDetails: data.instructor_details,
  };
};
