const modal = document.getElementById('post-modal');
const modalBody = document.getElementById('modal-body-content');

// 修改后的 openPost: 接收文章 ID，从隐藏的 DOM 中获取内容
function openPost(id) {
  const contentDiv = document.getElementById('content-' + id);
  if (!contentDiv) return;

  // 直接将预渲染好的 HTML 放入弹窗
  modalBody.innerHTML = contentDiv.innerHTML;
  
  modal.style.display = 'flex';
  void modal.offsetWidth; // 强制重绘
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  document.body.style.overflow = 'auto';
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});