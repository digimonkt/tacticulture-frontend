import { EventCategoryResponse, EventCategory } from "../types/event";

export const transformGetEventCategoriesAPIResponse = (
  data: EventCategoryResponse
): EventCategory => {
  return {
    id: data.id,
    eventCategory: data.event_categories,
    slugName: data.slug_name,
  };
};
