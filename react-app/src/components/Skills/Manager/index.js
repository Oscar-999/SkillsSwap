import OpenModalButton from "../../OpenModalButton"
import DeleteMulti from "./Delete/Delete"
import SkillUpdateModal from './Update/SkillUpdateModal'
const SkillManger = ({skill}) => {
return (
    <div>
        <h1 className="manager-head">Manage {skill.name}</h1>
        <h2>Manage This Skill:</h2>
        <OpenModalButton className="skill-button" buttonText='Update Skill' modalComponent={<SkillUpdateModal title='Update Skill' skill={skill} />} />
        <OpenModalButton className="skill-button" id="delete" buttonText="Delete Skill"  modalComponent={<DeleteMulti type="skill" id={skill.id} />} />
    </div>
)
}


export default SkillManger
