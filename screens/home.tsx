import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import  { NativeStackScreenProps } from '@react-navigation/native-stack';

// navigation
type RootStackParamList = {
  home: undefined; 
  Mainmenu: undefined; 
};

type Props = NativeStackScreenProps<RootStackParamList, 'home'>;

const home = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.logo} source={require('../assets/iconapp.png')} /> 
        <Text style={styles.boxText}>FoodieHub</Text>
        <Text style={styles.subtitleText}>Welcome!! Ready to explore delicious meals together</Text>
        <TextInput style={styles.textinput} placeholder="Enter your email" />   
        <TextInput style={styles.textinput} placeholder="Enter your password" secureTextEntry={true} />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Mainmenu')}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
// ui design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7c02ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 600,
    height: 900,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  boxText: {
    color: '#f15e09ff',
    fontSize: 75,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 25,
    color: '#070000ff',
    marginTop: 10,
  },
  textinput: {
    width: '80%',
    height: 50,
    borderColor: '#050000ff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 20,
    marginTop: 20,
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#f15e09ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

});
export default home;