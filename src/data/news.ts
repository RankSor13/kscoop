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
    "id": "n1",
    "title": "Kim Soo-hyun Returns to Work with Fashion Brand Tie-Up After Dating Controversy",
    "summary": "South Korean star Kim Soo-hyun is officially resuming activities, signing a new deal with a global fashion house after months out of the spotlight. The move comes after police concluded their investigation into rumors linking him to the late actress Kim Sae-ron, finding that a YouTuber had used AI to fabricate the damaging evidence. Industry watchers say the comeback marks one of the fastest scandal recoveries in recent K-entertainment history.",
    "category": "gossip",
    "source": "The Straits Times",
    "sourceUrl": "https://www.straitstimes.com/life/entertainment/s-korean-star-kim-soo-hyun-returns-to-work-with-fashion-brand-tie-up-aft",
    "date": "2026-06-09",
    "image": "https://sfile.chatglm.cn/images-ppt/5eb965d0a16d.jpg",
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
    "image": "https://sfile.chatglm.cn/images-ppt/ef8859b912a1.jpeg",
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
    "image": "https://sfile.chatglm.cn/images-ppt/e0889b4a1796.jpg",
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
    "image": "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
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

export const LAST_UPDATED = "2026-06-17T17:20:09.148Z";

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
