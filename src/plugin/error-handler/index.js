import { message } from 'ant-design-vue';

export default function errorHandler(messageText, error) {
  if (!error || !error.response) {
    message.error({
      content: messageText,
    });
  } else {
    const { response } = error;
    const { data } = response;
    message.error({
      content: `服务错误 ${data.message}`,
    });
  }
}
