import React, { useState, useEffect } from 'react';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Data from './posts.json'



const App = () => {

  const [todos, setTodos] = useState([]);

  const [todoItem, setTodoItem] = useState('');
  const [todoSection, setTodoSection] = useState('');
  const [todoTag, setTodoTag] = useState('');

  const [errorItem, setErrorItem] = useState(false);
  const [errorTag, setErrorTag] = useState(false);
  const [errorSection, setErrorSection] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoItem && todoSection && todoTag) {
      let uniqueId =
        new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
      let newTodoItem = {
        id: uniqueId,
        title: todoItem,
        section: todoSection,
        tag: todoTag,
      };

      setTodos([newTodoItem, ...todos]);



      console.log(todos);

      setTodoItem('');
      setTodoSection('');
      setTodoTag('');
      setErrorItem(false);
      setErrorSection(false);
      setErrorTag(false);
    }

    else {
      todoItem ? setErrorItem(false) : setErrorItem(true);
      todoSection ? setErrorSection(false) : setErrorSection(true);
      todoTag ? setErrorTag(false) : setErrorTag(true)
    }


  };


  const deleteTodo = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodos]);
  };





  useEffect(() => {

    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos) {
      setTodos(todos);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);



  useEffect(() => {
    for (let i = 0; i < Data.length; i++) {
      let newTodoItem = {
        id: Data[i].id,
        title: Data[i].title,
        section: Data[i].body,
        tag: Data[i].tags[0],
        tag2: Data[i].tags[1],
      };

      todos.push(newTodoItem);

    }

    localStorage.setItem('todos', JSON.stringify(todos));


  }, []);


  return (

    <div className="container">

      <section>
        <div id="posts" className="well">

          {todos.map((todoItem) => {

            const { id, title, section, tag, tag2 } = todoItem;

            return (

              <article>

                <header>
                  <h3>{title}</h3>
                </header>
                <section>
                  <p>{section}</p>
                </section>
                <footer>
                  <div className="tags">
                    <button className="btn btn-xs btn-default">{tag}</button>
                    <button className="btn btn-xs btn-default">{tag2}</button>
                  </div>
                </footer>
                <div className="controls">
                  <button className="btn btn-danger btn-mini" onClick={() => deleteTodo(id)} >удалить</button>
                </div>


              </article>

            );
          })}

        </div>

        {/* #posts  */}

        <form id="post-add" className="col-lg-4" onSubmit={handleSubmit} >
          <div className="form-group">
            <input
              value={todoItem}
              onChange={(e) => setTodoItem(e.target.value)}
              placeholder="заголовок"
              className={`form-control ${errorItem ? 'error' : ''}`}

            />
          </div>
          <div className="form-group">
            <input
              value={todoSection}
              type="text"
              className={`form-control ${errorSection ? 'error' : ''}`}
              onChange={(e) => setTodoSection(e.target.value)}
              name="body"
              placeholder="запись"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${errorTag ? 'error' : ''}`}
              name="tags"
              value={todoTag}
              placeholder="тег, еще тег"
              onChange={(e) => setTodoTag(e.target.value)}
            />
            {/* <input
              type="text"
              className="form-control"
              name="tags"
              placeholder="тег, еще тег"
            /> */}
          </div>
          <button type="submit" className="btn btn-primary">Добавить</button>
          {/* <button onClick={getPosts} className="btn btn-primary">Загрузить посты</button> */}
        </form>
        {/* <!-- /#post-add --> */}
      </section>
    </div>
  );
}
export default App;