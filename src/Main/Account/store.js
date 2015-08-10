'use strict';

var _ = require('underscore');
var Immutable = require('immutable');
var EventEmitter = require('events').EventEmitter;

var API = require('API');
var utils = require('utils');
var dispatcher = require('Main/dispatcher');
// var couchDBAction = require('Main/CouchDB/action');

var _accounts = new Immutable.List();
var _accountCurrent = null;
var _accountOpened = null;

var store = _.extend({}, EventEmitter.prototype, {
  getAll: function() {
    return _accounts;
  },
  getCurrent: function() {
    return _accountCurrent;
  },
  getOpened: function() {
    return _accountOpened;
  },
  putAccountCurrent: function(account, accountOld) {
    var index = _accounts.indexOf(accountOld);

    return API.putAccount(account)
      .then(function(accountAdded) {
        _accountCurrent = accountAdded;
        _accounts = _accounts.set(index, accountAdded);
      }).catch(function(error) {
        console.warn(error);
      });
  },
  isValide: function(account) {
    if (account.share) {
      // TODO check emails
    }

    return {
      status: true,
    };
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },
});


/**
 * Register callback to handle all updates
 */
dispatcher.register(function(action) {
  switch(action.actionType) {
    case 'ACCOUNT_FETCH_ALL':
      API.fetchAccountAll().then(function(accounts) {
        _accounts = accounts;

        // Update account current
        if(_accountCurrent && _accountCurrent._id) {
          _accountCurrent = _.findWhere(_accounts, { _id: _accountCurrent._id });

          API.fetchExpensesOfAccount(_accountCurrent).then(function(accountFetched) {
            _accountCurrent = accountFetched;
            store.emitChange();
          });
        }

        store.emitChange();
      });
      break;

    case 'ACCOUNT_TAP_LIST':
      _accountCurrent = action.account;
      store.emitChange();

      if (!API.isExpensesFetched(_accountCurrent.get('expenses'))) {
        API.fetchExpensesOfAccount(_accountCurrent).then(function(accountFetched) {
          _accountCurrent = accountFetched;
          store.emitChange();
        });
      }
      break;

    case 'ACCOUNT_NAVIGATE_HOME':
      _accountCurrent = null;
      store.emitChange();
      break;

    case 'ACCOUNT_TAP_SETTINGS':
      _accountOpened = _accountCurrent;
      break;

    case 'ACCOUNT_ADD_CHANGE_NAME':
      _accountCurrent = _accountCurrent.set('name', action.name);
      store.emitChange();
      break;

    case 'ACCOUNT_ADD_TOGGLE_SHARE':
      _accountCurrent = _accountCurrent.set('share', action.share);
      store.emitChange();
      break;

    case 'ACCOUNT_ADD_CHANGE_MEMBER_EMAIL':
      var member = utils.getAccountMember(_accountCurrent, action.memberId);

      _accountCurrent = _accountCurrent.setIn(['members', member[0], 'email'], action.email);
      store.emitChange();
      break;

    case 'ACCOUNT_ADD_TAP_SAVE':
      if (!_accountCurrent.couchDBDatabaseName && _accountCurrent.share) {
        // TODO
        // call '/account/create' : NEED npm request
        // return couchDBDatabaseName
        // _accountCurrent.couchDBDatabaseName = '';
        // couchDBAction.fetchUser();
        // call '/account/set_right'
      }

      store.putAccountCurrent(_accountCurrent, _accountOpened);
      _accountOpened = null;
      store.emitChange();
      break;

    case 'ACCOUNT_ADD_CLOSE':
      _accountCurrent = _accountOpened;
      _accountOpened = null;
      store.emitChange();
      break;

    case 'MODAL_TAP_OK':
      switch(action.triggerName) {
        case 'closeAccountAdd':
          _accountCurrent = _accountOpened;
          _accountOpened = null;
          break;
      }
      break;

    case 'TAP_ADD_EXPENSE':
      _accountCurrent = Immutable.fromJS({
          name: '',
          members: [{
            id: '0',
            name: null,
            email: null,
            photo: null,
            balances: [],
          }],
          expenses: [],
          share: false,
          couchDBDatabaseName: null,
        });
      break;

    case 'EXPENSE_CHANGE_RELATED_ACCOUNT':
      _accountCurrent = action.relatedAccount;
      break;

    case 'ACCOUNT_ADD_MEMBER':
      _accountCurrent = _accountCurrent.update('members', function(list) {
        return list.push(action.member);
      });
      break;
  }
});

module.exports = store;
