export function createTable({ columns, data, pageSize = 10, actions }) {
  let currentPage = 1;
  let sortKey = null;
  let sortDir = 'asc';
  let filteredData = [...data];

  function sort() {
    if (!sortKey) return;
    filteredData.sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'number') return sortDir === 'asc' ? va - vb : vb - va;
      return sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
  }

  function render() {
    sort();
    const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * pageSize;
    const pageData = filteredData.slice(start, start + pageSize);

    return `
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              ${columns.map(col => `
                <th class="${sortKey === col.key ? 'sorted' : ''}" data-sort="${col.key}">
                  ${col.label}
                  <span class="sort-icon">${sortKey === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '▲'}</span>
                </th>
              `).join('')}
              ${actions ? '<th>操作</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${pageData.length === 0 ? `<tr><td colspan="${columns.length + (actions ? 1 : 0)}" class="text-center text-muted" style="padding:24px">暂无数据</td></tr>` : ''}
            ${pageData.map(row => `
              <tr data-id="${row.id || ''}">
                ${columns.map(col => `<td>${col.render ? col.render(row[col.key], row) : (row[col.key] ?? '-')}</td>`).join('')}
                ${actions ? `<td class="table-actions">${actions(row)}</td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ${filteredData.length > pageSize ? `
        <div class="pagination">
          <span>共 ${filteredData.length} 条，第 ${currentPage}/${totalPages} 页</span>
          <div class="pagination-btns">
            <button class="pagination-btn" data-page="prev" ${currentPage <= 1 ? 'disabled' : ''}>上一页</button>
            ${Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let p;
              if (totalPages <= 5) p = i + 1;
              else if (currentPage <= 3) p = i + 1;
              else if (currentPage >= totalPages - 2) p = totalPages - 4 + i;
              else p = currentPage - 2 + i;
              return `<button class="pagination-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
            }).join('')}
            <button class="pagination-btn" data-page="next" ${currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
          </div>
        </div>
      ` : ''}
    `;
  }

  function bindEvents(container) {
    container.addEventListener('click', (e) => {
      const th = e.target.closest('th[data-sort]');
      if (th) {
        const key = th.dataset.sort;
        if (sortKey === key) {
          sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          sortKey = key;
          sortDir = 'asc';
        }
        refresh(container);
      }

      const pageBtn = e.target.closest('.pagination-btn');
      if (pageBtn && !pageBtn.disabled) {
        const p = pageBtn.dataset.page;
        if (p === 'prev') currentPage--;
        else if (p === 'next') currentPage++;
        else currentPage = parseInt(p);
        refresh(container);
      }
    });
  }

  function refresh(container) {
    const wrapper = container.querySelector('.table-wrapper');
    const pagination = container.querySelector('.pagination');
    if (wrapper) {
      const temp = document.createElement('div');
      temp.innerHTML = render();
      wrapper.replaceWith(temp.querySelector('.table-wrapper'));
      if (pagination) pagination.replaceWith(temp.querySelector('.pagination') || '');
      else {
        const pg = temp.querySelector('.pagination');
        if (pg) container.querySelector('.table-wrapper').after(pg);
      }
    }
  }

  function setData(newData) {
    filteredData = [...newData];
    currentPage = 1;
  }

  return { render, bindEvents, setData, refresh };
}
