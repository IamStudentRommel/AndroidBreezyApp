import React, {useState, useEffect, useRef} from 'react';
import Filter from './Filter';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
// import FlashMessage, {showMessage} from 'react-native-flash-message';
import {PieChart} from 'react-native-chart-kit';
// import {db, collection, getDocs} from '../../firebase/conf';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import mapCustomStyle from '../../data/mapCustomStyle.json';
import ClusteredMapView from 'react-native-map-clustering';
import Test from '../../data/test.json';

const Report = () => {
  const [sector, setSector] = useState([]);
  const [sectorCount, setSectorCount] = useState([]);
  const [initLoading, setInitLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [sec, setSec] = useState({});

  const options = ['2020', '2021', '2022', '2023'];
  const [selectedYear, setSelectedYear] = useState('2023');

  const [initialLocation, setInitialLocation] = useState({
    latitude: 51.05011,
    longitude: -114.08529,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  });
  const [loading, setLoading] = useState(true);

  const mapRef = useRef(null);
  const reCenter = () => {
    mapRef.current?.animateToRegion(initialLocation, 1000);
  };

  const handleOptionSelect = option => {
    setSelectedYear(option);
    reCenter();
  };

  // const getSectorVal = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'sector_tbl'));
  //     const newSecData = querySnapshot.docs.map(doc => doc.data().Sector);
  //     const newSecCountData = querySnapshot.docs.map(doc => doc.data().Count);
  //     const uniqueSectors = [...new Set(newSecData)]; // Filter out duplicate sector values and update the state
  //     const uniqueSectorsCount = [...new Set(newSecCountData)];
  //     setSector(uniqueSectors);
  //     setSectorCount(uniqueSectorsCount);
  //     setInitLoading(false);
  //     // console.log(sector);
  //     // console.log(sectorCount);
  //   } catch (e) {
  //     console.error('Error pulling data: ', e);
  //   }
  // };

  const fetchData = async selectedYear => {
    try {
      const response = await fetch(
        'https://data.calgary.ca/resource/78gh-n26t.json',
      );
      // const jdata = await response.json();
      const jdata = Test;
      console.log(selectedYear);
      const data = jdata.filter(entry => entry.year === selectedYear);
      setIncidents(data);

      const sectorsSet = new Set(data.map(incident => incident.sector));
      const distinctSectors = Array.from(sectorsSet);

      const sectorData = {};
      distinctSectors.forEach(sector => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const paddedRandomColor = '#' + randomColor.padStart(6, '0');
        sectorData[sector] = [0, paddedRandomColor];
      });

      data.forEach(incident => {
        sectorData[incident.sector][0]++;
      });

      // console.log(sectorData);
      setSec(sectorData);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  // useEffect(() => {
  //   getSectorVal();
  // }, []);

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // refreshLocation();
  }, []);

  const data = {
    labels: sector,
    datasets: [
      {
        data: sectorCount,
      },
    ],
  };

  const piedata = [];
  for (const sector in sec) {
    if (sec.hasOwnProperty(sector)) {
      const [crimes, color] = sec[sector];
      piedata.push({
        name: sector,
        crimes: crimes,
        color: color,
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      });
    }
  }
  piedata.sort((a, b) => a.name.localeCompare(b.name));

  // if (initLoading) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Crime Count</Text>
      <Filter options={options} onSelect={handleOptionSelect} />
      <PieChart
        data={piedata}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundGradientFrom: 'darkblue',
          backgroundGradientTo: 'blue',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          formatLabel: (value, name) => `${name}: ${(value * 100).toFixed(2)}%`,
        }}
        accessor="crimes"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        ) : (
          <View style={styles.mapContainer}>
            <ClusteredMapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={initialLocation}
              customMapStyle={mapCustomStyle}>
              {incidents.map(marker => {
                if (marker.year === selectedYear) {
                  try {
                    const coordinates = {
                      latitude: marker.community_center_point.coordinates[1],
                      longitude: marker.community_center_point.coordinates[0],
                    };
                    const desc = `${marker.date.split('T')[0]} ${
                      marker.category
                    }`;
                    return (
                      <Marker
                        key={marker.id}
                        coordinate={coordinates}
                        title={marker.community_name}
                        description={desc}>
                        <Image
                          source={require('../../assets/zombie.png')}
                          style={{width: 30, height: 30}}
                        />
                      </Marker>
                    );
                  } catch (error) {
                    return null;
                  }
                }
              })}
            </ClusteredMapView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
    backgroundColor: '#00001a',
  },
  mapContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height / 2,
    flex: 1,
    // borderColor: '#ffffff',
    borderWidth: 3,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    marginTop: 5,
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff',
  },
  flashMessageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 290,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Report;
