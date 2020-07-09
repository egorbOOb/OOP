'use strict';


class Todo {

    constructor(form, input, todoList, todoCompleted, todoContainer, header) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.headerInput = document.querySelector(header);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = ``;
        this.todoCompleted.textContent = ``;
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    resetInputValue() {
        this.headerInput.value = '';
    }

    createItem(todo) {
        const li = document.createElement('li');

        li.classList.add('todo-item');
        li.key = todo.key;

        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-edit"></button>
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`);

        if (todo.completed) {
            this.todoCompleted.append(li);
        }   else {
            this.todoList.append(li);
        }
    }   

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            this.input.placeholder = 'Какие планы?';
            this.input.classList.remove('header-input-red');
            
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };

            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            this.input.placeholder = 'Пустые дела не добавляются!';

            this.input.classList.add('header-input-red');
        }

        this.resetInputValue();
    }

    generateKey() {
        return Math.random.toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    handler(e) {
        let target = e.target,
            li = target.parentNode.parentNode,
            key = li.key;

        console.log(li);
        if(target.matches('.todo-complete')) {

            this.completeItem(key);

        } else if (target.matches('.todo-remove')) {

            this.deleteItem(key);
                
        } else if (target.matches('.todo-edit')) {
            this.editItem(key);
        }
    }

    editItem(key) {
        let newTodo = this.todoData.get(key);

        this.input.value = newTodo.value;

        const deleteItem = () => {
            this.deleteItem(key);
        };

        setTimeout(deleteItem, 1000);
        // inputEdit.type = 'text';
        // inputEdit.value = newTodo.value;
        // inputEdit.className = 'input-edit';
        // console.log(inputEdit);
    }

    completeItem(key) {
        let newTodo = this.todoData.get(key);

        newTodo.completed = !newTodo.completed; 
        this.todoData.set(key, newTodo);
        this.render();
    }

    deleteItem(key) {
        this.todoData.delete(key);
        this.render();
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.todoContainer.addEventListener('click', this.handler.bind(this));
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container', '.header-input');

todo.init();

console.dir(document.querySelector('.todo-item'));