import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function from our api file
import { getAllHomes } from '../../api/homes'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
// styling objects use any CSS style, but in camelCase instead of the typical hyphenated naming convention
// this is because we're in js
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// HomesIndex will make a request to the API for all homes
// once it receives a response, display a card for each home
const HomesIndex = (props) => {
    const [homes, setHomes] = useState(null)
    const [error, setError] = useState(false)
    console.log('these are the homes in index', homes)
    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our homes from the api when the component mounts
    useEffect(() => {
        getAllHomes()
            .then(res => setHomes(res.data.homes))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting homes',
                    message: messages.getHomesFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [msgAlert ])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!homes) {
        // if no homes loaded yet, display 'loading'
        return <LoadingScreen />
    } else if (homes.length === 0) {
        // otherwise if there ARE no homes, display that message
        return <p>No homes yet, go add some!</p>
    }

    // once we have an array of homes, loop over them
    // produce one card for every home
    const homeCards = homes.map(home => (
        <Card key={ home.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ home.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/homes/${home.id}`} className="btn btn-info">View { home.type }</Link>
                </Card.Text>
                { home.owner ?
                <Card.Footer>
                     owner: {home.owner.email} 
                </Card.Footer>
                : null}
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the homecards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { homeCards }
        </div>
    )
}

// export our component
export default HomesIndex