import OpenModalButton from "../../OpenModalButton"
import DeleteMulti from "./Delete/Delete"
import SkillUpdateModal from './Update/SkillUpdateModal'
import './SkillManager.css'
const SkillManger = ({skill}) => {
return (
    <div className="modal-wrap-manage">
        <h1 className="manager-head">Manage {skill.name}</h1>
        <h2>Manage This Skill:</h2>
        <div className="modal-sec">
        <OpenModalButton className="skill-buttn" id='update' buttonText='Update Skill' modalComponent={<SkillUpdateModal title='Update Skill' skill={skill} />} />
        <OpenModalButton className="skill-buttn" id="delete" buttonText="Delete Skill"  modalComponent={<DeleteMulti type="skill" id={skill.id} />} />
        </div>
    </div>
)
}


export default SkillManger
