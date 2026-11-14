# 个人网站（Hexo + GitHub Pages）

个人网站

## 本地预览

```bash
npm install      # 首次安装依赖（国内建议加 --registry=https://registry.npmmirror.com）
npx hexo server  # http://localhost:4000
```

## 内容怎么维护（无需碰模板）

| 想改什么                                  | 改哪里                                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 姓名 / 简介 / 邮箱 / GitHub / 技能 / 经历 | `source/_data/profile.yml`                                                                          |
| 精选作品（增删改项目卡片）                | `source/_data/works.yml`（`featured: true` 上首页）                                                 |
| 阅读书单（在读 / 已读 / 想读）            | `source/_data/reading.yml`                                                                          |
| 写博客文章                                | `npx hexo new post "标题"`，然后编辑 `source/_posts/`                                               |
| 板块页面文案                              | `source/about/index.md`、`source/works/index.md`、`source/reading/index.md`、`source/blog/index.md` |

## 目录结构

```
personal-site/
├── _config.yml                  # 站点配置（title/url/theme: personal）
├── source/
│   ├── _data/                   # 内容数据层（profile / works / reading / resume）
│   ├── _posts/                  # 博客文章
│   ├── about|blog|works|reading/# 四个板块页面
│   ├── resume/                  # 独立简历页（不套站点导航）
├── themes/personal/             # 自研主题
│   ├── layout/                  # EJS 模板（index/blog/works/reading/about/post/page）
│   └── source/css/style.css     # 单色样式表
└── .github/workflows/deploy.yml # GitHub Actions 自动部署
```

## 发布到 GitHub Pages

1. GitHub 创建仓库后推送：

```bash
git init && git add . && git commit -m "init: personal site"
git branch -M main
git remote add origin git@github.com:<你的用户名>/<仓库名>.git
git push -u origin main
```

2. 仓库 Settings → Pages → Source 选 **GitHub Actions**
3. **部署前必改** `_config.yml` 的 `url:`，取值由**仓库名**决定：
    - 仓库名 `<用户名>.github.io` → `https://<用户名>.github.io`（根域名，推荐）
    - 仓库名 `personal-site` → `https://<用户名>.github.io/personal-site`，同时需加一行 `root: /personal-site/`

## 常用命令

| 命令                       | 作用                                              |
| -------------------------- | ------------------------------------------------- |
| `npx hexo new post "标题"` | 新建文章                                          |
| `npx hexo clean`           | 清缓存（若被拦截可手动删 `public/` 和 `db.json`） |
| `npx hexo generate`        | 生成静态文件                                      |
| `npx hexo server`          | 本地预览                                          |
