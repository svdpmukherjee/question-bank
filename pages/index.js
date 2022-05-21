import React from 'react';

import questions from '../questions.json';
import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { browserName, isMobile } from 'react-device-detect';

export default function Home({ ip_address }) {
  const [nextClick, setNextClick] = useState('');
  const [hintClick, setHintClick] = useState('');

  const [buttonText, setButtonText] = useState('');
  let deviceType = '';
  // const [buttonColor, setButtonColor] = useState('');

  // Show answer button
  const handleShowAnswer = async (event) => {
    const questionNo = event.target.id.toString();
    // const answer = event.target.value;
    // console.log(answer);
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
    //console.log(passValue);
    let response_post = await fetch('/api/databaseOperations', {
      method: 'POST',
      body: JSON.stringify(passValue),
    });

    let data = await response_post.json();

    // if (questionNo === 999) {
    //   setNextClick(questionNo);
    //   return setButtonText(answer);
    // }
    if (data.success) {
      // console.log(data.message);
      setNextClick(questionNo);

      return setButtonText(data.message);
    } else return data.message;

    // setButtonText(response_post);

    // console.log(nextClick, buttonText);
  };

  // Expalanation button
  const handleHint = async (event) => {
    const hint_question = event.target.id.toString();
    setHintClick(hint_question);
  };

  // JSX
  return (
    <div className="">
      <Head>
        <title>Questions Set for Quantitative Aptitude</title>
      </Head>

      <Navbar />

      <div className=" py-8 h-full bg-gradient-to-r from-green-500 via-purple-500 to-pink-500">
        <div className="grid grid-cols-9 gap-3">
          <div className="rounded-lg col-span-1 ">
            <div className=" p-2 flex items-center justify-center ">
              <div className="">
                <a
                  href="https://www.mba.com/exam-prep/gmat-official-guide-bundle-2022-ebook-and-online-question-bank"
                  className="flex items-center "
                >
                  <img src="ad_1.jpg" className="" alt="quant crusader" />
                </a>
                <a
                  href="https://www.thebalancecareers.com/best-gmat-prep-courses-5118223"
                  className="flex items-center py-10"
                >
                  <img src="ad_2.jpg" className="" alt="quant crusader" />
                </a>
                <a
                  href="https://www.amazon.com/GMAT-Prep-Plus-2022-2023-Strategies/dp/1506277233"
                  className="flex items-center py-10"
                >
                  <img src="ad_3.jpg" className="" alt="quant crusader" />
                </a>
              </div>
            </div>
          </div>

          <div className=" border-2 rounded-lg col-span-6 p-3 bg-white">
            <div className="grid grid-cols-5 py-2">
              {questions.map((ques) => {
                return (
                  <>
                    <div className="col-span-4 m-4">
                      {(() => {
                        if (ques.number == hintClick) {
                          return (
                            <>
                              <p className="text-md" key={ques.question}>
                                {ques.number}.<span> </span>
                                {ques.question}
                              </p>
                              <div className="absolute font-serif blur-sm text-sm p-2 z-0 ">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. <br />
                                Aenean gravida, turpis <br />
                                id dapibus auctor, tortor enim suscipit ipsum,
                                eget <br />
                                mollis diam nunc a tortor. Maecenas <br />
                                quam tortor, <br />
                              </div>
                              <div className=" text-center -z-40 text-2xl text-indigo-700 font-bold shadow-2xl p-5">
                                Please subscribe to see the hint
                              </div>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <p className="text-md" key={ques.question}>
                                {ques.number}.<span> </span>
                                {ques.question}
                              </p>
                            </>
                          );
                        }
                      })()}
                    </div>

                    <div className="col-span-1 m-4 ">
                      {(() => {
                        if (ques.id == nextClick) {
                          return (
                            <>
                              <button
                                className="w-30 m-1 p-2  ml-6"
                                id={ques.id}
                                key={ques.number}
                                disabled={true}
                                onClick={(e) => handleShowAnswer(e)}
                              >
                                Answer: {buttonText}
                              </button>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <button
                                className="w-30 m-1 p-2 bg-gray-400 hover:bg-gray-700 text-white rounded-sm shadow-md ml-6"
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
                        {ques.id == nextClick ? buttonText : 'Show Answer'}
                      </button> */}
                      {/* {(() => {
                        if (ques.number == hintClick) {
                          return (
                            <>
                              <button
                                className="w-30 m-1 p-2 bg-gray-300 text-white hover:bg-gray-500 rounded-sm shadow-md ml-6"
                                id={ques.number}
                                key={ques.number}
                                onClick={(e) => handleHint(e)}
                              >
                                Hints to Solve
                              </button>
                              <p className="bg-violet-500 text-white text-center rounded-t-lg font-serif text-sm p-2">
                                Please sign-up to see the hint!
                              </p>
                            </>
                          );
                        } else {
                          return (
                            <> */}
                      <button
                        className="w-30 m-1 p-2 bg-gray-300 text-white hover:bg-gray-500 rounded-sm shadow-md ml-6"
                        id={ques.number}
                        key={ques.number}
                        onClick={(e) => handleHint(e)}
                      >
                        Hints to Solve
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="p-2 col-span-2 ">
            <div>
              <a
                href="https://www.stress.org/virtual-therapy-helping-ease-college-students-anxiety-about-covid-19"
                className="flex items-center "
              >
                <img src="gif_1.gif" className="" alt="quant crusader" />
              </a>
              <a
                href="https://brittanymondido.com/"
                className="flex items-center  py-10"
              >
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
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  // const res = await axios.get('https://geolocation-db.com/json');
  // const ip = res.data.IPv4;
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
