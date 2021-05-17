import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import ChangeColor from './components/ChangeColor';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import PostFilterForm from './components/PostFilterForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "hoc react hooks" },
    { id: 2, title: "hoc es6" },
    { id: 3, title: "hoc typeScrip" }
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [postTodo, setPostTodo] = useState([]);
  const [pagination, setPaginaltion] = useState({
    _page: 1,
    _limit: 10,
    _totalRow: 1,
  })
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  })

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
  const handlePageChange = (newPage) => {
    console.log("New page: ", newPage);
    setFilters({
      ...filters, _page: newPage
    })
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
        const paramsString = queryString.stringify(filters);
        const Url = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(Url);
        const responseJson = await response.json();
        const { data, pagination } = responseJson;
        setPostTodo(data);
        setPaginaltion(pagination)
      } catch (error) {
        console.log("failed to fetch post list:", error.message);
      }
    }
    getApi();
  }, [filters])

  const handleFilterSForm = (formValue) => {
    console.log(formValue);
    setFilters({
      filters, _page: 1, title_like: formValue
    })
  }
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
        <h1>vi du 3 + 4: su dung useEffect de goi post list phan trang</h1>
        <PostFilterForm onSubmit={handleFilterSForm} />
        <PostList posts={postTodo} />
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default App;