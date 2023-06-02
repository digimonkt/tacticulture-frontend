export type Categories = {
  eventCategories: string;
  slugName: string;
};

// type EventScheduledDateTime = {
//   eventStartDateTime: string;
//   eventEndDateTime: string;
// };

// type EventCustomAvailabilityDetails = {
//   fromTime: string;
//   toTime: string;
// };
// type EventCustomAvailability = {};

// type CustomQuestions = {
//   additionalProp1: string;
//   additionalProp2: string;
//   additionalProp3: string;
// };

export type CreateEventType = {
  id: string;
  name: string;
  courseCategory: Categories[];
  description: string;
  location: string;
  courseUrl: string;
  isPrivateEvent: boolean;
  availableSpots: number;
  perSpotCost: number;
  isIncludeTransactionFeeInCost: boolean;
  isAddSalesTax: boolean;
  salesTaxPercent: number;
  eventTypeAndScheduleId: string;
  eventScheduledDateTime?: {
    id?: number;
    eventStartDate: string;
    eventStartTime: string;
    eventEndDate: string;
    eventEndTime: string;
  }[];

  eventCustomAvailability?: {
    isChecked?: boolean;
    day?: string;
    schedules?: { startTime: string; endTime: string }[];
    weekdaysId: number;
    eventCustomAvailabilityDetails: { fromTime: string; toTime: string }[];
    specificHoursDate: string;
  }[];
  defaultAvailability: number | null;
  requirements: string;
  cancellationPolicies: string;
  defaultWaiverSettings: number | null;
  customWaiverSettings: string;
  customQuestions: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  }[];
  eventImage?: string;
  achievementBadgeImage?: string;
  publishStatus: boolean;
  isEventLive: boolean;
};

// type CourseCategory = {
//   id: number;
//   event_categories: string;
//   slug_name: string;
// };

// type EventScheduleDateTime = {
//   id: number;
//   eventId: number;
//   eventStartDate: string;
//   eventStartTime: string;
//   eventEndDate: string;
//   eventEndTime: string;
// };

// type EventCustomsAvailability = {
//   id: number;
//   eventId: number;
//   weekdays: string[];
//   eventCustomAvailabilityDetails: [];
//   specificHoursDate: null;
// };

export type EventDataType = {
  name: string;
  courseCategory: Categories[];
  description: string;
  location: string;
  courseUrl: string;
  isPrivateEvent: boolean;
  availableSpots: number;
  perSpotCost: number;
  isIncludeTransactionFeeInCost: boolean;
  isAddSalesTax: boolean;
  salesTaxPercent: number;
  eventTypeAndScheduleId: string;
  eventScheduledDateTime: {
    id?: number;
    eventStartDate: string;
    eventStartTime: string;
    eventEndDate: string;
    eventEndTime: string;
  }[];
  eventCustomAvailability: [];
  defaultAvailability: number | null;
  requirements: string;
  cancellationPolicies: string;
  defaultWaiverSettings: number | null;
  customQuestions: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  }[];
  eventImage: string;
  achievementBadgeImage: string | null;
  publishStatus: boolean;
  isEventLive: boolean;
};
