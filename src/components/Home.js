//


import HomesIndex from './homes/HomesIndex'
import Container from 'react-bootstrap/Container'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container className="m-2" style={{textAlign: 'center'}}>
			<h2>See All The Homes</h2>
			<HomesIndex msgAlert={ props.msgAlert } />
		</ Container>
	)
}

export default Home