var app = new Vue({
    el: '#app',
    data: {
        isAdd: false,
        isEdit:false,
        visibility: 'all',
        todos: [
            //     {
            //     id: '123',
            //     title: 'Just Do It ',
            //     content: '',
            //     setTime: '2018/06/11',
            //     completed: false,
            //     isStared: false,
            //     isFixed: true,
            // }
        ],
        newTodo: {
            title: '',
            setTime: {
                date: '',
                time: '',
            },
            comment: '',
        },
    },
    methods: {
        addTodo: function () {
            var timestamp = Math.floor(Date.now());
            if (!this.newTodo.title) {
                alert('請輸入待辦事項');
                return;
            }
            let title = this.newTodo.title.trim();
            var value = {
                id: timestamp,
                title: title,
                setDate: this.newTodo.setTime.date,
                setTime: this.newTodo.setTime.time,
                comment: this.newTodo.comment,
                isStared: false,
                completed: false,
                isFixed: true,
            };
            console.log(timestamp, value);
            this.todos.push(value);
            this.newTodo.title = '';
            this.newTodo.setTime.date = '';
            this.newTodo.setTime.time = '';
            this.newTodo.comment = '';
            localStorage.setItem("todos", JSON.stringify(this.todos));
            this.isAdd = false;
        },
        deleteTodo: function (key) {
            this.todos.splice(key, 1);
            localStorage.setItem("todos", JSON.stringify(this.todos));
        },
        editTodo:function (item) {
            console.log(item);
            item.isFixed = !item.isFixed;
            localStorage.setItem("todos", JSON.stringify(this.todos));
        }
    },
    computed: {
        filteredTodos: function () {
            if (this.visibility == 'all') {
                return this.todos;
            } else if (this.visibility == 'progress') {
                var newTodo = [];
                this.todos.forEach(function (item) {
                    if (!item.completed) {
                        newTodo.push(item);
                    }
                });
                return newTodo;
            } else if (this.visibility == 'completed') {
                var newTodo = [];
                this.todos.forEach(function (item) {
                    if (item.completed) {
                        newTodo.push(item);
                    }
                });
                return newTodo;
            }
        },
        ongoingCount: function () {
            let onging = 0;
            this.todos.forEach(function(item){
                if (!item.completed) {
                    onging += 1;
                }
            })
            return onging;
        },
        completedCount:function () {
            let completed =0;
            this.todos.forEach(function (item) {
                if(item.completed){
                    completed+=1;
                }
            })
        return completed;
        },
    },
    mounted() {
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    }
})