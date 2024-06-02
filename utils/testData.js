// Function to generate a random 10-letter word
function generateRandomWord(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate a random user ID between 1 and 10
function generateRandomUserId() {
    return Math.floor(Math.random() * 10) + 1;
}

const testData = {
    newPost: {
        title: generateRandomWord(10),
        body: generateRandomWord(10),
        userId: generateRandomUserId(),
    },
    updatedPost: {
        id: generateRandomUserId(),
        title: 'updated  ' + generateRandomWord(10),
        body: 'updated  ' + generateRandomWord(10),
        userId: generateRandomUserId(),
    },
};

module.exports = testData;
