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
    "id": "live-1781890864642-1",
    "slug": "itzy-yuna-has-been-cast-as-the-female-lead-in-the-upcoming-netflix",
    "title": "ITZY Yuna has been cast as the female lead in the upcoming Netflix ...",
    "summary": "ITZY Yuna has been cast as the female lead in the upcoming Netflix Original K-Drama Do Not Cross The Wall. Also it's on Netflix too! Nam Joohyuk & Lee Yidam to ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kpop/comments/1u8apev/itzy_yuna_has_been_cast_as_the_female_lead_in_the/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781890866783-2",
    "slug": "kpopangel-k-pop-news-k-drama-updates-idol-comebacks",
    "title": "KpopAngel | K-Pop News, K-Drama Updates, Idol Comebacks ...",
    "summary": "KpopAngel is a global Korean entertainment platform covering K-Pop news, K-Drama updates, idol comebacks, BTS news, BLACKPINK news, editor-written stories, ...",
    "category": "trending",
    "author": "Soo Min Lee",
    "source": "kpopangel.com",
    "sourceUrl": "https://www.kpopangel.com/",
    "date": "6 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781890867946-3",
    "slug": "after-the-backlash-jtbc-the-korean-broadcaster-that-posted",
    "title": "After the backlash, JTBC, the Korean broadcaster that posted ...",
    "summary": "After the backlash, JTBC, the Korean broadcaster that posted the audio, clarified that the remarks were not from their own reporters, and were not noticed ...",
    "category": "trending",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZwXJw8MLGi/",
    "date": "12 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781890870992-4",
    "slug": "yu-jae-seok-asks-for-hyorisoo-collab-iconic-k-variety",
    "title": "Yu Jae Seok Asks for HYORISOO Collab: Iconic K-Variety ...",
    "summary": "Yu Jae Seok Asks for HYORISOO Collab: Iconic K-Variety Moment. The clip captures a standout K-variety moment: Yu Jae Seok asking for a HYORISOO collaboration.",
    "category": "trending",
    "author": "Hana Cho",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@kocowa.official/video/7652101070562331918",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781890873158-5",
    "slug": "latest-k-pop-news-k-drama-headlines-and-idol-comebacks",
    "title": "Latest K-Pop News, K-Drama Headlines & Idol Comebacks",
    "summary": "fresh K-pop headlines, BTS. Anitta and Rema team up. In Talks To Star. Actor Ha Jung Woo may star in the prequel film trilogy of “Inside Men”!On. Kang Mina ...",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "kpopangel.com",
    "sourceUrl": "https://www.kpopangel.com/news",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781890873232-6",
    "slug": "korea-shocked-when-raul-rangel-saved-goal-in-90th-minute",
    "title": "Korea Shocked When Raul Rangel Saved Goal in 90th Minute ...",
    "summary": "Korea Shocked When Raul Rangel Saved Goal in 90th Minute | Mexico vs South Korea Highlights, Fifa WC · Comments.",
    "category": "trending",
    "author": "Rina Baek",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=f2ZfuDHtj20",
    "date": "14 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781889900545-1",
    "slug": "entertainment-news-radarkpop",
    "title": "Entertainment News - Radarkpop",
    "summary": "Entertainment News. Korean Actor and YouTuber Caught Drink-Driving After Dine-and-Dash Report Sparks Fresh Concerns Over Celebrity Accountability.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "radarkpop.com",
    "sourceUrl": "https://www.radarkpop.com/tag/entertainment-news/",
    "date": "1 day ago",
    "image": "https://storage.ghost.io/c/00/56/005678f5-e650-4ea7-8a5b-5f70aca0f930/content/images/size/w1200/2026/06/publication-cover.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781889904004-2",
    "slug": "are-there-any-other-upcoming-kdramas-that-you-guys-are-excited-for",
    "title": "Are there any other upcoming kdramas that you guys are excited for ...",
    "summary": "June 2026 K-DRAMA WATCHLIST Doctor on the Edge (닥터 섬보이) Release Date: June 1 Genre: Medical, Romance Network: ENA / Genie Tv / Disney+ Teach You A ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZxcC91zaso/",
    "date": "2 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781889906405-3",
    "slug": "who-else-is-excited-for-nam-joo-hyuks-comeback-after-3-years",
    "title": "Who else is excited for Nam Joo-hyuk's comeback after 3 years ...",
    "summary": "Cho Seungwoo, Roh Yoonseo, and Nam Joohyuk's upcoming Horror drama \"The East Palace\" is scheduled for release on Netflix on July 17th.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kdramas/comments/1u4x3i9/who_else_is_excited_for_nam_joohyuks_comeback/",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781889907903-4",
    "slug": "south-korean-actresses-in-their-40s-dominate-the-global-facebook",
    "title": "South Korean actresses in their 40s dominate the global ... - Facebook",
    "summary": "Today, we present you with the list of the 10 most beautiful actresses in South Korea. 1. Park Shin Hye Park Shin Hye is considered one of Korea's most ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/bird.han.488458/posts/south-korean-actresses-in-their-40s-dominate-the-global-entertainment-industry-w/1040073518668036/",
    "date": "3 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781889909993-5",
    "slug": "photos-by-allkpop-allkpop-june-19-2026-instagram",
    "title": "Photos by allkpop (@allkpop) · June 19, 2026 - Instagram",
    "summary": "Today's K-pop updates. Girls' Generation's Sooyoung just broke up with her boyfriend Jung Kyung Ho after dating for 14 years. They apparently grew apart due to ...",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZw3XM2gQB6/",
    "date": "7 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781889913153-6",
    "slug": "top-10-korean-celebrities-who-are-not-fully-korean-or-have-mixed",
    "title": "Top 10 Korean Celebrities Who Are Not Fully Korean or Have Mixed ...",
    "summary": "Instead of letting those experiences hold her back, she turned them into a source of confidence Today, she is one of K-pop's most successful solo artist and a ...",
    "category": "trending",
    "author": "Rina Baek",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/100080146298347/videos/top-10-korean-celebrities-who-are-not-fully-korean-or-have-mixed-heritage-%EF%B8%8F/2847854512219873/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781889015798-1",
    "slug": "love-kim-soo-hyun-facebook",
    "title": "Love Kim Soo Hyun - Facebook",
    "summary": "Investigators concluded that the rumors raised against the actor completely lacked credibility, finding that AI voice manipulation and forged KakaoTalk chat ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/LoveSoohyunshii/posts/%F0%9D%97%9E%F0%9D%97%9C%F0%9D%97%A0-%F0%9D%97%A6%F0%9D%97%A2%F0%9D%97%A2%F0%9D%97%9B%F0%9D%97%AC%F0%9D%97%A8%F0%9D%97%A1-%F0%9D%97%9A%F0%9D%97%98%F0%9D%97%94%F0%9D%97%A5%F0%9D%97%A6-%F0%9D%97%A8%F0%9D%97%A3-%F0%9D%97%99%F0%9D%97%A2%F0%9D%97%A5-%F0%9D%97%96%F0%9D%97%A2%F0%9D%97%A0%F0%9D%97%98%F0%9D%97%95%F0%9D%97%94%F0%9D%97%96%F0%9D%97%9Eactor-kim-soo-hyun-is-preparing-to-return-to-th/1603558875106741/",
    "date": "7 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781889018583-2",
    "slug": "breaking-celebrity-news-entertainment-news-and-celeb",
    "title": "Breaking Celebrity News, Entertainment News and Celeb ...",
    "summary": "Get the latest news on celebrity scandals, engagements, and divorces! Check out our breaking stories on Hollywood's hottest stars!",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "eonline.com",
    "sourceUrl": "https://www.eonline.com/ca/news",
    "date": "3 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781889020121-3",
    "slug": "moon-ga-young-choi-woo-shik-and-heo-nam-jun-in-one-k-drama",
    "title": "Moon Ga Young, Choi Woo Shik and Heo Nam Jun in one K-Drama ...",
    "summary": "A star-studded cast is coming together for a brand-new romance drama! Choi Woo Shik, Mun Ka Young, Heo Nam Jun, Yoo Jae Myung, Kang Han Na, Kim Yeo Jin, ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZxAm6BOMBy/",
    "date": "6 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781889022598-4",
    "slug": "south-korean-actress-jin-ki-joo-is-gaining-renewed-online-attention",
    "title": "South Korean actress Jin Ki-joo is gaining renewed online attention ...",
    "summary": "South Korean actress Jin Ki-joo is gaining renewed online attention after an old farewell letter she wrote during her early office career resurfaced on social ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/ManilaBulletin/posts/south-korean-actress-jin-ki-joo-is-gaining-renewed-online-attention-after-an-old/1490185329816335/",
    "date": "21 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781889024994-5",
    "slug": "leaked-remarks-about-son-heung-mins-military-exemption",
    "title": "Leaked remarks about Son Heung-min's military exemption ...",
    "summary": "Korean media has a habit of treating their stars badly. 1d. 30. Hannah Trivass ... #celebrity #actress #actor #usa (91). Mar 15, 2026 · 105 views. See more.",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/NBCBayArea/videos/leaked-remarks-about-son-heung-mins-military-exemption-sparked-backlash-canceled/2199436910803312/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781889028793-6",
    "slug": "netflixs-teach-you-a-lesson-actress-jin-ki-joo-is-going",
    "title": "Netflix's Teach You a Lesson actress Jin Ki-joo is going ...",
    "summary": "Netflix's Teach You a Lesson actress Jin Ki-joo is going viral in Korea for an old goodbye letter from her office days. When she left her first job, ...",
    "category": "trending",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZpaQOaFKlV/",
    "date": "2026-06-19",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781888603512-1",
    "slug": "new-releases-on-disney-hulu-and-espn-in-june-2026",
    "title": "New Releases On Disney+, Hulu & ESPN In June 2026",
    "summary": "Doctor on the Edge, Disney+ & Hulu. This image is a teaser poster for the upcoming South Korean medical romance thriller drama \" Doctor on the Edge, Disney+ & ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "disneyplus.com",
    "sourceUrl": "https://www.disneyplus.com/explore/articles/new-to-disney-plus",
    "date": "2 days ago",
    "image": "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/4A8A2149432616128293AE7CAC7BBC4EF6A39239381188CA7B5BAD53DAAF7F6A/scale?format=webp&amp;width=1200",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781888605863-2",
    "slug": "best-korean-movie-to-watch-on-netflix-disney-viki-youtube",
    "title": "Best Korean Movie To Watch on Netflix, Disney+, Viki - YouTube",
    "summary": "Top 10 Best Crime Korean Dramas of 2026 | Best Korean Drama To Watch on Netflix, Disney+, Viki · ASMR Addictive Fast Tapping Collection For Deep Sleep & Anxiety ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=YR0fsA8CeBg",
    "date": "3 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781888608443-3",
    "slug": "k-celebs-who-cut-ties-with-their-parents-instagram",
    "title": "K-Celebs Who Cut Ties With Their Parents - Instagram",
    "summary": "She took singing, dancing, Japanese lessons, preparing for debut. But instead of becoming a K-pop star, she became one of the Korea's most successful actresses.",
    "category": "trending",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZvrSrBylMt/",
    "date": "17 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781888610620-4",
    "slug": "yoon-eun-hye-remains-active-in-the-entertainment-industry-as-a",
    "title": "Yoon Eun-hye remains active in the entertainment industry as a ...",
    "summary": "Yoon Eun-hye remains active in the entertainment industry as a singer, actress, and creator. Best known for her iconic roles in Princess Hours and Coffee Prince ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/AllKoreanCelebrities/posts/yoon-eun-hye-remains-active-in-the-entertainment-industry-as-a-singer-actress-an/1645440140915443/",
    "date": "20 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781888612478-5",
    "slug": "5-korean-stars-whi-change-their-lives-thanks-to-their",
    "title": "5 KOREAN STARS WHI CHANGE THEIR LIVES THANKS TO THEIR ...",
    "summary": "5 KOREAN STARS WHI CHANGE THEIR LIVES THANKS TO THEIR SUPPORTING ROLES IN POPULAR KDRAMA #koreanstars.",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/chingunatics/videos/5-korean-stars-whi-change-their-lives-thanks-to-their-supporting-roles-in-popula/993688916968440/",
    "date": "12 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781888615752-6",
    "slug": "trending-news-did-this-shock-you-instagram",
    "title": "TRENDING NEWS: did this shock you? - Instagram",
    "summary": "Kwon Eunbin Announces Retirement and Departure from the Entertainment Industry #kpop #kpopnews #clc #kwoneunbin #spillthektea · 1 day ago. Transcript.",
    "category": "trending",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZuwz59jmeN/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781806604926-1",
    "slug": "the-most-exciting-new-k-dramas-to-watch-in-2026-tatler-asia",
    "title": "The most exciting new K-dramas to watch in 2026 - Tatler Asia",
    "summary": "From romances like Can This Love Be Translated? to a fresh wave of modern K-dramas, 2026 is already promising a line-up that will entertain fans. Whether you ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "tatlerasia.com",
    "sourceUrl": "https://www.tatlerasia.com/lifestyle/entertainment/new-korean-dramas-to-watch",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781806606778-2",
    "slug": "8-korean-dramas-releasing-in-june-2026-where-to-watch-upcoming",
    "title": "8 Korean dramas releasing in June 2026 (+ Where to Watch) - #upcoming",
    "summary": "5d. Kdramas Night And Day. 󱢏. Agent Kim reactivated will now be available on Netflix to watch! 3d. 1. Profile photo of Silvia. Silvia Marzoli. So ji sub. 4d.",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KdramasNightAndDay/videos/8-korean-dramas-releasing-in-june-2026-where-to-watchupcoming-kdramalover/2073055106576914/",
    "date": "6 days ago",
    "image": "https://scontent-iad6-1.xx.fbcdn.net/v/t15.5256-10/722131502_1392199749384981_9170926134244873642_n.jpg?_nc_cat=106&amp;ccb=1-7&amp;_nc_sid=a27664&amp;_nc_ohc=CRm7Q4DfbWUQ7kNvwEWCdzZ&amp;_nc_oc=AdoydMvCU6GCBuIJqK0nWRezsFVcLVcUSy2pmWkpD5FFwtGemi1s8Q9GCk79hUW0w5M&amp;_nc_zt=23&amp;_nc_ht=scontent-iad6-1.xx&amp;_nc_gid=k-tx2yJpYWnmi4jA76zxHg&amp;_nc_ss=70289&amp;oh=00_Af8JZBG92F2I7iCmDQrEi7U4ARU0-8MBIrqppaT22V5n_Q&amp;oe=6A3A20D4",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781806610239-3",
    "slug": "top-10-on-disney-in-south-korea-on-june-11-2026-flixpatrol",
    "title": "TOP 10 on Disney+ in South Korea on June 11, 2026 - FlixPatrol",
    "summary": "Disney+ TOP 10 in South Korea on June 11, 2026 ; TOP 10 Overall · Doctor on the Edge, 9 d ; TOP 10 Movies · Hoppers, 7 d ; TOP 10 TV Shows · Doctor on the Edge, 9 d.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "flixpatrol.com",
    "sourceUrl": "https://flixpatrol.com/top10/disney/south-korea/",
    "date": "7 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781806611939-4",
    "slug": "a-hong-kong-court-awarded-dancer-li-kai-yin-also-known-as",
    "title": "A Hong Kong court awarded dancer Li Kai-yin, also known as ...",
    "summary": "A Hong Kong court awarded dancer Li Kai-yin, also known as Mo, HK$6.29 million (US$803,000) in compensation — the maximum allowed under city law — after he ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZriRLhj9Ev/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781806614219-5",
    "slug": "hair-turning-grey-funny-real-talk-about-salt-and-pepper",
    "title": "Hair Turning Grey: Funny Real Talk About Salt-and-Pepper ...",
    "summary": "This short clip captures a candid, humorous exchange between friends confronting the moment their hair starts to go grey. The tone is playful, frank, ...",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@dimpeystudios/video/7651368936008584461",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781806617060-6",
    "slug": "name-and-information-name-teach-you-a-lesson-year-2026",
    "title": "Name & Information Name= Teach You a Lesson Year= 2026 ...",
    "summary": "Korea Release Date: June 5, 2026 Main Cast: Kim Mu-yeol as Na Hwa-jin Lee Sung-min as Choi Gang-seok Jin Ki-joo as Im Han-rim Pyo Ji-hoon (P.O) as Bong Geun- ...",
    "category": "casting",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZnI7ifomAw/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781796408224-1",
    "slug": "south-korean-celebrity-tiktok",
    "title": "South Korean Celebrity | TikTok",
    "summary": "Discover the latest insights on popular South Korean celebrities, their marriages, and top actors captivating fans worldwide. South Korean celebrity ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/south-korean-celebrity",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781796408659-2",
    "slug": "not-sure-what-to-watch-on-netflix-these-days-here-are-5-korean",
    "title": "Not sure what to watch on Netflix these days? Here are 5 Korean ...",
    "summary": "In June 2026, many great new shows are coming to Netflix for K-drama fans. First up is 'Teach You A Lesson', a story about a doctor who is sent to a remote ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZtwWtOmiYX/",
    "date": "10 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781796409036-3",
    "slug": "kim-soo-hyuns-latest-series-release-in-2026-watch-now",
    "title": "KIM SOO HYUN's Latest Series Release in 2026: Watch Now",
    "summary": "Upcoming kdrama 'Show Business' Release date: 2026 Q2 Runtime: 22 episodes Where to Watch: Netflix Cast: Song Hye Kyo Gong Yoo Kim Seol Hyun Cha Seung Won Lee ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/735989114114131/posts/1676187650094268/",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781796409261-4",
    "slug": "2026-tv-premiere-dates-new-and-returning-series-on-broadcast",
    "title": "2026 TV Premiere Dates: New & Returning Series On Broadcast ...",
    "summary": "Doctor on the Edge (Disney+, Season 1 of South Korean drama series) Ariel: The Little Mermaid (Disney Jr, Season 2) Battle on the Beach (HGTV, Season 5)",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "deadline.com",
    "sourceUrl": "https://deadline.com/feature/2026-tv-premiere-dates-1236391902/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781796409446-5",
    "slug": "serving-looks-longing-and-royal-level-drama-perfectcrown",
    "title": "Serving looks, longing, and royal-level drama. #PerfectCrown ...",
    "summary": "Perfect Crown (2026) is a South Korean romantic comedy 230 drama on Disney+ starring IU and Byeon Woo-seok. It follows a chaebol heiress, Seong Huiju, who ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZh4xbZuvJB/",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781796409698-6",
    "slug": "new-beginnings-youngest-ever-south-korean-election",
    "title": "New beginnings: Youngest-ever South Korean election ...",
    "summary": "New beginnings: Youngest-ever South Korean election candidate to debut as J-pop idol, Le Sserafim's ex-member Kim Ga-ram now an actress · homepage.",
    "category": "trending",
    "author": "Rina Baek",
    "source": "asiaone.com",
    "sourceUrl": "https://www.asiaone.com/entertainment/youngest-south-korean-election-candidate-oh-shinhaeng-jpop-ko1keyz-kpop-lesserafim-kim-garam",
    "date": "6 days ago",
    "image": "https://media.asiaone.com/sites/default/files/styles/article_top_image/public/original_images/Jun2026/260617_oh_shinhaeng_j-pop_ko1keyz_produce_101_kim_garam_actress_weverse.jpg?itok=XBTg03CV",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781795378473-1",
    "slug": "5-must-watch-k-dramas-releasing-in-june-2026-youtube",
    "title": "5 Must watch K-dramas Releasing in June 2026 - YouTube",
    "summary": "Doctor on the Edge (June 1 • Disney+) 01:35 – Teach You a Lesson (June 5 • Netflix) 02:35 – See You at Work Tomorrow! (June. Notes from the Last Row (June 26 • ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=o2-WfK8lQ4c",
    "date": "2 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781795379389-2",
    "slug": "teach-you-a-lesson-outperforms-major-korean-dramas-on-netflix",
    "title": "Teach You a Lesson outperforms major Korean dramas on Netflix",
    "summary": "Kim Mu Yeol's new Netflix series “Teach You a Lesson” Release & Streaming: • Premiere Date: June 5, 2026 on Netflix • Episodes: 10 • Streaming: Netflix (Global)",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/3453547904961059/posts/4414431118872728/",
    "date": "22 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781795379550-3",
    "slug": "10-perfect-k-dramas-you-should-watch-in-2026-collider",
    "title": "10 Perfect K-Dramas You Should Watch in 2026 - Collider",
    "summary": "Discover the top K-dramas to watch in 2026, featuring new shows that will keep you hooked, from The Scarecrow to We Are All Trying Here.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "collider.com",
    "sourceUrl": "https://collider.com/perfect-k-drama-shows-to-watch-2026/",
    "date": "4 days ago",
    "image": "https://static0.colliderimages.com/wordpress/wp-content/uploads/2026/06/the-legend-of-kitchen-soldier1.jpg?w=1600&amp;h=900&amp;fit=crop",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781795379913-4",
    "slug": "gilmore-girls-is-leaving-netflix-us-after-12-years-june-30-2026",
    "title": "'Gilmore Girls' is leaving Netflix US after 12 years (June 30, 2026)",
    "summary": "It's already on Hulu/Disney+ in the US. Gilmore Girls: The Complete Series coming to Blu-ray on May 5 in 28-disc box. Korean SciFi show on Netflix?",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/television/comments/1u6yznl/pour_one_cup_of_coffee_out_gilmore_girls_is/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781795380045-5",
    "slug": "best-korean-drama-to-watch-on-netflix-disney-viki-youtube",
    "title": "Best Korean Drama To Watch on Netflix, Disney+, Viki - YouTube",
    "summary": "Top 10 Best Crime Korean Dramas of 2026 | Best Korean Drama To Watch on Netflix, Disney+, Viki · Comments.",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=r7Wb_sOsyV0",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781795380879-6",
    "slug": "1-doctor-on-the-edge-june-1-2-teach-you-a-lesson-instagram",
    "title": "1. Doctor on the Edge - June 1 2. Teach you a Lesson - Instagram",
    "summary": "These are the five dramas releasing this month so what are you most excited to watch? OCR. Upcoming KDramas June 2026 Doctor's on Edge Disney+ ONLY ON NETFLIX ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZpqrpvFGqc/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781795014631-1",
    "slug": "guys-i-feel-so-bad-for-this-guy-actor-jo-byeong-gyu-he-facebook",
    "title": "Guys, I feel so bad for this guy, Actor Jo Byeong Gyu He ... - Facebook",
    "summary": "KOREA | Jo Byung-gyu has lost his 4 billion KRW defamation lawsuit against a person who accused him for school bullying. The Seoul Central District Court ruled ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/100091857426174/posts/guys-i-feel-so-bad-for-this-guy-actor-jo-byeong-gyuhe-was-accused-of-bullying-an/953720791033160/",
    "date": "2 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781795015035-2",
    "slug": "who-was-sanchita-ugale-kumkum-bhagya-and-chhaava",
    "title": "Who Was Sanchita Ugale? Kumkum Bhagya And Chhaava ...",
    "summary": "Television actress and Chhaava star Sanchita Ugale has died at her residence in Maharashtra's Nalasopara, just hours after sharing a cheerful Instagram reel ...",
    "category": "trending",
    "author": "Soo Min Lee",
    "source": "timesofindia.indiatimes.com",
    "sourceUrl": "https://timesofindia.indiatimes.com/videos/etimes/bollywood/who-was-sanchita-ugale-kumkum-bhagya-and-chhaava-actress-dies-by-suicide-at-22/videoshow/131748913.cms",
    "date": "2 days ago",
    "image": "https://static.toiimg.com/thumb/msid-131748913,width-1280,height-720,imgsize-28964,resizemode-6,overlay-toi_sw,pt-32,y_pad-600/photo.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781795015670-3",
    "slug": "batwara-1947-official-teaser-shabana-azmi-sunny-deol",
    "title": "Batwara 1947 | Official Teaser | Shabana Azmi | Sunny Deol ...",
    "summary": "When batwara drew lines between people, he chose courage over fear. Watch #Batwara1947 in cinemas on 14th August. Starring: Sunny Deol, Preity G. Zinta, ...",
    "category": "trending",
    "author": "Dana Kim",
    "source": "bollywoodhungama.com",
    "sourceUrl": "https://www.bollywoodhungama.com/videos/movie-promos/batwara-1947-official-teaser-shabana-azmi-sunny-deol-aamir-khan-productions-14th-aug-2026/",
    "date": "6 hours ago",
    "image": "https://www.bollywoodhungama.com/videos/movie-promos/batwara-1947-official-teaser-shabana-azmi-sunny-deol-aamir-khan-productions-14th-aug-2026",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781795016272-4",
    "slug": "chicken-shop-date-out-friday-zara-larsson",
    "title": "@Chicken Shop Date OUT FRIDAY !! | Zara Larsson",
    "summary": "With notable names like Amelia Dimz and Rose Byrne among those recognized, the anticipation for the ceremony only grows stronger. What thoughts do you have ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@ameliadimz/video/7652409989713251606",
    "date": "22 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781795016807-5",
    "slug": "alpha-official-trailer-alia-bhatt-sharvari-anil-kapoor",
    "title": "Alpha | Official Trailer | Alia Bhatt, Sharvari, Anil Kapoor ...",
    "summary": "You saw the FIRST KILL. Now get ready to witness THE HUNT. Presenting the Official Trailer of “ALPHA” Welcome to the newest chapter of the YRF Spy Universe ...",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "bollywoodhungama.com",
    "sourceUrl": "https://www.bollywoodhungama.com/videos/movie-promos/alpha-official-trailer-alia-bhatt-sharvari-anil-kapoor-bobby-deol-shiv-rawail-yrf-spy-universe/",
    "date": "1 day ago",
    "image": "https://www.bollywoodhungama.com/videos/movie-promos/alpha-official-trailer-alia-bhatt-sharvari-anil-kapoor-bobby-deol-shiv-rawail-yrf-spy-universe",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781795017031-6",
    "slug": "new-korean-dramas-in-2026-netflix",
    "title": "New Korean Dramas in 2026 Netflix",
    "summary": "Gong Yoo and Song Hye-kyo are set to share the screen in Netflix's highly anticipated historical drama 'Tantara,' officially confirmed for a 2026 release. Cast ...",
    "category": "casting",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/new-korean-dramas-in-2026-netflix",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "casting",
      "korean-entertainment"
    ],
    "hot": false
  },
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
// HERO FEATURES  (top stories for hero carousel)
// ---------------------------------------------------------------------------
// DERIVED from NEWS at module load, so it always reflects the newest "hot"
// articles — no manual edits needed.
const HERO_KICKER: Record<NewsCategory, string> = {
  gossip: "Scandal & Gossip",
  upcoming: "Most-Anticipated 2026",
  trending: "Trending Now",
  casting: "Casting News",
};

function buildHeroFeatures(items: NewsItem[], count = 3) {
  const hot = items.filter((n) => n.hot);
  const pool = hot.length >= count ? hot : items;

  const picked: NewsItem[] = [];
  for (const n of pool) {
    if (picked.length >= count) break;
    if (picked.some((p) => p.id === n.id)) continue;
    picked.push(n);
  }

  return picked.map((n) => ({
    id: `h-${n.id}`,
    kicker: HERO_KICKER[n.category] ?? "Trending Now",
    title: n.title,
    body: n.summary,
    image: n.image,
    link: n.id,
  }));
}

export const HERO_FEATURES = buildHeroFeatures(NEWS);

export const LAST_UPDATED = "2026-06-19T17:41:14.151Z";

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
