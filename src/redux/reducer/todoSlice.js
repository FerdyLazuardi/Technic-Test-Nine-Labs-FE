import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1/task";

export const getInitialTodoFromApi = createAsyncThunk(
  "todo/getInitialTodo",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(baseUrl, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error getting initial todo:", error);
      return thunkAPI.rejectWithValue([]); // Returning an empty array in case of error
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (todoData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(baseUrl + "/create", todoData, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding todo:", error);
      return thunkAPI.rejectWithValue(error.response.data); // Returning error response data
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (todoData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.put(baseUrl + `/${todoData.id}`, todoData, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error);
      return thunkAPI.rejectWithValue(error.response.data); // Returning error response data
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (todoId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(baseUrl + `/${todoId}`, {
        headers,
      });
      return todoId;
    } catch (error) {
      console.error("Error deleting todo:", error);
      return thunkAPI.rejectWithValue(error.response.data); // Returning error response data
    }
  }
);

export const pollUpdateTodoList = createAsyncThunk(
  "todo/pollUpdateTodoList",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(baseUrl, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error updating todo list:", error);
      return thunkAPI.rejectWithValue([]); // Returning an empty array in case of error
    }
  }
);

const initialValue = {
  filterStatus: "all",
  todoList: [], // Fetch initial data from API
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialTodoFromApi.fulfilled, (state, action) => {
      state.todoList = action.payload;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todoList.push(action.payload);
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    });
  },
});

export const { updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
