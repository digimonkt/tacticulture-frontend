export type Categories = {
  eventCategories: string;
  slugName: string;
};

type EventScheduledDateTime = {
  eventStartDateTime: string;
  eventEndDateTime: string;
};

type EventCustomAvailabilityDetails = {
  fromTime: string;
  toTime: string;
};
type EventCustomAvailability = {
  weekdaysId: number;
  eventCustomAvailabilityDetails: EventCustomAvailabilityDetails[];
  specificHoursDate: string;
};

type CustomQuestions = {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
};

export type CreateEventType = {
  name: string;
  courseCategory: Categories[];
  description: string;
  location: string;
  courseUrl: string;
  isPrivateEvent: boolean;
  availableSpots: number;
  costPerSpot: number;
  isIncludeTransactionFeeInCost: boolean;
  isAddSalesTax: boolean;
  eventTypeAndScheduleId: number;
  eventScheduledDateTime: EventScheduledDateTime[];
  eventCustomAvailability: EventCustomAvailability[];
  defaultAvailability: number;
  requirements: string;
  cancellationPolicies: string;
  defaultWaiverSettings: number;
  customWaiverSettings: string;
  customQuestions: CustomQuestions;
  eventImage: string;
  achievementBadgeImage: string;
  publishStatus: boolean;
  isEventLive: boolean;
};
