import React, { Fragment, useState } from "react";
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import { XText } from "@ramenx/ui-library";
import { i18 } from "@team_eureka/eureka-ionic-core";
import yogurt from "../../../../../assets/image/yogurt.jpeg";
import shop from "../../../../../assets/media/shop.svg";
import "./index.sass";
import { IProduct } from "../../../../../models/IProduct";
import locales from "./locales";
import moment from "moment";
import { chevronDown, chevronUp } from "ionicons/icons";

const localize = i18(locales);

interface IProps {
  product: IProduct;
  onClick?: Function;
  expandable?: boolean;
  displayResumee?: boolean;
}

const Product: React.FC<IProps> = (props) => {
  const { product, onClick } = props;

  const [showMore, setShowMore] = useState<boolean>();

  const roundNumber = (value: string | undefined) => {
    const rounded = Math.round(Number(value));
    if (Number.isNaN(rounded)) {
      return "";
    } else {
      return rounded.toString();
    }
  };

  return (
    <Fragment>
      <IonItem className="product" onClick={() => onClick && onClick(product)}>
        <IonGrid>
          <IonRow>
            <IonCol size="3">
              <IonThumbnail>
                <img src={yogurt} alt={props.product.description} />
              </IonThumbnail>
            </IonCol>
            <IonCol>
              <IonRow>
                <span className="product-store">
                  <IonIcon icon={shop} />
                  {product.shop}
                </span>
              </IonRow>
              <IonRow>
                <XText level="11" weight="bold">
                  {product.description}
                </XText>
              </IonRow>
              <IonRow>
                <XText level="11" background="#0000004D">
                  {`${product.unit_of_meansure} · ${product.ean}`}
                </XText>
              </IonRow>
              <IonRow>
                <XText level="11" weight="bold">
                  {`${localize("STOCK_NRT", "")}: ${product.stock_nrt}`}
                </XText>
              </IonRow>
            </IonCol>
          </IonRow>
          {props.displayResumee && (
            <IonRow className="resume-container">
              <IonCol size="2">
                  <XText level="7" emoji="👀"></XText>
              </IonCol>
              <IonCol>
                <XText level="11" weight="bold" background="#ffffff">
                  {`El shopper solo encontró ${product.units_found} de ${product.units_requested} unidades solicitadas`}
                </XText>
              </IonCol>
            </IonRow>
          )}
          {props.expandable && showMore && (
            <IonRow>
              <IonRow className="details-container">
                <IonCol>
                  <XText level="11" background="rgba(0, 0, 0, 0.6)">
                    {localize("ARTICLE", "")}
                  </XText>
                  <XText
                    level="10"
                    background="rgba(0, 0, 0, 0.8)"
                    weight="bold"
                  >
                    {product.article_number || "-"}
                  </XText>
                  <XText level="11" background="rgba(0, 0, 0, 0.6)">
                    {localize("PROVIDER", "")}
                  </XText>
                  <XText
                    level="10"
                    background="rgba(0, 0, 0, 0.8)"
                    weight="bold"
                  >
                    {product.provider || "-"}
                  </XText>
                  <XText level="11" background="rgba(0, 0, 0, 0.6)">
                    {localize("BRAND", "")}
                  </XText>
                  <XText
                    level="10"
                    background="rgba(0, 0, 0, 0.8)"
                    weight="bold"
                  >
                    {product.brand || "-"}
                  </XText>
                </IonCol>
                <IonCol>
                  <XText level="11" background="rgba(0, 0, 0, 0.6)">
                    {localize("PRE_ROOT_CAUSE", "")}
                  </XText>
                  <XText
                    level="10"
                    background="rgba(0, 0, 0, 0.8)"
                    weight="bold"
                  >
                    {product.pro_origin_cause || "-"}
                  </XText>
                  <XText level="11" background="rgba(0, 0, 0, 0.6)">
                    {localize("BLOCK_TYPE", "")}
                  </XText>
                  <XText
                    level="10"
                    background="rgba(0, 0, 0, 0.8)"
                    weight="bold"
                  >
                    {product.block_type || "-"}
                  </XText>
                  <XText level="11" background="rgba(0, 0, 0, 0.6)">
                    {localize("AVERAGE_SALE", "")}
                  </XText>
                  <XText
                    level="10"
                    background="rgba(0, 0, 0, 0.8)"
                    weight="bold"
                  >
                    {roundNumber(product.average_sale) || "-"}
                  </XText>
                </IonCol>
              </IonRow>
              <IonRow className="details-container">
                <XText level="11" background="rgba(0, 0, 0, 0.6)">
                  {localize("LAST_RECEPTION", "")}
                </XText>
                <XText level="10" background="rgba(0, 0, 0, 0.8)" weight="bold">
                  {(product.last_reception_date &&
                    moment(product.last_reception_date).format(
                      "dd DD MMMYYYY · hh:MM [hrs]"
                    )) ||
                    "-"}
                </XText>
              </IonRow>
              <IonRow className="details-container">
                <XText level="10">{localize("ORDER", "")}</XText>
                <IonCol>
                  <XText level="11" background="rgba(0, 0, 0, 0.6)">
                    {localize("TRANSIT_STOCK", "")}
                  </XText>
                  <XText
                    level="10"
                    background="rgba(0, 0, 0, 0.8)"
                    weight="bold"
                  >
                    {roundNumber(product.transit_stock) || "-"}
                  </XText>
                </IonCol>
                <IonCol>
                  <XText level="11" background="rgba(0, 0, 0, 0.6)">
                    {localize("TRANSIT_STOCK_DATE", "")}
                  </XText>
                  <XText
                    level="10"
                    background="rgba(0, 0, 0, 0.8)"
                    weight="bold"
                  >
                    {product.transit_stock_date || "-"}
                  </XText>
                </IonCol>
              </IonRow>
            </IonRow>
          )}
        </IonGrid>
      </IonItem>
      {props.expandable && (
        <div className="show-more-container">
          <div className="divider"> </div>
          <IonIcon
            size="large"
            onClick={() => {
              setShowMore(!showMore);
            }}
            icon={showMore ? chevronUp : chevronDown}
          />
        </div>
      )}
    </Fragment>
  );
};

export default Product;
