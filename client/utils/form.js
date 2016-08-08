export function parseTime(hour, minute, ampm) {
  const d = new Date();
  const year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  
  if(month < 10) { month =  "0" + month}
  if(day < 10) { day = '0' + day}

  return `${year}-${month}-${day}T${Number(hour) + ((ampm === 'pm') ? 12 : 0)}:${minute}:00.000`;
}

export function parseDuration(hour, minute) {
  if(!hour && !minute) {
    return 9999999;
  } else if (!hour) {
    hour = 0
  } else if (!minute) {
    minute = 0;
  }
  return (hour * 60 + minute) * 60;
}
