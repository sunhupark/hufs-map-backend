import { Link } from "react-router-dom";

function ContactPage() {
  return (
    <div className="simple-page">
      <div className="simple-box large">
        <h1>문의하기</h1>
        <p>서비스 이용 중 불편사항이나 문의 내용을 남겨주세요.</p>

        <form className="contact-form">
          <input type="text" placeholder="이름 또는 닉네임" />
          <input type="email" placeholder="답변 받을 이메일" />
          <input type="text" placeholder="문의 제목" />
          <textarea placeholder="문의 내용을 입력해주세요." />

          <button type="button" className="auth-button">
            문의 보내기
          </button>
        </form>

        <p className="contact-note">
          현재 문의 기능은 화면 구성 단계이며, 추후 Appwrite Database 또는 이메일
          전송 기능과 연동할 예정입니다.
        </p>

        <Link to="/" className="back-link">
          랜딩페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default ContactPage;