const PDF = require("../models/pdfSchema");
const Hotel = require("../models/hotelSchema")
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const validator = require("validator");
const { exec } = require('child_process');
const puppeteer = require('puppeteer');
const path = require('path');

const transporter = nodemailer.createTransport({
  name: process.env.AUTH_HOST,
  host: process.env.AUTH_HOST,
  port: 465, // Bluehost usually uses port 465 for secure SMTP.
  secure: true, // Use SSL/TLS for secure connection.
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS_APP,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("ready for messages");
    console.log(success);
  }
});

const sendEmail = asyncHandler(async (req, res, next) => {
//  console.log("req.body");
//  console.log(req.body);
  const {
    hotels,
    customerName,
    customerEmail,
    startDate,
    endDate,
    agent,
    agentNumber,
    subjectLine,
    companyName,
  } = req.body;
  if (!validator.isEmail(customerEmail)) {
    return res.status(404).json({
      message : "Invalid Email !"
    })
  }
  console.log(customerEmail)
  const mailOption = {
    from: "Business Travel Bureau <res@btbintl.com>", // sender address
    to: customerEmail, // list of receivers
    subject: hotels[0].name, // Subject line
    text: "hello everyBody", // html body
  };

  transporter.sendMail(mailOption, async (err, info) => {
    if (err) {
      console.error("Error sending email:");
      console.log(err);
    } else {
      console.log("Email sent !");

      return res.status(200).json({
        message : "Email sent successfully !"
      })
    }
  });
});

const displayLogs = asyncHandler(async (req, res, next) => {
  try {
    const {search , page} = req.query ;

    if(!search)
    {
      const data = await PDF.find({
        }
      ,"Name CustomerEmail")
        .sort({ createdAt: -1 })
        .skip(parseInt(page)*20 || 0)
        .limit(20);
      const totalLogs = await PDF.count()
      return res.status(200).json({
        data : data ,
        totalLogs : totalLogs
      })
    }else{
      // const data = await PDF.find(
      //   { $text: { $search: search } },
      //   { score: { $meta: 'textScore' } },
      // )
      // .sort({ score: { $meta: 'textScore' } })
      // .limit(20)
      const data = await PDF.find(
        {
          Name: { $regex: new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i') }
        },
        "Name CustomerEmail"
        )
        .limit(20);
      return res.status(200).json({
        data : data 
      })
    }
    
  } catch (err) {
    console.log(err)
    //console.log(err);
    return res.status(404).json({
      message: "Error while getting data !",
    });
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { password , userName} = req.body;
  // console.log(req.body);
  if (password == process.env.SECRET_PASS && userName == process.env.SECRET_USERNAME) {
    let token = jwt.sign({},
      process.env.SECRET_KEY,
      {
        expiresIn: "30h",
      }
    );
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + 30 * 60 * 60 * 1000
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: expirationDate,
    });
 
    return res.status(200).json({
      message: "login successfully !",
      token: token,
    });
  } else {
    return res.status(404).json({
      message: "Wrong Username or Password",
    });
  }
});

const searchHotels = asyncHandler(async (req, res, next) => {
  const { search } = req.query;
  if(search){
  try{
    // const searchData = await Hotel.find(
    //   { $text: { $search: search } },
    //   { score: { $meta: 'textScore' } }
    // )
    // .sort({ score: { $meta: 'textScore' } })
    // .limit(20)
    const searchData = await Hotel.find(
      {
        name: { $regex: new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i') }
      },
      
    )
    .limit(10);

    return res.status(200).json({
      data : searchData
    })
  }catch(err)
  {
    console.log(err)
    return res.status(404).json({
      message : "Error while searching"
    })
  }
  
  // if (search) {
  //   const data = await Email.aggregate([
  //     {
  //       $search: {
  //         index: "search",
  //         text: {
  //           query: search,
  //           path: {
  //             wildcard: "*",
  //           },
  //           fuzzy: {},
  //         },
  //       },
  //     },
  //     {
  //       $sort: {
  //         createdAt: -1,
  //         score: -1, // Sort by the 'score' field in descending order
  //       },
  //     },
  //   ]);

    // return res.status(200).json({
    //   data : data
    // })

   
  } else {
    const data = await Hotel.find({
    }
  ,)
    .sort({ createdAt: -1 })
    .limit(20);
  return res.status(200).json({
    data : data 
  })
  }
});

const filter = asyncHandler(async (req, res, next) => {
  const { closerName } = req.body;
  const count = await PDF.countDocuments({});

  if (closerName) {
    const data = await PDF.aggregate([
      {
        $match: { CloserName: closerName },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    
  } else {
    const data = await PDF.find().sort({ createdAt: -1 }).limit(20);
    //console.log(data)
    
  }
});

const scrape = asyncHandler(async (req,res, next) => {
  
  const { site } = req.query; 
  try{
    exec(`python ./script.py "${site}" `, async(error, stdout, stderr) => {
      if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).send('Error occurred while running the script. 1');
      }
      if (stderr) {
          console.error(`Script Error: ${stderr}`);
          return res.status(500).send('Error occurred while running the script. 2');
      }
      // Assuming the script outputs the data you want to store in the database
      try{
      const outputData = stdout.trim(); // Trim any whitespace
      // console.log(outputData)
      const jsonFormat = JSON.parse(outputData)
      
      // jsonFormat.address = jsonFormat.address.replace(/\n/g, '');
      // jsonFormat.description = jsonFormat.description.replace(/\n/g, '');

      const newHotel = new Hotel(jsonFormat)
      const data = await newHotel.save();
      return res.status(200).json({
        data : data
      })
      }catch(err)

      {
        console.log(err)
        return res.status(404).json({
          message : "Error while scraping !"
        })
      }
   

    });
  }catch(err)
  {
    return res.status(404).json({
      message : "Error while scraping !"
    })
  }
  

}
)

const addPDF = asyncHandler(async (req,res, next) => {
    const {hotels , name , customerName , customerEmail ,startDate , endDate , agent , agentNumber , subjectLine} = req.body ;
    // console.log(req.body);
    //const newhotels = JSON.parse(hotels);

    const newPDF = new PDF({
      Hotels : hotels,
      Name : name,
      CustomerName : customerName,
      CustomerEmail : customerEmail,
      StartDate : startDate,
      EndDate : endDate,
      Agent : agent,
      AgentNumber : agentNumber,
      SubjectLine : subjectLine,
    })

    try{
      await newPDF.save();
      return res.status(200).json({
        message : "PDF saved successfully !"
      })
    }catch(err)
    {
      console.log(err)
      return res.status(404).json({
        message : "Error while saving PDF"
      })
    }

}
)

const deletePDF = asyncHandler(async (req,res, next) => {
  
  try{

    const deletedData = await PDF.deleteOne({_id  : req.params.id})
    return res.status(200).json({
      message : "PDF deleted successfully !"
    })
  }catch(err)
  {
    return res.status(404).json({
      message : "Error while deleting PDF"
    })
  }
}
)

const displayPDF = asyncHandler(async (req,res, next) => {
  
  try{
    const data = await PDF.findById(req.params.id).populate("Hotels.Id")

    return res.status(200).json({
      data : data
    })

  }catch(err)
  {
    console.log(err)
    return res.status(404).json({
      message : "Error while getting data of PDF"
    })
  }
}
)

const editPDF = asyncHandler(async (req,res, next) => {
  const {hotels , name , customerName , customerEmail ,startDate , endDate , agent , agentNumber , subjectLine} = req.body ;
  // console.log(req.body);
  //const newhotels = JSON.parse(hotels);

  const updatedData = {
    Hotels : hotels,
    Name : name,
    CustomerName : customerName,
    CustomerEmail : customerEmail,
    StartDate : startDate,
    EndDate : endDate,
    Agent : agent,
    AgentNumber : agentNumber,
    SubjectLine : subjectLine,
  }

  try{
    const newUpdatedData = await PDF.findByIdAndUpdate(req.params.id , updatedData , {new : true})

    return res.status(200).json({
      message : "PDF updated successfully !",
      data : newUpdatedData ,
    })
  }catch(err)
  {
    console.log(err)
    return res.status(404).json({
      message : "Error while updating PDF"
    })
  }
}
)

const editHotel = asyncHandler(async (req,res,next) => {
  
  //const {name , address  , description} = req.body ;

  try{

    const data = await Hotel.findByIdAndUpdate(req.params.id , req.body , {new : true})

    return res.status(200).json({
      message : "Hotel updated successfully !",
      data : data
    })

  }catch(err)
  {
    console.log(err)
    return res.status(404).json({
      message : "Error while updating Hotel info"
    })
  }



}
)

const dataCleansing = () => {
  
}

const generatePdf = asyncHandler(async (req,res,next) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Your HTML content with image source links
  const htmlContent = `
    <html>
      <head><title>Your PDF Title</title></head>
      <body>
        <img src="http://yourdomain.com/images/your_image.png" alt="Image">
        <!-- Add other HTML content as needed -->
      </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
  res.send(pdfBuffer);
  
}
)


module.exports = {
  sendEmail,
  displayLogs,
  login,
  searchHotels,
  filter,
  scrape,
  deletePDF,
  addPDF,
  editPDF,
  displayPDF,
  editHotel,
  generatePdf,
};
