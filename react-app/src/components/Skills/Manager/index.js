import OpenModalButton from "../../OpenModalButton"

const SkillManger = ({skill}) => {
return (
    <div>
        <h1 className="manager-head">Manage {skill.name}</h1>
        <h2>Manage This Skill:</h2>
        <OpenModalButton className="skill-button" buttonText='Update Skill' modalComponent={<ServerFormUpdateModal title='Update Server' skill={skill} />} />
        <OpenModalButton className="skill-button" id="delete" buttonText="Delete Skill"  modalComponent={<DeleteModal type="server" id={skill.id} />} />
    </div>
)
}


export default SkillManger
