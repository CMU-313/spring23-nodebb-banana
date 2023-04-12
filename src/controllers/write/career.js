'use strict';

const helpers = require('../helpers');
const user = require('../../user');
const db = require('../../database');

const Career = module.exports;

Career.register = async (req, res) => {
    const userData = req.body;
    try {
        const userCareerData = {
            student_id: userData.student_id,
            major: userData.major,
            age: userData.age,
            gender: userData.gender,
            gpa: userData.gpa,
            extra_curricular: userData.extra_curricular,
            num_programming_languages: userData.num_programming_languages,
            num_past_internships: userData.num_past_internships,
        };
        // Currently locally running endpoint
        // Replace with deployed microservice endpoint
        const endpoint = `https://banana-v5.fly.dev/`;
        const config = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCareerData),
        };
        try {
            const fetchResponse = await fetch(endpoint, config);
            const data = await fetchResponse.json();
            userCareerData.prediction = parseInt(data.good_employee, 10);
            await user.setCareerData(req.uid, userCareerData);
            db.sortedSetAdd('users:career', req.uid, req.uid);
            res.json({});
        } catch (e) {
            console.log(e);
        }
    } catch (err) {
        console.log(err);
        helpers.noScriptErrors(req, res, err.message, 400);
    }
};
