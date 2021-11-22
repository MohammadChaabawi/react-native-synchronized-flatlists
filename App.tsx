/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import Home from './src/containers/Home/Home';
import Navbar from './src/components/navbar/Navbar';

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <Navbar />
      <Home />
    </SafeAreaView>
  );
};

export default App;
