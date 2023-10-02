/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_ProblemVO_ } from '../models/BaseResponse_Page_ProblemVO_';
import type { ProblemQueryRequest } from '../models/ProblemQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProblemControllerService {

    /**
     * getPageProblem
     * @param problemQueryRequest problemQueryRequest
     * @returns BaseResponse_Page_ProblemVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getPageProblemUsingPost(
        problemQueryRequest: ProblemQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ProblemVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/problem/query',
            body: problemQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getPageBySearchProblem
     * @param problemQueryRequest problemQueryRequest
     * @returns BaseResponse_Page_ProblemVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getPageBySearchProblemUsingPost(
        problemQueryRequest: ProblemQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ProblemVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/problem/query/search',
            body: problemQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
