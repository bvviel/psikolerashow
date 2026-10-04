export type SectorId = 'pista' | 'premium' | 'camarote';

export type ModalityType = 'meia' | 'social' | 'inteira';

export interface SectorOption {
  id: SectorId;
  name: string;
  badge: string;
  badgeType: 'default' | 'popular' | 'vip';
  description: string;
  prices: {
    meia: number;
    social: number;
    inteira: number;
  };
  features: string[];
  maxStock: number;
}

export interface SelectedTicket {
  sectorId: SectorId;
  modality: ModalityType;
  quantity: number;
  unitPrice: number;
}

export interface BandMember {
  id: string;
  number: string;
  name: string;
  role: string;
  tag: string;
  tagColor: string;
  style: string;
  shortDesc: string;
  fullBio: string;
  gear: string[];
  image: string;
  soundType: 'vocal' | 'drums' | 'guitar' | 'bass' | 'synth';
}

export interface MerchItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  tag?: string;
  description: string;
  sizes?: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  type: 'ticket' | 'merch';
  detail?: string;
}

export interface DigitalPassData {
  orderId: string;
  holderName: string;
  documentId: string;
  sectorName: string;
  modalityName: string;
  gate: string;
  entryTime: string;
  pricePaid: number;
  timestamp: string;
  qrPayload: string;
}
