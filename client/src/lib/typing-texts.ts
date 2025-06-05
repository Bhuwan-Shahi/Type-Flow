export const typingTexts = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typing practice. It helps test keyboard layout and typing speed while ensuring all keys are properly functioning.",
  
  "In the heart of the bustling city, where skyscrapers touch the clouds and traffic flows like rivers through concrete canyons, people hurry about their daily lives with purpose and determination. Each individual carries their own dreams, aspirations, and stories that interweave to create the vibrant tapestry of urban life.",
  
  "Technology has revolutionized the way we communicate, work, and learn. From smartphones to artificial intelligence, these innovations continue to shape our future in ways we never imagined possible. The digital age has brought unprecedented connectivity, allowing people from different corners of the world to collaborate and share ideas instantly.",
  
  "The art of cooking is more than just preparing food; it is a creative expression that brings people together. Through the careful selection of ingredients, the mastery of techniques, and the infusion of personal touch, a simple meal can become a memorable experience that nourishes both body and soul.",
  
  "Reading opens doors to countless worlds and perspectives. Through books, we can travel to distant lands, experience different cultures, and understand the thoughts and feelings of people from all walks of life. Literature has the power to inspire, educate, and transform our understanding of the world around us.",
  
  "The natural world is filled with incredible diversity and beauty. From the smallest microorganisms to the largest mammals, every creature plays a vital role in maintaining the delicate balance of our ecosystem. Understanding and protecting this biodiversity is crucial for the survival of our planet and future generations.",
  
  "Music is a universal language that transcends cultural and linguistic barriers. It has the remarkable ability to evoke emotions, trigger memories, and bring people together in shared experiences. Whether through classical symphonies, jazz improvisations, or contemporary pop songs, music enriches our lives in countless ways.",
  
  "The pursuit of knowledge has driven human progress throughout history. Scientists, researchers, and scholars have dedicated their lives to understanding the mysteries of the universe, from the microscopic world of atoms to the vast expanse of space. Their discoveries have led to countless innovations that have improved the quality of life for millions of people.",
  
  "Exercise and physical activity are essential components of a healthy lifestyle. Regular movement not only strengthens our muscles and improves cardiovascular health but also enhances mental well-being and cognitive function. Finding enjoyable ways to stay active can lead to a longer, more fulfilling life.",
  
  "The importance of education cannot be overstated in today's rapidly changing world. Learning new skills, acquiring knowledge, and developing critical thinking abilities are essential for personal growth and professional success. Education empowers individuals to adapt to challenges and contribute meaningfully to society.",
];

export function getRandomText(): string {
  return typingTexts[Math.floor(Math.random() * typingTexts.length)];
}

export function getTextByLength(minLength: number): string {
  const suitableTexts = typingTexts.filter(text => text.length >= minLength);
  if (suitableTexts.length === 0) {
    return typingTexts[0];
  }
  return suitableTexts[Math.floor(Math.random() * suitableTexts.length)];
}
