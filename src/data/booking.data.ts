
export interface BookingDataSet {
  firstname: string;
  lastname: string;
  depositpaid: boolean;
}

export interface BookingTestData extends BookingDataSet {
  description: string;
}

export const bookingTestData: BookingTestData[] = [
  {
    description: 'Standard booking - paid deposit',
    firstname: 'Joseph',
    lastname: 'Brown',
    depositpaid: true,
  },
  {
    description: 'Standard booking - unpaid deposit',
    firstname: 'Maria',
    lastname: 'Garcia',
    depositpaid: false,
  },
];
