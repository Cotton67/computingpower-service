import { icons } from '../utils.js';

export function openModal({ title, content, wide, footer, onConfirm, onCancel }) {
  const root = document.getElementById('modal-root');
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal ${wide ? 'modal-wide' : ''}">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close">${icons.close}</button>
      </div>
      <div class="modal-body">${content}</div>
      ${footer !== false ? `
        <div class="modal-footer">
          <button class="btn btn-ghost modal-cancel">取消</button>
          <button class="btn btn-primary modal-confirm">确认</button>
        </div>
      ` : ''}
    </div>
  `;

  root.appendChild(overlay);

  const close = () => {
    overlay.remove();
    if (onCancel) onCancel();
  };

  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.querySelector('.modal-cancel')?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  overlay.querySelector('.modal-confirm')?.addEventListener('click', () => {
    if (onConfirm) {
      const result = onConfirm(overlay);
      if (result !== false) overlay.remove();
    } else {
      overlay.remove();
    }
  });

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  });

  return overlay;
}

export function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.remove();
}
