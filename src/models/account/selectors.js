export const currentUserSelector = (state) => state.models.users.currentUser;
export const newUserSelector = (state) => state.models.users.unAssignedlist;
export const fetchAssignedUsersSelector = (state) => state.models.users.usersList;
export const registrationSelector = (state) => state.models.users.registration;
export const changePasswordSelector = (state) => state.models.users.changePassword;
export const forgotPasswordSelector = (state) => state.models.users.forgotPassword;
export const resetPasswordSelector = (state) => state.models.users.resetPassword;