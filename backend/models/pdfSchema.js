const mongoose = require('mongoose');
const Schema = mongoose.Schema



const pdfSchema = Schema({
  Name: {
    type : String ,
    default : ""
  },
  Hotels: [{
    type: Schema.Types.ObjectId,
    ref: 'hotel', 
  }],
  CloserName : {
    type : String ,
    default : ""
  }
  ,
  CustomerName : {
    type : String , 
    default : ""
  },
  CustomerEmail : {
    type : String , 
    default : ""
  }
  ,
  StartDate : {
    type : Date ,
    default : new Date()
  },
  EndDate : {
    type : Date ,
    default : new Date()
  },
  Agent : {
    type : String , 
    default : ""

  },
  AgentNumber : {
    type : String , 
    default : ""

  },
  SubjectLine : {
    type : String ,
    default : ""
  },
  CompanyName : {
    type : String ,
    default : ""
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