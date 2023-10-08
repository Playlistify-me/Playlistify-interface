import Image from 'next/image'
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function Home() {
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <h1>React bootstrap werkt</h1>
            <p>
              styles/globals.css
            </p>
            <Button variant="primary">Primary</Button>
          </Col>
        </Row>
      </Container>
    </main>
  )
}
