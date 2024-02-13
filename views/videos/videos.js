import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import WebView from 'react-native-webview';
import config from '../../config/config.json';

const VideoScreen = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [filter, setFilter] = useState('');
  const [matterFilter, setMatterFilter] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(config.urlRootNode + 'videos');
      setVideos(response.data);
      setFilteredVideos(response.data);
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
    }
  };

  const handleFilter = () => {
    let filtered = videos.filter(video => {
      if (filter && matterFilter) {
        return video.title.toLowerCase().includes(filter.toLowerCase()) && video.matter.toLowerCase() === matterFilter.toLowerCase();
      } else if (filter) {
        return video.title.toLowerCase().includes(filter.toLowerCase());
      } else if (matterFilter) {
        return video.matter.toLowerCase() === matterFilter.toLowerCase();
      } else {
        return true;
      }
    });
    setFilteredVideos(filtered);
  };

  const handleVideoPress = (video) => {
    setSelectedVideo(video);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Filtrar por título"
        value={filter}
        onChangeText={text => setFilter(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Filtrar por matter"
        value={matterFilter}
        onChangeText={text => setMatterFilter(text)}
      />
      <Button title="Filtrar" onPress={handleFilter} />
      {selectedVideo && (
        <WebView
          source={{ uri: selectedVideo.videoLink }}
          style={styles.video}
        />
      )}
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleVideoPress(item)}>
            <Image source={{ uri: item.coverImage }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.matter}>{item.matter}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  matter: {
    fontSize: 14,
    color: 'gray',
  },
  video: {
    flex: 1,
    marginTop: 20,
    height: 200, // Defina a altura conforme necessário
  },
});

export default VideoScreen;
