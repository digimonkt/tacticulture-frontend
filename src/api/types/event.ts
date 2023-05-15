import { GetListWithPagination } from ".";

export type EventCategoryResponse = {
  id: number;
  event_categories: string;
  slug_name: string;
};
export type GetEventCategoryResponse = GetListWithPagination<
  EventCategoryResponse[]
>;
