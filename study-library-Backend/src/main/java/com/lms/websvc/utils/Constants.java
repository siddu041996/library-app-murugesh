package com.lms.websvc.utils;

import com.lms.websvc.models.LMSException;

public class Constants {

    public enum CODE implements LMSException.ICode{

        UNKNOWN, INVALID_NAME, INVALID_ID, EXISTS, DOES_NOT_EXISTS, NOT_FOUND;
        public Enum valueOf() {
            return this;
        }
    }

    public enum CATEGORY implements LMSException.ICategory{
        UNKNOWN, DOES_NOT_EXISTS,INTERNAL_SERVER_ERROR,NOT_FOUND,BAD_REQUEST,BAD_RESPONSE,PRECONDITION_FAILED,AUTHENTICATION,AUTHORIZATION;
        public Enum valueOf() {
            return this;
        }
    }

    public enum SOURCE implements LMSException.ISource{
        UNKNOWN, DB,REST,SERVER,SECURITY;
        public Enum valueOf() {
            return this;
        }
    }

    public static class Payment {
        public static final String PRE_DUE = "pre_due";
        public static final String DUE = "due";
        public static final String FAILED = "failed";
        public static final String PENDING = "pending";
        public static final String PARTIAL_PAID = "partialPaid";
        public static final String PAID = "paid";
    }

    public static class SubscriptionStatus {
        public static final String ACTIVE = "active";
        public static final String IN_ACTIVE = "inActive";
        public static final String CLOSED = "closed";
    }

    public static class SubscriptionCycle {
        public static final String TWO_WEEKS = "2W";
        public static final String ONE_MONTH = "1M";
        public static final String TWO_MONTHS = "2M";
        public static final String THREE_MONTHS = "3M";
        public static final String SIX_MONTHS = "6m";
        public static final String ANNUAL = "1y";
    }

}
