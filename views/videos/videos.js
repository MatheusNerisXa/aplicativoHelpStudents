import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Platform } from 'react-native';
import axios from 'axios';
import WebView from 'react-native-webview';
import config from '../../config/config.json';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const VideoScreen = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('title');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(config.urlRootNode + 'videos');
      const updatedVideos = response.data.map(video => ({
        ...video,
        coverImage: `https://img.youtube.com/vi/${getVideoId(video.videoLink)}/0.jpg`
      }));
      setVideos(updatedVideos);
      setFilteredVideos(updatedVideos);
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
    }
  };

  const getVideoId = (videoLink) => {
    const videoId = videoLink.split('v=')[1];
    return videoId.split('&')[0];
  };

  const handleFilter = () => {
    let filtered = videos.filter(video => {
      const searchValue = filter.toLowerCase();
      const title = video.title.toLowerCase();
      const matter = video.matter.toLowerCase();
      return title.includes(searchValue) || matter.includes(searchValue);
    });
    setFilteredVideos(filtered);
  };

  const handleVideoPress = (video) => {
    setSelectedVideo(video);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar"
            value={filter}
            onChangeText={text => setFilter(text)}
            placeholderTextColor="#FFF"
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={handleFilter}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.filterOptionContainer}>
          <TouchableOpacity
            style={[styles.filterOption, filterType === 'title' && styles.activeFilterOption]}
            onPress={() => setFilterType('title')}>
            <Text style={styles.filterOptionText}>Título</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterOption, filterType === 'matter' && styles.activeFilterOption]}
            onPress={() => setFilterType('matter')}>
            <Text style={styles.filterOptionText}>Matéria</Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedVideo && (
        <WebView
          source={{ uri: selectedVideo.videoLink }}
          style={[styles.video, { marginTop: 20, marginBottom: 20, borderColor: '#253494', borderWidth: 1 }]}
        />
      )}
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleVideoPress(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.coverImage }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.bottomContainer}>
                  <View style={styles.matterContainer}>
                    <MaterialIcons name="school" size={18} color="#253494" style={styles.categoryIcon} />
                    <Text style={styles.matter}>{item.matter}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#253494',
    borderRadius: 5,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontFamily: 'sans-serif',
    fontSize: 14,
    color: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  filterOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: '#ff9800',
    borderRadius: 20,
  },
  activeFilterOption: {
    backgroundColor: '#ff5722',
  },
  filterOptionText: {
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: 14,
  },
  itemContainer: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    borderColor: '#253494',
    borderWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'sans-serif',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  matterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matter: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'sans-serif',
    marginLeft: 5,
  },
  categoryIcon: {
    marginRight: 5,
  },
  video: {
    flex: 1,
    height: Platform.OS === 'ios' ? 200 : 300, // Adjust as needed for Android
    borderRadius: 10,
    overflow: 'hidden',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default VideoScreen;
