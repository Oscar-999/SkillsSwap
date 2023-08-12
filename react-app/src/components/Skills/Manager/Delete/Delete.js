import { useModal } from '../../../../context/Modal'
import { deleteSkillThunk } from '../../../../store/skill'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './Delete.css'

const DeleteMulti = ({type, id}) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const delter = () => {
        try {
            if (type === "skill") {
                dispatch(deleteSkillThunk(id))
            }
            return closeModal()
        } catch (e) {
            return setErrorMessage("There was a problem. Please refresh")
        }
    }


    return (
        <div>
            <h2>Are you sure you want to delete this {type === "skill" ? "skill" : "request"}</h2>
            <h2>This wont be undone</h2>
            <p>{errorMessage}</p>
            <div>
                <button onClick={delter}> Delete it </button>
                <button onClick={closeModal}>No cancel</button>
            </div>
        </div>
    )
}

export default DeleteMulti
