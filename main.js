/*
Get text input from the user and send it to the backend API for processing.
Get response from the backend and display it on the webpage.
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("apiForm");
  const responseBox = document.getElementById("responseBox");
  const inputBox = document.getElementById("inputBox");

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

  function addMessage(labelText, messageText, roleClass) {
    const wrapper = document.createElement("div");
    wrapper.className = `message ${roleClass}`; // e.g. "message user" or "message bot"

    // create the bubble element (CSS targets .message .bubble)
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = messageText;

    wrapper.appendChild(bubble);
    responseBox.appendChild(wrapper);

    // keep the latest message in view
    wrapper.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputText = inputBox.value.trim();
    if (!inputText) return;

    // show user message
    addMessage("You", inputText, "user");
    inputBox.value = ""; // clear input

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: context + inputText }],
        }),
      });

      const result = await response.json();
      const rawReply = result.choices?.[0]?.message?.content || "No response";
      const reply = rawReply.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

      addMessage("Bot", reply, "bot");
    } catch (err) {
      console.error(err);
      addMessage(
        "Bot",
        "Sorry — there was an error contacting the server.",
        "bot"
      );
    }
  });
});
