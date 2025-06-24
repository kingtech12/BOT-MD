import readline from "readline";
import { Configuration, OpenAIApi } from "openai";

// Load your API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create readline interface for CLI chat
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("ChatGPT.js - Type your message and press Enter. Type 'exit' to quit.");

async function askChatGPT(prompt) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini", // or "gpt-4o" or "gpt-4" based on your access
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });
    return completion.data.choices[0].message.content.trim();
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

function promptUser() {
  rl.question("> ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      process.exit(0);
    }
    const response = await askChatGPT(input);
    console.log(`ChatGPT: ${response}\n`);
    promptUser();
  });
}

promptUser();
