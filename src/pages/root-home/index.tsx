import './index.sass';
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSkeletonText,
  IonToolbar,
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { SplashScreen } from '@capacitor/splash-screen';
import { RouteComponentProps } from 'react-router';
import FooterIrisImage from './../../assets/media/footer-iris.svg';
import {
  AuthenticationClient,
  i18,
  IJwtEntity,
} from '@team_eureka/eureka-ionic-core';
import locales from './locales';
import { Fragment, useEffect, useState } from 'react';
import Header from './components/header';
import UserMenu from '../../components/user-menu';
import NewsContent from './components/news-content';

const localize = i18(locales);

const welcomeBackground = { backgroundImage: `url(${FooterIrisImage})` };

type IProps = RouteComponentProps<any>;

const RootHomePage: React.FC<IProps> = (props) => {
  const handleTool = (tool: string) => {
    props.history.push(`/${tool}`);
  };

  const [swiper, setSwiper] = useState<any>();
  const [slideState, setSlideStates] = useState<number>(0);
  const [mode, setMode] = useState<'INITIAL_STATE' | 'HOME_LOADED'>(
    'INITIAL_STATE'
  );
  const [user, setUser] = useState<IJwtEntity | undefined>(undefined);
  const [menu_is_open, setMenuIsOpen] = useState<boolean>(false);
  const [activeTasks, setActiveTasks] = useState<boolean>(false);
  const [activeTools, setActiveTools] = useState<boolean>(false);
  const [activeNews, setActiveNews] = useState<boolean>(false);

  const showMenuHandler = async () => {
    setMenuIsOpen(true);
  };

  const onCloseMenuHandler = () => {
    setMenuIsOpen(false);
  };

  const onSlideClickHandler = (slider: number | string, swiper: any) => {
    swiper!.slideTo(slider);
  };

  const load = async () => {
    setMode('HOME_LOADED');
    setUser(AuthenticationClient.getInfo());
  };

  useEffect(() => {
    load();
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    switch (slideState) {
      case 0: {
        setActiveTasks(true);
        setActiveTools(false);
        setActiveNews(false);
        break;
      }
      case 1: {
        setActiveNews(true);
        setActiveTasks(false);
        setActiveTools(false);
        break;
      }
      case 2: {
        setActiveTools(true);
        setActiveTasks(false);
        setActiveNews(false);
        break;
      }
    }
  }, [slideState]);

  const onGetSwiperHandler = (e: any) => {
    setSwiper(e);
  };

  const renderINITIAL_STATE = () => {
    return (
      <Fragment>
        <IonHeader>
          <IonToolbar>
            <div className='custom-skeleton'>
              <div>
                <IonSkeletonText
                  animated={true}
                  className='skeleton-avatar'
                ></IonSkeletonText>
              </div>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='custom-skeleton'>
            <div>
              <IonSkeletonText
                animated={true}
                className='skeleton-title'
              ></IonSkeletonText>
              <IonSkeletonText
                animated={true}
                className='skeleton-subtitle'
              ></IonSkeletonText>
            </div>
            <div>
              <IonSkeletonText
                animated={true}
                className='skeleton-stadistic'
              ></IonSkeletonText>
              <IonSkeletonText
                animated={true}
                className='skeleton-slide'
              ></IonSkeletonText>
            </div>
            <IonSkeletonText
              animated={true}
              className='skeleton-card'
            ></IonSkeletonText>
            <IonSkeletonText
              animated={true}
              className='skeleton-card-tool'
            ></IonSkeletonText>
            <IonSkeletonText
              animated={true}
              className='skeleton-card-tool'
            ></IonSkeletonText>
            <IonSkeletonText
              animated={true}
              className='skeleton-card-tool'
            ></IonSkeletonText>
          </div>
        </IonContent>
      </Fragment>
    );
  };

  const renderHOME_LOADED = () => {
    return (
      <Fragment>
        <Header
          user={user!}
          onMenuClick={showMenuHandler}
          onSlideClick={(slider) => onSlideClickHandler(slider, swiper)}
          activeTasks={activeTasks}
          activeTools={activeTools}
          activeNews={activeNews}
        ></Header>
        <IonContent style={welcomeBackground}>
          <Swiper
            onInit={onGetSwiperHandler}
            initialSlide={0}
            speed={400}
            onSlideChange={(e) => setSlideStates(e.activeIndex)}
          >
            <SwiperSlide className='tasks-slide'>{/* ALL TASKS */}</SwiperSlide>
            <SwiperSlide className='news-slide'>
              <NewsContent />
            </SwiperSlide>
            <SwiperSlide className='tools-slide'>
              {/* ALL TOOLS CARD ARE INSIDE THIS SLIDE */}
            </SwiperSlide>
          </Swiper>
        </IonContent>
      </Fragment>
    );
  };

  const renders: Record<typeof mode, any> = {
    INITIAL_STATE: renderINITIAL_STATE,
    HOME_LOADED: renderHOME_LOADED,
  };

  return (
    <IonPage className={`root-page ${mode.replace(/_/gi, '-').toLowerCase()}`}>
      {(() => {
        if (!renders[mode]) {
          return <div>{mode}</div>;
        }
        return renders[mode]();
      })()}
      {user ? (
        <UserMenu
          userInfo={user!}
          onClose={onCloseMenuHandler}
          isOpen={menu_is_open}
        />
      ) : null}
    </IonPage>
  );
};

export default RootHomePage;
