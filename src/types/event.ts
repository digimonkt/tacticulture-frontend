export type Categories = {
  event_categories: string;
  slug_name: string;
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
  defaultWaiverSettings?: string;
  customWaiverSettings: string;
  customQuestions: {
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
  eventImage?: string;
  achievementBadgeImage?: string;
  publishStatus: boolean;
  isEventLive: boolean;
  instructorDetails: {
    id: number;
    bio: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    profileImage: string | null;
    userRoles: string;
    username: string;
  };
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

export type getEventType = {
  achievementBadgeImage: string | null;
  availableSpots: number;
  cancellationPolicies: string;
  courseCategory: { eventCategories: string; slugName: string }[];
  courseUrl: string;
  isPrivateEvent: boolean;
  customQuestions: {
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
  customWaiverSettings: string;
  defaultAvailability: null | number;
  defaultWaiverSettings: string;
  description: string;
  eventCustomAvailability: {
    weekdays: string;
    specificHoursDate: string | null;
    eventCustomAvailabilityDetails: { fromTime: string; toTime: string }[];
  }[];
  eventImage: string | null;
  eventScheduledDateTime: {
    eventEndDate: string;
    eventEndTime: string;
    eventStartDate: string;
    eventStartTime: string;
  }[];
  eventTypeAndScheduleId: string;
  id: number;
  instructorDetails: {
    bio: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    phone_number: string | null;
    profile_image: string | null;
    user_roles: string;
    username: string;
  };
  isAddSalesTax: boolean;
  isEventLive: boolean;
  location: string;
  name: string;
  perSpotCost: number;
  publishStatus: boolean;
  requirements: string;
  salesTaxPercent?: number;
  isIncludeTransactionFeeInCost: boolean;
};

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
  defaultWaiverSettings?: string;
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
