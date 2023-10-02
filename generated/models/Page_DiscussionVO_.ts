/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscussionVO } from './DiscussionVO';
import type { OrderItem } from './OrderItem';

export type Page_DiscussionVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<DiscussionVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

