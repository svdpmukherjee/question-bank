import React from 'react';
import questions from '../questions.json';
import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { browserName, isMobile, isDesktop } from 'react-device-detect';

export default function Home({ ip_address }) {
  const [buttonClick, setButtonClick] = useState('');
  const [buttonText, setButtonText] = useState('');
  let deviceType = '';
  // const [buttonColor, setButtonColor] = useState('');

  // Show answer button
  const handleShowAnswer = async (event) => {
    const questionNo = event.target.id.toString();
    let date = new Date().toISOString();
    // update-database
    let response_put = await fetch('/api/databaseOperations', {
      method: 'PUT',
      body: questionNo,
    });

    isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
    // read-add-database
    let passValue = {
      ip_address: ip_address,
      questionNo: questionNo,
      date: date,
      deviceType: deviceType,
      browser: browserName,
    };
    let response_post = await fetch('/api/databaseOperations', {
      method: 'POST',
      body: JSON.stringify(passValue),
    });

    let data = await response_post.json();
    if (data.success) {
      // console.log(data.message);
      setButtonClick(questionNo);
      return setButtonText(data.message);
    } else {
      // set the error
      return data.message;
    }

    // setButtonText(response_post);

    // console.log(buttonClick, buttonText);
  };

  // Expalanation button
  const handleExplanation = () => {};

  // JSX
  return (
    <div>
      <Head>
        <title>Quant Crusader Blog</title>
      </Head>

      <Navbar />

      <div className=" py-8 m-3 h-full ">
        <div className="grid grid-cols-9 gap-3">
          <div className="rounded-lg col-span-1">
            <div className=" flex items-center justify-center">
              <div>
                <a href="#" className="flex items-center">
                  <img src="ad_1.jpg" className="" alt="quant crusader" />
                </a>
                <a href="#" className="flex items-center py-10">
                  <img src="ad_2.jpg" className="" alt="quant crusader" />
                </a>
                <a href="#" className="flex items-center py-10">
                  <img src="ad_3.jpg" className="" alt="quant crusader" />
                </a>
              </div>
            </div>
          </div>

          <div className=" border-2 rounded-lg col-span-6 p-3">
            <div className="grid grid-cols-5 py-2">
              {questions.map((ques) => {
                return (
                  <>
                    <div className="col-span-4 m-4">
                      <p className="text-md" key={ques.question}>
                        {ques.number}.<span> </span>
                        {ques.question}
                      </p>
                    </div>

                    <div className="col-span-1 m-4">
                      {(() => {
                        if (ques.id == buttonClick) {
                          return (
                            <>
                              <button
                                className="w-30 m-1 p-2  ml-6"
                                id={ques.id}
                                key={ques.number}
                                disabled={true}
                                onClick={(e) => handleShowAnswer(e)}
                              >
                                {buttonText}
                              </button>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <button
                                className="w-30 m-1 p-2 bg-gray-400 text-white rounded-sm shadow-md ml-6"
                                id={ques.id}
                                key={ques.number}
                                onClick={(e) => handleShowAnswer(e)}
                              >
                                Show Answer
                              </button>
                            </>
                          );
                        }
                      })()}

                      {/* <button
                        className="w-30 m-1 p-2 bg-gray-400 text-white rounded-sm shadow-md ml-6"
                        id={ques.id}
                        key={ques.number}
                        onClick={(e) => handleShowAnswer(e)}
                      >
                        {ques.id == buttonClick ? buttonText : 'Show Answer'}
                      </button> */}

                      <button
                        className="w-30 m-1 p-2 bg-gray-300 text-white rounded-sm shadow-md ml-6"
                        onClick={handleExplanation}
                      >
                        Explanation
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className=" col-span-2">
            <div>
              <a href="#" className="flex items-center ">
                <img src="gif_1.gif" className="" alt="quant crusader" />
              </a>
              <a href="#" className="flex items-center  py-10">
                <img src="gif_2.gif" className="" alt="quant crusader" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const res = await axios.get('https://geolocation-db.com/json');
  const ip = res.data.IPv4;
  const ip_segments = ip.split('.');
  let ip_segments_int = ip_segments.map((item) => parseInt(item, 10));

  // transforming IP addresses
  ip_segments_int[0] = ip_segments_int[0] * Math.pow(2, 2) + 5 * 5;
  ip_segments_int[1] = ip_segments_int[1] * Math.pow(3, 3) + 4 * 4;
  ip_segments_int[2] = ip_segments_int[2] * Math.pow(4, 4) + 3 * 3;
  ip_segments_int[3] = ip_segments_int[3] * Math.pow(5, 5) + 2 * 2;
  const ip_address = ip_segments_int.join('.').toString();

  return {
    props: {
      ip_address,
    }, // will be passed to the page component as props
  };
}
