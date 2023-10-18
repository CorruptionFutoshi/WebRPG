import Select from 'react-select'
import React, { useState } from 'react';

export const PreviewSelectBox = (props) => {
    const [selectedEntity, setSelectedEntity] = useState();

    const handleChange = (e) => {
        setSelectedEntity(e);
    }

    const onClickConfirmButton = () => {
        if (selectedEntity != null) {
            props.setParty([...props.party, selectedEntity]);
            props.setDisplayIndex(parseInt(props.index)+1);
            setSelectedEntity();
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
                onChange={handleChange}
                styles={customStyles} />
            <img src={selectedEntity?.image} alt={selectedEntity?.value} /><br />
            <label >【紹介】</label><br />
            <label >{selectedEntity?.explanation}</label><br /><br />
            <label >攻撃力：{selectedEntity?.attack}　体力：{selectedEntity?.hp}　防御力：{selectedEntity?.armor}</label><br />
            <button onClick={onClickConfirmButton}　>確定</button>
        </div>
    );
};