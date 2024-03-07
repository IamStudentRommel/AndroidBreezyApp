import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

const Banner = ({text, images}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const index = Math.round(contentOffset.x / Dimensions.get('window').width);
    setActiveIndex(index);
  };

  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} resizeMode="contain" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToInterval={Dimensions.get('window').width}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />

      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '45%',
    width: '96%',
    marginLeft: '2%',
    marginRight: '3%',
    marginBottom: '2%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    // backgroundColor: '#000033',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  imageContainer: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  image: {
    marginTop: 30,
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  dot: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
});

export default Banner;
