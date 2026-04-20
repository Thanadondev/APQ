export const questions = [
  // E vs I (Extroversion vs Introversion)
  {
    id: 1,
    text: {
      en: "In a chaotic battlefield, you naturally shout commands to re-establish connection and order amongst your allies.",
      th: "ในสนามรบที่วุ่นวาย คุณมักจะเป็นฝ่ายตะโกนออกคำสั่งเพื่อดึงสติและจัดระเบียบพันธมิตรของคุณเสมอ"
    },
    axis: "EI",
    direction: 1 // Agree = E, Disagree = I
  },
  {
    id: 2,
    text: {
      en: "After a grueling final battle, you seek a quiet, remote place to reflect alone rather than joining the grand victory banquet.",
      th: "หลังจากผ่านการต่อสู้ครั้งใหญ่ คุณจะปลีกวิเวกไปเงียบๆ เพื่อทบทวนตัวเองเพียงลำพัง มากกว่าที่จะไปเข้าร่วมงานเลี้ยงฉลองชัยชนะ"
    },
    axis: "EI",
    direction: -1 // Agree = I, Disagree = E
  },
  {
    id: 3,
    text: {
      en: "You uncover a terrifying truth about your kingdom. Your first instinct is to reveal it to the public to rally for a revolution.",
      th: "เมื่อค้นพบความจริงอันดำมืดของอาณาจักร สัญชาตญาณแรกของคุณคือการเปิดเผยข้อมูลนั้นสู่สาธารณะเพื่อปลุกระดมการปฏิวัติ"
    },
    axis: "EI",
    direction: 1 // Agree = E, Disagree = I
  },
  {
    id: 4,
    text: {
      en: "You perfect your ultimate technique through relentless, solitary repetition rather than loud, competitive sparring.",
      th: "คุณขัดเกลาท่าไม้ตายของคุณให้สมบูรณ์แบบผ่านการฝึกซ้ำๆ อย่างโดดเดี่ยว ดีกว่าการไปฝึกซ้อมกับคู่แข่งในลานประลองที่วุ่นวาย"
    },
    axis: "EI",
    direction: -1 // Agree = I, Disagree = E
  },

  // S vs N (Sensing vs Intuition)
  {
    id: 5,
    text: {
      en: "When given an ancient prophecy, you focus on translating literal runes and historical facts rather than searching for cosmic metaphors.",
      th: "เมื่อได้รับคำทำนายโบราณ คุณจะโฟกัสที่การแปลอักขระ ค้นหาบันทึกประวัติศาสตร์ มากกว่าการนำไปตีความเชื่อมโยงกับปรัชญานามธรรม"
    },
    axis: "SN",
    direction: 1 // Agree = S, Disagree = N
  },
  {
    id: 6,
    text: {
      en: "In combat, your strategy completely relies on untried, chaotic concepts that break conventional laws instead of polished fundamentals.",
      th: "ในการต่อสู้ กลยุทธ์ของคุณมักจะเป็นการด้นสด สร้างกระบวนท่าที่บ้าคลั่งไร้แบบแผน เพื่อทำลายหลักการต่อสู้พื้นฐานเกือบทุกครั้ง"
    },
    axis: "SN",
    direction: -1 // Agree = N, Disagree = S
  },
  {
    id: 7,
    text: {
      en: "Looking at a floating magical city, you marvel at its architectural weight distribution and mana engines rather than its philosophical meaning.",
      th: "เมื่อมองดูเมืองเวทมนตร์ลอยฟ้า คุณจะทึ่งในวิศวกรรมโครงสร้างและกลไกเครื่องยนต์มานาของมัน มากกว่านึกถึงความหมายทางปรัชญาของมัน"
    },
    axis: "SN",
    direction: 1 // Agree = S, Disagree = N
  },
  {
    id: 8,
    text: {
      en: "You prefer to grasp the fundamental cosmic core of a spell and alter its entire formula rather than following the wizard's instructions perfectly.",
      th: "คุณชอบทำความเข้าใจแก่นแท้ของเวทมนตร์ แล้วดัดแปลงสมการสร้างเป็นเวทมนตร์ของคุณเอง มากกว่าที่จะร่ายตามตำราแบบเป๊ะๆ"
    },
    axis: "SN",
    direction: -1 // Agree = N, Disagree = S
  },

  // T vs F (Thinking vs Feeling)
  {
    id: 9,
    text: {
      en: "If the Emperor offers world peace in exchange for sacrificing one innocent life, you would calculate that it is a logically necessary choice.",
      th: "หากจักรพรรดิเสนอสันติภาพโดยแลกกับการสังเวยผู้บริสุทธิ์เพียงหนึ่งคน คุณจะมองว่าในแง่ของตรรกะและกลยุทธ์แล้ว มันเป็นตัวเลือกที่ต้องทำ"
    },
    axis: "TF",
    direction: 1 // Agree = T, Disagree = F
  },
  {
    id: 10,
    text: {
      en: "A longtime teammate betrays the guild to save their dying family. You believe they merit a chance at redemption because their motive was love.",
      th: "เพื่อนร่วมทีมทรยศกิลด์เพื่อนำเงินไปช่วยครอบครัวที่กำลังจะตาย คุณเชื่อว่าเขาเหมาะสมที่จะได้รับโอกาสไถ่บาป เพราะแรงจูงใจนั้นมาจากความรัก"
    },
    axis: "TF",
    direction: -1 // Agree = F, Disagree = T
  },
  {
    id: 11,
    text: {
      en: "When establishing laws for a new utopia, you prioritize building an automated, hyper-efficient meritocracy over systems focused on healing emotional trauma.",
      th: "ในการสร้างประเทศใหม่ คุณจะให้ความสำคัญกับระบบที่วัดผลตามความสามารถและจัดสรรทรัพยากรอย่างมีประสิทธิภาพ มากกว่าระบบที่มุ่งเน้นการเยียวยาบาดแผลทางใจ"
    },
    axis: "TF",
    direction: 1 // Agree = T, Disagree = F
  },
  {
    id: 12,
    text: {
      en: "You evaluate your true worth as a protagonist by the innocent people you have shielded and the boundless hope you inspire in others.",
      th: "เมื่อต้องประเมินคุณค่าของตัวคุณเอง คุณจะวัดผลจากจำนวนผู้บริสุทธิ์ที่คุณปกป้องได้ และความหวังที่คุณจุดประกายให้กับผู้คนรอบข้าง"
    },
    axis: "TF",
    direction: -1 // Agree = F, Disagree = T
  },

  // J vs P (Judging vs Perceiving)
  {
    id: 13,
    text: {
      en: "When infiltrating the Demon King's fortress, you demand the squad synchronize watches and execute a heavily analyzed, step-by-step master plan.",
      th: "ก่อนการบุกป้อมจอมมาร คุณจะให้ทุกคนในหน่วยตั้งเวลาให้ตรงกัน และบุกโจมตีตามแผนการแบบเป็นขั้นเป็นตอนที่ผ่านการวิเคราะห์มาอย่างดี"
    },
    axis: "JP",
    direction: 1 // Agree = J, Disagree = P
  },
  {
    id: 14,
    text: {
      en: "You view your 'Ultimate Destiny' as an unscripted, chaotic ocean where you eagerly embrace unpredictable detours and improvisations.",
      th: "คุณมองโชคชะตาว่าเป็นเหมือนมหาสมุทรที่คาดเดาไม่ได้ และคุณพร้อมที่จะโอบรับทุกๆ การหักมุม และความวุ่นวายที่จะพุ่งเข้ามาตามทางแบบไม่ได้วางแผน"
    },
    axis: "JP",
    direction: -1 // Agree = P, Disagree = J
  },
  {
    id: 15,
    text: {
      en: "After securing a legendary, reality-bending artifact, your first move is to systematically classify it and test its limits in a controlled environment.",
      th: "เมื่อคุณได้ครอบครองไอเทมระดับตำนาน สิ่งแรกที่คุณทำคือการแยกแยะจัดหมวดหมู่มัน และนำไปทดสอบขีดจำกัดสูงสุดอย่างระมัดระวัง"
    },
    axis: "JP",
    direction: 1 // Agree = J, Disagree = P
  },
  {
    id: 16,
    text: {
      en: "When solving a dangerously complex mystery, you prefer floating multiple conflicting theories until a final piece of evidence naturally synthesizes them.",
      th: "เวลาเจอคดีซ่อนเงื่อน คุณมักจะปล่อยให้ทฤษฎีที่ขัดแย้งกันหลายๆ ทางลอยอยู่ในหัว จนกว่าคุณจะเจอหลักฐานชิ้นสุดท้ายที่จะผสานทุกอย่างเข้าด้วยกันเอง"
    },
    axis: "JP",
    direction: -1 // Agree = P, Disagree = J
  }
];
