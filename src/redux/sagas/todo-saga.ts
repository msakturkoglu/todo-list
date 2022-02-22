import {call, put, takeLatest} from 'redux-saga/effects';
import { ITodoModel } from '../../models/TodoModel';
import short from 'short-uuid';

import {
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
} from '../slices/todo-slice';


type CreateTodoParams = {payload: ITodoModel; type: string};
type UpdateTodoParams = {payload: ITodoModel; type: string};
type DeleteTodoParams = {payload: {id: string | undefined}; type: string};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* handleCreateTodo(params: CreateTodoParams) {
  yield put(createTodoStart());

  //mock API request delay
  yield call(delay, 1000);
  const todoWithId: ITodoModel = {...params.payload, id: short.generate()}
  yield put(createTodoSuccess(todoWithId));

  yield call(delay, 1000);

}

function* handleUpdateTodo(params: UpdateTodoParams) {
  yield put(updateTodoStart());
  yield put(updateTodoSuccess(params.payload));
}

function* handleDeleteTodo(params: DeleteTodoParams) {
  yield put(deleteTodoStart());
  yield put(deleteTodoSuccess({id: params.payload.id}));
}

function* handleClearCompletedTodo() {
  yield put(clearCompletedStart());

  //mock API request delay
  yield call(delay, 1000);

  yield put(clearCompletedSuccess());
}





export function* watchCreateTodoRequests() {
  yield takeLatest(createTodo, handleCreateTodo);
}

export function* watchUpdateTodoRequests() {
  yield takeLatest(updateTodo, handleUpdateTodo);
}

export function* watchDeleteTodoRequests() {
  yield takeLatest(deleteTodo, handleDeleteTodo);
}
export function* watchClearCompletedRequests() {
  yield takeLatest(clearCompleted, handleClearCompletedTodo);
}
