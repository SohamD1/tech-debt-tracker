import React, { useState, useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const DebtList = ({ onEdit, onDelete, refreshToggle }) => {
  const [debts, setDebts] = useState([]);
  const fetchDebts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/debt");
      const data = await response.json();
      setDebts(data);
    } catch (error) {
      console.error("Error fetching debts: ", error);
    }
  };
  // Refetch debts on component mount
  useEffect(() => {
    fetchDebts();
  }, [refreshToggle]);

  return (
    <div>
      <h2 className="my-4">Tech Debt Tracker</h2>
      {debts.length === 0 ? (
        <p>No tech debt entries found. Please add one.</p>
      ) : (
        <ListGroup>
          {debts.map((debt) => (
            <ListGroup.Item key={debt.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{debt.title}</Card.Title>
                  <Card.Text>{debt.description}</Card.Text>
                  <Card.Text>
                    <strong>Category:</strong> {debt.category} &nbsp;
                    <strong>Severity:</strong> {debt.severity} &nbsp;
                    <strong>Status:</strong> {debt.status}
                  </Card.Text>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => onEdit(debt)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(debt.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default DebtList;
