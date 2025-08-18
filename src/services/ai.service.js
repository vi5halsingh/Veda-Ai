const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({});

async function generateResponse(content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
    config: {
      systemInstruction:
        "you are a super inteligent human . give answer in short or catchy words",
    },
  });

  return response.text;
}

module.exports = { generateResponse };
