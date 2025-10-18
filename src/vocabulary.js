// Vocabulary data organized by difficulty level
const vocabularyData = {
    // Level 1: Single letters (SUV equivalent)
    letters: [
        { english: 'A', kannada: 'ಅ', difficulty: 'letter' },
        { english: 'I', kannada: 'ಇ', difficulty: 'letter' },
        { english: 'U', kannada: 'ಉ', difficulty: 'letter' },
        { english: 'E', kannada: 'ಎ', difficulty: 'letter' },
        { english: 'O', kannada: 'ಒ', difficulty: 'letter' },
        { english: 'Ka', kannada: 'ಕ', difficulty: 'letter' },
        { english: 'Ga', kannada: 'ಗ', difficulty: 'letter' },
        { english: 'Cha', kannada: 'ಚ', difficulty: 'letter' },
        { english: 'Ta', kannada: 'ತ', difficulty: 'letter' },
        { english: 'Pa', kannada: 'ಪ', difficulty: 'letter' },
        { english: 'Ma', kannada: 'ಮ', difficulty: 'letter' },
        { english: 'Ra', kannada: 'ರ', difficulty: 'letter' },
        { english: 'La', kannada: 'ಲ', difficulty: 'letter' },
        { english: 'Va', kannada: 'ವ', difficulty: 'letter' },
        { english: 'Sa', kannada: 'ಸ', difficulty: 'letter' }
    ],

    // Level 2-4: Single words (Tank equivalent)
    words: [
        { english: 'Water', kannada: 'ನೀರು', difficulty: 'word' },
        { english: 'Food', kannada: 'ಆಹಾರ', difficulty: 'word' },
        { english: 'House', kannada: 'ಮನೆ', difficulty: 'word' },
        { english: 'Book', kannada: 'ಪುಸ್ತಕ', difficulty: 'word' },
        { english: 'School', kannada: 'ಶಾಲೆ', difficulty: 'word' },
        { english: 'Friend', kannada: 'ಗೆಳೆಯ', difficulty: 'word' },
        { english: 'Mother', kannada: 'ಅಮ್ಮ', difficulty: 'word' },
        { english: 'Father', kannada: 'ಅಪ್ಪ', difficulty: 'word' },
        { english: 'Brother', kannada: 'ಅಣ್ಣ', difficulty: 'word' },
        { english: 'Sister', kannada: 'ಅಕ್ಕ', difficulty: 'word' },
        { english: 'Child', kannada: 'ಮಗು', difficulty: 'word' },
        { english: 'Dog', kannada: 'ನಾಯಿ', difficulty: 'word' },
        { english: 'Cat', kannada: 'ಬೆಕ್ಕು', difficulty: 'word' },
        { english: 'Tree', kannada: 'ಮರ', difficulty: 'word' },
        { english: 'Flower', kannada: 'ಹೂವು', difficulty: 'word' },
        { english: 'Sun', kannada: 'ಸೂರ್ಯ', difficulty: 'word' },
        { english: 'Moon', kannada: 'ಚಂದ್ರ', difficulty: 'word' },
        { english: 'Star', kannada: 'ನಕ್ಷತ್ರ', difficulty: 'word' },
        { english: 'Rain', kannada: 'ಮಳೆ', difficulty: 'word' },
        { english: 'Wind', kannada: 'ಗಾಳಿ', difficulty: 'word' },
        { english: 'Fire', kannada: 'ಬೆಂಕಿ', difficulty: 'word' },
        { english: 'Earth', kannada: 'ಭೂಮಿ', difficulty: 'word' },
        { english: 'Sky', kannada: 'ಆಕಾಶ', difficulty: 'word' },
        { english: 'Mountain', kannada: 'ಬೆಟ್ಟ', difficulty: 'word' },
        { english: 'River', kannada: 'ನದಿ', difficulty: 'word' }
    ],

    // Level 5+: Sentences (Blimp equivalent)
    sentences: [
        { english: 'How are you?', kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', difficulty: 'sentence' },
        { english: 'What is your name?', kannada: 'ನಿಮ್ಮ ಹೆಸರು ಏನು?', difficulty: 'sentence' },
        { english: 'I am fine', kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ', difficulty: 'sentence' },
        { english: 'Thank you', kannada: 'ಧನ್ಯವಾದಗಳು', difficulty: 'sentence' },
        { english: 'Good morning', kannada: 'ಶುಭೋದಯ', difficulty: 'sentence' },
        { english: 'Good night', kannada: 'ಶುಭ ರಾತ್ರಿ', difficulty: 'sentence' },
        { english: 'I love you', kannada: 'ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ', difficulty: 'sentence' },
        { english: 'Where are you going?', kannada: 'ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ?', difficulty: 'sentence' },
        { english: 'I am hungry', kannada: 'ನನಗೆ ಹಸಿವಾಗಿದೆ', difficulty: 'sentence' },
        { english: 'I am thirsty', kannada: 'ನನಗೆ ನೀರು ಬೇಕು', difficulty: 'sentence' },
        { english: 'Please help me', kannada: 'ದಯವಿಟ್ಟು ನನಗೆ ಸಹಾಯ ಮಾಡಿ', difficulty: 'sentence' },
        { english: 'I don\'t understand', kannada: 'ನನಗೆ ಅರ್ಥವಾಗುತ್ತಿಲ್ಲ', difficulty: 'sentence' },
        { english: 'Very good', kannada: 'ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ', difficulty: 'sentence' },
        { english: 'Come here', kannada: 'ಇಲ್ಲಿಗೆ ಬನ್ನಿ', difficulty: 'sentence' },
        { english: 'Let\'s go', kannada: 'ಹೋಗೋಣ', difficulty: 'sentence' }
    ]
};

// Function to get vocabulary items based on level with mixing
function getVocabularyForLevel(level) {
    let items = [];

    if (level <= 2) {
        // Levels 1-2: Only letters
        items = [...vocabularyData.letters];
    } else if (level <= 5) {
        // Levels 3-5: Mostly words, with some letters mixed in
        items = [...vocabularyData.words];

        // Add 30% letters to the mix
        const letterCount = Math.floor(vocabularyData.letters.length * 0.3);
        const shuffledLetters = [...vocabularyData.letters].sort(() => Math.random() - 0.5);
        items = items.concat(shuffledLetters.slice(0, letterCount));
    } else {
        // Levels 6+: Mostly sentences, with some words and letters
        items = [...vocabularyData.sentences];

        // Add 20% words
        const wordCount = Math.floor(vocabularyData.words.length * 0.2);
        const shuffledWords = [...vocabularyData.words].sort(() => Math.random() - 0.5);
        items = items.concat(shuffledWords.slice(0, wordCount));

        // Add 10% letters
        const letterCount = Math.floor(vocabularyData.letters.length * 0.1);
        const shuffledLetters = [...vocabularyData.letters].sort(() => Math.random() - 0.5);
        items = items.concat(shuffledLetters.slice(0, letterCount));
    }

    return items;
}

// Function to get random item from current difficulty
function getRandomVocabulary(level) {
    const items = getVocabularyForLevel(level);
    return items[Math.floor(Math.random() * items.length)];
}

// Function to get wrong answers for multiple choice
function getWrongAnswers(correctAnswer, level, count = 3) {
    const items = getVocabularyForLevel(level);
    const wrongAnswers = [];

    while (wrongAnswers.length < count) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        if (randomItem.kannada !== correctAnswer && !wrongAnswers.includes(randomItem.kannada)) {
            wrongAnswers.push(randomItem.kannada);
        }
    }

    return wrongAnswers;
}
