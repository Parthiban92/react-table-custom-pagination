import Head from "next/head";
import styles from "../styles/Home.module.css";
import DataGrid from "../src/containers/DataGrid";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default function Home() {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <DataGrid />
      </div>
    </ApolloProvider>
  );
}
