import request from './Request';
export * from './newApi'

export const sendOtpApi = ({data}) => {
  return request({
    data,
    method: 'post',
    endpoint: '/user/otp',
    // log: true,
  });
};

export const loginApi = ({data}) => {
  return request({
    data,
    method: 'post',
    endpoint: '/user/login',
    // log: true,
  });
};

export const createGroup = ({data}) => {
  return request({
    data,
    method: 'post',
    endpoint: '/groups',
    // log: true,
  });
};

export const importGroup = ({data}) => {
  return request({
    data,
    method: 'post',
    endpoint: '/groups/import',
    // log: false,
  });
};

export const getGroup = () => {
  return request({
    method: 'get',
    endpoint: '/groups/get_group',
  });
};

export const getGroupById = ({id}) => {
  return request({
    method: 'get',
    endpoint: `/groups/${id}`,
    // log: true,
  });
};

export const updateGroupByIdApi = ({id, data}) => {
  return request({
    data: data,
    method: 'put',
    endpoint: `/groups/${id}`,
    // log: true,
  });
};

export const addCustomCategoryApi = ({group_id, data}) => {
  return request({
    data: data,
    method: 'post',
    endpoint: `/groups/${group_id}/custom_categories`,
    // log: true,
  });
};

export const getCustomCategoryApi = ({group_id,}) => {
  return request({
    method: 'get',
    endpoint: `/groups/${group_id}/custom_categories`,
    // log: true,
  });
};

export const deleteCustomCategoryApi = ({group_id, category_id}) => {
  return request({
    // data: data,
    method: 'delete',
    endpoint: `/groups/${group_id}/custom_categories/${category_id}`,
    // log: true,
  });
};


export const getTransactionsById = ({id, update, last_updated_time}) => {
  let url = !update
    ? `/groups/${id}/transactions`
    : `/groups/${id}/transactions?last_updated_time=${last_updated_time}`;

  return request({
    method: 'get',
    endpoint: url,
  });
};

export const getImportedExpensesById = ({id}) => {
  return request({
    method: 'get',
    endpoint: `/groups/${id}/imported_expenses`,
    // log: true,
  });
};

export const updateSimplifiedSetting = ({data, id}) => {
  return request({
    data,
    method: 'put',
    endpoint: `/groups/${id}`,
    log: true,
  });
};

export const checkUserNotOnSplitkaro = ({contacts}) => {
  return request({
    data: contacts,
    method: 'post',
    endpoint: `/user/check`,
    // log: true,
  });
};

export const invitedUsers = () => {
  return request({
    method: 'get',
    endpoint: `/user/invited`,
    // log: true,
  });
};

export const getAllScratchCards = () => {
  return request({
    method: 'get',
    endpoint: `/scratch_card`,
    // log: true,
  });
};
export const getSplitkaroCash = () => {
  return request({
    method: 'get',
    endpoint: `/splitkaro_cash`,
    // log: true,
  });
};

export const redeemScratchCard = ({id}) => {
  return request({
    method: 'post',
    endpoint: `/scratch_card/${id}/redeem`,
    // log: true,
  });
};

export const verifyAndroidPaymentApi = ({data}) => {
  // const {productId, transactionReceipt} = data;
  return request({
    method: 'post',
    data: data,
    endpoint: `/wallet/subscription_plan/subscribeandroid`,
    log: true,
  });
};

export const splitkaroCashTransactionApi = ({userId, skip=1, limit=1}) => {
  // sk_transaction/66f3e91129166ce30a4008ec?skip=1&limit=1
  return request({
    method: 'get',
    endpoint: `/sk_transaction/${userId}?skip=${skip}&limit=${limit}`,
    // log: true,
  });
}

export const deleteRecurringExpenseApi = ({id}) => {
  return request({
    method: 'DELETE',
    endpoint: `/recurring_expense/${id}`,
    // log: true,
  });
};

// Experiences
export const getAllExperiences = () => {
  return request({
    method: 'get',
    endpoint: `/listing`,
    // log: true,
  });
};

export const bookTicket = ({data}) => {
  return request({
    method: 'post',
    endpoint: `/booking`,
    data: data,
    // log: true,
  });
};

export const createOrder = ({data}) => {
  return request({
    method: 'post',
    endpoint: `/order`,
    data: data,
    // log: true,
  });
};

export const getPriceBreakup = ({eventId, data}) => {
  return request({
    method: 'post',
    endpoint: `/listing/${eventId}/pricing`,
    data: data,
    // log: true,
  });
};

export const payOrder = ({orderId, data}) => {
  return request({
    method: 'post',
    endpoint: `/order/${orderId}/pay`,
    data: data,
    log: true,
  });
};

export const checkOrderStatus = ({orderId}) => {
  return request({
    method: 'get',
    endpoint: `/order/${orderId}/status`,
    log: true,
  });
};

export const getUserData = () => {
  return request({
    method: 'get',
    endpoint: `/user`,
    // log: true,
  });
};

export const uploadExpenseImage = ({data}) => {
  return request({
    data: data,
    method: 'post',
    endpoint: `/expenses/upload_image`,
    file: true,
    // log: true,
  });
};

export const settlementApi = ({data}) => {
  return request({
    data: data,
    method: 'post',
    endpoint: `/settle`,
    log: true,
  });
};

export const getExpenseById = ({expense_id}) => {
  return request({
    method: 'get',
    endpoint: `/expense/${expense_id}`,
    // log: true,
  });
};

// BILL PAYMENT
export const findBbpsBillers = ({categoryId}) => {
  return request({
    method: 'get',
    endpoint: `/bbps/billers?category=${categoryId}`,
    // log: true, // see data @ 'HomeSetupScreens/payBillSections/TEST_DATA.md'
  });
};

export const getAccountValidationData = ({billerId}) => {
  return request({
    method: 'get',
    endpoint: `/bbps/biller/${billerId}`,
    // log: true,
  });
};

export const validateUserAccount = ({data}) => {
  return request({
    method: 'post',
    data: data,
    endpoint: `/bbps/prepay`,
    // log: true,
  });
};

export const addRecurringExpense = ({data}) => {
  return request({
    method: 'post',
    data: data,
    endpoint: '/recurring_expenses',
    // log: true,
  });
};

export const editRecurringExpense = ({data, id}) => {
  return request({
    method: 'put',
    data: data,
    endpoint: `/recurring_expense/${id}`,
    // log: true,
  });
};

export const getRecurringDataByGroupId = ({id}) => {
  return request({
    method: 'get',
    endpoint: `/recurring_expense/${id}`,
    // log: true,
  });
};
export const getRecurringUpcomingExpense = ({id}) => {
  return request({
    method: 'get',
    endpoint: `/recurring_expenses/${id}/upcoming`,
    // log: true,
  });
};
export const getExpenseHistory = ({id}) => {
  return request({
    method: 'get',
    endpoint: `/recent_expenses?instant=true&group_id=${id}&payout_done=true`,
    // log: true,
  });
};

// Delete
export const deleteResources = ({
  resourceType, // 'expense', 'group'
  isDeleting, // false to restore, true to delete
  resourceId,
}) => {
  let endpoint;
  if (resourceType == 'expense') endpoint = 'expense';
  else if (resourceType == 'group') endpoint = 'groups';
  return request({
    method: 'delete',
    endpoint: `/${endpoint}/${resourceId}?delete=${isDeleting}`,
    // log: true,
  });
};

// WALLET
export const getBeneficiariesList = () => {
  return request({
    method: 'get',
    endpoint: `/wallet/beneficiaries`,
    // log: true,
  });
};

export const editBeneficiary = ({data, id}) => {
  return request({
    method: 'put',
    endpoint: `/wallet/beneficiaries/${id}`,
    data: data,
    // log: true,
  });
};
export const deleteBeneficiary = id => {
  return request({
    method: 'delete',
    endpoint: `/wallet/beneficiaries/${id}`,
    // log: true,
  });
};

export const setDefaultBeneficiary = ({id}) => {
  return request({
    method: 'post',
    endpoint: `/wallet/beneficiaries/${id}/set_primary`,
    // log: true,
  });
};
export const addPrimaryUPI = ({data}) => {
  return request({
    method: 'post',
    endpoint: '/wallet/beneficiaries',
    data: data,
    // log: true,
  });
};

// GROUP ADMINS
export const addAdminApi = ({groupId, userId}) => {
  return request({
    method: 'put',
    // endpoint: '/groups/64e9bf26838fcd00b6582638/add_admin/64e8cc038cc035ee995e5508',
    endpoint: `/groups/${groupId}/add_admin/${userId}`,
    // log: true,
  });
};
export const removeAdminApi = ({groupId, userId}) => {
  return request({
    method: 'put',
    endpoint: `/groups/${groupId}/remove_admin/${userId}`,
    // log: true,
  });
};

// SUBSCRIPTION
export const createSubscriptionPlanApi = ({data}) => {
  // data=  {
  //     "id" : "TEST_PLAN",
  //     "durationInDays" : 180,
  //     "actualPrice" : {
  //         "currency" : "INR",
  //         "value" : 100
  //     },
  //     "sellingPrice" : {
  //         "currency" : "INR",
  //         "value" : 100
  //     }
  // }
  return request({
    method: 'post',
    endpoint: '/subscription_plans/create',
    data: data,
    // log: true,
  });
};

export const listAllSubscriptionPlanApi = () => {
  return request({
    method: 'get',
    endpoint: '/wallet/subscription_plans/list',
    // log: true,
  });
};

export const createSubscriptionForUserApi = ({userId, data}) => {
  // data:{
  //   planId: selectedPlan?.id,
  //   use_splitkaro_cash: bool = False
  // }
  return request({
    method: 'post',
    data: data, 
    // endpoint: `/wallet/subscription_plan/${planId}/subscribe`,
    endpoint: `/wallet/subscription_plan/subscribe`,
    log: true,
  });
};

export const getSubscriptionForUserApi = ({userId}) => {
  return request({
    method: 'get',
    endpoint: `/wallet/subscription`,
    // log: true,
  });
};

export const getSubscriptionForFriendApi = ({friendId}) => {
  return request({
    method: 'post',
    data: {user_id: friendId}, // {userId: friendId
    endpoint: `/wallet/subscription_user`,
    // log: true,
  });
};

export const createSubscriptionForIosUserApi = transactionReceipt => {
  return request({
    method: 'post',
    endpoint: `/wallet/subscription_plan/subscribeios`,
    data: {
      transactionReceipt: transactionReceipt,
    },
    // log: true,
  });
};

export const updateExpenseSettlement = ({
  expenseId,
  settlementId,
  isValid, // change it to false if the settlement is to be reverse
  action_text, // append the previous text
}) => {
  return request({
    method: 'put',
    endpoint: `/expense/update_expense_settlement/${expenseId}`,
    log: true,
    data: {
      settlement_id: settlementId,
      is_valid: isValid,
      action_text,
    },
  });
};

// Profile
export const updateProfileApi = ({data}) => {
  // first_name,  last_name, email, user_avatar, avatar
  return request({
    method: 'put',
    endpoint: '/user',
    data: data,
    // log: true,
  });
};

export const remindFriendApi = ({friend_id, groupId}) => {
  return request({
    method: 'post',
    endpoint: `/user/friend/${friend_id}/remind`,
    ...(groupId && {data: {group_id: groupId}}),
    // log: true,
  });
};


export const deleteSettlementApi = ({settlement_id}) => {
  return request({
    method: 'delete',
    endpoint: `/settlement/${settlement_id}`,
    log: true,
  });
};



