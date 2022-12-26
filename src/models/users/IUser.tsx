import { ILink } from '../ILink';

export interface IUser {
  full_name: string;
  alias: string;
  honorific: string;
  document_type: string;
  document_number: string;
  IMEI: string;
  device_token: string;
  primarysid: string;
  email: string;
  billing_address: {
    line1: string;
    city: string;
    country_code: string;
    phone: string;
    type: string;
    recipient_name: string;
  };
  store: string;
  security_pin: string;
  links?: Array<ILink>;
  businessUnit: string;
  avatar: string;
}
