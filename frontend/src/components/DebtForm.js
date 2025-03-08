import React, { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";

const DebtForm = ({
  selectedDebt,
  onSave,
  onCancel,
  refreshToggle,
  setRefreshToggle,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    severity: "",
  });
  useEffect(() => {
    if (selectedDebt) {
      setForm({
        title: selectedDebt.title || "",
        description: selectedDebt.description || "",
        category: selectedDebt.category || "",
        severity: selectedDebt.severity || "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        category: "",
        severity: "",
      });
    }
  }, [selectedDebt]);

  // Update state for each form field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
    setForm({ title: "", description: "", category: "", severity: "" });
    if (onCancel) onCancel();
    setRefreshToggle(!refreshToggle);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>
          {selectedDebt ? "Edit Tech Debt" : "Add New Tech Debt"}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter debt title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              placeholder="e.g., Frontend, Backend"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSeverity">
            <Form.Label>Severity</Form.Label>
            <div>
              <Button
                type="button"
                style={{
                  backgroundColor: "yellow",
                  border: "none",
                  marginRight: "0.5rem",
                  color: "black",
                }}
                onClick={() =>
                  setForm((prev) => ({ ...prev, severity: "Low" }))
                }
                active={form.severity === "Low"}
              >
                Low
              </Button>
              <Button
                type="button"
                style={{
                  backgroundColor: "orange",
                  border: "none",
                  marginRight: "0.5rem",
                  color: "black",
                }}
                onClick={() =>
                  setForm((prev) => ({ ...prev, severity: "Medium" }))
                }
                active={form.severity === "Medium"}
              >
                Medium
              </Button>
              <Button
                type="button"
                style={{
                  backgroundColor: "red",
                  border: "none",
                  color: "black",
                }}
                onClick={() =>
                  setForm((prev) => ({ ...prev, severity: "High" }))
                }
                active={form.severity === "High"}
              >
                High
              </Button>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            {selectedDebt ? "Update" : "Add"}
          </Button>
          {selectedDebt && (
            <Button variant="secondary" onClick={onCancel} className="ms-2">
              Cancel
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DebtForm;
