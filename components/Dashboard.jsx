import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, ScrollView, StyleSheet} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {db, collection, getDocs} from '../firebase/conf';

const Report = () => {
  const [sector, setSector] = useState([]);
  const [sectorCount, setSectorCount] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSectorVal = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'sector_tbl'));
      const newSecData = querySnapshot.docs.map(doc => doc.data().Sector);
      const newSecCountData = querySnapshot.docs.map(doc => doc.data().Count);
      const uniqueSectors = [...new Set(newSecData)]; // Filter out duplicate sector values and update the state
      const uniqueSectorsCount = [...new Set(newSecCountData)];
      setSector(uniqueSectors);
      setSectorCount(uniqueSectorsCount);
      setLoading(false);
      // console.log(sector);
      // console.log(sectorCount);
    } catch (e) {
      console.error('Error pulling data: ', e);
    }
  };

  useEffect(() => {
    getSectorVal();
  }, []);

  const data = {
    labels: sector,
    datasets: [
      {
        data: sectorCount,
      },
    ],
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const piedata = [
    {
      name: 'Calgary',
      crimes: 90,
      color: '#ff0000',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Edmonton',
      crimes: 100,
      color: '#0000b3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Crime Rates</Text>
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

      {/* <Text>My Line Chart</Text> */}
      <ScrollView horizontal>
        <LineChart
          data={data}
          width={(Dimensions.get('window').width * sector.length) / 5} // Adjust the width as needed
          height={250}
          //yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#333333',
            backgroundGradientFrom: '#333333',
            backgroundGradientTo: '#003300',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            formatYLabel: label => parseInt(label, 10).toString(),
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={{
            borderRadius: 10,
          }}
          onDataPointClick={({value, getColor}) =>
            showMessage({
              message: 'Total no. of crime',
              description: `${value}`,
              backgroundColor: getColor(0.9),
            })
          }
        />
      </ScrollView>
      {/* FlashMessage component */}
      <View style={styles.flashMessageContainer}>
        <FlashMessage
          duration={5000}
          style={{backgroundColor: '#ffa726'}} // Change background color to orange
        />
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
  title: {
    marginTop: 30,
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffffff',
  },
  flashMessageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 295,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Report;
