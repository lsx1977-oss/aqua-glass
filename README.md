# Aqua 短片

在液态玻璃风格的播放器里，观看 Blender 工作室的开源动画短片和 NASA 高清太空影像。

- 首页瀑布流：竖版官方海报，鼠标悬停预览
- 播放器：1080p 播放，部分 NASA 影像可切换 4K 原片
- 滑动观看：一屏一部，上下滑动切换
- 类型筛选、搜索、"我喜欢"收藏、深色模式

## 本地运行

需要 Node.js 24 或更高版本。

```bash
npm install
npm run dev
```

然后打开 http://localhost:3000 。

## 常用命令

- `npm run dev`：启动开发服务器
- `npm run check`：依次运行 lint、类型检查和生产构建
- `npm run build` / `npm start`：构建并运行生产版本

## 目录

- `src/app/`：页面入口（`page.tsx`）和全局布局
- `src/components/aqua/`：页面组件、播放器、滑动观看和样式
- `src/components/aqua/videos.ts`：所有影片信息，增删影片改这里
- `public/posters/`：影片海报

## 增加影片

在 `src/components/aqua/videos.ts` 的 `VIDEOS` 列表里加一项，填写标题、类型、简介、时长、尺寸、视频地址（`src` 预览用小文件，`srcHd` 正片 1080p，可选 `src4k`）、海报（`poster`，竖版 2:3）和横版剧照（`still`），以及版权信息（`studio`、`license`、`sourcePage`、`posterCredit`）。

## 素材与版权

- 动画短片和海报：Blender Foundation / Blender Studio，CC BY 3.0 或 CC BY 4.0，需署名。
- 太空影像：NASA，公有领域。不得使用 NASA 标志或暗示获得 NASA 认可。
- 视频和剧照通过 Wikimedia Commons 在线播放。

每部影片的出处和许可写在 `videos.ts` 里，并在页面的"版权与致谢"面板中显示。

项目基于 [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) 的 Next.js 脚手架（MIT 许可，见 `LICENSE`）。
