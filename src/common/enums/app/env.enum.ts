const ENV = {
  APP: {
    SERVER_PORT: Number(Deno.env.get('PORT')),
  },
  API: {
    V1_PATH: '/api/v1',
  },
  API_URL: {
    PLACEHOLDER_API: <string>Deno.env.get('PLACEHOLDER_API_URL'),
  },
} as const;

export { ENV };
