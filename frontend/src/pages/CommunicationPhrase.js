import React, { useEffect, useState } from 'react';
import useTitle from '../hooks/useTitle';

const CommunicationPhrasePage = () => {
  // Sử dụng hook để thiết lập tiêu đề trang
  useTitle('1000+ Cụm từ giao tiếp');

  // State để lưu trữ tổng số câu
  const [total, setTotalSentences] = useState(0);

  // State để lưu trữ trạng thái tải dữ liệu
  const [loading, setLoading] = useState(true);

  // Sử dụng useEffect để gọi API khi component được render lần đầu
  useEffect(() => {
    const fetchTotalSentences = async () => {
      try {
        const response = await fetch('http://localhost:8080/apis/sentences/total');
        const data = await response.json();
        if (response.ok) {
          const total = data;    
          console.log('Total sentences:', total); // Debug log
          setTotalSentences(total);
        } else {
          throw new Error(data.message || 'Failed to fetch total sentences');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSentences();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>Total Sentences: {total}</p>
      )}
    </div>
  );
};

export default CommunicationPhrasePage;
