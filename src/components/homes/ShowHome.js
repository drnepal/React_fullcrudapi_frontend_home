import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneHome, removeHome, updateHome } from '../../api/homes'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditHomeModal from './EditHomeModal'
import ShowFurniture from '../furnitures/ShowFurniture'
import NewFurnitureModal from '../furnitures/NewFurnitureModal'

// we need to get the home's id from the route parameters
// then we need to make a request to the api
// when we retrieve a home from the api, we'll render the data on the screen

const furnitureCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowHome = (props) => {
    const [home, setHome] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [furnitureModalShow, setFurnitureModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in ShowHome props', user)
    console.log('msgAlert in ShowHome props', msgAlert)

    useEffect(() => {
        getOneHome(id)
            .then(res => setHome(res.data.home))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting homes',
                    message: messages.getHomesFailure,
                    variant: 'danger'
                })
            })
    }, [updated,id,msgAlert ]) // eslint-disable-next-line 

    // here's where our removeHome function will be called
    const setHomeFree = () => {
        removeHome(user, home.id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeHomeSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeHomeFailure,
                    variant: 'danger'
                })
            })
    }

    let furnitureCards
    if (home) {
        if (home.furnitures.length > 0) {
            furnitureCards = home.furnitures.map(furniture => (
                <ShowFurniture
                    key={furniture.id} 
                    furniture={furniture}
                    user={user}
                    home={home}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if(!home) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ home.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>price: { home.price }</small></div>
                            <div><small>Type: { home.type }</small></div>
                            <div><small>onSale: { home.onSale }</small></div>

                            <div>
                                <small>
                                    Garden: { home.garden ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            className="m-2" variant="info"
                            onClick={() => setFurnitureModalShow(true)}
                        >
                            Give {home.type} a furniture!
                        </Button>
                        {
                            home.owner && user && home.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {home.type}
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setHomeFree()}
                                >
                                    Set {home.type} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className="m-2" style={furnitureCardContainerLayout}>
                {furnitureCards}
            </Container>
            <EditHomeModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateHome={updateHome}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                home={home}
            />
            <NewFurnitureModal 
                home={home}
                show={furnitureModalShow}
                handleClose={() => setFurnitureModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowHome