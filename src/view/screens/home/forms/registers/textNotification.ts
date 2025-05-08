interface TextNotificationRegisterProps {
  yearNotification: string;
  monthNotification: string;
  dayNotification: string;
  hourNotification: string;
  minuteNotification: string;
  yearEvent: string;
  monthEvent: string;
  dayEvent: string;
  hourEvent: string;
  minuteEvent: string;
  description: string;
}

export const textNotificationRegister = ({
  yearNotification,
  monthNotification,
  dayNotification,
  hourNotification,
  minuteNotification,
  yearEvent,
  monthEvent,
  dayEvent,
  hourEvent,
  minuteEvent,
  description,
}: TextNotificationRegisterProps): string => {
  // Parse notification date
  const notificationDate = new Date(
    parseInt(yearNotification, 10),
    parseInt(monthNotification, 10) - 1,
    parseInt(dayNotification, 10),
    parseInt(hourNotification, 10),
    parseInt(minuteNotification, 10)
  );

  // Parse event date
  const eventDate = new Date(
    parseInt(yearEvent, 10),
    parseInt(monthEvent, 10) - 1,
    parseInt(dayEvent, 10),
    parseInt(hourEvent, 10),
    parseInt(minuteEvent, 10)
  );

  // Calculate difference in days
  const timeDiff = eventDate.getTime() - notificationDate.getTime();
  const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));

  // Format event time
  const formattedTime = `${hourEvent.padStart(2, '0')}:${minuteEvent.padStart(2, '0')}`;

  // Determine date text
  const dateText = daysDiff === 0 ? 'hoy' : `dentro de ${daysDiff} día${daysDiff === 1 ? '' : 's'}`;

  return `Recuerda ${description.toLowerCase()} ${dateText} a las ${formattedTime}`;
};