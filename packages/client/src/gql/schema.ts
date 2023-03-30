import {gql} from "@apollo/client";

export const GET_STATUS = gql`
    query GetStatus {
        status {
            message
        }
    }
`
export const UPLOAD_DOCUMENTS = gql`
    mutation UploadDocuments ($docs: [DocumentUploadInput!]!) {
        uploadDocuments(docs: $docs) {
            success
            message
        }
    }
`