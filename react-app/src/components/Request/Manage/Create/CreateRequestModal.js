import CreateRequest from "./CreateRequest";



function CreateRequestModal({ skillId }) {
  const formData = { name: "", description:"", budget:1,  skillId };
  return <CreateRequest type="create" formData={formData} />;
}


export default CreateRequestModal;
