/**
 * Korean Showbiz News — structured dataset
 * Compiled from real-time web search results (web_search via z-ai SDK)
 * and image-search results (image-search via z-ai SDK).
 *
 * Last refreshed: 2026-06-17
 * Refresh policy: daily (see /api/refresh and GitHub Action)
 */

import { ARTICLE_BODIES } from "./article-bodies";

export type NewsCategory = "gossip" | "upcoming" | "trending" | "casting";

/**
 * Structured article body block.
 * The body is an ordered list of blocks rendered by ArticleView with proper
 * HTML semantics (H2/H3/List/Quote) for SEO.
 *
 * Inline markdown links are supported inside `text` and `items` fields using
 * the syntax: [link text](https://example.com) for external links, or
 * [link text](/article/slug) for internal links to other K-Scoop articles.
 * The renderer converts these to <a rel="nofollow"> (external) or <Link>
 * (internal) elements.
 */
export type BodyBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "ul"; items: string[] };

export interface NewsItem {
  id: string;
  slug: string; // SEO-friendly URL slug, e.g. "kim-soo-hyun-returns-after-ai-scandal"
  title: string;
  summary: string;
  /** Full article body as structured blocks (auto-generated, see article-bodies.ts). */
  body?: BodyBlock[];
  /** Optional "Key Takeaways" list — rendered as a featured-snippet box at the top. */
  takeaways?: string[];
  category: NewsCategory;
  source: string;
  sourceUrl: string;
  date: string; // ISO date
  image: string;
  tags: string[];
  hot?: boolean;
}

export interface ActorProfile {
  id: string;
  name: string;
  role: string;
  blurb: string;
  image: string;
  tags: string[];
  followers: string;
}

export interface UpcomingSeries {
  id: string;
  title: string;
  premiere: string;
  platform: string;
  genre: string;
  cast: string;
  image: string;
  hype: number; // 1-10
}

// ---------------------------------------------------------------------------
// IMAGES  (sourced from image-search, OSS-hosted and embeddable)
// ---------------------------------------------------------------------------
const IMG = {
  kimsoohyun: "https://sfile.chatglm.cn/images-ppt/5eb965d0a16d.jpg",
  kimsoohyun2: "https://sfile.chatglm.cn/images-ppt/ef8859b912a1.jpeg",
  kimsoohyun3: "https://sfile.chatglm.cn/images-ppt/fd4c601b5fe6.jpg",
  suzy: "https://sfile.chatglm.cn/images-ppt/9753f73fb4bf.jpeg",
  suzy2: "https://sfile.chatglm.cn/images-ppt/7005fc244e1e.jpg",
  suzy3: "https://sfile.chatglm.cn/images-ppt/7aaa49d4c254.jpg",
  actor: "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
  actor2: "https://sfile.chatglm.cn/images-ppt/ed0f3015934b.jpg",
  actor3: "https://sfile.chatglm.cn/images-ppt/7da970fc4899.jpg",
  actress: "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
  actress2: "https://sfile.chatglm.cn/images-ppt/3c6e73d2afc8.jpg",
  actress3: "https://sfile.chatglm.cn/images-ppt/6d00315c286c.jpg",
  kdrama: "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
  kdrama2: "https://sfile.chatglm.cn/images-ppt/6f7c0678c6c8.jpg",
  kdrama3: "https://sfile.chatglm.cn/images-ppt/e0889b4a1796.jpg",
  couple: "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
  couple2: "https://sfile.chatglm.cn/images-ppt/872e9713158b.jpeg",
  couple3: "https://sfile.chatglm.cn/images-ppt/634893b016ce.jpg",
  kpop: "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
  kpop2: "https://sfile.chatglm.cn/images-ppt/c53b0fd76043.jpg",
  kpop3: "https://sfile.chatglm.cn/images-ppt/f96b903a5171.jpg",
  seoul: "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
  seoul2: "https://sfile.chatglm.cn/images-ppt/3f0edfe4b431.jpg",
  seoul3: "https://sfile.chatglm.cn/images-ppt/9ef0fa8b8fa0.jpg",
};

// ---------------------------------------------------------------------------
// NEWS ARTICLES  (curated from web_search results above)
// ---------------------------------------------------------------------------
export const NEWS: NewsItem[] = [
  {
    "id": "live-1781791114496-1",
    "slug": "hyeri-speaks-out-on-beauty-standards-facebook",
    "title": "HYERI SPEAKS OUT ON BEAUTY STANDARDS - Facebook",
    "summary": "K-pop star HyunA recently revealed on social media that she has reached 49kg, marking a significant milestone after losing nearly 10kg.",
    "category": "trending",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/100065275819551/posts/hyeri-speaks-out-on-beauty-standards-health-matters-more-than-sizeactress-and-si/1387041406815040/",
    "date": "14 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781791117228-2",
    "slug": "korean-celebrities-tiktok",
    "title": "Korean Celebrities - TikTok",
    "summary": "Discover the charming behavior of Korean celebrities, from Yoona's shine at the awards to analyzing actor personalities. Click for the latest updates!",
    "category": "trending",
    "author": "Soo Min Lee",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/korean-celebrities",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781791119046-3",
    "slug": "5-korean-dramas-releasing-in-june-2026-from-doctor-on",
    "title": "5 Korean Dramas Releasing In June 2026: From Doctor On ...",
    "summary": "Let's take a look! 1. Doctor On The Edge Release Date: June 1, 2026 (Airs every Monday & Tuesday) Cast: Lee Jae-wook, Shin ...",
    "category": "casting",
    "author": "Dana Kim",
    "source": "imdb.com",
    "sourceUrl": "https://www.imdb.com/news/ni65862550/?ref_=nm_nwr_2",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781791121054-4",
    "slug": "every-upcoming-k-drama-in-july-2026-and-where-to-watch",
    "title": "every upcoming K-drama in July 2026 and where to watch",
    "summary": "The Husband is a romance-thriller series that premieres on KBS2 on 4 July 2026. South Korean actor Namkoong Min stars alongside Lee Seol and Kim Dae-myung. Kang ...",
    "category": "casting",
    "author": "Hana Cho",
    "source": "legit.ng",
    "sourceUrl": "https://www.legit.ng/entertainment/tv-shows/1713237-park-eun-bin-seo-hyun-jin-upcoming-k-drama-july-watch/",
    "date": "6 days ago",
    "image": "https://cdn.legit.ng/images/1200x675/6f16f326963a46a1.jpeg?v=1",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781791123076-5",
    "slug": "upcoming-k-dramas-to-watch-in-july-2026",
    "title": "Upcoming K-dramas to Watch in July 2026",
    "summary": "July 2026 has K-dramas from dark fantasy to Lee Dong-wook and Ahn Bo-hyun returning with sequels. Here are all the details from release date to plot:",
    "category": "casting",
    "author": "Mia Kwon",
    "source": "thereviewgeek.com",
    "sourceUrl": "https://www.thereviewgeek.com/upcoming-kdramas-july2026/",
    "date": "7 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781791123187-6",
    "slug": "anne-curtis-fyang-smith-and-kim-chiu-among-seoul",
    "title": "Anne Curtis, Fyang Smith, and Kim Chiu Among Seoul ...",
    "summary": "Filipino talent continues to shine on the international stage, with 23 local stars securing nominations at the prestigious 2026 Seoul International Drama ...",
    "category": "casting",
    "author": "Rina Baek",
    "source": "metro.style",
    "sourceUrl": "https://metro.style/people/2026/6/15/anne-curtis-fyang-smith-kim-chiu-among-seoul-drama-awards-2026-nominees-here-s-how-you-can-vote-1846",
    "date": "3 days ago",
    "image": "https://od2-image-api.abs-cbn.com/prod/20260615110612/7cf14663638f09b8bace79a5ab5dac561939a563f929b3dfed93eb4072ce653f.png?w=1200&h=800",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781788706698-1",
    "slug": "oh-jung-se-wikipedia",
    "title": "Oh Jung-se - Wikipedia",
    "summary": "Oh Jung-se (Korean: 오정세 ; born February 26, 1977) is a South Korean actor. He is best known for his lead roles in the television series It's Okay to Not ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Oh_Jung-se",
    "date": "5 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/05/Oh_Jung-se_in_November_2024.png",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781788708352-2",
    "slug": "the-devastating-passing-of-former-child-actress-kim-saeron-has-sent",
    "title": "The devastating passing of former child actress Kim Saeron has sent ...",
    "summary": "Kim Sae-ron, a well-known South Korean actress, sadly passed away on February 16, 2025, at the age of 24. there were no signs of foul play. serious allegations ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZd2lD3yVCn/",
    "date": "7 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781788709866-3",
    "slug": "korea-joongang-daily-korean-news-in-english",
    "title": "Korea JoongAng Daily | Korean news in English",
    "summary": "Raft and relaxation · Firefighters spring into action · Actor Lee Joo-been reveals her ID photo was exploited for multiple criminal scams · Korea · Ex-chief of ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "koreajoongangdaily.com",
    "sourceUrl": "https://www.koreajoongangdaily.com/",
    "date": "6 days ago",
    "image": "https://image.koreajoongangdaily.com/12626953.webp?width=1200&height=630",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781788711620-4",
    "slug": "the-hollywood-reporter-movie-news-tv-news-awards-news",
    "title": "The Hollywood Reporter – Movie news, TV news, awards news ...",
    "summary": "Movie news, TV news, awards news, lifestyle news, business news and more from The Hollywood Reporter.",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "hollywoodreporter.com",
    "sourceUrl": "https://www.hollywoodreporter.com/",
    "date": "8 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781788713062-5",
    "slug": "every-k-drama-coming-to-netflix-viki-and-more-in-may-2026",
    "title": "Every K-Drama Coming to Netflix, Viki, and More in May 2026",
    "summary": "- *Tastefully Yours*: premiering on Netflix on May 12 1. *Nine Puzzles*: A psychological thriller premiering on Disney+ on May 21 1. Netflix, Disney+, and JTBC.",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/adultswholovecartoons/posts/every-k-drama-coming-to-netflix-viki-and-more-in-may-2026-read-more-/1469028958604120/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781788713107-6",
    "slug": "korean-drama-perfect-crown-heading-to-disney-in-2026-imdb",
    "title": "Korean Drama 'Perfect Crown' Heading to Disney+ in 2026 ... - IMDb",
    "summary": "Disney+ revealed that the much-talked about Mbc drama Perfect Crown, starring the in-demand pair of Iu and Byeon Woo-seok, will hit the streamer in 2026 for ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "imdb.com",
    "sourceUrl": "https://www.imdb.com/es/news/ni65570282/",
    "date": "19 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781788138776-1",
    "slug": "a-bold-new-chapter-former-le-sserafim-member-kim-ga-ram",
    "title": "\"A Bold New Chapter: Former Le Sserafim Member Kim Ga-ram ...",
    "summary": "\"A Bold New Chapter: Former Le Sserafim Member Kim Ga-ram Signs Exclusive Acting Contract.\" Four years after vanishing from the K-pop spotlight, one of the ...",
    "category": "trending",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KoreadailyUS/posts/a-bold-new-chapter-former-le-sserafim-member-kim-ga-ram-signs-exclusive-acting-c/1332611182294600/",
    "date": "12 hours ago",
    "image": "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=800&q=80",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781788140915-2",
    "slug": "10-famous-korean-stars-and-their-expensive-hobbies",
    "title": "10 FAMOUS KOREAN STARS and THEIR EXPENSIVE HOBBIES ...",
    "summary": "IU (Lee Ji-Eun) – $25 Million IU is considered one of the most popular K-pop stars in Korea. She debuted at the young age of 15 as a singer- songwriter. IU ...",
    "category": "trending",
    "author": "Soo Min Lee",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/chingunatics/posts/10-famous-korean-stars-and-their-expensive-hobbies-fblifestyle-koreanstars/1038468598957586/",
    "date": "3 days ago",
    "image": "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781788143356-3",
    "slug": "song-hye-kyo-continues-to-define-elegance-talent",
    "title": "SONG HYE KYO CONTINUES TO DEFINE ELEGANCE, TALENT ...",
    "summary": "Beyond acting, SONG HYE KYO is a global fashion and beauty icon. Whether attending international fashion events, appearing in luxury campaigns, gracing magazine ...",
    "category": "trending",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZqCWMtyqvI/?hl=fa",
    "date": "2 days ago",
    "image": "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&q=80",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781788145830-4",
    "slug": "taught-us-a-lesson-in-aura-farming-teach-you-a-lesson-kim-mu-yeol-kdrama-introdu",
    "title": "Taught us a lesson in aura farming. : Teach You a Lesson [Kim Mu-yeol, KDrama, Introduction, Aura, Simp]",
    "summary": "Release Date: June 5, 2026. Main Cast: Kim Mu-yeol as Na Hwa-jin. Lee Sung-min as Choi Gang-seok. Jin Ki-joo ...",
    "category": "casting",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZrbjl_DLv8/",
    "date": "4 hours ago",
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781788149039-5",
    "slug": "never-ending-summer",
    "title": "Never-Ending Summer",
    "summary": ": \"Never-Ending Summer\" is a romance drama series starring Bao Shang'en (\"Whispers of Fate\") and Daniel Zhou (\"A Moment but Forever\"), along with Zhao Yingbo, ...",
    "category": "casting",
    "author": "Mia Kwon",
    "source": "iq.com",
    "sourceUrl": "https://www.iq.com/album/never-ending-summer-2026-14mg4loc341?lang=en_us",
    "date": "2 days ago",
    "image": "https://pic6.iqiyipic.com/image/20260616/3c/ea/a_100838730_m_601_en_1080_608.jpg",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781788152868-6",
    "slug": "netflix-the-east-palace-official-teaser-premieres-july-17-rkdrama",
    "title": "Netflix 'The East Palace' Official Teaser (Premieres July 17) : r/KDRAMA",
    "summary": "Cho Seungwoo, Roh Yoonseo, and Nam Joohyuk's upcoming Horror drama \"The East Palace\" is scheduled for release on Netflix on July 17th.",
    "category": "casting",
    "author": "Rina Baek",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/KDRAMA/comments/1u8qyjr/netflix_the_east_palace_official_teaser_premieres/",
    "date": "13 hours ago",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781787694308-1",
    "slug": "oh-shin-haeng-shifts-from-politics-to-pop-facebook",
    "title": "Oh Shin-haeng shifts from politics to pop. - Facebook",
    "summary": "Jung Yong-hwa of CNBlue: from rocking busker in Japan to multitalented bandleader taking on K-pop in Korea Jung has spent 10 years in the music industry, ...",
    "category": "trending",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/malaymaildotcom/posts/oh-shin-haeng-shifts-from-politics-to-pop/1453649146799435/",
    "date": "13 hours ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/K-pop_Music_Fest_2013_in_Sydney_%2810236993453%29.jpg/640px-K-pop_Music_Fest_2013_in_Sydney_%2810236993453%29.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781787696915-2",
    "slug": "why-do-so-many-korean-actresses-get-plastic-surgery-even-though",
    "title": "Why do so many Korean actresses get plastic surgery even though ...",
    "summary": "This is Seorina. She starred in the <b>popular K</b>-drama Business Proposal. Her chin looks slimmer and longer, and her veneers are noticeable too. KPop idols ...",
    "category": "trending",
    "author": "Soo Min Lee",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kdramas/comments/1u7f2vg/why_do_so_many_korean_actresses_get_plastic/",
    "date": "2 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Seoul_Skyline_%28cropped%29.jpg/640px-Seoul_Skyline_%28cropped%29.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781787699143-3",
    "slug": "global-statistics-on-instagram-from-k-drama-stars-to-k-pop",
    "title": "Global Statistics on Instagram: \" From K-drama stars to K-pop ...",
    "summary": "From Lee Min-ho and Kim Soo-hyun to Gong Yoo and Ma Dong-seok, these stars have helped shape the worldwide Korean Wave (Hallyu). ✨ Who is your favorite South ...",
    "category": "trending",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZew8NBSZbC/",
    "date": "6 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Korean_Drama_-_My_Love_from_the_Star_poster.jpg/427px-Korean_Drama_-_My_Love_from_the_Star_poster.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781787701133-4",
    "slug": "korean-celebrity-crushes-videos-snapchat",
    "title": "Korean Celebrity Crushes Videos - Snapchat",
    "summary": "This quick-cut video reveals a list of popular Korean actors and which fellow celebrities they have publicly admitted to having a crush on.",
    "category": "trending",
    "author": "Hana Cho",
    "source": "snapchat.com",
    "sourceUrl": "https://www.snapchat.com/topic/korean-celebrity-crushes",
    "date": "1 day ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Seoul_at_night.jpg/640px-Seoul_at_night.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781787702757-5",
    "slug": "lee-hye-ri-wikipedia",
    "title": "Lee Hye-ri - Wikipedia",
    "summary": "Lee Hye-ri (Korean: 이혜리 ; born June 9, 1994), better known mononymously as Hyeri, is a South Korean actress, singer, and television personality.",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Lee_Hye-ri",
    "date": "4 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Hyeri_in_July_2025.png",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781787702820-6",
    "slug": "positively-yours-2026-full-cast-and-crew",
    "title": "Positively Yours (2026) Full Cast & Crew",
    "summary": "Zhang Linghe and Tian Xiwei are bringing an exciting lineup of Chinese dramas Chae Won Bin, Kang Hoon and more confirmed for new historical K-drama News",
    "category": "casting",
    "author": "Rina Baek",
    "source": "mydramalist.com",
    "sourceUrl": "https://mydramalist.com/794566-positively-yours/cast",
    "date": "13 hours ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/640px-Flag_of_South_Korea.svg.png",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781786850654-1",
    "slug": "kim-ji-won-is-a-south-korean-actress-she-entered-the",
    "title": "Kim Ji Won is a South Korean actress. She entered the ...",
    "summary": "Kim Ji Won is a South Korean actress. She entered the entertainment industry in 2010 through commercials, earning recognition as the “Oran C Girl” and ...",
    "category": "trending",
    "author": "Ji Yeon Park",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZmyD9VypI6/",
    "date": "3 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/K-pop_Music_Fest_2013_in_Sydney_%2810236993453%29.jpg/640px-K-pop_Music_Fest_2013_in_Sydney_%2810236993453%29.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781786852962-2",
    "slug": "do-celebrities-get-special-treatment-public-outrage-over",
    "title": "\"Do celebrities get special treatment?\"… Public outrage over ...",
    "summary": "[앵커] 그룹 아이브의 멤버 장원영 씨가 마스크를 살짝 내리며 공항 신분 확인 절차에 응한 영상이 연예인 특혜로 논란이 번졌습니다. 한국공항공사는 앞으로 여객 ...",
    "category": "trending",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=rIvm9b20eso",
    "date": "1 day ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Seoul_Skyline_%28cropped%29.jpg/640px-Seoul_Skyline_%28cropped%29.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781786855318-3",
    "slug": "seoyeon-doing-whatever-it-takes-to-win-rtriples",
    "title": "Seoyeon doing whatever it takes to win : r/triples",
    "summary": "Shades of the infamous Mina Sue-Seungil-Sunghun attempt at this game from Singles Inferno 5 (NSFWish for beachwear). Everyone is having a good time except ...",
    "category": "trending",
    "author": "Dana Kim",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/triples/comments/1u46od8/seoyeon_doing_whatever_it_takes_to_win/",
    "date": "5 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Korean_Drama_-_My_Love_from_the_Star_poster.jpg/427px-Korean_Drama_-_My_Love_from_the_Star_poster.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781786857536-4",
    "slug": "david-beckham-gets-hollywood-walk-of-fame-star-tom",
    "title": "David Beckham gets Hollywood Walk of Fame star; Tom ...",
    "summary": "David Beckham gets Hollywood Walk of Fame star; Tom Cruise's tribute leaves fans emotional. TOI.in / Jun 13, 2026, 02:28PM IST.",
    "category": "trending",
    "author": "Hana Cho",
    "source": "timesofindia.indiatimes.com",
    "sourceUrl": "https://timesofindia.indiatimes.com/videos/etimes/bollywood/david-beckham-gets-hollywood-walk-of-fame-star-tom-cruises-tribute-leaves-fans-emotional/videoshow/131700973.cms",
    "date": "5 days ago",
    "image": "https://static.toiimg.com/thumb/msid-131700973,width-1280,height-720,imgsize-28964,resizemode-6,overlay-toi_sw,pt-32,y_pad-600/photo.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781786859993-5",
    "slug": "never-seen-this-man-so-happy-kevinlove-lilkev-kevin",
    "title": "Never seen this man so happy 😂😂 #kevinlove #lilkev @Kevin ...",
    "summary": "Kevin Crawford's song 'Love You're So Beautiful' is an emotional celebration of beauty and admiration. The lyrics express a deep longing and appreciation, with ...",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@richardajefferson/video/7652401749008944415",
    "date": "20 hours ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Lotte_World_Tower_and_Mall_from_the_Seokchon_Lake_%2820190717%29.jpg/640px-Lotte_World_Tower_and_Mall_from_the_Seokchon_Lake_%2820190717%29.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781786862218-6",
    "slug": "pov-they-judge-you-because-they-could-never-there-are",
    "title": "POV: they judge you because they could never 💅🏼 There are ...",
    "summary": "POV: they judge you because they could never There are still good people out there @KATSEYE @ILLIT @LE SSERAFIM #trending #katseye #illit #lesserafim.",
    "category": "trending",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@paco_rayane/video/7651261591056354592",
    "date": "3 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/640px-Flag_of_South_Korea.svg.png",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781785349265-1",
    "slug": "the-anomalies-in-kbiz-wherein-these-2-korean-stars-who",
    "title": "The Anomalies in Kbiz, wherein these 2 KOREAN STARS who ...",
    "summary": "One Bin is considered as one of the most selective actors in the Korean entertainment industry. His last movie was actually from 2010 and this was also his last ...",
    "category": "trending",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/chingunatics/videos/the-anomalies-in-kbiz-wherein-these-2-korean-stars-who-never-take-new-works-yet-/2026230604650414/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "auto",
      "live",
      "trending"
    ],
    "hot": true
  },
  {
    "id": "live-1781785352128-2",
    "slug": "the-famous-south-korean-actors-facebook",
    "title": "The famous South Korean Actors - Facebook",
    "summary": "Kim Soo-hyun Acclaimed for his roles in 'My Love from the Star,' 'Moon Embracing the Sun,' and 'It's Okay to Not Be Okay.' 9. Lee Joon-gi Known for 'Moon Lovers ...",
    "category": "trending",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/bird.han.488458/posts/the-famous-south-korean-actors-/1039038132104908/",
    "date": "11 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "auto",
      "live",
      "trending"
    ],
    "hot": true
  },
  {
    "id": "live-1781785355092-3",
    "slug": "korean-pop-star-jeon-somi-tells-daniel-dae-kim-how-she-turned",
    "title": "Korean pop star Jeon Somi tells Daniel Dae Kim how she turned ...",
    "summary": "Korean pop star Jeon Somi tells Daniel Dae Kim how she turned being bullied as a teenager into a strength. K-Everything streams in the U.S. on the CNN app ...",
    "category": "trending",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZs4jDBjfhv/",
    "date": "15 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "auto",
      "live",
      "trending"
    ],
    "hot": true
  },
  {
    "id": "live-1781785357752-4",
    "slug": "congratulations-to-the-family-four-years-after-their",
    "title": "CONGRATULATIONS TO THE FAMILY Four years after their ...",
    "summary": "Four years after their wedding, actor Namkoong Min and Jin Ah Reum are expanding their family. According to an official statement from 935 Entertainment on June ...",
    "category": "trending",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZtqWaiPiWZ/",
    "date": "8 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "auto",
      "live",
      "trending"
    ],
    "hot": false
  },
  {
    "id": "live-1781785359864-5",
    "slug": "7-famous-korean-stars-whose-career-was-saved",
    "title": "7 FAMOUS KOREAN STARS WHOSE CAREER WAS SAVED ...",
    "summary": "#SonYeJin - a renowned south korean actress known for her roles in dramas like, \" Personal Taste\", \"A moment to remember\", \"Something in the rain\", and Crash ...",
    "category": "trending",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/chingunatics/posts/7-famous-korean-stars-whose-career-was-saved-because-of-this-role-koreanstars-fb/1038503075620805/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "auto",
      "live",
      "trending"
    ],
    "hot": false
  },
  {
    "id": "live-1781785363605-6",
    "slug": "the-5-most-respected-celebrities-in-korea-fame-is-one-instagram",
    "title": "The 5 Most Respected Celebrities in Korea Fame is one ... - Instagram",
    "summary": "One of Korea's biggest solo artists and actresses, admired for her talent and frequent donations. Third, Faker. The legendary mid-laner of T1. A six-time world ...",
    "category": "trending",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZmxPFRgeNv/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "auto",
      "live",
      "trending"
    ],
    "hot": false
  },
  {
    "id": "live-1781785213863-1",
    "slug": "soompi-latest-k-pop-k-drama-korean-entertainment-news-2024",
    "title": "Soompi: Latest K-Pop, K-Drama, Korean Entertainment News (2024)",
    "summary": "Uncover breaking K-pop news, BTS updates, exclusive Korean celebrity ... 'My Royal Nemesis' Actress Hong Yi Seol Denies Dating Rumors With Heo Nam Jun.",
    "category": "gossip",
    "source": "soompi.com",
    "sourceUrl": "https://www.soompi.com/",
    "date": "5 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "auto",
      "live",
      "gossip"
    ],
    "hot": true
  },
  {
    "id": "live-1781785216717-2",
    "slug": "modelactress-hong-yiseol-who-played-heo-namjuns-secretary-in",
    "title": "Model‑actress Hong Yi‑seol, who played Heo Nam‑jun's secretary in ...",
    "summary": "Hong Yi‑seol emphasized that both the dating claims and drama‑related gossip currently spreading online are false, asking fans to stop fueling baseless stories.",
    "category": "gossip",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/kdramaloveph/posts/modelactress-hong-yiseol-who-played-heo-namjuns-secretary-in-my-royal-nemesis-ha/975600218574308/",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "auto",
      "live",
      "gossip"
    ],
    "hot": true
  },
  {
    "id": "live-1781785218883-3",
    "slug": "weekly-headlines-top-5-bts-v-breaks-silence-jangkeunsuk",
    "title": "Weekly Headlines Top 5: #BTS V breaks silence, #JangKeunSuk ...",
    "summary": "'The Glory' star Cha Joo Young is facing criticism after sharing social media posts that appeared to show her riding in the back seat of a moving vehicle ...",
    "category": "gossip",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZhByX5lOtv/",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "auto",
      "live",
      "gossip"
    ],
    "hot": true
  },
  {
    "id": "live-1781785221091-4",
    "slug": "kim-soo-hyuns-comeback-is-closer-than-ever-public-sentiment-has",
    "title": "Kim Soo-hyun's comeback is closer than ever. Public sentiment has ...",
    "summary": "Kim Soo-hyun's comeback is closer than ever. Public sentiment has shifted significantly following Kim Se-ui's arrest and the ongoing investigations into...",
    "category": "gossip",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KimSooHyunShiPhilippines/posts/kim-soo-hyuns-comeback-is-closer-than-everpublic-sentiment-has-shifted-significa/1609851490805107/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "auto",
      "live",
      "gossip"
    ],
    "hot": false
  },
  {
    "id": "live-1781785223014-5",
    "slug": "prosecution-seeks-3-year-prison-sentence-for-investigator-who",
    "title": "Prosecution seeks 3-year prison sentence for investigator who ...",
    "summary": "'A' was indicted for allegedly passing internal police investigative information regarding drug-related suspicions involving Lee Sun Kyun to a local newspaper ...",
    "category": "gossip",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kdramas/comments/1u4ngxx/prosecution_seeks_3year_prison_sentence_for/",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "auto",
      "live",
      "gossip"
    ],
    "hot": false
  },
  {
    "id": "live-1781785225149-6",
    "slug": "mokshiri-instagram",
    "title": "mok.shiri - Instagram",
    "summary": "Actor Kim Soo-hyun has been officially cleared of all allegations claiming he dated late actress Kim Sae-ron while she was a minor, following a comprehensive ...",
    "category": "gossip",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZmNVQ9ANfF/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "auto",
      "live",
      "gossip"
    ],
    "hot": false
  },
  {
    "id": "n1",
    "title": "Kim Soo-hyun Returns to Work with Fashion Brand Tie-Up After Dating Controversy",
    "summary": "South Korean star Kim Soo-hyun is officially resuming activities, signing a new deal with a global fashion house after months out of the spotlight. The move comes after police concluded their investigation into rumors linking him to the late actress Kim Sae-ron, finding that a YouTuber had used AI to fabricate the damaging evidence. Industry watchers say the comeback marks one of the fastest scandal recoveries in recent K-entertainment history.",
    "category": "gossip",
    "source": "The Straits Times",
    "sourceUrl": "https://www.straitstimes.com/life/entertainment/s-korean-star-kim-soo-hyun-returns-to-work-with-fashion-brand-tie-up-aft",
    "date": "2026-06-09",
    "image": "https://static1.straitstimes.com.sg/s3fs-public/articles/2025/06/05/ST-bg.jpg",
    "tags": [
      "Kim Soo-hyun",
      "comeback",
      "fashion",
      "scandal"
    ],
    "hot": true
  },
  {
    "id": "n2",
    "title": "AI Was Used to Fake Evidence That Nearly Ended Kim Soo-hyun's Career, Say Police",
    "summary": "South Korean police are seeking an arrest warrant for a YouTuber who allegedly fabricated evidence to defame actor Kim Soo-hyun. Investigators confirmed that the recordings and chat logs used to accuse the star of dating the late actress Kim Sae-ron while she was a minor were generated or altered using AI tools. The case is now being cited as a landmark for AI-driven celebrity defamation.",
    "category": "gossip",
    "source": "BBC News",
    "sourceUrl": "https://www.bbc.com/news/articles/c0r2j18k2vxo",
    "date": "2026-06-05",
    "image": "https://ichef.bbci.co.uk/news/1024/branded_news/e6ec/live/37559f30-55f6-11f1-89a3-d1f559421220.jpg",
    "tags": [
      "Kim Soo-hyun",
      "AI",
      "defamation",
      "police"
    ],
    "hot": true
  },
  {
    "id": "n3",
    "title": "Kim Soo-hyun Civil Lawsuit Resumes as 10 Billion Won Claims Return to Court",
    "summary": "A civil damages suit seeking 10 billion won against actor Kim Soo-hyun resumed in a Seoul court this week, according to a Star News report dated June 5. The plaintiff alleges breach of contract tied to endorsements paused during the scandal. Legal experts expect the case to set precedent for how brands handle talent contracts during public controversies.",
    "category": "gossip",
    "source": "Star News (via Instagram)",
    "sourceUrl": "https://www.instagram.com/reel/DZdqInYz5UN",
    "date": "2026-06-12",
    "image": "https://sfile.chatglm.cn/images-ppt/fd4c601b5fe6.jpg",
    "tags": [
      "Kim Soo-hyun",
      "lawsuit",
      "court",
      "endorsement"
    ]
  },
  {
    "id": "n4",
    "title": "'My Royal Nemesis' Actress Hong Yi-seol Denies Dating Rumors With Heo Nam-jun",
    "summary": "Rising star Hong Yi-seol has firmly denied dating rumors involving co-star Heo Nam-jun, calling the speculation 'a misunderstanding between close colleagues.' The duo, who play adversaries-turned-lovers in tvN's hit period drama 'My Royal Nemesis,' have been the subject of intense fan speculation after behind-the-scenes photos leaked online.",
    "category": "trending",
    "source": "Soompi",
    "sourceUrl": "https://www.soompi.com",
    "date": "2026-06-15",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "Hong Yi-seol",
      "Heo Nam-jun",
      "My Royal Nemesis",
      "dating rumor"
    ],
    "hot": true
  },
  {
    "id": "n5",
    "title": "June 2026 K-Drama Lineup: Netflix, Disney+, and Prime Video Offer Diverse Premieres",
    "summary": "Forbes reports that June 2026 brings a quieter but varied slate of new K-drama premieres across the three major streamers. Highlights include 'Doctor On The Edge' (ENA/Disney+, June 1), 'Teach You A Lesson' (Netflix, June 5), 'Agent Kim Reactivated' (SBS/Netflix, June 27), and 'See You At Work Tomorrow!' The diversity spans medical thriller, rom-com, action, and workplace drama.",
    "category": "upcoming",
    "source": "Forbes",
    "sourceUrl": "https://www.forbes.com/sites/hannahabraham/2026/06/04/7-kdramas-to-watch-in-june-2026-netflix-disney-plus-and-prime-vide",
    "date": "2026-06-04",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "June 2026",
      "Netflix",
      "Disney+",
      "Prime Video",
      "lineup"
    ],
    "hot": true
  },
  {
    "id": "n6",
    "title": "Delusion — Suzy & Kim Seon-ho Lead 2026's Most-Anticipated Fantasy Mystery",
    "summary": "Set in 1930s Korea, 'Delusion' follows painter Yun I-ho (Kim Seon-ho) who is commissioned to paint the portrait of a mysterious woman (Suzy) — only to discover she may not be human. The series is adapted from a popular Naver webtoon and is being positioned as one of the most-anticipated K-dramas of 2026 by international fan communities.",
    "category": "upcoming",
    "source": "Facebook (Hyeong2023)",
    "sourceUrl": "https://www.facebook.com/hyeong2023.kd/posts/the-wait-is-finally-over-presenting-the-much-awaited-2026-k-drama-lineup-/8",
    "date": "2026-05-28",
    "image": "https://sfile.chatglm.cn/images-ppt/9753f73fb4bf.jpeg",
    "tags": [
      "Suzy",
      "Kim Seon-ho",
      "Delusion",
      "fantasy",
      "mystery"
    ],
    "hot": true
  },
  {
    "id": "n7",
    "title": "Perfect Crown — IU & Byeon Woo-seok to Star in Disney+ Modern-Monarchy Romance",
    "summary": "Disney+ has confirmed 'Perfect Crown' for a March 2026 premiere, starring IU and Byeon Woo-seok alongside Gong Seung-yeon. Set in a modern Korea under a constitutional monarchy, the series follows a chaebol heiress and a crown prince whose public rivalry masks a deeper connection. Production is helmed by the team behind 'Queen of Tears.'",
    "category": "casting",
    "source": "IMDb",
    "sourceUrl": "https://www.imdb.com/title/tt39333617",
    "date": "2026-03-15",
    "image": "https://sfile.chatglm.cn/images-ppt/872e9713158b.jpeg",
    "tags": [
      "IU",
      "Byeon Woo-seok",
      "Perfect Crown",
      "Disney+",
      "romance"
    ],
    "hot": true
  },
  {
    "id": "n8",
    "title": "Disney+ Unveils 2026 K-Drama Slate — A Shop for Killers S2, Battle of the Fates, Bloody Flower",
    "summary": "Disney+ Singapore has officially revealed its 2026 Korean slate: 'A Shop for Killers Season 2,' 'Battle of the Fates,' 'Bloody Flower' (Ryeoun & Keum Sae-rok), 'In Your Radiant Season' (Lee Sung-kyung & Chae Jong-hyeop), and 'Portraits of Delusion.' The lineup signals Disney+'s continued heavy investment in K-content for APAC audiences.",
    "category": "upcoming",
    "source": "Disney+ Singapore",
    "sourceUrl": "https://www.disneyplus.com/en-sg/explore/articles/disney-plus-announces-new-korean-series-slate-for-2026",
    "date": "2026-02-20",
    "image": "https://sfile.chatglm.cn/images-ppt/6f7c0678c6c8.jpg",
    "tags": [
      "Disney+",
      "2026 slate",
      "A Shop for Killers",
      "Bloody Flower"
    ]
  },
  {
    "id": "n9",
    "title": "Netflix 2026 K-Drama Lineup: The Art of Sarah, All of Us Are Dead S2, Yumi's Cells Return",
    "summary": "Netflix has teased a packed 2026 K-drama slate including 'The Art of Sarah' (Feb 13, starring Shin Hye-sun as a luxury-brand regional CEO), a long-awaited return of 'All of Us Are Dead,' new seasons of 'Yumi's Cells,' and 'A Shop for Queen.' The Reddit KDRAMA community response has been overwhelmingly positive.",
    "category": "upcoming",
    "source": "Reddit r/KDRAMA",
    "sourceUrl": "https://www.reddit.com/r/KDRAMA/comments/1qii687/netflix_2026_drama_lineup_teaser",
    "date": "2026-01-30",
    "image": "https://sfile.chatglm.cn/images-ppt/e0889b4a1796.jpg",
    "tags": [
      "Netflix",
      "2026 slate",
      "All of Us Are Dead",
      "Yumi's Cells"
    ]
  },
  {
    "id": "n10",
    "title": "Korean-American Actor Greta Lee Joins 'Toy Story 5' as Villain",
    "summary": "Korean-American actor Greta Lee, celebrated for her turns in 'Past Lives' and 'The Morning Show,' has been cast as the antagonist in Pixar's upcoming 'Toy Story 5.' Lee reflected on the role in an SBS Star interview, calling it 'a surreal full-circle moment' after growing up watching the franchise. The casting is being hailed as a milestone for Asian representation in Hollywood animation.",
    "category": "trending",
    "source": "SBS Star",
    "sourceUrl": "https://sbsstar.net",
    "date": "2026-06-10",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "Greta Lee",
      "Toy Story 5",
      "Pixar",
      "Hollywood"
    ]
  },
  {
    "id": "n11",
    "title": "Rare Bae Yong-joon Sighting Revives Interest in Korea's Most Reclusive Celebrity",
    "summary": "A rare public appearance by 'Winter Sonata' legend Bae Yong-joon has reignited fascination with the reclusive star. Photos shared on social media show the actor at a private art event in Seoul. The Korea Times notes that Bae has largely stayed out of the spotlight since pivoting to business ventures nearly a decade ago.",
    "category": "trending",
    "source": "The Korea Times",
    "sourceUrl": "https://www.koreatimes.co.kr/entertainment",
    "date": "2026-06-13",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "Bae Yong-joon",
      "Winter Sonata",
      "rare sighting"
    ]
  },
  {
    "id": "n12",
    "title": "5 of the Best New K-Dramas to Watch in June 2026 — Doctor on the Edge, Teach You a Lesson & More",
    "summary": "SCMP's critics pick the five standout new K-dramas of June 2026: 'Doctor on the Edge' (medical thriller), 'Teach You a Lesson' (Netflix dark comedy), 'See You at Work Tomorrow!' (workplace slice-of-life), 'Agent Kim Reactivated' (action comedy), and 'Notes from the Last Row' (coming-of-age). Each is rated on story, cast chemistry, and bingeability.",
    "category": "upcoming",
    "source": "South China Morning Post",
    "sourceUrl": "https://www.scmp.com/lifestyle/k-drama/k-drama/article/3355164/5-best-new-k-dramas-watch-june-2026-including-see-you-wor",
    "date": "2026-06-01",
    "image": "https://sfile.chatglm.cn/images-ppt/634893b016ce.jpg",
    "tags": [
      "June 2026",
      "best K-dramas",
      "SCMP",
      "picks"
    ]
  },
  {
    "id": "n13",
    "title": "Climax, Reverse, Goldland — Anticipated K-Dramas Set for Q1–Q2 2026 Premiere",
    "summary": "According to fan tracker NoSleep4Dramas, the most-anticipated early 2026 premieres include 'Climax' (March 16, Ju Ji-hoon), 'Reverse' (March, Seo Ji-hye), 'Goldland' (April, Park Bo-young, Hulu/Disney+), and 'Scarecrow.' The list reflects strong demand across thriller, melodrama, and fantasy genres.",
    "category": "upcoming",
    "source": "NoSleep4Dramas",
    "sourceUrl": "https://nosleep4dramas.com/2026/01/28/anticipated-kdramas-of-2026",
    "date": "2026-01-28",
    "image": "https://i0.wp.com/nosleep4dramas.com/wp-content/uploads/2026/05/7a553b_d9ebce015721498d8a16004a93fe2d1amv2-1.jpg?fit=828%2C1172&#038;ssl=1",
    "tags": [
      "Climax",
      "Reverse",
      "Goldland",
      "Ju Ji-hoon",
      "Park Bo-young"
    ]
  },
  {
    "id": "n14",
    "title": "TIME Magazine Names Most Anticipated K-Dramas of 2026 — Including All of Us Are Dead Return",
    "summary": "TIME Magazine's annual preview spotlights 2026's most anticipated Korean dramas, including the long-awaited return of Netflix's youth zombie hit 'All of Us Are Dead,' new seasons of 'Yumi's Cells' and 'A Shop for Killers,' and the period epic 'Siren's Kiss.' The feature credits global streamers for sustaining K-content's international momentum.",
    "category": "upcoming",
    "source": "TIME",
    "sourceUrl": "https://time.com/7345886/korean-dramas-2026",
    "date": "2026-02-10",
    "image": "https://static.time.com/v3/assets/bltea6093859af6183b/blt4d3390e85e9c469b/6998ccda66d4e3adeacbd29e/kdrama-2026.jpg?branch=production&width=3840&quality=75&auto=webp&crop=16:9",
    "tags": [
      "TIME",
      "2026 preview",
      "All of Us Are Dead",
      "Siren's Kiss"
    ]
  },
  {
    "id": "n15",
    "title": "K-Drama Actress Reveals Being Hit On By Three Celebrities At The Same Time",
    "summary": "In a candid variety show appearance, a popular K-drama actress revealed she was simultaneously pursued by three male celebrities — without any of them knowing about each other. Koreaboo reports the actress kept identities anonymous but hinted 'two are A-listers and one is a current co-star.' The clip has gone viral across Asian social media.",
    "category": "gossip",
    "source": "Koreaboo",
    "sourceUrl": "https://www.koreaboo.com",
    "date": "2026-06-14",
    "image": "https://sfile.chatglm.cn/images-ppt/3c6e73d2afc8.jpg",
    "tags": [
      "variety show",
      "dating rumor",
      "anonymous",
      "viral"
    ]
  },
  {
    "id": "n16",
    "title": "35-Year-Old Actor 'Clowned' Online After Surprise Reveal on Dating Show",
    "summary": "A 35-year-old K-actor was the subject of intense online discussion after a surprise reveal on a popular Korean dating show. Allkpop reports that fans were divided — some calling the appearance 'refreshingly honest,' others 'career self-sabotage.' The episode trended #1 on Korean Twitter for over 12 hours.",
    "category": "gossip",
    "source": "allkpop",
    "sourceUrl": "https://www.allkpop.com",
    "date": "2026-06-11",
    "image": "https://sfile.chatglm.cn/images-ppt/ed0f3015934b.jpg",
    "tags": [
      "dating show",
      "viral",
      "Twitter"
    ]
  },
  {
    "id": "n17",
    "title": "Kim Soo-hyun Reigns Supreme — Voted Korean Celebrity of the Year 2025",
    "summary": "Despite months out of the spotlight, Kim Soo-hyun was voted 'Korean Celebrity of the Year 2025' in a fan poll aggregating votes from 18 countries. The actor's 'Queen of Tears' performance and resilient comeback narrative were cited as key factors. The award was presented at a private ceremony in Seoul.",
    "category": "trending",
    "source": "Instagram (kdramaworld)",
    "sourceUrl": "https://www.instagram.com/popular/korean-celebrities-news-today",
    "date": "2026-01-15",
    "image": "https://sfile.chatglm.cn/images-ppt/5eb965d0a16d.jpg",
    "tags": [
      "Kim Soo-hyun",
      "award",
      "Celebrity of the Year",
      "Queen of Tears"
    ]
  },
  {
    "id": "n18",
    "title": "If Wishes Could Kill, Filing for Love, Gold Land — Wikipedia Logs Spring 2026 K-Drama Pipeline",
    "summary": "Wikipedia's 2026 South Korean television tracker logs an active spring pipeline: 'If Wishes Could Kill' (Netflix, April 24), 'Filing for Love' (tvN, April 25), 'Gold Land' (Hulu/Disney+, April 29), and 'My Royal Nemesis' (tvN, ongoing). The tracker is updated daily by community editors and serves as a reference for international fans.",
    "category": "upcoming",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/2026_in_South_Korean_television",
    "date": "2026-04-29",
    "image": "https://sfile.chatglm.cn/images-ppt/6f7c0678c6c8.jpg",
    "tags": [
      "Wikipedia",
      "spring 2026",
      "If Wishes Could Kill",
      "Gold Land"
    ]
  }
];

// ---------------------------------------------------------------------------
// TRENDING ACTORS / ACTRESSES
// ---------------------------------------------------------------------------
export const ACTORS: ActorProfile[] = [
  {
    id: "a1",
    name: "Kim Soo-hyun",
    role: "Actor",
    blurb:
      "Star of 'Queen of Tears' and 'It's Okay to Not Be Okay.' Made headlines in 2026 with a fast-tracked comeback after AI-fabricated defamation was exposed.",
    image: IMG.kimsoohyun,
    tags: ["comeback", "Queen of Tears", "fashion ambassador"],
    followers: "21.4M",
  },
  {
    id: "a2",
    name: "Suzy (Bae Su-ji)",
    role: "Actress & Singer",
    blurb:
      "Lead of 2026's most-anticipated fantasy mystery 'Delusion' opposite Kim Seon-ho. Former miss A member, now a top-tier actress and CF queen.",
    image: IMG.suzy,
    tags: ["Delusion", "miss A", "CF queen"],
    followers: "23.1M",
  },
  {
    id: "a3",
    name: "IU (Lee Ji-eun)",
    role: "Actress & Singer",
    blurb:
      "Set to star in Disney+'s 'Perfect Crown' alongside Byeon Woo-seok. Continues to balance K-pop superstardom with a critically acclaimed acting career.",
    image: IMG.actress,
    tags: ["Perfect Crown", "Disney+", "singer-actor"],
    followers: "33.7M",
  },
  {
    id: "a4",
    name: "Byeon Woo-seok",
    role: "Actor",
    blurb:
      "Breakout star of 'Lovely Runner' now headlining 'Perfect Crown.' One of the most sought-after leading men of 2026 with multiple endorsement deals.",
    image: IMG.actor,
    tags: ["Perfect Crown", "Lovely Runner", "leading man"],
    followers: "12.8M",
  },
  {
    id: "a5",
    name: "Kim Seon-ho",
    role: "Actor",
    blurb:
      "Returning to primetime with 'Delusion' opposite Suzy. The 'Hometown Cha-Cha-Cha' star has steadily rebuilt his career after a 2021 controversy.",
    image: IMG.actor2,
    tags: ["Delusion", "Hometown Cha-Cha-Cha", "comeback"],
    followers: "11.2M",
  },
  {
    id: "a6",
    name: "Hong Yi-seol",
    role: "Rising Actress",
    blurb:
      "Breakout star of tvN's 'My Royal Nemesis.' Recently denied dating rumors with co-star Heo Nam-jun, calling them 'a misunderstanding between close colleagues.'",
    image: IMG.actress2,
    tags: ["My Royal Nemesis", "rising star", "tvN"],
    followers: "3.4M",
  },
  {
    id: "a7",
    name: "Ju Ji-hoon",
    role: "Actor",
    blurb:
      "Veteran lead of 'Climax' (March 2026) and 'The Judge Returns.' Known for 'Kingdom,' 'Along with the Gods,' and a string of box-office hits.",
    image: IMG.actor3,
    tags: ["Climax", "Kingdom", "veteran"],
    followers: "8.9M",
  },
  {
    id: "a8",
    name: "Park Bo-young",
    role: "Actress",
    blurb:
      "Headlining 'Goldland' (April 2026, Disney+/Hulu). The 'Strong Woman Do Bong Soon' star remains one of Korea's most bankable rom-com leads.",
    image: IMG.actress3,
    tags: ["Goldland", "Strong Woman", "Disney+"],
    followers: "14.5M",
  },
];

// ---------------------------------------------------------------------------
// UPCOMING SERIES 2026 (curated calendar)
// ---------------------------------------------------------------------------
export const UPCOMING_SERIES: UpcomingSeries[] = [
  {
    id: "s1",
    title: "Doctor on the Edge",
    premiere: "June 1, 2026",
    platform: "ENA / Disney+",
    genre: "Medical Thriller",
    cast: "TBA",
    image: IMG.kdrama,
    hype: 8,
  },
  {
    id: "s2",
    title: "Teach You a Lesson",
    premiere: "June 5, 2026",
    platform: "Netflix",
    genre: "Dark Comedy",
    cast: "TBA",
    image: IMG.kdrama2,
    hype: 7,
  },
  {
    id: "s3",
    title: "Agent Kim Reactivated",
    premiere: "June 27, 2026",
    platform: "SBS / Netflix",
    genre: "Action Comedy",
    cast: "TBA",
    image: IMG.kdrama3,
    hype: 8,
  },
  {
    id: "s4",
    title: "See You at Work Tomorrow!",
    premiere: "June 2026",
    platform: "tvN",
    genre: "Workplace Slice-of-Life",
    cast: "TBA",
    image: IMG.couple,
    hype: 6,
  },
  {
    id: "s5",
    title: "Delusion",
    premiere: "2H 2026",
    platform: "TBA (likely Netflix)",
    genre: "Fantasy Mystery",
    cast: "Suzy, Kim Seon-ho",
    image: IMG.suzy,
    hype: 10,
  },
  {
    id: "s6",
    title: "Perfect Crown",
    premiere: "March 2026",
    platform: "Disney+",
    genre: "Modern-Monarchy Romance",
    cast: "IU, Byeon Woo-seok, Gong Seung-yeon",
    image: IMG.couple2,
    hype: 10,
  },
  {
    id: "s7",
    title: "Climax",
    premiere: "March 16, 2026",
    platform: "TBA",
    genre: "Thriller",
    cast: "Ju Ji-hoon",
    image: IMG.kdrama,
    hype: 8,
  },
  {
    id: "s8",
    title: "Goldland",
    premiere: "April 29, 2026",
    platform: "Hulu / Disney+",
    genre: "Drama",
    cast: "Park Bo-young",
    image: IMG.actress3,
    hype: 8,
  },
  {
    id: "s9",
    title: "A Shop for Killers S2",
    premiere: "2H 2026",
    platform: "Disney+",
    genre: "Action Thriller",
    cast: "Lee Dong-wook, Kim Hye-jun",
    image: IMG.kdrama3,
    hype: 9,
  },
  {
    id: "s10",
    title: "The Art of Sarah",
    premiere: "February 13, 2026",
    platform: "Netflix",
    genre: "Drama",
    cast: "Shin Hye-sun",
    image: IMG.actress,
    hype: 7,
  },
  {
    id: "s11",
    title: "All of Us Are Dead S2",
    premiere: "2026",
    platform: "Netflix",
    genre: "Zombie Horror",
    cast: "Ensemble",
    image: IMG.kpop,
    hype: 9,
  },
  {
    id: "s12",
    title: "Bloody Flower",
    premiere: "2026",
    platform: "Disney+",
    genre: "Period Drama",
    cast: "Ryeoun, Keum Sae-rok",
    image: IMG.actress2,
    hype: 7,
  },
];

// ---------------------------------------------------------------------------
// HERO FEATURE  (top story for hero carousel)
// ---------------------------------------------------------------------------
export const HERO_FEATURES = [
  {
    id: "h1",
    kicker: "Scandal & Comeback",
    title: "Kim Soo-hyun Returns as AI-Fabricated Evidence Exposed",
    body: "Police confirmed the recordings used to defame the 'Queen of Tears' star were AI-generated. The actor resumes activities with a new fashion brand tie-up.",
    image: IMG.kimsoohyun,
    link: "n1",
  },
  {
    id: "h2",
    kicker: "Most-Anticipated 2026",
    title: "Suzy & Kim Seon-ho Lead 'Delusion' — A 1930s Fantasy Mystery",
    body: "Adapted from a hit Naver webtoon, 'Delusion' is being positioned as one of the most-anticipated K-dramas of 2026 by international fan communities.",
    image: IMG.suzy,
    link: "n6",
  },
  {
    id: "h3",
    kicker: "Casting News",
    title: "IU & Byeon Woo-seok to Star in Disney+ 'Perfect Crown'",
    body: "A modern Korea under constitutional monarchy — a chaebol heiress and a crown prince whose public rivalry masks a deeper connection.",
    image: IMG.couple2,
    link: "n7",
  },
];

export const LAST_UPDATED = "2026-06-18T14:50:43.282Z";

// ---------------------------------------------------------------------------
// AUTO-GENERATED ARTICLE BODIES
// (generated by /home/z/my-project/scripts/generate-articles.mjs using z-ai LLM)
// Re-run the script to regenerate or add new articles.
// ---------------------------------------------------------------------------

// Merge auto-generated bodies into the NEWS array at module load.
// This keeps the curated NEWS array compact while letting each article render
// a full in-page body — readers stay on our site, original source is cited
// at the end of every article (see ArticleView component).
NEWS.forEach((item) => {
  const entry = ARTICLE_BODIES[item.id];
  if (entry) {
    // Support both legacy string[] format and new { body, takeaways } format.
    if (Array.isArray(entry)) {
      // Legacy: convert string[] to BodyBlock[] of paragraphs only.
      item.body = entry.map((text) => ({ type: "p", text }));
    } else if (entry.body && entry.body.length > 0) {
      item.body = entry.body;
      if (entry.takeaways && entry.takeaways.length > 0) {
        item.takeaways = entry.takeaways;
      }
    }
  }
});

/**
 * Slugify a title into an SEO-friendly URL slug.
 * Examples:
 *   "Kim Soo-hyun Returns to Work!" → "kim-soo-hyun-returns-to-work"
 *   "Delusion — Suzy & Kim Seon-ho Lead" → "delusion-suzy-kim-seon-ho-lead"
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[''`]/g, "") // strip curly/straight apostrophes
    .replace(/&/g, "and") // & → and
    .replace(/[^a-z0-9\s-]/g, "") // remove other special chars
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-|-$/g, "") // trim leading/trailing hyphens
    .slice(0, 80); // cap length for clean URLs
}

// Auto-generate slugs for any item missing one (and ensure uniqueness).
function assignSlugs(items: NewsItem[]): void {
  const used = new Set<string>();
  for (const item of items) {
    if (item.slug && !used.has(item.slug)) {
      used.add(item.slug);
      continue;
    }
    let base = slugify(item.title) || `article-${item.id}`;
    let slug = base;
    let n = 2;
    while (used.has(slug)) {
      slug = `${base}-${n++}`;
    }
    item.slug = slug;
    used.add(slug);
  }
}
assignSlugs(NEWS);

// Helper: get a news item by ID (used by ArticleView + deep links)
export function getNewsById(id: string): NewsItem | undefined {
  return NEWS.find((n) => n.id === id);
}

// Helper: get a news item by slug (used by /article/[slug] route)
export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS.find((n) => n.slug === slug);
}

// Helper: get related news (same category first, then cross-category fallback
// to fill the requested limit). Used by ArticleView for the "More from..." grid.
export function getRelatedNews(item: NewsItem, limit = 6): NewsItem[] {
  const sameCategory = NEWS.filter(
    (n) => n.id !== item.id && n.category === item.category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  // Fall back to other categories to fill the remaining slots.
  // Prioritize items that share at least one tag, then by recency.
  const others = NEWS.filter(
    (n) => n.id !== item.id && n.category !== item.category
  );
  const withScore = others.map((n) => ({
    n,
    score: n.tags.filter((t) => item.tags.includes(t)).length,
  }));
  withScore.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.n.date < b.n.date ? 1 : -1;
  });
  const fillers = withScore.slice(0, limit - sameCategory.length).map((x) => x.n);
  return [...sameCategory, ...fillers];
}
