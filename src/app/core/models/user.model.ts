export interface UserModel {
  address: UserAddressModel;
  id: number;
  email: string;
  username: string;
  name: UserNameModel;
  phone: string;
}

export interface UserAddressModel {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface GeolocationModel {
  lat: string;
  long: string;
}

export interface UserNameModel {
  firstname: string;
  lastname: string;
}
