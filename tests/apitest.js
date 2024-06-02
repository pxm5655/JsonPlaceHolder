const apiClient = require('../utils/apiClient');
const testData = require('../utils/testData');

const expect = (condition, message) => {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
};

const runTests = async () => {
    console.log('Running tests...');

    try {
        // Test fetching all posts
        let res = await apiClient.get('/posts');
        expect(res.statusCode === 200, 'Expected status code 200');
        expect(Array.isArray(res.body), 'Expected response body to be an array');

        // Generate a random post ID between 1 and 10
        const randomPostId = Math.floor(Math.random() * 10) + 1;

        // Test fetching a single post by random ID
        res = await apiClient.get(`/posts/${randomPostId}`);
        expect(res.statusCode === 200, 'Expected status code 200');
        expect(res.body.id === randomPostId, `Expected post ID to be ${randomPostId}`);

        // Test creating a new post
        res = await apiClient.post('/posts', testData.newPost);
        expect(res.statusCode === 201, 'Expected status code 201');
        expect(res.body.title === testData.newPost.title, 'Expected post title to match');
        const newPostId = res.body.userId;

        // Test updating an existing post
        if (newPostId !== undefined) {
            res = await apiClient.put(`/posts/${newPostId}`, testData.updatedPost);
            expect(res.statusCode === 200, 'Expected status code 200');
            expect(res.body.title === testData.updatedPost.title, 'Expected updated title to match');
        } else {
            console.log('Condition for updating post not met, request not made.');
        }

        // Test deleting an existing post
        if (newPostId !== undefined) {
            res = await apiClient.delete(`/posts/${newPostId}`);
            expect(res.statusCode === 200, 'Expected status code 200');
        } else {
            console.log('Condition for deleting post not met, request not made.');
        }

        // Additional scenario: use response from one call in another
        res = await apiClient.post('/posts', testData.newPost);
        expect(res.statusCode === 201, 'Expected status code 201');
        const newPostIdForFetch = res.body.userId;

        if (newPostIdForFetch !== undefined) {
            res = await apiClient.get(`/posts/${newPostIdForFetch}`);
            expect(res.statusCode === 200, 'Expected status code 200');
            expect(res.body.id === newPostIdForFetch, 'Expected post ID to match new post ID');
        } else {
            console.log('Condition for fetching created post not met, request not made.');
        }

        console.log('All tests passed!');
    } catch (err) {
        console.error('Test failed:', err);
    }
};

runTests().catch((err) => {
    console.error('Test execution failed:', err);
});
