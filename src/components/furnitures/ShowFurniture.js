import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteFurniture } from '../../api/furnitures'
import EditFurnitureModal from './EditFurnitureModal'

const ShowFurniture = (props) => {
    const { furniture, user, home, msgAlert, triggerRefresh } = props

    // here's our hook to display the EditFurnitureModal
    const [editModalShow, setEditModalShow] = useState(false)
    // console.log('this is the furniture in showFurniture', furniture)
    // here, we're going to use react styling objects to our advantage
    // this will look at the furniture's condition, and change the background color
    // we'll also use this to set a consistent width for each card
    // we'll pass the results of this function to a style prop in our card
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: 'lightgreen'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: 'lightgreen'})
        } else {
            return({width: '18rem', backgroundColor: 'lightgreen'})
        }
    }

    // delete, similar to delete for homes, all we have to do is ensure that the user is the home's owner, and make the api call passing in the right args.
    const destroyFurniture = () => {
        // this is the api call file function
        // it requires three args, user, homeId, & furnitureId
        deleteFurniture(user, home.id, furniture._id)
            // upon success, we want to send a message
            .then(() => {
                msgAlert({
                    heading: 'Furniture Deleted',
                    message: 'Bye Bye furniture!',
                    variant: 'success'
                })
            })
            // then trigger a refresh of the parent component
            .then(() => triggerRefresh())
            // upon failure send an appropriate message
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(furniture.condition)}>
                <Card.Header>{furniture.name}</Card.Header>
                <Card.Body>
                    <small>{furniture.description}</small><br/>
                    <small>
                        {furniture.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {furniture.condition}</small><br/>
                    {
                    
                home.detail.type = home.name ?
                
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Furniture
                            </Button>
                            <Button 
                                onClick={() => destroyFurniture()} 
                                variant="danger"
                                className="m-2"
                            >
                                Delete Furniture
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditFurnitureModal
                user={user}
                home={home}
                furniture={furniture}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowFurniture