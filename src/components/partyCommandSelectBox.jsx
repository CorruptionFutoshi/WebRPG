
import { CommandSelectBox } from "./commandSelectBox";

export const PartyCommandSelectBox = (props) => {
    let aliveParty = props.party.filter(member => member.hp > 0);

    const onClickConfirmButton = () => {
        if (props.selectedCommands.filter(command => !(command.attackType == "singleTarget" && command.target == null)).length == props.party.length) {
            props.setDisplayIndex(parseInt(props.index) + 1);
        }
    }

    const createCommandSelectBoxs = () => {
        let value = [];
        let aliveEnemies=props.enemies.filter(member => member.hp > 0);

        for (let i = 0; i < aliveParty.length; i++) {
            value.push(
                <div>
                    <CommandSelectBox party={aliveParty} enemies={aliveEnemies} selectedCommands={props.selectedCommands} setSelectedCommands={props.setSelectedCommands} index={i} />
                </div>
            );
        }

        return value;
    }

    return (
        <div>
            {createCommandSelectBoxs()}
            <button onClick={onClickConfirmButton}　>確定</button>
        </div>
    )
}