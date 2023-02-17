// this modal is rendered by ShowHome
// The state that controls whether this is open or not live in ShowHome
// the state and the updaterfunction associated with that state is passed here as a prop.
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import HomeForm from '../shared/HomeForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditHomeModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateHome, msgAlert, triggerRefresh } = props

    const [home, setHome] = useState(props.home)

    const onChange = (e) => {
        e.persist()
        
        setHome(prevHome => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'garden' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'garden' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedHome = {
                [updatedName] : updatedValue
            }
            
            console.log('the home', updatedHome)

            return {
                ...prevHome, ...updatedHome
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateHome(user, home)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateHomeSuccess,
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh of the show page.
            // we'll build a function in the ShowHome component that does this for us, and we'll import that here as a prop
            // this triggers a refresh of the parent(ShowHome) by changing the value of the updated piece of state which lives in useEffect's dependency array.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateHomeFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <HomeForm 
                    home={home} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Home"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditHomeModal