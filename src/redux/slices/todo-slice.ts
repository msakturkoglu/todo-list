import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/internal';
import { ITodoModel } from '../../models/TodoModel';
import { Slices } from '../../utils/contants';


export interface ITodoState {
  isLoading: boolean;
  isError: boolean;
  errMessage?: string;
  data: ITodoModel[] | undefined;
}

const initialState: ITodoState = {
  isLoading: false,
  isError: false,
  data: [],
};

const todoSlice = createSlice({
  name: Slices.Todos,
  initialState,
  reducers: {
    createTodoStart(state: ITodoState) {
      state.isLoading = true;
    },
    createTodo(state:ITodoState, _action: PayloadAction<ITodoModel>) {
      return state;
    },
    createTodoSuccess(state:ITodoState, action: PayloadAction<ITodoModel>) {
      state.isLoading = false;
      state.isError = false;
      state.data?.push(action.payload);
    },
    updateTodoStart(state: ITodoState) {
      state.isLoading = true;
    },
    updateTodo(state: ITodoState, _action: PayloadAction<ITodoModel>) {
      return state;
    },
    updateTodoSuccess(state: ITodoState, action: PayloadAction<ITodoModel>) {
      state.isLoading = false;
      state.isError = false;
      state.data = state.data?.reduce((acc:ITodoModel[], curr: ITodoModel) => {
        if (curr.id === action.payload.id) {
          acc.push(action.payload)
        } else {
          acc.push(curr)
        }
        return acc
      }, [])
    },
    deleteTodoStart(state: ITodoState) {
      state.isLoading = true;
    },
    deleteTodo(state: ITodoState, _action: PayloadAction<{id: string | undefined}>) {
      return state;
    },
    deleteTodoSuccess(state: ITodoState, action: PayloadAction<{id: string | undefined}>) {
      state.isLoading = false;
      state.isError = false;
      state.data = state.data?.filter(item => item.id !== action.payload.id);
    },
    clearCompletedStart(state) {
      state.isLoading = true;
    },
    clearCompleted(state) {
      return state;
    },
    clearCompletedSuccess(state) {
      state.isLoading = false;
      state.isError = false;
      state.data = state.data?.filter(item => item.completed !== true);
    }
  },
});

export const {
  createTodoStart,
  createTodo,
  createTodoSuccess,
  updateTodoStart,
  updateTodo,
  updateTodoSuccess,
  deleteTodoStart,
  deleteTodo,
  deleteTodoSuccess,
  clearCompletedStart,
  clearCompleted,
  clearCompletedSuccess
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
