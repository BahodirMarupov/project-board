import React, { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getProjectTask, addProjectTask } from "../../actions/ProjectTaskActions"

class UpdateProjectTask extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            summary: '',
            acceptanceCriteria: '',
            status: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        const { id, summary, acceptanceCriteria, status } = nextProps.project_task
        this.setState({ id, summary, acceptanceCriteria, status })
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getProjectTask(id);
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault()
        const updatedTask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status
        }
        this.props.addProjectTask(updatedTask, this.props.history)
    };

    render() {
        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/" className="btn btn-light">
                                Back to Board
                    </Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`form-control form-control-lg ${this.state.summary ? "" : "is-invalid"}`} name="summary" value={this.state.summary} placeholder="Project Task summary" onChange={this.onChange} />
                                    <div className={this.state.errors.summary ? "invalid-feedback" : "d-none"}>{this.state.errors.summary}</div>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" value={this.state.acceptanceCriteria} name="acceptanceCriteria" onChange={this.onChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" value={this.state.status} name="status" onChange={this.onChange}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProjectTask.propTypes = {
    UpdateProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    addProjectTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project_task: state.project_task.project_task,
    errors: state.errors
})

export default connect(mapStateToProps, { getProjectTask, addProjectTask })(UpdateProjectTask);