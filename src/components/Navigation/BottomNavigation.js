import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import MovieDetails from '../../screens/MovieDetails';
import Favorites from '../../screens/Favourite';
// import cart from '../../screens/Cart/cart';
import {StyleSheet, Text, View} from 'react-native';
import homeicon from '../../Assets/home.png';
import favouriteicon from '../../Assets/Favourite.png'
import {Image} from 'react-native';
import HomeStack from './Stack/HomeStack'
import display from '../Display';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    <Tab.Navigator

      screenOptions={{
        headerShown: false,
        //  tabBarStyle: styles.tabBar,
        // tabBarBackground: () => <View style={{backgroundColor:'red'}} />,
        tabBarShowLabel: true,
        tabBarActiveTintColor:"#d3d3d3",
        tabBarInactiveTintColor:"#d3d3d3",
        tabBarHideOnKeyboard:true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent', 
          elevation: 0,
          borderTopWidth: 0, 
        },
       
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop: 10,
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? 'white' : '#d3d3d3',
                }}
                source={homeicon}
              />

              {/* <Text style={{color: focused ? 'red' : '#d3d3d3', fontSize: 10}}>
                Home
              </Text> */}
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />

{/*  
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop: 10,
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? 'red' : '#d3d3d3',
                }}
                source={homeicon}
              />

             
            </View>
          ),
        }}
        name="MovieDetails"
        component={MovieDetails}
      /> */}


      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop: 10,
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? 'red' : '#d3d3d3',
                }}
                source={favouriteicon}
              />
{/* 
              <Text style={{color: focused ? 'red' : '#d3d3d3', fontSize: 10}}>
                Favourite
              </Text> */}
            </View>
          ),
        }}
        name="Favorites"
        component={Favorites}
      />
    </Tab.Navigator>
    </View>
  );
};


const MainNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        <Stack.Screen name='display' component={display} />
      </Stack.Navigator>
    );
  };

const styles = StyleSheet.create({
  //   screen: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: 'black', // Dark background to see the effect
  //     // opacity:0.1,
  //   },

  tabBar: {
    margin: '1%',
    // padding:10,
    // position: 'absolute',
    // bottom: 20,
    // left: 20,
    // right: 20,
    // height: 60,
    borderRadius: 30,
    //backgroundColor: 'transparent', 
    //borderTopWidth: 0, 
    elevation: 1, 
    backgroundColor: 'black',
  },

  transparentBg: {
    //position: 'absolute',
    // backgroundColor: 'transparent',
    // width: '100%',
    // height: '100%',
  },
});
export default MainNavigator;
