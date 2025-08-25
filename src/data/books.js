import bukhari from "../assets/bukhari.png";
import ibn from "../assets/ibn.png";
import shiz from "../assets/shiz.png";
import izha from "../assets/izha.png";
import theBible from "../assets/the-bible.png";
import fatihah from "../assets/fatihah.png";

const books = [
  {
    id: 1,
    title: "Sahih Al-Bukhari",
    author: "Imam Bukhari",
    year: 2020,
    description:
      "The most authentic collection of Hadith compiled by Imam Bukhari.",
    longDescription:
      "Sahih Al-Bukhari is considered the most authentic collection of sayings and deeds of Prophet Muhammad (pbuh). Imam Bukhari spent over 16 years traveling and verifying thousands of narrations to ensure their authenticity. Each report was carefully analyzed for reliability and compared with the Qur’an. Today, this collection remains one of the most authoritative references for Muslims around the world.",
    isbn: "978-1234567890",
    available: "0/5 available",
    image: bukhari,
    language: "Arabic-English",
    category: "Hadith",
    status: "Not Available",
  },
  {
    id: 2,
    title: "Ibn Teymiyah",
    author: "Ibn Teymiyah",
    year: 2015,
    description:
      "A detailed collection of historical records and works of Imam Ibn Teymiyah.",
    longDescription:
      "This work compiles the teachings and writings of Ibn Teymiyah, a renowned scholar and reformer in Islamic history. His works addressed theology, philosophy, and jurisprudence, often challenging prevailing practices of his time. His legacy has continued to influence Islamic thought for centuries, and his books remain widely studied across the Muslim world.",
    isbn: "978-1234567891",
    available: "1/4 available",
    image: ibn,
    language: "Arabic",
    category: "History",
    status: "Available",
  },
  {
    id: 3,
    title: "Shiz",
    author: "Tarik Ibn Surah",
    year: 2010,
    description: "The best collection of poems.",
    longDescription:
      "Shiz is a poetic collection that brings together centuries of oral tradition, lyrical beauty, and wisdom expressed through Amharic poetry. The author captures themes of love, struggle, spirituality, and culture, making the book both a literary masterpiece and a reflection of Ethiopia’s poetic heritage.",
    isbn: "978-1234567892",
    available: "2/3 available",
    image: shiz,
    language: "Amharic",
    category: "Poetry",
    status: "Available",
  },
  {
    id: 4,
    title: "IZHAR-UL-HAQ – Part 1",
    author: "Rahmatullah Al-Kairanawi",
    year: 2020,
    description: "Contradictions and Errors in the Biblical text.",
    longDescription:
      "Izhar-ul-Haq, written during the 19th century, is a monumental work by Rahmatullah Al-Kairanawi. It was written in response to Christian missionary challenges in India. The book systematically points out contradictions and errors in the Bible while defending the authenticity of the Qur’an. It remains one of the most significant contributions to comparative religion in modern Islamic scholarship.",
    isbn: "978-1234567893",
    available: "3/5 available",
    image: izha,
    language: "Arabic-English",
    category: "Comparative Religion",
    status: "Available",
  },
  {
    id: 5,
    title: "Let The Bible Speak",
    author: "Abdul Ahad Dawud",
    year: 2020,
    description: "Detailed explanation of the truth from the Bible.",
    longDescription:
      "Written by Abdul Ahad Dawud, a former Christian priest who embraced Islam, 'Let The Bible Speak' explores hidden inconsistencies and contradictions in the Bible while affirming the consistency of the Qur’an. The book presents arguments for the authenticity of Islamic teachings and provides readers with insight into comparative religion from the perspective of a former insider.",
    isbn: "978-1234567894",
    available: "4/6 available",
    image: theBible,
    language: "English",
    category: "Comparative Religion",
    status: "Available",
  },
  {
    id: 6,
    title: "Al-Fatihah And Juz’ Amma",
    author: "Various Scholars",
    year: 2020,
    description:
      "A translation and commentary of Al-Fatihah and Juz Amma from the Qur’an.",
    longDescription:
      "This book offers a detailed translation and commentary of Surah Al-Fatihah and Juz Amma (the 30th section of the Qur’an). It explains linguistic meanings, historical context, and spiritual lessons from each surah. Designed for both students and general readers, it helps connect modern readers with the timeless guidance of the Qur’an.",
    isbn: "978-1234567895",
    available: "2/4 available",
    image: fatihah,
    language: "Arabic-English",
    category: "Quran",
    status: "Available",
  },
];

export default books;
