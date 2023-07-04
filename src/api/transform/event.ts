import { getEventType } from "@/types/event";
import {
  EventCategoryResponse,
  EventCategory,
  EventResponse,
  updateEventDetailPayload,
  updateEventDetailPayloadBackend,
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
// updateEventDetailPayloadBackend
// updateEventDetailPayload -- this two types which we create for this transform use this instead of any
export const transformUpdateEventDetailPayload = (data: any) => {
  return {
    name: data.name,
    course_category: data.courseCategory.map((course: any) => ({
      event_categories: course.event_categories,
      slug_name: course.slug_name,
    })),
    description: data.description,
    location: data.location,
    course_url: data.courseUrl,
    is_private_event: data.isPrivateEvent,
    available_spots: data.availableSpots,
    cost_per_spot: data.perSpotCost,
    is_include_transaction_fee_in_cost: data.isIncludeTransactionFeeInCost,
    is_add_sales_tax: data.isAddSalesTax,
  };
};

export const transformUpdateEventTypeSchedulePayload = ({ data }: any) => {
  return {
    event_type_and_schedule_id: data.scheduleType,
    event_scheduled_datetime: data.scheduleData.map((item: any) => ({
      event_start_date: item.eventStartDate,
      event_start_time: item.eventStartTime,
      event_end_date: item.eventEndDate,
      event_end_time: item.eventEndTime,
    })),
    schedule_event_period: data.scheduleSpan.scheduleAvailabilityPeriod * 60,
    schedule_event_period_unit:
      data.scheduleSpan.scheduleAvailabilityPeriodUnit,
    event_custom_availability: [],
  };
};

export const transformUpdateEventQuestionAndRequirementPayload = (
  data: any
) => {
  return {
    requirements: data.values.requirements,
    cancellation_policies: data.values.cancellationPolicies,
    custom_waiver_settings: data.values.customWaiverSettings,
    custom_questions: data.customQuestions,
  };
};

export const transformGetEventAPIResponse = (
  data: EventResponse
): getEventType => {
  return {
    id: data.id,
    name: data.name,
    courseCategory: data.course_category.map((course) => ({
      event_categories: course.event_categories,
      slug_name: course.slug_name,
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
    openAvailabilityPeriod: data.open_availability_period,
    openAvailabilityPeriodUnit: data.open_availability_period_unit,
    scheduleEventPeriod: data.schedule_event_period,
    scheduleEventPeriodUnit: data.schedule_event_period_unit,
    eventCustomAvailability: data.event_custom_availability?.map((item) => ({
      weekdays: item.weekdays,
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
