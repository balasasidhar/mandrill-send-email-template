/**
 * Created by SASi on 21-Dec-15.
 */
var express = require('express');
var router = express.Router();

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('');

var template_name = "member_account_verification";
var template_content = [];
var message = {
    "subject": "Member Account Verification",
    "from_email": "email@example.com",
    "from_name": "Example Mail",
    "to": [{
        "email": "sender_mail@exampl.com",
        "name": "Sender name",
        "type": "to"
    }],
    "headers": {
        "Reply-To": "info@example.com"
    },
    "important": true,
    "merge": true,
    "merge_language": "mailchimp",
    "global_merge_vars": [],
    "merge_vars": [
        {
            "rcpt": "sender_mail@exampl.com",
            "vars": [
                {
                    "name": "name",
                    "content": "content"
                }
            ]
        }]
};

router.get('/', function (req, res, next) {
    mandrill_client.messages.sendTemplate({
        "template_name": template_name,
        "template_content": template_content,
        "message": message
    }, function (result) {
        console.log(result);
        res.send(result);
    }, function (e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        res.send(e);
    });
});

module.exports = router;