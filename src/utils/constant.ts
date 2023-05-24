import { SVG } from "@/assets/svg";
import { WEEKDAYS } from "./enum";

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
