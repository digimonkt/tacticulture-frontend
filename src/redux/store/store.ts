import { configureStore } from "@reduxjs/toolkit";
import UserRoleReducer from "../reducers/userRole";
import PreLoaderReducer from "../reducers/preLoader";
import ModalsToogleReducer from "../reducers/modalsToggle";
import userReducer from "../reducers/user";
import EventReducer from "../reducers/event";
import BookingReducer from "../reducers/booking";
export const store = configureStore({
  reducer: {
    UserRoleReducer,
    PreLoaderReducer,
    ModalsToogleReducer,
    userReducer,
    EventReducer,
    BookingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
