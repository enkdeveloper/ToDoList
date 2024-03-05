import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const SwitchButton = ({ onSwitch }) => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    const newState = !isOn;
    setIsOn(newState);
    onSwitch(newState);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#f4f3f4" }}
        thumbColor={isOn ? "#474F7A" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isOn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },
});

export default SwitchButton;
