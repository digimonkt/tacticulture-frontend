import { SVG } from "@/assets/svg";
import { EVENT_SCHEDULE_TYPES, WEEKDAYS } from "./enum";

export const Weekdays = [
  {
    id: "1",
    slug: WEEKDAYS.sunday,
    name: "Sunday",
  },
  {
    id: "2",
    slug: WEEKDAYS.monday,
    name: "Monday",
  },
  {
    id: "3",
    slug: WEEKDAYS.saturday,
    name: "Tuesday",
  },
  {
    id: "4",
    slug: WEEKDAYS.saturday,
    name: "Wednesday",
  },
  {
    id: "5",
    slug: WEEKDAYS.saturday,
    name: "Thursday",
  },
  {
    id: "6",
    slug: WEEKDAYS.saturday,
    name: "Friday",
  },
  {
    id: "7",
    slug: WEEKDAYS.saturday,
    name: "Saturday",
  },
];

export const Data = [
  {
    id: 1,
    icon: SVG.Plusevent,
    heading: "Creating an Event",
  },
  {
    id: 2,
    icon: SVG.Setting,
    heading: "Your account",
  },
  {
    id: 3,
    icon: SVG.Magic,
    heading: "Marketing",
  },
  {
    id: 4,
    icon: SVG.Card,
    heading: "Payouts and Taxes",
  },
];

export const eventScheduleTypes = [
  {
    id: 1,
    title: "Scheduled Event(s)",
    description: "A single-date calendar event with limited availability.",
    scheduleType: EVENT_SCHEDULE_TYPES.scheduledEvent,
  },
  {
    id: 2,
    title: "Open Schedule",
    description: "A user can schedule an event based on your availability.",
    scheduleType: EVENT_SCHEDULE_TYPES.openScheduled,
  },
  {
    id: 3,
    title: "Combined",
    description: "Both event types, all your availability in one event.",
    scheduleType: EVENT_SCHEDULE_TYPES.combined,
  },
];
