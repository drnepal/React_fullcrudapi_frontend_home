// this furniture modal shows up on a ShowFurniture component
// has the ability to edit individual furnitures, one at a time
// will need to call the api,
// send a message,
// refresh the parent.
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FurnitureForm from '../shared/FurnitureForm'
import { updateFurniture } from '../../api/furnitures'
// import messages from '../shared/AutoDismissAlert/messages'

const EditFurnitureModal = (props) => {
    const { user, home, show, handleClose, msgAlert, triggerRefresh } = props

    const [furniture, setFurniture] = useState(props.furniture)

    const onChange = (e) => {
        e.persist()
        
        setFurniture(prevFurniture => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            // if (updatedName === 'isSqueaky' && e.target.checked) {
            //     updatedValue = true
            // } else if (updatedName === 'isSqueaky' && !e.target.checked) {
            //     updatedValue = false
            // }
            
            const updatedFurniture = {
                [updatedName] : updatedValue
            }
            
            console.log('the furniture', updatedFurniture)
            console.log('the furniture (state)', furniture)

            return {
                ...prevFurniture, ...updatedFurniture
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateFurniture(user, home.id, furniture)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The furniture is better than ever',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <FurnitureForm 
                    furniture={furniture}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update The Furniture"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditFurnitureModal