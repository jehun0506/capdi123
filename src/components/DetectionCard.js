import React, { useEffect, useState, useRef } from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./style/DetectionCard.css";
import jsonData from "../assets/slag_object_data.json";
import packageJson from '../../package.json';

function DetectionCard() {
  Chart.register(ArcElement);

  useEffect(() => {
    if (jsonData && jsonData.length > 0) {
      const firstData = jsonData[0];
      setSlagValue(firstData.slag_count);
      setPorosityValue(firstData.porosity_count);
      setOthersValue(firstData.others_count);
      setSelectedImage(firstData.vis);
    }
  }, []);

  const [slagValue, setSlagValue] = useState(3);
  const [porosityValue, setPorosityValue] = useState(5);
  const [othersValue, setOthersValue] = useState(2);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [matchingData, setMatchingData] = useState(null);
  const inputRef = useRef(null);

  ///////////////////추가
  const [imageData, setImageData] = useState('');
  const [slagFromFlask, setSlagFromFlask] = useState(0);
  const [porosityFromFlask, setPorosityFromFlask] = useState(0);
  const [othersFromFlask, setOthersFromFlask] = useState(0);
  ///////////////////

  const totalValue = slagValue + porosityValue + othersValue;

  const slagPercentage = (slagValue / totalValue) * 100;
  const porosityPercentage = (porosityValue / totalValue) * 100;
  const othersPercentage = (othersValue / totalValue) * 100;

  const slagData = {
    labels: ["Slag"],
    datasets: [
      {
        data: [slagPercentage, 100 - slagPercentage],
        backgroundColor: ["#5567A5", "#B6C0E7"],
        borderColor: ["transparent", "transparent"],
        borderWidth: 1,
      },
    ],
  };

  const porosityData = {
    labels: ["Porosity"],
    datasets: [
      {
        data: [porosityPercentage, 100 - porosityPercentage],
        backgroundColor: ["#9D4545", "#F5D3D3"],
        borderColor: ["transparent", "transparent"],
        borderWidth: 1,
      },
    ],
  };

  const othersData = {
    labels: ["Others"],
    datasets: [
      {
        data: [othersPercentage, 100 - othersPercentage],
        backgroundColor: ["#55A55E", "#BAE7B6"],
        borderColor: ["transparent", "transparent"],
        borderWidth: 1,
      },
    ],
  };

  const optionsWithCenterText = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      centerTextPlugin: {
        beforeDraw: function (chart) {
          const width = chart.width;
          const height = chart.height;
          const ctx = chart.ctx;

          ctx.restore();
          const fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          const text = totalValue + "%";
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    },
    cutout: "75%",
  };
  /////// 변경
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      
      // flask에 데이터 보내기
      const formData = new FormData();
      formData.append('file', file);
      fetch(packageJson.proxy+'/upload', {
        method: 'POST',
        body: formData
      }).then(response => {
        if (!response.ok) {
          throw new Error('연결안댐');
        }
        return response.json();
      })
      .then(data => {
        console.log('jason 받음', data);
        console.log(data.data)
        setImageData(data.file);
        setSlagFromFlask(data.data["slag"])
        setPorosityFromFlask(data.data["porosity"])
        setOthersFromFlask(data.data["others"])
      })
      .catch(error => {
        console.error('Error:', error);
      });
      try {
        // Create a URL for the selected file
        const fileURL = URL.createObjectURL(file);
        
        const matchingData = jsonData.find(
          (data) => data.filename === file.name
        );

        setMatchingData(matchingData);

        if (matchingData) {
          setSlagValue(matchingData.slag_count);
          setPorosityValue(matchingData.porosity_count);
          setOthersValue(matchingData.others_count);
        } else {
          setSlagValue(0);
          setPorosityValue(0);
          setOthersValue(0);
        }
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    }
  };

  return (
    <div className="card_container">
      <div className="detection_container">
        <div className="detection_wrap">
          <div className="detection_title">결함 검출 결과_Expert</div>
          <div className="detection_content">전문가가 실제로 검출한 결함</div>
          <div className="img_box">
            {" "}
            {matchingData && matchingData.vis && (
              <img className="img" src={matchingData.vis} alt="Selected" />
            )}
          </div>
          <div className="filename">
            파일 이름: {selectedImageFile ? selectedImageFile.name : "없음"}
          </div>
        </div>
        <div className="chart_container">
          <div className="slag_container">
            <div className="chart">
              <Doughnut data={slagData} options={optionsWithCenterText} />
            </div>
            <div className="chart_box">
              <div className="slag_title">Slag</div>
              <div className="slag_number">{slagValue}</div>
            </div>
          </div>
          <div className="porosity_container">
            <div className="chart">
              <Doughnut data={porosityData} options={optionsWithCenterText} />
            </div>
            <div className="chart_box">
              <div className="porosity_title">Porosity</div>
              <div className="porosity_number">{porosityValue}</div>
            </div>
          </div>
          <div className="others_container">
            <div className="chart">
              <Doughnut data={othersData} options={optionsWithCenterText} />
            </div>
            <div className="chart_box">
              <div className="others_title">Others</div>
              <div className="others_number">{othersValue}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="detection_container">
        <div className="detection_wrap">
          <div className="model_box">
            <div>
              <div className="detection_title">결함 검출 결과_Model</div>
              <div className="detection_content">
                모델 학습을 통해 검출한 결함
              </div>
            </div>
            
          <div className="img_btn" onClick={() => inputRef.current.click()}>
              사진 첨부
            </div>
            <input
              type="file"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className="img_box">
            {imageData ? (
              <div>
              {imageData && <img className='img' src={`data:image/jpeg;base64, ${imageData}`} alt="이미지" />}
            </div>
            ) : (
              "이미지"
            )}
          </div>
          <div className="filename">
            파일 이름: {selectedImageFile ? selectedImageFile.name : "없음"}
          </div>
        </div>
        <div className="chart_container">
          <div className="slag_container">
            <div className="chart">
              <Doughnut data={slagData} options={optionsWithCenterText} />
            </div>
            <div className="chart_box">
              <div className="slag_title">Slag</div>
              <div className="slag_number">{slagFromFlask}</div>
            </div>
          </div>
          <div className="porosity_container">
            <div className="chart">
              <Doughnut data={porosityData} options={optionsWithCenterText} />
            </div>
            <div className="chart_box">
              <div className="porosity_title">Porosity</div>
              <div className="porosity_number">{porosityFromFlask}</div>
            </div>
          </div>
          <div className="others_container">
            <div className="chart">
              <Doughnut data={othersData} options={optionsWithCenterText} />
            </div>
            <div className="chart_box">
              <div className="others_title">Others</div>
              <div className="others_number">{othersFromFlask}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default DetectionCard;
