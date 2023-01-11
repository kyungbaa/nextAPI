import { useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();
  const feedbackItems = props.feedbackItems;

  const loadFeedbackHandler = (id) => {
    // /api/some-feedback-id
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  };

  return (
    <ul className="w-full max-w-sm px-3 ">
      {feedbackItems.map((item) => (
        <li key={item.id} className="w-full ">
          <div className="flex items-center justify-between px-4 pt-4 pb-4 mb-4 bg-white border border-gray-100 rounded shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            {feedbackData && (
              <p className="block text-sm font-bold text-gray-700">
                {item.email}
              </p>
            )}

            <p className="block text-sm font-bold text-gray-700">{item.text}</p>
            <button
              onClick={loadFeedbackHandler.bind(null, item.id)}
              type="button"
              className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Show Details
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  // getStaticProps에서 API 라우트
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
