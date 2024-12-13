export interface ReceiverData {
    name: string;
    received: number;
    toGet: number;
    upi: string;
    user: userType;
    user_id: string;
  }
  
  export interface UserDataTypes {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    token: string;
    is_verified: boolean;
    country_code: string;
    default_currency: string;
    join_date: string;
    phone: string;
    otp: string;
    fcm_token: string;
    device_id: string;
    os: string;
    user_avatar: string;
    invited_by: string;
    invite_code: string;
    googleToken: string;
    upi_id: string;
  }
  
  export interface userType {
    _id: string;
    phone: string;
    first_name: string;
    last_name: string;
    user_avatar: string;
    // UPI id to be added here or in settlement
  }
  
  export interface SystemMessage {
    expense_id: string;
    actions: SystemActionButton[];
    read_receipts: ReadReceipt[];
    redirectionUrl: string;
    text: string;
    isSystemMessage: boolean;
    expense_name: string;
    user: any;
    group_id: string;
    meta: any; // {version: number}
    createdAt: number;
    systemMessageId: string;
    notification_type: string;
    _id: string;
  }
  
  export interface SystemActionButton {
    action_visible: boolean;
    action_name: string;
    action_type: string;
    // action_allowed: string; // id of the creator of the expense
    users_allowed: string[]; // ids of the users allowed to perform the action
  }
  
  export interface ReadReceipt {
    userId: string;
    readTime: number;
  }
  
  // const  instantExpense  = {
  //   "collection_name": "adding 60",
  //   "bill_category": "General",
  //   "items": [
  //       {
  //           "description": "adding 60",
  //           "price": 60,
  //           "belongs_to": [
  //               {
  //                   "user_id": "633ea84b25f6c9035aa857a3",
  //                   "paid_value": 20,
  //                   "share_value": 15,
  //                   "share_unit": 0,
  //                   "dummy_user_id": null
  //               },
  //               {
  //                   "user_id": "636f9fd0df6561c4bcad6aaa",
  //                   "paid_value": 20,
  //                   "share_value": 15,
  //                   "share_unit": 0,
  //                   "dummy_user_id": null
  //               },
  //               {
  //                   "user_id": "652285dec17e9d33bcb39caf",
  //                   "paid_value": 10,
  //                   "share_value": 15,
  //                   "share_unit": 0,
  //                   "dummy_user_id": null
  //               },
  //               {
  //                   "user_id": "6291ed88b7239ce9863bb20d",
  //                   "paid_value": 10,
  //                   "share_value": 15,
  //                   "share_unit": 0,
  //                   "dummy_user_id": null
  //               }
  //           ],
  //           "item_category": "entertainment",
  //           "itemized_bill": false,
  //           "vendor": "0",
  //           "split_type": "amount",
  //           "created_date": "2024-04-08T11:27:30.509000",
  //           "image_id": "",
  //           "vendor_items": [],
  //           "List": []
  //       }
  //   ],
  //   "shares": [
  //       {
  //           "user_id": "633ea84b25f6c9035aa857a3",
  //           "user": {
  //               "_id": "633ea84b25f6c9035aa857a3",
  //               "phone": "6123456179",
  //               "first_name": "rahul",
  //               "last_name": "122",
  //               "user_avatar": "Men02"
  //           },
  //           "paid_share": 20,
  //           "owed_share": 15,
  //           "dummy_user_id": null
  //       },
  //       {
  //           "user_id": "636f9fd0df6561c4bcad6aaa",
  //           "user": {
  //               "_id": "636f9fd0df6561c4bcad6aaa",
  //               "phone": "6123456903",
  //               "first_name": "Avi",
  //               "last_name": "903",
  //               "user_avatar": "women02"
  //           },
  //           "paid_share": 20,
  //           "owed_share": 15,
  //           "dummy_user_id": null
  //       },
  //       {
  //           "user_id": "652285dec17e9d33bcb39caf",
  //           "user": {
  //               "_id": "652285dec17e9d33bcb39caf",
  //               "phone": "6123456183",
  //               "first_name": "Abhishek",
  //               "last_name": "test",
  //               "user_avatar": "men03"
  //           },
  //           "paid_share": 10,
  //           "owed_share": 15,
  //           "dummy_user_id": null
  //       },
  //       {
  //           "user_id": "6291ed88b7239ce9863bb20d",
  //           "user": {
  //               "_id": "6291ed88b7239ce9863bb20d",
  //               "phone": "6123456874",
  //               "first_name": "Ankur",
  //               "last_name": "test",
  //               "user_avatar": ""
  //           },
  //           "paid_share": 10,
  //           "owed_share": 15,
  //           "dummy_user_id": null
  //       }
  //   ],
  //   "expense_date": "2024-04-08T11:28:26.885000",
  //   "deleted": false,
  //   "expense_hash": "d56d7e3324e6228deb482cb6",
  //   "lock_modify": null,
  //   "due_date": null,
  //   "source": "app",
  //   "beneficiary_id": null,
  //   "payout_meta": null,
  //   "created_time": "2024-04-08T11:28:28.018000",
  //   "updated_time": "2024-04-08T11:28:28.018000",
  //   "created_by": "633ea84b25f6c9035aa857a3",
  //   "updated_by": "633ea84b25f6c9035aa857a3",
  //   "group_id": null,
  //   "settlements": [
  //       {
  //           "settlement_id": "6613d4f430a2637b38b0436a",
  //           "user_id": "633ea84b25f6c9035aa857a3",
  //           "friend_id": "633ea84b25f6c9035aa857a3",
  //           "value": 5,
  //           "created_time": "2024-04-08T11:28:52.780000",
  //           "behalf_users": [
  //               "652285dec17e9d33bcb39caf"
  //           ],
  //           "payment_type": "cash",
  //           "payout_done": null,
  //           "is_valid": true
  //       }
  //   ],
  //   "shares_graph": {
  //       "633ea84b25f6c9035aa857a3": {
  //           "user_id": "633ea84b25f6c9035aa857a3",
  //           "owes_to": [],
  //           "owed_by": [
  //               {
  //                   "user_id": "6291ed88b7239ce9863bb20d",
  //                   "value": 5,
  //                   "amount": 5
  //               }
  //           ],
  //           "total_balance": 5
  //       },
  //       "6291ed88b7239ce9863bb20d": {
  //           "user_id": "6291ed88b7239ce9863bb20d",
  //           "owes_to": [
  //               {
  //                   "user_id": "633ea84b25f6c9035aa857a3",
  //                   "value": 5,
  //                   "amount": 5
  //               }
  //           ],
  //           "owed_by": [],
  //           "total_balance": -5
  //       },
  //       "636f9fd0df6561c4bcad6aaa": {
  //           "user_id": "636f9fd0df6561c4bcad6aaa",
  //           "owes_to": [],
  //           "owed_by": [
  //               {
  //                   "user_id": "652285dec17e9d33bcb39caf",
  //                   "value": 5,
  //                   "amount": 5
  //               }
  //           ],
  //           "total_balance": 5
  //       }
  //   },
  //   "instant_new": true,
  //   "instant": true,
  //   "unsettled_users": [
  //       "6291ed88b7239ce9863bb20d"
  //   ],
  //   "settled": false,
  //   "payout_done": null,
  //   "_id": "6613d4dcb12717c77a8a87f8",
  //   "group_info": null,
  //   "payment_info": null,
  //   "recurring_expense_id": null
  // }
  
  export interface InstantExpenseType {
    collection_name: string;
    bill_category: string;
    items: Item[];
    shares: Share[];
    expense_date: string;
    deleted: boolean;
    expense_hash: string;
    lock_modify: null;
    due_date: null;
    source: string;
    beneficiary_id: null;
    payout_meta: null;
    created_time: string;
    updated_time: string;
    created_by: string;
    updated_by: string;
    group_id: null;
    settlements: Settlement[];
    shares_graph: SharesGraph;
    instant_new: boolean;
    instant: boolean;
    unsettled_users: string[];
    settled: boolean;
    payout_done: null;
    _id: string;
    group_info: null;
    payment_info: null;
    recurring_expense_id: null;
  }
  
  export interface Item {
    description: string;
    price: number;
    belongs_to: BelongsTo[];
    item_category: string;
    itemized_bill: boolean;
    vendor: string;
    split_type: string;
    created_date: string;
    image_id: string;
    vendor_items: any[];
    List: any[];
  }
  
  export interface BelongsTo {
    user_id: string;
    paid_value: number;
    share_value: number;
    share_unit: number;
    dummy_user_id: null;
  }
  
  export interface Share {
    user_id: string;
    user: User;
    paid_share: number;
    owed_share: number;
    dummy_user_id: null;
  }
  
  export interface User {
    _id?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    user_avatar?: string;
  }
  
  export interface Settlement {
    settlement_id: string;
    user_id: string;
    friend_id: string;
    value: number;
    created_time: string;
    behalf_users: string[];
    payment_type: string;
    payout_done: null;
    is_valid: boolean;
  }
  
  export interface SharesGraph {
    [key: string]: {
      user_id: string;
      owes_to: any[];
      owed_by: OwedBy[];
      total_balance: number;
    };
  }
  
  export interface OwedBy {
    user_id: string;
    value: number;
    amount: number;
  }
  
  export interface SystemMessage {
    expense_id: string;
    actions: SystemActionButton[];
    read_receipts: ReadReceipt[];
    redirectionUrl: string;
    text: string;
    isSystemMessage: boolean;
    expense_name: string;
    user: any;
    group_id: string;
    meta: any; // {version: number}
    createdAt: number;
    systemMessageId: string;
    notification_type: string;
    _id: string;
  }
  
  export interface SystemActionButton {
    action_visible: boolean;
    action_name: string;
    action_type: string;
    // action_allowed: string; // id of the creator of the expense
    users_allowed: string[]; // ids of the users allowed to perform the action
  }
  
  export interface ReadReceipt {
    userId: string;
    readTime: number;
  }
  
  export interface ReceiverData {
    name: string;
    received: number;
    toGet: number;
    upi: string;
    user: userType;
    user_id: string;
  }
  
  const message = {
    systemMessageId: '',
    read_receipts: [
      {
        userId: '627b41a49659f0529c0f9d7b',
        readTime: 1719993931802,
      },
      {
        userId: '636f9fd0df6561c4bcad6aaa',
        readTime: 1719993930013,
      },
    ],
    redirectionUrl: '',
    text: '9431210691',
    group_id: '667d5d701ef92487a85fe21a',
    isSystemMessage: false,
    meta: {},
    createdAt: 1719993931802,
    user: {
      _id: '627b41a49659f0529c0f9d7b',
      avatar: 'men02',
      name: 'Avi',
    },
    notification_type: 'comment',
    _id: 'UI4NL1Qn9iYiy1SHSPWm',
  };
  export interface GroupMessageType {
    systemMessageId?: string;
    read_receipts?: ReadReceipt[];
    redirectionUrl?: string;
    text?: string;
    group_id?: string;
    isSystemMessage?: boolean;
    meta?: any;
    createdAt?: number;
    user?: MessageUser;
    notification_type?: string;
    _id: string;
  }
  
  export interface ReadReceipt {
    userId: string;
    readTime: number;
  }
  
  export interface MessageUser {
    _id: string;
    avatar: string;
    name: string;
  }
  
  export interface GroupDataType {
    group_name: string;
    users: userType[];
    group_type: string;
    custom_categories: any[];
    settings: {
      simplify_debts: boolean;
    };
    created_time: string;
    updated_time: string;
    created_by: string;
    updated_by: string;
    ledger: Ledger[];
    deleted: boolean;
    balances: Balance[];
    imported: boolean;
    initial_expenses: any[];
    shares_graph: SharesGraph;
    admin: string[];
    _id: string;
  }
  
  export interface IGroupResponse extends GroupDataType {
  
  };
  
  export interface Ledger {
    user_id: string;
    paid: number;
    owed: number;
    settlement_got: number;
    settlement_paid: number;
    opening_balance: number;
    recurring_spends: any;
  }
  
  export interface Balance {
    user_id: string;
    owes_to: OwesTo[];
    owed_by: OwedBy[];
    total_balance: number;
  }
  
  export interface OwesTo {
    user_id: string;
    value: number;
    amount: number;
  }
  
  export interface OwedBy {
    user_id: string;
    value: number;
    amount: number;
  }
  
  export interface GroupContextType {
    getGroupData: (groupId: string) => Promise<void>;
    updateGroupData: (groupId: string, data: GroupDataType) => Promise<void>;
    groupData: GroupDataType | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface GroupProviderProps {
    children: React.ReactNode;
  }
  
  export interface GroupContextType {
    getGroupData: (groupId: string) => Promise<void>;
    updateGroupData: (groupId: string, data: GroupDataType) => Promise<void>;
    groupData: GroupDataType | null;
    loading: boolean;
    error: string | null;
  }
  
  export type SummaryTypeType =
    | 'paid_share'
    | 'owed_share'
    | 'money_paid'
    | 'money_received';
  
  export interface SubscriptionPlanGooglePlayType {
    subscriptionOfferDetails: SubscriptionOfferDetail[];
    name: string;
    productType: string;
    description: string;
    title: string;
    productId: string;
    platform: string;
  }
  
  export interface SubscriptionOfferDetail {
    pricingPhases: PricingPhases;
    offerToken: string;
    offerTags: any[];
    offerId: null;
    basePlanId: string;
  }
  
  export interface PricingPhases {
    pricingPhaseList: PricingPhaseList[];
  }
  
  export interface PricingPhaseList {
    recurrenceMode: number;
    priceAmountMicros: string;
    billingCycleCount: number;
    billingPeriod: string;
    priceCurrencyCode: string;
    formattedPrice: string;
  }
  
  // GROUP SUMMARY
  export interface SummaryResponseItemType  {
    group_id: string;
    expense: {
      created_date: string;
      amount: number;
      expense_id: string;
    };
    settlement: any;
  };
  
  export interface  SummaryResponseSumType {
    group_id: string;
    currency: string;
    paid_share: number;
    owed_share: number;
    money_paid: number;
    money_received: number;
  };
  
  export interface  ITotalGroupSpending {
    individual_spending: {
      user_id: string;
      individual_total_spending: number;
    }[];
    total_paid_share_sum: number;
  };