import { Button } from 'react-native';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import notifee from '@notifee/react-native';

const Feed = () => {

  const sendNotification = async () => {
    notifee
    .incrementBadgeCount()
    .then(() => notifee.getBadgeCount())
    .then(count => console.log('Badge count incremented by 1 to: ', count));

  };


  return (
    <GlobalContainer>
      <Header title="Feed" />
      <Button title="Enviar Notificación" onPress={sendNotification} />
    </GlobalContainer>
  );
};

export default Feed;
