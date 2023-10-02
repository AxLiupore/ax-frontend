/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_DiscussionVO_ } from '../models/BaseResponse_Page_DiscussionVO_';
import type { DiscussionAddRequest } from '../models/DiscussionAddRequest';
import type { DiscussionDeleteRequest } from '../models/DiscussionDeleteRequest';
import type { DiscussionQueryRequest } from '../models/DiscussionQueryRequest';
import type { DiscussionUpdateRequest } from '../models/DiscussionUpdateRequest';
import type { DiscussionUserQueryRequest } from '../models/DiscussionUserQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DiscussionControllerService {

    /**
     * addDiscussion
     * @param discussionAddRequest discussionAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addDiscussionUsingPost(
        discussionAddRequest: DiscussionAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/discussion/add',
            body: discussionAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteDiscussion
     * @param discussionDeleteRequest discussionDeleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteDiscussionUsingPost(
        discussionDeleteRequest: DiscussionDeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/discussion/delete',
            body: discussionDeleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getUserPersonalDiscussion
     * @param discussionUserQueryRequest discussionUserQueryRequest
     * @returns BaseResponse_Page_DiscussionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserPersonalDiscussionUsingPost(
        discussionUserQueryRequest: DiscussionUserQueryRequest,
    ): CancelablePromise<BaseResponse_Page_DiscussionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/discussion/personal/discussion',
            body: discussionUserQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * queryDiscussion
     * @param discussionQueryRequest discussionQueryRequest
     * @returns BaseResponse_Page_DiscussionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static queryDiscussionUsingPost(
        discussionQueryRequest: DiscussionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_DiscussionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/discussion/query',
            body: discussionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateDiscussion
     * @param discussionUpdateRequest discussionUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateDiscussionUsingPost(
        discussionUpdateRequest: DiscussionUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/discussion/update',
            body: discussionUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
