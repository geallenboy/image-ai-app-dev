import React from "react";
import { View, Text, TextInput as TextInput } from "react-native";

const MyTextInput = ({ useInputValue }: any) => {
  return (
    <View
      style={{
        marginTop: 10
      }}
    >
      <Text>Enter your prompt</Text>
      <TextInput
        placeholder="Enter you prompt here..."
        numberOfLines={5}
        multiline={true}
        textAlignVertical="top"
        onChangeText={(value) => useInputValue(value)}
        style={{
          padding: 15,
          borderRadius: 15,
          backgroundColor: "#ccc",
          marginTop: 10
        }}
      />
    </View>
  );
};

export default MyTextInput;
