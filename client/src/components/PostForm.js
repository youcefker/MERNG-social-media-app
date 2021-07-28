import React from 'react'
import { Form, Button  } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FETCH_POSTS_QUERY } from '../util/graphql' 

import { useForm } from '../util/hooks'

const PostForm = () => {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })


    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({ 
                query: FETCH_POSTS_QUERY,
                data
             })
            console.log(result)
            values.body = ''
        }
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Form.Input 
                    placeholder="Hi world!"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

export default PostForm

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                createdAt
                username
            }
            likeCount
            comments {
                id 
                createdAt 
                username
                body
            } 
            commentCount

        }
    }
`
