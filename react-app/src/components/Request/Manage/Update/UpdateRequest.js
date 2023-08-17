import CreateRequest from "../Create/CreateRequest";

const UpdateRequestModal = ({ request }) => {
    return (
        <CreateRequest type='update' formData={request}/>
    )
}

export default UpdateRequestModal
