import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, Button, Alert, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import FavouriteIcon from '../Assets/Favourite.png';
const MovieDetailsScreen = ({route}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  //   useEffect(() => {
  //     const fetchMovieDetails = async () => {
  //       const API_KEY = '6b46e15b';
  //       const res = await axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`);
  //       setMovie(res.data);
  //     };
  //     fetchMovieDetails();
  //   }, [])

  useFocusEffect(
    useCallback(() => {
      const fetchMovieDetails = async () => {
        const API_KEY = '6b46e15b';
        const res = await axios.get(
          `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`,
        );
        setMovie(res.data);
      };

      fetchMovieDetails();
    }, [movieId]),
  );

  const saveToFavorites = async () => {
    let favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      Alert.alert('saved to favourite list');
    }
  };

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
      {movie ? (
        <View
          style={{
             padding: 20,
            height: '100%',
            backgroundColor: 'white',
          }}>
          <View style={{display: 'flex', padding: 5}}>
            <Image
              source={{uri: movie.Poster}}
              style={{
                // borderTopLeftRadius:10,
                borderRadius: 10,
                width: 200,
                height: 300,
                alignSelf: 'center',
                shadowColor: 'blue',
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                shadowOffset: {width: 5, height: 10},
                elevation: 10,
              }}
            />
          </View>

          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black',marginTop:10}}>
            {movie.Title}
          </Text>

          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Year :</Text>
              <Text>{movie.Year}</Text>
            </View>

            <Text>Genre: {movie.Genre}</Text>
          </View> */}

          {/* <Text>IMDB Rating: {movie.imdbRating}</Text> */}

          <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Awards:</Text>
            <Text style={{color: 'blue'}}>{movie.Awards}</Text>
          </View>

          <View>
            <View
              style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontWeight: 'bold'}}>Actors :</Text>
              <Text>{movie.Actors}</Text>
            </View>

            <View
              style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontWeight: 'bold'}}>Directors :</Text>
              <Text>{movie.Director}</Text>
            </View>

            <View
              style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontWeight: 'bold'}}>Language Supported :</Text>
              <Text style={{color: 'blue', fontWeight: 'bold'}}>
                {movie.Language}
              </Text>
            </View>
          </View>

          <View style={{display: 'flex', alignItems: 'center',marginTop:20}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                borderRadius: 10,
                width: '100%',
                padding: 10,
              }}
              onPress={saveToFavorites}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Add to your Favourites ❤
              </Text>
            </TouchableOpacity>
            {console.log('movie data', movie)}
          </View>

        



        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default MovieDetailsScreen;
