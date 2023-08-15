import CreateReview from "./index";


function CreateChannelModal({ skillId }) {
  const formData = { text: "",  skillId };
  return <CreateReview type="create" formData={formData} />;
}

export default CreateChannelModal;
