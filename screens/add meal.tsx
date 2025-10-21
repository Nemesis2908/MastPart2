import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import  { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  home: undefined; 
  Mainmenu: undefined; 
  addmeal: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'addmeal'>;

const AddMealScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  // A simple handler for the save button
  const handleSaveMeal = () => {
    if (!name || !description || !course || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Get the onAddMeal function passed from the menu screen
    const { onAddMeal } = route.params;
    onAddMeal({ name, description, course, price });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Add a New Meal</Text>
        <TextInput style={styles.textinput} placeholder="Meal Name" value={name} onChangeText={setName} />
        <TextInput style={styles.textinput} placeholder="Description" value={description} onChangeText={setDescription} multiline />
        <TextInput style={styles.textinput} placeholder="Course" value={course} onChangeText={setCourse} multiline />
        <TextInput style={styles.textinput} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveMeal}>
          <Text style={styles.saveButtonText}>Save Meal</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7c02ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f15e09ff',
    marginBottom: 20,
  },
  textinput: {
    width: '100%',
    minHeight: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  saveButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#f15e09ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddMealScreen;