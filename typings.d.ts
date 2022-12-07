export interface InterestsType {
  bank_id: number;
  interest: number;
  time_option: number;
  credit_type: number;
}

export interface BankType {
  id: number;
  bank_name: string;
  interests: InterestsType[] | null;
}
