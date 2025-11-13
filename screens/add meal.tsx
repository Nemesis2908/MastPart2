import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import  { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addMenuItem } from './menuService';

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

  
  const handleSaveMeal = () => {
    if (!name || !description || !course || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // navgation
    addMenuItem({ name, description, course, price });
    navigation.goBack();
  };
  // ui and adding feature
  return (
    <ImageBackground
      source={require('../assets/simple-shape-background.jpg')}
      style={styles.backgroundImage}
      resizeMode="stretch">
      <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.title}>Add a New Meal</Text>
        <TextInput style={styles.textinput} placeholder="Meal Name" value={name} onChangeText={setName} />
        <TextInput style={styles.textinput} placeholder="Description" value={description} onChangeText={setDescription} multiline />
        <View style={styles.courseContainer}>
          <TouchableOpacity style={[styles.courseButton, course === 'Starter' && styles.selectedCourseButton]} onPress={() => setCourse('Starter')}>
            <Text style={[styles.courseButtonText, course === 'Starter' && styles.selectedCourseButtonText]}>Starter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.courseButton, course === 'Main Dish' && styles.selectedCourseButton]} onPress={() => setCourse('Main Dish')}>
            <Text style={[styles.courseButtonText, course === 'Main Dish' && styles.selectedCourseButtonText]}>Main Dish</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.courseButton, course === 'Dessert' && styles.selectedCourseButton]} onPress={() => setCourse('Dessert')}>
            <Text style={[styles.courseButtonText, course === 'Dessert' && styles.selectedCourseButtonText]}>Dessert</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.textinput} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveMeal}>
          <Text style={styles.saveButtonText}>Save Meal</Text>
        </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
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
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  courseButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedCourseButton: {
    backgroundColor: '#f15e09ff',
    borderColor: '#f15e09ff',
  },
  courseButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedCourseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddMealScreen;