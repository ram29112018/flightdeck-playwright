class TodoPage{
    constructor(page){
        this.page = page;
        this.createdTodos = [];
        this.todoInput =  page.getByRole('textbox', { name: 'What needs to be done?' })
        this.todoTitle = page.getByTestId('todo-title');
        this.todoDeleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async addTodo(todoText){
        await this.todoInput.fill(todoText);
        await this.todoInput.press('Enter');
        this.createdTodos.push(todoText);
    }
    async deleteTodo(todoText){
        await this.todoTitle.filter({ hasText: todoText }).click(); 
        await this.todoDeleteButton.click();
    }
    async goto(){
        await this.page.goto('/todomvc/#/');
    }
}
export { TodoPage };

