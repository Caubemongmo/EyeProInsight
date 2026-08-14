import { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Pagination } from '../../components/ui';
import {
  fetchRecommendations,
  addRecommendation,
  updateRecommendation,
  deleteRecommendation,
  type Recommendation,
} from '../../services/api';

export default function RecommendationsPage() {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [query, setQuery] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  // Inline edit state
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // Modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addText, setAddText] = useState('');
  const [deleteModal, setDeleteModal] = useState<Recommendation | null>(null);

  // Load data
  useEffect(() => {
    fetchRecommendations().then(setItems);
  }, []);

  // Filter
  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter((r) => r.text.toLowerCase().includes(q))
    : items;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  // Handlers
  const startEdit = useCallback((item: Recommendation) => {
    setEditIdx(item.id);
    setEditText(item.text);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditIdx(null);
    setEditText('');
  }, []);

  const saveEdit = useCallback(async () => {
    if (editIdx === null || !editText.trim()) return;
    const updated = await updateRecommendation(editIdx, editText);
    setItems((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditIdx(null);
    setEditText('');
  }, [editIdx, editText]);

  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && editText.trim()) {
        e.preventDefault();
        saveEdit();
      }
      if (e.key === 'Escape') cancelEdit();
    },
    [editText, saveEdit, cancelEdit],
  );

  const handleAdd = useCallback(async () => {
    if (!addText.trim()) return;
    const item = await addRecommendation(addText);
    setItems((prev) => [...prev, item]);
    setAddModalOpen(false);
    setAddText('');
    // Jump to last page
    const newTotal = Math.ceil((filtered.length + 1) / perPage);
    setPage(newTotal);
  }, [addText, filtered.length, perPage]);

  const handleDelete = useCallback(async () => {
    if (!deleteModal) return;
    await deleteRecommendation(deleteModal.id);
    setItems((prev) => prev.filter((r) => r.id !== deleteModal.id));
    setDeleteModal(null);
  }, [deleteModal]);

  const editValid = editText.trim().length > 0;
  const addValid = addText.trim().length > 0;

  return (
    <div className="max-w-[1000px]">
      <h2 className="m-0 mb-1 text-[19px] font-bold tracking-[-0.3px]">Cấu hình khuyến nghị</h2>

      {/* Toolbar */}
      <div className="flex items-end gap-2.5 mb-3.5">
        <div className="flex-1 max-w-[340px]">          
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Tìm kiếm tin nhắn chat"
            className="w-full px-3 py-[9px] border border-[var(--color-border-light)] rounded-lg text-[13px] font-[inherit] outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]"
          />
        </div>
        <Button
          variant="primary"
          onClick={() => { setAddModalOpen(true); setAddText(''); }}
          className="py-[9px] px-4 text-[13px]"
        >
          + Thêm mới
        </Button>
      </div>

      {/* Search indicator */}
      {q && (
        <div className="flex items-center gap-2 text-[12.5px] text-[var(--color-text-label)] mb-2.5">
          <span>
            Tìm thấy <b className="text-[var(--color-text)]">{filtered.length}</b> kết quả cho
            “{query}”
          </span>
          <span
            onClick={() => { setQuery(''); setPage(1); }}
            className="text-[var(--color-primary)] font-semibold cursor-pointer"
          >
            Xóa bộ lọc
          </span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-[var(--color-border)] rounded-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[52px_1fr_168px] items-center px-[18px] py-[11px] bg-[#FAFAFA] border-b border-[var(--color-border)] text-xs font-bold text-[var(--color-text-label)]">
          <div>#</div>
          <div>Nội dung tin nhắn chat</div>
          <div className="text-right">Thao tác</div>
        </div>

        {/* Rows */}
        {pageRows.map((row, idx) => {
          const rowNo = (safePage - 1) * perPage + idx + 1;
          const isEditing = editIdx === row.id;

          return (
            <div
              key={row.id}
              className="grid grid-cols-[52px_1fr_168px] items-center gap-3 px-[18px] py-[13px] border-t border-[var(--color-border-row)] hover:bg-[#FAFAFA] transition-colors"
            >
              {/* Row number */}
              <div className="text-[12.5px] text-[var(--color-text-muted)] tabular-nums">
                {rowNo}
              </div>

              {/* Content */}
              {isEditing ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  autoFocus
                  className="w-full px-2.5 py-[7px] border border-[var(--color-primary)] rounded-[7px] text-[13.5px] font-[inherit] outline-none shadow-[0_0_0_3px_rgba(27,75,143,0.12)]"
                />
              ) : (
                <div
                  onClick={() => startEdit(row)}
                  className="text-[13.5px] text-[var(--color-text)] leading-[1.5] cursor-text"
                >
                  {row.text}
                </div>
              )}

              {/* Actions */}
              {isEditing ? (
                <div className="flex justify-end gap-[7px]">
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1.5 rounded-[7px] border border-[var(--color-border-light)] bg-white text-[12.5px] font-semibold cursor-pointer hover:bg-[var(--color-bg)] transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1.5 rounded-[7px] border text-[12.5px] font-bold text-white transition-colors"
                    style={{
                      background: editValid ? 'var(--color-primary)' : '#C7CBD1',
                      borderColor: editValid ? 'var(--color-primary)' : '#C7CBD1',
                      cursor: editValid ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <div className="flex justify-end gap-[7px]">
                  <button
                    onClick={() => startEdit(row)}
                    className="px-3 py-1.5 rounded-[7px] border border-[var(--color-border-light)] bg-white text-[12.5px] font-semibold cursor-pointer hover:bg-[var(--color-bg)] transition-colors"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => setDeleteModal(row)}
                    className="px-3 py-1.5 rounded-[7px] border border-[#FECACA] bg-white text-[var(--color-danger)] text-[12.5px] font-semibold cursor-pointer hover:bg-[#FEF2F2] transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-[38px] px-[18px] text-center text-[13px] text-[var(--color-text-muted)] border-t border-[var(--color-border-row)]">
            Không có câu gợi ý nào khớp với từ khóa.
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-3.5 px-[18px] py-3 border-t border-[var(--color-border)] bg-[#FAFAFA] text-[12.5px] text-[var(--color-text-secondary)]">
          <div>
            Tổng <b className="text-[var(--color-text)]">{items.length}</b> câu gợi ý
          </div>
          <select
            value={perPage}
            onChange={(e) => { setPerPage(+e.target.value); setPage(1); }}
            className="px-2 py-[5px] border border-[var(--color-border-light)] rounded-[7px] bg-white text-[12.5px] font-[inherit] text-[var(--color-text)] cursor-pointer outline-none"
          >
            <option value={5}>5 dòng/trang</option>
            <option value={10}>10 dòng/trang</option>
            <option value={20}>20 dòng/trang</option>
          </select>
          <div className="flex-1" />
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* ── Add Modal ─────────────────── */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <div className="text-[15px] font-bold">Thêm câu gợi ý</div>
          <div
            onClick={() => setAddModalOpen(false)}
            className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[var(--color-text-secondary)] cursor-pointer text-[15px] hover:bg-[var(--color-bg)] transition-colors"
          >
            ✕
          </div>
        </div>
        <div className="p-5">
          <div className="text-[12.5px] font-semibold text-[var(--color-text-label)] mb-1.5">
            Nội dung tin nhắn chat
          </div>
          <textarea
            value={addText}
            onChange={(e) => setAddText(e.target.value)}
            rows={3}
            placeholder="VD: Tôi nên đọc sách gì để ôn thi học kỳ?"
            className="w-full px-3 py-2.5 border border-[var(--color-border-light)] rounded-lg text-[13.5px] font-[inherit] leading-[1.5] resize-y outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,143,0.12)]"
          />
          <div className="text-[11.5px] text-[var(--color-text-muted)] mt-[7px]">
            Viết như một câu hỏi người dùng thật sự gõ. Ngắn, cụ thể, tối đa ~80 ký tự.
          </div>
        </div>
        <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-[var(--color-border)] bg-[#FAFAFA]">
          <button
            onClick={() => setAddModalOpen(false)}
            className="px-3.5 py-2 rounded-lg border border-[var(--color-border-light)] bg-white text-[13px] font-semibold cursor-pointer hover:bg-[var(--color-bg)] transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg border text-[13px] font-bold text-white transition-colors"
            style={{
              background: addValid ? 'var(--color-primary)' : '#C7CBD1',
              borderColor: addValid ? 'var(--color-primary)' : '#C7CBD1',
              cursor: addValid ? 'pointer' : 'not-allowed',
            }}
          >
            Thêm mới
          </button>
        </div>
      </Modal>

      {/* ── Delete Confirmation Modal ─── */}
      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} width="420px">
        <div className="px-[22px] pt-[22px] pb-2">
          <div className="text-[15px] font-bold mb-1.5">Xóa câu gợi ý này?</div>
          <div className="text-[13px] text-[var(--color-text-secondary)] leading-[1.55]">
            “{deleteModal?.text}” sẽ không còn hiện trong danh sách gợi ý của người dùng.
          </div>
        </div>
        <div className="flex justify-end gap-2 px-5 py-4">
          <button
            onClick={() => setDeleteModal(null)}
            className="px-3.5 py-2 rounded-lg border border-[var(--color-border-light)] bg-white text-[13px] font-semibold cursor-pointer hover:bg-[var(--color-bg)] transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-[var(--color-danger)] border border-[var(--color-danger)] text-white text-[13px] font-bold cursor-pointer hover:bg-[var(--color-danger-dark)] transition-colors"
          >
            Xóa
          </button>
        </div>
      </Modal>
    </div>
  );
}
