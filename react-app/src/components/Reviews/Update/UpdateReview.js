import CreateReview from "../CreateReview";

const UpdateReviewModal = ({ review }) => {
    return (
        <CreateReview type='update' formData={review}/>
    )
}

export default UpdateReviewModal
