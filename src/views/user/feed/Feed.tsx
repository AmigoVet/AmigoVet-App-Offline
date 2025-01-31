import { View, Text } from 'react-native'
import React from 'react'
import { createGlobalStyles } from '../../../assets/styles/styles'
import HeaderFeed from './components/HeaderFeed';
import FilterBarFeed from './components/FilterBarFeed';
import ProgramerFeed from './components/ProgramerFeed';
import NoticesFeed from './components/NoticesFeed';
import useAuthStore from '../../../lib/store/authStore';
import { ScrollView } from 'react-native-gesture-handler';
import { newColors } from '../../../assets/styles/colors';

const Feed = () => {

  const globalStyles = createGlobalStyles(false);
  const user = useAuthStore((state) => state.user);

  return (
    <ScrollView style={{backgroundColor: newColors.fondo_principal}}>
      <HeaderFeed userName={user?.nombre} />
      <FilterBarFeed />
      <ProgramerFeed />
      <NoticesFeed />
    </ScrollView>
  )
}

export default Feed