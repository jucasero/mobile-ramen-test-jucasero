import { useEffect, useState } from "react";
import { IonPage, IonContent, IonList, IonModal, useIonToast, IonTextarea, IonButton, IonItem } from "@ionic/react";
import { useHistory } from "react-router";
import { XButton } from "@ramenx/ui-library";
import { i18 } from "@team_eureka/eureka-ionic-core";
import "./index.sass";
import { ITask } from "../../../../../models/ITasks/ITask";
import { ICategory } from "../../../../../models/ITasks/ICategory";
import { IProduct } from "../../../../../models/ITasks/IProduct";
import TaskHeader from "../../components/task-header";
import { ProductSkeleton } from "../../../../../components/loaders";
import Product from "../../components/product/product";
import { useFetch, useModal } from "../../../../../hooks";
import MerchandiseReceptionClient from "../../../../../clients/MerchandiseReceptionClient";
import { routes } from "../../../../../constants";
import locales from "./locales";
import "./index.sass";

interface ILocationState {
  productCategory: ICategory;
  merchandise_reception: ITask;
}

// Merchandise reception products list
const Products: React.FC = () => {
  const localize = i18(locales);
  const history = useHistory<ILocationState>();
  const locationState = history.location.state;
  const productCategory: ICategory = locationState.productCategory || {};
  const [getProductsByCategory, products, isLoading] = useFetch(MerchandiseReceptionClient.getProductsByCategory(productCategory.type));
  const { isShowing, toggle } = useModal();
  const [name, setName] = useState("");
  const [present] = useIonToast();

  const presentToast = (position: "top" | "middle" | "bottom", message: string) => {
    present({
      message,
      duration: 2000,
      position: position,
      color: "medium",
    });
  };

  useEffect(() => {
    if (!locationState) history.replace("/");
  }, [history, locationState]);

  useEffect(() => {
    getProductsByCategory();
  }, []);

  const renderLoadingProducts = () => <ProductSkeleton qtyProducts={productCategory.total} />;

  const renderProductsList = () => (
    <IonList>
      {products?.map((product: IProduct) => (
        <Product
          key={product.id}
          product={product}
          onClick={() => {
            setName("modal-product");
            toggle();
          }}
        />
      ))}
    </IonList>
  );

  const renderProduct = () => {
    return (
      <div className="modal-container">
        <p className="modal-close-button" onClick={toggle}>
          x
        </p>

        <h1 className="modal-title">{localize("PRODUCT_TITLE", "")}</h1>

        {/* TODO */}

        <div className="modal-circle-container">
          <div className="modal-circle">
            <p className="modal-circle-text-1">Llegaron</p>
            <p className="modal-circle-text-2">100 cajas</p>
            <p className="modal-circle-text-3">Hace 28:07:50</p>
          </div>
        </div>

        <div className="modal-product-card">{products && <Product key={"1"} product={products[0]} onClick={toggle} />}</div>

        <XButton size="large" onClick={finishTask}>
          {localize("PRODUCT_FINISH_BUTTON", "")}
        </XButton>

        <p className="product-problem-link" onClick={productProblem}>
          {localize("PROBLEM_LINK", "")}
        </p>
      </div>
    );
  };

  const renderProblem = () => {
    return (
      <div className="modal-problem-container">
        <p className="modal-close-button" onClick={toggle}>
          x
        </p>

        <h1 className="modal-title">{localize("PROBLEM_TITLE", "")}</h1>

        <div className="modal-button-container">
          <IonButton color="light" shape="round">
            {localize("NO_ARRIVED", "")}
          </IonButton>
          <IonButton color="light" shape="round">
            {localize("ARRIVED_INCOMPLETED", "")}
          </IonButton>
        </div>

        <IonItem>
          <IonTextarea className="modal-textarea" placeholder="Deja algún comentario"></IonTextarea>
        </IonItem>

        <XButton background="black" size="large" onClick={finishTask}>
          {localize("PROBLEM_TITLE", "")}
        </XButton>
      </div>
    );
  };

  const finishTask = () => {
    toggle();

    setTimeout(() => presentToast("bottom", "Recepción gestionada"), 500);
  };

  const productProblem = () => {
    setName("");
  };

  return (
    <IonPage>
      <TaskHeader title={productCategory.title} backRoute={routes.merchandiseReception} data={locationState.merchandise_reception} />
      <IonContent className="ion-padding">{isLoading ? renderLoadingProducts() : renderProductsList()}</IonContent>

      <IonModal isOpen={isShowing} className="modal">
        {name === "modal-product" ? renderProduct() : renderProblem()}
      </IonModal>
    </IonPage>
  );
};

export default Products;
