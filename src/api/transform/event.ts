import { EventCategory } from "@/redux/reducers/event";
import { EventCategoryResponse } from "../types/event";

export const transformGetEventCategoriesAPIResponse = (
  data: EventCategoryResponse
): EventCategory => {
  return {
    id: data.id,
    eventCategory: data.event_categories,
    slugName: data.slug_name,
  };
};
