import { test, expect } from '../../fixtures/todoFixtures.js';
import{todoData} from '../../test-data/todoData.js';

for (const toDoData of todoData) {  

test (`@smoke @regression user can add todos- ${toDoData}`, async ({todoPage}) =>{


    await todoPage.addTodo(toDoData);
    await expect(todoPage.todoTitle).toHaveText("for failure testing");
})
}
