/**
 * Quick local test of the ZaiClient.
 * Uses the sandbox's /etc/.z-ai-config to verify the API works, then we'll
 * know the production code (which uses ZAI_API_KEY env var) will work too.
 *
 * Usage: ZAI_API_KEY=<key> ZAI_BASE_URL=https://internal-api.z.ai/v1 node scripts/test-zai-client.mjs
 */
import { ZaiClient } from "../src/lib/zai-client.ts";

async function main() {
  // For this test, point at the sandbox's internal API + use the JWT token
  const zai = new ZaiClient({
    apiKey: process.env.ZAI_API_KEY,
    baseUrl: process.env.ZAI_BASE_URL || "https://internal-api.z.ai/v1",
    chatId: process.env.ZAI_CHAT_ID,
    userId: process.env.ZAI_USER_ID,
    token: process.env.ZAI_TOKEN,
  });

  console.log("→ Testing web_search...");
  try {
    const results = await zai.webSearch("Korean drama news 2026", {
      num: 3,
      recency_days: 7,
    });
    console.log(`✓ Got ${results?.length || 0} search results`);
    if (results && results[0]) {
      console.log(`  First: ${results[0].name?.slice(0, 80)}`);
      console.log(`  URL: ${results[0].url}`);
    }
  } catch (err) {
    console.error(`✗ web_search failed: ${err.message}`);
  }

  console.log("\n→ Testing chat.completions...");
  try {
    const completion = await zai.chatCompletions({
      messages: [
        { role: "system", content: "You are a helpful assistant. Reply in one short sentence." },
        { role: "user", content: "Say hello in Korean." },
      ],
    });
    const content = completion.choices?.[0]?.message?.content;
    console.log(`✓ Got chat response: ${content?.slice(0, 100)}`);
  } catch (err) {
    console.error(`✗ chat.completions failed: ${err.message}`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
