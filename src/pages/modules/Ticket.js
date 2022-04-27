import { useParams } from "@reach/router";
import React from "react";
import { TicketBackend } from "../../ticket-backend";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "../../components/layout.css";
const Ticket = () => {
  const { id } = useParams();
  const [currTicket, setCurrTicket] = React.useState({});
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const req = new TicketBackend();

    const getData = async () => {
      setLoading(true);
      await Promise.resolve(req.ticket(Number(id)))
        .then(async data => {
          setCurrTicket(prev => {
            return {
              ...prev,
              ...data,
            };
          });
        })
        .catch(e => setError(e.message || "something gone wrong"))
        .finally(() => {
          setLoading(false);
        });
    };
    getData();
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  if (loading) {
    return (
      <ClipLoader
        color={"#ffffff"}
        css={override}
        loading={loading}
        size={150}
      />
    );
  }

  const { description, completed } = currTicket;

  if (error) {
    return <h1 className="error">{error}</h1>;
  }

  return (
    <div className={`${completed ? "done" : "danger"} curr__tick`}>
      {description}
    </div>
  );
};

export default Ticket;
