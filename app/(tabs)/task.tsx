import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [task, setTask] = useState(null);
  const [task_id, setTask_id] = useState(null);

  const getDataLocal = async () => {
    try {
      let employee = await AsyncStorage.getItem("employee");
      employee = JSON.parse(employee!!);
      setUser(employee);

      let token = await AsyncStorage.getItem("token");
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    console.log(`${process.env.REACT_APP_API_URL}/task/employee/${user.id}`);
    console.log(token);

    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/task/employee/${user.id}`, // get and delete no have params
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
      console.log(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskById = async (id) => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (newTaskData) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/task/create`, // post, patch, put have params
        newTaskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        console.log("Task created successfully");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataLocal();
  }, []);

  useEffect(() => {
    if (user && token) {
      getTasks();
    }
  }, [user, token]);
  return (
    <View>
      <Text
        onPress={() => {
          const newTaskData = {
            name: "Task 1",
            description: "Description 1",
            start_date: "2024-03-19T17:00:00.000Z",
            end_date: "2024-03-28T17:00:00.000Z",
            status: "In Progress",
            employee_id: user.id,
          };
          console.log(newTaskData);

          createTask(newTaskData);
        }}
      >
        task
      </Text>
    </View>
  );
};

export default task;

const styles = StyleSheet.create({});
// linh