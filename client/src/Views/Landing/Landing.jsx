import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu, getReviews, getDataUsers } from "../../Redux/actions";
import NavBar from "../../Components/Navbar/NavBar";
import style from "./Landing.module.css";
import Footer from "../../Components/Footer/Footer";

import RegisterSection from "./Sections/Register/register";
import SwipeMiddleTop from "../../Components/pageAnimations/swipeDown/Exit/swipeDown";
import SwipeBottomMiddle from "../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import VerifyToken from "../../Verifications/Token/verifyToken";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Section3 from "./Sections/Section3/section3";

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dishes = useSelector((state) => state.menu);
  const reviews = useSelector((state) => state.reviews);
  const usersAmount = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getMenu());
    dispatch(getDataUsers("amount"));
  }, [dispatch]);

  const ratingPoints = () => {
    let totalStars = 0;
    let numberOfReviews = 0;

    reviews.forEach((user) => {
      user.reviews.forEach((item) => {
        totalStars += item.stars;
        numberOfReviews++;
      });
    });

    return Math.floor((totalStars / numberOfReviews) * 10) / 10;
  };

  const reviewsAmount = () => {
    let numberOfReviews = 0;

    reviews.forEach((user) => {
      user.reviews.forEach((item) => {
        numberOfReviews++;
      });
    });

    return numberOfReviews;
  };

  const storeData = {
    dishesAmount: dishes.length,
    reviewsAmount: reviewsAmount(),
    averageScore: ratingPoints(),
    usersAmount: usersAmount,
  };

  const [isExit, setExit] = useState(false);

  return (
    <motion.div className={style.Landing}>
      <VerifyToken />
      <SwipeMiddleTop />
      {isExit == true && <SwipeBottomMiddle />}

      <NavBar />

      <div className={style.background}>
        <div className={style.section1Container}>
          <div className={style.sectionLeft}>
            <header className={style.sectionLeftTop}>
              <motion.div
                initial={{ scale: 0.01, x: -300 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8, type: "spring" }}
                className={style.card1Left}
              >
                <div className={style.textContainer}>
                  <div className={style.container2}>
                    <p className={style.title}>Bienvenido a Indico</p>
                    <p className={style.subtitle}>
                      Una experiencia culinaria única donde la frescura de la
                      naturaleza se fusiona con la excelencia de la alta cocina.
                      <br />
                      <br />
                      <b>Descubre su equilibrio perfecto.</b>
                    </p>
                  </div>
                </div>
              </motion.div>
            </header>

            <footer className={style.sectionLeftBottom}>
              <div className={style.card2Left}>
                <motion.div
                  initial={{ scale: 0.01 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, delay: 1, type: "spring" }}
                  className={style.card2LeftContent}
                ></motion.div>
              </div>
              <motion.div
                initial={{ scale: 0.01 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 1.3, type: "spring" }}
                className={style.card3Left}
              >
                <motion.button
                  onClick={() => {
                    setExit(true);
                    setTimeout(() => {
                      navigate("/store");
                    }, 500);
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className={style.card3LeftContent}
                >
                  <div className={style.goStoreComponent}>
                    <header className={style.topComponent}>
                      <p className={style.text1}>Ir a la tienda</p>

                      <p className={style.iconContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="rgb(160, 250, 170)"
                          width="35"
                          height="35"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </p>
                    </header>
                    <div className={style.midComponent}>
                      <p className={style.text2}>No esperes más</p>
                    </div>

                    <footer className={style.bottomComponent}></footer>
                  </div>
                </motion.button>
              </motion.div>
            </footer>
          </div>

          {/* ----------------- R I G H T S I D E ------------------------- */}

          <div className={style.sectionRight}>
            <header className={style.sectionRightTop}>
              <motion.div
                initial={{ scale: 0.01, x: 300 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5, type: "spring" }}
                className={style.card1Right}
              >
                <motion.header
                  className={style.sectionRightBottom}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2, type: "spring" }}
                >
                  <motion.div
                    className={style.test}
                    animate={{
                      x: ["0%", "-100%"],
                    }}
                    transition={{
                      delay: 4,
                      duration: 30,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    <div className={style.card2Right}>
                      <div className={style.iconStatsContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="rgb(178, 255, 187)"
                          width="30"
                          height="30"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={style.primaryText}>25+</header>
                        <div className={style.text2Container}>
                          <footer className={style.secondText}>
                            Ventas realizadas
                          </footer>
                        </div>
                      </div>
                    </div>
                    <div
                      initial={{ scale: 0.01 }}
                      animate={{ scale: 0.9 }}
                      transition={{ duration: 1, delay: 2, type: "spring" }}
                      className={style.card2Right}
                    >
                      <div className={style.iconStatsContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="rgb(178, 255, 187)"
                          width="30"
                          height="30"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={style.primaryText}>
                          {storeData.averageScore}
                        </header>
                        <footer className={style.secondText}>
                          Puntuación media
                        </footer>
                      </div>
                    </div>
                    <div className={style.card2Right}>
                      <div className={style.iconStatsContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          width="30"
                          height="30"
                          fill="rgb(178, 255, 187)"
                        >
                          <path d="M52.229 16.398a2.381 2.381 0 1 0-.222-4.758l-.892.041-.041-.892a2.381 2.381 0 1 0-4.758.222l.263 5.65 5.65-.263zm1.101 7.014-.032.688-.688-.032a1.836 1.836 0 1 0-.17 3.668l4.355.202.202-4.355a1.835 1.835 0 1 0-3.667-.171z"></path>

                          <path d="m11.771 16.398 5.65.263.263-5.65a2.382 2.382 0 0 0-4.758-.222l-.041.892-.892-.041a2.38 2.38 0 1 0-.222 4.758zm-4.769 7.184.202 4.355 4.355-.202a1.836 1.836 0 1 0-.17-3.668l-.688.032-.032-.688a1.836 1.836 0 1 0-3.667.171z"></path>

                          <path d="M32 27.313c2.412 0 4.375-1.963 4.375-4.375S34.412 18.563 32 18.563s-4.375 1.963-4.375 4.375 1.963 4.375 4.375 4.375zm0-7.5c1.723 0 3.125 1.402 3.125 3.125S33.723 26.063 32 26.063s-3.125-1.402-3.125-3.125 1.402-3.125 3.125-3.125zM3.899 53.563c.32 4.189 3.831 7.5 8.101 7.5h40c4.27 0 7.781-3.311 8.101-7.5H3.899z"></path>
                          <path d="M6.383 52.313h5.003c.218-7.089 4.122-13.649 10.301-17.232a.625.625 0 0 1 .627 1.081c-5.795 3.359-9.461 9.505-9.678 16.15h44.982c-.333-13.842-11.696-25-25.617-25S6.716 38.47 6.383 52.313zm25.617-20c2.673 0 5.275.506 7.735 1.505a.625.625 0 1 1-.47 1.158A19.217 19.217 0 0 0 32 33.563a.625.625 0 0 1 0-1.25z"></path>
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={style.primaryText}>
                          {storeData.dishesAmount}+
                        </header>
                        <footer className={style.secondText}>
                          Platos para elegir
                        </footer>
                      </div>
                    </div>
                    <div className={style.card2Right}>
                      <div className={style.iconStatsContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="30"
                          height="30"
                          fill="rgb(178, 255, 187)"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={style.primaryText}>
                          {storeData.reviewsAmount}+
                        </header>
                        <footer className={style.secondText}>Reseñas</footer>
                      </div>
                    </div>
                    <div className={style.card2Right}>
                      <div className={style.iconStatsContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="rgb(178, 255, 187)"
                          width="30"
                          height="30"
                          style={{ marginRight: "px" }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                            clipRule="evenodd"
                          />
                          <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={style.primaryText}>
                          {storeData.usersAmount}+
                        </header>
                        <div className={style.text2Container}>
                          <footer
                            className={`${style.secondText} ${style.secondTextAnimation}`}
                          >
                            Clientes que se registraron
                          </footer>
                        </div>
                      </div>
                    </div>
                    <div className={style.card2Right}>
                      <div className={style.iconStatsContainer}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="rgba(178, 255, 187, 0)"
                          width="30"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                          className={style.svgs}
                        >
                          <path
                            d="M18.1777 8C23.2737 8 23.2737 16 18.1777 16C13.0827 16 11.0447 8 5.43875 8C0.85375 8 0.85375 16 5.43875 16C11.0447 16 13.0828 8 18.1788 8H18.1777Z"
                            stroke=" rgb(178, 255, 187)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={`${style.primaryText} ${style.xd}`}>
                          Infinito
                        </header>
                        <div className={style.text2Container}>
                          <footer
                            className={`${style.secondText} ${style.secondTextAnimation}`}
                          >
                            Amor por lo que hacemos
                          </footer>
                        </div>
                      </div>
                    </div>
                    {/* ----------------------------------------------- */}
                    <div className={style.card2Right}>
                      <div className={style.iconStatsContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="rgb(178, 255, 187)"
                          width="30"
                          height="30"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={style.primaryText}>25+</header>
                        <div className={style.text2Container}>
                          <footer className={style.secondText}>
                            Ventas realizadas
                          </footer>
                        </div>
                      </div>
                    </div>
                    <div
                      initial={{ scale: 0.01 }}
                      animate={{ scale: 0.9 }}
                      transition={{ duration: 1, delay: 2, type: "spring" }}
                      className={style.card2Right}
                    >
                      <div className={style.iconStatsContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="rgb(178, 255, 187)"
                          width="30"
                          height="30"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={style.primaryText}>
                          {storeData.averageScore}
                        </header>
                        <footer className={style.secondText}>
                          Puntuación media
                        </footer>
                      </div>
                    </div>
                    <div className={style.card2Right}>
                      <div className={style.iconStatsContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          width="30"
                          height="30"
                          fill="rgb(178, 255, 187)"
                        >
                          <path d="M52.229 16.398a2.381 2.381 0 1 0-.222-4.758l-.892.041-.041-.892a2.381 2.381 0 1 0-4.758.222l.263 5.65 5.65-.263zm1.101 7.014-.032.688-.688-.032a1.836 1.836 0 1 0-.17 3.668l4.355.202.202-4.355a1.835 1.835 0 1 0-3.667-.171z"></path>

                          <path d="m11.771 16.398 5.65.263.263-5.65a2.382 2.382 0 0 0-4.758-.222l-.041.892-.892-.041a2.38 2.38 0 1 0-.222 4.758zm-4.769 7.184.202 4.355 4.355-.202a1.836 1.836 0 1 0-.17-3.668l-.688.032-.032-.688a1.836 1.836 0 1 0-3.667.171z"></path>

                          <path d="M32 27.313c2.412 0 4.375-1.963 4.375-4.375S34.412 18.563 32 18.563s-4.375 1.963-4.375 4.375 1.963 4.375 4.375 4.375zm0-7.5c1.723 0 3.125 1.402 3.125 3.125S33.723 26.063 32 26.063s-3.125-1.402-3.125-3.125 1.402-3.125 3.125-3.125zM3.899 53.563c.32 4.189 3.831 7.5 8.101 7.5h40c4.27 0 7.781-3.311 8.101-7.5H3.899z"></path>
                          <path d="M6.383 52.313h5.003c.218-7.089 4.122-13.649 10.301-17.232a.625.625 0 0 1 .627 1.081c-5.795 3.359-9.461 9.505-9.678 16.15h44.982c-.333-13.842-11.696-25-25.617-25S6.716 38.47 6.383 52.313zm25.617-20c2.673 0 5.275.506 7.735 1.505a.625.625 0 1 1-.47 1.158A19.217 19.217 0 0 0 32 33.563a.625.625 0 0 1 0-1.25z"></path>
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={style.primaryText}>
                          {storeData.dishesAmount}+
                        </header>
                        <footer className={style.secondText}>
                          Platos para elegir
                        </footer>
                      </div>
                    </div>

                    <div className={style.card2Right}>
                      <div className={style.iconStatsContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="30"
                          height="30"
                          fill="rgb(178, 255, 187)"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className={style.statsTextContainer}>
                        <header className={style.primaryText}>
                          {storeData.reviewsAmount}+
                        </header>
                        <footer className={style.secondText}>Reseñas</footer>
                      </div>
                    </div>
                  </motion.div>
                </motion.header>
              </motion.div>
            </header>
          </div>
        </div>
      </div>

      {/* ------------------------SHAPE DIVIDER -------------------------- */}
      <div data-negative="false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          style={{ rotate: "180deg" }}
        >
          <path
            opacity="0.33"
            d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"
          ></path>
          <path
            opacity="0.66"
            d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"
          ></path>
          <path d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"></path>
        </svg>
      </div>
      {/* -------------------------------------------------------- */}
      <div className={style.RegisterSection} id="Register">
        <RegisterSection />
      </div>

      <Section3 />
      <div data-negative="false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            opacity="0.33"
            d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"
          ></path>
          <path
            opacity="0.66"
            d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"
          ></path>
          <path d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"></path>
        </svg>{" "}
      </div>
      <Footer />
    </motion.div>
  );
};

export default Landing;

// 1. Puntuacion media
// 2. Platos para elegir
// 3. Reseñas
// 4. Cuentas creadas
// 5. Infinito amor por lo que hacemos
