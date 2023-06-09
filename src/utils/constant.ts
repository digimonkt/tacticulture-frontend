import { SVG } from "@/assets/svg";
import { EVENT_QUESTION_TYPE, EVENT_TEST, WEEKDAYS } from "./enum";

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
    slug: WEEKDAYS.tuesday,
    name: "Tuesday",
  },
  {
    id: "4",
    slug: WEEKDAYS.wednesday,
    name: "Wednesday",
  },
  {
    id: "5",
    slug: WEEKDAYS.thursday,
    name: "Thursday",
  },
  {
    id: "6",
    slug: WEEKDAYS.friday,
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

export const paidUpgradeList = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const eventQuestionList = [
  {
    label: "Short Text",
    value: EVENT_QUESTION_TYPE.shortText,
  },
  {
    label: "Long Text",
    value: EVENT_QUESTION_TYPE.longText,
  },
  {
    label: "Checkbox",
    value: EVENT_QUESTION_TYPE.checkbox,
  },
  {
    label: "Select/Dropdown",
    value: EVENT_QUESTION_TYPE.selectDropdown,
  },
  {
    label: "Optional Guests(#)",
    value: EVENT_QUESTION_TYPE.optionalGuest,
  },
];

export const eventGuestList = [
  {
    label: "1",
    value: EVENT_TEST.one,
  },
  {
    label: "2",
    value: EVENT_TEST.two,
  },
  {
    label: "3",
    value: EVENT_TEST.three,
  },
  {
    label: "4",
    value: EVENT_TEST.four,
  },
  {
    label: "5",
    value: EVENT_TEST.five,
  },
];
