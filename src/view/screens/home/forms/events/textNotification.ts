interface TextNotificationProps {
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

export const textNotification = ({
    yearNotification,
    monthNotification,
    dayNotification,
    yearEvent,
    monthEvent,
    dayEvent,
    hourEvent,
    minuteEvent,
    description,
}: TextNotificationProps): string => {
    // Parse dates (months are 0-based in JavaScript, so subtract 1)
    const notificationDate = new Date(
      parseInt(yearNotification, 10),
      parseInt(monthNotification, 10) - 1,
      parseInt(dayNotification, 10)
    );
    const eventDate = new Date(
      parseInt(yearEvent, 10),
      parseInt(monthEvent, 10) - 1,
      parseInt(dayEvent, 10)
    );

    // Calculate difference in days
    const timeDiff = eventDate.getTime() - notificationDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Format event time
    const formattedTime = `${hourEvent.padStart(2, '0')}:${minuteEvent.padStart(2, '0')}`;

    // Determine if it's today or how many days remain
    const dateText = daysDiff === 0 ? 'hoy' : `dentro de ${daysDiff} día${daysDiff === 1 ? '' : 's'}`;

    // Return notification text
    return `Recuerda tu ${description.toLowerCase()} para ${dateText} a las ${formattedTime}`;
};
