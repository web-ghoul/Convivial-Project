const mongoose = require('mongoose');
const Schema = mongoose.Schema



const pdfSchema = Schema({
  Hotels: [{
    type: Schema.Types.ObjectId,
    ref: 'hotel', 
  }],
  HotelsName : {
    type : [String] , 
  },
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
  StartDate : {
    type : Date ,
  },
  EndDate : {
    type : Date 
  },
  Agent : {
    type : String , 

  },
  AgentNumber : {
    type : String , 

  },
  SubjectLine : {
    type : String ,
  }
  
},{
  timestamps: true, // Enable timestamps
})

pdfSchema.pre('save', function (next) {
  // Adjust the createdAt field with your desired timezone offset (e.g., +3 hours for Egypt)
  this.createdAt = new Date(Date.now() + 3 * 60 * 60 * 1000);
  next();
});

module.exports = mongoose.model("pdf" , pdfSchema)