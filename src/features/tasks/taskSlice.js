import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

const dummyTasks = [
  { id: '1', name: 'Walk the dog', completed: false },
  { id: '2', name: 'Wash the dishes', completed: false },
  { id: '3', name: 'Groom the cat', completed: true },
  { id: '4', name: 'Pay the bills', completed: false },
  { id: '5', name: 'Throw out the garbage', completed: true },
  { id: '6', name: 'Cook dinner', completed: true },
];

const initialState = {
  tasks: dummyTasks,
  task: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new task
export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData, thunkAPI) => {
    // console.log(taskData);
    return taskData;
  }
);

// Deletetask
export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id, thunkAPI) => {
    return id;
  }
);

// Toggle complete status of a task
export const toggleCompleteTask = createAsyncThunk(
  'tasks/toggleComplete',
  async (id, thunkAPI) => {
    return id;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.tasks.splice(state.tasks.findIndex((task) => task.id === action.payload), 1);
        state.tasks = state.tasks.filter((task) => task.id != action.payload);
        toast.error('Task deleted', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: true,
        });
      })
      .addCase(toggleCompleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleCompleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const pos = state.tasks.findIndex((task) => task.id === action.payload);
        state.tasks[pos].completed = !state.tasks[pos].completed;
        if (state.tasks[pos].completed) {
          toast.success(`Completed "${state.tasks[pos].name}"`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      });
  },
});

export const { reset } = taskSlice.actions;

export default taskSlice.reducer;
