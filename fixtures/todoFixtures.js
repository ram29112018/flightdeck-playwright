import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage.js';


const test = base.extend({

    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await todoPage.goto();
        await use(todoPage);
//teardown        
        for (const todoText of todoPage.createdTodos) {
            const todoItem = todoPage.getTodo(todoText);
            if (await todoItem.count() > 0) {
                await todoPage.deleteTodo(todoText);
            }
        }
    }
});
export { test, expect };