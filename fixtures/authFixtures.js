import { test as base, expect,request as playwrightRequest} from '@playwright/test';

export const test = base.extend({
    authToken: async ({request}, use) => {

        const loginPayload = {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD
    };
        const response = await request.post('https://dummyjson.com/auth/login', 
            {
                data: loginPayload
            }
            
            
        );
        expect(response.status()).toBe(200);
        const body = await response.json();
        const token = body.accessToken;
        await use(token);
        
    },
    authenticatedRequest: async ({ authToken }, use) => {
        const authRequest = await playwrightRequest.newContext({
            baseURL: 'https://dummyjson.com',
            extraHTTPHeaders: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        await use(authRequest);
        await authRequest.dispose();    


    }
});

export { expect };