import { gql } from "@apollo/client";

export const GET_USERS = gql`
query GetUsers($limit: Int!, $page: Int!) {
  users(limit: $limit, page:$page) {
      id
      first_name
      last_name
      age
      country
      email
      date_of_birth
      phone
  } 
}
  
  
   

`;
