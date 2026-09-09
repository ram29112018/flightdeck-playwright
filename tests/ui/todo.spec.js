import { test, expect } from '../../fixtures/todofixtures.js';
import{todoData} from '../../test-data/todoData.js';

for (const toDoData of todoData) {  

test (`user can add todos- ${toDoData}`, async ({todoPage}) =>{


    await todoPage.addTodo(toDoData);
    await expect(todoPage.todoTitle).toHaveText(toDoData);
})
}
