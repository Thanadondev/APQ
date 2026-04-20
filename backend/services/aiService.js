const { GoogleGenerativeAI } = require('@google/generative-ai');

const characterDB = {
  INTJ: {
    en: { characterName: "Lelouch Lamperouge", animeTitle: "Code Geass", reason: "Like Lelouch, you are a brilliant mastermind who operates from the shadows. You see the world as a grand chessboard and are always ten moves ahead. Your strategic vision and unwavering determination to achieve justice make you a natural Shadow Strategist." },
    th: { characterName: "Lelouch Lamperouge", animeTitle: "Code Geass", reason: "เช่นเดียวกับ Lelouch คุณเป็นอัจฉริยะผู้วางแผนจากเบื้องหลัง คุณมองโลกเป็นกระดานหมากรุกขนาดใหญ่และมักจะนำหน้าคนอื่นสิบก้าวเสมอ วิสัยทัศน์เชิงกลยุทธ์และความมุ่งมั่นที่จะบรรลุความยุติธรรมทำให้คุณเป็นเสนาธิการเงาโดยกำเนิด" }
  },
  INTP: {
    en: { characterName: "L Lawliet", animeTitle: "Death Note", reason: "Like L, your mind is your most lethal weapon. You approach the world with insatiable curiosity and razor-sharp analytical thinking. You thrive on solving puzzles that others deem impossible." },
    th: { characterName: "L Lawliet", animeTitle: "Death Note", reason: "เช่นเดียวกับ L สมองคือเป็นอาวุธที่ทรงพลังที่สุดของคุณ คุณเข้าหาโลกด้วยความอยากรู้อยากเห็นที่ไม่มีวันหมด และความสามารถในการวิเคราะห์ที่แหลมคม คุณเติบโตจากการไขปริศนาที่คนอื่นเห็นว่าเป็นไปไม่ได้" }
  },
  ENTJ: {
    en: { characterName: "Erwin Smith", animeTitle: "Attack on Titan", reason: "Like Commander Erwin, you are a born leader driven by an unrelenting vision. You inspire fierce loyalty through your commanding presence and willingness to make the hardest decisions." },
    th: { characterName: "Erwin Smith", animeTitle: "Attack on Titan", reason: "เช่นเดียวกับผู้บัญชาการ Erwin คุณเป็นผู้นำโดยกำเนิดที่ขับเคลื่อนด้วยวิสัยทัศน์ คุณสร้างแรงบันดาลใจให้ผู้คนผ่านความเด็ดเดี่ยวและความกล้าที่จะตัดสินใจในเรื่องที่ยากที่สุด" }
  },
  ENTP: {
    en: { characterName: "Hisoka Morow", animeTitle: "Hunter x Hunter", reason: "Like Hisoka, you live for the thrill of intellectual combat and unpredictability. You are endlessly inventive, challenging existing rules just to see what happens." },
    th: { characterName: "Hisoka Morow", animeTitle: "Hunter x Hunter", reason: "เช่นเดียวกับ Hisoka คุณมีชีวิตอยู่เพื่อความตื่นเต้นของการปะทะทางปัญญาและความคาดเดาไม่ได้ คุณเต็มไปด้วยความสร้างสรรค์ ท้าทายกฎเกณฑ์เดิมๆ เพียงเพื่อจะดูว่าจะเกิดอะไรขึ้น" }
  },
  INFJ: {
    en: { characterName: "Itachi Uchiha", animeTitle: "Naruto Shippuden", reason: "Like Itachi, you carry immense emotional depth beneath a calm exterior. You possess an almost supernatural ability to understand others and are willing to bear unimaginable pain in silence to protect those you love." },
    th: { characterName: "Itachi Uchiha", animeTitle: "Naruto Shippuden", reason: "เช่นเดียวกับ Itachi คุณมีความลึกซึ้งทางอารมณ์ที่ซ่อนอยู่ภายใต้ท่าทีที่สงบ คุณมีความสามารถเหนือธรรมชาติในการเข้าใจผู้อื่น และยอมแบกรับความทุกข์ทรมานอย่างเงียบๆ เพื่อปกป้องคนที่คุณรัก" }
  },
  INFP: {
    en: { characterName: "Tanjiro Kamado", animeTitle: "Demon Slayer", reason: "Like Tanjiro, your kindness is not weakness—it is your greatest strength. You hold onto your ideals with unbreakable conviction and your boundless empathy allows you to see the beauty in everyone." },
    th: { characterName: "Tanjiro Kamado", animeTitle: "Demon Slayer", reason: "เช่นเดียวกับ Tanjiro ความอ่อนโยนของคุณไม่ใช่ความอ่อนแอ—มันคือพลังที่ยิ่งใหญ่ที่สุดของคุณ คุณยึดมั่นในอุดมการณ์ด้วยความเชื่อมั่นที่ไม่สั่นคลอน และความเห็นอกเห็นใจของคุณทำให้คุณมองเห็นความงามในทุกคน" }
  },
  ENFJ: {
    en: { characterName: "All Might (Toshinori Yagi)", animeTitle: "My Hero Academia", reason: "Like All Might, you are a symbol of hope. Your charisma naturally draws people toward you, and you use that influence to lift others up and inspire them to become the best versions of themselves." },
    th: { characterName: "All Might (Toshinori Yagi)", animeTitle: "My Hero Academia", reason: "เช่นเดียวกับ All Might คุณคือสัญลักษณ์แห่งความหวัง เสน่ห์ของคุณดึงดูดผู้คนเข้ามาหาอย่างเป็นธรรมชาติ และคุณใช้อิทธิพลนั้นยกระดับผู้อื่นและสร้างแรงบันดาลใจ" }
  },
  ENFP: {
    en: { characterName: "Monkey D. Luffy", animeTitle: "One Piece", reason: "Like Luffy, you are a boundless source of energy, optimism, and unscripted adventure. You charge headfirst into the unknown with a smile, turning strangers into lifelong allies through your infectious enthusiasm." },
    th: { characterName: "Monkey D. Luffy", animeTitle: "One Piece", reason: "เช่นเดียวกับ Luffy คุณคือแหล่งพลังงานอันไร้ขีดจำกัด ความมองโลกในแง่ดี และการผจญภัยที่ไม่มีสคริปต์ คุณพุ่งเข้าหาสิ่งที่ไม่รู้ด้วยรอยยิ้ม เปลี่ยนคนแปลกหน้าให้เป็นพันธมิตรตลอดชีวิต" }
  },
  ISTJ: {
    en: { characterName: "Byakuya Kuchiki", animeTitle: "Bleach", reason: "Like Byakuya, you are the embodiment of discipline, duty, and unwavering adherence to rules. Behind your stoic exterior lies a deep sense of responsibility and willingness to carry the full weight of tradition." },
    th: { characterName: "Byakuya Kuchiki", animeTitle: "Bleach", reason: "เช่นเดียวกับ Byakuya คุณคือตัวแทนของวินัย หน้าที่ และการยึดมั่นในกฎระเบียบอย่างไม่สั่นคลอน ภายใต้ท่าทีเย็นชาซ่อนไว้ด้วยความรับผิดชอบอันลึกซึ้ง" }
  },
  ISFJ: {
    en: { characterName: "Hinata Hyuga", animeTitle: "Naruto", reason: "Like Hinata, your loyalty is absolute and your dedication unwavering. You quietly support those you care about from behind the scenes, your gentle perseverance holding the power to move hearts." },
    th: { characterName: "Hinata Hyuga", animeTitle: "Naruto", reason: "เช่นเดียวกับ Hinata ความภักดีของคุณไม่มีขีดจำกัดและความทุ่มเทไม่สั่นคลอน คุณสนับสนุนคนที่คุณรักอย่างเงียบๆ จากเบื้องหลัง ความอดทนอันอ่อนโยนของคุณมีพลังที่จะขับเคลื่อนจิตใจผู้คน" }
  },
  ESTJ: {
    en: { characterName: "Jean Kirstein", animeTitle: "Attack on Titan", reason: "Like Jean, you are a pragmatic, no-nonsense leader who values efficiency and clear-cut rules. Your ability to make tough, realistic decisions under pressure makes you indispensable." },
    th: { characterName: "Jean Kirstein", animeTitle: "Attack on Titan", reason: "เช่นเดียวกับ Jean คุณเป็นผู้นำที่เน้นความจริง ไม่อ้อมค้อม และให้คุณค่ากับประสิทธิภาพและกฎเกณฑ์ที่ชัดเจน ความสามารถในการตัดสินใจอย่างเด็ดขาดภายใต้แรงกดดันทำให้คุณขาดไม่ได้" }
  },
  ESFJ: {
    en: { characterName: "Ochako Uraraka", animeTitle: "My Hero Academia", reason: "Like Ochako, you are the glue that holds the team together. Your emotional intelligence and genuine warmth create a safe space for everyone around you." },
    th: { characterName: "Ochako Uraraka", animeTitle: "My Hero Academia", reason: "เช่นเดียวกับ Ochako คุณคือกาวที่ยึดทีมเข้าด้วยกัน ความฉลาดทางอารมณ์และความอบอุ่นอย่างจริงใจของคุณสร้างพื้นที่ปลอดภัยให้ทุกคนรอบข้าง" }
  },
  ISTP: {
    en: { characterName: "Levi Ackerman", animeTitle: "Attack on Titan", reason: "Like Captain Levi, you are a person of few words but devastating action. Your skill is honed to a lethal edge through relentless self-discipline. When the moment arrives, you execute with surgical precision." },
    th: { characterName: "Levi Ackerman", animeTitle: "Attack on Titan", reason: "เช่นเดียวกับกัปตัน Levi คุณเป็นคนพูดน้อยแต่ลงมือทำอย่างเฉียบขาด ทักษะของคุณถูกขัดเกลาจนเป็นคมมีดผ่านการฝึกฝนอย่างไม่หยุดหย่อน เมื่อถึงเวลา คุณลงมือด้วยความแม่นยำเหมือนศัลยแพทย์" }
  },
  ISFP: {
    en: { characterName: "Violet Evergarden", animeTitle: "Violet Evergarden", reason: "Like Violet, you express yourself most authentically through your actions rather than words. You possess a deep artistic sensitivity and a yearning for freedom and genuine human connection." },
    th: { characterName: "Violet Evergarden", animeTitle: "Violet Evergarden", reason: "เช่นเดียวกับ Violet คุณแสดงออกตัวตนที่แท้จริงผ่านการกระทำมากกว่าคำพูด คุณมีความอ่อนไหวทางศิลปะอย่างลึกซึ้งและโหยหาอิสรภาพกับการเชื่อมต่อทางจิตใจกับเพื่อนมนุษย์" }
  },
  ESTP: {
    en: { characterName: "Gojo Satoru", animeTitle: "Jujutsu Kaisen", reason: "Like Gojo, you are the ultimate action-oriented showman. You thrive on adrenaline and live-wire situations where you can showcase your immense skill with unshakeable confidence." },
    th: { characterName: "Gojo Satoru", animeTitle: "Jujutsu Kaisen", reason: "เช่นเดียวกับ Gojo คุณเป็นนักแสดงสายบู๊ที่เน้นลงมือทำ คุณเติบโตจากอะดรีนาลีน ความเสี่ยง และสถานการณ์ที่ตึงเครียด มีความมั่นใจที่ไม่สั่นคลอน" }
  },
  ESFP: {
    en: { characterName: "Zenitsu Agatsuma", animeTitle: "Demon Slayer", reason: "Like Zenitsu, you are louder, more dramatic, and more entertaining than anyone in the room. You wear your heart entirely on your sleeve and your emotions are your superpower." },
    th: { characterName: "Zenitsu Agatsuma", animeTitle: "Demon Slayer", reason: "เช่นเดียวกับ Zenitsu คุณเสียงดังที่สุด ดราม่าที่สุด และสร้างสีสันได้มากที่สุด คุณเปิดเผยตัวตนอย่างไม่ปิดบัง และอารมณ์ความรู้สึกคือพลังวิเศษของคุณ" }
  }
};

const getAICharacterMatch = async (mbtiType, traits, lang) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const requestedLanguage = lang === 'th' ? 'Thai' : 'English';
    
    const prompt = `Based on the MBTI type "${mbtiType}" and the traits: "${traits}", which specific famous anime character is this user most like? 
    Please respond STRICTLY in ${requestedLanguage}.
    Respond ONLY with a raw JSON object (no markdown, no code blocks) containing exactly these properties:
    - "characterName" (String): The name of the character.
    - "animeTitle" (String): The anime series the character is from.
    - "reason" (String): A short paragraph (2-3 sentences) explaining why the user resembles them.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const aiText = result.response.text().trim();

    const cleanedText = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    // Check if it's a quota error (429) or other API limit
    const isQuotaError = error.message?.includes('429') || error.message?.toLowerCase().includes('quota');
    
    if (isQuotaError) {
      console.warn('⚠️ Gemini Quota Exceeded. Switching to Local Character DB...');
    } else {
      console.error('❌ AI Service Error:', error.message);
    }

    const requestedLang = lang === 'th' ? 'th' : 'en';
    
    // Return high-quality local data if AI fails
    if (characterDB[mbtiType]) {
      return {
        ...characterDB[mbtiType][requestedLang],
        isLocalMatch: true // Tag it so we know it's from our DB
      };
    }
    return null;
  }
};

module.exports = {
  getAICharacterMatch,
  characterDB
};
