const collections = ['permissions','roles','users','banks','payment_modes','designations','branches','customers','bank_transfers'];

const STATUS = {
    STATUS_PENDING: "pending",
    STATUS_APPROVED: "approved",
    STATUS_REJECTED: "rejected",
    STATUS_CLOSED: "closed",
  };

const ENUMS = {
    collections,
    STATUS
};

module.exports =  ENUMS ;
  