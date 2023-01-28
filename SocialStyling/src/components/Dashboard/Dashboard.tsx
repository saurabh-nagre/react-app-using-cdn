import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './Header';
import Icons from './Icons';

export default function Dashboard() {
  return (
    <View style={styles.dashboard}>
      <View style={styles.headerCard}>
        <Header />
      </View>
      <View style={styles.icons}>
        <Icons />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerCard: {
    width: '100%',
    height: '50%',
  },
  icons: {
    height: '50%',
    width: '100%',
  },
});
