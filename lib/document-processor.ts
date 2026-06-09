import { generateEmbedding } from './gemini';

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

export function chunkText(text: string): string[] {
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);

  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > CHUNK_SIZE && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      const words = currentChunk.split(' ');
      const overlapWords = words.slice(-Math.floor(CHUNK_OVERLAP / 5));
      currentChunk = overlapWords.join(' ') + ' ' + sentence;
    } else {
      currentChunk += (currentChunk ? ' ' : '') + sentence;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter(c => c.length > 50);
}

export async function processTextIntoChunks(
  text: string
): Promise<{ content: string; embedding: number[]; chunk_index: number }[]> {
  const chunks = chunkText(text);
  const results = [];

  // Process in batches to avoid rate limiting
  const batchSize = 5;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const embeddings = await Promise.all(
      batch.map(chunk => generateEmbedding(chunk))
    );

    for (let j = 0; j < batch.length; j++) {
      results.push({
        content: batch[j],
        embedding: embeddings[j],
        chunk_index: i + j,
      });
    }

    // Small delay between batches
    if (i + batchSize < chunks.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  return results;
}

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse');
  const data = await pdfParse(buffer);
  return data.text;
}

export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const mammoth = await import('mammoth');
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export async function extractTextFromURL(url: string): Promise<string> {
  const axios = (await import('axios')).default;
  const cheerio = await import('cheerio');

  const response = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DocChatBot/1.0)' },
    timeout: 15000,
  });

  const $ = cheerio.load(response.data);

  // Remove scripts, styles, nav, footer
  $('script, style, nav, footer, header, .nav, .header, .footer, .sidebar').remove();

  const text = $('body').text().replace(/\s+/g, ' ').trim();
  return text;
}
