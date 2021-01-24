const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
   .get((req, res, next) =>{
       Leaders.find({})
          .then(leader => {
             res.statusCode = 200;
             res.setHeader('Content-Type', 'application/json');
             res.json(leader);
          }, err => next(err))
          .catch(err => next(err));
   })
   .post((req, res, next) => {
       Leaders.create(req.body)
          .then(leader => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);              
        }, err => next(err))
        .catch(err => next(err));
   })
   .put((req, res, next) => {
       res.statusCode = 403;
       res.end("Put operation not supported");
   })
   .delete((req, res, next) => {
       Leaders.remove({})
          .then(resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);             
        }, err => next(err))
        .catch(err => next(err));
   });


   leaderRouter.route("/:leaderID")
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderID)
           .then(leader => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);                
        }, err => next(err))
        .catch(err => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operaion not supported on /leaders/"
            + req.params.leaderID);
    })
    .put((req, res, next) => {
      Leaders.findByIdAndUpdate(req.params.leaderID, {
          $set: req.body },
          {new: true}
      )
        .then(promo => {
            res.statusCode= 200;
            res.setHeader("Content-Type", 'application/json');
            res.json(promo);
          }, err => next(err))
        .catch(err => next(err));
        })
        
    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderID)
          .then(resp => {
            res.statusCode= 200;
            res.setHeader("Content-Type", 'application/json');
            res.json(resp); 
        }, err => next(err))
        .catch(err => next(err))
    });

module.exports = leaderRouter;