// 넥제는 이함수를 실행해서 api/feedback으로 들어오는 요청을 처리함
// HTML코드를 반환하지 않아도 된다.
// 대신 우리가 정한 서버측 코드를 실행할 수 있다. -> 여기에 추가된 코드는 클라이어트 측에는 도달하지 않으므로 웹페이지 방문자에게 보이지 않는다.

import fs from 'fs';
// 파일시스템 모듈 파일 입출력 처리할 때 사용
// fs 모듈에서 제공하는 비동기 메서드는 미지막 인자로 콜백(callback) 함수를 받고 아무 값도 반환히지 않습니다.
// 반면에 fs 모듈에서 제공하는 동기 메서드는 결과값을 반환(return)하며 예외(exception)를 일으킬 수 있습니다. 동기 메서드의 이름은 Sync로 끝이 나기 때문에 쉽게 비동기 메서드인지 동기 메서드인지 구분이 가능합니다.
// 서버에서만 사용되며 node.js로 실행

import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json'); // 해당폴더에 절대 경로 생성
};

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
};

const handler = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      // id: new Date().toISOString,
      id: uuidv4(),
      email,
      text: feedbackText,
    };

    // store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Succecss!', feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
};
export default handler;
