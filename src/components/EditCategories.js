import React, {Component} from 'react'
import axios from 'axios';
import AddCategory from './AddCategory'
import LandingPage from './LandingPage'

import swal from 'sweetalert';

//connect redux
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/user'


class EditCategories extends Component {
    constructor(props){
        super(props)

        let { user } = this.props
        let userid = user && user.id

        this.state = {
           categories: [],
           userid: userid
        }
    }

    componentDidMount = () => {

        // get logged in user info to pass as parameter to database
        let {user} = this.props
        let id = user && user.id

        // console.log("EnterExpenseCDM:", id)
       

        axios.get('/api/categories', {
            params: {
            
                userid: id
            }
        }).then((res) => {
            this.setState({
                categories: res.data
            })
        }).catch(err => console.log('error getting expenses:', err))

          //keep user logged in after refresh
          this.props.getUser()
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

                let { user } = this.props
                let userid = user && user.id

                // console.log(2222, id, userid)
            axios.delete(`/api/categories/${id}&${userid}`)
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
        let { user } = this.props
        let userid = user && user.id
        return(
            <div>
                 <>    
        {user? // Only show months, totals, create month, and expenses if user is logged in
            <span>
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
                 </span>
                 :
                 <span>
                     <LandingPage />
                 </span>
                 }
                 </> 
            </div>
           
        )
    }
}

//connect redux
let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(EditCategories)