import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FurnitureForm from '../shared/FurnitureForm'
import { createFurniture } from '../../api/furnitures'
import messages from '../shared/AutoDismissAlert/messages'

const NewFurnitureModal = (props) => {
    const { home, show, handleClose, msgAlert, triggerRefresh } = props

    const [furniture, setFurniture] = useState({})

    const onChange = (e) => {
        e.persist()
        
        setFurniture(prevFurniture => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            // if (updatedName === 'i' && e.target.checked) {
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
        createFurniture(home.id, furniture)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createFurnitureSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createFurnitureFailure,
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
                    heading={`Give ${home.name} a furniture!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewFurnitureModal