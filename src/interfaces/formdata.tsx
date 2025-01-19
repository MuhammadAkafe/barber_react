import dayjs from 'dayjs';

export default interface RoleData {
  userID: string | number;
  userName: string;
  date: dayjs.Dayjs |null | string;
  phoneNumber: string;
  city: string;
  barber: string;
  roleFor: string;
}

export interface Props {
    formdata: RoleData;
    handleSelectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }