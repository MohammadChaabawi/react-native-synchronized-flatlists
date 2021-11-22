import React from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import {getProfileImage} from '../../helpers/profileHelpers';

interface Props {
  name: string;
  isSelected: boolean;
}

const {width} = Dimensions.get("window")

const ProfileImage: React.FC<Props> = ({name, isSelected}: Props) => {
  const imagePath = getProfileImage(name)
  return (
    <View
      style={[
        styles.ProfileImageContainer,
        {borderColor: isSelected ? 'lightblue' : "transparent" , borderWidth: isSelected ? 4 : 0, marginRight: isSelected ? 18 : 10},
      ]}>
      <Image style={styles.ProfileImage} source={imagePath} />
    </View>
  );
};

const styles = StyleSheet.create({
  ProfileImageContainer: {
    borderRadius: 50,
    height: 88,
    width: 88,
  },
  ProfileImage: {
    height: 80,
    width: 80,
  },
});

export default ProfileImage;
