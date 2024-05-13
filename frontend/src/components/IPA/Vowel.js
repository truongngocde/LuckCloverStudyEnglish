import { VOWELS } from '../../constants/ipa';
import React from 'react';
import IPAGroupCollapse from './GroupCollapse';

function Vowels() {
  return (
    <>
      <h2 className="luckclover-title">1. Nguyên âm đơn (Vowels)</h2>
      <h3 className="luckclover-sub-title">
        Chúng ta có 12 nguyên âm đơn, mình chia làm 5 nhóm:
      </h3>

      {VOWELS.map((item, key) => (
        <IPAGroupCollapse
          title={item.title}
          phoneticList={item.list}
          key={key}
        />
      ))}
    </>
  );
}

export default Vowels;
