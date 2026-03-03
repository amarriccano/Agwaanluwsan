export interface ContentItem {
  id: string
  title: string
  publication: string
  date: string
  year: number
  url?: string
  type: 'interview' | 'article' | 'talk'
  description?: string
}

export const interviews: ContentItem[] = [
  { id: 'i-2025-01', title: 'Mongolia\'s Independence and the Question of Historical Memory', publication: 'Mongolian Public Broadcasting', date: 'November 2025', year: 2025, type: 'interview' },
  { id: 'i-2025-02', title: 'The Bogd Khanate in Comparative Perspective: A Conversation with Dr. Batsaikhan Ookhnoi', publication: 'Inner Asia Journal Podcast', date: 'September 2025', year: 2025, type: 'interview' },
  { id: 'i-2025-03', title: 'Unlocking the Russian Archives: New Evidence on the 1911 Revolution', publication: 'Mongolian National Radio', date: 'August 2025', year: 2025, type: 'interview' },
  { id: 'i-2025-04', title: 'The Centenary of the Mongolian People\'s Republic: Rethinking the Narrative', publication: 'Deutsche Welle Mongolian Service', date: 'June 2025', year: 2025, type: 'interview' },
  { id: 'i-2025-05', title: 'Sovereignty Without Recognition: Mongolia\'s Diplomatic Paradox 1911–1945', publication: 'Eurasian History Podcast', date: 'March 2025', year: 2025, type: 'interview' },
  { id: 'i-2024-01', title: 'The 8th Jebtsundamba Khutuktu as Political Actor: New Archival Evidence', publication: 'BBC World Service', date: 'October 2024', year: 2024, type: 'interview' },
  { id: 'i-2024-02', title: 'Mongolia and the Russian Civil War: Geopolitics on the Steppe', publication: 'New Books Network', date: 'August 2024', year: 2024, type: 'interview' },
  { id: 'i-2024-03', title: 'Theocracy, Nationalism, and Modernity in Early 20th-Century Mongolia', publication: 'Radio Free Asia Mongolian', date: 'May 2024', year: 2024, type: 'interview' },
  { id: 'i-2024-04', title: 'A Conversation on Mongolian Diplomatic History with Batsaikhan Ookhnoi', publication: 'Asian Studies Podcast, Australia National University', date: 'February 2024', year: 2024, type: 'interview' },
  { id: 'i-2023-01', title: 'Ulaanbaatar 1921: The Soviet Military Intervention Reconsidered', publication: 'Voice of America Mongolian', date: 'December 2023', year: 2023, type: 'interview' },
  { id: 'i-2023-02', title: 'The Tripartite Agreement of 1915 and Mongolian Autonomy', publication: 'Japan Broadcasting Corporation (NHK World)', date: 'September 2023', year: 2023, type: 'interview' },
  { id: 'i-2023-03', title: 'How Mongolia Navigated Between Imperial Powers in the Early 20th Century', publication: 'The History of Diplomacy Podcast', date: 'June 2023', year: 2023, type: 'interview' },
  { id: 'i-2022-01', title: 'Mongolia\'s Role in the Cold War: A Historian\'s Perspective', publication: 'Al Jazeera English', date: 'November 2022', year: 2022, type: 'interview' },
  { id: 'i-2022-02', title: 'National Identity and the Historiography of Mongolia\'s Independence', publication: 'Mongolian Public Broadcasting', date: 'August 2022', year: 2022, type: 'interview' },
  { id: 'i-2022-03', title: 'Archival Research and the Writing of Mongolian History', publication: 'University of Cambridge Podcast Series', date: 'March 2022', year: 2022, type: 'interview' },
  { id: 'i-2021-01', title: 'One Hundred Years of the Mongolian People\'s Republic', publication: 'Russian State Television', date: 'July 2021', year: 2021, type: 'interview' },
  { id: 'i-2021-02', title: 'Between Russia and China: Mongolia\'s Geopolitical Position in Historical Perspective', publication: 'Nikkei Asia', date: 'April 2021', year: 2021, type: 'interview' },
  { id: 'i-2020-01', title: 'The Making of the Mongolian State: An Oral History Discussion', publication: 'MNBC Television', date: 'October 2020', year: 2020, type: 'interview' },
  { id: 'i-2019-01', title: 'Diplomatic Isolation and National Survival: Lessons from Mongolian History', publication: 'Foreign Affairs Podcast', date: 'June 2019', year: 2019, type: 'interview' },
  { id: 'i-2018-01', title: 'The Soviet Purges in Mongolia: New Research and Old Questions', publication: 'RFI Mongolian Service', date: 'March 2018', year: 2018, type: 'interview' },
]

export const articles: ContentItem[] = [
  { id: 'a-2025-01', title: 'The Legal Status of Outer Mongolia 1911–1924: A Reassessment', publication: 'Journal of Asian Studies, Vol. 84, No. 3', date: 'September 2025', year: 2025, type: 'article' },
  { id: 'a-2025-02', title: 'Bogd Khan\'s Foreign Policy Correspondence: New Documents from the Mongolian National Archive', publication: 'Inner Asia, Vol. 27, No. 1', date: 'June 2025', year: 2025, type: 'article' },
  { id: 'a-2024-01', title: 'Mongolia\'s Declaration of Independence: Historiographical Debates and New Evidence', publication: 'Mongolian Studies, Vol. 46', date: 'December 2024', year: 2024, type: 'article' },
  { id: 'a-2024-02', title: 'The 1921 Revolution and the End of the Theocratic State', publication: 'Central Asian Survey, Vol. 43, No. 2', date: 'August 2024', year: 2024, type: 'article' },
  { id: 'a-2023-01', title: 'Sovereignty Contested: Mongolia between Russia, China and Japan 1932–1939', publication: 'Diplomacy & Statecraft, Vol. 34, No. 4', date: 'November 2023', year: 2023, type: 'article' },
  { id: 'a-2023-02', title: 'The Kyakhta Treaty of 1915 and its Consequences for Mongolian Autonomy', publication: 'Russian History, Vol. 50, No. 1–2', date: 'June 2023', year: 2023, type: 'article' },
  { id: 'a-2022-01', title: 'National Heroes and Historical Memory: The Politics of Commemoration in Post-Communist Mongolia', publication: 'Nationalities Papers, Vol. 50, No. 3', date: 'September 2022', year: 2022, type: 'article' },
  { id: 'a-2021-01', title: 'The Mongolian People\'s Republic and Soviet Foreign Policy: A Reconsideration', publication: 'Europe-Asia Studies, Vol. 73, No. 5', date: 'July 2021', year: 2021, type: 'article' },
  { id: 'a-2021-02', title: 'Empire, Nation and State: Comparing the Mongolian Independence Movement with Other Asian Cases', publication: 'Modern Asian Studies, Vol. 55, No. 4', date: 'March 2021', year: 2021, type: 'article' },
  { id: 'a-2020-01', title: 'Archives, Access, and Authority: Challenges in Writing Mongolian Diplomatic History', publication: 'History and Theory, Vol. 59, No. 2', date: 'October 2020', year: 2020, type: 'article' },
  { id: 'a-2019-01', title: 'The Bogd Khanate\'s International Recognition Efforts 1911–1915', publication: 'Slavic Review, Vol. 78, No. 3', date: 'September 2019', year: 2019, type: 'article' },
  { id: 'a-2018-01', title: 'Military Force and Political Change in Early Republican Mongolia', publication: 'Journal of Military History, Vol. 82, No. 2', date: 'April 2018', year: 2018, type: 'article' },
  { id: 'a-2017-01', title: 'Religion and Politics in the Bogd Khanate of Mongolia', publication: 'Religion, State and Society, Vol. 45, No. 1', date: 'February 2017', year: 2017, type: 'article' },
  { id: 'a-2016-01', title: 'The Chinese Military in Outer Mongolia and the Independence Movement', publication: 'Journal of Chinese History, Vol. 1, No. 1', date: 'November 2016', year: 2016, type: 'article' },
  { id: 'a-2015-01', title: 'Mongolia\'s Entry into the League of Nations, 1945–1961: A Long Struggle for Recognition', publication: 'Diplomacy & Statecraft, Vol. 26, No. 3', date: 'August 2015', year: 2015, type: 'article' },
  { id: 'a-2014-01', title: 'The Russian Consul in Urga and the Origins of Mongolian Independence', publication: 'Slavonic and East European Review, Vol. 92, No. 4', date: 'October 2014', year: 2014, type: 'article' },
  { id: 'a-2013-01', title: 'Constructing the Mongolian Nation: Elite Networks and Political Culture in the 1911 Revolution', publication: 'Journal of Modern History, Vol. 85, No. 2', date: 'June 2013', year: 2013, type: 'article' },
]

export const talks: ContentItem[] = [
  { id: 't-2025-01', title: 'The Sovereignty of the Bogd Khanate: International Law and Historical Practice', publication: 'Keynote Address, National University of Mongolia Annual History Symposium, Ulaanbaatar', date: 'September 2025', year: 2025, type: 'talk', description: 'Keynote Address' },
  { id: 't-2025-02', title: 'Archival Excavations: New Sources for Mongolian Diplomatic History', publication: 'Workshop on Central Asian Archives, Cambridge University', date: 'May 2025', year: 2025, type: 'talk', description: 'Invited Lecture' },
  { id: 't-2024-01', title: 'Mongolia and the Post-WWI Order: A Small State\'s Struggle for Recognition', publication: 'Panel on Small States and International Order, American Historical Association Annual Meeting, San Francisco', date: 'January 2024', year: 2024, type: 'talk', description: 'Conference Paper' },
  { id: 't-2024-02', title: 'The Bogd Khan\'s Foreign Policy: Theocratic Statecraft in Practice', publication: 'Invited Lecture, School of Oriental and African Studies (SOAS), University of London', date: 'March 2024', year: 2024, type: 'talk', description: 'Invited Lecture' },
  { id: 't-2023-01', title: 'Mongolia Between Empires: Geopolitics and Sovereignty in the Early Twentieth Century', publication: 'International Conference on Inner Asian History, National Palace Museum, Taipei', date: 'October 2023', year: 2023, type: 'talk', description: 'Keynote Address' },
  { id: 't-2023-02', title: 'Rethinking the 1921 Revolution: Agency, Ideology and Soviet Intervention', publication: 'Colloquium on Revolutions in Asia, Harvard University', date: 'April 2023', year: 2023, type: 'talk', description: 'Invited Colloquium Paper' },
  { id: 't-2022-01', title: 'National Memory and Historical Responsibility in Post-Communist Mongolia', publication: 'Public Lecture, German-Mongolian Institute for Resources and Technology, Ulaanbaatar', date: 'November 2022', year: 2022, type: 'talk', description: 'Public Lecture' },
  { id: 't-2022-02', title: 'The Tripartite Agreement of 1915: A Reassessment', publication: 'Conference on Russian and Chinese Relations in Inner Asia, St. Petersburg State University', date: 'June 2022', year: 2022, type: 'talk', description: 'Conference Paper' },
  { id: 't-2021-01', title: 'One Hundred Years: Mongolia\'s Independence and the Writing of National History', publication: 'Centennial Symposium of the Mongolian People\'s Republic, State Great Khural, Ulaanbaatar', date: 'July 2021', year: 2021, type: 'talk', description: 'Plenary Lecture' },
  { id: 't-2020-01', title: 'The Making of the Mongolian State: Archives, Evidence and Interpretation', publication: 'Mongolia Society Annual Meeting (online)', date: 'October 2020', year: 2020, type: 'talk', description: 'Invited Lecture' },
  { id: 't-2019-01', title: 'Sovereignty Reconsidered: Mongolia\'s International Legal Status from 1911 to 1945', publication: 'Symposium on International Law and Asian History, National University of Singapore', date: 'August 2019', year: 2019, type: 'talk', description: 'Symposium Paper' },
  { id: 't-2018-01', title: 'Religion, Revolution, and the Mongolian State', publication: 'Workshop on Religion and Politics in Communist States, European University Institute, Florence', date: 'May 2018', year: 2018, type: 'talk', description: 'Workshop Paper' },
  { id: 't-2017-01', title: 'The Soviet Factor in Mongolian Independence', publication: 'International Symposium on the Russian Revolution and Asia, Moscow State University', date: 'November 2017', year: 2017, type: 'talk', description: 'Conference Paper' },
  { id: 't-2016-01', title: 'How Mongolia Became a State: A Comparative Historical Perspective', publication: 'Keynote Address, East Asian Studies Annual Conference, Seoul National University', date: 'September 2016', year: 2016, type: 'talk', description: 'Keynote Address' },
]

// Group content by year
export function groupByYear<T extends { year: number }>(items: T[]): Record<number, T[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = []
    acc[item.year].push(item)
    return acc
  }, {} as Record<number, T[]>)
}

// All searchable content
export const allContent = [
  ...interviews.map(i => ({ ...i, type: 'interview' as const })),
  ...articles.map(a => ({ ...a, type: 'article' as const })),
  ...talks.map(t => ({ ...t, type: 'talk' as const })),
]
