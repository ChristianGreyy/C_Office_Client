export interface StoreColumn {
  key: React.Key;
  no: number;
  name: string;
  store_code: string;
  address: string;
  phone: string;
  opening_hour: string;
  onEdit: () => void;
}
export interface StoreData {
  count: number;
  limit: number;
  data: StoreColumn[];
}
export interface OpeningHourData {
  [x: string]: OpeningHourDetail;
}
export interface StorePayload {
  name: string;
  // store_code: string;
  address: string;
  block_no: string;
  unit_no: string;
  lat: number;
  lng: number;
  phone: string;
  opening_hour?: {
    isAllWeek: boolean;
    openingHourData: OpeningHourData;
  };
  timezone: number;
}
export interface OpeningHourDetail {
  openHour: string;
  closeHour: string;
  timezone: number;
  isOpen?: boolean;
}
export interface StoreDetail {
  id: number;
  name: string;
  lat: number;
  lng: number;
  store_code: string;
  address: string;
  block_no: string;
  unit_no: string;
  phone: string;
  opening_hour?: {
    isAllWeek: boolean;
    openingHourData: OpeningHourData;
  };
  merchant_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreDetailRoot {
  success: boolean;
  code: number;
  data: StoreDetail;
  message: string;
}
