import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {LineChart, BarChart, PieChart} from 'react-native-chart-kit';

export default function MyLineChart() {
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

  const data = {
    labels: ['', 'Calgary', 'Edmonton'],
    datasets: [
      {
        data: [0, 90, 100],
      },
    ],
  };

  return (
    <View>
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

      <Text>My Line Chart</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={200}
        //yAxisLabel={'$'}
        chartConfig={{
          backgroundGradientFrom: 'darkblue',
          backgroundGradientTo: 'blue',
          color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
          formatYLabel: label => parseInt(label, 10).toString(),
        }}
      />

      <Text>My Bar Chart</Text>
      <BarChart
        data={data}
        width={Dimensions.get('window').width}
        height={200}
        //yAxisLabel={'$'}
        chartConfig={{
          backgroundGradientFrom: 'darkblue',
          backgroundGradientTo: 'blue',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          formatYLabel: label => parseInt(label, 10).toString(),
        }}
      />
    </View>
  );
}
