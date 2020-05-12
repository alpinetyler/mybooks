import React, {Component} from 'react'
import axios from 'axios';
import AddCategory from './AddCategory'

import swal from 'sweetalert';

export default class EditCategories extends Component {
    constructor(props){
        super(props)

        this.state = {
           categories: []
        }
    }

    componentDidMount = () => {
        axios.get('/api/categories').then((res) => {
            this.setState({
                categories: res.data
            })
        }).catch(err => console.log('error getting expenses:', err))
    }

    createCategory = newCategory => {
        axios.post('/api/categories', newCategory)
            .then(res => {
                this.setState({
                    categories: res.data
                })
            }).catch(err => console.log(err))
    }

    deleteCategory = id => {
        // from sweet alert
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: {
                cancel: "No, Don't Delete!",
                dangerMode: "Yes, Delete It!",
            },
            
          })
          .then((willDelete) => {
            if (willDelete) {
                console.log(2222, id)
            axios.delete(`/api/categories/${id}`)
            .then(res => this.setState({ categories: res.data }))
            .catch(err => console.log(err))
              swal("Poof! Your category has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your category is safe!");
            }
          }); 


    }
    
    render() {
        return(
            <div>
                <table className="narrowTable">
                <tbody>
                    <tr>
                    <td className="nameColumn myHeaderCell"><h3>Category Name</h3></td>
                    <td className="deleteSaveColumn myHeaderCell"><h3>Delete</h3></td>

                    </tr>
                {this.state.categories.map((category, index) => {
                    return (
                        <tr key={index}>
                            <td className="myTableCell listExpense nameColumn">{category.categoryname}</td>
                            <td className="myTableCell listExpense"><button 
                            key={index}
                            className="fa hoverdelete sudobtn"
                            onClick={(e) => this.deleteCategory(e.target.value)} 
                            value={category.id}>&#xf014;</button></td>
                        </tr>
                            )
                })}
                <AddCategory 
                    createCategory={this.createCategory} />
                </tbody>
                </table>
                
            </div>
           
        )
    }
}