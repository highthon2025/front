import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// 날짜를 iCal 형식으로 변환
function formatICSDate(dateStr: string) {
  const [year, month, day] = dateStr.split('.').map(v => v.padStart(2, '0'));
  return `${year}${month}${day}T090000`; // 오전 9시 고정
}

export async function exportTodosToICS(todos: { title: string; date: string }[]) {
  const events = todos.map((todo, idx) => `
BEGIN:VEVENT
UID:${Date.now()}-${idx}@traumaguide
DTSTAMP:${formatICSDate(todo.date)}Z
DTSTART:${formatICSDate(todo.date)}Z
DTEND:${formatICSDate(todo.date)}Z
SUMMARY:${todo.title}
END:VEVENT`).join('');

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
${events}
END:VCALENDAR`.trim();

  const path = `${FileSystem.cacheDirectory}todo.ics`;
  await FileSystem.writeAsStringAsync(path, icsContent, { encoding: FileSystem.EncodingType.UTF8 });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(path);
  } else {
    alert('공유를 지원하지 않는 기기입니다.');
  }
}
