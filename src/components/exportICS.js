import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// ✅ ICS 텍스트 생성 함수
function generateICSContent(todos) {
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('.');
    return `${year}${month}${day}T090000Z`; // 9AM UTC 고정
  };

  const header = `BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH`;
  const footer = `END:VCALENDAR`;

  const events = todos.map((todo, index) => {
    const dtStart = formatDate(todo.date);
    const dtEnd = formatDate(todo.date);
    return `BEGIN:VEVENT\nSUMMARY:${todo.title}\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nDESCRIPTION:Todo Item\nUID:${index}@traumaapp\nEND:VEVENT`;
  }).join("\n");

  return `${header}\n${events}\n${footer}`;
}

// ✅ 파일 저장 및 공유 함수
export async function exportTodosToICS(todos) {
  try {
    const icsContent = generateICSContent(todos);
    const fileUri = FileSystem.documentDirectory + 'todos.ics';

    await FileSystem.writeAsStringAsync(fileUri, icsContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (!(await Sharing.isAvailableAsync())) {
      alert('공유 기능을 사용할 수 없습니다.');
      return;
    }

    await Sharing.shareAsync(fileUri);
  } catch (error) {
    console.error('ICS 파일 내보내기 오류:', error);
  }
}
