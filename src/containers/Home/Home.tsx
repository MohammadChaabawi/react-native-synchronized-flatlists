import React from 'react';
import {View} from 'react-native';
import ContactList from "../../components/contact/ContactProfileList"

const Home: React.FC = () => {
  return (
      <View>
        <ContactList />
      </View>
  );
};

export default Home;
