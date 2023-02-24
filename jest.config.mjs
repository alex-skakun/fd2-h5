export default {
    testEnvironment: 'jsdom',
    transform: {},
    testMatch: ['**/*.spec.mjs'],
    setupFiles: [
        "<rootDir>/jestSetup.mjs"
    ],
};
