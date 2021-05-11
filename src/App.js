import React, { useState, useEffect } from 'react';
import ChangeColor from './components/ChangeColor';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "hoc react hooks" },
    { id: 2, title: "hoc es6" },
    { id: 3, title: "hoc typeScrip" }
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [postTodo, setPostTodo] = useState([]);


  // xóa todo vừa click   
  const handleTodoClick = (todo) => {
    console.log(todo)
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  //
  const handleChange = (e) => {
    setNewTodo(e.target.value)
  }
  const onSubmit = () => {
    setTodoList([...todoList, {
      id: todoList.length + 1, title: newTodo
    }])
    setNewTodo("")
  }

  //useEffect
  useEffect(() => {
    //..goi api
    const getApi = async () => {
      try {
        const Url = "http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
        const response = await fetch(Url);
        const responseJson = await response.json();
        const { data } = responseJson;
        setPostTodo(data);
      } catch (error) {
        console.log("failed to fetch post list:", error.message);
      }
    }
    getApi();
  })

  return (
    <div className="App">
      <div>
        <h1>vi du 1: change color</h1>
        <ChangeColor />
      </div>
      <div>
        <h1>vi du 2: todo list</h1>
        <TodoForm handleChange={handleChange} onSubmit={onSubmit} value={newTodo} />
        <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      </div>
      <div>
        <h1>vi du 3: su dung useEffect de goi post list</h1>
        <PostList posts={postTodo} />
      </div>
    </div>
  );
}

export default App;