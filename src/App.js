import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import { BrowserRouter, Route } from 'react-router-dom'
import AddProjectTask from './components/ProjectTask/AddProjectTask';
import { Provider } from "react-redux"
import store from "./store"
import UpdateProjectTask from './components/ProjectTask/UpdateProjectTask';

function App() {
  return (<Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={ProjectBoard} />
        <Route exact path="/addProjectTask" component={AddProjectTask} />
        <Route exact path="/updateProjectTask/:id" component={UpdateProjectTask} />
      </div>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
