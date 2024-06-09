import Grid from '@mui/material/Grid';
import brainIcon from '../../assets/icons/challenges/brain.png';
import correctWordIcon from '../../assets/icons/challenges/correct-word.png';
import grammarlyIcon from '../../assets/icons/challenges/grammarly.png';
import jigsawIcon from '../../assets/icons/challenges/jigsaw.png';
import millionaireIcon from '../../assets/icons/challenges/millionaire.png';
import wordMatchingIcon from '../../assets/icons/challenges/word-match.png';
import FeatureBox from '../../components/FeatureBox';
import { ROUTES } from '../../constants';
import useScrollTop from '../../hooks/useScrollTop';
import useTitle from '../../hooks/useTitle';
import React from 'react';

const { CHALLENGES } = ROUTES;

const CHALLENGES_LIST = [
  {
    title: 'Hãy chọn từ đúng',
    subTitle:
      'Ôn tập từ vựng bằng cách chọn 1 đáp án đúng nhất trong 4 câu trả lời có nghĩa khớp với từ được cho.',
    imgUrl: correctWordIcon,
    to: CHALLENGES.CORRECT_WORD,
  },
  {
    title: 'Ghép từ',
    subTitle:
      'Ghép các ký tự đã cho thành một chữ có nghĩa đúng với từ đã cho.',
    imgUrl: wordMatchingIcon,
    to: CHALLENGES.WORD_MATCHING,
  },
  {
    title: 'Tay nhanh hơn não',
    subTitle:
      'Chọn một hình ảnh đúng với từ đã cho trong thời gian nhanh nhất nhé.',
    imgUrl: brainIcon,
    to: CHALLENGES.FAST_WORD,
  },
  
  {
    title: 'Điền vào chỗ trống',
    subTitle:
      'Luyện tập ngữ pháp với câu trắc nghiệm điền vào chỗ trống sao cho phù hợp nhé.',
    imgUrl: grammarlyIcon,
    to: CHALLENGES.SENTENCE_MATCHING,
  },
  {
    title: 'Nối từ',
    subTitle:
      'Cùng bắt trend nối từ đã từ rầm rộ trên mạng xã hội với Luckclover nhé. Đặc biệt, bạn có thể chơi cùng bạn bè nhé 😮',
    imgUrl: jigsawIcon,
    to: CHALLENGES.JIGSAW,
  },
  /*  {
    title: 'Ai là triệu phú',
    subTitle:
      'Trải nghiệm show truyền hình "Ai là triệu phú" phiên bản tiếng Anh ngay với Luckclover English',
    imgUrl: millionaireIcon,
    to: CHALLENGES.MILLIONAIRE,
  },
  /*   {
    title: 'VIP',
    subTitle:
      'Tận hưởng một cực kỳ tuyệt vời của Luckclover nhé, nâng cấp tài khoản VIP để chơi.',
    imgUrl: vipIcon,
    to: CHALLENGES.VIP,
  }, */
];

function ChallengesPage() {
  useTitle('Challenges');
  useScrollTop();

  return (
    <div className="container my-10">
      <Grid container spacing={3}>
        {CHALLENGES_LIST.map((box, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <FeatureBox
              imgUrl={box.imgUrl}
              title={box.title}
              to={box.to}
              subTitle={box.subTitle}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ChallengesPage;

