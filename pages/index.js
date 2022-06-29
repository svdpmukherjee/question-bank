import React from 'react';

import questions from '../questions.json';
import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { browserName, isMobile } from 'react-device-detect';

export default function Home(props) {
  const { ip_address_1, ip_address_2 } = props;
  const [nextClick, setNextClick] = useState('');
  const [nextClickOthers, setNextClickOthers] = useState('');
  const [hintClick, setHintClick] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [disabled, setDisabled] = useState(false);
  let deviceType = '';

  useEffect(async () => {
    isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
    let passValue = {
      website: 'gmatcrusader',
      ip_address_1: ip_address_1,
      ip_address_2: ip_address_2,
      date: new Date().toISOString().substring(0, 10),
      time: new Date().toISOString().substring(11, 19),
      deviceType: deviceType,
      browser: browserName,
    };
    let response = await fetch('/api/databaseOperations', {
      method: 'DELETE',
      body: JSON.stringify(passValue),
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisabled(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [disabled]);

  // Show answer button
  const handleShowAnswer = async (event) => {
    const questionNo = event.target.id.toString();
    setDisabled(true);
    if (questionNo > 900) {
      setNextClickOthers(questionNo);
      setNextClick('');
    } else {
      // let date = new Date().toISOString();
      // update-database
      let response_put = await fetch('/api/databaseOperations', {
        method: 'PUT',
        body: questionNo,
      });

      isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
      // read-add-database
      let passValue = {
        website: 'gmatcrusader',
        ip_address_1: ip_address_1,
        ip_address_2: ip_address_2,
        questionNo: questionNo,
        date: new Date().toISOString().substring(0, 10),
        time: new Date().toISOString().substring(11, 19),
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
        setNextClickOthers('');
        return setButtonText(data.message);
      } else return data.message;

      // setButtonText(response_post);

      // console.log(nextClick, buttonText);
    }
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
          <div className="rounded-lg lg:col-span-1 ">
            <div className=" p-2 flex items-center justify-center ">
              <div className="">
                <a
                  href="https://www.mba.com/exam-prep/gmat-official-guide-bundle-2022-ebook-and-online-question-bank"
                  // href=""
                  className="flex items-center "
                >
                  <img src="ad_1.jpg" className="" alt="quant crusader" />
                </a>
                <a
                  href="https://www.thebalancecareers.com/best-gmat-prep-courses-5118223"
                  // href=""
                  className="flex items-center py-10"
                >
                  <img src="ad_2.jpg" className="" alt="quant crusader" />
                </a>
                <a
                  // href=
                  href=""
                  className="flex items-center py-10"
                >
                  <img src="ad_3.jpg" className="" alt="quant crusader" />
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg col-span-6 bg-white ">
            <div className="grid sm:grid-cols-6 md:grid-cols-6 lg:col-span-6 py-2 gap-4">
              {questions.map((ques) => {
                return (
                  <>
                    <div className="sm:col-span-5 md:col-span-5 lg:col-span-5 px-4 my-auto">
                      {(() => {
                        if (ques.number == hintClick) {
                          return (
                            <>
                              <p className="text-md " key={ques.question}>
                                {ques.number}.<span> </span>
                                {ques.question}
                              </p>
                              <div className="absolute font-serif blur-sm text-sm p-2 z-0 ">
                                Lorem ipsum dolor sit amet efef qsqs
                                <br />
                                Aenean gravida, turpis <br />
                                id dapibus auctor, ipsum, eget <br />
                                mollis diam nunc a tortor. Maecenas <br />
                                wdwdw <br />
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

                    <div className="sm:col-span-1 md:col-span-5 lg:col-span-1  text-sm ">
                      {(() => {
                        if (ques.id == nextClick) {
                          return (
                            <>
                              <button
                                className="m-2 ml-6"
                                id={ques.id}
                                key={ques.number}
                                disabled={true}
                                onClick={(e) => handleShowAnswer(e)}
                              >
                                Answer: {buttonText}
                              </button>
                            </>
                          );
                        } else if (ques.id == nextClickOthers) {
                          return (
                            <>
                              <button
                                className="m-2 ml-6"
                                id={ques.id}
                                key={ques.number}
                                disabled={true}
                                onClick={(e) => handleShowAnswer(e)}
                              >
                                Answer: {ques.answer}
                              </button>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <button
                                className="m-2 p-2 bg-gray-400 hover:bg-gray-700 text-white rounded-sm shadow-md ml-6"
                                id={ques.id}
                                key={ques.number}
                                disabled={disabled}
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
                        className="m-2 p-2 bg-gray-300 text-white hover:bg-gray-500 rounded-sm shadow-md ml-6"
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
                // className="flex items-center "
                // href=""
              >
                <img src="gif_1.gif" className="" alt="quant crusader" />
              </a>
              <a
                href="https://brittanymondido.com/"
                // href=""
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
  // console.log(req.headers);
  const ip_1 = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const ip_2 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // console.log(JSON.stringify(ip));
  // console.log(ip);

  // const res = await axios.get('https://geolocation-db.com/json');
  // const ip = res.data.IPv4;
  const ip_segments_1 = ip_1.split('.');
  const ip_segments_2 = ip_2.split('.');
  let ip_segments_int_1 = ip_segments_1.map((item) => parseInt(item, 10));
  let ip_segments_int_2 = ip_segments_2.map((item) => parseInt(item, 10));

  // transforming IP addresses
  ip_segments_int_1[0] = ip_segments_int_1[0] * Math.pow(2, 2) + 5 * 5;
  ip_segments_int_1[1] = ip_segments_int_1[1] * Math.pow(3, 3) + 4 * 4;
  ip_segments_int_1[2] = ip_segments_int_1[2] * Math.pow(4, 4) + 3 * 3;
  ip_segments_int_1[3] = ip_segments_int_1[3] * Math.pow(5, 5) + 2 * 2;
  const ip_address_1 = ip_segments_int_1.join('.').toString();

  ip_segments_int_2[0] = ip_segments_int_2[0] * Math.pow(2, 2) + 5 * 5;
  ip_segments_int_2[1] = ip_segments_int_2[1] * Math.pow(3, 3) + 4 * 4;
  ip_segments_int_2[2] = ip_segments_int_2[2] * Math.pow(4, 4) + 3 * 3;
  ip_segments_int_2[3] = ip_segments_int_2[3] * Math.pow(5, 5) + 2 * 2;
  const ip_address_2 = ip_segments_int_2.join('.').toString();

  return {
    props: {
      ip_address_1,
      ip_address_2,
    }, // will be passed to the page component as props
  };
}
