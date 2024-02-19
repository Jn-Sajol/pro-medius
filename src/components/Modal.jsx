import React, { useState, useEffect } from "react";

const Modal = ({ title, isOpen, onClose, onContactClick }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://contact.mediusware.com/api/contacts/?page=${page}&search=${search}`
        );
        const data = await response.json();
        setContacts((prevContacts) => [...prevContacts, ...data.results]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Reset contacts and page when modal is opened
    if (isOpen) {
      setContacts([]);
      setPage(1);
    }

    fetchData();
  }, [isOpen, search, page]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div
            className="modal-body"
            onScroll={handleScroll}
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {contacts.map((contact, index) => (
              <div key={index} className="mb-3">
                <strong>ID:</strong> {contact.id}
                <br />
                <strong>Name:</strong> {contact.name}
                <br />
                <strong>Email:</strong> {contact.email}
                <br />
                <strong>Phone:</strong> {contact.phone}
                <br />
                <strong>Country:</strong> {contact.country.name}
                <hr />
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onContactClick()}
            >
              View Contact Details
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
