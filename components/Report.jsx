import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {LineChart, BarChart, PieChart} from 'react-native-chart-kit';
import {db, collection, getDocs} from '../firebase/conf';

export default function MyLineChart() {
  const [sector, setSector] = useState([]);
  const [sectorCount, setSectorCount] = useState([]);

  const getSectorVal = async e => {
    try {
      const querySnapshot = await getDocs(collection(db, 'sector_tbl'));
      const newSecData = querySnapshot.docs.map(doc => doc.data().Sector);
      const newSecCountData = querySnapshot.docs.map(doc => doc.data().Count);
      const uniqueSectors = [...new Set(newSecData)]; // Filter out duplicate sector values and update the state
      const uniqueSectorsCount = [...new Set(newSecCountData)];
      setSector(uniqueSectors);
      setSectorCount(uniqueSectorsCount);

      console.log(sector);
      console.log(sectorCount);
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

  const piedata = [
    {
      name: 'Calgary',
      crimes: 90,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Edmonton',
      crimes: 100,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View>
      <Text>My Line Chart</Text>
      <ScrollView horizontal>
        <LineChart
          data={data}
          width={(Dimensions.get('window').width * sector.length) / 5} // Adjust the width as needed
          height={250}
          //yAxisLabel={'$'}
          chartConfig={{
            backgroundGradientFrom: 'darkblue',
            backgroundGradientTo: 'blue',
            color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
            formatYLabel: label => parseInt(label, 10).toString(),
          }}
        />
      </ScrollView>

      <Text>My Bar Chart</Text>
      <ScrollView horizontal>
        <BarChart
          data={data}
          width={(Dimensions.get('window').width * sector.length) / 5} // Adjust the width as needed
          height={250}
          //yAxisLabel={'$'}
          chartConfig={{
            backgroundGradientFrom: 'darkblue',
            backgroundGradientTo: 'blue',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            formatYLabel: label => parseInt(label, 10).toString(),
          }}
        />
      </ScrollView>

      <Text>My Pie Chart</Text>
      <PieChart
        data={piedata}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundGradientFrom: 'darkblue',
          backgroundGradientTo: 'blue',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="crimes"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}
