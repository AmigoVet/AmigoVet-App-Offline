import { View, Text } from 'react-native'
import React from 'react'
import { createGlobalStyles } from '../../../assets/styles/styles'
import HeaderFeed from './components/HeaderFeed';
import FilterBarFeed from './components/FilterBarFeed';
import ProgramerFeed from './components/ProgramerFeed';
import NoticesFeed from './components/NoticesFeed';
import useAuthStore from '../../../lib/store/authStore';

const Feed = () => {

  const globalStyles = createGlobalStyles(false);
  const user = useAuthStore((state) => state.user);

  return (
    <View style={globalStyles.container}>
      <HeaderFeed userName={user?.nombre} />
      <FilterBarFeed />
      <ProgramerFeed />
      <NoticesFeed />
    </View>
  )
}

export default Feed