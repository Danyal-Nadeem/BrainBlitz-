import type { CategoryId, Question, Category } from '../types'

export const CATEGORIES: Category[] = [
  { id: 'general', name: 'General Knowledge', emoji: '🌍', color: 'from-emerald-500 to-teal-600', glow: 'rgba(16,185,129,0.3)', count: 10 },
  { id: 'tech', name: 'Technology', emoji: '💻', color: 'from-blue-500 to-indigo-600', glow: 'rgba(59,130,246,0.3)', count: 10 },
  { id: 'science', name: 'Science', emoji: '🔬', color: 'from-violet-500 to-purple-600', glow: 'rgba(139,92,246,0.3)', count: 10 },
  { id: 'popculture', name: 'Pop Culture', emoji: '🎬', color: 'from-pink-500 to-rose-600', glow: 'rgba(236,72,153,0.3)', count: 10 },
  { id: 'math', name: 'Mathematics', emoji: '📐', color: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.3)', count: 10 },
  { id: 'history', name: 'History', emoji: '🏛️', color: 'from-amber-700 to-amber-900', glow: 'rgba(180,83,9,0.3)', count: 10 },
]

export const questionBank: Record<CategoryId, Question[]> = {
  general: [
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answer: 2
    },
    {
      question: "Which country is home to the landmark Machu Picchu?",
      options: ["Colombia", "Peru", "Bolivia", "Chile"],
      answer: 1
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "Benjamin Franklin", "George Washington", "John Adams"],
      answer: 2
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
      answer: 3
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["Brazil", "Germany", "France", "Croatia"],
      answer: 2
    },
    {
      question: "What is the longest river in the world?",
      options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
      answer: 1
    },
    {
      question: "Which famous landmark is located in Agra, India?",
      options: ["Taj Mahal", "Qutub Minar", "Hawa Mahal", "Red Fort"],
      answer: 0
    },
    {
      question: "Which year did the Titanic sink in the North Atlantic Ocean?",
      options: ["1908", "1912", "1918", "1923"],
      answer: 1
    },
    {
      question: "Which country has the most natural lakes in the world?",
      options: ["Canada", "Russia", "United States", "Brazil"],
      answer: 0
    },
    {
      question: "Who was the first woman to win a Nobel Prize?",
      options: ["Rosalind Franklin", "Marie Curie", "Ada Lovelace", "Jane Goodall"],
      answer: 1
    }
  ],
  tech: [
    {
      question: "Which programming language was created by Brendan Eich in 1995?",
      options: ["Python", "Java", "JavaScript", "C++"],
      answer: 2
    },
    {
      question: "What does HTTP stand for in web terminology?",
      options: ["Hypertext Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Technology Process", "Hyperlink Text Transmission Protocol"],
      answer: 0
    },
    {
      question: "Which tech company acquired GitHub in 2018?",
      options: ["Google", "Microsoft", "Apple", "Amazon"],
      answer: 1
    },
    {
      question: "In computer science, what does CSS stand for?",
      options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Complex Style Syntax"],
      answer: 2
    },
    {
      question: "Which operating system is based on the Linux kernel and developed by Google?",
      options: ["iOS", "Windows", "Android", "macOS"],
      answer: 2
    },
    {
      question: "What was the name of the first graphical web browser released in 1993?",
      options: ["Internet Explorer", "Netscape Navigator", "Opera", "Mosaic"],
      answer: 3
    },
    {
      question: "Which company created the React framework?",
      options: ["Google", "Meta", "Microsoft", "Netflix"],
      answer: 1
    },
    {
      question: "What is the main database query language used for managing relational databases?",
      options: ["SQL", "NoSQL", "GraphQL", "MongoDB"],
      answer: 0
    },
    {
      question: "Who is widely considered the father of modern computing?",
      options: ["Alan Turing", "Steve Jobs", "Bill Gates", "Tim Berners-Lee"],
      answer: 0
    },
    {
      question: "What is the standard port number for secure HTTPS connections?",
      options: ["80", "8080", "443", "22"],
      answer: 2
    }
  ],
  science: [
    {
      question: "What is the chemical symbol for Gold?",
      options: ["Ag", "Au", "Fe", "Gd"],
      answer: 1
    },
    {
      question: "What is the approximate speed of light in a vacuum?",
      options: ["150,000 km/s", "300,000 km/s", "450,000 km/s", "600,000 km/s"],
      answer: 1
    },
    {
      question: "Which organ in the human body is responsible for pumping blood?",
      options: ["Lungs", "Brain", "Liver", "Heart"],
      answer: 3
    },
    {
      question: "Which planet in our solar system is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: 1
    },
    {
      question: "What gas do plants absorb during photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      answer: 2
    },
    {
      question: "Which scientist developed the general theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
      answer: 1
    },
    {
      question: "What is the most abundant element in the Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon", "Argon"],
      answer: 1
    },
    {
      question: "How many bones are there in an adult human body?",
      options: ["186", "206", "226", "256"],
      answer: 1
    },
    {
      question: "Which fundamental force keeps us grounded on Earth?",
      options: ["Electromagnetism", "Weak Nuclear Force", "Strong Nuclear Force", "Gravity"],
      answer: 3
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"],
      answer: 2
    }
  ],
  popculture: [
    {
      question: "Which film won the Academy Award for Best Picture in 2020?",
      options: ["1917", "Parasite", "Roma", "Joker"],
      answer: 1
    },
    {
      question: "Who is the artist behind the hit song 'Shape of You' released in 2017?",
      options: ["Justin Bieber", "Bruno Mars", "Ed Sheeran", "The Weeknd"],
      answer: 2
    },
    {
      question: "What is the name of the fictional continent where the main action of 'Game of Thrones' takes place?",
      options: ["Essos", "Westeros", "Tamriel", "Middle-earth"],
      answer: 1
    },
    {
      question: "Which video game became the best-selling video game of all time?",
      options: ["Minecraft", "Grand Theft Auto V", "Wii Sports", "PUBG"],
      answer: 0
    },
    {
      question: "What is the name of the character played by Keanu Reeves in the Matrix series?",
      options: ["Morpheus", "Neo", "Agent Smith", "John Wick"],
      answer: 1
    },
    {
      question: "Which singer is known as the 'Queen of Pop'?",
      options: ["Beyoncé", "Lady Gaga", "Madonna", "Taylor Swift"],
      answer: 2
    },
    {
      question: "In the Marvel Cinematic Universe, what is the home planet of Thor?",
      options: ["Asgard", "Krypton", "Xandar", "Titan"],
      answer: 0
    },
    {
      question: "Which Netflix series features characters named Eleven, Mike, and Dustin?",
      options: ["Dark", "Stranger Things", "Wednesday", "The Witcher"],
      answer: 1
    },
    {
      question: "Who won the Grammy Award for Album of the Year in 2023 for 'Harry's House'?",
      options: ["Harry Styles", "Adele", "Beyoncé", "Lizzo"],
      answer: 0
    },
    {
      question: "What is the highest-grossing film of all time?",
      options: ["Avengers: Endgame", "Titanic", "Avatar", "Star Wars: The Force Awakens"],
      answer: 2
    }
  ],
  math: [
    {
      question: "What is the mathematical constant representing the ratio of a circle's circumference to its diameter?",
      options: ["Euler's number (e)", "Golden Ratio (phi)", "Pi (pi)", "Pythagoras' constant"],
      answer: 2
    },
    {
      question: "What is the value of 8 cubed (8 to the power of 3)?",
      options: ["64", "256", "512", "1024"],
      answer: 2
    },
    {
      question: "Which prime number is the only even prime number?",
      options: ["0", "1", "2", "3"],
      answer: 2
    },
    {
      question: "In a right-angled triangle, if the legs are 3 and 4, what is the length of the hypotenuse?",
      options: ["5", "6", "7", "8"],
      answer: 0
    },
    {
      question: "What is the value of x if 3x + 7 = 22?",
      options: ["3", "4", "5", "6"],
      answer: 2
    },
    {
      question: "Which mathematician is credited with the theorem a^2 + b^2 = c^2?",
      options: ["Euclid", "Archimedes", "Newton", "Pythagoras"],
      answer: 3
    },
    {
      question: "What is the sum of the interior angles of a hexagon?",
      options: ["360 degrees", "540 degrees", "720 degrees", "900 degrees"],
      answer: 2
    },
    {
      question: "What is the probability of flipping a fair coin and getting heads three times in a row?",
      options: ["1/2", "1/4", "1/6", "1/8"],
      answer: 3
    },
    {
      question: "Who is considered the father of geometry?",
      options: ["Pythagoras", "Euclid", "Isaac Newton", "René Descartes"],
      answer: 1
    },
    {
      question: "What is the derivative of any constant value?",
      options: ["0", "1", "x", "Infinity"],
      answer: 0
    }
  ],
  history: [
    {
      question: "Who was the first Emperor of the Roman Empire?",
      options: ["Julius Caesar", "Augustus", "Nero", "Marcus Aurelius"],
      answer: 1
    },
    {
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      answer: 2
    },
    {
      question: "Which empire was ruled by Suleiman the Magnificent?",
      options: ["Ottoman Empire", "Byzantine Empire", "Roman Empire", "Persian Empire"],
      answer: 0
    },
    {
      question: "Who was the first female Prime Minister of the United Kingdom?",
      options: ["Theresa May", "Margaret Thatcher", "Liz Truss", "Queen Victoria"],
      answer: 1
    },
    {
      question: "The Magna Carta was signed by which English King in 1215?",
      options: ["King John", "King Henry VIII", "King Richard I", "King Edward I"],
      answer: 0
    },
    {
      question: "Which ancient civilization built the city of Machu Picchu?",
      options: ["Mayans", "Aztecs", "Incas", "Egyptians"],
      answer: 2
    },
    {
      question: "Who was the French national heroine during the Hundred Years' War?",
      options: ["Marie Antoinette", "Joan of Arc", "Charlotte Corday", "Eleanor of Aquitaine"],
      answer: 1
    },
    {
      question: "Which explorer led the first expedition to circumnavigate the globe?",
      options: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "James Cook"],
      answer: 2
    },
    {
      question: "The storming of the Bastille occurred in which city in 1789?",
      options: ["Marseille", "Paris", "Lyon", "Versailles"],
      answer: 1
    },
    {
      question: "Who was the key architect of German unification in 1871?",
      options: ["Otto von Bismarck", "Kaiser Wilhelm II", "Adolf Hitler", "Frederick the Great"],
      answer: 0
    }
  ]
}
