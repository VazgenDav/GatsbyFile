import * as React from "react";
import Modal from "react-modal";
import { TicketBackend } from "../ticket-backend";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "35px 30px 30px 30px",
    display: "flex",
    flexDirection: "column",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
  },
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

Modal.setAppElement("#___gatsby");

const AddTicket = ({ modalIsOpen, closeModal, setTickets }) => {
  const req = new TicketBackend();
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleDescChange = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    return await Promise.resolve(req.newTicket({ description }))
      .then(data => {
        setError("");
        setTickets(prev => {
          return [...prev, data];
        });
        setLoading(false);
        closeModal();
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <input
        type="text"
        name="description"
        placeholder="fill desc..."
        onChange={handleDescChange}
      />

      {error ? <p className="error">{error}</p> : null}

      {loading ? (
        <ClipLoader
          color={"#ffffff"}
          loading={loading}
          size={50}
          css={override}
        />
      ) : (
        <button className="ticket__save" onClick={handleSubmit}>
          Save a new Ticket
        </button>
      )}
    </Modal>
  );
};

export default AddTicket;
