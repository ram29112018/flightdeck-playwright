import { expect } from '@playwright/test';

class TodoPage{
    constructor(page){
        this.page = page;
        this.createdTodos = [];
        this.todoItems = page.getByRole('listitem')
        this.todoInput =  page.getByRole('textbox', { name: 'What needs to be done?' })
        this.todoTitle = page.getByTestId('todo-title');
        this.todoDeleteButton = page.getByRole('button', { name: 'Delete' });
        this.completedLink = page.getByRole('link', { name: 'Completed' });
        this.activeLink = page.getByRole('link', { name: 'Active' });
        this.allLink = page.getByRole('link', { name: 'All' });
    }

    async addTodo(todoText){
        await this.todoInput.fill(todoText);
        await this.todoInput.press('Enter');
        if (todoText.trim() !== ""){
            this.createdTodos.push(todoText.trim());
        }
        
    }
    getTodo(todoText) {
    return this.todoItems.filter({
        hasText: todoText
    });
}

getTodoCheckbox(todoText) {
    return this.getTodo(todoText)
        .getByLabel('Toggle Todo');
}

    async completeTodo(todoText){
        const todoItem = this.todoItems.filter({ hasText: todoText });
        await todoItem.getByLabel('Toggle Todo').check();
    }

    async deleteTodo(todoText){
        const todoItem = this.todoItems.filter({ hasText: todoText });
        await todoItem.hover();
        await todoItem.getByRole('button', { name: 'Delete' }).click();
    }
    
async verifyTodoVisible(todoText) {

    const todoItem = this.todoItems.filter({ hasText: todoText });
    await expect(todoItem).toBeVisible();
    // locate the specific todo item
    // assert that it is visible

}
async viewActiveTodos() {
    await this.activeLink.click();
    // click activeLink
}
async viewCompletedTodos() {

        await this.completedLink.click();
    // click completedLink
}
async viewAllTodos() {
    await this.allLink.click();
    // click allLink
}   
getTodo(todoText) {
    return this.todoItems.filter({ hasText: todoText });
}
 getTodos() {
    return this.todoItems;
}
async editTodo(oldText, newText) {
    const todoItem = this.todoItems.filter({ hasText: oldText });
    const todoTitle = todoItem.getByTestId('todo-title');
    await todoTitle.dblclick();
    const editInput = todoItem.getByRole('textbox');
    await editInput.fill(newText);
    await editInput.press('Enter');
}

getTodoTitle(todoText){
    const todoItem = this.todoItems.filter({ hasText: todoText})
    return todoItem.getByTestId('todo-title');
}
    
     
getTodoCheckbox(todoText) {
    const todoItem = this.todoItems.filter({ hasText: todoText });
    return todoItem.getByLabel('Toggle Todo');
}
    async goto(){
        await this.page.goto('/todomvc/#/');
    }
}
export { TodoPage };

