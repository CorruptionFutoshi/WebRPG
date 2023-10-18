export const PartyLabel = (props) => {
    if (props.party.length === 0) {
        return (
            <div></div>
        );
    }

    if (props.party.length === 1) {
        return (
            <div>
                <img src={props.party[0].icon} alt={props.party[0].value} /><br />
                【{props.party[0].name}】攻撃力：{props.party[0].attack}　体力：{props.party[0].hp}/{props.party[0].maxHp}　防御力：{props.party[0].armor} 　装備：{props.party[0].wepon.length === 1 ? props.party[0].wepon[0].name : 0} 　所持アイテム：{props.party[0].items.length === 1 ? props.party[0].items[0].label : 0}<br />
            </div>
        );
    }

    if (props.party.length === 2) {
        return (
            <div>
                <img src={props.party[0].icon} alt={props.party[0].value} />
                <img src={props.party[1].icon} alt={props.party[1].value} /><br />
                【{props.party[0].name}】攻撃力：{props.party[0].attack}　体力：{props.party[0].hp}/{props.party[0].maxHp}　防御力：{props.party[0].armor} 　装備：{props.party[0].wepon.length === 1 ? props.party[0].wepon[0].name : 0} 　所持アイテム：{props.party[0].items.length === 1 ? props.party[0].items[0].label : 0}<br />
                【{props.party[1].name}】攻撃力：{props.party[1].attack}　体力：{props.party[1].hp}/{props.party[1].maxHp}　防御力：{props.party[1].armor} 　装備：{props.party[1].wepon.length === 1 ? props.party[1].wepon[0].name : 0} 　所持アイテム：{props.party[1].items.length === 1 ? props.party[1].items[0].label : 0}<br />
            </div>
        );
    }

    if (props.party.length === 3) {
        return (
            <div>
                <img src={props.party[0].icon} alt={props.party[0].value} />
                <img src={props.party[1].icon} alt={props.party[1].value} />
                <img src={props.party[2].icon} alt={props.party[2].value} /><br />
                【{props.party[0].name}】攻撃力：{props.party[0].attack}　体力：{props.party[0].hp}/{props.party[0].maxHp}　防御力：{props.party[0].armor} 　装備：{props.party[0].wepon.length === 1 ? props.party[0].wepon[0].name : 0} 　所持アイテム：{props.party[0].items.length === 1 ? props.party[0].items[0].label : 0}<br />
                【{props.party[1].name}】攻撃力：{props.party[1].attack}　体力：{props.party[1].hp}/{props.party[1].maxHp}　防御力：{props.party[1].armor} 　装備：{props.party[1].wepon.length === 1 ? props.party[1].wepon[0].name : 0} 　所持アイテム：{props.party[1].items.length === 1 ? props.party[1].items[0].label : 0}<br />
                【{props.party[2].name}】攻撃力：{props.party[2].attack}　体力：{props.party[2].hp}/{props.party[2].maxHp}　防御力：{props.party[2].armor} 　装備：{props.party[2].wepon.length === 1 ? props.party[2].wepon[0].name : 0} 　所持アイテム：{props.party[2].items.length === 1 ? props.party[2].items[0].label : 0}<br />
                <br />
            </div>
        );
    }
}