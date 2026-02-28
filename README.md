# 澜鳐生物科技官网

## 项目介绍
这是澜鳐生物科技（LanYaoBio）的静态官网项目，围绕中枢神经类器官产品、鳐芯终端、科研服务与行业资讯构建。

## 页面结构
- 首页：`index.html`
- 产品总览：`Directory.html`
- 产品详情：`pages/products/`
- 科研服务：`pages/services/`
- 鳐芯终端：`pages/terminal/`
- 行业资讯（总览+详情）：`pages/news/`

## 样式与脚本
- 全站样式：`src/css/style.css`、`src/css/footer.css`
- 全站交互：`src/js/main.js`

## 维护建议
- 新增产品页：在 `pages/products/` 创建页面，并同步更新所有页面页眉中的“产品目录”下拉菜单。
- 新增资讯页：在 `pages/news/` 创建详情页，并同步更新“行业资讯”下拉菜单。
- 新增鳐芯终端子页：在 `pages/terminal/` 创建页面，并同步更新“鳐芯终端”下拉菜单。
- 所有页面共用同一导航信息，更新导航时请进行全站同步，保证链接一致。
