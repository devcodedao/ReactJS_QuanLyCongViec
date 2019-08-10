import { type } from "os";
import * as types from './../constants/ActionType';
var inittialState=[
    {
        id:1,
        name:'Hoc lap trinh react',
        status:false
    }
];


var myReducer=(state=inittialState,action)=>{
    switch(action.type){
        case types.LIST_ALL:
            return state;
            default:return state;

    }
}
export default myReducer;