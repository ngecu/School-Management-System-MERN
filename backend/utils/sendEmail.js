import nodemailer from 'nodemailer'
import fs from 'fs';
import handlebars from 'handlebars'
import useragent from 'useragent'

const sendEmail = async (email, subject, html) => {
    try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			html: html,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
}


const welcomeTemplateFilePath = "backend/templates/welcome.hbs"

// Function to read the contents of the HTML template file
const readHTMLFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (error, htmlContent) => {
      if (error) {
        reject(error);
      } else {
        resolve(htmlContent);
      }
    });
  });
};

// Function to compile and render the email template
const renderEmailTemplate = (template, data) => {
	const compiledTemplate = handlebars.compile(template);
	return compiledTemplate(data);
  };

export const sendWelcomeEmail = async (user,password,userAgentString) => {
    try {

		console.log("sending email");
			
		// Parse the user agent string
		const agent = useragent.parse(userAgentString);
	
		// Retrieve the browser name
		const browserName = agent.family;
	
		// Retrieve the operating system
		const operatingSystem = agent.os.toString();
	
		readHTMLFile(welcomeTemplateFilePath)
	  .then((templateContent) => {
		// Define the data for the template variables
		const templateData = {
		  name: user.firstName,
		  email: user.email,
		  password:password,
		  userType:user.userType,
		  browserName,
		  operatingSystem,
		};
	
		// Render the email template with the data
		const renderedTemplate = renderEmailTemplate(templateContent, templateData);

		
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		transporter.sendMail({
			from: process.env.USER,
			to: user.email,
			subject: "WELCOME ABOARD",
			html: renderedTemplate,
		});
		console.log("email sent successfully");
	})
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
}

export default sendEmail
