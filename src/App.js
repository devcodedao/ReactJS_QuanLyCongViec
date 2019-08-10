import React, {Component} from 'react';

import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: ''
        }
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('data')) {
            var tasks = JSON.parse(localStorage.getItem('data'));
            this.setState({
                task: tasks
            })
        }
    }


    isToggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm: true,

                taskEditing: null
            })
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                // taskEditing:null
            })
        }

    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    onSubmit = (data) => {


        if (data.id == '') {
            data.id = this.generateID();
            this.state.task.push(data);
        } else {
            var index = this.findIndex(data.id);
            this.state.task[index] = data;
        }


        localStorage.setItem('data', JSON.stringify(this.state.task));
        console.log(localStorage.getItem('data'))

    }
    onUpdateStatus = (id) => {
        var tasks = this.state.task;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                task: tasks
            })
            localStorage.setItem('data', JSON.stringify(tasks));
        }
    }
    findIndex = (id) => {
        var tasks = this.state.task;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }
    onDelete = (id) => {
        var tasks = this.state.task;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1)
            this.setState({
                task: tasks
            })
            localStorage.setItem('data', JSON.stringify(tasks));
        }
    }
    onUpdate = (id) => {
        var tasks = this.state.task;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        })
        this.isToggleForm();
    }
    onFillter = (filterName, filterStatus) => {
        // console.log(filterName, filterStatus);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })

    }
    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }

    render() {
        var {isDisplayForm, filter} = this.state;
       var tasks=this.state.task;
        var {keyword} = this.state;
        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            })
        }

        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;

                })
            }
            if(filter.status){
                tasks = tasks.filter((task) => {
                    if (filter.status === -1) {
                        return task;
                    } else {
                        return   task.status === (filter.status === 1 ? true : false);
                    }
                })
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false);

                }

            });
        }


        var taskEditing = this.state.taskEditing;
        var elemForm = isDisplayForm ? <TaskForm
            task={taskEditing}
            onSubmit={this.onSubmit}/> : '';

        return (
            <div className="App">
                <div className="container">
                    <div className="text-center">
                        <h1>Quản Lý Công Việc</h1>
                        <hr/>
                    </div>
                    <div className="row">
                        <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                            {elemForm}
                        </div>
                        <div
                            className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                            <button
                                type="button"
                                className="btn btn-primary mb-5"
                                onClick={this.isToggleForm}
                            >

                                Thêm Công Việc
                            </button>

                            <TaskControl
                                onSearch={this.onSearch}

                            />
                            <div className="mt-5">
                                <TaskList
                                    tasks={tasks}
                                    onUpdateStatus={this.onUpdateStatus}
                                    onDelete={this.onDelete}
                                    onUpdate={this.onUpdate}
                                    onFillter={this.onFillter}

                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {};

export default App;


