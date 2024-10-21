import { Container, Row, Col, Accordion } from "react-bootstrap";
import { faq } from "../data/index";

const FaqComponent = () => {
  return (
    <div className="faq">
      <Container>
        <Row className="pb-4">
          <Col>
            <h2 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-1s">
              Pertanyaan yang Sering Ditanyakn
            </h2>
          </Col>
        </Row>
        <Row className="row-cols-lg-2 row-cols-1 g-4">
          {faq.map((data) => {
            return (
              <Col key={data.id}>
                <Accordion
                  className="shadow-sm"
                  data-aos="fadeUp"
                  data-aos-duration="2000"
                  data-aos-delay={`${data.id}00`}
                >
                  <Accordion.Item eventKey={data.eventKey}>
                    <Accordion.Header>{data.title}</Accordion.Header>
                    <Accordion.Body>{data.desc}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default FaqComponent;
