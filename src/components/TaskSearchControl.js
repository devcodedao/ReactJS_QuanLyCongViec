import React, { Component } from 'react';

class TaskSearchControl extends Component {
    constructor(props) {
        super(props);
        this.state = {

            keyword:''
        }
    }
    onChange=(event)=>{
        var target =event.target;
        var name=target.name;
        var value=target.value;
        this.setState({
            [name]:value
        })
    }
    onSearch=()=>{
        this.props.onSearch(this.state.keyword);
    }
    render() {
        var {keyword}=this.state;
        return (
            <div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 " >
                    <div className="input-group w-100">
                        <input
                            name="keyword"
                            value={keyword}
                            onChange={this.onChange}
                            type="text"
                            className="form-control timkiem "
                            placeholder="Nhập từ khóa..."

                          
                        />
                        <span className="input-group-btn mt-2">
                            <button className="btn btn-primary timkiem"
                                    onClick={this.onSearch}
                                    type="button">
                               Tìm
                        </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskSearchControl;