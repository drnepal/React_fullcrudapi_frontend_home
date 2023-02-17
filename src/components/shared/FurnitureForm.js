import { Form, Button, Container } from 'react-bootstrap'

const FurnitureForm = (props) => {
    const { furniture, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the furniture's name?"
                        name="name"
                        id="name"
                        value={ furniture.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Type:</Form.Label>
                    <Form.Control 
                        placeholder="What kind of furniture is this?"
                        name="description"
                        id="description"
                        value={ furniture.type }
                        onChange={handleChange}
                    />
                {/* </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Do you Need this?"
                        name="doyouNeed"
                        defaultChecked={ furniture.isSqueaky }
                        onChange={handleChange}
                    /> */}
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Select 
                        aria-label="furniture condition"
                        name="condition"
                        defaultValue={furniture.needs}
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        <option value="new">new</option>
                        <option value="used">used</option>
                        <option value="disgusting">discolored</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default FurnitureForm