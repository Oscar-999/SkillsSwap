import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../../../context/Modal";
import { useEffect, useState } from "react";
import { createSkillThunk } from "../../../../store/skill";

const CreateSkillModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [description, setDescription] = useState("");
  const [skillImage, setSkillImage] = useState("");
  const [secondaryImage, setSecondaryImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({});
  const [disableButton, setDisableButton] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!name.length || name.length > 255)
      newErrors.push("Name must be between 1 and 255 characters");
    if (!description.length || description.length > 255)
      newErrors.push("Name must be between 1 and 255 characters");
    if (newErrors.length) {
      setError(newErrors);
      setDisableButton(true);
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("skill_image", skillImage);
    form.append("secondary_image", secondaryImage);
    form.append("third_image", thirdImage);
    dispatch(createSkillThunk(form)).then((responseData) => {
      if (responseData.error) {
        setError(responseData.error);
      } else {
        history.push(`/skills`);
        closeModal();
      }
    });
  };

  useEffect(() => {
    setDisableButton(false);
    const newErrors = [];
    if (!name.length || name.length > 255)
      newErrors.push("Name must be between 1 and 255 characters");
    if (!description.length || description.length > 255)
      newErrors.push("Description must be between 1 and 255 characters");
    if (newErrors.length) setDisableButton(true);
  }, [name, description]);

  return (
    <div className="">
      <h1>Create a Skill</h1>
      {error.length
        ? error.map((e) => <p className="create-error">{e}</p>)
        : null}

      <form className="" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="skill-create-name">Skill Name</label>
        <input
          id=""
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="What would you like to call this skill?"
        />
        <label htmlFor="skill-create-price">Skill Price</label>
        <input
          id=""
          type="number"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Set a price for your skill"
        />
        <label htmlFor="skill-create-description">Skill Description</label>
        <input
          id=""
          type="text"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your skill to your customers"
        />
        <label htmlFor="skill-create-image">New Skill Image</label>
        <input
  type="file"
  name="skill-form-skill-image"
  required
  onChange={(e) => setSkillImage(e.target.files[0])}
  accept="image/*"
/>
        <label htmlFor="secondary-create-image">New Secondary Image</label>
        <input
  type="file"
  name="skill-form-secondary-image"
  required
  onChange={(e) => setSecondaryImage(e.target.files[0])}
  accept="image/*"
/>
        <label htmlFor="third-create-image">New Third Image</label>

<input
  type="file"
  name="skill-form-third-image"
  required
  onChange={(e) => setThirdImage(e.target.files[0])}
  accept="image/*"
/>
        <button
          className=""
          id="skill-form-submit-button"
          type="submit"
          disabled={disableButton}
        >
          Create Skill
        </button>
      </form>
    </div>
  );
};

export default CreateSkillModal;
