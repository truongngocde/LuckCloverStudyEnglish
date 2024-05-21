import CommunicationPhrase from '../components/CommunicationPhrase';
import useTitle from '../hooks/useTitle';
// import React, {useState, useEffect} from 'react';

function CommunicationPhrasePage() {
  useTitle('1000+ Cụm từ giao tiếp');
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const getTotalSentences = async () => {
  //     const response = await fetch('http://localhost:8080/apis/sentences/total');
  //     const result = await response.json()
  //     setData(result)
  //   }

  //   getTotalSentences();
  // }, [])
  // return (
  //   <div className="container">
  //     Total: {data.total}
  //   </div>
  // );
  return (
    <div className="container">
      <CommunicationPhrase />
    </div>
  )
}

export default CommunicationPhrasePage;
