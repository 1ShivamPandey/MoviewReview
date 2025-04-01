import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [movies, setMovies] = useState([]); // Stores all fetched movies
  const [visibleMovies, setVisibleMovies] = useState([]); // Movies to display
  const [loadedCount, setLoadedCount] = useState(50); // Start with 50 movies
  const [page, setPage] = useState(1); // Tracks API page number
  const navigation = useNavigation();
  const API_KEY = '6b46e15b';

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      let allMovies = [];
      
      // Fetch multiple pages (OMDb API returns 10 per page)
      for (let i = 1; i <= 5; i++) { // Fetch 5 pages (50 movies)
        const res = await axios.get(`https://www.omdbapi.com/?s=Bollywood&apikey=${API_KEY}&page=${i}`);
        if (res.data.Search) {
          allMovies = [...allMovies, ...res.data.Search];
        }
      }

      setMovies(allMovies);
      setVisibleMovies(allMovies.slice(0, 50)); // Show first 50 movies
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const loadMoreMovies = () => {
    const nextMovies = movies.slice(0, loadedCount + 10);
    setVisibleMovies(nextMovies);
    setLoadedCount(loadedCount + 10);
  };

  return (
    <View>
      <FlatList
        data={visibleMovies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movieId: item.imdbID })}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Image source={{ uri: item.Poster }} style={{ width: 50, height: 75, marginRight: 10 }} />
              <Text>{item.Title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {visibleMovies.length < movies.length && (
        <Button title="Load More" onPress={loadMoreMovies} />
      )}
    </View>
  );
};

export default Home;
