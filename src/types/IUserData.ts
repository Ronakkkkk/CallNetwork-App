export interface IUserData {
  _id: string;
  points: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  countryCode: string;
  spamCount: number;
  verifiedCount: number;
  contactsCount: number;
  isVerified: boolean;
  accountType: string;
  activity: {
    spamReportCount: number;
    addContactCount: number;
    verifyContactCount: number;
  };
}
