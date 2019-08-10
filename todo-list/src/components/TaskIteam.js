import React, { Component } from 'react';

class TaskIteam extends Component {
    onUpdateStatus=()=>{
        console.log(this.props.task.id)
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete=()=>{
        this.props.onDelete(this.props.task.id);
    }
    onUpdate=()=>{
        this.props.onUpdate(this.props.task.id);
    }

    render() {

        var { task } = this.props;
        var { index } = this.props;
        return (
            <div>
                <tr>
                    <td className="p-5" >{index +1}</td>
                    <td >{task.name}</td>
                    <td className="text-center"

                    >
                        <span
                            onClick={this.onUpdateStatus}
                        >{task.status === true ? 'kích hoạt' : 'ẩn'}</span>
                    </td>
                    <td className="text-center">
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={this.onUpdate}
                        >
                            Sửa
                    </button>
                        &nbsp;
                    <button
                            type="button" className="btn btn-danger"
                            onClick={this.onDelete}
                        >
                            Xóa
                    </button>
                    </td>

                </tr>
            </div>
        );
    }
}

export default TaskIteam;