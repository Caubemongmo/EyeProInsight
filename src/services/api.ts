export interface Recommendation {
  id: number;
  text: string;
}

const SEED_DATA: Recommendation[] = [
  { id: 1, text: 'Mình muốn tìm sách ôn thi học kỳ thì bắt đầu từ đâu?' },
  { id: 2, text: 'Gợi ý sách tham khảo môn Toán lớp 9' },
  { id: 3, text: 'Có tài liệu nào về kỹ năng thuyết trình không?' },
  { id: 4, text: 'Tóm tắt nội dung chính của cuốn sách này' },
  { id: 5, text: 'Sách nào phù hợp cho học sinh mới bắt đầu học tiếng Anh?' },
  { id: 6, text: 'Tìm tài liệu về phương pháp học tập hiệu quả' },
  { id: 7, text: 'Có sách nào dạy vẽ kỹ thuật số không?' },
  { id: 8, text: 'Cho mình xem danh sách sách về lịch sử Việt Nam' },
];

let store: Recommendation[] = [...SEED_DATA];
let nextId = SEED_DATA.length + 1;

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchRecommendations(): Promise<Recommendation[]> {
  await delay(200);
  return [...store];
}

export async function addRecommendation(text: string): Promise<Recommendation> {
  await delay(300);
  const item: Recommendation = { id: nextId++, text: text.trim() };
  store.push(item);
  return item;
}

export async function updateRecommendation(id: number, text: string): Promise<Recommendation> {
  await delay(250);
  const idx = store.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error('Not found');
  store[idx] = { ...store[idx], text: text.trim() };
  return store[idx];
}

export async function deleteRecommendation(id: number): Promise<void> {
  await delay(200);
  store = store.filter((r) => r.id !== id);
}
