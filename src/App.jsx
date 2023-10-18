import React, { useState, useMemo } from "react";
import { PreviewSelectBox } from "./components/previewSelectBox";
import { DoublePreviewWeponSelectBox } from "./components/doublePreviewWeponSelectBox";
import { DoublePreviewItemSelectBox } from "./components/doublePreviewItemSelectBox";
import { PartyLabel } from "./components/partyLabel";
import { PartyCommandSelectBox } from "./components/partyCommandSelectBox";
import kaynImg from "./img/Kayn_0.jpg";
import hecarimImg from "./img/Hecarim_0.jpg";
import rellImg from "./img/Rell_0.jpg";
import kindredImg from "./img/Kindred_0.jpg";
import pantheonImg from "./img/Pantheon_0.jpg";
import kaynIcon from "./img/Kayn_0 (1).jpg";
import kaynMonoIcon from "./img/kaynmonoimg.jpg";
import hecarimIcon from "./img/Hecarim_0 (1).jpg";
import hecarimMonoIcon from "./img/hecarimmonoimg.jpg";
import rellIcon from "./img/rell.jpg";
import rellMonoIcon from "./img/relmonoimg.jpg";
import kindredIcon from "./img/kindred.jpg";
import kindredMonoIcon from "./img/kindredmonoimg.jpg";
import pantheonIcon from "./img/Pantheon_3.jpg";
import pantheonMonoIcon from "./img/pantheonmonoimg.jpg";
import bfImg from "./img/bf.jpg";
import chainvestImg from "./img/chain-vest-lol.jpg";
import jiantbeltImg from "./img/jiantbelt.jpg";
import redportionImg from "./img/redportion.jpg";
import otarubakudanImg from "./img/tarubakudan.jpg";
import sayonaranoturugiImg from "./img/sayonaranoturugi.jpg";
import matangoImg from "./img/matango.jpg";
import matangoIcon from "./img/matangoIcon.jpg";
import matangoMonoIcon from "./img/matangomonoimg.jpg";

export default function App() {

  const [party, setParty] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [selectedCommands, setSelectedCommands] = useState([]);

  class Command {
    constructor(name) {
      this.name = name;
      this.value = name;
      this.label = name;
    }
  }

  class Character {
    constructor(name, attack, hp, armor, skill, image, icon, monoIcon, explanation) {
      this.name = name;
      this.value = name;
      this.label = name;
      this.attack = attack;
      this.hp = hp;
      this.maxHp = hp;
      this.armor = armor;
      this.skill = skill;
      this.wepon = [];
      this.items = [];
      this.image = image;
      this.icon = icon;
      this.monoIcon = monoIcon;
      this.explanation = explanation;
      this.isDissapear = false;
    }

    equip(newWepon) {
      this.wepon = [...this.wepon, newWepon];
      this.attack += newWepon.bonusAttack;
      this.hp += newWepon.bonusHp;
      this.armor += newWepon.bonusArmor;
    }

    getItem(newItem) {
      this.items = [...this.items, newItem];
    }

    getCommandNames() {
      let commands = [];
      commands[0] = new Command("通常攻撃");
      commands[1] = new Command(this.skill);
      commands[2] = new Command("逃げる");

      if (this.items.filter(item => item.stock > 0).length != 0) {
        commands[3] = new Command(this.items[0].name);
      }

      return commands;
    }

    getDamage(damage) {
      if (this.isDissapear) {
        return this.name + "は既に消えている！";
      }

      const realDamage = damage - this.armor < 0 ? 0 : damage - this.armor;
      let texts = [];
      texts.push(this.name + "に" + realDamage + "のダメージ！");

      if (realDamage > 0) {
        this.hp = this.hp - realDamage;
      }

      if (this.hp <= 0) {
        this.hp = 0;
        texts.push(this.name + "は消えた！");
        this.isDissapear = true;
        this.icon = this.monoIcon;
      }

      return texts;
    }

    getHeal(heal) {
      if (this.hp == 0) {
        return ("既に消えてしまった" + this.name + "には効果がなかった！");
      }

      if (this.hp + heal > this.maxHp) {
        this.hp = this.maxHp;
        heal = this.maxHp - this.hp;
      }
      else {
        this.hp = this.hp + heal;
      }

      return (this.name + "の体力が" + heal + "回復した！");
    }

    useItem(usedItem, targetPartyMember, targetEnemy) {
      let texts = [];
      texts.push(this.name + "は【" + usedItem.name + "】を使用した！");
      texts.push(this.items.find(target => target.name == usedItem.name).use(targetPartyMember, targetEnemy));
      let itemListCopy=[...items];
      itemListCopy.find(item => item.name == usedItem.name).stock -= 1;
      this.items=itemListCopy.filter(item=>this.items.find(thisItem=>thisItem.name==item.namee)!=null);
      return texts;
    }
  }

  class Kayn extends Character {
    useSkill(targetPartyMember, targetEnemy) {
      let texts = [];
      texts.push(this.name + "の【" + this.skill + "】！");
      texts.push(targetEnemy.getDamage(Math.round(this.attack * 0.7)));
      texts.push(this.getHeal(Math.round(this.attack * 1.5)));
      return texts;
    }
  }

  class Hecarim extends Character {
    useSkill(targetPartyMember, targetEnemy) {
      let texts = [];
      texts.push(this.name + "の【" + this.skill + "】！");

      for (const enemy of targetEnemy) {
        texts.push(enemy.getDamage(Math.round(this.attack * 0.2)));
      }

      texts.push(this.getHeal(Math.round(this.attack * 2)));
      return texts;
    }
  }

  class Rel extends Character {
    useSkill(targetPartyMember, targetEnemy) {
      let texts = [];
      texts.push(this.name + "の【" + this.skill + "】！");

      for (const enemy of targetEnemy) {
        texts.push(enemy.getDamage(Math.round(this.attack * 0.6)));
      }

      return texts;
    }
  }

  class Kindred extends Character {
    useSkill(targetPartyMember, targetEnemy) {
      let texts = [];
      texts.push(this.name + "の【" + this.skill + "】！");

      let damage = this.attack * (0.7 + (targetEnemy.maxHp / (targetEnemy.hp * 10)));

      if (targetEnemy.hp / targetEnemy.maxHp <= 0.15) {
        damage = damage * 1.3;
      }

      texts.push(targetEnemy.getDamage(Math.round(damage)));
      return texts;
    }
  }

  class Pantheon extends Character {
    useSkill(targetPartyMember, targetEnemy) {
      let texts = [];
      texts.push(this.name + "の【" + this.skill + "】！");

      if (targetEnemy.hp / targetEnemy.maxHp <= 0.2) {
        texts.push(targetEnemy.getDamage(Math.round(this.attack * 1.5)));
        return texts;
      }

      texts.push(targetEnemy.getDamage(Math.round(this.attack)));
      return texts;
    }
  }

  class Wepon {
    constructor(name, bonusAttack, bonusHp, bonusArmor, image, explanation) {
      this.name = name;
      this.value = name;
      this.label = name;
      this.bonusAttack = bonusAttack;
      this.bonusHp = bonusHp;
      this.bonusArmor = bonusArmor;
      this.image = image;
      this.explanation = explanation;
    }
  }

  class Item {
    constructor(name, stock, image, explanation) {
      this.name = name;
      this.value = name;
      this.label = name + "(個数：" + stock + ")";
      this.stock = stock;
      this.image = image;
      this.explanation = explanation;
    }
  }

  class RedPortion extends Item {
    use(targetPartyMember, targetEnemy) {
      return targetPartyMember.getHeal(120);
    }
  }

  class LargeBarrelBomb extends Item {
    use(targetPartyMember, targetEnemy) {
      let texts = [];

      for (const member of targetPartyMember) {
        texts.push(member.getDamage(Math.round(80)));
      }

      for (const enemy of targetEnemy) {
        texts.push(enemy.getDamage(Math.round(80)));
      }

      return texts;
    }
  }

  class GoodbyeSword extends Item {
    use(targetPartyMember, targetEnemy) {
      return targetEnemy.getDamage(99999999);
    }
  }

  class Enemy {
    constructor(name, suffix, attack, hp, armor, image, icon, monoIcon, explanation) {
      this.name = name + suffix;
      this.value = name + suffix;
      this.label = name + suffix;
      this.attack = attack;
      this.hp = hp;
      this.maxHp = hp;
      this.armor = armor;
      this.wepon = [];
      this.items = [];
      this.image = image;
      this.icon = icon;
      this.monoIcon = monoIcon;
      this.explanation = explanation;
      this.isDissapear = false;
    }

    getDamage(damage) {
      if (this.isDissapear) {
        return this.name + "は既に消えている！";
      }

      const realDamage = damage - this.armor;
      let texts = [];
      texts.push(this.name + "に" + realDamage + "のダメージ！");

      if (realDamage > 0) {
        this.hp = this.hp - realDamage;
      }

      if (this.hp <= 0) {
        this.hp = 0;
        texts.push(this.name + "は消えた！");
        this.isDissapear = true;
        this.icon = this.monoIcon;
      }

      return texts;
    }
  }

  let characters = [];
  characters[0] = new Kayn("ケイン", 124, 2508, 114, "真影侵壊", kaynImg, kaynIcon, kaynMonoIcon, "恐るべき影の魔術の卓越した使い手であるシエダ・ケイン。彼は己の真の運命──いつの日か自分が「影の一団」を率い、アイオニアが覇権を握る新時代を拓く、という未来のために戦っている。彼が手にする、自我を持つダーキンの武器「ラースト」はケインの心身を着実に侵しつつあるが、気に留める様子はない。あり得る結末はただ二つ。ケインが強い意志で武器をねじ伏せるか、または邪悪な武器に完全に乗っ取られ、ルーンテラを滅亡の道へと誘う扉を開くかだ。");
  characters[1] = new Hecarim("へカリム", 120, 2308, 124, "ソウルドレイン", hecarimImg, hecarimIcon, hecarimMonoIcon, "生者の魂を永遠に狩るという呪いを受けたヘカリムは人間と獣が融合した亡霊だ。ブレスドアイルが影に飲まれた時、この誇り高き騎士は「破滅」の破壊的エネルギーに、騎士団と騎馬とともに消し去られてしまった。「黒き霧」がルーンテラに現れる時、彼は鎧をまとった蹄で敵を踏み砕き、虐殺に悦びを感じながら破滅的な突撃を指揮している。");
  characters[2] = new Rel("レル", 106, 2378, 107, "磁気嵐流", rellImg, rellIcon, rellMonoIcon, "黒薔薇団による残酷な実験の産物であるレルは、ノクサスの打倒を胸に誓った、反逆の生きた兵器である。レルの幼少期は、惨めで恐ろしいものだった。魔力を完成させ、兵器化するために、彼女は口にするのも憚られるような処置に耐えてきた──暴力的な逃亡を成し遂げ、自分を捕らえようとした者たちの多くを殺めてしまうまでは。犯罪者の烙印を押されたレルは、ノクサス兵を目にした瞬間に攻撃する。かつてのアカデミーの生存者を探す彼女は、従順な者たちを守りながら、かつての教師たちには無慈悲な死を与えている。");
  characters[3] = new Kindred("キンドレッド", 120, 2378, 108, "忍び寄る恐怖", kindredImg, kindredIcon, kindredMonoIcon, "別々の存在なれど、決して離れることはない──キンドレッドは死の本質を対で指し示す。子羊の放つ矢は、己の運命を受け入れた者を速やかにこの世から解放する。狼は死から逃れようとする者を追い詰め、強靭な顎で噛み砕き、惨たらしい最期を遂げさせる。キンドレッドの真髄についてはルーンテラ全域で諸説囁かれるが、いずれにせよ、生ける者は全て、死の本質を選ぶ必要に迫られる。");
  characters[4] = new Pantheon("パンテオン", 120, 2503, 124, "彗星の槍", pantheonImg, pantheonIcon, pantheonMonoIcon, "かつて不本意にも戦の神髄の器となったアトレウスは、天空から星々を切り離した一撃により自身に宿るその天の力を殺されながらも、屈することなく生き延びた。やがて彼は定命であるがゆえの力を、そしてその粘り強い不屈の精神を貴ぶようになった。今は亡き神髄の武器に不屈の意志を注ぎ、パンテオンの生まれ変わりとなったアトレウスは神的な存在に立ち向かう。");

  let wepons = [];
  wepons[0] = new Wepon("B. F. ソード", 40, 0, 0, bfImg, "その名前は、 Doomシリーズの武器「BFG 9000」に由来しており、 「Big F***ing Gun」の略です。結果として、BF BFソードは非公式に「Big F***ing Sword」。暴徒やプレイヤーたちは冗談めかして「BF」は「Best Friend」の略だと述べており、ある時点でギンスーは「BFF Sword」（Best Friend Forever）と名付けたアイテムを投稿した。[1]ビデオ「Welcome Aboard」では、オデッセイ ヤスオ オデッセイ・ヤスオは「ブライアン・フランシス・ソード」によって書かれた本を読んでいます。その著者の名前は、BF BFソード。ヴァルス・スウィフトボルト ヴァルス・スウィフトボルトには、BF BF ソードが矢筒に結び付けられています。");
  wepons[1] = new Wepon("チェインベスト", 0, 0, 40, chainvestImg, "Lv：13 カテゴリ：(防具) レシピ発想：「クーケンスウェット」レシピ変化（ネイチャークロス）、「ノーブルチュニック」レシピ変化（ネイチャークロス） 作成個数：1個 材料：ネイチャークロス、ロテスヴァッサ鉱水、(クロース)、(金属) 最大投入回数：4～12回 最小投入回数：2回 調合逆引き：- 属性値：火");
  wepons[2] = new Wepon("ジャイアントベルト", 0, 350, 0, jiantbeltImg, "「『なぜこのベルトをつける必要があるのか​​？』と自問しなければなりません。それからすぐに力ずくよりも知恵を天秤にかけ、後者の選択肢を選択してください。」 クインストン・ガーベイ、世界探検家。 ");

  let items = [];
  items[0] = new RedPortion("体力ポーション", 2, redportionImg, "ヘルスポーションは完全な健康状態では消費できません。複数のヘルス ポーションがすでに有効になっている場合でも、複数のヘルス ポーションを消費できます。これにより、前のポーションが完全に消費された後、 後続のヘルス ポーションが消費されます。キューにセットできるヘルスポーションの数に制限はありません。キューにセットされたこれらのヘルスポーションは、ユーザーが完全なヘルスであっても消費されます。")
  items[1] = new LargeBarrelBomb("大タル爆弾", 1, otarubakudanImg, "小タル爆弾、大タル爆弾はモンスターにダメージを与えることができます。大タル系の爆弾は、設置したあとに起爆する必要があります。また、爆弾は空中で投げることができ、大タル爆弾は下に向かって投げ、小タル爆弾は前方に向かって投げます。地面や物に当たると爆発するため、巻き込まれないように注意が必要です。小タル爆弾はを押しながら使用することで、設置をせず、照準の方向に投げつけることができます。");
  items[2] = new GoodbyeSword("Goodbye Sword", 1, sayonaranoturugiImg, "属性：冥　攻撃力：４");

  var enemies = useMemo(() => {
    let monsters = [];
    let suffixes = ["A", "B", "C"];

    for (let i = 0; i < (Math.floor(Math.random() * 3) + 1); i++) {
      monsters[i] = new Enemy("マタンゴ", suffixes[i], 1250, 800, 0, matangoImg, matangoIcon, matangoMonoIcon, "自分のスタンバイフェイズ毎に、コントローラーに３００ポイントダメージを与える。自分のエンドフェイズに５００ライフポイントを払えば、このカードのコントロールは相手に移る。")
    }

    return monsters;
  }, []);

  const arrayComparison = (characters, party) => {
    const duplication = characters.filter((character) =>
      party.find((partyMenber) => partyMenber.name === character.name)
    );

    const duplicationName = duplication.map((character) => {
      return character.name;
    });

    const expenseDiff = characters.filter((character) => {
      return !duplicationName.includes(character.name);
    });

    return expenseDiff;
  };

  const createMatangoView = () => {
    if (enemies.length == 1) {
      return (
        <p>
          <img src={enemies[0].image} alt="matangoImage" /><br />
          <h3>{enemies[0].name}があらわれた！</h3>
        </p>
      )
    }
    if (enemies.length == 2) {
      return (
        <p>
          <img src={enemies[0].image} alt="matangoImage" />
          <img src={enemies[1].image} alt="matangoImage" /><br />
          <h3>{enemies[0].name}があらわれた！</h3>
          <h3>{enemies[1].name}があらわれた！</h3>
        </p>
      )
    }
    if (enemies.length == 3) {
      return (
        <p>
          <img src={enemies[0].image} alt="matangoImage" />
          <img src={enemies[1].image} alt="matangoImage" />
          <img src={enemies[2].image} alt="matangoImage" /><br />
          <h3>{enemies[0].name}があらわれた！</h3>
          <h3>{enemies[1].name}があらわれた！</h3>
          <h3>{enemies[2].name}があらわれた！</h3>
        </p>
      )
    }
  }

  const fight = (index) => {
    let fightTexts = [];
    let partyCopy = [...party];

    const createFightText = () => {
      let value = [];

      for (let i = 0; i < fightTexts.length; i++) {
        value.push(
          <p>{fightTexts[i]}</p>
        );
      }

      return value;
    }

    var correctSelectedCommands = selectedCommands.slice(0, party.filter(member => member.hp > 0).length)

    for (const command of correctSelectedCommands) {
      var invoker = command.invoker;
      var targetName = command.target;

      switch (command.type) {
        case 'aa':
          fightTexts.push(invoker.name + "の通常攻撃！" + enemies.find(enemy => enemy.name == targetName).getDamage(invoker.attack));
          break;
        case 'skill':
          var enemyTarget = targetName == null ? enemies : enemies.find(enemy => enemy.name == targetName);
          fightTexts.push(invoker.useSkill(partyCopy, enemyTarget));
          break;
        case 'item':
          var usedItem = items.find(item => item.name == command.name);
          var partyTarget = targetName == null ? partyCopy : partyCopy.find(member => member.name == targetName);
          var enemyTarget = targetName == null ? enemies : enemies.find(enemy => enemy.name == targetName);
          fightTexts.push(invoker.useItem(usedItem, partyTarget, enemyTarget));
          break;
        case 'runaway':
          fightTexts.push(invoker.name + "は逃走を試みたが失敗した！");
          break;
      }
    }

    if (enemies.find(enemy => enemy.hp > 0) == null) {
      return (
        <div>
          {createFightText()}
          <button onClick={() => { setDisplayIndex(21); }}>結果発表</button>
        </div>
      )
    }

    for (const enemy of enemies) {
      if (enemy.hp <= 0) {
        continue;
      }

      const targetindex = Math.floor(Math.random() * (party.filter(member => member.hp > 0).length));

      if (party.filter(member => member.hp > 0).length == 0) {
        fightTexts.push(enemy.name + "は勝ち誇っている！");
        continue;
      }

      fightTexts.push(enemy.name + "の通常攻撃！" + party.find(member => member.name == party.filter(member => member.hp > 0)[targetindex].name).getDamage(enemy.attack));
    }

    if (party.find(member => member.hp > 0) == null) {
      return (
        <div>
          {createFightText()}
          <button onClick={() => { setDisplayIndex(22); }}>結果発表</button>
        </div>
      )
    }

    return (
      <div>
        {createFightText()}
        <button onClick={() => { setDisplayIndex(index + 1); }}>次のターン</button>
      </div>
    )
  }

  const createView = () => {
    if (displayIndex === 0) {
      return (
        <p>
          <h1>1人目のキャラクターを選択してください</h1>
          <PreviewSelectBox entities={characters} party={party} setParty={setParty} setDisplayIndex={setDisplayIndex} index='0' />
        </p>
      )
    };

    if (displayIndex === 1) {
      return (
        <p>
          <h1>2人目のキャラクターを選択してください</h1>
          <PreviewSelectBox entities={arrayComparison(characters, party)} party={party} setParty={setParty} setDisplayIndex={setDisplayIndex} index='1' />
        </p>
      )
    };

    if (displayIndex === 2) {
      return (
        <p>
          <h1>3人目のキャラクターを選択してください</h1>
          <PreviewSelectBox entities={arrayComparison(characters, party)} party={party} setParty={setParty} setDisplayIndex={setDisplayIndex} index='2' />
        </p>
      )
    };

    if (displayIndex === 3) {
      return (
        <p>
          <label>装備を選択してください</label>
          <DoublePreviewWeponSelectBox entities={wepons} party={party} setParty={setParty} setDisplayIndex={setDisplayIndex} index='3' />
        </p>
      )
    };

    if (displayIndex === 4) {
      return (
        <p>
          <label>アイテムを選択してください</label>
          <DoublePreviewItemSelectBox entities={items} party={party} setParty={setParty} setDisplayIndex={setDisplayIndex} index='4' />
        </p>
      )
    };

    if (displayIndex === 5) {
      return (
        <p>
          {createMatangoView()}
          <button onClick={() => { setDisplayIndex(6); }}>戦う</button>
        </p>
      )
    };

    if (displayIndex === 6) {

      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <PartyCommandSelectBox party={party} enemies={enemies} selectedCommands={selectedCommands} setSelectedCommands={setSelectedCommands} setDisplayIndex={setDisplayIndex} index='6' />
        </p>
      )
    };

    if (displayIndex === 7) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h2>１ターン目</h2>
          {fight(7)}
        </p>
      )
    };

    if (displayIndex === 8) {

      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <PartyCommandSelectBox party={party} enemies={enemies} selectedCommands={selectedCommands} setSelectedCommands={setSelectedCommands} setDisplayIndex={setDisplayIndex} index='8' />
        </p>
      )
    };

    if (displayIndex === 9) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h2>2ターン目</h2>
          {fight(9)}
        </p>
      )
    };

    if (displayIndex === 10) {

      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <PartyCommandSelectBox party={party} enemies={enemies} selectedCommands={selectedCommands} setSelectedCommands={setSelectedCommands} setDisplayIndex={setDisplayIndex} index='10' />
        </p>
      )
    };

    if (displayIndex === 11) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h2>3ターン目</h2>
          {fight(11)}
        </p>
      )
    };

    if (displayIndex === 12) {

      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <PartyCommandSelectBox party={party} enemies={enemies} selectedCommands={selectedCommands} setSelectedCommands={setSelectedCommands} setDisplayIndex={setDisplayIndex} index='12' />
        </p>
      )
    };

    if (displayIndex === 13) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h2>4ターン目</h2>
          {fight(13)}
        </p>
      )
    };

    if (displayIndex === 14) {

      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <PartyCommandSelectBox party={party} enemies={enemies} selectedCommands={selectedCommands} setSelectedCommands={setSelectedCommands} setDisplayIndex={setDisplayIndex} index='14' />
        </p>
      )
    };

    if (displayIndex === 15) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h2>5ターン目</h2>
          {fight(15)}
        </p>
      )
    };

    if (displayIndex === 16) {

      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <PartyCommandSelectBox party={party} enemies={enemies} selectedCommands={selectedCommands} setSelectedCommands={setSelectedCommands} setDisplayIndex={setDisplayIndex} index='16' />
        </p>
      )
    };

    if (displayIndex === 17) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h2>6ターン目</h2>
          {fight(17)}
        </p>
      )
    };

    if (displayIndex === 18) {

      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <PartyCommandSelectBox party={party} enemies={enemies} selectedCommands={selectedCommands} setSelectedCommands={setSelectedCommands} setDisplayIndex={setDisplayIndex} index='18' />
        </p>
      )
    };

    if (displayIndex === 19) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h2>最終ターン</h2>
          {fight(19)}
        </p>
      )
    };

    if (displayIndex === 20) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h1>そこまで！この勝負は引き分けとする！</h1>
        </p>
      )
    };

    if (displayIndex === 21) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h1>VICTORY</h1>
        </p>
      )
    };

    if (displayIndex === 22) {
      return (
        <p>
          <PartyLabel party={enemies} /><hr />
          <h1>DEFEAT</h1>
        </p>
      )
    };
  };

  return (
    <div className="App">
      <PartyLabel party={party} /><hr />
      {createView()}
    </div>
  )
}