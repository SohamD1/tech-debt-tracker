import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DebtList from "./components/DebtList";
import DebtForm from "./components/DebtForm";
import { Container } from "react-bootstrap";

function App() {
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(false); // used to trigger re-fetching the debt list

  const handleSave = async (debtData) => {
    if (selectedDebt) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/debt/${selectedDebt.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(debtData),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update tech debt entry");
        }
      } catch (error) {
        console.error("Error updating tech debt:", error);
      }
    } else {
      //new debt entry
      try {
        const response = await fetch("http://localhost:5000/api/debt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(debtData),
        });
        if (!response.ok) {
          throw new Error("Failed to create tech debt entry");
        }
      } catch (error) {
        console.error("Error creating tech debt:", error);
      }
    }
    setSelectedDebt(null);
  };
  const handleEdit = (debt) => {
    setSelectedDebt(debt);
  };

  // delete a debt entry
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/debt/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete tech debt entry");
      }
      setRefreshToggle(!refreshToggle);
    } catch (error) {
      console.error("Error deleting tech debt:", error);
    }
  };

  // Cancel editing mode
  const handleCancel = () => {
    setSelectedDebt(null);
  };

  return (
    <Container className="mt-5">
      <DebtForm
        selectedDebt={selectedDebt}
        onSave={handleSave}
        onCancel={handleCancel}
        refreshToggle={refreshToggle}
        setRefreshToggle={setRefreshToggle}
      />
      <DebtList
        onEdit={handleEdit}
        onDelete={handleDelete}
        refreshToggle={refreshToggle}
      />
    </Container>
  );
}

export default App;
