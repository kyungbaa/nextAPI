import { buildFeedbackPath, extractFeedback } from '../api/feedback';

export default function FeedbackPage(props) {
  const feedbackItems = props.feedbackItems;
  return (
    <div className="w-1/2">
      <ul className="flex flex-col items-center w-full max-w-sm px-3">
        {feedbackItems.map((item) => (
          <li key={item.id} className="w-full">
            <div className="block px-4 pt-4 pb-4 mb-4 bg-white border border-gray-100 rounded shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <p>{`"${item.text}"`}</p>
              <p className="block text-sm font-bold text-gray-700">
                {item.email}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
