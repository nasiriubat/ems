const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "EMS",
            version: "1.0.0",
            description: "An Employee Management System"
        },
        servers: [{
            url: "http://localhost:3000"
        }],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the user',
                            example: 'John Doe',
                        },
                        email: {
                            type: 'string',
                            description: 'Email of the user',
                            example: 'john.doe@example.com',
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                        },
                        phone: {
                            type: 'string',
                            description: 'Phone number of the user',
                            example: '123-456-7890',
                        },
                        address: {
                            type: 'string',
                            description: 'Address of the user',
                            example: '123 Main St, Anytown, USA',
                        },
                        role: {
                            type: 'integer',
                            description: 'Role of the user',
                            example: 1,
                        },
                    },
                },
            },
        },
        paths: {
            '/auth/register': {
                post: {
                    summary: 'Register a new user',
                    description: 'Register a new user. Email and password are mandatory. Address and phone are optional.',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'User registered successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/auth/login': {
                post: {
                    summary: 'Login a user',
                    description: 'Login a user. Email and password are required.',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'User logged in successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            token: {
                                                type: 'string',
                                                description: 'JWT token for the user.',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/users': {
                get: {
                    summary: 'Get a list of users',
                    description: 'Only admins can retrieve the list of users.',
                    responses: {
                        200: {
                            description: 'A list of users.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/User',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    summary: 'Add a new user',
                    description: 'Only admins can add a new user.',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'User added',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/users/{id}': {
                get: {
                    summary: 'Get a user by ID',
                    description: 'Logged in users can fetch only their own user information. Admins can fetch other users.',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            description: 'User ID',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'User data',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                    },
                },
                put: {
                    summary: 'Update a user',
                    description: 'Logged in users can update only their own user information. Admins can update other users.',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            description: 'User ID',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'User updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User',
                                    },
                                },
                            },
                        },
                    },
                },
                delete: {
                    summary: 'Delete a user',
                    description: 'Only admins can delete a user.',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            description: 'User ID',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'User deleted',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                description: 'User deleted message.',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ["./routes/*.js"],
};

module.exports = options;
