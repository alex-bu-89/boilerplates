export const resolvers = {
    Query: {
        users: () => [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'test@mail.com'
            },
            {
                id: 2,
                firstName: 'Max',
                lastName: 'Musterman',
                email: 'test2@mail.com'
            }
        ],
    },
};

export default resolvers;
