import express from 'express';
import mongoose from 'mongoose';
import '../models/team.js';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const teams = mongoose.model('teams');
const users = mongoose.model('users');
let router = express.Router();

router.post('/addTeam', (req, res) => {
    let data = req.body;
    let selected_user = _.map(req.body.players, (element) => {
        return element.userName
    });
    users.update(
        { "userName": { $in: selected_user } },
        {
            $push: {
                notification: {
                    message: `You have been added in a team ${req.body.name} by ${req.body.owner}`,
                    status: true
                }
            }
        },
        { multi: true },
        (err, res) => { if (err) console.log(err) }
    );

    var team = new teams(data);
    team.save();
    res.json({ "success": true })
});

router.post('/getTeam', (req, res) => {
    teams.find({
        owner: req.body.user
    }).then(team => {
        res.json({
            team: team
        })
    })
})

router.post('/getTeambyId', (req, res) => {
    teams.findById(req.body.id).then(team => {
        res.json({
            team: team
        })
    })
})

router.post('/deleteTeam', (req, res) => {
    teams.findById(req.body.team_id).then(resp => {
        if (resp.owner === req.body.user) {
            teams.findByIdAndRemove(req.body.team_id).then(respo => {
                teams.find({
                    owner: req.body.user
                }).then(team => {
                    res.json({
                        team: team,
                        status: 'deleted'
                    })
                })
            })
        }
    })
})

router.post('/searchTeam', (req, res) => {
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    const regex = new RegExp(escapeRegex(req.body.search), 'gi');

    teams.find({ "name": regex }, function (err, result) {
        res.json(result);
    });
})

export default router;
