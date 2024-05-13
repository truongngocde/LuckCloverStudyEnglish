import ipaChartSrc from '../assets/images/ipa/ipa-chart.png';
import ipaTableSrc from '../assets/images/ipa/ipa-table.jpg';
import mouthShapeSrc from '../assets/images/ipa/mouth-shape.png';
import Consonants from '../components/IPA/Constants';
import Diphthongs from '../components/IPA/Diphthong';
import Vowels from '../components/IPA/Vowel';
import useTitle from '../hooks/useTitle';
import React from 'react';

function IPAPage() {
  useTitle('IPA');

  return (
    <div className="container luckclover-box">
      <Vowels />
      <Diphthongs />
      <Consonants />

      {/* ipa chart */}
      <h2 className="luckclover-title">4. Biểu đồ IPA (IPA Chart)</h2>
      <div
        className="w-100 my-10 t-center"
        style={{ maxWidth: 450, margin: 'auto' }}>
        <img src={ipaChartSrc} alt="IPA Chart" className="w-100 mb-4" />
        <a
          className="luckclover-link"
          href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet"
          target="_blank"
          rel="noreferrer">
          Nguồn: Wikipedia
        </a>
      </div>

      {/* summary */}
      <h2 className="luckclover-title">5. Tóm lượt (Summary)</h2>

      <img src={ipaTableSrc} alt="IPA Table" className="w-100 mb-4" />
      <div
        className="w-100 my-10 t-center"
        style={{ maxWidth: 450, margin: 'auto' }}>
        <img src={mouthShapeSrc} alt="Mouth shape" className="w-100 mb-4" />
        <a
          className="luckclover-link"
          href="https://google.com"
          target="_blank"
          rel="noreferrer">
          Nguồn: Internet
        </a>
      </div>
    </div>
  );
}

export default IPAPage;
