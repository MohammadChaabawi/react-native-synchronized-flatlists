import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';

const Navbar: React.FC = () => {
  return (
    <View style={styles.NavbarContainer}>
        <Text style={styles.NavbarTitle}>Contacts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    NavbarContainer: {
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primaryColor
    },
    NavbarTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "black"
    }
})

export default Navbar;