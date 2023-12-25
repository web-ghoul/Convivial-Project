const mongoose = require('mongoose');
const Schema = mongoose.Schema



const pdfSchema = Schema({

  

  CloserName : {
    type : String ,
  }
  ,
  CustomerName : {
    type : String , 
  },
  CustomerEmail : {
    type : String , 
  }
  ,
  Dates : {
    type : Date ,
  }
  
},{
  timestamps: true, // Enable timestamps
})

emailSchema.pre('save', function (next) {
  // Adjust the createdAt field with your desired timezone offset (e.g., +3 hours for Egypt)
  this.createdAt = new Date(Date.now() + 3 * 60 * 60 * 1000);
  next();
});

module.exports = mongoose.model("Email" , pdfSchema)