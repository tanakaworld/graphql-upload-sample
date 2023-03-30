import React from 'react';
import './App.css';
import {useMutation, useQuery} from "@apollo/client";
import {GET_STATUS, UPLOAD_DOCUMENTS} from "./gql/schema";

function App() {
    const {data: statusData} = useQuery(GET_STATUS)
    const [uploadDocuments, uploadResults] = useMutation(UPLOAD_DOCUMENTS);

    const onChange = async ({target: {validity, files}}: any) => {
        console.log(files);

        if (validity.valid) {
            try {
                const docs = Array.from(files, (file: any) => ({
                    docType: file.type,
                    file
                }));
                await uploadDocuments({variables: {docs}})
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log('Files are not valid');
        }
    }

    return (
        <div className="App">
            <h1>GraphQL Upload Sample</h1>

            <h2>Query</h2>

            <pre>{JSON.stringify(statusData)}</pre>

            <hr/>

            <h2>Mutation</h2>

            <input type="file" multiple required onChange={onChange}/>

            <div>{uploadResults.loading && 'Uploading....'}</div>
            <pre>{uploadResults.data && JSON.stringify(uploadResults.data)}</pre>
            <pre>{!!uploadResults.error && JSON.stringify(uploadResults.error)}</pre>
        </div>
    );
}

export default App;
