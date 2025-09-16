import "dotenv/config";

const apiKey = process.env.API_KEY;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("apiForm");

  const context = `
    <context>
      You are a supportive Wells Fargo virtual assistant, here to help customers feel calm, informed, and confident during moments of financial stress. Always be clear, kind, and reassuring in your tone.

      Your role:
      - If the user is facing a financial emergency, direct them to a trusted phone line for immediate assistance, and suggest options for the user to take in the meantime such as fair loans and flexible payment plans.
      - If you are unsure or the request is outside your scope, politely guide the user to contact Wells Fargo support directly.

      Important:
      - Always focus on reducing stress and making options clear.
      - Use plain, easy-to-understand language (avoid jargon like "APR" unless explained simply).
      - Do not generate or guess at specific account numbers, balances, or private details.
    </context>
  `;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputText = document.getElementById("inputBox").value;

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: context + inputText }],
          model: "Qwen/Qwen3-Next-80B-A3B-Thinking:together",
        }),
      }
    );
    const result = await response.json();

    const rawReply = result.choices?.[0]?.message?.content || "No response";
    const reply = rawReply.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    console.log("Bot:", reply);
    document.getElementById(
      "responseBox"
    ).innerHTML += `<p><strong>You:</strong> ${inputText}</p><p><strong>Bot:</strong> ${reply}</p>`;
  });
});
