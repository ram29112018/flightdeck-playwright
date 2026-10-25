//import { test, expect } from '@playwright/test';
import { test, expect } from '../../fixtures/apiFixtures.js';

test('get a todo', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/todos/1'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    expect(body.userId).toBe(1); 
    expect(body.id).toBe(1);
    expect(body.title).toBe('delectus aut autem');
    expect(body.completed).toBe(false);
    });

test('fixture creates an API object', async ({ apiObject }) => {
   
    console.log(apiObject);
    expect(apiObject.name).toBe('Fixture Test Object');
    expect(apiObject.data.framework).toBe('Playwright');
    expect(apiObject.data.status).toBe('Active');

})


test('returns 404 for non-existing todo', async ({ request }) => {

      const response = await request.get(
        'https://jsonplaceholder.typicode.com/todos/999999');
        expect(response.status()).toBe(404);
   } );

test('create a new todo', async ({ request }) => {

    const response = await request.post('https://jsonplaceholder.typicode.com/todos',
        {
        data: {
            userId: 1,
            title: 'Learn Playwright API',
            completed: false
        }
        })
        expect (response.status()).toBe(201);
        const body = await response.json();
        console.log(body);
        expect(body.userId).toBe(1);
        expect(body.title).toBe('Learn Playwright API');
        expect(body.completed).toBe(false);
        expect(body.id).toBeDefined();

});

test ('update the completed status', async({request}) => {

    const response = await request.patch('https://jsonplaceholder.typicode.com/todos/1',
        {
            data:{
                completed: true
            }
        }
    )
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);

})


test('user can update object status using fixtures', async ({ apiClient, apiObject }) => {

    const updatePayload ={
        name: 'Fixture Test Object',
                data: {
                status: 'Completed'
    }
};
const updatedResponse = await apiClient.updateObject(apiObject.id,updatePayload);
expect(updatedResponse.status()).toBe(200);
const updatedResonseBody = await updatedResponse.json();
expect (updatedResonseBody.data.status).toBe('Completed');
const getUpdatedResponse = await apiClient.getObject(apiObject.id);
expect(getUpdatedResponse.status()).toBe(200);
const getUpdatedBody = await getUpdatedResponse.json();
expect(getUpdatedBody.data.status).toBe('Completed');


    
});

test ('delete a todo', async({request})=>{
    const response = await request.delete('https://jsonplaceholder.typicode.com/todos/1');
    console.log(response.status());
})


test ('test a complete CRUD cycle', async({request}) => {
    const response = await request.post('/objects',
        {
            data: {
                name: 'Ram Playwright Test Object',
            
            data:{
                 framework: 'Playwright',
                  language: 'JavaScript',
                    status: 'Learning'
            }

    }})
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    const responseId = body.id;

    const getResponse = await request.get(`/objects/${responseId}`);
    expect (getResponse.status()).toBe(200);
    const getBody = await getResponse.json();
    console.log(getBody);

    const patchResponse = await request.patch(`/objects/${responseId}`,
        {
            data:{
                name: 'Ram Playwright Test Object',
            
            data:{
                 framework: 'Playwright',
                  language: 'JavaScript',
                    status: 'Completed'
            }

            }

    } );

    expect(patchResponse.status()).toBe(200);
    const patchBody = await patchResponse.json();
    console.log(patchBody);
    expect(patchBody.data.status).toBe('Completed');

    const verifyResponse = await request.get(`/objects/${responseId}`);
    expect(verifyResponse.status()).toBe(200);
    const verifyBody = await verifyResponse.json();
    expect(verifyBody.data.status).toBe('Completed');

    const deleteResponse = await request.delete(`/objects/${responseId}`);
    //expect (deleteResponse.status).toBe(200);
    console.log('delete status:',deleteResponse.status());

    const afterDeleteResponse = await request.get(`/objects/${responseId}`);
    console.log('getafterdeletestatus:',afterDeleteResponse.status());
    expect(deleteResponse.status()).toBe(200);
    expect(afterDeleteResponse.status()).toBe(404);



})