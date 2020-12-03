export const currentUserSelector = (state) => state.models.users.currentUser;
export const newUserSelector = (state) => state.models.users.newUser;
export const fetchAssignedUsersSelector = (state) => state.models.users.users;
export const fetchUnAssignedUsersSelector = (state) => state.models.users.notAsssigned;
export const fuserLoading = (state) => state.models.users.isLoading;


