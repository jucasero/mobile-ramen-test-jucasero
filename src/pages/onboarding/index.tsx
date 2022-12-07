import "./index.sass";
import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";
import React, { useEffect, useState } from "react";
import { IonContent, IonFooter, IonImg, IonPage } from "@ionic/react";
import {
  Expr,
  SettingsClient,
  XConsole,
  i18,
} from "@team_eureka/eureka-ionic-core";
import { Geolocation } from "@capacitor/geolocation";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import locales from "./locales";
import AppWelcomeBackground from "./../../assets/media/app-welcome-bg.svg";
import AppWelcomeImage from "./../../assets/media/app-welcome-img.svg";
import OnboardingGpsImage from "./../../assets/media/onboarding-gps.svg";
import OnboardingNotification from "./../../assets/media/onboarding-notification.svg";

// RAMEN componentes library
import { XGrid, XSpace, XText, XButton, XImage } from "@ramenx/ui-library";
import PushNotificationsClient from "../../clients/PushNotificationsClient";

const cencosudx = XConsole({ label: "Onboarding-page" });
const localize = i18(locales);
const colorGray = "rgba(0,0,0,0.6)";
const style = { backgroundImage: `url(${AppWelcomeBackground})` };

interface IProps {
  onBoardingCompleted: () => void;
}

const OnBoardingPage: React.FC<IProps> = (props) => {
  const [swiper, setSwiper] = useState<any>();
  const [slideState, setSlideStates] = useState<Number>(0);
  const [mode, setModeState] = useState<"WELCOME" | "GPS" | "NOTIFICATIONS">(
    "WELCOME"
  );
  const [buttonText, setButtonState] = useState(localize("welcome_button", ""));
  const [gpsState, setGPSState] = useState<boolean>();
  const [pushNotificationState, setPushNotificationState] = useState<boolean>();

  useEffect(() => {
    console.log("Onboarding", slideState);
  }, [slideState]);

  useEffect(() => {
    console.log("Onboarding", mode);
  }, [mode]);

  const onGetSwiperHandler = (e: any) => {
    setSwiper(e);
  };

  const onEndOndboarding = async () => {
    await SettingsClient.set("FIRST_TIME", false);
    props.onBoardingCompleted();
  };

  const onChangeHandler = () => {
    setButtonState(localize("gps_button", ""));
    setModeState("GPS");
    swiper!.slideNext();
  };

  const onPushNotificationsHandler = async () => {
    await PushNotificationsClient.checkPermissions(onEndOndboarding);
    Expr.whenNotInNativePhone(() => {
      onEndOndboarding();
    });
  };

  const onEnableGPSHandler = async () => {
    try {
      const permissionState = await Geolocation.checkPermissions();
      Expr.whenNotInNativePhone(async () => {
        setGPSState(true);
        setModeState("NOTIFICATIONS");
        setButtonState(localize("notification_button", ""));
        swiper!.slideNext();
        return;
      });
      Expr.whenAndroid(async () => {
        //In Android we have 2 states
        switch (permissionState.location) {
          case "granted":
            setGPSState(true);
            setModeState("NOTIFICATIONS");
            setButtonState(localize("notification_button", ""));
            swiper!.slideNext();
            break;
          case "prompt" || "denied":
            try {
              const granted = await Geolocation.requestPermissions!();
            } catch (error) {
              cencosudx.error(error);
            }
            // Call again to check the authorization
            setTimeout(onEnableGPSHandler, 500);
            break;
          case "prompt-with-rationale":
            setGPSState(false);
            setModeState("NOTIFICATIONS");
            setButtonState(localize("notification_button", ""));
            swiper!.slideNext();
            break;
        }
      });

      Expr.whenIos(async () => {
        // In Ios we have 3 states
        switch (permissionState.location) {
          case "granted":
            setGPSState(true);
            setModeState("NOTIFICATIONS");
            setButtonState(localize("notification_button", ""));
            swiper!.slideNext();
            break;
          case "denied":
            setGPSState(false);
            setModeState("NOTIFICATIONS");
            setButtonState(localize("notification_button", ""));
            swiper!.slideNext();
            break;
          case "prompt":
            // Take a picture to request authorization
            try {
              await Geolocation.getCurrentPosition();
            } catch (error) {
              cencosudx.error(error);
            }
            // Call again to check the authorization
            setTimeout(onEnableGPSHandler, 500);
            break;
        }
      });
    } catch (error) {}
  };

  const onContinueHandler = async () => {
    switch (slideState) {
      case 0: {
        onChangeHandler();
        break;
      }
      case 1: {
        onEnableGPSHandler();
        break;
      }
      case 2: {
        onPushNotificationsHandler();
        break;
      }
    }
  };

  return (
    <IonPage style={style}>
      <IonContent>
        {/* Swiper slide with three screen with a dummy header imagen and dummy text
        -- Change text on 'locales' folder */}
        <Swiper
          onInit={onGetSwiperHandler}
          initialSlide={0}
          speed={400}
          onSlideChange={(e) => setSlideStates(e.activeIndex)}
        >
          <SwiperSlide className="onboarding">
            <div className="content-welcome">
              <XSpace level="4" />
              <IonImg src={AppWelcomeImage} />
              <XGrid type="column" justify="center">
                <XText level="9" leading="title" background={colorGray}>
                  {localize("welcome_title", "")}
                </XText>
                <XText level="4" leading="title" background="black">
                  {localize("welcome_description", "")}
                </XText>
              </XGrid>
            </div>
          </SwiperSlide>
          <SwiperSlide className="onboarding">
            <div className="content-gps">
              <XSpace level="4" />
              <XImage src={OnboardingGpsImage} width="75" />
              <XSpace level="4" />
              <XGrid type="column" justify="center">
                <XText level="4" leading="title" background="black">
                  {localize("gps_title", "")}
                </XText>
                <XText level="9" leading="title" background={colorGray}>
                  {localize("gps_description", "")}
                </XText>
              </XGrid>
            </div>
          </SwiperSlide>
          <SwiperSlide className="onboarding">
            <div className="content-notifications">
              <XSpace level="4" />
              <XImage src={OnboardingNotification} width="75" />
              <XSpace level="4" />
              <XGrid type="column" justify="center">
                <XText level="4" leading="title" background="black">
                  {localize("notification_title", "")}
                </XText>
                <XText level="9" leading="title" background={colorGray}>
                  {localize("notification_description", "")}
                </XText>
              </XGrid>
            </div>
          </SwiperSlide>
        </Swiper>
      </IonContent>
      <IonFooter>
        <XButton
          background="black"
          size="xlarge"
          onClick={() => {
            onContinueHandler();
          }}
        >
          {buttonText}
        </XButton>
      </IonFooter>
    </IonPage>
  );
};

export default OnBoardingPage;
