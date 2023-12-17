import { useEffect, useState, useRef } from "react";
import { useSprings, useSpring, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { useDrag } from "react-use-gesture";
import clamp from "lodash/clamp";
import styles from "./Photobook.module.scss";
// import memoIcon from "../../img/icon-memo.png";
import shareIcon from "../../img/icon-share.png";
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
import useAxios from "../../apis/axiosWithToken";

export default function Photobook() {
  {
    /* 포토북 UI 시작 */
  }
  const index = useRef(0);
  const [ref, { width }] = useMeasure();
  const [photos, setPhotos] = useState([]);
  const [activeDot, setActiveDot] = useState(0);
  const [props, api] = useSprings(
    photos.length,
    (i) => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: "block",
    }),
    [width]
  );
  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (active && distance > width / 2) {
        setActiveDot(null);
        index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          photos.length - 1
        );
        cancel();
      }
      api.start((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * width + (active ? mx : 0);
        const scale = active ? 1 - distance / width / 2 : 1;
        return { x, scale, display: "block" };
      });

      // 스크롤에 따른 활성화를 유지
      // setActiveDot(clamp(Math.round(index.current), 0, photos.length - 1));
      // 클릭한 동그라미가 있다면 스크롤로 인한 활성화를 무시하고 클릭한 동그라미를 유지
      const activeDotIndex = clamp(
        Math.round(index.current),
        0,
        photos.length - 1
      );
      setActiveDot(activeDotIndex);
      // console.log("스크롤 점 인덱스: ", activeDotIndex);
    }
  );
  // 동그라미를 클릭했을 때 해당 사진으로 이동하는 함수
  const handleDotClick = (dotIndex) => {
    index.current = dotIndex;
    api.start((i) => {
      if (i < index.current - 1 || i > index.current + 1)
        return { display: "none" };
      const x = (i - index.current) * width;
      return { x, scale: 1, display: "block" };
    });
    setActiveDot(null); // 클릭한 동그라미를 활성화 상태로 설정
  };
  {
    /* 포토북 UI 마침 */
  }

  const axios = useAxios();
  const [modal, setModal] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [uuid, setUuid] = useState(null);
  const [isEmojiBoxVisible, setIsEmojiBoxVisible] = useState(false);

  const emojiArray = [emoji1, emoji2, emoji3, emoji4, emoji5];
  const emojiArray2 = [emoji01, emoji02, emoji03, emoji04, emoji05];
  const memopicArray = [memopic1, memopic2, memopic3, memopic4, memopic5];

  useEffect(() => {
    axios
      .get("/photoBook") // 인스턴스로 axios 요청 보내기
      .then((response) => {
        console.log(response.data);
        setPhotos(response.data.photoList);
        setUuid(response.data.uuid);
      })
      .catch((error) => console.error(error));
  });

  const selectEmoji = (index) => {
    setSelectedEmoji(index);
    // // 이미 선택된 emoji가 있다면 선택 취소
    // if (selectedEmoji !== null && selectedEmoji === index) {
    //   // 이미 선택된 경우에는 아무 동작도 하지 않음
    //   return;
    // } else {
    //   // 선택된 emoji가 없거나 다른 emoji를 선택한 경우 크기 조절
    //   setSelectedEmoji(index);
    // }
  };

  // const toggleEmojiBox = () => {
  //   setIsEmojiBoxVisible(!isEmojiBoxVisible);
  // };

  // 이모지 박스 애니메이션 스타일 설정
  const emojiBoxSpring = useSpring({
    opacity: isEmojiBoxVisible ? 1 : 0,
    transform: `translateY(${isEmojiBoxVisible ? 0 : 100}%)`,
    config: { tension: 200, friction: 20, mass: 1, duration: 100 },
  });

  const shareLink = () => {
    // 현재 경로에 uuid를 붙여서 공유할 링크 생성
    const shareableLink = `${window.location.href}/${uuid}`;

    // 클립보드에 복사
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        console.log("링크가 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("링크 복사 중 오류 발생:", err);
      });
    console.log("링크:", `${window.location.href}/${uuid}`);
    // // 현재 주소에 uuid 파라미터 추가
    // const currentUrl = new URL(window.location.href);
    // currentUrl.searchParams.set('uuid', 'YOUR_UUID'); // 여기에 받아온 uuid 변수를 넣어주세요
    // navigator.clipboard.writeText(currentUrl.href)
    //   .then(() => {
    //     alert('링크가 복사되었습니다.');
    //   })
    //   .catch((error) => {
    //     console.error('링크 복사 중 오류 발생:', error);
    //   });
  };

  const saveMemo = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.section1}>
        <p>
          &#39;이름&#39;님의 소중한 추억들입니다
          <br />
          스티커와 쪽지를 선물해 주세요~
        </p>
      </div>
      <div className={styles.section2}>
        <div ref={ref} className={styles.photosWrapper}>
          {props.map(({ x, display, scale }, i) => (
            <animated.div
              className={styles.photos}
              {...bind()}
              key={i}
              style={{ display, x }}
            >
              <animated.div
                className={styles.photo}
                style={{ scale, backgroundImage: `url(${photos[i]})` }}
              />
              {selectedEmoji !== null && (
                <animated.img
                  className={styles.memopic}
                  src={`${memopicArray[selectedEmoji]}`}
                  style={{ scale, top: 186, left: 114, position: "absolute" }}
                  onClick={() => setModal(1)}
                />
              )}
            </animated.div>
          ))}
          <div className={styles.dotsWrapper}>
            {/* 사진 갯수만큼 동그라미 렌더링 */}
            {photos.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={`${styles.dot} ${
                  dotIndex === activeDot ? styles.activeDot : ""
                }`}
                onClick={() => handleDotClick(dotIndex)}
              />
            ))}
          </div>
        </div>
        {/* <Viewpager /> */}
      </div>
      <div className={styles.section3}>
        <div className={styles.buttonBox}>
          <button onClick={shareLink}>
            <img className={styles.shareIcon} src={shareIcon} alt={shareIcon} />
          </button>
          <p>링크 공유하기</p>
        </div>
        {/* <div className={styles.buttonBox}>
          <button onClick={toggleEmojiBox}>
            <img className={styles.memoIcon} src={memoIcon} alt={memoIcon} />
          </button>
          <p>쪽지 입력하기</p>
        </div> */}
      </div>
      <div className={styles.navBottom}>
        <img src={navBottom} alt={navBottom} />
      </div>
      {/* 모달 */}
      <div className={styles[`modal${modal}`]}>
        <img className={styles.memoModal} src={memoModal} alt={memoModal} />
        <div className={styles.modalBox}>
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
      {/* 이모지 박스 */}
      {isEmojiBoxVisible && (
        <animated.div className={styles.emojiBox} style={emojiBoxSpring}>
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
              onClick={() => {
                selectEmoji(index);
              }}
            />
          ))}
        </animated.div>
      )}
    </div>
  );
}
