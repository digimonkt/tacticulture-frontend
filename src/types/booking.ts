export type bookingPayload = {
  email: string;
  event_id: number;
  booking_date: string;
  booking_time: string;
  booking_type: string;
  custom_questions_answers: {
    answerLongText: string;
    answerShortText: string;
  };
  contact_details: { name: string; phone: string }[];
};

export type getBookingType = {
  name: string;
};
