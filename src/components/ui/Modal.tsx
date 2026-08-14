import { useEffect, useCallback } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, width = '520px', children }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(24,24,27,.45)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[14px] overflow-hidden"
        style={{
          width,
          maxWidth: 'calc(100vw - 48px)',
          boxShadow: '0 24px 64px rgba(0,0,0,.22)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
