import { Router as MyRouter } from "@reach/router";
import Layout from "../components/layout";
import Ticket from "./modules/ticket";
import * as React from "react";

const Router = () => {
  return (
    <Layout>
      <MyRouter>
        <Ticket path="/app/ticket/:id" />
      </MyRouter>
    </Layout>
  );
};

export default Router;
