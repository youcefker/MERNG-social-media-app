import React from 'react'
import moment from 'moment'
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
    function likePost() {
        console.log('post of ' + username + ' liked')
    }
    function commentPost() {
        console.log('post of ' + username + ' commented')
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button as='div' labelPosition='right' onClick={likePost}>
                <Button color='teal' basic>
                    <Icon name='heart' />
                    Like
                </Button>
                <Label as='a' basic color='teal' pointing='left'>
                    {likeCount}
                </Label>
            </Button>
            <Button as='div' labelPosition='right' onClick={commentPost}>
                <Button color='blue' basic>
                    <Icon name='comments' />
                    Comment
                </Button>
                <Label as='a' basic color='blue' pointing='left'>
                    {commentCount}
                </Label>
            </Button>
            </Card.Content>
        </Card>
    )
}
