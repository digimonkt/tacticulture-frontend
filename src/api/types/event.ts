import { GetListWithPagination } from ".";

export type EventCategoryResponse = {
  id: number;
  event_categories: string;
  slug_name: string;
};
export type GetEventCategoryResponse = GetListWithPagination<
  EventCategoryResponse[]
>;

export type EventCategory = {
  id: number;
  eventCategory: string;
  slugName: string;
};
