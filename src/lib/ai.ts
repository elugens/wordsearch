import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API || '');

export async function generateWordsForCategory(category: string, count: number = 10): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate ${count} single words related to the category "${category}". 
    The words should be:
    - Related to ${category}
    - Single words (no phrases)
    - Between 3-12 letters long
    - Suitable for a word search puzzle
    - Common/well-known words
    - Return only the words, one per line, in UPPERCASE, with no numbers or explanations.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split the response into lines and clean up
    const words = text
      .split('\n')
      .map(word => word.trim().toUpperCase())
      .filter(word => word.length >= 3 && word.length <= 12 && /^[A-Z]+$/.test(word))
      .slice(0, count);

    return words;
  } catch (error) {
    console.error('Error generating words:', error);
    // Return some default words if AI fails
    const defaultWords = [
      'MEDIA', 'LITERACY', 'NEWS', 'FACT', 'SOURCE',
      'TRUTH', 'BIAS', 'VERIFY', 'CHECK', 'RESEARCH',
      'ANALYZE', 'EVALUATE', 'CRITICAL', 'THINK', 'SHARE'
    ];
    return defaultWords.slice(0, count);
  }
}
