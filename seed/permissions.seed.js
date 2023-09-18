const { PERMISSION, ROLE, USER, BANKTRANSFER, CUSTOMER, BRANCH, DESIGNATION, PAYMENT_MODE, BANK } = require("../constants/collection.constants");

module.exports.permissionsSeed = [
    {
        db: PERMISSION,
        action: [
          'view',
          'add',
          'edit',
          'delete'
        ]
    },
    {
        db: ROLE,
        action: [
          'view',
          'add',
          'edit',
          'delete'
        ]
    },
    {
        db: ROLE,
        action: [
          'view',
          'add',
          'edit',
          'delete'
        ]
    },
    {
        db: BANK,
        action: [
          'view',
          'add',
          'edit',
          'delete'
        ]
    },
    {
        db: PAYMENT_MODE,
        action: [
          'view',
          'add',
          'edit',
          'delete'
        ]
    },
    {
        db: DESIGNATION,
        action: [
          'view',
          'add',
          'edit',
          'delete'
        ]
    },
    {
        db: BRANCH,
        action: [
          'view',
          'add',
          'edit',
          'delete'
        ]
    },
    {
        db: USER,
        action: [
            'view',
            'add',
            'edit',
            'delete'
        ]
    },
    {
        db: CUSTOMER,
        action: [
          'view',
          'add',
          'edit',
          'delete'
        ]
    },
    {
        db: BANKTRANSFER,
        action: [
          'view',
          'add',
          'edit',
          'delete'
        ]
    },
]