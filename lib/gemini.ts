import { GoogleGenerativeAI } from '@google/generative-ai';
import { SourceChunk } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

export async function chatWithDocument(
  question: string,
  context: SourceChunk[],
  history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const contextText = context
    .map((chunk, i) => `[Source ${i + 1}]: ${chunk.content}`)
    .join('\n\n');

  const systemPrompt = `You are a helpful AI assistant that answers questions about documents.
Use ONLY the provided context to answer questions. If the context doesn't contain the answer, say so clearly.
Be concise, accurate, and cite the relevant parts of the document when appropriate.

Document Context:
${contextText}`;

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model',
        parts: [{ text: 'I understand. I will answer questions based only on the provided document context.' }],
      },
      ...history,
    ],
  });

  const result = await chat.sendMessage(question);
  return result.response.text();
}

export async function summarizeDocument(text: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Please provide a comprehensive summary of the following document. Include:
1. Main topic and purpose
2. Key points and findings
3. Important conclusions

Document text:
${text.slice(0, 30000)}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
