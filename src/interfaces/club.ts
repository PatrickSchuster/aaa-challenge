export interface IStadium {
  size: number;
  name: string;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IClub {
  id: string;
  name: string;
  country: string;
  value: number;
  image: string;
  european_titles: number;
  stadium: IStadium;
  location: ILocation;
}
