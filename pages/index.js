import { useRef } from 'react';

export default function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enterdFeedback = feedbackInputRef.current.value;

    if (!enteredEmail || !enterdFeedback) {
      return alert('Please check your Email or Feedback🥹');
    }

    const reqBody = {
      email: enteredEmail,
      text: enterdFeedback,
    };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <h1>The home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="6" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
    </>
  );
}
