import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { useState, useEffect } from "react";
import './SkillUpdateModal.css'
import { useHistory } from "react-router-dom";

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

    const handleSubmit = async = (e) => {
        e.preventDefault();

        const newErrors = [];

        if(!name.length || name.length > 255)
    }
    return (
        <div>

        </div>
    )
}


export default SkillUpdateModal
