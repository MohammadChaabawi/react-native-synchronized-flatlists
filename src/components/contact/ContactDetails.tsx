import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Profile} from './types';

interface Props {
  profileDetails: Profile;
}

const ContactDetails: React.FC<Props> = ({profileDetails}: Props) => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.contactNameContainer}>
        <Text style={styles.fullName}>
          <Text style={styles.firstName}>{profileDetails.name}</Text>
        </Text>
        <Text>{profileDetails.job}</Text>
      </View>
      <View style={styles.contactAboutContainer}>
        <Text style={styles.aboutTitle}>About Me</Text>
        <Text style={styles.aboutDescription}>
          {profileDetails.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {height: 800, paddingTop: 30},
  contactNameContainer: {
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fullName: {
    fontSize: 23,
    color: 'black',
  },
  firstName: {
    fontWeight: '700',
  },
  contactAboutContainer: {
    padding: 22,
    justifyContent: 'flex-start',
  },
  aboutTitle: {
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
  aboutDescription: {
    fontSize: 17,
    marginTop: 5,
  },
});

export default ContactDetails;
