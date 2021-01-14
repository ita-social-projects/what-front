export const currentUserSelector = (state) => state.models.users.currentUser;
export const newUserSelector = (state) => state.models.users.unAssignedlist;
export const fetchAssignedUsersSelector = (state) => state.models.users.usersList;
export const registrationSelector = (state) => state.models.users.registration;
export const changePasswordSelector = (state) => state.models.users.changePassword;