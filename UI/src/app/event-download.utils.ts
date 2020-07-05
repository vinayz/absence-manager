
export const createEvent = (events: {
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    name: string,
    type: string,
    memberNote: string,
    id: number
  }[]) => {
    const formatDate = (date: Date): string => {
      if (!date) {
        return '';
      }

      const day = new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate();
      const month = new Date(date).getMonth() < 9 ? '0' + (new Date(date).getMonth() + 1) : (new Date(date).getMonth() + 1);
      const year = new Date(date).getFullYear();
      const hour = new Date(date).getHours() < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours();
      const minutes = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes();
      const seconds = new Date(date).getSeconds() < 10 ? '0' + new Date(date).getSeconds() : new Date(date).getSeconds();
      return `${year}${month}${day}T${hour}${minutes}${seconds}`;
    };

    let VCALENDAR = `BEGIN:VCALENDAR
                    PRODID:-//Absense Manager Calendar//Crew
                    VERSION:2.0
                    `
  
    for (const event of events) {
      const timeStamp = formatDate(new Date());      

      const EVENT =`BEGIN:VEVENT
                    DTSTAMP:${formatDate(event.createdAt)}
                    DTSTART:${formatDate(event.startDate)}
                    DTEND:${formatDate(event.endDate)}
                    SUMMARY:${event.name}
                    DESCRIPTION:${event.memberNote}
                    STATUS: ${event.type}
                    UID:${event.id}
                    END:VEVENT`

      VCALENDAR += `${EVENT}
      `
    }

    VCALENDAR += `END:VCALENDAR`
  
    return VCALENDAR;
  }
  
  export const download = (filename, text) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.setAttribute('target', '_blank');
    element.style.display = 'none';
    element.click();
  };