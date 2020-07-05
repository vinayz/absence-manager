const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const ics = require('ics');
const members = require('../UI/src/json_files/members.json');
const absences = require('../UI/src/json_files/absences.json');

const fileName = `${__dirname}/crew.ics`;


app.get('/', function (req, res) {

   if (req.query.userId) {

      res.send({ data: getUserData(parseInt(req.query.userId)) });

   } else if (req.query.startDate && req.query.endDate) {

      res.send({ data: getDateRangeData(req.query.startDate, req.query.endDate) });

   } else {
      var obj;
      let absentMembers = [];

      absences.payload.forEach(element => {

         let startDate = formatDate(element.startDate);
         let endDate = formatDate(element.endDate);
         let createdAt = formatDate(element.createdAt);

         obj = {
            title: element.type,
            start: startDate,
            end: endDate,
            description: element.memberNote,
            created: createdAt
         };
         absentMembers.push(obj);

      });

      const { error, content } = ics.createEvents(absentMembers);

      if (error) {
         throw error;
      } else {
         fs.writeFile(fileName, content, function (err) {
            if (err) {
               throw err;
            } else {
               res.download(fileName);
            };
         });
      };

   };

});


// This will return the data userwise
getUserData = (userId) => {

   return absences.payload.find(item =>  item.userId === userId);

};

//This will return the data within the given date range
getDateRangeData = (startDate, endDate) => {

   startDate = new Date(startDate);
   endDate = new Date(endDate);
   return absences.payload.filter(item => {
      let date = new Date(item.startDate);
      return (date >= startDate && date <= endDate);
   });

};

//This will format the date as ics module requires
formatDate = (date) => {

   let year = new Date(date).getFullYear();
   let month = new Date(date).getMonth() + 1;
   let Day = new Date(date).getDate();
   let hh = new Date(date).getHours();
   let mm = new Date(date).getMinutes();

   return [year, month, Day, hh, mm];
};


// Start the server on port 3000
app.listen(port, () => console.log(`Absence Manager App listening at http://localhost:${port}`));
