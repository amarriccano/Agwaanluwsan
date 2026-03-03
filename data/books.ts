export interface Book {
  id: string
  title: string
  subtitle: string
  year: number
  publisher: string
  pages: number
  isbn: string
  price: number
  language: string
  coverGradient?: string
  description: string
  category: string
}

export const books: Book[] = [
  {
    id: 'bogd-khan-biography',
    title: 'Bogd Khan: The Last Sacred King of Mongolia',
    subtitle: 'A Biography of the 8th Jebtsundamba Khutuktu and the Theocratic State 1911–1924',
    year: 2024,
    publisher: 'Academy of Sciences of Mongolia Press',
    pages: 486,
    isbn: '978-99929-56-88-1',
    price: 35000,
    language: 'Mongolian / English',
    coverGradient: 'linear-gradient(135deg, #1a237e, #4a148c)',
    description: 'An exhaustive scholarly biography of the 8th Jebtsundamba Khutuktu, the spiritual and political leader who guided Mongolia through the declaration of independence in 1911 and the turbulent years of the theocratic Bogd Khanate until 1924. Drawing on newly declassified archives from Ulaanbaatar, Beijing, Moscow and London.',
    category: 'Biography'
  },
  {
    id: 'outer-mongolia-powers',
    title: 'Outer Mongolia and the Great Powers',
    subtitle: 'A Diplomatic History of Sovereignty and Recognition 1911–1946',
    year: 2022,
    publisher: 'Springer / Mongolian State University Press',
    pages: 412,
    isbn: '978-99929-56-72-0',
    price: 42000,
    language: 'English',
    coverGradient: 'linear-gradient(135deg, #162447, #1565c0)',
    description: 'A comprehensive diplomatic history tracing Mongolia\'s struggle for international recognition from the 1911 revolution through the Soviet-era transformation. Based on archival research in the Russian State Archive of Foreign Policy, the Mongolian National Archives, and the British Public Record Office.',
    category: 'Diplomatic History'
  },
  {
    id: 'mongolia-1911-revolution',
    title: 'The 1911 Revolution: National Liberation from the Qing Empire',
    subtitle: 'Independence, Identity and the Creation of the Mongolian State',
    year: 2019,
    publisher: 'Mongolian National University Press',
    pages: 338,
    isbn: '978-99929-56-51-5',
    price: 28000,
    language: 'Mongolian',
    coverGradient: 'linear-gradient(135deg, #4e342e, #6d4c41)',
    description: 'A groundbreaking reexamination of the 1911 Mongolian revolution, arguing for its status as a full national liberation movement rather than a mere succession crisis. The author draws on previously untranslated Mongolian, Chinese, and Russian primary sources to reconstruct the political networks and ideological currents that made independence possible.',
    category: 'Political History'
  },
  {
    id: 'mongolian-soviet-relations',
    title: 'Mongolia in the Soviet Orbit',
    subtitle: 'State, Society and Sovereignty Under Communist Rule 1924–1990',
    year: 2017,
    publisher: 'Brill Academic Publishers',
    pages: 510,
    isbn: '978-90-04-32887-6',
    price: 55000,
    language: 'English',
    coverGradient: 'linear-gradient(135deg, #263238, #37474f)',
    description: 'An authoritative account of Mongolia\'s transformation into a Soviet satellite state, examining the Mongolian People\'s Republic\'s relationship with Moscow through the lens of sovereignty, governance and cultural policy. Winner of the 2018 Mongolian National Book Award in the Historical Sciences category.',
    category: 'Modern History'
  },
  {
    id: 'archives-diplomatic-history',
    title: 'Archives of Mongolian Diplomatic History',
    subtitle: 'Selected Documents 1911–1950 with Commentary',
    year: 2015,
    publisher: 'Academy of Sciences of Mongolia Press',
    pages: 620,
    isbn: '978-99929-56-38-6',
    price: 30000,
    language: 'Mongolian / Russian',
    coverGradient: 'linear-gradient(135deg, #1b5e20, #388e3c)',
    description: 'A scholarly edition of 240 primary source documents from the period of Mongolia\'s independence and early statehood, drawn from archives in Ulaanbaatar, Moscow and Beijing. Each document is introduced with detailed contextual commentary.',
    category: 'Primary Sources'
  },
  {
    id: 'mongolian-sovereignty-essays',
    title: 'Mongolian Sovereignty: Essays in Historical Interpretation',
    subtitle: 'Collected Papers 2005–2014',
    year: 2014,
    publisher: 'Mongolian State University Press',
    pages: 295,
    isbn: '978-99929-56-29-4',
    price: 22000,
    language: 'Mongolian',
    coverGradient: 'linear-gradient(135deg, #880e4f, #ad1457)',
    description: 'A collection of the author\'s most influential essays spanning a decade of scholarship, addressing the conceptual and historical dimensions of Mongolian sovereignty, national identity, and the international legal status of the Mongolian state across the 20th century.',
    category: 'Essays'
  }
]

export const formatPrice = (price: number): string => {
  return price.toLocaleString('mn-MN') + ' ₮'
}
