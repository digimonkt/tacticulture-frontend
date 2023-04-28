import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store' 

// Define a type for the slice state
interface userRoleI {
  userRole: string
}

// Define the initial state using that type
const initialState: userRoleI = {
  userRole: '',
}

export const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload
    },
  },
})

export const { setUserRole } = userRoleSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const userRole = (state: RootState) => state.UserRoleReducer.userRole

export default userRoleSlice.reducer