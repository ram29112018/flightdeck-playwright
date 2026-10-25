//import { test, expect } from '@playwright/test';
import { test, expect } from '../../fixtures/authFixtures.js';

test(' user can access profile', async ({ request }) => {

    const loginResponse = await request.post('https://dummyjson.com/auth/login',{
        data:{
            username: 'emilys',
            password: 'emilyspass'
        }
    })
    console.log('Username:', process.env.API_USERNAME);
    console.log('Password available:', !!process.env.API_PASSWORD);
    console.log('Login status:', loginResponse.status());
    console.log('Login response:', await loginResponse.text());
    expect(loginResponse.status()).toBe(200);
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    const token = loginResponseJson.accessToken
    console.log('Token captured:',token);
    const profileResponse = await request.get('https://dummyjson.com/auth/me',
        {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
 expect (profileResponse.status()).toBe(200);
 const profileBody = await profileResponse.json();
 console.log(profileBody);
 expect(profileBody.username).toBe('emilys');



});

test('user cannot access profile without token', async ({ request }) => {

    const response = await request.get(
        'https://dummyjson.com/auth/me'
    );

    console.log('Status:', response.status());
});

test('user cannot access profile with invalid token', async ({ request }) => {

    const response = await request.get(
        'https://dummyjson.com/auth/me',
        {
            headers: {
                Authorization: 'Bearer invalid-token'
            }
        }
    );

    console.log('Invalid token status:', response.status());
});


test('authenticated user can access profile by fixtures',
    async ({ request, authToken }) => {

        const profileResponse = await request.get(
            'https://dummyjson.com/auth/me',
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        expect(profileResponse.status()).toBe(200);
        const profileBody = await profileResponse.json();
        console.log('Profile response:', profileBody);
        expect(profileBody.username).toBe('emilys');
    }
);


test('authenticated user can access profile by authenticatedRequest fixture',
    async ({ authenticatedRequest }) => {

        const profileResponse = await authenticatedRequest.get(
            '/auth/me'
        );

        expect(profileResponse.status()).toBe(200);
        const profileBody = await profileResponse.json();
        console.log('Profile response:', profileBody);
        expect(profileBody.username).toBe('emilys');
    }
);