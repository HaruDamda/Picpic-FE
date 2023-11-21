import { useState } from "react";
import styles from "./Photobook.module.scss";
import memoIcon from "../../img/icon-memo.png";
import shareIcon from "../../img/icon-share.png";
import photo9 from "../../img/photo9.png";
import navBottom from "../../img/nav-bottom.png";
import memoModal from "../../img/memo-modal.png";
import home from "../../img/home.png";
import emoji1 from "../../img/emoji1.png";
import emoji2 from "../../img/emoji2.png";
import emoji3 from "../../img/emoji3.png";
import emoji4 from "../../img/emoji4.png";
import emoji5 from "../../img/emoji5.png";
import emoji01 from "../../img/emoji-1.png";
import emoji02 from "../../img/emoji-2.png";
import emoji03 from "../../img/emoji-3.png";
import emoji04 from "../../img/emoji-4.png";
import emoji05 from "../../img/emoji-5.png";
import memopic1 from "../../img/memopic1.png";
import memopic2 from "../../img/memopic2.png";
import memopic3 from "../../img/memopic3.png";
import memopic4 from "../../img/memopic4.png";
import memopic5 from "../../img/memopic5.png";
import { Link } from "react-router-dom";

export default function Photobook() {
  const [modal, setModal] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojiArray = [emoji1, emoji2, emoji3, emoji4, emoji5];

  const emojiArray2 = [emoji01, emoji02, emoji03, emoji04, emoji05];

  const selectEmoji = (index) => {
    // 이미 선택된 emoji가 있다면 선택 취소
    if (selectedEmoji === index) {
      setSelectedEmoji(null);
    } else {
      // 선택된 emoji가 없거나 다른 emoji를 선택한 경우 크기 조절
      setSelectedEmoji(index);
    }
  };

  const saveMemo = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.section1}>
        <Link to="/">
          <button>
            <img src={home} alt="home" />
          </button>
        </Link>
        <p>
          &#39;이름&#39;님의 소중한 추억들입니다
          <br />
          스티커와 쪽지를 선물해 주세요~
        </p>
      </div>
      <div className={styles.section2}>
        <img src={photo9} alt={photo9} />
      </div>
      <div className={styles.section3}>
        <div className={styles.buttonBox}>
          <button>
            <img className={styles.shareIcon} src={shareIcon} alt={shareIcon} />
          </button>
          <p>링크 공유하기</p>
        </div>
        <div className={styles.buttonBox}>
          <button onClick={() => setModal(1)}>
            <img className={styles.memoIcon} src={memoIcon} alt={memoIcon} />
          </button>
          <p>쪽지 입력하기</p>
        </div>
      </div>
      <div className={styles.navBottom}>
        <img src={navBottom} alt={navBottom} />
      </div>
      {/* 모달 */}
      <div className={styles[`modal${modal}`]}>
        <img className={styles.memoModal} src={memoModal} alt={memoModal} />
        <div className={styles.modalBox}>
          <div className={styles.emojiBox}>
            {emojiArray.map((emoji, index) => (
              <img
                key={index}
                className={`${styles.emoji} ${
                  selectedEmoji === index ? styles.selectedEmoji : ""
                }`}
                src={selectedEmoji === index ? emojiArray2[index] : emoji}
                width={selectedEmoji === index ? 50 : 40}
                height={selectedEmoji === index ? 50 : 40}
                alt={`emoji-${index}`}
                onClick={() => selectEmoji(index)}
              />
            ))}
          </div>
          <textarea></textarea>
          <button
            className={styles.saveBtn}
            onClick={() => {
              saveMemo();
            }}
          >
            확인
          </button>
        </div>
      </div>
      <div
        className={styles[`modalBG${modal}`]}
        onClick={() => setModal(0)}
      ></div>
    </div>
  );
}
