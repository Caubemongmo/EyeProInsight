import { create } from 'zustand';

export const SCHOOLS = [
  { id: 'ntp', name: 'TH Nguyễn Tri Phương' },
  { id: 'pct', name: 'TH Phan Chu Trinh' },
  { id: 'lqd', name: 'TH Lê Quý Đôn' },
];

interface AppState {
  selectedSchoolId: string;
  setSelectedSchoolId: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedSchoolId: 'ntp',
  setSelectedSchoolId: (id) => set({ selectedSchoolId: id }),
}));
