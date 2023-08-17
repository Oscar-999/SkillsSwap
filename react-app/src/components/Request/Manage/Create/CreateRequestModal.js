import CreateRequest from "./CreateRequest";



function CreateRequestModal({ skillId }) {
  const formData = { name: "", description:"", budget: 0, reqImage: "", skillId };
  return <CreateRequest type="create" formData={formData} />;
}


export default CreateRequestModal;
