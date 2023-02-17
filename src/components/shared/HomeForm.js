// this form will take several props and be used both to create and update homes
// the action will be dependent upon the parent component
// but the form will look the same on both Create and Update
import { Form, Button, Container } from 'react-bootstrap'

const HomeForm = (props) => {
    // we need several props for a working, reusable form
    // the object itself(home), some handleChange fn, some handleSubmit fn
    // and in this case, we'll add a custom heading
    const { home, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Type:</Form.Label>
                    <Form.Control 
                        placeholder="What is the type of home?"
                        name="name"
                        id="name"
                        value={ home.type }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>color:</Form.Label>
                    <Form.Control 
                        placeholder="What color is the home?"
                        name="type"
                        id="type"
                        value={ home.color }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>price:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="What is the value of your Home?"
                        name="age"
                        id="age"
                        value={ home.price }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this home onsale?"
                        name="forsale"
                        defaultChecked={ home.onSale }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default HomeForm