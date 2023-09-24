/* vim: set sw=4 ts=4 sts=4 expandtab : */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    transform: {
        '^.+\\.tsx?$': [
            'ts-jest', {
                tsconfig: './tsconfig.development.json',
            }
        ]
    },
};
