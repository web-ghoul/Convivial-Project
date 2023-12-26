const Email = require("../models/pdfSchema");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const validator = require("validator");

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

    const {
      closerName,
      customerName,
      customerEmail,
      hotelName,
      hotelPrice,
    } = req.body;
    if (!validator.isEmail(customerEmail)) {
      return res.status(404).json({
        message : "Invalid Customer Email !"
      });
    }
    const mailOption = {
      from: "Business Travel Bureau <res@btbintl.com>", // sender address
      to: customerEmail, // list of receivers
      subject: hotelName, // Subject line
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 3.2//EN">
      <html lang="en">
      <head>
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentsettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentsettings>
        </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="format-detection" content="address=no">
        <meta name="format-detection" content="telephone=no">
        <meta name="format-detection" content="email=no">
        <meta name="x-apple-disable-message-reformatting">
          <!--[if !mso]><!-->
        <style type="text/css">@import url("https://assets.mlcdn.com/fonts.css?version=1691652");</style>
        <!--<![endif]-->
      
        <!--[if mso]>
        <style type="text/css">
          .content-MS .content img { width: 560px; }
        </style>
        <![endif]-->
      
        <!--[if (mso)|(mso 16)]>
        <style type="text/css">
          .mlContentButton a { text-decoration: none; }
        </style>
        <![endif]-->
      
        <!--[if !mso]><!-- -->
        
        <!--<![endif]-->
      
        <!--[if (lt mso 16)]>
        <style type="text/css" if="variable.bodyBackgroundImage.value">
          .mlBodyBackgroundImage { background-image: none; }
        </style>
        <![endif]-->
      
        <style type="text/css">
          .ReadMsgBody { width: 100%; }
          .ExternalClass{ width: 100%; }
          .ExternalClass * { line-height: 100%; }
          .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
          body { margin: 0; padding: 0; }
          body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table td { border-collapse: collapse; }
          table { border-spacing: 0; border-collapse: collapse; }
          p, a, li, td, blockquote { mso-line-height-rule: exactly; }
          p, a, li, td, body, table, blockquote { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
          img, a img { border: 0; outline: none; text-decoration: none; }
          img { -ms-interpolation-mode: bicubic; }
          * img[tabindex="0"] + div { display: none !important; }
          a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] { color: inherit; cursor: pointer; text-decoration: none; }
          a[x-apple-data-detectors]{ color: inherit!important; text-decoration: none!important; font-size: inherit!important; font-family: inherit!important; font-weight: inherit!important; line-height: inherit!important; }
          #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
          #MessageViewBody { width: 100% !important; }
          #MessageWebViewDiv { width: 100% !important; }
      
          @-moz-document url-prefix() {
            .bodyText p a, .bodyTitle p a {
              word-break: break-word;
            }
          }
      
          @media screen {
            body {
            font-family: 'Poppins', sans-serif;
          }
          * {
          direction: ltr;
          }
          }
      
          @media only screen and (min-width:768px){
            .mlEmailContainer{
              width: 640px!important;
            }
          }
      
          @media only screen and (max-width: 640px) {
            .mlTemplateContainer {
              padding: 10px 10px 0 10px;
            }
          } @media only screen and (max-width: 640px) {
            .mlTemplateContainer{
              padding: 10px 10px 0 10px;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentCenter{
              min-width: 10%!important;
              margin: 0!important;
              float: none!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentTable{
              width: 100%!important;
              min-width: 10%!important;
              margin: 0!important;
              float: none!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentBlock{
              display: block !important;
              width: 100%!important;
              min-width: 10%!important;
              margin: 0!important;
              float: none!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentOuter{
              padding-bottom: 0px!important;
              padding-left: 15px!important;
              padding-right: 15px!important;
              padding-top: 0px!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentOuterSmall{
              padding-bottom: 0px!important;
              padding-left: 10px!important;
              padding-right: 10px!important;
              padding-top: 0px!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlMenuOuter{
              padding-bottom: 0px!important;
              padding-left: 5px!important;
              padding-right: 5px!important;
              padding-top: 0px!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentOuterFullBig{
              padding: 30px!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentImage img {
              height: auto!important;
              width: 100%!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentImage160 img {
              height: auto!important;
              max-width: 160px;
              width: 100%!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentImage260 img {
              height: auto!important;
              max-width: 260px;
              width: 100%!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentImage{
              height: 100%!important;
              width: auto!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlProductImage{
              height: auto!important;
              width: 100%!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentButton a{
              display: block!important;
              width: auto!important;
            }
          }
          @media only screen and (max-width: 640px) {
            .mobileHide{
              display: none!important;
            }
          } @media only screen and (max-width: 640px) {
            .mobileShow{
              display: block!important;
            }
          } @media only screen and (max-width: 640px) {
            .alignCenter{
              height: auto!important;
              text-align: center!important;
            }
          } @media only screen and (max-width: 640px) {
            .alignCenter img{
              display: inline !important;
              text-align: center!important;
            }
          } @media only screen and (max-width: 640px) {
            .marginBottom{
              margin-bottom: 15px!important;
            }
          } @media only screen and (max-width: 640px) {
            .marginTop {
              margin-top: 10px !important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentHeight{
              height: auto!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlDisplayInline {
              display: inline-block!important;
              float: none!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlNoFloat{
              float: none!important;
              margin-left: auto!important;
              margin-right: auto!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentSurvey{
              float: none!important;
              margin-bottom: 10px!important;
              width:100%!important;
            }
          } @media only screen and (max-width: 640px) {
            .mlContentSurvey td a{
              width: auto!important;
            }
          } @media only screen and (max-width: 640px) {
            .multiple-choice-item-table{
              width: 100% !important;
              margin-bottom: 20px !important;
              min-width: 10% !important;
              float: none !important;
            }
          } @media only screen and (max-width: 640px) {
            body{
              margin: 0px!important;
              padding: 0px!important;
            }
          } @media only screen and (max-width: 640px) {
            body, table, td, p, a, li, blockquote{
              -webkit-text-size-adjust: none!important;
            }
          }
          @media only screen and (max-width: 480px){
            .social-LinksTable{
              width: 100%!important;
            }
          } @media only screen and (max-width: 640px) {
            .social-LinksTable td:first-child{
              padding-left: 0px!important;
            }
          } @media only screen and (max-width: 640px) {
            .social-LinksTable td:last-child{
              padding-right: 0px!important;
            }
          } @media only screen and (max-width: 640px) {
            .social-LinksTable td{
              padding: 0 10px!important;
            }
          } @media only screen and (max-width: 640px) {
            .social-LinksTable td img{
              height: auto!important;
              max-width: 48px;
              width: 100%!important;
            }
          }
      
          /* Carousel style */
      
          @media screen and (-webkit-min-device-pixel-ratio: 0) {
            .webkit {
              display: block !important;
            }
          }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
            .non-webkit {
              display: none !important;
            }
          }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
            /* TARGET OUTLOOK.COM */
            [class="x_non-webkit"] {
              display: block !important;
            }
          }  @media screen and (-webkit-min-device-pixel-ratio: 0) {
            [class="x_webkit"] {
              display: none !important;
            }
          }
      
        </style>
      
        <!--[if mso]>
        <style type="text/css">
          .bodyText { font-family: Arial, Helvetica, sans-serif!important ; }
          .bodyText * { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyText a { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyText a span { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyText span { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyText p { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyText ul li { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyTitle { font-family: Arial, Helvetica, sans-serif!important ; }
          .bodyTitle * { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyTitle a { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyTitle a span { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyTitle span { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyTitle p { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyFont { font-family: Arial, Helvetica, sans-serif!important ; }
          .bodyFont * { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyFont a { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyFont a span { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyFont span { font-family: Arial, Helvetica, sans-serif!important; }
          .bodyFont p { font-family: Arial, Helvetica, sans-serif!important; }
          .mlContentButton { font-family: Arial, Helvetica, sans-serif!important; }
        </style>
        <![endif]-->
        
      <style type="text/css">
              @media only screen and (max-width: 640px){
                #logoBlock-4 {
              max-width: 171px!important;
              width: 100%!important;
              }
              }
            </style><style type="text/css">
        @media only screen and (max-width: 640px){
          #imageBlock-6 img {
            max-width: 1080px!important;
            width: 100%!important;
          }
        }
      </style><meta name="robots" content="noindex, nofollow">
      <title>${hotelName}</title>
      </head>
      
      <body class="mlBodyBackground" style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f6f8f9; -webkit-text-size-adjust:none;">
      
      <!-- Make your email an accessible article. -->
      <div role="article" aria-roledescription="email" aria-label="">
      
      
      
        
          
      
        
      
        
          
          
        
      
        
          
          
          
        
      
      
      
      
      
        
          
            
        
      
        
          
          
          
            
        
      
        
      
          
          
          
          
          
          
        
      
        
          
          
          
          
          
        
      
        
          
          
          
          
          
        
      
        
          
          
          
          
          
        
      
        
          
          
          
          
        
      
        
          
          
          
        
      
        
          
          
        
      
        
          
          
          
          
          
        
      
        
          
          
          
          
          
        
      
        
          
          
          
          
          
        
      
        
          
          
        
      
        
          
          
          
          
        
      
      
      
      
      
        
      
        
          
          
          
          
          
        
      
        
          
          
          
          
        
      
      
      
      
      
        
          
          
        
      
        
          
          
          
          
          
        
      
        
          
          
          
          
        
      
        
          
          
          
        
      
        
          
          
          
          
        
      
        
          
          
          
        
      
      
      
      <!--[if !mso]><!-- -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f6f8f9" class="mainTable mlBodyBackground" dir="ltr" background="">
        <tr>
          <td class="mlTemplateContainer" align="center">
            <!--<![endif]-->
      
            <!--[if mso 16]>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
              <tr>
                <td bgcolor="#f6f8f9" align="center">
                  <!--<![endif]-->
      
            <!-- Content starts here -->
      
            
      
            
      
              <!-- BORDER RADIUS FOR CARDS LAYOUT -->
              
      
      
              <!-- BORDER RADIUS FOR DEFAULT LAYOUT -->
              
      
            <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mobileHide">
              <tr>
                <td align="center">
                  
                    <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable">
                      <tr>
                        <td colspan="2" height="20"></td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Poppins', sans-serif; font-size:0px;color:#f6f8f9;line-height:0px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;">
                          <div style="display:none;font-size:0px;color:#f6f8f9;line-height:0px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;">
                            Thank you for your time and consideration, please complete the form.
                          </div>
                        </td>
                        
                        <td align="right" style="font-family: 'Poppins', sans-serif; color: #111111; font-size: 12px; line-height: 18px;"><a style="color: #111111;" href="" data-link-id="96403086715651907" data-link-type="webview">View in browser</a></td>
                      </tr>
                      <tr>
                        <td colspan="2" height="20"></td>
                      </tr>
                    </table>
                  
                </td>
              </tr>
            </table>
      
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable   mlContentShadow" width="640" style="box-shadow: 0px 0px 16px 10px #f1f1f1; -webkit-box-shadow: 0px 0px 16px 10px #f1f1f1; -moz-box-shadow: 0px 0px 16px 10px #f1f1f1;">
              <tr>
                <td>
                  
        <!--  -->
      <table align="center" border="0" bgcolor="#F5F9FC" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
        <tr>
          <td class="mlContentTableCardTd">
      
            <table align="center" bgcolor="#F5F9FC" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
              <tr>
                <td>
                  
      
        
        
      
      
      
      
        
        
      
        
        
      
        
          
          
        
      
        
          
      
          
          
          
          
          
        
      
        
          
          
          
          
          
        
        
      
          
      
      
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
        </tr>
      </table>
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
      
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%">
              <tr>
                <td align="left" valign="middle" width="171">
                  <img src="https://storage.mlcdn.com/account_image/278545/4C4H87Le9IvSEh45GaApycrqvBz85d5wT3nRfrZH.png" id="logoBlock-4" border="0" alt="" width="171" style="display: block;">
                </td>
                <td height="1" width="20"></td>
                <td align="right" valign="middle">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                    <tr>
                      <td align="right" class="bodyTitle" style="font-family: 'Montserrat', sans-serif; font-size: 20px; line-height: 150%; font-weight: 700; color: #DB7E31; text-transform: uppercase; font-style: normal; text-decoration: none;"><a href="https://www.btbintl.com/clients" style="text-decoration: none; color: #DB7E31; text-transform: uppercase; font-style: normal; text-decoration: none;" target="_self" data-link-id="96403086734526285">Our Partners</a></td>
                    </tr>
                    
                    
                  </table>
                </td>
              </tr>
            </table>
      
            
      
            
      
            
      
          </td>
        </tr>
      </table>
      
      
      
                    
                </td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      <!--  -->
      
      
        <!--  -->
      <table align="center" border="0" bgcolor="#F5F9FC" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
        <tr>
          <td class="mlContentTableCardTd">
      
            <table align="center" bgcolor="#F5F9FC" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
              <tr>
                <td>
                  
      
        
        
        
        
      
          
          
      
      
      
          
        
      
        
      
      
          
          
            
          
      
          
      
      
      
      
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td align="center" style="padding: 0px 0px;" class="">
      
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
              <tr>
                <td align="center" id="imageBlock-6">
                  <img src="https://storage.mlcdn.com/account_image/278545/3BcRm6to5XbhPpFxAa1h55MmBfpeFHPxAvWw6P0G.jpg" border="0" alt="" width="640" style="display: block;">
                </td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      
      
      
      
      
                    
                </td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      <!--  -->
      
      
        <!--  -->
      <table align="center" border="0" bgcolor="#F5F9FC" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
        <tr>
          <td class="mlContentTableCardTd">
      
            <table align="center" bgcolor="#F5F9FC" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
              <tr>
                <td>
                  
      
        
        
        
        
      
      
      
        
        
      
        
          
          
        
      
        
          
      
          
          
        
      
        
          
      
          
        
      
          
      
      
      
      
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
      
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
              <tr>
                <td class="bodyTitle" id="bodyText-8" style="font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 150%; color: #000000;"><p style="margin-top: 0px; margin-bottom: 10px; line-height: 150%;"><span style="color: rgb(45, 50, 86);"><span style="font-size: 28px;"><strong>Dear ${customerName}<span style="color: rgb(45, 50, 86);"></span>,</strong></span><span style="font-size: 28px;"><strong><br></strong></span><span style="font-size: 28px;"><strong><br></strong></span></span></p>
      <p style="margin-top: 0px; margin-bottom: 10px; line-height: 150%;"><span style="font-size: 28px;"><span style="color: rgb(45, 50, 86);"><strong></strong></span></span></p>
      <p style="margin-top: 0px; margin-bottom: 0px; line-height: 150%;"><span style="font-size: 16px;"><span style="color: rgb(45, 50, 86);">Thank you for your time and consideration, please complete the form for <strong>${hotelName}<span style="color: rgb(45, 50, 86);"></span> </strong>for <strong>$${hotelPrice}</strong><strong><span style="color: rgb(45, 50, 86);"></span></strong> so we can go ahead and secure your accommodations; and send you over your itineraries.</span></span></p></td>
              </tr>
            </table>
            
      
          </td>
        </tr>
      </table>
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td height="40" class="spacingHeight-40" style="line-height: 40px; min-height: 40px;"></td>
        </tr>
      </table>
      
                    
                </td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      <!--  -->
      
      
        <!--  -->
      <table align="center" border="0" bgcolor="#F5F9FC" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
        <tr>
          <td class="mlContentTableCardTd">
      
            <table align="center" bgcolor="#F5F9FC" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
              <tr>
                <td>
                  
      
        
        
      
        
        
      
        
        
      
        
      
          
          
          
          
      
        
      
       
      
        
        
      
          
            
            
            
            
            
          
      
          
            
      
            
            
          
      
       
      
          
      
      
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
        </tr>
      </table>
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
      
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="width: 100%; min-width: 100%;">
              <tr>
                <td align="center">
      
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; min-width: 100%;">
                    <tr>
                      <td align="center" class="mlContentButton" style="font-family: 'Poppins', sans-serif;">
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://fs29.formsite.com/3v49yAj/mclwvjusmb/index" style="height:50px;v-text-anchor:middle;width:229px;" arcsize="6%" stroke="f" fillcolor="#5676BA">
                        <w:anchorlock/>
                        <center>
                        <![endif]-->
                          <a class="mlContentButton" href="https://www.btbintl.com/reservation-form" style="font-family: 'Poppins', sans-serif; background-color:#5676BA;border-radius:3px;color:#ffffff;display:inline-block; font-size:14px;font-weight:400;line-height:20px;padding:15px 0 15px 0;text-align:center;text-decoration:none;width:200px;" target="_blank" data-link-id="96403086739769168">BOOK NOW</a>
                        <!--[if mso]>
                        </center>
                        </v:roundrect>
                        <![endif]-->
                      </td>
                      
                      
                    </tr>
                  </table>
      
                </td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td height="30" class="spacingHeight-30" style="line-height: 30px; min-height: 30px;"></td>
        </tr>
      </table>
      
                    
                </td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      <!--  -->
      
      
        <!--  -->
      <table align="center" border="0" bgcolor="#38929a" class="mlContentTable mlContentTableDefault" cellpadding="0" cellspacing="0" width="640">
        <tr>
          <td class="mlContentTableCardTd">
      
            <table align="center" bgcolor="#38929a" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
              <tr>
                <td>
                  
      
        
        
        
        
      
      
      
        
        
      
        
          
          
        
      
        
          
      
          
          
        
      
        
          
      
          
        
      
          
      
      
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td height="50" class="spacingHeight-50" style="line-height: 50px; min-height: 50px;"></td>
        </tr>
      </table>
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
      
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
              <tr>
                <td class="bodyTitle" id="bodyText-12" style="font-family: 'Poppins', sans-serif; font-size: 12px; line-height: 150%; color: #ffffff;"><p style="margin-top: 0px; margin-bottom: 0px; line-height: 150%; text-align: center;">This message (including any attachments) is confidential. Unauthorized use or dissemination of this message (including any attachments) is strictly prohibited. BTB does not guarantee that the integrity of this communication has been maintained and shall not be liable for any improper or incomplete transmission of the information contained in this communication nor for any delay in its receipt or damage to your system.</p></td>
              </tr>
            </table>
            
      
          </td>
        </tr>
      </table>
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td height="10" class="spacingHeight-10" style="line-height: 10px; min-height: 10px;"></td>
        </tr>
      </table>
      
                    
                </td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      <!--  -->
      
      
      
      <table align="center" border="0" bgcolor="#38929a" class="mlContentTable mlContentTableFooterDefault" cellpadding="0" cellspacing="0" width="640">
        <tr>
          <td class="mlContentTableFooterCardTd">
      
            <table align="center" bgcolor="#38929a" border="0" cellpadding="0" cellspacing="0" class="mlContentTable ml-default   " style="width: 640px; min-width: 640px;" width="640">
              <tr>
                <td>
                  
      
      
      
      
      
      
        
      
      
        
        
        
        
      
      
      
        
      
      
      
        
        
      
        
      
        
      
      
      
      
        
        
      
        
      
          
            
            
          
      
          
          
      
          
            
          
        
      
        
          
          
          
            
        
      
        
          
          
          
        
      
        
          
          
          
          
        
      
          
            
            
            
          
      
        
      
        
      
          
          
          
      
        
      
          
      
      
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td height="30" class="spacingHeight-30" style="line-height: 30px; min-height: 30px;"></td>
        </tr>
      </table>
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
      
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
              <tr>
                <td align="left" class="bodyTitle" style="font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; line-height: 150%; color: #ffffff;">Business Travel Bureau</td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td height="10" class="spacingHeight-10"></td>
        </tr>
      </table>
      
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable ">
        <tr>
          <td align="center" style="padding: 0px 40px;" class="mlContentOuter">
      
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
              <tr>
                <td align="center">
      
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left" width="267" style="width: 267px; min-width: 267px;" class="mlContentTable marginBottom">
                    <tr>
                      <td align="left" class="bodyTitle" id="footerText-14" style="font-family: 'Poppins', sans-serif; font-size: 12px; line-height: 150%; color: #ffffff;"><p style="margin-top: 0px; margin-bottom: 0px;">13 Newel St. Apt# 1RR, <br>Brooklyn, NY 11222<br>P:(315) 512-5456<br>Support Team<br>support@btbintl.com</p></td>
                    </tr>
                    <tr>
                      <td height="25" class="spacingHeight-20"></td>
                    </tr>
                    
                  </table>
      
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="right" width="267" style="width: 267px; min-width: 267px;" class="mlContentTable">
                                  
                                  
                                  
                                  <tr>
                                      <td align="right" class="bodyTitle" id="footerUnsubscribeText-14" style="font-family: 'Poppins', sans-serif; font-size: 12px; line-height: 150%; color: #ffffff;">
                                          <p style="margin-top: 0px; margin-bottom: 0px;">You received this email because you either booked with us before, or requested available hotel options.</p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td height="10"></td>
                                  </tr>
                                  <tr>
                                      <td align="right" class="bodyTitle" style="font-family: 'Poppins', sans-serif; font-size: 12px; line-height: 150%; color: #ffffff;">
                                          <a href="" style="color: #ffffff; text-decoration: underline;" data-link-id="96403086747109205" data-link-type="unsubscribe">
                                              <span style="color: #ffffff;">I don't want to receive more emails</span>
                                              
                                          </a>
                                      </td>
                                  </tr>
                                  
                              </table>
      
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      
      
      
      
                  
                </td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      
      
      
                </td>
              </tr>
      
            </table>
      
            <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" class="mlContentTable">
        <tr>
          <td height="40" class="spacingHeight-20"></td>
        </tr>
        
        
      </table>
      
      
            <!-- Content ends here -->
      
            <!--[if mso 16]>
            </td>
            </tr>
            </table>
            <!--<![endif]-->
      
            <!--[if !mso]><!-- -->
          </td>
        </tr>
      </table>
      <!--<![endif]-->
      
      </div>
      
      </html>
      `, // html body
    };
  
    transporter.sendMail(mailOption, async (err, info) => {
      if (err) {
        console.error("Error sending email:");
        return res.status(404).json({
            message : "Error while sending Email !"
        })
    
      } else {
        // res.status(200).json({
        //   message : "Email sent"
        // })
        const newEmail = new Email({
          CloserName: closerName,
          CustomerName: customerName,
          CustomerEmail: customerEmail,
          HotelName: hotelName,
          HotelPrice: hotelPrice,
        });
        try {
          await newEmail.save();
          res.cookie("sent", "true");
          res.redirect("/");
        } catch (err) {
          console.log(err);
        }
      }
    });
  });
  