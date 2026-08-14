import { SectionCard, SettingRow, Toggle, InfoPopover, NumberInput, AlertBanner, Button } from '../../components/ui';
import { useDataConfigStore } from '../../stores/dataConfigStore';

export default function DataConfigPage() {
  const store = useDataConfigStore();

  // Derived states
  const isAgenticOn = store.agentic;
  const tokenBg = isAgenticOn ? '#FAFAFA' : '#FFFFFF';
  const tokenScopeNote = isAgenticOn
    ? 'Chỉ dùng khi pipeline tự động phải lùi về cắt token'
    : 'Đang áp dụng cho mọi tài liệu — đã tắt tự động chọn cách cắt';

  // Chunk size validation
  const sizeWarn = store.chunkSize > 480 && store.chunkSize <= 4000 && store.hasChanges;
  const sizeErr = store.chunkSize < 100 || store.chunkSize > 4000;

  // Overlap validation
  const overlapWarn = store.chunkOverlap > store.chunkSize * 0.25;
  const overlapRatio = Math.round((store.chunkOverlap / Math.max(1, store.chunkSize)) * 100) + '% kích thước chunk';

  // Perf ratio validation
  const ratioWarn =
    store.hasChanges &&
    (store.parallelDocs * 3 > store.concurrentLlm || store.concurrentLlm - store.parallelDocs * 3 >= 4);
  const ratioMsg =
    store.parallelDocs * 3 > store.concurrentLlm
      ? `Nguy cơ nghẽn LLM: ${store.parallelDocs} tài liệu song song cần khoảng ${store.parallelDocs * 3} lời gọi đồng thời, hiện chỉ cho phép ${store.concurrentLlm}. Tài liệu sẽ xếp hàng chờ và có thể timeout — hạ số tài liệu về ${Math.max(2, Math.floor(store.concurrentLlm / 3))} hoặc nâng số lời gọi lên ${store.parallelDocs * 3}.`
      : `Đang dư hạn mức LLM: cho phép ${store.concurrentLlm} lời gọi nhưng chỉ dùng tới khoảng ${store.parallelDocs * 3}. Có thể nâng số tài liệu song song lên ${Math.min(10, Math.floor(store.concurrentLlm / 3))} để nạp nhanh hơn mà không tăng chi phí.`;

  // Save button state
  const invalid = sizeErr || store.chunkOverlap < 0 || store.parallelDocs < 2 || store.parallelDocs > 10 || store.concurrentLlm < 1;
  const canSave = store.hasChanges && !invalid;

  return (
    <div className="max-w-[900px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <h2 className="m-0 text-[19px] font-bold tracking-[-0.3px]">Cấu hình dữ liệu</h2>
        <div className="flex-1" />
        {store.hasChanges && (
          <button
            onClick={store.resetToDefaults}
            className="inline-flex items-center gap-1.5 border border-[var(--color-border-light)] bg-white text-[var(--color-text-dark)] px-[11px] py-1.5 rounded-[7px] text-xs font-semibold cursor-pointer hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            ↺ Khôi phục mặc định
          </button>
        )}
      </div>

      {/* ── Section 1: Chunking ───────────────────── */}
      <SectionCard
        title="Chunking"
        description="Quyết định mỗi đoạn văn bản dài bao nhiêu trước khi đưa vào tìm kiếm."
      >
        {/* Agentic Chunking Toggle */}
        <SettingRow
          label="Tự động chọn cách cắt (Agentic chunking)"
          description="Hệ thống tự chọn cắt theo token, theo ngữ nghĩa hay để LLM tìm ranh giới logic."
          infoPopover={
            <InfoPopover
              content="Hệ thống đọc thử tài liệu rồi tự chọn cắt theo token, theo ngữ nghĩa, hay để LLM tìm ranh giới logic. Bật thì câu trả lời ít bị đứt mạch giữa hai chunk; tắt thì mọi tài liệu cắt theo đúng con số bên dưới. Nếu pipeline lỗi, hệ thống tự lùi về cắt token cố định."
              defaultNote="Mặc định: Bật"
            />
          }
        >
          <Toggle value={store.agentic} onChange={store.setAgentic} />
        </SettingRow>

        {/* Sentinel Toggle (sub-item, indented) */}
        <SettingRow
          label="Kiểm chứng chất lượng chunk"
          description="LLM chấm điểm từng lô chunk và bắt cắt lại nếu chưa đạt."
          indented
          dimmed={!isAgenticOn}
          infoPopover={
            <InfoPopover
              content="LLM chấm điểm từng lô chunk và bắt cắt lại nếu chưa đạt. Bật: chunk sạch hơn, ít đoạn vụn — nạp liệu chậm hơn khoảng 1.5–2 lần và tốn thêm lời gọi LLM."
              defaultNote="Mặc định: Bật · Chỉ có tác dụng khi bật tự động chọn cách cắt"
            />
          }
        >
          <Toggle
            value={store.sentinel}
            onChange={store.setSentinel}
            disabled={!isAgenticOn}
          />
        </SettingRow>

        {/* Token scope note bar */}
        <div className="px-[22px] py-[7px] bg-[#FAFAFA] border-t border-[#F4F4F5] text-[11.5px] text-[var(--color-text-label)]">
          {tokenScopeNote}
        </div>

        {/* Chunk Size */}
        <SettingRow
          label="Kích thước mỗi chunk"
          description="Mỗi đoạn văn bản dài bao nhiêu token trước khi đưa vào index."
          muted={isAgenticOn}
          infoPopover={
            <InfoPopover
              content="Chunk to thì mỗi câu trả lời có nhiều ngữ cảnh hơn nhưng dễ lẫn thông tin không liên quan; chunk nhỏ thì trích dẫn chính xác hơn nhưng dễ mất mạch. Chỉ dùng khi tắt tự động chọn cách cắt, hoặc khi pipeline tự động phải lùi về cắt token."
              defaultNote="Mặc định 1200 token · Khuyến nghị 500–1500 · Hợp lệ 100–4000"
            />
          }
        >
          <NumberInput
            value={store.chunkSize}
            onChange={store.setChunkSize}
            placeholder="1200"
            unit="token"
          />
        </SettingRow>

        {/* Chunk Size Warnings (rendered below the row, inside the card) */}
        {sizeWarn && (
          <div className="px-[22px] pb-1" style={{ background: tokenBg }}>
            <AlertBanner variant="warning">
              Bạn vừa nâng vượt trần hữu ích. Khi xếp hạng lại, reranker chỉ đọc được{' '}
              <b>480 token đầu</b> của mỗi chunk (512 trừ 32 token cho câu hỏi và độ dài tiêu đề)
              — phần còn lại vẫn trả về nhưng không tham gia xếp hạng.
            </AlertBanner>
          </div>
        )}
        {sizeErr && (
          <div className="px-[22px] pb-1" style={{ background: tokenBg }}>
            <AlertBanner variant="error">
              Giá trị ngoài dải hợp lệ 100–4000 token. Không lưu được.
            </AlertBanner>
          </div>
        )}

        {/* Overlap */}
        <SettingRow
          label="Độ chồng lấn giữa hai chunk liền nhau"
          description="Phần văn bản lặp lại ở đầu chunk sau."
          muted={isAgenticOn}
          infoPopover={
            <InfoPopover
              content="Tăng lên thì câu bị cắt giữa hai chunk vẫn tìm được, đổi lại kho index phình to và tốn thêm chi phí embedding. Chỉ dùng khi tắt tự động chọn cách cắt, hoặc khi pipeline tự động phải lùi về cắt token."
              defaultNote="Mặc định 100 token · Nên giữ dưới 25% kích thước chunk"
            />
          }
        >
          <NumberInput
            value={store.chunkOverlap}
            onChange={store.setChunkOverlap}
            placeholder="100"
            unit="token"
          />
        </SettingRow>

        {/* Overlap Warning */}
        {overlapWarn && (
          <div className="px-[22px] pb-2" style={{ background: tokenBg }}>
            <AlertBanner variant="warning">
              Chồng lấn quá lớn so với kích thước chunk ({overlapRatio}). Số chunk và chi phí
              embedding tăng mạnh mà độ chính xác gần như không đổi.
            </AlertBanner>
          </div>
        )}
      </SectionCard>

      {/* ── Section 2: Hiệu năng nạp liệu ────────── */}
      <SectionCard
        title="Hiệu năng nạp liệu"
        description="Áp dụng cho toàn hệ thống, không riêng trường đang chọn. Không ảnh hưởng chất lượng câu trả lời."
        className="mt-3.5"
      >
        {/* Parallel Docs */}
        <SettingRow
          label="Số tài liệu xử lý song song"
          description="Bao nhiêu tài liệu được nạp cùng một lúc."
          infoPopover={
            <InfoPopover
              content="Nhiều tài liệu cùng lúc thì nạp xong sớm hơn, nhưng nếu quá số lời gọi LLM cho phép thì tài liệu sẽ nằm chờ và có thể timeout."
              defaultNote="Mặc định 2 · Hợp lệ 2–10"
            />
          }
        >
          <NumberInput
            value={store.parallelDocs}
            onChange={store.setParallelDocs}
            placeholder="2"
            unit="tài liệu"
          />
        </SettingRow>

        {/* Concurrent LLM Calls */}
        <SettingRow
          label="Số lời gọi LLM đồng thời"
          description="Trần số yêu cầu gửi tới LLM cùng lúc."
          infoPopover={
            <InfoPopover
              content="Đặt cao hơn hạn mức nhà cung cấp cấp cho bạn thì tài liệu sẽ lỗi rải rác chứ không nhanh hơn."
              defaultNote="Mặc định 4 · Khuyến nghị: số tài liệu song song ≈ số lời gọi LLM ÷ 3"
            />
          }
        >
          <NumberInput
            value={store.concurrentLlm}
            onChange={store.setConcurrentLlm}
            placeholder="4"
            unit="lời gọi"
          />
        </SettingRow>

        {/* Ratio Warning */}
        {ratioWarn && (
          <div className="mx-[22px] mb-3.5">
            <AlertBanner variant="warning" className="mt-0">
              {ratioMsg}
            </AlertBanner>
          </div>
        )}
      </SectionCard>

      {/* ── Footer: Save / Discard ────────────────── */}
      <div className="flex items-center justify-end gap-2 mt-4">
        {store.hasChanges && (
          <Button variant="secondary" onClick={store.discardChanges}>
            Hủy thay đổi
          </Button>
        )}
        <Button
          variant="primary"
          onClick={canSave ? store.saveConfig : undefined}
          disabled={!canSave}
        >
          Lưu cấu hình
        </Button>
      </div>
    </div>
  );
}
