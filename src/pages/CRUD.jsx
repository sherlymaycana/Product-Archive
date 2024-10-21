import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";

const CRUD = () => {
  const [products, setProducts] = useState([]); // State for storing products
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // State for managing the new and edited product
  const [isEditing, setIsEditing] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [editProductId, setEditProductId] = useState(null); // ID of the product being edited

  // Function to fetch data from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      setProducts(response.data); // Set the fetched products to state
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`); // Send DELETE request
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setNewProduct(productToEdit); // Load product data to edit
    setIsEditing(true); // Enter edit mode
    setEditProductId(id); // Store ID of the product being edited
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const formattedProduct = {
      title: newProduct.title,
      price: parseFloat(newProduct.price), // Ensure price is a number
      description: newProduct.description,
      categoryId: newProduct.categoryId || 1,
    };

    if (isEditing) {
      // If in edit mode, update the existing product
      try {
        const response = await axios.put(
          `https://api.escuelajs.co/api/v1/products/${editProductId}`,
          formattedProduct // Use the formatted product
        );

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editProductId ? response.data : product
          )
        );
        setIsEditing(false); // Exit edit mode
      } catch (err) {
        console.error("Error updating product:", err);
      }
    } else {
      // If adding a new product
      try {
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/products/",
          {
            title: formattedProduct.title,
            price: formattedProduct.price,
            description: formattedProduct.description,
            categoryId: formattedProduct.categoryId,
            images: ["https://placeimg.com/640/480/any"],
          }
        );

        // Add the newly created product to the state
        setProducts((prevProducts) => [...prevProducts, response.data]);
        // Reset form after submission
        setNewProduct({
          title: "",
          price: "",
          description: "",
          categoryId: 1, // Reset categoryId to default
        });
      } catch (err) {
        console.error("Error adding product:", err);
      }
    }

    // Reset form after submission
    setNewProduct({
      title: "",
      price: "",
      description: "",
      categoryId: "", // Reset categoryId
    });
  };

  if (loading) return <p>Loading...</p>; // Show loading indicator
  if (error) return <p>Error: {error}</p>; // Show error message

  return (
    <div className="crud-page">
      <div className="crud min-vh-100 w-100">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h1>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* Form to add or edit products */}
              <Form onSubmit={handleAddSubmit}>
                <Form.Group controlId="formTitle" className="mb-2">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newProduct.title}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPrice" className="mb-2">
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mb-2">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={newProduct.description}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-2">
                  {isEditing ? "Save Changes" : "Add Product"}
                </Button>
                {isEditing && (
                  <Button
                    variant="secondary"
                    className="mb-2 mx-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                )}
              </Form>

              <div className="mt-5">
                <h2>Product List</h2>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(products) && products.length > 0 ? (
                      products
                        .slice()
                        .sort((a, b) => b.id - a.id)
                        .map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                              <img
                                src={product.category.image} // Display category image
                                alt={product.title}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.category.name}</td>{" "}
                            {/* Display category name */}
                            <td className="d-flex g-3">
                              <Button
                                variant="outline-danger"
                                onClick={() => handleDelete(product.id)} // Call handleDelete with product ID
                              >
                                Del
                              </Button>
                              <Button
                                variant="outline-primary"
                                onClick={() => handleEdit(product.id)} // Call handleEdit with product ID
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No products available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CRUD;
