# Resume, Blog, and Portfolio Web App

Welcome to my web application that combines my resume, blog, and portfolio into a single platform. This project aims to demonstrate my skills as fullstack developer as well as to showcase my personal work experiences and education.

## Motivation

I chose to create this web app by combining my resume, blog, and portfolio into a single application to showcase my skills and expertise as a fullstack developer. This project allowed me to deploy a wide range of abilities, such as backend development, as well as frontend design. This project combines both a summary of my life/work experiences as well as the possibility to showcase the abilities listed in such experiences. This integration allowsusers to explore my qualifications, read blog articles, and browse through my portfolio with ease. The consolidated design and functionality not only highlight my frontend development expertise but also showcase my ability to build end-to-end solutions that encompass both frontend and backend components. Through this project, I aim to exhibit my versatility as a full-stack developer and present a comprehensive representation of my professional identity.

## Features

Here is a summary of the features that this project showcase:

- **Personal Details and Contact**:
  As a wrapper to most of the sections on the miniapp. There are four sections that display my personal details, along with contact details, social media, a section with various documents that can be downloaded, and also a contact form.

- **Resume**:
  The resume section displays four elements that withhold most of the curriculum vitae information related. The sections listed are:

  - About Me: This is were I express some ideas about myself and my personal goals.
  - Skills: It consists of a list of knobs with a percentage value of the confidence I feel working with the technologies there mentioned.
  - Work Experience: A list of companies I worked for as well as some details related, like technologies used and a description of the positions.
  - Academic Background: A number of items with information about my education throughout the years.

- **Portfolio**: Showcase my projects, highlighting the ones that best represent my skills and abilities. Include project descriptions, screenshots, and links to live demos or source code repositories.

- **Blog**: Implement a blogging system where I can publish articles on various topics related to development, technology, or any other area of my interest.

- **User Authentication**: Implement a user authentication system to allows me to login. It currently supports a single user that gets grants to edit most of the sections listed before. Hence, the logged user my edit personal details, contact information or add skills, work experience or write blog article among others capabilities.

## Technical Details

- **Technologies Used**: This project was built with **Angular**, so that effectively implies the use of **Typescript**. It was implemented with **PrimeNG** to get the styling. Also there is some customization done with **HTML** and **CSS**.

- **Project Structure**: The way the project is structured aims to two main goals: encapsulation and reusability. The main folder contains three basic sections: core, layouts and shared. Core stores the functionality of the application distributed in three different buckets: controllers, services and models. The shared folder contains the UI components that can be reused across different pages: such as buttons, dropdowns and the like. The layouts folder keeps track of the components that are link to the routes or the elements that are used to build the main pages.

- **API Integration**: Data on this application comes from an external API I have built with **Python** and **Django Rest Framework**. This backends provides the API endpoints to access the data necessary to retrieve and also to perform other actions like creating new records or deleting them. Most of the api views use serializers to represent the objects on the database. In order to communicate frontend and backend there is a shared service for authentication using Google Firebase tools.

## Testing

The project has been subjected to testing to ensure its functionality, reliability, and code coverage. The following metrics provide a summary of the test coverage:

**Coverage summary**

- Statements : 57.43% ( 564/982 )
- Branches : 36.92% ( 48/130 )
- Functions : 46.66% ( 175/375 )
- Lines : 58.77% ( 539/917 )

## Installation and Usage

### Note: Limited API Access

⚠️ Please note that while you can download and install the repository, the application's functionality may be limited as it relies on an external API that is not publicly accessible. The API, built with Python and Django Rest Framework, provides data for the application but is not available for public testing due to the sensitive nature of the data involved.

However, you can still explore and interact with the user interface of the application, showcasing the frontend design and functionality.

Feel free to explore the different sections of the application, including the resume, portfolio, and blog, to get a better understanding of the features and capabilities demonstrated in this Angular project.

If you have any questions or need further assistance, please don't hesitate to reach out.

### Instructions

To download and install this Angular project, follow the steps below:

1. Clone the Repository: Start by cloning this repository to your local machine using the following command:
   git clone <repository-url>

2. Navigate to the Project Directory: Change your current directory to the project folder:
   cd project-directory

3. Install Dependencies: Use npm (Node Package Manager) to install the project dependencies. Run the following command:
   npm install

4. Start the Development Server: After the installation is complete, start the development server by running the following command:
   ng serve

5. Access the Application: Open your web browser and visit http://localhost:4200/ to access the application.

## Demo

You can access the public version of this application navigating to https://fjgs-cv.web.app/

Here's a video where I am navigating through the functionalities of this miniapp. 


[<img src="[https://i.ytimg.com/vi/Hc79sDi3f0U/maxresdefault.jpg](https://www.youtube.com/watch?v=VYO2v9G6j3U)" width="50%">]


## Future Improvements

While the current version of the project showcases my skills and capabilities as a fullstack developer, there are several areas that can be improved and expanded upon in the future. Some potential enhancements include:

1. **Enhanced User Authentication**: Currently, the user authentication system supports a single user. In the future, I plan to implement multi-user functionality, allowing multiple users to create accounts and access personalized sections of the application.

2. **Integration of Additional APIs**: As the project evolves, I intend to integrate more external APIs to enhance the application's functionality. This could include integrating APIs for weather data, social media integration, or third-party services relevant to the project's objectives.

3. **Improved Blogging System**: The existing blogging system serves its purpose, but there is room for improvement. In the future, I plan to enhance the blogging system by adding features such as comments, tags, and the ability to categorize articles based on topics or tags.

4. **Expanded Portfolio**: While the current portfolio section showcases a selection of my projects, I plan to expand it further by adding more projects that demonstrate a wider range of my skills and expertise. This will provide a more comprehensive representation of my abilities and allow visitors to explore a broader spectrum of my work.

5. **Responsive Design**: While the current version of the project is designed to be responsive across various devices, there is always room for improvement. I aim to further optimize the user experience by refining the responsive design and ensuring seamless usability on different screen sizes and devices.

6. **Enhanced UI/UX**: Continuously refining the user interface (UI) and user experience (UX) is essential. I plan to gather feedback from users and conduct usability testing to identify areas for improvement and make the application more intuitive, visually appealing, and user-friendly.

7. **Performance Optimization**: As the project evolves and new features are added, optimizing performance becomes crucial. I will focus on identifying and resolving any bottlenecks, improving loading times, and implementing efficient caching mechanisms to enhance the overall performance of the application.

These are just a few of the potential improvements that I plan to implement in the future. By continuously iterating and enhancing the project, I aim to create a robust, feature-rich, and user-friendly application that showcases my skills and provides value to its users.
