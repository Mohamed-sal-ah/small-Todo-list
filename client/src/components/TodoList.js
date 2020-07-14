import gql from 'graphql-tag'
import { Query, Mutation } from '@apollo/react-components'
import React from 'react'
import TodoItem from './TodoItem'

const TODO_QUERY = gql`
query TodoType{
    todos{
        id
        text
        createDate
        editedDate
    }
}
`

const ADD_TODO_QUERY = gql`
mutation addTodo ($text : String!){
    addTodo (text : $text){
        text
        id
        createDate
    }
}
`

const TodoList = () => {
    let input;
    return (
        <div>
            <Query query={TODO_QUERY}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error</p>;
                        return <ul>
                            {data.todos.map((todo, key) => (
                                <TodoItem todo={todo} key={key} />
                            ))}
                        </ul>
                    }
                }
            </Query>
            <Mutation mutation={ADD_TODO_QUERY}>
                {(addTodo, { data }) => (
                    <div>
                        <form
                            onSubmit={() => {
                                addTodo({ variables: { text: input.value } });
                                input.value = '';
                            }}
                        >
                            <input
                                ref={node => {
                                    input = node;
                                }}
                            />
                            <button type="submit">Add Todo</button>
                        </form>
                    </div>
                )}
            </Mutation>
        </div>
    )
}



export default TodoList
