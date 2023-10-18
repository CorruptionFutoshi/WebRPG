import Select from 'react-select'
import React, { useState } from 'react';

export const CommandSelectBox = (props) => {
    const [targetSelectIsDisabled, setTargetSelectIsDisabled] = useState(true);

    const handleChange = (e) => {
        let selectedCommandsCopy = [...props.selectedCommands];
        selectedCommandsCopy[props.index] = e;
        selectedCommandsCopy[props.index].invoker = props.party[props.index];

        switch (e.name) {
            case '通常攻撃':
                selectedCommandsCopy[props.index].type = "aa";
                selectedCommandsCopy[props.index].attackType="singleTarget";
                break;
            case '逃げる':
                selectedCommandsCopy[props.index].type = "runaway";
                selectedCommandsCopy[props.index].attackType="aoe";
                break;
            case 'Goodbye Sword':
                selectedCommandsCopy[props.index].type = "item";
                selectedCommandsCopy[props.index].attackType="singleTarget";
                break;
            case '大タル爆弾':
                selectedCommandsCopy[props.index].type = "item";
                selectedCommandsCopy[props.index].attackType="aoe";
                break;
            case '体力ポーション':
                selectedCommandsCopy[props.index].type = "item";
                selectedCommandsCopy[props.index].attackType="singleTarget";
                break;
            case '真影侵壊':
                selectedCommandsCopy[props.index].type = "skill";
                selectedCommandsCopy[props.index].attackType="singleTarget";
                break;
            case 'ソウルドレイン':
                selectedCommandsCopy[props.index].type = "skill";
                selectedCommandsCopy[props.index].attackType="aoe";
                break;
            case '磁気嵐流':
                selectedCommandsCopy[props.index].type = "skill";
                selectedCommandsCopy[props.index].attackType="aoe";
                break;
            case '忍び寄る恐怖':
                selectedCommandsCopy[props.index].type = "skill";
                selectedCommandsCopy[props.index].attackType="singleTarget";
                break;
            case '彗星の槍':
                selectedCommandsCopy[props.index].type = "skill";
                selectedCommandsCopy[props.index].attackType="singleTarget";
                break;
        }

        props.setSelectedCommands(selectedCommandsCopy);

        if (e.name == "逃げる" || e.name == "大タル爆弾" || e.name == "ソウルドレイン" || e.name == "磁気嵐流") {
            setTargetSelectIsDisabled(true);
        }
        else {
            setTargetSelectIsDisabled(false);
        }
    }

    const targetHandleChange = (e) => {
        let selectedCommandsCopy = [...props.selectedCommands];
        selectedCommandsCopy[props.index].target = e?.label;
        props.setSelectedCommands(selectedCommandsCopy);
    }


    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            //ここでボックスの中身のスタイルをカスタマイズ
            borderBottom: "1px dotted pink",
            color: state.isSelected ? "red" : "blue",
            padding: 20,
        }),

        control: () => ({
            // none of react-select's styles are passed to <Control />
            //ここでボックス自体のスタイルをカスタマイズ
            width: 400,
            display: "flex",
        }),

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = "opacity 300ms";

            return { ...provided, opacity, transition };
        }
    }

    const createoption = () => {
        var commandName = props.selectedCommands[props.index]?.name;

        switch (commandName) {
            case '通常攻撃':
                return props.enemies;
            case '逃げる':
                return null;
            case 'Goodbye Sword':
                return props.enemies;
            case '大タル爆弾':
                return null;
            case '体力ポーション':
                return props.party;
            case '真影侵壊':
                return props.enemies;
            case 'ソウルドレイン':
                return null;
            case '磁気嵐流':
                return null;
            case '忍び寄る恐怖':
                return props.enemies;
            case '彗星の槍':
                return props.enemies;
        }
    }

    return (
        <div>
            <h3>{props.party[props.index].name}</h3>
            <Select
                options={props.party[props.index].getCommandNames()}
                onChange={handleChange}
                styles={customStyles} />
            <Select
                isDisabled={targetSelectIsDisabled}
                options={createoption()}
                onChange={targetHandleChange}
                styles={customStyles} />
        </div>
    );
}