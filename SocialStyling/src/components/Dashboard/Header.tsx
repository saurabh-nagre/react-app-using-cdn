import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FILTERICON} from '../svgs';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Socials & Accounts</Text>
        <Image source={{uri: FILTERICON}} style={styles.button} />
      </View>
      <View style={styles.content}>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
          ratione provident voluptates
        </Text>
        <Image
          source={require('../../assets/profile.jpg')}
          style={styles.profileImage}
        />

        <Text style={styles.percentage}>
          6<Text style={styles.headerText}>%</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#68b0f2',
    margin: '2%',
    padding: '5%',
    borderRadius: 40,
    height: '100%',
    borderBottomWidth: 10,
    borderColor: '#ffffff',
    shadowColor: '#52006A',
    elevation: 10,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  desc: {
    color: '#ffffff',
    fontSize: 12,
    margin: '5%',
    marginVertical: '10%',
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 90,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginVertical: '5%',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  percentage: {
    color: '#ffffff',
    fontSize: 40,
    marginTop: '10%',
  },
});
