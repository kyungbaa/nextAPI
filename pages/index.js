import { useRef, useState } from 'react';

export default function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedbackItems, setFeedbackItems] = useState([]);

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

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  };
  return (
    <div className="flex items-center h-screen">
      <div className="flex flex-col items-center w-1/2">
        <form
          onSubmit={submitFormHandler}
          className="max-w-2xl px-8 pt-6 pb-8 mb-4 rounded shadow-md g-white"
        >
          <h1 className="block mb-5 text-lg font-bold text-gray-700">
            The home Page
          </h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Your Email Address
            </label>
            <input
              type="email"
              id="email"
              ref={emailInputRef}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="feedback"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              rows="6"
              ref={feedbackInputRef}
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <button className="w-full px-4 py-2 mb-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
            Send Feedback
          </button>
          <button
            onClick={loadFeedbackHandler}
            type="button"
            className="w-full px-4 py-2 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Load Feedback
          </button>
        </form>
        <hr />
      </div>
      <div className="w-1/2">
        <ul className="flex flex-col items-center w-full max-w-sm px-3">
          {feedbackItems.map((item) => (
            <li key={item.id} className="w-full">
              <div className="flex items-center justify-between px-6 pt-4 pb-4 mb-4 bg-white border border-gray-100 rounded shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <p className="text-sm font-bold text-gray-700 ">{item.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
