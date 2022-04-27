import { css } from "@emotion/react";
import { Link } from "gatsby";
import * as React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import AddTicket from "../components/AddTicket";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { TicketBackend } from "../ticket-backend";

const IndexPage = () => {
  const [tickets, setTickets] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  React.useEffect(() => {
    const req = new TicketBackend();

    const getData = async () => {
      setLoading(true);
      const res = await Promise.all([req.tickets(), req.users()]);
      setTickets(() => [...res[0]]);
      setUsers(() => [...res[1]]);
      setLoading(false);
    };

    getData();
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const getAssignee = id => {
    const assignee = users?.filter(user => user.id === id);
    return assignee[0];
  };


  return (
      <Layout>
        <Seo title="Home" />
        {loading && !tickets.length && !users.length ? (
          <ClipLoader
            color={"#ffffff"}
            css={override}
            loading={loading}
            size={150}
          />
        ) : null}
        {tickets && users && !loading ? (
          <div className="tickets__box">
            {tickets.map(ticket => {
              const { id, description, completed, assigneeId } = ticket;
              const name = getAssignee(assigneeId);
              return (
                <Link to={`/app/ticket/${ticket.id}`} key={id}>
                  <div className={`${completed ? "done" : "danger"} ticket`}>
                    <h1>{name?.name || "There is not assignee"}</h1>
                    <div className="description">{description}</div>
                  </div>
                </Link>
              );
            })}
            <div className="ticket add" onClick={openModal}>
              <span className="add__ticker">+</span>
            </div>
          </div>
        ) : null}
        {modalIsOpen ? (
          <AddTicket
            modalIsOpen={modalIsOpen}
            setTickets={setTickets}
            closeModal={closeModal}
          />
        ) : null}
      </Layout>
  );
};

export default IndexPage;
