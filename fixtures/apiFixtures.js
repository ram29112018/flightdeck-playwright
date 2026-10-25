import { test as base, expect } from '@playwright/test';
import { ApiClient } from '../api/ApiClient.js';
//import { use } from 'react';

export const test = base.extend({

    apiClient: async({request},use) => {
        const apiClient = new ApiClient(request);
        await use(apiClient);
    },

    apiObject: async ({apiClient},use) =>{
        const payload = {
            name: 'Fixture Test Object',
                data: {
                framework: 'Playwright',
                status: 'Active'
    }
};

const response = await apiClient.createObject(payload)    
expect(response.status()).toBe(200);
const body = await response.json();
await use(body);
console.log('Cleaning up object:', body.id);
const deleteResponse = await apiClient.deleteObject(body.id);
expect(deleteResponse.status()).toBe(200);
}

});

export { expect };
