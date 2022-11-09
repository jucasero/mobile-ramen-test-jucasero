import "./index.sass";
import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonTextarea,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { i18 } from "@team_eureka/eureka-ionic-core";
import locales from "./locales";
import { Fragment, useEffect, useRef, useState } from "react";
import { arrowBack, checkmark, close } from "ionicons/icons";
import { XButton, XButtonOption, XText } from "@ramenx/ui-library";
import FoundRateClient from "../../../clients/FoundRateClient";
import Product from "./components/product";
import { IProduct } from "../../../models/IProduct";

const localize = i18(locales);

enum Modes {
  LOADING = "LOADING",
  INITIAL_STATE = "INITIAL_STATE",
  HOME_LOADED = "HOME_LOADED",
  PRODUCT_LOADED = "PRODUCT_LOADED",
}

interface IProps extends RouteComponentProps<{}> {}

const FoundRateProduct: React.FC<IProps> = (props) => {
  const [mode, setMode] = useState<Modes>(Modes.INITIAL_STATE);
  const [products, setProducts] = useState<IProduct[]>();
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [displayOutOfStockCauseModal, setDisplayOutOfStockCauseModal] =
    useState<boolean>(false);
  const [otherSelected, setOtherSelected] = useState<boolean>(false);
  const [otherMotiveText, setOtherMotiveText] = useState<string>();
  const [isInStock, setIsInStock] = useState<boolean>(true);
  const [cause, setCause] = useState<string>("badStockAdjustment");

  const [presentToast] = useIonToast();

  const resetStates = () => {
    setSelectedProduct(undefined);
    setSelectedAnswer(undefined);
    setDisplayOutOfStockCauseModal(false);
    setOtherSelected(false);
    setOtherMotiveText(undefined);
    setIsInStock(true);
    setCause("badStockAdjustment");
  };

  const load = async () => {
    setMode(Modes.LOADING);
    resetStates();
    const products = await FoundRateClient.getFoundRateProducts();
    setProducts(products);
    setMode(Modes.HOME_LOADED);
  };

  useEffect(() => {
    load();
  }, []);

  const modal = useRef<HTMLIonModalElement>(null);

  const finishAlert = async () => {
    try {
      await FoundRateClient.submitFinishAlert(selectedProduct!);
      presentToast({
        message: localize("SUCCESSFULY_MANAGED_ALERT", ""),
        duration: 3000,
        color: "medium",
      });
      load();
    } catch (error: any) {
      presentToast({
        message: error.message,
        duration: 3000,
        color: "danger",
      });
    }
  };

  const submitIsOuttOfStock = () => {
    if (isInStock) {
      submitReplenishProduct();
    } else {
      setDisplayOutOfStockCauseModal(true);
    }
  };

  const submitReplenishProduct = async () => {
    try {
      await FoundRateClient.replenishProduct(selectedProduct!);
      presentToast({
        message: localize("SUCCESSFULY_MANAGED_ALERT", ""),
        duration: 3000,
        color: "medium",
      });
      load();
    } catch (error: any) {
      presentToast({
        message: error.message,
        duration: 3000,
        color: "danger",
      });
    }
  };

  const submitOutOfStockCause = async () => {
    try {
      await FoundRateClient.reportProductOutOfStockCause(
        selectedProduct!,
        cause!,
        otherMotiveText
      );
      modal.current?.dismiss();
      presentToast({
        message: localize("SUCCESSFULY_MANAGED_ALERT", ""),
        duration: 3000,
        color: "medium",
      });
      load();
    } catch (error: any) {
      presentToast({
        message: error.message,
        duration: 3000,
        color: "danger",
      });
    }
  };

  const renderLOADING = () => <IonLoading isOpen={true}></IonLoading>;

  const renderINITIAL_STATE = () => (
    <Fragment>
      <IonHeader>
        <IonToolbar>
          <div className="custom-skeleton">
            <div>
              <IonSkeletonText
                animated={true}
                className="skeleton-avatar"
              ></IonSkeletonText>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="custom-skeleton">
          <div>
            <IonSkeletonText
              animated={true}
              className="skeleton-title"
            ></IonSkeletonText>
            <IonSkeletonText
              animated={true}
              className="skeleton-subtitle"
            ></IonSkeletonText>
          </div>
          <div>
            <IonSkeletonText
              animated={true}
              className="skeleton-stadistic"
            ></IonSkeletonText>
            <IonSkeletonText
              animated={true}
              className="skeleton-slide"
            ></IonSkeletonText>
          </div>
          <IonSkeletonText
            animated={true}
            className="skeleton-card"
          ></IonSkeletonText>
          <IonSkeletonText
            animated={true}
            className="skeleton-card-tool"
          ></IonSkeletonText>
          <IonSkeletonText
            animated={true}
            className="skeleton-card-tool"
          ></IonSkeletonText>
          <IonSkeletonText
            animated={true}
            className="skeleton-card-tool"
          ></IonSkeletonText>
        </div>
      </IonContent>
    </Fragment>
  );

  const renderHOME_LOADED = () => (
    <Fragment>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              className="white"
              onClick={() => props.history.replace(`/`)}
            >
              <IonIcon icon={arrowBack} size="large"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <div className="task-header">
          <XText level="7" weight="bold">
            {localize("TITLE", "")}
          </XText>
        </div>
      </IonHeader>
      <IonContent>
        <IonLabel className="total">
          Quedan <b>{products?.length} items</b> por resolver
        </IonLabel>
        <IonList>
          {products?.map((product: IProduct) => (
            <Product
              key={product.ean}
              product={product}
              onClick={() => {
                setSelectedProduct(product);
                setMode(Modes.PRODUCT_LOADED);
              }}
            />
          ))}
        </IonList>
      </IonContent>
    </Fragment>
  );

  const renderOutOfStockModal = () => (
    <IonModal
      ref={modal}
      className="modal"
      isOpen={displayOutOfStockCauseModal}
      initial-breakpoint={0.75}
      breakpoints={[0.75]}
      handle={false}
      onDidDismiss={() => {
        setDisplayOutOfStockCauseModal(false);
      }}
    >
      <div className="modal-title">
        <XText level="8" weight="bold">
          {localize("OUT_STOCK_CAUSE", "")}
        </XText>
      </div>
      <div className="out-of-stock-causes-container">
        <XButtonOption
          check={cause === "badStockAdjustment"}
          onClick={() => setCause("badStockAdjustment")}
        >
          {localize("BAD_STOCK_ADJUSTMENT", "")}
        </XButtonOption>
        <XButtonOption
          check={cause === "other"}
          onClick={() => {
            setCause("other");
          }}
        >
          {localize("OTHER", "")}
        </XButtonOption>
      </div>
      {cause === "other" ? (
        <Fragment>
          <IonItem>
            <IonTextarea
              value={otherMotiveText}
              onIonChange={(e) => setOtherMotiveText(e.detail.value!)}
              rows={4}
              placeholder={`📄 ${localize("LEAVE_COMMENT", "")}`}
            ></IonTextarea>
          </IonItem>
        </Fragment>
      ) : null}
      <div className="footer-buttom-container">
        <XButton
          onClick={() => submitOutOfStockCause()}
          size="xlarge"
          type="primary"
          boundaries="large"
        >
          {localize("FINISH", "")}
        </XButton>
      </div>
    </IonModal>
  );

  const renderSelectedAnswer = () => {
    if (selectedAnswer === "yes") {
      return (
        <Fragment>
          <div className="yes-container">
            <XText level="10" weight="bold" emoji="🤓">
              {localize("VERIFICATION", "")}
            </XText>
            <ul>
              <li>
                <IonIcon icon={checkmark}></IonIcon>
                <span>{localize("RIGHT_PLACED", "")}</span>
              </li>
              <li>
                <IonIcon icon={checkmark}></IonIcon>
                <span>{localize("RIGHT_CODE", "")}</span>
              </li>
              <li>
                <IonIcon icon={checkmark}></IonIcon>
                <span>{localize("RIGHT_FLEJE", "")}</span>
              </li>
              <li>
                <IonIcon icon={checkmark}></IonIcon>
                <span>{localize("STOCK", "")}</span>
              </li>
            </ul>
          </div>
          <div className="footer-buttom-container">
            <XButton 
              onClick={finishAlert} 
              size="xlarge" 
              type="primary" 
              boundaries="large"
            >
              {localize("READY", "")}
            </XButton>
          </div>
        </Fragment>
      );
    } else if (selectedAnswer === "no") {
      return (
        <Fragment>
          <div className="no-container">
            <XText level="9" weight="bold">
              {localize("IS_IN_STOCK", "")}
            </XText>
            <XButtonOption check={isInStock} onClick={() => setIsInStock(true)}>
              {localize("REPLENISH", "")}
            </XButtonOption>
            <XButtonOption
              check={!isInStock}
              onClick={() => setIsInStock(false)}
            >
              {localize("NO", "")}
            </XButtonOption>
          </div>
          <div className="footer-buttom-container">
            <XButton
              onClick={() => submitIsOuttOfStock()}
              size="xlarge"
              type="primary"
              boundaries="large"
            >
              {isInStock ? localize("FINISH", "") : localize("CONTINUE", "")}
            </XButton>
          </div>
          {renderOutOfStockModal()}
        </Fragment>
      );
    }
  };

  const renderPRODUCT_LOADED = () => (
    <Fragment>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              className="white"
              onClick={() => {
                setMode(Modes.HOME_LOADED);
              }}
            >
              <IonIcon icon={arrowBack} size="large"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="product-details">
          <Product
            product={selectedProduct!}
            expandable
            displayResumee
          ></Product>
        </div>
        <IonGrid className="questiom-container">
          <IonRow>
            <IonCol size="8">
              <XText level="10" weight="bold">
                {localize("IS_IN_GONDOLA", "")}
              </XText>
            </IonCol>
            <IonCol size="2">
              <IonButton
                className={selectedAnswer === "yes" ? "selected" : ""}
                shape="round"
                onClick={() => setSelectedAnswer("yes")}
              >
                <IonIcon icon={checkmark} />
              </IonButton>
            </IonCol>
            <IonCol size="2">
              <IonButton
                className={selectedAnswer === "no" ? "selected" : ""}
                shape="round"
                onClick={() => setSelectedAnswer("no")}
              >
                <IonIcon icon={close} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {renderSelectedAnswer()}
      </IonContent>
    </Fragment>
  );

  const renders: Record<Modes, Function> = {
    [Modes.LOADING]: renderLOADING,
    [Modes.INITIAL_STATE]: renderINITIAL_STATE,
    [Modes.HOME_LOADED]: renderHOME_LOADED,
    [Modes.PRODUCT_LOADED]: renderPRODUCT_LOADED,
  };

  return (
    <IonPage className="task-loss-product">
      {(() => {
        const renderModeFunction = renders[mode];
        return (
          (renderModeFunction && renderModeFunction()) || <div>{mode}</div>
        );
      })()}
    </IonPage>
  );
};

export default FoundRateProduct;
