import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage.js';


const test = base.extend({

    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await todoPage.goto();
        await use(todoPage);
//teardown        
        for (const toDoData of todoPage.createdTodos) {
             await todoPage.deleteTodo(toDoData);
        }
    }
});
export { test, expect };