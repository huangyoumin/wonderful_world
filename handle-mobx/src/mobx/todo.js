import { observable, action } from 'mobx';

class Todo {
    id = Math.random();
    text = '';
}


class Todos {
    @observable
    data = [];

    addTodo(text) {
        const todo = new Todo;
        todo.text = text;
        this.data.push(todo);
    }
}
