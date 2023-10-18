import Select from 'react-select'
import React, { useState } from 'react';

export const DoublePreviewItemSelectBox = (props) => {
    const [selectedEntity, setSelectedEntity] = useState();
    const [targetSelectIsDisabled, setTargetSelectIsDisabled] = useState(true);
    const [selectedCharacter, setSelectedCharacter] = useState();

    const entityHandleChange = (e) => {
        setSelectedEntity(e);
        setTargetSelectIsDisabled(false);
    }

    const characterHandleChange = (e) => {
        setSelectedCharacter(e);
    }

    const onClickConfirmButton = () => {
        if (selectedEntity != null && selectedCharacter != null) {
            const partyCopy = [...props.party];
            const newParty = [];
            selectedCharacter.getItem(selectedEntity);

            for (const member of partyCopy) {
                if (member.name === selectedCharacter.name) {
                    newParty[partyCopy.indexOf(member)] = selectedCharacter;
                    continue;
                }

                newParty[partyCopy.indexOf(member)] = member;
            }

            props.setParty(newParty);
            props.setDisplayIndex(parseInt(props.index) + 1);
            setSelectedEntity();
            setTargetSelectIsDisabled(true);
            setSelectedCharacter();
        }
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

    return (
        <div>
            <Select
                options={props.entities}
                onChange={entityHandleChange}
                styles={customStyles} />
            <img src={selectedEntity?.image} alt={selectedEntity?.value} /><br />
            <label >【紹介】</label><br />
            <label >{selectedEntity?.explanation}</label><br /><br />
            <label isDisabled={targetSelectIsDisabled}>アイテムを所持させるキャラクターを選択してください</label><br />
            <Select
                isDisabled={targetSelectIsDisabled}
                options={props.party}
                onChange={characterHandleChange}
                styles={customStyles} />
            <button isDisabled={targetSelectIsDisabled} onClick={onClickConfirmButton}　>確定</button>
        </div>
    );
};