import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'; 
import SwitchButton from './SwitchButton';

const categories = [
  { name: 'All', icon: <FontAwesome5 name="list" size={14} color="black" /> }, 
  { name: 'Work', icon: <MaterialIcons name="work" size={14} color="black" /> },
  { name: 'Study', icon: <MaterialCommunityIcons name="book" size={14} color="black" /> },
  { name: 'Home', icon: <Feather name="home" size={14} color="black" /> },
  { name: 'Personal', icon: <Ionicons name="person" size={14} color="black" /> }
]; 
const ToDoListApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [theme, setTheme] = useState("dark");
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false, category: selectedCategory }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id) => {
    const removedTask = tasks.find(task => task.id === id);
    setDeletedTasks([...deletedTasks, removedTask]);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const removeDeletedTask = (id) => {
    setDeletedTasks(deletedTasks.filter(task => task.id !== id));
  };

  const removeAllDeletedTasks = () => {
    setDeletedTasks([]);
  };

  const switchTheme = (isDark) => {
    if (isDark) {
      setTheme("dark");
    } else {
      setTheme("light"); 
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={() => setShowDeletedModal(false)}>
      <View style={[styles.container, theme === "dark" ? styles.darkTheme : null]}>
        <SwitchButton onSwitch={switchTheme} themeColor={theme}/>
        <Text style={styles.title}>
          <FontAwesome5 name="list" size={24} color="#FDBF60" /> To-Do List
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={newTask}
            onChangeText={text => setNewTask(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <AntDesign name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.name}
              style={[styles.categoryChip, selectedCategory === category.name && styles.selectedCategory]}
              onPress={() => setSelectedCategory(category.name === 'All' ? null : category.name)}
            >
              {category.icon}
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView style={styles.taskList}>
          {tasks.map(task => (
            (selectedCategory === null || selectedCategory === task.category || selectedCategory === 'All') &&
            <TouchableOpacity
              key={task.id}
              style={[styles.taskItem, task.completed && styles.completedTask]}
              onPress={() => toggleTask(task.id)}
            >
              <Text style={[styles.taskTitle, task.completed && styles.completedText]}>{task.title}</Text>
              <TouchableOpacity onPress={() => removeTask(task.id)}>
                <AntDesign name="closecircle" size={20} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.deletedTasksButton} onPress={() => setShowDeletedModal(true)}>
          <MaterialIcons name="delete" size={60} color="#B4B4B8" />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDeletedModal}
          onRequestClose={() => setShowDeletedModal(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.deletedModalContainer}>
              <View style={styles.deletedModalContent}>
                <Text style={styles.deletedModalTitle}>Deleted Tasks</Text>
                <ScrollView style={styles.deletedTaskList}>
                  {deletedTasks.map(task => (
                    <TouchableOpacity
                      key={task.id}
                      style={styles.deletedTaskItem}
                      onPress={() => removeDeletedTask(task.id)}
                    >
                      <Text>{task.title}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity style={styles.removeAllButton} onPress={removeAllDeletedTasks}>
                  <Text style={styles.removeAllText}>Remove All Deleted</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowDeletedModal(false)}>
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4', 
  },
  darkTheme: {
    backgroundColor: '#8E7AB5', 
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FDBF60',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#333',
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#FDBF60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: '#FDBF60',
  },
  categoryText: {
    color: '#333',
    marginLeft: 5,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  completedTask: {
    backgroundColor: '#f0f0f0',
  },
  taskTitle: {
    flex: 1,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'black', 
  },
  deletedTasksButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  deletedModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  deletedModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  deletedModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  deletedTaskList: {
    maxHeight: 200,
  },
  deletedTaskItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  removeAllButton: {
    backgroundColor: '#FDBF60',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeAllText: {
    color: '#fff',
    textAlign: 'center',
  },
  closeModalButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeModalText: {
    color: '#000',
    textAlign: 'center',
  },
});

export default ToDoListApp;
