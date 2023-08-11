import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { useState, useEffect } from "react";
import './SkillUpdateModal.css'
import { useHistory } from "react-router-dom";
import { updateSkillThunk } from "../../../../store/skill";

const SkillUpdateModal = ({skill}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [name, setName] = useState(skill.name)
    const [price, setPrice] = useState(skill.price)
    const [description, setDescription] = useState(skill.description)
    const [skillImage, setSkillImage] = useState("")
    const [secondaryImage, setSecondaryImage] = useState("")
    const [thirdImage, setThirdImage] = useState("")
    const [error, setError] = useState(null)
    const [disableButton, setDisableButton] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];

        if (!name.length || name.length > 255) newErrors.push("Name must be between 1 and 255 characters");
        if (!description.length || description.length > 255) newErrors.push("Name must be between 1 and 255 characters");
        if (newErrors.length) {
            setError(newErrors);
            setDisableButton(true);
            return;
        };

        const form = new FormData()
        form.append('name', name);
        form.append('price', price)
        form.append('description', description)
        form.append('skillImage', skillImage)
        form.append('secondaryImage', secondaryImage)
        form.append('thirdImage', thirdImage)
        form.append('id', skill.id)

        dispatch(updateSkillThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error)
            } else {
                history.push(`/`)
                closeModal();
            }
        })
    }
    useEffect(() => {
        setDisableButton(false);
        const newErrors = [];
        if (!name.length || name.length > 255) newErrors.push("Name must be between 1 and 255 characters");
        if (!description.length || description.length > 255) newErrors.push("Description must be between 1 and 255 characters");
        if (newErrors.length) setDisableButton(true);
    }, [name, description]);

    return (
        <div>
                <h1>Update Skill</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">

                </form>
        </div>
    )
}


export default SkillUpdateModal
