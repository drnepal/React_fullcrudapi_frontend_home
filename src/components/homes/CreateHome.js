// CreateHome needs to render a form
// that form should build a home object in state
// the form should make an axios post request when submitted
// we should send an alert upon success or failure
// on success: component should redirect our user to the new home show page
// on failure: component should send the message and remain visible
import { useState } from 'react'
import { createHome } from '../../api/homes'
import { createHomeSuccess, createHomeFailure } from '../shared/AutoDismissAlert/messages'
import HomeForm from '../shared/HomeForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateHome = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [home, setHome] = useState({
        name: '',
        type: '',
        age: '',
        garden: false
    })

    const onChange = (e) => {
        e.persist()
        
        setHome(prevHome => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
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

        createHome(user, home)
            // first we'll nav to the show page
            .then(res => { navigate(`/homes/${res.data.home.id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createHomeSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createHomeFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <HomeForm 
            home={home}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new home!"
        />
    )
}

export default CreateHome