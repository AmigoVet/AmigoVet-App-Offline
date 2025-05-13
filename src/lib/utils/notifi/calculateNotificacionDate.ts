import { sendNotifi as typeSendNotifi } from '../../interfaces/Events';


export const calculateNotificationDate = (dateEvent: Date, sendNotifi: typeSendNotifi): Date => {
  const notifiDate = new Date(dateEvent);

  switch (sendNotifi) {
    case '1d':
      notifiDate.setDate(dateEvent.getDate() - 1);
      break;
    case '2d':
      notifiDate.setDate(dateEvent.getDate() - 2);
      break;
    case '3d':
      notifiDate.setDate(dateEvent.getDate() - 3);
      break;
    case '4d':
      notifiDate.setDate(dateEvent.getDate() - 4);
      break;
    case '5d':
      notifiDate.setDate(dateEvent.getDate() - 5);
      break;
    case '1w':
      notifiDate.setDate(dateEvent.getDate() - 7);
      break;
    case '2w':
      notifiDate.setDate(dateEvent.getDate() - 14);
      break;
    default:
      throw new Error('Invalid sendNotifi value');
  }

  return notifiDate;
};
