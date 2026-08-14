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

export type RoleKey = 'admin' | 'dev' | 'super';

export type PermissionMatrix = Record<string, Record<string, 1 | 0>>;

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

// --- Users Data ---

export interface User {
  id: number;
  ini: string;
  name: string;
  email: string;
  school: string;
  role: RoleKey;
  status: 'on' | 'off';
  activity: string;
}

const USER_SEED: User[] = [
  { id: 1, ini: 'VD', name: 'Vũ Đức', email: 'duc@vdsmart.vn', school: 'Toàn hệ thống', role: 'super', status: 'on', activity: 'Hôm nay 08:45' },
  { id: 2, ini: 'KT', name: 'Trần Kỹ Thuật', email: 'kts@vdsmart.vn', school: 'Toàn hệ thống', role: 'dev', status: 'on', activity: 'Hôm nay 07:58' },
  { id: 3, ini: 'NT', name: 'Ngô Trâm', email: 'tram@ntp.edu.vn', school: 'TH Nguyễn Tri Phương', role: 'admin', status: 'on', activity: 'Hôm nay 08:05' },
  { id: 4, ini: 'NP', name: 'Nguyễn Phương', email: 'phuong@pct.edu.vn', school: 'TH Phan Chu Trinh', role: 'admin', status: 'on', activity: 'Hôm nay 09:12' },
];

let userStore: User[] = [...USER_SEED];
let nextUserId = 5;

export async function fetchUsers(): Promise<User[]> {
  await delay(250);
  return [...userStore];
}

export async function saveUser(user: Partial<User>): Promise<void> {
  await delay(400);
  if (user.id) {
    const idx = userStore.findIndex(u => u.id === user.id);
    if (idx !== -1) userStore[idx] = { ...userStore[idx], ...user } as User;
  } else {
    userStore.push({ ...user, id: nextUserId++ } as User);
  }
}

export async function removeUser(id: number): Promise<void> {
  await delay(300);
  userStore = userStore.filter(u => u.id !== id);
}

export async function resetPassword(id: number): Promise<void> {
  await delay(500); // Simulate API call to send email
}
