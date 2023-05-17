<script>
import "@/styles/normalize.css";
import "@/styles/base.css";
import axios from "axios";
import ButtonCounter from './components/ButtonCounter.vue';
import SideNav from './components/SideNav.vue';
export default {
  components: {
    ButtonCounter,
    SideNav
  },
  name: "App",
  data() {
    return {
      todos: [],
      description: "",
      title: "",
    };
  },
  async mounted() {
    const response = await axios.get("api/todolist/");
    this.todos = response.data;
  },
  methods: {
    async addTodo(e) {
      e.preventDefault();
      const response = await axios.post("api/todolist/", {
        title: this.title,
        description: this.description
      });
      this.todos.push(response.data);
      this.title = "";
      this.description = "";
    },
    async removeTodo(item, i) {
      await axios.delete("api/todolist/" + item._id);
      this.todos.splice(i, 1);
    },
  }
};
</script>
<template>
<div class="main h-100">
  
  <div class="d-flex">
    <div class="topbar">
      Here
    </div>
  </div>
  <div class="d-flex h-100">
    <div class="sidebar">
      <SideNav />
    </div>
    
    <div class="content">
    <h3>Todo Listsss</h3>
    <ButtonCounter />
  
    <div>
    <form class="form" >
      <input class="input" v-model="title" type="text" name="name" placeholder="Enter todo" />
      <br />
      <input class="input" v-model="description" type="text" name="description"  placeholder="Enter Description" />
      <br />
      <button class="submit-button btn--accent" @click="addTodo">Add Todo</button>
    </form>
  </div>
    <div class="todo-container">
      <ul>
        <li v-for="(todo, i) in todos" :key="todo._id">
          <div class="todo">
          <span class="todo-name">{{ todo.title }}</span>
          <span class="todo-description">{{ todo.description }}</span>
        </div>
          <button class="delete-btn btn--accent" @click="removeTodo(todo, i)">DELETE TODO</button>
        </li>
      </ul>
    </div>
    </div>
  </div>
</div>

 </template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');
</style>

<style>


.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

 h3{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.input {
  width: 100%;
  padding: 10px;
}

.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.todo-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.todo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}

.todo-name {
  font-size: 18px;
  font-weight: bold;
}

.todo-description {
  max-width: 70%;
  font-size: 14px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
}
</style>