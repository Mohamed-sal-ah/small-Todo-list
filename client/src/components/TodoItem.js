import React, { Component } from 'react'
import { Mutation } from '@apollo/react-components'
import gql from 'graphql-tag'
const DELETE_TODO_QUERY = gql`
mutation deleteTodo ($id : Int!){
    deleteTodo (id : $id){
        text
        id
        createDate
    }
}
`

const EDIT_TODO_QUERY = gql`
mutation editTodo ($id : Int!,$text : String!){
    editTodo (id : $id,text : $text){
        text
        id
        createDate
        editedDate
    }
}
`

class TodoItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggleEdit: false,
            editInput: this.props.todo.text
        }
    }
    onChangeEdit = e => {
        this.setState({ editInput: e.target.value })
    }
    toggleEditMode = () => {
        const boolChange = !this.state.toggleEdit
        this.setState({ toggleEdit: boolChange })
    }

    render() {
        const { todo } = this.props
        const { toggleEdit, editInput } = this.state
        return (
            <li id={todo.id}>
                {todo.editedDate ? <p>
                    Edited at : {todo.editedDate}
                </p> : <p>Created at : {todo.createDate}</p>}
                {toggleEdit ? <Mutation mutation={EDIT_TODO_QUERY}>
                    {(editTodo, { data }) => (
                        <div className='edit'>
                            <input onChange={this.onChangeEdit} value={editInput} />
                            <button onClick={() => {
                                this.setState({ toggleEdit: false })
                                editTodo({ variables: { id: todo.id, text: this.state.editInput } })
                            }}>Submit Edit</button>
                        </div>
                    )
                    }
                </Mutation> : <h4>{todo.text}</h4>}
                <div className='button-group'>
                    <button onClick={this.toggleEditMode}>{toggleEdit ? 'Cancel' : 'Edit'}</button>
                    <Mutation mutation={DELETE_TODO_QUERY}>
                        {(deleteTodo, { data }) => (
                            <button className='danger' type="button" onClick={() => {
                                deleteTodo({ variables: { id: todo.id } })
                                setTimeout(() => {
                                    window.location.reload(false)
                                }, 100)
                            }
                            } >Delete</button>
                        )
                        }
                    </Mutation>
                </div>
            </li>
        )
    }

}

export default TodoItem