// Open movies from the Blender Foundation / Blender Studio and public-domain NASA footage,
// all streamed from Wikimedia Commons.
// Titles stay in their original English; descriptions are in Chinese.
// Each is Creative Commons licensed; keep the credit (studio, license, source page) wherever it is shown.

export interface Video {
  id: string;
  title: string;
  genre: string;
  description: string;
  studio: string;
  duration: number;
  width: number;
  height: number;
  license: string;
  /** Light stream for hover previews (about 480p). */
  src: string;
  /** Full-quality stream for the player and swipe feed (1080p). */
  srcHd: string;
  /** Optional original 4K file, offered as a quality switch in the player. */
  src4k?: string;
  /** Homepage card image. A vertical 2:3 poster, ideally 1000x1500 or larger. */
  poster: string;
  /** Poster pixel size; the card takes this shape. Falls back to the video's size. */
  posterWidth?: number;
  posterHeight?: number;
  /** Who made the poster and under what license, shown in the credits. */
  posterCredit?: string;
  /** Widescreen frame (16:9-ish, 1920px) used behind the player and in the swipe feed. */
  still: string;
  sourcePage: string;
}

export const GENRES = [
  "All",
  "Comedy",
  "Adventure",
  "Fantasy",
  "Sci-Fi",
  "Earth",
  "Space",
];

const GENRE_LABELS: Record<string, string> = {
  All: "全部",
  Comedy: "喜剧",
  Adventure: "冒险",
  Fantasy: "奇幻",
  "Sci-Fi": "科幻",
  Earth: "地球",
  Space: "太空",
};

export function genreLabel(genre: string): string {
  return GENRE_LABELS[genre] ?? genre;
}

export const VIDEOS: Video[] = [
  {
    id: "sintel-trailer",
    title: "Sintel (trailer)",
    genre: "Fantasy",
    description: "一位年轻女子踏遍大地，寻找她曾亲手养大的小龙。",
    studio: "Blender Foundation",
    duration: 52,
    width: 1920,
    height: 1080,
    license: "CC BY 3.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/06/Sintel_trailer-1080p.ogv/Sintel_trailer-1080p.ogv.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/06/Sintel_trailer-1080p.ogv/Sintel_trailer-1080p.ogv.1080p.vp9.webm",
    poster: "/posters/sintel-trailer.jpg",
    posterWidth: 905,
    posterHeight: 1280,
    posterCredit: "Blender Foundation, CC BY 3.0 (Wikimedia Commons)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Sintel_trailer-1080p.ogv/1920px--Sintel_trailer-1080p.ogv.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3ASintel_trailer-1080p.ogv",
  },
  {
    id: "daily-dweebs",
    title: "The Daily Dweebs",
    genre: "Comedy",
    description: "主人一出门，家里的小狗终于知道了会发生什么。",
    studio: "Blender Studio",
    duration: 60,
    width: 7680,
    height: 4320,
    license: "CC BY 4.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b2/The_Daily_Dweebs_-_Blender_Open_Movie-full_movie.webm/The_Daily_Dweebs_-_Blender_Open_Movie-full_movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b2/The_Daily_Dweebs_-_Blender_Open_Movie-full_movie.webm/The_Daily_Dweebs_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm",
    poster: "/posters/daily-dweebs.webp",
    posterWidth: 800,
    posterHeight: 1129,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/The_Daily_Dweebs_-_Blender_Open_Movie-full_movie.webm/1920px--The_Daily_Dweebs_-_Blender_Open_Movie-full_movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3AThe_Daily_Dweebs_-_Blender_Open_Movie-full_movie.webm",
  },
  {
    id: "caminandes",
    title: "Caminandes: Gran Dillama",
    genre: "Comedy",
    description: "一只倔强的羊驼想尽办法，要吃到篱笆另一边的草。",
    studio: "Blender Foundation",
    duration: 146,
    width: 1920,
    height: 1080,
    license: "CC BY-SA 3.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7c/Caminandes_-_Gran_Dillama_-_Blender_Foundation%27s_new_Open_Movie.webm/Caminandes_-_Gran_Dillama_-_Blender_Foundation%27s_new_Open_Movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7c/Caminandes_-_Gran_Dillama_-_Blender_Foundation%27s_new_Open_Movie.webm/Caminandes_-_Gran_Dillama_-_Blender_Foundation%27s_new_Open_Movie.webm.1080p.vp9.webm",
    poster: "/posters/caminandes.webp",
    posterWidth: 362,
    posterHeight: 512,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Caminandes_-_Gran_Dillama_-_Blender_Foundation%27s_new_Open_Movie.webm/1920px--Caminandes_-_Gran_Dillama_-_Blender_Foundation%27s_new_Open_Movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3ACaminandes_-_Gran_Dillama_-_Blender_Foundation%27s_new_Open_Movie.webm",
  },
  {
    id: "coffee-run",
    title: "Coffee Run",
    genre: "Comedy",
    description: "一场为了咖啡的狂奔，变成了穿越一生的旅程。",
    studio: "Blender Studio",
    duration: 185,
    width: 1920,
    height: 804,
    license: "CC BY 4.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Coffee_Run_-_Blender_Open_Movie-full_movie.webm/Coffee_Run_-_Blender_Open_Movie-full_movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Coffee_Run_-_Blender_Open_Movie-full_movie.webm/Coffee_Run_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm",
    poster: "/posters/coffee-run.webp",
    posterWidth: 800,
    posterHeight: 1129,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Coffee_Run_-_Blender_Open_Movie-full_movie.webm/1920px--Coffee_Run_-_Blender_Open_Movie-full_movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3ACoffee_Run_-_Blender_Open_Movie-full_movie.webm",
  },
  {
    id: "glass-half",
    title: "Glass Half",
    genre: "Comedy",
    description: "两位评论家在美术馆里争论：每件作品到底是杰作还是垃圾。",
    studio: "Blender Studio",
    duration: 193,
    width: 3840,
    height: 2160,
    license: "CC BY 4.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/02/Glass_Half_-_Blender_Open_Movie-full_movie.webm/Glass_Half_-_Blender_Open_Movie-full_movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/02/Glass_Half_-_Blender_Open_Movie-full_movie.webm/Glass_Half_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm",
    poster: "/posters/glass-half.webp",
    posterWidth: 362,
    posterHeight: 512,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Glass_Half_-_Blender_Open_Movie-full_movie.webm/1920px--Glass_Half_-_Blender_Open_Movie-full_movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3AGlass_Half_-_Blender_Open_Movie-full_movie.webm",
  },
  {
    id: "hero",
    title: "HERO",
    genre: "Adventure",
    description:
      "一场穿越废墟的剑斗，用来展示 Grease Pencil 在 3D 中绘制 2D 的能力。",
    studio: "Blender Studio",
    duration: 237,
    width: 2048,
    height: 858,
    license: "CC BY 4.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a9/HERO_-_Blender_Open_Movie-full_movie.webm/HERO_-_Blender_Open_Movie-full_movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a9/HERO_-_Blender_Open_Movie-full_movie.webm/HERO_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm",
    poster: "/posters/hero.webp",
    posterWidth: 725,
    posterHeight: 1024,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/HERO_-_Blender_Open_Movie-full_movie.webm/1920px--HERO_-_Blender_Open_Movie-full_movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3AHERO_-_Blender_Open_Movie-full_movie.webm",
  },
  {
    id: "wing-it",
    title: "Wing It!",
    genre: "Adventure",
    description: "一只猫和一只狗用废品造了一枚火箭，想把它发射上天。",
    studio: "Blender Studio",
    duration: 238,
    width: 1920,
    height: 1080,
    license: "CC BY 4.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/38/WING_IT%21_-_Blender_Open_Movie-full_movie.webm/WING_IT%21_-_Blender_Open_Movie-full_movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/38/WING_IT%21_-_Blender_Open_Movie-full_movie.webm/WING_IT%21_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm",
    poster: "/posters/wing-it.webp",
    posterWidth: 800,
    posterHeight: 1131,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/WING_IT%21_-_Blender_Open_Movie-full_movie.webm/1920px--WING_IT%21_-_Blender_Open_Movie-full_movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3AWING_IT%21_-_Blender_Open_Movie-full_movie.webm",
  },
  {
    id: "charge",
    title: "Charge",
    genre: "Sci-Fi",
    description: "在冰封又缺乏能源的世界里，一位老人守护着他最后一块电池。",
    studio: "Blender Studio",
    duration: 263,
    width: 3840,
    height: 1608,
    license: "CC BY 4.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7a/Charge_-_Blender_Open_Movie-full_movie.webm/Charge_-_Blender_Open_Movie-full_movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7a/Charge_-_Blender_Open_Movie-full_movie.webm/Charge_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm",
    poster: "/posters/charge.webp",
    posterWidth: 597,
    posterHeight: 844,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Charge_-_Blender_Open_Movie-full_movie.webm/1920px--Charge_-_Blender_Open_Movie-full_movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3ACharge_-_Blender_Open_Movie-full_movie.webm",
  },
  {
    id: "singularity",
    title: "Singularity",
    genre: "Sci-Fi",
    description: "世界尽头，一个孤独的机器人收到了一段奇怪的信号。",
    studio: "Blender Studio",
    duration: 391,
    width: 3840,
    height: 1608,
    license: "CC BY 4.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f2/SINGULARITY_-_Blender_Open_Movie-full_movie.webm/SINGULARITY_-_Blender_Open_Movie-full_movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f2/SINGULARITY_-_Blender_Open_Movie-full_movie.webm/SINGULARITY_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm",
    poster: "/posters/singularity.webp",
    posterWidth: 800,
    posterHeight: 1132,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/SINGULARITY_-_Blender_Open_Movie-full_movie.webm/1920px--SINGULARITY_-_Blender_Open_Movie-full_movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3ASINGULARITY_-_Blender_Open_Movie-full_movie.webm",
  },
  {
    id: "spring",
    title: "Spring",
    genre: "Fantasy",
    description: "牧羊女孩和她的狗直面古老的神灵，只为唤回春天。",
    studio: "Blender Studio",
    duration: 464,
    width: 2048,
    height: 858,
    license: "CC BY 4.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a5/Spring_-_Blender_Open_Movie.webm/Spring_-_Blender_Open_Movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a5/Spring_-_Blender_Open_Movie.webm/Spring_-_Blender_Open_Movie.webm.1080p.vp9.webm",
    poster: "/posters/spring.webp",
    posterWidth: 726,
    posterHeight: 1024,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Spring_-_Blender_Open_Movie.webm/1920px--Spring_-_Blender_Open_Movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3ASpring_-_Blender_Open_Movie.webm",
  },
  {
    id: "sprite-fright",
    title: "Sprite Fright",
    genre: "Comedy",
    description: "一群去森林郊游的少年，惹恼了住在那里的小蘑菇精灵。",
    studio: "Blender Studio",
    duration: 630,
    width: 2048,
    height: 858,
    license: "CC BY 4.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/76/Sprite_Fright_-_Blender_Open_Movie-full_movie.webm/Sprite_Fright_-_Blender_Open_Movie-full_movie.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/76/Sprite_Fright_-_Blender_Open_Movie-full_movie.webm/Sprite_Fright_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm",
    poster: "/posters/sprite-fright.webp",
    posterWidth: 800,
    posterHeight: 1131,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Sprite_Fright_-_Blender_Open_Movie-full_movie.webm/1920px--Sprite_Fright_-_Blender_Open_Movie-full_movie.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3ASprite_Fright_-_Blender_Open_Movie-full_movie.webm",
  },
  {
    id: "cosmos-laundromat",
    title: "Cosmos Laundromat",
    genre: "Fantasy",
    description:
      "一只厌世的绵羊遇到一位怪异的推销员，对方许诺给它无数次新的人生。",
    studio: "Blender Foundation",
    duration: 731,
    width: 2048,
    height: 858,
    license: "CC BY-SA 3.0",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/36/Cosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm/Cosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/36/Cosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm/Cosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm.1080p.vp9.webm",
    poster: "/posters/cosmos-laundromat.webp",
    posterWidth: 362,
    posterHeight: 512,
    posterCredit: "Blender Studio, CC BY 4.0 (studio.blender.org)",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Cosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm/1920px--Cosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File%3ACosmos_Laundromat_-_First_Cycle_-_Official_Blender_Foundation_release.webm",
  },
  {
    id: "home-views",
    title: "家园：太空中的地球",
    genre: "Earth",
    description:
      "国际空间站宇航员拍下的超高清地球画面，城市灯光、云层和日出一览无余。",
    studio: "NASA 约翰逊航天中心",
    duration: 160,
    width: 3840,
    height: 1920,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f5/%27Home%27_-_4K_Views_from_Space.webm/%27Home%27_-_4K_Views_from_Space.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f5/%27Home%27_-_4K_Views_from_Space.webm/%27Home%27_-_4K_Views_from_Space.webm.1080p.vp9.webm",
    src4k:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/%27Home%27_-_4K_Views_from_Space.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/%27Home%27_-_4K_Views_from_Space.webm/1920px--%27Home%27_-_4K_Views_from_Space.webm.jpg",
    posterWidth: 3840,
    posterHeight: 1920,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/%27Home%27_-_4K_Views_from_Space.webm/1920px--%27Home%27_-_4K_Views_from_Space.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:%27Home%27_-_4K_Views_from_Space.webm",
  },
  {
    id: "planet-earth-4k",
    title: "4K 地球全景",
    genre: "Earth",
    description: "从近地轨道缓缓掠过地球表面，海洋、沙漠和云团的细节清晰可见。",
    studio: "NASA 约翰逊航天中心",
    duration: 97,
    width: 3840,
    height: 2160,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a7/View_of_Planet_Earth_%284K%29.webm/View_of_Planet_Earth_%284K%29.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a7/View_of_Planet_Earth_%284K%29.webm/View_of_Planet_Earth_%284K%29.webm.1080p.vp9.webm",
    src4k:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/View_of_Planet_Earth_%284K%29.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/View_of_Planet_Earth_%284K%29.webm/1920px--View_of_Planet_Earth_%284K%29.webm.jpg",
    posterWidth: 3840,
    posterHeight: 2160,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/View_of_Planet_Earth_%284K%29.webm/1920px--View_of_Planet_Earth_%284K%29.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:View_of_Planet_Earth_(4K).webm",
  },
  {
    id: "crew-earth-observations",
    title: "宇航员的地球观测",
    genre: "Earth",
    description: "空间站乘组用 4K 摄像机记录下的一组地球景观。",
    studio: "NASA 约翰逊航天中心",
    duration: 66,
    width: 3840,
    height: 2160,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/42/Crew_Earth_Observations_%284K%29.webm/Crew_Earth_Observations_%284K%29.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/42/Crew_Earth_Observations_%284K%29.webm/Crew_Earth_Observations_%284K%29.webm.1080p.vp9.webm",
    src4k:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Crew_Earth_Observations_%284K%29.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Crew_Earth_Observations_%284K%29.webm/1920px--Crew_Earth_Observations_%284K%29.webm.jpg",
    posterWidth: 3840,
    posterHeight: 2160,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Crew_Earth_Observations_%284K%29.webm/1920px--Crew_Earth_Observations_%284K%29.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:Crew_Earth_Observations_(4K).webm",
  },
  {
    id: "aurora-from-space",
    title: "从太空看北极光",
    genre: "Earth",
    description: "在国际空间站上俯瞰北极光，绿色光带在地球边缘舞动。",
    studio: "NASA 约翰逊航天中心",
    duration: 310,
    width: 3840,
    height: 2160,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/99/Aurora_Borealis_from_Space_%284K%29.webm/Aurora_Borealis_from_Space_%284K%29.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/99/Aurora_Borealis_from_Space_%284K%29.webm/Aurora_Borealis_from_Space_%284K%29.webm.1080p.vp9.webm",
    src4k:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Aurora_Borealis_from_Space_%284K%29.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Aurora_Borealis_from_Space_%284K%29.webm/1920px--Aurora_Borealis_from_Space_%284K%29.webm.jpg",
    posterWidth: 3840,
    posterHeight: 2160,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Aurora_Borealis_from_Space_%284K%29.webm/1920px--Aurora_Borealis_from_Space_%284K%29.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:Aurora_Borealis_from_Space_(4K).webm",
  },
  {
    id: "hurricane-season-2021",
    title: "2021 年飓风季全记录",
    genre: "Earth",
    description: "用卫星数据重现整个大西洋飓风季，每一场风暴的路径和强度变化。",
    studio: "NASA 戈达德科学可视化工作室",
    duration: 233,
    width: 3840,
    height: 2160,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/06/Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_tracks_2160p30%29.webm/Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_tracks_2160p30%29.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/06/Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_tracks_2160p30%29.webm/Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_tracks_2160p30%29.webm.1080p.vp9.webm",
    src4k:
      "https://upload.wikimedia.org/wikipedia/commons/0/06/Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_tracks_2160p30%29.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_tracks_2160p30%29.webm/1920px--Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_tracks_2160p30%29.webm.jpg",
    posterWidth: 3840,
    posterHeight: 2160,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_tracks_2160p30%29.webm/1920px--Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_tracks_2160p30%29.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:Complete_2021_Hurricane_Season_(SVS4982_-_hurr2021_4K_tracks_2160p30).webm",
  },
  {
    id: "hurricane-fiona",
    title: "飓风菲奥娜增强为强飓风",
    genre: "Earth",
    description: "卫星视角下，飓风菲奥娜在大西洋上迅速增强的过程。",
    studio: "NASA 戈达德科学可视化工作室",
    duration: 52,
    width: 3840,
    height: 2160,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f2/Fiona_Becomes_a_Major_Hurricane_in_the_Atlantic_%28SVS5035_-_Fiona0923L_4K_2160p60%29.webm/Fiona_Becomes_a_Major_Hurricane_in_the_Atlantic_%28SVS5035_-_Fiona0923L_4K_2160p60%29.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f2/Fiona_Becomes_a_Major_Hurricane_in_the_Atlantic_%28SVS5035_-_Fiona0923L_4K_2160p60%29.webm/Fiona_Becomes_a_Major_Hurricane_in_the_Atlantic_%28SVS5035_-_Fiona0923L_4K_2160p60%29.webm.1080p.vp9.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Fiona_Becomes_a_Major_Hurricane_in_the_Atlantic_%28SVS5035_-_Fiona0923L_4K_2160p60%29.webm/1920px--Fiona_Becomes_a_Major_Hurricane_in_the_Atlantic_%28SVS5035_-_Fiona0923L_4K_2160p60%29.webm.jpg",
    posterWidth: 3840,
    posterHeight: 2160,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Fiona_Becomes_a_Major_Hurricane_in_the_Atlantic_%28SVS5035_-_Fiona0923L_4K_2160p60%29.webm/1920px--Fiona_Becomes_a_Major_Hurricane_in_the_Atlantic_%28SVS5035_-_Fiona0923L_4K_2160p60%29.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:Fiona_Becomes_a_Major_Hurricane_in_the_Atlantic_(SVS5035_-_Fiona0923L_4K_2160p60).webm",
  },
  {
    id: "february-flares",
    title: "二月的猛烈耀斑",
    genre: "Space",
    description: "太阳动力学天文台拍下的一连串强烈太阳耀斑。",
    studio: "NASA 戈达德科学可视化工作室",
    duration: 168,
    width: 3840,
    height: 2160,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d2/Furious_February_Flares_%28SVS14973_FebFlares_4K_H264%29.webm/Furious_February_Flares_%28SVS14973_FebFlares_4K_H264%29.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d2/Furious_February_Flares_%28SVS14973_FebFlares_4K_H264%29.webm/Furious_February_Flares_%28SVS14973_FebFlares_4K_H264%29.webm.1080p.vp9.webm",
    src4k:
      "https://upload.wikimedia.org/wikipedia/commons/d/d2/Furious_February_Flares_%28SVS14973_FebFlares_4K_H264%29.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Furious_February_Flares_%28SVS14973_FebFlares_4K_H264%29.webm/1920px--Furious_February_Flares_%28SVS14973_FebFlares_4K_H264%29.webm.jpg",
    posterWidth: 3840,
    posterHeight: 2160,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Furious_February_Flares_%28SVS14973_FebFlares_4K_H264%29.webm/1920px--Furious_February_Flares_%28SVS14973_FebFlares_4K_H264%29.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:Furious_February_Flares_(SVS14973_FebFlares_4K_H264).webm",
  },
  {
    id: "webb-jupiter-aurora",
    title: "韦布望远镜拍到木星极光",
    genre: "Space",
    description: "詹姆斯·韦布空间望远镜观测到的木星极光，以及背后的科学。",
    studio: "NASA 戈达德科学可视化工作室",
    duration: 167,
    width: 3840,
    height: 2160,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/35/Webb_Captures_Jupiter%E2%80%99s_Aurora_%28SVS14839_-_4K_WIDE%29.webm/Webb_Captures_Jupiter%E2%80%99s_Aurora_%28SVS14839_-_4K_WIDE%29.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/35/Webb_Captures_Jupiter%E2%80%99s_Aurora_%28SVS14839_-_4K_WIDE%29.webm/Webb_Captures_Jupiter%E2%80%99s_Aurora_%28SVS14839_-_4K_WIDE%29.webm.1080p.vp9.webm",
    src4k:
      "https://upload.wikimedia.org/wikipedia/commons/3/35/Webb_Captures_Jupiter%E2%80%99s_Aurora_%28SVS14839_-_4K_WIDE%29.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Webb_Captures_Jupiter%E2%80%99s_Aurora_%28SVS14839_-_4K_WIDE%29.webm/1920px--Webb_Captures_Jupiter%E2%80%99s_Aurora_%28SVS14839_-_4K_WIDE%29.webm.jpg",
    posterWidth: 3840,
    posterHeight: 2160,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Webb_Captures_Jupiter%E2%80%99s_Aurora_%28SVS14839_-_4K_WIDE%29.webm/1920px--Webb_Captures_Jupiter%E2%80%99s_Aurora_%28SVS14839_-_4K_WIDE%29.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:Webb_Captures_Jupiter%E2%80%99s_Aurora_(SVS14839_-_4K_WIDE).webm",
  },
  {
    id: "black-hole-plunge",
    title: "坠入黑洞",
    genre: "Space",
    description:
      "用超级计算机模拟坠入超大质量黑洞的旅程，越过视界之后会看到什么。",
    studio: "NASA 戈达德科学可视化工作室",
    duration: 260,
    width: 3840,
    height: 2160,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/96/NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_%28SVS14576_BHPlunge_Explainer_4k%29.webm/NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_%28SVS14576_BHPlunge_Explainer_4k%29.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/96/NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_%28SVS14576_BHPlunge_Explainer_4k%29.webm/NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_%28SVS14576_BHPlunge_Explainer_4k%29.webm.1080p.vp9.webm",
    src4k:
      "https://upload.wikimedia.org/wikipedia/commons/9/96/NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_%28SVS14576_BHPlunge_Explainer_4k%29.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_%28SVS14576_BHPlunge_Explainer_4k%29.webm/1920px--NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_%28SVS14576_BHPlunge_Explainer_4k%29.webm.jpg",
    posterWidth: 3840,
    posterHeight: 2160,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_%28SVS14576_BHPlunge_Explainer_4k%29.webm/1920px--NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_%28SVS14576_BHPlunge_Explainer_4k%29.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:NASA_Black_Hole_Visualization_Takes_Viewers_Beyond_the_Brink_(SVS14576_BHPlunge_Explainer_4k).webm",
  },
  {
    id: "moon-phases-2016",
    title: "2016 年月相全年变化",
    genre: "Space",
    description: "一整年的月相、天平动和视大小变化，以 4K 高清呈现。",
    studio: "NASA 戈达德科学可视化工作室",
    duration: 314,
    width: 3840,
    height: 2160,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7f/NASA_-_Moon_Phases_2016%2C_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm/NASA_-_Moon_Phases_2016%2C_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7f/NASA_-_Moon_Phases_2016%2C_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm/NASA_-_Moon_Phases_2016%2C_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm.1080p.vp9.webm",
    src4k:
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/NASA_-_Moon_Phases_2016%2C_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/NASA_-_Moon_Phases_2016%2C_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm/1920px--NASA_-_Moon_Phases_2016%2C_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm.jpg",
    posterWidth: 3840,
    posterHeight: 2160,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/NASA_-_Moon_Phases_2016%2C_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm/1920px--NASA_-_Moon_Phases_2016%2C_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:NASA_-_Moon_Phases_2016,_Northern_Hemisphere_-_4K_Cm7FGBSo9UY.webm",
  },
  {
    id: "ingenuity-fourth-flight",
    title: "毅力号拍下机智号第四次飞行",
    genre: "Space",
    description: "火星车毅力号录下机智号直升机飞行的画面，还有火星上的声音。",
    studio: "NASA 喷气推进实验室",
    duration: 165,
    width: 1920,
    height: 1080,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b1/NASA%27s_Perseverance_Captures_Video%2C_Audio_of_Fourth_Ingenuity_Flight.webm/NASA%27s_Perseverance_Captures_Video%2C_Audio_of_Fourth_Ingenuity_Flight.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b1/NASA%27s_Perseverance_Captures_Video%2C_Audio_of_Fourth_Ingenuity_Flight.webm/NASA%27s_Perseverance_Captures_Video%2C_Audio_of_Fourth_Ingenuity_Flight.webm.1080p.vp9.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/NASA%27s_Perseverance_Captures_Video%2C_Audio_of_Fourth_Ingenuity_Flight.webm/1920px--NASA%27s_Perseverance_Captures_Video%2C_Audio_of_Fourth_Ingenuity_Flight.webm.jpg",
    posterWidth: 1920,
    posterHeight: 1080,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/NASA%27s_Perseverance_Captures_Video%2C_Audio_of_Fourth_Ingenuity_Flight.webm/1920px--NASA%27s_Perseverance_Captures_Video%2C_Audio_of_Fourth_Ingenuity_Flight.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:NASA%27s_Perseverance_Captures_Video,_Audio_of_Fourth_Ingenuity_Flight.webm",
  },
  {
    id: "perseverance-year",
    title: "毅力号火星一周年回顾",
    genre: "Space",
    description: "毅力号在火星杰泽罗陨石坑第一年的探索精华。",
    studio: "NASA 喷气推进实验室",
    duration: 161,
    width: 1920,
    height: 1080,
    license: "公有领域",
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/12/Perseverance-Year-in-Review-1080.webm/Perseverance-Year-in-Review-1080.webm.480p.vp9.webm",
    srcHd:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/12/Perseverance-Year-in-Review-1080.webm/Perseverance-Year-in-Review-1080.webm.1080p.vp9.webm",
    poster:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Perseverance-Year-in-Review-1080.webm/1920px--Perseverance-Year-in-Review-1080.webm.jpg",
    posterWidth: 1920,
    posterHeight: 1080,
    posterCredit: "NASA，公有领域（Wikimedia Commons）",
    still:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Perseverance-Year-in-Review-1080.webm/1920px--Perseverance-Year-in-Review-1080.webm.jpg",
    sourcePage:
      "https://commons.wikimedia.org/wiki/File:Perseverance-Year-in-Review-1080.webm",
  },
];

export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
