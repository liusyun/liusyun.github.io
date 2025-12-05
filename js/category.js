document.addEventListener('DOMContentLoaded', () => {
    // 1. 获取所有筛选按钮
    const filterBtns = document.querySelectorAll('.filter-btn');
    // 2. 获取所有文章卡片
    const posts = document.querySelectorAll('.post-card');
    const noResultMsg = document.getElementById('no-result');
    const bg = document.body;
    const btn = document.getElementById("btn");

    // === 主题切换逻辑 (与 index 保持一致) ===
    if(btn) {
        btn.addEventListener("change", e => {
            if (e.detail === 'dark') {
                bg.style.backgroundColor = "#424242";
            } else {
                bg.style.backgroundColor = "aliceblue"; // 或者 var(--bg-gray)
            }
        });
    }

    // === 关键词过滤逻辑 ===
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. 移除所有按钮的 active 状态
            filterBtns.forEach(b => b.classList.remove('active'));
            // 2. 激活当前按钮
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            let visibleCount = 0;

            posts.forEach(post => {
                // 获取文章的 tags (data-tags="tag1,tag2")
                const postTags = post.getAttribute('data-tags').split(',');

                // 核心判断：如果是 'all' 或者 文章包含该 tag
                if (filterValue === 'all' || postTags.includes(filterValue)) {
                    post.classList.remove('hidden');
                    // 重新触发一个小动画让过程更平滑 (可选)
                    post.style.animation = 'none';
                    post.offsetHeight; /* trigger reflow */
                    post.style.animation = 'fadeUp 0.5s forwards';
                    visibleCount++;
                } else {
                    post.classList.add('hidden');
                }
            });

            // 如果没有文章显示，显示提示信息
            if (visibleCount === 0) {
                noResultMsg.style.display = 'block';
            } else {
                noResultMsg.style.display = 'none';
            }
        });
    });
});