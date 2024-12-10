import request from './Request';
// NEW SUMMARY API

interface summaryDataType {
  start_date?: string;
  end_date?: string;
  skip?: number;
  limit?: number;
  category?: string;
}

interface SummaryPayloadType {
  group_id: string;
  params: summaryDataType;
}

export const getOwedSummaryApi = ({group_id, params}: SummaryPayloadType) => {
  return request({
    method: 'get',
    params: params,
    endpoint: `/summary/${group_id}/share`,
    // log: true,
  });
};

export const getSpentSummaryApi = ({group_id, params}: SummaryPayloadType) => {
  return request({
    method: 'get',
    params: params,
    endpoint: `/summary/${group_id}/spend`,
    // log: true,
  });
};

export const getCategoryWiseSummaryApi = ({
  group_id,
  params,
}: SummaryPayloadType) => {
  return request({
    method: 'get',
    params: params,
    endpoint: `/summary/${group_id}/categories`,
    // log: true,
  });
};

export const getMoneyPaidSummaryApi = ({
  group_id,
  params,
}: SummaryPayloadType) => {
  return request({
    method: 'get',
    params: params,
    endpoint: `/summary/${group_id}/paid`,
    // log: true,
  });
};

export const getMoneyReceivedSummaryApi = ({
  group_id,
  params,
}: SummaryPayloadType) => {
  return request({
    method: 'get',
    params: params,
    endpoint: `/summary/${group_id}/received`,
    // log: true,
  });
};

export const getSummaryApi = ({group_id, params}: SummaryPayloadType) => {
  return request({
    method: 'get',
    params: params,
    endpoint: `/summary/${group_id}`,
    log: true,
  });
};

export const getTotalGroupsSpendingApi = ({group_id, params}: SummaryPayloadType) => {
  return request({
    method: 'get',
    params: params,
    endpoint: `/summary/${group_id}/total_spending`,
    log: true,
  });
};

export const getTotalGroupsMonthwiseSpendingApi = ({group_id, params}: SummaryPayloadType) => {
  return request({
    method: 'get',
    // params: params,
    endpoint: `/summary/${group_id}/monthwise_spending`,
    log: true,
  });
};

export const getGroupStatsApi = ({group_id, params}: SummaryPayloadType) => {
  return request({
    method: 'get',
    params: params,
    endpoint: `/groups/${group_id}/stats_new`,
    // log: true,
  });
};
