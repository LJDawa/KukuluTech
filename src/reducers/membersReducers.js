"use strict";

export function membersReducers(
  state = {
    members: []
  },
  action
) {
  switch (action.type) {
    case "GET_MEMBERS":
      return { ...state, members: [...action.payload] };
      break;
    case "GET_MEMBER":
      return { ...state, members: [...action.payload] };
      break;
    case "ADD_MEMBER":
      return {
        ...state,
        members: [...state.members, ...action.payload]
      };
      break;
    case "ADD_MEMBER_REJECTED":
      return {
        ...state,
        msg: "Please, try again",
        style: "danger",
        validation: "error"
      };
      break;
    case "RESET_BUTTON":
      return { ...state, msg: null, style: "primary", validation: null };
      break;
    case "DELETE_MEMBER":
      const currentBookToDelete = [...state.members];

      const indexToDelete = currentBookToDelete.findIndex(function(book) {
        return book._id == action.payload;
      });

      return {
        members: [
          ...currentBookToDelete.slice(0, indexToDelete),
          ...currentBookToDelete.slice(indexToDelete + 1)
        ]
      };
      break;

    case "UPDATE_MEMBER":
      const currentBookToUpdate = [...state.members];

      const indexToUpdate = currentBookToUpdate.findIndex(function(book) {
        return book._id === action.payload._id;
      });

      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      };

      console.log("what is it newBookToUpdate", newBookToUpdate);

      return {
        members: [
          ...currentBookToUpdate.slice(0, indexToUpdate),
          newBookToUpdate,
          ...currentBookToUpdate.slice(indexToUpdate + 1)
        ]
      };
      break;
  }
  return state;
}
