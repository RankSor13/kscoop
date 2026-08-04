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
    "id": "live-1785839579623-1",
    "slug": "police-in-south-korea-have-recently-decided-not-to-pursue",
    "title": "Police in South Korea have recently decided not to pursue ...",
    "summary": "Police in South Korea have recently decided not to pursue prosecution of actor Kim Soo-hyun on allegations of violating the Child Welfare Act, among ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/abscbnNEWS/posts/police-in-south-korea-have-recently-decided-not-to-pursue-prosecution-of-actor-k/1617900443718539/",
    "date": "2026-08-04",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785839581593-2",
    "slug": "south-korean-actor-seo-in-guk-is-set-to-return-to-the",
    "title": "South Korean actor Seo In-guk is set to return to the ...",
    "summary": "Kim largely stepped away from the entertainment industry in early 2025 after allegations surfaced that he had dated the late actress Kim Sae-ron when she was a ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/Dbhv0UcDp4s/",
    "date": "2026-08-04",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785839584029-3",
    "slug": "hwangjungmins-agency-reveals-new-details-behind",
    "title": "#HwangJungMin's agency reveals new details behind ...",
    "summary": "Korean actor Hwang Jung-min is being accused of infidelity by his fan, and he's fighting back calling her a stalker. Let me explain.",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/Dba99vkjgUD/",
    "date": "2026-08-04",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785839586035-4",
    "slug": "why-knetz-called-son-dam-bi-no-manners",
    "title": "Why Knetz Called Son Dam-bi \"No Manners\"",
    "summary": "Recently a Korean singer and actress Son Dambi sparked a debate after posting hotel photos where she was sitting on a bed while wearing sneakers.",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/Dbfr-2avcAW/",
    "date": "2026-08-04",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785839588247-5",
    "slug": "han-seo-hees-fake-dating-scandal-gets-even-messier",
    "title": "Han Seo Hee's Fake Dating Scandal Gets Even Messier ...",
    "summary": "Public Korean actress Han So-hee finally confirmed her relationship with actor Ryu Jun-yeol on her personal blog.",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/koreaboorewind/posts/han-seo-hees-fake-dating-scandal-gets-even-messier-after-price-tag-for-her-renta/1091719390182481/",
    "date": "2026-08-04",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785839588443-6",
    "slug": "go-soo",
    "title": "Go Soo",
    "summary": "Go Soo (Korean: 고수; born October 4, 1978), also known as Ko Soo, is a South Korean actor. He has appeared in television series such as Piano, Green Rose and ...",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Go_Soo",
    "date": "3 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Go_Soo_%EA%B3%A0%EC%88%98_-_Marie_Claire_Korea_in_November_2023.jpg?utm_source=en.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785755862696-1",
    "slug": "americas-most-wanted-fugitive-was-teaching-english-at-a-top",
    "title": "America's Most Wanted fugitive was teaching English at a top ...",
    "summary": "High profile actresses have vanished for months over tax discrepancies, or after being vaguely linked in gossip columns to top party officials.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbgnI8HPI0A/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785755865455-2",
    "slug": "kdramas-to-watch-in-august-2026-netflix-disney-hbo",
    "title": "KDramas To Watch In August 2026: Netflix, Disney+, HBO ...",
    "summary": "My Bias, My Boss — August 3, Flex X Cop Season 2 — August 7, SBS / Disney+. Four Hands, Two Sonatas — August 29, tvN / Netflix. Recruit 4: Sabotage. Recruit ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "forbes.com",
    "sourceUrl": "https://www.forbes.com/sites/hannahabraham/2026/08/01/kdramas-to-watch-in-august-2026-netflix-disney-hbo-max-and-more/",
    "date": "2 days ago",
    "image": "https://imageio.forbes.com/specials-images/imageserve/6a6d672607cbfc561398d2be/0x0.jpg?format=jpg&amp;crop=1200,900,x0,y177,safe&amp;height=900&amp;width=1600&amp;fit=bounds",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785755868950-3",
    "slug": "gong-yoo-and-song-hye-kyo-star-in-new-netflix-drama-set-to-release",
    "title": "Gong Yoo and Song Hye Kyo star in new Netflix drama set to release ...",
    "summary": "No preview available.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/335809618054215/posts/1362923338676166/",
    "date": "2026-08-03",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785755871410-4",
    "slug": "kim-woo-bins-new-series-release-in-2026",
    "title": "Kim Woo-bin's new series release in 2026",
    "summary": "No preview available.",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/3183080521946132/posts/4355159218071584/",
    "date": "2026-08-03",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785755873575-5",
    "slug": "upcoming-august-2026-k-dramas-kdrama",
    "title": "Upcoming August 2026 K-Drama's ❤️ #kdrama # ...",
    "summary": "August 29, 2026 tvN + Netflix global To Journey To Gyeong-ju Set to release on August 26 New Recruit Season 4: set to premiere on August 24. ivylicious86's ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/kdramafeed/reel/DbieABGuvCc/",
    "date": "2026-08-03",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785755873830-6",
    "slug": "disney-turns-k-drama-into-a-2026-wedge-as-netflix",
    "title": "Disney Turns K-Drama Into a 2026 Wedge as Netflix ...",
    "summary": "The clearest signal is Perfect Crown, which THR says became Disney+'s biggest K-drama debut after launching on April 10.",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "kentertechhub.com",
    "sourceUrl": "https://www.kentertechhub.com/disney-turns-k-drama-into-a-2026-wedge-as-netflix-expands-scale/",
    "date": "11 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785664325650-1",
    "slug": "how-6-korean-stars-bounced-back-from-scandal",
    "title": "How 6 Korean stars bounced back from scandal",
    "summary": "Kim Seon-ho was hit with a tabloid grenade: an anonymous ex-girlfriend accused him of coercing her into an abortion. The scandal exploded on Korean news cycles,",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "tatlerasia.com",
    "sourceUrl": "https://www.tatlerasia.com/lifestyle/entertainment/korean-stars-comeback-scandal",
    "date": "May 5, 2025",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785664327609-2",
    "slug": "actors-or-actresses-to-had-past-scandals-rkdramas",
    "title": "Actors or Actresses to had past scandals : r/kdramas",
    "summary": "Actresses with scandals in Korean cinema. Woody Allen got away with sickening crimes for decades because they were \"powerful talented men\". Korean actors are ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kdramas/comments/1nfyttk/actors_or_actresses_to_had_past_scandals/",
    "date": "2026-08-02",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785664329200-3",
    "slug": "top-korean-actor-caught-in-affair-scandal-as-agency-blames",
    "title": "Top Korean Actor Caught in Affair Scandal as Agency Blames ...",
    "summary": "Top Korean actor Hwang Jung min faces major controversy after an accuser released leaked audio calls and social media posts alleging an affair.",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=zhojK4bJUyQ",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785664331781-4",
    "slug": "scandal-plagued-south-korean-stars-step-back-into-spotlight",
    "title": "Scandal-plagued South Korean stars step back into spotlight",
    "summary": "A wave of once-disgraced South Korean celebrities are returning to the spotlight following high-profile blow-ups.",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "straitstimes.com",
    "sourceUrl": "https://www.straitstimes.com/life/entertainment/scandal-plagued-south-korean-stars-step-back-into-spotlight",
    "date": "Apr 6, 2025",
    "image": "https://cassette.sphdigital.com.sg/image/straitstimes/a33b39e329215e3417924b0016e7e08af9eac23dd1965185b6372e0a815484c2",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785664335659-5",
    "slug": "every-new-k-drama-coming-to-netflix-prime-video-and",
    "title": "Every New K-Drama Coming To Netflix, Prime Video, And ...",
    "summary": "Every New K-Drama Coming To Netflix, Prime Video, And Disney+ In June 2026 ; Doctor on the Edge · Comedy · ENA ; Teach You A Lesson · Drama · Netflix ; See You at Work ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "screenrant.com",
    "sourceUrl": "https://screenrant.com/every-k-drama-netflix-disney-prime-video-june-2026/",
    "date": "May 25, 2026",
    "image": "https://static0.srcdn.com/wordpress/wp-content/uploads/2026/05/june-2026-k-drama-doctor-on-the-edge-poster.png?w=1600&amp;h=900&amp;fit=crop",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785664336381-6",
    "slug": "10-upcoming-disney-korean-dramas-in-2026",
    "title": "10 Upcoming Disney+ Korean Dramas in 2026",
    "summary": "10 Upcoming Disney+ Korean Dramas in 2026 #MerryBerryLove #TheRemarriedEmpress #AShopforKillersSeason2 #MioImada #2026koreandrama # Am a Sinner 07:31 Flower of ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=Zq3CqKMmz6w",
    "date": "7 months ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785578037900-1",
    "slug": "south-korean-celebrities-latest-news-and-updates",
    "title": "South Korean celebrities: Latest News and Updates",
    "summary": "Latest South Korean celebrity news, news about K-movie and K-drama actors and actresses. - 1: drama casting news about Nana, Lee Jong-suk and more",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "scmp.com",
    "sourceUrl": "https://www.scmp.com/topics/south-korean-celebrities",
    "date": "2026-08-01",
    "image": "https://assets-v2.i-scmp.com/production/_next/static/media/default-image.d95a029f.png",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785578040601-2",
    "slug": "the-untold-truth-behind-these-korean-actors-falls-from-grace",
    "title": "The Untold Truth Behind These Korean Actors' Falls from Grace",
    "summary": "Step into the devastating world of Korean celebrity scandals that destroyed careers overnight. From school violence allegations that refuse to die, ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=uCCNDCpBshI",
    "date": "1 year ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785578043088-3",
    "slug": "cycle-of-controversy-koreas-top-stars-faced-probes-exits",
    "title": "Cycle of controversy: Korea's top stars faced probes, exits ...",
    "summary": "Actress Hwang Jung-eum was indicted without detention on charges of corporate fund embezzlement, sending shockwaves through the industry.",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "koreatimes.co.kr",
    "sourceUrl": "https://www.koreatimes.co.kr/entertainment/others/20251225/cycle-of-controversy-koreas-top-stars-faced-probes-exits-and-burnout-in-2025",
    "date": "Dec 25, 2025",
    "image": "https://newsimg.koreatimes.co.kr/2025/12/25/a4d340a0-d6dc-47aa-8f3f-fb4b4c281205.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785578046864-4",
    "slug": "what-does-the-current-controversy-with-those-two-korean",
    "title": "What does the current controversy with those two Korean ...",
    "summary": "Kim Saeron and Kim Soohyun literally helped with popularizing Kdramas and Korean films throughout the ongoing renewed Hallyu Wave. The mods don't allow rumours ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kdramas/comments/1j8xq8j/what_does_the_current_controversy_with_those_two/",
    "date": "2026-08-01",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785578048714-5",
    "slug": "koreaboo-breaking-k-pop-news-photos-and-viral-videos",
    "title": "Koreaboo - breaking k-pop news, photos and viral videos",
    "summary": "Actress Jeon Won Joo's uninhibited expression of affection toward a 33-year-old trainer in a YouTube video has sparked an unexpected online debate. On the 30th, ...",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "koreaboo.com",
    "sourceUrl": "https://www.koreaboo.com/",
    "date": "2026-08-01",
    "image": "https://koreaboo-cdn.storage.googleapis.com/KoreabooFacebookBrand.png",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785578051220-6",
    "slug": "when-korean-actors-private-lives-suddenly-got-exposed",
    "title": "When Korean Actors' Private Lives Suddenly Got Exposed",
    "summary": "Naver's Jisik iN glitch that suddenly linked celebrities' anonymous posts to their real names, Kim Seon-ho's 2021 scandal that looked career-ending",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=7kOEtf2VRqg",
    "date": "3 months ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785494058120-1",
    "slug": "bakit-si-chris-ang-the-one-para-kay-nadine-nadinelustre",
    "title": "Bakit si Chris ang 'the one' para kay Nadine? #nadinelustre ...",
    "summary": "Bakit si Chris ang 'the one' para kay Nadine? Filipino celebrity news, Andi Eigenmann and Nadine Lustre, food and celebrity culture, latest entertainment news",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@iamkarendavila/video/7666918134527380754",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785494060685-2",
    "slug": "bakit-pati-ako-kinikilig-lol-thank-you-oppa-ethan-ethan",
    "title": "Bakit pati ako kinikilig lol thank you oppa @🔆Ethan🔆 🌸 | ethan",
    "summary": "Kylie Jenner cheating rumors, entertainment gossip news, Hollywood scandals explained, Kylie Jenner and Travis Scott breakup,",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@onlykyliepadilla/video/7667433992924318983",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785494062515-3",
    "slug": "new-k-drama-releases-to-watch-in-august-2026-on",
    "title": "New K-Drama Releases To Watch In August 2026 On ...",
    "summary": "New K-Drama Releases To Watch In August 2026 On Netflix, Disney+, And More · 1. My Bias, My Boss · 2. Flex x Cop Season 2 · 3. Our Sticky Love · 4. Mousetrap · 5.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "koreaboo.com",
    "sourceUrl": "https://www.koreaboo.com/news/new-kdrama-releases-watch-in-august-2026-netflix-disney/",
    "date": "22 hours ago",
    "image": "https://image.koreaboo.com/2026/07/augustkdrams-FI-1.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785494066221-4",
    "slug": "new-k-drama-releases-to-watch-in-august-2026-on",
    "title": "New K-Drama Releases To Watch In August 2026 On ...",
    "summary": "Upcoming K-Dramas Premiering on Netflix in 2026: 1. The Wonderfools 2. Bloodhounds S2 3. Show Business 4. East Palace 5. Boyfriend On Demand 6. The Art Of Sarah ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/koreaboorewind/posts/new-k-drama-releases-to-watch-in-august-2026-on-netflix-disney-and-more/1088930010461419/",
    "date": "2026-07-31",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785494067828-5",
    "slug": "kang-ji-young-is-at-the-center-of-exciting-disney-buzz",
    "title": "Kang Ji-young is at the center of exciting Disney+ buzz ...",
    "summary": "A robust line up of Korean titles for Disney+ slated for 2026 'Made in Korea' 'Perfect Crown' 'Are you Sure?' Season 2 'Gold Land' 'A Shop for Killers Season 2 ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/awesomeitv/posts/kang-ji-young-is-at-the-center-of-exciting-disney-buzz-once-again-the-streaming-/1527119819455641/",
    "date": "18 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785494067954-6",
    "slug": "viki-and-the-lack-of-new-kdramas",
    "title": "Viki and the lack of new Kdramas",
    "summary": "These are just the 2026 releases that I've been watching on Viki this year: Dream to You Filing for Love Phantom Lawyer Positively Yours The Legend of Kitchen ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kdramas/comments/1vauxu5/viki_and_the_lack_of_new_kdramas/",
    "date": "20 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785406852550-1",
    "slug": "south-korean-actor-hwang-jung-min-faced-a-private-life",
    "title": "South Korean actor Hwang Jung-min faced a private life ...",
    "summary": "Hwang Jung-min faced a private life controversy on July 29, 2026, after a woman (\"Person A\") posted unverified text messages and audio recordings online ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/AllKoreanCelebrities/posts/south-korean-actor-hwang-jung-min-faced-a-private-life-controversy-on-july-29-20/1683499810442809/",
    "date": "2026-07-30",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785406854679-2",
    "slug": "yonhap-news-agency",
    "title": "Yonhap News Agency",
    "summary": "Korea this week amid pileup of bilateral issues · Yonhap News Summary · (3rd LD) PPP at risk of losing 40 bln won after Yoon's election law conviction · Police ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "m-en.yna.co.kr",
    "sourceUrl": "https://m-en.yna.co.kr/",
    "date": "3 hours ago",
    "image": "https://r.yna.co.kr/global/home/v01/img/yonhapnews_logo_1200x800_en01.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785406859353-3",
    "slug": "moon-geunyoung-x-jung-pyung-musical-actor-2-secretly",
    "title": "Moon Geunyoung x Jung Pyung (musical actor) 2. Secretly ...",
    "summary": "Public Annually, Dispatch reveals Korean celebrities' relationship (dating scandal) with whom Jung shares a son born in March 2024. Korean news reports believe ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/61551933150668/posts/isnt-todays-entertainment-news-just-a-total-mix-uptheres-stuff-like1-secretly-ge/122321969612064438/",
    "date": "2026-07-30",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785406861541-4",
    "slug": "one-word-to-describe-this-disappointing-esp-jung-hae-in",
    "title": "one word to describe this, disappointing, esp Jung Hae in",
    "summary": "Kim Soo Hyun was actually found to be not guilty of dating a minor, and the evidence had been fabricated by that blogger who kept posting things (for clicks/ ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kdramas/comments/1v76kef/one_word_to_describe_this_disappointing_esp_jung/",
    "date": "2026-07-30",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785406863687-5",
    "slug": "national",
    "title": "National",
    "summary": "actor Kim Soo-hyun Police have decided not to pursue an underage dating charge against actor Kim Soo-hyun over his past relationship with late actress Kim Sae- ...",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "koreaherald.com",
    "sourceUrl": "https://www.koreaherald.com/National",
    "date": "9 hours ago",
    "image": "https://static.heraldcorp.com/wbazic/kh/www/image/sns.png",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785406867997-6",
    "slug": "kwon-sang-woo",
    "title": "Kwon Sang-woo",
    "summary": "Kwon Sang-woo (Korean: 권상우; born August 5, 1976) is a South Korean actor, famous for the melodrama series Stairway to Heaven.",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Kwon_Sang-woo",
    "date": "4 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Kwon_Sang-woo_in_2023.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785321281871-1",
    "slug": "why-has-it-taken-me-6-years-to-realise-this-play-is-about-me",
    "title": "Why has it taken me 6 years to realise this play is about me",
    "summary": "YouTuber Saffron Barker has come forward to share her side of the story regarding her recent split from her rugby star ex-boyfriend.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@imogencribb/video/7666534361679875350",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785321283742-2",
    "slug": "which-kdramas-are-you-most-excited-for-in-the-second-half-of",
    "title": "Which KDramas are you most excited for in the second half of ...",
    "summary": "Lead 2026 has been a stellar year for Kdramas. This guide lists standout Korean dramas released or prominent in 2026, grouped by title with where to stream each ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@kdramaconfidential/video/7667756942806306061",
    "date": "9 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785321285850-3",
    "slug": "descendants-2026-fullmovie-online-4khd-free",
    "title": "\"Descendants\" [2026] FullMovie Online 4KHD! Free ...",
    "summary": "“Descendants” (2026) — a large-scale mythological action film “Descendants” (2026) is a myth-driven action drama set. Streaming platforms (Netflix, Amazon ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "tahoe.ca.gov",
    "sourceUrl": "https://tahoe.ca.gov/wp-content%2Fuploads%2Fsites%2F257%2Fwpforms%2Ftmp%2Fd49807648ec40f24e8518bda318de9a1.pdf",
    "date": "3 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785321287447-4",
    "slug": "south-korean-entertainment-news",
    "title": "South Korean Entertainment News",
    "summary": "K-pop, Korean dramas, movies and celebrity news. Celebrity couple Namkoong Min, Jin A-reum welcome first child 2026.7.27 team up for K-pop-themed animation ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "koreajoongangdaily.com",
    "sourceUrl": "https://www.koreajoongangdaily.com/entertainment",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785321290287-5",
    "slug": "while-waving-to-fans-ahofs-juwon-squatted-down-to-get-a",
    "title": "while waving to fans, AHOF's Juwon squatted down to get a ...",
    "summary": "AHOF's Juwon sitting on the stage edge, sending flying kisses to fans, and accidentally hitting the security guard's head! The absolute cuteness and chaos ✨",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbSngFlTyW_/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785321290620-6",
    "slug": "hyein-newjeans-profile-and-fan-searches-newjeans-4th",
    "title": "Hyein NewJeans profile and fan searches | NewJeans 4th ...",
    "summary": "Lead This summary brings together the most-searched fan queries and profile interest around Hyein and NewJeans at their 4th anniversary.",
    "category": "trending",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@newjeans_official/video/7665579407569898768",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785234615656-1",
    "slug": "2026-new-netflix-series-with-traditional-korean-romance",
    "title": "2026 New Netflix Series with Traditional Korean Romance",
    "summary": "No preview available.",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/213769097944550/posts/897237339597719/",
    "date": "2026-07-28",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785234617590-2",
    "slug": "kim-woo-bins-new-series-2026-release-and-streaming-link",
    "title": "Kim Woo-bin's new series \"2026\" release and streaming link",
    "summary": "No preview available.",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/3183080521946132/posts/4351338621786977/",
    "date": "2026-07-28",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785234619670-3",
    "slug": "2026-top-10-k-drama",
    "title": "अगस्त 2026 में आने वाले TOP 10 K-Drama",
    "summary": "Next is The Apartment Job, a Korean drama available on Netflix from July 11th. Next is The East Palace, a Korean drama available on Netflix starting July 17th. ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DbTCb-PSg0v/",
    "date": "2026-07-28",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785234621631-4",
    "slug": "what-has-been-your-favorite-k-drama-of-2026-so-far",
    "title": "🌟 What has been your favorite K-drama of 2026 so far? ...",
    "summary": "here are 7 Korean dramas releasing in 2026. Portraits of Delusion, Portraits Of Delusion, a Disney+ Original series … 7 must-watch series coming to Netflix, ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/DramalistOfficial/posts/-what-has-been-your-favorite-k-drama-of-2026-so-far-that-question-recently-spark/122198017934766631/",
    "date": "2026-07-28",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785234623727-5",
    "slug": "new-korean-drama-to-watch-in-july-2026",
    "title": "New Korean Drama To Watch In July 2026🩷💜",
    "summary": "Spooky In Love on Netflix on July 18th. The Husband Korean drama on July 4th on Disney+. And on July 4th itself, a Korean drama named He Love in Sync on Disney+ ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DbN6sGjNdu4/",
    "date": "2026-07-28",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785234625737-6",
    "slug": "korean-drama-series-on-netflix-2026",
    "title": "Korean Drama Series on Netflix 2026",
    "summary": "2026 is an upcoming South Korean action-drama series, releasing June 5, 2026 exclusively on Netflix. It's adapted from the popular webtoon Get Schooled.",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/korean-drama-series-on-netflix-2026",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785150927185-1",
    "slug": "top-korean-actress-being-unfiltered-sparks-heated-debate",
    "title": "Top Korean Actress Being Unfiltered Sparks Heated Debate",
    "summary": "Kim Soo-hyun, one of Korea's. Reports allege a past connection between him and the late actress Kim Sae-ron, sparking intense scrutiny.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/koreaboorewind/posts/top-korean-actress-being-unfiltered-sparks-heated-debate/1084492577571829/",
    "date": "2026-07-27",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785150929420-2",
    "slug": "yumcha-tea-time-tuesdays-celebs-gossip-oh-my",
    "title": "Yumcha Tea Time Tuesdays 🫖 Celebs, gossip, oh my!",
    "summary": "A rumor began circulating that movie actor Yu Shi was secretly taking on a big-budget Tencent drama project alongside Yu Shuxin (Esther Yu).",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/CDrama/comments/1v2kxql/yumcha_tea_time_tuesdays_celebs_gossip_oh_my_july/",
    "date": "2026-07-27",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785150931819-3",
    "slug": "lee-jun-ho",
    "title": "Lee Jun-ho",
    "summary": "Junho, is a South Korean singer-songwriter and actor. Lee made his acting debut in the film Cold Eyes (2013) Cashero (2025). Star News (in Korean).",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Lee_Jun-ho",
    "date": "4 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Lee_Junho_in_January_2025_02.png/960px-Lee_Junho_in_January_2025_02.png",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785150934099-4",
    "slug": "court-finds-one-of-kim-soo-hyuns-accusers",
    "title": "COURT FINDS ONE OF KIM SOO HYUN'S ACCUSERS ...",
    "summary": "A new legal development has emerged in the wider controversy surrounding actor Kim Soo Hyun, with one of his vocal accusers now facing a court conviction. Kim ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/BigSis9JA/posts/court-finds-one-of-kim-soo-hyuns-accusers-guilty-of-defaming-a-south-korean-jour/1691339612997352/",
    "date": "2026-07-27",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785150936156-5",
    "slug": "son-ye-jin-and-lee-min-ho-are-celebrated-south-korean",
    "title": "Son Ye-jin and Lee Min-ho are celebrated South Korean ...",
    "summary": "Son Ye-jin and Lee Min-ho are celebrated South Korean actors who co-starred in the popular 2010 romantic-comedy K-drama Personal Taste",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbIpDtlBYHA/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785150936417-6",
    "slug": "south-korea",
    "title": "South Korea",
    "summary": "Stay up to date on the latest South Korea news coverage from AP News.",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "apnews.com",
    "sourceUrl": "https://apnews.com/hub/south-korea",
    "date": "14 hours ago",
    "image": "https://dims.apnews.com/dims4/default/295c329/2147483647/strip/true/crop/675x450+12+0/resize/980x653!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F90%2F29%2F4e3c1cc7446089a9101a7bdff4c8%2Fdefaultshareimage-copy.png",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785059701271-1",
    "slug": "during-a-business-trip-to-china-park-siwoo-was-harassed-and",
    "title": "During a business trip to China, Park Siwoo was harassed and ...",
    "summary": "Kim Soo hyun Accused of dating a minor Jung Woo sung Cheating allegations (three-timing multiple women) Park Yoo chun Illegal drug use and tax evasion.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbM6lCQtDKE/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785059703484-2",
    "slug": "3-quick-mokshiri-updates-worth-your-scroll-1-one-of-asias-most",
    "title": "3 quick Mokshiri updates worth your scroll: 1. one of Asia's most ...",
    "summary": "3 quick Mokshiri updates worth your scroll: 1. one of Asia's most iconic and beloved actors, re-emerged 2. few figures manage to balance public fascination ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbHu04lALMP/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785059705183-3",
    "slug": "when-k-dramas-decide-to-dominate-every-genre-at-once-fans",
    "title": "When K-dramas decide to dominate every genre at once, fans ...",
    "summary": "ky in Love (2026) A supernatural romantic comedy. Release Date: July 17, 2026 on Netflix. Release Date: July 4, 2026 on KBS2 and Disney+. The Apartment Job. ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbIcYLEvFAe/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1785059708251-4",
    "slug": "k-pop",
    "title": "K-pop",
    "summary": "Updates on K-pop artists, new releases, fan culture and trends. Katseye teams up with Ed Sheeran, Demi Moore for new single 'Animal' Cheorwon in Gangwon ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "koreaherald.com",
    "sourceUrl": "https://www.koreaherald.com/Kpop",
    "date": "3 hours ago",
    "image": "https://static.heraldcorp.com/wbazic/kh/www/image/sns.png",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785059713392-5",
    "slug": "hudson-williams-in-seoul-today-hudsonwilliams-hudson",
    "title": "Hudson Williams in Seoul today. #hudsonwilliams | hudson ...",
    "summary": "Hudson Williams and Lola Tung, stole the spotlight with their dancing skills. Hudson and Lola, known for their remarkable performances on-screen, were spotted ...",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@hudsonwilliamshq/video/7666086802029038870",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1785059713827-6",
    "slug": "eun-woo-canta-arirang-y-yo-este-es-el-contenido-que",
    "title": "Eun Woo canta Arirang y yo: este es el contenido que ...",
    "summary": "Cha Eun-Woo Engagement Rumors: What's the Truth? Discover the truth behind the Cha Eun-Woo engagement rumors. Dive into reality vs. speculation in K-drama ...",
    "category": "trending",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@dayichingu/video/7665774324934020373",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784972514765-1",
    "slug": "actor-ryoki-miyama-is-facing-renewed-controversy-after",
    "title": "Actor Ryoki Miyama is facing renewed controversy after ...",
    "summary": "Actor Ryoki Miyama is facing renewed controversy after reports alleged he added unscripted kiss scenes with co-star Maria Kano during the Japanese stage...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/100085069734767/posts/actor-ryoki-miyama-is-facing-renewed-controversy-after-reports-alleged-he-added-/1002894602556188/",
    "date": "2026-07-25",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784972516656-2",
    "slug": "korean-celebrity-news",
    "title": "Korean Celebrity News",
    "summary": "Stay updated on the latest Korean celebrity news, including Cha Eun-Woo's engagement rumors and Kim Soo Hyun's fan concerns. BLACKPINK's Lisa has sparked ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/korean-celebrity-news",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784972518396-3",
    "slug": "in-a-letter-published-by-a-south-korean-newspaper-chey",
    "title": "In a letter published by a South Korean newspaper, Chey ...",
    "summary": "Actress Kim Min Hee (42) Is Pregnant From Her Extramarital Affair With Director Hong Sang Soo (64) According to media outlet 'Dispatch' on January 17 KST, ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/NYPost/posts/in-a-letter-published-by-a-south-korean-newspaper-chey-revealed-he-had-fallen-in/1490971829561475/",
    "date": "2026-07-25",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784972520536-4",
    "slug": "oh-yeon-seo",
    "title": "Oh Yeon Seo",
    "summary": "Gu Hye -sun insisted that Ahn Jae -hyun is doing affairs with the other actress of the drama. The drama starring Ahn Jae -hyun is 'Human Humans' because the ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "en.namu.wiki",
    "sourceUrl": "https://en.namu.wiki/w/%EC%98%A4%EC%97%B0%EC%84%9C",
    "date": "7 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784972520618-5",
    "slug": "netflixs-spooky-in-love-debuts-at-no-2-globally-becomes",
    "title": "Netflix's 'Spooky in Love' debuts at No. 2 globally, becomes ...",
    "summary": "Upcoming k-dramas on Netflix in 2026 Ena Khan \"Can This Love Be Translated\" 💫\"Boyfriend On Demand\" 💫\"East Palace\" 💫\"The WonderFools\" As confirmed in Netflix's ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/allkpop/posts/netflixs-spooky-in-love-debuts-at-no-2-globally-becomes-one-of-summers-biggest-k/1458138689685693/",
    "date": "2026-07-25",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784972520773-6",
    "slug": "your-next-k-drama-obsession-might-already-be-waiting-on",
    "title": "Your next K-drama obsession might already be waiting on ...",
    "summary": "Love in Sync – Releases 4 July 2026 on Disney+ The Husband – Releases 4 July 2026 on Disney+ / Hulu The Apartment Job – Releases 11 July 2026 on JTBC",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DbNR_q5IIBn/",
    "date": "2026-07-25",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784887936888-1",
    "slug": "trisha-paytas-tiktok-star-and-big-brother-alum",
    "title": "Trisha Paytas: TikTok Star & Big Brother Alum",
    "summary": "Trisha has opened up about the tumultuous relationship between actor Vijay and his wife Sangeetha, revealing that a divorce is currently underway.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@trishlikefish88/video/7664796442741050637",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784887939102-2",
    "slug": "august-2026-watch-the-trailers-new-k-dramas",
    "title": "AUGUST 2026 🫰Watch the Trailers!❤️ NEW K-DRAMAS",
    "summary": "new releases for K-drama fans! 8 Upcoming Kdramas | AUGUST 2026 … | NETFLIX, DISNEY+ & MORE. ADDICTIVE K-Dramas on Disney+ RIGHT NOW! (2026)",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=qlNOZGgQQME",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784887941099-3",
    "slug": "cant-talk-rn-im-busy-watching-these-k-dramas",
    "title": "Can't talk rn, I'm busy watching these K-dramas",
    "summary": "The East Palace drops July 17 on Netflix. A Shop for Killers 2 on July 22on Disney+. Overdo on iQIYI later this month. But honestly July has more. Spooky in ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbIcCChD2_P/",
    "date": "19 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784887943219-4",
    "slug": "new-k-drama-alert-disney-confirmed-it-will",
    "title": "NEW K-DRAMA ALERT 🫶🏻 Disney+ confirmed it will ...",
    "summary": "Public Upcoming K-dramas for release on Disney+ in 2025. It was released on Disney+ from November 6 to 27, 2024, with 8 episodes. Premiere on November 06.",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/philstarnews/posts/new-k-drama-alert-disney-confirmed-it-will-distribute-the-upcoming-action-crime-/1510274687809946/",
    "date": "2026-07-24",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784887945934-5",
    "slug": "d-day-a-shop-for-klllers-season-2-22-july-2026-netflix",
    "title": "D-Day!! A Shop For K¡lllers Season 2 • 22 July 2026 | Netflix",
    "summary": "Season 2 • 22 July 2026 | Netflix. Season 2 is set to premiere in 2026 on Disney+, Filming is scheduled to begin in April 2025.",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/kakimuveeasian/posts/d-day-a-shop-for-klllers-season-2-22-july-2026-netflix-8-episodes-action-thrille/2004342947162018/",
    "date": "2026-07-24",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784887946195-6",
    "slug": "d-day-a-shop-for-klllers-season-2-22-july-2026-disney",
    "title": "D-Day!! A Shop For K¡lllers Season 2 • 22 July 2026 | Disney+",
    "summary": "Spooky In Love launches on Netflix 18 July 2026. This Korean drama blends romantic comedy and horror across 12 episodes, releasing new episodes on Saturdays ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@kakimuveeasian/video/7665236310923201812",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784801752956-1",
    "slug": "korean-american-actress-kaylee-hottle-dies-at-18",
    "title": "Korean-American Actress Kaylee Hottle Dies At 18",
    "summary": "In May 2022, she was involved in a high-profile drunk driving incident in Seoul, which caused significant property damage and led to legal repercussions.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/koreaboorewind/posts/korean-american-actress-kaylee-hottle-dies-at-18/1081721267848960/",
    "date": "2026-07-23",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784801755057-2",
    "slug": "rip-south-korean-actress-on-in-hye-the-dark-side-of",
    "title": "Rip 😢💔 South Korean Actress On In-Hye The Dark Side of ...",
    "summary": "After the scandal with actress Kim Sae-ron, now Kim Soo Hyun's Instagram has been flooded with criticism and hate comments following recent allegations.",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/salim.ma.90/posts/rip-south-korean-actress-on-in-hye-the-dark-side-of-trolling-heart-breaking-stor/28121759287410558/",
    "date": "2026-07-23",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784801756955-3",
    "slug": "kim-soo-hyun-has-returned-to-the-limelight-by-endorsing",
    "title": "Kim Soo-hyun has returned to the limelight by endorsing ...",
    "summary": "Kim Soo Hyun has made his first public appearance since the controversy surrounding the late Kim Sae-ron case. controversy surrounding false allegations linked ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/Da4vNf5xCy-/",
    "date": "2026-07-23",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784801758919-4",
    "slug": "lee-jong-hyun",
    "title": "Lee Jong-hyun",
    "summary": "Lee Jong-hyun (Korean: 이종현 ; born May 15, 1990), also known by his mononym Jonghyun, is a South Korean musician, singer-songwriter and actor.",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Lee_Jong-hyun",
    "date": "6 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Lee_Jong-hyun_at_MOKO%2C_Mong_Kok%2C_HK_%283%29.jpg/960px-Lee_Jong-hyun_at_MOKO%2C_Mong_Kok%2C_HK_%283%29.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784801761955-5",
    "slug": "korean-actors-that-is-dating-a-black-woman",
    "title": "Korean Actors That Is Dating A Black Woman",
    "summary": "Discover videos related to Korean Actors That Is Dating A Black Woman on TikTok. SOUTH KOREAN CELEBRITY ACCUSED OF DISCRIMINATION AGAINST BLACK INFLUENCER # ...",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/korean-actors-that-is-dating-a-black-woman",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784801762455-6",
    "slug": "jung-somin-has-been-nominated-for-the-53rd-korea",
    "title": "Jung Somin has been nominated for the 53rd 'Korea ...",
    "summary": "Jung Somin has been nominated for the 53rd 'Korea … was recently impacted by a severe, fabricated defamation scandal involving the late actress Kim Sae-ron.",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbEjs_5SsOC/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784715689074-1",
    "slug": "task-force-firewall-july-15-yung-kabit-nahuli-na-pero",
    "title": "Task Force Firewall July 15: Yung kabit nahuli na pero ...",
    "summary": "The short scene features Kylie Padilla and Luis Hontiveros and mixes humor with on-set banter. Kapuso stars Kylie Padilla, Bianca Umali, and Ysabel Ortega",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@johnvicdeguzman/video/7662767463490129170",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784715691518-2",
    "slug": "top-5-newly-upcoming-dramas-in-hindi",
    "title": "Top 5 Newly Upcoming Drama's In Hindi",
    "summary": "Radio Romance, which is a Korean drama and is coming on July 27th. 'Love in Sync' is coming; You can watch it on Disney+ Hotstar, 'The East Palace' is coming;",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbBKj97hdAz/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784715693840-3",
    "slug": "new-k-drama-releases-of-the-week-july-20-26",
    "title": "New K-drama releases of the week (July 20-26)",
    "summary": "A Shop for Killers Season 2, Agent Kim Reactivated, Dream to You & The Husband are new K-drama releases of the week (July 20-26, 2026) on OTT to look ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "gqindia.com",
    "sourceUrl": "https://www.gqindia.com/content/new-k-drama-releases-of-the-week-july-20-26-13-new-korean-dramas-streaming-on-netflix-and-other-ott-platforms",
    "date": "24 hours ago",
    "image": "https://assets.gqindia.com/photos/6a5db788472e251ad364c485/16:9/w_1280,c_limit/New-K-drama-releases-of-the-week-July-20-26-2026.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784715696855-4",
    "slug": "what-korean-show-to-watch-on-disney-plus",
    "title": "What Korean show to watch on Disney Plus?",
    "summary": "“Made in Korea”! “Made in Korea” is set to premiere on Disney+ in the second half of 2025. “The Impossible Heir” is now confirmed to release on February 28!🩶. ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/WhatsOnDisneyPlus/posts/2433419183808144/",
    "date": "2026-07-22",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784715697123-5",
    "slug": "most-anticipated-korean-dramas-of-2026-10",
    "title": "Most Anticipated Korean Dramas of 2026📽️🔥 10 ...",
    "summary": "A Bona Fide Killer Premiere Date: July 31, 2026. The Husband Premiere Date: July 4, 2026 (KBS2, Disney+) Genre: Thriller, Drama The East Palace Premiere Date: ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DbDfnxdmtuv/",
    "date": "2026-07-22",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784715697462-6",
    "slug": "2026-korean-drama-netflix",
    "title": "2026 Korean Drama Netflix",
    "summary": "Upcoming K-Drama Series to Watch in 2026. Discover exciting new K-dramas for 2026 on Netflix, including 'The East Palace' and 'Perfect Job'. Stay updated on the ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/2026-korean-drama-netflix",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784629303395-1",
    "slug": "baesuzy-is-a-south-korean-actress-singer",
    "title": "#BaeSuzy (배수지) is a South Korean actress, singer ...",
    "summary": "BaeSuzy (배수지) is a South Korean actress, singer, and former member of the K-pop group Miss A. Born on October 10, 1994, in Gwangju, South Korea, she...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/xiao.jun.771804/posts/baesuzy-%EB%B0%B0%EC%88%98%EC%A7%80-is-a-south-korean-actress-singer-and-former-member-of-the-k-pop-grou/1032705102686324/",
    "date": "2026-07-21",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784629305087-2",
    "slug": "if-anyone-still-supports-this-please-block-me-as-if-returning-to",
    "title": "If anyone still supports this, please block me As if returning to ...",
    "summary": "Major Scandal Involving Seo Yea Ji and Kim Soo Hyun Revealed. Seo Yea Ji's contract termination and Kim Sae Ron's incident.",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@kdramasemy/video/7663436236283055381",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784629307396-3",
    "slug": "son-ye-jin",
    "title": "Son Ye-jin",
    "summary": "Son Eon-jin better known by her stage name, Son Ye-jin (손예진 ), is a South Korean actress who rose to fame in 2003 in The Classic and Summer Scent, ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Son_Ye-jin",
    "date": "3 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Son_Ye-jin_in_May_2026.png",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784629309323-4",
    "slug": "upcoming-k-dramas-set-to-release-in-second-half-of-2026",
    "title": "Upcoming K-dramas set to release in second half of 2026",
    "summary": "Some of the major Disney+ K-dramas releasing in the second half of 2026 include 'Love in Sync', 'The Husband' and 'A Shop for Killers' season 2.",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "lifestyleasia.com",
    "sourceUrl": "https://www.lifestyleasia.com/kl/entertainment/streaming/upcoming-k-dramas-to-watch-in-second-half-of-2026/",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784629309570-5",
    "slug": "netflixs-most-watched-k-dramas-of-2026",
    "title": "Netflix's most-watched K-dramas of 2026",
    "summary": "Netflix Korea 2026 Drama Lineup 1.Can This Love Be Translated ( released) 2.Boyfriend on Demand (March 02) 3.Take Charge of My Heart 4.Our Sticky Love ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/343987915176123/posts/1029676023273972/",
    "date": "2026-07-21",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784629309697-6",
    "slug": "my-top-10-feel-good-kdramas-as-of-july-2026-what-about",
    "title": "My top 10 Feel Good Kdramas as of July 2026 - what about ...",
    "summary": "My favorite feel good K-dramas as of July 2026. Perfume, The Legend of Kitchen Soldier, You're All Surrounded, My Sweet Mobster, Because This Is My First ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DbAmgoHI4q5/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784544434522-1",
    "slug": "showlo-has-recently-addressed-allegations-that-he-was",
    "title": "#ShowLo has recently addressed allegations that he was ...",
    "summary": "Kim Soo-hyun, Reports allege a past connection between him and the late actress Kim Sae-ron, sparking intense scrutiny.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/TheHiveAsia/posts/showlo-has-recently-addressed-allegations-that-he-was-one-of-the-reasons-why-the/1357493246578308/",
    "date": "2026-07-20",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784544436064-2",
    "slug": "kim-soo-hyun-returns-after-1-year-and-4-months-first-public",
    "title": "Kim Soo-hyun Returns After 1 Year & 4 Months! First Public ...",
    "summary": "Kim Soo-hyun has officially returned to public activities on July 14, after approximately 1 year and 4 months since the controversy that put his career on hold.",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=57mSvnCPvYk",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784544437934-3",
    "slug": "kim-soo-hyun-returns-to-limelight-to-front-philippines",
    "title": "Kim Soo-hyun returns to limelight to front Philippines ...",
    "summary": "South Korean actor Kim Soo-hyun has returned to the limelight.This comes after his year-long controversy involving the late actress Kim Sae-ron, ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "asiaone.com",
    "sourceUrl": "https://www.asiaone.com/entertainment/kim-soo-hyun-returns-bench-endorsement",
    "date": "5 days ago",
    "image": "https://media.asiaone.com/sites/default/files/styles/article_top_image/public/original_images/Jul2026/IMG_5965.jpeg?itok=908-qXa4",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784544440783-4",
    "slug": "lee-si-young-is-no-stranger-to-perseverance-discipline-and",
    "title": "Lee Si Young is no stranger to perseverance, discipline, and ...",
    "summary": "Actress Hwang Hyo-eun's recent candid revelation about her financial struggles while running a clothing store, and her renewed commitment to acting, offers a ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/Dax2JizAE5k/",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784544442842-5",
    "slug": "south-korean-singer-actress-iu-has-petitioned-a-us-federal",
    "title": "South Korean singer-actress IU has petitioned a US federal ...",
    "summary": "Kim Soo Hyun filed a defamation lawsuit against YouTuber Kim Se-ui and the family of late actress Kim Sae-ron, it wasn't just about clearing his name.",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/theonlinecitizen/posts/south-korean-singer-actress-iu-has-petitioned-a-us-federal-court-to-compel-meta-/1485425523620464/",
    "date": "2026-07-20",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784544442962-6",
    "slug": "arirang-news",
    "title": "Arirang News",
    "summary": "Arirang NEWS delivers the latest news on National/Politics, North Korea, Economy, IT/Science, Foreign Policy, World, Life/Culture of the Korea.",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/arirangnews",
    "date": "2026-07-20",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784454482850-1",
    "slug": "for-legal-reasons-all-opinions-are-my-own-and-everything",
    "title": "For legal reasons all opinions are my own and everything ...",
    "summary": "recent audio scandal involving actress Kim Sae Ron and actor Kim Soo Hyun. land Korean Actors With The Biggest Scandals Kim Soo hyun Accused of dating a minor ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/Da6u2tgttm9/",
    "date": "2026-07-19",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784454484811-2",
    "slug": "in-the-dynamic-world-of-south-korean-entertainment",
    "title": "In the dynamic world of South Korean entertainment ...",
    "summary": "THE TRUE COST OF A SCANDAL: KIM SE UI EARNED OVER $400,000 FROM RUINING THE PERFECT IMAGE OF SOUTH KOREA'S MOST PRISTINE ACTOR, KIM SOO HYUN Dearest Gentle ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DazWNCLgB_f/",
    "date": "2026-07-19",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784454486787-3",
    "slug": "chinese-actors-in-korean-actors-together",
    "title": "Chinese Actors in Korean Actors Together",
    "summary": "Discover the stunning similarities between Chinese actress Zhou Ye and Korean actress Lee Hyeri in this trending edit!",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/chinese-actors-in-korean-actors-together?lang",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784454489128-4",
    "slug": "gossip-girl",
    "title": "Gossip Girl",
    "summary": "Gossip Girl is an American teen drama television series created and developed by Josh Schwartz and Stephanie Savage and based on the series of novels of the ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Gossip_Girl",
    "date": "4 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Gossip_girl_titlecard.svg/1280px-Gossip_girl_titlecard.svg.png",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784454489617-5",
    "slug": "come-back-korean-drama-kim-soo-hyun-now",
    "title": "Come back 🥶Korean drama 🇰🇷 Kim Soo Hyun Now ...",
    "summary": "Interest intensified after the arrest and indictment of Garosero Research Institute head Kim Se Ui, who had made claims involving Kim Soo Hyun and the late Kim ...",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/61589975070272/posts/come-back-korean-drama-kim-soo-hyun-now-reviewing-40-scripts-after-return-kim-so/122109787713332502/",
    "date": "2026-07-19",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784454491323-6",
    "slug": "2026-korean-drama-in-netflix",
    "title": "2026 Korean Drama in Netflix",
    "summary": "2026 is an upcoming South Korean action-drama series, releasing June 5, 2026 exclusively on Netflix. It's adapted from the popular webtoon Get Schooled.",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/2026-korean-drama-in-netflix",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784366372483-1",
    "slug": "im-disgusted-by-the-double-standards-in-the-south-korean",
    "title": "I'm disgusted by the double standards in the South Korean ...",
    "summary": "Actor Kim Soo-hyun faced a major controversy over false allegations claiming he had a relationship with the late actress Kim Sae-ron during her minor years.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kdramas/comments/1uxvz4n/im_disgusted_by_the_double_standards_in_the_south/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784366374008-2",
    "slug": "2026-cheating-scandals-which-celebrity-couples-survived",
    "title": "2026 Cheating Scandals: Which Celebrity Couples Survived ...",
    "summary": "Korean actor Kim Soo Hyun. Kim Soo Hyun Deepfake Scandal: Exposing the Truth Behind the Viral AI Defamation",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "cristinaiglesias.com",
    "sourceUrl": "https://cristinaiglesias.com/blog/2026-cheating-scandals-which-celebrity-couples-survived-vs-who-split-for-good/",
    "date": "20 hours ago",
    "image": "https://www.kevinvanpaassen.ca/wp-content/uploads/2026/07/cover-celebrity-couples-who-survived-cheating-scandals-vs-who-split-in-2026-fowt.webp",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784366377669-3",
    "slug": "latest-showbiz-news-and-updates",
    "title": "Latest Showbiz News & Updates",
    "summary": "Get the latest showbiz news, updates on celebrities, movies, music, and more at ABS-CBN. Your ultimate source for all things entertainment.",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "abs-cbn.com",
    "sourceUrl": "https://www.abs-cbn.com/entertainment/showbiz",
    "date": "16 hours ago",
    "image": "https://od2-image-api.abs-cbn.com/prod/od2-ogimage.png?w=1200&amp;h=800",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784366382045-4",
    "slug": "south-korea-bbc-news",
    "title": "South Korea - BBC News",
    "summary": "All the latest content about South Korea from the BBC. Kim Jong Un was meant to be their only idol. K-pop has cut through in the stifling dictatorship.",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "bbc.com",
    "sourceUrl": "https://www.bbc.com/news/topics/cnx753jej1xt",
    "date": "8 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784366384714-5",
    "slug": "and-please-stop-asking-why-were-still-supporting-him-he-has",
    "title": "and please stop asking why we're still supporting him. he has ...",
    "summary": "In a recent press conference, South Korean actor Kim Soo-hyun addressed serious allegations regarding his past relationship with the late actress Kim Sae-ron, ...",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@kdramabear_/video/7662581201022029077",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784366386335-6",
    "slug": "netflix-has-revealed-its-engagement-report-for-the-first-half",
    "title": "Netflix has revealed its Engagement Report for the first half ...",
    "summary": "Netflix has revealed its Engagement Report for the first half of 2026, highlighting the most-watched Korean dramas on the platform worldwide. 💫\"Boyfriend On ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KimYooJungUpdates/posts/netflix-has-revealed-its-engagement-report-for-the-first-half-of-2026-highlighti/122143863873065087/",
    "date": "2026-07-18",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784281956817-1",
    "slug": "before-ane-and-ulian-there-was-and",
    "title": "Before 𝐉𝐚𝐧𝐞 𝐚𝐧𝐝 𝐉𝐮𝐥𝐢𝐚𝐧, there was 𝐌𝐘𝐋𝐄𝐍𝐄 𝐚𝐧𝐝 𝐌 ...",
    "summary": "Finding Her Edge (2026) is a new romantic sports drama series inspired by Jennifer Iacopelli's novel, premiering on Netflix on January 22, 2026.",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@kimsmolina22/video/7663101334597438738",
    "date": "21 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784281958873-2",
    "slug": "murder-club-liars-table-main-trailer-disney-singapore",
    "title": "Murder Club: Liar's Table | Main Trailer | Disney+ Singapore",
    "summary": "A deadly game. A room full of secrets. Zero people you should trust. Stream #MurderClubLiarsTable 29 July on #DisneyPlusSG.",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=QvDMvW4cFuY",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784281961351-3",
    "slug": "video-starz-reveals-highly-anticipated-first-look-at-young",
    "title": "Video: Starz Reveals Highly Anticipated First Look at Young ...",
    "summary": "- July 16, 2026 - STARZ released today an early teaser and first-look images for its upcoming new series \"Power: Origins,\" starring Spence Moore as \"Ghost,\" ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "thefutoncritic.com",
    "sourceUrl": "http://www.thefutoncritic.com/video/2026/07/16/video-starz-reveals-highly-anticipated-first-look-at-young-ghost-and-tommy-in-power-origins-374514/20260716starz01/",
    "date": "11 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784281964185-4",
    "slug": "a-shop-for-killers-season-2-official-trailer-2026",
    "title": "A Shop For Killers Season 2 - Official Trailer (2026)",
    "summary": "Watch the official trailer for A Shop For Killers! Streaming on Hulu July 22, 2026. Adapted from the novel \"Sarinjaui Syopingmol\" by Kang Ji Young.",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=0Wgjbov4DPw",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784281966786-5",
    "slug": "her-smile-her-elegance-how-awesome-is-it-that-we",
    "title": "Her smile!! Her elegance!!! ❤️ How awesome is it that we ...",
    "summary": "Netflix makes a documentary about that one problematic kpop idol. Photo by Disney+ Philippines on June 20, 2026. Catch #MadeInKorea, only on #DisneyPlusPH.",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/Da0SnG5vxVd/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784281968745-6",
    "slug": "this-is-where-the-k-drama-king-the-land-was-filmed",
    "title": "This is where the k-drama King The Land was filmed ...",
    "summary": "King The Land was filmed Hotel Parnas. K-drama 2026 no Disney+ … estreia prevista para 2026 no Disney+,",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@mafe_mgc98/video/7662863612330937608",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784196292088-1",
    "slug": "queenoftears-actor-kim-soo-hyun-receives-a-shocking",
    "title": "#QueenOfTears actor Kim Soo Hyun Receives A Shocking ...",
    "summary": "#QueenOfTears actor Kim Soo Hyun Receives A Shocking Number Of Offers For His Return Actor Kim Soo Hyun has finally resumed activities following his scandal ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/yeppeungudeul/posts/queenoftears-actor-kim-soo-hyun-receives-a-shocking-number-of-offers-for-his-ret/1608754990855353/",
    "date": "2026-07-16",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784196294391-2",
    "slug": "in-the-ever-evolving-landscape-of-korean-entertainment",
    "title": "In the ever-evolving landscape of Korean entertainment ...",
    "summary": "Kim Soo Hyun in a scandal involving the late actress Kim Sae Ron. recent audio scandal involving actress Kim Sae Ron and actor Kim Soo Hyun.",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DauoEUWACoV/",
    "date": "2026-07-16",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784196296756-3",
    "slug": "kim-soo-hyun-is-all-smiles-with-bench-founder-ben-chan",
    "title": "Kim Soo-hyun is all smiles with Bench founder Ben Chan ...",
    "summary": "On Monday, actor Kim Soo-hyun firmly refuted claims from a YouTube channel that he was in a long-term relationship with the late actress Kim Sae-ron.",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/abscbnNEWS/posts/kim-soo-hyun-is-all-smiles-with-bench-founder-ben-chan-who-shared-photos-with-th/1593144966194087/",
    "date": "2026-07-16",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784196298885-4",
    "slug": "in-the-bustling-world-of-korean-entertainment-stars-often",
    "title": "In the bustling world of Korean entertainment, stars often ...",
    "summary": "damaging allegations implicating Kim Soo Hyun in a scandal involving the late actress Kim Sae Ron.",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DanVIypAGmM/",
    "date": "2026-07-16",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784196300901-5",
    "slug": "he-almost-exposed-their-relationship-kdramas",
    "title": "He almost exposed their relationship #kdramas ...",
    "summary": "Kim Ji Won's dating rumors with Yoo Yeon Seok have resurfaced, shaking fans of the \"Queen of Tears\" duo. with Kim Soo Hyun. Joon has unexpectedly been dragged ...",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/kdramafanatis/posts/he-almost-exposed-their-relationship-kdramas-koreandrama-parkseojoon-kimjiwon/986360914405441/",
    "date": "2026-07-16",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784196301246-6",
    "slug": "a-koalas-playground-ill-talk-about-dramas-if-i-want-to",
    "title": "A Koala's Playground - I'll talk about dramas if I want to",
    "summary": "I'll talk about dramas if I want to · K-actor Kim Soo Hyun Officially Resumes Entertainment Activities with Philippines Clothing Brand Bench · K-actor Yoo Ah In ...",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "koalasplayground.com",
    "sourceUrl": "https://koalasplayground.com/",
    "date": "3 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784109470730-1",
    "slug": "tiktok-live-is-becoming-the-latest-stage-for-korean",
    "title": "TikTok Live is becoming the latest stage for Korean ...",
    "summary": "TikTok Live is becoming the latest stage for Korean celebrities. Stars like Yulhee, Lee Dong-gun, Han Chae-young, and Sung Hoon are using the platform to...",
    "category": "trending",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KoreadailyUS/posts/tiktok-live-is-becoming-the-latest-stage-for-korean-celebrities-stars-like-yulhe/1354864960069222/",
    "date": "2026-07-15",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784109472752-2",
    "slug": "what-happened-to-kelly-kim",
    "title": "What Happened to Kelly Kim?",
    "summary": "But lately people have noticed a dramatic change in her appearance. Many say she's looking much thinner and more fragile than before. Comments like in K-pop? ...",
    "category": "trending",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaytnxuyO_r/",
    "date": "2026-07-15",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784109474530-3",
    "slug": "the-entire-fandom-woke-up-to-news-nobody-was-ready-for",
    "title": "The entire fandom woke up to news nobody was ready for ...",
    "summary": "[Korean celebrity breakup, IU and Lee Jong Suk, IU breakup news, Lee Jong Suk latest news, K-drama news, Korean entertainment, K-celeb updates, K-drama fans]",
    "category": "trending",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DanccOBpNLm/",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784109476529-4",
    "slug": "k-pop-star-iu-and-actor-lee-jong-suk-have-reportedly",
    "title": "K-pop star IU and actor Lee Jong Suk have reportedly ...",
    "summary": "IU and actor Lee Jong Suk have reportedly ended their relationship after about four years together. The couple confirmed their relationship in 2022 and had ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DamuGO5ITj9/",
    "date": "2026-07-15",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784109478212-5",
    "slug": "for-legal-reasons-all-opinions-are-my-own-and-everything-is",
    "title": "For legal reasons all opinions are my own and everything is ...",
    "summary": "K-content fans, listen up! A brand new celeb couple with an 18-year age gap has just been revealed! It's actress Yoon Gai and musician Chang Kiha! They first ...",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/Dawms2wtgA6/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784109478963-6",
    "slug": "iu-and-lee-jong-suk-confirm-breakup-after-4-years",
    "title": "IU and Lee Jong Suk confirm breakup after 4 years",
    "summary": "IU and actor Lee Jong Suk. Suspicions that the couple secretly broke up after a gathering with friends.",
    "category": "trending",
    "author": "Rina Baek",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/gmanews/posts/iu-and-lee-jong-suk-confirm-breakup-after-4-years-gma-news-feedsinger-actress-iu/1598520228986295/",
    "date": "2026-07-15",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784022829934-1",
    "slug": "s-korean-ex-child-actors-speak-out-on-corruption-low-pay",
    "title": "S. Korean ex-child actors speak out on corruption, low pay ...",
    "summary": "Korean ex-child actors speak out on corruption, low pay and violence. Public Korea Erupts Over Actors' Sky-High Salaries. Kim Soo -hyun's with a minor.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/nstonline/posts/showbiz-s-korean-ex-child-actors-speak-out-on-corruption-low-pay-and-violence/1483341207160780/",
    "date": "2026-07-14",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784022832148-2",
    "slug": "rkdrama",
    "title": "r/KDRAMA",
    "summary": "r/KDRAMA: Welcome! This is a place for discussions about your favorite Korean dramas (current and past), drama reviews, official soundtracks, news…",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/KDRAMA/",
    "date": "2026-07-14",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784022834025-3",
    "slug": "article-live-1784022834025-3",
    "title": "مسلسل كوري مشهور يثير الجدل",
    "summary": "Kim Soo Hyun loses title as South Korea's highest-paid actor to Park Hyung Sik following underage dating controversy Kim Soo Hyun has reportedly lost his ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/932067523859113/posts/2849354828797030/",
    "date": "2026-07-14",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1784022835872-4",
    "slug": "kim-woo-bin",
    "title": "Kim Woo-bin",
    "summary": "Kim Woo-bin (김우빈), is a South Korean actor and model. He began his career as a runway model and made his acting debut in the television drama White ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Kim_Woo-bin",
    "date": "6 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Kim_Woo-bin_in_March_2024.jpg/960px-Kim_Woo-bin_in_March_2024.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784022838272-5",
    "slug": "meet-kang-hanna-the-ultra-rich-better-late-than-single",
    "title": "Meet Kang Hanna, the ultra-rich Better Late Than Single ...",
    "summary": "Kang Hanna is a big-name Korean actress ... For all the latest reality TV cast member news, scandals, gossip and updates – like Reality Shrine on Facebook.",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "thetab.com",
    "sourceUrl": "https://thetab.com/realityshrine/2026/07/07/meet-kang-hanna-ultra-rich-panelist-on-better-late-than-single-who-built-wealth-on-her-own/",
    "date": "7 days ago",
    "image": "https://cdn.realitytvshrine.com/uploads/2026/07/Ored-Featured-Reality-Shrine-34.png",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1784022838762-6",
    "slug": "news",
    "title": "News",
    "summary": "Korea posts record-high current account surplus in May on strong chip exports. 2026-07-08 17:00:00 KST. 02:16 · Inside Korean chip mega-cluster construction site ...",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "m.arirang.com",
    "sourceUrl": "https://m.arirang.com/news",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783961836276-1",
    "slug": "disney-bets-on-a-shop-for-killers-sequel-to-break-netflix",
    "title": "Disney+ bets on 'A Shop for Killers' sequel to break Netflix ...",
    "summary": "The Disney+ original series \"A Shop for Killers\" returns for a second season on July 22, two-and-a-half years after its debut. The platform expects...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "koreatimes.co.kr",
    "sourceUrl": "https://www.koreatimes.co.kr/entertainment/shows-dramas/20260713/disney-bets-on-a-shop-for-killers-sequel-to-break-netflix-winning-streak",
    "date": "12 hours ago",
    "image": "https://newsimg.koreatimes.co.kr/2026/07/13/5bee5d69-8848-44e0-b9d4-440ca3790e42.png",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783961839444-2",
    "slug": "the-first-half-of-2026-has-been-a-strong-one-for-k-dramas",
    "title": "The first half of 2026 has been a strong one for K-dramas. ...",
    "summary": "Upcoming Korean Dramas In July 2026. Which drama are you anticipating the most? Love In Sync - 04/07 (Disney+) Goblin 10th Anniversary - 04/ ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/Das4YKmDZRw/",
    "date": "2026-07-13",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783961841848-3",
    "slug": "ji-chang-wook-em-2026-tres-lancamentos-imperdiveis-o",
    "title": "Ji Chang-wook em 2026: Três Lançamentos Imperdíveis O ...",
    "summary": "The Scandal (Netflix) – Romance Proibido na Era Joseon · Estreia: 3º trimestre de 2026. · O que esperar: Um sageuk (drama histórico) eletrizante, onde Ji ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/Datpx3ARhQw/",
    "date": "9 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783961844008-4",
    "slug": "new-ott-releases-this-week-july-13-19-2026",
    "title": "New OTT releases this week (July 13-19, 2026)",
    "summary": "New OTT releases this week (July 13-19, 2026): The Hawk, Ready or Not 2, Heartstopper Forever- 6 new titles coming on Netflix, JioHotstar and more. GyeonSeong ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/WIONews/posts/new-ott-releases-this-week-july-13-19-2026-the-hawk-ready-or-not-2-heartstopper-/1392058149700022/",
    "date": "2026-07-13",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783961844274-5",
    "slug": "check-pin-comment-for-details-wtfamy-all-credit-goes",
    "title": "Check Pin Comment For DETAILS @w.t.f.amy All Credit Goes ...",
    "summary": "Upcoming Dramas of July 2026 On Netflix, Prime Video, Disney plus, ... The Husband Korean drama on July 4th on Disney+. And on July 4th itself, a Korean ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaqQKuYSplP/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783961844683-6",
    "slug": "5-estreias-de-streaming-para-ver-neste-fim-de-semana-de",
    "title": "5 estreias de streaming para ver neste fim de semana de ...",
    "summary": "Aqui vão as 5 novidades de streaming para ver neste fim de semana, seguidas de uma seleção mais ampla de filmes e séries para descobrir em julho de 2026. As 5 ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "sortiraparis.com",
    "sourceUrl": "https://www.sortiraparis.com/pt/o-que-fazer-em-paris/cinema-serie/guides/313146-5-novidades-em-streaming-para-ver-neste-fim-de-semana-de-17-a-19-de-julho-de-2026",
    "date": "6 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783856671537-1",
    "slug": "tom-key-peele-cruise",
    "title": "Tom Key Peele Cruise !",
    "summary": "JULY 9, 2026 2026 EMMY NOMINATIONS LIST EMERGENCY ROOM DRAMA 'THE PITT' LEADS THIS YEAR'S EMMY NOMINATIONS WITH 25 VOTES THE FINAL SEASON OF HACKS EARNS 24 ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaoVqochIDA/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783856673630-2",
    "slug": "the-year-is-2005-the-movie-is-zathura-a-space-adventure",
    "title": "The year is 2005. The movie is Zathura: A Space Adventure ...",
    "summary": "The year is 2005. The movie is Zathura: A Space Adventure. And the comedic performance of a lifetime is Kristen Stewart's. original sound - Netflix.",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@netflix/video/7661333550146276622",
    "date": "14 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783856675507-3",
    "slug": "one-of-the-best-chemistry-in-kdrama-land-jung-haein-and-son",
    "title": "One of the best chemistry in Kdrama land Jung Haein & Son ...",
    "summary": "14K likes, 193 comments - haeiness_pk on July 8, 2026: \"One of the best chemistry in Kdrama land Jung Haein & Son Yejin in Something in the rain.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/Dai137ZOn8o/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783856677489-4",
    "slug": "the-best-netflix-movies-no-one-is-watching-2026",
    "title": "The Best NETFLIX MOVIES No One is Watching! 2026",
    "summary": "15 Most Addictive TV Series of 2026 (So Far) on Netflix · 10 Most Intense ACTION MOVIES Of 2026 So Far You Can't Miss! · 10 Best Action Movies Netflix Is Hiding ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=tELxMAdmIa8",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783856679701-5",
    "slug": "andrew-yang-on-instagram-hopefully-they-never-need-to",
    "title": "Andrew Yang on Instagram: \"Hopefully they never need to ...",
    "summary": "The internet was flooded with reactions this week after @netflix released its latest breakout series, with clips, theories, and scene breakdowns quickly ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaoLP7QSw2s/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783856681875-6",
    "slug": "one-of-the-best-action-k-dramas-in-recent-years-kalau-belum",
    "title": "One of the best action K-dramas in recent years🔥 Kalau belum ...",
    "summary": "Perfect Crown adalah drama Korea romantis terbaru yang tayang perdana pada 10 April 2026 di saluran MBC dan platform streaming Disney+. • Pemeran Utama ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@allaboutmovies.id/video/7660505099860479239",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783769560019-1",
    "slug": "anita-joseph-caught-stealing-caramell-plug-photo-and-editing",
    "title": "Anita Joseph Caught Stealing Caramell Plug Photo & Editing ...",
    "summary": "Anita Joseph under fire after Caramell Plug publicly called her out for allegedly editing her out of a shared photo and inserting her own face.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=QZojnWqygN8",
    "date": "22 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783769563059-2",
    "slug": "kaya-mo-yan-glaiza-de-castro-icearago",
    "title": "Kaya mo yan, @Glaiza De Castro 🫶 | icearago",
    "summary": "Viral Scandal Video. Ramos and Sam Verzosa have officially ended their relationship, and fans are eager to know the details behind their breakup. The news has ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@whianwamos_/video/7660148150895906055",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783769565025-3",
    "slug": "the-stakes-are-higher-this-time-jeong-jinman-and-jian",
    "title": "The stakes are higher this time 💥 Jeong Jinman and Jian ...",
    "summary": "The stakes are higher this time Jeong Jinman and Jian return in #AShopForKillers Season 2, premiering 22 July on #DisneyPlusSG. · original sound - Cinemags.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@disneyplussg/video/7659630922093825293",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783769566740-4",
    "slug": "top-ten-best-series-of-2026-so-far-disney-plus-netflix",
    "title": "Top Ten Best Series of 2026 - So Far! - Disney Plus, Netflix ...",
    "summary": "Top Ten Series of 2026 today! Beyond The Trailer's best streaming shows from Hollywood! So Far! How shows rank?! Beef!",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=sTes3CYDp5g",
    "date": "21 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783769568716-5",
    "slug": "top-7-new-tv-series-to-watch-right-now-2026",
    "title": "Top 7 NEW TV SERIES To Watch Right Now 2026!",
    "summary": "Top 7 NEW TV SERIES To Watch Right Now 2026! Chapters: 00:00 - Intro 00:31 - The Terror: Devil in Silver 01:28 - I Will Find You 02:22 - Your Friends ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=1teRNgdz5yI",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783769571212-6",
    "slug": "netflix-our-sticky-love-official-teaser-premieres-august-7-r",
    "title": "Netflix 'Our Sticky Love' Official Teaser (Premieres August 7) : r ...",
    "summary": "Welcome! This is a place for discussions about your favorite Korean dramas (current and past), drama reviews, official soundtracks, news, award shows and more.",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/KDRAMA/comments/1us7l0q/netflix_our_sticky_love_official_teaser_premieres/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783701303772-1",
    "slug": "top-10-new-korean-series-of-2026-so-far",
    "title": "Top 10 New Korean Series of 2026 So Far",
    "summary": "Top 10 New Korean Series of 2026 So Far | Must-Watch on Netflix, Prime Video & HBO Max Hello and Welcome to Asian Odyssey. 2026 has already given us plenty ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=kDHFVKkl4o0",
    "date": "5 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783701306734-2",
    "slug": "namastehallyu",
    "title": "namastehallyu",
    "summary": "Kdramas which are going to release in July 2026 are: The Husband (July 4, Disney+, Eps: 12) Love In Sync (July 4, Disney+, Eps: 8) Family Register ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DanTDHTDHbw/",
    "date": "2026-07-10",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783701308510-3",
    "slug": "lee-jongsuk-and-iu-chose-to-break-up-after-almost-4-years-of",
    "title": "Lee Jongsuk and IU chose to break up after almost 4 years of ...",
    "summary": "Breaking news: IU and LeeJongsuk broke up after 4 years of being in a relationship #iu #leejongsuk #kdrama #kpop #perfectcrown · 10 hours ago. OCR.",
    "category": "trending",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DamZMv9RXz-/",
    "date": "59 minutes ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783701310343-4",
    "slug": "tamannaahbhatia-the-only-indian-face-a-150-year-old",
    "title": "#TamannaahBhatia, the only Indian face a 150-year-old ...",
    "summary": "Actress Tamannaah Bhatia made a glamorous public appearance at the Shiseido beauty event in Bangkok on July 4, 2026 (or very recently). She posed alongside K- ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaWB2O0x2Ve/",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783701312141-5",
    "slug": "little-bit-less-than-a-lover-jennie-take-down-mad",
    "title": "LITTLE BIT LESS THAN A LOVER JENNIE TAKE DOWN MAD ...",
    "summary": "Jisoo is known for her clear vocals and acting skills, Jennie for her powerful rap and stage presence, Rosé for her emotional singing voice, and Lisa for her ...",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@ninikim_narah28/video/7660720138156641556",
    "date": "14 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783701312750-6",
    "slug": "omgggg-leejongsuk-iu-kdramalovers-koreanactors",
    "title": "OMGGGG #leejongsuk #IU #Kdramalovers #koreanactors ...",
    "summary": "Leading the pack is **IU (Lee Ji Eun)**, consistently delivering memorable roles in dramas like 'What the Stars Told Us' (11/10) and 'Scarlet Heart' (10/10), ...",
    "category": "trending",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@dayichingu/video/7660749901592071445",
    "date": "12 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783616807099-1",
    "slug": "top-10-most-anticipated-disney-plus-k-dramas-coming-in-2026",
    "title": "Top 10 Most Anticipated Disney Plus K-Dramas Coming in 2026 ...",
    "summary": "The second half of 2026 is packed with some of the biggest Disney+ Korean dramas we've been waiting for! In this video, we're recommend the Top 10 Most ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=97_7RP41Ah0",
    "date": "11 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783616810043-2",
    "slug": "all-the-exciting-korean-dramas-dropping-on-disney-in-2026",
    "title": "All the exciting Korean dramas dropping on Disney+ in 2026",
    "summary": "All the exciting Korean dramas dropping on Disney+ in 2026 1. Made in Korea 2. A Shop for Killers (Season 2) 3. Battle of Fates 4. Perfect Crown 5. Gold Land 6 ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "herworld.com",
    "sourceUrl": "https://www.herworld.com/life/best-new-korean-tv-series-k-dramas-2026-disney-plus",
    "date": "2 days ago",
    "image": "https://cassette.sphdigital.com.sg/image/herworld/1647a6061a03dd83560e29f5796b6d8f2f3acea875e51e4f08be88aa1775ec9a",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783616814609-3",
    "slug": "all-the-korean-dramas-releasing-in-july-2026-updated-list",
    "title": "All the Korean dramas releasing in July 2026 (Updated List). + ...",
    "summary": "▪️Here are the 6 newest kdramas and series that will air in the month of July: 1. Disney+ #ShadowDetective2 - July 5th 2. ENA Channel #NotOthers - July 17th 3.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KdramasNightAndDay/posts/all-the-korean-dramas-releasing-in-july-2026-updated-list-where-to-watch-them2-n/1354037433502989/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783616816879-4",
    "slug": "the-east-palace-instagram",
    "title": "The East palace - Instagram",
    "summary": "New upcoming Korean Drama In July You cannot miss in July 2026 A Shop For Killers season 2 (July) Love in Sync (July 4) Dream to You (July 13) The Apartment ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DacT4aMjWod/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783616818861-5",
    "slug": "upcoming-k-drama-in-july-2026-instagram",
    "title": "Upcoming K-DRAMA in July 2026 - Instagram",
    "summary": "If I talk about Netflix, Nam Joo-hyuk's most awaited drama, 'The East Palace,' is releasing on July 17. After that, actress Park Gyu-young's second drama of the ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DahFHEgJC9h/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783616819157-6",
    "slug": "netflixs-upcoming-k-dramas-are-highly-anticipated-facebook",
    "title": "Netflix's upcoming K-dramas are highly anticipated - Facebook",
    "summary": "K-Dramas coming soon on Netflix. \"Can This Love Be Translated\" \"Boyfriend On Demand\" \"East Palace\" \"The WonderFools\" As confirmed ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/261711786611176/posts/1056195763829437/",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783516734068-1",
    "slug": "new-on-disney-july-2026",
    "title": "New on Disney+ | July 2026",
    "summary": "Here's a sneak peek at what's coming to Disney+ and Hulu on Disney+ for bundle subscribers in July 2026: July 1 – X-Men '97 (Season 2 | Premiere) July 2 ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=mDTmPsIE1sM",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783516736966-2",
    "slug": "questions-will-be-answered-soon-before-your-next",
    "title": "Questions will be answered soon. Before your next ...",
    "summary": "Questions will be answered soon. Before your next assignment, review the first 3 episodes of #AShopForKillersS1 on YouTube, then catch the rest on #DisneyPlusPH ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@disneyplusph/video/7659554946777369869",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783516739073-3",
    "slug": "a-shop-for-killers-season-2-main-trailer-disney-singapore",
    "title": "A Shop For Killers Season 2 | Main Trailer | Disney+ Singapore",
    "summary": "The stakes are higher this time Jeong Jinman and Jian return in #AShopForKillers Season 2, premiering 22 July on #DisneyPlusSG.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=nAi7-LpeoBE",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783516741512-4",
    "slug": "fact-gold-land-20262026-written-by-hwang-jo-yoon",
    "title": "Fact: Gold Land (2026–2026) — Written by Hwang Jo-yoon ...",
    "summary": "Informasi Gold Land (2026) : ‌Type: TV Series ‌Status: Ongoing ‌Season: 1 ‌Episode Count: 10 ‌First Air Date: April 29th, 2026 ‌Country: South Korea",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/Daa0RfAhEQc/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783516743852-5",
    "slug": "descendants-wicked-wonderland-official-trailer-available",
    "title": "Descendants: Wicked Wonderland | Official Trailer | Available ...",
    "summary": "Down the rabbit hole they go ✨ Descendants: #WickedWonderland premieres July 17 on @DisneyPlusCA.",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=VmPiwIVcvqU",
    "date": "23 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783516746633-6",
    "slug": "bts-final-of-tophs-grand-entrance-avatar-the-last",
    "title": "BTS → final of Toph's grand entrance 📺 AVATAR: THE LAST ...",
    "summary": "At its core, it follows a privileged New Yorker, Piper Chapman, who is sentenced to a minimum-security women's prison due to a past crime involving drug ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@netflixgeeked/video/7657559917137530126",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783442649014-1",
    "slug": "netflixs-upcoming-k-drama-kin-and-sin-wrapped-filming",
    "title": "Netflix's upcoming K-drama KIN AND SIN wrapped filming ...",
    "summary": "Netflix's upcoming K-drama KIN AND SIN wrapped filming in June 2026. While there is no official confirmation of a release date, it has been reported that...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/whatsonnetflix/posts/netflixs-upcoming-k-drama-kin-and-sin-wrapped-filming-in-june-2026-while-there-i/1481491417325513/",
    "date": "2026-07-07",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783442651503-2",
    "slug": "upcoming-k-dramas-for-july-2026-0407-love-in-sync",
    "title": "Upcoming K-Drama's for July 2026 🥰 04/07: Love In Sync ...",
    "summary": "Upcoming K-Drama's for July 2026 04/07: Love In Sync (U+Mobile/Disney+) 04/07: The Husband (KBS2/Disney+) 06/07: Family Register (MBC/Kocowa+)",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaQ4fL_ubDq/",
    "date": "2026-07-07",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783442653820-3",
    "slug": "disney-builds-k-drama-momentum-as-netflix-deal-news",
    "title": "Disney Builds K-Drama Momentum as Netflix Deal News ...",
    "summary": "The outlet says Disney's growing investments in Korean drama have produced some of its most welcome surprises of 2026, with Perfect Crown cited as a standout.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "kentertechhub.com",
    "sourceUrl": "https://www.kentertechhub.com/disney-builds-k-drama-momentum-as-netflix-deal-news-fades/",
    "date": "לפני 6 ימים",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783442656047-4",
    "slug": "every-k-drama-coming-to-netflix-hulu-and-more-in-july",
    "title": "Every K-Drama Coming To Netflix, Hulu, And More In July ...",
    "summary": "The Husband. K-Dramas Releasing in July 2026 The Husband. Where to Stream: Disney+/Hulu (July 9) ; Love In Sync. K-Dramas Releasing in July 2026 Love in Sync.",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "screenrant.com",
    "sourceUrl": "https://screenrant.com/every-k-drama-netflix-hulu-viki-streaming-july-2026/",
    "date": "לפני יומיים (2)",
    "image": "https://static0.srcdn.com/wordpress/wp-content/uploads/2026/07/k-dramas-coming-out-july-2026.png?w=1600&amp;h=900&amp;fit=crop",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783442659824-5",
    "slug": "10-most-bingeable-k-dramas-of-2026-so-far",
    "title": "10 most bingeable K-dramas of 2026 so far",
    "summary": "From body-swap comedies to dark legal thrillers, 2026 has already delivered some of the most bingeable K-dramas in years — here are the 10 Korean series you ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "tatlerasia.com",
    "sourceUrl": "https://www.tatlerasia.com/lifestyle/entertainment/most-bingeable-k-dramas-2026",
    "date": "לפני 11 שעות",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783442660008-6",
    "slug": "10-upcoming-k-dramas-in-2026-you-cant-miss",
    "title": "10 Upcoming K-Dramas In 2026 You Can't Miss",
    "summary": "Here is our list of 10 K-dramas we're looking forward to watching in 2026. 1. Can This Love Be Translated? Director: Yoo Young-eun Where To Watch: Netflix ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "imdb.com",
    "sourceUrl": "https://www.imdb.com/de/news/ni65641464/",
    "date": "לפני 6 ימים",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783360532930-1",
    "slug": "2026-box-office-supergirl-2nd-weekend-drop-74-james",
    "title": "2026 Box Office - Supergirl 2nd Weekend Drop 74%, James ...",
    "summary": "2026 Box Office Breakdown today! a look at Netflix, Disney Plus, Apple TV, Max, Peacock and more!",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=uQoiP1ZeUxs",
    "date": "18 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783360537143-2",
    "slug": "series-pritam-and-pedro-2026-pritam-and-pedro-is-a",
    "title": "Series: Pritam and Pedro (2026) Pritam and Pedro is a ...",
    "summary": "Releasing on 10 July on Netflix Ikka is a legal thriller that follows Sikandar Mehra, a celebrated defense lawyer who is forced to defend",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaXzCmRiYNn/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783360539619-3",
    "slug": "netflix-the-east-palace-official-trailer-premieres-july-17-r",
    "title": "Netflix 'The East Palace' Official Trailer (Premieres July 17) : r ...",
    "summary": "Netflix 'The East Palace' Official Trailer (Premieres July 17) actors and supernatural thriller premises,",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/KDRAMA/comments/1uk5yna/netflix_the_east_palace_official_trailer/",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783360541370-4",
    "slug": "my-all-time-favorite-couple-thenextprince",
    "title": "my all time favorite couple💕 #TheNextPrince ...",
    "summary": "Perfect Crown (2026) is a highly anticipated Korean romantic-political drama airing from April 10, 2026, on MBC and Disney+. Starring IU and Byeon Woo-seok,",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@iqiyius/video/7658331884736269584",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783360543669-5",
    "slug": "is-that-rupunzel-and-flynn-rider-this-is-us-20162022-the",
    "title": "is that Rupunzel and Flynn Rider This Is Us (2016–2022): The ...",
    "summary": "12K likes, 68 comments - netflixnmovies on July 5, 2026: \"is that Rupunzel and Flynn Rider This Is Us (2016–2022): The lives of the Pearson family unfold ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DabNQ9Vhzam/",
    "date": "21 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783360545577-6",
    "slug": "july-releases-on-prime-video-hbo-netflix-disney-and",
    "title": "JULY Releases on Prime Video, HBO, Netflix, Disney, and ...",
    "summary": "The biggest streaming and cinema premieres of July 2026. Netflix, HBO Max, Disney Plus, Disney+ Releases in July 2026",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=N_Z9U9XVMo4",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783255786713-1",
    "slug": "best-2026-korean-dramas-so-far-with-details",
    "title": "BEST 2026 Korean Dramas So Far (With Details!)",
    "summary": "Missed some of the biggest and best Kdramas of 2026? We've got you covered! From heart-fluttering romances and thrilling crime mysteries to action-packed ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=3R0Co_genrI",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783255789302-2",
    "slug": "agent-kim-reactivated-sneak-peek-netflix-eng-sub",
    "title": "Agent Kim Reactivated | SNEAK PEEK | Netflix [ENG SUB]",
    "summary": "When an unassuming dad's daughter goes missing, he dusts off his old black-ops skills to track her down — only to attract the wrong kind of attention.",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=9qomDfZD4jU",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783255791897-3",
    "slug": "7-new-series-that-will-have-you-hooked-in-july-2026",
    "title": "7 NEW Series That Will Have You Hooked in JULY 2026",
    "summary": "If you're looking for your next binge, these are the seven new and returning series arriving in July 2026 that I think have the best chance of completely ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=v51nauSwJqk",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783255794285-4",
    "slug": "when-their-hands-meet-love-gets-a-little-spooky-park-eun-bin",
    "title": "when their hands meet, love gets a little spooky. Park Eun-bin ...",
    "summary": "Park Eun-bin and Yang Se-jong's dangerous romance. occult romance series <Spooky in Love> is coming july 18, only on netflix. #오싹한연애 #SpookyInLove #kdrama ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@netflixkr/video/7657721169583295764",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783255796119-5",
    "slug": "top-tv-shows-premiering-in-july-2026-rotten-tomatoes-tv",
    "title": "Top TV Shows Premiering in July 2026 | Rotten Tomatoes TV",
    "summary": "Check out trailers for the hot new and returning TV shows coming out in July 2026! ▻ Learn more on Rotten Tomatoes: https://www.rottentoma.",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=nhDhY6VT8u8",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783255798134-6",
    "slug": "notes-from-the-last-row-kdrama-guide-and-where-to-watch",
    "title": "Notes From the Last Row — Kdrama guide and where to watch",
    "summary": "This brief guide summarizes key search terms and viewing tips for Notes From the Last Row (맨끝줄소년), a Korean drama frequently tagged as ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@netflixkr/video/7656988464046476562",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783166322542-1",
    "slug": "korean-actor-scandal-news-tiktok",
    "title": "Korean Actor Scandal News | TikTok",
    "summary": "Kim Soo Hyun Faces Major Lawsuits and Disney+ Delays. Discover the shocking scandal involving Kim Soo Hyun and the impact on his drama release.",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/korean-actor-scandal-news",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783166324533-2",
    "slug": "top-10-new-korean-dramas-coming-in-july-2026-with-trailers",
    "title": "Top 10 NEW Korean Dramas Coming in JULY 2026 | With Trailers!",
    "summary": "... Korean dramas has something for every K-Drama fan. These latest series are available on Netflix, Disney+, tvN, SBS, MBC, ENA, and more. Whether you're ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=R4dpZRAFJdg",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783166327004-3",
    "slug": "were-already-halfway-through-2026-how-many-dramas-have-you",
    "title": "We're already halfway through 2026. How many dramas have you ...",
    "summary": "Can This Love Be Translated? The Art of Sarah. Boyfriend on Demand. Bloodhounds 2. Girigo. The Wonder Fools. Teach You a Lesson. Notes from the Last Row.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/kdramas/comments/1uiiuyo/were_already_halfway_through_2026_how_many_dramas/",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783166328525-4",
    "slug": "5-new-k-dramas-in-june-2026-to-add-to-your-watch-list-inkistyle",
    "title": "5 New K-Dramas In June 2026 To Add To Your Watch List - InkiStyle",
    "summary": "Teach You a Lesson (Kim Moo-Yul) · June 5, 2026 · Netflix · All episodes released on Friday ; See You at Work Tomorrow (Seo In-Guk, Park Ji-Hyun) · June 22, 2026 ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "inkistyle.com",
    "sourceUrl": "https://inkistyle.com/new-korean-dramas-june-2026/",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783166328601-5",
    "slug": "so-glad-to-meet-you-at-central-tamanaah-bhatia",
    "title": "So glad to meet you at Central ❤️ TAMANAAH BHATIA ...",
    "summary": "Bollywood star Tamannaah Bhatia and K-pop icon Lisa recently met in Bangkok at the ULTIMUNE Studio pop-up event hosted by Shiseido at CentralWorld. #lisa # ...",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaVb1b8uAml/",
    "date": "1 hour ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783166331028-6",
    "slug": "mothership-on-instagram-shes-just-casually-aging",
    "title": "Mothership on Instagram: \"she's just casually aging ...",
    "summary": "Fiona Xie was a Mediacorp actress from 2001 to 2009 and became known overseas for her portrayal of Kitty Pong in \"Crazy Rich Asians\". She was recently featured ...",
    "category": "trending",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaR6k_GP7-B/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783092927612-1",
    "slug": "10-of-the-best-new-k-dramas-to-watch-in-july-2026",
    "title": "10 of the best new K-dramas to watch in July 2026",
    "summary": "10 of the best new K-dramas to watch in July 2026, including The East Palace on Netflix · 1. Love in Sync · 2. The Husband · 3. Family Register · 4. The Apartment ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "scmp.com",
    "sourceUrl": "https://www.scmp.com/lifestyle/k-drama/k-drama/article/3358451/10-best-new-k-dramas-watch-july-2026-including-east-palace-netflix",
    "date": "4 days ago",
    "image": "https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_generic/public/d8/images/canvas/2026/06/29/788cac4d-db65-4a7c-8a78-59709a4e7569_0b63a7c9.jpg?itok=c55rs_Bq&amp;v=1782702187",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783092930087-2",
    "slug": "disneys-k-drama-breakout-turns-up-heat-on-netflixs",
    "title": "Disney's K-Drama Breakout Turns Up Heat on Netflix's ...",
    "summary": "The Hollywood Reporter reports that Perfect Crown has delivered Disney+'s biggest K-drama debut to date after launching on April 10, giving Disney a timely ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "kentertechhub.com",
    "sourceUrl": "https://www.kentertechhub.com/disneys-k-drama-breakout-turns-up-heat-on-netflixs-korea-strategy/",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783092933618-3",
    "slug": "popular-k-drama-star-ham-so-won-has-been-hospitalized-following",
    "title": "Popular K-Drama star Ham So-won has been hospitalized following ...",
    "summary": "110 likes, 11 comments - zoomtv on July 3, 2026: \"Popular K-Drama star Ham So-won has been hospitalized following a sudden and frightening car crash.",
    "category": "trending",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaU9Mbygm7n/",
    "date": "2 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783092935378-4",
    "slug": "no-one-expected-this-collaboration-kim-nam-gil-one-of-koreas",
    "title": "No one expected this collaboration. Kim Nam-gil, one of Korea's ...",
    "summary": "On a warm June evening in Uijeongbu, Gyeonggi Province, a performance unfolded that would soon be etched in the memories of K-pop fans across South Korea and ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaSjb7CBd4x/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783092935630-5",
    "slug": "korean-american-voice-actress-arden-cho-of-kpop-demon-hunters",
    "title": "Korean American voice actress Arden Cho of 'KPop Demon Hunters ...",
    "summary": "Korean American voice actress Arden Cho of 'KPop Demon Hunters' and her longtime sweetheart Christoper Lee have tied the knot in Italy.",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/nstonline/posts/showbiz-korean-american-voice-actress-arden-cho-of-kpop-demon-hunters-and-her-lo/1474323554729212/",
    "date": "4 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783092935841-6",
    "slug": "makeover-inspired-by-moving-actor-the-reality-series-idol-maker",
    "title": "Makeover inspired by 'Moving' actor The reality series \"Idol Maker ...",
    "summary": "Go Youn Jung has left fans stunned with a dramatic transformation for her latest role in the romantic drama Can This Love Be Translated, showcasing her ...",
    "category": "trending",
    "author": "Rina Baek",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KoreaClickers/posts/makeover-inspired-by-moving-actorthe-reality-series-idol-maker-transforms-global/1485413896958791/",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783007801329-1",
    "slug": "engfa-has-spoken-out-denying-the-rumors-that-she-is-dating-reddit",
    "title": "Engfa has spoken out denying the rumors that she is dating ... - Reddit",
    "summary": "Because, for all, I know, Nawat might be seeing and reading this and I'm not giving him any more of my time and energy. Back to my excellent Korean show, Flower ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "reddit.com",
    "sourceUrl": "https://www.reddit.com/r/ThaiGL/comments/1uh6wbk/engfa_has_spoken_out_denying_the_rumors_that_she/",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783007803494-2",
    "slug": "upcoming-dramas-of-july-2026-on-netflix-prime-video-disney-plus",
    "title": "Upcoming Dramas of July 2026 On Netflix, Prime Video, Disney plus ...",
    "summary": "Spooky In Love on Netflix on July 18th. The Husband Korean drama on July 4th on Disney+. And on July 4th itself, a Korean drama named He Love in Sync on Disney+ ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaLWALYTXhQ/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783007805573-3",
    "slug": "8-new-kdramas-to-watch-in-july-2026-netflix-disney-plus-forbes",
    "title": "8 New KDramas To Watch In July 2026: Netflix, Disney Plus - Forbes",
    "summary": "Summary · The Husband: July 4, KBS2 / Disney+ · Family Relationship Certificate/Family Register: July 6, MBC · Dream to You/Dear to You: July 13, ENA · Spooky in ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "forbes.com",
    "sourceUrl": "https://www.forbes.com/sites/hannahabraham/2026/06/30/8-new-kdramas-to-watch-in-july-2026-netflix-disney-plus/",
    "date": "2 days ago",
    "image": "https://imageio.forbes.com/specials-images/imageserve/6a4418bf95fc6cfcf645ec5b/0x0.jpg?format=jpg&amp;height=900&amp;width=1600&amp;fit=bounds",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1783007809533-4",
    "slug": "july-2026-korean-drama-premieres-on-disney-hulu-and-netflix",
    "title": "July 2026 Korean drama premieres on Disney, Hulu, and Netflix",
    "summary": "JULY 2026 Korean drama premieres: \"The Husband\" (July 4) — Namkoong Min, Lee Seol, Kim Dae-myung Where to watch: Disney+ / Hulu \"Love in Sync\" (July...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/groups/6626236890731516/posts/27759070167021548/",
    "date": "18 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783007812764-5",
    "slug": "new-k-dramas-for-july-2026-where-to-watch-0407-love-in-sync",
    "title": "New K-Drama's for July 2026 Where to watch? 04/07: Love In Sync ...",
    "summary": "New K-Drama's for July 2026 Where to watch? 04/07: Love In Sync (U+Mobile/Disney+) 04/07: The Husband (KBS2/Disney+) 06/07: Family Register (MBC/Kocowa+)",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaQqthtuCMd/",
    "date": "21 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1783007814841-6",
    "slug": "korean-dramas-for-july-2026-july-4-thehusband-disney-july-4",
    "title": "Korean Dramas for July 2026 July 4: #TheHusband - Disney+ July 4",
    "summary": "Upcoming K-Dramas Premiering on Netflix in 2026: 1. The Wonderfools 2. Bloodhounds S2 3. Show Business 4. East Palace 5. Boyfriend On Demand 6. The Art Of ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KDramaBuddiesPh/posts/korean-dramas-for-july-2026july-4-thehusband-disneyjuly-4-loveinsync-disneyjuly-/1011823401204269/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782924194435-1",
    "slug": "the-east-palace-official-trailer-netflix-eng-sub-youtube",
    "title": "The East Palace | Official Trailer | Netflix [ENG SUB] - YouTube",
    "summary": "Comments ; Top 10 Upcoming Kdramas July 2026 || Watch with Trailer!! Bubble Cinema · 24K views ; 20 K-Drama Couples With HUGE Age Gaps (Did They Last?) · New. 75K ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=loicGWWNs2I",
    "date": "17 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782924197014-2",
    "slug": "the-moment-he-stops-asking-nicely-agent-kim-reactivated-youtube",
    "title": "The moment he stops asking nicely | Agent Kim Reactivated - YouTube",
    "summary": "Comments ; 20 K-Drama Couples With HUGE Age Gaps (Did They Last?) · New. 76K views ; Inspector Han Rim Outsmarts The Bully | Teach You A Lesson | Netflix ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=PvPrzEMzZT0",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782924199678-3",
    "slug": "we-are-all-good-prime-delivers-to-stars-hollow-can-you-spot-the",
    "title": "We are all good, Prime delivers to Stars Hollow, can you spot the ...",
    "summary": "The fan-favorite series will leave Netflix on June 30, 2026, with Prime ... The original seven-season series will also remain available on Hulu and Disney+ ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaOUNJsCBMk/",
    "date": "19 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782924201639-4",
    "slug": "notes-from-the-last-row-now-playing-netflix-eng-sub-youtube",
    "title": "Notes from the Last Row | Now Playing | Netflix [ENG SUB] - YouTube",
    "summary": "Notes from the Last Row is now playing, only on Netflix: https://www.netflix.com/title/82032598 A literature professor discovers a student's talent and ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=reMysq0koWM",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782924203899-5",
    "slug": "we-are-all-good-prime-delivers-to-stars-hollow-can-you-spot-the-smil",
    "title": "We are all good, Prime delivers to Stars Hollow, can you spot the smil...",
    "summary": "- Keep an eye on official platform announcements for any future move to Max or other services. Takeaway Gilmore Girls will leave Netflix U.S. on July 1, 2026 ( ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@primevideo/video/7657300872807959821",
    "date": "19 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782924206424-6",
    "slug": "agent-kim-reactivated-episode-3-4-pre-release-so-ji-sub-youtube",
    "title": "Agent Kim Reactivated | Episode 3-4 Pre-Release | So Ji Sub - YouTube",
    "summary": "In the drama, former elite spy Manager Kim conceals his dangerous past while living as an ordinary single father, but when his beloved daughter Min Ji is ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=nZBwFuqs2Us",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782837198790-1",
    "slug": "new-on-netflix-in-july-2026-50-movies-and-series-youtube",
    "title": "New on NETFLIX in JULY 2026! (50+ Movies and Series) - YouTube",
    "summary": "Les nouveautés Films et Séries, Documentaires qui arrivent sur Netflix France en Juillet 2026 ! Pour Suivre les Actus en Direct ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=uEBdTDx_DfY",
    "date": "24 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782837201689-2",
    "slug": "have-you-met-joo-dee-instagram",
    "title": "Have you met Joo Dee? - Instagram",
    "summary": "Those are my C-drama and K-drama updates for right now, but I will be sure ... Doctor on the Edge NOW STREAMING ON DISNEY+ Subscription required.",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaK3VeXii9P/",
    "date": "11 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782837203471-3",
    "slug": "top-10-best-female-action-movies-on-netflix-youtube-and-disney",
    "title": "Top 10 Best Female Action Movies on Netflix, YouTube & Disney+",
    "summary": "Top 10 Best Female Action Movies on Netflix, YouTube & Disney+ | Must-Watch Action Movies Hello and Welcome to Asian Odyssey. We're heading back to our ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=yQ5RyzTQxtU",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782837205883-4",
    "slug": "the-bombing-of-pan-am-103-trailer-netflix-facebook",
    "title": "The Bombing of Pan Am 103 | Trailer | Netflix - Facebook",
    "summary": "The tragic bombing of a transatlantic flight over Scotland in 1988 unites the local police and the FBI in a hunt for the attackers. Based on a true...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/NetflixUK/videos/the-bombing-of-pan-am-103-trailer-netflix/1683452676137953/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782837210152-5",
    "slug": "promo-with-the-goat-whos-got-next-instagram",
    "title": "Promo with the goat. Who's got next! - Instagram",
    "summary": "2M likes, 19K comments - tomholland2013 on June 30, 2026: \"Promo with the goat. Who's got next ... netflix's profile picture · netflix. Netflix US. Follow.",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaNf54Uqw1d/",
    "date": "15 minutes ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782837212141-6",
    "slug": "joe-lo-truglio-talks-new-comedy-movie-mets-jets-rams-and-more",
    "title": "Joe Lo Truglio Talks New Comedy Movie, Mets, Jets, Rams & More ...",
    "summary": "... New York Jets. Tune in to the Emmy-nominated Rich Eisen Show live weekdays from Noon to 3PM ET on Disney+, ESPN+, ESPN Radio, and streaming on SiriusXM channel ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=gVWIxVkoUSU",
    "date": "16 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782755333724-1",
    "slug": "top-4-korean-actors-whose-careers-were-rocked-by-major",
    "title": "Top 4 Korean Actors Whose Careers Were Rocked by Major ...",
    "summary": "Among them is the recent scandal surrounding actor Kim Soo-hyun and the late actress Kim Sae-ron. Allegations have emerged",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/100064867832914/posts/top-4-korean-actors-whose-careers-were-rocked-by-major-controversieskim-seon-ho-/1464809549024626/",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782755336122-2",
    "slug": "disbelief-and-frustration-over-a-high-profile-actress-instagram",
    "title": "disbelief and frustration over a high-profile actress ... - Instagram",
    "summary": "This viral X (formerly Twitter) thread perfectly captures the ongoing public fascination and controversy surrounding South Korean actress Kim Min-hee and ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaJvdJFSZsO/",
    "date": "16 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782755338225-3",
    "slug": "sana-addresses-outfit-controversy-and-myroyalnemesis-dating-buzz",
    "title": "Sana Addresses Outfit Controversy & #MyRoyalNemesis Dating Buzz",
    "summary": "Model and actress Hong Iso has personally denied recent dating rumors involving her Namjun. Taking to social media, Hong clarified that her is simply a close ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/ZAPZEEODK/posts/-weekly-headlines-top-5-sana-addresses-outfit-controversy-myroyalnemesis-dating-/1453519153485538/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782755339995-4",
    "slug": "did-reese-witherspoon-break-jake-gyllenhaals-heart-ossa",
    "title": "Did Reese Witherspoon Break Jake Gyllenhaal's Heart? | OSSA",
    "summary": "... news about the celebrities we love. ⭐ Our YouTube channel dishes up celebrity news and gossip on the stars you admire the most. SUBSCRIBE to our channel to ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=mdlr1gnd52M",
    "date": "5 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782755342528-5",
    "slug": "kdramahotgists-kdramahotgists-posts-x-twitter",
    "title": "kdramahotgists (@kdramahotgists) / Posts / X - Twitter",
    "summary": "Choi Min Sik Questions Why Young Celebrities Dating Is Still Treated Like a Scandal Actor Choi Min Sik appeared on Yoo Jae Suk's DdeunDdeun with Choi ...",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "x.com",
    "sourceUrl": "https://x.com/kdramahotgists?lang=en",
    "date": "3 days ago",
    "image": "https://pbs.twimg.com/profile_images/2043961016795705347/Fzt377vb_200x200.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782755344964-6",
    "slug": "new-k-drama-releases-to-watch-in-july-2026-on-netflix-disney-and",
    "title": "New K-Drama Releases To Watch In July 2026 On Netflix, Disney+, And ...",
    "summary": "Upcoming K-Dramas Premiering on Netflix in 2026: 1. The Wonderfools 2. Bloodhounds S2 3. Show Business 4. East Palace 5. Boyfriend On Demand 6. The Art Of Sarah ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/koreaboorewind/posts/new-k-drama-releases-to-watch-in-july-2026-on-netflix-disney-and-more/1060147443339676/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782649211516-1",
    "slug": "bring-the-child-chiefpriest-agrees-to-do-dna-on-national-tv-only",
    "title": "Bring The Child! Chiefpriest Agrees To Do DNA On National Tv Only",
    "summary": "... scandal; it's a high-stakes drama involving money, fame, denial, and a ... news, paternity drama, Cubana Chiefpriest updates, or viral socialite beefs, this is a",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=M4LOFlbDLHQ",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782649213992-2",
    "slug": "youre-welcome-jeo-ong-firstdayhigh-dance-trend-tiktok",
    "title": "You're welcome @Jeo Ong #FirstDayHigh | dance trend | TikTok",
    "summary": "Keywords: Arron Villaflor scandal investigation, viral video controversy, actor politician controversy, Filipina celebrity news, Arron Villaflor latest news ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@esnyrrr/video/7654922916051799316",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782649216236-3",
    "slug": "july-2026-is-packed-10-new-tv-series-you-cant-miss-youtube",
    "title": "July 2026 Is Packed! 10 New TV Series You Can't Miss - YouTube",
    "summary": "... on the Prairie 06:38 - Silo Season 3 Hello and welcome to Select10. If your watchlist is starting to feel stale, July 2026 is about to fix that. Netflix ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=dLKXTrWTEPg",
    "date": "21 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782649218347-4",
    "slug": "sharon-horgans-heartbreaking-true-crime-drama-lands-new-uk",
    "title": "Sharon Horgan's \"heartbreaking\" true-crime drama lands new UK ...",
    "summary": "The Twisted Tale of Amanda Knox starring Sharon with a specific release date yet to be announced. The series is also available to stream on Disney+ in the UK ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "digitalspy.com",
    "sourceUrl": "https://www.digitalspy.com/tv/ustv/a71692236/twisted-tale-of-amanda-knox-itv/",
    "date": "4 days ago",
    "image": "https://hips.hearstapps.com/hmg-prod/images/796d9016-5c24-4c9d-9b81-a695acd70166.jpg?crop=0.630xw:0.476xh;0.216xw,0.113xh&amp;resize=1200:*",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782649219178-5",
    "slug": "the-2nd-rule-of-fightclub-instagram",
    "title": "The 2nd rule of #fightclub - Instagram",
    "summary": "And the second rule of Fight Club is... English Transcript. OCR. New Movie Trailer – FROM DIRECTOR TAYLOR CHIEN USA FIFA WORLD CUP 2026 FIGHT CLUB ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaG6iHdPSQ5/",
    "date": "13 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782649221766-6",
    "slug": "furious-official-trailer-premieres-july-27-on-disney-youtube",
    "title": "Furious | Official Trailer | Premieres July 27 on Disney+ - YouTube",
    "summary": "FURIOUS. A new drama from Liz Meriwether, starring Emmy Rossum, Lola Petticrew, Scoot McNairy, and Quincy Tyler Bernstine. Furious premieres July 27 on ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=KlsfuIlfzmA",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782562476059-1",
    "slug": "frank-edoho-turns-upcoming-rapper-after-chike-and-sandra-heartbreak",
    "title": "Frank Edoho Turns Upcoming Rapper After Chike & Sandra Heartbreak",
    "summary": "... Korea! Subscribe for more on Naija dramas, celebrity scandals, and inspiring comeback stories. #FrankEdoho, #ChikeSandra, #FrankRapper, #NaijaDrama ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=RdCzBzdGi58",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782562478910-2",
    "slug": "new-k-drama-releases-to-watch-in-july-2026-on-netflix-disney",
    "title": "New K-Drama Releases To Watch In July 2026 On Netflix, Disney+ ...",
    "summary": "New K-Drama Releases To Watch In July 2026 On Netflix, Disney+, And More · 1. The Husband – July 4 · 2. Love in Sync – July 4 · 3. Family Register – July 6 · 4. The ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "koreaboo.com",
    "sourceUrl": "https://www.koreaboo.com/lists/new-k-dramas-july-korean-shows-release-dates-netflix/",
    "date": "2 days ago",
    "image": "https://image.koreaboo.com/2026/06/new-k-dramas-july-2026.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782562481673-3",
    "slug": "disney-escalates-k-drama-push-as-netflix-doubles-down-on-korea",
    "title": "Disney Escalates K-Drama Push as Netflix Doubles Down on Korea",
    "summary": "The Hollywood Reporter also reports that Netflix unveiled a 2026 Korean slate spanning 33 series ... Korean Drama 'Perfect Crown' Heading to Disney+ in 2026, ' ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "kentertechhub.com",
    "sourceUrl": "https://www.kentertechhub.com/disney-escalates-k-drama-push-as-netflix-doubles-down-on-korea/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782562484824-4",
    "slug": "k-content-fact-why-are-korean-dramas-released-globally-on",
    "title": "K-CONTENT FACT Why are Korean dramas released globally on ...",
    "summary": "As the world's fascination with Korean dramas continues to soar, June 2026 promises an enticing slate of fresh K-drama premieres that cater to the genre's ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZ6-1itkVh2/",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782562486840-5",
    "slug": "korean-drama-trending-2026-in-disney-tiktok",
    "title": "Korean Drama Trending 2026 in Disney | TikTok",
    "summary": "Doctor On The Edge Disney+ premiere, romantic medical comedy series 2026, Korean drama new release June 1, 12 episode K-drama schedule, Monday Tuesday K-drama ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/korean-drama-trending-2026-in-disney",
    "date": "5 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782562488822-6",
    "slug": "seung-yeon-tiktok",
    "title": "장승연 seung yeon 님 - TikTok",
    "summary": "K-Pop idols married actresses, celebrity couples, Korean celebrity marriages, K-Pop stars, drama actors, famous Korean couples, idol-actress relationships ...",
    "category": "trending",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@seung_monkey/video/7655344443666697492",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782491311651-1",
    "slug": "farah-khan-and-riteish-deshmukh-spill-the-beans-on-the-show",
    "title": "Farah Khan & Riteish Deshmukh SPILL the beans on the show!",
    "summary": "... news channel that provides the audience with the latest Bollywood updates, breaking news, celebrity and television gossip. It features a vibrant mix of ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=eBiVm4Sy8XA",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782491314659-2",
    "slug": "july-2026-is-stacked-with-new-tv-shows-heres-what-to-watch",
    "title": "July 2026 Is STACKED With New TV Shows — Here's What to Watch!",
    "summary": "AVATAR: THE LAST AIRBENDER (2024) S2 PREMIERE (ON NETFLIX) JUNE 25, 2026 IMDb- 7.2 #14. ELLE (2026) PREMIERE (ON PRIME VIDEO) JULY 1, 2026 NOT RATED #13. X-MEN ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=9rlV8qH8ZQI",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782491317727-3",
    "slug": "upcoming-2026-series-releases-on-netflix-prime-video-hbo-max",
    "title": "Upcoming 2026 Series Releases on Netflix, Prime Video, HBO Max ...",
    "summary": "Se surpreenda com os próximos lançamentos de séries em 2026 na Netflix, Amazon Prime Video, HBO Max, Disney+, Apple TV, Paramount+ e Globoplay.",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=LkKdDJvlQcQ&vl=en-US",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782491320096-4",
    "slug": "psst-we-have-a-special-announcement-ahead-instagram",
    "title": "Psst... we have a special announcement. Ahead ... - Instagram",
    "summary": "129K likes, 590 comments - blizzard on June 25, 2026: \"Psst... we have a special announcement. Ahead of their upcoming U.S. tour, it's going to be a ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DaA8U6ptPOF/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782491322536-5",
    "slug": "miraculous-secrets-trailer-new-digital-series-youtube",
    "title": "MIRACULOUS SECRETS TRAILER | New Digital Series - YouTube",
    "summary": "... on Netflix, Disney Channel & Disney+ MIRACULOUS - TALES OF LADYBUG & CAT NOIR OFFICIAL YOUTUBE CHANNEL Two high-school students, Marinette and Adrien, are ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=YOIT7Q8vQuA",
    "date": "1 hour ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782491325360-6",
    "slug": "teach-you-a-lesson-genre-youth-romance-drama",
    "title": "Teach You a Lesson (가르쳐 줄게) Genre: Youth, Romance, Drama ...",
    "summary": "Genres: Action, Thriller, Comedy, Country: South Korea Type: Drama Episodes: 10. Aired: Jun 5, 2026. Aired On: Friday Original Network: Netflix",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZ5hMcuhJJe/",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782405567976-1",
    "slug": "breaking-celebrity-news-entertainment-news-and-celeb-gossip",
    "title": "Breaking Celebrity News, Entertainment News and Celeb Gossip",
    "summary": "Get the latest news on celebrity scandals, engagements, and divorces! Check out our breaking stories on Hollywood's hottest stars!",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "eonline.com",
    "sourceUrl": "https://www.eonline.com/news",
    "date": "3 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782405570200-2",
    "slug": "police-clears-kimsoohyun-from-kimsaerons-death-instagram",
    "title": "Police clears #KimSooHyun from #KimSaeRon's death - Instagram",
    "summary": "Kim Se-eui, the representative of HoverLab (Gaseyeon), was arrested on charges of defaming actor Kim Soo-hyun by using AI to manipulate the voice of the late ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZ9kjfvCE0J/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782405572127-3",
    "slug": "after-hyeri-its-rare-to-see-korean-celebrities-publicly-call-things-out",
    "title": "After Hyeri, it's rare to see Korean celebrities publicly call things out ...",
    "summary": "Seo Hyun Jin Is A Victim of 2.6 Billion KRW Rental Fraud Actress Seo Hyun Jin has reportedly fallen victim to a jeonse (rental) scam. According to the ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/61551933150668/posts/after-hyeri-its-rare-to-see-korean-celebrities-publicly-call-things-out-on-insta/122316434786064438/",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782405574504-4",
    "slug": "mailbag-for-june-19-2026-by-laineygossip-the-squawk",
    "title": "Mailbag for June 19, 2026 - by LaineyGossip - The Squawk",
    "summary": "This week there's been a huge media scandal that intersects athletes and idols from South Korea. I am obsessed with this story, and not just because I love ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "thesquawk.substack.com",
    "sourceUrl": "https://thesquawk.substack.com/p/mailbag-for-june-19-2026",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782318907915-1",
    "slug": "in-hollywood-a-scandal-starts-after-an-arrest-but-in-korea-a-facebook",
    "title": "in Hollywood, a scandal starts after an arrest, but in Korea, a ... - Facebook",
    "summary": "Among them is the recent scandal surrounding actor Kim Soo-hyun and the late actress Kim Sae-ron. ... Actor Cho Jin Woong immediately quit acting after news broke ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/TheBrideofWaterGod/posts/in-hollywood-a-scandal-starts-after-an-arrest-but-in-korea-a-scandal-starts-when/1033571575684575/",
    "date": "18 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782318910315-2",
    "slug": "south-korean-actor-kim-soo-hyun-has-been-officially-cleared-by-police-of",
    "title": "South Korean actor Kim Soo-hyun has been officially cleared by police of ...",
    "summary": "South Korean actor Kim Soo-hyun has been officially cleared by police of allegations that he was romantically involved with the late actress Kim Sae-ron while ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KimSooHyunShiPhilippines/posts/south-korean-actor-kim-soo-hyun-has-been-officially-cleared-by-police-of-allegat/1616337533489836/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782318912361-3",
    "slug": "breaking-gaseyeon-head-kim-se-ui-indicted-and-arrested",
    "title": "BREAKING GASEYEON HEAD Kim Se-ui INDICTED & ARRESTED ...",
    "summary": "South Korean actor Kim Soo-hyun has been officially cleared by police of allegations that he was romantically involved with the late actress Kim Sae-ron ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZ7r02oprCi/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782318914820-4",
    "slug": "park-min-young-wikipedia",
    "title": "Park Min-young - Wikipedia",
    "summary": "Park Min-young (Korean: 박민영 ; born March 4, 1986), also known as Rachel Park, is a South Korean actress. She rose to fame in the historical coming-of-age ...",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "en.wikipedia.org",
    "sourceUrl": "https://en.wikipedia.org/wiki/Park_Min-young",
    "date": "2 days ago",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/20250625_Park_Min-young_TAG_Heuer_PhotoCall.jpg/960px-20250625_Park_Min-young_TAG_Heuer_PhotoCall.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782318917588-5",
    "slug": "entertainment-and-arts-latest-news-and-updates-bbc",
    "title": "Entertainment & Arts | Latest News & Updates - BBC",
    "summary": "Get all the latest news, live updates and content about Entertainment & Arts from across the BBC.",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "bbc.com",
    "sourceUrl": "https://www.bbc.com/culture/entertainment-news",
    "date": "17 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782318917809-6",
    "slug": "celebrity-antics-often-blur-the-lines-of-public-and-private-life-as-seen-with",
    "title": "Celebrity antics often blur the lines of public and private life, as seen with ...",
    "summary": "In a hilarious turn of events, a popular Korean actress found herself needing a lift from her husband after a night of heavy drinking. This amusing incident has ...",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZ1XKMQGVxn/",
    "date": "4 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782234213030-1",
    "slug": "south-korean-actor-cheating-news-tiktok",
    "title": "South Korean Actor Cheating News | TikTok",
    "summary": "South Korean actor Kim Soo-hyun denied allegations that he dated deceased actress Kim Sae-ron when she was underage, saying in tears that he could not \"admit ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/south-korean-actor-cheating-news",
    "date": "22 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782234215932-2",
    "slug": "a-south-korean-woman-named-yang-has-been-sentenced-to-four",
    "title": "A South Korean woman named Yang has been sentenced to four ...",
    "summary": "A South Korean court has sentenced a woman in her 20s to four years in prison for blackmailing England club football star Son Heung-min. She, along with her ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/upsoclthecracks/posts/a-south-korean-woman-named-yang-has-been-sentenced-to-four-years-in-prison-for-a/1050116667680653/",
    "date": "3 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782234218192-3",
    "slug": "every-k-drama-manhwa-adaptation-coming-in-2026-facebook",
    "title": "Every K-Drama Manhwa Adaptation Coming in 2026 ... - Facebook",
    "summary": "Upcoming K-Dramas Premiering on Netflix in 2026: 1. The Wonderfools 2. Bloodhounds S2 3. Show Business 4. East Palace 5. Boyfriend On Demand 6. The Art Of Sarah ...",
    "category": "upcoming",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/adultswholovecartoons/posts/every-k-drama-manhwa-adaptation-coming-in-2026-where-to-watch-read-more-/1474285754745107/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782234220437-4",
    "slug": "disneys-new-asia-streaming-boss-on-k-drama-sports-and-the",
    "title": "Disney's New Asia Streaming Boss on K-Drama, Sports and the ...",
    "summary": "Its growing investments in K-drama have yielded some of Disney+'s most welcome surprises of 2026: Perfect Crown, an alternate-reality romantic comedy, became ...",
    "category": "upcoming",
    "author": "Hana Cho",
    "source": "hollywoodreporter.com",
    "sourceUrl": "https://www.hollywoodreporter.com/business/business-news/disney-new-asia-streaming-boss-korean-drama-sports-japan-1236627088/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782234223093-5",
    "slug": "the-east-palace-official-teaser-netflix-eng-sub-youtube",
    "title": "The East Palace | Official Teaser | Netflix [ENG SUB] - YouTube",
    "summary": "Comments ; Top 9 Korean Series on Disney+ That Are Driving Everyone CRAZY | K-Dramas. WWS ASIAN · 50K views ; Top 10 Best NEW Anime of Spring 2026. ANIME SCAN ...",
    "category": "upcoming",
    "author": "Mia Kwon",
    "source": "youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=Lyy9Ev-d9Lk",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782234223992-6",
    "slug": "new-k-drama-releases-of-the-week-june-22-28-gq-india",
    "title": "New K-drama releases of the week (June 22-28) - GQ India",
    "summary": "Notes from the Last Row, See You at Work Tomorrow!, Agent Kim Reactivated and Doctor on the Edge are new K-drama releases of the week (June 22-28, 2026) on ...",
    "category": "upcoming",
    "author": "Rina Baek",
    "source": "gqindia.com",
    "sourceUrl": "https://www.gqindia.com/content/new-k-drama-releases-of-the-week-june-22-28-12-new-korean-dramas-streaming-on-netflix-and-other-ott-platforms",
    "date": "1 day ago",
    "image": "https://assets.gqindia.com/photos/6a38e4a1e8014a3c2b0f60da/16:9/w_1280,c_limit/New-K-drama-releases-of-the-week-June-22-28-2026.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782158334916-1",
    "slug": "of-the-several-false-allegations-made-against-actor-kim-soo-hyun-the",
    "title": "Of the several false allegations made against actor Kim Soo-hyun, the ...",
    "summary": "Kim Sae-ron scandal. Prosecutors have requested an arrest warrant for the Garosero head for allegedly spreading false claims and using AI forged audio to ...",
    "category": "gossip",
    "author": "Ji Yeon Park",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZ4yul6gcXe/",
    "date": "5 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782158337162-2",
    "slug": "4-kdrama-actors-who-were-canceled-after-school-bullying-allegations",
    "title": "4 KDrama Actors Who Were Canceled After School Bullying Allegations ...",
    "summary": "Song Ha Yoon became embroiled in controversy after allegations surfaced claiming she had participated in group violence and bullying during her high school ...",
    "category": "gossip",
    "author": "Soo Min Lee",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/yeppeungudeul/posts/4-kdrama-actors-who-were-canceled-after-school-bullying-allegations-some-of-them/1588485749548944/",
    "date": "11 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782158339280-3",
    "slug": "the-next-victim-could-be-anyone-a-powerful-facebook",
    "title": "\"THE NEXT VICTIM COULD BE ANYONE.\" A powerful ... - Facebook",
    "summary": "Kim Soo Hyun filed a defamation lawsuit against YouTuber Kim Se-ui and the family of late actress Kim Sae-ron, actor Kim Soo- hyun's recent scandal as a case ...",
    "category": "gossip",
    "author": "Dana Kim",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/KimSooHyunShiPhilippines/posts/the-next-victim-could-be-anyone-a-powerful-statement-by-attorney-khosangrock-exp/1614969456959977/",
    "date": "20 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782158340833-4",
    "slug": "in-entertainment-news-is-news-it-all-depends-on-how-you-spin-the-news",
    "title": "In entertainment news is news, it all depends on how you spin the news ...",
    "summary": "In entertainment news is news, it all depends on how you spin the news, some scandals might help you blow. Jmaier actor/ Director.",
    "category": "gossip",
    "author": "Hana Cho",
    "source": "facebook.com",
    "sourceUrl": "https://www.facebook.com/EpicRadio99.3fm/posts/in-entertainment-news-is-news-it-all-depends-on-how-you-spin-the-news-some-scand/1520663806739653/",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782158341070-5",
    "slug": "an-absolute-powerhouse-of-an-actor-after-completely-stealing-our",
    "title": "An absolute powerhouse of an actor. After completely stealing our...",
    "summary": "The legal battle surrounding Korean actor Kim Soo-hyun brings to light the precariousness of celebrity endorsements ences of protracted investigations. media ...",
    "category": "gossip",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@koreannatic/video/7652788617403698454",
    "date": "11 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782158343831-6",
    "slug": "korean-actress-who-are-dating-tiktok",
    "title": "Korean Actress Who Are Dating | TikTok",
    "summary": "South Korean actress Han So Hee has addressed her alleged “pathetic” Instagram story to Girl's Day Hyeri amid the dating rumors between her and Hyeri's ex- ...",
    "category": "gossip",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/discover/korean-actress-who-are-dating",
    "date": "4 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "gossip",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782055209113-1",
    "slug": "5-korean-dramas-releasing-in-june-2026-from-doctor-on-the-imdb",
    "title": "5 Korean Dramas Releasing In June 2026: From Doctor On The ... - IMDb",
    "summary": "The month also marks Lee Jae-wook's comeback in a delightful medical slice-of-life drama. Let's take a look! 1. Doctor On The Edge Release Date: June 1, 2026 ( ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "imdb.com",
    "sourceUrl": "https://www.imdb.com/news/ni65862550/",
    "date": "15 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782055211163-2",
    "slug": "list-of-dramas-aired-in-korea-by-network-in-2026-dramawiki",
    "title": "List of Dramas aired in Korea by Network in 2026 - DramaWiki",
    "summary": "List of Dramas aired or airing in Korea by Network in 2026. Only drama time-slots that are usually used to air first-time airing locally produced dramas are ...",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "wiki.d-addicts.com",
    "sourceUrl": "https://wiki.d-addicts.com/List_of_Dramas_aired_in_Korea_by_Network_in_2026",
    "date": "6 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782055213089-3",
    "slug": "who-knew-gwi-ma-could-sound-so-sweet-thank-you-lee",
    "title": "Who knew Gwi-Ma could sound so sweet?! Thank you Lee ...",
    "summary": "Gwi-Ma, Lee Byung-hun. Lee Jun-young also known as Jun has solidified his status as one of South Korea's most versatile all-rounder entertainers. Korean ...",
    "category": "trending",
    "author": "Dana Kim",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZzDsUNnKV5/",
    "date": "7 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1782055215344-4",
    "slug": "asian-game-shows-particularly-in-japan-and-south-korea",
    "title": "Asian game shows, particularly in Japan and South Korea ...",
    "summary": "Asian game shows, particularly in Japan and South Korea, have become famous for turning the weirdest ideas imaginable into primetime entertainment.",
    "category": "trending",
    "author": "Hana Cho",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZyE2DxuUTY/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782055216882-5",
    "slug": "haiden-henderson-age-birthday-music-and-celeb-connections",
    "title": "Haiden Henderson: age, birthday, music & celeb connections",
    "summary": "Quick guide to Haiden Henderson — age, birthday, new song news, and links.",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@haidenhenderson/video/7652764838699093279",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1782055219257-6",
    "slug": "bts-said-20-and-i-took-it-personally",
    "title": "BTS said 2.0 and I took it personally",
    "summary": "57K likes, 510 comments - themermaidscales on June 18, 2026: \"BTS said 2.0 and I took it personally✨\".",
    "category": "trending",
    "author": "Rina Baek",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZufr5goXNL/",
    "date": "3 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781961404539-1",
    "slug": "comment-your-favorite-kdrama-koreandrama-instagram",
    "title": "comment your favorite #kdrama #koreandrama ... - Instagram",
    "summary": "Korean Dramas coming in June 2026 Doctor On The Edge Cast: Lee Jae Wook, Shin Ye Eun Genre: Medical, Romance Episodes: 12 [Disney+] Date: June 1, 2026 Teach ...",
    "category": "upcoming",
    "author": "Ji Yeon Park",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/reel/DZxdkxhSw1y/",
    "date": "22 hours ago",
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781961406781-2",
    "slug": "from-2016-now-2026-the-most-popular-k-dramas-kdrama",
    "title": "From 2016 Το Now 2026: The Most Popular K-Dramas #kdrama ...",
    "summary": "Perfect Crown: Releasing 2026 on Disney+; stars IU & Byeon Woo-seok The Remarried Empress: Expected H2 2026; will be released on Netflix.",
    "category": "upcoming",
    "author": "Soo Min Lee",
    "source": "instagram.com",
    "sourceUrl": "https://www.instagram.com/p/DZuYOQflP0Z/",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
    "tags": [
      "upcoming",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781961408482-3",
    "slug": "trishapaytas-trishlikefish88s-video-of-george-glass",
    "title": "trishapaytas (@trishlikefish88)’s video of george glass",
    "summary": "As a Korean American who loves KPOP seeing Trisha Paytas come out with a KPOP song was not on my 2026 bingo card | also please enjoy my legit first reaction ...",
    "category": "trending",
    "author": "Dana Kim",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@trishlikefish88/video/7652396804478160142",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": true
  },
  {
    "id": "live-1781961410439-4",
    "slug": "on-jun-17-actress-joanne-peh-took-to-tiktok-live-to-speak",
    "title": "On Jun. 17, actress Joanne Peh took to TikTok live to speak ...",
    "summary": "On Jun. 17, actress Joanne Peh took to TikTok live to speak out about an allegedly disrespectful encounter with a Chinese merchant she was supposed to host ...",
    "category": "trending",
    "author": "Hana Cho",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@mothershipsg/video/7653016606406184210",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781961410785-5",
    "slug": "thais-ramone-domestic-battery-arrest-bodycam-footage",
    "title": "Thais Ramone Domestic Battery Arrest: Bodycam Footage ...",
    "summary": "TMZ obtained police bodycam video of Thais Ramone's domestic battery arrest involving estranged husband Patrick Mendes.",
    "category": "trending",
    "author": "Mia Kwon",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@tmz/video/7652536463514488078",
    "date": "2 days ago",
    "image": "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
  {
    "id": "live-1781961411130-6",
    "slug": "indie-horror-hit-obsession-has-surged-past-the-300-million",
    "title": "Indie horror hit Obsession has surged past the $300 million ...",
    "summary": "Directed by Curry Barker and starring Inde Navarrette and Michael Johnston, the Focus Features release has continued to outperform expectations with unusually ...",
    "category": "trending",
    "author": "Rina Baek",
    "source": "tiktok.com",
    "sourceUrl": "https://www.tiktok.com/@dailymail/video/7653038857637711117",
    "date": "1 day ago",
    "image": "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
    "tags": [
      "trending",
      "korean-entertainment"
    ],
    "hot": false
  },
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

export const LAST_UPDATED = "2026-08-04T10:33:08.872Z";

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
