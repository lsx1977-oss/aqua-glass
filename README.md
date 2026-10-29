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
- `src/components/aqua/content.ts`：从 Supabase 读取影片和首页文案
- `src/components/aqua/videos.ts`：内置影片列表，没配置 Supabase 或连不上时使用
- `supabase/`：建表 SQL（`schema.sql`）和初始数据（`seed.sql`）
- `public/posters/`：影片海报

## 后台管理（Supabase）

页面内容和排序由 Supabase 控制，改完一分钟内网站自动更新，不用重新部署。

1. 在 Supabase 的 SQL Editor 里依次运行 `supabase/schema.sql` 和 `supabase/seed.sql`。
2. 在 Project Settings → API 找到项目地址和 anon（publishable）公钥，复制 `.env.example` 为 `.env.local` 填进去；在 Vercel 的 Settings → Environment Variables 里也填同样两项，然后重新部署一次。
3. 之后在 Table Editor 里管理：
   - `videos` 表：一行一部影片。`visible` 取消勾选即隐藏，`sort_order` 数字越小越靠前。
   - `site_settings` 表（只有一行）：Logo 下的小字、横幅标题两行（留空不显示）、横幅文字（`{count}` 会换成影片数量）、横幅背景用哪部影片。
4. 海报可以上传到 Supabase Storage 的公开存储桶，把公开链接填到 `poster`。

不要把 service_role（secret）密钥放进网站配置。

## 增加影片

推荐在 Supabase 的 `videos` 表里新增一行。需要填写标题、类型、简介、时长、尺寸、视频地址（`src` 预览用小文件，`src_hd` 正片 1080p，可选 `src_4k`）、海报（`poster`，竖版 2:3）和横版剧照（`still`），以及版权信息（`studio`、`license`、`source_page`、`poster_credit`）。

内置列表在 `src/components/aqua/videos.ts`；改了它之后运行 `npm run seed:sql` 可以重新生成 `supabase/seed.sql`。

## 素材与版权

- 动画短片和海报：Blender Foundation / Blender Studio，CC BY 3.0 或 CC BY 4.0，需署名。
- 太空影像：NASA，公有领域。不得使用 NASA 标志或暗示获得 NASA 认可。
- 视频和剧照通过 Wikimedia Commons 在线播放。

每部影片的出处和许可写在 `videos.ts` 里，并在页面的"版权与致谢"面板中显示。

项目基于 [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) 的 Next.js 脚手架（MIT 许可，见 `LICENSE`）。
