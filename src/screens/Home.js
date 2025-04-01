import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import searchIcon from '../Assets/search.png';
const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const fetchMovies = async (newPage = 1) => {
    const API_KEY = '6b46e15b';
    const res = await axios.get(
      `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${newPage}`,
    );
    if (res.data.Search) {
      console.log('response is........... ', res);
      setMovies(
        newPage === 1 ? res.data.Search : [...movies, ...res.data.Search],
      );
      setPage(newPage);
      //  setMovies(res.data.Search)
    }
  };

  return (
    <View style={{backgroundColor: 'black',height:'100%'}}>
      <View style={{backgroundColor: 'black'}}>
        <View style={{margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 10,
              // paddingHorizontal: 5,
              width: '100%',
              borderColor: 'black',
            }}>
            <Image
              source={searchIcon}
              // style={{ width: 20, height: 20,  }}
            />
            <TextInput
              style={{color: 'white'}}
              placeholderTextColor="white"
              placeholder="Search your movies..."
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => fetchMovies(1)}
              // style={{ flex: 1, paddingVertical: 8 }}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={movies}
            keyExtractor={item => item.imdbID}
            onEndReached={() => fetchMovies(page + 1)}
            onEndReachedThreshold={5}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MovieDetails', {movieId: item.imdbID})
                }>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 10,
                    // backgroundColor: 'black',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'black',
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      // boxShadow: {
                      //   shadowColor: 'red',
                      //   shadowOffset: { width: 0, height: 2 },
                      //   shadowOpacity: 0.25,
                      //   shadowRadius: 3.84,
                      //   elevation: 5,
                      // },
                      shadowColor: 'blue',
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      shadowOffset: {width: 2, height: 2},
                      elevation: 20,
                    }}>
                    <View>
                      <Image
                        source={{uri: item.Poster}}
                        style={{
                          width: 100,
                          height: 100,
                          marginRight: 10,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        }}
                      />
                    </View>

                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <Text style={{color: 'white'}}>{item.Title}</Text>
                      {console.log('the item is ', item)}

                      <Text style={{color: 'white'}}>Year : {item.Year}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* <Display/> */}
      </View>
     

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
    Search your Movies 🎬 here . . .
  </Text>
</View>

    </View>
  );
};

export default Home;
