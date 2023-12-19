import { useEffect, useState, useRef } from "react";
import { useSprings, useSpring, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { useDrag } from "react-use-gesture";
// import { useParams } from "react-router-dom";
import clamp from "lodash/clamp";
import styles from "./Photobook.module.scss";
// import memoIcon from "../../img/icon-memo.png";
import shareIcon from "../../img/icon-share.png";
import navBottom from "../../img/nav-bottom.png";
import memoModal from "../../img/memo-modal.png";
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
  {/* 포토북 UI 시작 */}
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
  {/* 포토북 UI 마침 */}

  const axios = useAxios();
  const [modal, setModal] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [uuid, setUuid] = useState(null);
  const [isEmojiBoxVisible, setIsEmojiBoxVisible] = useState(false);
  // const { uuid } = useParams();
  const [memos, setMemos] = useState([]); // 메모 리스트 Dto배열 저장
  const [modalMemoContent, setModalMemoContent] = useState(""); // 선택한 메모 content 저장
  const [modalMemoVisible, setModalMemoVisible] = useState(false); // 모달 창 오픈 시 메모 컨텐츠 보여줄지 말지 상태 저장

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
        setMemos(response.data.memoList);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleMemosClick = (memoIndex) => {
    const modalContent = memos[memoIndex].content;
    setModalMemoContent(modalContent);
    setModal(1);
    setModalMemoVisible(true);
  };

  const selectEmoji = (i) => {
    // 선택한 emoji 정보를 저장
    setSelectedEmoji(i);
    // 이미지 선택 시 포토인덱스 저장
    setSelectedPhotoIndex(index.current);
  };

  // 이모지 박스 애니메이션 스타일 설정
  const emojiBoxSpring = useSpring({
    opacity: isEmojiBoxVisible ? 1 : 0,
    transform: `translateY(${isEmojiBoxVisible ? 0 : 100}%)`,
    config: { tension: 200, friction: 20, mass: 1, duration: 100 },
  });

  // 메모픽 위치 상태 추가
  const [memopicPosition, setMemopicPosition] = useState({
    top: Math.floor(Math.random() * 365) - 10,
    left: Math.floor(Math.random() * 250) - 10,
  });

  const handleMemopicClick = () => {
    setModal(1);
    setMemopicPosition({
      top: memopicPosition.top,
      left: memopicPosition.left,
    });    
    setIsEmojiBoxVisible(false);
  };

  // 이모지 박스에서의 클릭 이벤트 핸들러
  const handleEmojiClick = (index) => {
    // 선택한 emoji 정보를 저장
    selectEmoji(index);

    // 새로운 랜덤 위치를 생성하고 설정
    setMemopicPosition({
      top: Math.floor(Math.random() * 365) - 10,
      left: Math.floor(Math.random() * 250) - 10,
    });
  };
  const shareLink = () => {
    // 현재 경로에 uuid를 붙여서 공유할 링크 생성
    const shareableLink = `${window.location.href}/${uuid}`;

    
    // 클립보드에 복사
    const copyToClipboard = (text) => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(
          () => {
            alert("링크가 클립보드에 복사되었습니다.");
          },
          (err) => {
            console.error("링크 복사 중 오류 발생:", err);
            alert("링크 복사 중 오류 발생");
          }
        );
      } else {
        // Navigator clipboard API가 지원되지 않는 경우 대체 방법 사용
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // 임시로 고정 위치에 텍스트 영역 생성
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
          alert("링크가 클립보드에 복사되었습니다.");
        } catch (err) {
          console.error("링크 복사 중 오류 발생:", err);
          alert("링크 복사 중 오류 발생");
        } finally {
          document.body.removeChild(textArea); // 생성한 텍스트 영역 제거
        }
      }
    };

    copyToClipboard(shareableLink);
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

  // 메모 저장
  const [memoText, setMemoText] = useState(""); // 메모 작성한 내용 저장

  const saveMemo = async (uuid) => {
    const apiURL = `http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/memo/${uuid}`
    const saveMemoDto = {
      "x": memopicPosition.left,
      "y": memopicPosition.top,
      "pageNum": selectedPhotoIndex,
      "content": memoText,
      "emojiNum": selectedEmoji
    };
    console.log(saveMemoDto);
    try {
      // 서버에 메모 저장 요청
      const response = await axios.post(apiURL, saveMemoDto);
  
      // 응답이 200이면 성공
      if (response.status === 200) {
        alert("메모가 성공적으로 저장되었습니다.");
      } else {
        // 다른 상태 코드가 반환된 경우
        alert("메모 저장에 실패했습니다.");
      }
    } catch (error) {
      // 오류가 발생한 경우 (401 등)
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

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
              {memos.map((memo, memoIndex) => {
                if (memo.pageNum === i) {
                  // Check if there is a memo for the current photo
                  return (
                    <animated.img
                      key={memoIndex}
                      className={styles.memopic}
                      src={`${memopicArray[memo.emojiNum]}`}
                      style={{
                        scale,
                        position: "absolute",
                        top: `${memo.y}px`,
                        left: `${memo.x}px`,
                      }}
                      onClick={() => handleMemosClick(memoIndex)}
                    />
                  );
                } else {
                  return null; // No memo for the current photo
                }
              })}
              {selectedEmoji !== null && selectedPhotoIndex === i && (
                <animated.img
                  className={styles.memopic}
                  src={`${memopicArray[selectedEmoji]}`}
                  style={{
                    scale,
                    position: "absolute",
                    top: `${memopicPosition.top}px`, // 클릭 시의 위치를 고정
                    left: `${memopicPosition.left}px`, // 클릭 시의 위치를 고정
                  }}
                  onClick={handleMemopicClick}
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
      <div className={styles.navBottom}></div>
      {/* 모달 */}
      <div className={styles[`modal${modal}`]}>
        <img className={styles.memoModal} src={memoModal} alt={memoModal} />
        <div className={styles.modalBox}>
          {modalMemoVisible === true && (
            <div className={styles.modalMemo}>
              {modalMemoContent}
            </div>
          )}
          {modalMemoVisible !== true && (
            <>
              <textarea
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
              />
              <button
                className={styles.saveBtn}
                onClick={() => {
                  saveMemo(uuid);
                  setModal(0);
                }}
              >
                저장
              </button>
            </>
          )}
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
                handleEmojiClick(index);
              }}
            />
          ))}
        </animated.div>
      )}
    </div>
  );
}

