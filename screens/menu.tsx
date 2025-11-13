import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getMenuItems, subscribe, MenuItem, removeMenuItem } from './menuService';

type RootStackParamList = {
  home: undefined;
  Mainmenu: undefined;
  addmeal: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Mainmenu'>; // navigation and route

const handleLinkPress = async (url: string, errorMessage: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Error', errorMessage);
  }
};

const Mainmenu = ({ navigation, route }: { navigation: any, route: any }) => {
  const userRole = route.params?.userRole || 'customer';

  const [menuItems, setMenuItems] = useState<MenuItem[]>(getMenuItems());
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [filterCourse, setFilterCourse] = useState<'All' | 'Starter' | 'Main Dish' | 'Dessert'>('All');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = subscribe(setMenuItems);
    return () => unsubscribe();
  }, []);

  const handleRemoveItem = (itemId: string) => {
    removeMenuItem(itemId);
    setSelectedItemId(null); // removal feature
  };

  const getFilteredMenuItems = () => {
    if (filterCourse === 'All') {
      return menuItems;
    }
    return menuItems.filter(item => item.course === filterCourse); // sort feature
  };

  const courseTypes: ('All' | 'Starter' | 'Main Dish' | 'Dessert')[] = ['All', 'Starter', 'Main Dish', 'Dessert'];


  return (
    <ImageBackground
      source={require('../assets/simple-shape-background.jpg')}
      style={styles.backgroundImage}
      resizeMode="stretch">
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Menu ({menuItems.length})</Text>
          {userRole === 'chief' && (
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('addmeal')}>
              <Text style={styles.addButtonText}>Add Meal</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.sortContainer}>
          {courseTypes.map(course => (
            <TouchableOpacity 
              key={course} 
              style={[styles.sortButton, filterCourse === course && styles.selectedSortButton]} 
              onPress={() => setFilterCourse(course)}>
              <Text style={[styles.sortButtonText, filterCourse === course && styles.selectedSortButtonText]}>{course === 'Main Dish' ? 'Mains' : course}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {getFilteredMenuItems().map((item) => {
          const isSelected = item.id === selectedItemId;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedItemId(isSelected ? null : item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.menuItem, isSelected && styles.selectedMenuItem]}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemDescription}>{item.course}</Text>
                </View>
                {isSelected && userRole === 'chief' && (
                  <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id!)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                )}
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#f15e09ff',
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 2,
    borderColor: 'transparent', 
  },
  selectedMenuItem: {
    borderColor: '#f15e09ff', // Outline color when selected
    shadowColor: '#f15e09ff',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 20,
    color: '#000000ff',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000ff',
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    right: 15,
    backgroundColor: '#f15e09ff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#d9534f', // colour for removal
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  sortButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedSortButton: {
    backgroundColor: '#f15e09ff',
  },
  sortButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedSortButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Mainmenu;