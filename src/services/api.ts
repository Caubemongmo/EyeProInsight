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


// --- Permissions Data ---

export interface PermScreen {
  group?: string;
  k?: string;
  label?: string;
}

export const SCREENS: PermScreen[] = [
  { group: 'Quản trị nghiệp vụ' },
  { k: 'rec', label: 'Cấu hình khuyến nghị' },
  { k: 'data', label: 'Cấu hình dữ liệu' },
  { k: 'users', label: 'Quản lý người dùng' },
  { k: 'perm', label: 'Phân quyền' },
  { group: 'Công cụ kỹ thuật' },
  { k: 'doc', label: 'Documents' },
  { k: 'kg', label: 'Knowledge Graph' },
  { k: 'ret', label: 'Retrieval' },
  { k: 'ex', label: 'Bài tập' },
  { k: 'api', label: 'API' },
  { group: 'Quản trị hệ thống' },
  { k: 'sub', label: 'Quản lý thuê bao' },
  { k: 'dom', label: 'Quản lý domain' },
];

export type RoleKey = 'admin' | 'dev';

export type PermissionMatrix = Record<RoleKey, Record<string, 1 | 0>>;

export const PERM_DEFAULT: PermissionMatrix = {
  admin: { rec: 1, data: 1, users: 1, perm: 1, doc: 0, kg: 0, ret: 0, ex: 0, api: 0, sub: 0, dom: 0 },
  dev: { rec: 0, data: 1, users: 0, perm: 0, doc: 1, kg: 1, ret: 1, ex: 1, api: 1, sub: 0, dom: 0 },
};

let permStore: PermissionMatrix = JSON.parse(JSON.stringify(PERM_DEFAULT));

export async function fetchPermissions(): Promise<PermissionMatrix> {
  await delay(150);
  return JSON.parse(JSON.stringify(permStore));
}

export async function updatePermissions(matrix: PermissionMatrix): Promise<void> {
  await delay(300);
  permStore = JSON.parse(JSON.stringify(matrix));
}
