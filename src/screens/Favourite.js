import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
const navigation = useNavigation()
  //   useEffect(() => {
  //     const loadFavorites = async () => {
  //       const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
  //       setFavorites(favs);
  //     };
  //     loadFavorites();
  //   }, []);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
        setFavorites(favs);
      };
      loadFavorites();
    }, [favorites]),
  );

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={item => item.imdbID}
        renderItem={({item}) => (
            <TouchableOpacity onPress={()=> navigation.navigate('MovieDetails',{movieId:item.imdbID})}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Image
              source={{uri: item.Poster}}
              style={{width: 50, height: 75, marginRight: 10}}
            />
            <View style={{display:'flex', flexDirection:'column'}}>
            <Text>{item.Title}</Text>
            <Text>Year : {item.Year}</Text>
            </View>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
