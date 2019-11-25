import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css"
import { access } from 'fs';
import axios from 'axios';

// page showing the user searching history table with delete button to choose to delete selected record from database
class History extends Component{
    constructor(props){
        super(props);

        this.state = {
            posts: [{
                     "label":'Test1',
                     "created":"asd",
                    "Delete Record":"asdasd"
                    }]
        }
        this.loadColumn()

    }

    loadColumn(){
        axios.post('/searchHistory').then(res=>{
            this.setState({posts:res.data})
            console.log(res.data)
        })
    }
    deleteRecord(data){
        console.log(data)
        axios.get('/deleteSearch?search='+data).then(res=>{
            console.log(res.data)
            this.loadColumn()
        })
    }
    
    
    render(){
        const columns = [
            {
                Header:"Search Keyword",
                accessor: "search"
            },
            {
                Header:"Created Time",
                accessor: "created"
            },
            {
                Header:"Delete Record",
                Cell:  row =>{
                    return (
                        <div>
                        <button className="manage_button" onClick={()=>{this.deleteRecord(row.original._id)}}>Delete</button>
                       
                        </div>
                    )
                }
            }
        ]
        return(
            <ReactTable
                columns={columns}
                data={this.state.posts}
            
            >

            </ReactTable>
        );
    }
}



export default History;