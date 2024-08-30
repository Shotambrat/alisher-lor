import { useRef, useState } from "react";
import { icons, images } from "./assets";
import { pricesRU, pricesUZ } from "./data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const App = () => {
  const [active, setActive] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const prices = i18n.language === "ru" ? pricesRU : pricesUZ;

  const handleButtonClick = (action: string) => {
    fetch("/ajax.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `action=${encodeURIComponent(action)}`,
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const openTable = () => {
    if (i18n.language === "ru") {
      window.open(
        "https://docs.google.com/spreadsheets/d/10oHQPX4omSs89IofSbrhePtunuoE6aq4cAZWlHD_vpw/edit?pli=1#gid=1559566287"
      );
    }
    window.open(
      "https://docs.google.com/spreadsheets/d/10oHQPX4omSs89IofSbrhePtunuoE6aq4cAZWlHD_vpw/edit?pli=1#gid=0"
    );
  };

  const addressRef = useRef<HTMLDivElement>(null);
  const connectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.MutableRefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <input type="checkbox" name="" id="hamburger" />
            <label htmlFor="hamburger">
              {active ? (
                <span onClick={() => setActive(false)} className="close"></span>
              ) : (
                <img
                  onClick={() => setActive(true)}
                  src={icons.hamburger}
                  alt=""
                />
              )}
            </label>
            <div className="header-inner__hamburger">
              <div className="header-inner__hamburger_lang">
                <label htmlFor="language">
                  {i18n.language === "uz" ? (
                    <img src={icons.uz} alt="" />
                  ) : (
                    <img src={icons.ru} alt="" />
                  )}
                  {t("header.languages")}:
                </label>
                <select
                  name="language"
                  defaultValue="ru"
                  id="language"
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <option value="ru">Русский</option>
                  <option value="uz">O`zbek</option>
                </select>
              </div>
              <nav>
                <ul>
                  <li>
                    <a onClick={() => scrollToSection(addressRef)} href="#">
                      {t("header.address")}
                    </a>
                  </li>
                  <li>
                    <a onClick={() => scrollToSection(connectionRef)} href="#">
                      {t("header.connection")}
                    </a>
                  </li>
                  <li>
                    <a onClick={() => scrollToSection(servicesRef)} href="#">
                      {t("header.services")}
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="header-inner__hamburger_adress">
                <a onClick={() => handleButtonClick("Header Tel: +998 97 710 16 92")} href="tel:+998977101692">+998 97 710 16 92</a>
                <p>{t("header.street")}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="main-inner">
            <div className="main-inner__title">
              <img src={icons.doctorIcon} alt="Иконка доктора" />
              <h1>
                {t("main.name")} <span>{t("main.surname")}</span>
              </h1>
            </div>
            <div className="main-inner__info">
              <ul>
                <li>{t("main.info01")}</li>
                <li>{t("main.info02")}</li>
                <li>{t("main.info03")}</li>
                <li>{t("main.info04")}</li>
              </ul>
              <button
                onClick={() => {
                  handleButtonClick("Записаться");
                  scrollToSection(contactsRef);
                }}
              >
                {t("main.btn")}
              </button>
            </div>
          </div>
        </div>
      </main>

      <section className="prices" ref={servicesRef}>
        <div className="container">
          <div className="prices-inner">
            <ul>
              {prices.map((price) => (
                <li key={price.id}>
                  <img src={price.images} alt={(price.images, price.title)} />
                  <div className="prices-inner-block">
                    <div className="prices-inner-block-text">
                      <span>
                        {t("prices.price")}: {price.price} (so‘m)
                      </span>
                      <h3>{price.title}</h3>
                      <p>{price.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                handleButtonClick("Скачать прайс-лист");
                openTable();
              }}
            >
              {t("prices.btn")}
            </button>
          </div>
        </div>
      </section>

      <section className="armor" ref={addressRef}>
        <div className="armor-inner">
          <div className="armor-inner__title">
            <p>{t("armor.title01")}</p>
          </div>
          <div className="armor-inner__pic">
            <img src={images.armor01} alt="Картинка лор-врача" />
            <img src={images.armor02} alt="Картинка лор-врача" />
          </div>
          <div className="armor-inner__info">
            <ul>
              <li>
                <img src={icons.armorIcon01} alt="Картинка возможностей" />
                <p>{t("armor.info01")}</p>
              </li>
              <li>
                <img src={icons.armorIcon02} alt="Картинка возможностей" />
                <p>{t("armor.info02")}</p>
              </li>
              <li>
                <img src={icons.armorIcon03} alt="Картинка возможностей" />
                <p>{t("armor.info03")}</p>
              </li>
            </ul>
            <h3>{t("armor.title02")}</h3>
          </div>
        </div>
      </section>

      <section className="review">
        <div className="review-inner">
          <h2>{t("review.title")}</h2>
          <div className="review-inner__content">
            <Swiper
              modules={[Pagination, Navigation]}
              slidesPerView={1}
              pagination
              navigation
            >
              <SwiperSlide>
                <div className="swiper-slide">
                  <p>{t("review.feedback.user1.desc")}</p>
                  <img src={icons.user} alt="Иконка пользователь" />
                  <h4>{t("review.feedback.user1.author")}</h4>
                  <a href="#">{t("review.feedback.user1.social")}</a>
                  <img src={icons.link} alt="" className="link" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-slide">
                  <p>{t("review.feedback.user2.desc")}</p>
                  <img src={icons.user} alt="Иконка пользователь" />
                  <h4>{t("review.feedback.user2.author")}</h4>
                  <a href="#">{t("review.feedback.user2.social")}</a>
                  <img src={icons.link} alt="" className="link" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-slide">
                  <p>{t("review.feedback.user3.desc")}</p>
                  <img src={icons.user} alt="Иконка пользователь" />
                  <h4>{t("review.feedback.user3.author")}</h4>
                  <a href="#">{t("review.feedback.user3.social")}</a>
                  <img src={icons.link} alt="" className="link" />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section className="social" ref={connectionRef}>
        <div className="social-inner">
          <h2>{t("social.title")}</h2>
          <p>{t("social.text")}</p>
          <ul>
            <li>
              <a onClick={() => handleButtonClick('Instgram')} href="https://www.instagram.com/dralisherqurbonov/">
                <img src={icons.instagram} alt="Иконка инстраграм" />
              </a>
            </li>
            <li>
              <a onClick={() => handleButtonClick('Tik Tok')} href="https://www.tiktok.com/@dralisherqurbonov?_t=8kRO57uxgUD&_r=1">
                <img src={icons.tiktok} alt="Иконка Тиктока" />
              </a>
            </li>
            <li>
              <a onClick={() => handleButtonClick('Telegram')} href="https://t.me/lorjarrohqurbonov">
                <img src={icons.telegram} alt="Иконка телеграм" />
              </a>
            </li>
            <li>
              <a onClick={() => handleButtonClick('You Tube')} href="https://www.youtube.com/channel/UCPmqF5R4CNjpovvFGImPZpg">
                <img src={icons.youtube} alt="Иконка ютуб" />
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="contacts" ref={contactsRef}>
        <div className="contain">
          <div className="contacts-inner">
            <div className="contacts-inner__left">
              <h2>{t("contacts.title")}</h2>
              <ul>
                <li>
                  <a onClick={() => handleButtonClick('Футер : +998 97 710 16 92')} href="tel:+998 97 710 16 92">+998 97 710 16 92</a>
                </li>
                <li>
                  <a onClick={() => handleButtonClick('Футер : +998 90 806 16 92')} href="tel:+998 90 806 16 92">+998 90 806 16 92</a>
                </li>
                <li>
                  <a onClick={() => handleButtonClick('Футер : +998 95 631 19 91')} href="tel:+998 95 631 19 91">+998 95 631 19 91</a>
                </li>
              </ul>
              <a href="#">ali.med.xz1991@gmail.com</a>
              <div className="address">
                <p>{t("contacts.city")}</p>
                <span>{t("contacts.street")}</span>
                <p>{t("contacts.orientir")}</p>
              </div>
              <p>{t("contacts.time")}</p>
              <div  className="contacts-inner__logo">
                <a onClick={() => handleButtonClick('Переход на сайт Result')}  href="https://result-me.uz/">
                  <img src={icons.result} alt="Иконка result" />
                </a>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.770831991303!2d69.2948135288987!3d41.37906613968214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef32fb7b1dc99%3A0xcd4b0bf8a73579d0!2z0YPQu9C40YbQsCDQkNGF0LzQsNC00LAg0JTQvtC90LjRiNCwIDcsIDEwMDE4MCwg0KLQsNGI0LrQtdC90YIsIFRvc2hrZW50IFNoYWhyaSwg0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1sru!2s!4v1716882886449!5m2!1sru!2s"
                className="map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
