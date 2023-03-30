import {GraphQLUpload} from "graphql-upload-minimal";

export const resolvers = {
    Upload: GraphQLUpload,

    Query: {
        status: () => {
            return {message: 'ok'}
        }
    },

    Mutation: {
        uploadDocuments: async (_: any, {docs}: any) => {
            try {
                for (const doc of docs) {
                    const {createReadStream, filename /*, fieldName, mimetype, encoding */} = await doc.file;
                    console.info(
                        doc.docType,
                        filename,
                        createReadStream()
                    );
                }

                return {success: true};
            } catch (error: any) {
                console.log("File upload failed", error);
                return {success: false, message: error.message};
            }
        },
    }
}