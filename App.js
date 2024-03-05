import React, { useState } from 'react';
import { View } from 'react-native';
import ToDoListApp from './src/screens/ToDoListApp';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <ToDoListApp />
    </View>
  );
};

export default App;
