'use strict';

define('forum/career', [
    'translator', 'jquery-form',
], function (translator) {
    const Career = {};
    let validationError = false;

    Career.init = function () {
        const name = $('#name');
        const email = $('#email');
        const age = $('#age');
        const signup = $('#signup');

        name.on('blur', function () {
            if (name.val().length) {
                validateName(name.val());
            }
        });

        email.on('blur', function () {
            if (email.val().length) {
                validateEmail(email.val());
            }
        });

        age.on('blur', function () {
            if (age.val().length) {
                validateAge(age.val());
            }
        });

        function validateForm(callback) {
            validationError = false;
            validateName(name.val());
            validateEmail(email.val());
            validateAge(age.val());
            callback();
        }

        signup.on('click', function (e) {
            const registerBtn = $(this);
            const errorEl = $('#career-error-notify');
            errorEl.addClass('hidden');
            e.preventDefault();
            validateForm(function () {
                if (validationError) {
                    return;
                }

                registerBtn.addClass('disabled');

                registerBtn.parents('form').ajaxSubmit({
                    headers: {
                        'x-csrf-token': config.csrf_token,
                    },
                    success: function () {
                        location.reload();
                    },
                    error: function (data) {
                        translator.translate(data.responseText, config.defaultLang, function (translated) {
                            if (data.status === 403 && data.responseText === 'Forbidden') {
                                window.location.href = config.relative_path + '/career?error=csrf-invalid';
                            } else {
                                errorEl.find('p').text(translated);
                                errorEl.removeClass('hidden');
                                registerBtn.removeClass('disabled');
                            }
                        });
                    },
                });
            });
        });
    };

    function validateName(name) {
        const name_notify = $('#name-notify');

        if (!name || name.length === 0) {
            showError(name_notify, 'Name must be non-empty');
        } else {
            showSuccess(name_notify);
        }
    }

    function validateEmail(email) {
        const email_notify = $('#email-notify');

        if (!email || email.length === 0) {
            showError(email_notify, 'Email must be non-empty');
        } else {
            showSuccess(email_notify);
        }
    }

    function validateAge(age) {
        const age_notify = $('#age-notify');

        if (!age || isNaN(age) || parseInt(age, 10) <= 0) {
            showError(age_notify, 'Age must be a positive integer value');
        } else {
            showSuccess(age_notify);
        }
    }

    function showError(element, msg) {
        translator.translate(msg, function (msg) {
            element.html(msg);
            element.parent()
                .removeClass('register-success')
                .addClass('register-danger');
            element.show();
        });
        validationError = true;
    }

    function showSuccess(element, msg) {
        translator.translate(msg, function (msg) {
            element.html(msg);
            element.parent()
                .removeClass('register-danger')
                .addClass('register-success');
            element.show();
        });
    }

    return Career;
});
