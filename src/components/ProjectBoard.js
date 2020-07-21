import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ProjectTaskItem from "./ProjectTask/ProjectTaskItem";
import { getBacklog } from "../actions/ProjectTaskActions";
import PropTypes from "prop-types";
import { connect } from "react-redux"

class ProjectBoard extends Component {

    componentDidMount() {
        this.props.getBacklog();
    }
    render() {
        const { project_tasks } = this.props.project_tasks

        const boardAlgorithm = (project_tasks) => {
            let toDoList = []
            let progressList = []
            let doneList = []
            if (project_tasks.length > 0) {
                project_tasks.forEach(element => {
                    switch (element.status) {
                        case "TO_DO": toDoList.push(element);
                            break;
                        case "IN_PROGRESS": progressList.push(element);
                            break;
                        case "DONE": doneList.push(element);
                            break;
                        default: return;
                    }
                });
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-secondary text-white">
                                        <h3>TO DO</h3>
                                    </div>
                                    {toDoList.map(element => <ProjectTaskItem key={element.id} task={element} />)}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-primary text-white">
                                        <h3>In Progress</h3>
                                    </div>
                                    {progressList.map(element => <ProjectTaskItem key={element.id} task={element} />)}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-success text-white">
                                        <h3>Done</h3>
                                    </div>
                                    {doneList.map(element => <ProjectTaskItem key={element.id} task={element} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <div className="alert alert-info text-center" role="alert">No project task in this board</div>
            )

        }

        return (
            <div className="container">
                <Link to="/addProjectTask" className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                {boardAlgorithm(project_tasks)}
            </div>
        );
    }
}

ProjectBoard.propTypes = {
    ProjectBoard: PropTypes.func.isRequired,
    project_tasks: PropTypes.object.isRequired
}

const MapStateToProps = state => ({
    project_tasks: state.project_task
})

export default connect(MapStateToProps,
    { getBacklog }
)(ProjectBoard);