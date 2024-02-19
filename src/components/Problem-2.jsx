import React, { useState } from "react";
import Modal from "./Modal";

const Problem2 = () => {
  const [modal, setModal] = useState(null); // State to manage which modal is open

  const toggleModal = (title) => {
    if (!modal || modal.title !== title) {
      // Open the modal if it's not open or if it's a different modal
      setModal({ title, isOpen: true });
      // Update URL
      window.history.pushState({}, "", `/${title === "All Contacts" ? "all" : "us"}`);
    } else {
      // Close the modal if it's already open
      setModal(null);
      // Reset URL
      window.history.pushState({}, "", "/");
    }
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModal(null);
    window.history.pushState({}, "", "/");
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={() => toggleModal("All Contacts")}
              type="button"
            >
              All Contacts
            </button>
            <button
              className="btn btn-lg btn-outline-warning"
              onClick={() => toggleModal("US Contacts")}
              type="button"
            >
              US Contacts
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          title={modal.title}
          isOpen={modal.isOpen}
          onClose={closeModal}
          onContactClick={() => toggleModal("Contact Details")}
        />
      )}
    </div>
  );
};

export default Problem2;
