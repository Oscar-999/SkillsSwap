import CreateReview from "./index";


function CreateReviewModal({ skillId }) {
  const formData = { text: "",  skillId };
  return <CreateReview type="create" formData={formData} />;
}

export default CreateReviewModal;
