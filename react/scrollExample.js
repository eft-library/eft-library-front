import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

function ScrollToMiddleButton() {
  useEffect(() => {
    // 페이지가 로드될 때 중간으로 스크롤
    scrollToMiddle();
  }, []);

  const scrollToMiddle = () => {
    // 페이지 내의 특정 요소의 ID를 이용하여 중간으로 스크롤
    const targetElement = document.getElementById('middleSection');
    if (targetElement) {
      scroll.scrollTo(targetElement.offsetTop, {
        duration: 500,
        smooth: true,
      });
    }
  };

  return (
    <div>
      {/* 다른 페이지로 이동하는 링크 */}
      <Link to="/other-page">다른 페이지로 이동</Link>
      {/* 페이지 내용 */}
      <div style={{ height: '2000px' }}>
        {/* 중간으로 스크롤될 요소 */}
        <div id="middleSection">
          <p>페이지 중간으로 스크롤될 위치입니다.</p>
        </div>
        <p>페이지 내용</p>
      </div>
    </div>
  );
}

export default ScrollToMiddleButton;
