exports.routes = {
    api: {
        authentication: {
            no_username: 'Username is Required',
            no_password: 'Password is Required',
            has_errors: 'There have been validation errors: ',
            bluegroups: {
                user_not_found: 'User not in any group'
            }
        }
    },
    error: {
        not_found: {
            code: 404,
            txt: 'Not Found'
        },
        access_denied: {
            code: 401,
            txt: 'Not Authorized'
        },
        bad_request: {
            code: 400,
            txt: 'Bad Request'
        },
        internal_error: {
            code: 500,
            txt: 'Internal Error'
        }
    }
};

exports.models = {
    BluePages: {
        user_not_found: 'User not found',
        user_not_found_intranetID: 'User intranetID is incorrect',
        user_not_acess : "User Forbidden",
        user_pass_invalid : "The username or password is incorrect",
        user_not_found_bluegroup : "User not found in BlueGroup",
        user_ldap_success : "Success Login LDAP",
        ldap_error500 : "Failed connect the Server",
        ldap_unbid : "LDAP UnBID"

    }
};

exports.quote = {
    quote_owner_empty : "Quote Owner is empty, please fill"
};

 exports.serverside_error = {
    database : {
        database_error : "Failed to database, please contact the Admin"
    }
 };
