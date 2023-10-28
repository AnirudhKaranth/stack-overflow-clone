# StackOverflow Clone

This project is a clone of Stack Overflow, developed using the MERN (MongoDB, Express, React, Node) stack. It provides a platform for users to post questions, answer questions, upvote or downvote questions, manage their profiles, and search for specific questions. The application also offers user authentication through email and phone number with OTP and integrates a chat bot powered by Google's Search API. Notably, this project also leverages Redux for state management.

## Features

1. **User Authentication**: Secure registration and login system using email and password or phone number with OTP.

2. **Ask and Answer Questions**: Users can create questions and provide answers to other users' inquiries.

3. **Voting System**: Allows users to upvote or downvote questions and answers, facilitating community-driven content ranking.

4. **User Profiles**: Users can view other users' profiles and update their own profiles with personal information.

5. **Robust Search Functionality**: Empowers users to quickly locate specific questions, enhancing the user experience.

6. **Chat Bot Integration**: Leverages Google's Search API to provide intelligent answers to user queries.

7. **Redux for State Management**: Utilizes Redux for efficient state management in the application.

## Technology Stack
- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **External API**: Google Search API, fast2sms API (for OTP authentication)

## Getting Started
To set up and run the project, follow these steps:

1. **Clone the Repository**:
     ```bash
     git clone https://github.com/AnirudhKaranth/stackoverflow-clone.git
     ```









## Usage

To run this project locally:

1. Run the following commands

   ```bash
   git clone https://github.com/yourusername/stackoverflow-clone.git
   cd stackoverflow-clone/client
   npm install
   cd ../server
   npm install
   ```

2. set up .env file in server directory as given in .env.example and run:
   ```bash
   cd stackoverflow-clone/server
   npm start
   cd ../client
   npm start
    ```
