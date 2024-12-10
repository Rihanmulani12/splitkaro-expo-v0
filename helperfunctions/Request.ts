import axios from 'axios';
import Logger from './log';
import {API} from '../configs/api';
//import {analytics} from '../configs/analytics';


// JSDOC for file and log data as optional params
/**
 * Makes an HTTP request to a specified endpoint.
 * 
 * @param {Object} param0 - Request parameters.
 * @param {String} param0.endpoint - The endpoint to which the request is made.
 * @param {Object} [param0.data] - The data to be sent in the request.
 * @param {Object} [param0.params] - The query parameters to be sent in the request
 * @param {String} param0.method - The HTTP method to be used (e.g., 'GET', 'POST').
 * @param {Any} [param0.file] - Optional flag to indicate if the request involves a file.
 * @param {Boolean} [param0.log] - Optional flag to indicate if the request should be logged.
 * @returns {
*   Promise<{ data: any; status: number; statusText: string; headers: any; config: any; request: any; }>
* }
*/
const request = async ({ endpoint, data, params, method, file, log} : any) => {
  let url = `${API}${endpoint}`;

  let response = null;

  if (log) {
    Logger(
      `[${method.toUpperCase()}][API_CALL] to ${url},`,
      data ?? '',
      // params??'',
      'infoNetwork',
    );
  }

  let headers = undefined;

  if (file) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;',
    };
  }

  try {
    response = await axios({
      method,
      url,
      data,
      params,
      ...(file && {headers: headers}),
    });

    if (log && response) {
      Logger(
        `[${method.toUpperCase()}][API_RESPONSE] FROM ${url} `,
        response.data,
        'successNetwork',
      );
    } else {
      log &&
        Logger(
          `[${method.toUpperCase()}][API_ERROR] to ${url})`,
          response,
          'errorNetwork',
        );
    }
  } catch (err) {
    log &&
      Logger(
        `[${method?.toUpperCase()}][API_ERR] to ${url}`,
        err?.response?.data ?? err,
        'errorNetwork',
      );
    Logger(
      `[${method?.toUpperCase()}][API_ERR] to ${url}`,
      'errorNetwork',
    );
    console.log(`API Error`, {
      error: JSON.stringify(err),
      url: url,
      method: method,
    });
    response = err?.response;
  }

  return response;
};

export default request;