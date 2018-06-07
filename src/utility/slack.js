import axios from 'axios';
import qs from 'qs';

export default async text => {
  const url = 'https://slack.com/api/chat.postMessage';
  const data = {
    token: process.env.SLACK_TOKEN,
    channel: process.env.SLACK_CHANNEL,
    username: 'レビュー数えるやーつ(仮)',
    text,
    icon_url:
      'https://1.bp.blogspot.com/-FBwaIZPLb8M/Vt_t3kk1T8I/AAAAAAAA4po/l_qAdAqVdOU/s800/counter.png',
  };

  return axios.post(url, qs.stringify(data));
};
