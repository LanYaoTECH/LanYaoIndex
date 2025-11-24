// 页面脚本入口（当前保留空实现供后续维护）
document.addEventListener('DOMContentLoaded', function () {
	// TODO: 将现有交互逻辑（如移动菜单、返回顶部、标签页切换等）迁移到此处或导入模块以统一管理。
});

// 等待DOM加载完成
 document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单功能
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // 切换菜单时修改body的overflow属性，防止背景滚动
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('top-scrolled');
            } else {
                header.classList.remove('top-scrolled');
            }
        });
    }
    
    // 产品服务标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮和内容的活动状态
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // 添加当前按钮和对应内容的活动状态
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(`${tabId}-content`);
                
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }
    
    // 返回顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 关闭移动端菜单（如果打开）
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            const targetId = this.getAttribute('href');
            
            // 如果是页面内锚点
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80; // 导航栏的高度
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 联系表单提交
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证逻辑
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 模拟表单提交成功
            alert('感谢您的留言！我们会尽快与您联系。');
            contactForm.reset();
            
            // 在实际应用中，这里应该有AJAX请求将表单数据发送到服务器
        });
    }
    
    // 语言切换功能
    const langSwitches = document.querySelectorAll('.language-switch a');
    
    if (langSwitches.length > 0) {
        langSwitches.forEach(switchBtn => {
            switchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 移除所有语言选项的当前状态
                langSwitches.forEach(btn => {
                    btn.classList.remove('lang-current');
                    btn.classList.add('lang-other');
                });
                
                // 设置当前点击的语言为活跃状态
                this.classList.remove('lang-other');
                this.classList.add('lang-current');
                
                // 在实际应用中，这里应该有语言切换的逻辑
                // alert(`页面将切换为${this.textContent}版本`);
            });
        });
    }
    
    // 淡入动画效果
    const fadeElements = document.querySelectorAll('.about, .technology, .products, .news, .contact');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始设置动画元素的样式
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // 初始检查
    checkFade();
    
    // 滚动时检查
    window.addEventListener('scroll', checkFade);
    
    // 窗口大小改变时检查（响应式调整）
    window.addEventListener('resize', function() {
        // 确保在窗口大小改变时，如果移动端菜单是打开的，则关闭它
        if (mobileMenuBtn && window.innerWidth > 768 && mobileMenuBtn.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // 初始化页面加载动画
    function pageLoadAnimation() {
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.opacity = 0;
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
                heroContent.style.opacity = 1;
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    // 执行页面加载动画
    pageLoadAnimation();
});