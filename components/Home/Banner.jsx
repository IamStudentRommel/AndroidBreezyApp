import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

const Banner = ({data}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const index = Math.round(contentOffset.x / Dimensions.get('window').width);
    setActiveIndex(index);
  };

  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
    </View>
  );

  const renderText = () => {
    if (data.length > 0) {
      return <Text style={styles.crimeContent}>{data[activeIndex].text}</Text>;
    }
    return null;
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
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
          {data.map((_, index) => (
            <View key={index} />
          ))}
        </View>
      </View>
      <View>{renderText()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '55%',
    width: '96%',
    marginLeft: '2%',
    marginRight: '3%',
    marginBottom: '2%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imageContainer: {
    width: Dimensions.get('window').width,
    height: '100%',

    alignItems: 'center',
  },
  image: {
    margin: 5,
    width: '100%',
    height: '100%',
  },
  crimeContent: {
    marginTop: 10,
    textAlign: 'center',
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
