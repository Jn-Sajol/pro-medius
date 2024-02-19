import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  // Function to handle name input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Function to handle status input change
  const handleStatusChange = (e) => {
    setStatus(e.target.value.toLowerCase()); 
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && status) {
      const lowerCaseStatus = status.toLowerCase(); 
      if (["active", "completed", "pending", "archive"].includes(lowerCaseStatus)) {
        setTasks([...tasks, { name, status: lowerCaseStatus }]);
        setName("");
        setStatus("");
      } else {
        alert("Status must be one of: active, completed, pending, or archive");
      }
    }
  };

  // Filter based on selected status
  const filteredTasks = tasks.filter((task) => {
    const lowerCaseShow = show.toLowerCase(); 
    if (lowerCaseShow === "all") {
      return true;
    } else {
      return task.status === lowerCaseShow;
    }
  });

  // Sort based on status and name
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    if (a.status === "completed" && b.status !== "completed") return -1;
    if (b.status === "completed" && a.status !== "completed") return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={handleStatusChange}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => setShow("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => setShow("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => setShow("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
