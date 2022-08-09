import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
  reducers: {
    addAnecdote(state, action) {
      return [...state, asObject(action.payload)];
    },
    upvoteAnecdote(state, action) {
      const objToUpvote = state.find(
        (anecdote) => anecdote.id === action.payload,
      );
      const updatedObj = { ...objToUpvote, votes: objToUpvote.votes + 1 };
      return state.map((a) => (a.id === action.payload ? updatedObj : a));
    },
  },
});

export const { addAnecdote, upvoteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

// export const addAnecdote = (content) => {
//   return {
//     type: "ADD",
//     data: {
//       content,
//     },
//   };
// };

// export const upvoteAnecdote = (id) => {
//   return {
//     type: "UPVOTE",
//     data: {
//       id,
//     },
//   };
// };

// const reducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);

//   switch (action.type) {
//     case "UPVOTE":
//       const objToUpvote = state.find(
//         (anecdote) => anecdote.id === action.data.id,
//       );
//       const updatedObj = { ...objToUpvote, votes: objToUpvote.votes + 1 };
//       return state.map((a) => (a.id === action.data.id ? updatedObj : a));

//     case "ADD":
//       return [...state, asObject(action.data.content)];
//     default:
//       return state;
//   }
// };

// export default reducer;
