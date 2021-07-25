import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Image } from 'semantic-ui-react'
import gql from 'graphql-tag'
import PostCard from '../components/PostCard'
export default function Home() {
    const { loading, data} = useQuery(FETCH_POSTS_QUERY)
    return (
        <Grid columns={3}>
            <Grid.Row className="title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading? (
                    <h1>loading posts...</h1>
                ) : (
                    data.getPosts && data.getPosts.map(post => (
                        <Grid.Column key={post.id}>
                            <PostCard post={post}/>
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
        
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id 
            body 
            createdAt
            likeCount
            username 
            likes {
                username
            }
            commentCount
            comments {
                id 
                username 
                createdAt
                body
            }
        }
    }
`
