import React, {Component} from 'react';
import TaskIteam from './TaskIteam';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {

            filterName: '',
            filterStatus: -1,


        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFillter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        )
        this.setState({
            [name]: value
        })
    }

    render() {
        var {tasks} = this.props;
        var elemtasks = tasks.map((task, index) => {
            return <TaskIteam
                key={task.id}
                index={index}
                task={task}
                onUpdateStatus={this.props.onUpdateStatus}//truyền dữ liệu ra ngoài
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
            />
        })
        return (
            <div>
                <div className="row mt-15 ">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        onChange={this.onChange}
                                        value={this.state.filterName}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        onChange={this.onChange}
                                        value={this.state.filterStatus}
                                    >
                                        <option value={-1}>Tất Cả</option>
                                            <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            <div className="clear"></div>
                            {elemtasks}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskList;