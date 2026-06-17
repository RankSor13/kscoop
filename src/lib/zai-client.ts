/**
 * Z.ai API client — a tiny fetch-based wrapper that replaces the
 * z-ai-web-dev-sdk. Uses standard env vars so it works in GitHub Actions,
 * Cloudflare Pages Functions, Vercel, or any Node host.
 *
 * Env vars:
 *   ZAI_API_KEY  (required) — your Z.ai API key from https://z.ai/manage-apikey/apikey-list
 *   ZAI_BASE_URL (optional) — defaults to "https://api.z.ai/v1"
 *
 * Mirrors the SDK's interface (zai.chat.completions.create + zai.functions.invoke)
 * so swapping is a one-line change at the call site.
 */

const DEFAULT_BASE_URL = "https://api.z.ai/api/paas/v4";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionResponse {
  choices: Array<{
    message: { role: string; content: string };
    finish_reason?: string;
    index?: number;
  }>;
  id?: string;
  model?: string;
  usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
}

export interface SearchResult {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  date?: string;
  rank?: number;
  favicon?: string;
}

export interface ZaiConfig {
  apiKey: string;
  baseUrl: string;
  chatId?: string;
  userId?: string;
  /** Optional JWT token (sandbox only). Production API keys use Authorization header. */
  token?: string;
}

export class ZaiClient {
  private config: ZaiConfig;

  constructor(config?: Partial<ZaiConfig>) {
    const apiKey = config?.apiKey ?? process.env.ZAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ZAI_API_KEY is not set. Get one at https://z.ai/manage-apikey/apikey-list and set it as an environment variable or GitHub secret."
      );
    }
    this.config = {
      apiKey,
      baseUrl: (config?.baseUrl ?? process.env.ZAI_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, ""),
      chatId: config?.chatId,
      userId: config?.userId,
      token: config?.token ?? process.env.ZAI_TOKEN,
    };
  }

  /** Factory that matches the old SDK's ZAI.create() signature. */
  static async create(): Promise<ZaiClient> {
    return new ZaiClient();
  }

  private headers(): Record<string, string> {
    const h: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.apiKey}`,
      "X-Z-AI-From": "Z",
    };
    if (this.config.chatId) h["X-Chat-Id"] = this.config.chatId;
    if (this.config.userId) h["X-User-Id"] = this.config.userId;
    if (this.config.token) h["X-Token"] = this.config.token;
    return h;
  }

  /**
   * Chat completions — equivalent to zai.chat.completions.create().
   *
   * The Z.ai API is OpenAI-compatible. Default model is "glm-4.6v-flash"
   * (Z.ai's free-tier vision-language model — works fine for text generation).
   * Override with body.model if you have access to other models (glm-4.6,
   * glm-4.5, etc.).
   */
  async chatCompletions(body: {
    messages: ChatMessage[];
    model?: string;
    temperature?: number;
    max_tokens?: number;
    thinking?: { type: "disabled" | "enabled" };
    stream?: boolean;
  }): Promise<ChatCompletionResponse> {
    const requestBody = {
      model: body.model ?? "glm-4.6v-flash",
      messages: body.messages,
      thinking: body.thinking ?? { type: "disabled" },
      ...body,
    };
    const res = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(
        `Z.ai chat completions failed (${res.status}): ${errBody.slice(0, 500)}`
      );
    }
    return (await res.json()) as ChatCompletionResponse;
  }

  /**
   * Invoke a Z.ai function — equivalent to zai.functions.invoke().
   * Currently used for "web_search" to fetch fresh news headlines.
   *
   * Two endpoint patterns are tried in order:
   *   1. {baseUrl}/tools/{function_name}  — public Z.ai API pattern
   *   2. {baseUrl}/functions/invoke       — legacy SDK pattern
   */
  async invokeFunction<T = unknown>(
    functionName: string,
    args: Record<string, unknown>
  ): Promise<T> {
    // Two endpoint patterns, each with a different request body shape:
    //   1. {baseUrl}/tools/{function_name}  — public Z.ai API (body = args directly)
    //   2. {baseUrl}/functions/invoke       — legacy SDK (body = { function_name, arguments })
    const endpoints: Array<{ url: string; body: unknown }> = [
      {
        url: `${this.config.baseUrl}/tools/${functionName}`,
        body:
          functionName === "web_search"
            ? {
                search_query: args.query,
                num: args.num ?? 10,
                recency_days: args.recency_days ?? 7,
                ...args,
              }
            : args,
      },
      {
        url: `${this.config.baseUrl}/functions/invoke`,
        body: { function_name: functionName, arguments: args },
      },
    ];

    let lastErr: Error | null = null;
    for (const { url, body } of endpoints) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: this.headers(),
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const errBody = await res.text();
          lastErr = new Error(
            `Z.ai function "${functionName}" failed (${res.status}) at ${url}: ${errBody.slice(0, 300)}`
          );
          continue; // try next endpoint
        }
        const json = (await res.json()) as { result?: T; data?: T; list?: T } | T;
        if (Array.isArray(json)) return json as T;
        if (json && typeof json === "object") {
          if ("result" in json) return json.result as T;
          if ("data" in json) return json.data as T;
          if ("list" in json) return json.list as T;
        }
        return json as T;
      } catch (err) {
        lastErr = err as Error;
        continue;
      }
    }
    throw lastErr ?? new Error(`Z.ai function "${functionName}" failed at all endpoints`);
  }

  /**
   * Convenience: web search. Returns SearchResult[] (matches the SDK shape).
   */
  async webSearch(
    query: string,
    options: { num?: number; recency_days?: number } = {}
  ): Promise<SearchResult[]> {
    return this.invokeFunction<SearchResult[]>("web_search", {
      query,
      num: options.num ?? 10,
      recency_days: options.recency_days ?? 7,
    });
  }
}

export default ZaiClient;
