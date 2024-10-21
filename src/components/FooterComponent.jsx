import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { navLinks } from "../data/index";

const FooterComponent = () => {
  return (
    <div className="footer">
      <Container>
        <Row className="d-flex justify-content-between py-5">
          <Col lg="5">
            <h3 className="fw-bold ">React</h3>
            <p className="desc">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              molestiae tenetur nisi.
            </p>
            <div className="no mb-1 mt-4">
              <Link className="text-decoration-none">
                <i className="fa-brands fa-whatsapp"></i>
                <p className="m-0">628987261721</p>
              </Link>
            </div>
            <div className="email">
              <Link className="text-decoration-none">
                <i className="fa-regular fa-envelope"></i>
                <p className="m-0">person-email@gmail.com</p>
              </Link>
            </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
            <h5 className="fw-bold">Menu</h5>
            {navLinks.map((link) => {
              return (
                <Link to={link.path} className="text-decoration-none">
                  {link.text}
                </Link>
              );
            })}
            <a className="text-decoration-none" href="/crud">
              Data Entry
            </a>
          </Col>
          <Col lg="4" className="mt-lg-0 mt-5">
            <h5 className="fw-bold">Subscribe untuk info menarik</h5>
            <div className="subscribe">
              <input type="text" placeholder="Subscribe ..." />
              <button className="btn btn-danger rounded-end">Subscribe</button>
            </div>
            <div className="social mt-3">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center p-4 m-0">
              &copy; Copyright{new Date().getFullYear()} by{" "}
              <span className="fw-bold">ME</span>, All Right Reserve
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComponent;
