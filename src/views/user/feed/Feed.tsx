import { View, Text } from 'react-native'
import React from 'react'
import { createGlobalStyles } from '../../../assets/styles/styles'
import HeaderFeed from './components/HeaderFeed';
import FilterBarFeed from './components/FilterBarFeed';
import ProgramerFeed from './components/ProgramerFeed';
import NoticesFeed from './components/NoticesFeed';

const Feed = () => {

  const globalStyles = createGlobalStyles(false);

  return (
    <View style={globalStyles.container}>
      <HeaderFeed />
      <FilterBarFeed />
      <ProgramerFeed />
      <NoticesFeed />
    </View>
  )
}

export default Feed