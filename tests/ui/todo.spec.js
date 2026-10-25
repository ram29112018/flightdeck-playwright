import { test, expect } from '../../fixtures/todoFixtures.js';
import{todoData} from '../../test-data/todoData.js';

for (const toDoData of todoData) {  

test (`@smoke @regression user can add todos- ${toDoData.title}`, async ({todoPage}) =>{

    await todoPage.addTodo(toDoData.title);
    await expect(todoPage.todoTitle).toHaveText(toDoData.title);
})
}


test('user can add a todo', async ({ todoPage }) => {

    await todoPage.addTodo('Learn JavaScript');
    await expect(todoPage.getTodo('Learn JavaScript')).toBeVisible();
    
});


test('@regression user can complete a todo', async ({ todoPage }) => {

    await todoPage.addTodo('Learn Playwright');
    await todoPage.completeTodo('Learn Playwright');
    await expect(todoPage.getTodoCheckbox('Learn Playwright')).toBeChecked();
    

});

test('user can delete a todo', async ({ todoPage }) => {

    await todoPage.addTodo('Learn Playwright');
    await todoPage.deleteTodo('Learn Playwright');
    await expect(todoPage.getTodo('Learn Playwright')).not.toBeVisible();
    
});



test.describe("filter todos",() => {

    test.beforeEach(async ({todoPage}) => {

        // Add all 3 todos
    await todoPage.addTodo('Buy Groceries');
    await todoPage.addTodo('Prepare Interview');
    await todoPage.addTodo('Learn Playwright');
    
    // Complete Prepare Interview
    await todoPage.completeTodo('Prepare Interview');
    await todoPage.completeTodo('Learn Playwright');


    });
test('user can filter active todos', async ({ todoPage }) => {

    

    // Click Active filter
    await todoPage.viewActiveTodos();

    // Assert:
    await expect(todoPage.getTodo('Buy Groceries')).toBeVisible();
    await expect(todoPage.getTodo('Prepare Interview')).not.toBeVisible();
    await expect(todoPage.getTodo('Learn Playwright')).not.toBeVisible();
    // Buy Groceries should be visible
    // Prepare Interview should NOT be visible
    // Learn Playwright should NOT be visible

});

test('user can filter completed todos', async ({ todoPage }) => {

    

    // Click Completed filter
    await todoPage.viewCompletedTodos();

    // Assert:
    await expect(todoPage.getTodo('Buy Groceries')).not.toBeVisible();
    await expect(todoPage.getTodo('Prepare Interview')).toBeVisible();
    await expect(todoPage.getTodo('Learn Playwright')).toBeVisible();
    // Buy Groceries should NOT be visible
    // Prepare Interview should be visible
    // Learn Playwright should be visible

});

test('user can switch between todo filters', async ({ todoPage }) => {

    // Click Active filter
    // Assert:
    // Buy Groceries should be visible
    // Prepare Interview should NOT be visible
    // Learn Playwright should NOT be visible
    await todoPage.viewActiveTodos();
    await expect(todoPage.getTodo('Buy Groceries')).toBeVisible();
    await expect(todoPage.getTodo('Prepare Interview')).not.toBeVisible();
    await expect(todoPage.getTodo('Learn Playwright')).not.toBeVisible();
    // Click Completed filter
    // Assert:
    // Buy Groceries should NOT be visible
    // Prepare Interview should be visible
    // Learn Playwright should be visible
    await todoPage.viewCompletedTodos();
    await expect(todoPage.getTodo('Buy Groceries')).not.toBeVisible();
    await expect(todoPage.getTodo('Prepare Interview')).toBeVisible();
    await expect(todoPage.getTodo('Learn Playwright')).toBeVisible();
    // Click All filter
    // Assert:
    // Buy Groceries should be visible
    // Prepare Interview should be visible
    // Learn Playwright should be visible
    await todoPage.viewAllTodos();
    await expect(todoPage.getTodo('Buy Groceries')).toBeVisible();
    await expect(todoPage.getTodo('Prepare Interview')).toBeVisible();
    await expect(todoPage.getTodo('Learn Playwright')).toBeVisible();

});

})


test('user can edit a todo', async ({ todoPage }) => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.editTodo('Learn Playwright', 'Master Playwright');
    await expect(todoPage.getTodo('Master Playwright')).toBeVisible();
    await expect(todoPage.getTodo('Learn Playwright')).toHaveCount(0);

});

test("should not create a todo with empty input", async({todoPage}) => {
    await todoPage.addTodo("");
    await expect(todoPage.getTodos()).toHaveCount(0);

})

test (" should not create a todo with whitespace only", async({todoPage}) =>{
        await todoPage.addTodo("     " );
        await expect(todoPage.getTodos()).toHaveCount(0);
})

test (" should trim the empty space before and after Todo", async({todoPage}) => {
        await todoPage.addTodo("  Learn Playwright   ");
        await expect(todoPage.getTodoTitle('Learn Playwright')).toHaveText('Learn Playwright')
})
    for (const todoText of todoData) {
        test(`user can add  todos -${todoText.title}`, async ({ todoPage }) => {

        await todoPage.addTodo(todoText.title);
        if (todoText.completed) {
        await todoPage.completeTodo(todoText.title);
        }
        await expect(todoPage.getTodo(todoText.title)).toBeVisible();
        
       if (todoText.completed) {
    await expect(
        todoPage.getTodoCheckbox(todoText.text)
    ).toBeChecked();
}
        
    });
    
    // loop through todoData and add each todo

    // loop through todoData again
    // verify each todo is visible

}


test('user can add and complete Learn Playwright MCP todo', async ({ todoPage }) => {
    const todoText = 'Learn Playwright MCP';

    await todoPage.addTodo(todoText);
    await expect(todoPage.getTodo(todoText)).toBeVisible();

    await todoPage.completeTodo(todoText);
    await expect(todoPage.getTodoCheckbox(todoText)).toBeChecked();
});